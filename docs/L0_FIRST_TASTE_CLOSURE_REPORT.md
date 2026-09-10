# L0 first-taste closure — final report

## 0. Source of truth, and a baseline discrepancy to flag

The brief named `4ad72a3` as the expected baseline HEAD. The branch was
actually on **`24a529e`**, 25 commits further on. `4ad72a3` is real
(`content(l8): teach the sounds and the prosody, not just the punctuation`) —
it is a mid-batch commit of the founder-smoke closure work, not its end.
`24a529e` is that batch's final commit, and the brief's own §0 description of
the tree matches `24a529e`, not `4ad72a3`. Read as "the branch as the founder
last left it", so this batch is built on `24a529e`.

Branch: `content/l1-l10-sentence-chunk-canon-draft`. Nothing pushed.

---

## 1. L0, before and after

### Before: there were two L0s, and the learner met the wrong one

| | `content/lessons/v1/lesson-000.ts` | `app/lesson-zero.tsx` |
|---|---|---|
| Shape | authored 8-screen lesson | 988 lines of bespoke onboarding |
| Engine | LessonRendererV1 | its own beat state machine |
| Grading | the answer-verdict contract | `lib/lessonZeroAnswers.ts`, a boolean matcher |
| Reachable | **no** | yes — this is what first use ran |

`isV1LessonInStageScope` starts at 1, so the authored L0 never appeared on the
Journey, and the lesson route gates on the same predicate — even a deep link
answered "this v1 lesson is not ready yet". It was dead content.

What first use ran was the bespoke screen. It worked. It was also the one
screen in the app that could not use chunk pills, chunk tap, Look Closer, the
hint ladder or the grading contract — which is to say, the screen whose job is
"show a learner what this product does" was the only one that could not do it.
And it graded with a matcher that predates the trust contract, so first use was
the one place a simplified grader could quietly return.

### After: one L0, played by the ordinary engine

Seven beats, arc A–H:

| # | beat | type | what it is for |
|---|---|---|---|
| 1 | `Bonjour.` | meet | French before any framing |
| 2 | `je voudrais` | meet | **split out** — it used to arrive fused as "Je voudrais un café.", which teaches a line, not a piece |
| 3 | `un café` | meet | the thing you want |
| 4 | **assembly** | showcase | three tappable chips + Look Closer, found by curiosity rather than instruction |
| 5 | which piece | fill | one light recognition beat |
| 6 | `s'il vous plaît` | meet | offered, never required |
| 7 | **the order** | weave | the one production, supported, whole tray, hint ladder, ordinary grading |
| 8 | what you have | recap | → closing screen → Lesson 1 |

- **L0 stays off the path.** The stage slice still starts at 1; the lesson route
  admits L0 through a separate `isFirstTasteLesson`. Keeping those two questions
  apart is what stops "L0 should be playable" becoming "L0 is Lesson 1".
- **No sixth journey role.** Completion is keyed on `phase: "first-step"`, which
  the content already declared. JR-004 ratifies that L0's status is the absence
  of a role, and that is preserved.
- **`s'il vous plaît` keeps its teaching card.** It is L0's fourth declared
  demand, and a declared demand with no teaching encounter is drift the corpus
  guard reports — correctly. It is on the tray, never required, and the short
  order is accepted in full.
- **No Mon Lexique shortcut on the closing screen.** A learner one lesson in has
  no lexique and has never heard the name.

---

## 2. Device smoke

Both platforms were available and both were used, from a genuinely wiped store
(the kv store was backed up, emptied, and restored afterwards on both).

- **iOS** — iPhone 17 Pro simulator, iOS 26.5, Expo Go, current code via Metro.
- **Android** — Pixel 5 emulator, API 34, the `com.lemot.app` dev build.

### Checklist

| # | check | result |
|---|---|---|
| 1 | app first launch from clean state | lands on L0 beat 1 — no home flash, no spinner stall |
| 2 | first French appears quickly | on the first screen, before any framing |
| 3 | `Bonjour` | meet card, Listen, chip |
| 4 | `je voudrais` | its own beat, "The piece that asks for things." |
| 5 | `un café` | its own beat |
| 6 | combined sentence | Showcase: `Bonjour, je voudrais un café.` with three chips |
| 7 | chunk tap | `je voudrais` → "I would like" + Listen + one example |
| 8 | sound / curiosity moment | Look Closer → Sound / Notice / Usage |
| 9 | first retrieval | fill, correct pick marked plainly, no celebration |
| 10 | deliberately wrong response | `Aaa` → "Compare with the model." **Never praised** |
| 11 | near-miss | garbled input → "Compare with the model.", meaning not claimed |
| 12 | hint ladder | rung 1 shape only (no French) → rung 2 two chips → rung 3 the cloze. No copy-ready rung |
| 13 | the one production | short order accepted: "Accepted." + the natural version, no scolding for the missing softener |
| 14 | typed field vs keyboard | Android, keyboard up: input fully visible, task anchor pinned, Check reachable |
| 15 | recap | three lines, pieces used, Continue |
| 16 | cold restart after finishing | Journey. **No replay** |
| 17 | cold restart mid-lesson | back into L0 **at the beat left** (killed on beat 3, resumed on beat 3) |
| 18 | next step | "Begin" → Lesson 1, whose first screen recycles exactly L0's pieces |
| 19 | L0 on the Journey | absent — the road ahead starts at Être (L2), current step Survival Kit (L1) |
| 20 | Android layout | no overflow, no clipping, Continue clears the gesture bar |

