---
name: petro-code-composition-oriented
description: >-
  Platonic module names, purpose-scoped props, and JSX shapes A–E for branching UI.
  Read petro-code-fractal-orchestration first (layering, binding sites, module namespace).
  Use for platonic renames, duplicated early-return JSX, shell/tier/polymorphic picks, call-site bridges.
  Triggers: composition-oriented, platonic components, context-heavy component names, shapes A–E, prop subclauses.
---

## Trace
Before anything else when this skill applies, run its `scripts/trace.sh`. It prints a `[skill-trace]` line so the run's terminal log shows the skill fired.
<!-- skill-trace-block -->


# Petro code — composition-oriented

**Scope:** **UI refactors only** — platonic naming, purpose props, and **which JSX shape** (A–E) fits. Does **not** own export layering, file order, or `getJobDescription` / `SignOut` canon.

**Read first:** **[petro-code-fractal-orchestration/SKILL.md](../petro-code-fractal-orchestration/SKILL.md)** for any exported entry (FC, action, handler). Layering canon lives there — [examples.md §1–2](../petro-code-fractal-orchestration/examples.md).

**Also:** **[petro-code-standards/SKILL.md](../petro-code-standards/SKILL.md)** — gate, Conditional JSX, `cn()`, non-JSX two-way picks (never contradict).

**Narrative examples (this skill):** [examples.md](examples.md) — drawer arc (shape A), `JobControlIcon` (B + C), `WrappableFilename`, `LogVendorMatchValue` selectors.

---

## Agent contract (read before writing or refactoring)

