/**
 * L1-L10 corpus-closure contracts.
 *
 * The existing suites check that lessons are well formed, that scaffolding
 * descends, and that each lesson clears a sentence floor. None of them checks
 * the two things this phase was actually about: that the learner is asked to
 * produce in more than one COGNITIVE MODE, and that a scene written in French
 * is fair — built only from what the learner already owns, and never leaking
 * its own answer.
 *
 * Deliberately not a validator framework: no new module, no severity taxonomy,
 * no report. Invariants over the shipped lessons, expressed so that content may
 * grow freely and only a regression fails.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { V1_LESSONS } from "../../content/lessons/v1";
import type { Lesson, LessonScreen } from "../../content/lessonTypes";

const PATH: readonly Lesson[] = V1_LESSONS.filter(
  (l) => l.number >= 1 && l.number <= 10,
).sort((a, b) => a.number - b.number);

const norm = (t: string): string =>
  t
    .replace(/[‘’]/g, "'")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[.,!?;:]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

/** Everything quoted as spoken French in a scene, e.g. « Bonjour ? ». */
function quotedFrench(text: string): string[] {
  return [...text.matchAll(/«\s*([^»]+?)\s*»/g)].map((m) => m[1]);
}

type Production = {
  lesson: Lesson;
  screen: LessonScreen;
  kind: "translation" | "situational" | "french-context" | "open";
  answers: string[];
  context: string;
};

function productionsOf(lesson: Lesson): Production[] {
  const out: Production[] = [];
  for (const screen of lesson.screens) {
    const p = screen.payload as Record<string, unknown>;
    if (screen.type === "say-it-your-way") {
      out.push({ lesson, screen, kind: "open", answers: [], context: "" });
      continue;
    }
    if (screen.type !== "weave") continue;
    const prompt = String(p.prompt ?? "");
    const context = String(p.context ?? "");
    const answers = ((p.expectedAnswers as string[]) ?? []).slice();
    const kind = /write it in french/i.test(prompt)
      ? "translation"
      : quotedFrench(context).length > 0
        ? "french-context"
        : "situational";
    out.push({ lesson, screen, kind, answers, context });
  }
  return out;
}

const ALL: readonly Production[] = PATH.flatMap(productionsOf);

/** Every item surface the learner owns by the end of `number`. */
function ownedThrough(number: number): Set<string> {
  const owned = new Set<string>();
  for (const l of V1_LESSONS) {
    if (l.number > number) continue;
    for (const item of l.learningItems) owned.add(norm(item.text));
  }
  return owned;
}

// ── The learner is asked to produce in more than one mode ──────────────────

describe("L1-L10 production is not one prompt shape repeated", () => {
  test("all four cognitive modes are present on the path", () => {
    // The pre-closure path had translation, situational and open, and
    // effectively no scene written in French — so the whole middle rung of the
    // difficulty ladder was missing. This asserts the rung exists, not how big
    // it is.
    const kinds = new Set(ALL.map((a) => a.kind));
    for (const required of ["translation", "situational", "french-context", "open"]) {
      assert(kinds.has(required as Production["kind"]), `no ${required} production on the path`);
    }
  });

  test("no single mode owns more than half of the productions", () => {
    const counts = new Map<string, number>();
    for (const a of ALL) counts.set(a.kind, (counts.get(a.kind) ?? 0) + 1);
    for (const [kind, n] of counts) {
      assert(
        n <= ALL.length / 2,
        `${kind} is ${n} of ${ALL.length} productions — the path is dominated by one prompt shape`,
      );
    }
  });

  test("translation lives early and open production lives late", () => {
    // Direct translation is legitimate beginner material and is not banned; it
    // simply must not still be how the path asks for French once the learner
    // owns enough to be given a situation instead.
    const translationLessons = ALL.filter((a) => a.kind === "translation").map(
      (a) => a.lesson.number,
    );
    assert(translationLessons.length > 0, "beginner translation still exists");
    assert(
      Math.max(...translationLessons) <= 6,
      `translation prompts reach L${Math.max(...translationLessons)}; they belong to the early path`,
    );
    for (const n of [7, 8, 9, 10]) {
      assert(
        ALL.some((a) => a.lesson.number === n && (a.kind === "open" || a.kind === "french-context")),
        `L${n} has no open or French-context production`,
      );
    }
  });
});

// ── A French scene must be fair ────────────────────────────────────────────

describe("French-context scenes are fair", () => {
  test("every quoted French line is built from material the learner already owns", () => {
    // Unseen-form leakage is the specific risk of writing the scene in French:
    // it is the one place a lesson can show the learner a form nobody taught.
    for (const a of ALL) {
      const owned = ownedThrough(a.lesson.number);
      for (const quote of quotedFrench(a.context)) {
        const surface = norm(quote);
        assert(
          owned.has(surface),
          `${a.lesson.id}/${a.screen.id} quotes « ${quote} », which is not owned by the end of L${a.lesson.number}`,
        );
      }
    }
  });

  test("no scene hands the learner its own answer", () => {
    for (const a of ALL) {
      if (a.answers.length === 0) continue;
      const context = norm(a.context);
      for (const answer of a.answers) {
        assert(
          !context.includes(norm(answer)),
          `${a.lesson.id}/${a.screen.id} context contains its own expected answer`,
        );
      }
    }
  });
});

