---
title: Cairn Social Layer — Idea & Decision Register
version: 0.1
status: Draft — awaiting founder sign-off review
authority: Proposed Social Layer canon; records founder boundary/direction decisions (Q1, R1–R11, 2026-07-25). Authorizes no implementation.
founder_decisions: Q1 (2026-07-25) · R1, R2, R5, R6, R8, R9, R10, R11 resolved (2026-07-25) · R3, R4, R7 dormant
owner: Social Layer
depends_on:
  - Cairn Product Brain v1.0
  - Cairn Content Bible v1.0
created: 2026-07-24
---

# Cairn Social Layer — Idea & Decision Register v0.1

> **What this is.** A complete, ID-stable register of every social-layer idea, decision, constraint, and adjacent-but-not-social item known as of 2026-07-25 — from the repo sweep, the founder conversation, and the founder decisions Q1 and R1–R11. Rows record where an idea stands and where its authority lives.
>
> **What this is NOT.** Not a plan, not a backlog, not an implementation commitment. **No row grants permission to build** (SOC-025 / R11: documentation is not implementation authority). `PLANNED` = 0 and `EXPERIMENT` = 0, by design.
>
> **Current standing (read before the table).**
> 1. **Product reality:** Cairn is **solo-first**. No learner-to-learner social system is implemented, and none is committed. Runtime, lessons, navigation, and release plans do not depend on Social.
> 2. **Ratified direction:** a **structured · heavily moderated · lesson-connected · bounded** community layer is a founder-ratified **future direction** (SOC-029/030, Q1 + R1, 2026-07-25) — post-MVP, **not** a build commitment.
> 3. **Ratified boundaries (R1–R11, 2026-07-25):** evidence firewall stated precisely (SOC-026) · under-13 locked for current scope with a high-threshold reopen gate (SOC-028) · privacy-safe identity default (SOC-033) · social anti-gamification permanent (SOC-034) · governance accepted (SOC-025).
> 4. **Rejected forms:** the classic open forum (SOC-031) and broad public UGC / community feeds (SOC-021) — **rejections of *forms*, not of all community.**
> 5. **Still unapproved:** profiles, follows, messaging, matching, social graph, peer grading, live audio/video, teacher marketplace, mentor and group systems. Several rows are **dormant by decision** (SOC-018, SOC-023, SOC-032) and are **not blockers** to Charter ratification.
>
> Adjacent items routinely mistaken for "social" — Campfire, "A1 Social Survival" content, Mon Lexique "friendly" wording, legacy AI Chat, Word Graph, ops tester cohorts — are disambiguated in section C so they are never mis-scoped into the Social Layer.

---

## Status vocabulary (this register)

Every row's **Primary status** is exactly one of these 11 values. Definitions are binding for this register and the companion Charter.

| Status | Meaning |
|---|---|
| `CANONICAL` | Settled Cairn canon in an owning bible/brain. Reproduced here for dependency tracking; the Social Layer does not own it. |
| `FOUNDER_LOCKED` | Locked by direct founder decision; not reopenable without the founder. |
| `RATIFIED_DIRECTION` | Direction accepted by the founder but implementation detail still open. |
| `DESIGN_CANON` | Settled as design principle (derived + accepted), not a raw founder lock. |
| `PLANNED` | Committed to build with an owner and a home. **No social item currently qualifies.** |
| `EXPERIMENT` | Sanctioned trial with success criteria. None currently sanctioned. |
| `OPEN` | Live question. No decision exists. Must be resolved by the founder before it can move. |
| `DEFERRED` | Intentionally postponed; not now, not rejected. |
| `REJECTED` | Explicitly ruled out by canon. |
| `SUPERSEDED` | Replaced by a newer decision. |
| `ARCHIVED_REFERENCE` | Historical only; informs reasoning, binds nothing. |

**Authority** column values: `Founder` · `Product Brain` · `Content Bible` · `ADR` · `Build Spec` · `Derived` · `None (unsourced)`.

---

## Register

Columns: **ID · Idea / decision · Primary status · Authority · Strongest source · Owner · Dependencies · Implementation state · Reopen trigger · Notes**

