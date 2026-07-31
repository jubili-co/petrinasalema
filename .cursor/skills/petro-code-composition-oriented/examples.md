# Petro code — composition-oriented — examples

## Reasoning template (use on every refactor)

```text
1. Platonic ideal: “This module essentially __________.”
2. Varies: [ ] copy  [ ] optional block  [ ] component type (same props)  [ ] unrelated trees
3. Shape: A shell | B tier/leaf fork | C polymorphic | D paired && (slot in parent) | E sibling FC
4. Name/export/file path express (3), not parent or slot.
5. Child props: purpose names only.
6. Fractal: see [petro-code-fractal-orchestration/examples.md](../petro-code-fractal-orchestration/examples.md) if this module has an exported entry.
```

---

## A. Drawer description — unified shell + string selectors

### Before — procedural, duplicated shell

```tsx
export const RunJobSplitDrawerDescription: FC<Props> = ({ showResume, fromScratchJobId }) => {
  if (showResume) {
    return (
      <>
        Resume picks up the backlog from your last run…
        {fromScratchJobId && fromScratchHint(fromScratchJobId)}
      </>
    );
  }

  return (
    <>
      Dry runs log what would happen without touching Gmail…
      {fromScratchJobId && fromScratchHint(fromScratchJobId)}
    </>
  );
};
```

**Problems:** two exits; fragment + hint duplicated; `showResume` is menu vocabulary inside a copy module.

### After — shape A + fractal layering (canon elsewhere)

Unified shell + string selectors; no duplicated fragment. **Full layering canon:** [petro-code-fractal-orchestration/examples.md §1](../petro-code-fractal-orchestration/examples.md) → [getJobDescription.ts](../../../app/_components/getJobDescription.ts).

**Call site:** `drawerDescription={getJobDescription(jobId, showResume)}` — parent keeps menu vocabulary; export keeps purpose names (`jobId`, `isResumable`). Private helpers target `getDescription` / `getHint`; repo uses `…ForJob` only as grep tax (fractal module namespace).

---

## Call-site bridges — no conditional spread

**Platonic ideal at parent:** “Dashboard shows inbox harvest tile” — parent does **not** essentially compute stop targets or last-run shape.

### Failed — bridge hidden in spread + nested props

```tsx
<JobTile
  {...(latest ? { lastRun: getLastRunFromRecord(latest) } : {})}
  stopJobId={getStopJobIdForLiveRun(getLiveRunForJobFamily({ serverRuns, jobIds }), jobId)}
/>
```

Reads as subclauses, not bridges: “unless latest,” “find live then stop,” no named facts on the parent.

### After — raw inputs (bridge = identifiers)

```tsx
<JobTile
  jobId="harvest-from-inbox"
  latest={inboxLatest}
  resumableRun={inboxResumable}
  activeJobIds={activeJobIds}
  runs={serverRuns}
/>
```