### What the device found that the source did not

Five defects, all fixed and re-verified, all in `127fc1d`:

1. **One tap deleted the first taste.** Back on beat 1 left the lesson onto a
   Journey the learner had never seen, greeted in French nobody had taught them
   — and because the first-use flag was written on *entry*, L0 was then
   unreachable forever. **Fixed:** the flag now records *finished*, not
   *opened*; the redirect holds while it is unfinished and the ordinary cursor
   resumes the beat. The opening beat draws no back affordance, because there is
   genuinely nothing behind it.
2. **The closing screen congratulated a learner who missed.** "You just ordered
   a coffee in French." was unconditional — the founder's own §2 complaint moved
   one screen later, into the screen whose whole job is the first success.
   **Fixed:** only a `full` verdict (exact or an authored accepted alternative)
   earns it. An evidenced near-miss does not. Both branches confirmed on device.
3. **The recap claimed the assembly.** "You put three pieces together into one
   real sentence.", seconds after a miss. **Fixed:** it names what the Showcase
   showed, which happened for everyone.
4. **The blank left a gap before the full stop** — `je voudrais ____ .` on the
   only recognition beat. **Fixed** in the shared fill, without changing how any
   word-continuation tail renders.
5. **Hint rung 2 promised a starting piece and handed over the ending.** The
   order is reversed on purpose so the ladder is never copy-ready; the label was
   promising the one thing the design refuses to give. **Fixed:** it counts
   instead.

Plus: the recap's button and the closing screen both said "Begin".

### One environment limitation, stated rather than hidden

Text typed into the **iOS simulator** goes through the host's active keyboard
layout, which is Turkish here: `i` arrives as `ı`, `,` as `ö`, `.` as `ç`.
Pure-ASCII-letter input (`Aaa`) is unaffected, so the wrong-answer path was
verified on iOS directly; the **correct** production could not be typed there.
It was verified on Android instead, where `adb input text` is layout-independent
— including the accepted short order and the earned closing line. Both grading
branches are therefore confirmed on a real device; only the platform they were
confirmed on differs.

---

## 3. Open design questions — not defects, not deferred work

Two things the device made visible that are **decisions, not bugs**, and that
belong to the founder rather than to this batch:

- **Meet cards leave most of the screen empty.** A meet card is one small card
  at the top of an 874-point screen. That is the engine's standard meet layout,
  identical in L1–L10, and vertically centring it would restyle every lesson —
  a visual decision, not an L0 fix.
- **Recap voice.** Every lesson's recap says "you did X". For lessons with
  several productions that reads correctly. L0 has one, which is why its
  assembly line was rebound to the Showcase. Whether the convention should be
  outcome-aware corpus-wide is a product question; nothing in L1–L10 was
  touched.

---

## 4. Validation

| check | result |
|---|---|
| `npx tsc --noEmit` | clean |
| `npm run test:learning-engine` | **2274 passed, 0 failed** |
| `npm run validate:content` | exit 0 |
| `npm run validate:pools` | exit 0, 6 pre-existing warnings |
| `npm run gates:closure` | **49/49** |

**Test count, honestly:** 2291 → 2274. `lessonZeroAnswers.test.ts` (54 tests)
was deleted because the module it tested no longer exists — the bespoke matcher
went with the bespoke screen. 37 tests were added in its place, all with live
code behind them: 25 in `firstTaste.test.ts` covering content, first-use flow,
persistence, grading, mastery honesty and the slice boundary; 9 more for the
device findings; 2 in `hintAndAnchor.test.ts` for the hint label.

**The 6 `validate:pools` warnings are pre-existing and unchanged**: all
`[phrase-fragmented]` in `lemot-app/data/`, the frozen legacy v7 pool, which was
not touched.

---

## 5. Commits

| | |
|---|---|
| `6b56f68` | `feat(l0): make the first taste the real product, not a rehearsal of it` |
| `127fc1d` | `fix(l0): what playing the first taste on a phone turned up` |

Not pushed. History not rewritten. `9a959d6` untouched. No unrelated work reset
or discarded.

---

## 6. Remaining issues

None blocking. The two items in §3 are open design questions, stated as such.

---

## FINAL VERDICT

**READY FOR PACKAGED APK.**

L0 is one lesson, played by the real engine, reachable from first use and from
nowhere else. It teaches three pieces, assembles them where the learner can tap
them, asks once, produces once, and hands off into Lesson 1 — whose first screen
recycles exactly what L0 taught. It cannot be lost by a stray tap, it resumes
where it was left, it does not replay, and it does not claim a success that did
not happen. Verified end to end on both platforms from a wiped store.
