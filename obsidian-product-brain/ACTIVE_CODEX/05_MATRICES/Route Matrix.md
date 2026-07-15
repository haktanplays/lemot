---
title: Route Matrix
aliases: [Route Matrix]
type: architecture
domain: architecture
status: canonical
canon_status: canonical
implementation_status: implemented
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["lemot-app/app/"]
related: ["[[Route Architecture]]", "[[Route Map]]", "[[Feature Stage Matrix]]", "[[Runtime Content Architecture]]"]
tags: [matrix, routes]
---

# Route Matrix

> Expo Router. Yüzey × route × stage-gate × loader × data source × durum.
> Anlatım: [[Route Architecture]].

| Yüzey | Route | Stage gate | Loader | Data source | Durum |
|---|---|---|---|---|---|
| Home / Journey | `app/(tabs)/index.tsx` | dev-apk | AppProvider | `lm7` `p` slice | IMPLEMENTED (L1–L6 cap) |
| Static v1 lesson | `app/v1-lesson/[id].tsx` | dev-apk görünür | `V1_LESSONS` | `content/lessons/v1/*` | **IMPLEMENTED — sevkedilen yüzey** |
| Legacy lesson | `app/lesson/[id].tsx` | dev-apk **gizli** | `data/lessons` + `SECS` | legacy | legacy-active-hidden |
| Learning-engine player | `app/learn/[fixtureId].tsx` | `sandbox && v1LessonEngine` | fixtures | `lm_le_events` | fixture/sandbox-only |
| Dev tools | `app/dev/*` | `sandbox && __DEV__` | — | — | dev-only |
| Lesson Zero | `app/lesson-zero.tsx` | dev-apk | `lessonZeroAnswers` | `lm7` | IMPLEMENTED (VIS) |
| Auth | `app/auth` | Supabase env varsa | Supabase | remote | env yoksa gizli/guard (#115) |

> [!canon] Üç ayrı ders route'u (v1-lesson / lesson / learn) = [[Runtime Content Architecture]]'daki
> üç paralel runtime. Kullanıcı yalnızca `v1-lesson` + `lesson-zero` görür.
