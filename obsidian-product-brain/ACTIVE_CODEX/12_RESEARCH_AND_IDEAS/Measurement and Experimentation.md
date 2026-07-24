---
title: Measurement and Experimentation
aliases: [Measurement and Experimentation, Measurement Governance, Experimentation Governance, Telemetry Governance, Ölçüm ve Deney, Metrics]
type: governance
domain: meta
status: skeleton
canon_status: provisional
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-17
last_updated: 2026-07-18
last_reviewed: 2026-07-18
source_of_truth: ["obsidian-product-brain/ACTIVE_CODEX/12_RESEARCH_AND_IDEAS/Experiments.md", "obsidian-product-brain/ACTIVE_CODEX/09_DECISIONS/ADR-0009 events-source-of-truth.md", "obsidian-product-brain/ACTIVE_CODEX/06_ARCHITECTURE/Privacy and Data Deletion.md"]
code_refs: []
test_refs: []
related: ["[[00 Le Mot Holy Codex]]", "[[Experiments]]", "[[ADR-0009 events-source-of-truth]]", "[[Privacy and Data Deletion]]", "[[Product Risks]]", "[[05 Open Loops]]"]
supersedes: []
superseded_by: []
tags: [research, governance, measurement, telemetry, experimentation, skeleton]
---

# Measurement and Experimentation

<!-- gh-toc -->

## İçindekiler

