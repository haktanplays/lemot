/**
 * PR-I1 — SQL security + client wiring + UI copy guards (audit C1).
 *
 * DB behavior (RLS/isolation, generation gate, trigger locking, op-log
 * idempotency, old-client conflict-update rejection, anonymous rejection) is
 * OPERATOR-verified — Postgres can't run here — so these source-scans pin the DDL
 * shape and the client wiring that make those guarantees hold, plus the UI
 * contract. Behavioral proofs live in the other PR-I1 tests. An operator DB smoke
 * is required for the real upsert/RLS conflict-update case (see the PR report).
 */
import { describe, test, assert } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ALL_LOCAL_PRIVACY_KEYS } from "../../content/learning-engine/local-privacy-inventory";
import { LM_CLOUD_ERASE_PENDING_KEY } from "../../lib/cloudEraseGuard";
import { LM_SYNC_GENERATION_KEY } from "../../lib/syncGeneration";
import { LM_REMOTE_ERASE_RECOVERY_KEY } from "../../lib/remoteEraseRecovery";

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");

function deleteFnBody(sql: string): string {
  const start = sql.indexOf("create or replace function public.delete_my_synced_learning_data");
  assert(start !== -1, "delete function is defined");
  const rest = sql.slice(start);
  return rest.slice(0, rest.indexOf("$$;") + 3);
}

describe("PR-I1 — server durability model (generation + op log + write RPCs)", () => {
  for (const file of [
    "supabase/schema.sql",
    "supabase/migrations/2026-07-11_pr_i1_delete_synced_learning_data.sql",
  ]) {
    test(`${file}: tables, gen-0 RLS, write RPCs, op-log delete`, () => {
      const sql = read(file);

      // Per-user generation + operation log.
      assert(sql.includes("create table if not exists public.user_sync_state"), "user_sync_state table");
      assert(sql.includes("create table if not exists public.user_sync_delete_operations"), "operation log table");
      assert(/operation_id uuid not null/.test(sql), "op log has operation_id");
      assert(/operation_generation bigint not null/.test(sql), "op log records the generation");
      assert(/primary key \(user_id, operation_id\)/.test(sql), "op log pk (user_id, operation_id)");
      assert(/user_progress add column if not exists generation/.test(sql), "generation column on user_progress");
      assert(/user_errors\s+add column if not exists generation/.test(sql), "generation column on user_errors");

      // Locking trigger (defense-in-depth) + missing-row FAIL CLOSED.
      assert(sql.includes("function public.enforce_sync_generation()"), "generation gate trigger fn");
      assert(/from public\.user_sync_state\s+where user_id = NEW\.user_id\s+for update/.test(sql), "gate takes the row lock");
      assert(
        (sql.match(/raise exception 'missing sync state for user'/g) ?? []).length >= 3,
        "trigger + both write RPCs reject a MISSING sync-state row (never default to 0)",
      );
      assert(!sql.includes("v_current := 0"), "no silent generation-0 fallback anywhere");

      // Generation-0 direct-write RLS (closes the old-client conflict-update hole).
      // The caller helper returns NULL (not 0) for a missing row, so RLS `= 0`
      // fails closed for accounts without a sync-state row.
      assert(sql.includes("public.caller_sync_generation()"), "caller generation helper");
      const callerIdx = sql.indexOf("create or replace function public.caller_sync_generation()");
      const callerBody = sql.slice(callerIdx, sql.indexOf("$$;", callerIdx));
      assert(!callerBody.includes("coalesce"), "caller helper has NO coalesce-to-0 (missing row fails closed)");
      assert((sql.match(/public\.caller_sync_generation\(\) = 0/g) ?? []).length >= 3, "direct insert + update (progress) + insert (errors) all require generation 0");
      assert(/for update\s+using \(auth\.uid\(\) = user_id and public\.caller_sync_generation\(\) = 0\)/.test(sql), "direct UPDATE (conflict path) also gated to generation 0");

      // Generation-aware write RPCs (current clients), exact equality under lock.
      assert(sql.includes("function public.upsert_user_progress(") && sql.includes("function public.insert_user_error("), "write RPCs exist");
      assert((sql.match(/if p_generation <> v_current then/g) ?? []).length >= 2, "write RPCs require exact generation equality");
      assert((sql.match(/from public\.user_sync_state where user_id = v_uid for update/g) ?? []).length >= 2, "write RPCs lock the generation row");
      // Write RPCs are NOT anonymous-forbidden (only the delete RPC is).
      const upsertIdx = sql.indexOf("function public.upsert_user_progress(");
      const upsertBody = sql.slice(upsertIdx, sql.indexOf("$$;", upsertIdx));
      assert(!upsertBody.includes("is_anonymous"), "write RPC does not reject anonymous (anonymous sync preserved)");

      // Delete RPC: anon-forbidden, op-log idempotency, bump-before-delete.
      const fn = deleteFnBody(sql);
      assert(fn.includes("security definer") && fn.includes("set search_path = ''"), "delete RPC hardened");
      assert(/is_anonymous/.test(fn) && /42501/.test(fn), "delete rejects anonymous");
      assert(/from public\.user_sync_delete_operations\s+where user_id = v_uid and operation_id = p_op_id/.test(fn), "delete checks the op log for a prior operation");
      assert(/'generation', coalesce\(v_gen, 0\)/.test(fn), "replay returns the CURRENT generation, not merely the old op's");
      assert(fn.includes("insert into public.user_sync_delete_operations"), "delete records the operation");
      // Bump-before-delete via an atomic create-or-bump: intentionally CREATES /
      // REPAIRS the caller's own missing sync-state row (authenticated, non-anon,
      // same transaction), starting at generation 1.
      const bumpIdx = fn.indexOf("on conflict (user_id) do update");
      const delIdx = fn.indexOf("delete from public.user_progress");
      assert(fn.includes("values (v_uid, 1)"), "a fresh/repaired row starts at generation 1");
      assert(bumpIdx !== -1 && delIdx !== -1 && bumpIdx < delIdx, "generation bumped BEFORE rows are deleted");
      assert(fn.includes("pg_catalog.jsonb_build_object") && !fn.includes("execute ") && !fn.includes("format("), "qualified JSON builder, no dynamic SQL");
      assert(!fn.includes("ai_usage") && !fn.includes("profiles") && !fn.includes("auth.users"), "delete fn scope");

      // Owners + least-privilege grants on every new SECURITY DEFINER function.
      for (const sig of [
        "public.caller_sync_generation()",
        "public.upsert_user_progress(bigint, jsonb, jsonb)",
        "public.insert_user_error(bigint, text, text, text, text, int)",
        "public.delete_my_synced_learning_data(uuid)",
      ]) {
        assert(sql.includes(`alter function ${sig} owner to postgres`), `${sig} owner pinned`);
        assert(sql.includes(`revoke all on function ${sig} from public`), `${sig} revokes PUBLIC`);
        assert(sql.includes(`grant execute on function ${sig} to authenticated`), `${sig} granted to authenticated`);
      }

      assert(!/for delete/i.test(sql), "no row-level DELETE policy (RPC is the sole delete path)");
    });
  }
});

