---
title: Cairn Social Layer — Idea & Decision Register
version: 0.1
status: Draft — awaiting founder ratification
authority: Proposed Social Layer canon (nothing here is canonized by this document)
owner: Social Layer
depends_on:
  - Cairn Product Brain v1.0
  - Cairn Content Bible v1.0
created: 2026-07-24
---

# Cairn Social Layer — Idea & Decision Register v0.1

> **What this is.** A complete, ID-stable register of every social-layer idea, decision, constraint, and adjacent-but-not-social item that could be recovered from the Cairn repo as of 2026-07-24. It is a *capture* artifact, not a canon artifact. **No row here canonizes anything.** Rows record where an idea currently stands and where its authority lives.
>
> **What this is NOT.** Not a plan, not a backlog, not a commitment. No row grants permission to build. Positive social features (profiles, follows, messaging, peer practice, UGC, referral) are recorded here **only** as `OPEN` or `DEFERRED` — they are captured, never invented, because **no in-repo source proposes them**.
>
> **Critical finding (read before the table).** Cairn's canon contains **no positive learner-to-learner social feature**. What exists is: (a) explicit non-goals that *forbid* social/gamified mechanics; (b) inherited principles that would *constrain* any future social layer; (c) exactly one community concept (the founder Lifetime-tier community, PB-068), which is monetization/loyalty-adjacent, not a peer-learning mechanic; and (d) several adjacent items that are routinely mistaken for "social" and are disambiguated here so they are never mis-scoped into the Social Layer.

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
| SOC-007 | **Events-as-evidence: progress derives from recorded learning events only** | `CANONICAL` | Product Brain | PB verification model; three-status model | Product Brain | — | Partial | — | **Social interaction must never count as mastery evidence.** Binding invariant for the Social Layer. |
| SOC-008 | **No open-ended AI chat companion** (AI is bounded support, not a social partner) | `FOUNDER_LOCKED` | Founder / Product Brain | PB §11 AI Philosophy; PB audience non-goals; DEV_APK_MVP_CANON (Chat gated off) | Product Brain | — | Chat gated off in dev-apk | Founder opens conversational AI as a feature | Disambiguates "AI as social substitute" — explicitly not a social feature and not an open companion. |

### B. Community concepts that genuinely exist

Two distinct community ideas exist and must **never** be conflated: (1) a **loyalty/monetization** community for Lifetime supporters (SOC-009), and (2) a **learning** community — a structured, moderated, lesson-connected discussion layer **founder-ratified as a preserved future direction (Q1, 2026-07-25)**, post-MVP, with no implementation commitment (SOC-029–032).

