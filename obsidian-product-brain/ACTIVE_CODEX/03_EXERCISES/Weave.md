---
title: Weave
aliases: [Weave Screen, weave, Franglais]
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
source_of_truth: ["lemot-app/content/lessonTypes.ts:120-146", "lemot-app/components/lesson-v1/screens/Weave.tsx", "lemot-app/components/lesson-v1/screens/normalizeAnswer.ts", "docs/canon/LESSON_FLOW_CANON_v1.md", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/Learning_Engine_and_Exercise_Types.md", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/Syllabus_Delta_Log.md"]
code_refs: ["lemot-app/components/lesson-v1/screens/Weave.tsx", "lemot-app/components/lesson-v1/screens/Weave.tsx:22-24,26-30,57-65,68-75,86-102,153-236", "lemot-app/components/lesson-v1/screens/normalizeAnswer.ts:14-45", "lemot-app/components/lesson-v1/screens/weaveCopy.ts", "lemot-app/content/lessonTypes.ts:120-146"]
test_refs: ["lemot-app/__tests__/weaveMatch.test.ts", "lemot-app/__tests__/weaveCopy.test.ts", "lemot-app/__tests__/v1LessonStructure.test.ts"]
related: ["[[00 Le Mot Holy Codex]]", "[[Exercise System Overview]]", "[[Weave System]]", "[[Natural Reveal]]", "[[Combine and Weave]]", "[[Say It Your Way]]"]
tags: [exercise, weave, killer-mechanic, production, v1-active, crown]
---

# Weave

<!-- gh-toc -->

## İçindekiler