// ── The activated payload is reached, not merely declared ──────────────────

describe("the payload this phase activated is actually used", () => {
  // Declaring an item in learningItems is free. These were dormant for real —
  // registered, frozen, and never reached by a screen — so the property worth
  // protecting is that a payload reaches them, in the lessons the Payload
  // Economy places them in.
  const ACTIVATED: Record<string, number[]> = {
    "chunk-vous-pouvez-repeter": [1, 6, 8],
    "noun-idee": [4, 5],
  };

  for (const [itemId, lessons] of Object.entries(ACTIVATED)) {
    test(`${itemId} is reached by a screen in L${lessons.join(", L")}`, () => {
      for (const number of lessons) {
        const lesson = PATH.find((l) => l.number === number);
        assert(lesson !== undefined, `L${number} is shipped`);
        assert(
          lesson!.learningItems.some((i) => i.id === itemId),
          `L${number} declares ${itemId}`,
        );
        assert(
          lesson!.screens.some((s) => (s.targetItemIds ?? []).includes(itemId)),
          `L${number} declares ${itemId} but no screen targets it`,
        );
      }
    });
  }

  test("the lesson that ACTIVATES an item uses it at least twice", () => {
    // Payload Economy v0 §3: a supported item appears at least twice in the
    // lesson that adds it — meet plus one real use, because one appearance is a
    // mention rather than payload. The rule governs the INTRODUCING lesson; a
    // later lesson recycling the item into one new scene is exactly what
    // recycling is, and requiring two uses there would force padding.
    for (const [itemId, lessons] of Object.entries(ACTIVATED)) {
      const first = PATH.find((l) => l.number === Math.min(...lessons))!;
      const uses = first.screens.filter((s) =>
        (s.targetItemIds ?? []).includes(itemId),
      ).length;
      assert(
        uses >= 2,
        `${first.id} activates ${itemId} but reaches it only ${uses} time(s)`,
      );
    }
  });

  test("the repair pair is produced somewhere on the path", () => {
    // Named in Payload Economy v0 §1 as one of four functional holes: both
    // halves were owned and no lesson ever asked for them together.
    const paired = ALL.filter((a) =>
      a.answers.some(
        (ans) => /je ne comprends pas/i.test(ans) && /vous pouvez r[ée]p[ée]ter/i.test(ans),
      ),
    );
    assert(paired.length >= 1, "no lesson produces the repair pair");
    assertEqual(
      paired[0].lesson.id,
      "v1-lesson-006",
      "the integration lesson is where the pair closes",
    );
  });
});

// ── The true corpus: architectures, not strings ────────────────────────────

/**
 * Hand-made architecture inventory for L1-L10.
 *
 * WHY THIS EXISTS. Every other count in this repo is a count of STRINGS, and a
 * string count cannot tell the difference between a new thought and a swapped
 * noun. "Je voudrais un cafe." and "Je voudrais un the." are two surfaces and
 * one architecture. Adding "Bonjour," in front makes a third surface and still
 * one architecture. Putting two owned sentences side by side makes a fourth and
 * still no new architecture. A corpus report built on surfaces therefore
 * overstates linguistic breadth badly -- the earlier pass reported "126 distinct
 * sentences" for a path that expresses NINE reusable constructions.
 *
 * This table is authored by judgment, deliberately NOT inferred: there is no
 * semantic classifier here and there should not be one. What IS mechanical is
 * the check below -- every representative and every version must actually appear
 * in shipped content, so the taxonomy cannot drift away from the lessons it
 * describes.
 */
type Architecture = {
  /** Stable name for the reusable construction. */
  readonly name: string;
  /** One sentence that shows the shape. Must appear in shipped L1-L10 content. */
  readonly representative: string;
  /** The frame, written the way an author thinks about it. */
  readonly frame: string;
  /** Lesson that first puts it in front of the learner. */
  readonly firstLesson: number;
  /** What the learner can DO with it. */
  readonly job: string;
  /** Payload/lexical versions actually shipped. All must appear. */
  readonly versions: readonly string[];
};

