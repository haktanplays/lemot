/**
 * Learning-engine repository interface (P1.1) — pure interface, no implementation.
 *
 * `LearningRepository` is the storage-agnostic seam between the engine and
 * persistence. The mastery reducer (P2) and the future learner renderer (P3)
 * depend ONLY on this interface — never on `kvStorage` or Supabase directly —
 * so the local (P1.2) and remote (P6) implementations are swappable.
 *
 * Hard boundaries (P1.1):
 *  - Interface only. No implementation, no `kvStorage`, no storage writes, no
 *    offline-queue logic, no Supabase / remote, no network, no React, no AI.
 *
 * The snapshot methods are typed `unknown` ON PURPOSE: the concrete
 * `MasterySnapshot` is defined in P2.2. Importing a not-yet-existing mastery
 * type here would couple P1.1 to P2; `unknown` keeps the interface honest until
 * P2 narrows it.
 */
import type { LearningEvent } from "../events";

export interface LearningRepository {
  /** Append one immutable event. Implementations enforce idempotency by clientEventId. */
  appendEvent(event: LearningEvent): Promise<void>;
  /** All events whose sync status is still "pending" (drained by the remote phase). */
  getPending(): Promise<LearningEvent[]>;
  /** Mark the given events synced (by clientEventId). Unknown ids are ignored. */
  markSynced(clientEventIds: string[]): Promise<void>;
  /** Every event in append order, for deterministic local mastery derivation. */
  readAllEvents(): Promise<LearningEvent[]>;
  /** Optional cached projection. Typed `unknown` until P2.2 defines MasterySnapshot. */
  readSnapshot?(): Promise<unknown | null>;
  /** Optional cached projection write. Typed `unknown` until P2.2 defines MasterySnapshot. */
  writeSnapshot?(snapshot: unknown): Promise<void>;
}
