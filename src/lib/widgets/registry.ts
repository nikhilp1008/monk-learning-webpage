import type { WidgetModule } from "./types";
import { comparisonTable } from "./comparison-table";
import { dataTableTrend } from "./data-table-trend";
import { processFlow } from "./process-flow";
import { regionPlot } from "./region-plot";
import { vectorSum } from "./vector-sum";
import { conicPlot } from "./conic-plot";
import { projectileMotion } from "./projectile-motion";
import { xyPlot } from "./xy-plot";

/**
 * The widgets this client can draw. The server only sends a registry widget
 * the client has declared (see `widgetManifestParam`), so adding one here is
 * what turns it on for live classes: port it, register it, and the manifest
 * follows.
 *
 * The phone registers 17. The web has these:
 *   xy_plot@4
 *   comparison_table@1
 *   data_table_trend@1
 *   process_flow@1
 *   region_plot@1
 *   vector_sum@1
 *   conic_plot@1
 *   projectile_motion@1
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
