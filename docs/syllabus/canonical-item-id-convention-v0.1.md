# Canonical Item ID Convention v0.1

> **Purpose**: A lightweight, human-readable **naming convention** so every Le Mot syllabus artifact — lesson specs, Mon Lexique, Practice Pool, Daily Review, Word Graph, and AI-generation constraints — refers to the same learning objects by the same ID. **This is a documentation convention, not a runtime schema.** It authorizes no code, content, flag, or storage change.

> **Status & scope**: **v0.1, planning-only.** It does **not** require existing specs (L01–L05) or `content/itemRegistry.ts` to be retroactively rewritten in this step. Those currently use a **provisional `type-slug` hyphen style** (`chunk-je-voudrais`, `noun-cafe`, `frame-ne-pas`, `article-un`, `micro-je-suis-vs-j-ai`); this doc defines the **going-forward `prefix:slug` colon style** and maps the old style to it (§7). Migration is an **open decision / future action** (§11), to be aligned after the Dev APK smoke test — not now.

> **Resolves**: the "canonical-ID convention unlocked" gap flagged in `docs/syllabus/L01-L05-foundation-spine-retrospective.md` §10/§15 (cross-cutting blocker for Mon Lexique / Word Graph).

---

## 1. Purpose

Canonical IDs give every learning object **one stable identity** across systems. Without them, the same `je voudrais` is a different string in the lesson, in Weave, in Mon Lexique, and in a generated Practice Pool item — and nothing can be linked. IDs are needed for:

- **Mon Lexique compatibility** — the learner-facing notebook reads items by canonical ID (engine §14); the same ID powers "where you met it" and "related pieces."
- **Practice Pool / Daily Review hooks** — seeds and spaced-review hooks reference items by ID, not by surface text.
- **Word Graph future edges** — graph nodes/edges (post-beta) reuse the same IDs and relationships (engine §15).
- **AI generation constraints** — a generator is told which IDs it may use and which forms are blocked (§9).
- **Continuity / carry-out tracking** — carry-in/carry-out and the status ladder (engine §6) are recorded per ID across lessons.

> **Learner-facing rule (non-negotiable):** canonical IDs are **internal**. The learner never sees `chunk:je-voudrais` — they see "je voudrais." (engine §14)

---

## 2. Principles

- **Stable enough for docs, flexible before runtime.** v0.1 IDs are stable references for specs; the exact runtime encoding (colon vs dot, etc.) is still open (§11).
- **Human-readable.** An ID should be guessable from the concept.
- **Lowercase kebab-case slug.** `je-voudrais`, `je-ne-comprends-pas`.
- **Prefix-based.** `prefix:slug` — the prefix names the *kind* of object (§3).
- **ASCII IDs.** No accents or apostrophes *in IDs*: `café → cafe`, `s'il vous plaît → s-il-vous-plait`, `j'ai → j-ai`. Accents/apostrophes belong in **learner-facing labels**, never in IDs.
- **One concept, multiple linked IDs at different granularity.** `je voudrais` is a chunk (`chunk:je-voudrais`); "`je voudrais` + noun" is a frame (`frame:je-voudrais-plus-noun`); the politeness it carries is a phenomenon (`phen:polite-request`). These are linked, not merged (§4).
- **Do not expose technical IDs to learners.** (Repeated because it is the most important rule.)

---

## 3. ID Prefixes

