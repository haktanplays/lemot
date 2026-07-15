---
status: active
type: canon
owner: mixed
last_reviewed: 2026-06-29
related_notes:
  - "[[Cairn Codex]]"
  - "[[Home - Le Mot]]"
  - "[[Agent Handoff]]"
  - "[[Backlog and Deferred]]"
  - "[[Open Questions]]"
related_repo_paths:
  - docs/learning-engine-v1.md
  - lemot-app/content/lessonTypes.ts
  - lemot-app/content/learning-engine/types.ts
  - lemot-app/content/learning-engine/validate.ts
  - lemot-app/components/lesson-v1/
---

# Learning Engine Taxonomy

## Purpose

This note defines Le Mot's learning-engine taxonomy: exercise types, reveal types, feedback modes, measurement signals, error tracking, and future adaptive lesson behavior.

It is private product/architecture canon for agents. It does not replace repo docs, lesson schemas, or validators. Link to repo docs; do not copy them wholesale.

Core principle:

- Lesson content/schema is the source of truth.
- Renderer displays and collects interaction.
- Deterministic validator is the judge.
- AI, if used later, is a bounded coach only.
- Measurement observes; it must not invent pedagogy.
- Adaptive/self-replicating lessons are future and must be validator-gated.

## 1. Exercise Type Taxonomy

Exercise type means the learner-facing learning action. Do not confuse exercise type with renderer/component name. A renderer can implement more than one product behavior, and a product exercise may later have multiple renderers.

### 1.1 Exposure

Purpose: introduce language without demanding production.

Learner action: read, listen, notice.

Typical screens: `MeetCard`, read/listen, intro examples, passive insight examples.

Measurement: viewed, audio played, replayed, skipped, time-on-screen, later recall success.

Risks: over-explaining, hiding the target piece, treating passive examples as active pieces.

Example: L2 `Je suis ici.` is exposure, but because `ici` is part of the target chunk it should be visibly highlighted.

#### Measurement mapping

Primary measurement purpose:

- Did the learner encounter the item/chunk?
- Did the learner listen?
- Did the screen create later recall or confusion?

Signal categories:

- Completion Signal.
- Audio/TTS Signal.
- Friction Signal.
- Content Quality Signal.
- Later Correctness Signal through downstream exercises.

Reveal/feedback dependencies:

- Usually no feedback.
- May use Hint Reveal or Meta Reveal.
- TTS replay can be measured.

Possible error categories:

- Content Error.
- Audio/TTS Error.
- UI/Flow Error if the learner cannot understand what to do.

Weak-point categories:

- Should not directly mark a weak point from view alone.
- Can increase exposure count for a chunk.
- Later failures can link back to the exposure item.

Mastery/progress impact:

- Exposure count.
- Audio exposure.
- First-seen timestamp.
- No mastery claim yet.

Do NOT infer:

- Correctness.
- Production ability.
- Mastery.
- Learner weakness from simply viewing/skipping.

### 1.2 Recognition

Purpose: learner recognizes correct form or meaning from options.

Learner action: choose, match, identify.

Typical screens: `FillWithTraps`, option choice, package choice, sound/meaning discrimination.

Measurement: selected option, correct/incorrect, trap selected, retry, hesitation/time, repeated error pattern.

Risks: silly distractors, out-of-scope distractors, non-word traps that look like bugs, trap reasons that over-teach grammar.

Example: L5 `un`/`une` package choice. `merci` was a bad trap because it was not a meaningful article contrast.

#### Measurement mapping

Primary measurement purpose:

- Can the learner identify the correct package/form/meaning among options?

Signal categories:

- Correctness Signal.
- Attempt Signal.
- Friction Signal.
- Content Quality Signal.
- Weak-Point Signal.

Reveal/feedback dependencies:

- Correctness Feedback.
- Trap Feedback.
- Soft Reveal if retry/support exists.

Possible error categories:

- Learner Error.
- Content Error if distractor is bad.
- Validator Error if correct option logic is wrong.
- Tone Error if feedback is harsh.

Weak-point categories:

- Articles/`un`/`une`.
- Negation.
- Yes/no.
- Location/`ici`/`où`.
- Etre/avoir chunks.
- Question package.
- Other lesson-scoped contrast tags.

Mastery/progress impact:

