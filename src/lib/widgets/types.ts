// The slice of the phone's lib/widgets/types.ts the labelled-figure code uses.
export type ValidationResult<P> =
  | { ok: true; params: P }
  | { ok: false; errors: readonly string[] };
