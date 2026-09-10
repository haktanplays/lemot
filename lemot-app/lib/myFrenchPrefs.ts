/**
 * Where My French preferences are kept: on the device, and nowhere else.
 *
 * No backend, no account, no sync, real or pretended. The brief is explicit
 * about that, and it matters more here than anywhere else in the app: this is
 * the one surface where the learner tells the product something about
 * themselves, so the honest thing is for the answer never to leave the phone.
 *
 * Same shape as every other runtime persister: its own key, and the
 * privacy-reset epoch honoured so a write started before a reset cannot
 * resurrect what the user asked to delete. The rules themselves live in
 * `content/my-french/prefs.ts`, which imports nothing.
 */
import { kvStorage } from "@/lib/storage";
import { isPersistSuppressed, privacyResetEpoch } from "@/lib/privacyResetEpoch";
import { parsePrefs, type MyFrenchPrefs } from "@/content/my-french/prefs";

export const MY_FRENCH_PREFS_KEY = "lm_my_french";

export function readMyFrenchPrefs(): MyFrenchPrefs {
  return parsePrefs(kvStorage.getItem(MY_FRENCH_PREFS_KEY));
}

/** Persist, unless a privacy reset has happened since the caller last looked. */
export function writeMyFrenchPrefs(prefs: MyFrenchPrefs, capturedEpoch: number): MyFrenchPrefs {
  if (isPersistSuppressed(capturedEpoch)) return readMyFrenchPrefs();
  kvStorage.setItem(MY_FRENCH_PREFS_KEY, JSON.stringify(prefs));
  return prefs;
}

/** Drop everything. Used by the local privacy reset. */
export function clearMyFrenchPrefs(): void {
  kvStorage.removeItem(MY_FRENCH_PREFS_KEY);
}

export { privacyResetEpoch };
