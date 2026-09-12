/**
 * Curiosity has to be on the path the learner actually walks.
 *
 * The audit that started this: roughly 32 depth notes are authored across
 * L1-L10 — sound, prosody, cognate, faux ami, usage, culture — and nearly all
 * of them were collapsed behind an optional "Look closer" control on the
 * Showcase. A learner who taps Continue could finish several lessons and meet
 * none of it. The content was never missing; it was unreachable.
 *
 * A second finding made it worse. Four lessons DID carry a normal-path card
 * labelled `culture-bite`, and not one of them was culture: they summarised
 * what the lesson had just done, which the goal card and the recap already say.
 * So the one family the founder most expected was the one whose label was being
 * spent on something else.
 *
 * DELIBERATELY NO QUOTAS. There is no rule here that every lesson must carry a
 * faux ami, or a culture bite, or any fixed number of anything — that
 * manufactures trivia, which is the failure mode on the other side of this one.
 * What is guarded is that the layer stays honest: cards say what they are, they
 * ask nothing, they change no ownership, and no lesson is buried in them.
 */
import { describe, test, assert } from "./harness";
import { V1_LESSONS } from "../../content/lessons/v1";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";
import type { InsightCardScreen, Lesson } from "../../content/lessonTypes";

const PATH = V1_LESSONS.filter((l) => l.number >= 1 && l.number <= 10);

/** Insight cards that are curiosity, i.e. everything except the goal card. */
function curiosityCards(lesson: Lesson): InsightCardScreen[] {
  return flattenLessonScreens(lesson).filter(
    (s): s is InsightCardScreen =>
      s.type === "insight-card" &&
      (s.payload as { insightType: string }).insightType !== "lesson-goal",
  );
}

describe("curiosity reaches a learner who never opens Look Closer", () => {
  test("the early lessons are not three in a row with nothing", () => {
    // The founder's own warning sign, and the only count-shaped rule here. It
    // is a floor on a RUN, not a quota per lesson: a lesson may legitimately
    // carry none, but three consecutive early lessons carrying none is the
    // state that produced this batch.
    const early = PATH.filter((l) => l.number <= 6);
    for (let i = 0; i + 2 < early.length; i += 1) {
      const window = early.slice(i, i + 3);
      assert(
        window.some((l) => curiosityCards(l).length > 0),
        `L${window.map((l) => l.number).join(", L")} carry no normal-path curiosity between them`,
      );
    }
  });

  test("the families the founder looked for and did not find are represented", () => {
    // Not per lesson — across the path. Faux ami, culture and sound each had
    // zero genuine normal-path presence when this started.
    const types = new Set(
      PATH.flatMap(curiosityCards).map((c) => (c.payload as { insightType: string }).insightType),
    );
    for (const family of ["faux-ami", "culture-bite", "sound-writing"]) {
      assert(types.has(family), `no lesson on L1-L10 puts a ${family} on the normal path`);
    }
  });

  test("a culture card is about behaviour, not about the lesson", () => {
    // The defect this replaces: four cards labelled culture-bite that restated
    // the lesson plan. A culture card has to tell the learner something about
    // what people do, which a summary of the lesson never does.
    const LESSON_TALK = /\b(today|by the end|you (now )?carry|this lesson|no new rule)\b/i;
    for (const lesson of PATH) {
      for (const card of curiosityCards(lesson)) {
        const p = card.payload as { insightType: string; title: string; body: string };
        if (p.insightType !== "culture-bite") continue;
        assert(
          !LESSON_TALK.test(p.body),
          `${lesson.id}/${card.id} "${p.title}" describes the lesson instead of the culture`,
        );
      }
    }
  });
});

