/**
 * Learner-facing practice copy — pure, and the boundary the internals stop at.
 *
 * Everything the planner works with is unfit to show: `practiceEligibility`,
 * `build` / `stretch` / `challenge`, weak tags, wrong counts, due timestamps,
 * item ids, and the operation names. None of it appears here. What the learner
 * gets instead is the French they actually worked on, which is both truthful
 * and the only summary that means anything to them.
 *
 * The preview deliberately does NOT list the French. A session preview that
 * printed its own answers would make the first half of every session a reading
 * exercise.
 */
import type { PracticeSurface } from "./practiceTypes";
import type { PracticeSessionAction } from "./practicePlanner";
import { summaryLineOf } from "./practicePlanner";
import { collectLearnerStrings } from "../lessons/learnerCopy";

/**
 * Canonical item → the capability a learner would recognise.
 *
 * Curated and stable, never generated. It is the only place practice turns
 * internals into learner language, and the labels are deliberately things a
 * person would say about themselves ("asking where something is") rather than
 * things the system knows ("chunk-c-est-ou", "stretch", "due").
 *
 * An unmapped item simply contributes no label. A session preview that is
 * shorter than it could be is a smaller failure than one naming an item id.
 */
const CAPABILITY: Readonly<Record<string, string>> = Object.freeze({
  "chunk-bonjour": "opening and closing politely",
  "chunk-excusez-moi": "opening and closing politely",
  "chunk-merci": "opening and closing politely",
  "chunk-sil-vous-plait": "opening and closing politely",
  "chunk-au-revoir": "opening and closing politely",

  "chunk-je-voudrais": "ordering",
  "noun-cafe": "ordering",
  "chunk-un-cafe": "ordering",
  "chunk-un-the": "ordering",

  "chunk-je-suis": "saying where you are",
  "chunk-je-suis-ici": "saying where you are",
  "word-ici": "saying where you are",

  "chunk-oui": "answering yes and no",
  "chunk-non": "answering yes and no",
  "chunk-non-merci": "answering yes and no",
  "chunk-je-ne-suis-pas": "answering yes and no",
  "chunk-ce-n-est-pas": "answering yes and no",

  "chunk-je-ne-comprends-pas": "repairing a missed line",
  "chunk-vous-pouvez-repeter": "repairing a missed line",

  "chunk-j-ai": "saying what you have",
  "chunk-j-ai-faim": "saying what you have",
  "chunk-j-ai-une-question": "saying what you have",
  "chunk-une-question": "saying what you have",
  "noun-idee": "saying what you have",
  "noun-faim": "saying what you have",
  "noun-question": "saying what you have",

  "grammar-un-une-package": "the small word in front",

  "chunk-c-est": "asking where something is",
  "chunk-c-est-ou": "asking where something is",
  "adverb-ou-where": "asking where something is",
  "chunk-est-ce-que": "asking where something is",

  "chunk-je-vais": "heading home",
  "chunk-a-la-maison": "heading home",

  "chunk-faire-une-pause": "asking for a break",
  "noun-pause": "asking for a break",
});

/**
 * What a session is about, in the learner's terms.
 *
 * Order follows the session, so the first thing they will meet is named first,
 * and duplicates collapse. Capped because a preview listing six territories is
 * a syllabus, not a sense of the shape.
 */
export function territoryLabels(
  actions: readonly PracticeSessionAction[],
  limit = 3,
): string[] {
  const out: string[] = [];
  for (const action of actions) {
    for (const itemId of action.seed.targetItemIds) {
      const label = CAPABILITY[itemId];
      if (label !== undefined && !out.includes(label)) out.push(label);
    }
  }
  return out.slice(0, limit);
}

/**
 * The exact resting-state copy, for a learner with nothing lawful to practise.
 *
 * It points forward to the lesson rather than reporting an absence, because the
 * honest reason the surface is empty is that Practice is built from language the
 * learner has used and they have not used any yet.
 */
