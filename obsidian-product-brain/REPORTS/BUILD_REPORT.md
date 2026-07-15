# BUILD REPORT — Cairn Product Brain v0.2 staging

- **Tarih:** 2026-07-14
- **Repo baseline:** HEAD = origin/main = `02f9f7ae…` — **çalışma ağacı temiz** (bu pass öncesi).
- **Bu pass'te commit/push/PR: YOK.** Tüm değişiklikler **untracked**, yalnızca `obsidian-product-brain/` altında.
- **Intended branch (henüz oluşturulmadı):** `docs/obsidian-product-brain-v0.2`.

## Yapılanlar

### §2 v0.1 import
- v0.1 ZIP çıkarıldı → `ACTIVE_CODEX/` (17 klasör, **244 not**, içerik/isimler korundu).
- `.obsidian` yapılandırması aktif kopyadan **çıkarıldı** → `BUILD_REFERENCE/optional-vault-config/` (4 json) + `DO_NOT_OVERWRITE_LOCAL_CONFIG.md` uyarısı.
- SHA-256 manifest'leri: `BUILD_REFERENCE/ORIGINAL_ZIP.sha256` + `BUILD_REFERENCE/EXTRACTED_NOTES_MANIFEST.csv` (244 not, çıkarım-anı hash'leri = sadık import kanıtı).

### §3 kaynak arşivi
- `SOURCE_ARCHIVE/AVAILABLE_INPUTS/` oluşturuldu.
- ⚠️ 8 yüklenen kaynak **bu oturumun dosya sistemine düşmedi** → kopyalanamadı; `SOURCE_MANIFEST.csv` hepsini `pending` / `not-present-in-session` işaretler. İçerik uydurulmadı.

### §4 yerel vault durumu
- `LOCAL_RECONCILIATION_PENDING.md`: yerel `~/Documents/Smart Brain/` v0.2 Second Brain; erişim yok; 28 not **içe aktarılmadı**; 10 bilinen primary home listelendi (içerik uydurulmadan).

### §5 GitHub navigasyonu
- `README.md` (relative Markdown, mobil-uyumlu) — 17 zorunlu hedefe + 17 domain MOC'una doğrudan link.
- 16 MOC notuna "🧭 GitHub Navigation" bloğu (relative linkli çocuk indeksi, 226 link).
- 117 uzun nota Markdown TOC.

### §7 L1 çalışma durumu
- Korundu: L0 = first-use, L0-carryover yok, spine L1'de başlar, **31 seçili nesne + 3–4 açık**, liste kilitli değil, `comprendre`/`répéter` watchlist. Detay: `LOCAL...`/L1 notu. Doğrulama: değişmedi (aşağı bkz.).

## §6 Kaynak ingestion (2026-07-14 — GÜNCELLENDİ, sağlanan uploadlar geldi)
Founder 16 kaynak sağladı (15 `.md` + 1 `.html`). Yapılanlar:
- Redakte kopyalar `SOURCE_ARCHIVE/AVAILABLE_INPUTS/`'e hazırlandı/kopyalandı (private EAS/APK URL / credential / build-ID / yerel path **redakte**; orijinaller oturum-yerel).
- 18MB V4 Studies HTML (26 inline `<script>`) **held back** — repo PR'ına konmadı.
- Bilgi 4 paralel ajanla ACTIVE_CODEX'e ingest edildi (Round 1.1/1.2 tarihçesi, 11-tip egzersiz taksonomisi, 155-ekran tasarım envanteri, açık sorular/privacy). **2026-06-29 kaynakları HEAD #196'nın gerisinde → tarihsel, override etmeden.**
- Çelişkiler `CONTRADICTION_REPORT.md` + `_ingest_contradictions.md`'e kaydedildi.
- Detay: `SOURCE_INGESTION_REPORT.md` · `SECURITY_REPORT.md`.

## Ölçümler (final)
- ACTIVE_CODEX: **244 not · ~145.4k kelime · 72 Mermaid · 1.717 tablo satırı** · Obsidian wikilink **4.524 → 0 çözülmeyen**.
- GitHub relative file-link (nav scope): **363 → 0 kırık** · Same-page TOC anchor: **1.563 → 0 kırık**.
- Hazırlanan (untracked) toplam: **281 dosya** (274 md + 2 csv + 4 json + 1 sha256; binary/font yok). **`git add` çalıştırılmadı → `git diff --cached` boş.**
- Secret / private-link: **0** · tracked-file edit: **0** · scope: yalnızca `obsidian-product-brain/`.

## Yapılmayan (bilinçli)
- Yerel 28 notun TAM import/reconciliation'ı: yalnız 15 alt-küme sağlandı; kalan primary home'lar + orijinal-8'in 4'ü eksik → `SOURCE_INGESTION_REPORT.md` / `LOCAL_RECONCILIATION_REPORT.md`.
- 18MB V4 HTML repoya alınmadı (held back).
- Commit/push/PR: **onaya kadar yok.**

Bkz: `GITHUB_NAVIGATION_REPORT.md` · `LINK_REPORT.md` · `SECURITY_REPORT.md` · `PROPOSED_COMMIT_SCOPE.md`.
