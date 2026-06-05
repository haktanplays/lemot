# Founder Self-Learning Build — Privacy / KVKK–GDPR Architecture Note + Consent / Data Map (P5.1)

**Date:** 2026-06-05
**`main` HEAD:** `2bd7360`
**Status:** Engineering / privacy-by-design architecture note. **Docs-only.** Defines decisions, data
categories, consent boundaries, retention/export/delete model, and the gates before any remote/tester sync.

> **Not legal advice.** This is an engineering privacy-by-design note. Lawful-basis wording, retention
> periods, and cross-border transfer questions need legal review before any public/tester launch. It
> resolves the P4.7 checkpoint gate: *"a Privacy / KVKK–GDPR Architecture Note + Consent/Data Map is
> required before any Supabase / tester remote DB."*

---

## 1. Executive decision

- **Local-first remains the default** for the Founder Self-Learning Build. All learning data
  (`LearningEvent` log + derived projections) lives only in on-device `kvStorage` under the `lm_le_*`
  namespace. Nothing in the learning-engine leaves the device today.
- **Remote / tester sync is BLOCKED** until this privacy/data map + a consent gate are defined and
  accepted. **No Supabase / tester DB ingestion of learning-engine data before this note is merged.**
- **The existing `lemot-app/supabase/schema.sql` is the Sprint-10 LEGACY path** (`profiles`,
  `user_progress`, `user_errors`), **separate** from the learning-engine. It is **not** wired to the
  `LearningEvent` store and is **not** in scope for the founder learning build. Note: its
  `user_errors.given_answer` already stores raw answer text server-side — a precedent/risk to revisit,
  not a model to copy blindly.
- This note is **not legal advice**; legal review is still expected before public/tester launch.

---

## 2. Current data inventory (local-only today)

All items below are **on-device only** (no remote storage exists for them yet).

| Field (`LearningEvent`) | Personal-data risk | Purpose | Storage | Raw/Derived | Needed locally? | Sync in tester mode? | Retention/export/delete |
|---|---|---|---|---|---|---|---|
| `userAnswer` (`string \| null`) | **HIGH** — free text; may contain anything the learner types | grading + error analysis | `lm_le_events` | raw | Yes (grade input) | Only with explicit consent; consider redaction option | export+delete with events |
| `expectedAnswer` / `normalizedAnswer` | LOW (content-derived; normalized form of answer) | grading echo / diagnostics | `lm_le_events` | raw/derived | Yes | With consent | with events |
| `result` / `errorTags` (`ErrorTagCode`) | MEDIUM — reveals mistakes/weak areas (learning profile) | mastery + feedback | `lm_le_events` | derived | Yes | With consent | with events |
| `itemIds` / `lessonId` / `exerciseId` / `operation` / `promptLevel` / `attemptNumber` | LOW (content references) | mastery + analytics | `lm_le_events` | raw | Yes | With consent | with events |
| `sessionId` | LOW (pseudonymous, per-session, random) | grouping/ordering | `lm_le_events` | pseudonymous id | Yes | With consent | with events |
| `clientEventId` | LOW (pseudonymous, idempotency key) | dedup / offline replay | `lm_le_events` | pseudonymous id | Yes | With consent (idempotency) | with events |
| `timestamp` | LOW–MEDIUM (behavioral timing) | ordering / spacing | `lm_le_events` | raw | Yes | With consent | with events |
| `contentVersion` / `appBuild` | LOW (provenance) | debugging / migration | `lm_le_events` | raw | Yes | With consent | with events |
| `deviceInfo` (`platform`, `osVersion?`, `expoRuntime?`) | **MEDIUM** — device metadata; minimize | debugging | `lm_le_events` | raw | Optional (not strictly needed for learning) | Optional / minimize; **open question** | with events |
| `sync` (`status`/`origin`/`queuedAt`) | LOW (local bookkeeping) | future remote drain | `lm_le_events` | derived | Yes | server sets its own state | with events |
| **`MasterySnapshot`** projection | MEDIUM (aggregate learning profile) | mastery state | `lm_le_snapshot` (currently **not persisted** by controller; recomputed from events) | **derived** (recomputable) | Yes | Derive server-side from events; do not treat as primary | regenerated; deleting events invalidates it |
| **Mon Lexique** projection | MEDIUM | learner word view | in-memory (from snapshot) | derived | Yes | n/a (derive) | regenerated |
| **Practice Pool** projection | MEDIUM | practice suggestions | in-memory (from snapshot) | derived | Yes | n/a (derive) | regenerated |
| Storage keys `lm_le_events`, `lm_le_snapshot` | n/a | local persistence | `kvStorage` | container | Yes | n/a | local reset clears |
| Live-v7 keys `lm7` / `lm7_srs` (legacy app) | separate | legacy app progress | `kvStorage` | separate | **must remain separate** | out of scope here | governed by legacy app |