| ID | Idea / decision | Status | Authority | Strongest source | Owner | Dependencies | Impl. state | Reopen trigger | Notes |
|---|---|---|---|---|---|---|---|---|---|
| SOC-009 | **Founder / Lifetime-tier community** (a community offered to early/lifetime supporters) | `CANONICAL` (as monetization/loyalty concept) | Founder / Product Brain | PB-068 (founder Lifetime community) | Product Brain (monetization) → Social Layer (if it becomes a product surface) | SOC-006 | Not built | Founder scopes it as a product surface | A loyalty/monetization concept, **not** a peer-learning mechanic. **Distinct from the learning community (SOC-029).** Whether it ever becomes an in-app surface is `OPEN` (see SOC-020). |
| SOC-029 | **Structured lesson-connected learning community** (ask questions · compare sentence attempts · see alternative/approved explanations · belonging / "less alone" value) | `RATIFIED_DIRECTION` (founder-ratified as a preserved future direction, 2026-07-25) | Founder (decision 2026-07-25; from prior conversation) | Founder Q1 decision 2026-07-25; prior founder discussion (raw transcript not in-repo) | Social Layer | SOC-006, SOC-005, SOC-007, SOC-030 | **Not built · not planned for current build · deferred/post-MVP · requires future founder + cross-layer decisions** | Founder opens implementation, or later archives the direction | **Founder-ratified direction (Q1, 2026-07-25):** preserve this structured community as an explicit future direction while the product stays solo-first. Heavily moderated and bounded, attached to learning context — a community *around lessons*, not an open forum. **Ratifying the direction does NOT approve implementation:** not part of the validated core; not an implementation commitment; not `PLANNED`; not `CANONICAL`; not proof that learner-to-learner social is a core pillar. |
| SOC-030 | **Structured / moderated / lesson-connected as the *intended form*** (bounded discussion attached to learning context) | `RATIFIED_DIRECTION` (founder-preferred shape) | Founder (conversation) | Prior founder discussion | Social Layer | SOC-029 | N/A | Founder changes preferred shape | The founder's discussion expressed a clear **shape preference**: heavily moderated, structured, lesson-attached — closer to guided lesson discussion / community reflection than to open posting. This is a direction preference, not a build commitment. |
| SOC-031 | **Classic open / chaotic forum form** (Reddit-style open posting · infinite feed · unrestricted UGC conversation · weakly-moderated general discussion disconnected from lessons) | `REJECTED` (disfavoured form; confirmed by Q1, 2026-07-25) | Founder (decision 2026-07-25; from conversation) | Founder Q1 decision 2026-07-25; prior founder discussion | Social Layer | SOC-030 | N/A | Founder reverses the form preference | The founder rejects the open-forum *form*. **Replaced by** the structured, moderated, lesson-connected direction (SOC-029/030). This rejects a *form*, **not** all community functionality. |
| SOC-032 | **Possible community primitives** (lesson-specific questions · approved explanations · teacher-highlighted answers · AI-highlighted answers subject to authority + QA · structured community reflections · bounded comparison of learner attempts · guided discussion attached to learning context) | `OPEN` (specific primitives unresolved) | Founder (conversation), partial | Prior founder discussion | Social Layer | SOC-029, SOC-030, SOC-006, SOC-007 | Not built | Founder scopes specific primitives | The concrete building blocks named in discussion. Grouped as one coherent concept, but each primitive's exact form, moderation authority, and QA/authority constraints remain unresolved. AI-highlighted answers stay bounded by AI-authority and QA rules (cf. SOC-008 — this is *curated highlighting*, not an open AI companion). |

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

Two kinds live here. **The root direction question (SOC-017)** — **RESOLVED 2026-07-25** in favour of preserving the structured community as a deferred future direction. And the **genuinely-unsourced positive features (SOC-018, 019, 021*, 022, 023, 024)** — for which **no source and no founder discussion exists**, which remain `OPEN` and were **not** activated by the Q1 resolution. Profiles, follows, DMs, and a social graph are *not* inferred from the ratified direction.

