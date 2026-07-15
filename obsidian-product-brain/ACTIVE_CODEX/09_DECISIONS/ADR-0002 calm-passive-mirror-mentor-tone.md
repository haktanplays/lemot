---
title: "ADR-0002 Calm passive-mirror mentor tone"
aliases: ["ADR-0002", "Passive mirror tone", "Mentor tone"]
type: decision
domain: product
status: active
canon_status: canonical
implementation_status: implemented
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
decision_date: 2026-06-05
source_of_truth: ["docs/canon/LESSON_FLOW_CANON_v1.md"]
code_refs: []
related: ["[[ADR-0001 no-xp-streak-reward-language]]", "[[Feedback and Scoring Philosophy]]", "[[Natural Reveal]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, product, tone, feedback]
---

# ADR-0002 — Calm, passive-mirror mentor tone

> [!decision] Status: **ACTIVE** (LOCKED)

## Context
Geri bildirim kopyası, sert veya gamified okunma riski taşıyor. Yanlış cevap, hata ve "sınır" (boundary) kartları öğrenciyi cezalandırıyormuş gibi hissettirmemeli.

## Decision
Geri bildirim bir **"passive mirror"**: başarı yumuşak, başarısızlık "**Not a match yet.**" gibi nötr; **Natural Reveal** "cezalandırmaz, açıklar" (explains, not punishes); **boundary kartları asla failure olarak render edilmez**; near-miss nazikçe çerçevelenir.

## Why
Öğrenci güvenini korumak; öğrenmeyi bir yargı değil bir ayna gibi göstermek. Yasak dil (bkz. [[ADR-0001 no-xp-streak-reward-language]]) ile birlikte premium/sakin tonu tanımlar.

## Alternatives Considered
- Passive-mirror nötr geri bildirim (SEÇİLDİ).
- Coşkulu ödül dili ("Amazing!", "You got it!") — reddedildi.

## Rejected Alternatives
"You got it" rozeti (kaldırıldı), "Unlocked!" ("Added." ile değiştirildi), coşkulu/övgü tonu, failure olarak sunulan boundary kartları.

## Consequences
`Sprint12_PRC_passive_mirror_copy_cleanup` residue temizliği; boundary/near-miss render kuralları buna bağlı ([[ADR-0016 boundary-recognition-later-form-ui]], [[ADR-0021 mastery-precision-near-miss-not-failure]]).

## Implementation References
architecture-review §3 (step 4 FEEDBACK) + §7 error-taxonomy learner labels; `v1-to-learning-engine-migration-notes` §5; `Sprint12_PRC_passive_mirror_copy_cleanup`.

## Verification
Source-inspected (copy cleanup PR + canon). Cihaz doğrulaması Round 1 smoke ile dolaylı.

## Supersedes / Superseded By
Supersedes: — · Superseded by: —

## Source Evidence
`06_decisions_history.md` D-02.

## Related
[[ADR-0001 no-xp-streak-reward-language]] · [[Feedback and Scoring Philosophy]] · [[Natural Reveal]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