describe("a curiosity card is input, and changes nothing the learner owns", () => {
  /**
   * The cards this pass put on the normal path, by id.
   *
   * Named rather than inferred, because the general rule I first wrote here —
   * "no non-goal insight card declares a target" — was not true and the suite
   * said so. A grammar-nugget that explains the lesson's own architecture is a
   * TEACHING surface and may legitimately name what it is about; L8's frozen
   * c'est où card is exactly that. What must claim nothing is the input layer:
   * a faux ami, a culture note, a prosody note. The learner reads them and
   * nothing they own changes.
   */
  const PROMOTED = [
    "s01-insight-survival-kit", // L1, faux ami
    "s29-insight-ca-va", // L2, usage
    "s26-insight-voice-asks", // L8, prosody
    "s26-insight-merci-closes", // L10, culture
  ];

  test("a promoted curiosity card never declares a target", () => {
    // §20: seeing a card must not mean learned, owned or mastered. A target is
    // how this codebase says "evidence about this item happened here", so
    // reading one of these may not count toward mastery of what it mentions.
    // The suite caught the first version of two of these doing it.
    let checked = 0;
    for (const lesson of PATH) {
      for (const card of curiosityCards(lesson)) {
        if (!PROMOTED.includes(card.id)) continue;
        checked += 1;
        const ids = (card as { targetItemIds?: string[] }).targetItemIds;
        assert(
          ids === undefined || ids.length === 0,
          `${lesson.id}/${card.id} claims targets; reading is not owning`,
        );
      }
    }
    assert(checked === PROMOTED.length, `only ${checked} of the promoted cards were found`);
  });

  test("it asks nothing", () => {
    for (const lesson of PATH) {
      for (const card of curiosityCards(lesson)) {
        const payload = card.payload as unknown as Record<string, unknown>;
        for (const asking of ["options", "expectedAnswers", "answer", "modelAnswer", "suggestedPieces"]) {
          assert(
            payload[asking] === undefined,
            `${lesson.id}/${card.id} carries "${asking}" — a curiosity card is not a quiz`,
          );
        }
      }
    }
  });

  test("it carries no reward framing", () => {
    const BANNED = ["unlock", "xp", "level up", "achievement", "streak", "well done", "congrat"];
    for (const lesson of PATH) {
      for (const card of curiosityCards(lesson)) {
        const p = card.payload as { title: string; body: string };
        const text = `${p.title} ${p.body}`.toLowerCase();
        for (const word of BANNED) {
          assert(!text.includes(word), `${lesson.id}/${card.id} uses reward language ("${word}")`);
        }
      }
    }
  });
});

describe("curiosity stays a texture, not a chapter", () => {
  test("no lesson is flooded with cards", () => {
    // The canon budget is three insight cards including the goal card, so this
    // is the same ceiling stated from the curiosity side: at most two.
    for (const lesson of PATH) {
      const cards = curiosityCards(lesson);
      assert(
        cards.length <= 2,
        `${lesson.id} carries ${cards.length} curiosity cards; the lesson is becoming a textbook`,
      );
    }
  });

  test("a card is short enough to read standing up", () => {
    for (const lesson of PATH) {
      for (const card of curiosityCards(lesson)) {
        const p = card.payload as { title: string; body: string; examples?: unknown[] };
        // Measured in WORDS, not sentences. Counting sentences punished exactly
        // the voice this product wants: L8's card is "Où = where. Spoken French
        // loves this shape: C'est où ? Literally, it's where?. You already own
        // c'est. Take the question whole." — five sentences and twenty-five
        // words, which is brisk rather than long. What makes a card feel like a
        // textbook page is how much there is to read, not how it is punctuated.
        const words = p.body.trim().split(/\s+/).length;
        assert(words <= 80, `${lesson.id}/${card.id} runs to ${words} words; a card is not a page`);
        // Two is the usual limit. Four is allowed only for a card whose whole
        // argument IS the comparison — L3 shows an affirmative and its negative
        // twice over, and cutting it to three would break the pairing.
        assert(
          (p.examples ?? []).length <= 4,
          `${lesson.id}/${card.id} shows ${(p.examples ?? []).length} examples; a card is not a table`,
        );
      }
    }
  });

  test("one idea has one home inside a lesson", () => {
    // §15: before adding a card, check it is not already the result note or the
    // Showcase line. Exact prose may not appear twice in the same lesson.
    for (const lesson of PATH) {
      const bodies = curiosityCards(lesson).map((c) => (c.payload as { body: string }).body.trim());
      const results = flattenLessonScreens(lesson)
        .map((s) => (s.payload as { reveal?: { explanation?: string } }).reveal?.explanation)
        .filter((x): x is string => typeof x === "string")
        .map((x) => x.trim());
      const all = [...bodies, ...results];
      assert(
        new Set(all).size === all.length,
        `${lesson.id} says the same thing twice across its curiosity and result surfaces`,
      );
    }
  });

  test("the deep layer is still optional and still there", () => {
    // Promotion must not have emptied Look Closer. The long versions stay
    // behind the control; what moved onto the path is the short form.
    let depth = 0;
    for (const lesson of PATH) {
      for (const screen of lesson.screens) {
        if (screen.type !== "showcase") continue;
        for (const cluster of screen.payload.clusters) {
          for (const s of cluster.sentences) {
            if (s.depth && Object.values(s.depth).some(Boolean)) depth += 1;
          }
        }
      }
    }
    assert(depth >= 28, `only ${depth} Showcase lines still carry depth; promotion should copy, not move`);
  });
});
