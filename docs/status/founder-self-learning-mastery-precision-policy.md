# Founder Self-Learning Build — Mastery Precision Policy

**Date:** 2026-06-04
**`main` HEAD at write time:** `203f817`
**Scope:** Foundation behavior of the local mastery reducer (`content/learning-engine/mastery.ts`).
**Status:** Foundation precision policy **implemented**; staged strictness **documented, not implemented**.
**PARTIALLY SUPERSEDED — 2026-07-26.** This remains a **dated historical status record of what landed on
2026-06-04** and its body is preserved as evidence. Two parts no longer state current canon:
(a) the **four-bucket semantics and the fixed three-tag precision list** in §2 are **superseded by
founder decision FQ-1** — polarity is determined by semantic effect, no technical tag decides it, and an
event whose meaning is unknown establishes neither weakness nor full precision credit;
(b) §4's *"should be reconciled in a later docs pass"* item is **CLOSED by founder decision FQ-5** —
counters are the source of truth and **"9-state mastery" is `SUPERSEDED`**, not pending.
Authority: `docs/bibles/mastery-evidence/MASTERY_EVIDENCE_FOUNDER_RATIFICATION_v0.1.md` §2, §4d, §4f.
**No code, threshold, tag or runtime change is authorized by this note.**

> Code + docs alignment patch. Touches only the pure mastery reducer and this note — no
> renderer/route/event/`LearningEvent`/`LocalRepository`/session-controller/`grade()`/validator/
> fixture/content/schema change, no Supabase/network/AI, no Mon Lexique / Practice Pool / Daily
> Review, no P4. Resolves the near-miss follow-up recorded in
> [`founder-self-learning-p3-learner-renderer-checkpoint.md`](./founder-self-learning-p3-learner-renderer-checkpoint.md) §6.2.

---

## 1. Previous behavior

The mastery reducer classified every `event.result` as **success** (`correct` / `accepted_variant`),
**skip** (`empty_or_skip`), or — for everything else — **failure**. That "everything else" branch
swept in the near-miss tags:

- `punctuation_only`
- `accent_only`
- `spelling_near_miss`

So a meaning-preserving slip (a missing accent, a stray comma, a one-letter spelling wobble) counted
as a **full failure**: it incremented `wrongCount` / `productionFailure` / `recognitionFailure`, added
`weakTags`, could flip the item to **weak** after the threshold, and stepped the **leitner box** and
**prompt-fade level** down.

## 2. New foundation behavior

> [!historical] **Superseded semantics (2026-07-26).** Everything in this section is the behaviour
> **as designed on 2026-06-04**. It was later changed in code by audit **B7** / PR-E1 #193 (which
> removed `spelling_near_miss` from the precision set), and superseded in **semantics** by founder
> decision **FQ-1**: a **technical bucket does not settle pedagogical polarity**. Current code uses
> **five** technical result buckets. Preserved verbatim below as the original record.

`event.result` is now classified into **four** buckets:

| Bucket | Tags | Effect |
|---|---|---|
| **Success** | `correct`, `accepted_variant` | success counter; leitner box + prompt-fade **advance** |
| **Precision / near-miss** | `punctuation_only`, `accent_only`, `spelling_near_miss` | **soft signal** (see below) |
| **Skip** | `empty_or_skip` | `skipCount++`; neutral otherwise |
| **Failure** | all other `ErrorTagCode` values | failure counter; weakTags; box + prompt-fade **step down** |

**Near-miss is now a precision signal, not a full failure.** A precision event:

- still increments `seenCount` and `lastSeenAt`;
- still increments the attempt counter (`productionAttempts` or `recognitionAttempts` by operation);
- increments the new **`precisionCount`** and **`precisionTags`** (`Partial<Record<ErrorTagCode, number>>`,
  the near-miss subtype(s) carried by the event);
