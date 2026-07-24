# Le Mot Round 1 Context Handoff

Date: 2026-06-13  
Purpose: Bu dosya, bu konuşmadaki Le Mot Round 1 kararlarını, PR durumlarını, Claude workflow notlarını, build hazırlığını ve bir sonraki yapılacak işleri tek context olarak taşımak için hazırlandı.

## 1. Current repo state

Current main:

```text
main = cabaad0d87b86ad1e86a943139339405176815ef
origin/main synced
working tree clean
```

Merged PR sequence:

```text
PR #130 merged: L6, Un petit moment
PR #131 merged: L1-L5 anti-memorization variation pass
PR #132 merged: STATUS refresh after L0-L6 slice completion
```

Current high-level status:

```text
Round 1 L0-L6 content slice is complete.
STATUS.md is aligned with source of truth.
Round 1 is not fully closed yet.
Round 1 can only close after operator device smoke pass.
```

Closeout gate verdict:

```text
READY FOR OPERATOR DEVICE SMOKE
```

## 2. Important product rule reminders

Le Mot is not trying to prove a full product in this APK. The current APK is meant to prove the learning feel and flow.

Core direction:

```text
Calm premium mentor tone.
No XP, streak, score, reward, level, Perfect, Amazing style product language.
Weave is the main production mechanic.
Say It Your Way and Natural Reveal are important but bounded by lesson contracts.
AI must not override canon or introduce unseen forms.
Founder build focuses on the core learning engine, not full feature scope.
```

Important copy rule:

```text
Avoid AI-looking dash usage in learner-facing or design-handoff copy.
Prefer short sentences, commas, colons, or line breaks.
French orthographic hyphens such as pouvez-vous or allez-y remain valid.
```

## 3. What is currently inside the APK slice

If Android preview APK is built from main `cabaad0`, it should contain:

```text
Le Mot Round 1 Founder Learning Slice
L0-L6 content path
Dev APK / preview build
```

Registered V1 lessons:

```text
L0  v1-lesson-000  The First Step
L1  v1-lesson-001  Survival Kit
L2  v1-lesson-002  Être
L3  v1-lesson-003  Non
L4  v1-lesson-004  J'ai
L5  v1-lesson-005  Un, une
L6  v1-lesson-006  Un petit moment
```

Actual `V1_LESSONS` registration:

```text
[lesson000, lesson001, lesson002, lesson003, lesson004, lesson005, lesson006]
```

Lesson prerequisites:

| Lesson | id | number | title | prerequisites |
|---|---|---:|---|---|
| L0 | v1-lesson-000 | 0 | The First Step | [] |
| L1 | v1-lesson-001 | 1 | Survival Kit | [] |
| L2 | v1-lesson-002 | 2 | Être | ["v1-lesson-001"] |
| L3 | v1-lesson-003 | 3 | Non | ["v1-lesson-002"] |
| L4 | v1-lesson-004 | 4 | J'ai | ["v1-lesson-003"] |
| L5 | v1-lesson-005 | 5 | Un, une | ["v1-lesson-004"] |
| L6 | v1-lesson-006 | 6 | Un petit moment | ["v1-lesson-005"] |

Note:

```text
L1 prerequisites are intentionally [].
L0 is a first-use bridge and not counted as Lesson 1.
The real first-use bridge also exists as hardcoded app/lesson-zero.tsx.
v1-lesson-000 is a deep-link twin.
This is not a blocker.
```

## 4. Main learning items and patterns in the APK

The Round 1 slice teaches or recycles:

```text
bonjour
merci
s'il vous plaît
je voudrais
un café
je suis
je suis ici
non
oui
je ne suis pas
ce n'est pas
non merci
j'ai
j'ai faim
j'ai une question
un / une package logic
une question
au revoir
```

L6 owns exactly one new item:

```text
chunk-au-revoir
```

All other L6 items are recycled from L1-L5.

L6 learningItems:

