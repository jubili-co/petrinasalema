---
name: deferred-work
description: >-
  Time-bound leftover work in TECHNICAL_DEBT.md. Use at the start of every
  coding task, and when shipping temporary redirects, flags, deprecations, or
  anything that must be removed later.
---

# Deferred work

Read and follow [`TECHNICAL_DEBT.md`](../../../TECHNICAL_DEBT.md). That file is the protocol and the register.

- Start of a coding task: scan **Open** items. Close ripe ones when adjacent, or when the edit is small and confined to the item’s files.
- If `done_when` fails, bump `review_after` and set `last_checked`. Do not remove the code.
- If you ship work that must disappear later: add a `TD-NNN` item and a matching comment at the code site before you finish. Chat is not a reminder.
