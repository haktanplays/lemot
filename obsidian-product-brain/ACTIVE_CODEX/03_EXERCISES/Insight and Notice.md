---
title: Insight and Notice
aliases: [Insight Card, insight-card, InsightCard, Notice, Micro-Logic]
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
source_of_truth: ["lemot-app/content/lessonTypes.ts:94-103", "lemot-app/components/lesson-v1/screens/InsightCard.tsx", "docs/canon/LESSON_FLOW_CANON_v1.md"]
code_refs: ["lemot-app/components/lesson-v1/screens/InsightCard.tsx", "lemot-app/components/lesson-v1/screens/InsightCard.tsx:9-17", "lemot-app/content/lessonTypes.ts:55-62,94-103", "lemot-app/scripts/canonRules.ts:158-165"]
test_refs: ["lemot-app/__tests__/canonRules.test.ts"]
related: ["[[00 Le Mot Holy Codex]]", "[[Exercise System Overview]]", "[[Meet]]", "[[Whole First, Unpack Later]]", "[[Chip Lifecycle]]"]
tags: [exercise, insight, notice, discovery, v1-active]
---

# Insight and Notice

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

> [!canon] Purpose — "one insight, one example, one action" (§7). Temastan **sonra** dar bir mantık/notice açar. L3 promoted insight; bütçe 2-3/ders (V5). "Notice / Micro-Logic / Unpack" kartları da aynı aileden.

> [!implemented] impl_status: **implemented (v1 active)** — static kart (title+body+examples+Continue). Canon'un in-card "one tap = action" ve **TRIGGER system** (error_triggered / KAPI AÇICI / KURTARICI / MÜHÜRLEYICİ yerleşimi) **NOT built** ("TRIGGER system … is Exercise System v1"). "Notice / Micro-Logic / Chunk-Unpack" ayrı kart tipleri **spec-only/PROPOSED** — bugün var olan `insight-card` yeniden kullanılıyor.

Yukarı: [[00 Le Mot Holy Codex]] · [[Exercise System Overview]]

## Learner Action
Kartı okur, **Continue**. Cevap yok.

## Input Contract
`InsightCardPayload` (`lessonTypes.ts:94-103`): `insightType`, `title`, `body`, `examples[]?`. `InsightType` (55-62): `sound-writing, grammar-nugget, micro-contrast, culture-bite, faux-ami, cognate, lesson-goal`. Label map `InsightCard.tsx:9-17`.

## Output Contract
Cevap dönmez (discovery). Kanıt yok.

## Correctness Rule
N/A.

## Evidence Produced
Runtime: yok. Canon: seen/exposure state (aktif mastery **eklemez**, v0.3:224). Bkz. [[Exercise Evidence Matrix]].

## Error Types
Yok (cevapsız).

## Scoring
Yok.

## Feedback
Yok (static Continue).

## Suitable Use
Bir temastan hemen sonra dar bir "aha": ses-yazım kuralı (é→s), faux-ami, cognate, micro-contrast (oui↔non), lesson-goal.

## Unsuitable Use
> [!warning] Anti-pattern: temastan **önce** grammar dump; eylemsiz insight (V2 WARN); ders başına **>3 L3 insight-card** → **V5 warning** (`canonRules.ts:158-165`, `INSIGHT_BUDGET_MAX=3`).

## Difficulty Controls
`insightType` etiketi, `examples[]` sayısı, L1/L2/L3 seviye seçimi (L1 coach voice ekran sayılmaz; L3 kendi ekranı).

## Example Payload
> [!example]
```json
{ "type": "insight-card",
  "payload": { "insightType": "grammar-nugget", "title": "Politeness lives in one word",
    "body": "voudrais keeps a request soft.", "examples": ["Je voudrais un café."] } }
```

## Example Learner Interaction
L1 ekran 1: `insight-card` (lesson-goal) "Your survival kit" → Continue. Ekran 3: `insight-card` (culture-bite) "A small kit goes a long way".

## Runtime Component
`lemot-app/components/lesson-v1/screens/InsightCard.tsx` (payload `lessonTypes.ts:94-103`).

## Tests
`canonRules.test.ts` — V5 insight budget.

## Known Risks
- 3-seviye insight sistemi (L1/L2/L3) ve trigger yerleşimi runtime'da yok → tüm insight bugün L3-benzeri static kart.
- "Notice/Micro-Logic/Unpack" ayrı kart tipleri PROPOSED, ekran tipi 7'de kalıyor. → [[05 Open Loops]].

## Related Exercises
[[Meet]] · [[Natural Reveal]] · [[Whole First, Unpack Later]] · [[Review]]
</content>
