# Device Day Runbook (Taş 0 + K2 batch landing)

> Operator-side. Written 2026-07-05 for the dated device session. Sprint
> guardrail restated: **the evening hardening package (YASA 3 + canon
> validators) is NOT a precondition of this day** — if it is half-done, the
> device test still happens.

## 0. Preconditions (5 min, on the dev machine)

```bash
git checkout main && git pull
cd lemot-app
npm run typecheck && npm run validate:content && npm run test:learning-engine
```
All green before anything else. Note the main hash in the session log.

## 1. Taş 0 — second smoke (existing build first)

Play the CURRENT build (L7-L15 registered but Home caps at L6; the boredom
question is answered on the lesson experience itself).

Gate question (roadmap Taş 0): **"Sıkıcılık gitti mi?"**
Watch for: lesson pacing, formula chip wrap on small viewport (see the
Round 1 expanded test matrix operator list), TTS quality on the rescue pair.

Telemetry funnel (first numbers): export the telemetry log from the device
(Settings export / dev export path), save as JSON, then:

```bash
npm run telemetry:report -- <exported-file.json>
```
Record: lesson_started → lesson_completed per lesson; per-screen seen
counts (drop-off screens); weave attempt counts.

## 2. K2 batch landing order (single session, fixed order)

The order is canon (STATUS.md operator decisions): **#174 → #180 → seen-layer.**
Rationale: the natural-reveal's position is FIXED by canon (right after
production); the seen layer is flexible and arranges itself around it.

1. **PR #174** — Haktan screen review verdict on device (L1-L6), then
   operator smoke items 1-4 (matrix doc), then squash-merge #174.
2. **PR #180 (natural-reveal, [awaiting device pass])** — update branch onto
   the new main, re-run triple validation, then ON DEVICE: does the reveal
   land right after the final production; does it read as elevation, not a
   quiz result; does the renderer's first live natural-reveal render
   correctly? Pass → remove the tag, squash-merge.
3. **seen-layer branch** — update onto main, open its PR, device look
   (cards read as calm exposure, not phrasebook), merge.
4. **Screen-count contracts** — update `round1ContentContracts.test.ts`
   expected counts ONCE, against the final layout, in the same PR as the
   last landing (or a follow-up test PR).

If any step fails on device: stop the chain there, file the finding, leave
the rest tagged. Partial landing is acceptable; wrong-order landing is not.

## 3. Session close

- Record: main hash, merged PRs, device model, funnel numbers, verdicts.
- Update STATUS.md (or dictate to the cloud session) with the Taş 0 gate
  answer — Taş 1 content is shaped by it.
