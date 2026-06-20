# L7 — Je Vais / Frozen Next-Step Doorway (Compact Lesson Spec)

> Follows `docs/learning-engine-v1.md` + `docs/syllabus/lesson-spec-template-v1.1.md` + `docs/syllabus/canonical-item-id-convention-v0.1.md` + the shipped L0–L6 v1 runtime (`content/lessons/v1/`, `content/itemRegistry.ts`) + the L7 readiness audit (cloud session, branch `claude/l7-readiness-audit-spec-y856op`).
> **Compact spec** — planning/spec only. Authorizes **no** code, content, flag, or runtime change. Locked product canon wins on conflict.

> **THIS is the accepted next-PR direction for L7 — NOT** `docs/syllabus/L07-aller-movement-next-step.lesson-spec.md`. The full aller/movement spec is preserved as historical/planning input but is **too broad** for the next safe PR and **assumes L1–L6 content that the shipped runtime does not contain** (see §2). A future agent implementing L7 must follow this compact doorway, not the full aller spec, unless an explicit later closeout decision reopens the full-aller scope.

> **BLOCKED.** L7 implementation is **blocked** until L0–L6 **Android/device smoke** completes and **Round 1 results** are in. `docs/STATUS.md` freezes the Round 1 runtime and its "Hard no" list bans *"multi-lesson content expansion beyond the Round 1 L1-L6 slice."* This doc is a planning artifact only; it does not authorize the L7 PR.

---

## 1. Why this compact spec exists

The L7 readiness audit reviewed the shipped L0–L6 runtime against the full
`L07-aller-movement-next-step.lesson-spec.md` and found the full spec cannot be
the next small PR. This doc records the **accepted, de-scoped L7 direction** so
the oversized full-aller lesson is not implemented by mistake.

The full aller spec remains valuable as the eventual **dedicated aller lesson**
(movement engine, `à/au/à la`, futur proche hook). It is **deferred**, not
cancelled. Its own §5 sanctions exactly this kind of frozen-chunk fallback
("demote `on va` to supported … do not add scope").

## 2. Why the full aller/movement L7 spec is not the next PR

1. **It assumes a richer L1–L6 than was built.** The full spec's prerequisites
   require `je voudrais + infinitive`, `j'ai besoin de` / `aide`,
   `je ne comprends pas`, `pouvez-vous répéter`, `c'est pas grave`,
   `comprendre`, `fatigué`. **None of these exist** in `content/itemRegistry.ts`.
   The shipped L0–L6 is smaller: greetings/politeness, `je suis` / `je suis ici`
   / `je ne suis pas`, `j'ai` / `j'ai faim` / `j'ai une question`,
   `oui` / `non` / `non merci`, `un/une` packages, `je voudrais` (+ a noun only).
2. **It is a broad grammar jump.** It owns ~8 active-new items + the `aller`
   verb + an `à/au/à la` movement sub-system — beyond a small PR and beyond the
   "one or two new active items, no broad grammar jump" guardrail.
3. **ID-convention mismatch.** The full spec uses `prefix:slug`
   (`chunk:je-vais`); the runtime uses kebab IDs (`chunk-je-vais`). The full
   spec is planning canon, not runtime canon.

## 3. Accepted compact L7 direction — frozen-chunk doorway

L7 is a **frozen-chunk doorway**, taught the way the runtime already teaches
`chunk-je-suis-ici`, `chunk-non-merci`, and `chunk-au-revoir` (whole phrases, no
paradigm). It continues L6's "small moment" arc: L6 closed at *au revoir*; L7
adds where you're heading next.

**Learner promise:** close a small moment and say you're heading off —
*Je vais à la maison. Au revoir.*

### Owned new items (exactly two; ID convention = runtime kebab)

| Item ID | Status | Taught as | Meaning |
|---|---|---|---|
| `chunk-je-vais` | **active (new)** | frozen chunk, **no conjugation** | "I'm going / I'm heading off" |
| `chunk-a-la-maison` | **supported (new)** | frozen destination unit, **not** `à/au/à la` as a rule | "home" |

Together they form the headline line `Je vais à la maison.`; `Je vais.` alone is
the minimal-acceptable production.

### Recycled from L0–L6 (no new items)

`chunk-au-revoir`, `chunk-merci`, `chunk-bonjour`, `chunk-je-suis-ici`,
`chunk-je-ne-suis-pas`, `chunk-j-ai-une-question`, `chunk-non-merci`,
`chunk-oui`, `chunk-non`.

### Strict out-of-scope (do NOT introduce)

- **No full `aller` paradigm** (`tu vas`, `on va`, `nous allons`, `vous allez`,
  `ils vont`).
- **No `à / au / à la` system.** `à la maison` is one frozen unit; the
  contraction/preposition rules are a later, dedicated lesson.
- **No futur proche** (`je vais + infinitive`, e.g. `je vais comprendre`) — not
  even as a recognition hook in this compact version.
- **No `y`** (`j'y vais`, `on y va`), **no `où`** questions, **no `ça va`**.
- **No new destinations beyond `maison`** (no `au café` movement, no `Paris`, no
  travel vocabulary).
- No past/future tense, no numbers/money.

## 4. PR shape constraint (when unblocked)

A future L7 implementation must be **one small PR touching only**:

- `content/itemRegistry.ts` — add `chunk-je-vais`, `chunk-a-la-maison`.
- `content/lessons/v1/lesson-007.ts` — the lesson (number `7`,
  `prerequisites: ["v1-lesson-006"]`, screens mirroring the L6 shape:
  insight-card → meet-card → fill-with-traps → weave → natural-reveal →
  say-it-your-way (`model-answer-only`, no AI) → recap).
- `content/lessons/v1/index.ts` — register `lesson007` in `V1_LESSONS`.

This matches the L6 PR shape (PR J). `getItems([...])` is compile-checked, so
both new items **must** be registered or `tsc` fails — do not reference an
unregistered item. No other runtime file is in scope for the content PR.

## 5. Home visibility bump = separate reviewed decision

`app/(tabs)/index.tsx` hardcodes the dev-apk lesson scope as
`l.number >= 1 && l.number <= 6`. Registering L7 leaves it **not reachable** in
the build. **Surfacing** L7 requires bumping that filter to `<= 7`, which
**mutates the frozen Round 1 runtime**.

That bump **must remain a separate, explicitly reviewed Round 1 closeout
decision made after the L0–L6 device smoke** — never an incidental edit folded
into the content PR. Per Master Pipeline Rule 11, a cloud session cannot mark
the operator-side device/tester smoke blockers resolved.

## 6. Pointers

- **Full (deferred) aller spec:** `docs/syllabus/L07-aller-movement-next-step.lesson-spec.md` — preserved as historical/planning input.
- **Runtime foundation:** `content/itemRegistry.ts`, `content/lessons/v1/lesson-006.ts`, `scripts/tests/v1LessonStructure.test.ts`.
- **Blocking canon:** `docs/STATUS.md` (Round 1 runtime freeze + "Hard no").

## 7. When to revisit

- After the L0–L6 Android/device smoke and Round 1 tester-wave results are in,
  decide: implement this compact L7 doorway, or reopen the full aller scope as
  an explicit, separately reviewed decision.
- If/when the dedicated aller lesson is built later, reconcile the full aller
  spec's `prefix:slug` IDs and richer foundation against the shipped runtime
  registry (operator-side sync item — not done here).

---

*End of L7 compact frozen-chunk doorway spec. Planning canon only — authorizes no code, content, flag, or runtime change. The L0–L6 Android/device smoke and Round 1 closeout remain the boundary before any L7 implementation PR.*
