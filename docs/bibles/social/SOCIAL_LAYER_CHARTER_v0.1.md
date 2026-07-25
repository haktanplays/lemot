---
title: Cairn Social Layer Charter
version: 0.1
status: Draft — awaiting founder ratification
authority: Proposed Social Layer canon (this document canonizes nothing)
owner: Social Layer
depends_on:
  - Cairn Product Brain v1.0
  - Cairn Content Bible v1.0
created: 2026-07-24
related:
  - SOCIAL_LAYER_IDEA_AND_DECISION_REGISTER_v0.1.md
  - SOCIAL_LAYER_SOURCE_AND_GAP_MAP_v0.1.md
---

# Cairn Social Layer Charter v0.1

> **Draft. Awaiting founder ratification. Canonizes nothing.**
>
> This Charter is the first attempt to give the "social layer" of Cairn a single, honest home. Its central finding, stated precisely:
>
> **Cairn is currently solo-first and has no active social implementation commitment. A bounded, structured, heavily-moderated, lesson-connected community layer is now a founder-ratified *future direction* (Q1, 2026-07-25 — "preserve as deferred direction"), post-MVP, with no implementation commitment; a classic open forum is explicitly rejected as its form.** The current absence of a social build is an implementation/scope fact, **not** a permanent product decision, and must not be described as "canonical permanent solo."
>
> **Founder decision on file (Q1, 2026-07-25):** *Cairn will preserve a structured, lesson-connected, heavily-moderated community layer as an explicit future product direction while keeping the current validated product solo-first and making no implementation commitment at this stage.* This ratifies a **direction**, not a feature, a schedule, or a build.
>
> This Charter does two jobs: it (1) records that reality faithfully — distinguishing *current solo-first product* from *preserved future community direction* — and (2) prepares a disciplined frame so that *if and when* the founder later opens implementation, it starts from canon and inherited principles rather than from drift.
>
> Every idea referenced here is registered as `SOC-###` in the companion Register. Every source claim is mapped in the companion Source & Gap Map. **This document does not invent social features.** The one real, founder-discussed community concept is recorded at the status the evidence supports (`DEFERRED` / `RATIFIED_DIRECTION`), never silently promoted to Canonical or PLANNED. Where no source exists — profiles, follows, DMs, social graph, referral, cohort learning, broad UGC — it says so.

---

## Table of contents

1. Purpose & scope of this Charter
2. The governing reality: solo-first now, community deferred (not permanently closed)
3. Status vocabulary (binding definitions)
4. Ownership-by-layer model
5. Inherited hard invariants (non-negotiable constraints)
6. What is explicitly rejected (and what is *not* rejected)
7. The two real community concepts (Lifetime loyalty + structured learning community)
8. Adjacent-but-not-social: disambiguation register
9. The root question (SOC-017) — RESOLVED 2026-07-25
10. Open social questions: conversation-supported vs. genuinely unsourced
11. Privacy & consent as the gating spine
12. Passive-mirror dignity vs. social validation
13. Events-as-evidence: social is never mastery
14. Anti-gamification firewall
15. Audience constraints (no children; no engagement-farming)
16. Relationship to the AI layer
17. Relationship to monetization
18. Relationship to the curriculum ("social" as content, not feature)
19. Decision protocol: how a social idea would ever move
20. Non-goals of this Charter
21. Risks & failure modes
22. What would have to be true before any build
23. Founder questions (ordered by dependency)
24. Change log & ratification status

---

## 1. Purpose & scope of this Charter

**Purpose.** To capture — exhaustively and honestly — every social-layer idea, decision, constraint, and dependency that exists in the Cairn repo as of 2026-07-24, and to hold them in one governed place so future sessions neither (a) forget that canon forbids social-by-default, nor (b) accidentally invent social features that no one decided to build.

**In scope:** learner-to-learner interaction of any kind; community surfaces; sharing; referral; profiles; peer practice; and the constraints and adjacent items that bear on them.

**Out of scope:** anything this Charter would *decide*. It decides nothing. It also does not touch the Product Brain or the Content Bible, and it introduces no code.

