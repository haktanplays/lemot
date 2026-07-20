---
title: Cairn Product Brain
version: 1.0
status: Canonical
owner: Founder
product: Cairn
first_product: Cairn French
last_updated: 2026-07-20
---

# Cairn Product Brain v1.0

## 1. Purpose of This Document

This document is the durable product canon for Cairn. It defines what Cairn is, who it serves, what it promises, how its major product systems relate, what it deliberately refuses to become, and how that canon changes over time. It is the highest-authority product-intent reference; where a lower document contradicts a principle stated here, this document governs the product question.

This document does not govern implementation. It does not define curriculum sequence, lesson-authoring rules, chip budgets, mastery algorithms, screen layouts, code architecture, or brand-expression detail. Those belong to the Curriculum Bible, Content Bible, Engineering Bible, and Brand Bible respectively (see [[#19. Interfaces With Other Bibles]]). When this document names a number, it is a planning band for orientation, not a promise or a specification, unless it is explicitly marked Canonical.

Three kinds of statement appear here and are labelled where ambiguity is possible:

- **Canonical principle** — a durable product decision. It changes only through the governance process in [[#18. Canon Governance]].
- **Planning band** — an approximate range that orients work but is not a commitment. It may move without a canon change.
- **Open question** — an unresolved decision recorded in [[OPEN_QUESTIONS]]. It is not yet canon and must not be treated as such.
- **Deferred implementation detail** — a real intention whose mechanics are owned by another Bible and are not settled here.

Audiences: the founder, product agents, curriculum agents, UX and design agents, engineering agents, and future collaborators. Each should be able to read this document and understand the product without needing the conversation history that produced it.

## 2. Product Thesis

Cairn is a calm, premium French-learning application for adults who have studied French but cannot yet express themselves with confidence. It removes the fear of speaking by teaching learners how and why a sentence is built, how to notice and repair their own mistakes, and how to say something real using what they already know while leaving the rest in English until it is learned.

The problem Cairn solves is not vocabulary volume or test readiness; it is the gap between having studied a language and being able to produce it. The promise is expressive independence: the learner can talk to themselves, understand, and build their own sentences. Cairn reaches this through a structured long path, a personal learning memory, a practice system that creates mastery, and a bounded AI that supports rather than leads. Retention comes from meaning, progress, and usefulness, never from streak pressure or reward theatre.

## 3. Brand and Product Architecture

**Cairn is the ecosystem brand.** (Canonical) It is designed as a family of language-learning products that share an engine, a philosophy, and an account, not as a single app.

**Cairn French is the first product.** (Canonical) Its public store name is **"Cairn — Learn French."** Its internal product name is **Cairn French.** The instructional language of this first product is **English only**; the learner is an English speaker learning French.

> Note: "Le Mot" remains only as a temporary legacy repository and application identifier during migration, until a separately approved migration is justified. It is not the product brand, not a permanent engineering identity, and carries no product authority. Brand identity, naming, and expression detail live in the Brand Bible.

**Shared account and entitlement across future language products is the intended architecture.** (Canonical) A single Cairn account and its entitlements are designed to extend across languages as the ecosystem grows. The account model is a product principle; its schema and mechanics are Engineering Bible material and are deferred.

**Whether a universal, cross-language "forever" subscription exists is not yet committed.** (Open question — founder) The ecosystem may or may not offer one entitlement spanning all languages. This is deliberately undecided and is recorded in [[OPEN_QUESTIONS]]; nothing in Cairn's design should assume it either way.

## 4. Who Cairn Is For

**Primary learner** (Canonical): a motivated adult who has already studied French — often for years — and who understands fragments but freezes when it is time to speak. This learner wants depth, logic, and the mechanics of the language, not points. They are committed over months and years to a real path, and they value understanding *why* a form works over memorizing lists.

**Explicit non-primary audiences** (Canonical). Cairn is not primarily built for:

- children;
- users seeking gamification, streaks, or reward loops;
- users seeking an open AI-chat companion;
- tourists needing a phrasebook before a trip;
- exam-first learners cramming for a DELF or similar deadline.

Cairn may still be useful to some of these people, and it does move a committed learner toward B2, but its decisions are optimized for the primary learner. When a design choice would serve a non-primary audience at the primary learner's expense, the primary learner wins.

## 5. Product Promise and Destination

**The external promise is expressive independence, not a level guarantee.** (Canonical) Cairn tells learners it will help them build and repair real French and speak without fear. It does not promise a CEFR level, a DELF pass, or a fixed word count.

**The internal planning destination is approximately A0 to B2.** (Planning band) B2 is the internal north star and the direction of the path, not a public claim. The practical ceiling of the core promise is confident everyday, travel, and living French, not literary or business register.

**The internal vocabulary destination is approximately 3,000 words.** (Planning band) This orients curriculum scope only. It is never surfaced as a promise, a counter, or a guarantee of "3,000 mastered words."

Whether B2 ever becomes a public claim is an [[OPEN_QUESTIONS|open question]] and must not be assumed.

## 6. Learning Architecture

**The curriculum hierarchy is Journey → Capability Arc → Lessons.** (Canonical)

- **Journeys** are the visible chapters of the path.
- **Capability Arcs** are the internal organizing spine that groups lessons by the capability they build. **Capability Arcs are internal and are not surfaced to the learner.** (Canonical)
- **Lessons** are the units the learner completes.

**The learner sees Journeys, lessons, and capability checkpoints; the learner does not see Capability Arcs.** (Canonical)

**The lesson planning band is approximately 120 to 180 lessons, and every lesson must justify its place.** (Planning band) The total is not a target to fill; a lesson exists only if it earns its slot in the path. Exact lesson counts, sequence, and per-lesson design are Curriculum Bible material.

**Context is a scaffold, not the organizing principle.** (Canonical) Scenes and situations carry meaning and make forms usable, but the curriculum is organized by capability, not by topic or setting. A café or a hotel is a delivery vehicle for a capability, never the reason a lesson exists.

## 7. Journey and Progression

**The learner can see the entire path, including future lessons.** (Canonical) Nothing about the road ahead is hidden.

**Progression is guided and largely linear.** (Canonical) The path has a deliberate order; the learner is led along it rather than dropped into an open map.

**Future lessons are locked and cannot be entered.** (Canonical) A locked lesson is genuinely unavailable until its prerequisites are met.

**Tapping a locked lesson explains clearly what is required to unlock it.** (Canonical) A lock is never a dead end without explanation; the learner always understands the next requirement.

**Progression rhythm is Journey-level, not lesson-by-lesson.** (Canonical) Lessons inside a Journey can be completed without arbitrary per-lesson practice quotas. The product does not gate lesson N+1 on grinding a hidden quota in lesson N.

**At the end of a Journey the learner enters Journey Reinforcement.** (Canonical) Journey Reinforcement is a focused [[#9. Practice Hub|Practice Hub]] mode covering the completed Journey. It is an integrated consolidation experience that draws material across the Journey's lessons — not a conventional exam.

**Journey Reinforcement is required before the next Journey opens, and it is outcome-based.** (Canonical) The learner must consolidate the Journey to proceed, but the requirement is defined by demonstrated capability, not by an arbitrary, visible session quota. The learner does not see mastery percentages or quota-grinding requirements. The exact completion algorithm is Curriculum/Engineering Bible material and is deferred.

## 8. Lesson Philosophy

**Lessons introduce.** (Canonical) The role of a lesson is to teach a capability for the first time and give the learner a guided first use of it. Mastery is not the job of a lesson; it is the job of the [[#9. Practice Hub|Practice Hub]].

**All lessons share a recognizable pedagogical rhythm.** (Canonical) A learner should feel a consistent Cairn way of meeting meaning, trying it, comparing with a natural model, and reusing it — regardless of which lesson they are in.

**Lesson types remain structurally distinct under a shared lesson contract.** (Canonical) Different lesson types keep their own internal structures; they are unified by a shared contract, not flattened into one shape.

**There is no rigid, universal UI template.** (Canonical) The shared rhythm is a pedagogical feel, not a forced screen-by-screen layout. Lessons are not squeezed into an identical template for the sake of uniformity.

**Lesson Practice is optional and lesson-specific.** (Canonical) A learner may repeat a single lesson's material as optional practice. **Lesson Practice does not, by itself, unlock the next Journey** — only [[#7. Journey and Progression|Journey Reinforcement]] does that.

## 9. Practice Hub

**The Practice Hub is the mastery engine.** (Canonical) Where lessons introduce, the Practice Hub creates mastery through retrieval, repair, and reuse over time.

**The Practice Hub is available from the first lesson and grows over time.** (Canonical) It is present from the beginning and becomes richer as the learner's knowledge expands.

**The Practice Hub home prioritizes Recommended and Choose a Subject.** (Canonical) The two front-door affordances are a recommended focus and the ability to choose a subject. Practice *types* live behind subjects; they are not the primary navigation model.

**Practice organization is knowledge- and capability-first; lessons are secondary subjects.** (Canonical) The Hub is organized around what the learner knows and the capabilities they are building, not primarily around the lesson list. Lessons remain available as subjects, but they are not the top-level organizing frame.

**A Practice Hub session is finite and meaningful; continuing is optional.** (Canonical) A session has a natural, worthwhile end. The learner may continue, but they are never pushed to grind.

**Practice is never permanently "finished."** (Canonical) The calm resting state is expressed as **"Nothing needs your attention right now,"** not as a completion trophy or an empty-state failure.

**Weaknesses are described in natural language, not percentages.** (Canonical) The learner sees focus areas expressed in plain language. Mastery percentages are never shown.

**Practice customization uses strong defaults with only very light controls.** (Canonical) The product decides well by default; the learner is offered minimal, gentle adjustment rather than a configuration surface.

### My Errors

- **My Errors contains active, repeated error patterns — not an error-history archive.** (Canonical)
- **A pattern must repeat before it enters My Errors.** (Canonical) A single mistake is not an error pattern.
- **Repeated correct usage resolves and removes an active error pattern.** (Canonical) My Errors reflects what currently needs attention; it heals as the learner improves.

### Journey Reinforcement in the Hub

Journey Reinforcement (see [[#7. Journey and Progression]]) is delivered as a focused Practice Hub mode covering a completed Journey. It is the consolidation gate between Journeys and is outcome-based rather than quota-based.

Mon Lexique may hand off into practice through a **"Practice this"** action (see [[#10. Mon Lexique]]), but **the Practice Hub does not offer a top-level "Practice from Mon Lexique" mode.** (Canonical) Retrieval ranges, drill budgets, and selection algorithms are Curriculum/Engineering Bible material and are deferred.

## 10. Mon Lexique

**Mon Lexique is the learner's personal French memory** (Canonical): the place where the pieces they have seen, tried, strengthened, or should revisit become tangible. It is a signature surface of Cairn, not a plain word list, a flashcard queue, or a raw mastery report.

**Supported content types** (Canonical): words, chunks, grammar structures, faux amis, quick knowledge cards, contrast cards, usage notes, and — in the future — optional micro-lessons.

- **Faux amis are explicitly included.** (Canonical)
- **Grammar is visible and naturally discoverable inside Mon Lexique.** (Canonical) Grammar serves expression and is encountered where it is useful.
- **There is no grammar tab in the navigation bar.** (Canonical) Grammar does not become a separate top-level destination.
- **Future optional micro-lessons live through Mon Lexique** (Canonical) rather than becoming a new main navigation area.

**Interaction** (Canonical):

- **Mon Lexique is search-first, with lightweight filters and no rigid folder system.**
- **Search is meaning-aware** across French, English meaning, grammar, capability, faux amis, and examples.
- **Mon Lexique may launch "Practice this,"** handing a piece into the Practice Hub, while the Hub itself has no top-level "Practice from Mon Lexique" mode (see [[#9. Practice Hub]]).

**AI semantic, free-form search may be evaluated later** and is an [[OPEN_QUESTIONS|open question]], not a commitment.

**The detailed information architecture of Mon Lexique is unresolved** and is reserved for UX exploration (see [[OPEN_QUESTIONS]]). The screen structure, card layouts, and filter presentation are Design/Engineering Bible material and are deferred.

## 11. AI Philosophy

**Cairn teaches. AI supports.** (Canonical) AI is a support layer, never the product identity and never the curriculum author.

**AI never replaces the curriculum, lesson design, or pedagogical sequence.** (Canonical) The deterministic learning design is the source of truth; AI operates around it.

**Supported AI roles** (Canonical): explaining, comparing, providing examples, correcting the learner's language, and answering contextual questions tied to the lesson and the learner's state.

**Prohibited AI roles** (Canonical): acting as the core of the product; authoring or overriding curriculum; inventing grammar or introducing unseen forms; deciding learner-critical grading; operating as a generic, open-ended chatbot; or gating basic feedback behind a paywall.

**More advanced AI personalization may come later** and its scope and guardrails are an [[OPEN_QUESTIONS|open question]]. Provider routing, quotas, and safety mechanics are Engineering Bible material and are deferred.

## 12. Motivation and Visual Progression

**Motivation comes from meaningful progress, not external gamification.** (Canonical) Retention is built on visible path progression, a growing [[#10. Mon Lexique|Mon Lexique]], real usefulness, and personal memory — never on XP, streaks, lives, or loss-aversion pressure.

**Progress is expressed through an artwork progression** (Canonical): a hand-illustrated mountain journey that advances as the learner advances.

**Artwork and journey direction** (Planning band): approximately fourteen progression artworks across approximately seven capability journeys. These approximate counts orient the illustration and Journey work; exact counts and mappings are Brand/Curriculum Bible material.

**The Summit is a narrative threshold, not the end.** (Canonical) The Summit marks the symbolic transition from foundational communication toward advanced expressive French. It is a narrative threshold, not a mathematically fixed lesson coordinate. Its exact curriculum placement belongs to the Curriculum Bible. The Summit may align with a major advanced-language transition such as the subjunctive, subject to curriculum design.

**The final artwork shows the learner guiding another climber.** (Canonical) The end of the visual journey depicts the learner as someone who can now help others.

**Artwork progression follows curriculum milestones, and visual progression is never an assessment.** (Canonical) The artwork advances with milestones and is **never blocked by mastery** and never used to grade the learner.

## 13. Onboarding

**Onboarding demonstrates value before asking for an account.** (Canonical) The learner experiences a real, meaningful moment of Cairn before any account wall.

**Account creation is requested after the first meaningful micro-experience.** (Canonical) The account ask follows value, never precedes it.

**Onboarding questions are progressive and asked only when they become useful.** (Canonical) The product does not front-load a questionnaire; it asks a question at the moment its answer improves the experience.

## 14. Access and Monetization

**The free path is the early journey.** (Canonical direction) A meaningful early stretch of Cairn is free, giving the learner enough to feel expressive independence beginning to form. The approximate size of the free path is a **planning band of roughly 24 to 26 lessons**; the exact free/paid boundary and price are deliberately deferred to post-validation and are recorded in [[OPEN_QUESTIONS]].

**Campfire begins after the paywall.** (Canonical) A learner who reaches the paywall without subscribing enters Campfire: a sustaining practice loop built from their own owned words and error tracking, kept alive by fresh recombinations.

**Campfire retains a real, calm subset of the product** (Canonical): the Practice Hub, Daily Review, Flashcards, Mon Lexique, repair, mastery, and a lower level of AI access. Campfire is a gentle holding pattern, not a punishment or a dead end.

**Campfire is drip-paced** (Canonical direction): the first Campfire drip arrives after approximately three days, then approximately every seven days. These intervals are the current product rhythm; the specific numbers are a **planning band**, not a promise.

**Premium removes waiting.** (Canonical) The core value premium buys is continuity — the removal of the Campfire wait — on top of the full depth of the path.

**Monetization begins with monthly and annual subscription.** (Canonical) These are the launch commercial model.

**A limited founder Lifetime offer exists at launch** (Canonical) for launch financing and to form a founder community. It is deliberately limited.

**An optional Trail Pass may be evaluated later** and is an [[OPEN_QUESTIONS|open question]], not a commitment.

Premium value is curriculum, continuity, the Practice Hub, Mon Lexique, mastery, repair, and selected AI support. Premium never walls off basic feedback, and AI is never the thing being sold. Exact prices, boundary lessons, and tier mechanics are deferred.

## 15. Data, Offline, and Cloud

**Cairn is local-first.** (Canonical) Learning lives on the device by default.

**Core learning, the Practice Hub, and Mon Lexique remain usable offline wherever technically feasible.** (Canonical) The product's core does not require a connection to function.

**Cloud exists to protect, synchronize, and extend learning — not to make learning possible.** (Canonical) The cloud is a safeguard and a bridge across devices and future products, layered on top of a product that already works locally.

Privacy is handled as genuine respect for the learner's ownership of their own data. This document states the product's tone of ownership and protection; it does not invent legal guarantees, compliance claims, or data-handling mechanics, which are Engineering Bible material.

## 16. Living Product Communication

**Major product improvements are introduced through a lightweight What's New experience.** (Canonical) When something meaningful changes, the learner is told, calmly and briefly.

**Minor fixes and improvements remain invisible.** (Canonical) Routine polish does not interrupt the learner or demand acknowledgment.

## 17. Deliberate Non-Goals

Cairn deliberately refuses to become (all Canonical):

- an AI wrapper or AI-as-core product;
- a gamification-first product built on XP, streaks, lives, or reward theatre;
- an exam-preparation-first product organized around a test deadline;
- a tourist phrasebook;
- a lesson factory that generates volume without justifying each lesson;
- a raw mastery-percentage dashboard;
- a product that demands arbitrary quota grinding to progress.

These refusals are load-bearing. A proposal that moves Cairn toward any of them is rejected by default and requires an explicit governance decision (see [[#18. Canon Governance]]) to even be considered.

## 18. Canon Governance

**Canon comes first.** (Canonical) New ideas are evaluated against existing canon before they are adopted.

**Canon is not silently overwritten.** (Canonical) A change to a canonical principle is explicit, recorded, and traceable.

**Major changes require an explicit reason and a preserved decision history.** (Canonical) The product's decisions carry their provenance forward; history is kept, not erased.

**Cairn is intentionally designed; every change must earn its place.** (Canonical) Addition is not free. A feature, a lesson, or a screen exists because it earned a slot, not because it was possible.

**Precedence.** For product questions, this Product Brain governs. For "what is being built now," current build canon and status govern over long-range intent. Design references and archives never override active canon. **Delivery roadmaps must not redefine product canon**; delivery and sequencing conflicts are reconciled in the Engineering Bible, not here. Every canonical principle here is recorded with provenance in [[DECISION_REGISTER]].

## 19. Interfaces With Other Bibles

This Product Brain states *why* and *what*. It hands off *how* to the other Bibles.

| Bible | Owns | Example material |
|---|---|---|
| **Product Brain** (this document) | Why Cairn exists and what it is | Thesis, audience, promise, system relationships, non-goals, governance |
| **Curriculum Bible** | Learning sequence and pedagogical architecture | Lesson order, Capability Arc composition, subjunctive placement, retrieval ranges |
| **Content Bible** | Lesson and chip authoring constraints | Chip taxonomy limits, faux-ami authoring, per-lesson-type chip budgets |
| **Engineering Bible** | Implementation | Storage, sync, account/entitlement schema, AI routing, mastery and reinforcement algorithms |
| **Brand Bible** | Identity and expression | Naming detail, visual language, artwork specification, copy tone |

The following are explicitly **outside** the Product Brain and must not be written here as product canon:

- exact recognition-chip counts;
- exact ghost-chip counts;
- lesson-type chip budgets;
- the approximately 30–40 lesson Practice Hub retrieval range;
- the detailed mastery algorithm;
- the exact Journey Reinforcement completion algorithm;
- exact lesson schemas;
- exact screen layouts.

## 20. Open Questions

Only reconciliation-confirmed unresolved questions appear here; the authoritative list, with categories and owners, is [[OPEN_QUESTIONS]]. In summary:

- Whether a universal, cross-language "forever" subscription exists (founder).
- The exact free/paid boundary and price, of which "~24–26 lessons" is only a planning band (founder, post-validation).
- Whether an optional Trail Pass is introduced (founder).
- The exact curriculum placement of the Summit narrative threshold (curriculum).
- The detailed information architecture of Mon Lexique (UX).
- Whether AI semantic free-form search is introduced (engineering/founder).
- The scope and guardrails of advanced AI personalization (founder/engineering).
- Whether B2 ever becomes a public external claim (founder).

## 21. Canonical Decision Index

| Principle | Section |
|---|---|
| Cairn is the ecosystem brand; Cairn French is first; "Cairn — Learn French"; English-only instruction | [[#3. Brand and Product Architecture]] |
| Shared account/entitlement across languages | [[#3. Brand and Product Architecture]] |
| Primary learner and non-primary audiences | [[#4. Who Cairn Is For]] |
| Expressive independence; A0–B2 and ~3,000 words internal | [[#5. Product Promise and Destination]] |
| Journey → Capability Arc → Lessons; Arcs internal; context as scaffold | [[#6. Learning Architecture]] |
| Visible path; guided linearity; locked lessons explain requirements; Journey Reinforcement gates next Journey | [[#7. Journey and Progression]] |
| Lessons introduce; shared rhythm; distinct types; no rigid template; optional Lesson Practice | [[#8. Lesson Philosophy]] |
| Practice Hub is the mastery engine; Recommended + Choose a Subject; My Errors; finite calm sessions | [[#9. Practice Hub]] |
| Mon Lexique; faux amis; grammar inside, no grammar tab; search-first, meaning-aware; Practice this | [[#10. Mon Lexique]] |
| Cairn teaches, AI supports; supported and prohibited AI roles | [[#11. AI Philosophy]] |
| Meaningful progress over gamification; artwork; Summit as narrative threshold; final guide image; never an assessment | [[#12. Motivation and Visual Progression]] |
| Value before account; account after first micro-experience; progressive questions | [[#13. Onboarding]] |
| Free path; Campfire after paywall; drip rhythm; monthly/annual; limited founder Lifetime | [[#14. Access and Monetization]] |
| Local-first; offline core; cloud protects/syncs/extends | [[#15. Data, Offline, and Cloud]] |
| What's New for major; invisible minor | [[#16. Living Product Communication]] |
| Deliberate non-goals | [[#17. Deliberate Non-Goals]] |
| Canon-first governance; every change earns its place | [[#18. Canon Governance]] |

## 22. Change Log

**Version 1.0 — 2026-07-20**

- Initial consolidated founder canon.
- Reconciled from Le Mot legacy material, Cairn founder decisions, syllabus and product-definition work, and founder review, via the "Cairn Product Brain v1.0 — Read-Only Canon Reconciliation" report and its delta pass.
- Four flagged conflicts resolved by founder direction: Cairn as ecosystem brand and naming; monetization tiers; numeric hypotheses relocated to the Bibles; and the Summit established as a narrative threshold whose exact placement belongs to the Curriculum Bible.
