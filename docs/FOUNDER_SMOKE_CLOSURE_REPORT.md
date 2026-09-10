# Founder smoke feedback — closure report

**Baseline:** `6eba95d`, the commit the founder's dev APK was built from. Every
number below labelled "before" was measured against that tree, because that is
the build the feedback came from.

**Verification surfaces actually used:** iPhone 17 Pro simulator (iOS 26.5) and
a Pixel 5 Android emulator (API 34). Both ran current code through Metro.

---

## 32. Content acceptance matrix

Statuses are FIXED, VERIFIED (fixed **and** confirmed on a device), or
BLOCKED. Nothing is deferred.

| # | Feedback | Implemented change | Source / screen | Evidence | Status |
|---|---|---|---|---|---|
| 2 | Wrong answers praised ("Your meaning lands." for `Aaa`) | `understood` split from `partial`; only a fully-evidenced answer may claim understanding | `NaturalReveal.tsx`, `answerComponents.ts` | `gradingTrust.test.ts`; gate GRADING ×5 | VERIFIED |
| 3 | Typed field hidden behind the keyboard | `taskAnchor` + `scrollToEnd` when the IME opens | `LessonScreenFrame.tsx` | gate KEYBOARD ×3 | VERIFIED |
| 4 | Nested chain lost its step on cold start | step persisted in the cursor as `chainScreenId` + `stepIndex` | `lessonCursor.ts`, `LessonRendererV1.tsx` | `lessonContinuity.test.ts`; gate CONTINUITY ×4 | VERIFIED |
| 5 | "A lesson you have done" was a fake choice | real picker; selecting the mode no longer strands the learner in the cold-start screen | `PracticeStart.tsx`, `practice-hub.tsx` | device: 10 pills, Être→3 items, Faire une pause→2 | VERIFIED |
| 6 | Flat Showcase sentences | every line classified; `SC-001..005` fail the build on an undeclared flat line | `showcaseClassification.ts`, all 10 lessons | 0 unclassified (§33) | VERIFIED |
| 7 | `c'est où` inconsistency, `J'ai une question` oversized, `du thé` unexplained | one boundary per piece of French; exact reconstruction required; `du thé` authored and explained | `showcasePieces.ts`, L2/L5/L8/L10 | `chunkBoundaries.test.ts`; gate CHUNKS ×3 | VERIFIED |
| 8 | Sentences repeated too often | bare returns curated to ingredients | L6, L8, L10 | bare returns 4 → 0 (rank-aware) | FIXED |
| 9 | Too test-heavy, curiosity underrepresented | 9 depth cards on the three lessons that had none | L6, L9, L10 | depth cards 0 → 32 | FIXED |
| 10 | Seed count ≠ perceived variety | 10 duplicate jobs deleted, 3 re-pointed at listening gaps, 3 missing `fill` surfaces added | `content/practice/seeds/` | duplicate jobs 28 → 15; all 7 surfaces in every lesson | FIXED |
| 11 | minimal/good/natural was punctuation | tiers now differ in register; prosody moved to the Sound layer | L6, L7, L10 | punctuation-only ladders 3 → 0 | FIXED |
| 12 | Multi-step revealed the next answer | 7 copy-not-retrieval pairs reworked | L3, L5, L7, L8, L9 | `chainPedagogy.test.ts`; gate MULTI-STEP | FIXED |
| 13 | Distractors too obvious | 24 listening + 11 sentence distractors rebalanced | lessons + seeds | pick-the-longest 49% → 35% (chance 33%) | FIXED |
| 14 | Teach before ask (`Désolé, je dois partir.`) | `beaucoup` and `désolé` taught on the insight card before the closing chain | L7 | `teachBeforeAsk.test.ts`: 63 productions, 0 untaught | FIXED |
| 15 | Hint ladder | third rung added: shape cue → one piece → all | `Weave.tsx` | device: no French at rung 1 | VERIFIED |
| 16 | est-ce / accents / liaison | accents é·è·e and a·à added; real `vous avez` liaison with its before-a-vowel rule | L1, L7, L8 | gate SOUND ×3 | FIXED |
| 17 | Prosody: stress, rhythm, intonation | stress rule stated at L1; contour and rhythm already present | L1, L6, L8, L10 | gate PROSODY ×2 | FIXED |
| 18 | Cognates barely visible | 7 notes, each naming direct / bridge / drift / faux ami | L1, L3, L4, L9 | `curiosityLayer.test.ts` | FIXED |
| 19 | Look Closer reads like documentation | three weights; In depth collapsed | `Showcase.tsx` | device: Sound, Structure, inset Compare | VERIFIED |
| 20 | Chunk pills invite a tap and do nothing | micro-reveal: meaning, Listen, one example | `Showcase.tsx` | device: `je suis` → "I am / Je suis ici." | VERIFIED |
| 21 | Error memory | weakness can now resolve; tone and separation already correct | `mastery.ts` | `errorRecovery.test.ts` | FIXED |
| 22 | Practice needs three real modes | Freestyle / Errors / By Lesson over one pool | `practiceModes.ts` | gate PRACTICE ×4 | VERIFIED |
| 23 | Mon Lexique should remember | 4 filters; entry detail with Listen, example, where met, related pieces, Practise this | `mon-lexique.tsx` | device: merci → detail → Practice on Survival Kit | VERIFIED |
| 24 | Context Cards as INPUT | 4 sets, 19 cards, exposure in its own store | `content/context-cards/` | `contextCards.test.ts` | VERIFIED |
| 25 | Placement, no fifth tab | one entry on Journey | `app/(tabs)/index.tsx` | device | VERIFIED |
| 26 | My French | fourth tab; focus, contexts, sounds, needs-another-pass, journey, data controls | `app/(tabs)/my-french.tsx` | device: prefs persist; "Work on these" → Practice errors | VERIFIED |
| 27 | Four-system integration | the full lifecycle: lesson teaches → cards input → **Mon Lexique shows what was met, outside the ownership bands** → practice outputs, with exposure never becoming production | across | `contextCards.test.ts`; device: `la gare` under "Met in Context Cards" | VERIFIED |
| 28 | Do not change First Cairn timing | untouched | — | no diff | FIXED |
| 29 | Typography / glyph clipping | preserved; re-verified on Android font scaling | `theme.ts`, chip renderers | device (both platforms) | VERIFIED |
| 30 | Android smoke | run; found and fixed the gesture-bar overlap | `app/(tabs)/_layout.tsx` | device | VERIFIED |
| 31 | Automated acceptance gates | `npm run gates:closure` | `scripts/acceptanceGates.ts` | 49/49 | VERIFIED |

