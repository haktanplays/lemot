/**
 * Micro-moments — the descendant of the old Combine + Mini Conversation, with
 * no AI and no interlocutor.
 *
 * A moment is two or three actions the learner already meets separately, played
 * in an order that makes them one human situation: reach the counter, order,
 * then lose the answer and ask again. Nothing new is authored for them, which is
 * the point — the connective tissue is the ORDER, not more content.
 *
 * Deliberately NOT `ActivityChain`. That container holds lesson screens and
 * exists to keep lesson evidence identity intact; borrowing it here would mean
 * either re-teaching it about practice identity or risking the very
 * lesson-progress landmine V1 repaired. A moment needs none of that: its steps
 * are ordinary practice seeds that grade and record exactly as they would
 * standing alone, and this file only says which ones belong together.
 *
 * At most one per session, and only when every step is lawful for the learner.
 * A session where everything is a roleplay is as monotonous as one where
 * nothing is.
 */
import type { PracticeSeed } from "./practiceTypes";

export type PracticeMoment = {
  id: string;
  /** The situation shown once, above every step. Never restates a step. */
  intro: string;
  /** Two or three seed ids, in the order the moment happens. */
  seedIds: readonly string[];
};

export const PRACTICE_MOMENTS: readonly PracticeMoment[] = [
  {
    id: "moment-the-counter",
    intro: "One coffee, from walking up to walking away, including the part that goes wrong.",
    seedIds: [
      "p-l1-repair-opener-back-turned",
      "p-l1-produce-order-coffee",
      "p-l1-apply-too-fast",
    ],
  },
  {
    id: "moment-finding-the-room",
    intro: "Your first morning in the building, and the room is not where you were told.",
    seedIds: [
      "p-l10-build-the-morning",
      "p-l10-repair-lost-the-thread",
      "p-l10-repair-say-so-and-ask-again",
    ],
  },
  {
    id: "moment-on-the-way-out",
    intro: "Your coat is on, and two people still want a word before you go.",
    seedIds: [
      "p-l7-apply-decline-and-go",
      "p-l7-apply-yes-then-go",
      "p-l7-build-go-and-close",
    ],
  },
  {
    id: "moment-asking-for-a-break",
    intro: "Two hours in, flagging, and not wanting the day to end. Just a pause.",
    seedIds: [
      "p-l9-choice-pause-or-end",
      "p-l9-build-ask-politely",
      "p-l9-apply-ask-and-say-why",
    ],
  },
  {
    id: "moment-arriving-expected",
    intro: "You are expected, nobody has noticed you yet, and the coffee is already going.",
    seedIds: [
      "p-l2-produce-arrive-excuse",
      "p-l2-apply-called-from-next-room",
      "p-l2-apply-arrive-and-order",
    ],
  },
  {
    id: "moment-down-the-corridor",
    intro: "Someone is working their way down the corridor, asking at every door.",
    seedIds: [
      "p-l3-produce-not-this-room",
      "p-l3-apply-not-that-place",
      "p-l3-apply-answer-yes",
    ],
  },
  {
    id: "moment-late-and-hungry",
    intro: "You arrive late, you have not eaten, and you still have things to say.",
    seedIds: [
      "p-l4-apply-here-and-hungry",
      "p-l4-produce-open-a-question",
      "p-l4-build-cut-in-with-an-idea",
    ],
  },
  {
    id: "moment-the-long-meeting",
    intro: "A meeting, a drink you did not want this morning, and two things worth saying.",
    seedIds: [
      "p-l5-apply-two-packages-context",
      "p-l5-produce-have-with-package",
      "p-l5-apply-idea-context-only",
    ],
  },
  {
    id: "moment-in-ask-out",
    intro: "The whole visit, from the door opening to the door closing, including the part you miss.",
    seedIds: [
      "p-l6-apply-step-in-whole",
      "p-l6-apply-say-so-and-ask-again",
      "p-l6-build-close-warmly",
    ],
  },
  {
    id: "moment-finding-your-way",
    intro: "Your first time in the building, and by the end someone is asking you.",
    seedIds: [
      "p-l8-apply-ask-context-only",
      "p-l8-produce-check-the-door",
      "p-l8-apply-answer-the-asker",
    ],
  },
];

/**
 * The moment a seed belongs to, if any.
 *
 * Membership rather than "does it open one": if the selector has already
 * decided to work this language today, and that work happens to be a beat in an
 * authored scene, the scene is worth playing from its beginning. Requiring the
 * OPENING beat to be selected made moments almost never fire — they existed in
 * the pool and never in a session.
 */
export function momentContaining(
  seedId: string,
  moments: readonly PracticeMoment[] = PRACTICE_MOMENTS,
): PracticeMoment | null {
  return moments.find((m) => m.seedIds.includes(seedId)) ?? null;
}

/** Resolve a moment's steps against the pool, or null if any is missing. */
export function momentSeeds(
  moment: PracticeMoment,
  seeds: readonly PracticeSeed[],
): PracticeSeed[] | null {
  const out: PracticeSeed[] = [];
  for (const id of moment.seedIds) {
    const seed = seeds.find((s) => s.id === id);
    if (!seed) return null;
    out.push(seed);
  }
  return out;
}
