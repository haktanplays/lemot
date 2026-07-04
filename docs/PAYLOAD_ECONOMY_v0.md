# Cairn Payload Economy v0

> Canon/planning spec. Locked by Haktan (2026-07-04) after the L1-L15 chip
> inventory audit (PR #170) and the spine narrowness analysis. This document
> authorizes NO lesson, registry, validator, or runtime change by itself; each
> execution step below ships as its own reviewed PR. Precedence: this spec
> extends `docs/CONTENT_FACTORY_CONTRACT.md` and defers to `CLAUDE.md` /
> `docs/DEV_APK_MVP_CANON.md` on conflict.

## 1. Why this exists

The audit's diagnosis: the ENGINE spine (je suis, j'ai, je voudrais, je vais,
je peux, il faut / je dois, est-ce que, ne ___ pas, y) is complete and
correctly narrow, but the lexical cargo riding those engines is thin
(~1.5 payload items per engine), plus four functional holes (repair pair,
oui answer paradox, excusez-moi parked too late, fatigue/soif never shipped).
The fix is NOT more active chips per lesson. It is a permanent four-layer
economy that answers, for every future item, the same question: engine,
cargo, ghost, or pool?

## 2. The four layers (guardrail — lock this)

```text
Motor (engine)   = the mastery spine. New engines are rare, gated doorways.
Payload (cargo)  = cheap supported words/pieces an existing engine carries.
Ghost (exposure) = seen/heard in examples; never required for correctness.
Practice Pool    = where breadth lives. The quarry, not the lesson.
```

Lesson surface = mastery path. Practice Pool = breadth. Ghost = atmosphere.
Backlog = future teaching. If an item cannot be placed in exactly one layer,
it is not ready.

## 3. Surface ceiling (Kademe 2 — the visible-lesson limit)

Per teaching lesson:
- active-new: 1-3 (unchanged; integrations stay at 0)
- supported additions: +2-3 max
- ghost additions: +2-3 max
- every SUPPORTED item appears at least twice in the lesson (meet + one use)
- GHOST items live ONLY in meet-card / insight example copy; no fill or
  weave ever requires them; they never enter piecesUsed

Anything beyond this ceiling goes to the Practice Pool or the backlog, not
into the lesson. This closes the "can we widen the lesson?" debate: no.

## 4. Canon decisions (locked)

### 4.1 Survival-formula class (NEW, closed)

