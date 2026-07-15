---
title: Say It Your Way
aliases: [say-it-your-way, SayItYourWay, SayItYourWayV1]
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
source_of_truth: ["lemot-app/content/lessonTypes.ts:148-164", "lemot-app/components/lesson-v1/screens/SayItYourWayV1.tsx", "docs/canon/LESSON_FLOW_CANON_v1.md", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/Learning_Engine_and_Exercise_Types.md"]
code_refs: ["lemot-app/components/lesson-v1/screens/SayItYourWayV1.tsx", "lemot-app/components/lesson-v1/screens/SayItYourWayV1.tsx:25-27,28,38-40,42-46,58-61", "lemot-app/content/lessonTypes.ts:148-164", "lemot-app/components/sections/SayItYourWay.tsx"]
test_refs: ["lemot-app/__tests__/v1LessonStructure.test.ts"]
related: ["[[00 Le Mot Holy Codex]]", "[[Exercise System Overview]]", "[[Weave]]", "[[Natural Reveal]]", "[[Mini Conversation]]", "[[AI Role and Guardrails]]"]
tags: [exercise, say-it, free-production, v1-active]
---

# Say It Your Way

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

> [!canon] Purpose — bir iletişim hedefine doğru **serbest üretim**; montaj yok. Killer trinity'nin üçüncü üyesi. **Asla gradelemez, asla bloke etmez** (boş hariç).

> [!implemented] impl_status: **implemented (v1 active dev-apk)** — AI notu dev-apk'te **gated OFF** (`aiEnabled=false`). Legacy karşılığı `sections/SayItYourWay.tsx` (`say_it`) dev-apk-hidden ve `!FEATURES.aiLesson` ise **null** döner.

Yukarı: [[00 Le Mot Holy Codex]] · [[Exercise System Overview]]

## Learner Action
Serbest yazar. Akış (`SayItYourWayV1.tsx:28`): input → **confirm** ("You wrote: … / try again or keep?") → revealed (Natural Reveal). Confirm = en düşük-müdahaleli self-revision (canon §8.3).

## Input Contract
`SayItYourWayPayload` (`lessonTypes.ts:148-164`): `situation`, `communicativeGoal`, `suggestedPieces?`, `answerBands?{minimalAcceptable,good,natural}`, `modelAnswer?`, `reveal`, `validationMode?`.

## Output Contract
Öğrenci metni karşılaştırma için saklanır; opsiyonel AI notu. **LearningEvent emit edilmez.**

## Correctness Rule
**YOK.** Asla gradelemez; boş dışında bloke etmez (`:25-27`, `:42-46`).

## Evidence Produced
Runtime: yok. Öğrenci metni yerel karşılaştırma için tutulur. Bkz. [[Exercise Evidence Matrix]].

## Error Types
Gradesiz → error-tag emit yok. Kavramsal olarak over/ibu/m-shift/skip mümkün. Bkz. [[Exercise Error Matrix]].

## Scoring
Yok. `answerBands` (minimalAcceptable/good/natural) sadece **reveal** için tanımlayıcı bantlar, skor değil.

## Feedback
Natural Reveal (model answer + notices + alternatives + bands). AI değerlendirmesi yalnız `validationMode==="ai-assisted-with-fallback" && FEATURES.aiLesson` ise (`aiEligible`, `:38-40`) → `evaluateSayIt()`; **dev-apk'te `aiEnabled=false` → atlanır** (`status:"skipped"`, `:58-61`). Suggested pieces "Need an idea?" arkasında (destek, montaj değil).

## Suitable Use
Bir durumda kendi cümleni kur ("un café" → kahve iste). Serbest üretim, kişisel ifade.

## Unsuitable Use
> [!warning] Anti-pattern (CANONICAL §16): **"Speaking gives praise without target detection = ERROR."** Bu yüzden model-answer-only: asla sahte övgü fabrikatlanmaz. Producing task'ın production'sız olması da error.

## Difficulty Controls
`validationMode`, `suggestedPieces` var/yok, `answerBands`.

## Example Payload
> [!example]
```json
{ "type": "say-it-your-way",
  "payload": { "situation": "You reach the counter.", "communicativeGoal": "Order a coffee, politely.",
    "modelAnswer": "Je voudrais un café, s'il vous plaît.",
    "reveal": { "modelAnswer": "Je voudrais un café, s'il vous plaît." } } }
```

## Example Learner Interaction
L1 ekran 10 (model-answer-only): "un café" → öğrenci yazar → confirm → Natural Reveal (model + neden) → recap.

## Runtime Component
`lemot-app/components/lesson-v1/screens/SayItYourWayV1.tsx` (payload `lessonTypes.ts:148-164`). Legacy: `lemot-app/components/sections/SayItYourWay.tsx`.

## Tests
`v1LessonStructure.test.ts` "model-answer-only say-it screens have a modelAnswer" (344-356).

## Known Risks
- AI değerlendirme dev-apk'te dormant → bugün yalnız deterministik reveal. AI açılınca "target detection without praise fabrication" korunmalı. → [[AI Role and Guardrails]].
- Kanıt üretmez (v1). → [[Exercise Evidence Matrix]].

## Kaynak içe aktarımı (Learning Engine Taxonomy, 2026-06-29 vault)

> [!info] Kaynak: `Learning_Engine_and_Exercise_Types.md` §1.4 (Open Production) + `Syllabus_Delta_Log.md` #152. **Zenginleştirir ama override ETMEZ** — runtime canon (HEAD `02f9f7a` / #196) üstün; asla-gradeleme kuralı değişmez.

**Ürün taksonomisi:** Say It Your Way = **Open Production** (serbest, kendi ifadesiyle üretim; montaj yok). Kaynak §1.4 Round 1.1 gerçeğini doğrular: **"Say It uses input → confirm → revealed. No wrong-answer language. AI remains bounded/off unless explicitly enabled."** #152: model answer'dan önce confirmation eklendi ki öğrenci erken reveal ile *ignore* edilmesin (learner agency korunur).

**Open Production ölçüm eşlemesi (kaynak §1.4):**
- Primary signal: attempt. Secondary: hint, reveal, friction; feedback üretilirse system/AI signal.
- Weak-point: **varsayılan olarak ham freeform metinden HİÇBİRİ.** Ancak gelecekte authored `targetMoveIds` varsa (repeated omission of authored chunk).
- Reveal/feedback: Hint Reveal → Compare/Natural Reveal → Encouragement; **AI feedback yalnız bounded ise** (validator/schema'yı asla override etmez).
- **ÇIKARMA:** ham freeform'dan correctness; targetMove schema'sı olmadan gramer zayıflığı; sadece bir şey yazmaktan mastery; AI-üretilmiş diagnosis'i gerçek sayma.

> [!warning] Riskler (kaynak §1.4): app'in çok erken reveal ile öğrenciyi *ignore* etmesi; AI'ın halüsinasyonlu düzeltmesi; sahte grading; hint'lerle cevabı fazla verme. Bu, notun üstündeki "target detection without praise fabrication" anti-pattern'iyle **hizalıdır**. Runtime'da AI dev-apk'te `aiEnabled=false` → dormant; açılırsa bounded kalmalı → [[AI Role and Guardrails]].

## Related Exercises
[[Weave]] · [[Natural Reveal]] · [[Mini Conversation]] (legacy diyalog üretimi) · [[Write]]
</content>
