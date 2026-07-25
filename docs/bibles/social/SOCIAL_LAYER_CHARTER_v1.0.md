---
title: Cairn Social Layer Charter v1.0
version: 1.0
status: Canonical
signed_off: 2026-07-25
authority: Canonical Social Layer boundary and future-direction contract
owner: Social Layer
founder_decisions: Q1 (2026-07-25) · R1, R2, R5, R6, R8, R9, R10, R11 resolved (2026-07-25) · R3, R4, R7 dormant
depends_on:
  - Cairn Product Brain v1.0
  - Cairn Content Bible v1.0
created: 2026-07-24
supersedes: SOCIAL_LAYER_CHARTER_v0.1.md (renamed on promotion; same document lineage)
related:
  - SOCIAL_LAYER_FOUNDER_RATIFICATION_v0.1.md
  - SOCIAL_LAYER_IDEA_AND_DECISION_REGISTER_v0.1.md
  - SOCIAL_LAYER_SOURCE_AND_GAP_MAP_v0.1.md
  - SOCIAL_LAYER_SIGNOFF_REVIEW_v0.1.md
---

# Cairn Social Layer Charter v1.0

> **Canonical — signed off 2026-07-25. `Canonical` does NOT mean implemented.**
>
> **What this Canonical Charter binds:** Social boundaries · prohibited forms · the ratified future direction · governance · privacy/safety defaults · evidence boundaries · cross-layer ownership.
>
> **What it does NOT claim:** runtime implementation · an active Social roadmap · approved primitives · an approved pilot · a Social evidence contract · profiles, messaging, matching, UGC, cohorts, groups, follows, or a social graph · any change to current solo-first release scope.
>
> This Charter is the first attempt to give the "social layer" of Cairn a single, honest home. Its central finding, stated precisely:
>
> **Cairn is currently solo-first and has no active social implementation commitment. A bounded, structured, heavily-moderated, lesson-connected community layer is now a founder-ratified *future direction* (Q1, 2026-07-25 — "preserve as deferred direction"), post-MVP, with no implementation commitment; a classic open forum is explicitly rejected as its form.** The current absence of a social build is an implementation/scope fact, **not** a permanent product decision, and must not be described as "canonical permanent solo."
>
> **Founder decision on file (Q1, 2026-07-25):** *Cairn will preserve a structured, lesson-connected, heavily-moderated community layer as an explicit future product direction while keeping the current validated product solo-first and making no implementation commitment at this stage.* This ratifies a **direction**, not a feature, a schedule, or a build.
>
> **Boundary decisions ratified (R1–R11, 2026-07-25):** form confirmed (R1) · loyalty community external for current scope (R2) · privacy-safe identity default (R5) · broad public UGC/feed rejected (R6) · **evidence firewall stated precisely — engagement is never evidence, a pedagogical action may be only under a separately ratified evidence contract (R8)** · anti-gamification permanent for Social (R9) · **under-13 Social locked for current scope with a high-threshold reopen gate (R10)** · governance protocol accepted — documentation is not implementation authority (R11). R3, R4, R7 remain **dormant** by decision. Full record: [`SOCIAL_LAYER_FOUNDER_RATIFICATION_v0.1.md`](SOCIAL_LAYER_FOUNDER_RATIFICATION_v0.1.md).
>
> **This ratifies boundaries and a direction. It authorizes no implementation.** The final sign-off review was completed on 2026-07-25 (verdict `READY FOR CANONICAL PROMOTION`) and this Charter was promoted **Draft → Canonical** on that date. **Canonical status is still not authority to build** — see §19 / R11.
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
5. Hard invariants (non-negotiable constraints)
6. What is explicitly rejected (and what is *not* rejected)
7. The two real community concepts (Lifetime loyalty + structured learning community)
8. Adjacent-but-not-social: disambiguation register
9. The root question (SOC-017) — RESOLVED 2026-07-25
10. Open social questions: conversation-supported vs. genuinely unsourced
11. Privacy & consent as the gating spine
12. Passive-mirror dignity vs. social validation
13. Evidence firewall: engagement vs. validated pedagogical action (R8)
14. Anti-gamification firewall (R9 — permanent Social-Layer principle)
15. Audience constraints (R10 — locked current scope, high-threshold reopen gate) (no children; no engagement-farming)
16. Relationship to the AI layer
17. Relationship to monetization
18. Relationship to the curriculum ("social" as content, not feature)
19. Decision protocol: how a social idea would ever move (R11 — ACCEPTED)
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

