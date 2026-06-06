# Founder Self-Learning Build — Remote Schema / RLS Draft (P5.5)

**Date:** 2026-06-06
**`main` HEAD:** `a7b9597`
**Status:** **Design / docs only.** A future-facing schema + RLS + ingestion design for tester remote
sync. **Nothing here is deployed, applied, or wired to the app.** No migration file is created and
`lemot-app/supabase/schema.sql` is **not** edited.

> **Not legal advice.** Engineering privacy-by-design draft. Lawful-basis wording, retention periods, and
> cross-border transfer remain legal questions (see §12). This resolves the P5.1 gate item
> *"P5.5 — Remote schema / RLS design draft (docs/SQL draft, not deployed)"* and the P5 checkpoint's
> recommended Option B. It builds directly on:
> - [`founder-self-learning-privacy-kvkk-gdpr-architecture-note.md`](./founder-self-learning-privacy-kvkk-gdpr-architecture-note.md) (P5.1)
> - [`founder-self-learning-p5-local-privacy-data-rights-checkpoint.md`](./founder-self-learning-p5-local-privacy-data-rights-checkpoint.md) (P5 checkpoint)
> - `content/learning-engine/events.ts` (`LearningEvent` shape), `privacy.ts` (consent model),
>   `privacy-data.ts` (export/delete), `repository/types.ts` (`LearningRepository` interface).

---

## 1. Executive decision

- **Remote / tester sync remains DISABLED.** This is a design draft, not a deployable migration. Nothing
  is applied to any database.
- **The existing `lemot-app/supabase/schema.sql` is the Sprint-10 LEGACY path** (`profiles`,
  `user_progress`, `user_errors`) and stays **separate** from the learning-engine. It is not reused here.
- **Future learning-engine remote storage uses NEW tables** (a `learning_events`-style table + consent +
  identity tables), **not** the legacy `user_errors` path (which already stores raw answers without
  consent versioning — a risk, not a model to copy).
- **No client-side `service_role`** — ever.
- **No ingestion without `consent_version` and `consent_at`.** A version-matched, timestamped tester
  consent must exist server-side before any event row is accepted.
- **Events stay the source of truth; projections (mastery / Mon Lexique / Practice Pool) remain
  recomputable** — so the remote store does not need to persist `MasterySnapshot` initially, and deletion
  stays clean.

---

## 2. Data model overview (design-only)

All tables live in a **new namespace** (proposed `le_*` / `learning_*`), distinct from legacy `public`
Sprint-10 tables. PII level uses the P5.1 classification.

| Table | Purpose | Key columns | PII level | Retention / delete | RLS stance |
|---|---|---|---|---|---|
| `tester_profiles` | Pseudonymous tester identity + optional severable contact link | `tester_id` (PK, UUID), `auth_user_id` (nullable FK → `auth.users`), `created_at`, `anonymized_at` | **High** (links to identity if `auth_user_id`/email set) | Sever `auth_user_id` to anonymize; hard-purge on account delete | Owner-only by `auth.uid() = auth_user_id`; admin via audited role |
| `tester_contacts` *(optional, separate)* | Email/name for cohort comms — **kept out of event rows** | `tester_id` (FK), `email`, `display_name`, `consent_to_contact` | **High** (direct identifier) | Delete on request; severable without touching events | Owner-only; admin audited; never joined into analytics by default |
| `tester_consents` | Versioned, timestamped consent records (the gate) | `id`, `tester_id` (FK), `consent_mode` (`tester_cohort`/`account_sync`), `consent_version`, `consented_at`, `revoked_at` | Medium (reveals participation) | Keep consent record for audit even after revoke; revoke sets `revoked_at` | Owner-only insert/select; server validates on ingest |
| `learning_events` | Append-only remote mirror of the local `LearningEvent` log | see §4 | **High** (contains raw `user_answer`) | Hard delete / anonymize by `tester_id`; bounded backups | Owner-only by `tester_id`; insert gated by consent; admin via view only |
| `learning_event_ingest_errors` *(optional)* | Server-side record of rejected/failed ingests (no raw answer) | `id`, `tester_id?`, `client_event_id?`, `reason`, `received_at` | Low–Medium (no raw answer stored) | Short retention; purge regularly | Admin/service only; never client-readable |
| `tester_cohorts` *(optional)* | Cohort definitions | `cohort_id`, `name`, `created_at` | Low | Manual | Admin only |
| `cohort_memberships` *(optional)* | Tester↔cohort join | `cohort_id`, `tester_id`, `added_at` | Medium | Delete with tester | Admin only; tester may see own membership |
| `admin_audit_log` *(optional, recommended)* | Records every admin/cohort read of learner data | `id`, `actor`, `action`, `target_tester_id`, `at` | Medium | Long retention (audit) | Service/admin write; restricted read |