| ID | Idea / decision | Status | Authority | Strongest source | Owner | Dependencies | Impl. state | Reopen trigger | Notes |
|---|---|---|---|---|---|---|---|---|---|
| SOC-017 | **Root direction — RESOLVED (Q1, 2026-07-25): preserve the structured community as a deferred future direction; keep the product solo-first with no implementation commitment.** | `RATIFIED_DIRECTION` (resolved 2026-07-25) | Founder (Q1 decision 2026-07-25) | Founder Q1 decision 2026-07-25 | Founder → Social Layer | SOC-001, SOC-006, SOC-029 | Not built (current default remains: no social build) | Founder opens implementation, or later archives the direction | **Decision history preserved.** The question was *preserve-as-deferred-optionality vs. archive-into-permanent-solo*. **Founder chose PRESERVE (YES).** The rejected alternative (archive → intentional solo-only) is retained here, not deleted. Resolution keeps SOC-029/030/032 alive as a direction; it does **not** activate SOC-018/019/020/021/022/023/024/032 as approved features, and does **not** commit implementation. |
| SOC-018 | **Peer practice / speaking-partner / conversation exchange** | `OPEN` | None (unsourced) | — (no in-repo or founder-discussion proposal) | Founder → Social Layer | SOC-017, SOC-005, SOC-006, SOC-008 | Not built | Founder scopes | Genuinely unsourced. **Not** implied by the structured community (which is discussion/reflection, not live 1:1 practice). Must not be invented as PLANNED. |
| SOC-019 | **Learner profiles / follows / social graph** | `OPEN` | None (unsourced) | — | Founder → Social Layer | SOC-017, SOC-006 | Not built | Founder scopes | Genuinely unsourced. **Explicitly not inferred** from SOC-029 — a moderated lesson-discussion layer does not require or imply profiles, follows, or a social graph. |
| SOC-020 | **In-app surface for the Lifetime community (SOC-009)** | `OPEN` | Derived from SOC-009 | PB-068 (community exists as offer) | Social Layer / Product Brain (monetization) | SOC-009, SOC-006 | Not built | Founder scopes a surface | Whether the *loyalty* community ever appears inside the app (vs. an external Discord/forum) is undecided. Distinct from SOC-029 (learning community). |
| SOC-021 | **Broad / unrestricted user-generated content** (open sentence posting, public decks, free-form UGC) | `OPEN` / leans `REJECTED` | None (unsourced) | — (SOC-005 constrains; SOC-031 disfavours open form) | Founder → Social Layer | SOC-017, SOC-005, SOC-006, SOC-031 | Not built | Founder scopes | **Narrowed:** *broad/unrestricted* UGC is unsourced and leans rejected. The **bounded, moderated comparison of learner attempts** discussed with the founder is *not* here — it lives under SOC-032 as a curated primitive, not open UGC. |
| SOC-022 | **Referral / invite / word-of-mouth mechanic** | `OPEN` | None (unsourced) | — | Founder / Growth → Social Layer | SOC-004 (no pressure) | Not built | Founder scopes | Genuinely unsourced. Growth-adjacent; any mechanic must avoid streak/pressure/gamified framing. |
| SOC-023 | **Cohort / group learning (shared class, study group)** | `OPEN` | None (unsourced) | — (SOC-015 is ops cohorts, not this) | Founder → Social Layer | SOC-017, SOC-006, SOC-007 | Not built | Founder scopes | Genuinely unsourced. Distinct from ops tester cohorts (SOC-015) and from the discussion-oriented community (SOC-029). No learner-facing group-learning proposal exists. |
| SOC-024 | **Social visibility of progress (sharing achievements outward)** | `OPEN` / leans `REJECTED` | Derived | SOC-002, SOC-004, SOC-005 | Founder → Social Layer | SOC-002, SOC-005 | Not built | Founder scopes | Genuinely unsourced. Sharing achievements reintroduces gamified comparison; canon leans against. |

### E. Governance / process rows for the Social Layer itself

| ID | Idea / decision | Status | Authority | Strongest source | Owner | Dependencies | Impl. state | Reopen trigger | Notes |
|---|---|---|---|---|---|---|---|---|---|
| SOC-025 | **Social Layer requires an explicit founder "open" before any build** | `RATIFIED_DIRECTION` (proposed) | Derived from SOC-001 | SOC-001 | Social Layer | SOC-001 | N/A | — | Proposed governance rule: nothing in the Social Layer moves from OPEN without a founder decision. |
| SOC-026 | **Social interaction is never mastery/verification evidence** | `DESIGN_CANON` (proposed invariant) | Derived from SOC-007 | SOC-007 | Social Layer / Product Brain | SOC-007 | N/A | — | Proposed hard invariant for the layer, inherited from events-as-evidence. |
| SOC-027 | **Any social data is consent-gated and RLS-scoped** | `CANONICAL` (inherited) | ADR-0023 | SOC-006 | Privacy-Legal | SOC-006 | Partial | — | Restates the privacy dependency as a Social-Layer invariant. |
| SOC-028 | **Children / under-13 social interaction is out of scope** | `FOUNDER_LOCKED` (inherited) | Founder / Product Brain | PB audience non-goals (children not an audience) | Product Brain / Privacy-Legal | — | N/A | Founder changes audience | Any social layer inherits the no-children audience stance; social + minors is not entertained. |

---

## Counts

**By primary status (32 rows):**

