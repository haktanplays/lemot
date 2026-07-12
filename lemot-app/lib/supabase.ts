import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { kvStorage } from "@/lib/storage";
import { createChunkedSecureStorage } from "@/lib/secureAuthStorage";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabaseReady = supabaseUrl.length > 0 && supabaseAnonKey.length > 0;

// B19: on native, persist the Supabase session in the OS keychain/keystore
// (encrypted at rest) via expo-secure-store, with transparent chunking (the
// session blob exceeds SecureStore's ~2048-byte per-value cap) and a one-time
// best-effort migration of any pre-existing plaintext session out of the old KV.
// On web, SecureStore is unavailable, so keep the existing web-compatible
// (localStorage-backed) adapter. Only the AUTH token moves — no other app data.
const authStorage =
  Platform.OS === "web"
    ? kvStorage
    : createChunkedSecureStorage({
        secure: {
          getItemAsync: (key) => SecureStore.getItemAsync(key),
          setItemAsync: (key, value) => SecureStore.setItemAsync(key, value),
          deleteItemAsync: (key) => SecureStore.deleteItemAsync(key),
        },
        legacy: kvStorage,
      });

export const supabase: SupabaseClient = supabaseReady
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: authStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
  : (null as unknown as SupabaseClient);

/**
 * Latest auth session snapshot (user id + access token), or null when signed
 * out / unconfigured / unreadable. Used to VERIFY an identity and capture the
 * token that pins a subsequent request to it.
 */
export async function currentSessionSnapshot(): Promise<{
  userId: string;
  accessToken: string;
} | null> {
  if (!supabaseReady) return null;
  const { data } = await supabase.auth.getSession();
  const session = data.session;
  if (!session?.user?.id || !session.access_token) return null;
  return { userId: session.user.id, accessToken: session.access_token };
}

/**
 * PR-I1 (Codex P1): INTERNAL token-PINNED PostgREST RPC transport. An explicit
 * POST whose Authorization header is FIXED to the caller-captured access token
 * — it never consults the mutable global client's session and never routes
 * through `supabase.rpc`, so an auth switch after the caller's identity check
 * cannot redirect the request to another account. Ownership always resolves
 * server-side from `auth.uid()` embedded in the pinned token; no body ever
 * carries a user id. Reachable ONLY through the narrow allowed-function
 * wrappers below — feature code gets no arbitrary-URL transport.
 *
 * A 2xx response with an empty (or JSON `null`) body is a SUCCESS (the write
 * RPCs return void); a non-2xx response is an error whose PostgREST body text
 * is preserved (the callers' "stale sync generation" detection reads it).
 */
async function rpcWithPinnedToken(
  fn: "delete_my_synced_learning_data" | "upsert_user_progress" | "insert_user_error",
  body: Record<string, unknown>,
  accessToken: string
): Promise<{ data: unknown; errorMessage: string | null }> {
  if (!supabaseReady) return { data: null, errorMessage: "supabase not configured" };
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/rpc/${fn}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        apikey: supabaseAnonKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      let detail = "";
      try {
        detail = (await res.text()).slice(0, 300);
      } catch {
        /* status alone is enough */
      }
      return { data: null, errorMessage: `rpc ${fn} failed (${res.status}): ${detail}` };
    }
    const text = await res.text();
    if (text === "") return { data: null, errorMessage: null }; // void RPC success
    try {
      return { data: JSON.parse(text) as unknown, errorMessage: null };
    } catch {
      return { data: null, errorMessage: null }; // 2xx, non-JSON body → success, no data
    }
  } catch (e) {
    return {
      data: null,
      errorMessage: e instanceof Error ? e.message : "network failure",
    };
  }
}

/**
 * Token-pinned deletion RPC (Codex P1). The ONLY body field is the idempotency
 * key `p_op_id` — never a user id.
 */
export function rpcDeleteSyncedDataPinned(
  accessToken: string,
  opId: string
): Promise<{ data: unknown; errorMessage: string | null }> {
  return rpcWithPinnedToken("delete_my_synced_learning_data", { p_op_id: opId }, accessToken);
}

/**
 * Token-pinned generation-aware progress write (Codex P1, round 4). Body
 * fields are exactly the server parameters — never a user id; the token rides
 * only in the Authorization header.
 */
export async function rpcUpsertUserProgressPinned(args: {
  accessToken: string;
  generation: number;
  progress: Record<string, boolean>;
  dailyReview: unknown;
}): Promise<{ errorMessage: string | null }> {
  const { errorMessage } = await rpcWithPinnedToken(
    "upsert_user_progress",
    {
      p_generation: args.generation,
      p_progress: args.progress,
      p_daily_review: args.dailyReview,
    },
    args.accessToken
  );
  return { errorMessage };
}

/**
 * Token-pinned generation-aware error write (Codex P1, round 4). Body fields
 * are exactly the server parameters — never a user id.
 */
export async function rpcInsertUserErrorPinned(args: {
  accessToken: string;
  generation: number;
  word: string;
  section: string;
  given: string;
  correct: string;
  lessonId: number;
}): Promise<{ errorMessage: string | null }> {
  const { errorMessage } = await rpcWithPinnedToken(
    "insert_user_error",
    {
      p_generation: args.generation,
      p_word: args.word,
      p_section: args.section,
      p_given: args.given,
      p_correct: args.correct,
      p_lesson_id: args.lessonId,
    },
    args.accessToken
  );
  return { errorMessage };
}
