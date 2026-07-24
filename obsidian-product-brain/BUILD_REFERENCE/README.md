# BUILD_REFERENCE

v0.1 import bütünlük kanıtları + opsiyonel vault yapılandırması.

## `ORIGINAL_ZIP.sha256`
Yüklenen v0.1 ZIP'inin SHA-256'sı (kaynak arşiv bütünlüğü).

## `EXTRACTED_NOTES_MANIFEST.csv`
244 notun **çıkarım-anındaki** (as-extracted) SHA-256'ları — v0.1'in sadık import
edildiğinin kanıtı.

> [!warning] Bu hash'ler **çıkarım anını** yansıtır. Sonrasında §5 kapsamında
> `ACTIVE_CODEX/` içindeki 16 MOC notuna GitHub nav bloğu ve 117 nota TOC eklendi;
> bu yüzden canlı dosya hash'leri manifest'ten **bilerek** farklıdır. Orijinal
> import'un doğruluğu ZIP + bu manifest ile; nav/TOC eklemeleri
> `../REPORTS/GITHUB_NAVIGATION_REPORT.md` + `LINK_REPORT.md` ile izlenir.

## `optional-vault-config/`
v0.1 ZIP'inden taşınan jenerik `.obsidian` yapılandırması. **Aktif değildir** ve
founder'ın yerel Smart Brain config'inin üzerine kopyalanmamalıdır — bkz.
`optional-vault-config/DO_NOT_OVERWRITE_LOCAL_CONFIG.md`.
