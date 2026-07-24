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
| How is the Journey-transition moment of growing French independence expressed and worded (screen-level expression and copy tone)? | Journey-as-visible-narration is canon ([[CAIRN_PRODUCT_BRAIN_v1.0#7. Journey and Progression]]); its exact expression is open | The narration must read as calm, earned progress — never a test, and never a punishment for still needing support | Founder completion 2026-07-23 → [[DECISION_REGISTER|PB-081]]; Brand Bible |

## Curriculum decision required

| Question | Current status | Why it matters | Source |
|---|---|---|---|
| Where exactly does the Summit narrative threshold fall in the lesson sequence, and does it align with a major advanced-language transition such as the subjunctive? | The Summit as a narrative threshold is canonical ([[DECISION_REGISTER|PB-056]]); only its exact curriculum placement is open. There is no requirement to move the subjunctive earlier in the current syllabus. | The Summit's placement shapes pacing and the felt crossing from foundational to advanced expressive French | FD-28 → [[DECISION_REGISTER|PB-056]]; Curriculum Bible |
| How is narrow in-lesson chip exposure paired with a much wider Practice Hub retrieval range (roughly 30–40 lessons)? | A future curriculum/content architecture decision; exact budgets and ranges are not yet canon | Determines how introduction (lessons) and mastery (Practice Hub) divide retrieval load; also a Content Bible concern | FD-91, FD-90, FD-92 → [[DECISION_REGISTER|PB-078]] |
| At what curricular stages, with what Journey-level default expectations and readiness criteria, does support step toward more French — and how do learner readiness and Journey Reinforcement interact to enable or delay a transition? | Downstream of the decided Progressive Language Independence direction; the direction is settled, the staging is not | Sets the felt pace of growing French independence without contradicting readiness-driven fade | Founder completion 2026-07-23 → [[DECISION_REGISTER|PB-079]]–[[DECISION_REGISTER|PB-081]]; D-26 / `LESSON_FLOW_CANON_v1.md` §4; Curriculum Bible |

## Content decision required

| Question | Current status | Why it matters | Source |
|---|---|---|---|
| How does each content surface display, reveal, and reduce native-language support — translation and reveal patterns, prompt- and instruction-language presentation, Reading support, Practice Hub support, and Mon Lexique bilingual / French-first treatment? | Downstream of the decided Progressive Language Independence direction; behavior-by-surface is not yet specified | Determines how the two support layers actually appear and fade on each surface without breaking the learner-safety guardrails | Founder completion 2026-07-23 → [[DECISION_REGISTER|PB-082]]; Content Bible |
| (Beyond the item above, no other distinct content-only open question is confirmed at v1.0.) | — | Chip counts, budgets, and faux-ami authoring are Content Bible material, not open founder questions. The chip-exposure architecture above is tracked under Curriculum with a Content facet. | RECON |

## Engineering decision required

| Question | Current status | Why it matters | Source |
|---|---|---|---|
| Is AI semantic, free-form search introduced in Mon Lexique? | May be evaluated later; not committed | Changes the search architecture and the AI safety/consent surface | FD-55 → [[DECISION_REGISTER|PB-047]] |
| What is the scope and guardrail set for advanced AI personalization? | Later; boundary undecided | Defines how far AI may personalize before it approaches the "AI-as-core" non-goal; requires quota, routing, and consent decisions | FD-65 → [[DECISION_REGISTER|PB-052]] |
| What are the support-fade thermostat's thresholds, mastery inputs, calculation, reversibility mechanics, state persistence, and fallback controls? | Downstream of the decided thermostat principle; the mechanics are deferred | Defines how comprehension-gated fade is computed, persisted, and safely reversed across the content and instruction-voice layers | Founder completion 2026-07-23 → [[DECISION_REGISTER|PB-080]], [[DECISION_REGISTER|PB-082]]; D-26 / `LESSON_FLOW_CANON_v1.md` §4; Engineering Bible |

---

*Routed out of Product Brain scope: the reconciliation of the two delivery roadmaps ("Five Stones" / `ROADMAP.md` vs Faz 0–7 / `CAIRN_ROADMAP_202607.md`) is a delivery and sequencing matter owned by the **Engineering Bible / Delivery Roadmap Reconciliation**, not a Product Brain founder question. Governance principle (see [[CAIRN_PRODUCT_BRAIN_v1.0#18. Canon Governance]]): **delivery roadmaps must not redefine product canon.***

*Deferred implementation detail (settled in intent, mechanics owned by a Bible) is not listed here. Examples: the mastery algorithm, the Journey Reinforcement completion algorithm, sync/account schema, and AI provider routing. See [[CAIRN_PRODUCT_BRAIN_v1.0#19. Interfaces With Other Bibles]].*

*Decided and therefore NOT open — whether Cairn pursues progressive language independence. The founder direction is settled: increasingly direct, French-led learning with native-language support available on demand and faded by demonstrated readiness (see [[CAIRN_PRODUCT_BRAIN_v1.0#7. Journey and Progression|Progressive Language Independence]]; [[DECISION_REGISTER|PB-079]]–[[DECISION_REGISTER|PB-082]]). The endpoint is not left open as "full monolingual versus bilingual forever"; only the downstream implementation intensity — stages, thresholds, per-surface behavior, and transition copy — remains, routed above.*