**Source of truth:** the append-only `LearningEvent` log. Every projection (mastery / Mon Lexique /
Practice Pool) is recomputable from it; none is primary state.

---

## 3. Data classification

| Class | Examples | Sensitivity |
|---|---|---|
| **Raw learner answer text** | `userAnswer` | **Highest** — free text; may incidentally contain personal/sensitive content |
| **Pseudonymous IDs** | `sessionId`, `clientEventId`, future `testerId` | Low alone; identifying only if joined to identity |
| **Device / app metadata** | `deviceInfo`, `appBuild`, `contentVersion` | Medium — fingerprinting risk; minimize |
| **Learning progress / mastery** | `result`, counters, `MasterySnapshot`, mastery status | Medium — behavioral/learning profile |
| **Weak / error / precision signals** | `errorTags`, `weakTags`, `precisionTags`/`precisionCount` | Medium — reveals struggle profile |
| **Derived projections** | Mon Lexique, Practice Pool, snapshot | Medium (aggregate of the above) |
| **Future account / email identity** | email, display name (if added) | **High** — direct identifier; keep in a separate identity layer |
| **Future admin / cohort analytics** | per-learner history, aggregates | High if per-learner; prefer aggregated/read-only |

---

## 4. Purpose limitation / data minimization

- Collect **only what is necessary** for learning analysis + feedback (grade input, outcome, item refs, timing).
- **Raw answers are high-value but sensitive** — disclose their storage clearly in consent; offer a future
  redaction/opt-out option (open question §13).
- **Derived snapshots must remain recomputable from events** — do not treat any projection as primary;
  this keeps deletion clean (delete events ⇒ projections vanish).
- **Avoid name/email** unless genuinely needed for tester-cohort management; if collected, keep it in a
  **separate identity/contact layer**, never inside event rows.
- **No analytics SDK / third-party tracking** in founder self-learning scope unless explicitly reviewed.
- **No selling data, no ad targeting, ever.**
- **`deviceInfo` minimization:** it is not strictly required for learning; treat it as optional/trimmed
  (open question §13).

---

## 5. Consent model

Three modes, each with its own disclosure/consent boundary:

