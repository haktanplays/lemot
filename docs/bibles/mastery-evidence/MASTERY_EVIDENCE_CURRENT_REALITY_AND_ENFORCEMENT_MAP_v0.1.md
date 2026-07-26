---
title: Mastery & Evidence Current Reality and Enforcement Map v0.1
version: 0.1
status: Draft — supporting record for the Mastery & Evidence Bible v1.0 Draft
authority: none — Axis B description only. Nothing here is a decision or an intent.
owner: Mastery & Evidence
created: 2026-07-26
axis: B (current implementation reality)
---

# Mastery & Evidence — Current Reality and Enforcement Map v0.1 — DRAFT

**This file is Axis B only.** It records what the repository contains **today**. Nothing here is a
semantic ruling, and promoting the Bible does **not** canonize anything in this file.

> **Rounds 1–2 founder decisions (2026-07-26) changed no fact in this file.** All eight questions are
> answered; **every runtime description below is unchanged**. Only `⚠ DIVERGENCE` annotations were
> added, recording where current behaviour differs from ratified semantics. **No runtime correction was
> authorized**, and none was made. A `⚠ DIVERGENCE` marker is a record of non-conformance, **never a
> work item**.

Two words are used strictly:

- **Tested** = a unit test exercises it.
- **Shipped** = a real tester on the dev-apk build experiences it.

**Tested does not imply shipped.** Almost nothing in this domain is both.

---

## 0. The governing fact

| | |
|---|---|
| **Statement** | The shipped surface emits **no** `LearningEvent`. Therefore **no evidence exists in production.** |
| Source path | `lemot-app/config/productStage.ts`; `lemot-app/app/lesson/[id].tsx`; `docs/status/founder-self-learning-p3-learner-renderer-checkpoint.md` §3 |
| Reference | `FEATURES_BY_STAGE` — `v1LessonEngine: true` in `sandbox`, `false` in `dev-apk`, `false` in `public-beta` |
| Member audit | **All three product stages read.** Exactly one enables the engine. No fourth stage exists. |
| Implementation | Engine fully implemented |
| Enforcement | Fail-closed stage resolution (an unset/mistyped env resolves to `dev-apk`, not `sandbox`) |
| Test | `productStage` fail-closed behaviour tested |
| Shipped | **The engine is not reachable in any shipping stage** |
| Intent or implementation? | Implementation reality only |
| Known divergence | Every canonical evidence rule in the domain describes a system real users cannot reach |
| Future owning layer | Engineering (integration), Product (stage exposure) |

---

## 1. Event stores

| Store | Key | Contents | Status |
|---|---|---|---|
| Engine event log | `lm_le_events` | `LearningEvent[]`, append-only | Implemented, sandbox-only, tested |
| Engine snapshot cache | `lm_le_snapshot` | compaction cursor + folded `MasterySnapshot` | Implemented, tested (`compaction.test.ts`), not primary truth |
| Corrupt-log backup | `lm_le_events__corrupt` | preserved raw blob on parse failure | Implemented (audit B2/B3 remediation) |
| Telemetry | `lm_le_telemetry` | 15 content-debugging event types | Implemented; **never updates mastery** |
| **Legacy progress** | `lm7` | `{p, err, dr:{date,count}}` | **Shipped** |
| **Legacy SRS** | `lm7_srs` | Leitner cards for practice scenarios | Implemented; `FEATURES.practice=false` in dev-apk |

- Source paths: `repository/local.ts:36-39`, `telemetry.ts:26`, `hooks/useStorage.ts`, `hooks/useSRS.ts`
- Known divergence: `lm7` / `lm7_srs` are **unversioned** (audit B18) — no migration path.
- Future owning layer: Engineering.

## 2. Event shape

`LearningEvent` (`events.ts:107-126`): `clientEventId` · `sessionId` · `lessonId` · `exerciseId` ·
`operation` · `itemIds[]` · `promptLevel` · `attemptNumber` · `userAnswer` · `expectedAnswer` ·
`normalizedAnswer` · `result` · `errorTags[]` · `timestamp` · `contentVersion` · `appBuild` ·
`deviceInfo` · `sync{status, origin, queuedAt}`.

