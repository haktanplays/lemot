---
title: Syllabus Design Rules
aliases: [Design Rules, Müfredat Kuralları, Lesson Design Rules]
type: system-spec
domain: syllabus
status: active
canon_status: canonical
implementation_status: spec-only
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/syllabus/lesson-spec-template-v1.1.md", "docs/syllabus/lesson-archetype-templates-v1.md", "docs/syllabus/ai-generation-contract-v1.md", "docs/syllabus/chip-taxonomy-and-lexique-lifecycle-v0.3.md"]
related: ["[[00 Le Mot Holy Codex]]", "[[Syllabus Overview]]", "[[Integration Lesson Logic]]", "[[Chip Taxonomy]]", "[[Level and Band Map]]"]
tags: [syllabus, rules, canon]
---

# Syllabus Design Rules

> [!canon] Purpose — Her dersin uyması gereken **planning-canon kural seti**. Bunlar spec/plan katmanıdır; hiçbiri kod/flag/runtime değişikliği yetkilendirmez (`chip-taxonomy…v0.3.md:3`, `ai-generation-contract-v1.md:3`). Chip taksonomisinin kendisi → [[Chip Taxonomy]]; integration ritmi → [[Integration Lesson Logic]].

## Executive Summary

Kurallar tek bir omurgadan doğar: **"correct French is not sufficient"**. Bir form, geçerli Fransızca olsa bile, bu derste ya da öncesinde active/supported/recognition değilse üretilemez — **prerequisite-safety, doğruluğu ezer** (`lesson-spec-template-v1.1.md:51`, `ai-generation-contract-v1.md:29`). **[CANONICAL]**

## Current Canon — the binding rules

### 1. Continuity rule (her ders üç şey yapar)
> [!canon] Her ders **yeni bir şey tanıtır, eskiyi büyütür, geleceği hazırlar** (`lesson-spec-template-v1.1.md:180`; engine §8). **[CANONICAL]**

### 2. Prerequisite-safety > validity
Item yalnız owned bir şeye ya da bu derste supported/recognition olarak verilene dayanıyorsa izinli. "Correct French is not sufficient" (`lesson-spec-template-v1.1.md:51`). **[CANONICAL]**

### 3. Item budget = planning target, validator değil
Erken dersler ~30–45 total exposure; ~8–15 active-new; ~8–15 supported-new; ~10–20 recognition (`lesson-spec-template-v1.1.md:108-114`). L0 budget'ın **altında** olabilir (`:117`). **Bantlar aynı anda maks'lanamaz** (`:121`). **[CANONICAL]**

> [!warning] Bunlar **hedef**, geçme/kalma eşiği değil. Chip audit'e göre L1–L6 için "30-item floor" fabrikasyon olmadan ulaşılamaz; owned havuz o kadar erken küçük (`audit:171`).

### 4. Architecture-verb guardrail
Büyük-fiil dersi tam paradigmayı **eşit aktif üretim** olarak öğretemez — bir baskın aktif çekirdek, gerisi supported/recognition; conjugation table değil sentence family (`lesson-spec-template-v1.1.md:77-83`). Örnek: L2 `je suis` yalnız aktif. **[CANONICAL]**

### 5. Split-sense opening (büyük fiiller için tekrarlanabilir desen)
Bir dar anlamı sahiplen, komşu anlamları ertele. Instances: L7 aller=movement (futur proche deferred), L9 faire=small-action, L11 pouvoir=help/permission, L15 devoir/falloir=light obligation (`lesson-archetype-templates-v1.md:74-82`). **[CANONICAL]**

### 6. Sound/writing guardrail
Normal derste 0–1 major + en çok 1 minor insight; asla telaffuz dersi (`lesson-spec-template-v1.1.md:155`). **[CANONICAL]** → [[Phenomena Progression]].

### 7. No gamification / passive-mirror tone
Hiçbir yerde streak/XP/level-up/achievement/"perfect!" yok (`lesson-spec-template-v1.1.md:7,347`). **[CANONICAL]** Bkz. [[Learner Experience Principles]].

### 8. Chunk→word/frame promotion açık ve statü-işaretli olmalı
recognition → supported/active geçişi bir sonraki ders açıkça status-mark ederse olur; soru sözcükleri / object pronoun'lar sistemleri sahiplenilmeden önce frozen chunk içinde yaşayabilir (`lesson-spec-template-v1.1.md:205-209`). **[CANONICAL]** Örnek: `chunk:j-y-vais` recognition L13 → active L14.

### 9. 70/20/10 archetype model
~70% template-driven, ~20% archetype-weighted, ~10% bespoke (bespoke açık gerekçe ister) (`lesson-archetype-templates-v1.md:7-14,354-361`). Bir primary + en çok bir secondary archetype; **budget'lar toplanmaz**; **asla iki full-cycle engine birleştirme** (`:339-350`). **[CANONICAL]**

## The 17-section spec template & 10 canon sections

Her spec 17-bölümlük zorunlu şekli doldurur (`lesson-spec-template-v1.1.md:33-355`): Lesson Identity → Prerequisite Check → Engine Plan → Opening Sentence Family → Item Budget → Item Tables 7.1–7.10 → Continuity Map → Tense/Aspect/Mood Doorway → Exercise Flow → Natural Reveal Plan → Practice Pool Seeds → Daily Review Hooks → Mon Lexique Output → QA Checks (12-item gate) → (boş bloklar) → Open Decisions.

**On canon ders bölümü** (her ders bu spine'ı koşar, `:246-256`):
> [!canon] **Meet It → Notice the Pieces → Why This Works → Try It → Weave It → Shape It → Say It Your Way → Natural Reveal → Stay With It → Lesson End.** "Use It" yalnız iç şemsiye etiketi; **Mini Mission diriltilmez** (`:258`). **[CANONICAL]** Egzersiz tipleri → [[Exercise System Overview]].

## The 11 archetypes

`lesson-archetype-templates-v1.md:22-34`: (1) Chunk/Survival [L1], (2) Architecture Verb [L2; sonra avoir/aller/faire/pouvoir/vouloir/devoir], (3) Negation/Question/Social Choice [L3], (4) Avoir-State [L4], (5) Object/Article [L5], (6) Pronoun/Particle [y/en/le-la; L14], (7) Tense/Aspect/Mood Doorway, (8) Pattern Transfer Verb [-er], (9) Thematic Vocabulary [L17], (10) Review/Integration [L6/L10/L13/L16], (11) Milestone/Transition [Campfire L24]. **[CANONICAL]**

## Two runtime systems the rules straddle

> [!warning] Repo **iki paralel, paylaşımsız sistem** koşar (`chip-taxonomy…v0.3.md:20-22`): **live v1 renderer** (`content/lessonTypes.ts`, `content/itemRegistry.ts`, tek `status` alanı, L1–L6 render eder) ve **learning-engine** (`content/learning-engine/*`, zengin `LessonContract`, live renderer'a **bağlı değil**). Kurallar spec katmanında yaşar; hangi runtime'a değdiğini her zaman belirt. → [[Runtime Content Architecture]].

## Related Notes
[[Syllabus Overview]] · [[Chip Taxonomy]] · [[Integration Lesson Logic]] · [[Level and Band Map]] · [[Lesson Anatomy]] · [[AI Role and Guardrails]] · [[Exercise Anti-Patterns]]