```text
chunk-au-revoir
chunk-bonjour
chunk-je-suis-ici
chunk-je-suis
chunk-je-ne-suis-pas
chunk-non-merci
chunk-j-ai
chunk-j-ai-une-question
chunk-une-question
chunk-merci
```

## 5. PR #130: L6 Un petit moment

Merged state:

```text
PR #130 merged
Commit: abb0b103291670cd1f96be2a6c15a0ab1bf28aab
Title: L6 Un petit moment
```

Changed files:

```text
lemot-app/content/lessons/v1/lesson-006.ts
lemot-app/content/lessons/v1/index.ts
lemot-app/content/itemRegistry.ts
```

Role of L6:

```text
Small human context payoff.
Recombines L1-L5.
Adds no new grammar.
Adds exactly one new item: chunk-au-revoir.
Guided deterministic payoff.
No AI roleplay.
No runtime changes.
```

L6 scene:

```text
A small first meeting / door scene.
Learner greets.
Learner says they are here.
Learner handles a small exchange.
Learner says they have a question.
Learner thanks.
Learner closes with au revoir.
```

Important L6 guardrails:

```text
No free AI roleplay.
No chatbot.
No AI-generated interlocutor.
No restaurant or counter roleplay.
No new grammar.
No new architecture verb.
No new screen type.
No runtime changes.
No STATUS edit during PR #130.
No L7+.
```

## 6. PR #131: L1-L5 anti-memorization variation pass

Merged state:

```text
PR #131 merged
Commit: 66d7aa7582b3fc5756230133126280146af90efb
Title: feat(lessons): add Round 1 anti-memorization variation pass
```

Changed files:

```text
lemot-app/content/lessons/v1/lesson-001.ts
lemot-app/content/lessons/v1/lesson-002.ts
lemot-app/content/lessons/v1/lesson-003.ts
lemot-app/content/lessons/v1/lesson-004.ts
lemot-app/content/lessons/v1/lesson-005.ts
```

No registry changes:

```text
itemRegistry.ts untouched
zero new registry items
```

Reason for PR #131:

```text
The early slice was clean but too easy to memorize.
Learners could pass by recalling exact strings.
The patch adds context variation and retrieval pressure without turning the lessons into phrasebook bloat.
```

Important distinction:

```text
Not all Training Pack examples become lesson screens.
Lesson screens are curated path.
Training Pack examples are future seeds.
Registry items are canon spine.
```

Anti-memorization standard used:

For each active owned item, aim for at least three of:

```text
anchor use
context shift
trap or contrast
production use
later recombination hook
```

### L1 change

L1 risk:

```text
je voudrais could become only a café-order script.
```

Change:

```text
s03 reveal reframed je voudrais as a reusable request shape.
It says it can soften any request, not only coffee.
No new noun added.
```

### L2 change

L2 risk:

```text
je suis could become only je suis ici.
```

Change:

```text
s06 insight now says je suis can say how you are, not just where.
Added recognition example: Je suis prêt.
```

Note:

```text
Je suis prêt is recognition-level.
Later, gender/adjective agreement must handle prêt/prête.
Not a current blocker.
```

### L3 change

L3 risk:

```text
ne...pas could feel like one memorized negated line.
```

Change:

```text
s01 insight adds second transform:
C'est ici. -> Ce n'est pas ici.
```

This shows the negation sandwich as portable transformation, not one line.

### L4 change

L4 risk:

```text
j'ai could stay as two memorized chunks:
j'ai faim
j'ai une question
```

Changes:

```text
s01 insight body enriched.
Examples now show:
Je suis ici.
J'ai faim.
J'ai une question.
```

New interactive screen:

```text
id: s03b-fill-where-feel-have
type: fill-with-traps
```

Prompt:

```text
You came with one small thing to ask. What do you say?
```

Correct:

```text
J'ai une question.
```

Traps:

```text
Je suis ici.
Reason: That says where you are, not what you have to ask.

J'ai faim.
Reason: That says how you feel, not that you have a question.
```

Why it matters:

```text
This forces where / feel / have discrimination.
It is active retrieval, not passive example reading.
```

