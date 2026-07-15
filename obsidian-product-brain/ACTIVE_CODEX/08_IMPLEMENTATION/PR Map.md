---
title: PR Map
aliases: [PR Clusters, Pull Request Map, PR Haritası]
type: historical
domain: history
status: active
canon_status: canonical
implementation_status: implemented
verification_status: reported-only
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/STATUS.md", "docs/ROADMAP.md", "git log", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/PR_and_Smoke_Log.md", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/Agent_Handoff.md"]
code_refs: []
test_refs: []
related:
  - "[[00 Le Mot Holy Codex]]"
  - "[[Implementation Overview]]"
  - "[[Commit and Milestone Timeline]]"
  - "[[Sprint Timeline]]"
  - "[[Decision Index]]"
tags: [implementation, pr, history]
---

# PR Map

Up: [[Implementation Overview]] · Zaman çizelgesi: [[Commit and Milestone Timeline]] · Sprint: [[Sprint Timeline]]

> [!warning] **Shallow-clone caveat.** Çalışan klon sığdır: **50 commit, `2bfc1b6` (#146)
> → `02f9f7a` (#196)**. #146'dan **önceki** PR numaraları (Round 1 #100–#142, learning-engine
> #18–#112, YASA/founder-self-learning) yerel git objelerinden değil, **statü dokümanlarından**
> okunmuştur → `verification_status: reported-only`. `#N` = dokümanların kaydettiği PR numarası.

## PR kümeleri (kronolojik)

| Küme | PR aralığı | Ne getirdi | Statü |
|---|---|---|---|
| Learning-engine v0.1 baseline | #18–#22 | Item Registry → Lesson Contract → ExerciseBlueprint → validator → dev preview | reported-only |
| Boundary/chain smoke | #35/#37/#38 | L11→L12→L16 chain smoke PASS; L16 zero-new-item recombination | reported-only |
| Founder Self-Learning P3 | #51–#57 | learner renderer (recognition/fill/build/register_switch/context_chain/boundary) | reported-only |
| Founder Self-Learning P4 | #60–#65 | Mon Lexique / Practice Pool | reported-only |
| Founder Self-Learning P5 | #69–#74 | local privacy / data-rights | reported-only |
| Progress-bridge selector | #87 | `selectLessonProgress` | reported-only |
| **Dev APK guardrails** | **#100–#116** | feature-scope lock, copy guards, **#104 fail-closed stage**, Practice hidden, `#114 aiEnabled` master switch, `/auth` guard, Round 1 checklist | reported-only |
| **Round 1 L0–L6 content** | **#119–#142** | L1/L2 seed, L3–L6 factory content, #136 Home greeting (**Round 1 ACCEPTED**), #138 Weave cloze fix, **#139 rebuilt Lesson Zero**, #141 cap hints → main `91f1b04` | reported-only |
| **Cairn import + product-system** | **#146–#156** | #146 product system map, #147 precedence, #148 dev-apk checklist↔L0, #149–#155 Say It polish, #156 remove `oui` from L3 recap | ✅ yerel git window'da |
| Canon + YASA screenless | #176–#187 | **#176 Lesson Flow Canon v1.0**, **#177 YASA 2**, **#178 YASA 1 rails**, **#179 deriveDrill+selector**, #182 karpathy+K1–K6, #183 K3 HARD ERROR, #186 YASA 3, **#187 mechanize canon V3/V4/V5** | ✅ yerel git window'da |
| Loop-audit remediation | #188–#196 | #188 corrupt-storage (PR-A), #189 scoring fixes, #190 blob clobbering, #191 AI edge hardening, #192 telemetry+secure tokens, #193 PR-E1, #194 PR-E2, #195 audit v2 reconcile, **#196 PR-H reset/export** → HEAD `02f9f7a` | ✅ yerel git window'da |

## Kaynak içe aktarımı — Round 1.1 / 1.2 (2026-06-29 vault, upload)

> [!historical] Yukarıdaki "#146–#156" kümesindeki Round 1 polish PR'larının satır
> ayrıntısı. 2026-06-29 operatör-vault yüklemesinden. O notların "current main"i
> `2df3469` (#156) → **güncel HEAD `02f9f7a` (#196)'nın gerisinde**, yani tarihsel.

| PR | Squash commit | Tip | Ne | Statü | Kaynak |
|---|---|---|---|---|---|
| #151 | `17eec7b` | Runtime UI copy/tone | Weave label netleştir + compare tonu yumuşat (`Weave.tsx`) | Round 1.1, device-verified @`8cfdce75` | `PR_and_Smoke_Log.md` |
| #152 | `5f967ec` | Runtime UX | Say It Your Way onay adımı (`SayItYourWayV1.tsx`) | Round 1.1, device-verified @`8cfdce75` | `PR_and_Smoke_Log.md` |
| #153 | `ed85c07` | Content polish | L2/L4/L5 chip + prompt copy temizliği | Round 1.1, device-verified @`8cfdce75` | `PR_and_Smoke_Log.md` |
| **#154** | **`8cfdce75`** | Content fix | L2 `ici` chip kapsamı → **Round 1.1 baseline main** | GO / tester-ready | `PR_and_Smoke_Log.md` |
| #155 | `5f27eee` | Runtime UI copy/label | Weave branding restore + target salience (badge, `Say this:`/open-suppressed, dominant hedef, helper, `Your try`; yeni `weaveCopy.ts`) | Round 1.2, **code-validated, NOT device-verified** | `PR_and_Smoke_Log.md`, `Agent_Handoff.md` |
| **#156** | **`2df3469`** | Content polish | L3 recap `piecesUsed`'dan passive `oui` kaldır (`non` kaldı) | Round 1.2 stopping point, **code-validated only** | `PR_and_Smoke_Log.md`, `Agent_Handoff.md` |

- **Round 1.1 = GO / tester-ready:** fiziksel spot-check (Haktan, 2026-06-29,
  **TTS OK**, blocker yok) + Tester 1 L0–L6 ~20–25 dk olumlu (bir Weave
  salience sinyali). **Round 1.2 (#155/#156) MERGED ama APK/smoke-doğrulanmadı**
  (328/328 test). Detay: [[Device Verification Matrix]], [[03 Current State]].
- Build çıktıları: [private EAS/APK artifacts held in operator vault].

## Yerel git window'daki gerçek PR'lar (#146→#196)

Bunlar `git log` ile doğrulanabilir (yukarıdaki tablodaki son üç küme). #146 öncesi
her şey **statü-doküman kaydı**.

## Açık / merge edilmemiş PR

> [!open-loop] **PR #197 (privacy)** = **PAUSED, MERGE EDİLMEDİ**, 17 çözülmemiş thread,
> head `fd22c40` (session brief'e göre; canlı doğrula). HEAD hâlâ `02f9f7a` (#196).
> Ayrıca #180 natural-reveal **OPEN, `[awaiting device pass]`** ([[Decision Index|D-38]]).
> → [[05 Open Loops]].

## Anahtar PR → Karar eşlemesi

| PR | Getirdiği karar |
|---|---|
| #104 | [[Decision Index|D-20]] |
| #114 | `aiEnabled` sandbox-only master switch ([[Feature Flags Map]]) |
| #136 (`8cefe81`) | [[Decision Index|D-39]] Round 1 runtime ACCEPTED |
| #139 | rebuilt Lesson Zero (How Weave Works otomatik zincirden çıktı) |
| #176 (`d16aa05`) | Lesson Flow Canon v1.0 + deployment roadmap |
| #177 | [[Decision Index|D-14]] |
| #178 | [[Decision Index|D-13]] rails |
| #186 | [[Decision Index|D-15]] |
| #187 (`f655c19`) | canon V3/V4/V5 mechanized ([[Test Strategy]]) |
| #196 (`02f9f7a`) | PR-H local reset/export coverage (HEAD) |

## Related Notes

[[Commit and Milestone Timeline]] · [[Sprint Timeline]] · [[Decision Index]] · [[Known Gaps]] · [[Implementation Ledger]]