| Layer | Owns | Document status |
|---|---|---|
| **Social Layer** | Learner-to-learner interaction, community surfaces, sharing, referral, peer practice — *and the decision not to have them*. | This Charter |
| **Product Brain** | Product stance, non-goals, tone, AI philosophy, Campfire, monetization concepts. | Authored (v1.0) |
| **Content Bible** | Lesson content, exercise families, French QA, "social survival" content themes; **evidence-contract authorship (with Curriculum + Engineering)**. | Authored (v1.0) |
| **Curriculum Bible** | Syllabus, item budgets, band sequencing, learner readiness. | `DEPENDENCY — DOCUMENT NOT YET AUTHORED` |
| **Brand Bible** | Voice, naming, visual identity. | `DEPENDENCY — DOCUMENT NOT YET AUTHORED` |
| **UX-Experience Bible** | Screen states, exact flows, controls, status wording. | `DEPENDENCY — DOCUMENT NOT YET AUTHORED` |
| **Engineering-System Bible** | Data model, runtime permissions, moderation architecture, validators, sync. | `DEPENDENCY — DOCUMENT NOT YET AUTHORED` |
| **Privacy-Legal** | Consent, RLS, data categories, minors, legal interpretation. | `DEPENDENCY — DOCUMENT NOT YET AUTHORED` |
| **Operations-QA** | Tester cohorts, admin analytics, release gates, **moderation operation and escalation**. | `DEPENDENCY — DOCUMENT NOT YET AUTHORED` |

**Routing rule:** the Social Layer owns *whether* social exists and *what shape* it may take. It does **not** own the constraints it inherits (privacy, anti-gamification, passive mirror, evidence firewall) — those remain with their home layers and merely bind the Social Layer.

**Unauthored-layer rule:** where a layer is marked `DEPENDENCY — DOCUMENT NOT YET AUTHORED`, this Charter **routes** the decision to it and **does not invent its contents.** A dependency on an unauthored document is recorded, never resolved here.

## 5. Hard invariants (non-negotiable constraints)

Invariants 1, 3 and 5 are **inherited** from other layers and may not be weakened by the Social Layer. Invariants 2, 4, 6 and 7 are **founder-ratified Social-Layer invariants (2026-07-25)** — see the Founder Ratification record for their full text.

1. **Privacy is local-first and consent-gated (ADR-0023 / SOC-006).** No learner data leaves the device or becomes visible to another person without explicit, revocable consent, under RLS.

2. **Evidence firewall — engagement is never evidence; a pedagogical action may be, only under a ratified evidence contract (R8 / SOC-026).** The absolute formulation ("nothing occurring in a social context can ever be evidence") is **superseded**. The binding rule is:

   > **Social engagement signals do not constitute mastery evidence. A discrete pedagogical action performed within a future social context may count as learning evidence only if it is governed by a separately ratified evidence contract and satisfies the same validity, prerequisite, attribution, anti-gaming, and error-source requirements as an equivalent non-social action.**

   **Never evidence by themselves:** likes · reactions · replies · posting frequency · time spent in community · participation count · popularity · reputation · partner presence · giving or receiving a correction · social completion · community streaks · peer approval · teacher or moderator approval without an evidence contract.

   **A future speaking/writing action may become evidence only when:** the action is pedagogically defined; learner authorship is attributable; assistance level is known; prerequisites are safe; the result is evaluated by an approved evidence contract; content/validator/peer/AI/UI errors are excluded from learner weakness; and the action would satisfy equivalent standards outside Social. **Social context alone must never upgrade an action into evidence.**

3. **Passive-mirror dignity (ADR-0002 / SOC-005).** The system reflects; it does not praise, shame, rank, or expose the learner. Public praise/correction is incompatible with this and cannot be smuggled in via "social."

4. **Anti-gamification firewall extends permanently to Social (R9 / SOC-034).** No friend streaks · social XP · public ranks · leaderboards · popularity levels · competitive progress comparison · "someone passed you" messaging · pressure-based participation · engagement rewards disconnected from learning value. Trust-and-safety signals may exist operationally but must never be presented as popularity, learner worth, or learning mastery.

