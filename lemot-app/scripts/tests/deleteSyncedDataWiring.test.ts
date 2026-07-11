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
    assert(sync.includes('.rpc("upsert_user_progress"'), "progress written via the generation-aware RPC");
    assert(sync.includes('.rpc("insert_user_error"'), "errors written via the generation-aware RPC");
    assert((sync.match(/p_generation: syncGeneration\(\)/g) ?? []).length >= 2, "both writes stamp the generation");
    assert(sync.includes("isSyncGenerationReady()") && sync.includes("isRemoteErasePending()"), "writes gated on generation-ready + no recovery");
    assert(/\.rpc\(\s*["']delete_my_synced_learning_data["']\s*,\s*\{[\s\n]*p_op_id:/.test(sync), "delete RPC passes p_op_id only (idempotency key)");
    assert(!/p_op_id:\s*userId/.test(sync), "op id is not the user id");
    // fetchSyncGeneration fails closed (returns null on error).
    assert(sync.includes("if (error) return null; // fail closed"), "generation fetch fails closed");
    // Stale-generation rejections hand off to the mismatch recovery on BOTH write
    // paths; the rejected payload is never restamped/resent inside the hook.
    assert(
      (sync.match(/isStaleGenerationError\(error\.message\)\) onGenerationMismatch\?\.\(\)/g) ?? []).length >= 2,
      "pushToCloud AND pushError hand a stale-generation rejection to the mismatch recovery",
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

    // Reconcile: no automatic wipe — persist a recovery marker when data exists.
    assert(provider.includes("if (await hasLocalLearnerData())"), "reconcile checks local learner data");
    assert(provider.includes("persistRemoteEraseRecovery({"), "server>local + data → persist recovery marker (no reset)");
    assert(!/if \(await hasLocalLearnerData\(\)\)[^}]*await resetLocalData\(\)/s.test(provider), "reconcile does NOT auto-reset when learner data exists");
    assert(provider.includes("blockSyncGeneration()"), "fetch-failure / local>server fail closed");

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
    assert(provider.includes("markCloudDeleted:"), "records cloud_deleted before the local reset");
    assert(provider.includes("markLocalResetDone:"), "records local_reset_done after the reset");
    assert(provider.includes("armCloudErase({ opId, userId: uidNow })"), "arm is user-bound");
    assert(provider.includes("deleteCloud: () => deleteSyncedRows(opId)"), "RPC uses the same op id");
    // Write-RPC mismatch handoff is stamped with the real deps.
    assert(provider.includes("handleGenerationMismatch({"), "generation-mismatch recovery wired");
    assert(!provider.includes("signOut"), "delete/recovery never sign out");
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
  test("recovery banner (no auto-wipe), non-anonymous delete, honest partial-failure copy", () => {
    const ui = read("components/learning-engine/PrivacyDataControls.tsx");
    // Remote-erase recovery banner — explicit confirmation, no auto-wipe.
    assert(ui.includes("remoteErasePending"), "recovery banner is driven by remoteErasePending");
    assert(/deleted on another device/i.test(ui), "recovery copy explains the remote deletion");
    assert(/nothing on this device is removed until you confirm/i.test(ui), "recovery copy: no auto-wipe");
    assert(ui.includes("confirmRemoteErase"), "recovery routes through explicit confirmation");
    // Delete action: non-anon only, hidden during recovery / pending deletion.
    assert(
      ui.includes('user && !user.is_anonymous && !remoteErasePending && pendingDeletion === "none"'),
      "delete action non-anon + hidden during recovery and pending deletion",
    );
    assert(ui.includes("Delete synced learning data"), "distinct action label present");
    // Pending-deletion banners: own → resumable "Finish deletion"; foreign/corrupt
    // → blocked explanation (the original account must complete it).
    assert(/hasn&rsquo;t finished/.test(ui), "pending-deletion copy shows the unfinished state");
    assert(ui.includes("Finish deletion"), "own pending deletion is resumable");
    assert(/another account session/i.test(ui), "foreign pending deletion explains the owning account must complete it");
    assert(/data is still on this/i.test(ui), "local_reset_failed copy: data still on device");
    assert(/on-device data were deleted/i.test(ui), "guard_finalize_failed copy: device data WAS cleared");
    assert(!/delete account/i.test(ui) && !/sign (you )?out/i.test(ui), "no account-deletion / sign-out wording");
  });
});
