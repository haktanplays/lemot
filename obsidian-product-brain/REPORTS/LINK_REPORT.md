# LINK REPORT

İki bağımsız link katmanı doğrulandı: (1) GitHub relative Markdown (birincil),
(2) Obsidian wikilink (ikincil).

## Özet

| Katman | Kontrol | Çözülmeyen |
|---|---|---|
| GitHub relative dosya-linki (nav scope) | 363 | **0** |
| GitHub same-page TOC anchor | 1563 | **0** |
| Obsidian wikilink (ACTIVE_CODEX 244 not) | 4524 | **0** |

> Kaynak ingestion sonrası yeniden doğrulandı. Nav doğrulaması **navigasyon
> kapsamıdır** (README + Codex + raporlar); `SOURCE_ARCHIVE/` (redakte ham kaynaklar,
> orijinal wikilink/URL'leri kendi bağlamlarında taşır) ve `BUILD_REFERENCE/`
> hariç — bunlar navigasyon değil arşiv/config. TOC anchor'ları ingestion sonrası
> başlıklardan yeniden türetildi (self-consistent).

## GitHub relative linkleri
- Kaynaklar: `README.md`, `LOCAL_RECONCILIATION_PENDING.md`, 16 MOC nav bloğu, 117 TOC, `REPORTS/*`.
- İlk koşu: 12 kırık — tamamı henüz yazılmamış `REPORTS/*.md` hedefleri (BUILD/GITHUB_NAVIGATION/SOURCE_INGESTION/LINK/CONTRADICTION/LOCAL_RECONCILIATION/SECURITY/PROPOSED_COMMIT_SCOPE/PROPOSED_DRAFT_PR_BODY).
- Bu 10 rapor yazıldıktan sonra: **0 kırık**.

## Obsidian wikilink'leri
- v0.1'den devralınan 244 not; nav/TOC eklemeleri **markdown link/anchor** kullandığı için wikilink grafiği bozulmadı.
- `validate.py` (kod-farkında; code-span içindeki örnek `[[..]]` sayılmaz): **0 çözülmeyen**.

## Kapsam dışı bırakılanlar
- Harici `http(s)://` linkleri (canlılık kontrolü yapılmadı — kapsam dışı).
- Şablon placeholder'ları (`<...>`, `...`) ve code-span içi örnekler link sayılmadı.

## Araçlar
`gh_nav_validate.py` (relative + anchor), `validate.py` (wikilink). Ham çıktı:
`/tmp/cairn_build/ghnav.json`, `/tmp/cairn_build/validation.json` (build-time, repo dışı).

> Not: GitHub okunabilirliği relative link doğrulamasıyla kanıtlandı;
> yalnızca wikilink çözümüne dayanılmadı.