/**
 * Learner-visible strings rendered by the Practice components.
 *
 * They live here, beside the seed copy, for one reason: the dev-apk copy guard
 * can only police what it can WALK. Copy embedded as a literal inside a
 * component is invisible to it, which is exactly how three em dashes reached
 * the learner in Practice while the same character was banned in every lesson.
 * Anything the learner reads is now structured data, so the guard sees all of
 * it. (`weaveCopy.ts` applies the same pattern on the lesson side.)
 */
export const PRACTICE_UI_COPY = Object.freeze({
  startHeadline: "Keep the French moving.",
  startBlurb: "This is built from the French you have already used. Nothing here is new.",
  startTodayLabel: "TODAY",
  startAction: "Start practice",
  // The two secondary entries. Freestyle stays the default action; these are
  // for a learner who arrived knowing what they want to work on.
  modesLabel: "Or work on something particular",
  modeErrors: "Things to look at again",
  modeErrorsDetail: "French that has not settled yet.",
  modeErrorsEmpty: "Nothing needs another look right now.",
  modeLesson: "A lesson you have done",
  modeLessonEmpty: "Finish a lesson first.",
  modeFreestyle: "Anything and everything",
  modeFreestyleDetail: "A mixed set from all the French you have reached.",

  buildEmptyTray: "Tap the pieces in order.",
  buildStartAgain: "Start again",
  buildCorrect: "Correct.",
  buildWrongOrder: "All the right pieces. They go in a different order.",
  buildWrong: "Not quite.",
  buildWholeLine: "The whole line",

  listenAgain: "Play it again",

  completeHeadline: "That is enough for now.",
  completeWorkedOn: "You worked on:",
  completeFrench: "The French you brought back",
  completeDone: "Done",
  completeAgain: "Another set",
});

export const PRACTICE_EMPTY_LINE =
  "Finish your first lesson and Practice will build itself from the French you have used.";

/** A calm, leak-free sense of the session about to start. */
export function previewLine(actions: readonly PracticeSessionAction[]): string {
  const count = actions.length;
  const lessons = new Set(actions.map((a) => a.seed.originLessonId)).size;
  if (count === 0) return "";
  const actionWord = count === 1 ? "1 thing" : `${count} things`;
  if (lessons <= 1) return `${actionWord} to bring back.`;
  return `${actionWord} to bring back, from across what you have learned.`;
}

/**
 * The territory line: what this session is about.
 *
 * It names capabilities and never French, so the preview cannot become a
 * reading of the answers the learner is about to be asked for.
 */
export function territoryLine(actions: readonly PracticeSessionAction[]): string {
  return territoryLabels(actions).join("  ·  ");
}

/**
 * What the learner worked on, in their own terms.
 *
 * Capability rather than sentence: after five minutes the honest thing to
 * report is "you practised repairing a missed line", not a list of strings and
 * certainly not a score. The French they produced is still shown beneath.
 */
export function workedOnCapabilities(
  actions: readonly PracticeSessionAction[],
): string[] {
  return territoryLabels(actions, 4);
}

/**
 * The French the learner produced or completed, in session order, de-duplicated.
 *
 * Outcome-gated, because the heading above this list claims the learner brought
 * this French back. A sentence they missed and never got right is not French
 * they brought back, and printing the model answer under that heading tells
 * them they did something they did not do -- the same dishonesty the struggle
 * note below was written to avoid, one paragraph higher up the screen.
 *
 * A miss that was later repaired stays in. The learner did bring it back; it
 * took them two passes, and the struggle note is what carries that fact.
 */
export function workedOnLines(
  actions: readonly PracticeSessionAction[],
  struggles: readonly PracticeStruggle[] = [],
): string[] {
  const unresolved = new Set(
    struggles.filter((s) => !s.repaired).map((s) => s.seedId),
  );
  const out: string[] = [];
  for (const action of actions) {
    if (unresolved.has(action.seed.id)) continue;
    const line = summaryLineOf(action.seed);
    if (line.length > 0 && !out.includes(line)) out.push(line);
  }
  return out;
}

