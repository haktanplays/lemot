# Le Mot Learning Engine v1 (Pedagogical Canon)

> **Purpose**: This document defines the *pedagogical* learning engine for Le Mot — how lessons work as learning objects and how every syllabus and content document must stay compatible with the wider system (Practice Pool, Daily Review, Natural Reveal, Mon Lexique, Word Graph). **It is a canon/spec layer, not a code implementation.** No runtime engine, schema, storage, or backend is defined or authorized here.

> **Scope**: Documentation / canon only. This doc guides future Claude Code sessions and syllabus work. It does **not** change app behavior, content, flags, or tests. The Dev APK smoke test remains the boundary before any runtime/code change derived from this spec.

> **Precedence**: This is product/pedagogy canon, one layer above syllabus and content docs, and below the locked v1 Canon and the locked Q1–Q6 / D1–D6 decisions. Where this doc and locked product canon disagree, **locked canon wins** and the gap is surfaced, not silently resolved. `docs/DEV_APK_MVP_CANON.md` continues to govern Dev APK runtime scope; this doc governs how lessons are *designed*, not what ships in the Dev APK.

> **Positioning**: Le Mot is a **premium French production engine**, not a generic AI tutor platform. The engine is **pedagogical first**. AI is a supporting layer, never the core. DeepTutor is referenced in this doc *only as inspiration* for learning-object structure, memory semantics, exercise-seed logic, and tutor voice — its architecture, TutorBot, RAG/upload model, multi-agent runtime, and backend dependencies are explicitly **not** imported. See §16.

---

## 1. Purpose

This document specifies the pedagogical engine that turns French into something a learner can **produce**, not just recognize. It exists so that:

- **Syllabus work has a stable contract.** Every lesson plan (L0–L150, Core 150) describes the same kind of object, with the same vocabulary for items, statuses, and continuity.
- **Downstream systems stay compatible.** Practice Pool, Daily Review, Natural Reveal, Mon Lexique, and the future Word Graph all consume the *same* item and frame identities a lesson produces.
- **Future code has a target, not a guess.** When runtime work is eventually authorized (after smoke), it implements this spec rather than inventing pedagogy ad hoc.

This is **not** a runtime engine. It defines *how lessons should be built and how their pieces should connect* — the planning grammar of Le Mot. It does not define data models, storage keys, components, flags, or API calls.

The killer trinity (**Weave**, **Say It Your Way**, **Natural Reveal**) is the production surface this engine feeds. Everything below is in service of getting the learner to produce natural French and then see *why* it was natural.

> **Companion template**: `docs/syllabus/lesson-spec-template-v1.1.md` operationalizes this engine into the required per-lesson spec structure. Use it for all syllabus work.

---

## 2. Core Loop

Every Le Mot learning object moves through one loop. Not every screen is one stage, and short-cycle engines (§4) compress it, but the order is canonical:

1. **Moment** — A small, real situation. The learner meets language *inside a reason to use it*, never as an isolated word or a grammar rule. ("You walk up to the counter.")
2. **Pieces** — The reusable parts of the moment are made visible: chunks, a frame, a slot. The learner sees what is interchangeable.
3. **Pattern** — The shape behind the pieces is noticed ("the engine"). Why these pieces combine this way. Light, one insight at a time.
4. **Production** — The learner *makes* language: supported first (Weave, fill-with-traps), then freer (Say It Your Way). This is the point of the app.
5. **Reveal** — After production, Le Mot mirrors back what was natural, offers alternatives, and names register — **Natural Reveal**. Mistakes are mirrored neutrally ("Take another look"), never punished.
6. **Memory** — The pieces gain a memory trace: weak-point tags, carry lineage, mastery state. This is what Mon Lexique and Daily Review later read.
7. **Ownership** — The learner leaves with something that is *theirs*: a chunk or frame they can now use again, in a new moment. "This is becoming yours" — passive mirror, not reward.

The loop is a spiral, not a circle: each turn carries pieces forward (§8) and prepares the next moment.

---

## 3. Lesson Input Model

A lesson does **not** begin with a single sentence, and it does **not** begin with a passive list of phrases. It begins with a **small sentence family** — a cluster of closely related sentences that share pieces and reveal a pattern by contrast.

