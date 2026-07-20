---
title: Cairn Product Brain — Open Questions
version: 1.0
status: Canonical (list of unresolved items)
owner: Founder
product: Cairn
last_updated: 2026-07-20
---

# Cairn Product Brain — Open Questions v1.0

Only genuinely unresolved questions confirmed by the canon reconciliation appear here. An item on this list is **not canon** and must not be treated as decided. Items are grouped by the decision owner who must resolve them. Resolved items are recorded in [[DECISION_REGISTER]] and reflected in [[CAIRN_PRODUCT_BRAIN_v1.0]].

## Founder decision required

| Question | Current status | Why it matters | Source |
|---|---|---|---|
| Does a universal, cross-language "forever" subscription exist across the ecosystem? | Deliberately not committed | Shapes the whole entitlement and pricing model across future language products | FD-7 → [[DECISION_REGISTER|PB-007]] |
| What is the exact free/paid boundary and price? | Deferred to post-validation; "~24–26 lessons" is a planning band, not a promise | Defines the free-path promise and the commercial model; must be validated, not guessed | FD-10 → [[DECISION_REGISTER|PB-062]]; BUILDSPEC §66.3 (monetization deferred) |
| Is an optional Trail Pass introduced? | May be evaluated later; not committed | An additional access model that could reshape the monetization story | FD-17 → [[DECISION_REGISTER|PB-069]] |
| Does B2 ever become a public external claim? | Undecided; internal north star only today | Interacts with the "expressive independence, not a level guarantee" promise and any future DELF positioning | RECON; DEFN-v0.1 §19 |

## UX exploration required

| Question | Current status | Why it matters | Source |
|---|---|---|---|
| What is the detailed information architecture of Mon Lexique? | Search-first with lightweight filters is canon; the screen structure, card layouts, and filter presentation are open | Mon Lexique is a signature surface; its IA determines whether it feels like a personal memory or a word list | FD-53 → [[DECISION_REGISTER|PB-048]] |

## Curriculum decision required

| Question | Current status | Why it matters | Source |
|---|---|---|---|
| Where exactly does the Summit narrative threshold fall in the lesson sequence, and does it align with a major advanced-language transition such as the subjunctive? | The Summit as a narrative threshold is canonical ([[DECISION_REGISTER|PB-056]]); only its exact curriculum placement is open. There is no requirement to move the subjunctive earlier in the current syllabus. | The Summit's placement shapes pacing and the felt crossing from foundational to advanced expressive French | FD-28 → [[DECISION_REGISTER|PB-056]]; Curriculum Bible |
| How is narrow in-lesson chip exposure paired with a much wider Practice Hub retrieval range (roughly 30–40 lessons)? | A future curriculum/content architecture decision; exact budgets and ranges are not yet canon | Determines how introduction (lessons) and mastery (Practice Hub) divide retrieval load; also a Content Bible concern | FD-91, FD-90, FD-92 → [[DECISION_REGISTER|PB-078]] |

## Content decision required

| Question | Current status | Why it matters | Source |
|---|---|---|---|
| (No distinct content-only open question is confirmed by reconciliation at v1.0.) | — | Chip counts, budgets, and faux-ami authoring are Content Bible material, not open founder questions. The chip-exposure architecture above is tracked under Curriculum with a Content facet. | RECON |

## Engineering decision required

| Question | Current status | Why it matters | Source |
|---|---|---|---|
| Is AI semantic, free-form search introduced in Mon Lexique? | May be evaluated later; not committed | Changes the search architecture and the AI safety/consent surface | FD-55 → [[DECISION_REGISTER|PB-047]] |
| What is the scope and guardrail set for advanced AI personalization? | Later; boundary undecided | Defines how far AI may personalize before it approaches the "AI-as-core" non-goal; requires quota, routing, and consent decisions | FD-65 → [[DECISION_REGISTER|PB-052]] |

---

*Routed out of Product Brain scope: the reconciliation of the two delivery roadmaps ("Five Stones" / `ROADMAP.md` vs Faz 0–7 / `CAIRN_ROADMAP_202607.md`) is a delivery and sequencing matter owned by the **Engineering Bible / Delivery Roadmap Reconciliation**, not a Product Brain founder question. Governance principle (see [[CAIRN_PRODUCT_BRAIN_v1.0#18. Canon Governance]]): **delivery roadmaps must not redefine product canon.***

*Deferred implementation detail (settled in intent, mechanics owned by a Bible) is not listed here. Examples: the mastery algorithm, the Journey Reinforcement completion algorithm, sync/account schema, and AI provider routing. See [[CAIRN_PRODUCT_BRAIN_v1.0#19. Interfaces With Other Bibles]].*
