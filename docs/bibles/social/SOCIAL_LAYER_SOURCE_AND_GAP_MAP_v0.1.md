---
title: Cairn Social Layer — Source & Gap Map
version: 0.1
status: Supporting record for the Canonical Social Layer Charter v1.0 — not independent canon
authority: Read-only provenance map (authorizes nothing)
founder_decisions: Q1 (2026-07-25) · R1, R2, R5, R6, R8, R9, R10, R11 resolved (2026-07-25) · R3, R4, R7 dormant
owner: Social Layer
depends_on:
  - Cairn Product Brain v1.0
  - Cairn Content Bible v1.0
created: 2026-07-24
related:
  - SOCIAL_LAYER_CHARTER_v1.0.md
  - SOCIAL_LAYER_IDEA_AND_DECISION_REGISTER_v0.1.md
---

# Cairn Social Layer — Source & Gap Map v0.1

> **What this is.** The provenance backbone for the Social Layer Charter and Register. It records exactly which repo sources were swept, what each contributed, what is authoritative vs. historical, what could not be reached, where sources conflict, and — most importantly — where the record is *blank* (no source at all). Read-only; authorizes nothing.
>
> **Headline (corrected · Q1 + R1–R11 ratified).** The repository contains no positive social-feature *implementation*, and that remains true. But repository silence is **not** proof of a negative product decision. A prior **founder conversation** supplied real product-direction evidence — a structured, moderated, lesson-connected community concept — that the repo did not durably hold; the founder has now **ratified it as a preserved future direction (Q1, 2026-07-25)** and **set its boundaries (R1–R11, 2026-07-25)**. The finding: *current product is solo-first with no social build; a bounded structured-community direction is founder-ratified as post-MVP with no implementation commitment; its boundaries (evidence, identity, gamification, under-13, governance) are now locked; and the repo's earlier silence was a source-coverage limitation, not a decision to be permanently solo.*
>
> **Provenance shift worth noting:** the highest-authority Social source is no longer the repo sweep or the conversation — it is the in-repo [`SOCIAL_LAYER_FOUNDER_RATIFICATION_v0.1.md`](SOCIAL_LAYER_FOUNDER_RATIFICATION_v0.1.md). The durability gap that motivated this map is now **largely closed for decisions**, while remaining open for *design detail* (moderation model, evidence contract, under-13 reopen requirements).

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
| **Founder decisions Q1 + R1–R11 (2026-07-25)** | [`SOCIAL_LAYER_FOUNDER_RATIFICATION_v0.1.md`](SOCIAL_LAYER_FOUNDER_RATIFICATION_v0.1.md) — durable, in-repo | **Highest-authority Social source.** Q1 preserved the direction; R1–R11 set the boundaries: form confirmed (SOC-030) · loyalty community external for current scope (SOC-020) · privacy-safe identity default (**SOC-033**) · broad public UGC/feed rejected (SOC-021) · evidence firewall stated precisely (SOC-026) · social anti-gamification permanent (**SOC-034**) · under-13 locked with reopen gate (SOC-028) · governance accepted (SOC-025). R3/R4/R7 dormant. **Authorizes no implementation.** |

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

These remain true gaps — **no source proposes them**, in-repo *or* in founder discussion (all registered `OPEN`, authority `None (unsourced)`):

- No proposal for peer practice / speaking partners (SOC-018) — *dormant by decision (R4).*
- No proposal for profiles / follows / social graph (SOC-019) — **not** inferred from the community direction; now *bounded* by the identity default (SOC-033) without being approved.
- No referral/invite decision (SOC-022).
- No learner-facing cohort/group-learning proposal (SOC-023) — *dormant by decision (R7).*
- No decision on user-initiated *outward* sharing (SOC-024) — re-scoped by R6 to Product/UX/Brand/Privacy; still undecided.

**The blank is the finding for these** — captured so no future session mistakes silence for a decision, and so the community direction is **not** over-read to imply them.

