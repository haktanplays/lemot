---
title: Lesson Mechanics Ideas
aliases: [Ders Mekaniği Fikirleri, Mechanics Ideas]
type: research
domain: learning
status: idea
canon_status: proposed
implementation_status: not-started
verification_status: unverified
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/canon/LESSON_FLOW_CANON_v1.md", "docs/ROADMAP.md"]
related: ["[[Idea Index]]", "[[Lesson Flow]]", "[[Weave System]]", "[[Deferred Decisions]]", "[[Learning Engine Context Pack]]"]
tags: [idea, research, learning]
---

# Lesson Mechanics Ideas

> [!warning] **Fikir/canon-ama-ertelenmiş ders mekanikleri.** Bir kısmı kanon olarak kilitlenmiş ama
> **implementation ertelenmiş** (Faz B/C/D); bir kısmı ham fikir. Hiçbiri "hemen yapılacak" değildir.
> Kilitli olanlar için ana ev [[Lesson Flow]] + ilgili ADR; ham fikirler [[Idea Inbox]] akışına tabidir.

## Canon-locked ama DEFERRED (fikir değil — zamanlama meselesi)

Bunlar tasarım olarak **kabul edilmiş** (LESSON_FLOW_CANON) ama motor/UI'a bağlanmamış. Bir agent bunları
"yeni fikir" sanıp yeniden tasarlamamalı; sadece sırası gelmemiş.

- **Instruction Weave = thermostat** (D-26): uygulamanın kendi talimat sesi öğrenci ısındıkça Fransızcalaşır
  (english-guided → mixed → mostly-french → french-led), **lexique sıcaklığına** göre (ders numarasına DEĞİL);
  parçalar soğursa **geri döner**. Long-press → İngilizce acil çıkış. → Faz D. [DEFERRED/canon]
- **Readiness Gate** (D-27): yalnızca integration derslerinde; gerekli item'lar warm mı diye bakar; hepsi warm →
  gate görünmez; soğuk → ~4-dk warm-up teklifi. **FAIL-OPEN.** Yasak copy: "This lesson is locked. Complete 40 exercises."
  Normal derslere asla yayılmaz. → Faz C. [DEFERRED/canon]
- **Unified hint / struggle ladder** (D-28): proactive hint + reactive help = **tek** ladder. Step 0 sessiz →
  Step 1 ters sırada parça önerisi → Step 2 `hintCloze` iskelet → Step 3 (yalnız reactive) cevap + "bir kez yaz"
  (düşük ağırlıklı kanıt). Her adımda "Skip" → SKIP bucket. → Faz B. [DEFERRED/canon]
- **Meet / Insight / Recap per-screen etkileşim**: bugün statik Continue ekranları; per-screen etkileşim
  **Faz B PLANNED**. [DEFERRED]

## A Small Moment (PLANNED, canon seed)
Retention/usefulness ritüeli — **gramer motoru DEĞİL, chatbot DEĞİL.** L16'da hafif seed (present-only,
known-items-only, ≤2–3 satır, model-answer-only), ~L19'da tekrar. Küçük insan durumu oku → anla → basitçe yanıtla.
Ana ev: [[Integration Lesson Logic]] · [[Syllabus Overview]]. [PLANNED]

## Ham fikirler (PROPOSED — Idea Inbox akışına tabi)
- **Payload enrichment desenleri**: spine dar değil, payload dar (~1.5 payload/engine). Erken derslere repair pair,
  state/feeling, `excusez-moi` gibi "her sahnenin istediği" küçük parçaları ekleyerek üretkenliği artırma fikri.
  Not: L1 chip listesi **açık** — bu bir öneri havuzu, final liste değil. → [[Watchlist]] · [[L1 Survival Kit]].
- **oui'yi üretilebilir cevap sözcüğü yapma** (paradoksu çözmek için) — D-36 v0'da locked ama wiring bekliyor. → [[Watchlist]].
- **Shadowing / early listen** (hardcoded human audio ile) — free-tier sözünün parçası (D-37) ama audio layer DEFERRED. → [[Future Features]].

## Guardrail'ler (her mekanik fikri bunlara uymalı)
- Ekran bütçesi **11–14** (uncounted screen yok); **1–4 yeni active chip** (değişmez). [[Difficulty and Cognitive Load]]
- Tip seti **~10'da donuk** (D-32); yeni ders mimarisi/mekaniği yok. Mevcut tipleri yeniden kullan.
- **Mini Mission'ı diriltme** ("Use It" yalnızca iç şemsiye etiket).
- Passive-mirror ton; integration asla quiz/test gibi hissettirmez; hiçbir yerde ödül dili.
- v1 **frozen** (D-08): iyi fikir ≠ v1 işi; yeni mekanik learning-engine'e aittir.

## İlgili Notlar
- [[Idea Index]] · [[Lesson Flow]] · [[Weave System]] · [[Learning Engine Context Pack]]
- [[Deferred Decisions]] · [[Watchlist]] · [[Exercise Anti-Patterns]]
