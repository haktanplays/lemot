# Round 1 L3-L6 Content Plan (workstream doc)

Status: PROPOSED implementation plan. No lesson files exist yet for L3-L6.
Owner: Operator. Implementation: one content PR per lesson, per section 6.
Sources: `docs/workstreams/round1-founder-learning-slice.md` (locked slice
spec; lesson definitions in its section 4 stay canonical),
`docs/workstreams/round1-test-plan.md` (what Round 1 must prove),
`docs/STATUS.md`, and the shipped lesson files under
`lemot-app/content/lessons/v1/`.

This plan adds sequencing, hypothesis mapping, and merge gates. Where it
summarizes lesson content, the slice spec wins on any conflict.

---

## 1. Purpose

Translate the Round 1 test plan into bounded L3-L6 content work. The test
plan gates the tester APK behind the full L1-L6 slice plus a device pass.
This document defines how the four missing lessons get built: order, PR
boundaries, allowed scope, and the gates each PR must clear. It is a plan
only; no lesson file is created by this document.

## 2. Current implemented base

As of main `31538ba`:

- `v1-lesson-000`: L0 bridge twin, registered at number 0, deep-link only.
  The hardcoded Lesson Zero screen remains the real first-use bridge.
- `v1-lesson-001`: L1 Survival Kit. 10 screens, 5 active items, vous
  register, deterministic say-it.
- `v1-lesson-002`: L2 Être seed. 10 screens, je suis architecture target,
  prerequisite on L1. The c'est extension is deferred (PR E in the slice
  spec).
- `v1-lesson-003` to `v1-lesson-006`: pending. `V1_LESSONS` ends at
  number 2, so each new lesson must land with a sequential number and
  resolving prerequisites or the structural tests fail.
- Registry today covers L1-L2 plus some L3-L4 ground: `pronoun-tu`,
  `pronoun-vous`, `chunk-tu-es`, `chunk-vous-etes`, `chunk-tu-es-pret`,
  `chunk-vous-etes-pret`, `chunk-j-ai`, `micro-je-suis-vs-j-ai`,
  `sound-elision`, `noun-question`, `noun-idee` already exist.

## 3. L3-L6 proposed arc

The arc follows the locked sequence in the slice spec. Per-lesson summaries
below; full screen-level definitions live in the slice spec section 4.

### L3: Non (`v1-lesson-003`, negation / yes-no / tu-vous)

- Learning purpose: give the learner control. Say no, negate the être
  shapes they own, ask a yes-no question by intonation, and choose tu or
  vous as a social register.
- Can-do: say no, say what I am not, ask a yes-no question, choose tu or
  vous.
- Why Round 1: refusal and questions are the first moves a real exchange
  demands after greeting and stating. Without L3 the learner can only
  agree.
- Test-plan hypotheses: H3 (patterns understood by the second or third
  lesson), H4 (pacing), H5 (used French, not studied grammar). The ne...pas
  sandwich is the first transform mechanic, so L3 is the main H3 probe.
- Rough shape (spec target): 11 screens. meet x2, insight x2, fill x2,
  weave x3 (all mid; negation transforms), say-it x1 (politely refuse),
  recap. Largest weave load in the slice; watch cognitive load.
- Allowed items: new active items oui, non, ça, the ne...pas frame,
  je ne suis pas, ce n'est pas. Supported: non merci. Recycled: tu es /
  vous êtes and the prêt chunks (register overlay only), je voudrais + ça.
  New registry entries (forecast): chunk-oui, chunk-non, pronoun-ca,
  chunk-je-ne-suis-pas, chunk-ce-n-est-pas, chunk-non-merci,
  grammar-ne-pas-sandwich.
- Strict deferrals: no inversion, no est-ce que expansion, no ne...plus /
  ne...jamais / ne...rien, no tu/vous conjugation lesson.
- Authoring note: intonation questions end in "?", and the structural test
  requires every question-form weave answer to carry a no-question-mark
  accepted alternative. The repeated-negation guard (ne ne / pas pas) is
  already in place.

### L4: J'ai (`v1-lesson-004`, avoir-state)

- Learning purpose: the second engine. French puts feelings and needs on
  have; j'ai opens state and possession without touching the avoir
  paradigm.
- Can-do: say what I feel and what I need, using j'ai the French way.
- Why Round 1: it is the first real "French thinks differently" moment
  (I have hunger), which is exactly the confidence shift the test plan
  watches for.