### L5 change

L5 risk:

```text
un / une could stay as a café/question pair.
```

Changes:

```text
s02 insight examples now include:
Je voudrais un café.
J'ai une question.
```

New interactive screen:

```text
id: s04b-fill-choose-package
type: fill-with-traps
```

Prompt:

```text
You have one question. Which French package fits?
```

Correct:

```text
une question
```

Traps:

```text
un café
Reason: That is the coffee package, not the question package.

question
Reason: In French, the noun travels with its little word here: une question.

un question
Reason: This package is not the one we use here. Keep it as: une question.
```

Judgment on `un question` trap:

```text
Accepted as option-only corrective distractor.
It is not taught as a valid form.
It does not open broad gender rules.
It reinforces package choice.
```

## 7. PR #132: STATUS refresh

Merged state:

```text
PR #132 merged
Commit: cabaad0d87b86ad1e86a943139339405176815ef
Title: docs(status): mark Round 1 L0-L6 content slice complete
```

Changed files:

```text
docs/STATUS.md only
```

Purpose:

```text
Remove stale status that said L4-L6 were pending.
Record L0-L6 content slice complete.
Record PR #130 and PR #131.
Record current validation snapshot.
Set next steps.
Keep guard that Round 1 is not closed until device smoke.
```

STATUS now says:

```text
Round 1 L0-L6 v1 content slice is complete on main.
Round 1 is not fully closed until the closeout gate and operator device smoke pass are both complete.
Current state: content slice complete, awaiting operator closeout.
```

## 8. Validation status

Latest closeout gate validation run on `cabaad0`:

```text
npm run typecheck
Result: clean, exit 0

npm run test:learning-engine
Result: 246 passed, 0 failed, 246 total

npm run validate:pools
Result: exit 0, 6 warnings

npm run validate:content
Result: Hard errors 0, Warnings 0, Info 0
```

Known warnings:

```text
6 warnings in legacy non-Round-1 lessons:
lesson7
lesson9
lesson13
lesson16
```

Warning types:

```text
1 placeholder-count-mismatch in lesson7 fillFG[3]
5 phrase-fragmented warnings, for chunks such as est-ce que, s'il vous plaît, parce que split across build tiles
```

Verdict:

```text
Acceptable.
Pre-existing.
Not new blockers.
Do not confuse with Round 1 slice blockers.
```

## 9. Closeout gate result

Round 1 closeout gate was audit/report only.

No changes made:

```text
No files changed
No commit
No push
No PR
No EAS build
No device smoke
No emulator smoke
No visual pass
```

Closeout gate verdict:

```text
READY FOR OPERATOR DEVICE SMOKE
```

Exact blockers:

```text
None.
```

Non-blocking notes:

```text
L1 prerequisites are [] by design.
L0 title variance exists: v1-lesson-000 title is The First Step, docs may call it Lesson Zero / First French Moment.
This should be eyeballed during device smoke.
Not a blocker.
```

## 10. Build prep report

Build prep was done, but build was not started because EAS builds are operator-only in this workflow.

Pre-build verified:

```text
main at cabaad0
working tree clean
main synced with origin/main
lemot-app exists
docs/DEV_APK_SMOKE_TEST_CHECKLIST.md exists
```

Build profile from `lemot-app/eas.json`:

```text
profile: preview
distribution: internal
android.buildType: apk
EXPO_PUBLIC_PRODUCT_STAGE=dev-apk
```

App identity from `app.json`:

```text
name: Le Mot
slug: lemot-app
version: 1.0.0
android package: com.lemot.app
```

Operator build command:

```bash
cd lemot-app
eas build --platform android --profile preview
```

Build metadata to capture after operator run:

```text
Commit: cabaad0d87b86ad1e86a943139339405176815ef
Profile: preview
Platform: android
Type: APK
Package: com.lemot.app
Version: 1.0.0
Build ID:
Build URL:
Artifact URL:
Build status:
Warnings:
Build completed at:
Device used for smoke:
Android version:
```

Current build status:

```text
NOT STARTED
Artifact pending operator execution.
```

## 11. What to test in operator device smoke

This is the next real action. It must happen on a real device or operator-controlled Android environment.

Smoke focus:

```text
1. Fresh install
2. First launch
3. Lesson Zero bridge
4. How Weave Works
5. Home
6. L1 normal flow
7. L4 new where / feel / have screen
8. L5 new package-choice screen
9. L6 Un petit moment payoff
10. App restart persistence
11. No XP / streak / score / reward leakage
12. Android layout overflow, clipping, keyboard, scroll
13. Offline / error banner overflow
14. Completion marker
```

The APK should prove:

```text
The user opens the app.
They experience the first French moment.
They understand the Weave logic.
They reach Home.
They complete a small L1-L6 learning path.
L4 and L5 force meaning-based retrieval, not only memory.
L6 feels like a small human payoff.
Progress does not disappear.
Android screens do not break.
Wrong product language does not leak.
```

## 12. What is not in current APK scope

Do not treat these as Round 1 smoke blockers:

```text
Mon Lexique full experience
Daily Review full engine
Practice Pool full hub
Word Graph
Paywall ceremony
Full settings / GDPR screens
Voice mode
Chat / free AI tutor
L7+
Full course map
Premium system
Account / sync
```

There may be placeholder or legacy traces, but they are not current smoke targets unless they leak into the core path.

## 13. Recommended next action

Next action:

```text
Operator runs Android preview build:
cd lemot-app
eas build --platform android --profile preview
```

Then paste build metadata back into the conversation.

If build succeeds:

```text
Proceed to operator device smoke pass using docs/DEV_APK_SMOKE_TEST_CHECKLIST.md.
```

If build fails:

```text
Do not patch immediately.
Collect logs.
Report build ID, logs, failure stage, and error text.
Then decide fix scope.
```

## 14. Operator device smoke prompt skeleton

Use this after build artifact is available.

```text
Task: Round 1 operator device smoke pass

Scope:
Operator smoke test only.
No code changes.
No docs changes unless explicitly requested after report.
No commit.
No push.
No PR.
Do not mark Round 1 closed until report is reviewed.

Build metadata:
Commit:
Build ID:
Build URL:
Artifact URL:
Device:
Android version:

Test path:
1. Fresh install APK.
2. Launch app.
3. Complete Lesson Zero / first-use bridge.
4. Complete How Weave Works.
5. Reach Home.
6. Run one full lesson path from L1.
7. Verify L4 interactive screen:
   s03b-fill-where-feel-have
   Correct: J'ai une question.
   Traps: Je suis ici., J'ai faim.
8. Verify L5 interactive screen:
   s04b-fill-choose-package
   Correct: une question
   Traps: un café, question, un question
9. Verify L6 Un petit moment payoff.
10. Close app.
11. Reopen app.
12. Verify persistence.
13. Check Android layout:
    no clipping
    no broken scroll
    no keyboard blocking key inputs
    no offline banner overflow
14. Check product language:
    no XP
    no streak
    no score
    no reward
    no level
    no Perfect/Amazing style feedback
15. Record pass/fail per step.

Report:
1. Build metadata
2. Device metadata
3. Fresh install result
4. L0 result
5. How Weave Works result
6. Home result
7. L1 result
8. L4 anti-memorization screen result
9. L5 package-choice screen result
10. L6 payoff result
11. Persistence result
12. Android layout result
13. Product language leak result
14. Bugs found, with severity P0/P1/P2/P3
15. Screenshots or descriptions
16. Final smoke verdict:
    PASS
    PASS WITH NON-BLOCKING NOTES
    FAIL WITH BLOCKERS
17. Whether Round 1 can be marked closed
```

## 15. Current decision posture

Current posture:

```text
Do not start L7 yet.
Do not start learning-engine migration yet.
Do not start broad UI polish yet.
Do not mark Round 1 closed yet.
```

Do next:

```text
Build APK.
Run operator smoke.
Then decide based on real device result.
```