A named exception class for frozen sentence-formulas learners need whole,
under stress (the s'il vous plait justification). Founding members, and the
ONLY members until Haktan approves another:

1. `je ne comprends pas`
2. `vous pouvez repeter ?`

Rules:
- Learned whole; may be chips (weave hint AND recap) despite sentence shape.
- Mechanically: the structural validator gets a SEPARATE, named
  `SURVIVAL_FORMULAS` set. **PROTECTED_CHUNKS stays frozen at its two
  entries** (je ne suis pas, ce n'est pas) — the survival class does not
  widen it, it is a different class with a different justification.
- Closed class: additions are Haktan-approval canon events, like
  PROTECTED_CHUNKS.
- This also heals the L13-spec assumption that repair is owned from L1.

### 4.2 oui rehabilitation

`oui` becomes a producible ANSWER word. The post-L3 trap rule is scoped to
its real intent: oui must never be slotted INSIDE questions or statements
(the wrong-slot traps in L8/L13/L14 stay). Registry status stays `active`;
the R2 finding is resolved as scope clarification, not demotion.

### 4.3 Unchanged (restated so nobody relitigates them)

Full sentences are not chips (outside 4.1). `je ne peux pas` composes and is
never a chip. `vous pouvez m'aider ?` is never a chunk. `on y va` is a frozen
formula, not an on+y+verb pattern. `j'y vais` is chunk-owned, chip-free.
`il faut` primary / `je dois` supported / `aller` infinitive-support only.
No new engines in L1-L5. No `il y a`, no `il faut que` (trap only).

## 5. Payload families (the map — docs-level, no registry schema change)

| Engine | Family | Current cargo | Next cargo (enrichment) | Later |
|---|---|---|---|---|
| je voudrais | cafe/service | un cafe, faire une pause | un the | un croissant, une table, l'addition |
| je suis | human state | ici | fatigue(e) | content(e), pret(e), desole(e), en retard |
| j'ai | body/need | faim, une question | soif, une idee | froid, chaud, besoin de |
| ne ___ pas | repair/negative | (frames) | survival formulas (4.1) | je ne sais pas, je ne veux pas (composed) |
| est-ce que | wrapper | owned clauses | (none — wrapper takes no cargo) | more owned clauses only |
| y | place-reference | j'y vais, on y va | (none in this pass) | tu y vas, vous y allez, je n'y vais pas |
| il faut / je dois | necessity | faire une pause, aller | (none in this pass) | more owned infinitives |

Family membership lives in this table + `relatedItemIds`; no new registry
field in v0.

## 6. L1-L5 enrichment target (Kademe 2, locked by Haktan)

| Lesson | Active | Supported (new bold) | Ghost / exposure | Do-not-chip |
|---|---|---|---|---|
| L1 Survival Kit | merci | **excusez-moi**, **je ne comprends pas**, **vous pouvez repeter ?**, **un the** | un croissant, madame, monsieur | je veux |
| L2 Etre | je suis | ici, **fatigue(e)** | la, (option: pret(e)) | full etre paradigm |
| L3 Non | non, je ne suis pas, ce n'est pas, **oui as answer** | ne ___ pas, non merci | pas de probleme | ne...jamais, ne...rien |
| L4 J'ai | j'ai | faim, une question, **soif**, **une idee** | j'ai froid / j'ai chaud (examples only) | avoir paradigm, il y a |
| L5 Un / une | un cafe, une question | **un the**, **une table** | un restaurant, une maison | gender rule table, article paradigm |

Notes:
- `un the` carries two roles by design: L1 = service variation, L5 = article
  package reinforcement. One registry pair (`noun-the` + `chunk-un-the`),
  following the existing cafe precedent.
- `une idee` reuses the already-registered dormant `noun-idee` (R4 payoff).
- L6 gets NO new items; after enrichment its scenes may recombine the new
  cargo (payoff pass: model answers/scenes only, 0 new lexis).

## 7. Practice Pool payload packs (planning; pool-side, not lesson-side)

Repair Pack (je ne comprends pas, vous pouvez repeter ?, pardon, excusez-moi)
· Cafe Pack (un cafe, un the, un croissant, une table, l'addition, un verre
d'eau) · Human State Pack (je suis ici/fatigue, j'ai faim/soif/froid/chaud)
· Answer Pack (oui, non, non merci, pas de probleme) · Article Pack (un/une
pairs). Packs draw from `docs/audits/l1_l15_chip_inventory/candidate_inventory.csv`;
pool implementation is its own later workstream (not authorized here).

## 8. "Seen but not yours yet"

Ghost items require NO engine change: the mastery reducer already counts
recognition separately and the derived Lexique layer weights recognition low
(0.25), so ghosts naturally sit below ownership. The learner-facing
"Seen on the path / Not yours yet" label is a future Mon Lexique surface —
dev-apk out-of-scope, deferred with the rest of Mon Lexique.

## 9. Metrics (measured by the audit generator each batch)

```text
End of L5 :  18-22 producible surfaces   / 30-35 recognizable
End of L15:  45-55 producible surfaces   / 70-90 recognizable
```

Every enrichment/content PR states actual-vs-target in its body. The counts
come from the same extraction the L1-L15 audit used; no runtime code.

## 10. Execution order (each step = its own reviewed PR)

```text
1. PR #170 audit merge                       DONE (beb4331)
2. Registry hygiene pass (R2-R4)             DONE (PR #171, 9c799d9)
3. THIS spec (canon)                         this PR
4. L1-L5 Kademe 2 enrichment                 smoke-bearing (visible dev-APK);
                                             includes the SURVIVAL_FORMULAS
                                             lint set + oui production
5. L6 payoff adjustment (0 new lexis)        may fold into step 4's review
6. Practice Pool payload packs               separate workstream
7. L16 content line resumes                  factory loop as before
```

Step 4 requires Haktan pedagogical review AND Operator device smoke before
merge (L1-L5 are learner-visible). Steps 1-3 and 6-7 are not smoke-bearing.

## 11. What this spec does NOT authorize

No runtime UI change, no Home cap change (L6), no learning-engine behavior
change, no telemetry/compaction change, no audio/AI/paywall/sync, no APK
build. The enrichment batch (step 4) ships only after this spec merges and
under its own review gate.
