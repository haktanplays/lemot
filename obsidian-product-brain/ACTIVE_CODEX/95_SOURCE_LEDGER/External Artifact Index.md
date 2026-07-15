---
title: External Artifact Index
aliases: [External Artifacts, Operator-Only Artifacts, Dış Artefakt Dizini]
type: source-record
domain: meta
status: active
canon_status: canonical
implementation_status: not-started
verification_status: reported-only
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/EAS_PREVIEW_BUILD.md", "docs/MASTER_PIPELINE_v1.2.1.md", "lemot-app/supabase/schema.sql"]
related: ["[[Source Ledger]]", "[[Missing Source Inputs]]", "[[Release and Build Process]]", "[[Supabase]]", "[[V4 Studies Disposition]]", "[[Incident and Blocker Handling]]"]
tags: [source, meta, external, operator]
---

# External Artifact Index

> [!warning] Bu artefaktlar **repo dışında** yaşar ve çoğu **operator-only**'dur:
> cloud oturumu bunları okuyamaz, çalıştıramaz, deploy edemez. MASTER_PIPELINE Rule 11:
> cloud "code-side ready" diyebilir ama bu bloklar açıkken "complete/shipped" DİYEMEZ.
> Operator-vault Obsidian dosyaları için ayrıntı [[Missing Source Inputs]]'te.

## 1. EAS Build (Expo Application Services) — operator-only

| Alan | Değer / durum |
|---|---|
| Ne | Android APK üretimi; `eas build --platform android --profile preview` |
| Profil | Sadece `preview` (apk, internal). Prod profili YOK → Faz 7'de gelecek (KNOWN_GAPS #10) |
| Env | `EXPO_PUBLIC_PRODUCT_STAGE=dev-apk` (`eas.json`); `EXPO_PUBLIC_SUPABASE_*` **EAS Dashboard'da** (gitignored `.env` EAS'e görünmez) |
| Kim | Operator/Jamo. Cloud `eas build` çalıştıramaz |
| Statü | Round 1 fiziksel-cihaz smoke + EAS preview build **PENDING** (STATUS "awaiting operator") |
| Kaynak | `docs/EAS_PREVIEW_BUILD.md`, `docs/DEV_APK_SMOKE_TEST_CHECKLIST.md §3`, `docs/ROADMAP.md` Taş 4/7 |

Belgeleyen: [[Release and Build Process]], [[Smoke Test Playbook]].

## 2. Supabase Dashboard / deployed DB — operator-only

| Alan | Değer / durum |
|---|---|
| Ne | Postgres DB + Edge Functions + secrets |
| Tablolar | `profiles`, `user_progress`, `user_errors`, `ai_usage` (hepsi RLS owner-scoped) |
| Edge Functions | `ai-chat`, `ai-evaluate`, `ai-error` deploy'u operator-only; `supabase functions delete ai-diag` gerekli (B16) |
| Secrets | `GEMINI_API_KEY` (zorunlu), `GROQ_API_KEY`/`MISTRAL_API_KEY` (opsiyonel), `ANTHROPIC_API_KEY` (ai-error gelecek) — sadece Dashboard'da |
| Şema debt | `schema.sql` ≠ deployed DB. `streak` kolonu drop edildi ama deployed DB'de hâlâ olabilir (migration public beta'ya ertelendi). `bump_ai_usage` RPC + `ai_usage` deploy edilmeden AI her istek deny (fail-closed) |
| Blocker | G3 email-confirmation re-enable (env-taşıyan tester build'inden önce P0) |
| Kaynak | `lemot-app/supabase/schema.sql`, `docs/runbooks/ai-edge-hardening-pr-c.md` §Deploy |

Belgeleyen: [[Supabase]], [[AI Architecture]], [[Authentication]].

## 3. Operator-vault Obsidian — operator-only (yazma)

| Alan | Değer / durum |
|---|---|
| Ne | `~/Desktop/ObsidianVault/01 Projeler/LeMot/` + `~/Desktop/Le Mot .md/` |
| İçerik | TOP CANON, User Journey, Tasarım Envanteri, Notes Archive Index, Proofreading, dated prompt pack'ler |
| Kural | Cloud **asla yazmaz**; durable kararlar `docs/CLOUD_SYNC_QUEUE.md`'ye kuyruklanır; operator drain eder |
| Statü | Cloud'dan **okunamaz** → içerik envanteri [[Missing Source Inputs]] |
| Kaynak | `docs/obsidian/obsidian-note-tree-redesign-plan-v0.md`, MASTER_PIPELINE Cloud Addendum |

Belgeleyen: [[Obsidian to Git Promotion Rules]], [[Documentation Workflow]].

## 4. V4 Studies tasarım kaynağı — external, DEFERRED

| Alan | Değer / durum |
|---|---|
| Ne | V4 Studies spec + V4 standalone HTML + V4 source JSX |
| Rol | V4-B "asymmetrical breath" görsel yönünün kaynağı |
| Statü | **SELECTED ama global redesign DEFERRED** (Dev APK smoke sonrası, açık reaktivasyon sinyaline kadar) — MASTER_PIPELINE Rule 9 |
| Erişim | Repo'da yok; standalone HTML operator-side. "Design source is not automatically implementation scope" |
| Kaynak | MASTER_PIPELINE §2 "Design source", Rule 9 |

Belgeleyen: [[V4 Studies Disposition]], [[Cairn Brand Direction]].

## 5. Diğer operator-only bloklar (özet)
- Stale merged `claude/*` branch temizliği (cloud git proxy delete-push 403).
- CLOUD_SYNC_QUEUE PENDING satırları (Payload Economy, Product Q&A, PR'lar #1-#10/#39).
- Build ID / build link kaydı (Test Checklist / LeMot.md).
- Legal review (KVKK/GDPR) — tester/public launch öncesi ek gate.

## İlgili notlar
- [[Missing Source Inputs]] — okunamayan operator-vault dosyalarının içerik tahmini
- [[Source Ledger]] · [[Incident and Blocker Handling]]
- [[Release and Build Process]] · [[Supabase]] · [[V4 Studies Disposition]]
