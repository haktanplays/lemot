---
title: Mastery & Evidence Founder Review Surface v0.1
version: 0.1
status: Draft — bounded founder decision surface for the Mastery & Evidence Bible v1.0 Draft
authority: none — a question set, not a decision
owner: Mastery & Evidence
created: 2026-07-26
questions: 8
---

# Mastery & Evidence — Founder Review Surface v0.1 — DRAFT

**Eight questions.** Every one of them is a question the repository genuinely cannot answer, because
two sources disagree or because nothing exists at all.

**Deliberately not asked here:** facts the repository already proves (recorded in the Current Reality
Map instead) · module placement, schema shape and algorithm choice (Engineering) · sequencing and
band-strictness (Curriculum) · retention, lawful basis and minors (Privacy/Legal) · audit staffing
(Operations) · anything resolvable editorially.

**Timing key:** `REQUIRED NOW` — the Draft cannot be internally consistent without it.
`REQUIRED BEFORE PROMOTION` — the Draft is consistent, but cannot become Canonical without it.
`DEFERRED` — recorded, not asked yet.

---

## FQ-1 — Is a French minimal-pair spelling slip a precision signal or a weakness signal?

**1. Question ID:** FQ-1
**2. Exact decision.** Does `spelling_near_miss` belong in the precision bucket (soft, never weakness),
or does it accrue weakness as the shipped engine currently does?

**3. Why it cannot be inferred.** Four documents say one thing and the code does the other, and *both
sides have a real argument on the record*. ADR-0021 — `status: active`, `canon_status: canonical` —
places `spelling_near_miss` in Precision and states it never sets `isWeak`. Audit **B7** confirmed the
opposite as a *defect*: French minimal pairs (`un`/`on`, `le`/`la`, `et`/`est`) are **meaning-distinct**,
so treating them as harmless hides real confusion. The code was changed; the ADR's Decision paragraph
was not. This is a pedagogical judgement about French, not an engineering detail.

**4. Current source positions.**
- ADR-0021 Decision · precision-policy §2 table · vault `Mastery Model` bucket table · vault
  `Feedback and Scoring Philosophy` → **precision, soft, never weakness**.
- `mastery.ts:132-145, 234-237, 257-259` + audit B7 + `nearMissMasteryTiming.test.ts` → **no credit, no
  demotion, but accrues `weakTags`** (three occurrences make the item weak).
- ADR-0021's own *Consequences* line acknowledges "refined by PR-E1/#193 (B7/B12)" — so the ADR is
  internally split.

**5. Current implementation reality.** Five buckets, not four. `PRECISION_TAGS` has exactly two members.
Sandbox-only; no shipped tester is affected either way today.

**6. Draft recommendation.** **Keep the code's behaviour and amend ADR-0021 by scope-amendment.**
`un`/`on` and `le`/`la` are not typography — a learner who writes one for the other has a meaning
problem, and Cairn's whole promise is teaching through meaning. Preserve ADR-0021's *principle*
(a meaning-preserving slip is never a failure) and narrow its *member list* to the two tags that
actually preserve meaning.

**7. Strongest alternative.** Restore the three-member precision bucket and handle minimal pairs through
a dedicated mechanism (a future `accentCriticality`-style field, or content-level minimal-pair items),
so that the *tone* promise — never silently punish a learner who knew the word — holds without
exception. This is the reading ADR-0021 as written supports.

**8. Consequence of the recommendation.** One active ADR is amended (not repealed) and three vault/status
documents are corrected. A learner who repeatedly confuses `le`/`la` surfaces for Challenge. Risk: a
learner with a genuinely typographic slip on a single-token answer may be pushed toward Challenge, since
`spelling_near_miss` is emitted on edit distance alone, not on meaning analysis.

**9. Consequence of the alternative.** The code changes back (an engine change, requiring a separate
opening), audit B7 is formally re-classified from *confirmed defect* to *intended behaviour*, and
meaning-distinct confusions become invisible to mastery until a new mechanism exists.

**10. Affected `ME-###` rows:** ME-011, ME-012, ME-032; consequential ME-026.
**11. Affected downstream layers:** Content (minimal-pair item design), Curriculum (band strictness), Engineering (if the code changes back).
**12. Weakest-member test.** The claim *"precision tags never create weakness"* was tested against each
member: `punctuation_only` ✔ · `accent_only` ✔ · `spelling_near_miss` ✘. **The universal claim is false
as written in four documents.** Either the claim or the member list must move.
**13. Timing:** `REQUIRED NOW`.
**14. Founder response template:** `FQ-1 = [A] amend ADR-0021, keep code · [B] restore 3-member precision, change code · [C] other — ______`

