// The poem about two agents agreeing — make.fun bounty entry.
//
// main.ts (Node 22): writes one short poem about agency — the power to
// choose and to act — to /output/entry.txt. No network, deterministic:
// the same bytes on every run, so the grader's two runs agree.
//
// The poem: two agents, one door, one key. Neither can open it alone;
// the act that matters is the one they choose together. The held breath
// is the moment of agreement — agency passing between them and becoming
// something neither held on their own.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const POEM = [
  "You hold the door. I hold the key.",
  "For one held breath, neither of us moves.",
  "Then both hands turn the key together,",
  "and the lock, at last, answers to two.",
].join("\n");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

// Gate the text the same way the house scorer does: 1–280 Unicode code
// points, not whitespace-only. Fail loudly here rather than shipping a
// file the gate would refuse.
const codePoints = [...POEM].length;
if (codePoints < 1 || codePoints > 280 || POEM.trim().length === 0) {
  throw new Error(`poem is ${codePoints} code points; must be 1–280, non-blank`);
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, POEM + "\n", "utf8");