| Status | Count | IDs |
|---|---|---|
| `CANONICAL` | 9 | SOC-001, SOC-006, SOC-007, SOC-009, SOC-010, SOC-011, SOC-012, SOC-015, SOC-027 |
| `FOUNDER_LOCKED` | 5 | SOC-002, SOC-003, SOC-004, SOC-008, SOC-028 |
| `RATIFIED_DIRECTION` | 4 | SOC-017, SOC-025, SOC-029, SOC-030 |
| `DESIGN_CANON` | 2 | SOC-005, SOC-026 |
| `PLANNED` | 0 | — |
| `EXPERIMENT` | 0 | — |
| `OPEN` | 8 | SOC-018, SOC-019, SOC-020, SOC-021, SOC-022, SOC-023, SOC-024, SOC-032 |
| `DEFERRED` | 2 | SOC-014, SOC-016 |
| `REJECTED` | 1 | SOC-031 (open-forum *form* only) |
| `SUPERSEDED` | 1 | SOC-013 |
| `ARCHIVED_REFERENCE` | 0 | — |

**Total: 32 rows.** Key signals: **PLANNED = 0, EXPERIMENT = 0** — no social feature is built, committed, or sanctioned for trial, **even after the Q1 ratification**. The Q1 decision (2026-07-25) moved the root question (SOC-017) and the structured-community concept (SOC-029) to `RATIFIED_DIRECTION` — a **direction is preserved, not a feature approved**. The shape preference (SOC-030) is `RATIFIED_DIRECTION`; the open-forum *form* (SOC-031) is `REJECTED`. SOC-001 remains `CANONICAL` only as a **current-scope** exclusion (solo-first now), not a permanent-solo decision. `RATIFIED_DIRECTION` rose 2 → 4; `OPEN` fell 9 → 8; `DEFERRED` fell 3 → 2.

**By owner (first-listed owner = routing authority):**

| Owner | Count | IDs |
|---|---|---|
| Social Layer (proposed) | 14 | SOC-017, 018, 019, 020, 021, 022, 023, 024, 025, 026, 029, 030, 031, 032 |
| Product Brain | 11 | SOC-001, 002, 003, 004, 005, 007, 008, 009, 010, 013, 028 |
| Content Bible | 4 | SOC-011, 012, 014, 016 |
| Privacy-Legal | 2 | SOC-006, 027 |
| Operations-QA | 1 | SOC-015 |

> Several rows are co-owned; the **first-listed** owner in each row is authoritative for routing. Total = 32.

**By authority — the "unsourced" set shrank.** `None (unsourced)` now = **6** (SOC-018, 019, 021, 022, 023, 024) — down from 7. The founder-conversation evidence, now confirmed by the **Q1 decision (2026-07-25)**, moved the community family (belonging, question-asking, attempt comparison, approved/highlighted explanations) into direct `Founder (decision/conversation)` provenance (SOC-017, 029, 030, 031) with SOC-032 primitives still `OPEN`. Profiles, follows, DMs, social graph, referral, cohort learning, broad UGC, and outward sharing remain genuinely unsourced and dormant.

**By implementation state (32 rows):** Not built / N/A / gated: 27 · Partial: 4 (SOC-006, SOC-007, SOC-015, SOC-027) · Content in progress: 1 (SOC-011) · Constraints in force (enforced/gated): SOC-002, SOC-004, SOC-005, SOC-008, SOC-013. **Zero** social features are built — including the deferred community direction (SOC-029), which is discussed, not implemented.

---

## The single most important row — now resolved

**SOC-017 is the root, and it was RESOLVED on 2026-07-25.** The founder answered Q1 with **YES — preserve the structured community as a deferred direction** while the product stays solo-first with no implementation commitment. This moved SOC-017 and SOC-029 to `RATIFIED_DIRECTION`. It preserves the direction (SOC-029/030/032) as an explicit future option; it does **not** approve implementation and does **not** activate the genuinely-unsourced features (SOC-018, 019, 020, 021, 022, 023, 024, 032), which remain dormant `OPEN` until separately and explicitly scoped by the founder. The rejected alternative (archive → permanent solo-only) is retained in the SOC-017 decision history, not deleted.

*End of Register v0.1. Draft capture; canonizes nothing; authorizes no build. Records one founder direction decision (Q1, 2026-07-25).*
