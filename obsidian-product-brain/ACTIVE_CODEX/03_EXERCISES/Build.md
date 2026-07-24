---
title: Build
aliases: [Build Sentence, build, BuildSentence]
type: exercise-spec
domain: exercise
status: legacy
canon_status: superseded
implementation_status: legacy-active
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["lemot-app/components/sections/BuildSentence.tsx", "lemot-app/constants/sections.ts"]
code_refs: ["lemot-app/components/sections/BuildSentence.tsx", "lemot-app/components/sections/BuildSentence.tsx:88-98", "lemot-app/constants/sections.ts:48-60"]
test_refs: []
related: ["[[00 Le Mot Holy Codex]]", "[[Exercise System Overview]]", "[[Write]]", "[[Weave]]", "[[Chip Taxonomy]]"]
tags: [exercise, build, controlled-production, legacy, dev-apk-hidden]
---

# Build

<!-- gh-toc -->

## İçindekiler

- [Learner Action](#learner-action)
- [Input Contract](#input-contract)
- [Output Contract](#output-contract)
- [Correctness Rule](#correctness-rule)
- [Evidence Produced](#evidence-produced)
- [Error Types](#error-types)
- [Scoring](#scoring)
- [Feedback](#feedback)
- [Suitable Use](#suitable-use)
- [Unsuitable Use](#unsuitable-use)
- [Difficulty Controls](#difficulty-controls)
- [Example Payload](#example-payload)
- [Example Learner Interaction](#example-learner-interaction)
- [Runtime Component](#runtime-component)
- [Tests](#tests)
- [Known Risks](#known-risks)
- [Related Exercises](#related-exercises)

> [!canon] Purpose — kelime chip'lerine dokunarak (doğru + trap) cümle kurma; **kontrollü üretim**. Legacy sırada Build **Write'tan önce** gelir (Sprint 8B): kolay görev (dizme) → zor görev (bellekten yazma), progressive difficulty.

> [!historical] impl_status: **legacy-active (dev-apk-HIDDEN)** (sec 4). v1'de doğrudan karşılığı yok — üretim yükü [[Weave]]'e taşındı. SUPERSEDED tester yönü.

Yukarı: [[00 Le Mot Holy Codex]] · [[Exercise System Overview]]

## Learner Action
Karışık kelime chip'lerini (Fisher-Yates shuffle) answer zone'a dokunarak sıralar.

## Input Contract
`items[]` her biri `{ c: [doğru kelime sırası], + trap kelimeler }`. Prop: `items, onComplete, onError, say`.

## Output Contract
`onComplete(score,total)` + `onError` → `logErr`.

## Correctness Rule
`selectedWords.join(" ") === item.c.join(" ")` — tam sıra eşleşmesi.

## Evidence Produced
score/total (thr **.7**) + weak-spot. Son item double-count önlemesi (`BuildSentence.tsx:88-98`, audit-fixed). Bkz. [[Exercise Evidence Matrix]].

## Error Types
Dizme tipi: `wrong_order`, `missing_word`, `extra_word`, `wrong_item` (trap seçimi). Engine emit yok. Bkz. [[Exercise Error Matrix]].

## Scoring
thr .7; per-item skor.

## Feedback
Doğru sıra vs öğrenci sırası karşılaştırması.

## Suitable Use
Bellekten yazmadan önce yapıyı tanımak; kelime sırası/agreement pratiği; chip birleştirmeyi görselleştirme.

## Unsuitable Use
> [!warning] Anti-pattern: chip'ler **atomik** olmalı; cümle/clause chip veya negatif fiil clause'u chip olarak yasak (v0.3 §4; sentence-chip heuristic). Trap kelimeler future-form olabilir ama doğru dizide future olamaz (V3).

## Difficulty Controls
Kelime sayısı, trap chip sayısı, cümle uzunluğu.

## Example Payload
> [!example]
```json
{ "section": "build",
  "items": [ { "c": ["Je","voudrais","un","café"], "traps": ["suis","le"] } ] }
```

## Example Learner Interaction
sec 4: karışık [café, Je, un, suis, voudrais] → dokunarak "Je voudrais un café" diz → skor.

## Runtime Component
`lemot-app/components/sections/BuildSentence.tsx` (sec 4).

## Tests
Doğrudan test UNKNOWN (double-count fix audit-referenced). → [[Needs Verification]].

## Known Risks
- Dev-apk-hidden.
- Chip atomicity ihlali riski → PROTECTED_CHUNKS dışında cümle chip'i tuzağı.

## Related Exercises
[[Write]] · [[Weave]] · [[Combine and Weave]] · [[French Fill]]
</content>
