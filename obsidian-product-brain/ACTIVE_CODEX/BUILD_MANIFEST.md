# BUILD MANIFEST — CAIRN Obsidian Product Brain v0.1

- **Build tarihi:** 2026-07-14
- **Working name:** CAIRN_OBSIDIAN_PRODUCT_BRAIN_v0.1
- **Repo:** haktanplays/lemot
- **Repo baseline (build anı):** HEAD = origin/main = `02f9f7ae3746355ea77f94d81c1c4d198a823b38` (#196 PR-H privacy)
- **Repo durumu:** temiz — hiçbir repo dosyası değiştirilmedi (READ-ONLY).
- **Vault konumu:** `/tmp/CAIRN_OBSIDIAN_PRODUCT_BRAIN_v0.1/` (repo çalışma ağacının DIŞINDA).

## Yöntem
- İki geçiş: PASS A (iskelet: klasör ağacı, şablonlar, statü sözlüğü, giriş katmanı) → PASS B (kanıta dayalı içerik dolumu).
- Kanıt, repo dokümanları + kaynak kod okunarak 7 domain evidence paketine çıkarıldı (`/tmp/cairn_build/evidence/`), sonra notlara sentezlendi.
- Her önemli iddia üç boyutlu statü (canon / implementation / verification) + kaynak alıntısı taşır.

## İçerik
- 17 üst-düzey klasör + `.obsidian/` (minimal, portable, community-plugin bağımsız).
- Şablonlar: `99_TEMPLATES/` (9 şablon).
- Build raporları: `00_START_HERE/_BUILD_REPORTS/`.

## İstatistikler
- Toplam not: **244** · kelime: **~129,993** · Mermaid diyagram: **72** · tablo satırı: **1,597**
- Wikilink: **4,454** → çözülmeyen **0** · thin note **0** · secret bulgusu **0**
- ADR: 25 (+6 index) · kaynak defteri satırı: 46 · çelişki: 10 · eksik kaynak: 14
- Detay: `00_START_HERE/_BUILD_REPORTS/Vault Statistics.md`

## Güvenlik
- Repo `.git` dâhil değil. Secret/token yok. `node_modules` yok. Font/binary yok.
- Operatör-vault özel yolları yalnızca açıkça işaretli tarihsel source-record'larda referans edilir; canlı secret içermez.