5. **No pressure language (SOC-004).** No "come back tomorrow," no fear-of-missing-out re-engagement, including social notifications built on that pattern.

6. **Under-13 Social is a locked current-scope prohibition with a high-threshold reopen gate (R10 / SOC-028).** The absolute formulation ("permanently prohibited regardless of any future change") is **superseded**. The binding rule is:

   > **Cairn does not permit under-13 participation in learner-to-learner Social systems under the current product scope. This boundary may be reopened only through a new explicit founder and canon decision after child-safety, parental-consent, legal, privacy, moderation, data-retention, identity, and operational requirements have been fully designed and independently reviewed.**

   Until all such requirements **and** the explicit reopening decision exist: no under-13 Social pilot · no child-account interaction · no adult–minor matching · no direct communication involving under-13 users · **no assumption that a general age-policy change automatically opens Social access.**

7. **Privacy-safe identity default (R5 / SOC-033).** By default: no public real-name profile · no publicly discoverable learner profile · no public social graph · **no profile required for the current solo-first experience.** *If* a structured community is ever explicitly opened, the minimum viable identity must be pseudonymous or otherwise privacy-preserving, visibility must be opt-in, identity fields minimized, discoverability never silently enabled, and real-name exposure requires a separate explicit decision with privacy justification. **This defines a boundary; it does not approve profiles as a feature.**

## 6. What is explicitly rejected (and what is *not* rejected)

**Founder-locked rejections** — the specific mechanics most associated with social language apps: leaderboards and ranking (SOC-003), competitive streaks/XP (SOC-002), pressure-driven re-engagement (SOC-004), and the open-ended AI companion as a social substitute (SOC-008).

**Form-level rejection (SOC-031, `REJECTED`; confirmed by R1, 2026-07-25):** the **classic open / chaotic forum form** — Reddit-style open posting, an infinite social feed, unrestricted free-form UGC conversation, and weakly-moderated general discussion disconnected from lessons. This rejects a *form*, not the idea of community, and the rejection is **binding**.

**Broad public UGC / community feed rejection (SOC-021, `REJECTED`; R6, 2026-07-25):** open public posting · unrestricted learner-generated-content feeds · public mistake feeds · public performance feeds · infinite community content · popularity-driven content distribution · weakly-moderated public sharing.

> **Do not over-read R6.** It rejects *broad public UGC and feed mechanics*, **not every bounded community contribution.** Lesson-specific questions, bounded attempt comparison, approved explanations, moderated reflections, and selected/reviewed contributions remain **possible only inside the ratified structured direction (SOC-029/030/032) and require separate approval** — they are neither approved nor rejected by R6.
>
> **Separate question, kept open:** *user-initiated outward sharing* (a learner deliberately sharing a milestone outside Cairn) is a Product/UX/Brand/Privacy question (SOC-024, `OPEN`), **not** an in-app social feed. R6 does not decide it.

**What is NOT rejected — the key correction:**

- The **structured, moderated, lesson-connected community direction (SOC-029/030)** is *not* rejected — it is **founder-ratified as a preserved future direction** (Q1, 2026-07-25), post-MVP, not implementation-committed. Do not read the open-forum rejection (SOC-031) as killing all community.
- **SOC-001 is a current-scope exclusion, not a permanent product rejection.** "We don't do social *right now*, in the validated build" is correct; "Cairn is canonically, permanently solo" is **not** supported and must not be asserted. A missing implementation is not a product decision.

So the accurate statement is: *the open-forum form is rejected; competitive/gamified/pressure mechanics are founder-locked out; a bounded structured community remains a live deferred direction; and the current build ships no social layer.*

## 7. The two real community concepts (Lifetime loyalty + structured learning community)

There are **two** distinct, real community ideas. They must never be conflated.

**7.1 — Lifetime loyalty community (SOC-009, `CANONICAL`).** A benefit offered to early/lifetime supporters (PB-068). A loyalty/monetization concept, **not** a peer-learning mechanic and **not** a mastery surface.

**R2 decision (2026-07-25): EXTERNAL for the current product scope.** The loyalty community remains **outside** the app; **no in-app loyalty-community surface is approved.** Possible future in-app integration stays `DEFERRED` (SOC-020) and must never be labelled `PLANNED`.

