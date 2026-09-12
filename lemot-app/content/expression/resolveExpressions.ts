import type { Lesson } from "../lessonTypes";
import type { CommunicativeIntent, SceneFact } from "./communicativeIntent";
import {
  EXPRESSION_CAPABILITIES,
  type ExpressionCapability,
} from "./expressionCapabilities";

/**
 * Which French the learner already has may lawfully do this job, here.
 *
 * ── The problem ────────────────────────────────────────────────────────────
 *
 * A lesson teaches today's idea and then asks for it with one hard-coded
 * answer and a few hand-written alternatives. By L6 the learner owns a dozen
 * expressions and the lesson knows about three of them, so a learner who
 * closes with "Au revoir." where the model says "Merci, au revoir." is told
 * their French did not land. The lesson has forgotten what it taught.
 *
 * ── What this is allowed to do ─────────────────────────────────────────────
 *
 * Broaden GRADING. Nothing else. It does not choose the model, reorder a
 * lesson, generate content, or decide curriculum: the author still owns the
 * objective, the primary answer, the scene and whether reuse is on at all.
 * §21 — reuse is not randomness.
 *
 * ── Conservative by construction ───────────────────────────────────────────
 *
 * False rejection annoys; false acceptance teaches bad French. So every gate
 * fails CLOSED:
 *
 *   no intent authored        → nothing derived
 *   reuse not switched on     → nothing derived
 *   scene fact not stated     → treated as not established, not as false
 *   item not reached          → refused, however natural the French
 *   expression is a piece     → refused, however reached its parts
 *
 * The last two are the ones that matter most. "Pardon, je n'ai pas compris."
 * means almost exactly what L6 wants and is refused, because `n'ai pas compris`
 * is a tense the learner has not met: meaning similarity is not reachability,
 * and a lesson that says "nothing here is new" has to be telling the truth.
 *
 * Pure: no React Native, no clock, no storage, no network, no AI, and no
 * import from any UI or Practice module.
 */

/** Why an expression was not offered. Diagnostics and tests, never learner copy. */
export type RejectionReason =
  | "intent"
  | "context"
  | "unreached"
  | "excluded"
  | "not-an-utterance"
  | "is-the-primary";
// `beyond-lesson-scope` was a rejection until this pass and is deliberately
// gone: being later than this lesson is no longer a reason to refuse French the
// learner has, only a reason not to teach it. That outcome now has a list of
// its own (`acceptanceOnly`) rather than a rejection reason, so no caller can
// read "refused" where the answer is "accepted but not surfaced".

export type ResolvedExpression = {
  readonly id: string;
  readonly surface: string;
};

export type ResolvedRejection = {
  readonly id: string;
  readonly surface: string;
  readonly reason: RejectionReason;
  /** The item that failed, when the reason is reachability. */
  readonly blockedBy?: string;
};

export type ResolvedExpressions = {
  /** The authored model. Always first, always the teaching anchor. */
  readonly primary: string | null;
  /** Author-declared alternatives, which always outrank anything derived. */
  readonly authored: readonly string[];
  /**
   * Reached, in-scope, context-valid French. SURFACEABLE: this lesson may
   * hint it, suggest it, model it, and accept it.
   */
  readonly derived: readonly ResolvedExpression[];
  /**
   * Reached, context-valid French the learner picked up AFTER this lesson.
   *
   * ACCEPTANCE ONLY, and the distinction is the whole point. A learner who has
   * finished L7 and comes back to L6 has not forgotten "À bientôt.", and being
   * marked wrong for using it correctly is Cairn pretending they did. But L6
   * must still not TEACH it: it stays out of hints, out of suggestions, out of
   * the model, out of the exposition. The lesson's curriculum is unchanged;
   * only its willingness to recognise the learner's own French is.
   *
   * Surfacing this list is a bug. `surfaceableSurfaces` exists so a caller has
   * to choose which question it is asking.
   */
  readonly acceptanceOnly: readonly ResolvedExpression[];
  /** Everything considered and refused, with the reason. Not learner-facing. */
  readonly rejected: readonly ResolvedRejection[];
};

export type ResolveInput = {
  /** The job this screen asks the learner to do. No intent, no derivation. */
  readonly intent?: CommunicativeIntent;
  /** Facts the AUTHOR stated about the scene. Absence means "not established". */
  readonly scene?: readonly SceneFact[];
  /** Items the learner has reached. The hard ceiling. */
  readonly reached: ReadonlySet<string>;
  /**
   * How far along the path this screen sits, as a lesson number.
   *
   * A second, independent ceiling, and not redundant with `reached`: a learner
   * replaying L6 after finishing L7 HAS reached "à bientôt", and offering it
   * inside a lesson that claims to use nothing new would still be a lie about
   * the lesson. Reach is about the learner; scope is about the lesson.
   */
  readonly lessonScope?: number;
  /** The authored model answer. */
  readonly primary?: string | null;
  /** Author-declared accepted alternatives. Always kept, never second-guessed. */
  readonly authoredAlternatives?: readonly string[];
  /** Expression ids the author has ruled out for this screen specifically. */
  readonly exclusions?: readonly string[];
  /** Off by default. An author opts a screen in; nothing opts in globally. */
  readonly reuse?: boolean;
  /** The table to resolve against. Defaults to the shipped one. */
  readonly capabilities?: readonly ExpressionCapability[];
  /** itemId → the lesson number that first teaches it. From `firstLessonIndex`. */
  readonly firstLesson?: ReadonlyMap<string, number>;
};