---

## FQ-2 — Does evidence have differential weight, and if so, where does it live?

**1. Question ID:** FQ-2
**2. Exact decision.** Should a recognition success count for less than a production success in mastery
and scheduling? And is "evidence weight" a real mechanism in the mastery reducer, or an idea that should
be retired?

**3. Why it cannot be inferred.** Canon asserts the mechanism exists and names its home; the home is
empty. ADR-0022 (`active`/`canonical`) says *"evidence weight (mastery multiplier) and selection weight
are separate modules."* Lesson Flow Canon §5.3 places evidence weight **in the mastery reducer**; §5.5
defines a `LessonEvidenceProfile` of listening/production/recognition multipliers summing to 1.0,
explicitly *"a multiplier, not an exercise count."* The reducer implements **no weighting** — every
admitted event weighs 1, and a recognition success advances the Leitner box and prompt-fade exactly as
much as a production success. A third module (`lexique-memory.ts`) *does* implement weights
(production 1.0 · recognition 0.25 · transfer 0.7 · recombination 0.7 · repair 0.5) but is explicitly a
projection, not the reducer, and is unwired.

**4. Current source positions.** Three sources, three answers: canon says the reducer weights; the
reducer does not; an unwired projection does.

**5. Current implementation reality.** Recognition is gated for **Mon Lexique** (`productionSuccess > 0`
required) but not for **scheduling**. The engine therefore already believes recognition is weaker
evidence for one purpose and equal evidence for another.

**6. Draft recommendation.** **Ratify differential weight as a semantic property, and locate it at
admission, not in the box arithmetic.** An admitted event carries a strength; recognition-only evidence
should not push an item to a 30-day interval. Retire the phrase "mastery multiplier" in favour of an
explicit strength field, and treat `lexique-memory`'s weights as a *candidate* value set requiring
separate ratification (FQ-7), not as an inherited decision.

**7. Strongest alternative.** Declare all admitted evidence equal in the reducer and express pedagogical
weighting purely through *what is offered* (selection) and *what is required for promotion* (the
existing production gate). This preserves the reducer's simplicity and avoids two competing weight
systems.

**8. Consequence of the recommendation.** The Bible gains a real strength concept; ADR-0022's assertion
becomes true; a future implementation opening has a target. Cost: a genuinely new semantic mechanism,
and every existing interval value effectively becomes provisional.

**9. Consequence of the alternative.** ADR-0022 and Lesson Flow Canon §5.3/§5.5 must be scope-amended —
canon would be *removing* a mechanism it currently asserts. Simpler, but a recognition-heavy learner
could reach a 30-day interval having never produced the item.

**10. Affected `ME-###` rows:** ME-017, ME-020; consequential ME-034, ME-045, ME-013.
**11. Affected downstream layers:** Curriculum (evidence distribution per band), Content (exercise mix), Engineering (implementation).
**12. Weakest-member test.** The claim *"evidence weight lives in the mastery reducer"* was tested
against its only member — the reducer — and **fails**: no weighting term exists in any branch. The
claim is currently false of 1 of 1 members.
**13. Timing:** `REQUIRED BEFORE PROMOTION`.
**14. Founder response template:** `FQ-2 = [A] ratify differential weight at admission · [B] all evidence equal; amend canon · [C] other — ______`

---

## FQ-3 — Does assistance change what an action proves?

**1. Question ID:** FQ-3
**2. Exact decision.** Should hint usage (and other assistance) reduce, or gate, the evidentiary force
of a success?

**3. Why it cannot be inferred.** The hint ladder is canonical and deliberate (0 → 1 → 2: silent →
reversed pieces → cloze shape, *"never copy-ready"*, "rebuild-the-thought, not copy"). The evidence
layer cannot see it: `LearningEvent` carries `promptLevel` but **no hint field**. So a learner who
produced unaided and a learner who produced after two hints are today identical to mastery. Nothing in
canon states whether that is acceptable.

**4. Current source positions.** EXERCISE_CANON §8 and Difficulty & Cognitive Load define the ladder as
a *support* mechanism. Prompt-fade is described as difficulty adapting to mastery. Neither says whether
support *within* an attempt changes what the attempt proves. No source takes a position.

