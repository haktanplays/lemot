# STATUS RECONCILIATION REPORT

Draft PR #198 üzerinde yapılan düzeltme pass'i (2026-07-15). EDIT + VALIDATE ONLY;
commit/push/PR-body/merge yok. Bayat iddialar güncel doğrulanmış gerçeklerle
uzlaştırıldı; tarihsel kayıtlar ve source-archive kopyaları **değiştirilmedi**.

| File | Old claim | New claim | Why changed | Evidence |
|---|---|---|---|---|
| `README.md` → "Kaynak arşivi ve durum" | "8 yüklenen kaynak oturuma düşmedi → kopyalanamadı/ingest edilmedi" | 15 redakte kaynak sağlandı (12 fully / 2 partially / 1 copied); V4 HTML git'ten hariç; 4 dosya hâlâ unavailable; 28-not reconciliation pending | Kaynaklar sonradan sağlandı; eski metin bayat | `REPORTS/SOURCE_INGESTION_REPORT.md`, `SOURCE_MANIFEST.csv` (0 sha mismatch) |
| `03 Current State.md` → "Git zemini" + tarih | Tek "Git zemini"; `claude/…` build branch; tarih 2026-07-14 | İki bağımsız gerçek: (A) ürün baseline `origin/main` `02f9f7a`; (B) Product Brain layer branch `docs/obsidian-product-brain-v0.2`, head `4a6846e`, Draft PR #198; tarih 2026-07-15; `claude/…` `[!historical]` | Product Brain branch head ürün baseline'ı değil; ürün runtime'ı değişmedi | `git rev-parse HEAD` (4a6846e), PR #198 (draft/open), `origin/main`=02f9f7a |
| `L1 Survival Kit.md` → frontmatter | `implementation_status: implemented`, `verification_status: device-verified` (not-level) | `implementation_status: partial`, `verification_status: source-inspected` | Not-level device-verified, redesign katmanını yanlış temsil ediyordu; tarihsel runtime verification gövdede baseline-özel korundu | L1 note gövdesi; STATUS.md #136; Round1 Handoff `8cfdce75` |
| `L1 Survival Kit.md` → status split | Runtime ile redesign tek statüde karışıktı | 3-satırlı katman tablosu (mevcut runtime baseline / 31+3–4 redesign / doküman notu) + açık ifadeler: redesign not-implemented, unverified, not-final; tarihsel pass'ten yeni device verification çıkarılamaz | Katmanların karışması yanlış "device-verified redesign" çıkarımına yol açardı | L1_L15 audit; STATUS.md |
| `L1 Survival Kit.md` → Learner Job | Aşırı-taahhüt: "yerini sorabilir (`où + est`)" + tek paragraf can-do | İkiye ayrıldı: **Stable communicative purpose** (open/request/breakdown/close) + **Working redesign candidates** (je voudrais+[nom/action], sınırlı pouvez-vous+[infinitif], ne___pas, `où + être + [lieu]`, je suis) + açık "final değil / her aday aktif olmayacak / ghost-seed-support olabilir / ownership vaat etmez"; `où|est|la gare` örnekleri + est/sont surface-realization açıklaması | `où + est` kanonik pattern olarak kullanılmamalı; yüzey formlar ayrı chip değil | Chip Taxonomy; L1_L15 audit "not a chip" surfaces |
| `REPORTS/BUILD_REPORT.md` (§3) | "8 yüklenen kaynak oturuma düşmedi" | Güncel: 15 sağlandı/ingest; §6 + SOURCE_INGESTION_REPORT supersede eder; tarihsel not korundu | Stale active claim | `SOURCE_INGESTION_REPORT.md` |
| `ACTIVE_CODEX/CHANGELOG.md` | v0.2 sınırlarında Tasarım Envanteri "erişilemedi" | v0.2 güncelleme: 15 kaynak (Tasarım Envanteri dâhil) sağlandı; hâlâ eksik: LeMot / User Journey / Notes Archive Index / L1-L5 Proofreading / prompt logs | Kısmen bayat | `SOURCE_INGESTION_REPORT.md` |

## Stale-claim scan sonucu (§4)

Aranan 9 desen için sınıflandırma:

| Desen | Bulgu | Sınıf | Aksiyon |
|---|---|---|---|
| `claude/lemot-holy-codex-obsidian-8o24qz` | 2 hit (Current State, PROPOSED_COMMIT_SCOPE) | **current** (doğru `[!historical]` / "final değil") | edit yok |
| "oturuma düşmedi / erişilemedi" | BUILD_REPORT:17, CHANGELOG:17 | **stale active claim** | düzeltildi |
| "ingest edilmedi" | 0 hit | — | — |
| "8 kaynak unavailable" | BUILD_REPORT:17 (aynı) | **stale active claim** | düzeltildi |
| L1 redesign device-verified | yalnız L1:62 "çıkarılamaz" (negasyon) | **current** (doğru) | edit yok |
| 31-object final/locked | tüm hitler "açık/kilitli değil/uydurma" der; §31-47/events.ts:31-47 = false positive | **current** | edit yok |
| L0 carryover | yalnız L1 "REDDEDİLDİ" | **current** | edit yok |
| `où est` tek lexical chip | L1:144 "kanonlaştırılmamalı" (doğru); Vocabulary Progression L8 `où est…?` = örnek surface question, chip iddiası değil | **current / source-legit example** | edit yok |
| `où + est` kanonik pattern | L1 artık `où + être + [lieu]` kullanıyor; eski `où + est` Learner Job'da düzeltildi | **düzeltildi** | Learner Job editi |

Source-archive kopyaları (`SOURCE_ARCHIVE/AVAILABLE_INPUTS/*`) taranan desenler
içerse bile **değiştirilmedi** (tarihsel/kaynak; düzenleme yasak).
