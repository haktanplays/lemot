#!/usr/bin/env bash
#
# android-smoke.sh — repo-local helper for routine Android visual smoke tests.
#
# Purpose: replace ad hoc Bash blocks (export ANDROID_HOME=..., export PATH=...,
# inline `adb shell input ...`, and `adb exec-out screencap -p > /tmp/...`
# redirections) with a single, permission-friendly command. Routine emulator
# interactions go through this wrapper so Claude Code can be allow-listed on the
# specific subcommands instead of pausing on shell expansion every time.
#
# Safe subcommands only:
#   tap X Y               tap at integer screen coordinates
#   text TEXT             type TEXT (spaces auto-converted to %s for `input text`)
#   key KEYCODE           send a keyevent (number or KEYCODE_* name)
#   screenshot NAME       save /tmp/lemot_final/NAME.png via screencap
#   devices               list attached devices/emulators
#   sleep SECONDS         wait SECONDS (host sleep)
#
# Intentionally does NOT support arbitrary `adb shell`, package/file management,
# uninstall, reboot, or any other destructive adb operation.
#
# Usage examples:
#   ./scripts/dev/android-smoke.sh devices
#   ./scripts/dev/android-smoke.sh tap 770 1200
#   ./scripts/dev/android-smoke.sh text "a coffee"
#   ./scripts/dev/android-smoke.sh tap 170 2270
#   ./scripts/dev/android-smoke.sh key KEYCODE_ENTER
#   ./scripts/dev/android-smoke.sh sleep 2
#   ./scripts/dev/android-smoke.sh screenshot 5_beat2_typed

set -euo pipefail

# Default Android SDK location (homebrew android-commandlinetools), only if unset.
: "${ANDROID_HOME:=/opt/homebrew/share/android-commandlinetools}"
export ANDROID_HOME
export PATH="${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/emulator:${PATH}"

# Screenshots only ever land here.
SHOT_DIR="/tmp/lemot_final"

usage() {
  cat >&2 <<'EOF'
android-smoke.sh — routine Android visual smoke helper

Subcommands:
  tap X Y               tap at integer coordinates
  text TEXT             type TEXT (spaces -> %s automatically)
  key KEYCODE           send a keyevent (number or KEYCODE_* name)
  screenshot NAME       save /tmp/lemot_final/NAME.png
  devices               list attached devices/emulators
  sleep SECONDS         wait SECONDS

Rejected: unknown subcommands and screenshot names with slashes or metacharacters.
EOF
}

die() {
  echo "android-smoke: $*" >&2
  exit 2
}

[ "$#" -ge 1 ] || { usage; exit 2; }

cmd="$1"
shift

case "$cmd" in
  tap)
    [ "$#" -eq 2 ] || die "tap requires exactly: X Y"
    x="$1"; y="$2"
    [[ "$x" =~ ^[0-9]+$ ]] || die "tap X must be a non-negative integer (got: $x)"
    [[ "$y" =~ ^[0-9]+$ ]] || die "tap Y must be a non-negative integer (got: $y)"
    exec adb shell input tap "$x" "$y"
    ;;

  text)
    [ "$#" -ge 1 ] || die "text requires the text to type"
    # Join all remaining args with spaces, then convert spaces to %s so callers
    # can pass normal quoted text ("a coffee") instead of writing a%scoffee.
    raw="$*"
    encoded="${raw// /%s}"
    exec adb shell input text "$encoded"
    ;;

  key)
    [ "$#" -eq 1 ] || die "key requires exactly one KEYCODE"
    code="$1"
    [[ "$code" =~ ^[A-Z0-9_]+$ ]] || die "key must be a number or KEYCODE_* name (got: $code)"
    exec adb shell input keyevent "$code"
    ;;

  screenshot)
    [ "$#" -eq 1 ] || die "screenshot requires exactly one NAME"
    name="$1"
    # Reject slashes, shell metacharacters, and path-traversal names.
    [[ "$name" =~ ^[A-Za-z0-9._-]+$ ]] || die "screenshot NAME may only contain [A-Za-z0-9._-] (got: $name)"
    [ "$name" != "." ] && [ "$name" != ".." ] || die "screenshot NAME may not be . or .."
    case "$name" in
      *.png) file="$name" ;;
      *)     file="${name}.png" ;;
    esac
    mkdir -p "$SHOT_DIR"
    adb exec-out screencap -p > "${SHOT_DIR}/${file}"
    echo "${SHOT_DIR}/${file}"
    ;;

  devices)
    [ "$#" -eq 0 ] || die "devices takes no arguments"
    exec adb devices
    ;;

  sleep)
    [ "$#" -eq 1 ] || die "sleep requires exactly one SECONDS value"
    secs="$1"
    [[ "$secs" =~ ^[0-9]+(\.[0-9]+)?$ ]] || die "sleep SECONDS must be a non-negative number (got: $secs)"
    exec sleep "$secs"
    ;;

  *)
    die "unknown subcommand: $cmd (allowed: tap, text, key, screenshot, devices, sleep)"
    ;;
esac
