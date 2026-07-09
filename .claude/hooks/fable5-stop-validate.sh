#!/usr/bin/env bash
# fable5-stop-validate.sh — Claude Code Stop hook for the Le Mot repo.
#
# Purpose: stop the assistant from claiming "done/complete" while required
# validation is failing, after it changed repo code/content. It runs the
# project's own validation suite (never a generic guess) and only the subset
# relevant to what actually changed. On failure it blocks the stop (exit 2);
# stderr is fed back to the assistant so it must fix and re-verify.
#
# Design choices (kept deliberately small and non-fragile):
#  - Changed files are inferred from git (working tree + unpushed commits). If
#    that inference is empty or the environment can't validate (no npm, no
#    lemot-app), the hook prefers ALLOWING the stop over trapping the session.
#  - Docs-only / .claude-only changes never trigger validation.
#  - A per-session block counter bounds any block loop to MAX_BLOCKS attempts,
#    then relents (prints the failures loudly and allows the stop) so an
#    unfixable failure can never wedge the session forever.

MAX_BLOCKS=3

# --- read the Stop hook JSON payload from stdin (we only need session_id) ---
input=$(cat)
session_id=$(printf '%s' "$input" \
  | sed -n 's/.*"session_id"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' \
  | head -n1)
[ -z "$session_id" ] && session_id="nosession"

# --- locate the repo root robustly, regardless of the hook's cwd ---
REPO_ROOT="${CLAUDE_PROJECT_DIR:-}"
if [ -z "$REPO_ROOT" ]; then
  script_dir=$(cd "$(dirname "$0")" && pwd)
  REPO_ROOT=$(cd "$script_dir/../.." && pwd)
fi

# Nothing to validate if this isn't a git repo we can read.
git -C "$REPO_ROOT" rev-parse --git-dir >/dev/null 2>&1 || exit 0

# --- collect the set of changed files (repo-root-relative paths) ---
# 1) working tree: staged + unstaged + untracked (respects .gitignore)
# 2) committed-but-unpushed, when an upstream exists
changed_files() {
  git -C "$REPO_ROOT" status --porcelain --untracked-files=all 2>/dev/null \
    | while IFS= read -r line; do
        path="${line:3}"
        # renames show as "old -> new"; keep the new path
        case "$path" in *" -> "*) path="${path##* -> }";; esac
        printf '%s\n' "$path"
      done
  if git -C "$REPO_ROOT" rev-parse --abbrev-ref --symbolic-full-name @{u} >/dev/null 2>&1; then
    git -C "$REPO_ROOT" diff --name-only '@{u}..HEAD' 2>/dev/null
  fi
}

files=$(changed_files | sed '/^$/d' | sort -u)

# --- gate: only lemot-app code/content changes require validation ---
# (.md docs, docs/**, and .claude/** never trigger the suite)
code_content=$(printf '%s\n' "$files" | grep -E '^lemot-app/' | grep -viE '\.md$' || true)
if [ -z "$code_content" ]; then
  rm -f "${TMPDIR:-/tmp}/claude-fable5-stop-${session_id}.count"
  exit 0
fi

# --- conditional triggers, keyword-matched against the changed paths ---
# learning-engine tests: engine modules, their tests, and the scoring/progress/
# review/practice/error/lexique/migration/telemetry logic the tests cover.
le_hit=$(printf '%s\n' "$files" | grep -iE \
  'content/learning-engine/|scripts/tests/|scoring|progress|review|practice-selector|error-engine|lexique|migration|telemetry|reviewscore|usesrs|useerrors|uselessonprogress|carryover|compaction|derive-drill' \
  || true)

# pool validator: its inputs (data/lessons, data/pools, data/flashcards),
# the validator/generation scripts, and the shipped manifests.
pool_hit=$(printf '%s\n' "$files" | grep -iE \
  'data/pools/|data/lessons/|data/flashcards|validatepools|pool|manifest|shipped-item-ids|shipped-error-tags|shippeditemids|shippederrortags|pool_generation' \
  || true)

# --- run the suite from lemot-app; never trap on missing tooling ---
cd "$REPO_ROOT/lemot-app" 2>/dev/null || {
  >&2 echo "[fable5-stop] lemot-app/ not found; cannot validate, allowing stop."
  exit 0
}
command -v npm >/dev/null 2>&1 || {
  >&2 echo "[fable5-stop] npm not on PATH; cannot validate, allowing stop."
  exit 0
}

fails=""
add_fail() {
  fails="${fails}
=== $1 ===
$2
"
}
run_check() {
  label="$1"; script="$2"
  out=$(npm run "$script" 2>&1)
  rc=$?
  if [ "$rc" -ne 0 ]; then
    add_fail "$label (npm run $script -> exit $rc)" "$(printf '%s\n' "$out" | tail -n 40)"
  fi
}

# Always required after code/content changes.
run_check "typecheck" typecheck
run_check "validate:content" validate:content
# Conditionally required.
[ -n "$le_hit" ]   && run_check "test:learning-engine" test:learning-engine
[ -n "$pool_hit" ] && run_check "validate:pools" validate:pools

state_file="${TMPDIR:-/tmp}/claude-fable5-stop-${session_id}.count"

# All green -> clear counter, allow stop.
if [ -z "$fails" ]; then
  rm -f "$state_file"
  exit 0
fi

# Failures present -> bounded blocking so a loop can't wedge the session.
n=0
[ -f "$state_file" ] && n=$(cat "$state_file" 2>/dev/null || echo 0)
n=$((n + 1))

if [ "$n" -gt "$MAX_BLOCKS" ]; then
  rm -f "$state_file"
  >&2 echo "[fable5-stop] Validation STILL failing after ${MAX_BLOCKS} blocked attempts."
  >&2 echo "[fable5-stop] Allowing stop to avoid a loop — MANUAL FIX REQUIRED:"
  >&2 printf '%s\n' "$fails"
  exit 0
fi

echo "$n" > "$state_file"
>&2 echo "[fable5-stop] BLOCKING: required validation is failing after repo changes (attempt ${n}/${MAX_BLOCKS})."
>&2 echo "[fable5-stop] Do not claim done. Fix these, then let validation pass:"
>&2 printf '%s\n' "$fails"
exit 2
