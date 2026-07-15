---
title: Current State
aliases: [Current State, Güncel Durum, Şimdi Ne Var]
type: index
domain: meta
status: canonical
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/STATUS.md", "docs/ROADMAP.md", "docs/CAIRN_ROADMAP_202607.md", "docs/KNOWN_GAPS.md", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/PR_and_Smoke_Log.md", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/Agent_Handoff.md", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/Tester_Feedback_Log.md"]
related: ["[[00 Le Mot Holy Codex]]", "[[04 Current Priorities]]", "[[05 Open Loops]]", "[[Implementation Ledger]]"]
tags: [index, status]
---

# Current State — 2026-07-14

<!-- gh-toc -->

## İçindekiler

- [Git zemini (bu vault build'i anındaki)](#git-zemini-bu-vault-buildi-anındaki)
- [Round 1.1/1.2 tarihçesi (repo HEAD #196'nın gerisinde)](#round-1112-tarihçesi-repo-head-196nın-gerisinde)
- [Sevkedilebilir gerçeklik](#sevkedilebilir-gerçeklik)
- [Üç runtime, tek sevkiyat](#üç-runtime-tek-sevkiyat)
- [Ne "code-side ready", ne Operator'da bloke](#ne-code-side-ready-ne-operatorda-bloke)
- [İki canlı roadmap (henüz uzlaştırılmadı)](#iki-canlı-roadmap-henüz-uzlaştırılmadı)
- [Validation snapshot (bayat — yeniden çalıştırılmalı)](#validation-snapshot-bayat-yeniden-çalıştırılmalı)
- ["Hard no" (şu an genişletme yasak)](#hard-no-şu-an-genişletme-yasak)
- [PR #197 — privacy (bilinçli duraklatıldı)](#pr-197-privacy-bilinçli-duraklatıldı)
- [Sırada ne var](#sırada-ne-var)

> [!warning] Bu not **hızlı bayatlar.** Kaynak: `docs/STATUS.md` (HEAD anındaki gerçek).
> Bir sonraki oturumda önce STATUS.md'yi oku, sonra bu notu güncelle.

## Git zemini (bu vault build'i anındaki)

- **HEAD / origin/main:** `02f9f7ae3746355ea77f94d81c1c4d198a823b38`
- **Son commit:** `fix(privacy): complete local reset and export coverage (PR-H) (#196)`
- **Build branch (bu vault için):** `claude/lemot-holy-codex-obsidian-8o24qz` — repo **temiz**, dokunulmadı.
- Klon **sığ** (~50 commit, #146→#196); #146 öncesi PR numaraları status dokümanlarından alıntı, yerel git'ten değil. [SOURCE-INSPECTED]

## Round 1.1/1.2 tarihçesi (repo HEAD #196'nın gerisinde)

> [!warning] Bu bölüm **tarihsel zenginleştirmedir, güncel-canon override DEĞİL.**
> 2026-06-29 tarihli operatör-vault yüklemesinden geldi. O notların "current main"
> dediği `2df3469` (Round 1.2), bu vault'un git zemini olan **`02f9f7a` (#196)'nın
> gerisindedir.** Yani aşağıdaki cihaz-doğrulama iddiaları `8cfdce75` (Round 1.1)
> anındaki durumdur; **#196'yı device-verified yapmaz.** Yukarıdaki "Git zemini" ve
> "Sevkedilebilir gerçeklik" fact'leri değişmedi.

- **Round 1.1 (baseline `8cfdce75`, #154):** #151 Weave label/tone, #152 Say It
  onay adımı, #153 L2/L4/L5 içerik temizliği, #154 L2 `ici` chip kapsamı. Verdict
  **GO / tester-ready.** Operatör (Haktan) **2026-06-29 fiziksel cihaz spot-check**
  yaptı: APK iyi durumda, blocker yok, **fiziksel TTS OK** — bu, otomatik
  loop'taki emülatör-only TTS caveat'ini **kapatır**. Tester 1 (ilk gerçek dış
  tester) L0–L6'yı ~20–25 dk'da tamamladı, olumlu, blocker yok; tek non-blocking
  sinyal: **Weave prompt-salience** (bir önceki Weave cevabını tekrar yazdı).
  [VERIFIED: device (fiziksel spot-check) — ama `8cfdce75`'te, #196'ya göre
  HISTORICAL] (kaynak: `PR_and_Smoke_Log.md`, `Tester_Feedback_Log.md`)
- **Round 1.2 (`2df3469`):** #155 (Weave branding + target salience: `Weave`
  badge, `Say this:` etiketi / open Weave'lerde bastırılmış, dominant hedef, helper
  copy, `Your try`), #156 (L3 recap `piecesUsed`'dan passive `oui` kaldırıldı).
  **MERGED ama henüz APK/smoke-doğrulanmadı** (yalnız code-validated, testler
  328/328). [IMPLEMENTED, code-validated, NOT device-verified] (kaynak:
  `PR_and_Smoke_Log.md`, `Agent_Handoff.md`)
- **Round 1.2 workflow:** her PR'da değil, durak noktalarında batch APK + smoke.
- Round 1.1 build çıktıları (EAS/APK) **mevcut ama operator-vault-only** →
  [private EAS/APK artifacts held in operator vault]; URL/ID buraya asla yazılmaz.
- **#196 ile ilişki:** Round 1.1/1.2, güncel HEAD'in **atası** olan içerik/UX
  dilimidir; #196 (privacy PR-H) bunların üstüne indi. Round 1.2 UI'ı hâlâ
  device-confirmed değil ve **güncel main'in cihaz durumu ayrı bir açık iştir**
  (bkz. yukarıdaki Operator-only bloklar + [[Device Verification Matrix]]).

## Sevkedilebilir gerçeklik

> [!implemented] **Round 1 Dev APK — L0–L6 — KABUL EDİLDİ & DONDURULDU.**
> Emülatör smoke (AVD `lemot_pixel5`, `emulator-5554`) `8cefe81` / #136'da P0–P3
> sıfır ile geçti; runtime baseline kabul ve **frozen**. [VERIFIED: device (emulator)]

Kritik nüans: runtime kapanış `8cefe81`'de yapıldı ama sonra #138 (Weave cloze),
**#139 (Lesson Zero first-run yeniden inşa)**, #141 (nudge hint cap) runtime'ı
değiştirdi. Operatör cihaz smoke'u **güncel main'de yeniden** Lesson Zero
zincirini kapsamalı — `8cefe81` kapsamı devretmez. [CANONICAL, STATUS.md:141-150]

## Üç runtime, tek sevkiyat

Bkz. [[Runtime Content Architecture]]. Özet:

| Sistem | Dosya | Statü | Kullanıcı görür mü? |
|---|---|---|---|
| A. Legacy 24-lesson | `data/lessons`, `components/sections/*` | HISTORICAL / legacy-active-hidden | Hayır (dev-apk gizli) |
| **B. Static authored v1** | `content/lessons/v1/*`, `LessonRendererV1` | **IMPLEMENTED, frozen** | **Evet — L1–L6** |
| C. Learning-engine | `content/learning-engine/*` | Gerçek kod, fixture/sandbox-gated | Hayır (sandbox founder-only) |

> [!warning] Sayı çelişkisi (doğrulanacak): mimari kanıtı `content/lessons/v1/`
> altında **16 dosya (L0–L15)** görüyor, ama `V1_LESSONS` dizisi yalnızca
> **7 ders (000–006)** içeriyor (STATUS.md). Yani L7–L15 `.ts` dosyaları var
> olabilir ama **kayıtlı/sevkedilmiş değil.** → [[Needs Verification]] · [[Runtime Lesson Map]]

## Ne "code-side ready", ne Operator'da bloke

> [!open-loop] Bulut oturumu **"tamamlandı" diyemez** Operator blocker'ları açıkken.
> Detay: [[05 Open Loops]].

**Operator-only bekleyen bloklar:**
- Fiziksel cihaz smoke pass (güncel main).
- EAS preview build (`eas build --platform android --profile preview`, `lemot-app/`'ten).
- EAS env var push/doğrulama; Supabase Edge Function deploy; Supabase secrets doğrulama.
- G3 (Supabase email confirmation) — env-taşıyan tester build'i öncesi zorunlu.
- Build ID / link kaydı; merged branch temizliği; `docs/CLOUD_SYNC_QUEUE.md` drain.

## İki canlı roadmap (henüz uzlaştırılmadı)

> [!warning] `docs/CAIRN_ROADMAP_202607.md` (engine-first, **Faz 0–7**) ve
> `docs/ROADMAP.md` (deployment-first "**Five Stones**", daha yeni) açıkça
> uzlaştırılmadı; README yalnızca ikincisini aktif sprint spec olarak listeliyor.
> → [[Commit and Milestone Timeline]] · [[05 Open Loops]]

- Cairn roadmap: Faz 0–5 (engine + decision gate) **DONE**; **Faz 6 (content factory, ~174/180 ders) gerçek darboğaz**; Faz 7 (release) başlamadı. [PLANNED]

## Validation snapshot (bayat — yeniden çalıştırılmalı)

Son kayıtlı koşu main `66d7aa7`'de: `typecheck` temiz; `test:learning-engine`
246 passed; `validate:pools` exit 0 (6 known legacy warning); `validate:content`
0 error/0 warning. Runtime PR'ları #138/#139/#141 sonradan indi → güncel test
sayısı farklı (runtime kapanış notu 262/613 diyor). **Operatör/pre-build adımı
güncel main'de yeniden çalıştırıp saymalı.** [STATUS.md:191-199] [UNKNOWN — needs re-run]

## "Hard no" (şu an genişletme yasak)

STATUS.md son bölümü: v1 feature/polish genişletme yok, Home/Daily Review/Progress
rewrite yok, V4-B implementation yok, Practice/Chat genişletme yok, Mon Lexique
runtime entegrasyonu yok, yeni ders mekaniği yok, Round 1 L1–L6 dışında içerik
genişletme yok, paywall işi yok. [CANONICAL]

## PR #197 — privacy (bilinçli duraklatıldı)

> [!open-loop] Oturum brief'ine göre: PR #197 (privacy/data deletion), son bilinen
> head `fd22c407c795940ff89269ae2a1a3f5bbd3b2802`, o head'de CI success, **17
> çözülmemiş thread**, son çözülmemiş P1: *"Avoid clobbering owned recovery with
> stale mount refresh"*. L1 ve Obsidian işi için **bilinçli olarak duraklatıldı.**
> **Merged veya complete DEĞİL.** Canlı GitHub durumu değişmiş olabilir → doğrula.
> Not: yerel HEAD #196'da (PR-H privacy), yani #197 uzaktaki ayrı bir açık PR.

## Sırada ne var

Bkz. [[04 Current Priorities]]. Kısaca: (1) L1 chip redesign (açık tasarım kararı,
[[L1 Survival Kit]]), (2) bu Obsidian hafızasının kurulması (bu iş), (3) Round 1
closeout gate + operatör cihaz smoke, sonra bir sonraki track kararı.
