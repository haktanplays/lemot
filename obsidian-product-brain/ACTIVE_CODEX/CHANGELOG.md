# CHANGELOG — CAIRN Obsidian Product Brain

## v0.3 governance-skeleton pass — 2026-07-17 (Draft PR #198)

Skeleton-only coverage pass (EDIT + VALIDATE ONLY). Üç eksik yapısal ana ev kuruldu; bayat yapısal-kapsam kayıtları düzeltildi.

### Eklendi (3 iskelet — hepsi `status: skeleton`, `canon_status: provisional`)
- **`06_ARCHITECTURE/Legal Compliance and Data Governance.md`** — hukuki/veri-yönetişimi evi; 16-kalemlik Governance Decision Register (hepsi OPEN/UNKNOWN), data-processing envanter iskeleti, user rights, decision gates, Non-Claims. **Uyum İDDİA EDİLMEZ.**
- **`12_RESEARCH_AND_IDEAS/Measurement and Experimentation.md`** — ölçüm/deney yönetişimi; 9 ilke, metric layers, event dictionary iskeleti, experiment lifecycle, evidence strength, decision gates. **Sayısal hedef/şema UYDURULMADI.**
- **`10_OPERATIONS/French Linguistic QA.md`** — Fransızca dil-QA süreç evi; review surfaces, QA dimensions, Severity Model (BLOCKER/MAJOR/POLISH/PREFERENCE), native-speaker gate (OPEN), checklist, handoff. **Native-speaker incelemesi gerçekleşti İDDİA EDİLMEZ.**

### Düzeltildi (bayat yapısal-kapsam kayıtları)
- **Coverage Report** — güncel not sayısı (249) + yapısal kapsam ≠ implementasyon derinliği ayrımı; üç ana ev kaydedildi.
- **Missing Documentation** — MD12 düzeltildi (primary not ağacı yapısal olarak mevcut; MD1–MD11 derinlik boşlukları geçerli); MD13–MD15 eklendi (legal/measurement/French derinlik boşlukları OPEN).
- **Unknowns U15** — Product Brain PR #198'de online-okunabilir; yalnız-main audit'ler kısmî; yerel 28-not reconciliation PENDING; unknown yalnız uzlaştırılmamış yerel-only materyale uygulanır.

### Discoverability (yalnız pointer)
- Holy Codex (3 link), Product Map (3 satır), Privacy and Data Deletion, Experiments, Content Production Workflow → yeni ana ev'lere işaretçiler.

### Uygulanmadı (bilinçle)
- Hiçbir **runtime**, **hukuki**, **analytics** veya **dilsel-inceleme** kararı uygulanmadı. Yalnız yapısal iskelet + kapsam düzeltmesi. app/runtime/source-archive/main-doc dokunulmadı.

## v0.2 içerik-gap pass — 2026-07-16 (Draft PR #198)

Bounded content-gap pass (EDIT + VALIDATE ONLY).

### Eklendi
- **Cairn-first Home identity:** Holy Codex başlığı → "Cairn Holy Codex" (dosya adı değişmedi; "Le Mot Holy Codex" legacy alias).
- **`07_DESIGN/Naming and Brand Registry.md`** (yeni) — Cairn isim kararı, naming criteria, adjacent names (founder-reported, legal-not-done), candidate graveyard (Encore/Voilà/Lexis/Echo/Le Lexique — gerekçeler UNKNOWN, uydurulmadı), why-Cairn-won, future naming reuse metodu.
- **`08_IMPLEMENTATION/Roadmap Crosswalk.md`** (yeni) — Five Stones ↔ Faz 0–7 eşleme + operating rule + decision-completeness pointer check (K4/K6/exercise-freeze/retrofit/factory-first/tester-export).
- **`01_PRODUCT/Product Risks.md`** — Live Premortem (loudest failure mode = docs, cihaz validasyonunun yerine geçer; tripwire + exit condition); R7'ye Crosswalk linki.
- **`00_START_HERE/04 Current Priorities.md`** — Current Gate Board (Five Stones) + Five Hottest Open Gates + Recent Locked Decisions; öncelik sırası düzeltildi (device-day = karar-taşıyan kapı; Product Brain işi bounded).
- Destekleyici link editleri: Cairn Brand Direction, Commit and Milestone Timeline, Source of Truth Map.

## v0.1 — 2026-07-14

İlk tam sürüm. "Holy Codex" iskeletinin tamamı + kanıta dayalı içerik dolumu.

### Eklendi
- 17 üst-düzey klasör + START_HERE giriş katmanı.
- Üç boyutlu statü modeli (canon / implementation / verification) ve statü sözlüğü.
- Ürün, öğrenme sistemi, egzersizler, syllabus (L0–L17+), mimari, tasarım, implementation, kararlar, operasyon, ajan bağlamı, araştırma, tarih, kaynak defteri, boşluklar.
- Kanıta dayalı matrisler (lesson status, chip coverage, exercise, spec-to-runtime, feature stage, route, test coverage, device verification).
- ADR tarzı karar kayıtları.
- Kaynak defteri (repo doküman + kod + test envanteri).
- Mermaid diyagramları, glossary, rol-bazlı onboarding.

### Bilinen sınırlar (v0.2 için)
- (v0.1 anındaki durum) Bazı operator-vault kaynakları bulut oturumunda erişilemedi — `95_SOURCE_LEDGER/Missing Source Inputs.md` ve `98_GAPS/`.
  - **v0.2 güncelleme (2026-07-16):** Founder 15 kaynağı (Tasarım Envanteri dâhil) sağladı ve ingest edildi. **Hâlâ eksik:** `LeMot.md`, `LeMot - User Journey.md`, `Notes Archive Index.md`, `L1-L5 Proofreading.md`, prompt logları. Bkz. `REPORTS/SOURCE_INGESTION_REPORT.md`.
- L1 chip listesi bilinçli olarak **kilitlenmedi** (açık tasarım kararı).
- PR #197 durumu, oturum başındaki brief'e göre kaydedildi; canlı GitHub durumu değişebilir.
