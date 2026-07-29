---
title: Cairn PRJ-015 Item-Counting Contract
version: 0.1
status: Draft — awaiting founder sign-off
authority: Draft Curriculum counting-governance contract. Becomes binding only after explicit founder sign-off and Canonical promotion.
owner: Curriculum
date: 2026-07-29
implementation_authority: none
prj_status: OPEN
source_discovery: PRJ_015_ITEM_COUNTING_DISCOVERY_v0.1.md
---

# Cairn PRJ-015 Item-Counting Contract v0.1 (Draft)

## 1. Status, purpose and boundaries

**Draft — awaiting founder sign-off. PRJ-015 remains `OPEN`.** Canonical
will not mean implemented: this Contract governs **counting language**,
not technical storage — it authorizes no database, store, schema,
registry change, migration, or validator. Boundaries: **Content** owns
the active-new **1–4** invariant itself; **Mastery & Evidence** owns all
evidence and mastery consequences of linked or separated identities;
**Engineering** owns runtime identity, ID syntax, and migration;
**Product** owns long-range vocabulary promises (the ~3,000-word planning
band is never a counter). Founder decisions FQ-P1…P6 (2026-07-29) are the
source of every rule below; provenance in the source discovery.

## 2. Three counting contexts — IC-001

A **minimal three-context model** (a conceptual accounting distinction,
not an architecture):

1. **Identity** — what pedagogical units exist, which are distinct, and
   which are linked.
2. **Acquisition** — what **new demand** a lesson places on the learner.
   This is the context of active-new **1–4**.
3. **Presentation/load** — occurrences, beats, authored sections,
   rendered screens, and exposure. Separate from both of the above
   (beats ≠ screens stands).

**Every numeric claim must name its context and its counted unit.**
There is no fourth ledger; no lexical-destination context is opened.

## 3. Active-new rule — IC-002

The **1–4** invariant counts **new learner-facing active production
demands introduced in the lesson** — never raw IDs.

**Operating rule:** normal target **1–3**; hard maximum **4**; a fourth
demand requires a short cognitive-load rationale in the lesson spec. The
founder-ratified maximum remains **1–4**.

**Counts as one new active production demand:**
- a newly active word;
- a newly active whole chunk or survival formula;
- one newly active **linked productive concept** (see IC-003);
- a genuinely new productive operation;
- a **promotion** from supported or recognition to active.

**Does not count:**
- `phen:` or other meta/accounting entries;
- `sent:` model-answer anchors, and model answers generally;
- sound/pronunciation items;
- culture or cognitive notes;
- traps;
- recognition-only material;
- supported-only material;
- ghost exposure;
- recycled material;
- a filler merely because it appears inside a frame.

**Integration lessons: 0 active-new production demands.** They may
contain recycle, supported, recognition, meta, or presentation material —
and **may not promote an item to active inside the integration lesson**
(a promotion is a new active demand).

*Examples.* L3's `je ne suis pas` = one new productive operation
(negation transform) — counts. L12's `sent:l12-…` anchor and
`phen:question-expansion-1` — do not count; its graduated
`est-ce-que je peux` frame — counts as a promotion. L10/L13/L16's
"active (meta)" `phen:` entries — never count; those lessons are 0.

## 4. Frames and fillers — IC-003

Identity and acquisition stay separate: chunk, frame, and phenomenon
identities **may remain distinct and linked** (identity context). When
they jointly open **one productive learner capability**, acquisition
counts them **once**. A later extension of an owned chunk counts only
when it creates a **genuinely new productive operation**. A filler does
not count merely because it appears inside the frame; it counts
separately **only when it is itself a new active lexical production
target**. Supported, recognition, and recycled fillers never count
toward active-new.

*Examples.* `je voudrais` + its initial frame + `phen:polite-request` =
**one** productive concept (identity: 3 linked IDs; acquisition: 1).
`je voudrais + infinitive` counts later **only if** promoted to active as
a genuinely new productive operation (its L6 introduction as *supported*
counted 0). `un café` is evaluated through **its own** acquisition
status — it is not added to the count because it fills the
`je voudrais ___` frame.

## 5. Identity policy — IC-004

**Each separately owned pedagogical unit or sense has one primary
acquisition identity. Additional representation or analysis granularities
may exist as linked sub-identities.** (*Deliberately not* "one surface →
one id": one visible surface may still represent different identities
when meaning, function, or sense genuinely differs.)

- **Primary acquisition identity** — the identity acquisition counts and
  planning references for a unit or sense.