- [Purpose](#purpose)
- [Measurement Principles](#measurement-principles)
- [Metric Layers](#metric-layers)
- [Event Dictionary Skeleton](#event-dictionary-skeleton)
- [Experiment Lifecycle](#experiment-lifecycle)
- [Evidence Strength](#evidence-strength)
- [Current Decision-Bearing Experiments](#current-decision-bearing-experiments)
- [Export and Cohort Skeleton](#export-and-cohort-skeleton)
- [Decision Gates](#decision-gates)
- [Policy Hardening — TUNABLE Parameter Decision Metadata (2026-07-18)](#policy-hardening-tunable-parameter-decision-metadata-2026-07-18)
- [Related Notes](#related-notes)

> [!warning] Skeleton Banner
> - Bu bir **yönetişim iskeletidir** — analytics şeması veya metrik kataloğu değil.
> - **Sayısal hedef UYDURULMADI**; **tam event şeması TANIMLANMADI.**
> - Neyi ölçmeye izinli olduğumuz ve deneylerin nasıl karara dönüştüğü **OPEN**'dır.
> - Ölçüm **oyunlaştırmayı geri sokamaz** (streak/XP/level dili canon-wide yasak).

## Purpose

"Neyi, neden, hangi rıza ile ölçeriz ve deneyleri nasıl **karara** dönüştürürüz?" sorusunun **tek kanonik evi**. Bir ölçüm sistemi tasarlamaz; ölçümün **yönetişimini** çerçeveler. Yürütülmemiş hipotez kataloğu ayrı yaşar → [[Experiments]].

## Measurement Principles

Bağlayıcı ilkeler (yeni sayısal karar değil; disiplin):

- **Yalnız karar-taşıyan metrik** (decision-bearing) — bir kapı sorusunu cevaplamayan metrik toplanmaz.
- **Minimum gerekli toplama** (minimum necessary collection).
- **Ham serbest-metin öğrenci girdisi YOK** (no raw learner free-text).
- **Kanonun gerektirdiği yerde local-only** (bugün telemetri cihazda, network yok).
- **Telemetri mastery'yi asla sessizce değiştirmez** (yalnız gözlem; mastery = counter'lar).
- **Negatif sonuç da sonuçtur** (negative results count).
- **Nitel + nicel kanıt birlikte** (qualitative + quantitative).
- **Karar kapısı olmayan metrik gürültüdür** (metrics without decision gates are noise).
- **Vanity metrik ürün hedefi değildir** (vanity metrics are not product goals).

> [!canon] Ölçüm **amaca yönelik, gözetim değil** — [[Privacy and Data Deletion]] gizlilik ilkeleriyle hizalı.

## Metric Layers

Ölçümün oturduğu katmanlar (yapı; eşik/değer **OPEN**, uydurulmadı):

- **Content-debugging katmanı** — huni/drop-off, per-screen seen, weave attempt (bugün var olan tek somut niyet; sayısal eşik yok).
- **Learning-signal katmanı** — mastery/hata **gözlemi** (telemetri mastery'yi değiştirmez).
- **Experience/hook katmanı** — ROADMAP Taş 3 "hook kriterleri tutuyor mu?" (eşikler **OPEN**).
- **Operasyonel sağlık katmanı** — crash/fail-graceful (Sentry yok, KNOWN_GAPS #11).

Bu katmanların hiçbiri için sayısal hedef bu pass'te tanımlanmadı.

## Event Dictionary Skeleton

> [!warning] **İskelet** — tam event şeması (alanlar/tipler/payload) burada **TANIMLANMAZ.** Event kaynağı tek-gerçek: [[ADR-0009 events-source-of-truth]].

Bugün kaynak dokümanlarda **adı geçen** sinyaller (yeni event icat edilmedi):

- `lesson_started` → `lesson_completed` hunisi (Taş 0 içerik-debug sinyali; [[Experiments]]).
- per-screen seen counts, weave attempt counts (içerik-debug; [[Experiments]]).

Alan/tip/payload sözleşmesi = **OPEN** (→ [[Missing Documentation]] measurement-depth).

## Experiment Lifecycle

Bir deneyin yaşam döngüsü (süreç iskeleti):

1. **Hipotez** — açık, çürütülebilir; [[Experiments]] tablosuna yazılır.
2. **Karar-taşıyan mı?** — hangi kapıyı cevaplıyor? Cevaplamıyorsa yürütülmez.
3. **Ölçüm tanımı** — hangi sinyal, hangi rıza, local-only mi.
4. **Yürütme** — cihaz/tester adımları **Operator-only** (Rule 11).
5. **Kanıt değerlendirme** — nitel + nicel; negatif sonuç kaydedilir.
6. **Karara dönüş** — sonuç bir kararsa **ADR'ye** taşınır; değilse [[Watchlist]]/[[Rejected Decisions]].

> [!canon] Screenless golden rule (D-38): görülmemiş davranış merge edilmez; deney "geçti" iddiası operator device/tester adımı kapanmadan yapılamaz.

## Evidence Strength

Kanıt gücü ayrımı (kayıt için; yeni eşik değil):

- **device-verified** > **unit-tested** > **source-inspected** > **reported-only** > **provisional/unverified**.
- Bulut oturumu "geçti" diyemez; en fazla "code-side ready" ([[Product Risks]] Live Premortem: **docs ≠ validasyon**).
- Tek anekdot ≠ kanıt; nitel gözlem nicel huni ile birlikte değerlendirilir.

## Current Decision-Bearing Experiments

Şu an gerçekten karar taşıyan (defter tekrarlanmaz; ana ev [[Experiments]]):

- **Taş 0 ikinci smoke** — "L7–L15'li haliyle sıkıcılık gitti mi?" Sinyal: started→completed hunisi + nitel "nerede sıkıldın?" (PENDING, operator-only). → [[Current Priorities]] · [[Experiments]].
- **Content Factory loop (L7–L9 pilot)** — "Does it still feel like Cairn?" (PENDING). → [[Content Production Workflow]].

Bunların sayısal başarı eşiği **OPEN** — uydurulmadı.

## Export and Cohort Skeleton

> [!warning] **İskelet** — export/cohort şeması tanımlanmaz.

- Telemetri **local-only**; export bugün cihazdan operator eliyle (`telemetry:report` niyeti, [[Experiments]]).
- Cohort tanımı (tester dalgaları, ROADMAP Taş 3) **OPEN**; kişisel tanımlayıcı toplama **YOK** varsayılanı korunur.
- Herhangi bir uzak export consent-gated + hukuki katmana bağlı → [[Legal Compliance and Data Governance]] (retention/cross-border OPEN).

## Decision Gates

> [!open-loop] Device-day / tester turundan önce/sırasında cevaplanmalı; hiçbiri bu pass'te açılmadı.
> - **G-M1:** İkinci smoke için minimum karar-taşıyan sinyal seti nedir? (Taş 0)
> - **G-M2:** "Amaç" vs "gözetim" ayrım kuralı nasıl uygulanır?
> - **G-M3:** Hook kriterlerinin eşikleri ne? (Taş 3 — sayısal hedef OPEN)
> - **G-M4:** Telemetri rızası + saklama nasıl? → [[Privacy and Data Deletion]] · [[Legal Compliance and Data Governance]].
>
> İzlenen yer: [[05 Open Loops]] · [[Experiments]].

## Policy Hardening — TUNABLE Parameter Decision Metadata (2026-07-18)

> [!canon] **PRIMARY POLICY HOME** for **TUNABLE parametre karar-metadata**'sı. Değerlerin **tek kanonik yeri** hâlâ kendi ana evleri (cap'ler [[Difficulty and Cognitive Load]], horizon [[Chip Lifecycle]] vb.); burası **review mekanizması**dır. Sınıf: **[HARD INVARIANT]**.

### Meta-kural [HARD INVARIANT]

**Bir parametre, adlandırılmış bir review mekanizması olmadan anlamlı biçimde "tunable" kalamaz.** Her TUNABLE parametre şunları beyan eder: parameter name · current default · allowed/plausible range (biliniyorsa) · owner · evidence source · **named review gate** · decision question · last reviewed · status (retain/change/defer) · enforcement status.

> [!warning] Tabloyu doldurmak için **sahte başarı eşiği UYDURULMAZ.** Bilinmeyen aralık/eşik **OPEN** kalır.

### TUNABLE register (mevcut policy passlerinden)

| Parameter | Default | Aralık | Owner | Named review gate | Decision question | Status | Enforcement |
|---|---|---|---|---|---|---|---|
| `visibleCarryoverCap` | 3 | OPEN | founder/content | ilk policy-uyumlu içerik batch'i + ilk gözlemli learner smoke | Carryover dersin yeni hedefini gölgeliyor mu, yoksa süreklilik yetersiz mi? | defer | CPW lint (build-time) |
| `recycledPerSentence` | 2 | OPEN | content | aynı batch review | Cümle recycle ile mi boğuluyor? | defer | elle/lint |
| `exposurePerUnit` | 2 | OPEN | content | aynı batch review | Ünite exposure ile mi kalabalık? | defer | elle |
| `weakPerSentence` | 1 | OPEN | content | ilk repair-taşıyan batch | Tek cümlede >1 weak taşınabilir mi? | defer | elle |
| `targetLoadShare` | ≥0.50 | OPEN | content | batch review + smoke | Hedef yük payı yeterince baskın mı? | defer | CPW lint |
| `repairReserve` | 1 | OPEN | content | ilk error-repair gözlemi | 1 repair item yeterli/güvenli mi? | defer | elle |
| carryover horizon süreleri | 3–5 / 5–7 ders | OPEN | content | smoke sonrası | Item türüne göre kuyruk doğru uzunlukta mı? | defer | elle |
| repair eligibility eşiği | twice / two-lesson | OPEN | content | ilk error kanıtı | Eşik çok erken/geç mi tetikliyor? | defer | elle |
| exposure→active eşiği | **OPEN** (yok) | OPEN | content | pedagojik kanıt | Sayısal eşik gerekli mi, yoksa per-lesson karar mı? | defer | — |

Değer evleri: [[Difficulty and Cognitive Load]] · [[Chip Lifecycle]] · [[Error Tracking System]].

### Kabul edilebilir evidence source'lar

authored lesson-batch review · device smoke · gözlemli learner session · per-tag error kanıtı · hint/retry kanıtı · completion/drop-off kanıtı · French QA bulguları · selector fixture · retro-audit.

### TUNABLE değişiklik prosedürü [LOCKED DEFAULT]

1. parametreyi adlandır, 2. review gate/kanıtı belirt, 3. eski→yeni değer, 4. beklenen etki, 5. **primary policy home'u güncelle**, 6. CHANGELOG, 7. validator/config **yalnız ayrıca yetkilendirilmiş bir implementation değişikliğinde**.

> [!warning] Bir TUNABLE değeri **ilgisiz bir ders PR'ında sessizce değiştirilemez.** **Bu docs-only pass runtime sabitlerini değiştirmez.**

## Related Notes

[[Experiments]] · [[ADR-0009 events-source-of-truth]] · [[Privacy and Data Deletion]] · [[Legal Compliance and Data Governance]] · [[Product Risks]] · [[Content Production Workflow]] · [[Difficulty and Cognitive Load]] · [[Chip Lifecycle]] · [[05 Open Loops]] · [[Current Priorities]] · [[00 Le Mot Holy Codex]]
