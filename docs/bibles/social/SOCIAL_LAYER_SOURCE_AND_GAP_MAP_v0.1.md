---
title: Cairn Social Layer — Source & Gap Map
version: 0.1
status: Draft — awaiting founder ratification
authority: Read-only provenance map (authorizes nothing)
owner: Social Layer
depends_on:
  - Cairn Product Brain v1.0
  - Cairn Content Bible v1.0
created: 2026-07-24
related:
  - SOCIAL_LAYER_CHARTER_v0.1.md
  - SOCIAL_LAYER_IDEA_AND_DECISION_REGISTER_v0.1.md
---

# Cairn Social Layer — Source & Gap Map v0.1

> **What this is.** The provenance backbone for the Social Layer Charter and Register. It records exactly which repo sources were swept, what each contributed, what is authoritative vs. historical, what could not be reached, where sources conflict, and — most importantly — where the record is *blank* (no source at all). Read-only; authorizes nothing.
>
> **Headline (corrected + Q1-ratified).** The repository contains no positive social-feature *implementation*, and that remains true. But repository silence is **not** proof of a negative product decision. A prior **founder conversation** supplied real product-direction evidence — a structured, moderated, lesson-connected community concept — that the repo does not durably hold, and the founder has now **ratified it as a preserved future direction (Q1, 2026-07-25)**. The finding: *current product is solo-first with no social build; a bounded structured-community direction is founder-ratified as deferred/post-MVP with no implementation commitment; the repo's earlier silence was a source-coverage limitation, not a decision to be permanently solo.*

---

## 1. Sources reviewed (swept for this capture)

| Source | Path | What it contributed |
|---|---|---|
| Root project instructions | `CLAUDE.md` | The explicit "Do NOT add social features / leaderboards / gamification" line (SOC-001, SOC-002); banned-language list (SOC-004). |
| Master Pipeline | `docs/MASTER_PIPELINE_v1.2.1.md` | Rule 3 (deprecated language ban), Rule 4 (no Duolingo reward loops) — anti-gamification framing (SOC-002/003/004). |
| Product Brain | `obsidian-product-brain/ACTIVE_CODEX/00_CAIRN_PRODUCT_BRAIN/CAIRN_PRODUCT_BRAIN_v1.0.md` | §17 Deliberate Non-Goals (SOC-001); §11 AI Philosophy (SOC-008); §14 Campfire (SOC-010); PB-068 Lifetime community (SOC-009); audience non-goals — children, gamification, open AI companion (SOC-028, SOC-008). |
| Full-app build spec | `docs/CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md` | "Home must not show leaderboard/streak-pressure" (SOC-003); §3090 "A1 Social Survival" content (SOC-011); §3766 "friendly status mapping" (SOC-012). |
| Content Bible | `docs/bibles/content/CONTENT_BIBLE_v1.0.md` | Confirms solo learning model; social language as content not feature (SOC-011); no social mechanics introduced. |
| Content Bible authority files | `CONTENT_BIBLE_RATIFICATION_PACK_v0.1.md` and companions | Explicit deferral: "No Social Bible / community / social-layer work… Deferred until after Content Bible ratification" — the gate that now permits this capture. |
| ADRs (referenced) | ADR-0001, ADR-0002, ADR-0023 | Anti-gamification (SOC-002/005), passive mirror (SOC-005), privacy local-first + consent (SOC-006/027). |
| Dev-APK canon | `docs/DEV_APK_MVP_CANON.md` | Chat tab gated off (SOC-013); dev-apk scope excludes social surfaces. |
| Status / ops drafts | `docs/status/founder-self-learning-*`, `remote-schema-rls-draft` | Tester cohort + admin analytics = ops/privacy (SOC-015); RLS/consent partial (SOC-006). |
| Future-features / idea indexes | Future Features / Idea Index / Unmapped Ideas notes | Only solo ideas (Word Graph, Le Carnet, Dream Journal, Mon Lexique) — SOC-014, SOC-016. **No social proposal in these notes.** |
| **Founder conversation (prior discussion)** | Not a repo file — distilled founder-discussion evidence supplied to this correction | The **structured, moderated, lesson-connected community direction**: ask questions, compare attempts, alternative/approved explanations, belonging/"less alone" value; heavily moderated & bounded; post-MVP/v2; not implementation-committed; open-forum form disfavoured. → SOC-029, SOC-030, SOC-031, SOC-032. **Product-direction evidence the repository does not durably hold.** |

