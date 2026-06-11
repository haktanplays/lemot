# Round 1 Founder Learning Slice (workstream spec)

Status: LOCKED plan for Round 1 content implementation.
Owner: Operator. Implementation: cloud PRs per the breakdown in section 10.
Aligned to the active syllabus canon in `docs/syllabus/` (L01 to L06 specs).
Supersedes the earlier 5-lesson draft sequence (Je suis / C'est / Non /
J'ai / integration); that draft was a temporary slice proposal.

---

## 1. Purpose

- This is not the full Founder product.
- This is not a one-lesson technical smoke APK.
- It is the first real learner-facing slice.
- It follows the active L1-L6 syllabus spine directly, with L0 as a
  first-use bridge. This avoids creating temporary lesson content that
  would later need to be rewritten against canon.

## 2. Round 1 learner experience target

A trusted tester should finish the slice feeling:

- I used French immediately.
- I produced my own French.
- Weave makes sense.
- Natural Reveal feels different from normal app feedback.
- Le Mot feels calm, premium, and distinct.
- I want to continue.

## 3. Locked sequence

- L0: Lesson Zero / First French Moment. Role: first-use bridge, not
  mastery. Not counted as Lesson 1.
- L1: Survival Kit. Owned target: practical survival chunks and polite
  first-use language.
- L2: Être. Owned target: être as the first production engine.
- L3: Negation / yes-no / tu-vous. Owned target: ne...pas, yes-no
  intonation, tu/vous as social choice.
- L4: Avoir-state. Owned target: j'ai state chunks and the être vs avoir
  contrast.
- L5: Objects / articles. Owned target: un/une as noun packages, le/la
  identity only.
- L6: Integration. Owned target: recombine L1-L5 in a small human scene.
  This is the Round 1 payoff lesson.

L7 (Aller / movement) is the next lesson after Round 1. It is not part of
this slice.

## 4. Lesson-by-lesson plan

### L0: Lesson Zero / First French Moment (exists)

- Lesson id: the hardcoded first-run screen (app/lesson-zero.tsx), with
  `v1-lesson-000` as related content (see risk P2).
- Title: First French Moment.
- Learner feeling: I used French in my first minute.
- Can-do: Say one polite French request out loud and understand it.
- Active new items: none in the mastery sense. Bridge exposure only:
  bonjour, je voudrais un café, s'il vous plaît, merci.
- Supported/recycled: none (first contact).
- Screen count: as shipped (keep).
- Screen types: as shipped.
- Weave count: 1 guided (as shipped).
- Say It Your Way: none / guided write only (as shipped).
- Natural Reveal: as shipped.
- Constraint: L0 must not pretend to fully teach the request system.
  L1 owns that.

### L1: Survival Kit (`v1-lesson-001`, replaces the current Je suis slot)

- Title: Survival Kit.
- Learner feeling: I can handle a first real exchange.
- Can-do: Greet, ask for something politely, thank, and close.
- Active new items: bonjour (promoted from L0), merci, s'il vous plaît
  (promoted), je voudrais (promoted), un café (as a package).
  Compact kit of about 5. No phrasebook bloat.
- Supported/recycled: au revoir, excusez-moi (supported);
  je ne comprends pas (recognition seed for L3); je veux contrast appears
  only inside a reveal or trap, never as a production target.
- Screen count target: 10.
- Screen types: meet x2, insight x2, fill x1, weave x2, say-it x1, recap.
- Weave count: 2 (both `supported`).
- Say It Your Way: final production (order politely), model-answer-only.
- Natural Reveal: politeness contrast (je voudrais vs je veux) explained
  calmly; alternatives show the shorter natural order form.

### L2: Être (`v1-lesson-002`)

- Title: Être.
- Learner feeling: I have my first French engine.
- Can-do: Say who, how, or where I am, and react with c'est.
- Active new items: je suis, je suis ici, c'est.
- Supported/recycled: c'est bon, c'est moi (supported); vous êtes
  (supported only, identification); tu es and the wider paradigm stay
  recognition. No full conjugation table.
- Implementation note: most of the current shipped Je suis screens
  migrate here (see section 6).
- Screen count target: 10.
- Screen types: meet x2, insight x2, fill x1, weave x2, say-it x1, recap.
- Weave count: 2 (`supported`, `mid`).
- Say It Your Way: final production (identify yourself to someone).
- Natural Reveal: `naturalAlternatives` for c'est variants; engine framing
  (same shape, different moment).

### L3: Negation / yes-no / tu-vous (`v1-lesson-003`)

- Title: Non.
- Learner feeling: I can say no and choose how I speak.
- Can-do: Say no, say what I am not, ask a yes-no question by intonation,
  and choose tu or vous.
- Owned target: ne...pas and basic control. The sandwich is the lesson.
- Active new items: oui, non, ça, the ne...pas frame, je ne suis pas,
  ce n'est pas.
- Supported/recycled: non merci (supported); tu es / vous êtes and the
  prêt chunks (recycled, register overlay only); je voudrais + ça (L0/L1).
- Hard constraints: yes-no questions are intonation-first. Do not open
  inversion. Do not open full est-ce que expansion. Do not open
  ne...plus, ne...jamais, ne...rien. Do not turn tu/vous into a
  conjugation lesson; it rides known forms only.
- Screen count target: 11.
- Screen types: meet x2, insight x2, fill x2, weave x3, say-it x1, recap.
- Weave count: 3 (all `mid`; negation transforms, e.g. say you are NOT
  ready).
- Say It Your Way: final production (politely refuse something).
- Natural Reveal: register note for c'est pas (spoken) vs ce n'est pas
  (full form). The reveal explains the register; it never marks the
  spoken form wrong.

### L4: Avoir-state (`v1-lesson-004`)

- Title: J'ai.
- Learner feeling: French puts feelings on have. I get it.
- Can-do: Say what I feel and what I need, using j'ai the French way.
- Active new items: j'ai, j'ai faim, j'ai une question; j'ai besoin de
  only if it stays safe inside one frame, otherwise supported.
- Supported/recycled: je n'ai pas (recycles L3 negation, supported);
  une idée; the je suis vs j'ai micro-contrast (registry item exists);
  elision insight (registry item exists).
- Hard constraints: do not open the full avoir paradigm. Do not open age
  or numbers.
- Screen count target: 10.
- Screen types: meet x2, insight x2 (contrast + elision), fill x1,
  weave x2, say-it x1, recap.
- Weave count: 2 (`mid`, `context`).
- Say It Your Way: final production (say what you need).
- Natural Reveal: contrast reveal. English is hungry; French has hunger.

### L5: Objects / articles (`v1-lesson-005`)

- Title: Un, une.
- Learner feeling: the little words make sense now.
- Can-do: Ask for and name objects with the right little word in front.
- Active new items: un / une as noun packages inside known frames:
  un café, une question; frames c'est un ..., j'ai une ...,
  je voudrais un ...
- Supported/recycled: le café, la phrase as identity recognition-light
  (c'est le / la ... only); all carrier frames recycled from L1-L4.
- Hard constraints: do not open plural articles. Do not open partitives
  (du / de la / des). Do not open negation after articles (pas de).
  Do not open the full gender system. Gender enters as a package, not a
  rule. Do not overload grammar.
- Screen count target: 10.
- Screen types: meet x2, insight x1, fill x2 (trap: un vs une package),
  weave x2, say-it x1, recap.
- Weave count: 2 (`context`).
- Say It Your Way: final production (ask for something, right little
  word included).
- Natural Reveal: package framing; the reveal names the package, not a
  gender rule.

### L6: Integration (`v1-lesson-006`)

- Title: Un petit moment.
- Learner feeling: I just held a whole small French moment.
- Can-do: Walk into a small human scene: greet, identify, state, refuse
  politely, request with the right article, and close.
- Active new items: au revoir (promoted to active for the close). At most
  one more if the scene needs it. Otherwise zero.
- Supported/recycled: everything from L0-L5.
- Scene rule: a small human scene, not a test, and not another counter
  transaction (canon flags café-centricity).
- Screen count target: 12.
- Screen types: meet x1, insight x1, fill x1, weave x3, say-it x2, recap.
- Weave count: 3 (`context`, `context`, `open`).
- Say It Your Way: one mid-scene, one final scene close. Use `answerBands`
  for richer deterministic reveal.
- Natural Reveal: use the `ifBetterThanExpected` branch; alternatives show
  shorter natural versions.

Totals: L0 as shipped plus about 63 new-lesson screens. Approximately
30 to 35 minutes end to end at the shipped per-screen pace.

## 5. Current v1 capabilities (reuse, do not extend)

Supported screen types, all renderer-proven: `meet-card`, `insight-card`,
`fill-with-traps`, `weave`, `say-it-your-way`, `natural-reveal`, `recap`.
Validation modes proven in shipped content: `exact-or-alternative`,
`model-answer-only`. Weave types available: `supported`, `mid`, `context`,
`open`. All new lessons reuse these existing types. No new lesson
architecture. No renderer refactor.

Authoring note from the shipped normalizer: accents are normalized and
trailing periods dropped, but `?` and `!` are not stripped. Question-form
expected answers must list a no-question-mark accepted alternative.

## 6. Current repo mismatch (P0 planning note)

The repo today has `v1-lesson-001` = Je suis. The active canon says L1 is
Survival Kit and être belongs to L2. Content implementation must make a
numbering and mapping decision before any L1-L6 content file is written:

- Preferred direction: `v1-lesson-001` becomes Survival Kit, and the
  existing Je suis content moves to `v1-lesson-002` as the seed of the
  Être lesson (most of its screens survive there).
- This decision is NOT solved in this docs PR. It is resolved in PR C
  before content PRs start.
- Until resolved, no lesson content file is created or renamed.

## 7. Registry additions forecast (forecast only, not implementation)

Exact IDs follow the repo's current item ID convention (`type-slug`, see
`content/itemRegistry.ts`). The `prefix:` v0.1 migration remains
post-smoke canon; do not mix conventions in this slice.

- L1: chunk-merci, chunk-au-revoir, chunk-excusez-moi,
  chunk-je-ne-comprends-pas (recognition seed). bonjour, je voudrais,
  s'il vous plaît, café already exist.
- L2: chunk-c-est-bon, chunk-c-est-moi. chunk-c-est, chunk-je-suis,
  chunk-je-suis-ici, chunk-vous-etes already exist.
- L3: chunk-oui, chunk-non, pronoun-ca, chunk-je-ne-suis-pas,
  chunk-ce-n-est-pas, chunk-non-merci, grammar-ne-pas-sandwich.
- L4: chunk-j-ai-faim, chunk-j-ai-une-question, chunk-j-ai-besoin-de
  (only if kept active). chunk-j-ai, micro-je-suis-vs-j-ai,
  sound-elision, noun-question, noun-idee already exist.
- L5: article-un, article-une, article-le, article-la (or package chunks
  chunk-un-cafe, chunk-une-question, chunk-le-cafe, chunk-la-phrase plus
  noun-phrase; decide in the L5 content PR).
- L6: none beyond au revoir promotion, unless the scene needs one.

About 18 to 20 new entries total.

## 8. Home/routing plan

- The dynamic route `/v1-lesson/[id]` already serves any registered
  lesson. No route changes.
- A future Home change (PR F) replaces the single hardcoded lesson card
  with a small list of registered lessons L1 to L6.
- Unlock is simple and linear: lesson n+1 unlocks when lesson n has a
  completion marker. Completed lessons show a quiet done state.
- L0 remains the first-use bridge before the numbered lesson path. It is
  not a card in the lesson list.
- No Daily Review, Practice, Mon Lexique, Chat, Paywall, Word Graph, or
  V4-B expansion.

## 9. Validation strategy

PR B must land before any new lesson content:

- Structural validator test over all `V1_LESSONS`:
  - every screen `targetItemIds` and payload `itemId` resolves in
    `ITEM_REGISTRY` (these are plain strings today, not compile-checked),
  - every weave has non-empty `expectedAnswers` and a reveal,
  - every fill `answer` id exists among its `options` with at least one
    correct option,
  - lesson numbers are unique and sequential,
  - prerequisites resolve to registered lessons,
  - no repeated negation tokens (ne ne, pas pas).
- Copy guard extension: scan all `V1_LESSONS`, not only lesson-001.
- If practical in the same test: question-form expected answers must carry
  a no-question-mark accepted alternative.

## 10. PR breakdown

- PR A: this workstream spec (docs only).
- PR B: v1 lesson structural tests plus copy guard extension.
- PR C: numbering/mapping decision and Lesson Zero / L1 alignment plan.
- PR D: registry additions batch 1 plus L1 Survival Kit content.
- PR E: L2 Être content (migrating the current Je suis screens).
- PR F: Home lesson list plus simple sequential unlock.
- PR G: L3 Negation / yes-no / tu-vous content.
- PR H: L4 Avoir-state content.
- PR I: L5 Objects / articles content.
- PR J: L6 Integration content.
- PR K (optional): copy tuning after the internal emulator pass.

One PR, one product intention. Content PRs stay content-only after PR D.

## 11. Build rule

- No external tester APK before L0 plus L1-L6 are complete (through PR J)
  plus one internal emulator pass.
- An internal emulator checkpoint is allowed after PR F (L2 plus the
  Home list).
- Do not build the tester APK after only L3 or L5 if L6 integration is
  not present. The arc must end on the payoff, not on a system lesson.
- Round 1 is meant to test learning feeling, not only technical flow.

## 12. Risk table

P0:

- Repo numbering mismatch: `v1-lesson-001` is Je suis, but canon L1 is
  Survival Kit. Resolved by PR C before content. Until then, no content
  files.
- Screen-level itemId strings are not type-checked; a typo ships silently
  today. PR B closes this. PR B lands before content.
- The copy guard covers only lesson-001 today; L2-L6 copy would ship
  unguarded without PR B.

P1:

- L3 becomes too heavy if it opens full question systems or tu/vous
  conjugation. Mitigations: intonation-only questions, overlay-only
  tu/vous, active-item cap of about 6.
- L5 becomes too grammatical if it opens plural, partitive, pas de, or
  gender rules. Mitigation: packages only, hard constraint list in
  section 4.
- Home unlock logic is the only runtime change on the tester path.
  Keep it linear and dumb; emulator glance before any build.
- Accepted alternatives for punctuation (`?` is not stripped) and
  apostrophe variants (c'est, n'est, j'ai typed with straight quotes).

P2:

- Orphaned `v1-lesson-000` content vs the hardcoded Lesson Zero screen.
- estimatedMinutes truthing after the emulator pass.
- TTS quality of the new French strings (device smoke).

## 13. Explicit non-goals

- No AI-assisted validation.
- No microphone.
- No account.
- No Supabase.
- No Practice tab.
- No Chat.
- No Paywall.
- No full Mon Lexique.
- No Word Graph.
- No V4-B implementation.
- No broad renderer refactor.
- No new lesson architecture.
