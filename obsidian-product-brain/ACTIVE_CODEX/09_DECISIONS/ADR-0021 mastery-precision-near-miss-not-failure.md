---
title: "ADR-0021 Mastery precision policy — near-miss ≠ failure"
aliases: ["ADR-0021", "Precision policy", "near-miss soft signal"]
type: decision
domain: learning
status: active
canon_status: canonical
implementation_status: implemented
verification_status: unit-tested
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-26
last_reviewed: 2026-07-26
decision_date: 2026-06-05
source_of_truth: ["docs/status/founder-self-learning-mastery-precision-policy.md"]
amended_by: ["docs/bibles/mastery-evidence/MASTERY_EVIDENCE_FOUNDER_RATIFICATION_v0.1.md"]
code_refs: ["MASTERY_SNAPSHOT_VERSION", "scoreEvents"]
related: ["[[Mastery Model]]", "[[ADR-0002 calm-passive-mirror-mentor-tone]]", "[[ADR-0022 hub-derived-drills]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, learning, mastery, precision]
---

# ADR-0021 — Mastery precision policy (near-miss ≠ failure)

> [!decision] Status: **ACTIVE** (foundation); staged strictness **DEFERRED**; **SCOPE-AMENDED 2026-07-26** (Mastery & Evidence FQ-1 — see the amendment block at the end)

## Context
Anlamı koruyan aksan/noktalama/1-harf kaymaları tam başarısızlık (failure) sayılıyordu — kelimeyi açıkça bilen öğrenciyi sessizce cezalandırıyordu.

## Decision
Dört bucket: **Success** / **Precision-near-miss** (`punctuation_only`, `accent_only`, `spelling_near_miss`) / **Skip** / **Failure**. Bir precision olayı **soft signal**tir: `precisionCount`/`precisionTags` kaydeder, ama **wrongCount'u artırmaz**, **isWeak set etmez**, leitner box'ı **düşürmez**, prompt-fade'i düşürmez, asla otomatik Mon Lexique'e eklemez, item'ı **Build-eligible** tutar (asla Challenge). Leitner box değişmez; `dueAt` mevcut box'ta yenilenir (skip gibi nötr).

## Why
Kelimeyi bilen öğrenciyi sessizce cezalandırmamak ([[ADR-0002 calm-passive-mirror-mentor-tone]]).

## Alternatives Considered
- Near-miss = tam failure (eski davranış) — reddedildi.
- Near-miss = tam success — reddedildi (yine de bir sinyal; soft kayıt tutulur).

## Rejected Alternatives
Meaning-preserving slip'i failure saymak; near-miss'i tamamen görmezden gelmek.

## Consequences
`MASTERY_SNAPSHOT_VERSION` `mastery-v0.1`→`v0.2`; snapshot her çalıştırmada yeniden hesaplanır (migration yok — [[ADR-0009 events-source-of-truth]] re-derive ilkesi). **Staged strictness DEFERRED**: sonraki bandlar (L60/L70+), monolingual faz, yüksek promptFade, item maturity, gelecekteki `accentCriticality` sıkılaştırabilir. PR-E1/#193 (B7/B12) ile rafine edildi.

## Implementation References
`founder-self-learning-mastery-precision-policy` (tümü); p4 checkpoint (Challenge = weak-only, precision items Build-only); `203f817`; #193.

## Verification
Unit-tested (scoreEvents precision buckets).

## Supersedes / Superseded By
Supersedes: near-miss = failure davranışı. Superseded by: —

## Source Evidence
`06_decisions_history.md` D-23.

## Scope amendment — Mastery & Evidence FQ-1 (2026-07-26)

> [!canon] **Scope amendment, not repeal.** The Decision above remains the 2026-06-05 decision text and
> is preserved verbatim. This block narrows its **member list**, not its **principle**.

**What still stands (unchanged):**
- **Anlamı koruyan bir precision kayması failure değildir.** Bu ilke korunur ve FQ-1 tarafından
  doğrulanmıştır.
- Near-miss varsayılan olarak **cezalandırıcı işlenmez** ([[ADR-0002 calm-passive-mirror-mentor-tone]]).
- Append-only / re-derive mimarisi ([[ADR-0009 events-source-of-truth]]); `mastery-v0.1→v0.2`, migration yok.
- **Staged strictness DEFERRED** olarak kalır.

**What is now historical:**
- Yukarıdaki Decision'daki **sabit üç-üyeli precision listesi** (`punctuation_only`, `accent_only`,
  `spelling_near_miss`) **tarihseldir**. 2026-06-05 kararının metni olarak korunur.
- *"isWeak set etmez"* / *"asla Challenge"* ifadeleri **o üye listesine uygulandığı ölçüde** tarihseldir.

**Binding rule after this amendment (founder FQ-1 + general clarification, 2026-07-26):**
1. **Hiçbir teknik tag polariteyi tek başına belirlemez.** Bir tag gözlenen bir *yüzey ilişkisini*
   tarif eder; pedagojik anlamı otomatik olarak kararlaştırmaz.
2. **Anlamı koruyan** ortografik kayma bir **precision** sinyalidir.
3. **Anlamı değiştiren** sözcüksel/dilbilgisel/minimal-pair ikamesi **negatif kanıt olabilir** ve
   weakness yaratabilir.
4. Bu, `spelling_near_miss`, `accent_only`, `punctuation_only` ve **gelecekteki her teknik tag** için
   geçerlidir (`ou`/`où`, `a`/`à`, `sur`/`sûr` gibi karşı örnekler evrensel bir precision iddiasını
   engeller).
5. **Semantik etkisi bilinmeyen bir olay ne weakness ne de tam precision kredisi kurar.**
6. Sınıflandırmayı **semantik** belirler; teknik bucket sayısı belirlemez.

**Axis-B note (divergence, not authorization):** sevkedilen `mastery.ts` bugün **beş teknik result
bucket** kullanır ve `spelling_near_miss` için `weakTags` biriktirir (audit B7 / PR-E1 #193). Anlamın
bilinmediği yerde bu davranış **provisional ve non-conforming**tir. **Bu amendment hiçbir kod, şema,
tag, eşik, test veya runtime değişikliği yetkilendirmez.**

**Authority:** `docs/bibles/mastery-evidence/MASTERY_EVIDENCE_FOUNDER_RATIFICATION_v0.1.md` §2 / §4f.

## Related
[[Mastery Model]] · [[ADR-0022 hub-derived-drills]] · [[Error Tracking System]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
