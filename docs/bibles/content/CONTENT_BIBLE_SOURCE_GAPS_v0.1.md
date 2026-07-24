# Cairn Content Bible — Source Gaps v0.1

> Companion to [`CONTENT_BIBLE_RATIFICATION_PACK_v0.1.md`](CONTENT_BIBLE_RATIFICATION_PACK_v0.1.md). **Only** missing evidence that *materially prevents a decision* is listed. Not a wishlist. Read-only; authorizes nothing.

Each gap states: what is missing, which decision it blocks, where the authoritative source lives, and whether it is recoverable in-repo.

## G1 — Reading: baseline principle now SET by founder; only implementation detail remains open (CB-50 / Q7)

- **Resolved (2026-07-24 founder correction — supersedes the earlier gap):** the baseline Reading principle is **no longer unknown**. Founder direction: *every Reading ends in an appropriate learner **action** — recognizing the scene/intention, noticing a reusable piece, selecting a continuation, identifying a contrast, extracting useful language, matching a line to its social function, making a bounded prediction, small supported reuse, or **production when level, prerequisites, and cognitive load make it appropriate** — **but not necessarily full production**.* Early (L0–L3) Reading normally ends in a bounded non-production action; later Reading may lead to freer reuse/production under prerequisite-safety and load limits. Universal prohibitions: no sentence-by-sentence translation testing; no default "what does this sentence mean?"; no school-style paragraph comprehension; no passive page-turning; no production added merely to satisfy a quota. **Ratified 2026-07-24 (Q7 = YES)** as Content canon.
- **Superseded:** the earlier *"every Reading exercise must end in production"* proposal is too strong; preserved as historical design reasoning, **not current canon**.
- **Still open (implementation detail — does NOT block the principle):** the exact Reading exercise-family **taxonomy**, the scale inventory, the **validator implementation** (the specific scale-rule list truncated in `EXERCISE_CANON §16` after "do not turn reading into a translation quiz"), and level-specific tuning of which actions are appropriate per band.
- **Four-layer split:** (1) *settled principle* = action-required, production-conditional (Q7); (2) *tunable implementation* = the per-band appropriate-action set; (3) *unresolved taxonomy* = the Reading exercise families; (4) *Engineering enforcement* = a future Reading validator (the truncated §16 list) — Engineering-owned.
- **Recoverable in-repo?** The principle: **yes** (founder-provided). The taxonomy/validator list: no (still truncated in-repo) — reconstruct with founder before Exercise System v1.
- **Unblocks:** Q7 = YES **ratified** the principle; taxonomy/validator remain deferred implementation (Content/Engineering), not a blocking gap.

## G2 — French style guide is MISSING; `L1-L5 Proofreading.md` does NOT close it (blocks Q10 / CB-68b, CB-71)

- **Source-interpretation correction (2026-07-24):** `L1-L5 Proofreading.md` is a **legacy L1–L5 French-content inventory + proofreading brief + corpus of learner-facing French examples**. It is **NOT** a complete French style guide, a Reading-system canon, a sentence-length policy, a register policy, or sufficient evidence to close the broader French-style gap. Use it as **supporting evidence** for historical French copy and QA concerns only; ingesting it does **not** close this gap.
- **Missing (genuinely open — do NOT invent):** metropolitan-French register boundaries; spoken-vs-written register; sentence-length guidance by band; English-explanation register; gender-inclusive learner treatment; punctuation/typography conventions; acceptable colloquial omission; human-reviewer requirements. `French Linguistic QA.md` is a **process skeleton, not a style guide** (*"Tam Fransızca stil rehberi YAZILMADI"*).
- **Blocks:** treating the French-QA gate as fully executable — there is no comprehensive standard to review against beyond the derived "contemporary metropolitan French" default.
- **Authoritative source:** a full French style guide **does not yet exist** in-repo (and, as far as known, is not a single operator-vault file); it must be **authored**. `L1-L5 Proofreading.md` is one input, not the guide.
- **Recoverable in-repo?** No — requires authoring a style guide; ingesting `L1-L5 Proofreading.md` alone is **insufficient**.
- **Unblocks by:** **Ratified 2026-07-24 (Q10 = accept, with timing):** author a full French style guide (using `L1-L5 Proofreading.md` as one input) and staff a named reviewer. The executable gate + reviewer must be in place **before Stage C (invited-learner exposure)**; they **must not block** internal authoring, drafting, schema work, or founder-only testing before Stage C. Until the style guide exists, unresolved style matters are **marked open, not invented**. The style-guide gap stays **OPEN** until authored.