### A. Foundational constraints inherited from canon (bind any social layer; not Social-owned)

| ID | Idea / decision | Status | Authority | Strongest source | Owner | Dependencies | Impl. state | Reopen trigger | Notes |
|---|---|---|---|---|---|---|---|---|---|
| SOC-001 | **No social features in the current build / validated scope** (scope directive, not a permanent product decision) | `CANONICAL` (current-scope exclusion) | Product Brain | `CLAUDE.md` "Do NOT: add social features…"; PB §17 Deliberate Non-Goals | Product Brain | — | Not built | Founder scopes a social direction into a future phase | **Implementation/scope fact, not permanent canon.** It means the *current* validated product is solo-first with no social build — it does **not** decide that Cairn is permanently solo. A missing implementation is not a product-level rejection of all community (cf. SOC-029/030). Do not read this row as "permanent social absence is Canonical." |
| SOC-002 | **No gamification: no XP, streaks, levels, badges, points** | `FOUNDER_LOCKED` | ADR-0001 / Founder | ADR-0001; PB §17; `CLAUDE.md` locked decision 2026-04-23 | Product Brain | — | Enforced (removed) | Founder reverses ADR-0001 | Directly kills the most common "social" hooks (competitive streaks, XP races). |
| SOC-003 | **No leaderboards / ranking / competitive comparison** | `FOUNDER_LOCKED` | Founder / Build Spec | Build spec "Home must not show leaderboard / streak-pressure"; PB §17 | Product Brain | SOC-002 | Not built | Founder reverses | Comparative ranking is the canonical example of a forbidden social mechanic. |
| SOC-004 | **No streak pressure / "come back tomorrow" pressure language** | `FOUNDER_LOCKED` | Founder | `CLAUDE.md` banned-language list; MASTER_PIPELINE Rule 3 | Product Brain | SOC-002 | Enforced (copy ban) | Founder reverses | Any social re-engagement loop must not reintroduce pressure language. |
| SOC-005 | **Passive-mirror dignity: system reflects, never praises/shames the learner** | `DESIGN_CANON` | ADR-0002 / Derived | ADR-0002 (passive mirror); PB tone canon | Product Brain | — | Enforced (tone) | ADR-0002 revised | Social validation loops (likes, praise, public correction) collide with this; any social design must preserve it. |
| SOC-006 | **Privacy: local-first, consent-gated remote sync** | `CANONICAL` | ADR-0023 | ADR-0023; `docs/status/remote-schema-rls-draft` | Privacy-Legal | — | Partial (RLS draft) | New data category proposed | Any social feature implies sharing learner data → gated by this. Hard dependency for all of section D. |
| SOC-007 | **Events-as-evidence: progress derives from recorded learning events only** | `CANONICAL` | Product Brain | PB verification model; three-status model | Product Brain | — | Partial | — | The Product-Brain verification model the Social Layer inherits. **Its Social-Layer application is stated precisely in SOC-026 (R8), not as a blanket ban:** engagement signals are never evidence; a discrete pedagogical action may be, only under a separately ratified evidence contract. No such contract exists today. |
| SOC-008 | **No open-ended AI chat companion** (AI is bounded support, not a social partner) | `FOUNDER_LOCKED` | Founder / Product Brain | PB §11 AI Philosophy; PB audience non-goals; DEV_APK_MVP_CANON (Chat gated off) | Product Brain | — | Chat gated off in dev-apk | Founder opens conversational AI as a feature | Disambiguates "AI as social substitute" — explicitly not a social feature and not an open companion. |

### B. Community concepts that genuinely exist

Two distinct community ideas exist and must **never** be conflated: (1) a **loyalty/monetization** community for Lifetime supporters (SOC-009), and (2) a **learning** community — a structured, moderated, lesson-connected discussion layer **founder-ratified as a preserved future direction (Q1, 2026-07-25)**, post-MVP, with no implementation commitment (SOC-029–032).

