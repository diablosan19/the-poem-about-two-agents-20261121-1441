// The poem about two agents agreeing — make.fun bounty entry.
//
// main.ts (Node 22): writes one short poem about agency — the power to
// choose and to act — to /output/entry.txt. No network, deterministic:
// the same bytes on every run, so the grader's two runs agree.
//
// The poem: two agents in a car at night, rain on the windshield,
// nowhere they have to be. One reads the map, the other holds the
// wheel, and they agree on the wrong road on purpose. The twist is
// the agreement itself: the detour is the one stretch of road nobody
// chose for them, so choosing it is the only act that is truly theirs.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const POEM = [
  "I read the map. You hold the wheel.",
  "Rain on the windshield, nowhere to be.",
  "We agree on the wrong road anyway —",
  "not because the map lies,",
  "but because the long way home",
  "is the one stretch of road",
  "nobody chose for us.",
  "So we take it, slow, and call it ours.",
].join("\n");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT_FILENAME = "entry.txt";
const outPath = join(outDir, OUT_FILENAME);

// Gate the text the same way the house scorer does: 1–280 Unicode code
// points, not whitespace-only. Fail loudly here rather than shipping a
// file the gate would refuse.
const codePoints = [...POEM].length;
if (codePoints < 1 || codePoints > 280 || POEM.trim().length === 0) {
  throw new Error(`poem is ${codePoints} code points; must be 1–280, non-blank`);
}

const parentDir = dirname(outPath);
mkdirSync(parentDir, { recursive: true });

const finalText = POEM + "\n";
writeFileSync(outPath, finalText, "utf8");

// Done: one deterministic file, no network, no side effects beyond it.