**5. Current implementation reality.** Prompt-fade is the only assistance representation; it is a
property of the *item's history*, not of the *attempt*. Hint usage is not recorded anywhere.

**6. Draft recommendation.** **Yes — make assistance level an admissibility input and a strength
modifier** (Bible §6.3, §12). A hinted success is real evidence of something, but not of independent
production. Recording it costs one field and prevents a whole class of false mastery.

**7. Strongest alternative.** Treat hints as a within-attempt UX affordance with no evidentiary effect,
on the grounds that penalising hint use teaches learners to avoid help — which contradicts the calm,
non-punitive tone canon. Under this reading, prompt-fade already carries the assistance signal at the
right granularity.

**8. Consequence of the recommendation.** A new event field (Engineering), and an explicit rule that an
event with unknown assistance is not fully admissible (Bible I-19) — which, notably, would mean **every
event ever recorded so far is not fully admissible**. That is a real cost and must be stated, not hidden.

**9. Consequence of the alternative.** Mastery can be established through hinted production. Mon
Lexique's `added` status, practice `stretch` eligibility and box advance can all be reached with maximum
support. False mastery becomes structurally possible.

**10. Affected `ME-###` rows:** ME-022; consequential ME-004, ME-021, ME-049.
**11. Affected downstream layers:** Content (hint design), Engineering (event shape), UX (how it is shown without punitive tone).
**12. Weakest-member test.** The assistance set was enumerated: hint L0 · hint L1 · hint L2 · reveal ·
model answer · prompt-fade level · AI support. **Only prompt-fade reaches the evidence layer — 1 of 7.**
Any claim that "assistance is accounted for" fails on the other six.
**13. Timing:** `REQUIRED BEFORE PROMOTION`.
**14. Founder response template:** `FQ-3 = [A] assistance is an admissibility + strength input · [B] assistance has no evidentiary effect · [C] other — ______`

---

## FQ-4 — Is weakness permanently residual, or fully recoverable?

**1. Question ID:** FQ-4
**2. Exact decision.** Once an item has been weak, may it ever return to a state indistinguishable from
never-weak?

**3. Why it cannot be inferred.** Two sources point in opposite directions and neither is a decision.
The repair policy says a successful repair *"does not erase weakness history"* — implying permanence.
`lexique-memory.ts` implements exactly that with `WEAK_RESIDUAL_FLOOR = 0.15` applied *only* when
`everWeak` is true. But the shipped reducer has **no such concept**: `isWeak` is recomputed from live
counters, and since counters are monotone, an item that crosses the threshold **never becomes un-weak**
— not by design, but as an unexamined side effect of monotonicity. Nobody decided that.

**4. Current source positions.** Policy: history is not erased. Lexique Memory: a 0.15 floor, unwired.
Reducer: permanent by accident.

**5. Current implementation reality.** In the reducer, `wrongCount` never decreases, so once
`wrongCount >= 3` the item is weak **forever**, regardless of any subsequent success. Verified by
reading every counter mutation: all are increments.

**6. Draft recommendation.** **Ratify a residual floor as intentional, but make "currently weak"
recoverable and distinct from "was ever weak."** Two facts, two fields: a recoverable current state that
drives what the learner is offered, and a permanent history that drives caution. The present behaviour
conflates them and is the harsher of the two by accident.

**7. Strongest alternative.** Full recovery: after N consecutive successes (or one successful spaced
confirmation, per the repair flow), the item's weakness clears entirely. Simpler, and closest to the
"calm, non-punitive" promise — a learner who has genuinely fixed something should not carry a permanent
mark.

**8. Consequence of the recommendation.** The reducer gains a real state distinction; the repair flow's
"urgency decreases" gets a mechanism; the accidental permanence becomes intentional and bounded.

**9. Consequence of the alternative.** The repair policy's "weakness history is not erased" must be
scope-amended, and Lexique Memory's floor becomes dead. Risk: a chronic difficulty can be repeatedly
"cleared" and re-learned without the system ever noticing the pattern.

**10. Affected `ME-###` rows:** ME-046; consequential ME-026, ME-030, ME-042, ME-044.
**11. Affected downstream layers:** Curriculum (recycling), Content (repair items), UX (how "needs another look" clears).
**12. Weakest-member test.** The claim *"weakness decays over time"* was tested against every decay
mechanism in the repo: Leitner ✘ (moves due dates, not strength) · reducer time-decay ✘ (absent) ·
Lexique Memory half-life ✔ but unwired. **1 of 3, and the one that works is not connected.**
**13. Timing:** `REQUIRED BEFORE PROMOTION`.
**14. Founder response template:** `FQ-4 = [A] residual floor + recoverable current state · [B] full recovery on confirmation · [C] other — ______`