**Scope guard (inherited).** The Content Bible Ratification Pack explicitly deferred all social-layer work until after Content Bible ratification. The Content Bible is now Canonical (2026-07-24), which is why capturing the social layer is now permissible — as *capture*, not as *build*.

## 2. The governing reality: solo-first now, community deferred (not permanently closed)

Cairn's **current, validated product is solo-first**. The founder's non-goals (Product Brain §17), the banned-language rules (`CLAUDE.md`), and ADR-0001/0002 together describe a product whose present emotional design is one learner and a calm mirror. The "warmth" motifs in the product — Campfire, "friendly" status wording, "social survival" lessons — are all **solo or content-level**, not multiplayer (see §8).

Two things must be held together without collapsing one into the other:

1. **Current reality (SOC-001, `CANONICAL` *current-scope* only):** there is no implemented learner-to-learner social layer, and none is committed for implementation. The validated core is solo-first. Current runtime, lessons, navigation, and release plans do **not** depend on Social.
2. **Founder-ratified future direction (SOC-029, `RATIFIED_DIRECTION`, Q1 2026-07-25):** a real community concept is now preserved as an explicit future direction — a bounded, heavily-moderated, lesson-connected discussion layer where learners can ask questions, compare attempts, see approved/alternative explanations, and feel less alone. It is post-MVP, **not** an implementation commitment, and requires future founder + cross-layer decisions before any build.

**The correction this Charter enforces:** a missing implementation is *not* a permanent product decision. "No community plugin exists" or "Do NOT add social features (current scope)" are **implementation/scope facts**, not evidence that Cairn must remain permanently solo. The absence must never be written up as "canonical permanent solo." The honest baseline is:

> *Cairn is currently solo-first with no social implementation commitment. A bounded, structured, moderated, lesson-connected community layer has been discussed as a deferred/open future direction; an open chaotic forum is not the intended form.*

Any move from *deferred* to *built* still requires an explicit, scoped founder decision (§19) — but so does any move to *permanently archive* the direction. Neither is the silent default.

## 3. Status vocabulary (binding definitions)

The Charter and Register share one vocabulary. Each item carries exactly one **Primary status**:

- `CANONICAL` — settled canon owned by another bible/brain; tracked here for dependencies.
- `FOUNDER_LOCKED` — locked by direct founder decision.
- `RATIFIED_DIRECTION` — direction accepted; implementation detail open.
- `DESIGN_CANON` — settled design principle (derived + accepted).
- `PLANNED` — committed to build, with owner + home. *(No social item qualifies.)*
- `EXPERIMENT` — sanctioned trial with success criteria. *(None sanctioned.)*
- `OPEN` — live question, no decision.
- `DEFERRED` — postponed, not rejected.
- `REJECTED` — ruled out by canon.
- `SUPERSEDED` — replaced by newer decision.
- `ARCHIVED_REFERENCE` — historical only.

**Discipline rule:** a positive social feature may appear in these documents only as `OPEN`, `DEFERRED`, or `REJECTED` unless and until a founder decision moves it. It may **never** be written as `PLANNED`, `CANONICAL`, or `EXPERIMENT` on a session's own initiative.

## 4. Ownership-by-layer model

Cairn's documentation is partitioned into owning layers so that each decision has exactly one home:

| Layer | Owns |
|---|---|
| **Social Layer** | Learner-to-learner interaction, community surfaces, sharing, referral, peer practice — *and the decision not to have them*. |
| **Product Brain** | Product stance, non-goals, tone, AI philosophy, Campfire, monetization concepts. |
| **Content Bible** | Lesson content, exercise families, French QA, "social survival" content themes. |
| **Curriculum Bible** | Syllabus, item budgets, band sequencing. |
| **Brand Bible** | Voice, naming, visual identity. |
| **UX-Experience Bible** | Screen states, flows, status wording. |
| **Engineering-System Bible** | Data model, validators, sync. |
| **Privacy-Legal** | Consent, RLS, data categories, minors. |
| **Operations-QA** | Tester cohorts, admin analytics, release gates. |

