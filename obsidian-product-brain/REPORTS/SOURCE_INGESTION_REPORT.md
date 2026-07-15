# SOURCE INGESTION REPORT

## Durum: INGESTION YAPILDI (sağlanan uploadlar için) — 2026-07-14

> [!check] Founder 16 kaynak dosya sağladı (15 `.md` + 1 `.html`). Bunların bilgisi
> Codex'e (`ACTIVE_CODEX/`) ingest edildi; redakte kopyaları
> `SOURCE_ARCHIVE/AVAILABLE_INPUTS/`'te. Orijinaller oturum-yerel tutuldu (repoya
> yazılmadı).

> [!warning] **Önemli reconciliation kuralı:** Sağlanan notlar **2026-06-29**
> tarihli (kendi "current main"leri `2df3469`, Round 1.1/1.2). Gerçek repo HEAD
> ise **`02f9f7a` (#196)** — daha YENİ. Bu yüzden bu materyal **tarihsel / karar
> zenginleştirmesidir**, güncel runtime kanonunu **ezmez**. Codex'e eklenirken
> "current state" iddiaları değiştirilmedi; ayrı, işaretli ingestion bölümleri
> eklendi.

## Çelişki çözümü (founder blocking item)

**İddia edilen çelişki:** rapor "15 not + V4 HTML erişildi/ingest edildi" derken,
`Missing Sources` hâlâ `LeMot.md` / `LeMot - User Journey.md` / `Notes Archive
Index.md` / `L1-L5 Proofreading.md`'i eksik listeliyordu.

**Kök neden — iki parça:**
1. **Stale report text.** `Missing Source Inputs.md` v0.1 build'inde (upload'lardan
   ÖNCE) yazıldı. 16 dosya gelince tasarım ajanı yalnız Tasarım Envanteri + V4
   satırlarını güncelledi; **`Le_Mot_Round1_Context_Handoff` ve `Test Checklist`
   satırları bayat kaldı** (sağlanmış olmalarına rağmen "okunamayan"da). → **Düzeltildi:**
   ikisi de NOW-PROVIDED'a taşındı; başarıyla okunup ingest edilen hiçbir dosya
   Missing Sources'ta bırakılmadı.
2. **İsim ayrımı (gerçek çelişki değil).** Gerçekten-eksik 4 dosya (LeMot / User
   Journey / Notes Archive Index / L1-L5 Proofreading) **bu upload batch'inde HİÇ
   YOKTU**; sağlanan 15 dosya bunlardan FARKLI (v0.2 vault kontrol notları: Home,
   Agent Handoff, PR log…). Yani "15 ingest edildi" ve "bu 4 unavailable" **aynı anda
   doğrudur** — çakışmıyorlar. `unavailable` statüsü doğru; içerikleri uydurulmadı.

*Unavailable ≠ incomplete ingestion:* eksik 4 dosya **sağlanmadığı** için unavailable;
sağlanan hiçbir dosya "eksik ingestion" nedeniyle listede değil.

## Per-dosya ingestion tablosu (15 sağlanan not)

Upload dizini: `/root/.claude/uploads/a4b123d7-…/` (hash-prefiksli). Arşiv:
`obsidian-product-brain/SOURCE_ARCHIVE/AVAILABLE_INPUTS/`. SHA-256 match =
arşiv dosyası `SOURCE_MANIFEST.csv`'deki hash ile örtüşüyor mu (0 mismatch doğrulandı);
redakte olanlar orijinalden **bilerek** farklıdır (redaksiyon), copy-unchanged olanlar orijinalle **birebir**.

| Filename | Upload path (hash-prefix) | Archive destination | Opened/read | SHA-256 match | Ingestion status | Codex notes updated |
|---|---|---|---|---|---|---|
| Le_Mot_Round1_Context_Handoff_2026-06-13.md | `88f4e46e-…` | `…/Le_Mot_Round1_Context_Handoff_2026-06-13.md` | yes | ✓ archive; orig=copy (identical) | fully-ingested | Current State, Sprint Timeline, Product Timeline, PR Map, Commit Timeline, L4 J'ai, L5 Un Une |
| PR_and_Smoke_Log.md | `cf13c77e-…` | `…/PR_and_Smoke_Log.md` | yes | ✓ archive; redacted (≠orig, by design) | fully-ingested | PR Map, Device Verification Matrix, Commit Timeline, Current State, Implementation Ledger, Sprint Timeline, Product Timeline |
| Tester_Feedback_Log.md | `1eb4feee-…` | `…/Tester_Feedback_Log.md` | yes | ✓ identical to orig | fully-ingested | Device Verification Matrix, Weave, Current State, PR Map |
| Agent_Handoff.md | `04746f63-…` | `…/Agent_Handoff.md` | yes | ✓ redacted (≠orig) | fully-ingested | Sprint Timeline, Product Timeline, PR Map, Commit Timeline, Current State |
| Home_-_Le_Mot.md | `918db694-…` | `…/Home_-_Le_Mot.md` | yes | ✓ redacted (≠orig) | partially-ingested | (facts overlap-ingested via PR/Agent-Handoff; not independently cited in a Codex note) |
| User_Testing_Protocol.md | `c4f7c895-…` | `…/User_Testing_Protocol.md` | yes | ✓ identical | fully-ingested | Device Verification Matrix, Current State |
| Learning_Engine_and_Exercise_Types.md | `9a3bb520-…` | `…/Learning_Engine_and_Exercise_Types.md` | yes | ✓ identical | fully-ingested | Exercise System Overview, Exercise Error Matrix, Error Tracking System, Weave, Say It Your Way, Watchlist |
| Syllabus_Delta_Log.md | `d9f70872-…` | `…/Syllabus_Delta_Log.md` | yes | ✓ identical | fully-ingested | Exercise System Overview, Watchlist, L4 J'ai, L5 Un Une, Weave |
| Tasarim_Envanteri.md | `cdc2199d-…` | `…/Tasarim_Envanteri.md` | yes | ✓ redacted (≠orig) | fully-ingested | Design Inventory, V4 Studies Disposition, Visual Language, Missing Source Inputs |
| Visual_Design_Canon.md | `0ba661ac-…` | `…/Visual_Design_Canon.md` | yes | ✓ identical | fully-ingested | Visual Language, Copy and Tone, Cairn Brand Direction, Design Inventory, V4 Studies Disposition |
| Open_Questions.md | `e76dd296-…` | `…/Open_Questions.md` | yes | ✓ identical | fully-ingested | Open Loops, Research Questions |
| Backlog_and_Deferred.md | `b1d99dd6-…` | `…/Backlog_and_Deferred.md` | yes | ✓ identical | fully-ingested | Deferred Decisions, Open Loops |
| Tech_and_Privacy_Decisions.md | `618e05ce-…` | `…/Tech_and_Privacy_Decisions.md` | yes | ✓ identical | fully-ingested | Privacy and Data Deletion, Research Questions, Open Loops |
| Sprint_12_Plan_2026-05-16.md | `0ab25b0c-…` | `…/Sprint_12_Plan_2026-05-16.md` | yes | ✓ redacted (≠orig) | partially-ingested | Future Features (large doc; intent summary only, marked superseded) |
| Test_Checklist.md | `9f496e98-…` | `…/Test_Checklist.md` | yes | ✓ redacted (≠orig) | copied-not-ingested | (none yet — historical dev-apk QA checklist, archived+read, not woven into a Codex note) |

