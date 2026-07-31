#!/usr/bin/env bash
# Project wrapper: skill-check app + lib (excludes .cursor, node_modules by path).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CHECK="${ROOT}/.cursor/skills/petro-code-standards/skill-check.sh"

if [[ ! -x "${CHECK}" && -f "${CHECK}" ]]; then
  chmod +x "${CHECK}"
fi

failures=0

for path in app lib; do
  echo "== skill-check ${path}"
  if ! SCOPE="${ROOT}/${path}" UI_ROOT="${ROOT}/${path}" bash "${CHECK}"; then
    failures=1
  fi
  echo ""
done

exit "${failures}"
