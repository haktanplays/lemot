---
title: Device Verification Matrix
aliases: [Device Verification Matrix]
type: architecture
domain: architecture
status: canonical
canon_status: canonical
implementation_status: partial
verification_status: device-verified
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/STATUS.md", "docs/runbooks/DEVICE_DAY.md", "docs/DEV_APK_SMOKE_TEST_CHECKLIST.md", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/PR_and_Smoke_Log.md", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/Tester_Feedback_Log.md", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/User_Testing_Protocol.md"]
related: ["[[Smoke Test Playbook]]", "[[03 Current State]]", "[[Test Coverage Matrix]]"]
tags: [matrix, device, verification]
---

# Device Verification Matrix

> Kanıt seviyesi = en katı statü. "Kodlandı" veya "test geçti" **cihazda
> doğrulandı demek değildir.** Yalnızca bu matriste ✅ olan şey device-verified'dir.

| Yüzey / davranış | Doğrulandı mı? | Nasıl | Ne zaman / commit |
|---|---|---|---|
| Round 1 L0–L6 runtime smoke | ✅ | AVD `lemot_pixel5` (`emulator-5554`) | `8cefe81` / #136, P0–P3 = 0 |
| **Round 1.1 fiziksel cihaz spot-check** | ✅ | **fiziksel Android (Haktan)** | **`8cfdce75` / #154, 2026-06-29 — blocker yok** |
| **Round 1.1 fiziksel TTS** | ✅ | fiziksel cihaz (Haktan) | `8cfdce75` — **TTS OK**, emülatör-only caveat kapandı |
| Round 1.1 dış-tester (Tester 1) L0–L6 | ✅ | fiziksel APK, ~20–25 dk olumlu | `8cfdce75` — non-blocking Weave salience sinyali |
| **Round 1.2 (#155/#156) UI** | ❌ | **APK/smoke-doğrulanmadı**, code-validated only (328/328) | `2df3469` — bekliyor |
| **Güncel main #196 (`02f9f7a`) cihaz** | ❌ | Round 1.1 spot-check `8cfdce75`'te; #196 **yeniden doğrulanmadı** | operator-only, bekliyor |
| Clean launch / no red screen / persistence | ✅ | emulator smoke | #136 |
| Time-aware greeting header | ✅ | live | #136 |
| Weave empty-start / hint support | ✅ | emulator | #136 |
| L2–L3 tam sıralı run | ⚠️ | tam yapılmadı (honest caveat) | — |
| L4–L6 | ⚠️ | deep-link sampled | — |
| **Lesson Zero YENİ akış** (#139/#141 sonrası) | ❌ | eski smoke görmedi | operatör yeniden kapsamalı |
| Fiziksel cihaz smoke | ❌ | operator-only, bekliyor | — |
| L7–L15 (gated) | ❌ | görünür değil | — |
| learning-engine yüzeyi (C) | ❌ | sandbox only | — |
| EAS preview APK | ❌ | operator-only, build yok | — |

> [!warning] Emülatör ≠ fiziksel cihaz. `8cefe81`/#136 emülatör smoke için hâlâ
> geçerli. [[03 Current State]] · [[05 Open Loops]] O1–O2. Prosedür: [[Smoke Test Playbook]].

> [!historical] **Kaynak içe aktarımı — Round 1.1 / 1.2 (2026-06-29 vault, upload).**
> Round 1.1'de bir fiziksel cihaz spot-check **gerçekleşti** (`8cfdce75`/#154,
> Haktan, TTS OK) — bu, o commit için gerçek bir device-verified kanıttır. **Ama
> bu, güncel HEAD `02f9f7a` (#196)'yı device-verified yapmaz:** `8cfdce75`, #196'nın
> atasıdır ve arada #155/#156 (Round 1.2, henüz smoke edilmedi) + #157–#196 indi.
> Güncel main'in fiziksel cihaz durumu **ayrı, hâlâ açık** bir iştir. Gerçek-tester
> validasyonu da açık (`User_Testing_Protocol.md` Stage 2 = pending). Build çıktıları:
> [private EAS/APK artifacts held in operator vault]. (kaynak: `PR_and_Smoke_Log.md`,
> `Tester_Feedback_Log.md`)
