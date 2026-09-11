/**
 * Nothing is required as output before it has had a teaching encounter.
 *
 * Founder example: "Désolé, je dois partir." Good French is not the bar. The
 * learner is asked to produce it in L7, and until this pass the only place
 * "désolé" had ever appeared was a line in that lesson's Showcase.
 *
 * Showcase does not count, and the codebase already says why: it is a BREADTH
 * surface, it grades nothing and emits no evidence, because reading a list is
 * not learning. A word met only there has been seen, not taught. Declaring an
 * item in `learningItems` does not count either -- that is bookkeeping, not an
 * encounter the learner has.
 *
 * What counts is a screen where the learner meets the piece with something said
 * about it: a meet card, an insight card, or a fill whose reveal explains the
 * form. After that, recombination is fair game, which is the other half of the
 * rule: teach the pieces, then ask for the combination. This checks the pieces,
 * never the whole sentence, so it cannot be satisfied by drilling finished
 * lines.
 */
import { describe, test, assert } from "./harness";
import { V1_LESSONS } from "../../content/lessons/v1";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";
import { L0_ENGLISH_SCAFFOLD } from "./l0HybridScaffold";

const norm = (s: string) =>
  s
    .normalize("NFC")
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/[.!?,;:«»"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Words put in front of the learner with something said about them. */
function taughtWords(screen: { type: string; payload: Record<string, never> }): string[] {
  const teaching = new Set(["meet-card", "insight-card", "fill-with-traps"]);
  if (!teaching.has(screen.type)) return [];
  const p = screen.payload;
  const bits: string[] = [];
  const push = (v: unknown) => {
    if (typeof v === "string" && v.trim()) bits.push(v);
  };
  push(p.fr);
  push(p.title);
  push(p.body);
  for (const h of (p.highlights ?? []) as { text?: string }[]) push(h.text);
  for (const e of (p.examples ?? []) as { fr?: string; note?: string }[]) {
    push(e.fr);
    push(e.note);
  }
  for (const o of (p.options ?? []) as { text?: string }[]) push(o.text);
  const reveal = (p.reveal ?? {}) as Record<string, string>;
  for (const k of ["short", "natural", "explanation"]) push(reveal[k]);
  return bits.flatMap((b) => norm(b).split(" ")).filter(Boolean);
}

/** French the learner MUST produce on this screen. */
function requiredFrench(screen: { type: string; payload: Record<string, never> }): string {
  const p = screen.payload;
  if (screen.type === "weave") return String((p.expectedAnswers ?? [])[0] ?? "");
  if (screen.type === "say-it-your-way") return String(p.modelAnswer ?? "");
  return "";
}

/**
 * Deliberate recoverable unknowns: `lessonId/screenId` -> the exact words.
 *
 * The founder asked Cairn to cultivate one specific move: a weave that contains
 * ONE unknown but recoverable lexical piece, so the learner discovers their own
 * shape reaching past what they were handed. That is the opposite of the defect
 * this file exists to catch, and the two are told apart by declaration.
 *
 * Narrow on purpose, and narrow in three ways at once. It names the screen, it
 * names the word, and the test below caps it at ONE word per screen. So a
 * second unseen word on the same screen still fails, an unseen word on any
 * other screen still fails, and quietly requiring untaught French is exactly as
 * impossible as it was before.
 *
 * A word allowed here is added to the taught set afterwards, because the
 * screen's reveal does show its French form: it is unknown while the learner
 * works, not unknown forever.
 *
 * ONLY object nouns belong here. A new grammar engine, tense, pronoun system or
 * function word is never "recoverable" — the learner cannot reach it from what
 * they own, and no entry may be added for one.
 */
const RECOVERABLE_UNKNOWNS: Readonly<Record<string, readonly string[]>> = {
  // L1's transfer weave. The request shape is owned; "croissant" is the lexical
  // edge, near-transparent for an English speaker, and the screen accepts the
  // hybrid "je voudrais a croissant" so reaching for it is never punished.
  "v1-lesson-001/s15-weave-excusez-moi-cafe": ["croissant"],
};

describe("teach the pieces before asking for them", () => {
  test("no required production contains French the learner has never met", () => {
    const met = new Set<string>();
    const offences: string[] = [];

    for (const lesson of [...V1_LESSONS].sort((a, b) => a.number - b.number)) {
      if (lesson.number < 0 || lesson.number > 10) continue;

      // Within a lesson, order matters: a screen can only lean on what came
      // before it, which is why this walks the flattened sequence rather than
      // gathering the lesson's vocabulary first.
      for (const screen of flattenLessonScreens(lesson)) {
        const s = screen as unknown as { type: string; payload: Record<string, never> };
        const fr = requiredFrench(s);
        const key = `${lesson.id}/${(screen as { id: string }).id}`;
        const allowed = RECOVERABLE_UNKNOWNS[key] ?? [];
        const english = L0_ENGLISH_SCAFFOLD[key] ?? [];
        if (fr) {
          const missing = norm(fr)
            .split(" ")
            .filter((w) => w && !met.has(w) && !allowed.includes(w) && !english.includes(w));
          if (missing.length > 0) {
            offences.push(
              `${lesson.id}/${(screen as { id: string }).id} requires "${fr}" but never taught: ${missing.join(", ")}`,
            );
          }
        }
        for (const w of taughtWords(s)) met.add(w);
        // Shown in the reveal once the learner has committed, so it is unknown
        // during the task and met from here on.
        for (const w of allowed) met.add(w);
      }
    }

    assert(offences.length === 0, offences.join("\n"));
  });

  test("the English scaffold belongs to the first taste and nowhere else", () => {
    // The scaffold exists because L0 teaches with the learner's own language.
    // Any other lesson using it would be hiding untaught French behind a list
    // that was never meant to carry French at all.
    for (const [key, words] of Object.entries(L0_ENGLISH_SCAFFOLD)) {
      assert(
        key.startsWith("v1-lesson-000/"),
        `${key} is not the first taste; only L0 may scaffold in English`,
      );
      assert(words.length > 0, `${key} declares an empty scaffold`);
      for (const w of words) {
        assert(
          /^[a-z]+$/.test(w),
          `${key} scaffolds "${w}", which is not a plain English word`,
        );
      }
    }
  });

  test("a recoverable unknown is one word, on a screen that accepts reaching for it", () => {
    // The exception cannot become a loophole. One word per screen, the screen
    // must exist, and it must actually accept the hybrid attempt — otherwise it
    // is not a recoverable unknown, it is just untaught French with a note.
    for (const [key, words] of Object.entries(RECOVERABLE_UNKNOWNS)) {
      assert(words.length === 1, `${key} declares ${words.length} unknowns; the budget is one`);
      const [lessonId, screenId] = key.split("/");
      const lesson = V1_LESSONS.find((l) => l.id === lessonId);
      assert(lesson !== undefined, `${key} names a lesson that does not exist`);
      const screen = flattenLessonScreens(lesson!).find(
        (sc) => (sc as { id: string }).id === screenId,
      ) as unknown as { type: string; payload: Record<string, string[]> } | undefined;
      assert(screen !== undefined, `${key} names a screen that does not exist`);
      assert(screen!.type === "weave", `${key} is not a weave`);
      const alternatives = (screen!.payload.acceptedAlternatives ?? []) as string[];
      assert(
        alternatives.length > 0,
        `${key} offers no accepted alternative, so reaching for the unknown can only be a miss`,
      );
      assert(
        alternatives.some((a) => norm(a).split(" ").includes(words[0])),
        `${key} accepts no alternative containing "${words[0]}"`,
      );
    }
  });

  test("the rule is about pieces, not about drilling whole sentences", () => {
    // If this ever needed every REQUIRED SENTENCE to have been shown first, it
    // would be enforcing memorisation -- the exact thing the brief forbids. So
    // it must be possible to be asked for a combination never displayed, and
    // the path must actually contain some.
    let novelCombinations = 0;
    const shown = new Set<string>();
    for (const lesson of [...V1_LESSONS].sort((a, b) => a.number - b.number)) {
      if (lesson.number < 0 || lesson.number > 10) continue;
      for (const screen of flattenLessonScreens(lesson)) {
        const s = screen as unknown as { type: string; payload: Record<string, never> };
        const fr = requiredFrench(s);
        if (fr && !shown.has(norm(fr))) novelCombinations += 1;
        for (const w of taughtWords(s)) shown.add(w);
        if (fr) shown.add(norm(fr));
      }
    }
    assert(
      novelCombinations >= 20,
      `only ${novelCombinations} productions ask for a combination the learner has not been shown`,
    );
  });
});
