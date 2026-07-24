---
title: Mini Conversation
aliases: [Mini Conversation, mini_conv, MiniConversation, Mini Chat]
type: exercise-spec
domain: exercise
status: legacy
canon_status: superseded
implementation_status: legacy-unreachable
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["lemot-app/components/sections/MiniConversation.tsx", "lemot-app/constants/sections.ts", "lemot-app/config/productStage.ts"]
code_refs: ["lemot-app/components/sections/MiniConversation.tsx", "lemot-app/constants/sections.ts:48-60", "lemot-app/config/productStage.ts"]
test_refs: []
related: ["[[00 Le Mot Holy Codex]]", "[[Exercise System Overview]]", "[[Say It Your Way]]", "[[AI Role and Guardrails]]"]
tags: [exercise, mini-conversation, ai, free-production, legacy, dev-apk-hidden]
---

# Mini Conversation

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

> [!canon] Purpose — derse kilitli 3-4 turlu **AI sohbet**, negotiation-of-meaning, mesaj başına dinle butonu. Serbest diyalog üretimi.

> [!historical] impl_status: **legacy-unreachable (dev-apk'te çift-kapalı)**. (1) `visibleLessons=[]` ile legacy flow gizli; (2) `!FEATURES.aiLesson` ise bileşen **null** döner. dev-apk `aiEnabled=false` → AI stack dormant. Canon'da "Mini Chat" eski çerçeveleme, yeniden aktive edilmedikçe canlanmaz.

Yukarı: [[00 Le Mot Holy Codex]] · [[Exercise System Overview]]

## Learner Action
AI ile konu-kilitli sohbet eder; `canFinish` ≥3 kullanıcı turunda açılır.

## Input Contract
`{ topic, starter }` (lesson data `miniConv`). Prop: `items/config, onComplete, say`.

## Output Contract
Completion (≥3 tur). Gradelemez.

## Correctness Rule
YOK (negotiation-of-meaning, skorlanmaz).

## Evidence Produced
Completion (thr 0). Engine kanıtı yok. Bkz. [[Exercise Evidence Matrix]].

## Error Types
Gradesiz → error-tag emit yok.

## Scoring
Yok (`mini_conv` thr 0).

## Feedback
AI diyalog cevapları; mesaj başına TTS.

## Suitable Use
Konu-sınırlı, düşük-baskılı diyalog pratiği; anlam müzakeresi.

## Unsuitable Use
> [!warning] Anti-pattern: **generic chatbot sahnesi** (router red flag); restoran chatbot drill'ini ana özellik yapmak; AI'ı çekirdek yapmak ("The engine must be sound without AI"). AI destek katmanı, çekirdek değil.

## Difficulty Controls
`topic` darlığı, `starter`, tur sayısı hedefi.

## Example Payload
> [!example]
```json
{ "section": "mini_conv",
  "miniConv": { "topic": "ordering at a café", "starter": "Bonjour ! Qu'est-ce que vous voulez ?" } }
```

## Example Learner Interaction
sec 9: AI "Bonjour ! …" → öğrenci "Je voudrais un café" → AI onaylar/sorar → ≥3 tur sonra bitir. (dev-apk'te bu ekran hiç render edilmez.)

## Runtime Component
`lemot-app/components/sections/MiniConversation.tsx` (sec 9, `mini_conv`) — dev-apk'te null.

## Tests
Doğrudan test UNKNOWN. → [[Needs Verification]].

## Known Risks
- AI gated off → bugün tümüyle ulaşılamaz.
- AI açıldığında negotiation-of-meaning + guardrails korunmalı. → [[AI Role and Guardrails]].

## Related Exercises
[[Say It Your Way]] · [[Natural Reveal]] · [[Weave]]
</content>