- [Purpose (detay — CANONICAL §1.3 EXERCISE_CANON)](#purpose-detay-canonical-13-exercisecanon)
- [Learner Action](#learner-action)
- [Input Contract](#input-contract)
- [Output Contract](#output-contract)
- [Correctness Rule](#correctness-rule)
- [Evidence Produced](#evidence-produced)
- [Error Types](#error-types)
- [Scoring](#scoring)
- [Feedback (nötr, non-punitive — kritik)](#feedback-nötr-non-punitive-kritik)
- [Hint ladder (3-rung — IMPLEMENTED §8)](#hint-ladder-3-rung-implemented-8)
- [Suitable / Unsuitable Use](#suitable-unsuitable-use)
- [Difficulty Controls](#difficulty-controls)
- [Example Payload](#example-payload)
- [Example Learner Interaction](#example-learner-interaction)
- [Runtime Component](#runtime-component)
- [Tests](#tests)
- [Known Risks](#known-risks)
- [Related Exercises](#related-exercises)

> [!canon] Purpose — Cairn'in **killer mekaniği**. Öğrenci **sahiplendiği Fransızca "engine"lerden bir iskelet** kurar; bilmediği parçaları **İngilizce bırakır** (`je voudrais but pas today`). "Smallest useful upgrade", asla zorla tam çeviri. Başka hiçbir uygulama bunu yapmıyor.

> [!implemented] impl_status: **implemented (v1 active dev-apk)** — hint ladder canlı, reveal canlı. Killer trinity'nin (Weave + [[Say It Your Way]] + [[Natural Reveal]]) merkezi.

Yukarı: [[00 Le Mot Holy Codex]] · [[Exercise System Overview]] · Sistem ana evi: [[Weave System]]

## Purpose (detay — CANONICAL §1.3 EXERCISE_CANON)
Bilinen parçalar Fransızca, gerisi İngilizce; iki dili "dokuma". **Locked W1: açık mixed Weave'ler GRADESİZ** — reveal geri bildirimin kendisidir. (Eski adı "Franglais"; trademark için "Weave".)

## Learner Action
`TextInput`'e serbest yazar (`Weave.tsx:242`), **Check**'e basar. `phase: "input" → "revealed"` (`:41`).

## Input Contract
`WeavePayload` (`lessonTypes.ts:120-146`): `weaveType`(supported|mid|context|open), `prompt`, `context?`, `suggestedPieces[]{text,itemId?,required?,label?}`, `expectedAnswers[]`, `acceptedAlternatives?`, `naturalAlternatives?`, `hintCloze?`, `reveal: NaturalRevealPayload`, `validationMode?`.

## Output Contract
`MatchResult` (`exact | alternative | none`). **Runtime'da LearningEvent emit edilmez** — W1 gereği open Weave gradesiz.

## Correctness Rule
`matchExpected(input, expectedAnswers, acceptedAlternatives)` (`normalizeAnswer.ts:25-45`):
- `"exact"` → bir `expectedAnswer`'a eşit
- `"alternative"` → bir `acceptedAlternatives`'e eşit
- `"none"` → hiçbiri (boş girdi de `none`)

`normalize()` (`:14-23`): aksan/case/virgül/nokta/smart-quote katlar; **`?`/`!` ve apostrof anlam-taşıyıcı kalır** (soru ≠ cümle; eksik apostrof sessizce kabul edilmez).

## Evidence Produced
Runtime: yok (W1). Bkz. [[Exercise Evidence Matrix]].

## Error Types
Yazım-tipi olduğundan kavramsal olarak cor/av/punc/acc/spell/w-item/w-ord/miss/extra/m-shift/ibu/over/skip doğurabilir — **ama W1 ile gradelenmediği için hiçbir error-tag emit edilmez**. Bkz. [[Exercise Error Matrix]].

## Scoring
Skorlanmaz. `none` bir hata değil, **bloke-etmeyen compare-with-model** adımı.

## Feedback (nötr, non-punitive — kritik)
`RESULT_NOTES` (`Weave.tsx:26-30`):
- `exact` = "Correct." (yeşil)
- `alternative` = "Accepted." (amber)
- `none` = "Compare with the model answer." (**NÖTR**, kırmızı DEĞİL — `:68-75` yorum)

Ardından `NaturalRevealView` mode `exact/alternative/no-match` (`:285-296`). Marka rozeti: nötr **ink** "Weave" pill (`:86-102`) — kasıtlı olarak validation rengi değil.

## Hint ladder (3-rung — IMPLEMENTED §8)
`hintLevel` 0→1→2 (`:46`, `:153-236`):
- **0** = sessiz "Need a hint?" (`:155-164`)
- **1** = `suggestedPieces` **ters sırada** gösterilir (`orderHintPieces`, `:22-24` — deterministik reverse, asla kopya-hazır sıra) "Pieces you already own"
- **2** = `hintCloze` şekli (ör. `Bonjour, je voudrais ___, s'il vous plaît.`); cloze gelince pieces çökertilir

Bu, canon'un "rebuild-the-thought, not copy" (§8) ilkesinin runtime evidir.

## Suitable / Unsuitable Use
Suitable: sahiplenilen engine'lerden yeni bir düşünceyi kurma; kısmi Fransızca üretim. Unsuitable:
> [!warning] Anti-pattern: Weave'i **tasarlanmış çeviri egzersizi** yapmak; açık mixed Weave'i **gradelemek** (lint error). "Broken Weave Reconstruction" **REJECTED/removed** (§11 edit 7).

## Difficulty Controls
`weaveType` (supported→mid→context→open); required vs optional pieces; cloze var/yok; `acceptedAlternatives` genişliği.

## Example Payload
> [!example]
```json
{ "type": "weave",
  "payload": { "weaveType": "supported", "prompt": "Hello, I would like a coffee",
    "suggestedPieces": [ {"text":"Bonjour"}, {"text":"je voudrais"}, {"text":"un café"} ],
    "expectedAnswers": ["Bonjour, je voudrais un café"],
    "acceptedAlternatives": ["Bonjour je voudrais un café"],
    "hintCloze": "Bonjour, je voudrais ___.",
    "reveal": { "modelAnswer": "Bonjour, je voudrais un café." } } }
```

## Example Learner Interaction
L1 ekran 6 (supported): hedef "Hello, I would like a coffee" → öğrenci `Bonjour, je voudrais un café` yazar → Check → "Correct." (yeşil) + Natural Reveal → Continue. Yanlış/eksikse "Need a hint?" → pieces (ters) → cloze.

## Runtime Component
`lemot-app/components/lesson-v1/screens/Weave.tsx` (+ `normalizeAnswer.ts`, `weaveCopy.ts`; reveal `NaturalReveal.tsx`).

## Tests
`weaveMatch.test.ts` (matchExpected), `weaveCopy.test.ts`; `v1LessonStructure.test.ts` "weave screens have answers and a deterministic reveal" (303-325) + "question-form weave answers carry a no-question-mark alternative" (327-342, çünkü `?` normalize'da anlamlı).

## Known Risks
- W1: açık Weave gradesiz → runtime öğrenme kanıtı yok. Kanıt engine'e taşınırsa W1 korunmalı. → [[Exercise Evidence Matrix]].
- `?`/apostrof anlamlı olduğundan soru-formu Weave'lerin `acceptedAlternatives`'inde soru-işaretsiz alternatif ŞART (test guard).

## Kaynak içe aktarımı (Learning Engine Taxonomy, 2026-06-29 vault)

> [!info] Kaynak: `Learning_Engine_and_Exercise_Types.md` §1.3 (Guided Production) + §1.3 field-signal + `Syllabus_Delta_Log.md` #155. **Zenginleştirir ama override ETMEZ** — Weave locked **W1** (açık mixed Weave gradesiz, `matchExpected` deterministik judge) değişmez. **Evaluator'a dokunma.**

**Ürün taksonomisi:** Weave = **Guided Production** (destekli kısıtlı üretim) + reveal aşamasında **Comparison**. Kaynak §1.3: "Can the learner produce the target phrase/sentence with known support?" Round 1.1 gerçeği kaynakta doğrulanır: "Weave is labeled 'Try it in French'... deterministic accepted-answer matching for full French answers. Mixed/partial attempts go to neutral compare, not red error."

**Guided Production ölçüm eşlemesi (kaynak §1.3):**
- Primary signal: attempt + correctness. Secondary: hint, reveal, friction, weak-point.
- Reveal/feedback bağımlılığı: Compare Feedback → Model Answer Reveal → Natural Reveal → opsiyonel Hint Reveal.
- Doğurabildiği weak-point (yalnız authored): missing target chunk, wrong package, (lesson-scoped ise) word-order/pattern.
- **ÇIKARMA:** broad grammar ability; structured target-move olmadan partial-credit diagnosis; task copy bridge davranışını davet ediyorsa mixed-language denemeyi *cezalandırıcı anlamda* yanlış sayma.

### Tester 1 carry-over / salience field signal (2026-06-29, kaynak §1.3)
> [!warning] Gözlem: **ardışık farklı-hedefli Weave'lerde** öğrenci **bir önceki Weave'in kabul edilen cevabını** yeniden gönderdi (beklenen `je ne suis pas ici`, sonraki hedef ~`ce n'est pas ici`, öğrenci `je ne suis pas ici` tekrarladı). Bunu **Prompt-Salience / UI-Attention sinyali (Friction/UI-Flow)** olarak oku — **otomatik olarak Correctness/Weak-Point (Learner Error) DEĞİL.** Öğrenci hedef anlamının değiştiğini fark etmemiş olabilir.
>
> **Ölçüm çıkarımı:** bir submission, **hemen önceki Weave'in kabul edilen cevabına eşit ama mevcut hedefle uyuşmuyorsa**, bunu **carry-over / salience** olayı olarak işaretle — gerçek üretim miss'inden ayrı; mevcut hedefte weak-point sayaçlarını şişirmesine izin verme. Ürün yanıtı **copy/salience-first**tir (→ #155 Weave brand + `Say this:` + dominant target + `Your try` label; bkz. [[Exercise Selection Matrix]]). **Hiçbir evaluator değişimi ima edilmez;** detection nudge daha fazla tester kanıtına gated (→ [[05 Open Loops]]).

## Related Exercises
[[Combine and Weave]] (legacy 2-fazlı Combine+Weave) · [[Say It Your Way]] · [[Natural Reveal]] · [[Write]] · [[Weave System]]
</content>