> **Closed since the first draft (no longer blanks):** broad public UGC / community feed — now **decided** (`REJECTED`, R6, SOC-021, with direct founder authority); in-app vs. external home for the Lifetime *loyalty* community — now **decided** for current scope (external, `DEFERRED`, R2, SOC-020).
>
> **A different kind of gap, newly created by R8:** the **evidence contract** that R8 requires before any social pedagogical action could count as evidence **does not exist**. This is not an unsourced blank — it is a *deliberately deferred design artifact*. Until it exists, **no social action is evidence.**

> **No-longer-blank (moved out of §6 by the correction):** ask-questions, compare-attempts, alternative/approved explanations, structured reflections, and belonging value are **not** blind spots — they are `Founder (conversation)`-sourced (SOC-029/030/032). The prior draft wrongly listed the whole community family here.

## 7. Indirect-only evidence (inferred, not stated)

**Still indirect (inference, not a founder statement):**

- **SOC-024 "leans rejected"** — no source rejects user-initiated *outward* sharing *by name*, but ADR-0002 (passive mirror) + ADR-0001 (anti-gamification) + SOC-004 (no pressure) make it likely to be rejected if scoped. Recorded as *leaning*, **not decided**; still `OPEN`, routed to Product/UX/Brand/Privacy.

> **No longer indirect — decided directly by the 2026-07-25 founder decisions.** These four were inferences in the pre-ratification drafts and must **not** be read as inference any more:
>
> - **SOC-021 broad public UGC / community feed** — **directly `REJECTED` by R6.** Not "lean rejected", not inferred (cf. §§1, 6 and the Register). Binding boundary with direct founder authority.
> - **SOC-025 governance rule** — **ACCEPTED by R11** and now `FOUNDER_LOCKED`. No longer "proposed, not canon."
> - **SOC-020 external-vs-in-app** — **decided by R2** for the current scope (external; in-app integration `DEFERRED`). No longer an open inferred axis.
> - **SOC-017 preserve-vs-archive** — the framing was this package's synthesis, but the **question was put to the founder and answered YES (Q1)**. The decision is founder-sourced; only the original framing was synthesis.

## 8. Founder-reconstruction needed (only the founder can close)

**Largely closed by the 2026-07-25 decisions:**

- **SOC-017 (root) — RESOLVED:** preserve as deferred direction (Q1 = YES). *(The "is solo permanent" framing was the over-reach and is retired.)*
- **SOC-020 (loyalty community home) — RESOLVED for current scope:** external (R2); future in-app integration `DEFERRED`.
- **SOC-030 form · SOC-021 rejected form · SOC-026 evidence · SOC-028 under-13 · SOC-033 identity · SOC-034 gamification · SOC-025 governance — all ratified** (R1, R6, R8, R10, R5, R9, R11).

**Still requiring founder reconstruction (not blocking):**

- **SOC-029/032 detail:** the moderation model, the QA/authority rule for "approved" and "highlighted" answers, and phasing. R3 deliberately left primitives dormant, so this is *intentionally* unresolved rather than missing.
- **The evidence contract itself (SOC-026):** R8 permits a future social pedagogical action to count as evidence *only* under a separately ratified evidence contract. **No such contract exists.** Designing one is a future Content/Engineering + founder task.
- **Under-13 reopen requirements (SOC-028):** the child-safety, consent, legal, privacy, moderation, retention, identity, and operational design — plus independent review — that the reopen gate demands. None of it exists yet, by design.
- Whether any of the §6 genuinely-blank items were ever verbally decided in the vault.

None of these block Charter sign-off; each is either dormant by decision or gated behind a future explicit opening (§19 / R11).

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

**Overall:** current-scope reality is captured near-completely; the community *direction* is captured from founder discussion **and ratified (Q1 + R1–R11, 2026-07-25)**; the loyalty-community home is decided for current scope. Residual uncertainty is now concentrated in **design artifacts that were deliberately deferred, not in missing evidence**: (a) the moderation model and QA/authority rule for approved/highlighted answers, (b) **the evidence contract R8 requires**, (c) the under-13 reopen requirement set R10 demands, and (d) inaccessible vault notes. All are flagged for founder/operator, not guessed.

**Coverage of *decisions* is now high; coverage of *design* is intentionally near-zero** — which is the correct state for a layer with no implementation authority.

*End of Source & Gap Map v0.1. Read-only; authorizes nothing.*