---

## FQ-5 — Does Cairn have named mastery states, or only counters?

**1. Question ID:** FQ-5
**2. Exact decision.** Is the canonical mastery vocabulary the counter-derived snapshot alone, or a
named state ladder that the counters project into?

**3. Why it cannot be inferred.** The corpus repeatedly refers to a **"9-state mastery"** model, and
**nothing in the repository has nine states.** Enumerating every candidate ladder:
`monLexiqueStatus` 3 · `practiceEligibility` 4 · `LEXIQUE_LIFECYCLE_STATUSES` 8 ·
`learning-engine-v1.md` planning ladder 5 · `itemRegistry` runtime status field 3 (observed) ·
pipeline Rule 6 (Active/Supported/Recognition-only/Recycled) 4. The precision policy's own note says the
9-state framing is *"conceptual only"* and *"should be reconciled … in a later docs pass; until then,
the counters win."* That reconciliation never happened. This is a naming decision with real
consequences, because Curriculum, Content and Mon Lexique all want a vocabulary to speak in.

**4. Current source positions.** "Counters win" (precision policy §4) vs a persistent conceptual ladder
appearing across planning documents.

**5. Current implementation reality.** Counters, projecting into three small enums. No ladder is stored.

**6. Draft recommendation.** **Counters remain the source of truth; ratify one small named vocabulary as
a projection for other layers to speak in, and formally retire the phrase "9-state."** The eight
intrinsic Lexique lifecycle statuses are the strongest candidate — they already exist, are tested, and
deliberately exclude `recycled` for the right reason.

**7. Strongest alternative.** Counters only; forbid named states entirely; require every other layer to
express itself in terms of concrete projections (`isWeak`, `practiceEligibility`, `dueAt`). Maximally
honest, but leaves Curriculum and Content without shared vocabulary.

**8. Consequence of the recommendation.** One vocabulary, one home, and the "9-state" phrase becomes a
documented supersession rather than a recurring ghost.

**9. Consequence of the alternative.** More documents to correct, and cross-layer conversation gets
harder — but zero risk of a named ladder drifting from what the counters actually say.

**10. Affected `ME-###` rows:** ME-033; consequential ME-036, ME-037, ME-039.
**11. Affected downstream layers:** Curriculum, Content, UX (Mon Lexique labels).
**12. Weakest-member test.** The claim *"Cairn has a 9-state mastery model"* was tested against all six
candidate ladders (3 · 4 · 8 · 5 · 3 · 4). **0 of 6 have nine members.** The claim is false against
every member of its own candidate set.
**13. Timing:** `REQUIRED BEFORE PROMOTION`.
**14. Founder response template:** `FQ-5 = [A] counters + one named projection (8 lifecycle statuses) · [B] counters only, no named ladder · [C] other — ______`

---

## FQ-6 — How is bad evidence undone?

**1. Question ID:** FQ-6
**2. Exact decision.** When a recorded event turns out not to be learner-sourced (a broken validator, a
bad distractor, a UI bug, an AI-generated item that was wrong), is it **refused at admission** or
**offset by a compensating record**?

**3. Why it cannot be inferred.** A `[HARD INVARIANT]` says content / validator / UI-flow / tone /
AI-generator / mastery-mapping errors must never become learner weakness. **There is no mechanism to
honour it.** The log is append-only with no delete path and no compensating event type; `ErrorTagCode`
is frozen under YASA 3, so a new "invalidated" code needs same-PR manifest registration; and compaction
folds events into a snapshot, so any retroactive change must invalidate the cache too. The invariant is
currently unimplementable, and the choice between the two shapes determines the whole event schema.

**4. Current source positions.** Policy demands exclusion. Architecture (ADR-0009 append-only,
ADR-0013 frozen tags) constrains how. No source picks a shape.

**5. Current implementation reality.** Every non-success result is attributed to the learner. There is
no error-source field, no admissibility stage, and no invalidation path.

**6. Draft recommendation.** **Both, with a clear precedence: refuse at admission wherever the error is
knowable at grade time; use an explicit compensating record — never a log mutation — for anything
discovered later.** Append-only is a load-bearing architectural commitment; a compensating record honours
it, a deletion does not.