- **Fields that do not exist:** hint level · assistance used · error source · admissibility ·
  evidence strength · confidence · invalidation.
- `userAnswer` stores **raw learner text** inside the evidence record.
- Implementation: types only, no runtime. Tested indirectly. Not shipped.
- Divergence: §12 of the Bible (assistance) and §7 (attribution) are unimplementable against this shape.
- **⚠ DIVERGENCE (added 2026-07-26).** Founder FQ-6 ratified admission refusal plus an append-only
  compensating invalidation record. **No such mechanism exists**: the event shape has no error-source,
  admissibility or invalidation field, there is no compensating record type, and no reconciliation
  path. The ratified rule is **semantics only** — schema, event names, cache invalidation,
  reconciliation and storage remain **undecided Engineering questions**. **Nothing was built.**
- Future owning layer: Engineering (shape), Privacy (`userAnswer` retention).

## 3. Reducers

| Reducer | Path | Purity | Test | Shipped |
|---|---|---|---|---|
| `scoreEvent` / `scoreEvents` | `mastery.ts:189-323` | Pure, idempotent by `clientEventId`, no `Date.now` | `mastery.test.ts`, `nearMissMasteryTiming.test.ts` | ✘ |
| `grade` | `grade.ts:121-226` | Pure, registry-free | `gradeAnswerCheck.test.ts` | ✘ |
| `selectLessonProgress` | `lesson-progress.ts` | Pure | `lessonProgress.test.ts` | ✘ |
| `compactEvents` | `compaction.ts` | Pure, reuses the shipped reducer | `compaction.test.ts` | ✘ |

Intent-or-implementation: implementation. Future owning layer: Engineering.

## 4. Result buckets

**Five**, verified by reading every branch of `scoreEvent`:

| Bucket | Members | Counters | Box | PF | `dueAt` |
|---|---|---|---|---|---|
| Success | `correct`, `accepted_variant` | success++ (+`lastProducedAt` if production) | +1 (max 4) | +1 (max 3) | box interval |
| Precision | `punctuation_only`, `accent_only` | `precisionCount`++, `precisionTags`++ | — | — | **due now** |
| Spelling near-miss | `spelling_near_miss` | **`weakTags`++** | — | — | **due now** |
| Skip | `empty_or_skip` | `skipCount`++ | — | — | **due now** |
| Failure | the other 11 codes | failure++, `wrongCount`++, `weakTags`++ | −1 (min 0) | −1 (min 0) | box interval |

- Source: `mastery.ts:129-145, 199-277`
- **Known divergence: ADR-0021 says four buckets and places `spelling_near_miss` in Precision.** The
  code implements five and treats it as weakness-accruing (audit B7). Three further documents repeat
  the ADR's version.
- **⚠ DIVERGENCE (added 2026-07-26).** Founder FQ-1 ruled that polarity is determined by **semantic
  effect**, and that an **ambiguous event may not establish weakness**. The reducer accrues `weakTags`
  for **every** `spelling_near_miss`, including events whose meaning is unknown — so **current
  behaviour differs from founder semantics wherever meaning is not attributable**. This behaviour is
  **provisional and non-conforming**. **No runtime correction was authorized.**
- Intent or implementation: **implementation, contradicting both an active ADR and (where meaning is
  unknown) the founder rule.** Not a resolution.
- Future owning layer: Mastery & Evidence (semantics, ratified) / Engineering (mechanism, unopened).

## 5. Counters

`seenCount` · `recognitionAttempts/Success/Failure` · `productionAttempts/Success/Failure` ·
`wrongCount` · `skipCount` · `precisionCount` · `precisionTags` · `weakTags` · `lastSeenAt` ·
`lastProducedAt` · `isWeak` · `promptFadeLevel` · `leitnerBox` · `dueAt` · `monLexiqueStatus` ·
`practiceEligibility`. Snapshot version `mastery-v0.2`. All counters are monotone increments; only
`leitnerBox` and `promptFadeLevel` decrease.

Source: `mastery.ts:45-80`. Tested. Not shipped.

