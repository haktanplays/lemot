# Engineering House Rules ("karpathy.md")

> Imported into the repo per operator decision K4 (2026-07-05) so away-agent
> sessions read the house rules from repo context instead of reconstructing
> them from task text. This is the minimum core, compiled from the operator's
> working definitions; if the operator's global copy diverges, the operator
> syncs this file — the repo copy governs cloud sessions meanwhile.

## 1. Think before coding

Read the relevant canon and the actual code before the first edit. Name the
tier of the change, the files allowed, and the failure modes. If the design
is unclear, the next step is a question or a spec, never speculative code.

## 2. Simplicity first

The simplest structure that honors the contract wins. No opportunistic
refactors, no speculative abstraction, no new dependency when the standard
library or an existing module does the job. Fewer concepts beat clever ones.

## 3. Surgical changes

Small diffs, one intention per PR. Patch narrowly; do not reformat or
"improve" neighboring code. A reviewer should be able to hold the whole
change in their head.

## 4. The purity contract (engine code)

Every learning-engine module obeys all four, and tests lock them:

```text
PURE            no storage, no network, no React, no AI, no hidden state
DETERMINISTIC   same input -> same output, always; ties break explicitly
EXPLICIT now    the clock is a parameter; Date.now()/Math.random() never
                appear inside engine logic
FAIL BEHAVIOR   every function states what happens on bad input — and the
  EXPLICIT      default posture is fail-closed (return null / "unsupported"
                with data untouched), never a half-built result and never
                silent data loss
```

## 5. How the rules bind a PR

- Triple validation green before any PR: `npm run typecheck`,
  `npm run validate:content`, `npm run test:learning-engine`.
- New engine logic ships WITH the tests that lock its contracts
  (determinism, fail path, invariants) in the same PR.
- System laws ride every PR: YASA 1 (schema change ⇒ migration in the same
  PR) and YASA 2 (shipped itemIds are immutable; new ids are recorded in the
  same PR) — see `docs/ROADMAP.md`.
- The golden rule of screenless work: unseen UI behavior is never merged;
  it waits on a branch tagged `[awaiting device pass]`.
