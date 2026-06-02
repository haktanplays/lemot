# Boundary Recognition — Learner-UI Presentation Decision

**Date:** 2026-06-02
**Current `main` HEAD:** `cc58081`
**Status:** Decision recorded. Docs-only — no code, fixture, validator/type, runtime, player, or schema change. Forward-looking guidance for a future learner-facing renderer.

This note records a **UX/product decision** about how *boundary recognition* objects
(recognition-only items the lesson shows but never asks the learner to produce — e.g. the
inversion and `qu'est-ce que` boundaries in L12) should be presented in the **final learner
UI**. It is a design intent, not an implementation request. It sits alongside, and does not
change, the build-status snapshots in
[`learning-engine-interactive-baseline.md`](./learning-engine-interactive-baseline.md) and
[`learning-engine-v0.1-baseline.md`](./learning-engine-v0.1-baseline.md). It was kept as a
**separate note** because those are "what landed" status snapshots, whereas this is a
forward-looking presentation decision for a renderer that does not exist yet.

## 1. Trigger

The L12 dev-player on-device smoke / review after **PR #35** (the L12 "Est-ce que / Yes-No
Question Wrapper" fixture). The inversion boundary card rendered *technically* in the dev player:

- exercise id visible: `L12-ex07-recognition-boundary-inversion`
- operation badge: `recognition`
- learner-facing prompt: "You may SEE «peux-tu faire ça ?», but L12 doesn't ask you to build
  inversion…"

## 2. Observed issue

Those technical labels and prompts are **acceptable in the dev player** — it is a debug surface
for validating engine objects, not a learner experience. But this raw, technical rendering must
**not** be treated as final learner UI. Exposing lesson/exercise IDs, the `recognition`
operation badge, and engine vocabulary like `boundary` would leak the engine's internals to the
learner and read as a confusing "exercise you can't do".

## 3. Decision

**Boundary recognition objects are valid engine objects, but the final learner UI must not
render them like normal technical exercises. They should render as soft "later form" cards.**

Final learner presentation should:

- **hide** lesson / exercise IDs
- **hide** internal operation labels such as `recognition`
- **avoid** technical labels such as `boundary`, `recognitionOnly`, `blockedProduction`
- render these as soft **"later form" / "not yet" / "you may see this later"** cards
- prefer **inline** placement, **not** a blocking modal
- **optionally** support expand / reveal for the meaning
- **preserve the pedagogical boundary**: the learner may *recognize* the form, but must **not**
  be asked to *produce* it

### Preferred learner copy direction

> "A form for later"
> "You may see 'peux-tu faire ça ?'."
> "It means 'can you do that?', but we won't build this form yet."
> "Today, we ask questions with 'est-ce que'."

## 4. Non-goals (explicitly out of scope right now)

- **No schema change now** — no new field on items/contracts/exercises.
- **No player patch now** — the dev player keeps rendering boundary cards technically; that is
  fine for a debug surface.
- **No live renderer migration now** — the learning-engine remains a dev-only, validateable
  experiment parallel to live v7.
- No fixture content change, no validator/type change, no public navigation change.

## 5. Future implementation hint (for whoever builds the learner renderer)

When a learner-facing renderer is eventually built, introduce a **presentation / rendering
hint** to mark these objects for the soft-card treatment — e.g. a value such as
`soft_boundary_card` or `later_form` (name TBD) carried by the recognition-only/boundary
objects — so the renderer can branch on intent rather than re-deriving it from operation +
bucket. This is a **later** step: it would be a deliberate, reviewed schema/presentation change,
**not** part of this note and **not** to be added now.

## 6. Status of the L12 boundary cards today

Unchanged and correct as engine objects: `L12-ex07` (inversion) and `L12-ex08` (`qu'est-ce
que`) remain `recognition` operations whose targets are `recognitionOnly` + `blockedProduction`,
so the validator already guarantees they are never production targets. This note governs only
how a future learner UI should *present* them — the engine boundary itself is already enforced.