**⚠ DIVERGENCE (added 2026-07-26).** Founder FQ-4 ratified a split between **`currently weak`
(recoverable)** and **`ever weak` (persistent caution)**. **Neither exists.** Because every counter is a
monotone increment, once `wrongCount >= 3` an item is weak **permanently**, regardless of later success
— **weakness is permanent due to monotone counters**. The founder confirmed this is **Axis-B reality,
not intended semantics**. Of five weakness members (current · historical · repair completed · spaced
confirmation completed · chronic), **0 of 5 are represented**. **No code change was authorized.**
Future owner: Mastery & Evidence (semantics) / Engineering + Curriculum (clearing conditions).

## 6. Weak thresholds

| System | Rule | Key | Shipped |
|---|---|---|---|
| Engine | `wrongCount >= 3` OR any single `weakTags` counter `>= 3` (`WEAK_THRESHOLD = 3`) | `ItemId` | ✘ |
| **Legacy** | `>= 3` entries with the same **correct-answer string** | answer string | **✔** |

- Source: `mastery.ts:26, 279-281`; `hooks/useErrors.ts:34-45`
- Divergence: same number, different key, different store, and the legacy path performs **no
  attribution** — every logged wrong answer counts.
- Neither value has a founder decision behind it.
- **⚠ DIVERGENCE (added 2026-07-26).** Under founder FQ-8 **both** systems are inside the Bible's
  domain. The legacy shipped tracker performs no attribution and is therefore **non-conforming** with
  the ratified attribution rule; it is recorded as **legacy-active, frozen, intended for replacement,
  and explicitly NOT authorized for modification.** Nothing about it changed.
- Future owning layer: Mastery & Evidence (threshold class), Engineering (replacement/convergence).

## 7. Weak tags

`weakTags` accrues `event.result` plus every member of `event.errorTags`, de-duplicated per event
(`mastery.ts:147-151`). Separately, a **27-value `WEAK_POINT_TAGS`** pedagogical taxonomy exists
(`content/weakPointTags.ts` — count verified: 27). A frozen manifest holds **54 tags** total
(`shipped-error-tags.json` — value verified from the file: `tags: 54`).

Enforcement: **bidirectional `validate:content` hard error** (a dropped shipped tag errors; an
unregistered new tag errors). Tested (`shippedErrorTags.test.ts`). **This is the only rule in the
domain enforced at build time in a shipping configuration.** Future owner: Engineering.

## 8. Leitner boxes and intervals

| System | Intervals | Advance | Demote |
|---|---|---|---|
| Engine | `[0, 1, 3, 7, 30]` days, boxes 0–4 | `min(box+1, 4)` | `max(0, box-1)` |
| **Legacy `useSRS`** | `[0, 1, 3, 7, 30]` days, boxes 0–4 | `min(box+1, 4)` | **reset to 0** |

- Source: `mastery.ts:29-32`; `hooks/useSRS.ts:26,131,156`
- **Identical intervals, different demotion rule.** The similarity makes them easy to mistake for one
  system; they are two.
- Neither interval set has a founder decision behind it. Both `TUNABLE`.
- Future owning layer: Mastery & Evidence (semantics), Curriculum (pacing).

## 9. Prompt-fade levels

`PF_LEVELS = ["PF0","PF1","PF2","PF3"]`, `MAX_PF_INDEX = 3`; +1 on success, −1 on failure, unchanged
on precision / spelling near-miss / skip. Source `mastery.ts:34-40, 219-272`. Tested. Not shipped.
Carried on the event as `promptLevel`.

**⚠ DIVERGENCE (added 2026-07-26).** Founder FQ-3 ratified that **assistance changes what a success
proves** and that **prompt-fade history is not a substitute for attempt-level assistance attribution**.
**Assistance is not captured**: of eight assistance members (unaided · hint L1 · hint L2 · reveal ·
model answer · prompt-fade history · AI support · unknown), **only prompt-fade reaches the event — 1 of
8 — and the founder rule explicitly rules it insufficient.** The level count is `TUNABLE` (FQ-7) and
**not founder-ratified**. **No field was added and none was authorized.**
Future owner: Mastery & Evidence (semantics) / Engineering + UX (fields, representation).

## 10. Due-date behaviour

