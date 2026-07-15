---
title: Visual Language
aliases: [Visual Language, Görsel Dil, Palette, Renk Paleti, Fonts]
type: design-spec
domain: design
status: active
canon_status: canonical
implementation_status: implemented
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["lemot-app/constants/theme.ts", "lemot-app/tailwind.config.js", "obsidian-product-brain/SOURCE_ARCHIVE/AVAILABLE_INPUTS/Visual_Design_Canon.md"]
code_refs: ["lemot-app/constants/theme.ts:1-18", "lemot-app/tailwind.config.js:12-33", "lemot-app/app/_layout.tsx"]
related: ["[[00 Le Mot Holy Codex]]", "[[Design System Overview]]", "[[Cairn Brand Direction]]", "[[Copy and Tone]]", "[[Accessibility]]"]
tags: [design, palette, typography, implemented]
---

# Visual Language

> [!canon] Purpose — Cairn'in gerçek, kodda yaşayan renk paleti + tipografisi. Bu not "tek kanonik ev"dir; başka notlar renk hex'lerini kopyalamaz, buraya link verir.

## Executive Summary

Görsel dil **IMPLEMENTED ve tek kaynaklı**: renkler `constants/theme.ts` içindeki `P` objesinde tanımlı, `tailwind.config.js` içindeki `lm` namespace'ine birebir aynanır. İki font: **Newsreader** (serif — Fransızca metin, başlıklar) ve **Outfit** (sans — UI/İngilizce gövde). Palet sıcak parşömen zemin + asla saf siyah olmayan mürekkep + dört aksan (tuğla kırmızı / yeşil / kehribar / mor) üzerine kurulu — "sakin, premium, dağ" hissi.

## Renk Paleti (IMPLEMENTED)

> [!implemented] Kaynak `constants/theme.ts:1-18` (`P` objesi), ayna `tailwind.config.js:12-29` (`lm` namespace). Hex değerleri doğrudan koddan alındı, uydurma yok.

| Token (`P`) | Hex | Tailwind (`lm-*`) | Rol |
|---|---|---|---|
| `bg` | `#FAF9F7` | `lm-bg` | Uygulama zemini (sıcak parşömen / kırık beyaz) |
| `paper` | `#FFFFFF` | `lm-paper` | Kart/yüzey beyazı |
| `ink` | `#2C2825` | `lm-ink` | Ana metin (sıcak, siyaha yakın — asla saf `#000`) |
| `ink2` | `#6B6560` | `lm-ink2` | İkincil metin |
| `ink3` | `#A39E99` | `lm-ink3` | Üçüncül / soluk metin |
| `red` | `#C0392B` | `lm-red` | Tuğla kırmızı (ana aksan / hata / tehlike) |
| `rl` | `#FBEAE8` | `lm-red-light` | Kırmızı açık dolgu |
| `rb` | `#F0C9C4` | `lm-red-border` | Kırmızı kenar |
| `green` | `#27AE60` | `lm-green` | Yeşil (doğru / aktif canon / başarı) |
| `gl` | `#E8F5E9` | `lm-green-light` | Yeşil açık dolgu |
| `amber` | `#E67E22` | `lm-amber` | Kehribar (devam eden / uyarı / iz) |
| `al` | `#FFF8E1` | `lm-amber-light` | Kehribar açık dolgu |
| `purple` | `#7C3AED` | `lm-purple` | Mor (aksan / kapı-gate / özel) |
| `pl` | `#F3E5F5` | `lm-purple-light` | Mor açık dolgu |
| `border` | `#E8E5E1` | `lm-border` | İnce çizgi kenarlar |
| `sh` | `0 1px 4px rgba(44,40,37,0.06)` | — | Yumuşak gölge (çok düşük elevation) |

Dört-aksan hikâyesi (tuğla/yeşil/kehribar/mor) `CLAUDE.md` konvansiyon satırıyla eşleşir: "Color palette in `P` object (red: #C0392B, green: #27AE60, amber: #E67E22, purple: #7C3AED)". [CANONICAL]

> [!warning] Drift riski: `P` (theme.ts) ile `lm` (tailwind) manuel olarak senkron tutulur — otomatik türetme yok. Biri değişirse diğeri elle güncellenmeli. Yeni renk eklerken iki dosyayı da düzenle.

