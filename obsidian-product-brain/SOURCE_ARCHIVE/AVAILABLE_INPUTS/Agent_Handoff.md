---
status: active
type: workflow
owner: mixed
last_reviewed: 2026-06-29
related_repo_paths:
  - docs/README.md
  - docs/STATUS.md
  - docs/DEV_APK_MVP_CANON.md
  - docs/DEV_APK_SMOKE_TEST_CHECKLIST.md
---

# Agent Handoff

> [!ai] Read this first
> Compact current context for Claude, Codex, and ChatGPT. This note is private-vault guidance; repo docs still win for repo/build work.

## Start Here

1. [[Cairn Codex]]
2. [[Home - Le Mot]]
3. [[PR and Smoke Log]]
4. [[Backlog and Deferred]]
5. [[Open Questions]]
6. [[Promotion Rules]]
7. Repo docs: `/Users/<operator>/Projects/lemot/docs/README.md`, then `docs/DEV_APK_MVP_CANON.md`, `docs/STATUS.md`, `docs/DEV_APK_SMOKE_TEST_CHECKLIST.md`.

## Task-Specific Deep Reads

- Lesson/content work -> [[Lesson Quality Rubric]], [[Content Authoring Rules]]
- AI feedback work -> [[AI Feedback Guardrails]]
- Engine work -> [[Learning Engine & Exercise Types]]
- Syllabus work -> [[Syllabus Delta Log]]
- Design/brand work -> [[Brand & Naming Canon]], [[Visual Design Canon]]
- Architecture/privacy work -> [[Tech & Privacy Decisions]]
- Workflow/process work -> [[Agent Workflow Playbook]]

## Current State

- Repo: `/Users/<operator>/Projects/lemot`.
- Current main: `2df346996e31774c3c1e7ba4e07274963865116a` (Round 1.2 stopping point, #155 + #156). Round 1.1 baseline was `8cfdce75` (#154).
- Working tree clean; `main == origin/main`.
- Round 1.1: **GO / tester-ready** — APK built, physically spot-checked by Haktan (TTS OK, no blocker). Tester 1 completed L0-L6 positively (one Weave salience signal). EAS/APK URLs recovered + recorded privately in [[PR and Smoke Log]].
- Round 1.2: #155 (Weave branding/salience) + #156 (L3 recap `oui` cleanup) **merged to main but NOT yet APK/smoke-validated** — code-validated only (328/328 tests).
- Round 1.2 workflow: don't build/smoke per small PR; batch the APK + checklist smoke, log the vault at stopping points.

## Recent PRs To Remember

- #151 `17eec7b`: Weave label/tone fix.
- #152 `5f967ec`: Say It Your Way confirmation step.
- #153 `ed85c07`: L2/L4/L5 content-chip cleanup.
- #154 `8cfdce75`: L2 `ici` chip coverage (Round 1.1 baseline main).
- #155 `5f27eee`: Round 1.2 — restore Weave branding + clarify target prompt (badge, `Say this:`/open-suppressed, dominant target, helper, `Your try`).
- #156 `2df3469`: Round 1.2 — remove passive `oui` from L3 recap; **current main**.

## Active Next Action

Round 1.2 (#155, #156) is on main but **not yet APK/smoke-validated**. Recommended next: either continue any remaining small Round 1.2 PRs, or run one **Round 1.2 batch APK build + checklist smoke** (the deferred visual eyeball — see [[PR and Smoke Log]] for the specific render checks), then log the result here and in [[PR and Smoke Log]]. If a request touches runtime, read repo docs before editing. Two merged branches (`round1.2-weave-ux-batch`, `fix/l3-recap-remove-oui`) are kept until you say otherwise.

## Non-goals / Do Not Touch

- Do not modify app code unless explicitly asked in a new implementation task.
- Do not touch package/lock files from a notes task.
- Do not push, commit, or open PR without explicit instruction.
- Do not create another vault.
- Do not duplicate repo docs into Obsidian.
- Do not revive L7+, paywall, Practice/Chat, Mon Lexique runtime, Word Graph, V4-B redesign, or AI expansion from this handoff.
- Do not put secrets, raw tester identity, private APK links, or private operator notes into repo-safe docs.

## Working Rule

If private Obsidian notes and repo current-build canon disagree, follow repo current-build canon for implementation and record the gap. Use [[Promotion Rules]] before moving anything from private notes into git.

Legacy notes are source material only. Check [[Notes Archive Index]] before treating any older note as active guidance.