/**
 * itemId → the number of the earliest lesson that teaches it.
 *
 * THE one reachability source, derived from the curriculum rather than
 * restated beside it. Pure, so a test can build it from a fixture and a runtime
 * can build it from the shipped lessons, and neither can disagree with the
 * other about when a piece becomes lawful.
 */
export function firstLessonIndex(
  lessons: readonly Lesson[],
): ReadonlyMap<string, number> {
  const out = new Map<string, number>();
  for (const lesson of [...lessons].sort((a, b) => a.number - b.number)) {
    for (const item of lesson.learningItems ?? []) {
      const seen = out.get(item.id);
      if (seen === undefined || lesson.number < seen) out.set(item.id, lesson.number);
    }
  }
  return out;
}

/** Fold for "is this the same sentence as the primary". Punctuation-insensitive. */
function sameAs(a: string, b: string): boolean {
  const fold = (v: string) =>
    v
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[.,!?;:]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  return fold(a) === fold(b);
}

export function resolveEligibleExpressions(input: ResolveInput): ResolvedExpressions {
  const {
    intent,
    reached,
    lessonScope,
    primary = null,
    authoredAlternatives = [],
    exclusions = [],
    reuse = false,
    capabilities = EXPRESSION_CAPABILITIES,
    firstLesson,
  } = input;

  const authored = [...authoredAlternatives];
  const base: ResolvedExpressions = {
    primary,
    authored,
    derived: [],
    acceptanceOnly: [],
    rejected: [],
  };

  // Two doors, both shut by default. A screen with no authored intent, or with
  // reuse switched off, resolves to exactly what its author wrote — which is
  // what every screen in the curriculum does today, and must keep doing until
  // someone opts it in.
  if (!reuse || intent === undefined) return base;

  const scene = new Set<SceneFact>(input.scene ?? []);
  const excluded = new Set(exclusions);
  const derived: ResolvedExpression[] = [];
  const acceptanceOnly: ResolvedExpression[] = [];
  const rejected: ResolvedRejection[] = [];

  for (const capability of capabilities) {
    const { id, surface } = capability;

    if (!capability.intents.includes(intent)) continue; // not even a candidate

    if (excluded.has(id)) {
      rejected.push({ id, surface, reason: "excluded" });
      continue;
    }

    // §8/§24: every token being reached does not make a fragment an answer.
    if (capability.completeness !== "utterance") {
      rejected.push({ id, surface, reason: "not-an-utterance" });
      continue;
    }

    // The primary and its punctuation variants are the authored anchor, not a
    // derived alternative — "That works." must never be said about the model.
    if (
      (primary !== null && sameAs(surface, primary)) ||
      authored.some((a) => sameAs(surface, a))
    ) {
      rejected.push({ id, surface, reason: "is-the-primary" });
      continue;
    }

    const unreached = capability.itemIds.find((itemId) => !reached.has(itemId));
    if (unreached !== undefined) {
      rejected.push({ id, surface, reason: "unreached", blockedBy: unreached });
      continue;
    }

    // Scene constraints. Reached French does not override context: a learner
    // who owns "À bientôt." and says it to someone they will never see again
    // is still saying something untrue, whatever lesson they are in.
    const missing = (capability.requires ?? []).find((fact) => !scene.has(fact));
    if (missing !== undefined) {
      rejected.push({ id, surface, reason: "context" });
      continue;
    }

    // Lesson scope, which is now a SURFACING ceiling rather than an acceptance
    // one. This is the correction to the previous pass's over-conservative
    // contract: it rejected French outright, which meant a learner replaying L6
    // after L7 was marked wrong for a sentence L7 had taught them. Teaching and
    // recognising are different acts, so they get different answers — the
    // lesson still surfaces only its own curriculum, and the grader stops
    // pretending the learner forgot.
    const later =
      lessonScope !== undefined && firstLesson !== undefined
        ? capability.itemIds.find((itemId) => {
            const taught = firstLesson.get(itemId);
            return taught === undefined || taught > lessonScope;
          })
        : undefined;
    if (later !== undefined) {
      acceptanceOnly.push({ id, surface });
      continue;
    }

    derived.push({ id, surface });
  }

  return { primary, authored, derived, acceptanceOnly, rejected };
}

/**
 * The one thing a lesson screen is handed: more strings its grader will accept.
 *
 * Deliberately the SAME shape the author already writes, so nothing downstream
 * learns about intents, scenes or the learner. The screen cannot tell a derived
 * alternative from an authored one, which is the point: the resolver widens
 * what counts as a good answer and changes nothing about how one is judged.
 *
 * Includes the acceptance-only list, because ACCEPTING is what this is for.
 */
export function derivedAlternativeSurfaces(resolved: ResolvedExpressions): string[] {
  return [...resolved.derived, ...resolved.acceptanceOnly].map((d) => d.surface);
}

/**
 * What this lesson may show the learner before they answer.
 *
 * The narrow half of the same resolution: hints, suggested pieces, exposition,
 * anything proactive. It excludes `acceptanceOnly` by construction, so an
 * earlier lesson can never start teaching a later one's French to a learner who
 * happens to have gone ahead — and the two lists cannot be confused, because
 * asking for one is a different function call than asking for the other.
 */
export function surfaceableSurfaces(resolved: ResolvedExpressions): string[] {
  return resolved.derived.map((d) => d.surface);
}