**Routing rule:** the Social Layer owns *whether* social exists and *what shape* it may take. It does **not** own the constraints it inherits (privacy, anti-gamification, passive mirror, events-as-evidence) — those remain with their home layers and merely bind the Social Layer.

## 5. Inherited hard invariants (non-negotiable constraints)

These bind any social layer that might ever exist. They are not Social-owned; the Social Layer may not weaken them.

1. **Privacy is local-first and consent-gated (ADR-0023 / SOC-006).** No learner data leaves the device or becomes visible to another person without explicit, revocable consent, under RLS.
2. **Social interaction is never mastery evidence (SOC-007 / SOC-026).** Progress derives only from recorded learning events. Interacting with a person changes no mastery state.
3. **Passive-mirror dignity (ADR-0002 / SOC-005).** The system reflects; it does not praise, shame, rank, or expose the learner. Public praise/correction is incompatible with this and cannot be smuggled in via "social."
4. **No gamification (ADR-0001 / SOC-002).** No XP, streaks, levels, points, badges — including social variants (competitive streaks, ranked ladders).
5. **No pressure language (SOC-004).** No "come back tomorrow," no fear-of-missing-out re-engagement, including social notifications built on that pattern.
6. **No children as an audience (SOC-028).** Social + minors is not entertained.

## 6. What is explicitly rejected (and what is *not* rejected)

**Founder-locked rejections** — the specific mechanics most associated with social language apps: leaderboards and ranking (SOC-003), competitive streaks/XP (SOC-002), pressure-driven re-engagement (SOC-004), and the open-ended AI companion as a social substitute (SOC-008).

**Form-level rejection (SOC-031, `REJECTED`):** the founder disfavoured the **classic open / chaotic forum form** — Reddit-style open posting, an infinite social feed, unrestricted free-form UGC conversation, and weakly-moderated general discussion disconnected from lessons. This rejects a *form*, not the idea of community.

**What is NOT rejected — the key correction:**

- The **structured, moderated, lesson-connected community direction (SOC-029/030)** is *not* rejected — it is **founder-ratified as a preserved future direction** (Q1, 2026-07-25), post-MVP, not implementation-committed. Do not read the open-forum rejection (SOC-031) as killing all community.
- **SOC-001 is a current-scope exclusion, not a permanent product rejection.** "We don't do social *right now*, in the validated build" is correct; "Cairn is canonically, permanently solo" is **not** supported and must not be asserted. A missing implementation is not a product decision.

So the accurate statement is: *the open-forum form is rejected; competitive/gamified/pressure mechanics are founder-locked out; a bounded structured community remains a live deferred direction; and the current build ships no social layer.*

## 7. The two real community concepts (Lifetime loyalty + structured learning community)

There are **two** distinct, real community ideas. They must never be conflated.

**7.1 — Lifetime loyalty community (SOC-009, `CANONICAL`).** A benefit offered to early/lifetime supporters (PB-068). A loyalty/monetization concept, **not** a peer-learning mechanic and **not** a mastery surface. Whether it ever appears *inside the app* (vs. an external forum/Discord run by the founder) is `OPEN` (SOC-020).

**7.2 — Structured learning community (SOC-029, `RATIFIED_DIRECTION` as of Q1 2026-07-25; shape SOC-030, `RATIFIED_DIRECTION`; primitives SOC-032, `OPEN`).** A founder-ratified future direction: a bounded, heavily-moderated, lesson-connected discussion layer whose learner value is to **ask questions, compare sentence attempts, see alternative/approved explanations, and feel less alone / a sense of belonging around learning French.**

Its intended *form* (SOC-030) is explicitly **structured and moderated, attached to learning context** — closer to lesson discussion / guided community reflection / bounded learning support than to open posting. Candidate primitives (SOC-032, still `OPEN` — conceptual possibilities, not separately approved) include lesson-specific questions, approved explanations, teacher-highlighted answers, AI-highlighted answers *subject to AI-authority and QA constraints*, structured community reflections, and bounded comparison of learner attempts.

