# LOCAL RECONCILIATION REPORT

Bu, [../LOCAL_RECONCILIATION_PENDING.md](../LOCAL_RECONCILIATION_PENDING.md)'in
rapor-katmanı karşılığıdır.

## Durum
- Yerel vault: **`~/Documents/Smart Brain/`** — mevcut bir **v0.2 Second Brain**.
- **Bu oturumda yerel makineye doğrudan erişim YOK.**
- **2026-07-14 güncelleme:** Founder yerel notların bir **alt kümesini** (15 dosya)
  upload olarak sağladı; redakte edilip Codex'e ingest edildi (12 fully / 2 partially /
  1 copied — bkz. `SOURCE_INGESTION_REPORT.md`). Bu, yerel vault'un bir *parçasının*
  görünür olması demektir.
- **Ancak tam 28-not Smart Brain reconciliation'ı HÂLÂ PENDING.** Bu online katman
  "28 not import/uzlaştırıldı" **iddia etmiyor.** Sağlanan 15 dosya = alt küme;
  dosya-düzeyi karşılaştırma (hangi taraf hangi konuda canonical) yapılmadı.
- Online Product Brain = **geçici çalışma yüzeyi**; yerel sistemin yerini
  aldığı beyanı **değildir.**

**Sağlanan alt küme (15):** Home - Le Mot · Agent Handoff · PR and Smoke Log ·
Backlog and Deferred · Open Questions · Syllabus Delta Log · Learning Engine &
Exercise Types · Tester Feedback Log · User Testing Protocol · Visual Design Canon ·
Tech & Privacy Decisions · Tasarım Envanteri · Round1 Handoff · Sprint 12 Plan · Test Checklist.

**Hâlâ eksik primary home / kaynak:** Cairn Codex · Notes Archive Index · Promotion
Rules · Agent Workflow Playbook · Lesson Quality Rubric · Content Authoring Rules ·
AI Feedback Guardrails · Brand & Naming Canon · LeMot.md · LeMot - User Journey ·
Canon Merge Report 2026-05-16.

## Bilinen yerel primary home'lar (audit — içerik uydurulmadı)
Cairn Codex · Home - Le Mot · Agent Handoff · PR and Smoke Log · Backlog and
Deferred · Open Questions · Promotion Rules · Agent Workflow Playbook ·
Learning Engine & Exercise Types · Notes Archive Index.

Online paralel karşılıklar (birebir değil) [../LOCAL_RECONCILIATION_PENDING.md](../LOCAL_RECONCILIATION_PENDING.md)'de tablolandı.

## Reconciliation planı (erişim geri geldiğinde)
1. 28 yerel notu online ACTIVE_CODEX ile dosya düzeyinde karşılaştır.
2. Çelişkilerde precedence: newer active > current codebase > older active > archive.
3. Yerel primary home'lar canonical; online katman geçici. Üzerine yazma yok; `superseded` etiketle.
4. Bu raporu gerçek reconciliation sonuçlarıyla güncelle.

## Bu pass'in dürüst sınırı
- Yerel audit yalnızca **yapısal bağlam** olarak kullanıldı.
- "28 yerel not import edildi/uzlaştırıldı" **iddia edilmiyor.**
- Yüklenen `Notes Archive Index.md` kaynağı (SOURCE_ARCHIVE) yerel Notes Archive
  Index notuyla **aynı değildir**; erişilebilir olduğunda ayrıca ingest edilecek.
