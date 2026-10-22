import type { WidgetModule } from "./types";
import { comparisonTable } from "./comparison-table";
import { dataTableTrend } from "./data-table-trend";
import { processFlow } from "./process-flow";
import { regionPlot } from "./region-plot";
import { vectorSum } from "./vector-sum";
import { conicPlot } from "./conic-plot";
import { projectileMotion } from "./projectile-motion";
import { freeBodyForces } from "./free-body-forces";
import { fluxSurface } from "./flux-surface";
import { lcrResonance } from "./lcr-resonance";
import { fieldLines } from "./field-lines";
import { reactionScheme } from "./reaction-scheme";
import { circuitNetwork } from "./circuit-network";
import { moleculeStruct } from "./molecule-struct";
import { linesPlanes3d } from "./lines-planes-3d";
import { xyPlot } from "./xy-plot";

/**
 * The widgets this client can draw. The server only sends a registry widget
 * the client has declared (see `widgetManifestParam`), so adding one here is
 * what turns it on for live classes: port it, register it, and the manifest
 * follows.
 *
 * The phone registers 17; the web has 16. molecule_3d is deliberately NOT
 * ported: it is a 3Dmol WebView, and on the phone its structure resolver is a
 * stub that always throws ("No structure cache yet"), so it draws an empty box
 * there today, and no concept routes to it at high confidence. Declaring it
 * here would swap the server's SVG/illustration fallback for that empty box.
 * Port it when the phone's resolver exists (host page: the phone's
 * assets/molecule-host.html in an iframe, postMessage in, PubChem REST for the
 * SDF; PubChem answers with Access-Control-Allow-Origin: *).
 *   xy_plot@4 comparison_table@1 data_table_trend@1 process_flow@1
 *   region_plot@1 vector_sum@1 conic_plot@1 projectile_motion@1
 *   free_body_forces@1 flux_surface@1 lcr_resonance@1 field_lines@2
 *   reaction_scheme@1 circuit_network@1 molecule_struct@2 lines_planes_3d@1
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const REGISTRY: Record<string, WidgetModule<any>> = {
  [xyPlot.id]: xyPlot,
  [comparisonTable.id]: comparisonTable,
  [dataTableTrend.id]: dataTableTrend,
  [processFlow.id]: processFlow,
  [regionPlot.id]: regionPlot,
  [vectorSum.id]: vectorSum,
  [conicPlot.id]: conicPlot,
  [projectileMotion.id]: projectileMotion,
  [linesPlanes3d.id]: linesPlanes3d,
  [moleculeStruct.id]: moleculeStruct,
  [circuitNetwork.id]: circuitNetwork,
  [reactionScheme.id]: reactionScheme,
  [fieldLines.id]: fieldLines,
  [lcrResonance.id]: lcrResonance,
  [fluxSurface.id]: fluxSurface,
  [freeBodyForces.id]: freeBodyForces,
};

/** `lookup()` refuses only a payload whose version is GREATER than the
 *  module's, so a v1..v3 payload still resolves against an @4 module. The
 *  server's `client_can_render` applies the same >= rule. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lookup(id: string, version: number): WidgetModule<any> | null {
  const mod = REGISTRY[id];
  if (!mod) return null;
  return (Number(version) || 1) <= mod.version ? mod : null;
}

/** "xy_plot@4,..." for the WS `widgets=` query parameter. Empty string = none. */
export function widgetManifestParam(): string {
  return Object.values(REGISTRY)
    .map((m) => `${m.id}@${m.version}`)
    .join(",");
}
