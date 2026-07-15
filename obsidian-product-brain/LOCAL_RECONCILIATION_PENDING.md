# LOCAL RECONCILIATION PENDING

> [!warning] Bu online Product Brain **geçici bir çalışma katmanıdır** — yerel
> Second Brain'in yerini aldığı beyanı **DEĞİLDİR.** Yerel erişim geri geldiğinde
> dosya düzeyinde uzlaştırma (reconciliation) yapılmalıdır.

## Bilinen yerel vault

- Gerçek yerel vault: **`~/Documents/Smart Brain/`**
- İçindeki Le Mot klasörü, mevcut bir **v0.2 Second Brain** olarak audit edildi.
- **Bu bulut oturumunda yerel makineye / `~/Documents/Smart Brain/`'e erişim YOK.**
- Yerel **28 not** bu oturumda **içe aktarılmadı** ve uzlaştırılmadı.
- Dosya düzeyinde reconciliation, founder erişimi geri kazandıktan **sonra**
  yapılmalıdır.

> Bu not, yerel 28 notun içe aktarıldığını **iddia etmez.** Yerel audit yalnızca
> yapısal bağlam olarak kullanılır.

## 2026-07-14 güncelleme — yerel notların bir KISMI upload olarak sağlandı

> [!warning] Founder, yerel Smart Brain v0.2 notlarının bir **alt kümesini**
> upload olarak sağladı (15 dosya). Bunların bilgisi Codex'e **ingest edildi**
> (bkz. `REPORTS/SOURCE_INGESTION_REPORT.md`) ve redakte kopyaları
> `SOURCE_ARCHIVE/AVAILABLE_INPUTS/`'te. **Bu, tam 28-notluk yerel vault'un
> import/uzlaştırıldığı anlamına GELMEZ** — hâlâ eksik primary home'lar var
> (aşağıda). Ayrıca bu notlar 2026-06-29 tarihli olup repo HEAD `#196`'nın
> gerisindedir → tarihsel/karar zenginleştirmesi olarak ele alındı, güncel repo
> kanonunu ezmez.

**Sağlanan (ingested):** Home - Le Mot · Agent Handoff · PR and Smoke Log ·
Backlog and Deferred · Open Questions · Syllabus Delta Log · Learning Engine &
Exercise Types · Tester Feedback Log · User Testing Protocol · Visual Design
Canon · Tech & Privacy Decisions · Tasarım Envanteri · Test Checklist · Sprint
12 Plan · Round1 Context Handoff.

**Hâlâ eksik (primary home veya kaynak):** Cairn Codex · Notes Archive Index ·
Promotion Rules · Agent Workflow Playbook · Lesson Quality Rubric · Content
Authoring Rules · AI Feedback Guardrails · Brand & Naming Canon · LeMot.md ·
LeMot - User Journey · Canon Merge Report 2026-05-16. → [Missing Source Inputs](ACTIVE_CODEX/95_SOURCE_LEDGER/Missing%20Source%20Inputs.md)

## Bilinen yerel primary home'lar (audit'ten)

Aşağıdaki notların yerel Smart Brain'de birer **ana ev (primary home)** olduğu
audit edildi. Sağlanan uploadlar işaretlendi. **İçerikleri uydurulmadı**:

| Yerel not | Online karşılığı (varsa) |
|---|---|
| Cairn Codex | ~ [ACTIVE_CODEX/00_START_HERE/00 Le Mot Holy Codex](ACTIVE_CODEX/00_START_HERE/00%20Le%20Mot%20Holy%20Codex.md) (paralel, birebir değil) |
| Home - Le Mot | ~ [ACTIVE_CODEX/00_START_HERE/02 Product Map](ACTIVE_CODEX/00_START_HERE/02%20Product%20Map.md) |
| Agent Handoff | ~ [ACTIVE_CODEX/11_AGENT_CONTEXT/Agent Start Here](ACTIVE_CODEX/11_AGENT_CONTEXT/Agent%20Start%20Here.md) |
| PR and Smoke Log | ~ [ACTIVE_CODEX/08_IMPLEMENTATION/PR Map](ACTIVE_CODEX/08_IMPLEMENTATION/PR%20Map.md) |
| Backlog and Deferred | ~ [ACTIVE_CODEX/09_DECISIONS/Deferred Decisions](ACTIVE_CODEX/09_DECISIONS/Deferred%20Decisions.md) |
| Open Questions | ~ [ACTIVE_CODEX/00_START_HERE/05 Open Loops](ACTIVE_CODEX/00_START_HERE/05%20Open%20Loops.md) |
| Promotion Rules | ~ [ACTIVE_CODEX/10_OPERATIONS/Obsidian to Git Promotion Rules](ACTIVE_CODEX/10_OPERATIONS/Obsidian%20to%20Git%20Promotion%20Rules.md) |
| Agent Workflow Playbook | ~ [ACTIVE_CODEX/10_OPERATIONS/Claude Code Workflow](ACTIVE_CODEX/10_OPERATIONS/Claude%20Code%20Workflow.md) |
| Learning Engine & Exercise Types | ~ [ACTIVE_CODEX/02_LEARNING_SYSTEM/Learning System Overview](ACTIVE_CODEX/02_LEARNING_SYSTEM/Learning%20System%20Overview.md) + [Exercise System Overview](ACTIVE_CODEX/03_EXERCISES/Exercise%20System%20Overview.md) |
| Notes Archive Index | ~ [ACTIVE_CODEX/90_HISTORY/History Index](ACTIVE_CODEX/90_HISTORY/History%20Index.md) (yerel dosya ayrıca kaynak olarak yüklendi) |

> "~" = **paralel/benzer rol**, birebir aynı değil. Reconciliation, hangi tarafın
> hangi konuda canonical olduğunu dosya düzeyinde belirlemeli.

## Reconciliation kuralları (erişim geri geldiğinde)

1. Yerel 28 notu online ACTIVE_CODEX ile **karşılaştır** — üzerine yazma.
2. Çelişki çıkarsa: newer active > current codebase > older active > archive
   ([08 Source of Truth Map](ACTIVE_CODEX/00_START_HERE/08%20Source%20of%20Truth%20Map.md)); kaybeden kaynağı sil**me**, `superseded` işaretle.
3. Yerel primary home'lar canonical kalır; online katman **geçici çalışma yüzeyi.**
4. Sonuçları [REPORTS/LOCAL_RECONCILIATION_REPORT.md](REPORTS/LOCAL_RECONCILIATION_REPORT.md)'e yaz.

Bkz: [REPORTS/LOCAL_RECONCILIATION_REPORT.md](REPORTS/LOCAL_RECONCILIATION_REPORT.md).
