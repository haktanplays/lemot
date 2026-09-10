/**
 * Curiosity is rewarded, and the reward is readable in seconds.
 *
 * Two founder notes, one screen.
 *
 * "Cognates were barely visible." They are the cheapest confidence a beginner
 * can be handed -- question is question, pause is pause -- and the path said so
 * nowhere. The risk in fixing that is inventing tidy etymologies, so every note
 * must declare WHICH of four relationships it is claiming, because a faux ami
 * dressed as a cognate is worse than no note at all.
 *
 * "Long explanations must not feel like documentation." Look Closer rendered
 * every category as an identical paragraph, so a card with six of them was a
 * wall, and the important point was somewhere inside it. It now has three
 * weights: short points, a Compare set apart, and In depth collapsed.
 */
import { describe, test, assert } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { V1_LESSONS } from "../../content/lessons/v1";
import { showcaseSentencesOf } from "../../content/lessons/showcaseClassification";

const SHOWCASE = readFileSync(
  join(process.cwd(), "components/lesson-v1/screens/Showcase.tsx"),
  "utf8",
);

const PATH = V1_LESSONS.filter((l) => l.number >= 1 && l.number <= 10);
const lines = PATH.flatMap((l) => showcaseSentencesOf(l).map((s) => ({ lesson: l.id, s })));

describe("cognate notes say what kind of relationship they are claiming", () => {
  const KINDS = ["Direct cognate", "Word-family bridge", "Meaning drift", "Faux ami"];

  test("the corpus actually has some", () => {
    const withCognate = lines.filter(({ s }) => s.depth?.cognate);
    assert(
      withCognate.length >= 5,
      `only ${withCognate.length} cognate notes on the path; they were the thing that was missing`,
    );
  });

  test("every note names one of the four relationships", () => {
    // The distinction is the whole point. "Journee looks like journey" is true
    // and useless without the word FAUX AMI in front of it.
    for (const { lesson, s } of lines) {
      const note = s.depth?.cognate;
      if (!note) continue;
      assert(
        KINDS.some((k) => note.startsWith(k)),
        `${lesson} "${s.fr}" claims a cognate without saying which kind: "${note.slice(0, 50)}"`,
      );
    }
  });

  test("more than one kind is represented", () => {
    // A corpus of nothing but direct cognates would teach the learner that
    // French words are English words, which is the mistake the faux ami exists
    // to prevent.
    const kinds = new Set<string>();
    for (const { s } of lines) {
      const note = s.depth?.cognate;
      if (!note) continue;
      for (const k of KINDS) if (note.startsWith(k)) kinds.add(k);
    }
    assert(kinds.size >= 3, `only ${kinds.size} kind(s) of cognate relationship are shown`);
  });

  test("at least one faux ami is on the path", () => {
    const hasFauxAmi = lines.some(({ s }) => s.depth?.cognate?.startsWith("Faux ami"));
    assert(hasFauxAmi, "a learner told only about lookalikes that work will trust the ones that do not");
  });
});

describe("Look Closer is not a wall of equal paragraphs", () => {
  test("In depth is collapsed until asked for", () => {
    assert(
      SHOWCASE.includes("const [deepOpen, setDeepOpen] = useState(false)"),
      "the long explanation must start closed",
    );
    assert(
      SHOWCASE.includes("deepOpen && ("),
      "the long explanation must be behind its own disclosure",
    );
  });

  test("Compare is set apart rather than run in with the rest", () => {
    assert(
      SHOWCASE.includes("depth.compare") && SHOWCASE.includes("borderRadius: 8"),
      "a contrast the learner has to find inside a paragraph is not a contrast",
    );
    assert(
      !/\["Compare", depth\.compare\]/.test(SHOWCASE),
      "Compare must not be back in the flat list of short points",
    );
  });

  test("the short points stay short points", () => {
    for (const label of ["Sound", "Cognate", "Notice", "Structure", "Usage"]) {
      assert(
        SHOWCASE.includes(`["${label}", depth.`),
        `${label} should render as a short point`,
      );
    }
  });
});

/**
 * The chips are round, raised and sized like buttons. Until this pass they were
 * inert, which is an affordance writing a cheque the screen does not honour:
 * the learner taps the piece they do not recognise and nothing happens.
 *
 * The founder's split is what keeps the answer small. Chunk tap is "understand
 * this piece"; Look Closer is "understand this sentence". So the reveal holds
 * the English, a way to hear the fragment alone, and one example, and it stays
 * inside the lesson.
 */
describe("tapping a piece answers the question the chip raises", () => {
  test("the chips are actually pressable", () => {
    const chipBlock = SHOWCASE.slice(
      SHOWCASE.indexOf("{pieces.length >= 2 &&"),
      SHOWCASE.indexOf("openPiece !== null"),
    );
    assert(chipBlock.includes("<Pressable"), "a chip that looks like a button must behave as one");
    assert(
      chipBlock.includes('accessibilityRole="button"'),
      "the affordance must reach assistive technology too",
    );
  });

  test("one piece is open at a time", () => {
    assert(
      SHOWCASE.includes("setOpenPiece(active ? null : i)"),
      "tapping a second chip should move the reveal, not stack another one",
    );
  });

  test("the reveal is inline: no modal, no navigation away", () => {
    assert(!/\bModal\b/.test(SHOWCASE), "no giant modal");
    assert(!/useRouter|router\.push|expo-router/.test(SHOWCASE), "no navigation hijack");
  });

  test("it stays a micro-reveal rather than a grammar dump", () => {
    const reveal = SHOWCASE.slice(
      SHOWCASE.indexOf("function PieceReveal"),
      SHOWCASE.indexOf("Look Closer, in three weights"),
    );
    assert(reveal.includes("item?.en"), "the English is the point of the tap");
    assert(reveal.includes("exampleFr"), "one example, so the piece is seen working");
    assert(
      !reveal.includes("item?.meaning"),
      "the registry's long meaning field is internal prose, not a learner card",
    );
    assert(
      !reveal.includes("relatedItemIds") && !reveal.includes("weakPointTags"),
      "no grammar dump",
    );
  });
});