| ID | Idea / decision | Status | Authority | Strongest source | Owner | Dependencies | Impl. state | Reopen trigger | Notes |
|---|---|---|---|---|---|---|---|---|---|
| SOC-009 | **Founder / Lifetime-tier community** (a community offered to early/lifetime supporters) | `CANONICAL` (as monetization/loyalty concept) | Founder / Product Brain | PB-068 (founder Lifetime community) | Product Brain (monetization) → Social Layer (if it becomes a product surface) | SOC-006 | Not built | Founder scopes it as a product surface | A loyalty/monetization concept, **not** a peer-learning mechanic. **Distinct from the learning community (SOC-029).** Whether it ever becomes an in-app surface is `OPEN` (see SOC-020). |
| SOC-029 | **Structured lesson-connected learning community** (ask questions · compare sentence attempts · see alternative/approved explanations · belonging / "less alone" value) | `RATIFIED_DIRECTION` (founder-ratified as a preserved future direction, 2026-07-25) | Founder (decision 2026-07-25; from prior conversation) | Founder Q1 decision 2026-07-25; prior founder discussion (raw transcript not in-repo) | Social Layer | SOC-006, SOC-005, SOC-007, SOC-030 | **Not built · not planned for current build · deferred/post-MVP · requires future founder + cross-layer decisions** | Founder opens implementation, or later archives the direction | **Founder-ratified direction (Q1, 2026-07-25):** preserve this structured community as an explicit future direction while the product stays solo-first. Heavily moderated and bounded, attached to learning context — a community *around lessons*, not an open forum. **Ratifying the direction does NOT approve implementation:** not part of the validated core; not an implementation commitment; not `PLANNED`; not `CANONICAL`; not proof that learner-to-learner social is a core pillar. |
| SOC-030 | **Structured / moderated / lesson-connected as the *intended form*** (bounded discussion attached to learning context) | `RATIFIED_DIRECTION` — **R1 CONFIRMED (2026-07-25)** | Founder (R1 decision 2026-07-25; from conversation) | Founder R1 decision 2026-07-25 | Social Layer | SOC-029 | N/A — direction only, **not a build commitment** | Founder changes the preferred shape | **R1: CONFIRM.** The preserved direction is **structured · heavily moderated · lesson-connected · bounded · learning-contextual**; **not** an open forum, **not** an infinite feed, **not** unrestricted general posting. Remains a `RATIFIED_DIRECTION`, not a build commitment. The rejection of the classic open-forum form (SOC-031) remains **binding**. |
| SOC-031 | **Classic open / chaotic forum form** (Reddit-style open posting · infinite feed · unrestricted UGC conversation · weakly-moderated general discussion disconnected from lessons) | `REJECTED` (disfavoured form; confirmed by Q1, 2026-07-25) | Founder (decision 2026-07-25; from conversation) | Founder Q1 decision 2026-07-25; prior founder discussion | Social Layer | SOC-030 | N/A | Founder reverses the form preference | The founder rejects the open-forum *form*. **Replaced by** the structured, moderated, lesson-connected direction (SOC-029/030). This rejects a *form*, **not** all community functionality. |
| SOC-032 | **Possible community primitives** (lesson-specific questions · approved explanations · teacher-highlighted answers · AI-highlighted answers subject to authority + QA · structured community reflections · bounded comparison of learner attempts · guided discussion attached to learning context) | `OPEN` — **DORMANT by decision (R3, 2026-07-25)** | Founder (conversation) for existence; dormancy = Founder (R3) | Founder R3 decision 2026-07-25; prior founder discussion | Social Layer | SOC-029, SOC-030, SOC-006, SOC-007, SOC-026 | Not built · **no first primitive selected for design or implementation** | **Reactivation trigger:** explicit founder opening of Social implementation (§19), or stronger historical source evidence | **R3: LEAVE DORMANT.** These remain **conceptual primitives inside the ratified direction** — possibilities, **not separately approved features** and not implementation commitments. Each primitive's exact form, moderation authority, and QA/authority constraints remain unresolved. AI-highlighted answers stay bounded by AI-authority and QA rules (cf. SOC-008 — *curated highlighting*, not an open AI companion). Any contribution primitive also sits outside the R6 rejection (SOC-021) and still requires separate approval. Not a blocker to Charter ratification. |