`dueAt = keepDueNow ? event.timestamp : event.timestamp + LEITNER_INTERVAL_DAYS[box] * DAY_MS`, where
`keepDueNow = precision || spellingNearMiss || skip` (`mastery.ts:204-206, 273-277`; audit B12).
Tested (`nearMissMasteryTiming.test.ts`). Not shipped. Known divergence: audit B12 called the skip case
"questionable"; it was never separately decided. Future owner: Mastery & Evidence.

## 11. Precision handling

`PRECISION_TAGS` = **exactly two** members: `punctuation_only`, `accent_only` (`mastery.ts:141-144`).
A precision event increments `precisionCount` and `precisionTags` and the relevant attempt counter, and
touches nothing else. **Member audit: both members read; `spelling_near_miss` verified absent from the
set.** Divergence: §4 above.

**⚠ DIVERGENCE (added 2026-07-26, widened by the FQ-1 clarification).** The set is defined by *tag*,
not by *meaning*. Under FQ-1 as clarified that is the wrong axis for **every** member: `accent_only` is
treated as unconditionally precision, but `ou`/`où`, `a`/`à`, `sur`/`sûr` are meaning-changing;
**`punctuation_only` must likewise be evaluated against the authored target**, because punctuation can
change the communicative act. **Tag classification is too coarse for founder semantics — 0 of 3 tags is
individually determinate.** The Round-1 `accent_only` open item is **closed by generalization**.
**Recorded as fact; no code change authorized.** Future owner: Mastery & Evidence (semantics) /
Content + Engineering (classification, unauthored).

## 12. Skip handling

`empty_or_skip` → `skipCount++`, otherwise neutral; item stays due now. Reached from `grade()` for a
null, empty, or whitespace-only answer. Tested. Not shipped. Future owner: Mastery & Evidence.

## 13. Recognition counters

`recognitionAttempts` / `recognitionSuccess` / `recognitionFailure`. **Anything not in `PRODUCTION_OPS`
is counted as recognition**, including — defensively — any reveal or non-production operation.
A recognition success advances box and prompt-fade **identically** to a production success.
Divergence: canon asserts differential evidence weight (ADR-0022, Lesson Flow Canon §5.3/§5.5); the
reducer has none.

**⚠ DIVERGENCE (added 2026-07-26).** Founder FQ-2 ratified that **production is stronger than
recognition for independent use** and that **recognition-only evidence must never independently reach
the longest review interval or the strongest mastery claim**. **Recognition and production currently
advance boxes equally**, so a recognition-only item can reach the 30-day box — **directly
non-conforming**. The reducer implements **no weighting of any kind**. **No code change was authorized.**
Future owner: Mastery & Evidence (semantics, ratified) / Engineering (algorithm, unauthored).

## 14. Production counters

`PRODUCTION_OPS` = **exactly four**: `fill`, `build`, `register_switch`, `context_chain`
(`mastery.ts:87-92`). **Member audit: all four read; the set has no other member.** `productionSuccess`
additionally stamps `lastProducedAt` and is the sole gate for Mon Lexique `added`.

## 15. Mon Lexique projection

`selectMonLexiqueEntries` (`mon-lexique.ts`) projects registry + snapshot into learner-safe rows: `fr`,
`en`, coarse status (`added` / `weak`), timestamps, eligibility, `needsPractice`. `itemId` and `dueAt`
are carried `@internal`. `hidden` items and unresolvable registry entries are excluded. Deterministic
ordering: weak before added, then `lastProducedAt` desc, then `itemId` asc.

Implementation: complete. Tested. **Shipped: no** — `FEATURES.monLexique = false` in dev-apk; the P4 UI
shell is sandbox-gated. Structural guarantee: the module takes no event log and writes nothing, so
opening Mon Lexique cannot move mastery. Future owner: Mastery & Evidence (semantics), Product (stage).

## 16. Practice eligibility

`isWeak → challenge`; else `productionSuccess > 0 → stretch`; else `recognitionSuccess > 0 || seenCount
> 0 → build`; else `none` (`mastery.ts:291-298`). Verified derived invariants: `challenge ⟹ isWeak`;
a precision-only item can reach `build` but never `challenge`. `selectPracticePoolBuckets`
(`practice-pool.ts`) sorts due-first then by `dueAt`, excluding `none`. Tested. Not shipped.

## 17. Practice selection

