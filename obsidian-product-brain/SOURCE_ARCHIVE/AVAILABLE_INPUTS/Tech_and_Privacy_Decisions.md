---
status: active
type: decision
owner: mixed
last_reviewed: 2026-06-29
related_notes:
  - "[[AI Feedback Guardrails]]"
  - "[[Open Questions]]"
  - "[[Promotion Rules]]"
---

# Tech & Privacy Decisions

## Purpose

Durable technical/privacy decisions and open questions. Keep this practical; do not overbuild before product validation.

## Current Stance

- Round 1.1 priority is tester-ready APK and learning flow.
- Avoid backend/privacy architecture before validation unless required.
- Do not create future GDPR/KVKK traps through careless data collection.
- AI/network must not block core progression.
- Offline/local-first remains desirable early.

## Data Categories

- Local lesson progress.
- Attempts and weak-point signals.
- Audio/TTS interactions.
- AI feedback inputs, if enabled later.
- Account/auth data.
- Tester feedback.
- Private operator notes.

## Privacy Principles

- Collect the minimum needed.
- Do not send raw freeform learner input to AI unless designed and disclosed.
- Keep private/operator notes out of git.
- Do not log secrets.
- Treat tester data as sensitive.
- Analytics should be purposeful, not surveillance.

## Cloud/Backend (provisional)

- These architecture notes are provisional until product validation creates a real requirement.
- Cloudflare vs Supabase remains open.
- Do not lock backend before validation unless a clear requirement appears.
- Core lesson progression should survive AI/network failure.

## KVKK/GDPR

- Important once accounts, analytics, AI, or production rollout begin.
- Less urgent for local/dev APK smoke, but still relevant.
- Future needs: policy, consent, deletion path, analytics disclosure, processor list.

## Historical Source Pointers

- [[LeMot - User Journey]] and [[Canon Merge Report 2026-05-16]] contain older privacy, retention, storage-cap, telemetry, and AI-cost-cap ideas.
- Treat them as provisional source material; revalidate before implementation or repo promotion.

## Decision Log Format

Use this shape for durable decisions:

| Date | Decision | Context | Status | Risk | Revisit trigger |
|---|---|---|---|---|---|

## Current Open Decisions

- Cloudflare vs Supabase.
- Analytics event schema.
- AI feedback data handling.
- Account/auth timing.
- Tester consent wording.
- Data retention.

Track unresolved decision ownership in [[Open Questions]].
