# Repo Audit Disposition — 2026-06-09

**Date:** 2026-06-09
**`main` HEAD:** `bf3619a` (or newer)
**Audit source:** `LeMot_Repo_Denetim_Raporu_2026-06-09.md` (operator-vault, `~/Desktop`; produced
against `main` @ `9d420af` on a live clone with tests/typecheck/audit executed)
**Status:** Docs-only disposition note. No runtime / release-config / DB / Supabase / UI / route /
content / dependency change accompanies this file.

---

## 1. Purpose

This document records the **disposition** of the comprehensive 2026-06-09 repo audit: which
findings are accepted, how they are prioritized, and what the next PR queue looks like — **without
starting any implementation**. It converts the audit from a report into tracked next work, the
same way `docs/architecture/l0-l24-founder-build-matrix-v0.md` converted the founder-build
discussion into a roadmap. Where the two queues conflict, this disposition wins on *ordering*
(guardrails first), the matrix wins on *engine scope*.

## 2. Audit summary

Audit grades: Architecture **A**, Code quality **A-**, Security/RLS **B+**, Privacy **B**,
Content/pedagogy **B+**, Dependencies **A-**, Documentation **A+ infrastructure / C freshness**,
Release readiness **B**. Verified greens: CI active on every PR, full test suite passing,
typecheck clean, content validation 0 errors, no leaked secrets, no TODO/FIXME debt in code.