## Tipografi (IMPLEMENTED / CANONICAL)

- **Newsreader** — serif; Fransızca metin, başlıklar, ders başlıkları. `tailwind.config.js:32` `fontFamily.newsreader`.
- **Outfit** — sans-serif; UI, gövde, İngilizce. `tailwind.config.js:31` `fontFamily.outfit`.
- Her ikisi de `app/_layout.tsx` içinde yüklenir.
- `CLAUDE.md` (CANONICAL): "Fonts: Newsreader (serif, French text), Outfit (sans-serif, UI)."

Anlam: **serif = Fransızca / dil**, **sans = arayüz / açıklama**. Tipografik ayrım öğrenene "bu Fransızca içerik, bu benim rehberim" ipucunu sessizce verir.

## Guardrails

- Mürekkep asla saf siyah değil (`#2C2825`) — parşömen zeminle sıcak kontrast, göz yormaz. Karanlık mod önerisinde de "asla `#000`" kuralı (obsidian-customization §2).
- Aksanlar semantiktir: yeşil = doğru/aktif, kırmızı = hata/aksan, kehribar = devam/iz, mor = özel/gate. Rastgele dekorasyon için kullanılmaz.

## Kaynak içe aktarımı (Tasarım Envanteri + Visual Design Canon)

> [!source] İçe aktarılan: `Visual_Design_Canon.md` — "aktif özel görsel/ürün tasarım kanonu" (status: active, last_reviewed 2026-06-29). Bu not kod'daki palet/tipografiyle *tutarlıdır* ve onu daha üst-seviye illüstrasyon/kompozisyon yönüyle tamamlar.

### Görsel yön: dağcı / yol / cairn metaforu [SOURCE — CANONICAL]

`Visual_Design_Canon.md` "Current Visual Direction" bölümü aktif yönü şöyle sabitler:

- **Dağcı / yol / cairn (taş yığını) metaforu.** → [[Cairn Brand Direction]].
- **Uzak dağ** = aspirasyon (hedef, henüz uzakta).
- **Yola/öğrenene yakın küçük ama görünür cairn** = bir sonraki işaret taşı.
- Net kontrast + okunabilir kompozisyon.
- **Premium illüstrasyon tonu.**
- **Sakin öğrenme, gürültülü oyunlaştırma değil.** ("Calm learning, not noisy gamification.")

### İllüstrasyon kuralları [SOURCE]

- Tutarlı çizgi kalınlığı; doğal kompozisyon.
- **Cairn görünür ama abartısız** — çok büyük değil ("Cairn should be small but visible").
- Dağcı biraz geride/büyükçe durabilir ki cairn doğal ölçek kazansın; insan/öğrenen ölçek verir.
- **Doygunluğu tüm rengi soldurarak çözme** — önce kompozisyon/renk alanını ayarla ("Do not solve saturation by simply fading all color; adjust composition/area first").

### App UI yönü [SOURCE — palet ile tutarlı]

- **Sıcak, temiz kartlar** + okunabilir hiyerarşi ("Warm, clean cards").
- Karmaşa yok, çocuksu **ödül tiyatrosu yok, Duolingo-vari aşırılık yok** ("no childish reward theatre… no Duolingo-style overplay").
- Hareket öğrenmeye hizmet eder, dersi yavaşlatmaz; geri bildirim nazik/net/uygulanabilir.

> [!note] **Tutarlılık teyidi:** Yukarıdaki illüstrasyon/kompozisyon yönü, bu notta zaten kodtan belgelenen palet (sıcak parşömen zemin, asla saf siyah mürekkep, dört semantik aksan) ve tipografi (Newsreader serif / Outfit sans) ile *çelişmez* — onu görsel-dil katmanında tamamlar. "Sakin, premium, dağ" hissi her iki kaynakta da ortaktır. V4-B "asymmetrical breath" bu yönün ileri implementasyonudur ama DEFERRED → [[V4 Studies Disposition]].

## Related Notes

- [[Design System Overview]] · [[Cairn Brand Direction]] · [[Copy and Tone]] · [[Accessibility]] · [[Motion and Animation]]