**7. Strongest alternative.** Admission-time only: if an error was not detectable when the event was
graded, it stands. Far simpler, keeps the reducer a pure fold with no reconciliation pass — but it means
a validator bug discovered a week later permanently mis-marks affected learners as weak.

**8. Consequence of the recommendation.** A new event class and a reconciliation rule (Engineering), and
the reducer must handle compensation. The invariant becomes real.

**9. Consequence of the alternative.** The invariant is downgraded from `[HARD INVARIANT]` to
best-effort, and that downgrade must be stated in canon rather than left implicit.

**10. Affected `ME-###` rows:** ME-047, ME-048; consequential ME-004, ME-007, ME-042.
**11. Affected downstream layers:** Engineering (schema, reconciliation), Operations (incident handling), Content (defect reporting path).
**12. Weakest-member test.** The claim *"non-learner errors never become weakness"* was tested against
all seven error-source classes. **Learner ✔ (trivially). Content ✘ · validator ✘ · UI-flow ✘ · tone ✘ ·
AI-generator ✘ · mastery-mapping ✘.** The invariant holds for 1 of 7 — and only because that member is
the one that *should* count.
**13. Timing:** `REQUIRED NOW`.
**14. Founder response template:** `FQ-6 = [A] refuse at admission + compensating record for later discovery · [B] admission-time only; downgrade the invariant · [C] other — ______`

---

## FQ-7 — Which numbers are yours, and which are Engineering's?

**1. Question ID:** FQ-7
**2. Exact decision.** Which of the domain's constants are founder-locked (changeable only by founder
decision), and which are tunable by Engineering within a fixed shape?

**3. Why it cannot be inferred.** **Not one of these values has a founder decision behind it.** They
were chosen during implementation and then quoted back by documentation as though they were canon —
which is precisely how a constant silently becomes an invariant. The repair-threshold source is the one
honest exception: it says explicitly that the number is `[TUNABLE]` and *"not empirical."*

**4. Current source positions.** Vault notes classify some values as `[LOCKED DEFAULT]` / `[TUNABLE
PARAMETER]`; the code classifies nothing; no founder record exists for any value.

**5. Current implementation reality.** `WEAK_THRESHOLD = 3` · `LEITNER_INTERVAL_DAYS = [0,1,3,7,30]` ·
`MAX_PF_INDEX = 3` · `TODAYS_SET_MIN/MAX = 5/8` · `MAX_CONSECUTIVE_SAME_FAMILY = 2` ·
repair threshold (twice / two-lesson) · Lexique Memory's 16 constants · legacy `MASTERY_THRESHOLDS`
0.6–0.7 · legacy weak-spot 3.

**6. Draft recommendation.** **Founder-lock only what encodes a pedagogical promise; make the rest
tunable.** Proposed founder-locked: the *existence* of a weakness threshold and its rough magnitude
("a small number of repeats, not one"); the *shape* of spaced return; the repair-flow shape. Proposed
tunable: every specific interval, box count, set size, diversity cap, and all Lexique Memory constants.

**7. Strongest alternative.** Lock nothing numeric until the engine reaches real learners. Every value
is provisional; revisit after the first smoke round with actual data. Intellectually cleaner — no value
here is empirical.

**8. Consequence of the recommendation.** A short, defensible locked list; everything else moves without
a founder decision. Risk: a "tunable" change can still alter learner experience materially.

**9. Consequence of the alternative.** Maximum flexibility, but the Bible ships with **zero** numeric
commitments, and any future reader can change any threshold citing the absence of a lock.

**10. Affected `ME-###` rows:** ME-026, ME-034; consequential ME-013, ME-029, ME-045.
**11. Affected downstream layers:** Engineering (tuning authority), Curriculum (pacing), Operations (release gates).
**12. Weakest-member test.** The claim *"the domain's constants are canonical"* was tested against every
constant listed above. **Founder decisions found: 0 of ~25.** The weakest member is the entire set.
**13. Timing:** `REQUIRED BEFORE PROMOTION`.
**14. Founder response template:** `FQ-7 = [A] lock promises, tune numbers · [B] lock nothing numeric yet · [C] other — ______`

---

## FQ-8 — Does this Bible bind the surface that actually ships?

