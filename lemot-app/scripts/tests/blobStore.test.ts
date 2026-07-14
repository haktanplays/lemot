/**
 * PR-B2 (audit B6) — shared-blob atomic store.
 *
 * The `lm7` blob holds progress + errors + daily review. The race was: each
 * writer read a stale full snapshot and saved the whole blob, so the last writer
 * clobbered another slice's recent update. `createBlobStore` fixes this by making
 * every write a functional read-modify-write against the LATEST value, so slice
 * updates always merge. These tests exercise the interleavings and confirm the
 * PR-A non-destructive persist guard still governs (not regressed).
 */
import { describe, test, assert } from "./harness";
import { createBlobStore } from "../../lib/blobStore";
import type { StorageData, ErrorEntry } from "../../lib/types";

function fresh(): StorageData {
  return { p: {}, err: [], dr: { date: "", count: 0 } };
}
function err(word: string): ErrorEntry {
  return { w: word, s: "quiz", g: "x", c: word, l: 1, t: 1 };
}

describe("PR-B2 — shared-blob atomic store (B6)", () => {
  test("progress update then error log preserves both slices", () => {
    const writes: StorageData[] = [];
    const store = createBlobStore(fresh(), (n) => writes.push(n));
    store.updateProgress((p) => ({ ...p, "1-read": true }));
    store.updateErrors((e) => [...e, err("chien")]);
    const cur = store.get();
    assert(cur.p["1-read"] === true, "progress survives the later error write");
    assert(cur.err.length === 1, "error is present");
    const last = writes[writes.length - 1];
    assert(
      last.p["1-read"] === true && last.err.length === 1,
      "final persisted blob carries both slices",
    );
  });

  test("error log then progress update preserves both slices", () => {
    const store = createBlobStore(fresh(), () => {});
    store.updateErrors((e) => [...e, err("chat")]);
    store.updateProgress((p) => ({ ...p, "2-build": true }));
    const cur = store.get();
    assert(cur.err.length === 1, "error survives the later progress write");
    assert(cur.p["2-build"] === true, "progress is present");
  });

  test("daily review interleaved with progress preserves both slices", () => {
    const store = createBlobStore(fresh(), () => {});
    store.updateProgress((p) => ({ ...p, "3-quiz": true }));
    store.updateDailyReview(() => ({ date: "2026-07-08", count: 3 }));
    const cur = store.get();
    assert(cur.p["3-quiz"] === true, "progress survives the daily-review write");
    assert(cur.dr.date === "2026-07-08" && cur.dr.count === 3, "daily review is present");
    // Reverse order too.
    const store2 = createBlobStore(fresh(), () => {});
    store2.updateDailyReview(() => ({ date: "2026-07-08", count: 1 }));
    store2.updateProgress((p) => ({ ...p, "4-write": true }));
    const cur2 = store2.get();
    assert(cur2.dr.count === 1, "daily review survives the later progress write");
    assert(cur2.p["4-write"] === true, "progress is present");
  });

  test("daily review interleaved with error log preserves both slices", () => {
    const store = createBlobStore(fresh(), () => {});
    store.updateErrors((e) => [...e, err("livre")]);
    store.updateDailyReview(() => ({ date: "2026-07-08", count: 5 }));
    const cur = store.get();
    assert(cur.err.length === 1, "error survives the daily-review write");
    assert(cur.dr.count === 5, "daily review is present");
    // Reverse order too.
    const store2 = createBlobStore(fresh(), () => {});
    store2.updateDailyReview(() => ({ date: "2026-07-08", count: 2 }));
    store2.updateErrors((e) => [...e, err("porte")]);
    const cur2 = store2.get();
    assert(cur2.dr.count === 2, "daily review survives the later error write");
    assert(cur2.err.length === 1, "error is present");
  });

  test("three interleaved writers all survive (progress + error + daily review)", () => {
    const store = createBlobStore(fresh(), () => {});
    store.updateProgress((p) => ({ ...p, "1-a": true }));
    store.updateErrors((e) => [...e, err("un")]);
    store.updateDailyReview(() => ({ date: "2026-07-08", count: 1 }));
    store.updateProgress((p) => ({ ...p, "1-b": true }));
    const cur = store.get();
    assert(cur.p["1-a"] === true && cur.p["1-b"] === true, "both progress writes survive");
    assert(cur.err.length === 1, "error survives");
    assert(cur.dr.count === 1, "daily review survives");
  });

  test("first-run empty state works and updates from empty", () => {
    const store = createBlobStore(fresh(), () => {});
    const start = store.get();
    assert(Object.keys(start.p).length === 0 && start.err.length === 0 && start.dr.date === "", "starts empty");
    store.updateProgress((p) => ({ ...p, "1-read": true }));
    assert(store.get().p["1-read"] === true, "first update from empty works");
  });

  test("hydrate replaces current without persisting (load path)", () => {
    const writes: StorageData[] = [];
    const store = createBlobStore(fresh(), (n) => writes.push(n));
    store.hydrate({ p: { "9-x": true }, err: [err("stylo")], dr: { date: "2026-01-01", count: 4 } });
    assert(writes.length === 0, "hydrate must not persist (it is a read-back)");
    assert(store.get().p["9-x"] === true, "hydrated value becomes current");
    // A later slice update merges against the hydrated value.
    store.updateProgress((p) => ({ ...p, "9-y": true }));
    const cur = store.get();
    assert(cur.p["9-x"] === true && cur.p["9-y"] === true, "hydrated progress preserved");
    assert(cur.err.length === 1 && cur.dr.count === 4, "hydrated errors + daily review preserved");
  });

  test("Codex P1: a BLOCKED learner mutation never touches current / persist / return", () => {
    const writes: StorageData[] = [];
    let blocked = false;
    const store = createBlobStore(fresh(), (n) => writes.push(n), () => blocked);
    store.updateProgress((p) => ({ ...p, "1-read": true })); // allowed baseline
    const baseline = store.get();
    assert(baseline.p["1-read"] === true && writes.length === 1, "baseline applied + persisted once");

    blocked = true;
    let updaterRan = false;
    const ret = store.update((cur) => {
      updaterRan = true;
      return { ...cur, p: { ...cur.p, "2-blocked": true } };
    });
    assert(!updaterRan, "the updater is NOT invoked while blocked");
    assert(ret === store.get(), "the returned value is the UNCHANGED current");
    assert(store.get().p["2-blocked"] === undefined, "current is not contaminated by a blocked mutation");
    assert(store.get().p["1-read"] === true, "the pre-block baseline is intact");
    assert(writes.length === 1, "persist is NOT called for a blocked mutation");
  });

  test("Codex P1: reopening the gate does not resurrect a blocked mutation", () => {
    const writes: StorageData[] = [];
    let blocked = false;
    const store = createBlobStore(fresh(), (n) => writes.push(n), () => blocked);

    blocked = true;
    store.updateProgress((p) => ({ ...p, "during-delete": true })); // dropped
    store.updateErrors((e) => [...e, err("ghost")]); // dropped
    assert(writes.length < 1 && Object.keys(store.get().p).length === 0 && store.get().err.length === 0, "nothing applied while blocked");

    blocked = false;
    store.updateProgress((p) => ({ ...p, "after-reopen": true })); // legit
    const cur = store.get();
    assert(cur.p["after-reopen"] === true, "the legitimate post-reopen update applies");
    assert(cur.p["during-delete"] === undefined && cur.err.length === 0, "the blocked mutations are NOT resurrected");
    assert(writes.length === 1 && writes[0].p["during-delete"] === undefined, "only the legitimate update is persisted");
  });

  test("Codex P1: ALL learner slice paths (progress/errors/dailyReview) are gated", () => {
    let blocked = true;
    const writes: StorageData[] = [];
    const store = createBlobStore(fresh(), (n) => writes.push(n), () => blocked);
    store.updateProgress((p) => ({ ...p, x: true }));
    store.updateErrors((e) => [...e, err("z")]);
    store.updateDailyReview(() => ({ date: "2026-07-14", count: 5 }));
    const cur = store.get();
    assert(Object.keys(cur.p).length === 0 && cur.err.length === 0 && cur.dr.date === "", "no slice mutated while blocked");
    assert(writes.length === 0, "no persist from any blocked slice path");
  });

  test("Codex P1: internal hydrate/replacement is NOT gated (reset/load path stays functional)", () => {
    let blocked = true;
    const writes: StorageData[] = [];
    const store = createBlobStore(fresh(), (n) => writes.push(n), () => blocked);
    // A reset/load replaces current via hydrate even while learner mutations are blocked.
    store.hydrate({ p: {}, err: [], dr: { date: "", count: 0 } });
    assert(store.get().dr.date === "", "reset via hydrate applies while blocked");
    store.hydrate({ p: { "cloud-ack": true }, err: [], dr: { date: "", count: 0 } });
    assert(store.get().p["cloud-ack"] === true, "acknowledged replacement via hydrate applies while blocked");
    assert(writes.length === 0, "hydrate still never persists (unchanged behavior)");
  });

  test("Codex P1: an ALLOWED mutation is unchanged — updater once, current once, persist once", () => {
    const writes: StorageData[] = [];
    const store = createBlobStore(fresh(), (n) => writes.push(n), () => false);
    let runs = 0;
    const ret = store.update((cur) => {
      runs += 1;
      return { ...cur, p: { ...cur.p, ok: true } };
    });
    assert(runs === 1, "updater runs exactly once");
    assert(ret === store.get() && store.get().p.ok === true, "return is the new current");
    assert(writes.length === 1 && writes[0].p.ok === true, "persist receives the new value exactly once");
  });

  test("Codex P1: no predicate (default) → never blocked (existing callsites unaffected)", () => {
    const writes: StorageData[] = [];
    const store = createBlobStore(fresh(), (n) => writes.push(n)); // 2-arg form
    store.updateProgress((p) => ({ ...p, ok: true }));
    assert(store.get().p.ok === true && writes.length === 1, "the 2-arg form behaves exactly as before");
  });

  test("PR-A guard not regressed: empty write while corrupt is skipped, meaningful persists", () => {
    // Model useStorage's persist guard: skip empty/default writes while the
    // original key is still corrupt; a meaningful write clears the guard.
    let corruptUnrecovered = true;
    const persisted: StorageData[] = [];
    const guardedPersist = (next: StorageData) => {
      const meaningful =
        Object.keys(next.p).length > 0 || next.err.length > 0 || next.dr.date !== "";
      if (corruptUnrecovered && !meaningful) return;
      if (meaningful) corruptUnrecovered = false;
      persisted.push(next);
    };
    const store = createBlobStore(fresh(), guardedPersist);
    store.updateProgress((p) => ({ ...p })); // still empty → guarded, no write
    const afterEmpty = persisted.length;
    assert(afterEmpty === 0, "empty update while corrupt must not persist (PR-A preserved)");
    store.updateProgress((p) => ({ ...p, "1-read": true })); // meaningful → persists
    const afterMeaningful = persisted.length;
    assert(afterMeaningful === 1, "meaningful update persists and clears the guard");
    assert(persisted[0].p["1-read"] === true, "persisted blob carries the real update");
  });
});