**Status discipline (unchanged by ratification):** the Q1 decision ratified a **direction**, not a feature. It is recorded as **founder-ratified direction, post-MVP, not implementation-committed** — `RATIFIED_DIRECTION`. Its implementation state remains **not built · not planned for current build · deferred/post-MVP · requires future founder + cross-layer decisions.** It is **not** `CANONICAL` (not a complete product contract), **not** `PLANNED`, **not** `DESIGN_CANON`, and **not** proof that learner-to-learner social is a core product pillar. It must not be inflated into "Cairn has social features," nor deflated into "Cairn rejected community."

## 8. Adjacent-but-not-social: disambiguation register

Several items *sound* social and are routinely mis-scoped. They are captured so no future session mistakes them for a social layer:

- **Campfire Mode (SOC-010)** — solo, post-paywall reflection from the learner's *own* inventory. Not multiplayer.
- **"A1 Social Survival" unit / social scenes (SOC-011)** — lesson *content* depicting social situations. A content theme, not a product feature.
- **Mon Lexique "friendly status mapping" (SOC-012)** — warm UI wording for word-status. Not a friends graph.
- **Legacy AI Chat (SOC-013)** — learner-to-AI, gated off in dev-apk. Not learner-to-learner.
- **Word Graph (SOC-014)** — semantic word adjacency. Not a people graph.
- **Tester cohort / admin analytics (SOC-015)** — operations/privacy. Not a learner-facing social surface.
- **Le Carnet / Dream Journal (SOC-016)** — private solo notebooks.

## 9. The root question (SOC-017) — RESOLVED 2026-07-25

The root question was **not** a binary between permanent-solo and a full social product. It was:

> **Should Cairn preserve the structured, lesson-connected, heavily-moderated community layer (SOC-029/030) as an explicit future product direction — while keeping the current validated product solo-first and making no implementation commitment yet — or archive that direction and make Cairn intentionally solo-only unless a future new decision reopens it?**

**Founder decision (Q1, 2026-07-25): YES — preserve as deferred direction.**

Binding interpretation: *Cairn will preserve a structured, lesson-connected, heavily-moderated community layer as an explicit future product direction while keeping the current validated product solo-first and making no implementation commitment at this stage.*

**What this changed:** SOC-017 and SOC-029 → `RATIFIED_DIRECTION`; the open-forum form (SOC-031) confirmed `REJECTED` with the structured direction as its replacement.

**What this did NOT change:** the current build ships no social layer; nothing is implemented or planned; Social is not required for the validated core; runtime/lessons/navigation/release plans do not depend on Social; and **the lower questions in §10 were not activated.** Preserving the direction keeps SOC-029/030/032 alive as a *direction*; it does **not** open profiles, follows, messaging, matching, cohorts, broad UGC, or a social graph, and it does **not** change any Content Bible / mastery / evidence / progression rule.

**Decision-history note:** the rejected alternative (archive → intentional solo-only) is preserved in the SOC-017 register record, not deleted, so the reasoning remains auditable if the founder ever revisits.

## 10. Open social questions: conversation-supported vs. genuinely unsourced

The open questions split into two clearly different classes.

**10.1 — Conversation-supported (founder discussion exists; deferred, not built):** the structured community family — ask questions, compare attempts, approved/highlighted explanations, structured reflections, belonging value (SOC-029, SOC-030, SOC-032). These have `Founder (conversation)` provenance and are recorded as `DEFERRED` / `RATIFIED_DIRECTION` / `OPEN`. They are **not** unsourced.

**10.2 — Genuinely unsourced (no source, no founder discussion):** registered `OPEN`, authority `None (unsourced)`, captured only so silence is never mistaken for a decision — and **explicitly not inferred** from the community direction:

- Peer practice / speaking-partner exchange (SOC-018)
- Learner profiles / follows / social graph (SOC-019)
- Broad / unrestricted UGC (SOC-021, leans rejected — distinct from the *bounded, moderated* attempt-comparison in SOC-032)
- Referral / invite mechanic (SOC-022)
- Cohort / group learning (SOC-023)
- Outward sharing of progress/achievements (SOC-024, leans rejected)
- In-app surface for the *loyalty* community (SOC-020, derived from SOC-009)

**Non-inference rule:** a moderated lesson-discussion layer does **not** require or imply profiles, follows, direct messaging, partner matching, or a social graph. None of these may be read into SOC-029. Each remains dormant `OPEN` until the founder separately and explicitly scopes it against the §5 invariants.

## 11. Privacy & consent as the gating spine

Every conceivable social feature implies at least one learner's data becoming visible to another person or a server. ADR-0023 (SOC-006) makes that impossible without explicit, revocable consent under RLS. Therefore **privacy is the first gate**, not an afterthought: no social design may proceed to detail until its exact data-sharing surface is specified and consent-gated. This is co-owned with Privacy-Legal (SOC-027).

## 12. Passive-mirror dignity vs. social validation

The passive-mirror principle (SOC-005) is the sharpest philosophical conflict with conventional social features. Likes, public streak comparisons, visible corrections, and praise loops all convert the calm mirror into a validation machine. Any future social design must demonstrate it does **not** reintroduce praise/shame/comparison. Features that cannot clear this bar (e.g. public leaderboards) are already rejected (§6).

## 13. Events-as-evidence: social is never mastery

Cairn's verification model is strictly events-as-evidence (SOC-007). A hard invariant follows (SOC-026): **no social interaction may create, accelerate, or substitute for mastery evidence.** "You practiced with a partner" is not proof you learned. This firewall prevents the most common social-app corruption of a learning model.

## 14. Anti-gamification firewall

ADR-0001 (SOC-002) removed XP and streaks from the product; the banned-language list keeps them out of copy. The Social Layer inherits this firewall in full: social features may not smuggle gamification back in through the side door (friend streaks, competitive ranks, social XP, achievement sharing). This is treated as a bright line.

## 15. Audience constraints

Cairn's audience non-goals exclude children (SOC-028) and reject engagement-farming. Any social layer inherits both: no under-13 interaction, and no mechanic whose primary purpose is time-on-app rather than learning. These constraints alone eliminate most "growth-hack" social patterns.

## 16. Relationship to the AI layer

AI in Cairn is **bounded support** (PB §11), explicitly *not* an open companion or a social substitute (SOC-008). The Social Layer must not position AI as "the friend you practice with," and must not let AI features drift into open-ended chat. If a founder ever wants conversational practice, that is a Product-Brain/AI decision to reopen SOC-008, not a Social-Layer workaround.

## 17. Relationship to monetization

The single real community (SOC-009) is monetization-tied (Lifetime tier). This is the *only* legitimate social-adjacent surface with founder backing, and even it is a loyalty benefit, not a learning mechanic. The Social Layer coordinates with Product-Brain monetization on SOC-009/SOC-020 but does not own pricing or tier definitions.

## 18. Relationship to the curriculum ("social" as content)

The curriculum teaches social *language* (greetings, small talk, "A1 Social Survival," SOC-011) and depicts social *scenes*. This is Content-Bible territory. The Charter draws a firm line: **teaching social French ≠ building a social product.** The two must never be conflated in scope discussions.

## 19. Decision protocol: how a social idea would ever move

Proposed governance (SOC-025), inherited from SOC-001:

1. **Founder opens SOC-017** with an explicit, scoped "yes."
2. The specific feature is written as an `OPEN` row, then taken through each §5 invariant with a pass/fail.
3. Privacy-Legal specifies the data-sharing surface + consent flow (gate 1).
4. Passive-mirror + events-as-evidence + anti-gamification reviews (gates 2–4).
5. Only then may the item become `EXPERIMENT` (with success criteria) — never straight to `PLANNED`.
6. Nothing ships to learners without the Stage-gate discipline the Content Bible established.

No step may be skipped, and no session may perform step 1 on the founder's behalf.

## 20. Non-goals of this Charter