## 2. Current authoritative sources (bind today)

- **`CLAUDE.md`** — governing "no social features / no gamification" stance.
- **Cairn Product Brain v1.0** — §17 non-goals, §11 AI, §14 Campfire, PB-068, audience non-goals.
- **ADR-0001 / ADR-0002 / ADR-0023** — anti-gamification, passive mirror, privacy/consent.
- **Cairn Content Bible v1.0 (Canonical)** — solo content model; social-as-content.
- **Build spec v1.0** — no leaderboard/streak-pressure; social-survival content theme.
- **Founder conversation (prior discussion)** — *direction* evidence, not implementation canon: the structured, moderated, lesson-connected community concept (SOC-029/030/031/032). Binds as **deferred product direction**, recorded at `DEFERRED` / `RATIFIED_DIRECTION`, never as Canonical or PLANNED.

These are the sources a future session must treat as binding when reasoning about the Social Layer. **Distinction:** the repo sources bind *current implementation scope* (solo-first, no social build); the founder conversation binds *product direction* (a real deferred community concept). Neither cancels the other — current-scope silence is not a permanent product decision.

## 3. Historical / archive sources (inform, do not bind)

- **Legacy AI Chat (4 modes)** — described in `CLAUDE.md` legacy state; superseded/gated (SOC-013). Historical.
- **Old Sprint/roadmap language** in `CLAUDE.md` legacy banner and MASTER_PIPELINE — explicitly marked legacy; not active social direction.
- **Merged Product Canon 2026-05-11** — partially harvested; not top-level active canon (per MASTER_PIPELINE). No social content pulled forward.

## 4. Inaccessible sources (reported, not guessed)

- **Operator Obsidian vault** (`~/Documents/Smart Brain/01 Projeler/LeMot/`, `~/Desktop/...`) — inaccessible from cloud ("Operation not permitted"). May contain raw founder discussion that touches community/social intent. **Not read; not guessed.**
- **`v1 Canon TOP`, `LeMot - User Journey.md`, `Q1–Q6 / D1–D6` locked-decision detail** — operator-vault only; only the fragments reflected in repo canon were used.
- **Any private founder notes on the Lifetime community's shape** — if they exist, they are vault-side. SOC-009/SOC-020 are captured only to the depth the repo supports.

If any of these vault sources contains a social/community decision, it must be surfaced by the operator and folded in — the Charter's `OPEN`/`DEFERRED` items may be further detailed there. **The founder-conversation community direction (SOC-029–032) is one such item whose raw transcript is not in-repo:** its durable form now lives in this draft package (Charter §7, Register SOC-029–032); the original discussion's full detail may still be incomplete and could be enriched from vault material.

## 5. Conflicts between sources

**No source-to-source contradiction.** The repo sources and the founder conversation do not conflict — they describe **different layers**: repo = *current implementation scope* (solo-first, no build); conversation = *product direction* (deferred structured community). The only real error was **internal**, in this package's first draft: a repository-only sweep over-concluded "permanent solo is canonical." That over-reach is corrected here (see §10). Remaining tensions are definitional and resolved by disambiguation:

- "Social Survival" (content) vs. "social layer" (feature) — resolved: content theme (Charter §18, SOC-011).
- "Community" (Lifetime loyalty, SOC-009) vs. "learning community" (SOC-029) — resolved: two distinct records, never conflated (Charter §7).
- "No social features (current scope)" vs. "deferred community direction" — resolved: scope fact vs. product direction; not a conflict (Charter §2/§6).
- "Campfire" (warmth motif) vs. multiplayer — resolved: solo (SOC-010).

## 6. Blind spots (where the record is genuinely blank)

These are the true gaps — **no source exists**, in-repo *or* in founder discussion:

- No proposal for peer practice / speaking partners (SOC-018).
- No proposal for profiles / follows / social graph (SOC-019) — **not** inferred from the community direction.
- No proposal for broad / unrestricted UGC (SOC-021) — distinct from the *bounded, moderated* attempt-comparison the founder discussed (SOC-032).
- No referral/invite decision (SOC-022).
- No learner-facing cohort/group-learning proposal (SOC-023).
- No outward progress-sharing decision (SOC-024).
- No decision on whether the Lifetime *loyalty* community is in-app or external (SOC-020).

Each is registered `OPEN` with authority `None (unsourced)`. **The blank is the finding for these** — captured so no future session mistakes silence for a decision, and so the community direction is **not** over-read to imply them.