`selectTodaysSet` (`practice-selector.ts`): budget clamped to `[5, 8]`; order = due (oldest first) →
weakest weak-point tag → greedy diversity pass capping consecutive same-family picks at 2; all ties
break on `itemId`. Header states explicitly: *"SELECTION weight only … It never scores anything."*
Tested (`practiceSelector.test.ts`). Not shipped. This is the **only** place canon's evidence/selection
separation is structurally enforced.

## 18. Repair logic

**Does not exist.** No `repairEligible` field, no repair branch in the reducer, no spaced-confirmation
scheduler. `telemetry.ts` names `repair_*` as *future* event types — **member audit: the 15 shipped
telemetry types were read and contain no `repair_*` member.** Repair is `[LOCKED DEFAULT]` policy with
zero implementation. Future owner: Mastery & Evidence (semantics), Engineering (mechanism).

## 19. Decay logic

| Mechanism | Where | Live? |
|---|---|---|
| Leitner due-date advance | `mastery.ts` | Engine only |
| Time-based strength decay | **absent from the reducer** | — |
| Half-life decay (5 d default, 14 d strong) | `lexique-memory.ts:38-39` | Fixture/spec-only, **unwired** |
| Weakness residual floor (`WEAKNESS_K 2.0`, floor `0.15`) | `lexique-memory.ts:35,37,182-183` | Fixture/spec-only, **unwired** |

**⚠ DIVERGENCE (added 2026-07-26).** **No universal state ladder exists in runtime** — and under
founder FQ-5 none should: counters are the source of truth, and the **eight lifecycle statuses were
explicitly NOT adopted** as universal vocabulary. Runtime therefore *conforms by absence, not by
design*. Separately, **all exact constants below are implementation values only**: FQ-7 ratified their
class as `TUNABLE` and **founder-ratified no value**; FQ-2 classified the weights as **candidate values
only**. **Nothing here is Canonical.**

`lexique-memory.ts` also defines evidence weights (production 1.0 · recognition 0.25 · transfer 0.7 ·
recombination 0.7 · repair 0.5), thresholds (0.4 / 0.7) and 8 intrinsic lifecycle statuses with
`recycled` deliberately excluded and its absence test-asserted. Counters whose source events do not
exist yet (transfer, recombination, repair) enter via an explicit `future` argument defaulting to
0/null — **nothing is faked.** Tested (`lexiqueMemory.test.ts`). Not shipped, not wired.

## 20. Aggregation

- Idempotent by `clientEventId` (`mastery.ts:193-196`).
- **`context_chain` bounded credit (audit B23 / PR-E2):** a chain emits one graded event per step, each
  carrying the full target set. The **session controller** de-duplicates *repeated successes within one
  chain attempt* — the first success carries the targets, later successes carry none — while **every**
  non-success outcome always carries the targets. Tested end-to-end through the real controller +
  repository + reducer (`contextChainMasteryWeight.test.ts`).
- Divergence: this is a semantic rule implemented **outside** the pure reducer.
- Order dependence: counters are order-independent; box, prompt-fade and `dueAt` are not.

## 21. Persistence

Events are the only persisted truth; the snapshot is recomputed from events each run. The `mastery-v0.1
→ v0.2` bump required no migration for exactly this reason. Compaction stores a cursor + folded
snapshot as a cache. Corrupt logs are preserved, never destroyed. Known cost (audit B10): every answer
re-reads all events and re-runs `scoreEvents(all)` — unbounded growth, O(n²)-ish.

## 22. Tests

45 test files exist; **10 are in-domain**: `mastery.test.ts` · `nearMissMasteryTiming.test.ts` ·
`gradeAnswerCheck.test.ts` · `lessonProgress.test.ts` · `lexiqueMemory.test.ts` ·
`practiceSelector.test.ts` · `carryoverSelector.test.ts` · `errorEngine.test.ts` ·
`contextChainMasteryWeight.test.ts` · `shippedErrorTags.test.ts` (+ `compaction.test.ts` adjacent).

**No test covers:** admissibility · attribution · error-source exclusion · invalidation · evidence
weighting · repair · confidence. **These are not gaps in test coverage — the behaviours do not exist.**

## 23. Renderer integration

