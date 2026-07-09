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
