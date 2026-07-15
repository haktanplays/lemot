---
title: Experiments
aliases: [Deneyler, Hypotheses, Test Ideas]
type: research
domain: meta
status: idea
canon_status: proposed
implementation_status: not-started
verification_status: unverified
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/DEV_APK_SMOKE_TEST_CHECKLIST.md", "docs/CONTENT_FACTORY_CONTRACT.md"]
related: ["[[Idea Index]]", "[[Research Questions]]", "[[Smoke Test Playbook]]", "[[Content Production Workflow]]", "[[Watchlist]]"]
tags: [idea, research, experiment]
---

# Experiments

> [!warning] **Test edilecek hipotezler — henüz yürütülmedi.** Bir deney tasarım/fikirdir; sonucu gelene kadar
> hiçbir kanonu değiştirmez. Deney sonucu bir karara dönüşürse ADR'ye taşınır. Cihaz/tester deneyleri **operator-only**.

## Yürütülmemiş / bekleyen deneyler

| Hipotez | Nasıl ölçülür | Statü | Not |
|---|---|---|---|
| "Sıkıcılık gitti mi?" — rebuilt Lesson Zero + L1–L6 akışı boredom'ı azaltır | Fiziksel cihaz smoke; tester core sorusu: "Hangi noktada sıkıldın/kafan karıştı/durmak istedin?"; L1 bitti mi? 72h içinde tekrar açtı mı? L2'ye başladı mı? | PENDING (operator-only) | Device Day gate sorusu. → [[Smoke Test Playbook]] |
| Content Factory loop çalışıyor mu (L7–L9 pilot) | 3-ders batch, VALIDATOR-FIRST, Haktan review; "Does it still feel like Cairn?" | PENDING | Home L6-cap unlock PR olmadan runtime-invisible. → [[Content Production Workflow]] |
| Telemetry funnel drop-off nerede | Cihazdan telemetry export → `npm run telemetry:report`; `lesson_started→lesson_completed`, per-screen seen counts, weave attempt counts | PENDING (operator-only, local-only telemetry) | Engagement değil, **content debugging**. Raw free-text asla. |
| L1 payload zenginleştirmesi üretkenliği artırır mı | R-A slice smoke-bearing; L1 sonrası self-talk eşiği gözlemi | PROPOSED (Haktan bekliyor) | L1 chip listesi hâlâ açık. → [[Watchlist]] · [[L1 Survival Kit]] |

## Deney disiplini
- **Screenless golden rule (D-38):** görülmemiş UI davranışı merge edilmez; `[awaiting device pass]` tag'inde bekler.
- Telemetry: LOCAL-ONLY, network yok, **NO RAW LEARNER FREE-TEXT**, mastery'yi asla güncellemez (yalnız gözlem).
- Bir deney bir hipotezi **çürütebilir**; negatif sonuç da sonuçtur — [[Watchlist]] veya [[Rejected Decisions]]'a yaz.
- Bulut deney "sonucu" iddia edemez; operator-only cihaz/tester adımları kapanmadan "geçti" denemez (Rule 11).

## İlgili Notlar
- [[Idea Index]] · [[Research Questions]] · [[Watchlist]]
- [[Smoke Test Playbook]] · [[Test Strategy]] · [[Content Production Workflow]]
