# The six behaviours: duplicate audit

**What this is.** Before distributing the six approved behaviours under the
existing scales, the brief asks whether they are already in the corpus. This is
that measurement, over all 25 authored v1 lessons (L0–L24), taken from the
content itself rather than from memory.

**What this is not.** It does not decide where the six belong. That is a
product decision, and the measurement is what it should be made from.

**How to read the numbers.** Each behaviour is measured through a structural
proxy, and a proxy is not the behaviour. Where a proxy turned out to be
measuring the renderer's contract rather than an authoring choice, that is said
so — the first pass of this audit got two of them wrong in exactly that way, and
reporting the loose number would have claimed a behaviour is everywhere when it
is rare.

---

## Result

| Behaviour | Present? | Measured |
|---|---|---|
| **Derivation Ladder** | **Rare** | 4 instances, in **L7 only** |
| **One New Piece** | Present as a lesson property | 9 of 25 lessons declare exactly one acquisition demand: L2, L4, L6, L9, L11, L15, L18, L21, L22 |
| **Consequence Turn** | **Rare** | 12 of 174 reveals continue the scene |
| **Rule From Evidence** | Common | 34 of 48 insight-cards follow evidence in their own flow |
| **Delayed Return** | Ubiquitous, but see below | 367 item re-appearances; **median gap 4 screens** |
| **Paraphrase Relay** | Present, thin | 51 alternative sets; 49 carry a genuinely different sentence |

---

## Per behaviour

### Derivation Ladder — 4 instances, L7 only

Measured as an authored `derivation: { from, via, to }` on a meet-card example:
a form shown as built out of a form the learner already has, in visible steps.

Every one is in L7, and they are the `à + le → au` family added in that lesson's
pass. **This is the one behaviour of the six that is genuinely scarce.** The
field exists, the renderer draws it, the validator checks it
(`DERIVATION-IDENTITY` / `DERIVATION-DRIFT` in `lessonStructure.ts`), and
nothing else in the corpus uses it.

### One New Piece — 9 of 25 lessons

Measured at the lesson level: `acquisitionDemandItemIds.length === 1`. L6's own
copy states the intent out loud ("No new rule. One new piece, *au revoir*, and
the rest you already had.").

Note this is a property of a whole lesson, not of a screen. A per-screen reading
would be a different measurement and would need its own definition.

### Consequence Turn — 12 of 174 reveals

**The first proxy was wrong and worth recording.** Counting reveals with an
`ifCorrect` branch gave 94 across all 25 lessons, which looked like the
behaviour was universal. It is not: `ifCorrect` is what the reveal contract
offers, so counting it measures the renderer.

Tightened to "the reveal's copy carries French" — the other person answering,
the scene continuing, rather than English commentary on a correct answer — the
count is **12 of 174**. The remaining 82 branches say something true about the
answer and then stop.

So the behaviour is rare, and the gap is specific: the product has 94 places
where something could happen next and 12 where something does.

### Rule From Evidence — 34 of 48 insight-cards

Measured as an insight-card that appears after a showcase, pattern-reel or
meet-card in its own flow. 14 insight-cards arrive before any evidence at all.

Partly structural — insight-cards mostly sit mid-lesson, and mid-lesson is
after the opening showcase — so treat this as "the ordering is usually right",
not as a count of deliberate inductive teaching. The 14 that precede any
evidence are the readable finding here.

### Delayed Return — median gap 4

**The second proxy that needed tightening.** 367 item re-appearances exist
across the corpus with a median gap of 4 screens, which means "an item returns
after three screens" is simply what a lesson does. Counting that as the
behaviour would be naming ordinary structure.

The distribution: p90 is 11, the longest is 17, and 79 re-appearances sit at a
gap of 8 or more. If Delayed Return is to mean anything distinct from a lesson
working its own material, the bar has to be well above the median — 8 is where
the tail actually begins.

### Paraphrase Relay — 51 sets, 49 genuinely different

Measured as authored `naturalAlternatives` on a reveal. 49 of 51 carry a
sentence that is not a spelling variant of the model, so the material is honest
where it exists — there is just not much of it: about two per lesson, against
174 reveals.

---

## What the audit says

**Four of the six are not new mechanics.** Rule From Evidence, Delayed Return
and One New Piece describe what the corpus mostly already does, and Paraphrase
Relay exists wherever it was authored. Creating top-level scales for them would
name existing practice rather than add any.

**Two are genuinely scarce, and they are the interesting ones.** Derivation
Ladder lives in one lesson out of twenty-five despite having a field, a renderer
and two validators already built for it. Consequence Turn has 82 reveals that
stop where the scene could have continued.

**The distribution decision is not made here.** What this audit supports is
that the work is concentrating the two scarce behaviours into content that
already has the machinery for them — not building six new scales, six new
renderers, or a second exercise database.

---

*Measured against HEAD at the time of writing, over `content/lessons/v1`. No
device validation is claimed; these are facts about the authored content.*