**Cross-inheritance bar:** the loyalty community and the learner-learning community (§7.2) are **separate concepts**. Neither automatically inherits the other's permissions, moderation model, or product surface. A decision about one is never a decision about the other.

**7.2 — Structured learning community (SOC-029, `RATIFIED_DIRECTION` as of Q1 2026-07-25; shape SOC-030, `RATIFIED_DIRECTION`; primitives SOC-032, `OPEN`).** A founder-ratified future direction: a bounded, heavily-moderated, lesson-connected discussion layer whose learner value is to **ask questions, compare sentence attempts, see alternative/approved explanations, and feel less alone / a sense of belonging around learning French.**

Its intended *form* (SOC-030) is explicitly **structured and moderated, attached to learning context** — closer to lesson discussion / guided community reflection / bounded learning support than to open posting. Candidate primitives (SOC-032, still `OPEN` — conceptual possibilities, not separately approved) include lesson-specific questions, approved explanations, teacher-highlighted answers, AI-highlighted answers *subject to AI-authority and QA constraints*, structured community reflections, and bounded comparison of learner attempts.

> **What "heavily moderated" requires.** Moderation means **human/operational moderation capacity**, owned by Operations-QA (`DEPENDENCY — DOCUMENT NOT YET AUTHORED`, §4). **AI moderation is not sufficient coverage** — consistent with SOC-008 (AI is bounded support, not authority) and SOC-032 (AI-highlighted answers remain subject to authority and QA constraints). AI may *assist* moderation; it may never *constitute* it. Absence of staffed moderation capacity is itself a blocker to any future opening. **Nothing here implies an invited or approved Social pilot.**

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

- Peer practice / speaking-partner exchange (SOC-018) — **`OPEN`, dormant** (R4: bounded AI is sufficient for now)
- Learner profiles / follows / social graph (SOC-019) — **`OPEN`, unapproved**, and now bounded by the privacy-safe identity default (SOC-033 / R5)
- Referral / invite mechanic (SOC-022) — `OPEN`
- Cohort / group learning (SOC-023) — **`OPEN`, dormant** (R7)
- User-initiated *outward* sharing of a milestone outside Cairn (SOC-024) — `OPEN`, routed to Product/UX/Brand/Privacy, **not** an in-app feed

**Decided since (no longer open):** broad public UGC / community feed (SOC-021 → `REJECTED`, R6) · in-app loyalty-community surface (SOC-020 → `DEFERRED`, external for current scope, R2).

**Non-inference rule:** a moderated lesson-discussion layer does **not** require or imply profiles, follows, direct messaging, partner matching, or a social graph. None of these may be read into SOC-029. Each remains unapproved until the founder separately and explicitly scopes it against the §5 invariants.

**Blanket non-approval:** any profile, messaging, follows, matching, social graph, peer grading, live audio/video, teacher marketplace, mentor system, or group system **not explicitly decided in the Founder Ratification record remains unapproved.** Silence is never approval.

## 11. Privacy & consent as the gating spine

Every conceivable social feature implies at least one learner's data becoming visible to another person or a server. ADR-0023 (SOC-006) makes that impossible without explicit, revocable consent under RLS. Therefore **privacy is the first gate**, not an afterthought: no social design may proceed to detail until its exact data-sharing surface is specified and consent-gated. This is co-owned with Privacy-Legal (SOC-027).

## 12. Passive-mirror dignity vs. social validation

The passive-mirror principle (SOC-005) is the sharpest philosophical conflict with conventional social features. Likes, public streak comparisons, visible corrections, and praise loops all convert the calm mirror into a validation machine. Any future social design must demonstrate it does **not** reintroduce praise/shame/comparison. Features that cannot clear this bar (e.g. public leaderboards) are already rejected (§6).

## 13. Evidence firewall: engagement vs. validated pedagogical action (R8)

Cairn's verification model is events-as-evidence (SOC-007). The Social Layer's ratified refinement (SOC-026, 2026-07-25) draws the line **precisely**, because the earlier absolute wording was both too strong and too blunt:

- **Engagement signals are never evidence.** Likes, replies, participation counts, time-in-community, reputation, popularity, partner presence, giving/receiving a correction, community streaks, peer or moderator approval without a contract — none of these say anything about what the learner knows. "You practiced with a partner" is not proof you learned.
- **A discrete pedagogical action is not disqualified merely by occurring in a social context.** If a future speaking or writing action is pedagogically defined, authored attributably by the learner, produced at a known assistance level, prerequisite-safe, evaluated under a **separately ratified evidence contract**, and shielded from content/validator/peer/AI/UI error attribution — it may count, on exactly the same terms as the equivalent non-social action.

**The asymmetry is the point:** social context never *upgrades* an action into evidence, and never *downgrades* an otherwise-valid pedagogical action merely for having happened near other people. Anything in between requires a ratified evidence contract that does not yet exist. Until such a contract exists, **no social action is evidence.** This changes nothing in the Content Bible or the current mastery implementation.

> **Routed dependency — evidence contract (not authored here).** Any future Social evidence contract is owned by **Content Bible + Curriculum Bible + Engineering-System Bible**, with founder ratification. It is **not** authored in this Charter, is **not** an implementation requirement today, and becomes relevant **only if** a future scoped Social primitive includes a potentially valid pedagogical action. Curriculum Bible and Engineering-System Bible are currently `DEPENDENCY — DOCUMENT NOT YET AUTHORED` (§4).

## 14. Anti-gamification firewall (R9 — permanent Social-Layer principle)

ADR-0001 (SOC-002) removed XP and streaks from the product; the banned-language list keeps them out of copy. Founder-ratified 2026-07-25 (SOC-034), the firewall extends **permanently** to any future Social feature: no friend streaks, social XP, public ranks, leaderboards, popularity levels, competitive progress comparison, "someone passed you" messaging, pressure-based participation, or engagement rewards disconnected from learning value.

**Narrow carve-out:** trust-and-safety signals (e.g. moderation standing, spam controls) may exist **operationally**, but must never be surfaced as popularity, learner worth, or learning mastery. This is a bright line, not a tunable.

## 15. Audience constraints (R10 — locked current scope, high-threshold reopen gate)

Cairn's audience non-goals exclude children and reject engagement-farming. The under-13 boundary (SOC-028) is now stated as a **locked current-scope prohibition with an explicit reopening protocol** rather than a silent claim about every possible future product: under-13 participation in learner-to-learner Social is not permitted under the current product scope, and may be reopened **only** by a new explicit founder + canon decision after child-safety, parental-consent, legal, privacy, moderation, data-retention, identity, and operational requirements are fully designed and **independently reviewed**.

Until both those requirements and that explicit decision exist: no under-13 Social pilot, no child-account interaction, no adult–minor matching, no direct communication involving under-13 users, and **no inference that a general age-policy change opens Social access.** The engagement-farming constraint also stands: no mechanic whose primary purpose is time-on-app rather than learning.

## 16. Relationship to the AI layer

AI in Cairn is **bounded support** (PB §11), explicitly *not* an open companion or a social substitute (SOC-008). The Social Layer must not position AI as "the friend you practice with," and must not let AI features drift into open-ended chat. If a founder ever wants conversational practice, that is a Product-Brain/AI decision to reopen SOC-008, not a Social-Layer workaround.

## 17. Relationship to monetization

The single real community (SOC-009) is monetization-tied (Lifetime tier). This is the *only* legitimate social-adjacent surface with founder backing, and even it is a loyalty benefit, not a learning mechanic. The Social Layer coordinates with Product-Brain monetization on SOC-009/SOC-020 but does not own pricing or tier definitions.

## 18. Relationship to the curriculum ("social" as content)

The curriculum teaches social *language* (greetings, small talk, "A1 Social Survival," SOC-011) and depicts social *scenes*. This is Content-Bible territory. The Charter draws a firm line: **teaching social French ≠ building a social product.** The two must never be conflated in scope discussions.

## 19. Decision protocol: how a social idea would ever move (R11 — ACCEPTED)

**Founder-accepted governance (SOC-025, 2026-07-25).** The governing rule:

> **Nothing may move from `OPEN`, `DEFERRED`, `EXPERIMENT`, or `RATIFIED_DIRECTION` into design or implementation merely because an agent finds it documented.** Social work may begin only when the founder explicitly opens a scoped Social task.

**Documentation is not authority.** A `RATIFIED_DIRECTION` is a preserved direction, not a work order. Finding an idea written down — including in this Charter — confers no permission to build it.

