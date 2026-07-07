/**
 * Telemetry funnel report (roadmap Taş 0: "telemetri ilk kez sayı verir").
 *
 * Run:
 *   npm run telemetry:report -- <exported-log.json>
 *
 * Input: a JSON file exported from the device — either a raw array of
 * TelemetryEvent or an envelope { version, events }. Pure read + print:
 * no storage writes, no network, deterministic for identical input.
 * Fail-closed: unreadable file or shape exits 1 with a message; no partial
 * report is printed.
 */
import { readFileSync } from "node:fs";
import {
  lessonCompletionCounts,
  perScreenSeenCounts,
  weaveAttemptCounts,
  type TelemetryEvent,
} from "../content/learning-engine/telemetry";

const file = process.argv[2];
if (!file) {
  console.error("usage: npm run telemetry:report -- <exported-log.json>");
  process.exit(1);
}

let events: TelemetryEvent[];
try {
  const parsed: unknown = JSON.parse(readFileSync(file, "utf8"));
  const candidate = Array.isArray(parsed)
    ? parsed
    : parsed && typeof parsed === "object" && Array.isArray((parsed as { events?: unknown }).events)
      ? (parsed as { events: unknown[] }).events
      : null;
  if (!candidate || !candidate.every((e) => e && typeof e === "object" && typeof (e as TelemetryEvent).type === "string")) {
    throw new Error("expected a TelemetryEvent[] or { events: TelemetryEvent[] }");
  }
  events = candidate as TelemetryEvent[];
} catch (err) {
  console.error(`telemetry:report: cannot read "${file}": ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
}

console.log(`Telemetry report — ${events.length} event(s)\n`);

const byType = new Map<string, number>();
for (const e of events) byType.set(e.type, (byType.get(e.type) ?? 0) + 1);
console.log("Events by type:");
for (const [type, n] of [...byType.entries()].sort()) console.log(`  ${type}: ${n}`);

console.log("\nLesson funnel (started -> completed):");
const funnel = lessonCompletionCounts(events);
const rows = Object.entries(funnel).sort(([a], [b]) => (a < b ? -1 : 1));
if (rows.length === 0) console.log("  (no lesson events)");
for (const [lessonId, row] of rows) {
  const r = row as { started: number; completed: number };
  const pct = r.started > 0 ? Math.round((r.completed / r.started) * 100) : 0;
  console.log(`  ${lessonId}: ${r.started} started, ${r.completed} completed (${pct}%)`);
}

console.log("\nScreens seen per lesson (drop-off scan):");
const screens = perScreenSeenCounts(events);
const lessonIds = Object.keys(screens).sort();
if (lessonIds.length === 0) console.log("  (no screen events)");
for (const lessonId of lessonIds) {
  console.log(`  ${lessonId}:`);
  for (const [screenId, n] of Object.entries(screens[lessonId]).sort(([a], [b]) => (a < b ? -1 : 1))) {
    console.log(`    ${screenId}: ${n}`);
  }
}

console.log("\nWeave attempts:");
const weave = weaveAttemptCounts(events);
const weaveRows = Object.entries(weave).sort(([a], [b]) => (a < b ? -1 : 1));
if (weaveRows.length === 0) console.log("  (no weave events)");
for (const [lessonId, n] of weaveRows) console.log(`  ${lessonId}: ${n}`);