| Prefix | Object kind | Examples |
|---|---|---|
| `word:` | a single lexical word (noun, verb lexeme, article, pronoun) | `word:cafe` · `word:baguette` · `word:aide` · `word:etre` · `word:avoir` · `word:un` · `word:une` · `word:je` |
| `chunk:` | a fixed / semi-fixed multi-word unit produced as one piece | `chunk:bonjour` · `chunk:je-voudrais` · `chunk:s-il-vous-plait` · `chunk:je-ne-comprends-pas` · `chunk:pouvez-vous-repeter` · `chunk:j-ai-faim` · `chunk:j-ai-besoin-de` |
| `frame:` | a pattern with one or more slots (`+` → `-plus-`) | `frame:je-voudrais-plus-noun` · `frame:je-voudrais-plus-infinitive` · `frame:j-ai-plus-state` · `frame:j-ai-besoin-de-plus-noun` · `frame:je-n-ai-pas-plus-noun` · `frame:c-est-plus-noun` · `frame:un-une-plus-noun` |
| `sent:` | a specific full sentence example, **lesson-prefixed** | `sent:l01-je-voudrais-un-cafe` · `sent:l02-je-voudrais-etre-medecin` · `sent:l04-j-ai-faim` · `sent:l05-je-n-ai-pas-de-cafe` |
| `phen:` | a named pattern / phenomenon / contrast | `phen:polite-request` · `phen:negation-ne-pas` · `phen:tu-vous-register` · `phen:etre-vs-avoir-state` · `phen:article-noun-package` · `phen:pas-de-after-negation` |
| `sound:` | a pronunciation / orthography fact | `sound:liaison-vous-etes` · `sound:elision-j-ai` · `sound:accent-e-aigu` · `sound:nasal-on` · `sound:silent-final-s` |
| `trap:` | a deliberate confusable / transfer error (option-only) | `trap:je-suis-faim` · `trap:je-voudrais-medecin` · `trap:un-baguette` · `trap:je-n-ai-pas-un-cafe` |
| `culture:` | a cultural usage / register note | `culture:bonjour-social-doorway` |
| `cog:` | a cognate / root / sound-bridge | `cog:repeter-repeat` · `cog:comprendre-comprehend` · `cog:tion-feminine-pattern` |

> **Slug rules**: strip accents; apostrophe → hyphen; spaces → hyphen; `+` in frames → the literal token `-plus-`. Keep slugs short but unambiguous.

---

## 4. Granularity Rules

Create an ID at the level you need to *reference*. The default ladder:

| Create a… | …when | Example |
|---|---|---|
| **word ID** | a single lexical item is taught/tracked on its own | `word:cafe` ("café") |
| **chunk ID** | a multi-word unit is produced as one fixed piece | `chunk:je-voudrais` ("je voudrais") |
| **frame ID** | a pattern has a slot that takes fillers | `frame:je-voudrais-plus-noun` ("je voudrais + noun") |
| **sentence ID** | a *specific* full example needs to be referenced (anchor, model answer, audio) | `sent:l01-je-voudrais-un-cafe` ("Bonjour, je voudrais un café, s'il vous plaît") |
| **phenomenon ID** | a teachable pattern/contrast spans items | `phen:polite-request` ("politeness lives in the verb") |
| **trap ID** | a wrong/transfer form is used as a distractor | `trap:je-voudrais-medecin` (missing infinitive: should be `je voudrais être médecin`) |
| **sound/writing ID** | a pronunciation/orthography fact is noted | `sound:elision-j-ai` |

Worked examples:
- "je voudrais" → **chunk** `chunk:je-voudrais`.
- "je voudrais + noun" → **frame** `frame:je-voudrais-plus-noun`.
- "Bonjour, je voudrais un café, s'il vous plaît" → **sentence** `sent:l01-je-voudrais-un-cafe`.
- "polite request" → **phenomenon** `phen:polite-request`.
- "je voudrais médecin" (missing `être`) → **trap** `trap:je-voudrais-medecin`.

> Don't create a sentence ID for every surface variation (`café` vs `cafe`, comma vs none) — those are *accepted alternatives* of one `sent:` (§10).

---

## 5. Relationship Fields

