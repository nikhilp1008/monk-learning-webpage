/**
 * Single place that configures KaTeX before anything renders with it.
 *
 * mhchem ships inside the katex package we already depend on, but it is a
 * contrib extension that has to be imported to register itself — nothing did,
 * so `\ce{...}` was an "Undefined control sequence" everywhere. That matters
 * here more than in most products: chemistry is roughly a third of the JEE/NEET
 * syllabus, and without mhchem a reaction had to be faked with ordinary math
 * (`2H_2 + O_2 \rightarrow 2H_2O`), which renders with wrong spacing, wrong
 * italics on element symbols, and no way to put conditions above an arrow.
 *
 * Importing it mutates the shared katex instance, so every module that does
 * `import katex from "katex"` gets the macros once this module has been pulled
 * in anywhere. Import this from any component that renders TeX rather than
 * importing katex directly, so the extension can never be missed.
 */
import katex from "katex";
// MUST be the package export subpath, not "katex/dist/contrib/mhchem.js".
// The deep file path is the CJS build, while `import katex from "katex"`
// resolves to dist/katex.mjs — two separate module instances, so the extension
// patched a copy nobody rendered with and `\ce` stayed undefined. The subpath
// has an "import" condition that resolves to mhchem.mjs and shares this one.
import "katex/contrib/mhchem";

export default katex;
