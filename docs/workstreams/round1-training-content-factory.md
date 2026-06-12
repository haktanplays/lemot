# Round 1 Training Content Factory (workstream doc)

Status: DRAFT production contract for Round 1 content generation.
Owner: Operator. Docs-only; authorizes no code, content, or runtime change.
Companion docs: `docs/workstreams/round1-founder-learning-slice.md` (locked
slice spec, lesson definitions), `docs/workstreams/round1-l3-l6-content-plan.md`
(L3-L6 sequencing and gates), `docs/workstreams/round1-test-plan.md` (what
Round 1 must prove), `docs/STATUS.md` (execution state).

This is a production contract, not a runtime implementation. It defines how
L3-L6 content is generated, what each lesson must leave behind, and the limits
on the agent that drafts it. Where it touches lesson scope, the slice spec and
the L3-L6 content plan win.

---

## 1. Purpose

Round 1 content generation must produce training content, not just lesson
screens.

Le Mot should behave less like an app-engagement game and more like a
disciplined language training gym. The goal is not to get a user to open the
app; it is to drive disciplined progress: input, output, interaction, recall,
spaced repetition, checkpoint measurement, and Mon Lexique ownership. A tester
should feel that a few Le Mot lessons give more comprehensive progress than
many shallow lessons elsewhere.

To support that without building new runtime, every new lesson must leave
behind reusable material: not only the screens a learner sees, but the seeds
that future input, output, interaction, review, checkpoint, Mon Lexique, and
weak-point systems will consume. Round 1 ships only the screens. The rest is
authored as data and notes now so the later systems do not require re-authoring
the content.

## 2. Product model: Le Mot as language gym

The training surfaces below are conceptual. They name the kinds of work a
lesson should generate material for. They are NOT Round 1 runtime requirements,
and this document does not authorize building any of them as app areas.

- Learn Area: the new chunk, frame, or pattern the lesson owns.
- Input Area: listening, reading, noticing. Comprehensible input before output.
- Output Area: writing and speaking. The learner produces French.
- Interaction Area: guided dialogue or scenario, locked to lesson scope.
- Review Area: recall and spaced repetition over already-opened items.
- Checkpoint Area: a calm proof-of-progress quiz over owned material.
- Lexique Area: the learner's owned items and example sentences.

Round 1 runtime today renders Learn, Input, Output, and a light Interaction
inside the seven proven screen types. Review, Checkpoint, and Mon Lexique are
authored as seeds only. Do not implement new app areas in this PR or in the
L3-L6 content PRs.

## 3. Training Pack output

Every lesson generation produces or explicitly accounts for a Training Pack.
"Accounts for" means a short note saying why an item is empty or deferred, not
silence. Round 1 ships items 1, plus the Mon Lexique examples and weak-point
tags that already exist as item metadata. The rest are authored as data and
notes alongside the lesson, not as runtime.

1. Lesson screens. The shipped, validated `LessonScreen[]` (runtime).
2. Input drill seeds. Listen/read/notice prompts reusing the lesson's items.
3. Output drill seeds. Production prompts (write/say) reusing the lesson's
   frames.
4. Interaction seeds. Short guided-dialogue or scenario sketches, lesson-locked.
5. Micro review seeds. One or two immediate recall items for end of lesson.
6. Spaced repetition seeds. The same items tagged with a review horizon
   (next-session, multi-day) for a future scheduler. No scheduler is built now.
7. Checkpoint quiz atoms. Small, self-contained recall items usable in a later
   general review, each over a single owned item or frame.
8. Mon Lexique examples. Learner-facing example sentences per owned item, drawn
   from the lesson's own French.
9. Weak-point tags. The `weakPointTags` already carried by items and screens,
   listed so a future weak-point tracker can consume them.
10. Metaphor usage notes. Which metaphors (section 5) the lesson uses, at which
    maturity stage.
11. Interstitial card continuity notes. Which cards (section 6) the lesson uses
    and how they connect backward and forward.
12. Deferral notes. What was intentionally not taught, and where it lands later.
13. Self-review report. The agent's own pass over the lesson against the human
    checks in section 9, written before the PR opens.

The Training Pack for Round 1 lives next to the lesson as authored data and as
PR-body notes. It does not add runtime surfaces. The structural and content
validators still apply only to the shipped screens and registry.

## 4. Review and measurement philosophy

Review must support progress, not punish failure.

- Review does not block path progress by default. A learner advances even after
  a missed recall item.
