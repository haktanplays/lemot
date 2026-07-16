# Cairn Product Brain — Online Working Layer (v0.2 staging)

> [!warning] **DRAFT / GEÇİCİ.** Bu klasör, Le Mot / Cairn'in özel bilgi tabanının
> (Product Brain) **geçici online çalışma katmanıdır** — GitHub web + mobilde
> okunabilir olması için hazırlanmıştır. **Kalıcı** hafıza founder'ın yerel
> `~/Documents/Smart Brain/` vault'udur. Bu online katman onun yerini almaz;
> yerel uzlaştırma bekliyor → [Local Reconciliation Pending](LOCAL_RECONCILIATION_PENDING.md).

Bu, GitHub'da (web/mobil) gezilebilen bir navigasyon kapısıdır. Notlar
`ACTIVE_CODEX/` altında Obsidian vault yapısında durur; Obsidian wikilink'leri
korunur ama **birincil navigasyon aşağıdaki relative Markdown linkleridir**
(GitHub wikilink render etmez).

## İçindekiler
- [Hızlı giriş (en çok okunan 17 not)](#hızlı-giriş)
- [Alan haritası (17 domain)](#alan-haritası)
- [Bu katman nasıl kullanılır](#bu-katman-nasıl-kullanılır)
- [Raporlar](#raporlar)
- [Kaynak arşivi ve durum](#kaynak-arşivi-ve-durum)

## Hızlı giriş

Rolünden bağımsız önce bunları oku:

| # | Not | Ne |
|---|---|---|
| 1 | [🪨 Holy Codex](ACTIVE_CODEX/00_START_HERE/00%20Le%20Mot%20Holy%20Codex.md) | Tek giriş kapısı |
| 2 | [Current State](ACTIVE_CODEX/00_START_HERE/03%20Current%20State.md) | Bugün gerçekte ne çalışıyor |
| 3 | [Current Priorities](ACTIVE_CODEX/00_START_HERE/04%20Current%20Priorities.md) | Sıradaki iş |
| 4 | [Open Loops](ACTIVE_CODEX/00_START_HERE/05%20Open%20Loops.md) | Açık döngüler / blocker'lar |
| 5 | [Product Map](ACTIVE_CODEX/00_START_HERE/02%20Product%20Map.md) | Büyük resim |
| 6 | [Role-Based Onboarding](ACTIVE_CODEX/00_START_HERE/09%20Role-Based%20Onboarding%20Paths.md) | Rolüne göre okuma yolu |

Sistem çekirdeği:

| # | Not |
|---|---|
| 7 | [Learning System Overview](ACTIVE_CODEX/02_LEARNING_SYSTEM/Learning%20System%20Overview.md) |
| 8 | [Chip Taxonomy](ACTIVE_CODEX/02_LEARNING_SYSTEM/Chip%20Taxonomy.md) |
| 9 | [Weave System](ACTIVE_CODEX/02_LEARNING_SYSTEM/Weave%20System.md) |
| 10 | [Exercise System Overview](ACTIVE_CODEX/03_EXERCISES/Exercise%20System%20Overview.md) |
| 11 | [Syllabus Overview](ACTIVE_CODEX/04_SYLLABUS/Syllabus%20Overview.md) |
| 12 | [L1 Survival Kit](ACTIVE_CODEX/04_SYLLABUS/L1%20Survival%20Kit.md) |
| 13 | [Architecture Overview (System Architecture)](ACTIVE_CODEX/06_ARCHITECTURE/System%20Architecture.md) |
| 14 | [Implementation Ledger](ACTIVE_CODEX/08_IMPLEMENTATION/Implementation%20Ledger.md) |
| 15 | [Decision Index](ACTIVE_CODEX/09_DECISIONS/Decision%20Index.md) |
| 16 | [Source Ledger](ACTIVE_CODEX/95_SOURCE_LEDGER/Source%20Ledger.md) |
| 17 | [Local Reconciliation Pending](LOCAL_RECONCILIATION_PENDING.md) |

## Alan haritası

Her domain'in **MOC (index) notuna** doğrudan link. Her MOC notu kendi
çocuklarına relative Markdown linki içerir → her major domain **≤2 tıkla**, her
substantive not **≤3 tıkla** erişilebilir.

| Domain | Giriş notu |
|---|---|
| 00 Start Here | [Holy Codex](ACTIVE_CODEX/00_START_HERE/00%20Le%20Mot%20Holy%20Codex.md) |
| 01 Product | [Product Vision](ACTIVE_CODEX/01_PRODUCT/Product%20Vision.md) |
| 02 Learning System | [Learning System Overview](ACTIVE_CODEX/02_LEARNING_SYSTEM/Learning%20System%20Overview.md) |
| 03 Exercises | [Exercise System Overview](ACTIVE_CODEX/03_EXERCISES/Exercise%20System%20Overview.md) |
| 04 Syllabus | [Syllabus Overview](ACTIVE_CODEX/04_SYLLABUS/Syllabus%20Overview.md) |
| 05 Matrices | [Matrix System Overview](ACTIVE_CODEX/05_MATRICES/Matrix%20System%20Overview.md) |
| 06 Architecture | [System Architecture](ACTIVE_CODEX/06_ARCHITECTURE/System%20Architecture.md) |
| 07 Design | [Design System Overview](ACTIVE_CODEX/07_DESIGN/Design%20System%20Overview.md) |
| 08 Implementation | [Implementation Overview](ACTIVE_CODEX/08_IMPLEMENTATION/Implementation%20Overview.md) |
| 09 Decisions | [Decision Index](ACTIVE_CODEX/09_DECISIONS/Decision%20Index.md) |
| 10 Operations | [Development Workflow](ACTIVE_CODEX/10_OPERATIONS/Development%20Workflow.md) |
| 11 Agent Context | [Agent Start Here](ACTIVE_CODEX/11_AGENT_CONTEXT/Agent%20Start%20Here.md) |
| 12 Research & Ideas | [Idea Index](ACTIVE_CODEX/12_RESEARCH_AND_IDEAS/Idea%20Index.md) |
| 90 History | [History Index](ACTIVE_CODEX/90_HISTORY/History%20Index.md) |
| 95 Source Ledger | [Source Ledger](ACTIVE_CODEX/95_SOURCE_LEDGER/Source%20Ledger.md) |
| 98 Gaps | [Contradictions](ACTIVE_CODEX/98_GAPS/Contradictions.md) |
| 99 Templates | [System Spec Template](ACTIVE_CODEX/99_TEMPLATES/System%20Spec%20Template.md) |

## Bu katman nasıl kullanılır

- **Statü modeli:** her not `canon_status` / `implementation_status` /
  `verification_status` taşır — "kabul edildi ≠ kodlandı ≠ cihazda doğrulandı".
  Sözlük: [Canon and Status Legend](ACTIVE_CODEX/00_START_HERE/06%20Canon%20and%20Status%20Legend.md).
- **Kaynak otoritesi:** [Source of Truth Map](ACTIVE_CODEX/00_START_HERE/08%20Source%20of%20Truth%20Map.md).
- **Obsidian'da açmak için:** `ACTIVE_CODEX/` klasörünü vault olarak açın. `.obsidian`
  yapılandırması bilinçli olarak [BUILD_REFERENCE/optional-vault-config](BUILD_REFERENCE/optional-vault-config/) altına
  taşındı — yerel Smart Brain config'inin **üzerine kopyalamayın**.

## Raporlar

Bu staging pass'inin tüm raporları → [REPORTS/](REPORTS/):
[Build](REPORTS/BUILD_REPORT.md) ·
[GitHub Navigation](REPORTS/GITHUB_NAVIGATION_REPORT.md) ·
[Source Ingestion](REPORTS/SOURCE_INGESTION_REPORT.md) ·
[Source Manifest (CSV)](REPORTS/SOURCE_MANIFEST.csv) ·
[Link](REPORTS/LINK_REPORT.md) ·
[Contradiction](REPORTS/CONTRADICTION_REPORT.md) ·
[Local Reconciliation](REPORTS/LOCAL_RECONCILIATION_REPORT.md) ·
[Security](REPORTS/SECURITY_REPORT.md) ·
[Proposed Commit Scope](REPORTS/PROPOSED_COMMIT_SCOPE.md) ·
[Proposed Draft PR Body](REPORTS/PROPOSED_DRAFT_PR_BODY.md)

## Kaynak arşivi ve durum

> [!check] **Güncel durum (2026-07-15).** Founder Le Mot yerel-vault notlarının bir
> alt kümesini sağladı; **15 redakte Markdown kaynak notu** artık
> [SOURCE_ARCHIVE/AVAILABLE_INPUTS/](SOURCE_ARCHIVE/AVAILABLE_INPUTS/README.md) altında
> (historical/source material, aktif kanon değil).

**Ingestion sonucu:** **12 fully-ingested · 2 partially-ingested · 1 copied-not-ingested.**
Per-dosya tablo (README'de tekrarlanmaz): [Source Ingestion Report](REPORTS/SOURCE_INGESTION_REPORT.md) ·
[Source Manifest (CSV)](REPORTS/SOURCE_MANIFEST.csv).

- **18MB V4 Studies standalone HTML → git'ten HARİÇ.** Tasarım kanıtı için kısmen
  incelendi/ingest edildi (V4-B seçimi, halftone reddi, disposition), ama **HTML'in
  kendisi PR workspace'te YOK.**
- **Bu batch'te hâlâ unavailable** (içerik uydurulmadı): `LeMot.md` ·
  `LeMot - User Journey.md` · `Notes Archive Index.md` · `L1-L5 Proofreading.md`.
  → [Missing Source Inputs](ACTIVE_CODEX/95_SOURCE_LEDGER/Missing%20Source%20Inputs.md).
- **Tam denetlenmiş yerel 28-notluk Smart Brain reconciliation'ı hâlâ PENDING** →
  [Local Reconciliation Pending](LOCAL_RECONCILIATION_PENDING.md).

> [!warning] Bu online Product Brain **geçici bir çalışma katmanıdır** — yerel
> vault'un yerini almaz. Kalıcı hafıza founder'ın yerel Smart Brain'idir.
