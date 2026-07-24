---
title: Meet
aliases: [Meet Card, meet-card, MeetCard]
type: exercise-spec
domain: exercise
status: active
canon_status: canonical
implementation_status: implemented
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["lemot-app/content/lessonTypes.ts:83-92", "lemot-app/components/lesson-v1/screens/MeetCard.tsx", "docs/canon/LESSON_FLOW_CANON_v1.md"]
code_refs: ["lemot-app/components/lesson-v1/screens/MeetCard.tsx", "lemot-app/components/lesson-v1/screens/MeetCard.tsx:62", "lemot-app/content/lessonTypes.ts:83-92"]
test_refs: ["lemot-app/__tests__/v1LessonStructure.test.ts", "lemot-app/__tests__/ttsPlaceholder.test.ts"]
related: ["[[00 Le Mot Holy Codex]]", "[[Exercise System Overview]]", "[[Insight and Notice]]", "[[Weave]]", "[[Chip Taxonomy]]"]
tags: [exercise, meet, discovery, v1-active]
---

# Meet

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

> [!canon] Purpose — bir **active chip**'i ilk kez tanıştırır: kanon cümle **bütün** gelir, öğrenci onu tanır/dinler. Döngü: meet → insight → weave → check (§2.1).

> [!implemented] impl_status: **implemented (v1 active dev-apk)** — ama static Continue kartı. Canon'un "her chip'e dokunarak aktive et" etkileşimi **PLANNED (Faz B)**, henüz yok (chip'ler display pill, per-chip tap/ses yok).

Yukarı: [[00 Le Mot Holy Codex]] · [[Exercise System Overview]]

## Learner Action
Fransızca satırı okur/dinler, **Continue**'ya basar. Cevap yok.

## Input Contract
`MeetCardPayload` (`lessonTypes.ts:83-92`): `fr`, `en?`, `title?`, `highlights[]?`, `tts?`.

## Output Contract
Sisteme cevap dönmez. Discovery katmanı (§1.3): kanıt üretmez.

## Correctness Rule
N/A — doğru/yanlış yok.

## Evidence Produced
Runtime: **yok.** Canon telemetri niyeti `item_seen` (düşük ağırlık) ama v1 renderer LearningEvent emit etmez. Bkz. [[Exercise Evidence Matrix]].

## Error Types
Yok (cevapsız). Bkz. [[Exercise Error Matrix]].

## Scoring
Yok.

## Feedback
Yok — pasif "Continue" ekranı. Opsiyonel TTS (`useSpeech().say`, `MeetCard.tsx:62`).

## Suitable Use
Sahiplenilecek bir chip'in ilk teması. Highlight pill'lerle vurgu.

## Unsuitable Use
> [!warning] Anti-pattern: herhangi bir **assessment**. Meet asla skorlanmaz/gradelenmez. Highlight'lar cümle/clause değil atomik olmalı (V4).

## Difficulty Controls
`tts` on/off, `highlights[]` seti, `en` çeviri var/yok.

## Example Payload
> [!example]
```json
{ "type": "meet-card",
  "payload": { "fr": "Je voudrais un café.", "en": "I would like a coffee.",
    "highlights": ["Je voudrais", "un café"], "tts": true } }
```

## Example Learner Interaction
Ekran: `Je voudrais un café.` (+ dinle butonu, highlight pill'ler) → Continue. (L1 "Survival Kit", `lesson-001.ts`, ekran 4.)

## Runtime Component
`lemot-app/components/lesson-v1/screens/MeetCard.tsx` (payload `lessonTypes.ts:83-92`).

## Tests
`v1LessonStructure.test.ts` (itemId/highlight yapısal guard); `ttsPlaceholder.test.ts` (TTS placeholder guard).

## Known Risks
- Canon "tap-to-activate chip" etkileşimi yok → discovery zayıf kalabilir (Faz B). → [[05 Open Loops]].
- Highlight span'leri chip'e işaret eder ama chip değildir (v0.3 §4 inline highlight). → [[Chip Taxonomy]].

## Related Exercises
[[Insight and Notice]] · [[Weave]] · [[Read and Listen]] (legacy karşılığı) · [[Natural Reveal]]
</content>
