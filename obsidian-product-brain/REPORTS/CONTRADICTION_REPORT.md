# CONTRADICTION REPORT

Bu pass **yeni kaynak ingest etmediği** için yeni çelişki türetilmedi. Aşağıdakiler
v0.1 Codex'inde zaten kayıtlı olan çelişkilerdir (canonical ev:
[98_GAPS/Contradictions](../ACTIVE_CODEX/98_GAPS/Contradictions.md) +
[_BUILD_REPORTS/Unresolved Contradiction Report](../ACTIVE_CODEX/00_START_HERE/_BUILD_REPORTS/Unresolved%20Contradiction%20Report.md)).
Bu rapor onların staging-katmanı özetidir + kaynak ingestion sonrası genişleme yeri.

| # | Çelişki | Kontrol eden kaynak | Durum |
|---|---|---|---|
| C1 | CLAUDE.md v7 banner/gövde ↔ STATUS gerçeği | STATUS.md | RESOLVED |
| C2 | Dev APK "L1–L5" + `DEV_APK_LESSON_LIMIT=5` ↔ runtime L0–L6 | kod | PARTIAL |
| C3 | Paywall: Campfire ~L24 ↔ §66.3 re-decide ↔ legacy L14 | — | **OPEN** |
| C4 | STATUS "7 lessons" ↔ 16 dosya (L0–L15) | working tree | RESOLVED |
| C5 | İki roadmap (CAIRN_ROADMAP ↔ ROADMAP Five Stones) | — | **OPEN** |
| C6 | Registry 54 ↔ 56 ↔ 52 | kod + manifest | **OPEN/borç** |
| C7 | AI routing tablosu ↔ gerçek provider zinciri | kod | RESOLVED |
| C8 | Chip taxonomy 12 tip ↔ runtime `status` enum | spec vs kod | PARTIAL |
| C9 | İki disjoint store (lm7 ↔ lm_le_events) | kod | OPEN |
| C10 | L7 full spec ↔ compact accepted | compact | RESOLVED |

## Kaynak-ingestion sonrası beklenen yeni çelişki alanları
8 kaynak ingest edildiğinde şu eksende yeni çelişkiler beklenir (henüz **yok**,
uydurulmadı):
- `LeMot - User Journey.md` (v6 pending) ↔ mevcut User Journey / lesson flow.
- `Tasarım Envanteri.md` ↔ Design Inventory (hangi ekranlar VALID/REDESIGN/NEW/ARCHIVE).
- `L1-L5 Proofreading.md` ↔ L1–L5 chip/content notları.
- `Notes Archive Index.md` ↔ Superseded Specs (hangi not gerçekten arşiv).
- `V4 Studies HTML` ↔ V4 Studies Disposition (deferred).

> [!warning] Kural: eski ama detaylı kaynak, güncel kod/repo kanonunu **sessizce
> ezmez**. Her çelişkide precedence [08 Source of Truth Map](../ACTIVE_CODEX/00_START_HERE/08%20Source%20of%20Truth%20Map.md)'e göre çözülür;
> kaybeden kaynak silinmez, `superseded/historical` işaretlenir.

## Kaynak ingestion reconciliation'ları (2026-07-14 upload)

Sağlanan 15 upload'ın (2026-06-29 vault, HEAD `2df3469`) ACTIVE_CODEX'e (HEAD
`02f9f7a` / #196) içe aktarımından çıkan uzlaştırmalar. Tam append-only kayıt:
[_ingest_contradictions.md](_ingest_contradictions.md). Öne çıkanlar:

| # | Reconciliation | Çözüm |
|---|---|---|
| IN-1 | Kaynaklar `2df3469` (#156)'yı "current main" der; gerçek HEAD `02f9f7a` (#196) daha yeni | Materyal **tarihsel**; "Current State" HEAD fact'leri değişmedi, #196-gerisinde işaretli Round 1.1/1.2 tarihçesi eklendi |
| IN-2 | Fiziksel spot-check `8cfdce75`'te DONE ↔ #196 device durumu | Spot-check yalnız `8cfdce75` için device-verified; #196 ayrı/hâlâ açık → [Device Verification Matrix](../ACTIVE_CODEX/05_MATRICES/Device%20Verification%20Matrix.md) |
| IN-3 | Round 1.2 (#155/#156) "merged" ↔ "verified" | Code-validated only (328/328), APK/smoke YOK → her yerde etiketlendi |
| IN-4 | `faim` aktif chip (#153) ↔ registry item yok (R3) | Bir arada: "derste aktif" ≠ "mastery telemetrisi kayıtlı" → flag, değişiklik yok |
| IN-5 | 11 ürün-egzersiz tipi ↔ 7 frozen v1 ekran tipi | "Egzersiz tipi ≠ renderer" ile uzlaştı; tip 9–11 FUTURE/validator-gated |
| IN-6 | Weave etiketi: Visual Canon "learner-facing'e doğru" ↔ #155 "Weave badge restore" | Yay olarak uzlaşır; "#155 restore" iki okunan kaynakta yok → [Needs Verification]; aktif etiket = **Weave** |
| IN-7 | Backend "Cloudflare vs Supabase" OPEN ↔ vault Supabase/RLS PROPOSED | Q-IN8 açık; vault tasarımı "PROPOSED, kilitli değil" ile uyumlu |
| IN-8 | Tarih ↔ PR-no sırası: #156 (2026-06-29) > #146 (codex'te 2026-07-02) | Gevşek tarihleme; flag'lendi, PR-no ile #146→#196 window'una yerleşti |

Bayat referanslar (SHA `8cfdce75`/`2df3469`/`658a321`…, "MMKV", Sprint 12 WS/D numaralandırması) "bayat/tarihsel" etiketiyle taşındı, aktif kanon olarak alınmadı.