Derivation lives in `JobTile` + `JobTileService` ([fractal examples §6b](../petro-code-fractal-orchestration/examples.md#6b-react--prop-subclauses-vs-binding-site-facts)).

### Optional prop without spread

```tsx
// OK — undefined omits optional prop on the child type
<FolderTree spec={SHOEBOX_TREE} root={root} depth={0} stats={folderStats} />
```

`folderStats` may be `undefined`; do not `{...(folderStats ? { stats: folderStats } : {})}`.

---

## String selectors — ternary vs guard (`LogVendorMatchValue`)

**Platonic ideal:** “Vendor match score copy for extraction details” — selectors format telemetry; FC lays out pill + muted lines.

### File order

```text
export const LogVendorMatchValue …   // orchestrator (top)
function vendorMatchDataId …         // called by FC
function getMatchedPillLabel …
function describeNearMiss …          // calls getNearestPart, appendThresholdLabel
function getNearestPart …            // below describeNearMiss
function appendThresholdLabel …
function getScoreLabel …
function formatPercent …             // leaf (bottom)
```

### Ternary — function _is_ the pick

```ts
// Before — symmetric branches written as two returns
function getNearestPart(scoreLabel: string, nearestHandle: string | null): string {
  if (nearestHandle) {
    return `best: ${nearestHandle} · ${scoreLabel}`;
  }
  return `best ${scoreLabel}`;
}

// After
return nearestHandle ? `best: ${nearestHandle} · ${scoreLabel}` : `best ${scoreLabel}`;
```

Same for `appendThresholdLabel`, `getScoreLabel`, `getThresholdLabel`, `getMatchedPillLabel`.

### Guard + pipeline — keep `if`

```ts
function describeNearMiss(…): string {
  if (scoreLabel === null) {
    return 'no candidates ranked';
  }
  const nearestPart = getNearestPart(scoreLabel, nearestHandle);
  return appendThresholdLabel(nearestPart, thresholdLabel);
}
```

Do **not** one-liner this with a nested ternary; the else path is two steps, not “string A vs string B.”

### Decision table

| Helper                   | Shape                | Why                                    |
| ------------------------ | -------------------- | -------------------------------------- |
| `getNearestPart`         | Ternary              | Two template strings only              |
| `getScoreLabel`          | Ternary              | `null` vs `formatPercent` (leaf)       |
| `describeNearMiss`       | Guard + pipeline     | Null guard, then compose sub-selectors |
| `LogVendorMatchValue` FC | `const` + `&&` shell | Orchestration; not a selector          |

---

## B + C. Job control icon — platonic name, tier + polymorphic

### Stage 0 — original (context-heavy name)

`RunJobSplitPrimaryLeading` in `run-job-split-button/` — names the **split button** and **leading slot**, not the idea (pending / stop / start glyph).

### Stage 1 — mechanical “composition” (worse for this case)

```tsx
export const RunJobSplitPrimaryLeading: FC<Props> = ({ busy, showCancel }) => {
  const showPlay = !busy && !showCancel;

  return (
    <>
      {busy && <Spinner />}
      {!busy && showCancel && <Square className="size-4 fill-current" aria-hidden />}
      {showPlay && <Play className="size-4 fill-current" aria-hidden />}
    </>
  );
};
```

**Why worse:** duplicated `className`; reader tracks `busy` / `!busy` / `showPlay`; optimizes “single return” over the actual state machine (spinner tier, then icon tier).

### Stage 2 — platonic arrival (shape B + C)

```tsx
// app/_components/JobControlIcon.tsx
export const JobControlIcon: FC<Props> = ({ running, cancelable }) => {
  if (running) {
    return <Spinner />;
  }

  const Icon = cancelable ? Square : Play;

  return <Icon className="size-4 fill-current" aria-hidden />;
};
```

**Call site:** `<JobControlIcon running={busy} cancelable={showCancel} />`

| Dimension | Lesson                                                                        |
| --------- | ----------------------------------------------------------------------------- |
| Name      | `JobControlIcon` = essence                                                    |
| Path      | `app/_components/` = reusable                                                 |
| Props     | `running`, `cancelable` = icon semantics; parent keeps `busy`, `showCancel`   |
| Structure | Early return = different **tier**; `Icon = …` = same **tree**, different type |

**Not** a JSX element ternary — assigning a component reference then `<Icon />` is allowed (petro forbids `{cond ? <A /> : <B />}` in JSX).

---

## B. Leaf binary choice — link vs label (`WrappableFilename`)

**Platonic ideal:** “Filename as link or plain label” — not “log row filename slot.”

### Before — paired `&&` in a leaf (shape D by habit)

```tsx
return (
  <>
    {href && <TextLink href={href} …>{message}</TextLink>}
    {!href && <Label …>{message}</Label>}
  </>
);
```

**Problems:** empty fragment; reader tracks `href` and `!href`; optimizes “one return” though nothing else shares that return.

### After — early return (shape B)

```tsx
if (href) {
  return <TextLink href={href} …>{message}</TextLink>;
}

return <Label …>{message}</Label>;
```

| Question                            | Answer                                                                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Whole FC is the fork?               | Yes → **B**                                                                                                              |
| Parent row also renders meta/pills? | Parent uses **D** or layout; child stays **B**                                                                           |
| Same props, only component type?    | Consider **C** (`const C = href ? TextLink : Label`) — rarely worth it when branches differ (`data-id`, link-only attrs) |

**Thin wrapper:** `LogRowFilename` only bridges `entryKey` → `instanceKey`; fork stays in `app/_components/WrappableFilename.tsx`.

---

## Pitfall: variant without presence gate

```tsx
// Wrong — folder hint when hintJobId undefined
const hint = isInbox ? inboxCopy : folderCopy;

// Right
const hint = hintJobId && renderHint(hintJobId);
```

---

## Pitfall: platonic name leaks site of use

| Avoid                                       | Prefer                                                                  |
| ------------------------------------------- | ----------------------------------------------------------------------- |
| `RunJobSplitPrimaryLeading`                 | `JobControlIcon`                                                        |
| `DashboardJobTileBadge` (if used elsewhere) | `OutcomeBadge` or domain-specific but not page-prefixed                 |
| `primaryLeading` as a **component** name    | `JobControlIcon`; parent passes `primaryLeading={<JobControlIcon … />}` |

---

## When not to force shape A

- **JobControlIcon** — use B + C.
- **Link vs label** (`WrappableFilename`) — shape **B** (leaf early return); not paired `&&` unless the fork lives inside a larger orchestrator return.
- **Reorganize confirm copy with `<Code>`** — shape E (sibling FC slices) or E inside a single shell.
- Single static line — inline; no module.

## Shape D vs B (paired `&&` vs early return)

| Situation                                                      | Shape                       |
| -------------------------------------------------------------- | --------------------------- |
| FC body is only “tree A or tree B”                             | **B**                       |
| Same `return` includes other always-on JSX                     | **D** for the fork slot     |
| Need one wrapper around both branches (`min-w-0`, flex column) | **D** (or extract shell FC) |
