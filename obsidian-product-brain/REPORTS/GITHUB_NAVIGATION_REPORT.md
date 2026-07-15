# GITHUB NAVIGATION REPORT

Amaç: notlar GitHub web + mobilde **relative Markdown linkleriyle** gezilebilsin;
navigasyon yalnızca Obsidian wikilink'lerine bağlı **olmasın**.

## Yapı
- **Giriş:** `obsidian-product-brain/README.md` — 17 zorunlu hedef + 17 domain MOC linki.
- **MOC blokları:** 16 klasör MOC notuna `🧭 GitHub Navigation` bölümü eklendi; her biri README'ye + Holy Codex'e + o klasörün tüm notlarına relative link verir (226 çocuk-link).
- **TOC:** 117 uzun nota `## İçindekiler` (same-page anchor) eklendi.

## Erişilebilirlik hedefleri (doğrulandı)
- **Her major domain ≤2 tık:** README → domain MOC (1) → domain içi substantive not (2). ✅
- **Her substantive not ≤3 tık:** README → domain MOC (1) → not (2); daha derin çapraz notlar MOC/ilgili linkten (3). ✅
- Obsidian wikilink'leri korundu (ikincil), ama birincil navigasyon relative Markdown.

## Doğrulama sonuçları
| Kontrol | Sayı | Kırık |
|---|---|---|
| Relative dosya-linki (README + MOC + notlar + raporlar; nav scope) | 363 | **0** |
| Same-page TOC anchor | 1563 | **0** |
| Obsidian wikilink (ACTIVE_CODEX) | 4524 | **0** |

> Kaynak ingestion sonrası yeniden doğrulandı (2026-07-14). `SOURCE_ARCHIVE/` +
> `BUILD_REFERENCE/` navigasyon kapsamı dışında (arşiv/config). Ingestion'ın
> eklediği TOC girişleri başlıklardan yeniden türetildi → 0 kırık.

> İlk koşuda 12 "kırık" vardı — hepsi henüz yazılmamış `REPORTS/*.md` hedefleriydi;
> raporlar yazıldıktan sonra **0**. Bkz. `LINK_REPORT.md`.

## Unicode / boşluk yolları
- Dosya adlarındaki boşluklar linklerde `%20` olarak kodlandı (ör. `L1%20Survival%20Kit.md`).
- Türkçe/Unicode karakterli klasör/başlıklar `urllib.parse.quote` ile kodlandı.
- TOC anchor'ları GitHub slug algoritmasına yakın bir slugger ile üretildi ve
  **aynı dosyadaki başlık slug'larına karşı** doğrulandı (self-consistent, 0 kırık).
  Not: nadir `İ` içeren başlıklarda GitHub'ın tam Unicode slug'ı farklı olabilir;
  bunlar **same-page** ikincil anchor'dır, birincil çapraz-dosya navigasyonu değil.

## Yöntem
- Nav üretimi: `nav_build.py` (deterministik, idempotent, `<!-- gh-nav -->` / `<!-- gh-toc -->` marker'lı).
- Doğrulama: `gh_nav_validate.py` (relative link + anchor) + Obsidian wikilink validator.

> [!warning] GitHub okunabilirliği **yalnızca wikilink çözümüne** dayanılarak iddia
> edilmedi; relative Markdown linkleri ayrıca doğrulandı.