**Cross-cutting theme (accepted as the audit's core insight):** nearly every weakness lives in a
**transition zone between two individually-sound systems**:

- **engine ↔ legacy** — the best-tested code (learning-engine, 58+ tests) reaches no user; the
  user-facing 24 lessons run on untested legacy; duplicated lessons will drift
- **local ↔ cloud** — delete/export covers the (nearly empty) engine dataset while real user data
  lives in legacy keys + Supabase, which the current flows don't touch
- **docs ↔ code** — canon infrastructure is excellent but stale in places (sprint state, model
  routing, autoskills contradictions, audience wording); in an agent-driven repo, stale docs are
  executable wrong input
- **sandbox ↔ build** — stage model is textbook, but EAS env propagation, dev-route exposure, and
  the sandbox-direction typo fallback can silently ship the wrong surface to testers

The systems don't need rework; the **bridges** need building. That is what this queue does.

## 3. Accepted findings

All findings below are **accepted** as stated in the audit (section references are to the audit
report).

**Architecture (§1)**
- Three parallel lesson systems coexist (`data/lessons` legacy 24, `content/lessons/v1` orphan-ish
  middle layer, `content/learning-engine` contracts) — and the best-tested engine is not yet
  user-facing; duplicate lesson copies (e.g. L14) accumulate drift risk. Direction already
  formalized in the L0–L24 matrix (PR #97); no new decision needed here.

**Release (§8)**
- **R1:** EAS cloud builds likely ship with empty Supabase envs (`.env` is gitignored; `eas.json`
  only sets `EXPO_PUBLIC_PRODUCT_STAGE`) → `supabaseReady=false` → auth+AI silently disabled in a
  tester APK. Worst failure class: invisible.
- **R2:** `app/dev/*` routes reachable by deep link in a tester APK (`learn/[fixtureId]` is gated
  correctly; `dev/*` is not).
- **R3:** invalid/typo'd stage falls back to `sandbox` — in a build context that fails **open**
  (everything enabled) instead of failing closed.
- R4 (versionCode/runtimeVersion/production profile) noted as debt for public-beta, not now.

**DX / docs (§7)**
- **D1:** root `CLAUDE.md` says "Sprint 10 IN PROGRESS" while workstreams are at Sprint 12–13 —
  agents can resume finished/invalid work. Fix direction: single `docs/STATUS.md` as sprint-state
  source; CLAUDE.md only points to it.
- **D2:** model-routing table (Claude Haiku) contradicts implemented providers (gemini/groq/
  mistral).
- **D3:** `lemot-app/CLAUDE.md` autoskills guidance contradicts deliberate project choices
  (AsyncStorage pin, NativeWind 4 / Tailwind 3, lucide icons, standard tabs) — an agent
  "fixing" these can break auth. Fix direction: a small **PROJECT OVERRIDES** block outside the
  autoskills markers.
- **D4:** root CLAUDE.md says "for English speakers"; known target audience is Turkish speakers —
  clarify which is canon, fix the other.

**Privacy / security (§3–§4)**
- **G1:** no DELETE policy on any table — client-side data deletion silently affects 0 rows;
  KVKK/GDPR delete flow cannot work. Fix direction: service-role `delete-account` edge function
  (cascades exist) and/or delete policies.
- **Coverage gap:** `clearLocalLearningData` + export cover only engine keys
  (`lm_le_events`/`lm_le_snapshot`); real user data is `lm7`/`lm7_srs` + Supabase
  `user_progress`/`user_errors`. Partial export ≠ GDPR Art. 15/20 / KVKK m.11 compliance. Status
  label correction accepted: "GDPR/KVKK **foundation** implemented, coverage pending".
- **G2:** `ai-chat` accepts `system` and `maxTokens` from the client → general-purpose LLM proxy
  + unbounded cost. Fix direction: server-side mode-id allowlist, `maxTokens` clamp, simple
  per-user daily counter.
- **G3:** email confirmation disabled (Sprint 10 testing) — re-enable before beta.
- **G5 / KVKK m.9:** AI calls send user text to US processors (Google/Groq/Mistral) — a separate
  cross-border transfer needing explicit consent modeling + disclosure; legal review is an
  Operator task pre-launch.

**Content (§5)**
- **L15 recycle risk:** first post-paywall lesson drops recycle from 77% → 28% — pedagogical and
  commercial risk at the exact conversion moment. Cheap fix: seed L15 examples with M2 vocabulary.
- **fillFG `fr` debt:** 95 items across 19 lessons (L6–L24) lack the `fr` field — Weave's clean
  French TTS is silently absent in 79% of the curriculum. One agent-session of work.
- Faux-ami inconsistency (0 in L8/L20/L23) — verify intentional.

**Dependencies (§6)**
- 16 npm audit findings, none reachable in app runtime (build/dev tooling); action is plain
  `npm audit fix` (never `--force`) + `npx expo install --fix`, scheduled — not urgent.
- `async-storage@2.2.0` pin is deliberate (Supabase auth); harden the CLAUDE.md note to
  "DO NOT BUMP".
- Expo 55→56 and lucide 1.x: separate planned work, zero urgency.

**Scale debt (§2.2)**
- `processedClientEventIds` array + `.includes()` → O(n²) accumulation, never compacted, persisted
  in snapshot.
- `scoreEvents` replay copies the full items map per event.
- Both interact with sync SQLite reads; explicitly **later** (post-beta), tracked here so they are
  not lost.

## 4. Priority classification

| Priority | Meaning | Findings |
|---|---|---|
| **P0 — before next external tester / build candidate** | A tester APK or external person is affected | R1 (EAS env + `supabaseReady` banner), R2 (dev route gating), R3 (stage fallback fail-closed), G1 + delete/export full coverage (legal threshold for first external tester — pending decision DD3), G2 (`ai-chat` hardening — pending decision DD4), G3 (email confirmation re-enable) |
| **P1 — before L0–L24 build-out accelerates too far** | Wrong inputs compound as agent/engine work scales | D1–D4 docs sync (STATUS.md, PROJECT OVERRIDES, routing table, audience), audit-disposition tracking (this doc), "DO NOT BUMP" hardening for async-storage pin |
| **P2 — before public beta** | Real users / money / law | L15 recycle fix + 95 `fr` lines (before paywall conversion matters), KVKK m.9 transfer-consent modeling + disclosure list, CORS narrowing if web ships, R4 (versionCode/runtimeVersion/production profile), faux-ami consistency check |
| **Later / scale debt** | Real but harmless at founder scale | `processedClientEventIds` compaction, `scoreEvents` replay optimization, `npm audit fix` + `expo install --fix` hygiene window, Expo 56 / lucide 1.x upgrades, legacy `UNLOCK_RULES` `any` typing (dissolves with contract migration) |

**Note on engine work:** nothing in the audit blocks the matrix's engine PRs *technically* — but
P0/P1 guardrails are cheap (audit estimates: R1 ~10min, R2+R3 ~30min, G2 ~2h, docs sync 1–2h,
delete-account ~½ day) and every week of delay increases the blast radius of a silent failure.
Hence the re-ordering below.

## 5. Immediate next PR queue

**Deviation from the L0–L24 matrix order (deliberate):** the matrix's PR2/PR3
(`fill_with_traps`, `notice`) move **behind** a short guardrail block. The audit shows the
highest-leverage items are release/DX bridges, not engine features; doing them first protects
every subsequent tester build and agent session. Engine work resumes at PR-G unchanged.

| PR | Goal | Likely files | Validation | Risk | Type | Why now |
|---|---|---|---|---|---|---|
| **PR-A** | Land this disposition doc as the tracked queue | `docs/status/repo-audit-disposition-2026-06-09.md` | docs-only; suite stays green | none | **docs** | Makes the audit actionable; everything below cites a row |
| **PR-B** | Release config audit plan: EAS env strategy (R1) + dev-route/stage-fallback hardening plan (R2/R3) written as a checklist with exact commands; includes `supabaseReady` warning-banner spec | `docs/status/release-config-audit-2026-06.md` | docs-only | none | **docs** | R1 is the audit's #1 leverage item; the *plan* must exist before the Operator-touching env half can run; separates Operator steps (eas env) from code steps (PR-D) |
| **PR-C** | Docs sync: create `docs/STATUS.md` (single sprint-state source), add PROJECT OVERRIDES block to `lemot-app/CLAUDE.md` (outside autoskills markers), fix model-routing table, resolve audience wording (D4 needs DD-pre answer), harden async-storage "DO NOT BUMP" | `docs/STATUS.md`, `CLAUDE.md`, `lemot-app/CLAUDE.md` | docs-only; grep for stale sprint refs | low — wording only | **docs** | Every away-agent session consumes these as executable input; cheapest way to stop compounding wrong work |
| **PR-D** | Dev route gating + stage fallback hardening: copy the sandbox guard onto `app/dev/*`; fail-closed stage resolution in build context (invalid stage + `EAS_BUILD` → `dev-apk` or hard fail); `supabaseReady=false` visible banner in dev-apk | `app/dev/*.tsx`, `config/productStage.ts`, small banner component | typecheck, test:learning-engine, manual sandbox smoke | med-low — touches stage resolution; guarded by tests | **code** | ~30min of code closes two P0 holes (R2, R3) + the R1 visibility half |
| **PR-E** | `ai-chat` hardening: server-side mode-id allowlist (client sends mode id, server maps system prompt), `maxTokens` clamp, simple per-user daily counter | `supabase/functions/ai-chat/*` (+ shared util) | typecheck; manual fail-case QA; deploy itself is **Operator-only** | med — edge function change; cloud writes code, Operator deploys | **code** (deploy gated) | G2 is the open cost-abuse door; must close before any tester gets a build with AI on |
| **PR-F** | Privacy delete/export coverage **plan**: full-scope "delete all my data" wrapper spec (engine keys + `lm7` + `lm7_srs` + privacy state), service-role `delete-account` edge function design, export expansion to legacy+cloud, disclosure processor list (US transfer) | `docs/status/privacy-delete-export-coverage-plan.md` | docs-only | none | **docs** (implementation is a follow-up code PR + Operator deploy) | G1+coverage is the legal threshold for the first external tester (DD3); plan first because half the work is Supabase/Operator-gated |
| **PR-G** | `fill_with_traps` schema + validation (matrix PR2, unchanged) | `content/learning-engine/types.ts`, `validate.ts`, tests | typecheck, validate:content 0/0/0, new tests | low — additive | **code** | Engine build-out resumes; unblocks L3/L4/L5/L8 fixtures |
| **PR-H** | `notice` engine/card + `FillWithTrapsCard` (matrix PR3, unchanged) | `types.ts`, `components/learning-engine/`, `lessons/L2.*` | typecheck, tests, sandbox smoke `/learn/l2` | med — new cards; notice event must not pollute grading | **code** | Completes the P0 engine pair; recognition stats stop lying |

After PR-H the queue rejoins the matrix at its PR4 (pedagogical error tags) with guardrails in
place. L15 recycle + `fr` debt (P2) slots in as a content session once the first engine build-out
wave lands, unless DD6 pulls it earlier.

## 6. Decisions needed from user

| # | Decision | Affects |
|---|---|---|
| **DD1** | Does the Dev APK remain on frozen v1 until the engine shell (matrix PR7) survives founder smoke? (Same as matrix D4 — re-confirmed by the audit's three-systems finding) | Migration pacing; whether any v1 maintenance is ever justified |
| **DD2** | Supabase envs: define in EAS env (expo.dev) or commit to `eas.json` preview env (anon key is public by design)? | PR-B content; Operator workflow |
| **DD3** | Is `delete-account` (+ full-scope delete/export) **required before the first external tester**, or acceptable shortly after with disclosure? | Whether PR-F's implementation PR becomes a hard P0 gate |
| **DD4** | Is `ai-chat` enabled for testers **before** hardening lands? (Audit position: no — G2 is open cost abuse) | PR-E urgency; tester APK flag set |
| **DD5** | Does docs sync (PR-C) **block** further engine work, or run in parallel? (This doc assumes parallel-but-first) | Queue strictness |
| **DD6** | L15 recycle + 95 `fr` lines: before or after the first engine build-out wave (PR-G/PR-H)? Audit leans "one agent session, do it when paywall conversion becomes testable" | Content session scheduling |
| **DD-pre** | (feeds PR-C) Target audience canon: English speakers (current CLAUDE.md) or Turkish speakers (known direction)? One line; fixes D4 | All future content/agent work |

## 7. Non-goals

This document does **not** authorize:

- Home cutover (matrix D4 / DD1 stays an open decision)
- v1 expansion (v1 stays frozen per freeze checkpoint)
- DB deployment (any Supabase deploy/secret/dashboard work remains Operator-only; PR-E/PR-F code
  is written cloud-side, deployed by Operator)
- AI chat expansion (hardening ≠ expansion; chat stays gated per stage flags)
- paywall implementation
- dependency upgrades (`npm audit fix` / `expo install --fix` is a separately scheduled hygiene
  window; Expo 56 and lucide 1.x explicitly deferred)
- APK smoke/build (none until a build candidate exists)
- content production (L15/`fr` work is queued, not started)

## 8. Alignment with existing docs

- **`docs/status/dev-apk-v1-freeze-checkpoint.md`** — consistent: nothing here extends v1; the
  audit's three-systems finding *reinforces* the freeze (legacy gets bridges out, not investment).
- **`docs/status/v1-to-learning-engine-migration-notes.md`** — consistent: the audit's
  "connect renderer to contracts, lesson by lesson, no big bang" recommendation matches the
  migration notes' direction; this queue adds guardrails before that migration accelerates.
- **`docs/status/learning-engine-progress-bridge-decision.md`** — consistent: no fake `lm7`
  bridge markers are introduced; the privacy coverage work (PR-F) treats `lm7`/`lm7_srs` as
  legacy data to be *deleted/exported correctly*, not extended.
- **`docs/status/dev-apk-sandbox-route-contract.md`** — directly served: PR-D implements the
  contract's spirit for `app/dev/*` (the contract gates `/learn/*`; the audit found `dev/*`
  ungated — R2 closes that gap without changing the contract).
- **`docs/architecture/l0-l24-founder-build-matrix-v0.md`** — partially re-ordered: matrix PR2/PR3
  become PR-G/PR-H **after** the guardrail block (PR-B…PR-F); matrix PR4+ (pedagogical tags,
  L0/L1 fixtures, course map…) resume unchanged afterward. Matrix decisions D1–D8 remain open and
  are not duplicated here (DD1 = matrix D4 restated).

## 9. Recommendation

**Do one short release/DX guardrail sprint before `fill_with_traps`.**

Concretely: land PR-A…PR-F first (two docs-plans, one docs-sync, two small code PRs, one privacy
plan — roughly one to two founder days of cloud work plus Operator env/deploy steps), **then
return to engine build-out** at PR-G/PR-H and rejoin the matrix roadmap. The audit's estimates
make this cheap insurance: the guardrails cost hours, while their absence risks a silently broken
tester APK (R1), an open LLM proxy (G2), a failed legal deletion request (G1), and agent sessions
compounding stale-canon work (D1–D4) — each of which costs far more than the sprint that prevents
it.

---

*End of disposition. Supersedes nothing; tracked against audit `LeMot_Repo_Denetim_Raporu_2026-06-09.md`. Sync-queue note: the audit report itself lives operator-side on `~/Desktop`; importing it (or a redacted copy) into `docs/` is left to the Operator.*