A sentence family is composed of:

- **Anchor sentence** — The central, most natural target sentence of the family. ("Je voudrais un café.")
- **Variation sentences** — The same shape with one slot changed, so the frame becomes visible. ("Je voudrais un thé." / "Je voudrais deux cafés.")
- **Contrast sentence** — A near-neighbor that is *almost* the same but differs in a way that teaches the boundary. ("Je veux un café." — blunter; teaches the register edge of *je voudrais*.)
- **Rescue / natural sentence** — The thing a real speaker would actually say in the moment, including the polite or natural tail the learner might otherwise miss. ("Je voudrais un café, s'il vous plaît.")
- **Interchangeable pieces** — The explicit inventory of what can be swapped in the frame (the slots and their fillers), drawn from items the learner already has or is being given.

The sentence family is the unit syllabus authors plan around. A lesson may contain more than one family, but each family is a coherent engine (§4).

---

## 4. Engine Depth

An "engine" is a reusable production shape (a frame + its pattern). **Not every engine in a lesson gets the same depth.** Depth is a deliberate planning choice, classified into three levels:

- **Full-cycle engine** — Runs the entire Core Loop (§2). Moment → Pieces → Pattern → supported Production → free Production → Reveal → Memory. This is the lesson's main teaching target. A lesson typically has **one** full-cycle engine (early lessons), occasionally two.
- **Short-cycle engine** — A compressed loop. Usually Moment/Pieces → one Production touch → light Reveal. Used to reinforce, contrast, or seed a future full-cycle engine. It earns active or supported status but not the full teaching budget.
- **Ambient engine** — Present but not directly produced. The learner *meets* it (recognition/ambient status, §6) so that a later lesson can promote it to short- or full-cycle. Ambient engines do the quiet work of "prepare something future" (§8).

Planning rule: a lesson's attention budget is spent mostly on its full-cycle engine; short-cycle and ambient engines fill the remaining capacity without crowding the loop.

---

## 5. Item Taxonomy

Lessons are built from typed items. The type determines how an item is taught, tested, tagged, and later surfaced in Mon Lexique. The canonical item types are:

- **Word item** — A single lexical word (`café`, `ici`). Carries meaning, gender/number where relevant, sound, and writing.
- **Chunk item** — A fixed or semi-fixed multi-word unit produced as one piece (`je voudrais`, `s'il vous plaît`, `je suis ici`). The backbone of early production — chunks let learners produce before they can assemble.
- **Sentence frame** — A pattern with one or more slots (`Je voudrais ___.`, `Je suis ___.`). The generative engine; frames are what transform (§9).
- **Full sentence** — A complete, natural target sentence (the anchor and its variations). The thing the learner is asked to produce.
- **Grammar / phenomenon tag** — A named pattern or rule the item participates in (gender agreement, negation frame, verb-chain). A *tag*, not a taught grammar table — surfaced as insight, not drilled.
- **Sound / writing tag** — A pronunciation or orthography fact (silent endings, `é → s`-style cognate sounds, accents). Feeds TTS, listening traps, and writing support.
- **Trap tag** — A known confusable used deliberately as a distractor (a previously-learned item offered as a wrong option). Trap items may appear as option text only, with no production target of their own.
- **Culture / cognate / faux-ami insight** — A note that makes an item stickier or safer: a cognate bridge (`merci ≈ mercy`), a false friend warning, or a cultural usage bite.

Every item carries a stable **canonical identity** (§14) so the same `café` in a lesson, in Weave, in Practice Pool, and in Mon Lexique is understood as one thing.

---

## 6. Learning Status

Each item in a lesson carries a **learning status** describing how far the learner is expected to take it. Status is the planning ladder of production maturity:

- **Recognition / ambient** — The learner should understand it when met, but is not asked to produce it. Preparation for a future lesson.
- **Supported production** — The learner produces it *with scaffolding* (Weave with the word given, fill-with-traps, model answer visible). Correct production is possible without full recall.
- **Active production** — The learner is expected to produce it *from intent*, without the piece handed to them, in this lesson's exercises.
- **Transformed production** — The learner produces it in a *changed* form (new slot, negation, question, new subject — see §9), demonstrating the frame is generative, not memorized.
- **Expected production** — The learner is expected to produce it *unprompted in a later lesson or in Daily Review* as carry-out (§8). It has graduated from "taught" to "assumed".