**Principle:** identity (`tester_contacts`) is **physically separate** from behavior (`learning_events`);
they join only through the pseudonymous `tester_id`, and that link is severable.

---

## 3. Pseudonymous identity model

- **`tester_id` (random UUID, client-generated)** is the primary learner/testing join key for all remote
  learning data. It is pseudonymous — meaningless without the identity link.
- **`auth.uid()` MAY link to `tester_id` later** (via `tester_profiles.auth_user_id`) when an account
  model lands; until then `tester_id` can exist without an auth user.
- **Email / name are optional and live only in `tester_contacts`**, never in `learning_events`.
- **No email / name in `learning_events`** — events carry only `tester_id`.
- **The identity↔`tester_id` link is severable**: anonymization = null out `auth_user_id` + delete
  `tester_contacts` row, leaving event rows pseudonymous or scheduled for purge, without rewriting the
  event log.

---

## 4. `learning_events` table draft (field mapping)

Maps the local `LearningEvent` (`content/learning-engine/events.ts`) to remote columns. Snake_case
columns; the local camelCase field is shown for traceability.

| Remote column | Local `LearningEvent` field | Type (proposed) | Notes / PII |
|---|---|---|---|
| `client_event_id` | `clientEventId` | `text` | Idempotency key; part of unique constraint |
| `tester_id` | *(added at ingest)* | `uuid` | Pseudonymous owner; FK → `tester_profiles` |
| `session_id` | `sessionId` | `text` | Pseudonymous |
| `lesson_id` | `lessonId` | `text` | Content ref |
| `exercise_id` | `exerciseId` | `text` | Content ref |
| `operation` | `operation` | `text` (enum-checked) | `recognition`/`fill`/`build`/`register_switch`/`context_chain` |
| `item_ids` | `itemIds` | `text[]` (or `jsonb`) | Content refs; array |
| `prompt_level` | `promptLevel` | `text` | `PF0..PF3` |
| `attempt_number` | `attemptNumber` | `int` | |
| `user_answer` | `userAnswer` | `text` (nullable) | **PII risk: HIGH** — free text; redaction/opt-out is an open question (§12) |
| `expected_answer` | `expectedAnswer` | `text` (nullable) | Low |
| `normalized_answer` | `normalizedAnswer` | `text` (nullable) | Low–medium |
| `result` | `result` | `text` (enum-checked) | `ErrorTagCode`; learning/struggle signal |
| `error_tags` | `errorTags` | `text[]` (or `jsonb`) | Array of `ErrorTagCode` |
| `client_event_at` | `timestamp` | `timestamptz` | Client clock; behavioral timing |
| `content_version` | `contentVersion` | `text` | Provenance |
| `app_build` | `appBuild` | `text` | Provenance |
| `device_info` | `deviceInfo` | `jsonb` (nullable) | **Medium** — minimize/optional (§12) |
| `sync_origin` *(optional)* | `sync.origin` | `text` | Server may set its own; local value informational |
| `consent_version` | *(from consent gate)* | `text` (**NOT NULL**) | Required — set/validated server-side at ingest |
| `consent_at` | *(from consent gate)* | `timestamptz` (**NOT NULL**) | Required — proves consent predated ingest |
| `inserted_at` | *(server)* | `timestamptz default now()` | Server receive time |

Design notes:
- **Unique constraint `(tester_id, client_event_id)`** → idempotent ingestion (matches the local dedup in
  `LocalRepository.appendEvent`). Re-sending a synced event is a no-op / upsert-on-conflict-do-nothing.