- Test-plan hypotheses: H4, H5, and H3 continuation (same screen mechanics,
  new engine; the learner should need no re-explanation).
- Rough shape (spec target): 10 screens. meet x2, insight x2 (contrast +
  elision), fill x1, weave x2 (mid, context), say-it x1 (say what you
  need), recap.
- Allowed items: new active j'ai (promoted from supported), j'ai faim,
  j'ai une question; j'ai besoin de only if it stays inside one frame,
  otherwise supported. Recycled: je n'ai pas (supported, recycles L3
  negation), une idée, micro-je-suis-vs-j-ai, sound-elision, noun-question,
  noun-idee (all already registered). New registry entries (forecast):
  chunk-j-ai-faim, chunk-j-ai-une-question, chunk-j-ai-besoin-de (status
  decided in the PR).
- Strict deferrals: no full avoir paradigm, no age, no numbers.

### L5: Un, une (`v1-lesson-005`, objects / articles)

- Learning purpose: make the little words make sense. un/une enter as noun
  packages inside frames the learner already owns.
- Can-do: ask for and name objects with the right little word in front.
- Why Round 1: every request the learner has made so far carries an
  article. L5 names what they have been using, which closes a quiet
  confusion without opening the gender system.
- Test-plan hypotheses: H4 (this is the lightest system lesson; if pacing
  feels heavy here, the slice is overweight) and H5.
- Rough shape (spec target): 10 screens. meet x2, insight x1, fill x2
  (trap: un vs une package), weave x2 (context), say-it x1 (ask for
  something with the right little word), recap.