- It does **not** decide whether Cairn has a social layer.
- It does **not** design any social feature.
- It does **not** modify the Product Brain or Content Bible.
- It does **not** introduce code, schema, or UI.
- It does **not** treat teaching social language as building social product.
- It does **not** promote any `OPEN` item to `PLANNED`.

## 21. Risks & failure modes

1. **Invention drift** — a future session reads "social survival," "friendly status," or "community" and hallucinates a social feature. *Mitigation:* §8 disambiguation + Register authority = `None (unsourced)`.
2. **Gamification leakage** — social re-engagement reintroduces streaks/XP. *Mitigation:* §14 firewall.
3. **Privacy backslide** — a sharing feature ships without consent gating. *Mitigation:* §11 privacy-first gate.
4. **Mastery corruption** — social activity counted as progress. *Mitigation:* §13 events-as-evidence invariant.
5. **Scope conflation** — "teach social French" treated as "build social product." *Mitigation:* §18.
6. **Community inflation** — the Lifetime community (loyalty) sold internally as "Cairn is social." *Mitigation:* §7 + SOC-020 `OPEN`.
7. **Community erasure (the failure this correction fixes)** — a repository-only sweep mistakes *missing implementation* for a *product decision* and declares permanent-solo canonical, silently deleting the founder's real deferred community direction. *Mitigation:* SOC-029/030 recorded with `Founder (conversation)` provenance; SOC-001 reframed as current-scope only; §2 and §6 forbid asserting permanent solo.
8. **Loyalty/learning conflation** — the Lifetime loyalty community (SOC-009) and the structured learning community (SOC-029) treated as one thing. *Mitigation:* §7 keeps them as two separate records with different owners and purposes.

## 22. What would have to be true before any build

- Founder answers SOC-017 with a scoped YES.
- A named social feature clears all six §5 invariants.
- Privacy-Legal has specified and approved the data-sharing/consent surface.
- The feature has an owner, a home layer, and success criteria (→ `EXPERIMENT`).
- It demonstrably does not reintroduce gamification, pressure, or public comparison.
- It does not involve minors.

Until all are true, the correct status of the social layer as a whole is: **does not exist; not planned; awaiting a founder decision.**

## 23. Founder questions

### Resolved

- **Q1 (Root — SOC-017) — RESOLVED 2026-07-25: YES, preserve as deferred direction.** *Should Cairn preserve a structured, lesson-connected, heavily-moderated community layer as an explicit future product direction, while keeping the current validated product solo-first and making no implementation commitment yet?* → **YES.** SOC-017/SOC-029 → `RATIFIED_DIRECTION`; SOC-031 (open-forum form) `REJECTED`. The rejected alternative (archive → permanent solo-only) is preserved in decision history. No lower question was activated.

### Remaining (renumbered R1–R11; Q1 removed from the unresolved count)