- Recognition confidence.
- Trap history.
- Contrast-specific weak-point signal.
- Possible review trigger after repeated misses.

Do NOT infer:

- Open production ability.
- Speaking ability.
- Durable mastery from one correct choice.

### 1.3 Guided Production

Purpose: learner builds a target answer with support.

Learner action: type or assemble a constrained response.

Typical screens: Weave/Try it in French, guided sentence production, supported answer with known pieces.

Measurement: accepted answer, compare answer, missing piece, hint used, model reveal viewed, retry count.

Risks: accepting unsupported mixed-language answers as correct, punishing reasonable bridge attempts, over-revealing pieces, grading too harshly.

Current Round 1.1: Weave is labeled "Try it in French." It uses deterministic accepted-answer matching for full French answers. Mixed/partial attempts go to neutral compare, not red error.

#### Measurement mapping

Primary measurement purpose:

- Can the learner produce the target phrase/sentence with known support?

Signal categories:

- Attempt Signal.
- Correctness Signal.
- Hint Signal.
- Reveal Signal.
- Friction Signal.
- Weak-Point Signal.
- Content Quality Signal if prompt/evaluator mismatch appears.

Reveal/feedback dependencies:

- Compare Feedback.
- Model Answer Reveal.
- Natural Reveal.
- Optional Hint Reveal.
- Future Diagnostic Reveal only with structured target moves.

Possible error categories:

- Learner Error.
- Validator Error.
- Tone Error.
- UI/Flow Error.
- Content Error if accepted answers or prompt are incomplete.

Weak-point categories:

- Missing target chunk.
- Wrong package.
- Word order/pattern only if lesson-scoped.
- Article/state/location/negation/question tags as authored.

Mastery/progress impact:

- Production confidence.
- Accepted answer count.
- Retry/hint dependency.
- Target-chunk production signal.

Do NOT infer:

- Broad grammar ability.
- Partial-credit diagnosis without structured target moves.
- That mixed-language attempt is wrong in a punitive sense if task copy invites bridge behavior.

Field signal example (prompt salience, not learner error):