- **JSONB vs typed columns:** prefer **typed scalar columns** for queryable fields (`result`,
  `lesson_id`, timestamps) for index-ability and constraint checks; use **arrays/`jsonb`** only for
  naturally-variable shapes (`item_ids`, `error_tags`, `device_info`). Avoid dumping the whole event as
  one opaque `jsonb` blob — it defeats RLS-friendly querying and minimization.
- **`user_answer` risk is HIGH** — it is the one column most likely to contain incidental personal data;
  it is the prime candidate for an optional redaction/hash mode (§12).
- **No derived `MasterySnapshot` stored initially** — it is recomputable server-side from events via
  `scoreEvents`, so storing it is optional/deferred and must never outlive its events.

---

## 5. Consent gate (hard rules)

- **Remote ingestion MUST reject events without an accepted tester consent.** No consent row → reject.
- **`consent_version` and `consent_at` are required** on every accepted event (NOT NULL).
- **Consent must be stored (in `tester_consents`) BEFORE event ingestion** — the gate validates that an
  active, version-matched consent exists for the `tester_id` at ingest time.
- **Version match:** the event's `consent_version` must equal the **current** tester consent version
  (mirrors `canSyncTesterEvents` in `privacy.ts`, which requires `consented && version === CURRENT_TESTER_CONSENT_VERSION`).
  A stale version after a wording bump fails the gate → re-consent required.
- **Revocation blocks future ingestion:** once `tester_consents.revoked_at` is set, no further events are
  accepted for that `tester_id`.
- **Existing data after revocation** follows the retention/delete policy (§8) — revocation is not
  automatic deletion; deletion is a separate, explicit action with its own bounded window.
- **Local disclosure is NOT remote consent.** The founder-local disclosure (`local-disclosure-v1`,
  recorded by `markLocalDisclosureSeen`) only acknowledges on-device storage; remote sync needs the
  separate `tester-consent-v1` grant.

---

## 6. RLS draft (prose + sketch in §11)

- **Tester can INSERT only their own events** — `with check (tester_id = <caller's tester_id>)`, and only
  when an active consent exists (enforced by the server gate; RLS is defense-in-depth).
- **Tester can SELECT only their own events** — `using (tester_id = <caller's tester_id>)`.
- **Tester CANNOT select another tester's events** — no policy grants cross-tester read.
- **Admin / cohort role reads only through a controlled role / view** — never the learner client key; a
  distinct, audited role, ideally via an aggregating view (§9), not raw table browse.
- **`service_role` is server-side only** — never shipped in the client bundle.
- **No broad `anon` access** — `anon` has no select/insert on learning tables.
- **Delete / export access scoped by `tester_id` / `auth.uid()`** — a learner can export/delete only their
  own rows.
- **Admin audit recommended** — every admin read of an individual learner is logged to `admin_audit_log`.

Identity binding caveat: with direct-client inserts, `tester_id` must be **bound to the authenticated
principal** (e.g. via a `tester_profiles` row keyed on `auth.uid()`), otherwise a client could spoof
another `tester_id`. This is a strong reason to prefer the server-gate ingestion model (§7).

---

## 7. Ingestion architecture (A vs B)

**Option A — direct Supabase client insert with RLS.**
- Pros: simplest; no server code; offline queue drains straight to the table.
- Cons: consent-version + idempotency + `tester_id` binding must all be expressed in RLS/constraints;
  harder to enforce "consent predates ingest" and uniform validation; client trusts more of the contract.

**Option B — Edge Function / server ingest gate.**
- Pros: one place to enforce **consent presence + version match**, **idempotency by `client_event_id`**,
  `tester_id`↔principal binding, payload validation (zod), and optional `user_answer` redaction; the
  client never holds `service_role`; RLS still applies as defense-in-depth.
- Cons: more moving parts (a function to write, deploy, and monitor — Operator work).

**Recommendation for founder/tester stage: Option B (Edge Function / server gate).** It gives stricter
consent/version/idempotency enforcement and keeps `service_role` server-side, with RLS as a second layer.
(Final choice remains an open question, §12.)

---

## 8. Export / delete remote behavior (design)

