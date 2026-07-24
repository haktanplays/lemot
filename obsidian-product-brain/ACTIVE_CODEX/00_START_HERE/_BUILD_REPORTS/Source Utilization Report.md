---
title: Source Utilization Report
type: source-record
domain: meta
status: canonical
created: 2026-07-14
tags: [build-report]
---

# Source Utilization Report — v0.1

## Kullanılan repo kaynakları
Vault, aşağıdaki repo katmanlarından 7 domain evidence paketine çıkarılan kanıtla
dolduruldu (tam liste: [[Source Ledger]] · [[Repository Document Index]] · [[Code Source Index]]):

- **Kök canon:** `CLAUDE.md`, `docs/STATUS.md`, `docs/DEV_APK_MVP_CANON.md`, `docs/README.md`, `docs/MASTER_PIPELINE_v1.2.1.md`, `docs/KNOWN_GAPS.md`, `docs/ROADMAP.md`, `docs/CAIRN_*`.
- **Canon/spec:** `docs/canon/LESSON_FLOW_CANON_v1.md`, `docs/learning-engine-v1.md`, `docs/EXERCISE_CANON_v0.4.md`, `docs/syllabus/**` (30 dosya), `docs/engineering/karpathy.md`.
- **Durum/karar:** `docs/status/**` (18), `docs/audits/**` (loop audits + L1_L15 chip audit + 5 CSV), `docs/workstreams/**`.
- **Kod:** `lemot-app/content/itemRegistry.ts`, `lessonTypes.ts`, `lessons/v1/*`, `learning-engine/*`, `components/lesson-v1/*`, `components/sections/*`, `hooks/*`, `providers/AppProvider.tsx`, `lib/*`, `config/productStage.ts`, `app/*`, `supabase/*`, `scripts/tests/*`.
- **Tasarım/ops:** `constants/theme.ts`, `tailwind.config.js`, `docs/obsidian/*`, `docs/agents/*`, `docs/runbooks/*`, `docs/CONTENT_FACTORY_CONTRACT.md`, `docs/DEV_APK_SMOKE_TEST_CHECKLIST.md`, `docs/EAS_PREVIEW_BUILD.md`.

## Otorite modeli
"En yeni tarih kazanır" tek başına kullanılmadı. Otorite [[08 Source of Truth Map]]'teki
7-katmanlı sıraya göre atandı; çatışan kaynaklar silinmedi, `superseded/historical/
spec-only` etiketlendi ve gerektiğinde bir uzlaşma açık döngüsü açıldı.

## Kanıt paketleri (build-time, repo dışı)
7 domain evidence paketi `/tmp/cairn_build/evidence/` altında üretildi (repoya
yazılmadı): product_canon, learning_system, exercises, syllabus, architecture,
decisions_history, design_ops. Bunlar v0.2 için yeniden kullanılabilir ham
sentez katmanıdır.

## Kullanılamayan kaynaklar
Operator-vault / harici 14 kaynak bu bulut oturumunda okunamadı — içerikleri
**uydurulmadı**; bkz. [[Missing Source Inputs]] ve
[[Missing Source Report]].
