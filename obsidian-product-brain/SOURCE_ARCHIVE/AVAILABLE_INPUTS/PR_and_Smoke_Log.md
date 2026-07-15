---
status: active
type: workflow
owner: mixed
last_reviewed: 2026-06-29
related_repo_paths:
  - docs/STATUS.md
  - docs/DEV_APK_SMOKE_TEST_CHECKLIST.md
---

# PR and Smoke Log

> [!runtime] Purpose
> Append-only private log for PRs, builds, smoke runs, and operator notes. Keep it short. Link to repo docs and raw smoke notes instead of copying them.

## Current Snapshot - 2026-06-29

- Current main: `2df346996e31774c3c1e7ba4e07274963865116a` (Round 1.2 stopping point, after #155 + #156). Round 1.1 baseline was `8cfdce7508b4bc26eb78468fb59de7d236b5ae49` (#154).
- **Round 1.2 status: #155 and #156 merged to main, but NO Round 1.2 APK build or smoke has been run yet.** The Round 1.2 changes are code-validated (typecheck / validators / unit tests) but not visually or device-verified.
- Workflow decision (Round 1.2): do not build/smoke after every small PR. Triage → review → squash-merge small PRs individually; run an APK build + checklist smoke after a small batch; log the vault once at stopping points / batch end (not per PR).
- Branch status observed locally: `main...origin/main`, clean.
- Round 1.1 APK/build/smoke loop: complete. EAS preview APK built from required HEAD, installed, smoked on emulator + physically spot-checked on device by Haktan.
- Smoke verdict to carry forward: **Round 1.1 = GO / tester-ready.** Physical TTS confirmed OK on device; no immediate blocker reported.
- EAS build + APK URLs: recovered by the 2026-06-29 Claude loop and recorded below under "Round 1.1 build artifacts (private)". **Private/sensitive — keep in vault only, never copy into repo-safe docs.**
- Latest local smoke artifact found: `/Users/<operator>/Projects/lemot-smoke-notes/round1-dev-client-l0-l1-2026-06-27.md`, verdict `DEV_CLIENT_SMOKE_PASS_WITH_PRODUCT_NOTES` at commit `60bfda3a`; supplementary dev-client evidence, not EAS/operator sign-off.

## Round 1.1 build artifacts (private)

> [!warning] Sensitive
> Private/sensitive. Keep in this vault only. Do NOT paste these URLs into repo files, repo docs, or anything repo-safe.

- Build profile: `preview` (Android, `apk`, internal distribution, `EXPO_PUBLIC_PRODUCT_STAGE=dev-apk`).
- Built from commit: `8cfdce7508b4bc26eb78468fb59de7d236b5ae49` (== required HEAD), SDK 55, status FINISHED.
- EAS build page: `[REDACTED-EAS-URL]`
- APK artifact: `[REDACTED-APK-ARTIFACT-URL]` (~110 MB)
- Credentials: remote Android keystore on EAS (`Build Credentials [REDACTED]`); no operator login needed for the build.

## Round 1.1 PRs

| PR | Commit | Type | Summary | Files touched | Notes |
|---|---|---|---|---|---|
| #151 | `17eec7b` | Runtime UI copy/tone | Clarified Weave label and softened compare tone. | `lemot-app/components/lesson-v1/screens/Weave.tsx` | Weave feedback should stay reflective, not punitive. |
| #152 | `5f967ec` | Runtime UX | Added confirmation step to Say It Your Way. | `lemot-app/components/lesson-v1/screens/SayItYourWayV1.tsx` | Follow-up to over-scaffolding concern; production should feel intentional. |
| #153 | `ed85c07` | Content polish | Cleaned Round 1 chips and prompt copy in L2/L4/L5. | `lesson-002.ts`, `lesson-004.ts`, `lesson-005.ts` | Content-only polish. |
| #154 | `8cfdce7508b4bc26eb78468fb59de7d236b5ae49` | Content fix | Added missing L2 `ici` chip coverage. | `lesson-002.ts` | Current main after Round 1.1. |

## Round 1.2 PRs

| PR | Squash commit (main) | Type | Summary | Files touched | Notes |
|---|---|---|---|---|---|
| #155 | `5f27eee4ad02c0a13eda27dc8f148e3dd43f449f` | Runtime UI copy/label | Restore Weave branding + clarify target prompt. Visible `Weave` badge; `Say this:` on standard Weaves, suppressed on `open` Weaves; target meaning visually dominant; helper copy added; input label → `Your try`; new pure `weaveCopy.ts` + copy/transform tests. | `Weave.tsx`, `weaveCopy.ts` (new), `weaveCopy.test.ts` (new), `scripts/tests/run.ts` | Evaluator / neutral compare / Say It / content schema / progress / gating / AI all unchanged. Validations: typecheck clean, content 0/0/0, pools 6 known, tests 328/328. |
| #156 | `2df346996e31774c3c1e7ba4e07274963865116a` | Content polish | Remove passive `oui` from L3 recap `piecesUsed` ("Pieces you used" = produced pieces only). | `lesson-003.ts` | `oui` is recognition-only/trap in L3; `non` retained. No chips/insight/trap/registry/evaluator/schema/progress changes. Validations: typecheck clean, content 0/0/0, pools 6 known, tests 328/328. |

## Smoke History

### 2026-06-29 - Round 1.2 stopping point (#155 + #156 merged; NO APK/smoke yet)

- Main: `2df346996e31774c3c1e7ba4e07274963865116a` (after squash-merging #155 then #156).
- **No Round 1.2 APK build and no smoke run.** Status is **code-validated only** (typecheck / content / pools / learning-engine 328/328) for both PRs; nothing visually or device-verified for Round 1.2.
- Deferred to the next Round 1.2 batch APK + checklist smoke (the "visual eyeball"):
  - Weave UI render: `Weave` badge premium (not error-toned), `Say this:` + dominant target on standard Weaves, label suppressed on L6 `s08-weave-close-open`, helper + `Your try` present, neutral compare on a mixed attempt.
  - Re-run the Tester 1 consecutive-Weave scenario (L3 `I am not here.` → `It is not here.`) to check the salience fix lands.
  - L3 recap shows `non · je ne suis pas · ce n'est pas · non merci` (no `oui`).
- Branches `round1.2-weave-ux-batch` and `fix/l3-recap-remove-oui` kept (not deleted).
- Durable follow-ups in [[Backlog and Deferred]], [[Open Questions]], [[Syllabus Delta Log]].

### 2026-06-29 - Round 1.1 physical APK spot-check (operator: Haktan)

- Source: operator physical device spot-check after the automated build/smoke loop.
- Artifact: Round 1.1 preview APK from commit `8cfdce7508b4bc26eb78468fb59de7d236b5ae49` (see "Round 1.1 build artifacts (private)").
- Device: Haktan's physical Android device.
- Result: **new APK in good condition; no immediate blocker reported.**
- **Physical TTS confirmation: OK** (audio verified by operator on real device). This closes the emulator-only TTS caveat from the automated loop, where the pipeline fired French audio (`fra-FRA`, `fr-fr-x-vlf-server`) but could not be physically heard.
- Verdict carried forward: **Round 1.1 = GO / tester-ready.**
- Follow-up product note (does not block GO): see Weave brand-restoration candidate in [[Backlog and Deferred]] and the two new design questions in [[Open Questions]].
- Full operator entry mirrored in [[Tester Feedback Log]].

### 2026-06-29 - Round 1.1 automated loop (Claude) closeout

- Source: Claude autonomous build + smoke loop; required HEAD `8cfdce7508b4bc26eb78468fb59de7d236b5ae49`, clean tree, HEAD == origin/main.
- Validations: `validate:content` 0/0/0; `validate:pools` passed (6 known legacy warnings); `typecheck` clean; `test:learning-engine` 316/316.
- Dev-client + APK smoke: all four Round 1.1 fixes verified (#151 Weave label/tone, #152 Say It confirmation, #153 L2/L4/L5 content cleanup, #154 L2 `ici` chips). APK opened with no crash/redbox; L2 `je suis · ici` chips confirmed on the APK; TTS pipeline fired French audio (physical hearing then confirmed by operator above).
- Verdict: `ROUND1_1_APK_LOOP_GO`. EAS/APK URLs recovered (recorded privately above), closing the prior artifact gap.

### 2026-06-29 - Round 1.1 loop closeout captured in vault

- Source: current operator instruction + local repo state.
- Main under record: `8cfdce7508b4bc26eb78468fb59de7d236b5ae49`.
- Verdict: complete per operator context.
- Artifact gap: no EAS build URL or APK URL found locally. Do not invent one; add it here if recovered.
- Durable follow-ups moved to [[Backlog and Deferred]] and [[Open Questions]].

### 2026-06-27 - Dev-client L0/L1 smoke note

- Source: `/Users/<operator>/Projects/lemot-smoke-notes/round1-dev-client-l0-l1-2026-06-27.md`.
- Commit under test: `60bfda3a`.
- Verdict: `DEV_CLIENT_SMOKE_PASS_WITH_PRODUCT_NOTES`.
- Covered: fresh L0 first-run, full L1 completion, Home gating, restart/persistence.
- Caveat: supplementary dev-client run; not EAS, not operator physical sign-off.
- Product finding: Say It Your Way was over-scaffolded; later Round 1.1 PRs #149-#152 addressed this direction.

## Historical Smoke Archives

- [[Test Checklist]] and [[Dev APK Smoke Test 08.05.2026]] are older private QA records. Use them for historical failure modes only; current facts belong in this log.

## Maintenance

After each merged PR: append PR, commit, summary, files touched, validation/smoke if known, and whether it changes product canon.

After each smoke run: append build ID/link if safe, device, commit, verdict, blockers, non-blocking notes, and follow-up destination.
