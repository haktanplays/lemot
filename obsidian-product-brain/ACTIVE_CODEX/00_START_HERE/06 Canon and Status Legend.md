---
title: Canon and Status Legend
aliases: [Status Legend, Legend, Statü Sözlüğü]
type: onboarding
domain: meta
status: canonical
canon_status: canonical
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/STATUS.md", "docs/MASTER_PIPELINE_v1.2.1.md"]
related: ["[[00 Le Mot Holy Codex]]", "[[08 Source of Truth Map]]", "[[01 How to Use This Vault]]"]
tags: [meta, legend]
---

# Canon and Status Legend

> [!canon] Bu not, vault genelinde kullanılan **statü sözlüğüdür**.
> Her not başındaki YAML alanları buradaki değerleri kullanır. Bir iddianın
> "kabul edildi", "kodlandı" ve "cihazda doğrulandı" olması **üç ayrı şeydir**;
> bunları asla tek statüye indirgeme.

## Neden üç boyutlu statü?

Le Mot'un tarihindeki en pahalı hata, "karar verildi" ile "çalışıyor" ile
"cihazda kanıtlandı"yı birbirine karıştırmaktı. Bu vault bunu yapısal olarak
engeller: her önemli iddia üç bağımsız eksende sınıflandırılır.

```yaml
canon_status: canonical        # Karar/spec katmanı: bu doğru mu, onaylı mı?
implementation_status: partial  # Kod katmanı: gerçekten yazıldı mı, bağlı mı?
verification_status: tests-only # Kanıt katmanı: nasıl doğrulandı?
```

## 1. `canon_status` — Karar / spec katmanı

| Değer | Anlamı |
|---|---|
| `canonical` | Şu an geçerli, kilitli kanon. Aksi açıkça belirtilmedikçe bağlayıcı. |
| `provisional` | Çalışan varsayım; geçerli ama henüz kilitlenmemiş. |
| `proposed` | Önerildi, henüz kabul edilmedi. |
| `historical` | Bir zamanlar geçerliydi; tarihsel kayıt. |
| `superseded` | Yeni bir kararla değiştirildi (bkz. `superseded_by`). |
| `unknown` | Kanon durumu netleştirilmemiş → açık döngü. |

## 2. `implementation_status` — Kod / runtime katmanı

| Değer | Anlamı |
|---|---|
| `implemented` | Kodda var ve runtime'da bağlı (kullanıcının gördüğü yol). |
| `partial` | Kısmen kodlandı; bazı parçalar eksik. |
| `spec-only` | Sadece spec/doküman; kod yok. |
| `fixture-only` | Kodda var ama yalnızca test fixture / dev örneği; runtime'da bağlı değil. |
| `legacy-active` | Eski kod, hâlâ erişilebilir/çalışıyor. |
| `legacy-unreachable` | Eski kod, artık erişilemez (ölü yol). |
| `not-started` | Henüz başlanmadı. |
| `unknown` | Belirsiz → doğrulama gerektirir. |

## 3. `verification_status` — Kanıt katmanı

| Değer | Anlamı |
|---|---|
| `device-verified` | Fiziksel cihaz / emülatör smoke ile doğrulandı. |
| `integration-tested` | Entegrasyon/wiring testleri geçti. |
| `unit-tested` | Birim testleri geçti. |
| `source-inspected` | Sadece kaynak kod okundu, çalıştırılmadı. |
| `reported-only` | Yalnızca bir rapor/handoff iddia ediyor; bağımsız kanıt yok. |
| `unverified` | Doğrulanmadı. |

## Inline iddia etiketleri (metin içinde)

Not gövdesinde tekil iddiaları işaretlemek için bu kısa etiketleri kullan.
Bunlar bağımsız boyutlardır; gerektiğinde birleştir (ör. `[CANONICAL, IMPLEMENTED, tests-only]`).

- **CANONICAL** — geçerli kanon.
- **IMPLEMENTED** — runtime'da kodlanmış ve bağlı.
- **VERIFIED** — cihaz/test ile doğrulanmış.
- **PLANNED** — planlandı, henüz yok.
- **PROPOSED** — önerildi, kabul edilmedi.
- **DEFERRED** — bilinçli olarak ertelendi.
- **REJECTED** — değerlendirildi ve reddedildi.
- **SUPERSEDED** — sonraki bir kararla değiştirildi.
- **HISTORICAL** — tarihsel kayıt.
- **UNKNOWN / NEEDS VERIFICATION** — doğrulama gerektirir → [[Needs Verification]].

## Callout sözlüğü

Bu vault şu Obsidian callout'larını kullanır:

> [!canon] Geçerli, kilitli kanon.

> [!implemented] Runtime'da gerçekten var ve bağlı.

> [!warning] Tuzak, risk veya kolay yapılan hata.

> [!historical] Tarihsel/superseded — aktif kanon değildir.

> [!decision] Bir karar kaydı (ADR'ye bağlanır).

> [!open-loop] Açık döngü / çözülmemiş soru → [[05 Open Loops]].

> [!example] Somut örnek (French/kod dâhil).

## Altın kural

> [!warning] "Detaylı olması, güncel olduğu anlamına gelmez."
> Eski bir not çok ayrıntılı diye onu kanon sanma. Önce [[08 Source of Truth Map]]
> ile hangi kaynağın hangi katmanı kontrol ettiğine bak.
