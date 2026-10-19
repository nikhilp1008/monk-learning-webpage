import type { FigureRecord } from "./figure-resolver";
import { isReviewed, toFigureRecord, validateLabelSet } from "./label-set";

/**
 * How an `asset_slug` becomes something the web board can draw. The phone's
 * resolver (r2-figure-resolver.ts) is cache-only at render time and downloads
 * to disk before a class; a browser has the HTTP cache and no such rule, so
 * this just fetches on first use and remembers the answer per slug.
 *
 * Same contract otherwise: the label set is `{base}/concept-assets/{slug}.json`
 * and the art is `{slug}.{ext}` beside it. A set that fails validation, names
 * a different slug, or has no reviewer is NOT drawn with labels -- a draft
 * anchor is a guess about where each structure is. The art alone is still
 * drawn (the plate invariant: a problem with the labels must never cost the
 * student the picture).
 *
 * The bucket is public and answers `Access-Control-Allow-Origin: *`, so the
 * browser can read the JSON directly.
 */

const DEFAULT_ASSETS_BASE = "https://pub-03eaaad7d1294d45ab6ae17beecbd799.r2.dev";

export const ASSETS_BASE_URL = (process.env.NEXT_PUBLIC_ASSETS_BASE_URL || DEFAULT_ASSETS_BASE).replace(
  /\/+$/,
  ""
);

const cache = new Map<string, Promise<FigureRecord | null>>();

function measure(url: string): Promise<{ w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => reject(new Error(`art did not load: ${url}`));
    img.src = url;
  });
}

async function load(slug: string): Promise<FigureRecord | null> {
  let ext = "png";
  let set = null;
  let why = "";
  try {
    const res = await fetch(`${ASSETS_BASE_URL}/concept-assets/${encodeURIComponent(slug)}.json`);
    if (!res.ok) throw new Error(`${res.status}`);
    const raw = (await res.json()) as Record<string, unknown>;
    if (typeof raw.ext === "string" && raw.ext) ext = raw.ext;
    const checked = validateLabelSet(raw);
    if (!checked.ok) why = `label set is invalid: ${checked.errors.join("; ")}`;
    else if (checked.set.asset_slug !== slug) why = `asked for "${slug}", got "${checked.set.asset_slug}"`;
    else if (!isReviewed(checked.set)) why = "no reviewed_by";
    else set = checked.set;
  } catch (err) {
    why = `no label set published (${String((err as Error)?.message ?? err)})`;
  }

  const artUrl = `${ASSETS_BASE_URL}/concept-assets/${encodeURIComponent(slug)}.${ext}`;
  if (set) return toFigureRecord(set, artUrl);

  console.warn(`[labelled_figure] "${slug}" drawn without labels: ${why}`);
  try {
    const { w, h } = await measure(artUrl);
    if (!(w > 0 && h > 0)) return null;
    return {
      asset_slug: slug,
      art: { source: { uri: artUrl }, intrinsic_w: w, intrinsic_h: h },
      groups: [],
      labels: [],
    };
  } catch {
    return null;
  }
}

/** One request per slug; a failure is forgotten so a later board can retry. */
export function loadFigure(slug: string): Promise<FigureRecord | null> {
  let p = cache.get(slug);
  if (!p) {
    p = load(slug).then((r) => {
      if (!r) cache.delete(slug);
      return r;
    });
    cache.set(slug, p);
  }
  return p;
}
