---
name: petro-code-fractal-orchestration
description: >-
  Structures TypeScript modules in fractal zoom levels: exported entry points read as
  essential sentences; unexported file-local helpers (module namespace) below; orchestrators
  bind results with const, never let across branches. Use when writing or refactoring
  server actions, route handlers, domain workflows, React FC orchestrators, or any
  function where inline policy, let-accumulators, or default-then-override obscure the
  main story. Applies to every exported orchestrator under app/** and lib/** (UI, domain,
  jobs, auth, handlers, cache, actions) — by role, not by folder name. Pair with
  petro-code-standards (gate, JSX, cn, data-id, binding sites).
  Triggers: push logic away, nested if, compressed guard conditions, let-accumulators, subclauses at any binding site
  (const, return, call/JSX props — not only function bodies), prop subclauses, conditional spread on components,
  repeated obj.field when destructuring is safe, conformance/refactor tasks (mandatory three passes + report).
---

## Trace
Before anything else when this skill applies, run its `scripts/trace.sh`. It prints a `[skill-trace]` line so the run's terminal log shows the skill fired.
<!-- skill-trace-block -->


# Petro code — fractal orchestration

**Read this skill** before writing or refactoring any **exported orchestrator** — see [Scope](#scope) (semantic rule; not a folder checklist).

**Also read:** **[petro-code-standards/SKILL.md](../petro-code-standards/SKILL.md)** for the workflow gate (`format` / `lint` / `typecheck`), Conditional JSX, `cn()`, `data-id`, PWA, and module boundaries. On **`.tsx` FC orchestrators**, after fractal layering, read **[petro-code-composition-oriented/SKILL.md](../petro-code-composition-oriented/SKILL.md)** for platonic names and JSX shapes A–E only.

**Narrative walkthroughs:** [examples.md](examples.md).

**Primary canonical (platonic orchestrator):** [getJobDescription.ts](../../../app/_components/getJobDescription.ts) — pure “compose facts → return.” **Async + effect:** [SignOut.ts](../../../lib/actions/SignOut.ts). **Lib side-effect:** [PrependJobRun.ts](../../../lib/operator/jobs/PrependJobRun.ts).

---

## Scope

**Rule:** Fractal applies to every **exported orchestrator** in **`app/**`and`lib/**`** — any export that **derives one or more facts**, then **returns, acts, or patches state**. If the entry reads like “figure out X, then do Y,” this skill applies regardless of path (`_views`, `domain`, `jobs`, `operator`, `google`, `actions`, …).

| In scope                                                   | Out of scope                                                                   |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Server actions, API handlers, domain/job workflows         | Pure types, constants-only modules, config barrels                             |
| Cache writers, mutation wiring, hook coordinators          | Leaf presentational exports (props through, no derivation)                     |
| React FCs and thin wrappers that wire derived props        | `lib/google/**` one-hop SDK passthroughs with no local policy (call site only) |
| Unexported helpers **below** the export (module namespace) | Tests (follow the same style when editing orchestrators under test)            |

**Not a folder checklist** — do not limit review to UI under `app/**` or treat parts of `lib/**` as “infrastructure” exempt from fractal. Agents often miss nested policy in cache patches, log builders, and job runtime for that reason.

**Leaf presentational** means the export only layouts or passes already-named inputs — no `const` fact block. See [Exported entry — who must follow this](#exported-entry--who-must-follow-this).

**Lint:** `shoebox/no-nested-if` and related rules run on `app/**` and `lib/**`; skills still govern binding sites and layering where ESLint is silent.

---

## Agent contract (HARD — stop the line)

**Before you stop** on any file with an exported orchestrator, run [three passes](#three-passes-mandatory-per-file) then the [Self-review](#self-review-before-stop) checklist. On **conformance / refactor** tasks, also output the [conformance report](../petro-code-standards/SKILL.md#conformance-report-mandatory-artifact) — see [standards § Conformance](../petro-code-standards/SKILL.md#conformance--refactor-tasks-hard). If you touched a **feature folder**, run the [feature-folder vocabulary pass](#feature-folder-vocabulary-pass) **every time** — not only on `*Service.ts` files. Violations are **structural debt**, not style nits — fix in the same pass.

| MUST                                                                                                                                                                  | MUST NOT                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Orchestrator reads as **2–4 essential sentences** (aloud test)                                                                                                        | Subclauses inline: default-then-override, nested policy before the main verb                                                       |
| Each derived fact: **`const name = await helper()`** or **`const name = helper()`** — **shortest** binding ([orchestrator bindings](#module-namespace-encapsulation)) | **`let` + reassignment** to hold one decision result across branches (outside loops)                                               |
|                                                                                                                                                                       | **Callee-mirror** bindings (`summaryParts` from `runSummarySubtitleParts`); stem stacks when one fact fits (`parts`, `live`)       |
| File-local helpers **unexported**, **shortest** fact names ([module namespace](#module-namespace-encapsulation)); **complete value** per branch                       | Export private helpers; default to long wh-question names inside one file; `compute` / `handle` / `process`; parent-prefixed names |
| Helpers stacked **under** the orchestrator that calls them (same file unless shared)                                                                                  | Hoist helpers above the exported entry; inline paragraphs before `signOut` / `return`                                              |
| Extract when [mandatory triggers](#mandatory-extraction-triggers) fire                                                                                                | “Only a few lines” as excuse to mix policy + effect                                                                                |
| Re-read orchestrator: **only what / then act** — no _unless_, _except_, _later we change_                                                                             | Simulate mutation in your head to understand control flow                                                                          |
| **No nested `if` in the orchestrator** (see [nested `if`](#nested-if--second-strongest-signal))                                                                       | `if (a) { if (b) { … } }` policy trees before the essential line                                                                   |
| **[Binding sites](#binding-sites--no-subclauses-hard):** every derived fact as `const name = helper()` before act/return/JSX                                          | Subclauses at any binding site: nested calls in props, conditional spread on JSX components, `as` to patch types at call sites     |
| **[Feature-folder vocabulary pass](#feature-folder-vocabulary-pass)** + [epistemic humility](#epistemic-humility) when any file in that folder changed                | Skipping the pass; contracts that encode caller context the module never uses (`server*`, parent stems, extra flags)               |
| Optional `T \| undefined` → one mapper: **`value && map(value)`** ([optional presence](#optional-presence-map-when-defined)); policy `if` before tail when needed     | `value ? map(value) : undefined`; guard-only `if (!value) return` before mapper; policy folded into `&&` with present optional     |
| **Destructuring** when body reads **2+ fields** from one binding, **callback param stem chains**, and names do not clash ([§](#destructuring))                        | `obj.field` repeated; inline `x => x.foo.bar` in JSX; stem chains when param destructure is safe at the earliest site              |
| **Three passes** per orchestrator file; **pass 3** recorded in [conformance report](../petro-code-standards/SKILL.md#conformance-report-mandatory-artifact) on refactor tasks | Pass 2 only; top-N subset of scope; stopping at lint green on conformance work                                                    |

**Allowed `let`:** loop counters and **iteration** accumulators (running sum, cursor) — binding means “in progress,” not “pick A, B, or C once.” Prefer `map` / `filter` / `reduce` with `const` when the answer is a collection. Low-level incremental algorithms in domain code are rare; document why if used.

---

## Petro code rules (inlined — apply with fractal)

These come from **[petro-code-standards](../petro-code-standards/SKILL.md)**. Fractal orchestration adds **where** named `const` facts are produced; petro adds **how each line behaves**.

### Workflow gate (before stop)

Follow [standards § Gate order](../petro-code-standards/SKILL.md#gate-order-all-tasks): conformance report or hard review → skill-check → `format` → `lint` → `typecheck`. Re-read the diff; fix violations in the same pass — do not defer.

### One logic step per line (I/O and transforms)

Each `await`, I/O call, or multi-step transform gets its own line and a **`const`** name — never buried in `return`, **function arguments, or JSX attributes** (see [binding sites](#binding-sites--no-subclauses-hard)).

```ts
// Bad
return harvestInbox(await buildInboxServices(oauth), logger, options);

// Good — orchestrator stays a sentence; service graph is a named question
const services = await buildInboxServices(oauth);
const runLogger = logger.child('inbox');
return harvestInbox(services, runLogger, options);
```

```tsx
// Bad — subclauses in JSX props (same smell as nested ? : / let default-then-override)
<JobTile
  {...(latest ? { lastRun: getLastRunFromRecord(latest) } : {})}
  stopJobId={
    getStopJobIdForLiveRun(getLiveRunForJobFamily({ serverRuns, jobIds }), jobId) as RunnableJobId
  }
/>;

// Good — facts in JobTileService; view passes raw inputs (identifiers only)
return (
  <JobTile
    jobId={jobId}
    latest={latest}
    resumableRun={resumableRun}
    activeJobIds={activeJobIds}
    runs={serverRuns}
  />
);
```

Fractal rule: if building `services` takes more than one await or branches, **`buildInboxServices`** owns that zoom level — not the orchestrator.

### File rhythm: guards → steps → return

Top-to-bottom: optional guards, then **`const` facts** (from helpers), then essential `return` / side effect. **Compensatory comments** (explaining what the code should have said) → rename or extract, then delete the comment.

### Types and exports (at boundaries)

- `type` not `interface`; explicit return types on **exports**; no `any` — `unknown` + narrow.
- React: `const X: FC<Props>` with local `type Props`.
- **Functional first:** pure helpers where possible; immutable bindings (`const`).

### Non-JSX two-way picks (Level 2 inside helpers)

When a helper’s **entire job** is exactly two non-JSX outcomes, one line is fine:

```ts
return nearestHandle ? `best: ${nearestHandle} · ${scoreLabel}` : `best ${scoreLabel}`;
return isResumable ? resumeCopy : dryRunCopy;
```

**Use early `return` + statements instead** when any of these apply:

| Situation                                                   | Use                                                   |
| ----------------------------------------------------------- | ----------------------------------------------------- |
| Guard then **pipeline** (more named steps after the branch) | `if` + `const` + `return` (`describeNearMiss`)        |
| Either branch calls a **non-trivial** helper                | early-return `function`                               |
| **3+ outcomes**                                             | flat `if` / `switch` with early `return`s             |
| **Nested `? :`**                                            | **Forbidden** — extract or flatten                    |
| Branch is **JSX**                                           | FC + tiered `return` or paired `&&` (petro JSX table) |

**Dual `if`/`return` for a trivial A/B string** when one ternary would suffice → prefer the ternary (density without losing the pick).

### Optional presence (map when defined)

When input is **`T | undefined`** (or `null`) and output should be **`U | undefined`** via **one** pure mapper, prefer **`value && map(value)`** over `value ? map(value) : undefined` or `if (!value) return undefined; return map(value)`.

| Pattern                                                                   | Use                                                                                                                     |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Absent → nothing, present → `map(defined)`                                | `return value && map(value)`                                                                                            |
| Two **meaningful** non-absent outcomes (`a` vs `b` copy)                  | Ternary or early returns ([petro two-way picks](../petro-code-standards/SKILL.md#non-jsx-two-way-picks-prefer-ternary)) |
| Guard changes **policy** (synthetic running state, abort, default object) | `if` + `return` **before** optional tail                                                                                |
| Mapper needs definite `T`                                                 | Extract `map` with non-optional param; caller optional-maps                                                             |

```ts
// Orchestrator — policy branch, then optional presence
if (isRunning) {
  return { status: 'running', summary: {} };
}
return lastRun && getOutcomeRunFromLastRun(lastRun);
```

Do not merge policy into `&&` when a present `lastRun` would produce the **wrong** fact under `isRunning`. **Narrative:** [examples.md §6d](examples.md#6d-optional-presence--policy-then-map).

### Destructuring

**Destructuring is favored generally** over repeating an object (or array) stem on every access — not only on function parameters.

When a block reads **two or more fields** (or array elements) from the **same binding**, destructure once at the **earliest** site that owns the value, then use bare names in the rest of the block.

| Site (prefer earlier)                    | Pattern                                                                                                          |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Function / callback parameters           | `function map({ status, summary }: JobLastRun)`                                                                  |
| FC / component props                     | `const Tile: FC<Props> = ({ jobId, runs }) => …`                                                                 |
| After a named `const` obtains the object | `const lastRun = getLastRunForJob(latest);` then `const { summary, status } = lastRun` when params cannot own it |
| After validation / parse success guard   | `if (!parsed.success) return …` then `const { id, mode } = parsed.data` — not `parsed.data.id` on every line    |
| Callback in `.map` / `.filter` / …       | `rows.map(({ key, value }) => …)`                                                                                |

| Prefer                                                             | Avoid                                            |
| ------------------------------------------------------------------ | ------------------------------------------------ |
| Facts in the sentence (`status`, `error`)                          | `lastRun.status`, `lastRun.error` on many lines  |
| Shorthand at binding sites (`{ error }`, `error ? { error } : {}`) | `{ error: lastRun.error }` after stem repetition |
| Rename on clash (`error: runError`)                                | Shadowing an existing name in the block          |

**Keep the whole binding** when passing the value through, when only **one flat** property is read on a **plain DTO** (`run.id`), or when the binding **is** the value (`processItem(item)`).

**Callback parameters:** Member chains rooted at the param name (`event => event.target.value`) destructure at the **parameter** — `({ target }) => target.value` — even for one nested read; in JSX use a named `const` and an identifier prop ([binding sites](#binding-sites--no-subclauses-hard)). Canonical: [VendorListSurface.tsx](<../../../app/(operator)/_views/vendors-view/VendorListSurface.tsx>). **Narrative:** [examples.md §6e — callback stem](examples.md#6e-destructuring--favored-over-stem-repetition).

**Scope:** destructure only when extracted names **do not collide** in that block — [petro-code-standards — Destructuring](../petro-code-standards/SKILL.md#destructuring): no two `{ data }` (or other duplicate bare names) from different objects in one scope; minimum rename when one field would shadow a neighbor.

**Why:** essential sentences name **facts**, not “fields of `lastRun`.” Stem repetition hides what the block uses and blocks shorthand at returns and `const` slices.

**Canonical:** [JobTileService.ts](../../../app/_components/job-tile/service/JobTileService.ts) (`getOutcomeRunFromLastRun`, `formatLastRunLinkTitle`). **Narrative:** [examples.md §6e](examples.md#6e-destructuring--favored-over-stem-repetition).

### JSX (orchestrator is an FC)

Fractal owns **`const` slices** and file rhythm at the top of the FC, then a **prop list of identifiers** on children — see [binding sites](#binding-sites--no-subclauses-hard). **[petro-code-composition-oriented](../petro-code-composition-oriented/SKILL.md)** owns **which shell** to return (shapes A–E) and **call-site bridges** (one name per prop, not spread soup). Conditional JSX **children** and `cn()` stay in [petro-code-standards](../petro-code-standards/SKILL.md) — do not duplicate those tables here.

### What stays in petro-code-standards only

Architecture direction (UI → domain → google), `data-id`, design-system / visual Tailwind, PWA bar, blast-radius scope, ESLint rule names — read that skill; do not duplicate here.

---

## Canonical idea (memorize this)

> **Fractal orchestration:** Each exported entry states only what this module **essentially does**, as a short sequence of facts and actions. Anything that answers **how** a fact was obtained lives **one zoom level down**, in **unexported** helpers ([module namespace](#module-namespace-encapsulation) — shortest names the file can support). Shared helpers use the **question** name (`getSignOutRedirect`). The caller binds with **`const`**, never **`let`** across branches. **Encapsulation** is how orchestrators read like concise speech; **long names are a smell** — add syllables only for grep or a second caller, not by default.

**Push logic away** like a fractal: the first read is the whole story; each nested function is the same rule at smaller scale, opened only when needed.

---

## Binding sites — no subclauses (HARD)

**One rule everywhere:** the host line states **what**; anything that explains **how** is a **subclause** and belongs one zoom level down (named helper + `const` at the caller).

Subclauses are the same readability family as **stacked/nested `? :`**, **`let` default-then-override**, and **nested `if` policy trees** — not a separate “JSX style” concern.

### What counts as a binding site

| Site                              | Host line sounds like     | Subclause smells                                                                                |
| --------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------- |
| `const x = …`                     | “We need fact X.”         | `f(g(input))`, `cond ? buildA() : buildB()` when not trivial borderline                         |
| `return …`                        | “We return Y.”            | `return foo(await bar())`, nested calls in the expression                                       |
| **Function / JSX call arguments** | “We pass Y into Z.”       | `prop={f(g(…))}`, `{...(cond ? { k: v } : {})}`, `as T` patching types the helper should return |
| Object literal field (DTO)        | “This request includes …” | OK inside a **named** `buildPayload()` / `toApiBody()` — not inline on `<Component`             |

**Aloud test applies to every binding site**, not only the lines above `return` / `await signOut`. If you need “unless,” “when latest exists,” or “first find live then map stop” **in a prop**, extract.

### Exported entry — who must follow this

**Semantic rule (not “one JSX return”):** any **exported entry** that **derives one or more facts** for a child, API, or return value is an orchestrator — including a **thin wrapper FC** that only renders `<JobTile … />` but wires `stopJobId`, `lastRun`, or optional props. “Leaf presentational” means **no derivation**: props flow through or the FC only layouts already-named inputs.

### JSX props and optional data (`app/**`)

| MUST                                                                   | MUST NOT                                                                          |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `const fact = getFact(…)` then `prop={fact}` (or `prop={literal}`)     | Nested helper calls inside `prop={…}`                                             |
| Optional props: `lastRun={lastRun}` when `lastRun` may be `undefined`  | `{...(cond ? { lastRun: transform(latest) } : {})}` on **JSX components**         |
| One helper answers one question (`getStateForJob`, `getLastRunForJob`) | Duplicate scans for the same fact (`getLive…` then `getHasLive…` for one boolean) |
| Fix return types / narrow helpers in `lib/**`                          | `as RunnableJobId` / `as JobId` on props to silence mismatches                    |

**Conditional spread on `<Component`** in `app/**` is **default-then-override for props** — mandatory extraction trigger **#3**. Prefer explicit attributes; React optional props accept `undefined`.

**DTO / API / log fields in `lib/**`:** optional keys use **`const slice = cond ? { key } : {}`** then **`...slice`** on the host object — not inline **`...(cond && { key })`** inside the literal. That is **not** [optional presence](#optional-presence-map-when-defined) (`value && map(value)`); conflating them is a common regression ([petro-code-standards § lib optional object fields](../petro-code-standards/SKILL.md#lib-optional-object-fields-do-not-conflate-with-optional-presence)). Named `buildContinueBody`-style helpers are fine; inline `&&` spreads in the literal are not.

### Depth rule (orchestrator body + JSX)

At the exported entry (before JSX):

```text
const <fact> = <singleCall>(…)   // one call depth; policy inside the helper
```

On JSX children in `app/**`:

```text
<Child prop={fact} />           // prop value is an identifier, literal, or trivial borderline (see below)
```

**Borderline (orchestrator only):** one trivial gate with **no nested calls** — e.g. `latest ?? undefined`, `traceId ? traceHeaders(traceId) : undefined` as its own `const` line. When in doubt, extract.

### Mandatory triggers — all binding sites

[Mandatory extraction triggers](#mandatory-extraction-triggers) apply at **every binding site** in an exported entry, not only statements above `return`. In particular:

- **#3** — conditional spread / default-empty-object override for props
- **#5** — any block whose job is **one value** passed onward (including inside JSX opening tags)
- **#7** — derivation that hides the essential child list or `return` line

**Gate grep (when no ESLint rule yet):** `rg '\.\.\.\([^)]*\?' app/` on touched files; fix component call sites in the same pass.

**Narrative:** [examples.md §6b — prop subclauses](examples.md#6b-react--prop-subclauses-vs-binding-site-facts).

---

## Why this exists (not “style”)

| Outcome                | How fractal helps                                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Targeted edits**     | Resume copy → `getDescription` (in `getJobDescription.ts`); hint policy → `getHint`; sign-out URL → `getSignOutRedirect` when shared |
| **Review**             | Reviewer approves the orchestrator sentence in 10 seconds; opens file-local helpers only on policy                                   |
| **Debugging**          | Stack: `getJobDescription` → `getHint` — parent frame supplies omitted context                                                       |
| **Isolate complexity** | Copy variants, OAuth policy, and side effects live in separate zoom levels                                                           |
| **Onboarding**         | New reader learns _what_ before _how_                                                                                                |

Code that interleaves policy and effect forces readers to **simulate mutation** (`let x = default; if … x = …`). That cognitive load scales badly and hides the module’s essential sentence.

---

## Zoom levels

```text
Level 0 — Orchestrator (exported entry)
  guards → const fact = questionHelper() → essential action / return

Level 1 — Unexported derivation helpers (shortest fact names; wh-question only after extract)
  early return; complete values; no JSX in string selectors

Level 2 — Leaf helpers inside Level 1
  trivial A/B → one-line ternary (petro non-JSX two-way picks)
  guard + pipeline → if + named steps + return
```

**Blast radius follows the name.** If a change doesn’t match the helper’s question, you’re editing the wrong level.

---

## The orchestrator

**Eligible entries:** `'use server'` actions, API route handlers, domain `export async function run…`, React **FC orchestrators** — any export that **derives facts** for children, APIs, or returns ([binding sites](#binding-sites--no-subclauses-hard)). **Not** a free pass for “one JSX return”: a thin `<JobTile … />` wrapper that computes `stopJobId` / `lastRun` in props is still an orchestrator.

### Recipe

```text
1. Optional guards (preconditions that skip or abort the whole module job)
2. const <fact> = <helper>(…)   — one named fact per line; one await per line (petro)
3. Essential action or return   — signOut, fetch, return <Shell>, return { status, body }
```

### Sentence without subclauses

Each orchestrator line must be an **essential claim** about this module’s job:

| Belongs in orchestrator                                                                                       | Belongs in a helper below                                                          |
| ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| What we **do** (verb, side effect, return)                                                                    | How a **fact** was computed                                                        |
| **`const x = getX()`** — names the fact, not the steps                                                        | Branching policy, I/O chains, validation trees                                     |
| Optional presence: `value && map(value)` when absent → `undefined` ([§](#optional-presence-map-when-defined)) | `value ? map(value) : undefined`; redundant `if (!value) return` before one mapper |
| Policy guards (`if (isRunning) return …`) before optional tail when branches differ                           | Folding policy into `&&` with a present optional input                             |

**Bad (subclauses):** default value, then `if` patches, then one use.  
**Good (sentences):**

```ts
export function getJobDescription(jobId: RunnableJobId, isResumable = false): string {
  const description = getDescription(isResumable);
  const hint = getHint(jobId);
  return hint ? `${description}${hint}` : description;
}
```

(`getDescriptionForJob` / `getHintForJob` in the repo when bare names fail ripgrep — see [module namespace](#module-namespace-encapsulation).)

Async + side effect uses the same shape:

```ts
const redirectTo = await getSignOutRedirect();
await signOut({ redirectTo });
```

**Canonical (platonic):** [getJobDescription.ts](../../../app/_components/getJobDescription.ts). **Canonical (async):** [SignOut.ts](../../../lib/actions/SignOut.ts).

### Aloud test

Read the orchestrator aloud. It must sound like **2–4 short sentences** with **no** “unless,” “except,” “first we set,” or “later we might change.” If you need those words, extract.

### Borderline: tiny inline at orchestrator

A **single** trivial expression with **no policy tree** may stay inline when the orchestrator sentence stays clear:

```ts
const headers = input.traceId ? traceHeaders(input.traceId) : undefined;
```

If the expression will grow branches, concerns, or a second consumer — **extract immediately** (`getResponseHeaders(input)`). When in doubt, extract.

---

## Derivation helpers

### Naming (two visibility levels)

| Visibility                  | Goal                                  | Name for                                                                   |
| --------------------------- | ------------------------------------- | -------------------------------------------------------------------------- |
| **Export / shared module**  | Grep + blast radius across the repo   | The **question** — `getSignOutRedirect`, `hintForHarvestJob` after extract |
| **File-local (unexported)** | **Eloquent sentence** inside the file | Shortest **fact** words — module context drops repetition                  |

Cross-module and shared helpers — name for the **question**, not the caller site:

| Good                 | Bad (too long / site-prefixed)   |
| -------------------- | -------------------------------- |
| `getSignOutRedirect` | `signOutRedirectForOperator`     |
| `hintForHarvestJob`  | `getHintForJobDescriptionModule` |

Use **`get`** / **`build`** / **`resolve`** / **`parse`** when the verb helps; do not repeat the platonic export stem in every private helper.

### Module namespace (encapsulation)

**Design intent:** Write orchestrators that read like **concise speech**. In conversation we omit words the room already knows; a platonic **module is the room** — file name + export + unexported boundary carry context so private names stay short.

**Repetition:** Avoid echoing the module stem in every helper (`getJobDescription` → `getDescription`, not `getJobDescriptionForRunnableJob`). Re-read the orchestrator: if it sounds redundant aloud, compress private names.

**Orchestrator bindings (`const` facts at Level 0):** The same compression applies to every named fact in an **export body** — React FC, `*Service.ts`, short `format*` / `get*` helpers, route handlers. The **export name + params + types** are the room; bindings should be the **shortest honest fact** (`parts`, `live`, `hint`, `stopJobId`), not a replay of where the value came from.

| Repetition source         | Smell                                                        | Prefer                            |
| ------------------------- | ------------------------------------------------------------ | --------------------------------- |
| **Module / export stem**  | `getJobDescription` + `jobDescriptionBody`                   | `description`                     |
| **Folder / feature stem** | `getJobTileLastRun` in `job-tile/`                           | `getLastRunForJob` / `getLastRun` |
| **Callee / helper stem**  | `runSummarySubtitleParts` → `summaryParts`                   | `parts`                           |
| **Type or field echo**    | `JobRunRecord` row → `runRecord` when param is already `run` | `run` or `row`                    |

**Callee mirroring** is the easy miss: copying the imported helper’s trailing noun into the binding (`buildInboxServices` → `inboxServices`, `getLiveRunForJobFamily` → `liveRun`). The helper name is for **grep across the repo**; the local binding is for **the sentence in this file**. If `formatLastRunLinkTitle` already states the job, `const parts = runSummarySubtitleParts(…)` is enough — you are not searching for “summary parts” inside that function.

**Collision rule:** Add the **minimum** qualifier only when two bindings in the **same block** would mean different things (`description` vs `hint`). Do not pre-qualify for a merge on the next line (`[startedRelative, ...parts]`) — the spread line is not a second binding competing for `parts`.

**Grep is a tax, not a style:** Bare `getDescription` / `getHint` are the eloquent target inside `getJobDescription.ts`. Add the **smallest** disambiguator only when repo search or stack frames need it (`getHintForJob` — not a license for long names). **`…ForJob` repeating `Job` after `getJobDescription` is an acceptable compromise, not the ideal.** Long file-local names are a **smell** — you are paying grep because context was not enough.

**Compression ladder (bindings + file-local helpers):**

```text
0. Orchestrator const — shortest fact (parts, live, hint); no callee/module/folder stem echo
1. Unexported helper — getDescription, getHint (module + stack frame give context)
2. Minimal grep tax — getDescriptionForJob, getHintForJob (only if step 1 is ambiguous in ripgrep)
3. Extract + question name — hintForHarvestJob (second caller; shared module)
```

**Reads as:** `getJobDescription.getDescription`, `getJobDescription.getHint` — stack `getJobDescription()` → `getHint()`.

#### Do

| Do                                                                                                            | Why                                                        |
| ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Keep Level 1 helpers **unexported**                                                                           | Encapsulation is the strategy; export ends the namespace   |
| Name orchestrator bindings for the **sentence** (`description`, `hint`, `parts`)                              | `const hint = getHint(…)` reads as one line of prose       |
| Compress `const` facts — no callee/module/folder stem echo on bindings ([§](#module-namespace-encapsulation)) | `summaryParts` from `runSummarySubtitleParts` → `parts`    |
| **Shorten private params** when type + module disambiguate (`id` in `getHint`)                                | Params are rarely searched like function names             |
| Keep **export** params purpose-named (`jobId`, `isResumable`)                                                 | Call sites and types are searched and bridged from parents |
| Prefer **one platonic export** per file                                                                       | File name + export = context for everything below          |
| On **second caller**, extract and use a **question** name                                                     | Blast radius moves to the shared helper                    |

#### Don’t

| Don’t                                                               | Why                                                                                     |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Export helpers “for convenience”                                    | Forces global-length names; kills namespace compression                                 |
| Repeat the export stem in every private helper                      | `getJobDescription` + `getJobDescriptionBody` — context already said “job description”  |
| **Double-stem** exports (`getJobTileLastRun` in `job-tile/`)        | Folder + FC already say “tile”; middle stem is noise (`getLastRunForJob`, `getLastRun`) |
| Vague outcome suffixes (`Relative`, `Live`, `Info`)                 | Name the **field or fact** returned (`formatStartedRelative`, `getStateForJob`)         |
| Default to wh-question names **inside** a single-entry file         | `descriptionForResumable` is for shared/extracted helpers, not mandatory local style    |
| Lengthen names “to be safe” without a failed ripgrep                | Long names are a smell — pay only the grep tax you need                                 |
| **Callee-mirror** orchestrator bindings (`summaryParts`, `liveRun`) | Helper name is for repo grep; binding is for the local sentence                         |
| Qualify for a **later** line (`titleParts` before spread/join)      | Next-line composition is not a naming collision — use `parts`                           |
| Shorten **export** params to `id` when callers search `jobId`       | Export is the public face of the module                                                 |
| Hoist private helpers above the export                              | Breaks “read the sentence first”                                                        |

**Canonical (grep compromise in-repo):** [getJobDescription.ts](../../../app/_components/getJobDescription.ts) uses `getDescriptionForJob` / `getHintForJob` where bare `getDescription` / `getHint` were too ambiguous repo-wide — orchestrator shape is still the lesson.

### Epistemic humility

Each module should assume **as little about the wider context as possible**, and expose an API that is **as useful as possible in every context** it can serve. Read the file’s essential sentence; stay inside that job. Do not make the caller prove how data was obtained, which page it came from, or which parent composed it — unless **this file’s logic** actually depends on that.

**Interface analogy (same idea as functions):**

| Boundary                                              | Prefer                                                            | Why                                                                        |
| ----------------------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Inputs** (props, params, required types)            | **Widest honest type** — only what this module needs to run       | Fewest expectations on the caller; composable in tests, SSR, another route |
| **Outputs** (return type, rendered result, callbacks) | **Narrowest honest type** — the precise fact this module produces | Callers get a definite result, not an underspecified bag                   |

A prop list is a public interface. Extra words are extra preconditions.

**Unwarranted assumptions** (drop at this boundary when unused):

- **Provenance / transport:** `serverRuns`, `client*`, `api*`, `fetched*`, `cached*` — the type already says `JobRunRecord[]`; there is no “server run” in the tile’s world.
- **Parent / route context:** props that only mean “on the dashboard” or “in settings” when the FC does not branch on them.
- **Caller implementation:** names that encode React Query, Drive, or a specific hook — coupling without a local branch.
- **Repeated stems:** `getJobTileLastRun` inside `job-tile/` — the folder already said “tile”; you are **JobTile**, focus on that.

**Ask before every export prop / param:** “Does this name or type force the caller to know something **my branches never use**?” If yes — widen the input (simpler name, shared domain type) or delete the prop.

**When a narrow input is correct:** only facts **this file** compares or merges — e.g. `activeRuns` vs `storedRuns` where the sentence is “reconcile two run sources” ([JobRunsLive.ts](../../../lib/operator/JobRunsLive.ts)). That is a **semantic** contrast, not bragging about transport.

**Call-site bridge:** parents may keep long, searchable names (`const serverRuns = …`); children take the humble contract (`runs={serverRuns}`).

**Canonical smell:** [JobTile](../../../app/_components/job-tile/JobTile.tsx) — `runs: JobRunRecord[]`, not `serverRuns`. The tile does not care how the array arrived; it cares about runs, `latest`, and `activeJobIds`.

### Feature-folder vocabulary pass

**Always** before you stop when you created or edited **any file** in a **feature folder** — the co-located directory for one UI or workflow slice (orchestrator FC, `*Service.ts`, leaf FCs, local `*.ts` helpers). Run this pass **in addition to** behavior fixes; prop reduction, legacy removal, and pass-through deletion **do not** replace it.

1. **Walk every file you touched** in that folder (plus modules the orchestrator imports from the same folder).
2. **Strip repeated module stems** everywhere they appear — exports in service/helpers, not only in `*Service.ts`. The folder name + platonic FC/export already carry context ([module namespace](#module-namespace-encapsulation)).
   - **Single stem left in the middle** is still wrong: `getJobTileLiveState` → `getStateForJob` (not `getJobState` — you still hear “job” twice at the call site).
   - **Double stem** is worse: `getJobTileLastRun` in `job-tile/` → `getLastRunForJob` or `getLastRun` — never re-embed the folder stem inside the verb phrase.
   - **Cross-module names** with UI stems (`getJobTileLastRunFromRecord`) belong in operator as neutral facts (`getLastRunFromRecord`, `JobLastRun`); feature folders use local orchestrator names (`getLastRunForJob`).
3. **Suffixes must name the fact**, not a vague category: `getLastRunRelative` → `formatStartedRelative` (formats `startedAt`); avoid `Relative` / `Live` / `Info` unless the type name is already that word.
4. **Remove redundant facts** in orchestrators and at boundaries: alias props or `const` bindings that always equal another value (`summaryJobId` when it is always `jobId`); one-hop wrappers that only forward props without adding vocabulary (**ESLint** `shoebox/no-trivial-delegate` for unexported `return callee(sameArgs)`); **callee-mirrored** locals (`summaryParts` from `runSummarySubtitleParts` → `parts` when the export sentence already scopes the fact).
5. **Epistemic humility** on exports ([§ Epistemic humility](#epistemic-humility)): widen inputs to the fewest facts this file needs; drop props/names that assert caller context this file never branches on (`serverRuns` → `runs`, parent-only flags, unused stems).
6. **Aloud test** each orchestrator **import and call line** — each `const x = …` must sound like one fact, not a stacked product name:

```ts
const { isRunning, stopJobId } = getStateForJob({ jobId, activeJobIds, runs });
const lastRun = getLastRunForJob(latest ?? undefined);
const startedRelative = formatStartedRelative(lastRun);
```

If you hear the folder stem twice (“tile … tile”), compress the helper name, drop the alias, or fold the wrapper.

### Shape inside helpers

- **Early `return`** — each branch returns a **finished** value (string, object, `null`), not a delta on shared state.
- **No outer `let`** to accumulate the answer across branches.
- **Petro I/O:** one `await` per line → `const` bindings; no `return foo(await bar())`.
- **Level 2:** trivial two-outcome string/null → `return pred ? a : b` when the **whole helper is the pick**; guard + pipeline → `if` + steps (`describeNearMiss` pattern in petro-code-composition-oriented).

### File order

```text
export async function orchestrator …   // or export const MyFc: FC
async function getFactA …              // directly under orchestrator if only it calls
function leafUsedByGetFactA …          // under getFactA
```

Do **not** hoist helpers above the exported entry “for readability.”

### Shared vs file-local

Keep helpers **file-local and unexported** while only one entry needs them — compress names under [module namespace](#module-namespace-encapsulation). Extract to a **sibling module** when a second **platonic** caller needs the same question answered (see petro-code-composition-oriented platonic ideal); **rename for the question** on extract (`hintForHarvestJob`), not by stretching the file-local name.

---

## `let` — strongest extract signal

| Pattern                                          | Verdict                                      |
| ------------------------------------------------ | -------------------------------------------- |
| `let x = default; if (…) { x = … }` then one use | **MUST extract**                             |
| `let x; if (a) x = … else x = …`                 | **MUST extract**                             |
| `for` / `while` with `let i` / `let sum +=`      | Allowed                                      |
| `reduce` with `const` accumulator callback       | Preferred over manual `let sum` when clearer |

**Positive rule:** orchestrator uses **`const` = named question**. **`let` across branches** means you skipped a helper.

---

## Nested `if` — second-strongest signal

**Nested `if` in the orchestrator** (`if` whose body contains another `if` before the essential `return` / side effect) is a **very strong** fractal smell — on par with **`let` pick-accumulators**. It usually means a **policy tree** is sitting where only **facts + action** belong.

### Orchestrator — nested `if` → MUST extract

```ts
// Smell — nested policy before signOut (even without let)
export async function signOutOperator(): Promise<void> {
  const session = await getOperatorSession();
  if (session) {
    if (await shouldForceGoogleOAuthConsent(session.email)) {
      await signOut({ redirectTo: GOOGLE_OAUTH_CONSENT_SIGNIN_HREF });
      return;
    }
  }
  await signOut({ redirectTo: '/signin' });
}
```

```ts
// Fractal — flat orchestrator; branching lives in getSignOutRedirect
const redirectTo = await getSignOutRedirect();
await signOut({ redirectTo });
```

Same rule for **nested `if` filling one variable**, **nested `if` + `else` chains**, and **`switch` nested inside `if`** at the orchestrator level.

### Helpers — prefer flat guards, not nesting

Inside **Level 1 helpers**, use **sequential early `return`s**, not deeper trees:

```ts
// Good — flat guards in getSignOutRedirect
if (!session) {
  return '/signin';
}
if (needsConsent) {
  return GOOGLE_OAUTH_CONSENT_SIGNIN_HREF;
}
return '/';
```

```ts
// Smell in a helper — another zoom level is missing
if (session) {
  if (needsConsent) {
    return CONSENT_HREF;
  }
  return '/';
}
return '/signin';
```

If a helper needs **nested** `if`, split Level 2 (`sessionPresent`, `consentRequiredForEmail`, …) or rename the helper — the tree is answering **more than one question**.

### `let` + nested `if` together

When both appear in an orchestrator, extract **immediately** — that is the failed `signOutOperator` shape in [examples.md](examples.md).

---

## Guard conditions — no compressed policy

**Smell:** One `if (...)` test that mixes **several kinds** of policy — e.g. “bound is enabled” **and** (“money missing” **or** “amount below bound”). Typical shape: `if (a !== null && (!b || f(b) < a))`.

**Aloud test:** If you need parentheses or “and also / or when” to explain the condition, it is compressed. The reader should hear one fact per guard line.

| Smell in `if` test                                             | Prefer                                                                                                                                                   |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nullable field + presence + comparison in one expression       | Sequential flat guards in a **question-named** helper (`ruleFailsMinAmount`)                                                                             |
| `&&` / `\|\|` stack with 3+ top-level clauses                  | `const` boolean facts (`lacksMoneyForMin`) then `if (lacksMoneyForMin)` — **affirmative** names ([boolean-var-prefix](../petro-code-standards/SKILL.md)) |
| Negation + disjunction (`!money \|\| …`) hiding the real cases | Early returns in helper: bound off → false; no money → true; else compare                                                                                |
| Same compressed test copy-pasted for min/max                   | One helper per question; orchestrator: `if (ruleFailsMinAmount(…)) return false`                                                                         |

**Do not** “fix” compression by nesting `if` inside `if` — [nested `if`](#nested-if--second-strongest-signal) and `shoebox/no-nested-if` forbid that. **Extract** or bind **named booleans**, then flat guards.

```ts
// Smell — three concerns, one line ([UnitRules.ts](../../../lib/domain/shared/settings/UnitRules.ts) before refactor)
if (rule.minAmountMajor !== null && (!money || amountMajor(money) < rule.minAmountMajor)) {
  return false;
}

// Fractal — helper answers one question; orchestrator stays a sentence
if (ruleFailsMinAmount(rule, money)) {
  return false;
}

function ruleFailsMinAmount(rule: UnitRule, money: InvoiceMoney | null): boolean {
  const minMajor = rule.minAmountMajor;
  if (minMajor === null) {
    return false;
  }
  if (!money) {
    return true;
  }
  return amountMajor(money) < minMajor;
}
```

**ESLint:** No dedicated rule yet — **skill + hard review**. Optional future: cap `&&` / `\|\|` depth in `if` tests (high false-positive risk in domain code).

---

## Mandatory extraction triggers

Extract **before stop** if **any** apply at **any binding site** in an exported entry ([binding sites](#binding-sites--no-subclauses-hard)):

1. **`let`** assigns the same binding in multiple branches (**strongest**).
2. **Nested `if`** (or nested `if`/`else`) before the essential line (**second-strongest**).
3. **Default + conditional override** for one value used once downstream.
4. **Multiple concerns** without each as `const fact = helper()` at the top (session + policy + effect).
5. **Any `if` / `switch` block** whose primary job is computing one value for the next line — even flat, extract to a named question.
6. **Aloud test fails** — needs “unless / except / first / later.”
7. **Derivation obscures** the essential verb line (anything above `await signOut` / `return <Shell>` / the **JSX child prop list** that isn’t `const` facts or identifier props).
8. **Nested call** in a prop or spread operand (`f(g(…))`, conditional spread on `<Component` in `app/**`).
9. **Duplicate scan** for one fact (e.g. `getLive…` then `getHasLive…` — return both from one helper).
10. **Compressed guard** — `if` test mixes bound/presence/comparison (or 3+ top-level `&&` / `\|\|`) — [guard conditions](#guard-conditions--no-compressed-policy); extract or named boolean facts.

Line count is **not** a trigger. Five interleaved lines fail; three clear sentences pass.

**Inside helpers:** nested `if` → add Level 2 or split helpers; do not “fix” by moving the same tree into the orchestrator.

---

## By surface

| Surface               | Orchestrator                                | Derivation (Level 1)                      | Presentation                                       |
| --------------------- | ------------------------------------------- | ----------------------------------------- | -------------------------------------------------- |
| Server action         | `const` facts → one side effect             | `getSignOutRedirect`, `buildPayload`      | N/A                                                |
| API handler           | `const` facts → `return Response`           | `getResponseHeaders`, `buildResponseBody` | HTTP                                               |
| Workflow / lib export | `const` facts → `return` or side effect     | `buildInboxServices`, `prependJobRun…`    | N/A (domain, jobs, cache, handlers, auth, …)       |
| React FC              | destructure → `const` slices → shell / tier | string selectors, `const Icon = …`        | JSX shell (petro-code-composition-oriented shapes) |

**Selectors** (petro-code-composition-oriented) are React’s derivation helpers — **no JSX** in selectors; fractal file order still applies (FC top, selectors below).

Fractal answers **layering functions**; petro-code-composition-oriented answers **branching UI** and **platonic names**. Apply **both** on FCs.

---

## Refactoring workflow

1. State the module’s **essential sentence** (one line, no parent screen name).
2. List **facts** the sentence needs (`redirectTo`, `body`, `icon`, `description`).
3. For each fact not trivially inline → **helper named as question**, early returns.
4. Rewrite orchestrator: guards → `const` facts → action/return.
5. **`let` scan** — zero pick-accumulators in orchestrator and new helpers.
6. **Aloud test** on orchestrator.
7. **Nested `if` scan** — none in orchestrator; helpers flat or split.
8. **[Feature-folder vocabulary pass](#feature-folder-vocabulary-pass)** on every file touched in that folder (always when applicable).
9. Run [petro gate](#workflow-gate-before-stop) + petro-code-composition-oriented self-review if `.tsx`.

---

## Anti-patterns

| Smell                                                           | Fix                                                                                  |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Policy + `signOut` / `return` in one function                   | `const redirectTo = await getSignOutRedirect();` then act                            |
| `let` + patch before single use                                 | Helper + `const` at caller                                                           |
| Helper returns “partial” state to finish in caller              | Complete value per branch                                                            |
| Vague `processInput`                                            | Rename to question (`parseJobRunId`, `resolveVendorSlug`)                            |
| 40-line orchestrator “because it’s one workflow”                | Multiple `const` facts + helpers; orchestrator stays short                           |
| Hoisted `function` block above export                           | Move under orchestrator                                                              |
| **Nested `if` in orchestrator** (policy tree before act/return) | `const x = getX()` — flat guards only in helpers                                     |
| Nested `if` inside a helper answering one question              | Level 2 extract or split helper                                                      |
| Flat `if` in orchestrator computing one downstream value        | Named `get…` / `build…` helper                                                       |
| Ternary cramming guard + two helper calls in one line           | Guard `if` + pipeline in Level 2                                                     |
| Nested calls in JSX `prop={…}`                                  | `const` facts + `prop={fact}` — [binding sites](#binding-sites--no-subclauses-hard)  |
| `{...(cond ? { prop: val } : {})}` on JSX components (`app/**`) | Explicit `prop={val}`; optional `undefined`; or `*Service` helper                    |
| `as JobId` / `as RunnableJobId` on props                        | Fix helper return type or narrow in `lib/**`                                         |
| Thin wrapper FC with derivation only in JSX attrs               | `const` block + identifier props; fold into child `*Service` if repeated             |
| Callee-mirrored `const` (`summaryParts`, `inboxServices`)       | Shortest binding (`parts`, `services`) — export + params carry context               |
| Stem stack on a single binding (`summarySubtitleParts`)         | One earned qualifier max; prefer bare fact word                                      |
| `?: undefined` / `if (!v) return` before one mapper             | `v && map(v)` when only optional presence ([§](#optional-presence-map-when-defined)) |
| Repeated `obj.a`, `obj.b`, … in one block                       | Destructure at earliest site when no scope clash ([§](#destructuring))               |
| Callback `x => x.foo.bar` (JSX, `.map`, sort, …)                | Param destructure; named `const` + identifier on JSX prop ([§](#destructuring))      |

---

## Three passes (mandatory per file)

On **every file with an exported orchestrator that you touch** — and on **every orchestrator in scope** during [conformance tasks](../petro-code-standards/SKILL.md#conformance--refactor-tasks-hard) — run **three separate passes on the same file**. Do not merge passes. **Do not skip pass 3.**

| Pass | Lens | Walk these (line-by-line) |
| ---- | ---- | ------------------------- |
| 1 Structure | Guards, `let`, nested `if`, layering, helper file order | Pick-accumulators; policy before essential line; helpers under exports |
| 2 Binding sites | `const` facts, spreads, JSX/call props | Subclauses in literals/props; conditional spread on components |
| 3 Names & destructure | Callee-mirror, stem repetition, parse boundaries, vocabulary | `obj.field` × 2+; `parsed.data.*` after guard; terse locals; [feature-folder pass](#feature-folder-vocabulary-pass) when folder touched |

**Pass 2 alone is insufficient.** Agents routinely miss pass 3 (destructuring, callee-mirror) and stop at lint green. That is a **stop-ship** on conformance tasks.

Record ✓/open per pass in the [conformance report](../petro-code-standards/SKILL.md#conformance-report-mandatory-artifact). On feature/fix tasks, still run all three passes — report optional unless user asked for rigorous work.

### Conformance scope (inventory before edit)

Before editing on a conformance task, list every exported orchestrator in the declared path:

```text
Scope: src/api/orders/
Orchestrators: createOrder.POST, continueOrder.POST, cancelOrder.POST, …
```

Fix **all** listed orchestrators. Row count in the conformance report must match this list.

---

## Self-review (before stop)

Run **[three passes](#three-passes-mandatory-per-file)** first, then **[petro-code-standards — Hard review](../petro-code-standards/SKILL.md#hard-review-interrogate-before-gate)** (ESLint + skill-check greps).

```text
- [ ] Essential sentence: stated in one line without parent/site name?
- [ ] Orchestrator aloud: 2–4 sentences, no unless/except/first/later?
- [ ] Every non-trivial fact: const x = namedHelper() at orchestrator?
- [ ] let scan: no pick-accumulator in orchestrator or new helpers?
- [ ] Nested if scan: no nested if in orchestrator or helpers ([Scope](#scope); `shoebox/no-nested-if` where enabled); flat guards or Level 2 extract?
- [ ] Guard conditions: no compressed `if (a && (b \|\| c))` policy — [§ guard conditions](#guard-conditions--no-compressed-policy); question-named helper or `const` facts?
- [ ] Helpers: unexported; shortest fact names; grep tax only if needed; wh-question if shared; complete returns; under caller?
- [ ] Feature-folder vocabulary pass (if folder touched): stems stripped, redundant props/consts removed, unwarranted context dropped from contracts ([epistemic humility](#epistemic-humility)), import/call lines aloud?
- [ ] Name smell: any private helper longer than the orchestrator sentence requires? Any prop/const duplicating the same id (summaryJobId === jobId)? Any callee-mirrored binding (`summaryParts` from `runSummarySubtitleParts`) — compress to shortest fact (`parts`)?
- [ ] Destructuring: 2+ reads from one binding → destructure at earliest site; **after parse/validation success guard**; callback param stem chains → destructure at param; inline JSX callbacks → named `const` + identifier prop ([§](#destructuring))?
- [ ] Three passes: pass 1, 2, and 3 each walked line-by-line on this file (conformance report ✓)?
- [ ] Petro inlined: one await/line; trivial A/B → ternary; optional `T|undefined` → `value && map(value)` not `?: undefined`; policy `if` before optional tail; guard+pipeline → if; no nested ? :
- [ ] Binding sites: no subclauses in const/return/JSX props; no conditional spread on components in app/?
- [ ] Optional object fields: named `const` slices (`cond ? { k } : {}`), not inline `...(cond && { k })` — ESLint `no-conditional-object-spread` ([standards §](../petro-code-standards/SKILL.md#lib-optional-object-fields-do-not-conflate-with-optional-presence))?
- [ ] JSX props (app/): values are identifiers/literals after const block — no nested f(g()) in attributes?
- [ ] No view-layer as casts for job ids — helper types carry RunnableJobId/JobId?
- [ ] No duplicate family/live scans for one fact?
- [ ] Mandatory triggers (incl. #8 #9): none left unaddressed?
- [ ] Blast radius: would a policy change touch only the right helper?
- [ ] .tsx only: petro-code-composition-oriented shape + bridges still valid?
```

---

## Related skills (not duplicated here)

| Skill                                                                          | You still need it for                                                                   |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| [petro-code-standards](../petro-code-standards/SKILL.md)                       | Gate, architecture, `data-id`, design system, full JSX/`cn()` tables, PWA, blast radius |
| [petro-code-composition-oriented](../petro-code-composition-oriented/SKILL.md) | Platonic **component** names, JSX shapes A–E (UI refactors; read after fractal on FCs)  |
| [typescript](../typescript/SKILL.md)                                           | Repo TS conventions beyond the inlined export/type notes above                          |

---

## Quick reference card

```text
ENTRY:   guards → const fact = shortHelper() → ACT   (reads like speech)
BIND:    shortest const (parts, live) — no module/folder/callee stem echo on bindings
LOCAL:   unexported; shortest fact name; +grep tax only if ripgrep needs it
SHARED:  extract + question name on second caller
SMELL:   long private name without grep excuse
SIGNAL:  let pick-accumulator → extract
SIGNAL:  nested if in orchestrator → extract (second-strongest)
SIGNAL:  compressed if (a && (b || c)) → question helper or const facts
LINT:    shoebox/no-nested-if where enabled (else-if counts; callbacks own scope)
SCOPE:   any exported orchestrator in app/** or lib/** — not a folder allowlist
TEST:    read entry aloud — no subclauses at ANY binding site (incl. JSX props)
PASS:    feature folder (always) → vocabulary sweep; three passes per file; conformance report on refactor tasks
STOP:    lint green alone on conformance work — report zero open items required
BIND:    props = identifiers; no spread-optional on <Component; DTO spread only in named lib builders
PETRO:   one await/line; nested ?: forbidden; trivial A/B → ternary; optional → value && map(value)
WHY:     encapsulation drops words; extract widens them
```
