# Cairn / Le Mot — Documentation Entry Point

> **Navigation only.** This file routes readers to the current sources of truth.
> It creates no authority, replaces no domain canon, and authorizes no
> implementation. Where this file and a Canonical document disagree, the
> Canonical document wins.

---

## 1. Start here

Project-wide authority, precedence, ownership, and conflict routing live in the
**Cairn Project Canon Map v1.0** — read it before anything else:

- `docs/canon/CAIRN_PROJECT_CANON_MAP_v1.0.md` (Canonical, signed off 2026-07-26)

If you are new to this tree, read in this order:

1. **Project Canon Map** — who owns which domain, how conflicts resolve, where
   the gaps are.
2. **Product Brain v1.0** — product promise, identity, and major scope
   decisions.
3. The **domain Bible or Charter** that owns your question (table below).

Supporting routing documents (under the Canon Map, not independent canon):
`docs/canon/CAIRN_AUTHORITY_AND_ROUTING_SPEC_v0.1.md` (conflict algorithm,
stop conditions, implementation-opening protocol) and
`docs/canon/CAIRN_CANON_COVERAGE_AND_GAPS_v0.1.md` (what is and is not covered).

---

## 2. Current Canonical stack

| Domain | Primary authority | Status | Use for |
|---|---|---|---|
| Project-wide routing | [Cairn Project Canon Map v1.0](canon/CAIRN_PROJECT_CANON_MAP_v1.0.md) | Canonical | Authority, precedence, ownership, and gap routing |
| Product | [Cairn Product Brain v1.0](../obsidian-product-brain/ACTIVE_CODEX/00_CAIRN_PRODUCT_BRAIN/CAIRN_PRODUCT_BRAIN_v1.0.md) | Canonical | Product promise, identity, major scope decisions |
| Content | [Cairn Content Bible v1.0](bibles/content/CONTENT_BIBLE_v1.0.md) | Canonical | Content authoring, activity contracts, French-content safety boundaries |
| Curriculum | [Cairn Curriculum Charter v1.0](bibles/curriculum/CURRICULUM_CHARTER_v1.0.md) | Canonical; Charter-stage authority | Current L0–L17 tiered spine, sequencing governance, curriculum boundaries and stop conditions |
| Social | [Cairn Social Layer Charter v1.0](bibles/social/SOCIAL_LAYER_CHARTER_v1.0.md) | Canonical, dormant | Negative bounds and future social direction |
| Mastery & evidence | [Cairn Mastery & Evidence Bible v1.0](bibles/mastery-evidence/MASTERY_EVIDENCE_BIBLE_v1.0.md) | Canonical | Evidence admissibility and mastery derivation |

**Canonical does not mean implemented.** None of these documents authorizes
code. The Social layer is dormant: nothing social is built, planned, or
authorized, and no positive social evidence contract exists (PRJ-009 is
`OPEN`) — no social action counts as evidence today. The shipped
mastery/evidence runtime does **not** conform to the Canonical Bible; current
runtime reality is recorded separately in
`docs/bibles/mastery-evidence/MASTERY_EVIDENCE_CURRENT_REALITY_AND_ENFORCEMENT_MAP_v0.1.md`.

---

## 3. Domain-first routing

Route a question to its owner first, not to the newest or nearest document:

- **Product promise and major scope** → Product Brain v1.0
- **Content correctness and authoring contracts** → Content Bible v1.0
- **Exact course sequencing and lesson placement** → Curriculum Charter
  v1.0 for the current **L0–L17 tiered spine**; the **exact post-L17
  sequence remains open** and the **full Curriculum Bible does not yet
  exist** — post-spine sequencing questions still stop and report.
  Implementation remains separate (Canonical ≠ implemented)
- **Item counting** (what active-new 1–4 counts; frames + linked IDs;
  fillers; chunks, packages, senses, inflection, gender; which historical
  numbers remain valid) → **PRJ-015 Item-Counting Contract v1.0**
  (`bibles/curriculum/PRJ_015_ITEM_COUNTING_CONTRACT_v1.0.md`, Canonical
  2026-07-29 — a subordinate Curriculum authority; counting language
  only, no enforcement exists)