**A general instruction such as "continue the project", "build the future systems", or "implement what's in the docs" is NOT sufficient authority to begin Social implementation.**

**The founder's opening decision must state all ten:**

1. exact primitive or feature
2. target user
3. intended value
4. current status
5. safety prerequisites
6. affected Bibles
7. evidence relationship
8. implementation boundary
9. validation plan
10. stop condition

**Then, and only then, the gate sequence runs:**

1. The specific feature is written as an `OPEN` row and taken through each §5 invariant with a pass/fail.
2. Privacy-Legal specifies the data-sharing surface + consent flow (gate 1).
3. Passive-mirror + evidence-firewall + anti-gamification + identity-default reviews (gates 2–5).
4. Only then may the item become `EXPERIMENT` (with success criteria) — never straight to `PLANNED`.
5. Nothing ships to learners without the Stage-gate discipline the Content Bible established.

No step may be skipped, and **no session may perform the opening decision on the founder's behalf.**

## 20. Non-goals of this Charter

- It records a preserved **direction** and its **boundaries** (Q1, R1–R11) — it does **not** authorize, schedule, or design any social implementation.
- It does **not** design any social feature or select a first primitive.
- It does **not** modify the Product Brain, Content Bible, mastery model, privacy runtime, or release scope.
- It does **not** introduce code, schema, or UI.
- It does **not** treat teaching social language as building social product.
- It does **not** promote any item to `PLANNED`.
- It does **not** make every conceptual primitive part of the product.
- It does **not** grant authority to begin work by being read (see §19 / R11).

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

- **The founder has issued a NEW explicit, scoped Social opening under §19 / R11, stating all ten required elements.** ⚠️ **The resolved Q1/SOC-017 decision does NOT satisfy this condition** — Q1 ratified a *direction only* and explicitly authorized no design or implementation. A resolved direction is never a build gate.
- A named social feature clears **every invariant in §5 (all seven)**, including the privacy-safe identity default (SOC-033).
- Privacy-Legal has specified and approved the data-sharing/consent surface.
- Staffed **human/operational** moderation capacity exists (Operations-QA); AI moderation does not satisfy this (§7.2).
- The feature has an owner, a home layer, and success criteria (→ `EXPERIMENT`).
- It demonstrably does not reintroduce gamification, pressure, or public comparison.
- It does not involve minors (§5(6) / SOC-028 remains in force).
- If it proposes any action as learning evidence, a **separately ratified evidence contract** exists (§13 / R8) — none exists today.

Until all are true, the correct status of the social layer as a whole is: **does not exist; not planned; awaiting a founder decision.**

## 23. Founder questions

### Resolved

- **Q1 (Root — SOC-017) — RESOLVED 2026-07-25: YES, preserve as deferred direction.** *Should Cairn preserve a structured, lesson-connected, heavily-moderated community layer as an explicit future product direction, while keeping the current validated product solo-first and making no implementation commitment yet?* → **YES.** SOC-017/SOC-029 → `RATIFIED_DIRECTION`; SOC-031 (open-forum form) `REJECTED`. The rejected alternative (archive → permanent solo-only) is preserved in decision history. No lower question was activated.

### Resolved 2026-07-25 (R1, R2, R5, R6, R8, R9, R10, R11)

Full text in [`SOCIAL_LAYER_FOUNDER_RATIFICATION_v0.1.md`](SOCIAL_LAYER_FOUNDER_RATIFICATION_v0.1.md).

