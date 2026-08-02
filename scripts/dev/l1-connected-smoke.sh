#!/usr/bin/env bash
#
# l1-connected-smoke.sh — PR-12 operator preflight for the L1 connected smoke.
#
# Runs the AUTOMATED code-side gate (typecheck, learning-engine suite including
# scripts/tests/l1ConnectedSmoke.test.ts, content and pool validators) and then
# checks for an attached Android target via the existing android-smoke.sh
# helper. It does NOT replace android-smoke.sh and it drives no UI itself —
# the manual path lives in
# docs/workstreams/L1_CONNECTED_ANDROID_SMOKE_RUNBOOK_v0.1.md.
#
# HONESTY CONTRACT (printed, never inferred):
#   - CODE-SIDE SMOKE: PASS only when every automated command exits 0.
#   - ANDROID OPERATOR SMOKE: PENDING whenever no device/emulator is attached
#     or the manual runbook was not executed. A missing device is NEVER a pass
#     and NEVER a failure. Only a human operator completing the runbook may
#     record ANDROID PASS/FAIL, in the runbook's result table.
#
# Usage (from the repo root):
#   ./scripts/dev/l1-connected-smoke.sh

set -uo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
APP="$ROOT/lemot-app"
SMOKE="$ROOT/scripts/dev/android-smoke.sh"

echo "== L1 connected smoke — operator preflight =="
echo "-- repo state --"
git -C "$ROOT" status --short
git -C "$ROOT" rev-parse HEAD

code_side=PASS
run_gate() {
  echo "-- $* --"
  if ! (cd "$APP" && "$@"); then
    code_side=FAIL
    echo "GATE FAILED: $*"
  fi
}

run_gate npm run typecheck
run_gate npm run test:learning-engine
run_gate npm run validate:content
run_gate npm run validate:pools

echo ""
echo "== CODE-SIDE SMOKE: ${code_side} =="
if [ "$code_side" != "PASS" ]; then
  echo "Fix the failing automated gate before any device run. ANDROID OPERATOR SMOKE: PENDING"
  exit 1
fi

echo ""
echo "-- android target detection (via android-smoke.sh devices) --"
device_line=""
if devices_out="$("$SMOKE" devices 2>&1)"; then
  echo "$devices_out"
  # `adb devices` lists attached targets as "<serial>\tdevice" after the header.
  device_line="$(printf '%s\n' "$devices_out" | awk 'NR>1 && $2=="device" {print $1; exit}')"
else
  echo "$devices_out"
fi

if [ -n "$device_line" ]; then
  echo ""
  echo "Android target attached: $device_line"
  echo "ANDROID OPERATOR SMOKE: NOT RUN YET — execute the manual runbook now:"
  echo "  docs/workstreams/L1_CONNECTED_ANDROID_SMOKE_RUNBOOK_v0.1.md"
  echo "Record PASS/FAIL per checkpoint in the runbook's result table."
else
  echo ""
  echo "No Android device/emulator attached (adb absent or list empty)."
  echo "ANDROID OPERATOR SMOKE: PENDING"
fi