- Allowed items: un / une as packages in known frames: un café, une
  question; frames c'est un ..., j'ai une ..., je voudrais un ... .
  Recognition-light: le café, la phrase (c'est le / la ... only). Registry
  shape (article items vs package chunks) is decided in the PR per the
  slice spec; see open question Q1.
- Strict deferrals: no plurals, no partitives (du / de la / des), no pas
  de, no gender rules. Gender is a package, not a rule.

### L6: Un petit moment (`v1-lesson-006`, integration payoff)

- Learning purpose: the payoff. One small human scene that recombines
  L1-L5: greet, identify, state, refuse politely, request with the right
  article, close.
- Can-do: hold a whole small French moment.
- Why Round 1: the slice spec and test plan both require the arc to end on
  the payoff, not a system lesson. L6 is what the tester wave is actually
  testing: did five lessons add up to one usable exchange?
- Test-plan hypotheses: H2 and H5 at full strength (richest production),
  H4 (willingness to finish the arc), and the section 5 good signal
  "completes 2 or more lessons" depends on the path to here feeling light.
- Rough shape (spec target): 12 screens. meet x1, insight x1, fill x1,
  weave x3 (context, context, open; the only open weave in the slice),
  say-it x2 (one mid-scene, one final close, answerBands for richer
  deterministic reveal), recap.
- Allowed items: au revoir promoted to active for the close (new registry
  entry chunk-au-revoir). At most one more new item if the scene needs it,
  otherwise zero. Everything else recycled from L0-L5.
- Strict deferrals: no new grammar engine, no test framing, and not
  another counter transaction (canon flags café-centricity; the scene must
  be a small human moment).

## 4. Integration rule for L6

L6 is a payoff lesson, not a new system lesson. Hard rules:

- Zero new grammar. Every frame in L6 was taught in L1-L5.
- At most one new vocabulary item beyond the au revoir promotion.
- The scene must feel like a small real exchange the learner walks through,
  not a quiz over five lessons.
- The learner should finish feeling "I just held a whole small French
  moment", which is the Round 1 learner experience target.
- If an L6 draft needs a form L1-L5 did not teach, the fix is to change the
  scene, never to teach the form inside L6.

## 5. Scope rules

For all four PRs:

- No new mechanics. Only the seven proven screen types: meet-card,
  insight-card, fill-with-traps, weave, say-it-your-way, natural-reveal,
  recap. Validation modes: exact-or-alternative, model-answer-only only.
- No renderer changes.
- No Practice Hub work.
- No Daily Review work.
- No Mon Lexique runtime expansion.
- No AI changes; the slice stays deterministic and offline-capable.
- No paywall work.
- No Home polish (the Home lesson list is PR F, a separate runtime
  workstream; see open question Q3).
- No PR2C or V4-B work.
- No broad Founder claims; Round 1 proves first-session activation only.
- Registry-with-content rule: new registry entries land in the same PR as
  the lesson that references them, never separately.

## 6. Implementation sequence

Follow the slice spec PR lettering. Strictly one lesson per PR, in order,
because each lesson recycles the previous one's items and the structural
tests require sequential numbers:

- PR G: L3 content. Files: `content/lessons/v1/lesson-003.ts`, registry
  additions in `content/itemRegistry.ts`, registration in
  `content/lessons/v1/index.ts`. Review focus: negation transforms stay
  light, question-form weaves carry no-question-mark alternatives, tu/vous
  stays an overlay, active-item cap of about 6.
- PR H: L4 content. Files: `lesson-004.ts`, registry additions, index.
  Review focus: the je suis vs j'ai contrast lands in the insight, j'ai is
  promoted cleanly, elision strings normalize (straight and curly
  apostrophes accepted in weave alternatives).
- PR I: L5 content. Files: `lesson-005.ts`, registry additions, index.
  Review focus: packages not rules; the un vs une fill trap reads as
  helpful, not as a gender exam; deferral list respected.
- PR J: L6 content. Files: `lesson-006.ts`, registry addition
  (chunk-au-revoir), index. Review focus: the section 4 integration rule,
  scene quality, answerBands reveal correctness, estimatedMinutes honesty.

Validations required for every PR (from `lemot-app/`):

- `npm run typecheck`
- `npm run test:learning-engine` (includes the v1 structural and copy
  guards)
- `npm run validate:pools` (no new warnings beyond the 6 known legacy ones)
- `npm run validate:content` (0/0/0)

Each PR also updates prerequisites so the chain stays L1 -> L2 -> L3 -> L4
-> L5 -> L6 with no numbering gap at any point.

Related but outside this plan: PR E (L2 c'est extension) and PR F (Home
lesson list plus sequential unlock) from the slice spec. See open questions
Q2 and Q3 for how they sequence against PR G-J.

## 7. Content quality gates

A lesson PR merges only when all of the following hold:

- `validate:content` reports 0 hard errors, 0 warnings, 0 info.
- The v1 structural guard passes: registered items resolve, fills are
  answerable, weaves have expected answers and a deterministic reveal,
  question-form answers carry a no-question-mark alternative, numbers stay
  sequential, prerequisites resolve, no repeated negation tokens.
- The copy guard passes over the new lesson's screens.
- No banned learner-facing copy: no XP, streak, level, reward, unlocked,
  perfect, amazing, score, percent, scaffold, flow, lab, Mini Mission, or
  Mini Chat in rendered strings (these name what must not appear).
- No em dash or en dash in learner-facing copy.
- Screen count stays at or under the spec target for that lesson (11 / 10 /
  10 / 12) and the active-item count stays at or under the spec cap.
- The PR description states which test-plan hypotheses the lesson supports
  and how (one or two lines, not an essay).
- CI validate is green on the PR head.

## 8. Open questions

Genuine decisions needed before or during implementation. None block PR G.

- Q1 (decide at PR I): L5 registry shape. Article items (article-un,
  article-une, article-le, article-la) or package chunks (chunk-un-cafe,
  chunk-une-question, chunk-le-cafe, chunk-la-phrase plus noun-phrase).
  The slice spec defers this to the L5 content PR. The shipped registry is
  chunk-first, which weakly favors package chunks.
- Q2 (RESOLVED as sequencing note, 2026-06-12): PR E, the L2 c'est
  extension, is not blocking PR G. Re-evaluate before PR I or PR J if the
  L5/L6 scenes need c'est as production to avoid artificial content;
  otherwise keep c'est supported-only in L5-L6. L6 wants c'est frames
  (c'est un ...) and L5 uses c'est carriers, but the shipped L2 seed does
  not teach c'est as production. This is the only content dependency that
  crosses lessons. PR E is not implemented in this plan.
- Q3 (RESOLVED as sequencing note, 2026-06-12): PR F, the Home lesson list
  and sequential unlock, is not blocking PR G content work. It is runtime
  work outside this plan and remains required before tester APK
  distribution if testers need to reach L2-L6 from Home. The slice spec
  allows an internal emulator checkpoint after PR F. PR F is not
  implemented in this plan.
- Q4 (decide at PR H): chunk-j-ai-besoin-de active or supported. The slice
  spec allows active only if it stays inside one frame.