- **Export:** return all of a tester's data by `tester_id` (their `learning_events`; the `MasterySnapshot`
  recomputed via `scoreEvents`, not stored) — mirrors the local `exportLocalLearningData` contract.
- **Delete / anonymize:** by `tester_id` — prefer **hard delete or anonymize** of event rows and **sever
  the identity↔`tester_id` link** (`tester_profiles.auth_user_id = null`, drop `tester_contacts`).
- **Snapshots / projections:** recomputed, never primary — deleting events **invalidates/regenerates**
  any cached projection; a snapshot must never outlive its events.
- **`deleted_at` (soft) vs hard purge:** a soft `deleted_at` may bridge UX, but a **scheduled purge job**
  must hard-delete within a defined window (period = open question §12). Document per-table which is soft
  vs hard.
- **Backups / logs:** backup and server-log retention must be **bounded and decided before production** —
  otherwise "deleted" data can be resurrected. Open legal question (§12).

---

## 9. Admin / cohort analytics (rules)

- **Aggregated first** — default dashboards show cohort aggregates, not per-learner raw browsing.
- **Individual read is limited** and role-gated (not the default view).
- **No raw `user_answer` in the default dashboard.**
- **No `weak_tags` / `error_tags` exposed casually** — struggle profiles are sensitive in aggregate.
- **Role-based access** — admin is a distinct, audited role, separate from the learner client key.
- **Audit log for admin access** to individual data (`admin_audit_log`).
- **No public analytics SDK / third-party tracking** in scope.
- Prefer exposing analytics through **read-only aggregating views**, not direct table grants.

---

## 10. Security risks

- **RLS misconfiguration** → cross-tester data leak (the classic Supabase failure mode). Mitigate: deny
  by default, test policies, keep insert/select scoped to `tester_id`/`auth.uid()`.
- **`service_role` leakage** → full bypass. Mitigate: server-side only; never in client/EAS client env.
- **Raw `user_answer` PII** → free text may contain personal/sensitive content. Mitigate: redaction/opt-out
  option (§12); never log it.
- **Cross-border transfer** (Türkiye ⇄ Supabase region) → legal exposure (§12).
- **Over-retention** → keeping data (or backups) too long. Mitigate: bounded retention + purge job.
- **Admin overexposure** → one role seeing every learner's full history. Mitigate: aggregation + audit + role split.
- **Debug log leaks** → never log raw `user_answer` / event JSON server-side (the torture test confirmed
  no learner-UI leak; the same rule must hold for servers).
- **Duplicate ingestion / idempotency failure** → inflated event log distorts mastery. Mitigate: unique
  `(tester_id, client_event_id)` + upsert-on-conflict-do-nothing.
- **Consent drift** → events accepted under a stale/absent consent version. Mitigate: NOT NULL
  `consent_version`/`consent_at` + version match at the gate.

---

## 11. SQL sketch — DESIGN DRAFT ONLY, DO NOT APPLY

