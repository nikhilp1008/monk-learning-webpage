import { Fragment, useMemo, type CSSProperties } from "react";

/**
 * The chapter content's inline markup. Ported from the phone's markup.tsx.
 *
 * Chapter copy carries a closed set of five tags: <b>, <i>, <sup>, <sub> and
 * <br>, no attributes, no entities. It is parsed (not regex-replaced) because
 * runs nest: <b><i>A</i> ⊆ <i>B</i></b>.
 *
 * <i> does not mean emphasis in this content, it means "this is mathematics"
 * -- every variable, set name and expression is wrapped in it -- so it
 * switches to the serif maths face instead of italicising the body font.
 *
 * Unlike the phone, the browser can raise and lower text, so <sup>/<sub> are
 * the real elements and the phone's Unicode-superscript workaround is not
 * needed here.
 */

export const SERIF = "Georgia, 'Times New Roman', serif";

type Node =
  | { kind: 'text'; value: string }
  | { kind: 'br' }
  | { kind: 'tag'; name: 'b' | 'i' | 'sup' | 'sub'; children: Node[] };

const TAG = /<(\/?)(b|i|sup|sub|br)\s*\/?>/gi;

function parse(html: string): Node[] {
  const root: Node[] = [];
  // Open elements, innermost last. An unclosed or stray closing tag is
  // tolerated rather than thrown: a malformed string should cost its own
  // formatting, never the whole screen.
  const stack: { name: 'b' | 'i' | 'sup' | 'sub'; children: Node[] }[] = [];
  const current = () => (stack.length ? stack[stack.length - 1].children : root);

  let cursor = 0;
  TAG.lastIndex = 0;
  let match = TAG.exec(html);
  while (match) {
    if (match.index > cursor) current().push({ kind: 'text', value: html.slice(cursor, match.index) });
    const closing = match[1] === '/';
    const name = match[2].toLowerCase() as 'b' | 'i' | 'sup' | 'sub' | 'br';

    if (name === 'br') {
      current().push({ kind: 'br' });
    } else if (closing) {
      const openIndex = stack.map((s) => s.name).lastIndexOf(name);
      if (openIndex !== -1) {
        // Close everything opened inside it too, so crossed tags degrade into
        // nesting instead of leaking their style to the rest of the string.
        while (stack.length > openIndex) {
          const done = stack.pop()!;
          current().push({ kind: 'tag', name: done.name, children: done.children });
        }
      }
    } else {
      stack.push({ name, children: [] });
    }

    cursor = match.index + match[0].length;
    match = TAG.exec(html);
  }
  if (cursor < html.length) current().push({ kind: 'text', value: html.slice(cursor) });
  while (stack.length) {
    const done = stack.pop()!;
    current().push({ kind: 'tag', name: done.name, children: done.children });
  }
  return root;
}

/**
 * Arrows and similar signs that a platform may draw as a colour emoji. The
 * chapter uses them as punctuation; VARIATION SELECTOR-15 asks for text form.
 */
const EMOJI_DEFAULTING = /([\u2194-\u2199\u21A9\u21AA\u2600-\u26FF\u2B05-\u2B07\u2190-\u2193])(?!\uFE0E)/g;

function asText(value: string): string {
  return value.replace(EMOJI_DEFAULTING, "$1\uFE0E");
}

function render(nodes: Node[], keyPrefix: string): React.ReactNode[] {
  return nodes.map((node, i) => {
    const key = `${keyPrefix}.${i}`;
    if (node.kind === "text") return <Fragment key={key}>{asText(node.value)}</Fragment>;
    if (node.kind === "br") return <br key={key} />;
    const kids = render(node.children, key);
    switch (node.name) {
      case "b":
        return <b key={key} style={{ fontWeight: 700 }}>{kids}</b>;
      case "i":
        return <i key={key} style={{ fontFamily: SERIF, fontStyle: "italic" }}>{kids}</i>;
      case "sup":
        return <sup key={key}>{kids}</sup>;
      case "sub":
        return <sub key={key}>{kids}</sub>;
    }
  });
}

export interface MarkupProps {
  html: string;
  /** The base font size in px; sup/sub scale from it natively. */
  size: number;
  style?: CSSProperties;
  /** Clamp to this many lines. */
  numberOfLines?: number;
}

export function Markup({ html, size, style, numberOfLines }: MarkupProps) {
  const nodes = useMemo(() => parse(html), [html]);
  const clamp: CSSProperties = numberOfLines
    ? { display: "-webkit-box", WebkitLineClamp: numberOfLines, WebkitBoxOrient: "vertical", overflow: "hidden" }
    : {};
  return (
    <span style={{ fontSize: size, whiteSpace: "pre-wrap", ...clamp, ...style }}>
      {render(nodes, "m")}
    </span>
  );
}

/** The same content with every tag dropped, for accessibility labels and
 *  one-line previews. */
export function markupToText(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}