- **R1 (SOC-030/031) — CONFIRM.** Form stays structured · heavily moderated · lesson-connected · bounded · learning-contextual; not an open forum, not an infinite feed, not unrestricted posting. `RATIFIED_DIRECTION`, not a build commitment. Open-forum rejection binding.
- **R2 (SOC-009/020) — EXTERNAL for current scope.** No in-app loyalty-community surface approved; future in-app integration `DEFERRED`; loyalty ≠ learning community; no cross-inheritance of permissions/moderation/surface.
- **R5 (SOC-033, new) — RATIFY PRIVACY-SAFE DEFAULT.** No public real-name profile, no discoverable profile, no public social graph, no profile required — by default. If a community is ever opened: pseudonymous/privacy-preserving minimum identity, opt-in visibility, minimized fields, no silent discoverability, real-name requires separate decision. **Does not approve profiles.**
- **R6 (SOC-021 `REJECTED`; SOC-024 stays `OPEN`) — REJECT broad public UGC / community feed.** Bounded moderated contributions inside the ratified direction are *not* rejected and still require separate approval. User-initiated outward sharing kept open as a Product/UX/Brand/Privacy question.
- **R8 (SOC-026) — RATIFY EVIDENCE FIREWALL WITH PRECISE BOUNDARY.** Engagement signals are never evidence; a discrete pedagogical action may be, only under a separately ratified evidence contract meeting equivalent non-social standards. Social context alone never upgrades an action into evidence. (Absolute formulation superseded.)
- **R9 (SOC-034, new) — YES, permanent Social-Layer principle.** No friend streaks, social XP, public ranks, leaderboards, popularity levels, competitive comparison, "someone passed you", pressure participation, or engagement rewards disconnected from learning value. Trust/safety signals operational only.
- **R10 (SOC-028) — Locked current-scope prohibition + high-threshold reopen gate.** No under-13 Social participation in current scope; reopening requires a new explicit founder + canon decision after full design and independent review of child-safety/consent/legal/privacy/moderation/retention/identity/operational requirements. (Absolute "permanently, regardless of any future change" formulation superseded.)
- **R11 (SOC-025) — ACCEPT governance protocol.** Documentation is not implementation authority; a scoped founder opening stating all ten required elements is required before any Social work. "Continue the project" is not authority.

### Dormant (R3, R4, R7) — not blockers to Charter ratification

These are **intentionally unanswered** and must not be re-presented as blockers. Their alternatives and history are preserved in the register.

- **R3 (SOC-032) — LEAVE DORMANT.** No first primitive selected for design or implementation; all remain conceptual possibilities inside the ratified direction.
- **R4 (SOC-018) — LEAVE DORMANT.** Bounded AI remains sufficient for the solo-first product; no speaking-partner, peer-practice, matching, or language-exchange system approved. Stays `OPEN`.
- **R7 (SOC-023) — LEAVE DORMANT.** No cohort, classroom, group-learning, or community-group system approved. Operational tester cohorts (SOC-015) remain non-social and **must not be used as evidence for learner-community design.**

**Reactivation trigger for all three:** (a) an explicit founder opening of Social implementation under §19, **or** (b) discovery of stronger historical source evidence.

## 24. Change log & ratification status

| Date | Version | Change | By |
|---|---|---|---|
| 2026-07-24 | 0.1 (initial) | Initial Draft capture from a **repository-only** sweep. Concluded (over-strongly) that "Cairn has no social layer and that absence is canonical." | Cloud session (capture) |
| 2026-07-24 | 0.1 (founder-conversation correction) | Added founder-conversation evidence of a **structured, moderated, lesson-connected community direction** (SOC-029 `DEFERRED`, shape SOC-030 `RATIFIED_DIRECTION`, primitives SOC-032 `OPEN`, open-forum form rejected SOC-031 `REJECTED`). Corrected the executive finding to distinguish *current solo-first product* from *deferred community optionality*; reframed SOC-001 as a current-scope exclusion (not permanent canon); reframed the root question SOC-017 from a false binary to preserve-vs-archive; separated conversation-supported ideas from genuinely-unsourced ones (profiles/follows/DMs/graph/referral/cohort/broad-UGC stay unsourced, not inferred). Recalculated counts (28 → 32 rows). Canonizes nothing. | Cloud session (correction) |
| 2026-07-25 | 0.1 (Q1 ratification) | **Founder resolved root question Q1: YES — preserve the structured community as a deferred direction; product stays solo-first; no implementation commitment.** SOC-017 and SOC-029 → `RATIFIED_DIRECTION`; SOC-031 open-forum form confirmed `REJECTED` with the structured direction as replacement. Recalculated status counts (`RATIFIED_DIRECTION` 2→4, `OPEN` 9→8, `DEFERRED` 3→2; still 32 rows, PLANNED 0). Marked Q1 resolved and renumbered remaining questions R1–R11. **No implementation approved; no profile/DM/follow/matching/UGC/social-graph approved; Social is not mastery evidence; no Content Bible / mastery / progression rule changed.** Package remains Draft. | Cloud session (ratification record) |

