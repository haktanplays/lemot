---
title: Architecture Context Pack
aliases: [Architecture Pack, Mimari Paket]
type: handoff
domain: architecture
status: active
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/STATUS.md", "docs/status/founder-self-learning-build-architecture-review.md", "lemot-app/supabase/schema.sql", "docs/EAS_PREVIEW_BUILD.md"]
related: ["[[Canonical Context Pack]]", "[[System Architecture]]", "[[Runtime Content Architecture]]", "[[Storage Architecture]]", "[[Route Architecture]]"]
tags: [agent, context, architecture]
---

# Architecture Context Pack

<!-- gh-toc -->

## İçindekiler

- [Stack](#stack)
- [Üç ders route ağacı (bir arada var — D-09)](#üç-ders-route-ağacı-bir-arada-var-d-09)
- [Events = source of truth (D-11)](#events-source-of-truth-d-11)
- [Storage (iki+bir ayrı dünya — kritik)](#storage-ikibir-ayrı-dünya-kritik)
- [Product stage (fail-closed — D-20)](#product-stage-fail-closed-d-20)
- [Supabase & AI (IMPLEMENTED kod, deploy operator-only, AI dormant)](#supabase-ai-implemented-kod-deploy-operator-only-ai-dormant)
- [Privacy (D-21, local layer IMPLEMENTED; remote DEFERRED)](#privacy-d-21-local-layer-implemented-remote-deferred)
- [Migration disiplini (YASA 1 — D-13)](#migration-disiplini-yasa-1-d-13)
- [EAS build](#eas-build)
- [Failure posture](#failure-posture)
- [İlgili Notlar](#ilgili-notlar)

> [!canon] Runtime/storage/route/Supabase/AI işi yapan ajanın bağlam paketi. Ana evi: [[System Architecture]].

## Stack
Expo / React Native / TypeScript / NativeWind / Expo Router. Kod tabanı dizini `lemot-app`. Ana evi: [[System Architecture]].

## Üç ders route ağacı (bir arada var — D-09)
- `/lesson/[id]` — **legacy v7** (runtime A), dev-apk gizli.
- `/v1-lesson/[id]` — **v1 smoke** (runtime B), Home ilk dersi buraya yönlendirir. **Sevkedilen yol.**
- `/learn/[fixtureId]` — **learning-engine** (runtime C), gated `PRODUCT_STAGE === "sandbox" && FEATURES.v1LessonEngine`, deep-link only, **asla Home-linked**.
Legacy/v1 açılması **sözleşmenin çalışması, bug değil**. Cutover yetkilendirilmedi. Ana evi: [[Route Architecture]] · [[Route Matrix]].

## Events = source of truth (D-11)
Append-only `learning_event` log; mastery/Mon Lexique/Practice Pool/Daily Review/dashboard = **projeksiyon**.
`LearningRepository` interface app ↔ storage: `LocalRepository` (kvStorage) / `RemoteRepository` (Supabase, unbuilt).
Ana evi: [[Data Flow]] · [[Learning Engine Architecture]].

## Storage (iki+bir ayrı dünya — kritik)
- Engine: `lm_le_events` (SoT) · `lm_le_snapshot` (cache) · `lm_le_privacy_state` · `lm_le_telemetry`.
- Legacy app: `lm7` ({p,err,dr}) · `lm7_srs`.
- Sprint-10 Supabase (legacy): `profiles` · `user_progress` · `user_errors` (bu sonuncu server'da raw answer text tutar — kopyalanmayacak precedent).
**`lm_le_*` ve `lm7` disjoint** = "main integration blocker": engine yazar, Home/Progress/Daily Review `lm7` okur.
Karar (D-10): sahte `lm7` bridge marker **yazma**. Native `expo-sqlite/kv-store`, web `localStorage`. Ana evi: [[Storage Architecture]].

## Product stage (fail-closed — D-20)
`sandbox`/`dev-apk`/`public-beta`. Unset/mistyped `EXPO_PUBLIC_PRODUCT_STAGE` → **`dev-apk`** (en kısıtlı, asla sandbox).
`aiEnabled` yalnızca sandbox true. Test: `productStageResolution.test.ts`. Ana evi: [[Product Stage Architecture]] · [[Feature Flags Map]].

## Supabase & AI (IMPLEMENTED kod, deploy operator-only, AI dormant)
Edge Functions: `ai-chat` / `ai-evaluate` / `ai-error` (`ai-diag` **silindi**, B16). Client: `lib/ai.ts`
kullanıcı JWT ile invoke; `lib/supabase.ts` `EXPO_PUBLIC_SUPABASE_URL`/`_ANON_KEY` okur. PR-C hardening:
server-owned prompt contract, `maxTokens ≤ 300`, per-user `bump_ai_usage` rate-limit (fail-closed),
provider isim sızıntısı yok, 10s timeout. **`service_role` hiçbir yerde client'ta değil.** RLS her tabloda doğru.
Deploy + secrets + email-confirmation = **operator-only, bekliyor**. Ana evi: [[AI Architecture]] · [[Supabase]] · [[Authentication]].

## Privacy (D-21, local layer IMPLEMENTED; remote DEFERRED)
Local-first default. Versioned `PrivacyState` (`lm_le_privacy_state`), one-time disclosure, export **summary**
(raw JSON/`userAnswer` dump YOK), two-step reset, PR-H reset epoch barrier. Cloud deletion path **YOK** (C1, KVKK/GDPR açık).
Remote şema `le_*`/`learning_*` **PROPOSED** (additive, legacy `profiles`/`user_progress`/`user_errors`'a asla dokunmaz),
consent-gated (`consent_version`+`consent_at`), owner-scoped RLS, idempotent `client_event_id`. Ana evi: [[Privacy and Data Deletion]] · [[Sync Architecture]].

## Migration disiplini (YASA 1 — D-13)
Schema değişimi ⇒ migration **aynı PR'da** (rails #178, henüz sıfır gerçek migration). K1: absent version = v1;
stored data asla yerinde rewrite edilmez. **Schema-file ≠ deployed DB** (`streak` column schema'dan düştü ama
deployed DB'de olabilir; migration public-beta'ya ertelendi). Ana evi: [[Technical Debt]] · [[Known Gaps]].

## EAS build
`eas build --platform android --profile preview` (`lemot-app/`'ten). EAS env vars **Dashboard'dan** (`.env`
gitignore, EAS okumaz). `eas.json`: `preview.env.EXPO_PUBLIC_PRODUCT_STAGE=dev-apk`. **Operator-only.** Ana evi: [[Release and Build Process]].

## Failure posture
Her yerde fail-closed: stage → dev-apk; AI rate-limit RPC yoksa → deny; corrupt storage → non-destructive
(re-derive event log'dan). Ana evi: [[Failure and Recovery Model]].

## İlgili Notlar
- [[Canonical Context Pack]] · [[Learning Engine Context Pack]]
- [[System Architecture]] · [[Runtime Content Architecture]] · [[Storage Architecture]] · [[Route Architecture]] · [[Supabase]]