> **Reconciliation with existing runtime status.** The codebase `itemRegistry` currently uses a narrower status field (observed values: `recognition`, `supported`, `active`). The five-state ladder here is a **planning** vocabulary; `transformed` and `expected` are pedagogical states that describe carry and reuse, not necessarily distinct runtime enum values today. Whether the runtime status field grows to match this ladder is an **open decision** (§17). This doc does not change the runtime field. The existing four-way distinction (Active / Supported / Recognition-only / Recycled, per pipeline Rule 6) maps as: Active → active/transformed, Supported → supported, Recognition-only → recognition/ambient, Recycled → carry-in of an item already at active/expected (§8).

---

## 7. Item Budget Guidance

To keep early lessons within a learner's attention budget without crowding the loop, use these **planning targets** for early lessons (roughly L1–L24 range):

- **Total exposure**: roughly **30–45** learning items (everything the learner meets, all statuses combined).
- **Active new items**: roughly **8–15** (status active/transformed, newly introduced this lesson).
- **Supported new items**: roughly **8–15** (status supported, newly introduced).
- **Recognition / ambient items**: roughly **10–20** (met but not produced).
- **Recycled items**: **grows over time** — early lessons recycle little, later lessons recycle a lot (carry-in, §8). There is no upper target; recycling is healthy.

> **These are planning targets, not hard validator rules.** They exist to help syllabus authors feel when a lesson is overloaded or underweight. A build-time content validator may *report* on these counts for awareness, but must **not** fail a lesson for being slightly outside the range. Exact counting methodology and per-lesson volume targets are open decisions (§17).

---

## 8. Continuity / Carry System

Lessons are not islands. The engine connects them through an explicit **carry system**, planned per lesson:

- **Carry-in** — Items from earlier lessons that this lesson *assumes and reuses* (recycled, §6/§7). They are produced again in new contexts, not re-taught.
- **Carry-out** — Items this lesson hands forward, marked as **expected production** (§6) for future lessons or Daily Review.
- **Transformation plan** — How a carried item is expected to *change* in this or a later lesson (§9). Carry is not mere repetition; pieces grow.
- **Fade** — How heavily an item is scaffolded over time. Support fades from supported → active → transformed → expected as the item matures across lessons.
- **Expected production** — The target end-state: the learner produces the item unprompted, and it lives in Mon Lexique as "becoming yours".

> **Continuity principle.** Every lesson must **introduce something new, grow something old, and prepare something future.** A lesson that only introduces is overloaded; a lesson that only reviews is inert; a lesson that prepares nothing leaves the next lesson stranded.

