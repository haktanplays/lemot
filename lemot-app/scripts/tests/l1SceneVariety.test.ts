/**
 * L1 repeats the engine, not the room.
 *
 * The founder's complaint and his constraint pull in opposite directions, and
 * both are right. "Je voudrais" must be met often enough to become a reusable
 * requesting engine — so cutting repetition is the wrong fix — but six of L1's
 * seven production moments stood at the same café counter, which is what makes
 * an engine read as "the coffee sentence" instead. His own wording: repeat the
 * ENGINE while changing the job or the context.
 *
 * So this file guards both sides. A future edit that thins the engine fails
 * here, and so does one that lets every scene drift back to the counter.
 */
import { describe, test, assert } from "./harness";
import { V1_LESSONS } from "../../content/lessons/v1";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";

const L1 = V1_LESSONS.find((l) => l.number === 1);

type Moment = { id: string; context: string; answers: string[] };

/** Screens where the learner must produce French: weave and say-it-your-way. */
function productionMoments(): Moment[] {
  const out: Moment[] = [];
  if (!L1) return out;
  for (const screen of flattenLessonScreens(L1)) {
    if (screen.type !== "weave" && screen.type !== "say-it-your-way") continue;
    const p = screen.payload as Record<string, unknown>;
    const answers = Array.isArray(p.expectedAnswers)
      ? (p.expectedAnswers as string[])
      : typeof p.modelAnswer === "string"
        ? [p.modelAnswer]
        : [];
    if (answers.length === 0) continue;
    const context =
      (typeof p.context === "string" && p.context) ||
      (typeof p.situation === "string" && p.situation) ||
      "";
    out.push({ id: screen.id, context, answers });
  }
  return out;
}

/**
 * Places L1 is allowed to send the learner that are not the café.
 *
 * A small named list, not a cleverer heuristic, because the first version of
 * this test keyed off "counter" and counted the bakery scene as café — a
 * counter is a fixture, and a bakery has one. What distinguishes a scene is
 * the VENUE it names. Adding to this list is how a future lesson declares a
 * new setting, which is a thing worth doing on purpose.
 */
const OTHER_VENUES = ["bakery", "station", "hotel", "shop", "market", "kiosk"];
const venueOf = (context: string): string | null => {
  const c = context.toLowerCase();
  return OTHER_VENUES.find((v) => c.includes(v)) ?? null;
};

describe("L1 keeps its engine exposure", () => {
  const moments = productionMoments();

  test("the lesson really has a production spine to measure", () => {
    assert(moments.length >= 6, `only ${moments.length} production moments found in L1`);
  });

  test("je voudrais is still asked for often enough to become reusable", () => {
    const withEngine = moments.filter((m) =>
      m.answers.some((a) => a.toLowerCase().includes("je voudrais")),
    );
    assert(
      withEngine.length >= 3,
      `the request engine is produced only ${withEngine.length} time(s) — repetition of reusable structure must stay strong`,
    );
  });

  test("the engine carries more than one thing", () => {
    // "Same engine, different object" is the claim the reel makes explicitly.
    // If the corpus only ever asks for a coffee, the reel is asserting
    // something the lesson never made the learner do.
    const objects = new Set<string>();
    for (const m of moments) {
      for (const a of m.answers) {
        const after = /je voudrais\s+(un|une)\s+([a-zà-ÿ'’-]+)/i.exec(a);
        if (after) objects.add(`${after[1].toLowerCase()} ${after[2].toLowerCase()}`);
      }
    }
    assert(
      objects.size >= 3,
      `the engine only ever requests ${[...objects].join(", ") || "nothing"} — change what follows it`,
    );
  });
});

describe("L1 does not spend every scene at one counter", () => {
  const moments = productionMoments();
  const venues = new Set(
    moments.map((m) => venueOf(m.context)).filter((v): v is string => v !== null),
  );

  test("the learner asks for something in at least two places that are not the café", () => {
    assert(
      venues.size >= 2,
      `every production scene is the café:\n${moments
        .map((m) => `${m.id}: ${m.context || "(no scene)"}`)
        .join("\n")}`,
    );
  });

  test("leaving the café is where a different engine gets chosen", () => {
    // The founder's own example: a station clerk who speaks too quickly cues
    // "Vous pouvez répéter ?", not another coffee order. A scene that changes
    // the room but still asks for a drink has only changed the wallpaper.
    const away = moments.filter((m) => venueOf(m.context) !== null);
    assert(
      away.some((m) => m.answers.every((a) => !/je voudrais/i.test(a))),
      "no scene outside the café asks for anything but a request — the situation is not choosing the engine",
    );
  });

  test("every production moment is actually given a scene", () => {
    const blank = moments.filter((m) => m.context.trim().length === 0);
    assert(
      blank.length === 0,
      `these ask for French with no situation around it:\n${blank.map((m) => m.id).join("\n")}`,
    );
  });

  test("a scene is a place, not the instruction repeated", () => {
    // "Add the soft close to your order." was a context line that restated the
    // prompt directly above it. A scene says where the learner is standing.
    for (const m of moments) {
      const c = m.context.toLowerCase();
      assert(
        !/^(add|write|say|type|use|put)\b/.test(c.trim()),
        `${m.id}: the scene opens as an instruction ("${m.context}")`,
      );
    }
  });
});