```sql
-- =====================================================================
-- DESIGN DRAFT ONLY — DO NOT APPLY — DO NOT CREATE A MIGRATION FROM THIS.
-- Not deployed. Not wired to the app. Illustrative shapes for review only.
-- Separate from the Sprint-10 legacy schema (profiles/user_progress/user_errors).
-- =====================================================================

-- DESIGN DRAFT ONLY — pseudonymous tester identity
-- create table le_tester_profiles (
--   tester_id    uuid primary key default gen_random_uuid(),
--   auth_user_id uuid references auth.users on delete set null, -- severable link
--   created_at   timestamptz not null default now(),
--   anonymized_at timestamptz
-- );

-- DESIGN DRAFT ONLY — versioned consent (the ingest gate)
-- create table le_tester_consents (
--   id              uuid primary key default gen_random_uuid(),
--   tester_id       uuid not null references le_tester_profiles(tester_id) on delete cascade,
--   consent_mode    text not null check (consent_mode in ('tester_cohort','account_sync')),
--   consent_version text not null,
--   consented_at    timestamptz not null,
--   revoked_at      timestamptz
-- );

-- DESIGN DRAFT ONLY — append-only remote event mirror
-- create table le_learning_events (
--   id                uuid primary key default gen_random_uuid(),
--   tester_id         uuid not null references le_tester_profiles(tester_id) on delete cascade,
--   client_event_id   text not null,
--   session_id        text not null,
--   lesson_id         text not null,
--   exercise_id       text not null,
--   operation         text not null,           -- recognition/fill/build/register_switch/context_chain
--   item_ids          text[] not null default '{}',
--   prompt_level      text not null,           -- PF0..PF3
--   attempt_number    int  not null,
--   user_answer       text,                    -- PII: HIGH (redaction is an open question)
--   expected_answer   text,
--   normalized_answer text,
--   result            text not null,           -- ErrorTagCode
--   error_tags        text[] not null default '{}',
--   client_event_at   timestamptz not null,    -- LearningEvent.timestamp
--   content_version   text not null,
--   app_build         text not null,
--   device_info       jsonb,                   -- minimize/optional
--   consent_version   text not null,           -- consent gate (required)
--   consent_at        timestamptz not null,    -- consent gate (required)
--   inserted_at       timestamptz not null default now(),
--   unique (tester_id, client_event_id)        -- idempotency
-- );

-- DESIGN DRAFT ONLY — RLS sketch (deny-by-default; owner-scoped)
-- alter table le_learning_events enable row level security;
--
-- -- tester reads only their own rows (tester_id bound to auth principal via le_tester_profiles)
-- create policy le_events_select_own on le_learning_events for select
--   using (tester_id in (select tester_id from le_tester_profiles where auth_user_id = auth.uid()));
--
-- -- tester inserts only their own rows AND only with an active, current-version consent
-- create policy le_events_insert_own on le_learning_events for insert
--   with check (
--     tester_id in (select tester_id from le_tester_profiles where auth_user_id = auth.uid())
--     and exists (
--       select 1 from le_tester_consents c
--       where c.tester_id = le_learning_events.tester_id
--         and c.consent_mode = 'tester_cohort'
--         and c.revoked_at is null
--         and c.consent_version = le_learning_events.consent_version
--     )
--   );
--
-- -- no anon access; no cross-tester select; admin reads go through an audited role/view, not this table.
-- -- service_role is server-side only and bypasses RLS by design — never ship it in the client.
-- =====================================================================
-- END DESIGN DRAFT — DO NOT APPLY
-- =====================================================================
```

---

## 12. Open questions (defer to product / legal)

- **Legal retention period** for tester data (and bounds on backups / server logs).
- **Exact consent wording** (KVKK *açık rıza* / GDPR explicit consent) and lawful basis.
- Whether **`user_answer` can be redacted / optional** (store hash, or omit on opt-out).
- Whether **`device_info` is necessary** at all, or should be trimmed/removed.
- **Cross-border transfer** (Türkiye ⇄ Supabase region) — needs counsel.
- Whether **admin sees raw answers** at all, or only aggregates.
- Whether **derived snapshots are stored remotely** later (vs always recomputed).
- **Auth model choice** — anonymous `tester_id` only vs `auth.uid()`-linked accounts.
- **Edge Function vs direct insert** — final ingestion choice (draft recommends Edge Function, §7).

---

## 13. Gates before implementation

Remote implementation (P5.6 ingest, P5.7 read model) may **not** begin until **all** hold:

1. **Founder smoke accepted, or accepted-pending consciously approved** (operator).
2. **This draft merged.**
3. **Legal review done, or explicitly deferred for internal non-public testing.**
4. **Consent wording accepted.**
5. **Retention / delete policy accepted.**
6. **RLS policies reviewed.**
7. **No client-side `service_role`.**
8. **CI remains green** (`validate:content` + `typecheck` + `test:learning-engine`).

All of P5.6/P5.7 carry hard **Operator/Supabase-deploy blockers** (apply schema, deploy Edge Function,
set secrets) and stay gated by the above — cloud may draft, Operator deploys.

---

## Operator blockers (cloud)

- None for this draft (docs-only). The first hard Operator/Supabase blockers appear at P5.6 (apply schema
  + deploy ingest gate) and remain gated by §13.

## Sync Queue entries created

- None. A `docs/CLOUD_SYNC_QUEUE.md` row marking this design decision would be added only after review, if
  requested — not by this draft.