describe("PR-I1 — client wiring", () => {
  test("useProgressSync writes via generation-aware RPCs, fails closed, hands off mismatches", () => {
    const sync = read("hooks/useProgressSync.ts");
    // Codex P1 (round 4): EVERY authenticated RPC — writes and deletion — is
    // PINNED to a caller-verified token; the mutable global rpc client is gone.
    assert(!sync.includes("supabase.rpc("), "no RPC goes through the mutable global client");
    assert((sync.match(/runPinnedCloudWrite\(\{/g) ?? []).length === 2, "progress AND error writes run the verify-then-pin step");
    assert(sync.includes("rpcUpsertUserProgressPinned({"), "progress written via the token-pinned transport");
    assert(sync.includes("rpcInsertUserErrorPinned({"), "errors written via the token-pinned transport");
    // The ready generation must belong to the payload's user, and the stamped
    // generation is captured inside the pinned step (synchronously, pre-await).
    assert((sync.match(/generationUserId: syncGenerationUserId/g) ?? []).length === 2, "both writes enforce the generation OWNER");
    assert((sync.match(/generation: syncGeneration,/g) ?? []).length === 2, "both writes capture the user-bound generation in the pinned step");
    assert((sync.match(/getSession: currentSessionSnapshot/g) ?? []).length === 2, "both writes verify the session via the shared auth abstraction");
    assert(sync.includes("isSyncGenerationReady()") && sync.includes("isRemoteErasePending()"), "writes gated on generation-ready + no recovery");
    // Codex P1: the deletion request is PINNED to the caller-verified token —
    // it must NEVER go through the mutable global client's rpc().
    assert(!sync.includes('.rpc("delete_my_synced_learning_data"'), "deletion never uses the global-session rpc client");
    assert(sync.includes("rpcDeleteSyncedDataPinned(accessToken, opId)"), "deletion goes through the token-pinned transport");
    assert(!/p_op_id:\s*userId/.test(sync), "op id is not the user id");
    // fetchSyncGeneration fails closed (returns null on error).
    assert(sync.includes("if (error) return null; // fail closed"), "generation fetch fails closed on error");
    assert(
      sync.includes("if (!data) return null; // missing row → fail closed"),
      "a MISSING sync-state row is null (anomaly), never baseline 0",
    );
    assert(
      sync.includes("Number.isFinite(data.generation)") && sync.includes(": null; // malformed → fail closed"),
      "a malformed generation is null (fail closed)",
    );
    assert(!sync.includes('.from("user_sync_state").insert') && !sync.includes('.from("user_sync_state").upsert'), "the client never creates the sync-state row");
    // Stale-generation rejections hand off to the mismatch recovery on BOTH write
    // paths (only for a SENT result — a skipped write never triggers it); the
    // rejected payload is never restamped/resent inside the hook.
    assert(
      (sync.match(/isStaleGenerationError\(result\.errorMessage\)\) onGenerationMismatch\?\.\(\)/g) ?? []).length >= 2,
      "pushToCloud AND pushError hand a stale-generation rejection to the mismatch recovery",
    );
    assert(
      (sync.match(/result\.kind === "sent" && result\.errorMessage !== null/g) ?? []).length === 2,
      "the handoff/logging path is reachable only from a SENT result",
    );
  });

  test("all LOCAL learner persisters consult the learner-mutation gate", () => {
    for (const file of [
      "hooks/useStorage.ts",
      "hooks/useSRS.ts",
      "content/learning-engine/repository/local.ts",
      "content/learning-engine/telemetry.ts",
    ]) {
      const src = read(file);
      assert(src.includes("isLearnerMutationBlocked"), `${file} consults isLearnerMutationBlocked`);
    }
  });

  test("AppProvider: user-bound hydration, NO auto-wipe reconcile, recovery + orchestration", () => {
    const provider = read("providers/AppProvider.tsx");
    // Mount-time LOCAL hydration of BOTH control records (user- and network-
    // independent) + `loaded` gated on it, so no writable learning state is
    // presented while the mutation gate is still fail-closed.
    assert(provider.includes("probeRemoteEraseRecovery()"), "recovery presence probed at mount (user-independent)");
    assert(provider.includes("loaded: storageHook.loaded && controlHydrated"), "loaded waits for local control hydration");
    // User-bound hydration of all three durable records.
    assert(provider.includes("hydrateSyncGeneration({ userId: uid })"), "generation hydrated user-bound");
    assert(provider.includes("hydrateRemoteEraseRecovery({ userId: uid })"), "recovery hydrated user-bound");

    // Reconcile: fail-closed pure resolver — server generation fetched FIRST;
    // the learner inventory is scanned ONLY when server > local; inventory read
    // failures fail closed inside the resolver; no automatic wipe; fresh-install
    // acknowledgement CONTINUES into the normal pull.
    assert(provider.includes("resolveGenerationReconcile({"), "reconcile runs the fail-closed resolver");
    assert(provider.includes("hasLearnerData: hasLocalLearnerData"), "the resolver receives the inventory scan (called lazily)");
    assert(provider.includes("persistRemoteEraseRecovery({"), "recovery decision → persist recovery marker (no reset)");
    assert(!provider.includes("await resetLocalData();\n        await setSyncGeneration"), "reconcile never auto-resets");
    assert(provider.includes("blockSyncGeneration()"), "fail_closed decision blocks (no pull/merge/write/push)");
    // acknowledge_and_pull FALLS THROUGH into the normal pull on SUCCESS, and
    // fails CLOSED on a persist failure (Codex P2 round 2): admission is blocked
    // BEFORE the durable acknowledgement is attempted; the failure is caught
    // in-effect, surfaces blocked-not-actionable, and the ONLY return in the
    // branch is that fail-closed catch — success continues into the pull, with
    // hasPulled set only after the pull path completes.
    const ackIdx = provider.indexOf('decision.kind === "acknowledge_and_pull"');
    const pullIdx = provider.indexOf("await pullFromCloud()");
    assert(ackIdx !== -1 && pullIdx !== -1 && ackIdx < pullIdx, "acknowledge branch precedes the pull");
    const ackBranch = provider.slice(ackIdx, pullIdx);
    const ackBlockIdx = ackBranch.indexOf("blockSyncGeneration()");
    const ackPersistIdx = ackBranch.indexOf(
      "await setSyncGeneration({ userId: user.id, generation: decision.generation })",
    );
    assert(
      ackBlockIdx !== -1 && ackPersistIdx !== -1 && ackBlockIdx < ackPersistIdx,
      "ack: admission is blocked BEFORE the acknowledgement persistence begins",
    );
    const ackCatchIdx = ackBranch.indexOf("} catch {", ackPersistIdx);
    assert(ackCatchIdx !== -1, "the acknowledgement persist failure is caught inside the effect");
    assert(ackBranch.includes("markRemoteEraseBlocked()", ackCatchIdx), "ack failure surfaces the runtime blocked state");
    assert(ackBranch.includes('setRemoteEraseStatus("blocked")', ackCatchIdx), "ack failure reports blocked, not actionable");
    const ackReturns = ackBranch.match(/\breturn\b/g) ?? [];
    assert(ackReturns.length === 1, "exactly one return in the ack branch (the fail-closed catch)");
    assert(ackBranch.indexOf("return") > ackCatchIdx, "the success path falls through into the normal pull");
    assert(!ackBranch.includes("hasPulled.current = true"), "hasPulled is not set before the pull runs");

    // Confirmation: delegated to the pure revalidating orchestrator (fetch the
    // CURRENT generation before reset/ack; owner-verified; fail closed on fetch).
    assert(provider.includes("runRemoteEraseConfirm({"), "confirmation runs the revalidating orchestrator");
    assert(provider.includes("fetchServerGeneration: fetchSyncGeneration"), "confirmation revalidates against the server");

    // Orchestrator: op id + user-bound arm + PHASE resume + foreign/corrupt
    // refusal + no sign out.
    assert(
      provider.includes('cloudEraseState() === "pending" && cloudErasePendingUserId() !== user.id'),
      "a foreign OR corrupt pending deletion is refused (fail closed)",
    );
    assert(provider.includes("cloudErasePendingPhase()"), "resume is built from the durable phase");
    // Fresh op ids are validated RFC4122 UUIDv4 (server column is `uuid`); the
    // legacy non-UUID `op-...` fallback is gone.
    assert(provider.includes("cloudErasePendingOpId() ?? (await makeOperationId())"), "new op ids come from the validated UUID source");
    assert(!provider.includes("op-${"), "no non-UUID op-id fallback remains");
    assert(provider.includes("markCloudDeleted:"), "records cloud_deleted before the local reset");
    assert(provider.includes("markLocalResetDone:"), "records local_reset_done after the reset");
    assert(provider.includes("armCloudErase({ opId, userId: uidNow })"), "arm is user-bound");
    // Codex P1: verify-then-PIN. deleteCloud runs the pinned step (live identity
    // + fresh session + marker identity re-verified immediately before the RPC),
    // and the request carries the CAPTURED token via the pinned transport.
    assert(provider.includes("runPinnedCloudDelete({"), "deleteCloud runs the auth-pinned step");
    assert(provider.includes("ownerUserId: uidNow"), "pinned to the operation's owner");
    assert(provider.includes("operationId: opId"), "pinned to THIS operation id");
    assert(provider.includes("latestAuthUserId: () => latestUserIdRef.current"), "live identity read from a ref, not a closure");
    assert(provider.includes("getSession: currentSessionSnapshot"), "session verified via the shared auth abstraction");
    assert(
      provider.includes("pendingOwner: cloudErasePendingUserId") &&
        provider.includes("pendingOpId: cloudErasePendingOpId"),
      "marker identity re-verified before the RPC",
    );
    assert(
      provider.includes("rpcWithToken: (token, id) => deleteSyncedRows(id, token)"),
      "the RPC receives the captured token and the same op id",
    );
    // Post-RPC owner revalidation: an auth switch stops the flow at the latest
    // durably recorded phase — reset / acknowledgement / finalization never run
    // for uidNow under a different active identity. Codex P1 round 3: the
    // remote-erase CONFIRMATION flow guards its reset / acknowledgement /
    // marker-clear the same way (3 delete-flow + 3 confirm-flow call sites).
    assert((provider.match(/assertOwnerActive\(\);/g) ?? []).length >= 6, "delete AND recovery flows revalidate the owner before every destructive/finalizing step");
    const confirmStart = provider.indexOf("confirmFlightRef.current!.run(");
    assert(confirmStart !== -1, "confirm flow present");
    const confirmSlice = provider.slice(confirmStart, provider.indexOf("generationMismatchRef.current", confirmStart));
    assert(confirmSlice.includes("runRemoteEraseConfirm({"), "confirm still runs the revalidating machine");
    assert(
      (confirmSlice.match(/assertOwnerActive\(\);/g) ?? []).length === 3,
      "recovery reset, acknowledgement, and marker-clear each revalidate the active account",
    );
    assert(confirmSlice.includes("await clearRemoteEraseRecovery()"), "the guarded clear still clears the marker on the owner path");
    // The clear additionally re-verifies the MARKER itself: the shared key must
    // still hold this user's actionable record (absent/foreign/corrupt → throw).
    assert(
      confirmSlice.includes("marker.userId !== uidNow") &&
        confirmSlice.includes("refusing to clear"),
      "clear re-verifies marker ownership, not just the auth identity",
    );
    // Write-RPC mismatch handoff is stamped with the real deps.
    assert(provider.includes("handleGenerationMismatch({"), "generation-mismatch recovery wired");
    assert(!provider.includes("signOut"), "delete/recovery never sign out");

    // SINGLE-FLIGHT: both destructive operations run through a synchronous lock
    // (React busy state is UX only), and every phase advance / marker clear
    // carries the operation identity so a stale task can't touch another op.
    assert(provider.includes("createSingleFlight<DeleteSyncedStatus>()"), "delete is single-flight");
    assert(provider.includes("createSingleFlight<void>()"), "remote-erase confirm is single-flight");
    assert(provider.includes("deleteFlightRef.current!.run("), "deleteSyncedData runs inside the lock");
    assert(provider.includes("confirmFlightRef.current!.run("), "confirmRemoteErase runs inside the lock");
    assert((provider.match(/expectedUserId: uidNow/g) ?? []).length >= 2, "phase advances carry the user identity");
    assert((provider.match(/expectedOperationId: opId/g) ?? []).length >= 2, "phase advances carry the operation id");
    assert(provider.includes("finishCloudErase(undefined, { userId: uidNow, operationId: opId })"), "finish is identity-checked");
  });

  test("Codex P1: startup reconcile is gated on local generation READINESS", () => {
    const provider = read("providers/AppProvider.tsx");
    // A corrupt/foreign/unreadable durable generation hydrates NOT-ready with the
    // in-memory value parked at 0. The reconcile effect must not enter (and the
    // resolver must not run) on that basis: the readiness gate sits in the same
    // early-return guard as the admission checks, BEFORE any generation value is
    // consumed or any cloud/recovery side effect starts.
    assert(provider.includes("!isSyncGenerationReady()"), "effect gate: not-ready never enters reconcile");
    const gateIdx = provider.indexOf("!isSyncGenerationReady()");
    const resolverIdx = provider.indexOf("resolveGenerationReconcile({");
    assert(gateIdx !== -1 && resolverIdx !== -1 && gateIdx < resolverIdx, "the readiness gate precedes the resolver");
    // Defense-in-depth: the pure resolver also receives readiness and fails
    // closed BEFORE fetching the server generation (behavior pinned in
    // generationReconcile.test.ts).
    assert(
      provider.includes("localGenerationReady: isSyncGenerationReady"),
      "the resolver receives the readiness dep",
    );
  });

  test("Codex P2-3: recovery marker persistence fails CLOSED (block first, catch, blocked-not-actionable, no pull)", () => {
    const provider = read("providers/AppProvider.tsx");
    // Startup reconcile recovery branch: admission blocked BEFORE the marker
    // write is attempted; the write failure is caught inside the effect (never
    // an unhandled rejection); success → owned actionable recovery, failure →
    // blocked-not-actionable; the pull/merge path never runs from this branch.
    const recoveryStart = provider.indexOf('decision.kind === "recovery"');
    const recoveryEnd = provider.indexOf('decision.kind === "acknowledge_and_pull"');
    assert(recoveryStart !== -1 && recoveryEnd !== -1 && recoveryStart < recoveryEnd, "recovery branch precedes the acknowledge branch");
    const recoveryBranch = provider.slice(recoveryStart, recoveryEnd);
    const blockIdx = recoveryBranch.indexOf("blockSyncGeneration()");
    const persistIdx = recoveryBranch.indexOf("await persistRemoteEraseRecovery({");
    assert(blockIdx !== -1 && persistIdx !== -1 && blockIdx < persistIdx, "blockSyncGeneration runs BEFORE marker persistence begins");
    assert(recoveryBranch.includes("try {") && recoveryBranch.includes("} catch {"), "marker persistence failure is caught inside the effect");
    assert(recoveryBranch.includes("markRemoteEraseBlocked()"), "persistence failure surfaces the runtime blocked state");
    assert(recoveryBranch.includes('setRemoteEraseStatus("blocked")'), "UI is told the state is blocked, not actionable");
    assert(recoveryBranch.includes('setRemoteEraseStatus("own")'), "successful persistence still yields the owned actionable recovery");
    assert(!recoveryBranch.includes("pullFromCloud"), "no pull runs from the recovery branch");
    // The write-RPC generation-mismatch path handles the SAME persistence-failure
    // class: mark blocked-not-actionable, rethrow so the pure machine stays blocked.
    const mismatchStart = provider.indexOf("handleGenerationMismatch({");
    assert(mismatchStart !== -1, "mismatch recovery wired");
    const mismatchSlice = provider.slice(mismatchStart, provider.indexOf("acknowledgeGeneration", mismatchStart));
    assert(
      mismatchSlice.includes("markRemoteEraseBlocked()") && mismatchSlice.includes("throw e"),
      "mismatch persistRecovery failure marks blocked and stays blocked",
    );
    // Codex P2-2: the tri-state per-user status replaces the ambiguous boolean.
    assert(provider.includes("remoteEraseStatusFor(uid)"), "status derived per-user from the recovery module");
    assert(provider.includes('remoteEraseStatus: RemoteEraseStatus'), "context exposes the tri-state recovery status");
    assert(!provider.includes("remoteErasePending:"), "the ambiguous pending boolean is gone from the provider API");
  });

  test("Codex P1: the pinned RPC transport is token-fixed, session-independent, and narrowly wrapped", () => {
    const sb = read("lib/supabase.ts");
    // ONE internal pinned transport; not exported (no arbitrary-URL transport
    // for feature code) and restricted to the three allowed functions.
    const start = sb.indexOf("async function rpcWithPinnedToken");
    assert(start !== -1 && !sb.includes("export async function rpcWithPinnedToken"), "the internal transport exists and is NOT exported");
    const body = sb.slice(start, sb.indexOf("\n}", start));
    assert(
      body.includes('"delete_my_synced_learning_data" | "upsert_user_progress" | "insert_user_error"'),
      "the transport accepts ONLY the three allowed functions",
    );
    assert(body.includes("Authorization: `Bearer ${accessToken}`"), "Authorization is FIXED to the caller-captured token");
    assert(body.includes("apikey: supabaseAnonKey"), "the public anon key rides as apikey");
    assert(!body.includes("auth."), "the pinned request never consults the mutable auth session");
    assert(!body.includes("supabase.rpc"), "the pinned request never routes through the global rpc client");
    assert(body.includes('if (text === "") return { data: null, errorMessage: null }'), "an empty 2xx body is a SUCCESS (void write RPCs)");
    // Narrow wrappers: deletion body stays ONLY p_op_id; write bodies carry
    // exactly the server parameters; nothing anywhere sends a user id.
    const wrappers = sb.slice(start);
    assert(wrappers.includes("{ p_op_id: opId }"), "deletion body remains only the idempotency key");
    assert(
      wrappers.includes("p_generation: args.generation") &&
        wrappers.includes("p_progress: args.progress") &&
        wrappers.includes("p_daily_review: args.dailyReview"),
      "progress body carries exactly the server parameters",
    );
    assert(
      wrappers.includes("p_word: args.word") && wrappers.includes("p_lesson_id: args.lessonId"),
      "error body carries exactly the server parameters",
    );
    assert(!/p_user_?id|user_id/i.test(wrappers), "no user id is ever sent — ownership stays auth.uid() only");
  });

  test("all durable control keys are EXCLUDED from the PR-H local reset/export inventory", () => {
    for (const k of [
      LM_CLOUD_ERASE_PENDING_KEY,
      LM_SYNC_GENERATION_KEY,
      LM_REMOTE_ERASE_RECOVERY_KEY,
    ]) {
      assert(!ALL_LOCAL_PRIVACY_KEYS.includes(k), `${k} excluded from local reset/export`);
    }
  });

  test("B5 / PR-G account-switch model is NOT implemented here", () => {
    const provider = read("providers/AppProvider.tsx");
    assert(provider.includes("const hasPulled = useRef(false)"), "hasPulled remains a bare ref");
    assert(!provider.includes("hasPulledByUser"), "no per-user hasPulled map (B5 stays separate)");
  });
});

describe("PR-I1 — UI copy contract", () => {
  test("render matrix: normal / owned-retry / blocked states are mutually clear (Codex P2-1/P2-2)", () => {
    const ui = read("components/learning-engine/PrivacyDataControls.tsx");
    const ownStart = ui.indexOf('{pendingDeletion === "own" ?');
    const blockedStart = ui.indexOf('{pendingDeletion === "blocked" ?');
    const recoveryOwnStart = ui.indexOf('{remoteEraseStatus === "own" ?');
    const recoveryBlockedStart = ui.indexOf('{remoteEraseStatus === "blocked" ?');
    const normalStart = ui.indexOf(
      'user && !user.is_anonymous && remoteEraseStatus === "none" && pendingDeletion === "none"',
    );
    assert(
      ownStart !== -1 && blockedStart !== -1 && recoveryOwnStart !== -1 &&
        recoveryBlockedStart !== -1 && normalStart !== -1,
      "all five deletion/recovery states render from explicit, distinct conditions",
    );
    assert(
      ownStart < blockedStart && blockedStart < recoveryOwnStart &&
        recoveryOwnStart < recoveryBlockedStart && recoveryBlockedStart < normalStart,
      "state blocks are laid out in matrix order",
    );

    // OWNED pending deletion: ALWAYS actionable — no idle-phase gate; every
    // retryable failure keeps a CTA; the busy state exposes no duplicate CTA.
    assert(!ui.includes('pendingDeletion === "own" &&'), "the owned retry block is not gated on a UI phase");
    const ownBlock = ui.slice(ownStart, blockedStart);
    assert(/data is still on this/i.test(ownBlock), "local_reset_failed copy: data still on device");
    assert(ownBlock.includes("Retry device cleanup"), "local_reset_failed keeps a retry CTA");
    assert(/on-device data were deleted/i.test(ownBlock), "guard_finalize_failed copy: device data WAS cleared");
    assert(ownBlock.includes('"Finish"'), "guard_finalize_failed keeps a finish CTA");
    assert(ownBlock.includes("Try again"), "armed cloud_failed keeps a try-again CTA");
    assert(ownBlock.includes("Finish deletion"), "a freshly resumed own pending deletion is resumable");
    assert(ownBlock.includes("Deleting synced data"), "busy state shown during an active retry");
    assert(
      (ownBlock.match(/onPress=\{onDeleteSyncedConfirmed\}/g) ?? []).length === 1,
      "ONE retry CTA, wired to the existing deleteSyncedData flow",
    );

    // BLOCKED pending deletion: informational only — never an owner retry CTA.
    const blockedBlock = ui.slice(blockedStart, recoveryOwnStart);
    assert(/another account session/i.test(blockedBlock), "foreign pending deletion explains the owning account must complete it");
    assert(
      !blockedBlock.includes("Pressable") && !blockedBlock.includes("onDeleteSyncedConfirmed"),
      "blocked deletion exposes NO action",
    );

    // Remote-erase recovery: own → explicit confirmation; blocked → message only.
    const recoveryOwnBlock = ui.slice(recoveryOwnStart, recoveryBlockedStart);
    assert(/deleted on another device/i.test(recoveryOwnBlock), "recovery copy explains the remote deletion");
    assert(/nothing on this device is removed until you confirm/i.test(recoveryOwnBlock), "recovery copy: no auto-wipe");
    assert(
      recoveryOwnBlock.includes("onConfirmRemoteErase") && recoveryOwnBlock.includes("Clear this device"),
      "owned recovery routes through the explicit confirmation",
    );
    const recoveryBlockedBlock = ui.slice(recoveryBlockedStart, normalStart);
    assert(
      /restart the app/i.test(recoveryBlockedBlock) && /contact support/i.test(recoveryBlockedBlock),
      "blocked recovery: other-account / restart / support message",
    );
    assert(
      !recoveryBlockedBlock.includes("ConfirmRemoteErase") &&
        !recoveryBlockedBlock.includes("Clear this device") &&
        !recoveryBlockedBlock.includes("Pressable"),
      "blocked recovery exposes NO confirmation action",
    );
    assert((ui.match(/Clear this device/g) ?? []).length === 1, "the confirmation CTA exists ONLY in the owned state");

    // Normal controls + single deletion implementation (no duplicate destructive path).
    assert(ui.includes("Delete synced learning data"), "distinct action label present");
    assert((ui.match(/deleteSyncedData\(\)/g) ?? []).length === 1, "exactly one call site into the provider deletion flow");
    assert((ui.match(/const onDeleteSyncedConfirmed = /g) ?? []).length === 1, "one shared confirm/retry handler");
    assert(/hasn&rsquo;t finished/.test(ui), "pending-deletion copy shows the unfinished state");
    assert(!/delete account/i.test(ui) && !/sign (you )?out/i.test(ui), "no account-deletion / sign-out wording");
  });
});

describe("PR-I1 — learning pauses while the mutation gate is closed (Codex P2 r3566344629)", () => {
  test("AppProvider: learningPaused is a reactive mirror of the authoritative gate; loaded stays bootstrap-only", () => {
    const provider = read("providers/AppProvider.tsx");
    // Context field + authoritative source.
    assert(provider.includes("learningPaused: boolean;"), "AppContext exposes learningPaused");
    assert(provider.includes("setLearningPaused(isLearnerMutationBlocked())"), "the mirror re-reads the AUTHORITATIVE gate on every control refresh");
    // loaded remains bootstrap/readiness only — never combined with the pause.
    assert(provider.includes("loaded: storageHook.loaded && controlHydrated,"), "loaded stays bootstrap-only");
    assert(!/loaded:.*learningPaused/.test(provider) && !/loaded:.*isLearnerMutationBlocked/.test(provider), "loaded is not combined with the pause state");
    // Deletion: pause set synchronously BEFORE the first await; refresh in finally.
    const delStart = provider.indexOf("deleteFlightRef.current!.run(");
    const delSlice = provider.slice(delStart, provider.indexOf("confirmFlightRef.current!.run("));
    const delPause = delSlice.indexOf("setLearningPaused(true)");
    const delFirstAwait = delSlice.indexOf("await makeOperationId"); // the flow's first real await
    assert(delPause !== -1 && delFirstAwait !== -1 && delPause < delFirstAwait, "deletion pauses BEFORE its first await");
    assert(delSlice.includes("} finally {") && delSlice.includes("refreshControlState();"), "deletion refreshes the mirror on EVERY outcome (finally)");
    // Recovery confirmation: same pattern.
    const confStart = provider.indexOf("confirmFlightRef.current!.run(");
    const confSlice = provider.slice(confStart, provider.indexOf("generationMismatchRef.current", confStart));
    const confPause = confSlice.indexOf("setLearningPaused(true)");
    const confFirstAwait = confSlice.indexOf("await");
    assert(confPause !== -1 && confFirstAwait !== -1 && confPause < confFirstAwait, "confirmation pauses before its first await");
    assert(confSlice.includes("} finally {") && confSlice.includes("refreshControlState();"), "confirmation refreshes the mirror on every outcome");
    // User-bound hydration: pause set synchronously before the hydrations start.
    const hydStart = provider.indexOf("let alive = true;\n    setEraseGuardHydrated(false);");
    const hydSlice = provider.slice(hydStart, provider.indexOf("hasPulled", hydStart));
    const hydPause = hydSlice.indexOf("setLearningPaused(true)");
    const hydAll = hydSlice.indexOf("Promise.all");
    assert(hydPause !== -1 && hydAll !== -1 && hydPause < hydAll, "user-bound hydration pauses synchronously before the async reads");
    // Reconcile recovery + ack-failure branches mark the closed gate too.
    assert((provider.match(/setLearningPaused\(true\); \/\/ Codex P2/g) ?? []).length >= 2, "reconcile recovery/ack-failure branches mirror the closed gate");
  });

  test("LearningPausedPanel is presentation-only; every learning surface consumes the pause", () => {
    const panel = read("components/learning-engine/LearningPausedPanel.tsx");
    assert(panel.includes("Learning is paused"), "shared calm paused copy");
    // Presentation-only: nothing imported beyond React / react-native / theme —
    // no lib modules (storage, supabase, gates), no providers, no router.
    assert(
      !/@\/lib\//.test(panel) && !/@\/providers\//.test(panel) &&
        !panel.includes("expo-router") && !panel.includes("isLearnerMutationBlocked"),
      "the panel has no storage/Supabase/gate/navigation logic",
    );

    // Home: paused branch keeps account + privacy controls; Lesson Zero cannot
    // trap or redirect a paused first-use user.
    const home = read("app/(tabs)/index.tsx");
    assert(home.includes("learningPaused"), "Home consumes learningPaused");
    assert(home.includes("if (loaded && !learningPaused && needsLessonZero)"), "Lesson-Zero redirect waits for loaded && !paused");
    assert(home.includes("(needsLessonZero && !learningPaused)"), "a paused first-use user is not trapped behind the spinner");
    const pausedHome = home.slice(home.indexOf("if (learningPaused) {"), home.indexOf("const today = ()"));
    assert(pausedHome.includes("<LearningPausedPanel") && pausedHome.includes("<PrivacyDataControls"), "paused Home shows the panel + privacy controls");
    assert(pausedHome.includes("accountButton") && pausedHome.includes("{accountModal}"), "account entry + sign-out stay reachable while paused");
    assert(!pausedHome.includes("startDailyReview") && !pausedHome.includes("goToLesson") && !pausedHome.includes("v1-lesson"), "paused Home offers no lesson / v1 / Daily Review actions");

    // Practice: paused panel after the FEATURES.practice redirect, before modes.
    const practice = read("app/(tabs)/practice.tsx");
    assert(practice.includes("learningPaused"), "Practice consumes learningPaused");
    const redirectIdx = practice.indexOf("if (!FEATURES.practice)");
    const practicePausedIdx = practice.indexOf("if (learningPaused)");
    const menuIdx = practice.indexOf('if (mode === "menu")');
    assert(redirectIdx !== -1 && redirectIdx < practicePausedIdx && practicePausedIdx < menuIdx, "paused panel sits after the redirect and before any interactive mode");
    assert(practice.includes("<LearningPausedPanel"), "Practice renders the shared paused panel");

    // Both lesson routes gate the interactive lesson.
    for (const file of ["app/lesson/[id].tsx", "app/v1-lesson/[id].tsx"]) {
      const src = read(file);
      assert(src.includes("learningPaused"), `${file} consumes learningPaused`);
      assert(src.includes("<LearningPausedPanel"), `${file} renders the paused panel instead of the lesson`);
    }

    // Learning-engine shell: paused branch keeps privacy controls + exit and
    // returns BEFORE any interactive card renders.
    const shell = read("components/learning-engine/LearnerRendererShell.tsx");
    const shellPausedIdx = shell.indexOf("if (learningPaused) {");
    const shellCardIdx = shell.indexOf("renderCard(current");
    assert(shellPausedIdx !== -1 && shellCardIdx !== -1 && shellPausedIdx < shellCardIdx, "the shell's paused branch precedes interactive cards");
    const shellPaused = shell.slice(shellPausedIdx, shellCardIdx);
    assert(shellPaused.includes("<LearningPausedPanel") && shellPaused.includes("<PrivacyDataControls"), "the paused shell keeps the panel + privacy controls");
    assert(shellPaused.includes("onGoHome={handleExit}"), "exit stays available in the paused shell");
  });
});
