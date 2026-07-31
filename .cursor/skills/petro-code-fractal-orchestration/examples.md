# Fractal orchestration — examples

Use with [SKILL.md](SKILL.md). Each example states the **essential sentence**, shows **failed structure**, then **fractal structure**.

---

## Reasoning template (every refactor)

```text
1. Essential sentence: “This module essentially __________.”
2. Facts the sentence needs: [ ] redirect  [ ] body  [ ] headers  [ ] copy  [ ] icon  …
3. For each fact: trivial inline OK? If no → unexported helper (shortest fact name; grep tax only if needed)
4. Orchestrator: guards → const facts → act/return — read aloud; cut repeated stems
5. Export params purpose-named; private params may shorten (id) when module + type give context
6. Smell check: private name longer than sentence + grep require?
7. Feature-folder vocabulary pass (always if folder touched): strip stems, suffixes name the fact, epistemic humility (widest honest props/params — no unused caller context), drop redundant props/consts, aloud on import/call lines
8. Binding-site scan: no nested calls in JSX props; no `{...(cond ? { prop } : {})}` on components in app/; rg spread grep on touched app files
9. let scan + nested-if scan (orchestrator) + aloud test on every binding site (incl. JSX attrs)
```

---

## 1. Primary canonical — `getJobDescription` (platonic orchestrator)

**Essential sentence:** Return job drawer description (and optional harvest hint) from resumable flag and job id.

**Why this is the anchor example:** export name = the idea; no auth/site wiring; orchestrator is only **compose facts → return** — the purest fractal sentence. Domain-specific examples (`SignOut`) are secondary.

### Fractal (target shape) — module namespace

**Eloquent target** (shortest names; file = `getJobDescription.ts`):

```ts
export function getJobDescription(jobId: RunnableJobId, isResumable = false): string {
  const description = getDescription(isResumable);
  const hint = getHint(jobId);
  return hint ? `${description}${hint}` : description;
}
```

Reads: “get job description → get description, get hint, return combined.” Context drops repeated “Job” / “Description” stems.