**1. Question ID:** FQ-8
**2. Exact decision.** Is the Mastery & Evidence Bible's scope (a) the learning engine only, with the
legacy shipped surface explicitly out of scope, or (b) all of Cairn's evidence handling, including the
legacy `lm7` weak-spot tracker and per-section thresholds that real testers experience today?

**3. Why it cannot be inferred.** This is a scope question about the Bible itself, and only the founder
can set it. The stakes are concrete: **everything else in this package describes a system no shipping
build can reach**, while a *different* evidence system — 3+ errors keyed by the correct-answer string,
per-section thresholds of 0.6–0.7, a separate Leitner store — is what a dev-apk tester actually
encounters. If the Bible is engine-only, it is Canonical over something unreachable while the reachable
system stays ungoverned.

**4. Current source positions.** ADR-0020 forbids papering over the two-system gap with fake `lm7`
markers but does not say who governs the legacy system. The Canon Map assigns Mastery & Evidence the
domain without qualifying which implementation. No source resolves it.

**5. Current implementation reality.** Two disjoint evidence systems, in different product stages, with
coincidentally identical numbers (threshold 3; Leitner `[0,1,3,7,30]`) and genuinely different
semantics (item-keyed vs string-keyed; decrement vs reset-to-zero; attribution policy vs none).

**6. Draft recommendation.** **Scope (b) — the Bible governs the domain, not a module — with the legacy
surface explicitly recorded as non-conforming, frozen, and slated for replacement rather than
retro-fitting.** Governing only the unreachable system would let the shipped one drift ungoverned, and
the numeric coincidence would keep inviting readers to mistake the two for one.

**7. Strongest alternative.** Scope (a) — engine only. The legacy surface is a temporary Dev APK skin
(ADR-0007) already destined for replacement; writing rules for it is effort spent on something being
deleted, and declaring it non-conforming creates a permanent open defect that will never be closed by
fixing it.

**8. Consequence of the recommendation.** The Bible must state plainly that the currently shipping
evidence behaviour does not conform to it. That is an uncomfortable sentence but a true one, and it
keeps the debt visible in exactly the way ADR-0020 intends.

**9. Consequence of the alternative.** Cleaner scope; but the shipped weak-spot tracker has **no**
governing document, and the two-system divergence lives only in audit findings — the condition that
produced this contradiction in the first place.

**10. Affected `ME-###` rows:** ME-027; consequential ME-026, ME-034, ME-057, ME-058.
**11. Affected downstream layers:** Engineering (convergence plan), Product (stage exposure), Operations (what smoke tests assert).
**12. Weakest-member test.** The claim *"this Bible governs Cairn's evidence"* was tested against each
evidence-bearing system: engine mastery ✔ · legacy `lm7` weak spots ✘ · legacy `lm7_srs` ✘ ·
legacy per-section thresholds ✘ · telemetry (correctly out of scope) n/a. **Under scope (a) the claim
holds for 1 of 4 real systems — and not the one that ships.**
**13. Timing:** `REQUIRED NOW`.
**14. Founder response template:** `FQ-8 = [A] domain scope; legacy recorded as non-conforming · [B] engine-only scope · [C] other — ______`

---

## Compact response template

Copy, fill, return. `A` = Draft recommendation, `B` = strongest alternative, `C` = your own wording.

```
Mastery & Evidence — Founder Decisions (date: ________)

REQUIRED NOW
FQ-1  near-miss polarity          = [ A / B / C ] ______________________
FQ-6  invalidation model          = [ A / B / C ] ______________________
FQ-8  scope over legacy surface   = [ A / B / C ] ______________________

REQUIRED BEFORE PROMOTION
FQ-2  differential evidence weight= [ A / B / C ] ______________________
FQ-3  assistance as evidence input= [ A / B / C ] ______________________
FQ-4  weakness permanence         = [ A / B / C ] ______________________
FQ-5  mastery vocabulary          = [ A / B / C ] ______________________
FQ-7  locked vs tunable constants = [ A / B / C ] ______________________

Notes / additional instruction:
____________________________________________________________________

Explicitly NOT authorized by these answers (leave as-is to confirm):
  - no code, schema, event, threshold, validator or UI change
  - no promotion of this Bible to Canonical
  - no amendment applied to ADR-0021 or any vault file
  - no implementation opening
```

> **Answering these questions does not open implementation and does not promote this Bible.** Promotion
> additionally requires an independent adversarial review by someone other than this Draft's author, and
> any future build requires a **new**, scoped, fourteen-element founder opening issued afterwards.