Preserving the direction did **not** make the implementation questions active. Each remaining question is tagged with whether it is **[Required now]** (needed to set the Charter's foundational boundaries), **[Safe to leave open]**, or **[Dormant]** (do not answer until Social implementation is explicitly opened).

- **R1 — [Safe to leave open] (SOC-030)** Confirm the intended *form* stays structured / heavily-moderated / lesson-connected (guided discussion, bounded reflection), never an open forum, as the standing direction.
- **R2 — [Safe to leave open] (SOC-009 / SOC-020)** Separately from the learning community: is the **Lifetime loyalty** community meant to live *inside the app*, or stay an external founder-run space (Discord/forum)?
- **R3 — [Dormant] (SOC-032)** Which primitives, if any, to explore first — lesson-specific questions, approved explanations, teacher/AI-highlighted answers (QA-bounded), bounded attempt-comparison.
- **R4 — [Dormant] (SOC-018)** Is peer practice / a speaking-partner exchange ever wanted, or does bounded AI (SOC-008) fill that role? *(Genuinely unsourced.)*
- **R5 — [Dormant] (SOC-019)** Do learner profiles/identities visible to other learners ever exist, or is identity strictly private? *(Not implied by SOC-029; genuinely unsourced.)*
- **R6 — [Dormant] (SOC-021 / SOC-024)** Is *any* broad/outward sharing (open UGC, milestone sharing) ever acceptable, or does passive-mirror dignity (SOC-005) rule it out? *(Distinct from bounded moderated comparison, SOC-032.)*
- **R7 — [Dormant] (SOC-023)** Is group/cohort *learning* (vs. ops tester cohorts, SOC-015) ever in scope? *(Genuinely unsourced.)*

*Standing invariant confirmations — answer once, apply to all future social work:*

- **R8 — [Required now] (SOC-026)** Confirm: social interaction must *never* count as mastery evidence — permanent lock?
- **R9 — [Required now] (SOC-002/003/004)** Confirm the anti-gamification firewall extends fully to any social feature (no friend-streaks, no social XP, no ranks) — permanent?
- **R10 — [Required now] (SOC-028)** Confirm no social interaction involving under-13 users, permanently, regardless of later audience changes.
- **R11 — [Required now] (Governance — SOC-025)** Do you accept the decision protocol in §19 (nothing moves from `RATIFIED_DIRECTION`/`OPEN` to build without your explicit scoped "open")?

## 24. Change log & ratification status

| Date | Version | Change | By |
|---|---|---|---|
| 2026-07-24 | 0.1 (initial) | Initial Draft capture from a **repository-only** sweep. Concluded (over-strongly) that "Cairn has no social layer and that absence is canonical." | Cloud session (capture) |
| 2026-07-24 | 0.1 (founder-conversation correction) | Added founder-conversation evidence of a **structured, moderated, lesson-connected community direction** (SOC-029 `DEFERRED`, shape SOC-030 `RATIFIED_DIRECTION`, primitives SOC-032 `OPEN`, open-forum form rejected SOC-031 `REJECTED`). Corrected the executive finding to distinguish *current solo-first product* from *deferred community optionality*; reframed SOC-001 as a current-scope exclusion (not permanent canon); reframed the root question SOC-017 from a false binary to preserve-vs-archive; separated conversation-supported ideas from genuinely-unsourced ones (profiles/follows/DMs/graph/referral/cohort/broad-UGC stay unsourced, not inferred). Recalculated counts (28 → 32 rows). Canonizes nothing. | Cloud session (correction) |
| 2026-07-25 | 0.1 (Q1 ratification) | **Founder resolved root question Q1: YES — preserve the structured community as a deferred direction; product stays solo-first; no implementation commitment.** SOC-017 and SOC-029 → `RATIFIED_DIRECTION`; SOC-031 open-forum form confirmed `REJECTED` with the structured direction as replacement. Recalculated status counts (`RATIFIED_DIRECTION` 2→4, `OPEN` 9→8, `DEFERRED` 3→2; still 32 rows, PLANNED 0). Marked Q1 resolved and renumbered remaining questions R1–R11. **No implementation approved; no profile/DM/follow/matching/UGC/social-graph approved; Social is not mastery evidence; no Content Bible / mastery / progression rule changed.** Package remains Draft. | Cloud session (ratification record) |

**Founder decision record — Q1 (2026-07-25):** *Cairn will preserve a structured, lesson-connected, heavily-moderated community layer as an explicit future product direction while keeping the current validated product solo-first and making no implementation commitment at this stage.* Ratifies a **direction**, not a feature/schedule/build. Conditional questions (profiles, messaging, social graph, UGC, matching, cohorts, peer feedback, public progress, teacher/mentor roles, monetization) remain `OPEN` / `DEFERRED` / `REJECTED` / unsourced and were **not** activated.

**Ratification status:** `Draft — awaiting founder ratification`. The Q1 *direction* decision is on file, but the **Charter as a whole remains Draft and is not promoted to Canonical** in this task. Standing-invariant confirmations (R8–R11) and later direction/implementation questions remain to be answered before any broader promotion.

*End of Charter v0.1. Draft; canonizes nothing beyond recording one founder direction decision (Q1); authorizes no build.*