**Nothing in this brief is marked BLOCKED.** The one candidate the brief
allowed for — Android — turned out to be available and was run.

---

## 33. Showcase report

| | before (`6eba95d`) | after |
|---|---|---|
| Total Showcase sentences L1–L10 | 170 | 170 |
| Breakdown present | 103 | **143** |
| Whole-first formula | — | **23** |
| Input / exposure | — | **4** |
| Intentionally unsegmented | — | **0** |
| **Accidentally flat / unclassified** | **67** | **0** |

Before this batch the four classifications did not exist: a line either happened
to segment or it did not, so all 67 non-segmenting lines were flat by accident
rather than by decision.

**Intentionally unsegmented: none, and that is a real answer rather than an
empty section.** The category exists for a line whose seam is real and which a
lesson still wants whole. Every line in L1–L10 turned out to be one of the other
three: it decomposes (143), it genuinely is one thing — `Merci.`, `Au revoir.`,
`Peut-être.` (23), or it reaches past what the learner owns, so a partial
breakdown would claim the unowned half is already theirs — `Pardon ?`,
`Un peu, seulement.`, `Je ne parle pas très bien français.`,
`Pardon, je n'ai pas compris.` (4). Manufacturing an entry to fill the column
would have been the dishonest option.

---

## 34. Content curation report

### Most repeated normalized sentences

