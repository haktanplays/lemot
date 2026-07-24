---
title: Link Validation Report
type: source-record
domain: meta
status: canonical
created: 2026-07-14
tags: [build-report]
---

# Link Validation Report — v0.1

> [!implemented] **4,443 wikilink kontrol edildi → 0 çözülmeyen link.**

## Yöntem
`validate.py` tüm `.md` dosyalarını tarar; her `[[hedef|görünen#başlık]]` linkinin
`hedef` kısmını dosya-adı-stem'leri + frontmatter alias'ları kümesine göre çözer.
`.obsidian/` hariç.

## Sonuç
- Başlangıç: 55 çözülmeyen (4444 link içinde), 21 dosya.
- İki geçişte onarıldı (`fix_links.py`, `fix_links2.py` — çözünürlük-farkında):
  - Malformed trailing backslash (`[[X\]]` → `[[X]]`).
  - Numeric-prefix (`[[Superseded Specs|90 Superseded Specs]]` → `[[Superseded Specs]]`).
  - Folder-path hedefleri (`[[Exercise System Overview|03_EXERCISES/Exercise System Overview]]` → basename).
  - Decision-code etiketleri (`[[Decision Index|D-20 ...]]` → `[[Decision Index|D-20 ...]]`).
  - Template placeholder (`[[ADR-XXXX]]` → `` `ADR-XXXX` `` code span).
- **Son: 0 çözülmeyen link.**

## Not
Link onarımı yalnızca **çözülmeyen** hedefleri, **çözülen** bir adaya yeniden
yönlendirdi; geçerli linkler ve görünen etiketler korundu. Kasıtlı "eksik"
işaretli hedef yok (hepsi çözülüyor). Placeholder şablon değişkenleri
(`<...>`, `...`) link olarak sayılmadı.