1. **Founder-local mode (current).** No remote sync. A **local-only disclosure** ("your answers and
   progress are stored on this device only") is sufficient; no remote consent needed.
2. **Tester-cohort mode (future).** **Explicit consent required before any remote sync.** Store
   `consent_version` + `consent_at` locally and server-side; no remote event is accepted without them.
3. **Account / sync mode (later).** Separate consent + terms flow (identity, cross-device sync).

**Consent text must disclose** (plain language):
- typed answers **may be stored**;
- learning events may include **mistakes, weak areas, progress, timing, and device/app metadata**;
- data is used for **learning analysis, debugging, and product improvement** (not ads, not selling);
- **remote sync happens only after consent**;
- the user can **request export and delete** in tester mode;
- the **consent version + timestamp** are recorded.

---

## 6. Pseudonymous tester identity

- Use a **random `testerId`** (pseudonymous, client-generated UUID) as the join key for remote data.
- **Email is optional and separable** — only for cohort comms; collected in a **separate identity/contact
  table**, never embedded in event rows.
- **Do not store real name by default.**
- **Never put email/identity directly into `learning_events` rows** — events carry only `testerId`.
- A learner's identity↔testerId link lives in one minimal, access-controlled place so it can be severed
  (anonymization) without touching the event log.

---

## 7. Retention, export, delete

- **Local export (founder/tester):** export the `lm_le_events` array (+ optionally the recomputed
  snapshot) as JSON — the learner's full record, since events are the source of truth.
- **Local delete/reset:** clear `lm_le_*` keys → all projections vanish (they're derived). Must not touch
  legacy `lm7`/`lm7_srs`.
- **Tester remote export:** server returns the learner's events + derived snapshot for their `testerId`/`auth.uid`.
- **Tester remote delete:** prefer **hard delete or anonymize** of event rows by `testerId`; sever the
  identity↔testerId link.
- **`deleted_at` (soft) vs purge (hard):** a soft `deleted_at` may bridge UX, but a **scheduled purge
  job** must hard-delete within a defined window (period = open question §13). Document which tables are
  soft vs hard.
- **Derived snapshots on raw-event deletion:** since snapshots are recomputable, deleting raw events must
  **invalidate/regenerate** (effectively remove) any cached snapshot — never let a snapshot outlive its
  events.
- **Backups / logs:** retention of backups and server logs must be bounded and decided **before
  production** (they can otherwise resurrect "deleted" data).

---

## 8. Remote DB / Supabase future gate (design only — DO NOT IMPLEMENT NOW)

Required pieces before any learning-engine remote ingestion:

- **RLS on every learner/tester table** (the legacy schema's `auth.uid()` pattern is the reference).
- **Insert/read scoped by `testerId` or `auth.uid()`** — a learner can only see/write their own rows.
- **`service_role` NEVER in the client.**
- **Server gate for ingestion** (Edge Function or RLS-guarded insert) that **requires `consent_at` +
  `consent_version`** before accepting remote events.
- **Idempotency by `clientEventId`** (unique constraint / upsert-on-conflict) — matches the local dedup.
- **Admin read role separated** from the learner client (no shared key; admin is a distinct, audited role).
- **Cohort analytics read-only and aggregated** where possible (avoid per-learner raw browsing).
- A new **`learning_events`-style table is a separate, reviewed design** — do **not** reuse/extend the
  legacy `user_errors` table (it already stores raw answers without consent versioning).

---

## 9. Data map table

| Data item | Source | Raw/Derived | Purpose | Local storage | Remote (future)? | Consent needed? | Export? | Delete? | Notes / risk |
|---|---|---|---|---|---|---|---|---|---|
| userAnswer | learner typing | raw | grading/error analysis | `lm_le_events` | only w/ consent (consider redact) | **Yes** | Yes | Yes | free text → may contain personal data |
| expectedAnswer/normalizedAnswer | content/grade | raw/derived | grading echo | `lm_le_events` | w/ consent | Yes | Yes | Yes | low risk |
| result/errorTags | grade() | derived | mastery/feedback | `lm_le_events` | w/ consent | Yes | Yes | Yes | learning/struggle profile |
| itemIds/lessonId/exerciseId/operation | fixture | raw | mastery/analytics | `lm_le_events` | w/ consent | Yes | Yes | Yes | content refs |
| promptLevel/attemptNumber | controller | raw | analytics | `lm_le_events` | w/ consent | Yes | Yes | Yes | low |
| sessionId/clientEventId | controller | pseudonymous | grouping/idempotency | `lm_le_events` | w/ consent | Yes | Yes | Yes | pseudonymous |
| timestamp | controller clock | raw | ordering/spacing | `lm_le_events` | w/ consent | Yes | Yes | Yes | behavioral timing |
| deviceInfo | runtime | raw | debugging | `lm_le_events` | minimize/optional | Yes | Yes | Yes | fingerprinting risk |
| MasterySnapshot | scoreEvents() | derived | mastery state | recomputed (not persisted) | derive server-side | n/a (follows events) | via events | via events | never outlive events |
| Mon Lexique / Practice Pool | selectors | derived | learner views | in-memory | n/a | n/a | via events | via events | aggregate of above |
| testerId (future) | client | pseudonymous | remote join key | local + remote | **Yes** | Yes | Yes | Yes | keep separate from identity |
| email/name (future, optional) | learner | raw identifier | cohort comms | separate identity layer | separate consent | **Yes** | Yes | Yes | never in event rows |

---

## 10. Threat / misuse notes

- **Raw answer text may incidentally contain personal/sensitive content** (a learner can type anything).
- **Weak/error/precision data reveals a learning profile** — sensitive in aggregate.
- **Admin dashboard can overexpose** an individual learner's full history → needs role/access + aggregation.
- **Local device loss** → on-device data is exposed if the device is unlocked (no app-level encryption today).
- **Remote misconfiguration / RLS gap** → cross-learner data leak (the classic Supabase risk).
- **Overcollection** (e.g. unnecessary `deviceInfo`) widens the blast radius.
- **Debug log leak** → never log raw `userAnswer` / event JSON to console or remote logs (the torture
  test confirmed no learner-UI leak; the same rule must hold for any future server logging).

---

## 11. Engineering rules before remote/tester sync (HARD)

- **No remote event ingestion before a consent gate** (`consent_at` + `consent_version` required).
- **No Supabase schema for learning data without an RLS plan.**
- **No admin dashboard before a role/access model.**
- **No client-side `service_role`.**
- **No raw debug JSON in learner UI** (and no raw `userAnswer` in any server/debug log).
- **No third-party analytics** without separate review.
- **No AI-feedback history remote storage** without an explicit policy update (separate consent surface).
- **Events remain the source of truth; projections stay recomputable** (so deletion is clean).
- **Legacy `lm7`/`lm7_srs` and the Sprint-10 schema stay separate** from the learning-engine store.

---

## 12. Future PR breakdown (provisional ordering)

| PR | Scope |
|---|---|
| **P5.1** | This privacy architecture note + consent/data map (docs) |
| **P5.2** | Local privacy/data **disclosure** (founder-local) — calm local-only notice, no remote |
| **P5.3** | Local **export / delete** primitives over `lm_le_events` (JSON export, reset) — local-only |
| **P5.4** | **Consent model types + consent state** (versioned, timestamped) — types/local state, no remote |
| **P5.5** | **Remote schema / RLS design draft** (docs/SQL draft, not deployed) — `learning_events` + consent columns |
| **P5.6** | **Ingest-events with consent enforcement** (server gate; idempotency by `clientEventId`) — Operator deploy |
| **P5.7** | **Tester / admin read model** (RLS-scoped reads; aggregated cohort analytics) — Operator deploy |

Ordering is **provisional**; P5.5–P5.7 are Operator/Supabase-deploy work and remain blocked until the
local-side gates (P5.2–P5.4) and legal review land.

---

## 13. Open questions (defer to product/legal)

- Exact **lawful basis / explicit-consent wording** (KVKK *açık rıza* / GDPR consent) — legal review.
- **Retention period** for tester data (and backup/log retention bounds).
- Whether **`userAnswer` should be optional / redactable** (store hash or omit on opt-out?).
- Whether **founder-build exports are manual-only** (no auto-sync) — recommended yes for now.
- Whether **`deviceInfo` is necessary** at all, or should be trimmed/removed.
- Whether **AI-feedback history** is stored later (and under what separate policy).
- Whether **cross-border transfer** (Türkiye ⇄ Supabase region) needs counsel before public beta.

---

## 14. Gates before remote / tester sync

Remote/tester sync may **not** begin until **all** hold:
1. **This note is merged.**
2. **Consent model is defined** (versions + required `consent_at`/`consent_version`).
3. **Data map is accepted.**
4. **Deletion/export route is at least designed** (local + remote).
5. **Supabase / RLS plan exists** (P5.5 draft).
6. **Founder smoke is completed or accepted pending** (operator).

(Legal review of consent wording / retention / cross-border remains an additional gate before any
public/tester launch, even after the above engineering gates are met.)

---

## Operator blockers (cloud)

- None for this note (docs-only). The remote pieces (P5.5–P5.7) carry the first hard Operator/Supabase
  blockers and stay gated by §14.

## Sync Queue entries created

- None. A `docs/CLOUD_SYNC_QUEUE.md` row marking this privacy decision LOCKED would be added only after
  review, if requested — not by this note.