| sentence | before | after |
|---|---|---|
| je suis ici | 45 | 42 |
| non merci | 40 | 38 |
| au revoir | 35 | 35 |
| je voudrais | 33 | 33 |
| j'ai une question | 31 | 30 |
| c'est où | 25 | 23 |
| je voudrais faire une pause | 25 | 24 |
| ce n'est pas ici | 23 | 22 |

Corpus: 460 → **468** distinct sentences, 1304 → **1315** total appearances,
mean 2.8 both sides, sentences appearing 8+ times 39 → 39.

The anchors came down modestly and breadth went up. That is deliberate: the
founder said these sentences are pedagogically valuable and must not be blindly
deleted, so the work was to change what a repeat ASKS rather than to cut the
count.

### Changes by class

| class | count | notes |
|---|---|---|
| Flat Showcase fixes | 53 | authored breakdowns where the frame is owned and the filler is not a registry item |
| Flat declarations | 27 | 23 formula, 4 exposure |
| Chunk-boundary changes | 4 families | `je suis ici`, `c'est où`, `j'ai une question`, `vous pouvez répéter` — plus `merci beaucoup` |
| Lossy breakdowns repaired | 8 | lines that silently dropped a word (`du`, `bien`, `et`, `Le`, `loin`, `Pas`, `une`) |
| Bare-anchor changes | 3 + 3 | L6/L8/L10 reworked as ingredients; L6/s03, L10/s02, L10/s07 ladder regressions |
| Distractor changes | 35 | 24 listening, 11 French-sentence; pick-the-longest 49% → 35% |
| Seed replacements | 16 | 10 deleted, 3 re-pointed at listening gaps, 3 new `fill` seeds |
| Teach-before-ask changes | 2 | `beaucoup`, `désolé` |
| Multi-step anti-spoiler changes | 7 | L3, L5, L7 ×2, L8, L9 ×2 |
| minimal/good/natural corrections | 6 | 3 band ladders, 3 learner-facing alternatives |
| New Sound moments | 19 sound cues | est-ce, é·è·e, a·à, liaison, stress |
| New Prosody moments | 3 | contour, closing rhythm, stress |
| Curiosity nuggets added | 32 depth cards | including 7 cognate notes and 5 In-depth cards |
| Context Card sets / cards | 4 / 19 | exposure in its own store, surfaced in Mon Lexique outside the bands |

---

## 35. Validation

| check | result |
|---|---|
| `npx tsc --noEmit` | clean |
| `npm run test:learning-engine` | **2291 passed, 0 failed** |
| `npm run validate:content` | exit 0 |
| `npm run validate:pools` | exit 0, **6 pre-existing warnings** |
| `npm run gates:closure` | **49/49** |
| Founder-slice boundary | 0 lessons and 0 seeds beyond L10 |
| iOS runtime smoke | iPhone 17 Pro, current code via Metro |
| Android runtime smoke | Pixel 5 API 34, current code via Metro |

**Pre-existing warnings, unchanged by this batch:** the 6 `validate:pools`
warnings are all `[phrase-fragmented]` in `lemot-app/data/` (`lesson7`,
`lesson9`, `lesson13`, `lesson16`), the frozen legacy v7 pool. That directory
was not touched.

### Tests added this batch

`showcaseClassification`, `chunkBoundaries`, `chainPedagogy`, `teachBeforeAsk`,
`curiosityLayer`, `errorRecovery`, `monLexiqueFilters`, `contextCards`,
`myFrench` — plus the extended `distractorQuality` and `hintAndAnchor`.

### Guards that were changed, and why

Three existing guards were updated rather than worked around. Each moved toward
what it was protecting:

- **three tabs → four tabs.** The founder specified the fourth.
- **Mon Lexique "no filters, no sort"** → "no write path". The proxy for
  read-only stopped being right once the surface had something to press; it now
  bans `TextInput`, destructive gestures and every write path, and allows view
  state.
- **hint ladder assertions** rewritten for the third rung, still pinning that
  the recorded rung stays inside the `0 | 1 | 2` schema.