- Review is short, calm, and recall-focused. It is not an exam.
- Review introduces no unseen grammar and uses only already-opened canonical
  items from `ITEM_REGISTRY`.
- A wrong answer is a muscle to train, not a failed test. Feedback names the
  correct form plainly and moves on. No score, no streak, no punishment copy.

Four review horizons, authored as seeds now, runtime later:

- Immediate micro-review: one or two recall items at the end of a lesson, over
  that lesson's own items.
- Next-session review: a small recall set drawn from the previous lesson, shown
  at the start of the next.
- General review: a periodic mixed set over all owned items, calm and optional.
- Checkpoint quiz: a proof-of-progress pass over owned material, framed as "see
  what you can already do", never as a gate the learner can fail out of.

Round 1 ships none of these as runtime. They are authored so the later Review
stream has content on day one.

## 5. Metaphor canon

A small set of recurring, simple metaphors gives patterns a stable mental
image across the whole syllabus. Metaphors are authored once and matured, not
replaced.

Rules:

- Simple, not childish.
- Memorable, not gimmicky.
- Consistent, not random.
- Visual, not cartoonish.
- One concept family gets one metaphor. No conflicting images for the same
  pattern.
- An early metaphor may mature later (more precise language), but the core
  image does not change.

Proposed metaphor metadata (authored as data, not runtime):

- `metaphorId`: stable id.
- `conceptFamily`: the grammar or usage family it serves.
- `firstLesson`: where it is introduced.
- `coreImage`: the one-sentence mental picture.
- `allowedLanguage`: phrasings the content may use.
- `forbiddenLanguage`: phrasings that would distort the concept.
- `earlyUse`: how it is named in the first lessons.
- `midUse`: how it is named once the learner is comfortable.
- `lateUse`: the mature framing in later lessons.
- `exampleCards`: card ids that carry it (section 6).
- `relatedItems`: registry item ids it explains.

Worked example, negation:

- `metaphorId`: `metaphor-negation-sandwich`
- `conceptFamily`: negation
- `firstLesson`: L3
- `coreImage`: ne and pas sit around the action, one on each side.
- `earlyUse`: the ne...pas sandwich.
- `midUse`: the ne...pas frame around the verb.
- `lateUse`: a two-part negative frame.
- `forbiddenLanguage`: saying ne alone means "no"; treating pas as optional in
  learner-facing early lessons; implying the sandwich is the only negation form
  (later negations exist but are out of Round 1 scope).

L3 introduces this metaphor; any later negation lesson reuses the same core
image at a more mature naming, never a new image.

## 6. Interstitial card continuity

Cards are short non-screen beats inside or between lessons. They use the
existing `insight-card` and `recap` screen types in Round 1; the categories
below are authoring intents, not new mechanics.

Card types:

