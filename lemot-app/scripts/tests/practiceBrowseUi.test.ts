/**
 * The browse door is open, and it goes somewhere.
 *
 * `practiceCatalogue.test.ts` proves the MODULE reaches every lawful seed. That
 * was true before this pass and the learner still met eight practices, because
 * nothing rendered it. These rules are about the other half: the catalogue is
 * wired into the surface a learner actually taps, By lesson opens a lesson's
 * real depth instead of the same capped session, paging advances, and none of
 * it leaks into Daily Review, which is the surface Cairn chooses.
 *
 * Source-level where it has to be — the repo has no component renderer — and
 * behavioural wherever the logic is pure, which after this pass is most of it:
 * `practiceBrowse.ts` holds every narrowing decision precisely so the route
 * cannot hold one.
 */
import { describe, test, assert } from "./harness";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { PRACTICE_SEEDS } from "../../content/practice/seeds";
import { V1_LESSONS } from "../../content/lessons/v1";
import { seedIsLawfulFor } from "../../content/practice/practicePlanner";
import { TODAYS_SET_MAX } from "../../content/learning-engine/practice-selector";
import {
  catalogueOrder,
  cataloguePage,
  cataloguePageOf,
  catalogueCard,
} from "../../content/practice/practiceCatalogue";
import {
  BROWSE_MODES,
  browsePool,
  browseRun,
  browseTasters,
  seedShape,
  type BrowseMode,
} from "../../content/practice/practiceBrowse";
import { PRACTICE_UI_COPY, browseModeCopy } from "../../content/practice/practiceCopy";
import type { MasterySnapshot } from "../../content/learning-engine/mastery";
import type { PracticeSeed } from "../../content/practice/practiceTypes";

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");
const codeOf = (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1");

const ROUTE = "app/(tabs)/practice-hub.tsx";
const ENTRY = "components/practice/PracticeStart.tsx";
const BROWSE = "components/practice/PracticeBrowse.tsx";
const CARD = "components/practice/PracticeCard.tsx";

const seeds = PRACTICE_SEEDS as readonly PracticeSeed[];

function reachedThrough(lastLesson: number) {
  const lessons = V1_LESSONS.filter((l) => l.number <= lastLesson);
  const items = new Set<string>();
  for (const lesson of lessons) for (const i of lesson.learningItems ?? []) items.add(i.id);
  return { items, lessons: new Set(lessons.map((l) => l.id)) };
}
const r6 = reachedThrough(6);

/** A learner with reach and no graded history: the browse-first case. */
const BLANK: MasterySnapshot = {
  version: "v1",
  items: {},
  processedClientEventIds: [],
  updatedAt: null,
} as unknown as MasterySnapshot;

function pool(mode: BrowseMode, lessonId?: string): PracticeSeed[] {
  return browsePool({
    mode,
    seeds,
    snapshot: BLANK,
    reachedItems: r6.items,
    reachedLessons: r6.lessons,
    lessonId: lessonId ?? null,
  });
}

const L1 = V1_LESSONS.find((l) => l.number === 1)!;
const L4 = V1_LESSONS.find((l) => l.number === 4)!;

describe("the catalogue is wired into the surface the learner taps", () => {
  test("the route imports the browse and catalogue modules, not only the planner", () => {
    const code = codeOf(read(ROUTE));
    assert(code.includes("practiceBrowse"), "the route narrows through the browse module");
    assert(code.includes("practiceCatalogue"), "and orders through the catalogue");
    assert(code.includes("PracticeBrowse"), "and renders a browse surface");
  });

  test("the bounded session was preserved, not replaced", () => {
    // §9: Practice is catalogue + session, never one standing in for the other.
    const code = codeOf(read(ROUTE));
    assert(code.includes("planPracticeSession"), "the planner still plans a session");
    assert(code.includes("PracticeRunner"), "and the same runner runs it");
    assert(
      codeOf(read(ENTRY)).includes("browseSessionLabel"),
      "and the entry still offers it",
    );
  });

  test("TODAYS_SET_MAX was not deleted to make sessions enormous", () => {
    // §9 names this exactly. Browse widens what is REACHABLE; a sitting stays
    // a sitting, and the fix belongs in the browse layer, not in the ceiling.
    assert(TODAYS_SET_MAX > 0 && TODAYS_SET_MAX <= 12, `ceiling is ${TODAYS_SET_MAX}`);
    const run = browseRun(pool("freestyle"), 0, BLANK);
    assert(run.length <= TODAYS_SET_MAX, `a browse run ran to ${run.length}`);
  });

  test("every browse component exists and the entry renders real cards", () => {
    for (const rel of [ENTRY, BROWSE, CARD]) {
      assert(existsSync(join(process.cwd(), rel)), `${rel} is missing`);
    }
    assert(codeOf(read(ENTRY)).includes("PracticeCard"), "the entry shows cards");
    assert(codeOf(read(BROWSE)).includes("PracticeCard"), "and so does browse");
  });
});

describe("By lesson opens a lesson's real depth", () => {
  test("an early lesson holds far more than one session", () => {
    for (const n of [1, 2, 3, 4, 5, 6]) {
      const lesson = V1_LESSONS.find((l) => l.number === n)!;
      const p = pool("byLesson", lesson.id);
      assert(
        p.length > TODAYS_SET_MAX,
        `${lesson.title} holds only ${p.length}, at or under the session cap`,
      );
    }
  });

  test("the catalogue can expose past the first eight", () => {
    const p = catalogueOrder(pool("byLesson", L1.id), "k");
    const first = cataloguePage(p, "k", 0, 12);
    assert(first.seeds.length === 12, `first page held ${first.seeds.length}`);
    assert(first.nextCursor !== null, "there is more behind the first page");
    const second = cataloguePage(p, "k", first.nextCursor as number, 12);
    const overlap = second.seeds.filter((s) => first.seeds.some((f) => f.id === s.id));
    assert(overlap.length === 0, `page two repeated ${overlap.length} of page one`);
  });

  test("paging reaches the whole lesson, not a favourite corner of it", () => {
    const p = catalogueOrder(pool("byLesson", L4.id), "k");
    const seen = new Set<string>();
    let cursor: number | null = 0;
    let pages = 0;
    while (cursor !== null && pages < 50) {
      const page: ReturnType<typeof cataloguePage> = cataloguePage(p, "k", cursor, 12);
      for (const s of page.seeds) seen.add(s.id);
      cursor = page.nextCursor;
      pages += 1;
    }
    assert(seen.size === p.length, `paging reached ${seen.size} of ${p.length}`);
  });

  test("different lessons are genuinely different catalogues", () => {
    const a = pool("byLesson", L1.id);
    const b = pool("byLesson", L4.id);
    assert(a.length > 0 && b.length > 0, "both lessons hold practices");
    const shared = a.filter((s) => b.some((t) => t.id === s.id));
    assert(shared.length === 0, `${shared.length} seeds appeared under both lessons`);
  });

  test("choosing no lesson offers nothing rather than everything", () => {
    assert(pool("byLesson").length === 0, "an unchosen lesson must not fall back to all");
  });
});

describe("the card you tap is the practice you get", () => {
  test("the browse order is rotated exactly once", () => {
    // THE DEFECT THIS PINS, found in review of this pass's own wiring. The
    // route ordered the pool, handed it to the browse surface, and the surface
    // paginated with `cataloguePage`, which orders AGAIN. Both orders are
    // deterministic, so nothing looked broken — but the position the surface
    // reported back indexed the route's list while the card came from the
    // surface's, and tapping the fourth card started a different practice.
    const browse = codeOf(read(BROWSE));
    assert(browse.includes("cataloguePageOf"), "the surface pages an ordered list");
    assert(!browse.includes("catalogueOrder"), "and never re-orders it");
    assert(!/cataloguePage\(/.test(browse), "the ordering paginator stays out of the surface");
    assert(codeOf(read(ROUTE)).includes("catalogueOrder"), "the route owns the order");
  });

  test("paging an ordered list preserves position", () => {
    const ordered = catalogueOrder(pool("byLesson", L4.id), "learner-3");
    const page = cataloguePageOf(ordered, 0, 12);
    for (let i = 0; i < page.seeds.length; i += 1) {
      assert(page.seeds[i]!.id === ordered[i]!.id, `card ${i} is not seed ${i}`);
    }
    // Which is what makes the tapped index mean what the learner thinks.
    const run = browseRun(ordered, 3, BLANK);
    assert(run[0]!.seed.id === page.seeds[3]!.id, "tapping the fourth card runs the fourth card");
  });

  test("a second page keeps indexing the same list", () => {
    const ordered = catalogueOrder(pool("freestyle"), "learner-3");
    const two = cataloguePageOf(ordered, 0, 24);
    assert(two.seeds.length === 24, `page held ${two.seeds.length}`);
    const run = browseRun(ordered, 19, BLANK);
    assert(run[0]!.seed.id === two.seeds[19]!.id, "a card on page two runs the card on page two");
  });
});

describe("keep going advances, deterministically", () => {
  test("the same key gives the same order every time", () => {
    const once = catalogueOrder(pool("freestyle"), "learner-7").map((s) => s.id);
    const twice = catalogueOrder(pool("freestyle"), "learner-7").map((s) => s.id);
    assert(once.join(",") === twice.join(","), "browse order must not drift under the learner");
  });

  test("asking for more grows the list and never rewrites it", () => {
    // What "Keep going" does: page N+1 is page N plus the next twelve, so a
    // learner reading down the list never has a card move under their thumb.
    const p = catalogueOrder(pool("freestyle"), "k");
    const first = cataloguePageOf(p, 0, 12).seeds.map((s) => s.id);
    const second = cataloguePageOf(p, 0, 24).seeds.map((s) => s.id);
    assert(second.length === 24, `second ask held ${second.length}`);
    assert(
      second.slice(0, 12).join(",") === first.join(","),
      "the cards already on screen stayed where they were",
    );
  });

  test("it stops at the end instead of looping the learner through repeats", () => {
    const p = pool("byLesson", L1.id);
    const all = cataloguePage(p, "k", 0, p.length);
    assert(all.nextCursor === null, "the end of the pool is the end of the list");
    assert(new Set(all.seeds.map((s) => s.id)).size === p.length, "and no duplicates on the way");
  });
});

describe("no mode can widen what the learner may see", () => {
  test("every mode is a subset of what is lawful", () => {
    const lawful = new Set(
      seeds.filter((s) => seedIsLawfulFor(s, r6.items, r6.lessons)).map((s) => s.id),
    );
    for (const mode of BROWSE_MODES) {
      const p = mode === "byLesson" ? pool(mode, L1.id) : pool(mode);
      for (const seed of p) {
        assert(lawful.has(seed.id), `${mode} offered unlawful seed ${seed.id}`);
      }
    }
  });

  test("no seed from an unreached lesson reaches any mode", () => {
    const beyond = new Set(
      V1_LESSONS.filter((l) => l.number > 6).map((l) => l.id),
    );
    for (const mode of BROWSE_MODES) {
      const p = mode === "byLesson" ? pool(mode, L1.id) : pool(mode);
      for (const seed of p) {
        assert(
          !beyond.has(seed.originLessonId),
          `${mode} leaked ${seed.id} from unreached ${seed.originLessonId}`,
        );
      }
    }
    // And the picker itself cannot be pointed past the learner's reach.
    assert(pool("byLesson", "v1-lesson-009").length === 0, "an unreached lesson is empty");
  });

  test("Just beyond is the authored hard contract, not an invented frontier", () => {
    // §4: no new Frontier engine. `difficulty: "hard"` is an existing authored
    // contract — context only, no translation, and the lawfulness checker fails
    // any hard seed whose own prompt leaks the answer.
    const p = pool("justBeyond");
    assert(p.length > 0, "an L0-L6 learner has something a step further");
    for (const seed of p) {
      assert(seed.difficulty === "hard", `${seed.id} is not the hard contract`);
    }
  });

  test("Refresh reads the mastery projection and never invents weakness", () => {
    // A learner with reach and no graded history has nothing unsettled, and
    // the honest answer is an empty mode with a line saying so.
    assert(pool("refresh").length === 0, "nothing is unsettled without evidence");
    assert(
      browseModeCopy("refresh").empty === PRACTICE_UI_COPY.browseRefreshEmpty,
      "and the surface says so rather than serving filler",
    );
    // With evidence, it is the projection's own answer that decides.
    const target = pool("freestyle")[0]!.targetItemIds[0]!;
    const withHistory = {
      ...BLANK,
      items: { [target]: { practiceEligibility: "build" } },
    } as unknown as MasterySnapshot;
    const refreshed = browsePool({
      mode: "refresh",
      seeds,
      snapshot: withHistory,
      reachedItems: r6.items,
      reachedLessons: r6.lessons,
    });
    assert(refreshed.length > 0, "an unsettled item brings its practices back");
    for (const seed of refreshed) {
      assert(seed.targetItemIds.includes(target), `${seed.id} targets something else`);
    }
  });

  test("the entry's tasters are real lawful seeds, one per job", () => {
    const pools = {
      byLesson: pool("byLesson", L1.id),
      freestyle: pool("freestyle"),
      refresh: pool("refresh"),
      justBeyond: pool("justBeyond"),
    } as Record<BrowseMode, PracticeSeed[]>;
    const tasters = browseTasters(pools);
    assert(tasters.length >= 2, `only ${tasters.length} tasters`);
    assert(
      new Set(tasters.map((t) => t.seed.id)).size === tasters.length,
      "the entry must not show the same card twice",
    );
    assert(
      !tasters.some((t) => t.mode === "refresh"),
      "an empty mode contributes no card",
    );
  });
});

describe("a browse card shows the authored practice, not marketing copy", () => {
  test("every card's words come from the seed", () => {
    for (const seed of pool("freestyle")) {
      const card = catalogueCard(seed);
      const payload = (seed.exercise as { payload: Record<string, unknown> }).payload;
      assert(card.job.length > 0, `${seed.id} has no job`);
      const authored = [payload.prompt, payload.communicativeGoal, payload.context, payload.situation]
        .filter((v): v is string => typeof v === "string");
      assert(
        authored.includes(card.job) || card.job === "Practise this",
        `${seed.id} card job is not authored text`,
      );
      if (card.scene !== null) {
        assert(authored.includes(card.scene), `${seed.id} card scene is not authored text`);
      }
    }
  });

  test("the shape word is derived from the authored surface, not a difficulty", () => {
    const shapes = new Set(pool("freestyle").map((s) => seedShape(s)));
    assert(shapes.size >= 3, `only ${shapes.size} distinct shapes across 251 practices`);
    const card = codeOf(read(CARD));
    for (const banned of ["difficulty", "easy", "medium", "hard", "operation"]) {
      assert(!card.includes(banned), `a card must not render ${banned}`);
    }
  });

  test("browse cards carry no audio", () => {
    // §22: a card describes an English scene. Audio belongs to French the
    // learner is meant to hear, and a speaker on every row is furniture.
    for (const rel of [CARD, BROWSE, ENTRY]) {
      const code = codeOf(read(rel));
      for (const banned of ["useSpeech", "Volume2", "say("]) {
        assert(!code.includes(banned), `${rel} must not play audio on a browse card`);
      }
    }
  });

  test("nothing counts anything out loud", () => {
    // §23: breadth comes from content, not from "347 exercises!". The rule is
    // about what is RENDERED, so it reads the bodies of Text elements rather
    // than the whole file: a pool length inside a React key is bookkeeping, and
    // an earlier version of this guard could not tell the two apart.
    for (const rel of [CARD, BROWSE, ENTRY]) {
      const code = codeOf(read(rel));
      for (const body of code.matchAll(/<Text[^>]*>([\s\S]*?)<\/Text>/g)) {
        const rendered = body[1] ?? "";
        for (const banned of [".length", "total", "count"]) {
          assert(
            !rendered.includes(banned),
            `${rel} renders a raw count: ${JSON.stringify(rendered.trim())}`,
          );
        }
      }
    }
  });
});

describe("the first view is Practice, not Daily Review", () => {
  test("the entry asks rather than handing over a chosen set", () => {
    // The old first viewport was "Keep the French moving. / 7 things to bring
    // back. / Start practice." — a set already chosen, its size announced, one
    // tap to accept. That is the review's sentence, and Practice is the other
    // half of the pair.
    assert(
      PRACTICE_UI_COPY.startHeadline === "Pick something to work on.",
      `the headline is "${PRACTICE_UI_COPY.startHeadline}"`,
    );
    const entry = codeOf(read(ENTRY));
    assert(!entry.includes("previewLine"), "the entry no longer announces a set size");
    assert(!entry.includes("startTodayLabel"), "and no longer leads with TODAY");
  });

  test("all four jobs are reachable from the first screen", () => {
    const entry = codeOf(read(ENTRY));
    assert(entry.includes("BROWSE_MODES"), "the entry walks the four modes");
    assert(BROWSE_MODES.length === 4, `there are ${BROWSE_MODES.length} modes`);
    for (const mode of BROWSE_MODES) {
      const copy = browseModeCopy(mode);
      assert(copy.label.length > 0 && copy.detail.length > 0, `${mode} has no words`);
    }
    const labels = BROWSE_MODES.map((m) => browseModeCopy(m).label);
    assert(new Set(labels).size === 4, "each job is named distinctly");
  });

  test("going back from browse stays inside the tab", () => {
    const code = codeOf(read(ROUTE));
    assert(code.includes("setBrowsing(null)"), "back returns to the Practice entry");
    assert(!code.includes("router.back()"), "a tab root never pops a stack");
    assert(!code.includes("router.push"), "and never navigates away on its own");
  });
});

describe("Daily Review keeps its own product", () => {
  test("no Daily Review surface is routed through the practice catalogue", () => {
    // §12, a hard regression requirement. Shared inventory underneath is fine;
    // a shared product experience is not. Daily Review is Cairn's choice, with
    // no lesson selector, no mode selector and no catalogue browsing.
    for (const rel of ["components/DailyReviewOverlay.tsx", "app/(tabs)/index.tsx"]) {
      const code = codeOf(read(rel));
      for (const banned of [
        "practiceCatalogue",
        "practiceBrowse",
        "cataloguePage",
        "catalogueOrder",
        "browsePool",
        "PracticeBrowse",
        "PracticeCard",
      ]) {
        assert(!code.includes(banned), `${rel} must not reach the Practice catalogue: ${banned}`);
      }
    }
  });

  test("the catalogue modules import no Daily Review surface", () => {
    for (const rel of [
      "content/practice/practiceBrowse.ts",
      "content/practice/practiceCatalogue.ts",
      BROWSE,
      CARD,
    ]) {
      const code = codeOf(read(rel));
      for (const banned of ["DailyReview", "dailyReview", "daily-review"]) {
        assert(!code.includes(banned), `${rel} must not know about Daily Review`);
      }
    }
  });
});

describe("browsing changes nothing about the learner", () => {
  test("the browse modules are pure: no clock, no storage, no emission", () => {
    for (const rel of ["content/practice/practiceBrowse.ts", "content/practice/practiceCatalogue.ts"]) {
      const code = codeOf(read(rel));
      for (const banned of [
        "Date.now",
        "Math.random",
        "AsyncStorage",
        "kvStorage",
        "recordEvent",
        "appendEvent",
        "useState",
      ]) {
        assert(!code.includes(banned), `${rel} must not use ${banned}`);
      }
    }
  });

  test("reading a card records nothing; only a graded action does", () => {
    const code = codeOf(read(ROUTE));
    assert(!code.includes("recordChoice"), "the route grades nothing");
    assert(!code.includes("recordTyped"), "the route records nothing");
    const card = codeOf(read(CARD));
    assert(!/record[A-Z]/.test(card), "a card cannot record");
  });

  test("a browse run carries no evidence a plan would not", () => {
    const run = browseRun(pool("byLesson", L1.id), 3, BLANK);
    assert(run.length > 0, "tapping a card starts a run");
    for (const action of run) {
      assert(action.seed.originLessonId === L1.id, "the run stays in the chosen lesson");
      assert(
        action.seed.targetItemIds.includes(action.itemId),
        "the action's item is one the seed actually demonstrates",
      );
    }
  });

  test("a run starts where the learner tapped", () => {
    const p = pool("freestyle");
    const run = browseRun(p, 5, BLANK);
    assert(run[0]!.seed.id === p[5]!.id, "the tapped card is the first thing asked");
    const last = browseRun(p, p.length - 1, BLANK);
    assert(last.length === 1, "tapping the final card is a run of one, not an error");
    const clamped = browseRun(p, 99999, BLANK);
    assert(clamped.length === 1, "an impossible index clamps rather than emptying");
  });
});