> **No-longer-blank (moved out of §6 by the correction):** ask-questions, compare-attempts, alternative/approved explanations, structured reflections, and belonging value are **not** blind spots — they are `Founder (conversation)`-sourced (SOC-029/030/032). The prior draft wrongly listed the whole community family here.

## 7. Indirect-only evidence (inferred, not stated)

- **SOC-021/024 "lean rejected"** — no source rejects broad UGC/outward-sharing *by name*, but ADR-0002 (passive mirror) + ADR-0001 (anti-gamification) + SOC-004 (no pressure) + the founder's disfavour of the open-forum form (SOC-031) make them likely to be rejected if scoped. Recorded as *leaning*, not decided.
- **SOC-025 governance rule** — derived from the "exception must be granted" logic, not stated as a rule anywhere. Proposed, not canon.
- **SOC-020 external-vs-in-app** — inferred as an open axis from PB-068 describing a "community" without an app surface. Inference, flagged.
- **SOC-017 reframed as preserve-vs-archive** — inferred from combining the current-scope solo fact (SOC-001) with the founder-discussed direction (SOC-029). The *existence* of the direction is founder-sourced; the *framing as a preserve/archive choice* is this Charter's synthesis, flagged.

## 8. Founder-reconstruction needed (only the founder can close)

- **SOC-017 (root) — RESOLVED 2026-07-25:** founder chose **preserve as deferred direction** (Q1 = YES). No longer open; recorded with decision history. *(The "is solo permanent" framing was the over-reach and is retired.)*
- **SOC-029/030/032:** further detail on the intended community form and which primitives matter — the distilled, now-ratified direction is captured; the full discussion may hold more (moderation model, QA authority for highlighted answers, phasing).
- **SOC-009/020:** the intended shape and home of the Lifetime *loyalty* community.
- Whether any of the §6 genuinely-blank items were ever verbally decided in the vault.

The SOC-017 root is now answered; the remaining items require future founder answers (see Charter §23 R1–R11).

## 9. External-policy considerations (flagged, not researched)

Per task constraints, **no web research was performed.** The following are flagged as *considerations the founder/Privacy-Legal must weigh if SOC-017 is ever YES* — not findings, not researched, not decided here:

- App-store policy for user-to-user communication and moderation obligations.
- Minor-safety / age-gating law if any social surface exists (interacts with SOC-028).
- Data-residency and consent law for cross-user data visibility (interacts with SOC-006/027).

These are named so they are not forgotten; they are explicitly out of scope for this capture.

## 10. Coverage estimate (corrected)

- **Anti-gamification / constraint canon: ~95% captured.** The founder-locked constraints and their ADR/PB backing are well represented in-repo and fully swept.
- **Current implementation scope (solo-first, no social build): ~100% captured.** The repo is clear and consistent that nothing social is built.
- **Positive social *direction*: now captured via founder conversation.** The prior "~0 positive ideas" estimate was **wrong** — it reflected a repository-only sweep. The structured community direction (SOC-029/030/032) and the open-forum rejection (SOC-031) are the real positive/negative direction evidence, now recorded.
- **Structured-community detail: ~60%.** The concept, value, form-preference, and candidate primitives are captured; finer detail (exact moderation model, QA authority for highlighted answers, phasing) may live in vault/discussion not reachable here.
- **Lifetime-loyalty-community detail: ~40%.** Concept captured; shape/home lives in founder/vault context.
- **Genuinely-unsourced features (profiles, follows, DMs, graph, referral, cohort, broad UGC): captured as blanks.** ~100% captured *as blanks* — exhaustively listed in §6, explicitly not inferred.

**Correction of the record:** the first draft's estimate — "positive social features ~100% captured, which is ~0; absence is canonical" — conflated *no repository implementation* with *no product intent*. That was a **source-coverage limitation, not proof of a negative decision.** Adding the founder-conversation source class closes that error.

**Overall:** current-scope reality is captured near-completely; the community *direction* is now captured from founder discussion **and ratified (Q1, 2026-07-25)**; residual uncertainty is concentrated in (a) finer community-form detail (moderation model, QA authority, phasing), (b) the Lifetime-loyalty community's home, and (c) inaccessible vault notes. The SOC-017 root decision is now closed; remaining items are flagged for founder/operator, not guessed.

*End of Source & Gap Map v0.1. Read-only; authorizes nothing.*