- Observed 2026-06-29, Tester 1 (see [[Tester Feedback Log]]): across **consecutive Weaves with different targets**, the learner re-submitted the **previous Weave's answer** (expected `je ne suis pas ici`, next target ~`ce n'est pas ici`, learner repeated `je ne suis pas ici`).
- Read this as a **Prompt-Salience / UI-Attention signal (a Friction/UI-Flow signal)**, **not** automatically a Correctness/Weak-Point (Learner Error) signal. The learner may not have registered that the target meaning changed.
- Measurement implication: when a submission **equals the immediately previous Weave's accepted answer but mismatches the current target**, flag it as a **carry-over / salience** event for analysis, distinct from a genuine production miss. Do not let it inflate weak-point counts on the current target.
- Product response is copy/salience-first (see the Weave prompt-salience candidate in [[Backlog and Deferred]]); any detection nudge is gated behind more tester evidence (see [[Open Questions]]). No evaluator change is implied by this signal.

### 1.4 Open Production

Purpose: learner writes or says a natural response in their own way.

Learner action: freeform answer.

Typical screens: `SayItYourWayV1`, open prompt, communicative response.

Measurement: attempted/empty, confirmation reached, try again used, keep-and-compare used, pieces hint opened, Natural Reveal viewed, future authored missing-target signals.

Risks: app ignoring learner by revealing too early, AI hallucinated correction, fake grading, giving too much answer via hints.

Current Round 1.1: Say It uses input -> confirm -> revealed. No wrong-answer language. AI remains bounded/off unless explicitly enabled.

#### Measurement mapping

Primary measurement purpose:

- Did the learner attempt communicative production and then compare with a model?

Signal categories:

- Attempt Signal.
- Hint Signal.
- Reveal Signal.
- Friction Signal.
- Future Weak-Point Signal only if target moves are authored.
- System/AI Signal if feedback is generated.

Reveal/feedback dependencies:

- Hint Reveal.
- Compare Reveal.
- Natural Reveal.
- Encouragement Feedback.
- AI Feedback only if bounded.

Possible error categories:

- UI/Flow Error.
- AI Error.
- Tone Error.
- Content Error if model answer does not match task.
- Learner Error only if structured target move validation exists.

Weak-point categories:

- None by default from raw freeform text.
- Future: missing `targetMoveIds`.
- Future: repeated omission of authored chunk.

Mastery/progress impact:

- Production attempt count.
- Confidence through attempt/compare.
- Possible communicative fluency signal.
- No deterministic mastery unless validated.

Do NOT infer:

- Correctness from raw freeform text.
- Grammar weakness without targetMove schema.
- Mastery from simply typing something.
- AI-generated diagnosis as truth.

### 1.5 Comparison

Purpose: learner compares their attempt to a natural model.

Learner action: read model, notice difference, continue.

Typical screens: Natural Reveal, model answer, another way, why it works, compare card.

Measurement: reveal viewed, alternatives viewed, continue, later reuse, same error reduced later.

Risks: calling comparison a grade, showing too many alternatives, teaching unseen grammar in the explanation, claiming mastery from one comparison.

#### Measurement mapping

Primary measurement purpose:

- Did the learner view and engage with the model/natural comparison?

Signal categories:

- Reveal Signal.
- Audio/TTS Signal if model is played.
- Friction Signal.
- Later Correctness Signal through follow-up.

Reveal/feedback dependencies:

- Natural Reveal.
- Compare Reveal.
- Model Answer Reveal.
- Short explanatory feedback.

Possible error categories:

- Content Error.
- AI Error if model/explanation is generated unsafely.
- UI/Flow Error if reveal appears too early.

Weak-point categories:

- Should not directly create weak point.
- May support future review by linking compared target piece.

Mastery/progress impact:

- Comparison exposure.
- Model-viewed signal.
- Potential confidence boost.
- No correctness by itself.

Do NOT infer:

- Learner understood the explanation.
- Learner can produce the model.
- Weakness unless followed by failed attempt.

### 1.6 Reflection / Recap

Purpose: name what the learner used and carry it forward.

Learner action: read the recap, recognize owned pieces, leave the lesson.

Typical screens: `RecapCard`, completion view, pieces-used list.

Measurement: completed, pieces listed, next lesson unlocked, later recall success.

Risks: reward language, inflated claims, treating `piecesUsed` as validated mastery without evidence.

#### Measurement mapping

Primary measurement purpose:

- Did the learner see the lesson's reusable pieces and end-state summary?

Signal categories:

- Completion Signal.
- Reveal Signal.
- Content Quality Signal.
- Future Mastery/Review Signal.

Reveal/feedback dependencies:

- Recap Reveal.
- Progress Feedback.
- Mon Lexique entry point.

Possible error categories:

- Content Error.
- UI/Copy Error.
- Mastery Mapping Error if `piecesUsed` is wrong.

Weak-point categories:

- No direct weak-point from recap view.
- Can strengthen known item exposure.

Mastery/progress impact:

- Lesson completion reinforcement.
- Piece exposure reinforcement.
- Mon Lexique readiness candidate.

Do NOT infer:

- Mastery.
- Recall ability.
- Production ability.

### 1.7 Review / Resurfacing

Purpose: bring earlier material back so retention and reuse can be observed.

Learner action: answer, rebuild, recognize, or compare previously met material.

Typical screens: Daily Review items, Practice Pool Build/Stretch/Challenge, resurfaced lesson cards.

Measurement: prior-item correctness, attempt, hint use, recall timing, repeated misses, successful reuse after delay.

Risks: resurfacing material too early, mixing unseen items into review, treating one miss as permanent weakness.

#### Measurement mapping

Primary measurement purpose:

- Does the learner retain and reuse earlier material?

Signal categories:

- Correctness Signal.
- Attempt Signal.
- Review Signal.
- Weak-Point Signal.
- Mastery Signal.
- Friction Signal.

Reveal/feedback dependencies:

- Correctness Feedback.
- Soft Reveal.
- Hint Reveal.
- Diagnostic Feedback if structured.

Possible error categories:

- Learner Error.
- Content Error if resurfaced item is wrong/too early.
- Mastery Mapping Error.
- Validator Error.

Weak-point categories:

- Any registry-backed item/chunk.
- Repeated prior lesson tags.
- Contrast-specific weak points.

Mastery/progress impact:

- Strengthens or weakens item mastery.
- Schedules future resurfacing.
- Confirms or clears weak-point signal.

Do NOT infer:

- Global language level from one review.
- Permanent mastery from one correct answer.
- Permanent weakness from one miss.

### 1.8 Integration / Review Lesson

Purpose: test whether prior pieces combine into a meaningful new moment without overloading new material.

Learner action: recombine known chunks, recognize contrasts, produce guided/open responses, and compare.

Typical screens: integration lesson sequence, cumulative Weave, Say It Your Way, Natural Reveal, recap.

Measurement: cross-piece success, error clusters, hint dependency, completion friction, readiness for next layer.

Risks: too much novelty, hiding which prerequisite failed, interpreting one integration miss as global failure.

#### Measurement mapping

Primary measurement purpose:

- Can the learner recombine prior pieces across contexts?

Signal categories:

- Correctness Signal.
- Attempt Signal.
- Weak-Point Signal.
- Friction Signal.
- Mastery Signal.
- Content Quality Signal.

Reveal/feedback dependencies:

- Mixed: Correctness, Compare, Natural Reveal, Recap.
- Diagnostic Reveal only if structured.

Possible error categories:

- Learner Error.
- Content Error if lesson overloads novelty.
- UI/Flow Error.
- Validator Error.

Weak-point categories:

- Cross-piece combinations.
- Previously learned chunks.
- Integration-specific weak tags.

Mastery/progress impact:

- Stronger evidence than single exposure.
- Can confirm readiness for next layer.
- Can trigger review/remediation.

Do NOT infer:

- Failure means all prerequisite lessons failed.
- One integration miss equals concept non-mastery.

### 1.9 Diagnostic Drill

Purpose: confirm whether a suspected weak point is real.

Learner action: answer a narrow authored contrast or target item check.

Typical screens: micro-contrast, fill-with-traps, listening trap, targeted rebuild.

Measurement: narrow correctness, repeated misses, trap selected, response time, repair readiness.

Risks: broad diagnosis from a narrow drill, badly designed distractor, punitive tone.

#### Measurement mapping

Primary measurement purpose:

- Confirm whether a suspected weak point is real.

Signal categories:

- Correctness Signal.
- Weak-Point Signal.
- Attempt Signal.
- Friction Signal.
- Mastery Signal.

Reveal/feedback dependencies:

- Correctness Feedback.
- Diagnostic Feedback.
- Trap Feedback.
- Soft Reveal.

Possible error categories:

- Learner Error.
- Diagnostic Error if the drill is badly designed.
- Content Error.
- Validator Error.

Weak-point categories:

- Narrow, authored `weakPointTag` only.
- Should not create broad grammar diagnosis.

Mastery/progress impact:

- Confirms/clears weak point.
- Informs remediation/review.
- Not a full mastery score alone.

Do NOT infer:

- Broad language ability.
- Permanent weakness.
- Unrelated grammar issues.

### 1.10 Repair / Micro-Remediation

Purpose: reduce a confirmed weak point with a small, targeted retry or contrast.

Learner action: practice the same narrow target after a soft reveal or diagnostic.

Typical screens: targeted fill, small rebuild, micro-contrast, short review item.

Measurement: success after repair, repeated miss, friction, weak-point reduction candidate.

Risks: feeling punitive, over-repairing a single miss, teaching outside the weak-point scope.

#### Measurement mapping

Primary measurement purpose:

- Did a short repair exercise reduce a confirmed weak point?

Signal categories:

- Correctness Signal.
- Weak-Point Signal.
- Review Signal.
- Attempt Signal.
- Friction Signal.
- Mastery Signal.

Reveal/feedback dependencies:

- Soft Reveal.
- Correctness Feedback.
- Diagnostic Feedback.
- Encouragement Feedback.

Possible error categories:

- Remediation Design Error.
- Learner Error.
- Content Error.
- Tone Error if it feels punitive.

Weak-point categories:

- Only the targeted weak point.
- No broad diagnosis.

Mastery/progress impact:

- Weak point reduced if repeated success.
- Schedules future confirmation.
- Can unlock confidence signal.

Do NOT infer:

- Full mastery from one repair.
- Learner failure if repair is skipped.
- Need for more remediation from one miss.

### 1.11 Generative / Adaptive Variant

Purpose: future generated or selected variant that targets an authored need while staying inside schema.

Learner action: depends on subtype: recognize, produce, compare, or repair.

Typical screens: future Practice Pool variant, adaptive review card, generated-but-validated sentence item.

Measurement: subtype signals plus generator safety, validator outcome, target weak-point fit, content quality.

Risks: unsafe AI output, scope drift, validator gaps, punishing learner for generated content defects.

#### Measurement mapping

Primary measurement purpose:

- Did a trusted generated/selected variant help with a targeted need?

Signal categories:

- Correctness Signal.
- Attempt Signal.
- Weak-Point Signal.
- Mastery Signal.
- System/Generator Signal.
- Content Quality Signal.
- Validator Signal.

Reveal/feedback dependencies:

- Depends on exercise subtype.
- Must use existing reveal/feedback taxonomy.
- No unbounded AI feedback.

Possible error categories:

- AI Error.
- Generator Error.
- Validator Error.
- Content Error.
- Scope Drift Error.

Weak-point categories:

- Only authored/validated target weak points.

Mastery/progress impact:

- Variant success can reinforce mastery.
- Generator safety metrics become important.
- Failed generated item should not punish learner until content is verified.

Do NOT infer:

- Generated content is safe because it rendered.
- AI output is correct without validation.
- Learner weakness if generated variant itself is flawed.

## 2. Reveal Taxonomy

Reveal type means what the app shows after or around an interaction.

| Reveal type | Purpose | Current examples | Boundary |
|---|---|---|---|
| Answer Reveal | Show the correct local answer. | `AnswerReveal.short`, explanation, natural line. | Fine for recognition; do not over-explain. |
| Model Answer | Show a natural answer after production. | `NaturalReveal.modelAnswer`. | Not necessarily the only correct answer. |
| Natural Alternative | Show valid other ways. | `naturalAlternatives`. | Must be authored/bounded, not AI-invented in smoke/hotfix work. |
| Notice | Name the useful difference. | `ifUnderstandableButWrong`, `ifMissingTargetPiece`, `ifTooDirect`. | Neutral mirror, not punishment. |
| Why It Works | Explain the shape lightly. | `NaturalReveal.explanation`, `InsightCard`. | Must stay inside lesson scope. |
| Ownership Recap | Show what was used. | `RecapCard.piecesUsed`. | Do not claim mastery unless measured. |

Reveal is not feedback by itself. Reveal shows information; feedback interprets the learner's attempt.

## 3. Feedback Taxonomy

Feedback type means the app's response to learner behavior.

| Feedback type | Used for | Tone | Safety rule |
|---|---|---|---|
| Correct / accepted | Exact or authored alternative match. | "Correct." / "Accepted." | Do not celebrate with reward theatre. |
| Neutral compare | No deterministic match, but learner can compare. | "Compare with the model answer." | Use for Weave partial/mixed attempts. |
| Trap explanation | Recognition choice selected a trap. | Short reason. | Trap reason names the local contrast only. |
| Self-correction invite | Learner may revise before reveal. | "Try again" / "Keep and compare." | Do not block or shame. |
| Naturalness note | Answer works but can be more natural. | Passive mirror. | Must be authored or tightly bounded. |
| AI coach note | Future bounded feedback. | Specific, scoped, non-authoring. | AI may explain, never override validator/schema. |

Round 1.1 rule: smoke/hotfix feedback must be deterministic and authored. AI feedback expansion belongs behind explicit guardrails.

## 4. Measurement / Signal Taxonomy

Measurement observes learner behavior. It must not invent pedagogy, create new targets, or silently promote items.

Each exercise type in §1 now carries a measurement mapping. Those mappings define what the exercise can write, what reveal/feedback it depends on, what errors it can generate, and what must not be inferred. This section is the shared vocabulary behind those per-exercise mappings.

### Event Signals

- Screen viewed.
- Audio played/replayed.
- Option selected.
- Trap selected.
- Typed attempt submitted.
- Hint opened: pieces, cloze, idea prompt.
- Confirmation reached.
- Try again used.
- Keep-and-compare used.
- Reveal viewed.
- Lesson completed.

### Derived Signals

- Hesitation/time-on-screen.
- Retry count.
- Missing authored target piece.
- Repeated trap pattern.
- Hint dependence.
- Later recall success.
- Production reuse across lessons.

### Non-Signals

- One completion is not mastery.
- One reveal view is not understanding.
- Piece display is not piece ownership.
- AI praise is not validation.

## 5. Error Tracking Taxonomy

Error tracking records the local reason a learner missed, not a moral failure.

Measurement must classify the source of the miss before it becomes a learner weak point: learner error, content error, validator error, UI/flow error, tone error, AI/generator error, or mastery-mapping error. A bad distractor, early reveal, broken validator, or generated unsafe item is not learner weakness.

| Error class | Example | Track as | Repair path |
|---|---|---|---|
| Missing target piece | Omits `ici` in L2 target. | missing-piece: item id. | Later guided production or hint. |
| Wrong owned piece | Uses `voudrais` where `suis` is needed. | trap-selected + item ids. | Micro-contrast. |
| Unsupported form | Produces unseen grammar. | outside-scope form. | Redirect; do not teach on spot. |
| Register mismatch | Too direct or too formal. | register/naturalness signal. | Natural Reveal note. |
| Article/package confusion | `un`/`une` wrong package. | package-choice trap. | Recognition repair. |
| Sound/writing confusion | Accent, liaison, silent ending. | sound-writing tag. | Listening/writing trap. |
| Empty/avoidance | No attempt. | skipped/empty. | Softer prompt or support, not punishment. |

Errors feed weak-point repair only after they are authored into a taxonomy. Do not let raw text or AI freeform labels become the canonical error system.

## 6. Engine Boundary Taxonomy

Boundaries protect the lesson from teaching too much.

| Boundary | Meaning | Validator/agent check |
|---|---|---|
| Active | Learner may be expected to produce it. | In active/allowed production. |
| Supported | Learner may produce it with scaffolding. | In supported/allowed production. |
| Recognition-only | Learner may see/recognize it, not produce it. | Must not be production target. |
| Recycled | Previously owned item used again. | Carry-in, not re-taught as new. |
| Blocked production | Owned/seen item explicitly not targetable. | Must not be target answer. |
| Blocked operation | Exercise operation not allowed for lesson. | Validator hard error in contract layer. |
| Out-of-scope form | Valid French but not lesson-owned. | Redirect; do not teach on the spot. |

Repo contract layer already reflects this direction with `activeNew`, `supported`, `recognitionOnly`, `recycled`, `allowedProduction`, `blockedProduction`, and validator findings such as `recognition_only_used_as_production_target`, `blocked_operation_used`, and `unseen_form_used`.

## 7. Adaptive / Self-Replicating Lesson Taxonomy

Adaptive and self-replicating lessons are future. They must never bypass authored schema or validator gates.

### 7.1 Adaptive Selection

Purpose: choose the next practice item from authored pools using observed signals.

Allowed inputs: weak-point tags, item ids, lesson reached, prior attempts, hint use, recall success.

Forbidden inputs: private freeform guesses, unreviewed AI labels, content outside lesson scope.

### 7.2 Adaptive Feedback

Purpose: choose a bounded explanation or prompt level.

Allowed behavior: pick from authored feedback bands, shorten/expand an authored explanation, suggest retry vs compare.

Forbidden behavior: AI creates new grammar teaching, new target forms, or unsupported correction.

### 7.3 Self-Replicating Content

Purpose: later generate safe variants from an authored seed.

Minimum gate before use:

- Seed lesson schema exists.
- Target item ids are known.
- Allowed/blocked production is explicit.
- Generated item passes deterministic validator.
- Generated text contains no unseen form, placeholder, or source-hygiene issue.
- Human/product review approves the pattern before learner exposure.

Rule: generation can multiply approved patterns; it cannot invent the syllabus.

## 8. Current v1 Implementation Map

Current v1 lesson renderer screen types in `lemot-app/content/lessonTypes.ts`:

| Screen type | Component | Product taxonomy |
|---|---|---|
| `meet-card` | `MeetCard` | Exposure. |
| `insight-card` | `InsightCard` | Exposure / explanation / boundary naming. |
| `fill-with-traps` | `FillWithTraps` | Recognition with trap feedback. |
| `weave` | `Weave` | Guided production + comparison. |
| `say-it-your-way` | `SayItYourWayV1` | Open production + confirmation + comparison. |
| `natural-reveal` | `NaturalReveal` | Comparison / reveal. |
| `recap` | `RecapCard` | Ownership recap. |

Contract-driven learning-engine operations in `content/learning-engine/types.ts`:

- `recognition`
- `fill`
- `build`
- `register_switch`
- `context_chain`
- `open_production`
- `free_conversation` exists as a declared operation, but the blueprint union currently covers the safer bounded set.

Important distinction: `lesson-v1` screen types are the current Round 1 renderer. `content/learning-engine/*` is the contract-driven future/parallel engine layer. This private taxonomy maps both, but does not authorize wiring changes.

## 9. Round 1.1 Examples

- #151 Weave label/tone: `weave` screens are learner-facing "Try it in French," with neutral comparison for no-match attempts.
- #152 Say It confirmation: open production now pauses at confirmation before reveal, so the learner is not ignored by an early model answer.
- #153 L2/L4/L5 chip cleanup: support pieces must be authored as learning supports, not accidental answer dumps or stale chips.
- #154 L2 p2 `ici` chip coverage: if a target chunk requires `ici`, the support/highlight layer must expose it consistently.

Current main after #154: `8cfdce7508b4bc26eb78468fb59de7d236b5ae49`.

## 10. Deferred Engine Questions

Product decisions:

- How should `pret` / `prete` be represented for early learners?
- Should the early "What was Weave?" reminder be an exposure card, a recap reminder, or no card unless tester evidence asks for it?
- When does Natural Reveal become a deeper paid-zone behavior vs basic bounded comparison?

Technical questions:

- Should chip/`piecesUsed` coverage become a validator metric?
- What minimum hallucination guardrails are required before AI feedback leaves sandbox?
- How should Android TTS reliability be measured and reported?
- Should runtime statuses eventually distinguish transformed/expected production, or keep those as planning-only states?
- What is the first safe generated-variant pipeline, and which validator findings block it?

## Measurement Mapping Summary

| Exercise Type | Primary Signal | Secondary Signals | Main Reveal/Feedback | Can Create Weak Point? | Can Affect Mastery? | Main Risk |
|---|---|---|---|---|---|---|
| Exposure | Completion / encounter | Audio, friction, content quality, later correctness | Usually none; hint/meta/TTS replay | No direct weak point | Exposure only, no mastery | Inferring ability from view/skip |
| Recognition | Correctness | Attempt, trap, friction, content quality | Correctness + trap feedback | Yes, if scoped/authored | Recognition confidence | Bad distractors or harsh feedback |
| Guided Production | Attempt + correctness | Hint, reveal, friction, weak-point | Compare + model/Natural Reveal | Yes, for authored target chunks | Production confidence | Over-grading or accepting unsupported forms |
| Open Production | Attempt | Hint, reveal, friction, system/AI | Compare/Natural Reveal; bounded AI only | Not by default | Attempt/confidence only unless validated | Treating raw freeform as diagnosis |
| Comparison | Reveal viewed | Audio, friction, later correctness | Natural/model/compare reveal | No direct weak point | Comparison exposure only | Assuming understanding from reveal view |
| Reflection / Recap | Completion | Reveal, content quality, future review | Recap/progress/Mon Lexique entry | No direct weak point | Completion reinforcement only | Wrong `piecesUsed` or inflated claims |
| Review / Resurfacing | Correctness over time | Attempt, review, weak-point, mastery, friction | Correctness, soft reveal, hints | Yes, for registry-backed items | Yes, through repeated evidence | Permanent conclusions from one review |
| Integration / Review Lesson | Cross-piece correctness | Attempt, weak-point, friction, mastery, content quality | Mixed correctness/compare/Natural Reveal/recap | Yes, for scoped combinations | Stronger readiness evidence | Treating one miss as global failure |
| Diagnostic Drill | Narrow correctness | Weak-point, attempt, friction, mastery | Diagnostic/trap/soft reveal | Yes, narrow authored tag only | Confirms/clears weak point | Broad diagnosis from narrow drill |
| Repair / Micro-Remediation | Weak-point reduction | Correctness, review, attempt, friction, mastery | Soft/correctness/diagnostic feedback | Only targeted weak point | Yes, after repeated success | Punitive repair loop |
| Generative / Adaptive Variant | Validator-backed subtype result | Generator, content quality, weak-point, mastery | Existing subtype reveal/feedback only | Only validated target weak points | Possible, if content verified | Trusting generated content because it rendered |

## Maintenance

Update this note only when the taxonomy changes. Do not turn it into a PR log. PRs and smoke history belong in [[PR and Smoke Log]]. Deferred work belongs in [[Backlog and Deferred]]. Unresolved decisions belong in [[Open Questions]].