- **Evidence admissibility and mastery derivation** → Mastery & Evidence
  Bible v1.0
- **Social negative bounds and future direction** → Social Layer Charter v1.0
- **Runtime schemas, persistence, validators, enforcement** → Engineering
  Bible — **not yet authored**; accepted, in-domain implementation ADRs bind
  (check each ADR's own status — the `ADR-####` name alone confers none)
- **Cross-domain authority conflict** → Project Canon Map v1.0

**Stop condition:** if a task requires authority owned by an unauthored layer
(e.g. a binding sequencing decision), **stop and report**. Do not improvise the
missing owner, and do not infer permission from documentation presence.

---

## 4. Canon versus supporting records

**Primary authority:**

- Canonical Bibles, Charters, and the Project Canon Map
- accepted ADRs, within each ADR's own declared scope

**Supporting provenance** (decision matrices, ratification records, founder
reviews, sign-off reviews, source and gap maps, read-through packs,
enforcement/current-reality maps): these explain how a Canonical document got
its status and what remains open. They never independently outrank their
Canonical parent.

---

## 5. Execution documents (current build)

`docs/MASTER_PIPELINE_v1.2.1.md` is authoritative for the **current-build
execution pipeline** within its defined scope: how work is done, task tiers,
review-then-commit discipline, cloud-session rules, and the operator/agent
role split. Follow it for any code PR.

It is **not** the top-level authority for project identity, cross-domain
canon, Content rules, Social rules, Mastery semantics, or unauthored
Curriculum decisions — those route through the Project Canon Map to their
domain owners.

The same scoping applies to the current-build chain
(`CLAUDE.md → docs/STATUS.md → docs/DEV_APK_MVP_CANON.md → Cairn v1.0 spec`):
it remains valid for current-build execution scope only — what ships now, what
the active branch may touch — and must not be used to route around any
Canonical domain owner (founder decision Q1, 2026-07-26; ADR-0024 as
scope-amended). For "what actually runs today," code, tests, and
`docs/STATUS.md` govern factual reality; implementation evidence never
determines product intent.

---

## 6. Important open layers and dependencies

Pointer only — the authoritative current list lives in the Canon Map (§16) and
`docs/canon/CAIRN_CANON_COVERAGE_AND_GAPS_v0.1.md`. At minimum, know that:

- **Curriculum Bible** — not yet authored; the Curriculum Charter v1.0
  (Canonical, 2026-07-28) governs only the current L0–L17 spine — post-L17
  sequencing and the full sequencing architecture remain open (PRJ-001
  `OPEN`, narrowed scope)
- **Engineering Bible** — not yet authored (ADRs partially bind)
- **Operations & QA authority** — not yet authored
- **PRJ-009** positive social evidence contract — `OPEN`; no social action is
  evidence today
- **French style guide / named reviewer / Reading validator** — open
  dependencies under Content (PRJ-010/011/012); the French QA gate is not yet
  executable
- **Mastery runtime conformance** — an implementation gap; documentation does
  not close it

None of these gaps is filled by writing code, and none of these layers may be
invented by an agent mid-task (see the stop condition in §3).

---

## 7. Historical and superseded documents

Superseded or historical material may remain useful for provenance — it is
kept discoverable, marked `SUPERSEDED`, and never silently deleted. But:

- **Recency alone does not create authority.** A newer file wins nothing by
  date; authority comes from ratified ownership.
- **An old implementation document does not override current Canonical domain
  decisions**, no matter how detailed it is.
- **Historical proposals must not be presented as current product intent.**
  Legacy v7 material (24 lessons, L14 paywall, XP/streak) is quarantined under
  `LEGACY — DO NOT BUILD ON THIS` banners and is not canon (ADR-0024).
- Archived and superseded files **never authorize implementation**.
