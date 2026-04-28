# Dev APK MVP Canon

> **Purpose**: Single source of truth for Claude Code and other AI agents working on the Le Mot Dev APK. When in doubt, defer to this document. If older notes (CLAUDE.md, Obsidian vault, brainstorm transcripts) conflict with this canon, **the canon wins**.

> **Scope**: This document governs Dev APK work only. Public beta and post-launch features are explicitly out of scope here — see the full design at `~/Desktop/ObsidianVault/01 Projeler/LeMot - User Journey.md`.

---

## 1. Product Philosophy

- **No XP.**
- **No streaks.**
- **No lives.**
- **No punishment.**
- **No hard-block progression.**
- **Weave is the core mechanic.**
- **AI is supportive, not the core product.**

These are not preferences. They are the product's identity. Any feature that violates one of these is wrong, regardless of how common it is in competing apps.

---

## 2. Dev APK Scope

The Dev APK ships with:

- **L1-L5 functional only.** L6-L24 lesson code may exist in the repo but must not be reachable in the Dev APK build.
- **No paywall.** No purchase prompts, no "premium" labels, no locked-lesson banners visible to the user.
- **No RevenueCat.** Do not add the SDK, do not stub it, do not wire entitlements.
- **No Word Graph.** The L9 demo and the full graph are post-MVP.
- **No Le Carnet.** Daily Review's "Yaz" mode is deferred.
- **No full Mon Lexique.** A minimal word list view is acceptable; AI question generation, AI sentence examples, and graph integrations are not.
- **No public monetization flow.** No subscriptions, no trials, no pricing screens, no "upgrade" CTAs.

If a feature is not on this list, default to **not building it** for the Dev APK.

---

## 3. Current Priority

The Dev APK lives or dies in the **first 3 minutes**.

- **First-use experience / Lesson Zero is more important than adding new features.** A user who closes the app in the first 3 minutes will not come back.
- **L1-L5 quality matters more than L6+ content.** Five excellent lessons beat twenty mediocre ones for Dev APK testing purposes.

When prioritizing tasks, ask: "Does this improve the first 3 minutes, or does it improve L1-L5?" If neither, it is probably out of scope for Dev APK.

---

## 4. What Not To Build Yet

These are explicit non-goals for Dev APK. Do not start them, do not scaffold them, do not "just stub" them:

- Do not build AI Chat expansion (modes beyond what already exists in-lesson).
- Do not build Word Graph.
- Do not build Dream Journal (Rüya Jurnali).
- Do not build Active Reading.
- Do not build RevenueCat.
- Do not build L80-related flows (ceremony, monolingual transition, exit-button toggle).
- Do not build advanced adaptive engine yet (no asymmetric modulation, no consolidation suggestions, no Pool selector logic — Pool 1 random selection is enough).

If a user request lands in this list, push back and confirm before implementing.

---

## 5. Copy Rules

These rules apply to all user-facing strings: UI labels, toast messages, error feedback, lesson copy, tooltips, push notifications, marketing surfaces.

### Avoid

- "XP gained"
- "streak"
- "level up"
- "goal complete"
- "premium unlock"
- Punishment language ("you failed", "wrong", "try again or you'll lose progress", "don't break your streak")

### Prefer

- "Used. Not memorized."
- "This word is becoming yours."
- "You used French today."
- "Take another look."
- "Not quite — try X because Y."

The pattern: **passive mirror of what the user did**, neutral acknowledgement of mistakes, specific guidance over generic encouragement. Reward language is banned. Theatrical positivity ("interesting attempt", "amazing!") is also banned — it reads as patronizing.

---

## 6. Implementation Priorities

Recommended sequence. Do not skip ahead — each phase makes the next one safer.

### Phase 1 — Foundation

1. Add product stage feature flags (e.g., `STAGE = "dev_apk" | "public_beta" | "wave_2"`) so Dev APK code paths can hide post-MVP features cleanly.
2. Remove XP (types, storage, hooks, providers, UI, cloud schema).
3. Disable paywall for Dev APK (hide banner, gate L6+ via stage flag instead of `FREE_LESSON_IDS`).

### Phase 2 — Lesson Zero

4. Build Lesson Zero — the first-launch experience that teaches the user what Weave is, sets the promise tone, and lands them in L1 with intent.
5. Simplify Home around **Today's Weave** — surface the next thing to do, not a full lesson list, not stats noise.
6. Make `FillItem.fr` required (TypeScript mandatory + ESLint + Pool generator validation). Back-fill L2-L5 + Pool 1 gaps before flipping the type.
7. Add pool validation (data integrity checks: blank answers exist in L1 vocab or `exposureGlossary`, no double-token bugs, no orphaned templates).

### Phase 3 — Polish

8. Polish L1-L5 (content audit, TTS coverage, copy passes per Section 5 rules, edge case fixes).

---

## Operating Notes for Agents

- When this canon and any other doc disagree, follow this canon and flag the conflict to the user.
- When in doubt about scope, ask "Is this on the Dev APK list (Section 2)?" before writing code.
- When writing user-facing copy, run it past Section 5 before shipping.
- When proposing a new feature mid-session, check Section 4 first — if it is on the do-not-build list, propose it for post-MVP instead.
