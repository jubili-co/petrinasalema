#!/usr/bin/env bash
# Petro skill-check — greps skills govern that lint may not cover.
# Wire as `"skill-check": "bash scripts/skill-check.sh"` (project wrapper) or call directly.
# Exit 0 when greps are clean in scope; exit 1 when hits remain (review each hit before silencing).

set -euo pipefail

resolve_rg() {
  if [[ -n "${RG:-}" && -x "${RG}" ]]; then
    printf '%s\n' "${RG}"
    return
  fi
  if command -v rg >/dev/null 2>&1; then
    command -v rg
    return
  fi
  echo "skill-check: ripgrep (rg) required — install or set RG" >&2
  exit 127
}

RG_BIN="$(resolve_rg)"
export PATH="$(dirname "${RG_BIN}"):${PATH}"

SCOPE="${SCOPE:-.}"
UI_ROOT="${UI_ROOT:-.}"

echo "skill-check scope=${SCOPE} ui_root=${UI_ROOT}"

hits=0

run_grep() {
  local label="$1"
  shift
  echo "--- ${label}"
  local output
  output=$("$@" 2>/dev/null || true)
  if [[ -n "${output}" ]]; then
    echo "${output}" | head -80
  fi
  local count=0
  if [[ -n "${output}" ]]; then
    count=$(echo "${output}" | wc -l | tr -d ' ')
  fi
  if [[ "${count}" -gt 0 ]]; then
    echo "(${count} hits — review each in scope; fix or justify)"
    hits=$((hits + count))
  else
    echo "(clean)"
  fi
}

run_grep "binding-site subclauses in JSX props" \
  rg 'prop=\{[^}]*\([^)]*\(' "${UI_ROOT}" --glob '*.{tsx,jsx}'

run_grep "inline JSX arrow callbacks" \
  rg '=\{\s*\(\w+\)\s*=>' "${UI_ROOT}" --glob '*.{tsx,jsx}' --glob '!**/_design-system/**'

run_grep "data-id string interpolation (static literals only)" \
  rg 'data-id=\{`' "${UI_ROOT}" --glob '*.{tsx,jsx}'

run_grep "repeated parse/validation stems (manual: 2+ reads → destructure)" \
  rg '\.(data|payload|result|value|body)\.\w+' "${SCOPE}" --glob '*.{ts,tsx}'

run_grep "let bindings (review pick-accumulators)" \
  rg 'let \w+ = ' "${SCOPE}" --glob '*.{ts,tsx}'

run_grep "conditional spread in object literals" \
  rg '\.\.\.\([^)]*(\?|&&)' "${SCOPE}" --glob '*.{ts,tsx}'

if [[ "${hits}" -gt 0 ]]; then
  echo ""
  echo "skill-check: ${hits} total hits — walk [petro-code-standards § skill-check](SKILL.md#skill-check-run-before-gate)"
  exit 1
fi

echo "skill-check: clean"