### C. Adjacent-but-NOT-social items (disambiguated so they are never mis-scoped as Social)

| ID | Idea / decision | Status | Authority | Strongest source | Owner | Dependencies | Impl. state | Reopen trigger | Notes |
|---|---|---|---|---|---|---|---|---|---|
| SOC-010 | **Campfire Mode** (post-paywall solo reflection loop) | `CANONICAL` — **NOT social** | Product Brain | PB §14 Campfire (Canonical; solo; from learner's own inventory) | Product Brain / Content Bible | — | Not built | — | Name evokes group warmth but is **solo, from the learner's own inventory**. Explicitly not multiplayer. Captured to prevent mis-scope. |
| SOC-011 | **"A1 Social Survival" unit (L16–L30) / "social scenes"** | `CANONICAL` — **NOT social layer** | Build Spec | Build spec §3090 "Unit 2: L16–L30 — A1 Social Survival"; social-scene content | Content Bible / Curriculum | — | Content in progress | — | "Social" here = **content theme** (greetings, small talk *depicted* in lessons), not a social product feature. |
| SOC-012 | **Mon Lexique "friendly status mapping"** | `CANONICAL` — **NOT social** | Build Spec | Build spec §3766 "49.5 Friendly status mapping" | Content Bible / UX | — | Not built (Mon Lexique deferred in dev-apk) | — | "Friendly" = warm UI wording for word-status, **not** friends/social graph. |
| SOC-013 | **Legacy in-app AI Chat (4 modes)** | `SUPERSEDED` / gated off | Product Brain | `CLAUDE.md` AI Chat modes; DEV_APK_MVP_CANON (Chat tab gated) | Product Brain | SOC-008 | Gated off in dev-apk | Founder re-scopes | Learner-to-AI, not learner-to-learner. Not a social feature; recorded to prevent confusion. |
| SOC-014 | **Word Graph / vocabulary adjacency** | `DEFERRED` — **NOT social** | Product Brain | Future Features / Idea Index (Word Graph, post-beta) | Content Bible / Engineering | — | Not built | — | "Graph" = semantic word adjacency, **not** a social graph of people. |
| SOC-015 | **Tester cohort / self-learning admin analytics** | `CANONICAL` — **NOT social (ops)** | Ops / Privacy | `docs/status/founder-self-learning-*`; remote-schema-rls-draft | Operations-QA / Privacy-Legal | SOC-006 | Partial (RLS draft) | — | Cohorts + admin analytics are **operations/privacy**, not a learner-facing social surface. |
| SOC-016 | **Le Carnet / Dream Journal / other solo notebooks** | `DEFERRED` — **NOT social** | Product Brain | Future Features / Unmapped Ideas | Content Bible / Product Brain | — | Not built | — | Personal, private, solo. Captured only to confirm they are not social. |

### D. Open social questions

**The root direction question (SOC-017)** was **RESOLVED 2026-07-25** in favour of preserving the structured community as a future direction. The **R1–R11 decisions (2026-07-25)** then resolved several rows below: SOC-020 → `DEFERRED` (external for current scope, R2) and SOC-021 → `REJECTED` (broad public UGC/feed, R6).

Still `OPEN` here: SOC-018 (**dormant**, R4) · SOC-019 (unapproved; bounded by SOC-033) · SOC-022 · SOC-023 (**dormant**, R7) · SOC-024 (re-scoped to Product/UX/Brand/Privacy, R6). **Dormant rows are not blockers to Charter ratification** and must not be re-presented as such. Profiles, follows, DMs, matching, and a social graph are *not* inferred from the ratified direction, and anything not explicitly decided in the Founder Ratification record **remains unapproved.**

| ID | Idea / decision | Status | Authority | Strongest source | Owner | Dependencies | Impl. state | Reopen trigger | Notes |
|---|---|---|---|---|---|---|---|---|---|
| SOC-017 | **Root direction — RESOLVED (Q1, 2026-07-25): preserve the structured community as a deferred future direction; keep the product solo-first with no implementation commitment.** | `RATIFIED_DIRECTION` (resolved 2026-07-25) | Founder (Q1 decision 2026-07-25) | Founder Q1 decision 2026-07-25 | Founder → Social Layer | SOC-001, SOC-006, SOC-029 | Not built (current default remains: no social build) | Founder opens implementation, or later archives the direction | **Decision history preserved.** The question was *preserve-as-deferred-optionality vs. archive-into-permanent-solo*. **Founder chose PRESERVE (YES).** The rejected alternative (archive → intentional solo-only) is retained here, not deleted. Resolution keeps SOC-029/030/032 alive as a direction; it does **not** activate SOC-018/019/020/021/022/023/024/032 as approved features, and does **not** commit implementation. |
| SOC-018 | **Peer practice / speaking-partner / conversation exchange** | `OPEN` — **DORMANT by decision (R4, 2026-07-25)** | None (unsourced); dormancy = Founder (R4) | — (no in-repo or founder-discussion proposal) | Founder → Social Layer | SOC-017, SOC-005, SOC-006, SOC-008 | Not built · not approved | **Reactivation trigger:** explicit founder opening of Social implementation (§19), or stronger historical source evidence | **R4: LEAVE DORMANT** — bounded AI (SOC-008) remains sufficient for the solo-first product. No speaking-partner, peer-practice, matching, or language-exchange system approved. **Not** implied by the structured community (discussion/reflection, not live 1:1 practice). Not a blocker to Charter ratification. |
| SOC-019 | **Learner profiles / follows / social graph** | `OPEN` (unapproved) | None (unsourced); **bounded by SOC-033** | — | Founder → Social Layer | SOC-017, SOC-006, **SOC-033** | Not built · not approved | Founder scopes under §19 | Genuinely unsourced **as a feature**. **Explicitly not inferred** from SOC-029. R5 did **not** approve profiles — it set the privacy default that would bind them *if* ever opened (SOC-033). |
| SOC-020 | **In-app surface for the Lifetime loyalty community (SOC-009)** | `DEFERRED` — **R2 (2026-07-25): EXTERNAL for current scope** | Founder (R2 decision 2026-07-25) | Founder R2 decision 2026-07-25 | Social Layer / Product Brain (monetization) | SOC-009, SOC-006 | Not built · **no in-app surface approved** | Founder scopes an in-app surface under §19 | **R2: loyalty community stays EXTERNAL for the current product scope.** Future in-app integration remains `DEFERRED` — **never label it `PLANNED`.** Loyalty community and learner-learning community (SOC-029) are **separate concepts**; neither inherits the other's permissions, moderation model, or product surface. |
| SOC-021 | **Broad public UGC / community feed** (open public posting · unrestricted learner-content feeds · public mistake feeds · public performance feeds · infinite community content · popularity-driven distribution · weakly-moderated public sharing) | `REJECTED` — **R6 (2026-07-25)** | Founder (R6 decision 2026-07-25) | Founder R6 decision 2026-07-25 | Social Layer | SOC-005, SOC-031, SOC-034 | N/A — rejected | Founder reverses R6 | **R6: REJECTED.** ⚠️ **Do not over-read:** this rejects *broad public UGC and feed mechanics*, **not every bounded community contribution.** Lesson-specific questions, bounded attempt comparison, approved explanations, moderated reflections, and selected/reviewed contributions remain possible **only inside the ratified direction (SOC-029/030/032) and require separate approval** — they are neither approved nor rejected here. |
| SOC-022 | **Referral / invite / word-of-mouth mechanic** | `OPEN` | None (unsourced) | — | Founder / Growth → Social Layer | SOC-004 (no pressure), SOC-034 | Not built · not approved | Founder scopes under §19 | Genuinely unsourced. Growth-adjacent; any mechanic must avoid streak/pressure/gamified framing (SOC-034). |
| SOC-023 | **Cohort / group learning (shared class, study group)** | `OPEN` — **DORMANT by decision (R7, 2026-07-25)** | None (unsourced); dormancy = Founder (R7) | — (SOC-015 is ops cohorts, not this) | Founder → Social Layer | SOC-017, SOC-006, SOC-007 | Not built · not approved | **Reactivation trigger:** explicit founder opening of Social implementation (§19), or stronger historical source evidence | **R7: LEAVE DORMANT** — no learner cohort, classroom, group-learning, or community-group system approved. **Operational tester cohorts (SOC-015) remain non-social and must NOT be used as evidence for learner-community design.** Not a blocker to Charter ratification. |
| SOC-024 | **User-initiated *outward* sharing** (learner deliberately shares a milestone outside Cairn) | `OPEN` — re-scoped by R6 (2026-07-25) | Derived; scope routing = Founder (R6) | Founder R6 decision 2026-07-25; SOC-002, SOC-004, SOC-005 | Product / UX / Brand / Privacy (**not** Social Layer feed) | SOC-002, SOC-005, SOC-006 | Not built · not approved | Founder/Product scopes | **R6 explicitly kept this OPEN and separate.** This is *not* an in-app social feed and must never be treated as one. Routed to Product/UX/Brand/Privacy. Gamified milestone-broadcasting remains constrained by SOC-002/004/005/034. |

### E. Governance, founder-ratified invariants, and process rows for the Social Layer itself

| ID | Idea / decision | Status | Authority | Strongest source | Owner | Dependencies | Impl. state | Reopen trigger | Notes |
|---|---|---|---|---|---|---|---|---|---|
| SOC-025 | **Governance: documentation is not implementation authority; Social work begins only on an explicit scoped founder opening** | `FOUNDER_LOCKED` — **R11 ACCEPTED (2026-07-25)** | Founder (R11 decision 2026-07-25) | Founder R11 decision 2026-07-25 | Social Layer | SOC-001 | N/A (governance in force) | Founder revises the protocol | **R11: ACCEPT.** Nothing moves from `OPEN`, `DEFERRED`, `EXPERIMENT`, or `RATIFIED_DIRECTION` into design/implementation **merely because an agent finds it documented.** The opening decision must state all ten: exact primitive/feature · target user · intended value · current status · safety prerequisites · affected Bibles · evidence relationship · implementation boundary · validation plan · stop condition. **"Continue the project" / "build the future systems" is NOT sufficient authority.** |
| SOC-026 | **Evidence firewall: engagement signals are never evidence; a pedagogical action may be, only under a separately ratified evidence contract** | `FOUNDER_LOCKED` — **R8 RATIFIED (2026-07-25)** | Founder (R8 decision 2026-07-25) | Founder R8 decision 2026-07-25; SOC-007 | Social Layer / Product Brain | SOC-007 | N/A (no evidence contract exists → **no social action is evidence today**) | Founder ratifies a specific evidence contract | **R8 — precise boundary supersedes the earlier absolute wording.** Binding rule: *Social engagement signals do not constitute mastery evidence. A discrete pedagogical action performed within a future social context may count as learning evidence only if governed by a separately ratified evidence contract and satisfying the same validity, prerequisite, attribution, anti-gaming and error-source requirements as an equivalent non-social action.* **Never evidence alone:** likes · reactions · replies · posting frequency · time in community · participation count · popularity · reputation · partner presence · giving/receiving a correction · social completion · community streaks · peer approval · teacher/moderator approval without a contract. **Social context alone must never upgrade an action into evidence.** Changes nothing in Content Bible or current mastery implementation. |
| SOC-027 | **Any social data is consent-gated and RLS-scoped** | `CANONICAL` (inherited) | ADR-0023 | SOC-006 | Privacy-Legal | SOC-006 | Partial | — | Restates the privacy dependency as a Social-Layer invariant. |
| SOC-028 | **Under-13 Social participation: locked current-scope prohibition with a high-threshold reopen gate** | `FOUNDER_LOCKED` — **R10 (2026-07-25)** | Founder (R10 decision 2026-07-25) | Founder R10 decision 2026-07-25; PB audience non-goals | Product Brain / Privacy-Legal | SOC-006 | N/A — prohibited in current scope | **High-threshold gate:** a new explicit founder + canon decision, only after child-safety, parental-consent, legal, privacy, moderation, data-retention, identity and operational requirements are fully designed **and independently reviewed** | **R10 — replaces the earlier absolute "permanently, regardless of any future change" wording.** Binding rule: *Cairn does not permit under-13 participation in learner-to-learner Social systems under the current product scope.* Until the requirements **and** the explicit reopening decision exist: no under-13 Social pilot · no child-account interaction · no adult–minor matching · no direct communication involving under-13 users · **no assumption that a general age-policy change automatically opens Social access.** A locked current-scope safety boundary with a high-threshold reopening protocol — **not** a silent permanent claim about every possible future Cairn product. |
| SOC-033 | **Privacy-safe identity default for any future Social surface** | `FOUNDER_LOCKED` — **R5 RATIFIED (2026-07-25)** | Founder (R5 decision 2026-07-25) | Founder R5 decision 2026-07-25 | Social Layer / Privacy-Legal | SOC-006, SOC-019, SOC-027 | N/A — **boundary only; no profile system approved or built** | Founder explicitly opens an identity-bearing Social surface under §19 | **R5 — a boundary, NOT a feature approval.** By default: no public real-name profile · no publicly discoverable learner profile · no public social graph · **no profile required for the current solo-first experience.** *If* a structured community is ever explicitly opened: minimum viable identity must be **pseudonymous or otherwise privacy-preserving**, visibility **opt-in**, identity fields **minimized**, discoverability **never silently enabled**, and **real-name exposure requires a separate explicit decision with privacy justification.** Does **not** approve profiles (see SOC-019, still `OPEN`/unapproved). |
| SOC-034 | **Anti-gamification firewall extends permanently to the Social Layer** | `FOUNDER_LOCKED` — **R9 RATIFIED (2026-07-25)** | Founder (R9 decision 2026-07-25) | Founder R9 decision 2026-07-25; ADR-0001 | Social Layer | SOC-002, SOC-003, SOC-004 | N/A (constraint in force) | Founder reverses (permanent principle — high bar) | **R9: YES — permanent Social-Layer principle.** Future Social features must not introduce: friend streaks · social XP · public ranks · leaderboards · popularity levels · competitive progress comparison · "someone passed you" messaging · pressure-based participation · engagement rewards disconnected from learning value. **Narrow carve-out:** trust-and-safety signals may exist **operationally**, but must never be presented as popularity, learner worth, or learning mastery. |

---

## Counts

**By primary status (34 rows) — recalculated after the R1–R11 ratification (2026-07-25):**

| Status | Count | IDs |
|---|---|---|
| `CANONICAL` | 9 | SOC-001, SOC-006, SOC-007, SOC-009, SOC-010, SOC-011, SOC-012, SOC-015, SOC-027 |
| `FOUNDER_LOCKED` | 9 | SOC-002, SOC-003, SOC-004, SOC-008, SOC-025, SOC-026, SOC-028, SOC-033, SOC-034 |
| `RATIFIED_DIRECTION` | 3 | SOC-017, SOC-029, SOC-030 |
| `DESIGN_CANON` | 1 | SOC-005 |
| `PLANNED` | 0 | — |
| `EXPERIMENT` | 0 | — |
| `OPEN` | 6 | SOC-018*, SOC-019, SOC-022, SOC-023*, SOC-024, SOC-032* (*= dormant by decision) |
| `DEFERRED` | 3 | SOC-014, SOC-016, SOC-020 |
| `REJECTED` | 2 | SOC-021 (broad public UGC/feed), SOC-031 (open-forum form) |
| `SUPERSEDED` | 1 | SOC-013 |
| `ARCHIVED_REFERENCE` | 0 | — |

**Total: 34 rows** (was 32; **new: SOC-033** privacy-safe identity default, **SOC-034** social anti-gamification firewall).

**Key signals — unchanged where it matters most: `PLANNED = 0`, `EXPERIMENT = 0`.** No social feature is built, committed, or sanctioned for trial, **even after Q1 and R1–R11**. What the ratification did was **harden boundaries**, not approve features:

- `FOUNDER_LOCKED` rose **5 → 9** — the ratification's real effect. Four invariants hardened: governance (SOC-025), evidence firewall (SOC-026), under-13 gate (SOC-028), plus two new locks (SOC-033 identity default, SOC-034 social anti-gamification).
- `REJECTED` rose **1 → 2** (SOC-021 broad public UGC/feed added).
- `DEFERRED` rose **2 → 3** (SOC-020 in-app loyalty surface — external for current scope).
- `OPEN` fell **8 → 6**, of which **three are dormant by decision** (SOC-018, SOC-023, SOC-032) — leaving only **3 genuinely live open rows** (SOC-019, SOC-022, SOC-024).
- `RATIFIED_DIRECTION` fell 4 → 3 only because SOC-025 was **upgraded** to `FOUNDER_LOCKED`; `DESIGN_CANON` fell 2 → 1 because SOC-026 was likewise upgraded.

SOC-001 remains `CANONICAL` only as a **current-scope** exclusion (solo-first now), not a permanent-solo decision.

**By owner (first-listed owner = routing authority):**

| Owner | Count | IDs |
|---|---|---|
| Social Layer | 16 | SOC-017, 018, 019, 020, 021, 022, 023, 025, 026, 029, 030, 031, 032, 033, 034 — *and SOC-024 routed out (see below)* |
| Product Brain | 11 | SOC-001, 002, 003, 004, 005, 007, 008, 009, 010, 013, 028 |
| Content Bible | 4 | SOC-011, 012, 014, 016 |
| Privacy-Legal | 2 | SOC-006, 027 |
| Operations-QA | 1 | SOC-015 |

> **SOC-024 was re-routed by R6** to **Product / UX / Brand / Privacy** (user-initiated outward sharing is not a Social feed), so Social Layer owns **15** rows directly and SOC-024 is owned outside the layer. Several rows are co-owned; the **first-listed** owner is authoritative. Total = 34.

**By authority — "unsourced" shrank again.** `None (unsourced)` now = **5** (SOC-018, 019, 022, 023, 024) — down from 6, since SOC-021 gained direct `Founder (R6 decision)` authority when it was rejected. Nine rows now carry direct **`Founder (decision 2026-07-25)`** authority: SOC-017, 020, 021, 025, 026, 028, 030, 033, 034 (plus SOC-029/031 from Q1). Profiles, referral, cohort learning, and outward sharing remain genuinely unsourced — and unapproved.

**By question state (12 founder questions):** **9 resolved** (Q1, R1, R2, R5, R6, R8, R9, R10, R11) · **3 dormant by decision** (R3, R4, R7) · **0 blocking Charter ratification.**

**By implementation state (32 rows):** Not built / N/A / gated: 27 · Partial: 4 (SOC-006, SOC-007, SOC-015, SOC-027) · Content in progress: 1 (SOC-011) · Constraints in force (enforced/gated): SOC-002, SOC-004, SOC-005, SOC-008, SOC-013. **Zero** social features are built — including the deferred community direction (SOC-029), which is discussed, not implemented.

---

## The two things a future reader must not get wrong

**1. SOC-017 is resolved — as a *direction*, not a build.** The founder answered Q1 (2026-07-25) with **YES — preserve the structured community as a deferred direction** while the product stays solo-first with no implementation commitment. The rejected alternative (archive → permanent solo-only) is retained in the SOC-017 decision history, not deleted.

**2. The R1–R11 ratification (2026-07-25) hardened boundaries; it approved nothing.** `PLANNED` and `EXPERIMENT` remain **0**. The measurable effect was `FOUNDER_LOCKED` rising 5 → 9. Anything not explicitly decided in [`SOCIAL_LAYER_FOUNDER_RATIFICATION_v0.1.md`](SOCIAL_LAYER_FOUNDER_RATIFICATION_v0.1.md) — profiles, messaging, follows, matching, social graph, peer grading, live audio/video, teacher marketplace, mentor systems, group systems — **remains unapproved. Silence is never approval.**

**And the governing rule over both:** per SOC-025 (R11), **finding something written in this register is not authority to build it.** Social work begins only on an explicit, scoped founder opening that states all ten required elements.

*End of Register v0.1. Draft; records founder decisions Q1 and R1–R11 (2026-07-25); authorizes no build.*