The learner renderer (`app/learn/[fixtureId].tsx` + `components/learning-engine/*`) is gated on
`PRODUCT_STAGE === "sandbox" && FEATURES.v1LessonEngine`, with a safe "unavailable" fallback and no
public-nav exposure. Card components import neither `LocalRepository` nor `scoreEvents`; event creation
is owned solely by `LearningSessionController`. The **shipped** dev-apk lesson screen
(`app/lesson/[id].tsx`) is the legacy v1 renderer and writes no `LearningEvent`. Audit B13 notes it has
no screen-level stage guard.

## 24. Shipped-surface availability

| Rule | Reaches a dev-apk tester? |
|---|---|
| No XP / streak / reward language | **Yes** (copy guards) |
| Neutral, non-punitive feedback; no score display | **Yes** |
| Open Weave ungraded; Say It never grades | **Yes** |
| Legacy per-section mastery thresholds (0.6–0.7) | **Yes** |
| Legacy weak-spot tracking (3+ by answer string) | **Yes** (Progress surface hidden) |
| Everything else in this document | **No** |

## 25. Feature gates

`sandbox` — all on, `v1LessonEngine: true`. `dev-apk` — `v1LessonEngine: false`, `monLexique: false`,
`practice: false`, `dailyReview: false`, `progress: false`, `paywall: false`, `aiEnabled: false`.
`public-beta` — `v1LessonEngine: false`, `monLexique: true`, `aiEnabled: false`, `paywall: true`.
Resolution is fail-closed to `dev-apk`. **Member audit: all three stages enumerated; the engine flag is
false in both shipping stages.**

## 26. Known divergences (consolidated)

| # | Divergence | Evidence |
|---|---|---|
| R1 | Shipped surface emits no events → no production evidence | §0 |
| R2 | `spelling_near_miss` weakness-accruing vs ADR-0021 precision **and** vs founder FQ-1 where meaning is unknown | §4, §11 |
| R3 | No evidence weighting despite canon asserting one — **and now despite founder FQ-2 ratifying differential strength**; recognition and production advance boxes equally | §13 |
| R4 | No attribution / error-source field despite a `[HARD INVARIANT]` | §2 |
| R5 | No invalidation mechanism — **founder FQ-6 ratified one semantically; none exists** | §2, §21 |
| R6 | Repair fully unimplemented | §18 |
| R7 | Two weakness systems, same threshold, different keys — **both now governed (FQ-8); the shipped one is non-conforming and frozen** | §6 |
| R8 | Two Leitner systems, same intervals, different demotion | §8 |
| R9 | Chain aggregation lives in the controller, not the reducer | §20 |
| R10 | Assistance (hint) never reaches the event — **founder FQ-3 ratified that assistance scopes the claim; 1 of 8 assistance members is captured, and that one is ruled insufficient** | §2, §9 |
| R13 | **Weakness is permanent** via monotone counters — founder FQ-4 ratified a recoverable/historical split; **0 of 5 weakness members represented** | §5 |
| R14 | **No universal state ladder in runtime** — conforms to FQ-5 **by absence, not by design** | §19 |
| R15 | **Every exact constant is an implementation value only** — FQ-7 founder-ratified **zero** numbers | §19, §6, §8 |
| R16 | **Tag classification is too coarse for founder semantics** — no tag carries polarity; `punctuation_only` and `accent_only` are context-dependent too | §4, §11 |
| R11 | Legacy stores unversioned (B18); unbounded re-derivation (B10) | §1, §21 |
| R12 | Daily Review reads legacy `lm7`, not engine projections | ADR-0020 consequences |

## 27. What this file does not claim

It does not claim any behaviour above is correct, intended, final, or canonical. It does not claim a
tested behaviour is shipped. It does not claim an absent behaviour was rejected. It does not authorize
changing any value, shape, gate, or module recorded here.

**Rounds 1–2 specifically.** The founder decisions of 2026-07-26 ratified *semantics* — all eight
questions. This file records that **no runtime fact changed**, **no correction was authorized**, and
**every divergence annotated above remains live**. A `⚠ DIVERGENCE` marker is a record of
non-conformance, never a work item. **No exact constant recorded in this file is founder-ratified.**