- **Linked sub-identity** — an additional granularity (bare noun under a
  package, frame under a concept, analysis phenomenon) that never
  multiplies the acquisition count by existing.
- An **article+noun package** may be the primary early learner identity;
  the bare noun becomes a linked sub-identity only when independently
  needed.
- A **protected chunk** counts as one acquisition demand. A **survival
  formula** counts as one acquisition demand.
- **YASA-2-frozen IDs** are not renamed, not deleted, not historically
  merged; they may later receive primary/link relationships through a
  **separate Engineering task**. This Contract defines policy only — no
  runtime link schema and no mastery-merging algorithm.

## 6. Sense, inflection and gender — IC-005

- Inflected forms do not automatically create separate acquisition
  identities: **`suis`, `est`, `êtes` are surface realizations of
  `être`**, not separate items.
- Grammatical gender variants do not automatically create separate
  identities: **`content` / `contente` is one pedagogical item** unless a
  future Canonical decision establishes a meaningful semantic
  distinction.
- Different **senses** receive distinct identities when Cairn
  intentionally teaches or owns them separately. The split-sense uses of
  **`faire`, `aller`, `pouvoir`** therefore require future sense
  separation when later meanings are independently owned; until
  Engineering supports this, **lesson scoping preserves the distinction
  and the debt stays recorded**.
- **Mastery & Evidence remains the authority** for how linked or
  separated identities affect evidence and mastery — no algorithm is
  defined here.

## 7. Historical numbers — IC-006

| Number | Disposition (founder, 2026-07-29) |
|---|---|
| `8–15 active-new` | **SUPERSEDED** — must not remain a binding authoring rule; source banners and template cleanup are future documentation follow-through |
| `30–45 total exposure` | Historical, **non-binding heuristic** — not carried into this Contract as a target; reconsidered only after a useful presentation/load unit is defined and evidenced |
| Breadth trajectory (L5/L15 pairs) | **Retired pending redefinition** — may not be cited until denominator and unit are explicit |
| `52` | Historical pre-hygiene v1-registry snapshot |
| `54` | Current v1 registry = shipped-manifest count |
| `56` | **Never-real counting artifact** |
| `59` | Separate learning-engine registry count |
| Registry numbers generally | May not be compared or added without naming the registry and snapshot |
| Integration active-new | **Binding: `0`** — meta/accounting entries must not be labeled active-new to preserve historical totals |

The affected source documents are **not edited by this Contract**.

## 8. Cross-context safeguards

- An identity count is not an acquisition count.
- An acquisition count is not cognitive load.
- Presentation frequency does not create identity.
- Linked identities do not automatically multiply the acquisition count.
- An acquisition count does not establish mastery.
- Numbers from different registries cannot be compared without naming
  the source.
- **No validator may claim precision until the relevant rule is Canonical
  and implemented.**

## 9. L17 worked example

The L17 compact spec lists **five** active-new entries; **two are meta
`phen:` entries** (`phen:social-check-in`,
`phen:human-context-feelings-light`). Under this draft's IC-002 rule the
candidate acquisition count is **2–3** (the frozen `ça va` chunk pair +
`word:content`), which **plausibly reconciles** the historical
"3–5 / 5 vs 1–4" conflict without a payload change. This draft **does not
alter L17**, does **not** claim runtime compliance, and the
reconciliation becomes authoritative **only after founder sign-off and
Canonical promotion** of this Contract. Until then the Charter's L17
payload gate stands unchanged.

## 10. Explicit deferrals

Registry unification · runtime ID syntax · link representation ·
migration · mastery evidence effects of linking/splitting ·
lexical-destination counting · a 3,000-word operational counter ·
passage identity · runtime `status_by_lesson` · validators ·
source-banner cleanup (IC-006 follow-through) · PRJ-015 closure.

## 11. Authoring stop conditions

Stop and report when a task involves:

- a numeric claim lacking a named context/unit;
- a lesson authored against `8–15`;
- an integration lesson introducing any active-new demand (including an
  in-lesson promotion);
- active-new exceeding 4;
- a fourth demand without a cognitive-load rationale;
- linked identities double-counted toward acquisition;
- a runtime migration inferred from this Contract;
- mastery/evidence effects inferred from this Contract;
- a lexical word-total calculation (the 3,000-word band is not a
  counter).

## 12. Next step

Independent sign-off review of this draft; only after that review may
founder promotion be considered. **PRJ-015 remains `OPEN` during draft
and review**, and implementation remains a separate, later concern.

---

*End of PRJ-015 Item-Counting Contract v0.1 — Draft, awaiting founder
sign-off. Counting language only; authorizes nothing.*