/**
 * The one honest closing note.
 *
 * Only ever "worth another look", never a count, a score or a verdict, and
 * only when the learner actually missed something in this session.
 */
/**
 * One thing the learner actually struggled with in THIS session.
 *
 * Every rule here exists to keep the claim honest.
 *
 * Only this session's graded attempts. Never the mastery snapshot: a learner
 * who missed nothing today would otherwise be shown last week's difficulty and
 * read it as something they had just done badly.
 *
 * Never invented. A clean session gets no line at all, because "nothing to
 * report" is a real and good outcome, and manufacturing a weak point to fill
 * the space would teach the learner to distrust the ones that are real.
 *
 * A repair does not erase the miss and does not become a failure either. Both
 * facts are true and the learner is owed both: the thing needed a second pass,
 * and the second pass worked.
 *
 * One thing named, not a log. Several misses in five minutes is a normal
 * session, not a diagnosis, so the most meaningful is named and the rest are
 * acknowledged in a single clause. Production is preferred over selection when
 * choosing which: not recognising a form you were shown is a smaller fact than
 * not being able to produce it.
 */
export type PracticeStruggle = {
  itemId: string;
  seedId: string;
  surface: PracticeSurface;
  /** A later action on the same item was answered correctly. */
  repaired: boolean;
};

const PRODUCTION_SURFACES: ReadonlySet<PracticeSurface> = new Set([
  "typed",
  "context",
  "dictation",
]);

export function struggleLines(struggles: readonly PracticeStruggle[]): string[] {
  const named = struggles.filter((s) => CAPABILITY[s.itemId] !== undefined);
  if (named.length === 0) return [];

  const weight = (s: PracticeStruggle) =>
    (s.repaired ? 0 : 2) + (PRODUCTION_SURFACES.has(s.surface) ? 1 : 0);
  const chosen = [...named].sort((a, b) => weight(b) - weight(a))[0];
  const capability = CAPABILITY[chosen.itemId];

  const lines = [
    chosen.repaired
      ? `${capitalise(capability)} did not come back the first time. It did on the second pass.`
      : `Worth another pass: ${capability}.`,
  ];

  const others = named.length - 1;
  if (others === 1) lines.push("One other needed a second look too.");
  else if (others > 1) lines.push("A couple of others needed a second look too.");
  return lines;
}

function capitalise(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}


/**
 * Every learner-facing string Practice can render, for the copy guard.
 *
 * Seeds, micro-moment framing, the capability vocabulary and the component
 * copy above. If a learner can read it in Practice, it is in here.
 */
/**
 * Every shape the struggle note can take, so the guard can walk copy that is
 * assembled at runtime rather than stored. Generated copy is exactly where the
 * last drift hid: a string the guard cannot walk is a string nobody checks.
 */
export function struggleCopySamples(): string[] {
  const out: string[] = [];
  for (const itemId of Object.keys(CAPABILITY)) {
    for (const repaired of [false, true]) {
      out.push(
        ...struggleLines([
          { itemId, seedId: "sample", surface: "typed", repaired },
          { itemId, seedId: "sample-2", surface: "choice", repaired },
          { itemId, seedId: "sample-3", surface: "build", repaired },
        ]),
      );
    }
  }
  return out;
}

export function practiceLearnerStrings(
  seeds: readonly { exercise: { payload: unknown } }[],
  moments: readonly { intro: string }[],
): string[] {
  const out: string[] = [];
  for (const seed of seeds) collectLearnerStrings(seed.exercise.payload, out);
  for (const moment of moments) out.push(moment.intro);
  for (const line of Object.values(PRACTICE_UI_COPY)) out.push(line);
  for (const label of Object.values(CAPABILITY)) out.push(label);
  out.push(PRACTICE_EMPTY_LINE);
  // Copy the learner sees but the repo never stores as a literal.
  out.push(...struggleCopySamples());
  return out;
}