- does **NOT** increment `wrongCount`, `productionFailure`, `recognitionFailure`, or `weakTags`;
- does **NOT** make the item `isWeak`;
- does **NOT** lower `promptFadeLevel`;
- does **NOT** lower `leitnerBox`;
- does **NOT** count as `productionSuccess` / `recognitionSuccess` (so it never auto-adds to Mon Lexique);
- leaves `practiceEligibility` able to reach `build` (because `seenCount > 0`), never jumping to `challenge`.

**Leitner / `dueAt` for near-miss (conservative neutral):** the box is left **unchanged** (no demotion,
no promotion); `dueAt` is refreshed at the **current** box using `event.timestamp` — the same neutral
treatment a `skip` already gets. No new or complex scheduling is introduced.

### Why

This prevents early / foundation-stage learners from being **silently punished** for meaning-preserving
accent / punctuation / small-spelling slips, which would otherwise drag an item toward "weak" and claw
back its prompt-fade and spacing despite the learner clearly knowing the word.

**This does not mean accents are optional forever.** Near-miss is *recorded* (`precisionCount` /
`precisionTags`) precisely so later stages can tighten strictness without losing the signal.

## 3. Future staged strictness (documented, NOT implemented)

Strictness should **increase over time**, not be globally forgiven forever. None of the following is
implemented in this patch; they are the planned levers for a later, separately-reviewed change:

- **Lesson band** — later bands (e.g. L60+/L70+) may promote near-miss toward partial or full failure.
- **Monolingual / French-first phase** — once the learner is in a French-first phase, precision should matter more.
- **`promptFadeLevel`** — at higher fade (less scaffolding), a near-miss may be treated more strictly.
- **Item maturity / repeated exposure** — a well-practiced item may stop forgiving the same slip.
- **Future item metadata such as `accentCriticality`** — items where an accent changes meaning
  (e.g. minimal pairs) may treat `accent_only` as failure even early. (No such field exists yet; adding
  it is a deliberate future schema change, not part of this patch.)

These levers would likely live as a small policy function over `(event, item, lessonBand, phase, …)`,
keeping the reducer pure and deterministic.

## 4. Mastery model note (9-state vs counter-derived)

> [!canon] **CLOSED 2026-07-26 by founder decision FQ-5.** The reconciliation this section defers is
> **settled**: counter-derived evidence projection **is** the semantic source of truth; **no universal
> named mastery ladder exists**; the phrase **"9-state mastery" is `SUPERSEDED`**. Purpose-specific
> projections remain allowed only where they name their purpose and mapping. **No "later docs pass" is
> outstanding.** The paragraph below is preserved as the 2026-06-04 record.

Some conceptual material elsewhere describes mastery as a **"9-state"** progression. That language is
**conceptual only**. The **source of truth today is the counter-derived `MasterySnapshot`** produced by
`scoreEvents()` — per-item counters (`seenCount`, success/failure, `precisionCount`, `weakTags`, …) that
project deterministically into `isWeak`, `monLexiqueStatus`, `practiceEligibility`, `leitnerBox`,
`promptFadeLevel`, and `dueAt`. The 9-state framing should be **reconciled with** this counter-derived
projection in a later docs pass; until then, the counters win.

## 5. What changed in code

- `content/learning-engine/mastery.ts`
  - `ItemMastery` gains `precisionCount: number` and `precisionTags: Partial<Record<ErrorTagCode, number>>`.
  - `MASTERY_SNAPSHOT_VERSION` bumped `mastery-v0.1` → `mastery-v0.2` (shape changed; the snapshot is
    recomputed from events each run and is not persisted, so no migration is required).
  - New `NEAR_MISS_TAGS` set + `isNearMiss` classifier + `addPrecisionTags` helper.
  - A precision branch added to both the production and recognition paths; `scoreEvent` doc-comment updated.

Purity, idempotency (by `clientEventId`), and the no-mutation guarantee are unchanged.

## 6. Non-goals (this patch)

- No lesson-band thresholds, no L60/L70 strictness, no `accentCriticality`, no monolingual-phase strictness.
- No renderer/route/event/repository/controller/`grade()`/validator/fixture/content/schema change.
- No Supabase/network/AI; no Mon Lexique / Practice Pool / Daily Review; no P4.
