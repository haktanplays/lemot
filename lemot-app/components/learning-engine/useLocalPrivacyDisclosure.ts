import { useCallback, useEffect, useRef, useState } from "react";
import {
  readLocalPrivacyState,
  markAndPersistLocalDisclosureSeen,
} from "@/content/learning-engine/privacy-local";

/**
 * Founder-local privacy disclosure hook (P5.4B).
 *
 * Reads the local `PrivacyState` once on mount and decides whether the calm
 * founder-local disclosure (FounderPrivacyNotice) should be shown. On
 * acknowledge, it persists "disclosure seen" via the P5.4A helper and hides the
 * notice. This is the ONLY place `Date.now` is used — the UI action boundary —
 * keeping `privacy.ts` / `privacy-local.ts` pure (they take a caller timestamp).
 *
 * It enables NO remote sync and asks for NO tester/account consent — it only
 * records the local-first disclosure. Failures fail SAFE: a read error shows the
 * notice (rather than silently skipping it); a persist error surfaces a calm
 * retryable error without crashing.
 */
export type DisclosureStatus =
  | "loading"
  | "needed"
  | "saving"
  | "dismissed"
  | "error";

export type LocalPrivacyDisclosure = {
  status: DisclosureStatus;
  /** True while the notice should be visible (needed / saving / error). */
  shouldShow: boolean;
  saving: boolean;
  error: boolean;
  acknowledge: () => void;
};

export function useLocalPrivacyDisclosure(): LocalPrivacyDisclosure {
  const [status, setStatus] = useState<DisclosureStatus>("loading");
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;
    void (async () => {
      try {
        const state = await readLocalPrivacyState();
        if (aliveRef.current) {
          setStatus(state.localDisclosure.seen ? "dismissed" : "needed");
        }
      } catch {
        // Fail safe: show the notice rather than silently skipping it.
        if (aliveRef.current) setStatus("needed");
      }
    })();
    return () => {
      aliveRef.current = false;
    };
  }, []);

  const acknowledge = useCallback(() => {
    setStatus("saving");
    void (async () => {
      try {
        // Date.now ONLY here, at the user-action boundary (pure modules take it in).
        await markAndPersistLocalDisclosureSeen({ timestamp: Date.now() });
        if (aliveRef.current) setStatus("dismissed");
      } catch {
        if (aliveRef.current) setStatus("error");
      }
    })();
  }, []);

  return {
    status,
    shouldShow: status === "needed" || status === "saving" || status === "error",
    saving: status === "saving",
    error: status === "error",
    acknowledge,
  };
}