> **Integration Rhythm Rule (planning heuristic, not a hard validator).** Avoid more than **roughly 3 consecutive new-engine / control lessons** without an **integration or review beat** (archetype #10). The purpose is to **protect learner confidence, reduce cognitive pressure, and convert old engines into usable production** — the L1–L5 retrospective and the L6 integration pilot demonstrated this. **L10 is the first explicit application** of this rule, placed after **L7 Aller, L8 Où, and L9 Faire-light**. If **L11 introduces pouvoir-light** (or another major engine), the **next review/integration placement should be considered early**. This is a pacing heuristic, **not** a hard validator.

---

## 9. Transformation Types

A frame proves it is an engine, not a phrase, when the learner can transform it. The canonical transformation types syllabus authors should sequence are:

- **Same frame / new slot** — Swap the filler in an existing slot. ("Je voudrais un *café*" → "Je voudrais un *thé*".)
- **New subject** — Change the subject and adjust the verb. ("*Je* suis ici" → "*Il* est ici".)
- **Negation** — Apply the negation frame. ("Je suis ici" → "Je ne suis pas ici".)
- **Question** — Recast as a question (intonation, est-ce que, inversion as appropriate to level).
- **Article / gender / number change** — Shift determiner, gender, or singular/plural agreement.
- **Verb chain** — Combine a conjugated verb with an infinitive ("Je voudrais *aller*", "Je dois *partir*").
- **Tense / aspect / mood doorway** — Step the same content into a new tense/aspect/mood (§10), first as a chunk, later as a pattern.
- **Pronoun insertion** — Introduce object/reflexive/y/en pronouns into a known frame.
- **Register / naturalness shift** — Move between blunt and polite, written and spoken, neutral and warm — the Natural Reveal territory (§12).

Transformations are how an item climbs the status ladder (§6) across the carry system (§8).

---

## 10. Tense / Aspect / Mood Progression

Le Mot must **deliberately sequence** verbal forms across the syllabus rather than dumping conjugation tables. The intended ordering of doorways (subject to syllabus refinement) is:

1. **Infinitive chains** (modal/semi-modal + infinitive)
2. **Present**
3. **Near future** (aller + infinitive)
4. **être en train de + infinitive** (progressive)
5. **venir de + infinitive** (recent past)
6. **Passé composé**
7. **Imparfait**
8. **Plus-que-parfait**
9. **Futur simple**
10. **Conditionnel**
11. **Subjonctif doorway** (recognition/chunk first)
12. **Imperative**
13. **Participles / adjective-like forms**

> **Chunk-before-grammar rule.** Many of these forms appear **first as chunks or recognition items** (§5/§6) inside earlier lessons — `je voudrais` (conditionnel) and `s'il vous plaît` arrive long before the conditional is "taught". A doorway opening in the sequence above marks where a form gets *full grammar treatment*, not its first appearance. The engine teaches usable language early and names the grammar later.

---

## 11. Frequency Principle

Raw corpus frequency is **necessary but not sufficient** for choosing what to teach when. Item priority combines:

- **Frequency** — How often the item occurs in real French.
- **Usefulness** — How often the *learner* will actually need it in their first real situations.
- **Generativity** — How many other things the item unlocks (frames and chunks that transform widely score higher).
- **Social importance** — Politeness, greetings, and face-saving language that matter disproportionately in real interaction.
- **Emotional usefulness** — Language the learner *wants* to say (their reasons for learning), which drives motivation honestly without gamification.
- **Cognitive readiness** — Whether the learner has the prerequisite pieces; high-frequency items are deferred if they require unseen structure.

A high-frequency item that is ungenerative, socially minor, and cognitively premature can rank *below* a less frequent item that is generative and immediately usable.

---

## 12. Feedback / Natural Reveal Compatibility

The engine must produce the data and structure that the feedback surface consumes. Each production item should support:

- **Answer Reveal** — The correct/model answer, shown neutrally after an attempt.
- **Natural Reveal** — Why the natural answer is natural: the chunk/frame at work, what made it idiomatic, and *accepted alternatives* (so a learner's valid variant is recognized, not marked wrong).
- **Weak-point tagging** — A tag on what specifically went wrong (a phenomenon, sound, or item), feeding Practice Pool repair and Daily Review priority.
- **"Take another look" self-correction** — A neutral invitation to retry, never "wrong" / "you failed". Mistakes are mirrored, not punished.
- **Natural alternatives** — A bounded set of valid alternate productions per target, so Say It Your Way and Weave accept real variation.
- **Register notes** — When relevant, a note on politeness/formality/spoken-vs-written, so the learner learns *how it lands*, not just whether it parses.

This is the engine's contract with the killer trinity: **Natural Reveal** is only as good as the alternatives and register data the lesson plans for.

---

## 13. Practice Pool / Daily Review Compatibility

Each lesson must produce **seeds and hooks** that downstream retrieval surfaces consume. A lesson is responsible for emitting (conceptually, at planning time):

- **Build** — Easier reconstruction tasks (arrange/assemble from known pieces).
- **Stretch** — Mid-difficulty tasks that push toward active/transformed production.
- **Challenge** — Harder tasks that demand transformation (§9) or free production.
- **Daily Review** — Items eligible for the day's small review goal, drawn only from lessons the learner has actually reached.
- **Listening traps** — Sound/writing-tag-driven distractors for listening discrimination.
- **Weak-point repair** — Targeted re-practice keyed to weak-point tags (§12).
- **Later retrieval** — Carry-out items (§8) scheduled for spaced reappearance.

> Daily Review draws only from the *eligible* lesson pool and never manufactures pressure ("come back tomorrow", streak language) — it is a calm offer of retrieval, consistent with the no-gamification identity.

---

## 14. Mon Lexique Compatibility

**This is the critical compatibility contract.**

**Mon Lexique is the learner-facing memory of the engine — not a separate dictionary bolted on later.** It is where the pieces a learner has produced become visibly *theirs*. For this to work, syllabus items must share **one canonical identity** across every system:

- lesson content
- Weave
- Practice Pool
- Daily Review
- Natural Reveal
- Mon Lexique
- the future Word Graph

The same item is the same item everywhere. Mon Lexique therefore *consumes* (conceptually — no implementation now):

- **canonical item IDs** (the shared identity)
- **chunk / frame metadata** (type, slots, pattern)
- **first-seen lesson** (where the learner met it)
- **where-used examples** (the sentences it has appeared in)
- **carry-in / carry-out lineage** (§8 — how it arrived and where it goes)
- **mastery states** (§6 — its production maturity)
- **related chunks / forms** (siblings, transformations)
- **weak-point tags** (§12)
- **review hooks** (§13)

But the **learner-facing** Mon Lexique must stay **simple**. The learner sees:

- meaning
- examples
- where you met it
- related pieces
- your own sentences
- confidence / mastery
- optional deeper notes

> **Do not expose technical matrix codes, status enums, or internal IDs to learners.** The rich metadata powers Mon Lexique invisibly; the surface is a calm, personal notebook. Mon Lexique scope is tiered (Dev APK: hidden/minimal; MVP/base: learner notebook; later: deeper AI; post-beta: Word Graph adjacency) — this doc defines its *compatibility contract*, not its build.

---

## 15. Word Graph Compatibility

The future **Word Graph** must reuse the **same item / chunk / frame relationships** defined by this engine — the same canonical identities (§14), the same related-pieces and transformation links. It is the connected, exploratory view of the memory Mon Lexique already holds.

> **Word Graph is post-beta / post-MVP and must not drive current runtime.** No graph traversal, adjacency, or "killer #3 demo" logic belongs in any current build. The only present obligation is to *not break future compatibility*: keep item/frame identities and relationships stable so a later graph can be built on them without re-modeling.

---

## 16. Anti-Scope Rules

This document is canon/spec only. The following are explicitly **out of scope** and must not be started, scaffolded, or "just stubbed" on the basis of this doc:

- **No runtime engine implementation before the Dev APK smoke test.** Smoke is the boundary.
- **No backend learner-memory implementation now.**
- **No full Mon Lexique implementation now** (compatibility contract only — §14).
- **No Word Graph implementation now** (§15).
- **No AI-generator dependency now.** The engine must be sound without AI; AI is a supporting layer. *If/when AI is eventually built, it must obey `docs/syllabus/ai-generation-contract-v1.md` (generate variation inside a lesson spec, never curriculum).*
- **No RAG / user-upload feature.** (DeepTutor's upload/RAG model is *not* imported.)
- **No multi-agent tutor system.** (DeepTutor's TutorBot / multi-agent runtime is *not* imported.)

DeepTutor influence is bounded to *inspiration* for learning-object structure, memory semantics, exercise-seed logic, and tutor voice — never its architecture or backend.

---

## 17. Open Decisions

These are **unresolved** and are listed rather than silently decided. They should be settled in future syllabus/canon work, not assumed:

- **Item counting methodology** — Exactly how an "item" is counted toward the §7 budget (does a frame plus its filled variations count as one item or several? do chunks count as one?).
- **Exact L1–L24 item volume targets** — The §7 ranges are coarse; per-lesson active/supported/recognition targets for the Core 150 spine are not yet fixed.
- **Canonical ID naming convention** — The scheme for stable item/chunk/frame IDs shared across systems (§14). The codebase has provisional `chunk-*` / `verb-*` / `noun-*` style IDs and an `lm7_v1_*` storage namespace; a single documented convention is not yet locked.
- **When to expose Mon Lexique** — Whether Mon Lexique surfaces in the public beta or waits beyond it, and what its minimal first surface is.
- **How much of the matrix becomes code after smoke** — Which parts of this engine become runtime data structures / validators after the Dev APK smoke test, and which remain planning-only canon.

---

*End of Learning Engine v1. This document is pedagogical canon. It authorizes no code, content, schema, or runtime change.*