- Insight Card: names why a pattern works (one idea, no table).
- Recall Card: a calm prompt to retrieve a known item.
- Contrast Card: two forms side by side (je voudrais vs je veux; je suis vs
  j'ai).
- Bridge Card: connects the current lesson to a previous one.
- Preview Card: a light forward hint, never teaching the future form.
- Coach Card: a short reassurance or framing beat, no gamification.
- Metaphor Card: carries a metaphor from section 5 at the right maturity.

Rules:

- Cards support flow; they do not interrupt it.
- Cards have continuity within a lesson (a Preview pays off later in the same
  lesson or the next).
- Cards preserve continuity across lessons. A later lesson may refer back to an
  earlier metaphor in a more mature form.
- No random cute copy. No conflicting explanations for one pattern.
- In Round 1, a card maps to an allowed screen type. A card type with no
  matching screen type is an authoring note only, not a runtime element.

## 7. Content Agent requirements

The agent that drafts Round 1 lessons is a Training Content Agent, not merely a
Lesson Agent. It produces a full Training Pack, not just screens.

Required properties:

- canon-aware: reads the slice spec, L3-L6 plan, and test plan before drafting.
- schema-aware: produces data valid against `content/lessonTypes.ts`.
- validator-driven: runs the validators and treats them as the floor, not the
  ceiling.
- diff-aware: makes minimal, reviewable diffs; one lesson per PR.
- review-seed-aware: authors the review and checkpoint seeds, not only screens.
- input-output-aware: balances comprehensible input before production.
- mastery-aware: respects active vs supported vs recognition status per item.
- metaphor-aware: uses the metaphor canon consistently.
- interstitial-card-continuity-aware: keeps cards connected backward and
  forward.
- self-critical: writes the section 9 self-review before opening a PR.
- scope-locked: stays inside the lesson's allowed items and deferrals.
- non-merge-authorized: never merges its own PR.

## 8. Agent permissions and limits

The agent may:

- draft a lesson brief,
- draft a lesson file,
- draft Training Pack metadata,
- draft review seeds,
- draft checkpoint atoms,
- draft Mon Lexique examples,
- run validation,
- self-review,
- prepare a PR body.

The agent may not:

- change canon (slice spec, test plan, this contract),
- invent new grammar scope beyond the lesson's allowed items,
- create new screen mechanics or validation modes,
- change runtime UI,
- open Practice, Chat, Paywall, or AI surfaces,
- declare a tester APK ready,
- merge its own PR.

Operator approval and a human pedagogy pass (section 9) are required before any
content PR merges.

## 9. Validator and human review gates

Two gates, kept separate. Deterministic validation cannot judge pedagogy, and
human review cannot replace the validators.

Deterministic checks (must pass; the floor):

- lesson id present and unique,
- lesson number sequential, no gap,
- prerequisites resolve to registered lessons,
- every referenced registry item exists,
- only supported screen types and validation modes,
- copy guard over the new screens (no banned terms, no em or en dash),
- structural guard (fills answerable, weaves have answers and a reveal,
  question-form weaves carry a no-question-mark alternative, no repeated
  negation tokens),
- `npm run validate:content` 0/0/0,
- `npm run typecheck` clean,
- `npm run test:learning-engine` green,
- `git diff --check` clean.

Human checks (must pass; the judgement the validators cannot make):

- the lesson feels like use, not grammar study,
- cognitive load is acceptable for its position in the arc,
- metaphors are consistent with the canon,
- traps are useful contrasts, not trick questions,
- review and checkpoint seeds are appropriate and over owned items only,
- the lesson preserves the Round 1 test hypotheses (H1-H6) it claims to
  support.

## 10. L3-L6 application

L3 is the first lesson implemented under this factory contract. It is the main
H3 probe (patterns understood by the second or third lesson) and it introduces
the negation metaphor, so it must include the section 5 metaphor usage notes
and the section 6 continuity notes for negation.

L4, L5, and L6 follow the same Training Pack requirement. Each authors its
input/output/interaction/review/checkpoint/Lexique seeds, its metaphor and card
notes, and its deferral and self-review notes, even though Round 1 ships only
the screens.

L6 integration includes checkpoint-style atoms (proof of progress over L1-L5)
but stays a small human scene, not a punitive exam. The L6 integration rule in
the L3-L6 content plan (section 4 there) still governs: zero new grammar, at
most one new item, scene over quiz.

Per-lesson scope, items, deferrals, and PR review focus remain owned by
`docs/workstreams/round1-l3-l6-content-plan.md`. This contract adds the
Training Pack, metaphor, card, and agent layers on top of that plan; it does
not change lesson scope.

## 11. Explicit non-goals

Do not implement, in this PR or in the L3-L6 content PRs:

- Review runtime.
- Practice Hub.
- Daily Review.
- A Checkpoint screen.
- Mon Lexique runtime integration.
- Home redesign or new app areas.
- AI generation runtime.
- L3-L6 lesson files (no lesson content is created by this contract).

The Training Pack seeds are authored data and notes, not running systems. If a
good idea here does not block Round 1, it goes to the migration notes or a
later backlog, per the test plan's non-goals.

## 12. Proposed next sequence

This contract maps onto the slice spec PR lettering (PR G-J) used in the L3-L6
content plan. The numbers below are the working PR order:

- PR #125: this Training Content Factory contract (docs only).
- PR #126: L3 implementation using the factory contract (slice spec PR G).
- PR #127: L4 implementation using the factory contract (slice spec PR H).
- PR #128: L5 implementation using the factory contract (slice spec PR I).
- PR #129: L6 integration using the factory contract (slice spec PR J).
- Later: a review and checkpoint runtime stream that consumes the seeds
  authored across PR #126-#129. Out of scope for Round 1.

One PR, one product intention. Content PRs stay content plus their Training
Pack data; no runtime systems are added to pass this contract.

---

End of Round 1 Training Content Factory contract. Production contract, not
runtime implementation. The slice spec owns lesson definitions, the L3-L6 plan
owns sequencing and per-lesson scope, the test plan owns what Round 1 proves,
and this doc owns what each lesson must leave behind.
