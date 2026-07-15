---
title: Source Ledger
aliases: [Kaynak Defteri, Master Source Table, Source of Truth Ledger]
type: source-record
domain: meta
status: active
canon_status: canonical
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/README.md", "docs/STATUS.md", "docs/MASTER_PIPELINE_v1.2.1.md", "CLAUDE.md"]
related: ["[[08 Source of Truth Map]]", "[[Repository Document Index]]", "[[Code Source Index]]", "[[Test Source Index]]", "[[External Artifact Index]]", "[[Missing Source Inputs]]", "[[Contradictions]]", "[[06 Canon and Status Legend]]"]
tags: [source, meta, ledger]
---

# Source Ledger

> [!canon] Bu not, Cairn/Le Mot bilgi tabanının **ana kaynak defteridir**.
> Her satır bir kaynağı (repo dokümanı, kod dosyası/grubu, test, dış artefakt veya
> operator-vault boşluğu) tek bir yetki (authority) katmanına ve tazelik (freshness)
> durumuna bağlar. Bir kaynağın "detaylı" olması onu "güncel" yapmaz —
> önce [[08 Source of Truth Map]] ve bu defterle hangi kaynağın hangi katmanı
> kontrol ettiğine bak.

## Amaç

Le Mot tarihinin en pahalı hatası, "karar", "kod" ve "cihazda kanıt"ı karıştırmaktı
(bkz. [[06 Canon and Status Legend]]). Bu defter, her iddianın arkasındaki kaynağı
izlenebilir kılar: **hangi dosya**, **hangi tazelikte**, **hangi katmanda otorite**,
**hangi notlarda kullanıldı**, **kiminle çelişiyor**.

## Yetki katmanları (authority tiers 1–7)

`docs/README.md:20-42` + `MASTER_PIPELINE_v1.2.1.md §2` precedence zincirinden türetildi.
Çatışma kuralı (CANONICAL): **"newer active canon > current codebase canon > older active
canon > design reference > archive."**

| Tier | Katman | Örnek |
|---|---|---|
| 1 | Current-build canon (şu an ne inşa ediliyor) | `CLAUDE.md` banner, `STATUS.md`, `DEV_APK_MVP_CANON.md`, smoke checklist |
| 2 | Process canon (nasıl çalışılır) | `MASTER_PIPELINE_v1.2.1.md`, `karpathy.md`, agent constitution |
| 3 | Product vision/intent (ne inşa edilecek) | Cairn v1.0 spec, `CAIRN_PRODUCT_ANSWERS`, canon'lar, roadmap'ler, `KNOWN_GAPS` |
| 4 | Active workstream | `docs/workstreams/*` |
| 5 | Syllabus & matrix planlama | `docs/syllabus/*`, `docs/architecture/*` |
| 6 | Status / checkpoint / audit / runbook | `docs/status/*`, `docs/audits/*`, `docs/runbooks/*` |
| 7 | Archive / superseded | v0.1 Cairn docs, `CLAUDE.md` body, Merged Canon 2026-05-11 |

> [!warning] **Kod ayrı bir eksen.** Kod, "current codebase canon"dır: yeni aktif kanon
> onu geçer ama eski aktif kanonu ve tasarım referansını geçer. Kod satırları aşağıda
> "runtime-truth" olarak işaretlidir — bir iddianın gerçekten çalışıp çalışmadığının
> nihai kanıtı koddur (ama "kodda var" ≠ "cihazda doğrulandı").

## Ana kaynak tablosu