Statü sözlüğü (founder): `copied-not-ingested` / `partially-ingested` / `fully-ingested` / `unavailable`.
Özet: **12 fully-ingested · 2 partially-ingested (Sprint_12_Plan, Home) · 1 copied-not-ingested (Test_Checklist).**

## Held back / excluded / unavailable
- **`Le_Mot_V4_Studies_standalone.html` — EXCLUDED from git (PR workspace'te DEĞİL).**
  - filename: `Le_Mot_V4_Studies_standalone.html`
  - size: **18,469,933 bytes (~18 MB)**
  - SHA-256: `4d8201a2df7ee0bafe979474d50f0653e548b0bb278e523e223efa33474b6283`
  - exclusion reason: 18MB + 26 inline `<script>` → docs PR'ına uygun değil; büyük binary-benzeri artefakt
  - ingestion status: **partially-ingested** (tasarım gerçekleri çıkarıldı; HTML içeriği repoda yok)
  - Codex notes informed: [Design Inventory](../ACTIVE_CODEX/07_DESIGN/Design%20Inventory.md), [V4 Studies Disposition](../ACTIVE_CODEX/07_DESIGN/V4%20Studies%20Disposition.md), [Visual Language](../ACTIVE_CODEX/07_DESIGN/Visual%20Language.md)
  - design facts extracted: V4-A/B/C/D → **V4-B seçildi/locked**; V4-D halftone **reddedildi**; 2026-05-11 disposition overlay; ekran sayısı 36→71→155; classification legend (VALID/REDESIGN/DEPRECATED/NEW/ARCHIVE). (V4 HTML'in kendisinin PR workspace'te bulunduğu **iddia edilmiyor**.)
- **Hâlâ unavailable (bu upload'ta yoktu, içerik uydurulmadı):** `LeMot.md`, `LeMot - User Journey.md`, `Notes Archive Index.md`, `L1-L5 Proofreading.md` (+ TOP CANON / CAIRN_CODEX_v0.1 / CLAUDE_START_CONTEXT / TASK_CONTEXT_PACKS / OBSIDIAN_TO_GIT_PROMOTION_RULES / Merged Canon). → [Missing Source Inputs](../ACTIVE_CODEX/95_SOURCE_LEDGER/Missing%20Source%20Inputs.md).

## En yüksek değerli ingestion bulguları
1. **Round 1.1 / 1.2 tarihçesi** (Codex'te eksikti): #151–#156, Round 1.1 = GO/tester-ready, operatör fiziksel spot-check (TTS OK), Tester 1 L0–L6 pozitif; Round 1.2 (#155 Weave salience, #156 L3 oui) merged-ama-smoke-edilmemiş. **Ama hepsi `#196`'nın gerisinde** → tarihsel.
2. **11-tip egzersiz taksonomisi** (Learning Engine & Exercise Types) → Exercise System Overview zenginleştirildi.
3. **155-ekran tasarım envanteri** + classification legend → Design Inventory / V4 Studies Disposition.
4. Açık sorular (pret/prête, "What was Weave?" kartı, Weave salience nudge deferred, backend Cloudflare-vs-Supabase) → Open Loops.

## Protokol uyumu
- Historical ≠ current canon: ayrıldı.
- Eski detaylı not güncel kod/repo kanonunu sessizce ezmedi.
- Kaynak referansları etkilenen notlara eklendi (dosya adı backtick'te).
- Çelişkiler `CONTRADICTION_REPORT.md`'e kaydedildi.
- Kaynak orijinalleri değiştirilmedi (oturum-yerel); repo kopyaları redakte.
- `ingestion_status` dürüst işaretlendi (`ingested` / `partially-ingested` / `pending`).

Bkz. `SOURCE_MANIFEST.csv` · `CONTRADICTION_REPORT.md` · `SECURITY_REPORT.md`.