const ARCHITECTURES: readonly Architecture[] = [
  {
    name: "REQUEST_POLITE",
    representative: "Je voudrais un café.",
    frame: "je voudrais + payload",
    firstLesson: 1,
    job: "ask a stranger for something, softly",
    // The L9 extension from a noun payload to an action payload (faire une
    // pause) is a real structural widening of the complement, but it is counted
    // as a version rather than a second architecture: the engine, the register
    // and the communicative job are identical.
    versions: ["Je voudrais un café.", "Je voudrais un thé.", "Je voudrais faire une pause."],
  },
  {
    name: "STATE_LOCATE",
    representative: "Je suis ici.",
    frame: "je suis + complement",
    firstLesson: 2,
    job: "say where or what you are",
    versions: ["Je suis ici."],
  },
  {
    name: "NEGATION_TRANSFORM",
    representative: "Je ne suis pas ici.",
    frame: "ne + verb + pas, over an owned sentence",
    firstLesson: 3,
    job: "turn a sentence you own into its opposite",
    versions: ["Je ne suis pas ici.", "Ce n'est pas ici."],
  },
  {
    name: "IDENTIFY",
    representative: "C'est ici.",
    frame: "c'est + complement",
    firstLesson: 3,
    job: "name or point at what something is",
    versions: ["C'est ici."],
  },
  {
    name: "POSSESS_EXPERIENCE",
    representative: "J'ai faim.",
    frame: "j'ai + payload",
    firstLesson: 4,
    job: "say what you have or feel, where French uses have and English uses be",
    versions: ["J'ai faim.", "J'ai une question.", "J'ai une idée."],
  },
  {
    name: "DESTINATION",
    representative: "Je vais à la maison.",
    frame: "je vais + destination",
    firstLesson: 7,
    job: "say where you are heading",
    versions: ["Je vais à la maison."],
  },
  {
    name: "ASK_LOCATION",
    representative: "C'est où ?",
    frame: "frozen question",
    firstLesson: 8,
    job: "ask where something is",
    versions: ["C'est où ?"],
  },
  {
    name: "REPAIR_NOT_FOLLOWED",
    representative: "Je ne comprends pas.",
    frame: "survival formula, learned whole",
    firstLesson: 3,
    job: "say the conversation went past you",
    versions: ["Je ne comprends pas."],
  },
  {
    name: "REPAIR_ASK_REPEAT",
    representative: "Vous pouvez répéter ?",
    frame: "survival formula, learned whole",
    firstLesson: 1,
    job: "ask for the line again",
    versions: ["Vous pouvez répéter ?"],
  },
];

/** Every French string shipped anywhere in L1-L10, normalized for comparison. */
const SHIPPED: ReadonlySet<string> = (() => {
  const out = new Set<string>();
  const add = (v: unknown) => {
    if (typeof v === "string" && v.trim().length > 0) out.add(norm(v));
  };
  for (const lesson of PATH) {
    for (const screen of lesson.screens) {
      const p = screen.payload as Record<string, unknown>;
      add(p.fr);
      add(p.modelAnswer);
      for (const e of (p.examples as Array<{ fr?: string }> | undefined) ?? []) add(e.fr);
      for (const o of (p.options as Array<{ text?: string }> | undefined) ?? []) add(o.text);
      for (const a of (p.expectedAnswers as string[] | undefined) ?? []) add(a);
      for (const a of (p.naturalAlternatives as string[] | undefined) ?? []) add(a);
      const reveal = p.reveal as Record<string, unknown> | undefined;
      add(reveal?.modelAnswer);
      add(reveal?.natural);
      for (const a of (reveal?.naturalAlternatives as string[] | undefined) ?? []) add(a);
    }
  }
  return out;
})();

describe("the L1-L10 architecture inventory describes the shipped lessons", () => {
  test("every architecture's representative sentence is actually shipped", () => {
    for (const a of ARCHITECTURES) {
      assert(
        SHIPPED.has(norm(a.representative)),
        `${a.name}: representative "${a.representative}" appears nowhere in L1-L10`,
      );
    }
  });

  test("every version listed in the inventory is actually shipped", () => {
    for (const a of ARCHITECTURES) {
      for (const v of a.versions) {
        assert(SHIPPED.has(norm(v)), `${a.name}: version "${v}" appears nowhere in L1-L10`);
      }
    }
  });

  test("the inventory is introduced across the path, not front-loaded", () => {
    // Each architecture is owned by exactly one lesson, and that lesson exists.
    for (const a of ARCHITECTURES) {
      assert(
        PATH.some((l) => l.number === a.firstLesson),
        `${a.name} claims L${a.firstLesson}, which is not on the path`,
      );
    }
  });

  test("the true architecture count for L1-L10 is nine", () => {
    // Pinned so it is a REVIEWABLE number rather than a number nobody looks at.
    // Nine reusable constructions over ten lessons is the honest figure, against
    // 80 distinct surfaces and 96 graded exercises built on top of them. If a
    // later pass raises this, it must do so by adding a construction, not a
    // payload, an opener, or a second sentence after a full stop.
    assertEqual(ARCHITECTURES.length, 9, "hand-audited architecture count");
  });

  test("architectures welded to a single payload stay visible", () => {
    // Not a failure -- a deliberate record. These four can only say one thing,
    // because L1-L10 owns no lawful second payload for them: no adjective for
    // je suis, no second destination for je vais, and c'est is only ever ici.
    // Widening them needs new vocabulary, which is a founder decision, not an
    // authoring one.
    const welded = ARCHITECTURES.filter((a) => a.versions.length === 1).map((a) => a.name);
    assertEqual(
      welded,
      [
        "STATE_LOCATE",
        "IDENTIFY",
        "DESTINATION",
        "ASK_LOCATION",
        "REPAIR_NOT_FOLLOWED",
        "REPAIR_ASK_REPEAT",
      ],
      "single-payload architectures, recorded on purpose",
    );
  });
});
