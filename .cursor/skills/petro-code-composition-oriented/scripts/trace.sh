#!/usr/bin/env bash
# Printed when this skill fires, so the run's terminal log proves it was applied.
# Self-identifies from its own path: one identical copy works in every skill.
set -euo pipefail
SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILL_NAME="$(basename "$SKILL_DIR")"
echo "[skill-trace] $SKILL_NAME fired @ $(date '+%Y-%m-%d %H:%M:%S')"
# Optional persistent history — uncomment to also append to a log you can tail:
# echo "$(date '+%Y-%m-%dT%H:%M:%S') $SKILL_NAME" >> "$HOME/.cursor/skill-trace.log"
