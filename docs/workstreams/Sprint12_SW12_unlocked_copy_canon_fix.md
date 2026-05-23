# Sprint 12 SW12 — Unlocked Copy + Icon Canon Fix

## Workstream name
Sprint 12 SW12 — Replace visible reward/unlock copy AND icons in the enrichment reveal with calm passive-mirror equivalents.

## Branch
`claude/sprint12-sw12-unlocked-copy-canon-fix` (branched from `main` at `873efea`, post PR #12 merge).

## Tier
LM-1 / LM-2 — micro copy / canon-tone fix. Two component files + spec. No logic, no data, no behavior change.

## Problem statement
The dev-apk emulator pre-smoke (main @ `873efea`) confirmed live reward/unlock-style copy in the lesson enrichment reveal, which conflicts with Le Mot's passive-mirror / no-reward-unlock-framing direction (`docs/MASTER_PIPELINE_v1.2.1.md` §9 Rule 3: forbidden gamification language; BRAND mirror tone).

Two visible strings render the reward framing:

- `lemot-app/components/TransitionScreen.tsx:77` — the enrichment reveal header text `Unlocked!` (amber, with a `Sparkles` icon), shown whenever a section transition carries an `unlock` payload.
- `lemot-app/components/UnlockCard.tsx:60` — the card eyebrow label `{upperEn(`${cfg.label} Unlocked`)}`, which renders all-caps `EXPRESSION UNLOCKED`, `GRAMMAR NUGGET UNLOCKED`, `FAUX AMI UNLOCKED`, `CULTURE BITE UNLOCKED`, `SOUND PATTERN UNLOCKED` for the five enrichment types.

## Emulator evidence
Captured during the dev-apk pre-smoke (Pixel_8, Expo Go, `EXPO_PUBLIC_PRODUCT_STAGE=dev-apk`):

- Opened L1 "Survival Kit" → Part 1: Learn → completed the **Read & Listen** section (0/7 → 1/7).
- The completion transition screen displayed: **"✨ Unlocked!"** above an **"EXPRESSION UNLOCKED"** card revealing the expression *Voilà — There you go / Here it is*.
- This is runtime-visible in the tester surface, not only a static grep hit.

## Scope
Single product intention: replace the visible reward/unlock strings AND their reward-style icons with calm passive-mirror equivalents. No structural, behavioral, navigational, or data change.

### Allowed files
- `lemot-app/components/TransitionScreen.tsx` — reveal header text + reward icon (`Sparkles` → `Plus`).
- `lemot-app/components/UnlockCard.tsx` — eyebrow label text + header icon (`Unlock` → `Plus`); drop the now-unused `upperEn` import.
- `lemot-app/app/lesson/[id].tsx` — inline chunk-end unlock reveal icon (`Sparkles` → `Plus`) only; text was already "Added.".
- `docs/workstreams/Sprint12_SW12_unlocked_copy_canon_fix.md` — this spec.

### Forbidden scope
- No `productStage.ts` flag changes.
- No Supabase / schema / `package.json` / `package-lock.json` / EAS config.
- No sync / auth / storage / AppProvider.
- No lesson content / pools / item registry.
- No `docs/CLOUD_SYNC_QUEUE.md`.
- No enrichment reveal behavior, navigation, component structure, or data shape changes.

## Copy changes
| File | Before | After |
|---|---|---|
| `TransitionScreen.tsx` reveal header | `Unlocked!` | `Added.` |
| `UnlockCard.tsx` eyebrow label | `{upperEn(`${cfg.label} Unlocked`)}` → e.g. `EXPRESSION UNLOCKED` | `{`${cfg.label} added`}` → e.g. `Expression added` |

`upperEn` import removed from `UnlockCard.tsx` (only consumer was the changed line). Sentence case chosen over the prior all-caps eyebrow to match the calmer passive-mirror intent.

## Icon changes
The two reward-style enrichment icons were neutralized to a calm `Plus` ("added") glyph in the same PR (per review concern):

| File | Before | After |
|---|---|---|
| `TransitionScreen.tsx` reveal header icon | `Sparkles` (celebratory) | `Plus` (neutral "added"), same `size`/`color` |
| `UnlockCard.tsx` card header icon | `Unlock` (open padlock) | `Plus` (neutral "added"), same `size`/`color` |
| `app/lesson/[id].tsx` inline chunk-end unlock reveal icon (~ln 762) | `Sparkles` (celebratory) | `Plus` (neutral "added"), same `size`/`color` |

`Sparkles` import removed from `TransitionScreen.tsx`; `Unlock` import replaced with `Plus` in `UnlockCard.tsx`; `Plus` added alongside the retained `Sparkles` in `lesson/[id].tsx`. Icon size and color are unchanged — only the glyph.

The inline chunk-end reveal in `lesson/[id].tsx` (`{trans.unlock && …}`) is a **second enrichment-reveal path** distinct from `TransitionScreen`; its copy was already "Added." but the `Sparkles` icon had been left behind. Now aligned.

**Left unchanged (decorative, not unlock/reward reveal):** `app/lesson/[id].tsx` (~ln 855) `Sparkles` heads the end-of-lesson **"What you learned today"** summary/recap card — an informational recap header, not an enrichment/unlock reveal, so it stays per scope. Flagged as a borderline celebratory glyph for a separate product decision. (Also out of scope: `components/sections/SayItYourWay.tsx` `Sparkles` — AI free-write section icon, not unlock/reward reveal.)

## Out of scope (flagged, not changed)
- `TransitionScreen.tsx` `Star` icon + `{correctCount}/{totalCount} correct` score display is neutral scoring (not unlock/reward wording) and is left unchanged. If the amber-filled "perfect accuracy" star is later judged too reward-like, that is a separate score-display decision.

## Acceptance criteria
1. No user-visible `Unlocked` / `UNLOCKED` text remains in the enrichment reveal.
2. The reveal header reads `Added.` and the card eyebrow reads `Expression added` (+ equivalents for the other four labels), each preceded by a neutral `Plus` glyph — no `Unlocked`/`UNLOCKED` text and no `Sparkles`/`Unlock` reward icon remains.
3. Enrichment reveal still triggers on the same `unlock` payload, same card, same five types, same navigation (`onNext`/`Continue`).
4. No flag, data, schema, or behavior change.
5. `npm run typecheck` exits 0.
6. `npm run validate:pools` exits 0 with the same 6 pre-existing legacy warnings.
7. `git diff --check` clean.

## Verification
```bash
cd lemot-app
npm run typecheck
npm run validate:pools
```
Plus `git diff --check` and a static grep for residual reward/unlock wording.

## Manual re-smoke note (Operator)
Re-run the dev-apk emulator smoke for one section transition that carries an enrichment unlock (e.g. L1 "Survival Kit" → Part 1: Learn → complete **Read & Listen**). Confirm:
- Header reads **"Added."** (not "Unlocked!"), preceded by a plain **`+`** icon (not the ✨ sparkles).
- Card eyebrow reads **"Expression added"** (not "EXPRESSION UNLOCKED"), with a plain **`+`** icon (not the open-padlock).
- The enrichment card content (Voilà …) still reveals normally and **Continue** still advances.

## Review status
- Code edits: applied to `TransitionScreen.tsx`, `UnlockCard.tsx` — pending verification + operator approval.
- Spec: this file.
- PR: not yet opened.
- Commit: pending operator approval phrase (review-then-commit).
