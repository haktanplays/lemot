# Round 1 — Post-Smoke Decision Framework

> **Round 1 planning only.** This is how to *interpret* Dev APK smoke and tester
> feedback for the L0-L6 slice. It authorizes no implementation, does not unblock
> L7, does not change Home visibility, does not authorize any runtime change, and
> does not claim any Android/device smoke has passed (still pending — no device
> available yet). It keeps Round 1 L0-L6 as the current shippable scope.

> **It does not replace `docs/DEV_APK_SMOKE_TEST_CHECKLIST.md`** (the operator
> runbook) or `docs/workstreams/round1-test-plan.md` (the measurement layer:
> hypotheses H1-H6, Must-pass/Good/Warning/Fail signals, recall check). This is
> the *decision* layer on top of them: "we have feedback — now what?" It reuses
> their vocabulary and the P0-P3 severity tally used in `docs/STATUS.md`. It is a
> Round 1 operational tool, distinct from the long-term
> `docs/CAIRN_PRODUCT_DEFINITION_v0.1.md` vision.

> **Core principles (read first):** the hook is behavioral, not verbal. Praise
> without behavioral evidence does not count. A buggy session cannot measure the
> hook. Feature requests are logged, not acted on in Round 1. A weak hook
> triggers framing/Weave investigation before any new feature. L7 stays blocked
> until device smoke passes and an explicit closeout decision is made; the Home
> visibility bump (`<=6 → <=7`) stays a separate reviewed decision.

---

## 1. Tester observation protocol

**Watch (first session, mostly silent):**

- Where the tester hesitates or taps around hunting for the next action.
- Whether they reach L1 from a fresh install unaided.
- Whether they actually *produce* French (Weave, Say It Your Way) or only read.
- Their reaction to a wrong answer: recover calmly vs. flinch, apologize, or quit.
- Whether they move to the next lesson without being prompted.
- The screen named at each stall (always note *where*).

**Do not explain to the tester:**

- How Weave works, what to tap, or what a screen "means."
- That mistakes are fine. Re-explaining destroys the H1 (no confusion) and H3
  (understands without re-explanation) signals.
- Answer only "should I keep going?" with a neutral "do what feels natural."

**Notes to capture:**

- Per stall: the screen + what the tester tried.
- Emotional tone in the tester's own words (calm, stressed, bored, curious).
- Any out-of-scope surface they noticed (a trust break).
- Verbatim answers to the manual recall check (`round1-test-plan.md` §6).

**One core post-session question (verbatim, asked once, no coaching):**

> "Where did you get bored, stuck, or want to stop?"

Record the answer word for word.

## 2. Feedback triage buckets

Sort every observation or comment into exactly one bucket:

- **Bug / technical issue** — crash, broken progression, scope leak, dead end.
  Maps to test-plan **Fail** and severity **P0-P1**.
- **Friction / confusion (UX)** — tapped around, unsure what to do, but the
  content itself was fine. Maps to **Warning**.
- **Hook signal** — voluntary continuation, recall, "I used French." Maps to
  **Good** and the criteria in section 3.
- **Content confusion** — misunderstood a French item, a reveal, or an
  instruction (not the UI). Kept distinct from UX friction.
- **Feature request** — "it should also do X." **Logged, not acted on** in
  Round 1.
- **Praise without behavioral evidence** — "nice!" with no continuation or
  recall. Recorded, but **does not count** toward a hook.

## 3. Hook criteria

The hook is **behavioral, not verbal**. Count these as positive signals:

- Voluntarily continues **L0 to L1** or **L1 to L2** without a push.
- Remembers or **reuses** a French chunk (recall check, or unprompted).
- Can **state the Weave premise** in plain words ("use what I know, swap what I
  don't").
- Does **not** feel punished by mistakes (recovers, does not quit on an error).
- Wants to continue **later** unprompted (24h reopen, or "I'd open the next one").
- Can **say what they learned in plain language**, not grammar jargon (H5).

**Threshold guidance:** Strong = most of these, across testers. Partial = some,
with one recurring blocker. Weak = mostly absent. **Praise alone never satisfies
a criterion.**

## 4. Decision paths

### A. Strong hook

- **Choose when:** all Must-pass hold, multiple section-3 signals across
  testers, only P3-level issues remain.
- **Evidence:** voluntary L1 to L2, recall, "I used French."
- **Smallest next action:** record the Round 1 baseline as validated, then pick
  **one** branch from section 6 (likely compact-L7 planning or AI
  bounded-feedback planning). One small step, not a sprint.

### B. Partial hook with one common blocker

- **Choose when:** Must-pass hold and section-3 signals appear, but the **same**
  friction or confusion recurs across testers.
- **Evidence:** testers hook *after* a specific stall (one Lesson Zero step, one
  Weave screen, one instruction).
- **Smallest next action:** fix **only that one blocker** as a narrow PR, then
  **re-test the same slice**. Do not bundle other changes.

### C. Weak hook

- **Choose when:** section-3 signals are largely absent even though Must-pass
  technically passes (testers finish but do not care, cannot recall, or will not
  continue).
- **Evidence:** multiple Warnings per tester, "felt like a grammar quiz," no
  recall, no desire to continue.
- **What not to do:** do **not** add features, do **not** jump to L7, do **not**
  start a redesign, do **not** rebrand.
- **Investigate first:** is it **framing** (Weave premise not landing),
  **pacing** (too slow or too fast), or **value** (did not feel useful)?
  Re-watch the sessions and isolate the cause before any change. This is the one
  path that may justify a **Weave/framing rethink** (planning only).

### D. Technical bugs dominate

- **Choose when:** P0-P1 issues block the path or recur, regardless of any hook.
- **Smallest fix / re-test loop:** fix the highest-severity bug as a narrow,
  separately reviewed runtime PR, then re-run the `DEV_APK_SMOKE_TEST_CHECKLIST.md`
  gate, then re-test. Repeat until the path is clean **before** judging the hook
  at all — a buggy session cannot measure the hook.

## 5. What not to do after feedback

- Do not jump to **L7+** (blocked until Round 1 results and device smoke).
- Do not implement **feature requests** immediately (log them).
- Do not start **La Palabra** or another language/product.
- Do not **over-polish legal/privacy** (Round 1 is local, no env; privacy work
  is deferred per `docs/STATUS.md`).
- Do not declare **success from praise alone** (behavioral evidence only).
- Do not **ignore observed behavior** in favor of what testers say.
- Do not **plan the next sprint before classifying** all feedback into the
  section-2 buckets.

## 6. Post-smoke action menu

Each branch lists the evidence required, the smallest next task, and what stays
blocked. Selecting a branch here is **not** authorization to implement it — each
still follows the normal review-then-commit flow.

| Branch | Evidence required | Smallest next PR/task | Stays blocked |
|---|---|---|---|
| **Fix Round 1 blockers** | P0-P2 bug/friction reproduced | One narrow runtime PR per blocker (separate, reviewed) | L7; Home `<=6 → <=7`; feature adds |
| **Re-test the same slice** | A fix landed, or an inconclusive session | Operator re-runs `DEV_APK_SMOKE_TEST_CHECKLIST.md` on a device; record build ID + result | New content; scope changes |
| **AI hardening / bounded-feedback planning** | Hook present + AI surfaced as a desired gap | Docs-only plan for server-side caps/guardrails (no AI flip) | `aiEnabled` outside sandbox; live deploy (operator) |
| **Compact L7 implementation** | Strong hook + device smoke passed + explicit closeout decision | The one-PR L7 per `docs/syllabus/L07-compact-doorway.compact-spec.md` (registry + lesson-007 + index), gated | Until smoke passes **and** closeout decision; Home visibility stays separate |
| **Brand/positioning refinement** | Tester language/tone mismatch vs the Cairn vision | Docs-only update to `CAIRN_PRODUCT_DEFINITION_v0.1.md` open questions | Visual redesign; runtime |
| **Weave/framing rethink** | Weak hook traced to the Weave premise not landing | Docs-only framing analysis (the path C output) before any mechanic change | Any Weave runtime change until framing is settled |

---

*End of Round 1 Post-Smoke Decision Framework. Planning/decision framework only —
authorizes no code, content, flag, or runtime change. Round 1 Dev APK L0-L6 scope
and the pending operator device smoke are unchanged by this document. L7 and the
Home visibility bump remain blocked.*