Suggested metadata fields for an item, in docs/specs (snake_case; all optional except an item's own ID + status):

| Field | Meaning |
|---|---|
| `first_seen` | lesson where the item first appears (e.g. `L1`) |
| `reused_in` | lessons that recycle it (`[L2, L4, L5]`) |
| `status_by_lesson` | status per lesson (`{L4: active, L5: recycled}`) — see §6 |
| `related_words` | linked `word:` IDs |
| `related_chunks` | linked `chunk:` IDs |
| `related_frames` | linked `frame:` IDs |
| `related_phenomena` | linked `phen:` IDs |
| `related_traps` | linked `trap:` IDs |
| `mon_lexique_entry` | the learner-facing entry this item feeds (§8) |
| `practice_hooks` | Practice Pool seed types (Build/Stretch/Challenge/…) |
| `review_hooks` | Daily Review schedule (`+1d`, `+3d`, `+7d`, engine-return) |
| `future_word_graph_edges` | relationships to record now for a later graph (placeholder) |
| `ai_generation_allowed` | what a generator may produce for this item (§9) |
| `ai_generation_blocked` | what a generator must not produce (unseen forms, etc.) |

> These are *documentation* fields. Their runtime shape (JSON keys, arrays vs sets) is open (§11) and should match `content/itemRegistry.ts` only after smoke-test migration.

---

## 6. Status Labels

Aligned with the engine's production-maturity ladder (engine §6):

`active` · `supported` · `recognition` · `recycled` · `transformed` · `expected`

Clarifications:
- **`transformed` and `expected` are planning states**, not necessarily distinct *runtime* enum values today (the runtime `itemRegistry.status` field currently uses a subset: `recognition` / `supported` / `active`). See engine §6 reconciliation.
- **Status is lesson-specific.** The same item can be `recognition` in one lesson and `active` later — record it via `status_by_lesson`. Example: `word:tu` is `recognition` in L2 and `active` in L3.

---

## 7. L1–L5 Example Mapping

Compact mapping of key foundation items to v0.1 IDs, with the **provisional spec ID** they currently carry (for migration reference) and their status arc.

| Concept | Canonical v0.1 ID | Kind | Provisional spec ID (current) | Status arc |
|---|---|---|---|---|
| bonjour | `chunk:bonjour` | chunk | `chunk-bonjour` | active L1 → recycled L2–L5 |
| je voudrais | `chunk:je-voudrais` | chunk | `chunk-je-voudrais` | active L1 → recycled/updated L2,L4,L5 |
| je voudrais + noun | `frame:je-voudrais-plus-noun` | frame | (implicit in L1/L5) | active L1, L5 |
| je voudrais + infinitive | `frame:je-voudrais-plus-infinitive` | frame | `chunk-je-voudrais-etre` (instance) | supported L2 (`je voudrais être`) |
| être | `word:etre` | word (verb) | `verb-etre` | active L2 (as verb engine) |
| je suis | `chunk:je-suis` | chunk | `chunk-je-suis` | recognition L0/L1 → active L2 → recycled L3,L4 |
| c'est | `chunk:c-est` | chunk | `chunk-c-est` | active L2 → recycled L3,L5 |
| ne…pas | `phen:negation-ne-pas` (+ `frame:ne-plus-pas`) | phenomenon / frame | `frame-ne-pas`, `grammar-ne-pas-sandwich` | recognition L1/L2 → active L3 → supported L4,L5 |
| tu / vous | `word:tu` / `word:vous` (+ `phen:tu-vous-register`) | word / phenomenon | `pronoun-tu`, `pronoun-vous` | recognition L2 → active/supported L3 |
| avoir | `word:avoir` | word (verb) | `verb-avoir` | active L4 |
| j'ai faim | `chunk:j-ai-faim` (frame `frame:j-ai-plus-state`) | chunk / frame | `noun-faim` + `frame-j-ai-state` | active L4 |
| j'ai besoin de | `chunk:j-ai-besoin-de` (frame `frame:j-ai-besoin-de-plus-noun`) | chunk / frame | `chunk-jai-besoin-de` | active L4 |
| un / une + noun | `frame:un-une-plus-noun` (`word:un`, `word:une`) | frame / words | `article-un`, `article-une`, `frame-objet-un-une` | active L5 |
| pas de after negation | `phen:pas-de-after-negation` (frame `frame:je-n-ai-pas-plus-noun`) | phenomenon / frame | `chunk-je-n-ai-pas-de`, `frame-pas-de` | supported L5 |
| être vs avoir state | `phen:etre-vs-avoir-state` | phenomenon | `micro-je-suis-vs-j-ai` | recognition L2 (seed) → central L4 |
| article = noun package | `phen:article-noun-package` | phenomenon | `grammar-noun-package` | active L5 |

> Migration takeaway: the rename is mostly mechanical — `chunk-*`→`chunk:*`, `noun-*`/`verb-*`/`pronoun-*`/`article-*`→`word:*`, `frame-*`→`frame:*`, `micro-*`/`grammar-*`→`phen:*`, `sound-*`→`sound:*`, `cognate-*`→`cog:*`, `faux-ami-*`/`culture-*`→`culture:*`, `trap-*`→`trap:*`. Not done in this step (§11).

---

## 8. Mon Lexique View

Internal canonical IDs collapse into **one simple learner-facing entry**. The learner sees the entry; the IDs power it invisibly.

**Example — "je voudrais":**

```
Internal (never shown to learner):
  chunk:je-voudrais
  frame:je-voudrais-plus-noun
  frame:je-voudrais-plus-infinitive
  phen:polite-request
  related: chunk:s-il-vous-plait, trap:je-voudrais-medecin, word:etre

Learner-facing Mon Lexique entry:
  je voudrais
  — meaning: "I would like" (a soft, polite request)
  — examples: "Je voudrais un café." · "Je voudrais être médecin."
  — where you met it: Lesson 1
  — related pieces: s'il vous plaît
  — your sentences: (learner's own)
  — confidence: ●●●○○
  — deeper note (optional): more graceful than "je veux"
```

> The learner-facing surface stays: **meaning · examples · where met · related pieces · your sentences · confidence · optional deeper note.** No prefixes, no slugs, no status enums, no matrix codes. (engine §14)

---

## 9. AI Generation Constraints

A generator (examples, variations, Practice Pool, Daily Review, Natural Reveal, Say It Your Way feedback) must be **bound by IDs**:

- **Allowed item IDs** — only the `word:`/`chunk:` IDs the lesson lists as active/supported may appear in produced French.
- **Allowed frame IDs** — only the lesson's frames may be filled; only with permitted fillers.
- **Blocked unseen forms** (`ai_generation_blocked`) — forms not yet introduced are forbidden **even if the French is correct** (prerequisite-safety overrides validity).
- **Weak-point tags** — generated repair items target the item's weak-point tags.
- **Natural Reveal target/alternative generation** — alternatives must stay within accepted-alternative bounds of the relevant `sent:`; register/upgrade notes follow the lesson's tone.
- **No free generation outside the lesson spec** — the generator may recombine allowed IDs; it may not introduce new grammar, vocabulary, or tense.

> This section is the seed for a future `docs/syllabus/ai-generation-contract-v1.md` (retrospective §12/§15). That doc will bind these rules formally before any AI content feature is enabled.

---

## 10. Do / Don't

**Do**
- Use `chunk:je-voudrais` for the chunk.
- Use `frame:je-voudrais-plus-infinitive` for "je voudrais être …".
- Use `trap:je-voudrais-medecin` for the missing-infinitive trap.
- Link granularities (`chunk:` ↔ `frame:` ↔ `phen:`) via relationship fields.
- Keep one `sent:` and list surface variants as accepted alternatives.

**Don't**
- Expose IDs to learners.
- Use accented or apostrophe'd IDs (`chunk:café`, `chunk:j'ai`) — strip to ASCII (`chunk:cafe`, `chunk:j-ai`).
- Create a new ID for every minor surface variation (comma, accent, casing).
- Collapse chunk / frame / sentence into one ID (they're different granularities).
- Invent a new prefix without adding it to §3.

---

## 11. Open Decisions

> Unresolved — listed, not silently decided.

- **Separator in runtime**: colon (`chunk:je-voudrais`) vs dot (`chunk.je-voudrais`) vs the current hyphen-only style — to be fixed when runtime adopts IDs.
- **Migration plan for `content/itemRegistry.ts`** — the provisional `type-slug` IDs (and the runtime `status` enum) → v0.1 convention, **after the Dev APK smoke test**; not in this step. Needs a mechanical rename map (§7) + a compatibility check.
- **Sentence-ID lesson prefixing** — confirm `sent:l01-…` (lesson-prefixed) vs an unprefixed scheme; lesson-prefix recommended here for traceability.
- **Homographs / multiple meanings** — how to ID a word with two senses (e.g. `baguette` = bread / wand / baton): one `word:baguette` with sense tags, or `word:baguette-bread` etc. (leaning: one ID + sense metadata).
- **Word Graph edge detail** — how rich `future_word_graph_edges` should be (typed edges vs simple adjacency); deferred to the Word Graph design (post-beta).
- **Version bump trigger** — what change promotes this from v0.1 to v1.0 (likely: runtime adoption + itemRegistry migration).

---

*End of Canonical Item ID Convention v0.1. Planning/documentation convention only — authorizes no code, content, schema, or runtime change. Existing specs and `content/itemRegistry.ts` are not rewritten by this doc; migration is a post-smoke action (§11).*