Freshness: **current** = şu anki main'i yönetiyor · **stale** = güncel ama bir alt-iddiası
eskimiş · **historical/superseded** = artık aktif değil. Repo main HEAD = `02f9f7a` (#196).

| # | Source | Path | Type | Tier | Freshness | Controls-which-layer | Used-in-notes | Conflict-notes |
|---|---|---|---|---|---|---|---|---|
| 1 | CLAUDE.md (banner) | `CLAUDE.md:1-11` | canon | 1 | current | En üst precedence; legacy body'yi devre dışı bırakır | [[00 Le Mot Holy Codex]], [[03 Current State]] | Kendi body'siyle (12+) çelişir → banner kazanır ([[Contradictions]] C1) |
| 2 | CLAUDE.md (body) | `CLAUDE.md:12+` | historical | 7 | superseded | Hiçbir şey; sadece referans (v7 24-ders) | [[Superseded Decisions]], [[Historical Syllabus]] | 24 ders / L14 paywall / 11-bölüm / Sprint 10 — tamamı legacy |
| 3 | STATUS.md | `docs/STATUS.md` | canon | 1 | current (snapshot stale-tuzağı) | Şu anki execution reality | [[03 Current State]], [[Lesson Status Matrix]] | "7 lessons"/`91f1b04` snapshot'ı 16 dosyalık ağaçtan eski ([[Contradictions]] C4) |
| 4 | DEV_APK_MVP_CANON.md | `docs/DEV_APK_MVP_CANON.md` | canon | 1 | current | Dev APK scope: ne ships | [[Dev APK Scope]], [[Product Stages and Feature Flags]] | "L1-L5" vs runtime L0-L6 ([[Contradictions]] C2) |
| 5 | DEV_APK_SMOKE_TEST_CHECKLIST.md | `docs/DEV_APK_SMOKE_TEST_CHECKLIST.md` | canon | 1 | current | Round 1 operator smoke prosedürü | [[Smoke Test Playbook]], [[Device Verification Matrix]] | Operator-vault "Test Checklist" ile çift; repo kopyası kazanır |
| 6 | MASTER_PIPELINE_v1.2.1.md | `docs/MASTER_PIPELINE_v1.2.1.md` | canon | 2 | current | Süreç/pipeline; cloud kuralları; Sync Queue | [[Claude Code Workflow]], [[Development Workflow]] | — |
| 7 | karpathy.md | `docs/engineering/karpathy.md` | canon | 2 | current | Engine-purity kontratı (pure/deterministic/explicit now/fail-closed) | [[Learning Engine Architecture]], [[Decision Index]] (D-12) | — |
| 8 | LE_MOT_AGENT_CONSTITUTION.md | `docs/agents/LE_MOT_AGENT_CONSTITUTION.md` | canon | 2 | current | Away-agent rolleri/sınırları | [[Agent Collaboration]], [[Claude Code Workflow]] | — |
| 9 | AWAY_TASK_QUEUE.md / AWAY_AGENT_RUN_TEMPLATE.md | `docs/agents/*` | canon | 2 | current | Away kuyruğu + rapor şablonu | [[Agent Collaboration]] | — |
| 10 | CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md | `docs/CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md` (5236 satır) | spec | 3 | current (intent, build-authority DEĞİL) | Uzun vadeli ürün/build niyeti; §48-64 > §31-47; §66 kilitli kararlar | [[Product Vision]], [[Monetization and Scope Boundaries]], [[Decision Index]] | Current-build canon çelişkide kazanır (README §64) |
| 11 | CAIRN_PRODUCT_ANSWERS_2026_07.md | `docs/CAIRN_PRODUCT_ANSWERS_2026_07.md` | canon | 3 | current (2026-07-04, en yeni founder niyeti) | İçerik-yazımı bağlayıcı: learner profili, Weave true-form, Campfire L24 | [[Learning Philosophy]], [[Weave System]], [[Monetization and Scope Boundaries]] | Campfire-L24'ü *locked* sayar; §66.3 *deferred* der ([[Contradictions]] C3) |
| 12 | LESSON_FLOW_CANON_v1.md | `docs/canon/LESSON_FLOW_CANON_v1.md` | canon | 3 | current (2026-07-05) | Ders akışı kapalı tasarım kanonu (3 katman, 11-14 ekran, 7 tip) | [[Lesson Flow]], [[Lesson Anatomy]], [[Exercise System Overview]] | Kod yetkilendirmez; Dev APK canon çelişkide kazanır (kendi §0) |
| 13 | EXERCISE_CANON_v0.4.md | `docs/EXERCISE_CANON_v0.4.md` | canon | 3 | current (2026-07-05) | Egzersiz kanonu; §16 anti-pattern validator kuralları | [[Exercise System Overview]], [[Exercise Anti-Patterns]] | — |
| 14 | CONTENT_FACTORY_CONTRACT.md | `docs/CONTENT_FACTORY_CONTRACT.md` | canon | 3 | current (Faz 6A, 2026-07-02) | Kalan Cairn dersleri üretim kontratı; pilot L7-L9 | [[Content Production Workflow]], [[Syllabus Production Workflow]] | — |
| 15 | PAYLOAD_ECONOMY_v0.md | `docs/PAYLOAD_ECONOMY_v0.md` | canon | 3 | current (locked 2026-07-04) | Item ekonomisi (engine/payload/ghost/pool); survival-formula sınıfı | [[Chip Taxonomy]], [[Vocabulary Progression]] | CLOUD_SYNC_QUEUE'da operator-sync PENDING |
| 16 | learning-engine-v1.md | `docs/learning-engine-v1.md` | spec | 3 | current (spec, kod değil) | Pedagojik öğrenme-objesi spec'i; 7-aşama spiral | [[Learning System Overview]], [[Self-Producing Engine]], [[Mon Lexique]] | "It is spec, not code" (kendi §3) |
| 17 | ROADMAP.md (Five Stones) | `docs/ROADMAP.md` | canon | 3 | current (2026-07-05, deployment-first) | Beş Taş deployment sırası; YASA 1-3 sistem anayasası | [[Sprint Timeline]], [[Release and Build Process]], [[Decision Index]] | CAIRN_ROADMAP ile paralel/uzlaşmamış ([[Contradictions]] C5) |
| 18 | CAIRN_ROADMAP_202607.md | `docs/CAIRN_ROADMAP_202607.md` | canon | 3 | current (engine-first, Faz 0-7) | Motor-öncelikli execution sırası | [[Sprint Timeline]], [[Product Timeline]] | ROADMAP.md ile paralel ([[Contradictions]] C5) |
| 19 | KNOWN_GAPS.md | `docs/KNOWN_GAPS.md` | canon | 3 | current | 14 açık boşluk envanteri + "sağlıklı, dokunma" listesi | [[Known Gaps]], [[Technical Debt]] | — |
| 20 | README.md (docs map) | `docs/README.md` | canon | 3 | current | Precedence indeksi + docs haritası | [[08 Source of Truth Map]], bu not | — |
| 21 | CAIRN_PRODUCT_DEFINITION_v0.1.md | `docs/CAIRN_PRODUCT_DEFINITION_v0.1.md` | historical | 7 | superseded (2026-07-02) | Yok; v1.0 spec kazanır (referans) | [[Superseded Decisions]], [[Historical Canon Map]] | v1.0 spec supersedes (kendi banner'ı) |
| 22 | CAIRN_PRODUCT_SYSTEM_MAP_v0.1.md | `docs/CAIRN_PRODUCT_SYSTEM_MAP_v0.1.md` | historical | 7 | superseded (2026-07-02) | Yok; referans | [[Superseded Decisions]] | v1.0 spec supersedes |
| 23 | CLOUD_SYNC_QUEUE.md | `docs/CLOUD_SYNC_QUEUE.md` | ops | 6 | current | Operator'a devredilen durable kararlar kuyruğu | [[Obsidian to Git Promotion Rules]], [[Missing Source Inputs]] | — |
| 24 | docs/workstreams/* (30+ dosya) | `docs/workstreams/` | workstream | 4 | mixed (Sprint 12/13 + Round 1) | Sprint bazlı iş kalemleri | [[PR Map]], [[Implementation Ledger]] | Sprint 11 dili stale; STATUS tekil kaynak (D1) |
| 25 | docs/syllabus/* (30 dosya) | `docs/syllabus/` | spec | 5 | current (planning canon) | Ders specleri (L1-L5 full, L6-L17 spec/compact), taxonomy, ID convention | [[Syllabus Overview]], [[Lesson Status Matrix]], tüm L-notları | Spec "authorizes no code"; runtime L7-L15 compact yönde ([[Contradictions]]) |
| 26 | l0-l24-founder-build-matrix-v0.md | `docs/architecture/l0-l24-founder-build-matrix-v0.md` | spec | 5 | current (docs-only) | L0-L24 build matrisi; 8 açık karar D1-D8 | [[Level and Band Map]], [[L18-L24 Roadmap]] | — |
| 27 | L1_L15_CHIP_INVENTORY_AUDIT_2026_07.md + 5 CSV | `docs/audits/L1_L15_chip_inventory/` | audit | 6 | current (base `84a5b8e`) | 52 item / 41 used / 11 dormant; R1-R12 risk | [[Chip Coverage Matrix]], [[Registry Usage Matrix]] | 52 vs 54 vs 56 item sayısı ([[Contradictions]] C6) |
| 28 | 2026-07-08-final-loop-audit.md | `docs/audits/` | audit | 6 | current | B1-B24 bulgular; PR-A…PR-G plan | [[Technical Debt]], [[Known Gaps]] | — |
| 29 | 2026-07-09-loop-audit-v2.md | `docs/audits/` | audit | 6 | current (`main @ 4b68f4c`) | C1-C30 net-new; 15/24 B fixed | [[Technical Debt]], [[Privacy and Data Deletion]] | — |
| 30 | docs/status/* (18 dosya) | `docs/status/` | checkpoint | 6 | mixed (≤2026-06-09 çoğu) | Founder self-learning P0-P5, boundary/route/bridge kararları | [[Decision Index]], [[Data Flow]], [[Privacy and Data Deletion]] | Checkpoint'ler July "Content Factory" katmanını eksik anlatıyor (Pack 02 §12.6) |
| 31 | docs/runbooks/DEVICE_DAY.md | `docs/runbooks/` | runbook | 6 | current (2026-07-05) | Operator device-day + K2 landing sırası | [[Smoke Test Playbook]], [[Release and Build Process]] | — |
| 32 | docs/runbooks/ai-edge-hardening-pr-c.md | `docs/runbooks/` | runbook | 6 | current | AI edge sertleştirme (B4/B15/B16); deploy operator-only | [[AI Architecture]], [[Supabase]] | EAS_PREVIEW_BUILD ile AI-durum farkı (doc-hijyen) |
| 33 | EAS_PREVIEW_BUILD.md | `docs/EAS_PREVIEW_BUILD.md` | ops | 6 | stale (PR-C öncesi) | In-lesson AI EAS kurulumu (enabled gelecek) | [[Release and Build Process]], [[AI Architecture]] | Round 1 "AI closed" politikasını öncüler; ai-diag kaldırıldı |
| 34 | docs/obsidian/* (3 dosya) | `docs/obsidian/` | design | 5 | current (PROPOSED) | Bu vault'un ön-sanatı: note-tree, customization, Home draft | [[Documentation Workflow]], [[Design Inventory]] | Hiçbir dosya taşıma/kod yetkilendirmez |
| 35 | lemot-app kod tabanı (bkz. [[Code Source Index]]) | `lemot-app/` | code | — (runtime-truth) | current (`02f9f7a`) | Çalışan gerçek; 3 paralel runtime | [[Code Source Index]] ve tüm architecture notları | Kod, current-codebase canon; yeni aktif kanon geçer |
| 36 | Test suite (bkz. [[Test Source Index]]) | `lemot-app/scripts/*` | test | — (guard-truth) | current | 42-dosya engine runner + validators + copy guards | [[Test Source Index]], [[Test Coverage Matrix]] | validate:content 54-vs-56 driftte hangi durumda? UNKNOWN |
| 37 | Merged Product Canon 2026-05-11 | operator-vault (repo'da yok) | archive | 7 | superseded (partially harvested) | MC.1/2/4/5/6 kabul; MC.3/7/8/9 değişti/iptal | [[Missing Source Inputs]], [[Historical Canon Map]] | Aktif üst kanon SAYILMAZ (MASTER_PIPELINE §2) |
| 38 | Le_Mot_Locked_Canon_and_Claude_Prompts_v1 (TOP CANON) | operator-vault (repo'da yok) | canon | 3 | UNKNOWN | En yüksek pedagoji otoritesi ama cloud'dan okunamaz | [[Missing Source Inputs]] | En yetkili doküman = en az keşfedilebilir (Pack 07 §9) |
| 39 | LeMot.md / LeMot - User Journey.md | operator-vault (repo'da yok) | canon | mixed | UNKNOWN (kirli: canlı+ölü) | UX/karar geçmişi | [[Missing Source Inputs]], [[Historical User Journeys]] | 24-ders/L14 kirlenmesi banner'sız (redesign plan §1.3) |
| 40 | Tasarım Envanteri.md | operator-vault (repo'da yok) | design | 5 | UNKNOWN | Ekran sınıflandırması (VALID/REDESIGN/NEW/ARCHIVE) | [[Missing Source Inputs]], [[Design Inventory]] | — |
| 41 | Notes Archive Index.md | operator-vault (repo'da yok) | meta | 6 | UNKNOWN | Arşiv sınıflandırması + banner etiket seti | [[Missing Source Inputs]] | "legacy-code-reality" çözümü burada gömülü |
| 42 | L1-L5 Proofreading.md | operator-vault (repo'da yok) | content-qa | 5 | UNKNOWN | French içerik QA (Content QA canon tier 3) | [[Missing Source Inputs]] | — |
| 43 | Round1 Context Handoff / CAIRN_CODEX / CLAUDE_START_CONTEXT / TASK_CONTEXT_PACKS / OBSIDIAN_TO_GIT_PROMOTION_RULES | operator-vault (repo'da yok) | handoff | mixed | UNKNOWN | Oturum bağlamı + promosyon kuralları | [[Missing Source Inputs]] | v0.2 için import gerekli |
| 44 | V4 Studies standalone HTML / JSX | external (repo'da yok) | design | 5 | DEFERRED | V4-B "asymmetrical breath" tasarım kaynağı | [[External Artifact Index]], [[V4 Studies Disposition]] | Seçili ama global redesign ertelendi (Rule 9) |
| 45 | EAS Build / Supabase Dashboard | external (operator-only) | external | — | current (operator-managed) | Yapı + deploy + secrets | [[External Artifact Index]] | Cloud çalıştıramaz (Rule 11 blocker) |
| 46 | git history (shallow 50 commit) | `.git` | code | — | current (`2bfc1b6`→`02f9f7a`) | Commit/PR zaman çizelgesi | [[Commit and Milestone Timeline]], [[PR Map]] | #146 altı PR'lar sadece docs'tan (shallow clone) |

**Source rows: 46.**

## Nasıl kullanılır

1. Bir iddianın kaynağını doğrulamak için önce bu tabloda satırı bul, `Path`i aç.
2. Tazelik `stale/superseded` ise → o iddiayı aktif sanma; `Conflict-notes`u izle.
3. Kaynak repo'da yoksa (Tier 7 operator-vault satırları) → [[Missing Source Inputs]].
4. İki kaynak çelişiyorsa → [[Contradictions]] + çatışma kuralı (newer active kazanır).

## İlgili notlar
- [[08 Source of Truth Map]] — hangi kaynak hangi katmanı kontrol eder (özet harita)
- [[Repository Document Index]] · [[Code Source Index]] · [[Test Source Index]]
- [[External Artifact Index]] · [[Missing Source Inputs]]
- [[Contradictions]] · [[06 Canon and Status Legend]]

## Sağlanan kaynaklar (2026-07-14 upload — historical/source material)

Founder 15 Le Mot yerel-vault notunu (redakte) sağladı; `SOURCE_ARCHIVE/AVAILABLE_INPUTS/`
altında, aktif kanon **değil**, tarihsel/kaynak. Otorite tier ≈ 6 (tarihsel ürün notları);
2026-06-29 tarihli → repo HEAD #196'nın gerisinde. Hash'ler + ingestion statüsü:
`REPORTS/SOURCE_MANIFEST.csv`; per-dosya tablo: `REPORTS/SOURCE_INGESTION_REPORT.md`.

| Kaynak | Tier | Freshness | Ingestion | Kontrol ettiği katman |
|---|---|---|---|---|
| PR and Smoke Log | 6 | stale (2026-06-29) | fully-ingested | Round 1.1/1.2 PR/smoke tarihçesi (private artefaktlar redakte) |
| Round1 Context Handoff | 6 | stale (2026-06-13) | fully-ingested | Round 1 L0–L6 + L4/L5 anti-memorization |
| Learning Engine & Exercise Types | 5 (spec) | current-ish | fully-ingested | Egzersiz/measurement taksonomisi (spec, runtime değil) |
| Tasarım Envanteri | 6 | mixed/historical | fully-ingested | 155-ekran tasarım envanteri (SOURCE, plan değil) |
| Visual Design Canon | 5 | 2026-06-29 | fully-ingested | Aktif görsel yön (cairn metaforu) |
| Open Questions / Backlog / Tech-Privacy | 6 | 2026-06-29 | fully-ingested | Açık kararlar / deferred / privacy ilkeleri |
| Syllabus Delta Log · Tester Feedback · Agent Handoff · User Testing Protocol | 6 | 2026-06-29 | fully-ingested | Ders deltaları / tester / süreç |
| Sprint 12 Plan | 6 | superseded | partially-ingested | Sprint 12 niyeti (aktif scope değil) |
| Home - Le Mot | 6 | 2026-06-29 | partially-ingested | Vault giriş (facts overlap) |
| Test Checklist | 6 | historical | copied-not-ingested | Dev APK smoke checklist (henüz işlenmedi) |

> [!warning] Bu satırlar güncel kanonu **ezmez**; çatışmada precedence [08 Source of Truth Map](../00_START_HERE/08%20Source%20of%20Truth%20Map.md).
> V4 Studies HTML (18MB) git'ten **hariç** → [Missing Source Inputs](Missing%20Source%20Inputs.md).

<!-- gh-nav -->

## 🧭 GitHub Navigation

[⬆ README](../../README.md) · [🪨 Holy Codex](../00_START_HERE/00%20Le%20Mot%20Holy%20Codex.md) · [Current State](../00_START_HERE/03%20Current%20State.md) · [Open Loops](../00_START_HERE/05%20Open%20Loops.md)

**Bu klasördeki notlar (95_SOURCE_LEDGER):**

- [Code Source Index](./Code%20Source%20Index.md)
- [External Artifact Index](./External%20Artifact%20Index.md)
- [Missing Source Inputs](./Missing%20Source%20Inputs.md)
- [Repository Document Index](./Repository%20Document%20Index.md)
- [Source Ledger](./Source%20Ledger.md) ⟵ *bu not*
- [Test Source Index](./Test%20Source%20Index.md)