1. **Name the platonic ideal** — one sentence: “This module essentially …” If the sentence mentions a parent (`SplitButton`, `Dashboard`, `primaryLeading`), the name is probably wrong.
2. **List what varies** — copy? optional blocks? component _type_ with identical props? unrelated element trees?
3. **Pick a composition shape** (below) — do **not** default to “one fragment + three `&&` branches.”
4. **Scope props to this module’s job** — purpose names at the child boundary; **minimal assumptions** on the caller ([epistemic humility](../petro-code-fractal-orchestration/SKILL.md#epistemic-humility): widest honest input type, no unused parent/transport/route context — `runs`, not `serverRuns`, on `JobTile`). **Bridge at the call site** with **one identifier per prop** (`runs={serverRuns}`) — never conditional spread or nested calls in JSX attrs ([binding sites](../petro-code-fractal-orchestration/SKILL.md#binding-sites--no-subclauses-hard)).
5. **Place standalone concepts** in shared folders (`app/_components/JobControlIcon.tsx`), not buried under the first consumer.
6. **Layering** — fractal skill owns orchestrator-on-top, helpers below, `const` facts (read before this file on any export).
7. **Ternary vs guard in string selectors** — trivial two-way string/null → `return pred ? a : b`; guard + pipeline → `if` + statements (petro **Non-JSX two-way picks**; see `LogVendorMatchValue` below).
8. **Self-review** (end of this file) before stop.

---

## Platonic module ideal

A module should approximate **one essential idea** in the codebase — its _platonic_ role:

| Ask                                    | Good signal                                 | Bad signal                                             |
| -------------------------------------- | ------------------------------------------- | ------------------------------------------------------ |
| What is it essentially?                | “Job control glyph: pending / stop / start” | “Leading icon for the run-job split primary”           |
| Could another parent use it unchanged? | Yes → generic name + shared path            | Name embeds first parent only                          |
| Do props describe **its** inputs?      | `cancelable`, `hintJobId`, `isResumable`    | `showResume`, `jobId`, `primaryLeading` on the child   |
| Does the file name match the export?   | `JobControlIcon` → `JobControlIcon`         | `RunJobSplitPrimaryLeading` in `run-job-split-button/` |

**Naming:** noun phrase for the **artifact** (`JobControlIcon`, not `RunJobSplitPrimaryLeading`), not the **slot** (`PrimaryLeading`, `DrawerFooter`) or **feature wiring** (`RunJobSplit*` on a generic icon). String-only modules: same rule — see fractal canon `getJobDescription`.

**Scoping:** parent keeps orchestration vocabulary (`showCancel`, `busy`, `fromScratchJobId`); child keeps **purpose** vocabulary (`cancelable`, `running`, `hintJobId`). One-line bridge documents the mapping.

**Call-site bridge (HARD):** A bridge is **visible** — `prop={name}` where `name` is a `const` from the orchestrator, a prop, or a trivial `latest ?? undefined`. It is **not** hidden policy:

| Bridge (OK)                                                | Not a bridge (subclause — fractal extract)                             |
| ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| `stats={folderStats}`                                      | `{...(folderStats ? { stats: folderStats } : {})}`                     |
| `drawerDescription={getJobDescription(jobId, showResume)}` | `stopJobId={getStopJobIdForLiveRun(getLiveRunForJobFamily(…), jobId)}` |
| `isResumable={showResume}`                                 | `{...(latest ? { lastRun: map(latest) } : {})}`                        |

If the parent derives more than one fact for a child, put derivation in the orchestrator `const` block or a co-located `*Service.ts` — same rule as [fractal binding sites](../petro-code-fractal-orchestration/SKILL.md#binding-sites--no-subclauses-hard). Thin wrappers that only render one child are still orchestrators when they derive.

**Encapsulation (with fractal):** A platonic module is a **namespace** — like speech in a known topic, omit repeated words. Export + file name set the topic; **orchestrator `const` bindings and unexported helpers** use the **shortest** fact names (`parts`, `live`, `getHint`, param `id`) — not callee stems (`summaryParts` from `runSummarySubtitleParts`). Add syllables only for repo grep ([module namespace](../petro-code-fractal-orchestration/SKILL.md#module-namespace-encapsulation) — long private names are a smell). Do not export helpers “for convenience.”

**Functions:** purpose names at the **export** boundary only; private helpers must not repeat parent or module stems (`getHint(id)` in `getJobDescription.ts`, not `fromScratchHint(fromScratchJobId)`).

---

## Composition-oriented (core idea)

Separate **what to show** (values, flags, component type) from **how to show it** (stable shell).

```
Inputs → compute slices → ONE presentation pattern
         ↑ strings / flags / Component reference — not buried in duplicate JSX trees
```

| Layer            | Responsibility                                                         |
| ---------------- | ---------------------------------------------------------------------- |
| **Orchestrator** | Destructure; gate optionals; call selectors; return using chosen shape |
| **Selectors**    | `string`, config, `const Icon = …` — **no JSX trees** in selectors     |
| **Shell**        | Single tree, or tiered returns when tiers are structurally different   |

This is **structured** logic: a reader sees inputs → derived state → render, without simulating three copy-pasted `return` blocks. **Orchestrator / selector file order** → fractal skill (not repeated here).

---

## Prerequisite — fractal orchestration

**[petro-code-fractal-orchestration/SKILL.md](../petro-code-fractal-orchestration/SKILL.md)** owns essential sentences, `const` facts, extract signals, and layering canon (`getJobDescription`, `SignOut`). Read it before applying shapes A–E.

**Orthogonal concerns:**

| petro-code-fractal-orchestration                              | petro-code-composition-oriented (this file)      |
| ------------------------------------------------------------- | ------------------------------------------------ |
| Zoom levels, `const` facts, extract signals, module namespace | Platonic names, purpose props at export boundary |
| Unexported file-local helpers                                 | JSX shapes A–E, paired `&&`, tiers               |
| Selectors = derivation (no JSX)                               | Shell vs tier vs polymorphic `Icon`              |

React FCs need **both**: fractal `const` slices at the top of the FC, then composition shape for the return tree.

---

## Choose a composition shape (required)

| Shape                      | When                                                                              | Pattern                                                |
| -------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------ |
| **A. Unified shell**       | Same wrapper/fragment; varies **text** or optional **slots**                      | `const x = …; return <>{a}{b}</>`; string selectors    |
| **B. Tiered return**       | Outcomes are **different node kinds**; often the **whole FC** is the fork         | `if (tierA) return <A />;` then `return <B />`         |
| **C. Polymorphic slot**    | Same JSX props; only **which component** changes                                  | `const Icon = flag ? Square : Play; return <Icon … />` |
| **D. Paired `&&`**         | Binary fork is **one slot** inside a **larger** return (other siblings / wrapper) | `{a && <TreeA />}{!a && <TreeB />}` per petro          |
| **E. Sibling `FC` slices** | Long JSX copy with inline DS primitives                                           | `{inbox && <InboxCopy />}{!inbox && <FolderCopy />}`   |

**Decision shortcut:**

- Duplicated **same fragment** + different strings → **A**
- `Spinner` vs `Play`/`Square` with shared icon classes → **B** then **C** (see `JobControlIcon`)
- Duplicated **className** on two icons only → **C**, not three `&&` siblings
- **Leaf FC:** body is only “A or B” (link vs label, no other JSX) → **B** (early return), not **D**
- **Orchestrator:** same `return` also renders chrome around the fork → **D** (paired `&&` in parent)
- Rich copy with `<Code>` etc. → **E** or **A** with sibling FCs

**Anti-mechanical rule:** If **B + C** is shorter and avoids repeating `className="size-4 …"` twice, do **not** force **D** or a unified fragment just because the skill says “one shell.”

**Anti-mechanical rule:** Do **not** wrap a leaf binary fork in `<> {a && …}{!a && …} </>` when nothing else shares that return — use **B** instead (`WrappableFilename`).

---

## Shape A — unified shell (copy / optional blocks)

Same wrapper/fragment; only **text** or optional **slots** change. **Presence:** `optional && selector(optional)` — never variant without presence. Selectors stay non-JSX (fractal layering).

**Layering canon (not duplicated here):** [fractal examples §1 — `getJobDescription`](../petro-code-fractal-orchestration/examples.md) → [getJobDescription.ts](../../../app/_components/getJobDescription.ts). **Shape A narrative (before/after):** [examples.md — drawer arc](examples.md#a-drawer-description--unified-shell--string-selectors).

---

## String selectors — ternary vs guard (`LogVendorMatchValue`)

Copy/format helpers are **selectors** (non-JSX). They belong **below** the FC that consumes them. How you branch inside a selector follows petro **Non-JSX two-way picks** — not “always `if`/`return`” and not “always ternary.”

### When to use a one-line ternary

All of these must hold (see petro-code-standards for the full rule):

| #   | Condition                                                                                                        |
| --- | ---------------------------------------------------------------------------------------------------------------- |
| 1   | **Exactly two** outcomes (string, `null`, or one map lookup)                                                     |
| 2   | **Non-JSX** — no element trees                                                                                   |
| 3   | **Trivial** — each branch is one expression (a **leaf** formatter like `formatPercent(x)` in one branch is fine) |
| 4   | **The whole function is the pick** — no further named steps after choosing                                       |

```ts
function getNearestPart(scoreLabel: string, nearestHandle: string | null): string {
  return nearestHandle ? `best: ${nearestHandle} · ${scoreLabel}` : `best ${scoreLabel}`;
}

function getScoreLabel(vendorMatchScore: number | null): string | null {
  return vendorMatchScore === null ? null : formatPercent(vendorMatchScore);
}
```

**Why:** dual `if`/`return` hides that the function _is_ a single decision. The orchestrator already reads as `const scoreLabel = getScoreLabel(…)` — selectors should be equally dense.

### When to keep `if` + statements (not a ternary)

| Situation                                                        | Example                                                                                        |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Guard + pipeline** — after the branch you run more named steps | `describeNearMiss`: null → fixed string; else `getNearestPart` → `appendThresholdLabel`        |
| **Either branch is JSX**                                         | Use shape **B** / **D** / **C**, not a string ternary                                          |
| **3+ outcomes**                                                  | Early-return `function` or small `switch`                                                      |
| **Nested `? :`**                                                 | Forbidden — flatten with `if` or extract helpers                                               |
| **Branch calls a non-trivial helper**                            | e.g. `return cond ? wouldSaveOutcomeLabel(jobId) : MAP[k]` → early-return `function` per petro |

```ts
function describeNearMiss(
  scoreLabel: string | null,
  thresholdLabel: string | null,
  nearestHandle: string | null
): string {
  if (scoreLabel === null) {
    return 'no candidates ranked';
  }

  const nearestPart = getNearestPart(scoreLabel, nearestHandle);

  return appendThresholdLabel(nearestPart, thresholdLabel);
}
```

**Why:** a ternary here would cram a multi-step pipeline into one unreadable line. The `if` is a **guard**, not a symmetric “A or B string” pick.

### Orchestrator vs selector

The FC may call selectors and use **inline** ternaries for trivial orchestration (`pillTone`, `pillLabel`). Do not inflate the FC with `if`/`return` per label when a one-line selector or ternary already names the decision.

**Canonical:** [LogVendorMatchValue.tsx](<../../../app/(operator)/runs/[runId]/LogVendorMatchValue.tsx>)

---

## Shape B — leaf binary choice (`WrappableFilename`)

**Essence:** show a filename as link or plain label — the module’s **entire** output is that pick.

When the FC has **no other siblings** in the return, early return states mutual exclusivity directly. Paired `&&` inside an empty fragment adds a wrapper and a negated twin (`!href`) without buying a shared parent.

```tsx
export const WrappableFilename: FC<Props> = ({ message, href, … }) => {
  if (href) {
    return (
      <TextLink href={href} …>
        {message}
      </TextLink>
    );
  }

  return (
    <Label … title={message}>
      {message}
    </Label>
  );
};
```

| Use **B** (early return) here               | Use **D** (paired `&&`) in the parent instead |
| ------------------------------------------- | --------------------------------------------- |
| Whole file is link vs label                 | Row also renders time, pills, actions         |
| Different components / `data-id` per branch | Single layout wrapper must wrap both branches |
| No fragment-only “shell” around the fork    | Fork is one column/slot among several         |

**Call site:** `LogRowFilename` stays thin — it passes props into `WrappableFilename`; the fork lives in the platonic leaf.

**Canonical:** [WrappableFilename.tsx](../../../app/_components/WrappableFilename.tsx)

---

## Shape B + C — tiered + polymorphic (`JobControlIcon`)

**Essence:** glyph for job control state — pending, cancellable (stop), or start — not “split button leading.”

```tsx
export const JobControlIcon: FC<Props> = ({ running, cancelable }) => {
  if (running) {
    return <Spinner />;
  }

  const Icon = cancelable ? Square : Play;

  return <Icon className="size-4 fill-current" aria-hidden />;
};
```

| Stage                                                | Problem                                                                                            |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Original `RunJobSplitPrimaryLeading`                 | Name + path tied to split button and slot; duplicated early returns for resume/dry-run _elsewhere_ |
| Mechanical refactor (`<>{busy && …}{!busy && …}</>`) | Repeated icon `className`; negated `!busy` flags; optimizes “one return” over clarity              |
| **`JobControlIcon`**                                 | Platonic name; purpose props; tier for `Spinner`; polymorphic `Icon` for shared tree               |

**Call site:** `<JobControlIcon running={busy} cancelable={showCancel} />` — feature names stay upstream.

**Canonical:** [JobControlIcon.tsx](../../../app/_components/JobControlIcon.tsx)

---

## Props and files

| Parent (orchestration) | Child (purpose) | Bridge                                      |
| ---------------------- | --------------- | ------------------------------------------- |
| `showResume`           | `isResumable`   | `isResumable={showResume}`                  |
| `fromScratchJobId`     | `hintJobId`     | `hintJobId={fromScratchJobId}`              |
| `busy`                 | `running`       | `running={busy}` (document if words differ) |
| `showCancel`           | `cancelable`    | `cancelable={showCancel}`                   |

**Optional props:** pass `prop={value}` with `value` possibly `undefined` — do not use spread to omit keys on JSX components in `app/**`.

**Repeated derivation** at multiple parents → fold into the platonic child (`JobTile` + `JobTileService`) so every parent bridge is raw inputs only.

Move child to `app/_components/` when the platonic ideal is reusable job/UI chrome, not one screen widget.

**Narrative:** [examples.md — Call-site bridges](examples.md#call-site-bridges--no-conditional-spread).

---

## Refactoring workflow

1. State the platonic ideal in one sentence.
2. Find **duplication** — same tags/wrapper repeated, or only type/copy differing?
3. Choose shape **A–E** (table above); reject first idea if it repeats markup or adds `!busy` bookkeeping.
4. Rename module + props to purpose; update call-site bridges only.
5. Run petro self-review + gate.

```
- [ ] Platonic name (no parent/slot in export name)
- [ ] Child props = purpose; bridges = one identifier per prop (no conditional spread / nested calls in attrs)
- [ ] Duplicated shell eliminated OR polymorphic/tiered pattern applied
- [ ] Presence gates preserved for optional content
- [ ] No selector returns JSX; no element ternary in JSX
- [ ] Trivial two-way selectors use ternary; guards use `if` + pipeline
- [ ] File location matches reusability
- [ ] Fractal self-review done first ([petro-code-fractal-orchestration](../petro-code-fractal-orchestration/SKILL.md))
```

---

## Anti-patterns

| Smell                                                                                                                               | Fix                                                                              |
| ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Duplicated `if (mode) return <></>` with same shape                                                                                 | Shape **A**                                                                      |
| `<> {busy && <Spinner />}{!busy && showCancel && <Square …/>}{!busy && !showCancel && <Play …/>} </>` when Square/Play share markup | **B + C** (`JobControlIcon`)                                                     |
| Child prop `jobId` when parent also has `jobId`                                                                                     | Purpose rename (`hintJobId`)                                                     |
| `const hint = flag ? a : b` without optional input                                                                                  | `hintJobId && renderHint(hintJobId)`                                             |
| `function renderX(): ReactElement`                                                                                                  | Sibling `FC` or shape **D** in parent                                            |
| `<> {href && <Link />}{!href && <Label />} </>` when the FC is **only** that fork                                                   | Shape **B** (`WrappableFilename`)                                                |
| Name `RunJobSplitPrimaryLeading`                                                                                                    | `JobControlIcon` (essence, not site)                                             |
| `if (x) { return 'a'; } return 'b';` in a selector whose only job is A vs B string/null                                             | `return x ? 'a' : 'b'`                                                           |
| Ternary cramming guard + two helper calls (`scoreLabel === null ? … : append(…)`)                                                   | Guard `if` + pipeline (`describeNearMiss`)                                       |
| Helpers above the exported FC                                                                                                       | [petro-code-fractal-orchestration](../petro-code-fractal-orchestration/SKILL.md) |
| `let` pick-accumulator / inline policy before effect                                                                                | [petro-code-fractal-orchestration](../petro-code-fractal-orchestration/SKILL.md) |
| `{...(cond ? { prop: val } : {})}` on `<Component` in `app/**`                                                                      | `prop={val}`; derive in `const` block or child service                           |
| Nested `f(g())` in JSX prop                                                                                                         | `const x = getX()` then `prop={x}`                                               |
| Thin wrapper derives in JSX only                                                                                                    | Fold into child service or `const` facts above return                            |

---

## Self-review (before stop)

1. **Fractal (HARD):** [petro-code-fractal-orchestration/SKILL.md](../petro-code-fractal-orchestration/SKILL.md) checklist if this file has an exported entry or FC orchestrator.
2. **Platonic:** Can you describe this module without naming its first parent?
3. **Shape:** Did you pick A–E deliberately, not reflexively?
4. **Props:** Purpose-named on the module; bridges = identifiers only (fractal binding-site check)?
5. **Selectors:** No JSX; presence ≠ variant? Trivial A/B → ternary; guard+pipeline → `if`?
6. **Better than before:** Fewer duplicated trees, less negated-flag soup, clearer name?
7. **Petro:** `&&` not `? : null`; no element ternaries; `cn()` object args; non-JSX two-way → ternary.