## G3 — Named French reviewer / QA staffing UNKNOWN (blocks Q10 executable gate / CB-71)

- **Missing:** who performs qualified native French QA. `French Linguistic QA.md`: reviewer identity/supply *"UNKNOWN"*; gate execution *"OPEN — founder-reported / provisional"*; and no lesson is claimed to have passed QA.
- **Blocks:** treating the QA gate as an *executable shipping gate* (Stage C requires "0 unresolved BLOCKER/MAJOR" and a named reviewer + recorded verdict).
- **Authoritative source:** founder decision (staffing) — not a document.
- **Recoverable in-repo?** No — it is a founder/operations decision, not a missing file.
- **Unblocks by:** Q10 commitment (ii) — staff a named reviewer.

## G4 — Item-counting methodology undefined (blocks Q5 precision / CB-22)

- **Missing:** how an "item" is counted toward the budget. `learning-engine-v1 §17`: *"Item counting methodology — Exactly how an 'item' is counted… (does a frame plus its filled variations count as one item or several? do chunks count as one?)"* is listed as an **open decision**; the §7 ranges are *"coarse."*
- **Blocks:** fully reconciling active-new "1–4" (locked) with "8–15" (coarse) — the numbers may be measuring differently. The *direction* (1–4) is ratify-able; the exact reconciliation is not.
- **Authoritative source:** future syllabus/curriculum decision.
- **Recoverable in-repo?** Partially — this is a Curriculum decision to be made, not a missing file. Routed to Curriculum in Q5.

## G5 — Operator-vault raw founder logs not in-repo (bounds several wordings, blocks nothing outright)

- **Missing:** the raw negotiation behind distilled decisions. `90_HISTORY/Historical Prompt Logs.md`: *"ham prompt ve tartışma loglarının çoğu repoda yoktur… UNKNOWN de, uydurma."* Also operator-vault-only: `v1 Canon TOP`, `Q1–Q6 / D1–D6`, `LeMot - User Journey.md`, Merged Product Canon 2026-05-11 detail.
- **Blocks:** nothing outright — every ratification question is answerable from in-repo distilled canon. But **exact final wording / thresholds** for some items (e.g. the reading rules G1, the insight-budget origin Q6, the gender rule Q11) may already be settled there.
- **Authoritative source:** operator Obsidian vault.
- **Recoverable in-repo?** No — the live vault (`~/Documents/Smart Brain/01 Projeler/LeMot/`) is **inaccessible from this session** ("Operation not permitted"). Reported, not guessed.
- **Unblocks by:** operator confirms wording where these questions are answered in the vault; otherwise the founder decides fresh in Q6/Q7/Q11.

---

### Not included (deliberately)

The following are *known-open but do not block a ratification decision* and live in the matrix/pack, not here: Mon Lexique final band copy (CB-80, DEFERRED), Build/Stretch/Challenge runtime (CB-75, DEFERRED), Instruction-Weave thresholds (CB-40–43, DEFERRED to Phase D), Summit phase→copy recalibration (CB-84, DEFERRED), and the various `TUNABLE` numbers (pack §5). These are deferrals with clear owners, not evidence gaps.

*End of Source Gaps v0.1. Read-only; authorizes no change.*