**In-repo grep compromise** (when `getDescription` / `getHint` are ambiguous in ripgrep — see [SKILL.md § Module namespace](SKILL.md#module-namespace-encapsulation)):

```ts
const description = getDescriptionForJob(isResumable);
const hint = getHintForJob(jobId);
// …getDescriptionForJob / getHintForJob implementations; private param `id` in getHintForJob
```

`…ForJob` is **extra syllables for search**, not the default style. Long private names without a grep excuse are a smell.

**Level 1** helpers hold separate facts (resume copy vs harvest hint). If hint policy grows a nested `if` tree, split Level 2 — do not inflate the orchestrator. On **second caller**, extract and rename e.g. `hintForHarvestJob`.

**Call site:** `drawerDescription={getJobDescription(jobId, showResume)}` — parent keeps menu vocabulary; this module keeps purpose names (`isResumable`, `jobId`).

**Canonical:** [getJobDescription.ts](../../../app/_components/getJobDescription.ts)

**Shape A narrative (duplicated drawer `FC` → strings):** [petro-code-composition-oriented/examples.md — drawer arc](../petro-code-composition-oriented/examples.md#a-drawer-description--unified-shell--string-selectors) — layering canon stays here only.

---

## 2. Async + side effect — `signOutOperator`

**Essential sentence:** Sign the operator out at the correct post-logout URL.

### Failed — subclauses + `let`

```ts
export async function signOutOperator(): Promise<void> {
  let redirectTo = '/signin';
  const session = await getOperatorSession();
  if (session) {
    const needsConsent = await shouldForceGoogleOAuthConsent(session.email);
    if (needsConsent) {
      redirectTo = GOOGLE_OAUTH_CONSENT_SIGNIN_HREF;
    }
  }
  await signOut({ redirectTo });
}
```

**Failures:** `let` + **nested `if`** inside `if (session)`; simulate `redirectTo`; policy + effect interleaved.

### Fractal

```ts
export async function signOutOperator(): Promise<void> {
  const redirectTo = await getSignOutRedirect();
  await signOut({ redirectTo });
}

async function getSignOutRedirect(): Promise<string> {
  const session = await getOperatorSession();
  if (!session) {
    return '/signin';
  }
  const needsConsent = await shouldForceGoogleOAuthConsent(session.email);
  if (needsConsent) {
    return GOOGLE_OAUTH_CONSENT_SIGNIN_HREF;
  }
  return '/';
}
```

**Canonical (async):** [SignOut.ts](../../../lib/actions/SignOut.ts)

---

## 3. API handler — response assembly

**Essential sentence:** Return 200 with trace headers when present and a built body.

### Failed

```ts
export async function POST(req: Request): Promise<Response> {
  const input = await req.json();
  let headers: Record<string, string> | undefined;
  if (input.traceId) {
    headers = traceHeaders(input.traceId);
  }
  let body: Body;
  if (input.mode === 'full') {
    body = buildFullBody(input);
  } else {
    body = buildLiteBody(input);
  }
  return new Response(JSON.stringify(body), { status: 200, headers });
}
```

### Fractal

```ts
export async function POST(req: Request): Promise<Response> {
  const input = await req.json();
  const headers = getResponseHeaders(input);
  const body = buildResponseBody(input);
  return new Response(JSON.stringify(body), { status: 200, headers });
}

function getResponseHeaders(input: Input): Record<string, string> | undefined {
  return input.traceId ? traceHeaders(input.traceId) : undefined;
}

function buildResponseBody(input: Input): Body {
  if (input.mode === 'full') {
    return buildFullBody(input);
  }
  return buildLiteBody(input);
}
```

**Note:** `buildResponseBody` is Level 1; mode branch could split into `buildFullBody` / `buildLiteBody` only (already named).

---

## 4. Domain workflow — harvest entry

**Essential sentence:** Run inbox harvest with built services and a child logger.

### Fractal (matches petro one-await-per-line)

```ts
export async function runInboxHarvest(
  oauth: UserOAuth,
  logger: Logger,
  options: HarvestOptions
): Promise<HarvestResult> {
  const services = await buildInboxServices(oauth);
  const runLogger = logger.child('inbox');
  return harvestInbox(services, runLogger, options);
}
```

**Anti-pattern to avoid in same file:**

```ts
export async function runInboxHarvest(…) {
  const gmail = await createGmail(oauth);
  const drive = await createDrive(oauth);
  const vendors = await loadVendors();
  // … twelve more awaits …
  return harvestInbox({ gmail, drive, vendors, … }, …);
}
```

→ `buildInboxServices` owns the service graph question.

---

## 5. Nested fractal — Level 2 inside a selector

**Essential sentence (helper):** Describe near-miss vendor match copy.

`describeNearMiss` is Level 1; it **must not** use a ternary that crams guard + pipeline:

```ts
// Bad — one line, two concerns
return scoreLabel === null ? 'no candidates ranked' : appendThresholdLabel(getNearestPart(…), …);

// Good — guard + pipeline
function describeNearMiss(…): string {
  if (scoreLabel === null) {
    return 'no candidates ranked';
  }
  const nearestPart = getNearestPart(scoreLabel, nearestHandle);
  return appendThresholdLabel(nearestPart, thresholdLabel);
}
```

**Leaf pick** (`getNearestPart`) stays ternary — whole function is A vs B string.

**Canonical:** [LogVendorMatchValue.tsx](<../../../app/(operator)/runs/[runId]/LogVendorMatchValue.tsx>)

---

## 6. Nested `if` in orchestrator — extract even without `let`

See [SKILL.md § Nested `if`](SKILL.md#nested-if--second-strongest-signal) for the `signOutOperator` variant that duplicates `signOut` calls inside nested `if` — same fix: `const redirectTo = await getSignOutRedirect()`.

---

## 6b. React — prop subclauses vs binding-site facts

**Essential sentence (failed wrapper):** Show this harvest job on the dashboard with correct stop target and last run.

**Same family as:** nested `? :`, `let` default-then-override, nested `if` — policy embedded where only **named facts** and **render** belong ([SKILL.md § Binding sites](SKILL.md#binding-sites--no-subclauses-hard)).

### Failed — derivation in JSX props (not linted by children-only JSX rules)

```tsx
export const DashboardHarvesterTile: FC<Props> = ({ jobId, latest, serverRuns, … }) => {
  const familyJobIds = getHarvestFamilyJobIds(jobId);
  const isRunning =
    activeJobIds.has(jobId) ||
    getLiveRunForJobFamily({ serverRuns, jobIds: familyJobIds }) !== null;

  return (
    <JobTile
      job={JOB_CATALOG[jobId]}
      {...(latest ? { lastRun: getLastRunFromRecord(latest) } : {})}
      {...(latest ? { lastRunJobId: latest.jobId as JobId } : {})}
      isRunning={isRunning}
      stopJobId={
        getStopJobIdForLiveRun(
          getLiveRunForJobFamily({ serverRuns, jobIds: familyJobIds }),
          jobId
        ) as RunnableJobId
      }
    />
  );
};
```

**Failures:** aloud test needs “unless latest”; **#3** conditional spread; **#7** prop list is not essential; nested calls in `stopJobId`; duplicate `getLiveRunForJobFamily` scans; `as` patches types.

### Fractal — facts in service; view passes inputs

```tsx
// DashboardView — identifiers only
<JobTile
  jobId="harvest-from-inbox"
  latest={inboxLatest}
  resumableRun={inboxResumable}
  activeJobIds={activeJobIds}
  runs={serverRuns}
/>;

// JobTile.tsx — orchestrator const block, then shell
const { isRunning, stopJobId } = getStateForJob({ jobId, activeJobIds, runs });
const lastRun = getLastRunForJob(latest ?? undefined);
```

**Canonical:** [JobTile.tsx](../../../app/_components/job-tile/JobTile.tsx), [JobTileService.ts](../../../app/_components/job-tile/service/JobTileService.ts). **Call-site bridges:** [petro-code-composition-oriented/examples.md § Call-site bridges](../petro-code-composition-oriented/examples.md#call-site-bridges--no-conditional-spread).

---

## 6c. Orchestrator bindings — callee mirroring (any export body)

**Essential sentence:** Format the last-run link title from started-relative + subtitle fragments.

Applies to FCs, `*Service.ts`, and short exported helpers — not only JSX ([SKILL.md § Orchestrator bindings](SKILL.md#module-namespace-encapsulation)).

### Failed — replay helper stem on the binding

```ts
export function formatLastRunLinkTitle(…): string {
  const summaryParts = runSummarySubtitleParts(jobId, lastRun.summary);
  return [startedRelative, ...summaryParts].filter(Boolean).join(' · ');
}
```

**Failure:** `summaryParts` mirrors `runSummarySubtitleParts`; the export name already says “last run link title.” Qualifying for the spread on the next line is not a collision.

### Fractal — shortest fact in the sentence

```ts
export function formatLastRunLinkTitle(
  jobId: JobId,
  { summary }: JobLastRun,
  startedRelative?: string
): string {
  const parts = runSummarySubtitleParts(jobId, summary);
  return [startedRelative, ...parts].filter(Boolean).join(' · ');
}
```

Same pattern elsewhere: `const live = getLiveRunForJobFamily(…)` (not `liveRun`), `const services = await buildInboxServices(…)` (not `inboxServices`) when the block has one of each.

---

## 6d. Optional presence — policy then `&&` map

**Essential sentence:** Outcome for the tile is running placeholder, else map last run when there is one.

**Optional presence** ([SKILL.md § Optional presence](SKILL.md#optional-presence-map-when-defined), [petro-code-standards §](../petro-code-standards/SKILL.md#optional-presence-map-when-defined)): absent optional → `undefined`; present → one mapper — use `value && map(value)`, not `value ? map(value) : undefined` and not a guard-only `if (!value) return undefined`.

### Failed — ternary or guard only to mean “undefined when absent”

```ts
return latest ? getLastRunFromRecord(latest) : undefined;

if (!lastRun) {
  return undefined;
}
return getOutcomeRunFromLastRun(lastRun);
```

### Failed — policy folded into `&&` (wrong fact while running)

```ts
// lastRun may still be the previous finished run while isRunning
return !isRunning && lastRun && getOutcomeRunFromLastRun(lastRun);
return isRunning
  ? { status: 'running', summary: {} }
  : lastRun && getOutcomeRunFromLastRun(lastRun);
```

The ternary here is a **two-way policy pick** (running vs not), not optional presence — use `if (isRunning) return …` then optional-map.

### Fractal — policy `if`, then `&&` tail

```ts
export function getOutcomeRun(
  isRunning: boolean,
  lastRun?: JobLastRun
): JobRunForDisplay | undefined {
  if (isRunning) {
    return { status: 'running', summary: {} };
  }
  return lastRun && getOutcomeRunFromLastRun(lastRun);
}

export function getLastRunForJob(latest?: JobRunRecord): JobLastRun | undefined {
  return latest && getLastRunFromRecord(latest);
}
```

**Canonical:** [JobTileService.ts](../../../app/_components/job-tile/service/JobTileService.ts) (`getOutcomeRun`, `getLastRunForJob`, `formatStartedRelative`).

---

## 6e. Destructuring — favored over stem repetition

**Essential sentence:** Map last-run fields into display shape, omitting optional keys when absent.

**Destructuring is favored generally** when a block reads **several fields** from the same binding — parameters first, else `const { … } = obj` on the next line. Only when extracted names **do not clash** in scope ([SKILL.md § Destructuring](SKILL.md#destructuring)).

### Failed — repeat object stem

```ts
export function getOutcomeRunFromLastRun(lastRun: JobLastRun): JobRunForDisplay {
  const errorFields = lastRun.error ? { error: lastRun.error } : {};
  const terminationFields = lastRun.terminationReason
    ? { terminationReason: lastRun.terminationReason }
    : {};

  return {
    status: lastRun.status,
    summary: lastRun.summary,
    ...errorFields,
    ...terminationFields,
  };
}
```

### Fractal — destructure at boundary; shorthand in DTO facts

```ts
export function getOutcomeRunFromLastRun({
  summary,
  error,
  status,
  terminationReason,
}: JobLastRun): JobRunForDisplay {
  const errorFields = error ? { error } : {};
  const terminationFields = terminationReason ? { terminationReason } : {};

  return { status, summary, ...errorFields, ...terminationFields };
}

export function formatLastRunLinkTitle(
  jobId: JobId,
  { summary }: JobLastRun,
  startedRelative?: string
): string {
  const parts = runSummarySubtitleParts(jobId, summary);
  return [startedRelative, ...parts].filter(Boolean).join(' · ');
}
```

**Keep whole binding:** `items.map((item) => processItem(item))`, `runs.map((run) => run.id)` (one **flat** read on a plain DTO).

### Callback param stem (e.g. React events)

**Essential sentence:** Bridge textarea input to parent `onTextChange`.

When the body uses a **member chain on the parameter name**, destructure at the parameter — not a separate “DOM handler” rule. Named `const` before JSX; prop is an identifier ([binding sites](SKILL.md#binding-sites--no-subclauses-hard)).

```tsx
// Failed — param stem inline in JSX
<Textarea onChange={(event) => onTextChange(event.target.value)} />;

// Fractal
const onVendorsTextChange = ({ target }: ChangeEvent<HTMLTextAreaElement>): void => {
  onTextChange(target.value);
};
<Textarea onChange={onVendorsTextChange} />;
```

**Canonical:** [JobTileService.ts](../../../app/_components/job-tile/service/JobTileService.ts) (`getOutcomeRunFromLastRun`, `formatLastRunLinkTitle`); [VendorListSurface.tsx](<../../../app/(operator)/_views/vendors-view/VendorListSurface.tsx>).

---

## 7. React FC — `JobControlIcon` (orchestrator + presentation)

**Essential sentence:** Render pending spinner, or stop/start icon.

Fractal **tier + polymorphic** (petro-code-composition-oriented B + C) — orchestrator stays short:

```tsx
export const JobControlIcon: FC<Props> = ({ running, cancelable }) => {
  if (running) {
    return <Spinner />;
  }
  const Icon = cancelable ? Square : Play;
  return <Icon className="size-4 fill-current" aria-hidden />;
};
```

Tier decision is **structurally different nodes** — belongs in orchestrator, not a `let Icon` patched across branches.

---

## 8. When _not_ to extract (narrow exceptions)

```ts
export async function ping(): Promise<{ ok: true }> {
  return { ok: true };
}
```

No facts to derive — one sentence, no helpers.

```ts
const label = pending ? 'Running…' : jobLabel;
```

**Orchestrator JSX text** — petro allows trivial two-string inline in JSX; do not hoist to `getFooLabel()` for one word. Fractal applies to **module entry** and **non-trivial derivation**, not every ternary in the tree.

---

## 8. Feature-folder vocabulary — `job-tile/` (stems + suffixes)

**Essential sentence:** Render one harvest job tile with run control, last-run link, and outcome badge.

**Smells after a “big refactor” (still wrong):**

| Smell                  | Why                                            | Target                  |
| ---------------------- | ---------------------------------------------- | ----------------------- |
| `getJobTileLastRun`    | Double stem (`Job` + `Tile` + fact)            | `getLastRunForJob`      |
| `getJobState`          | Call site already has `jobId`                  | `getStateForJob`        |
| `getLastRunRelative`   | `Relative` of what?                            | `formatStartedRelative` |
| `lastRunRelative` prop | Same vague suffix                              | `startedRelative`       |
| `serverRuns` prop      | Unwarranted context; tile never branches on it | `runs: JobRunRecord[]`  |

**Bridge:** parent may keep `serverRuns`; child API stays humble — [§ Epistemic humility](SKILL.md#epistemic-humility) (widest honest input).

**Aloud orchestrator (canonical):**

```ts
const { isRunning, stopJobId } = getStateForJob({ jobId, activeJobIds, runs });
const lastRun = getLastRunForJob(latest ?? undefined);
const startedRelative = formatStartedRelative(lastRun);
```

**Canonical:** [JobTile.tsx](../../../app/_components/job-tile/JobTile.tsx), [JobTileService.ts](../../../app/_components/job-tile/service/JobTileService.ts)

**Lib side-effect (flat guards in a loop):** [PrependJobRun.ts](../../../lib/operator/jobs/PrependJobRun.ts) — `runIdFilter` + sequential `continue`, not nested `if`; same [Scope](../petro-code-fractal-orchestration/SKILL.md#scope) as FC orchestrators.

**Compressed guard → question helper:** [UnitRules.ts](../../../lib/domain/shared/settings/UnitRules.ts) — `ruleFailsMinAmount` / `ruleFailsMaxAmount` instead of `if (min !== null && (!money \|\| …))`; [§ guard conditions](SKILL.md#guard-conditions--no-compressed-policy).

---

## 9. Refactoring checklist (agent execution order)

```text
[ ] Write essential sentence on a comment line (delete before commit if redundant)
[ ] List facts; mark each helper name
[ ] Implement helpers bottom-up under future orchestrator
[ ] Rewrite orchestrator with const facts only
[ ] Delete all pick-accumulator let bindings
[ ] Nested-if scan on orchestrator (extract if any)
[ ] Aloud test orchestrator + JSX prop values (binding sites)
[ ] Binding-site scan: no prop subclauses; rg '\.\.\.\([^)]*\?' on touched app/
[ ] Feature-folder vocabulary pass (if folder touched)
[ ] Run npm run format && npm run lint && npm run typecheck
```
