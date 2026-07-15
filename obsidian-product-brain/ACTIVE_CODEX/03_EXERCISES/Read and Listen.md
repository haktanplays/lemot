---
title: Read and Listen
aliases: [Read & Listen, read_listen, ReadListen]
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
source_of_truth: ["lemot-app/components/sections/ReadListen.tsx", "lemot-app/constants/sections.ts", "lemot-app/app/lesson/[id].tsx"]
code_refs: ["lemot-app/components/sections/ReadListen.tsx", "lemot-app/constants/sections.ts:48-60", "lemot-app/app/(tabs)/index.tsx:149"]
test_refs: ["lemot-app/__tests__/ttsPlaceholder.test.ts"]
related: ["[[00 Le Mot Holy Codex]]", "[[Exercise System Overview]]", "[[Meet]]", "[[Weave]]"]
tags: [exercise, read-listen, input, legacy, dev-apk-hidden]
---

# Read and Listen

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

> [!canon] Purpose — input-first maruz kalma (sec 0): kelimeye dokun→tanım, Weave "bridge" satırı, dinle. "Input before output" araştırma temelinin runtime yüzeyi.

> [!historical] impl_status: **legacy-active (dev-apk-HIDDEN)** — `components/sections/*` ailesinden, `app/lesson/[id].tsx` sürüyor. `visibleLessons=[]` (`index.tsx:149`) ile testerlar için görünmez. v1'de karşılığı [[Meet]] + [[Insight and Notice]] (SUPERSEDED tester yönü).

Yukarı: [[00 Le Mot Holy Codex]] · [[Exercise System Overview]]

## Learner Action
Okur/dinler; kelimeye dokununca tanım açılır; Continue. Cevap yok.

## Input Contract
`items[]` (kelime, tanım, örnek, Weave bridge satırı), `say` (TTS). Prop şekli: `items`, `onComplete(score,total)`, `onError(...)`, `say`.

## Output Contract
Sadece completion (thr 0). Engine kanıtı yok.

## Correctness Rule
Yok.

## Evidence Produced
Completion marker (legacy `lm7`). Bkz. [[Exercise Evidence Matrix]].

## Error Types
Yok (cevapsız).

## Scoring
Yok (`read_listen` thr 0, `sections.ts:48-60`).

## Feedback
Yok; tap-to-define, dinle.

## Suitable Use
Dersin ilk maruz kalması; input-first exposure.

## Unsuitable Use
> [!warning] Anti-pattern: placeholder/boşluk seslendirme (Weave bridge satırında). Guard: `ttsPlaceholder.test.ts`.

## Difficulty Controls
Kelime sayısı, TTS var/yok, Weave bridge karmaşıklığı.

## Example Payload
> [!example]
```json
{ "section": "read_listen",
  "items": [ { "word": "café", "def": "coffee", "ex": "un café" } ] }
```

## Example Learner Interaction
Sec 0: cümle + kelimelere dokun → tanım balonu → dinle → Continue.

## Runtime Component
`lemot-app/components/sections/ReadListen.tsx` (route `app/lesson/[id].tsx`, sec 0).

## Tests
`ttsPlaceholder.test.ts` (placeholder speech guard). Doğrudan başka test UNKNOWN.

## Known Risks
- Tümüyle dev-apk-hidden; tester yönü [[Meet]]/[[Insight and Notice]].
- Legacy `lm7` store, engine ile disjoint.

## Related Exercises
[[Meet]] · [[Insight and Notice]] · [[Weave]]
</content>