| 2026-07-25 | 0.1 (R1–R11 ratification) | **Founder resolved the remaining boundary decisions.** R1 form CONFIRM · R2 loyalty community EXTERNAL for current scope (SOC-020 → `DEFERRED`) · R5 privacy-safe identity default ratified (**new SOC-033**) · R6 broad public UGC/feed REJECTED (SOC-021 → `REJECTED`; SOC-024 kept `OPEN` as an outward-sharing Product/UX/Brand/Privacy question) · R8 evidence firewall restated **precisely** (SOC-026 → `FOUNDER_LOCKED`; absolute formulation superseded) · R9 anti-gamification permanent for Social (**new SOC-034**) · R10 under-13 locked for current scope **with high-threshold reopen gate** (SOC-028 reworded; absolute formulation superseded) · R11 governance ACCEPTED (SOC-025 → `FOUNDER_LOCKED`, ten-element opening decision). R3/R4/R7 preserved **dormant**. Counts recalculated (32 → 34 rows; PLANNED still 0). Charter status → `Draft — awaiting founder sign-off review`. **No implementation authorized.** | Cloud session (ratification application) |

**Founder decision record — Q1 (2026-07-25):** *Cairn will preserve a structured, lesson-connected, heavily-moderated community layer as an explicit future product direction while keeping the current validated product solo-first and making no implementation commitment at this stage.* Ratifies a **direction**, not a feature/schedule/build.

**Founder decision record — R1–R11 (2026-07-25):** eight resolved (R1, R2, R5, R6, R8, R9, R10, R11), three dormant by decision (R3, R4, R7). Full text and non-claims in [`SOCIAL_LAYER_FOUNDER_RATIFICATION_v0.1.md`](SOCIAL_LAYER_FOUNDER_RATIFICATION_v0.1.md). Anything not explicitly decided there — profiles, messaging, follows, matching, social graph, peer grading, live audio/video, teacher marketplace, mentor systems, group systems — **remains unapproved.**

| 2026-07-25 | **1.0 (Canonical promotion)** | **Final sign-off review passed** ([`SOCIAL_LAYER_SIGNOFF_REVIEW_v0.1.md`](SOCIAL_LAYER_SIGNOFF_REVIEW_v0.1.md), verdict `READY FOR CANONICAL PROMOTION`; 0 BLOCKER, 0 MAJOR, 3 MINOR + 1 EDITORIAL applied). Corrections: cross-layer table now marks unauthored layers `DEPENDENCY — DOCUMENT NOT YET AUTHORED` (§4); routed evidence-contract dependency added to §13 (Content + Curriculum + Engineering, founder-ratified, not authored here); "heavily moderated" clarified as human/operational capacity with **AI moderation explicitly not sufficient coverage** (§7.2); Ratification routing table aligned. **Status Draft → Canonical; version 0.1 → 1.0; signed off 2026-07-25.** File renamed `SOCIAL_LAYER_CHARTER_v0.1.md` → `SOCIAL_LAYER_CHARTER_v1.0.md` (organization only, not a new authority event; all internal references updated). **No decision changed; no implementation authorized.** | Cloud session (sign-off + promotion) |

**Ratification status:** `Canonical` — **signed off 2026-07-25**.

**Canonical does not mean implemented.** This Charter is the **primary Canonical document** of the Social Layer. Its supporting records — the Register, Source & Gap Map, Founder Ratification Record, and Sign-Off Review — remain **evidence/decision records at v0.1**, not independent product canon, matching the Content Bible convention (`CONTENT_BIBLE_v1.0.md` canonical + `_v0.1` supporting records).

**This Canonical Charter binds:** Social boundaries · prohibited forms · the ratified future direction · governance · privacy/safety defaults · evidence boundaries · cross-layer ownership.

**It does not claim:** runtime implementation · an active Social roadmap · approved primitives · an approved pilot · a Social evidence contract · profiles, messaging, matching, UGC, cohorts, groups, follows, or a social graph · any change to the current solo-first release scope.

**Still true after promotion:** Social is **unimplemented and unplanned** (`PLANNED` = 0, `EXPERIMENT` = 0); R3/R4/R7 remain **dormant**; and per §19/R11, **this Canonical status is still not authority to build.** Opening Social requires an explicit, scoped founder decision stating all ten required elements.

*End of Charter v1.0. Canonical; binds boundaries, prohibited forms, direction, governance, privacy defaults, evidence limits and routing; authorizes no build.*
