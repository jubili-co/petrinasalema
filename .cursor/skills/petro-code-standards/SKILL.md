---
name: petro-code-standards
description: >-
  Mandatory standards for all agent-written code: architecture, TypeScript, Tailwind cn(),
  Conditional JSX (ESLint), data-id markers, PWA bar, blast-radius refactor, self-review,
  conformance report (mandatory on refactor tasks), skill-check greps, format/lint/typecheck gate,
  binding sites (no prop subclauses / conditional spread on components).
  Read and apply before any .ts/.tsx/.mjs/.css change.
---

## Trace
Before anything else when this skill applies, run its `scripts/trace.sh`. It prints a `[skill-trace]` line so the run's terminal log shows the skill fired.
<!-- skill-trace-block -->


## Agent contract

### Skills before local style

Apply **petro skills and project docs** before miricking the file you are editing. Surrounding code may be legacy or mid-refactor and can violate the bar — skills and ESLint win over copy-paste.

**Before you stop:** complete the correct stop checklist for the task type ([Conformance & refactor tasks](#conformance--refactor-tasks-hard) or [Hard review](#hard-review-interrogate-before-gate)), then run the [gate order](#gate-order-all-tasks). Re-read the diff; fix every violation — do not defer. **Lint clean is not sufficient** on conformance tasks ([Lint clean ≠ skill clean](#lint-clean--skill-clean)).

| MUST                                                                                                                                                                                                             | MUST NOT                                                                                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `const X: FC<Props>`; local `type Props`; `type` not `interface`                                                                                                                                                 | Classes (except `Error` subclasses); barrel `index.ts`; `any`                                                                            |
| UI → API → domain; domain never imports `app/`                                                                                                                                                                   | Inverse imports; sideways module deps (use `lib/domain/shared/*`)                                                                        |
| `{cond && value}` for render-or-nothing; guard LHS (`length > 0`)                                                                                                                                                | `{cond ? value : null}`; `{cond ? <A /> : <B />}` for elements                                                                           |
| Paired `&&` for binary element branches                                                                                                                                                                          | Element ternaries; `function render*(): ReactElement`                                                                                    |
| Sibling `const X: FC` + early returns for 3+ JSX outcomes                                                                                                                                                        | Nested ternaries / ternary chains anywhere                                                                                               |
| Inline one-level `? :` for short JSX **text** only                                                                                                                                                               | Hoisting trivial copy to `const` / `getFooLabel()`                                                                                       |
| `return pred ? 'a' : 'b'` (or `MAP[k]`) for trivial **non-JSX** two-way picks                                                                                                                                    | `if (pred) { return 'a'; } return 'b';` when one ternary line suffices                                                                   |
| **Optional presence:** `return value && map(value)` when absent → `undefined` and present → one mapper ([§ below](#optional-presence-map-when-defined))                                                          | `value ? map(value) : undefined`; `if (!value) { return undefined; } return map(value)` for that shape only                              |
| `cn(..., { 'class': flag }, ...)` for boolean-gated classes                                                                                                                                                      | `flag && 'class'` or `cond ? 'a' : 'b'` inside `cn()`                                                                                    |
| Static layout on `className` (Tailwind / arbitrary values)                                                                                                                                                       | `style={{}}` for static padding, colour, z-index, motion                                                                                 |
| `data-id` on roots, layout, interactive, content nodes — **static string literals only**; same value may repeat (loops OK; role tag, not unique id); typed props `'data-id'`, `'shell-data-id'`, `'clear-data-id'`, `'data-id-prefix'` (quoted keys) | Bare `header` / `search`; any string interpolation / concatenation / variable in `data-id`; camelCase `dataId` / `*DataId` prop names   |
| Object/type fields: `onSave(): void` (method signature style)                                                                                                                                                    | `onSave: () => void` in type definitions                                                                                                 |
| Humble API keys: `runs`, `hasPendingRun` in object literals and exported input types                                                                                                                             | `serverRuns`, `hasPendingClientRun` as object keys (parent may keep `const serverRuns` for `runs={serverRuns}` bridge)                   |
| One `await`/I/O step per line → named `const`                                                                                                                                                                    | `return foo(await bar())`; nested `await` in args/index; **nested calls in JSX props**                                                   |
| Orchestrator = essential sentence(s); facts at **binding sites** — **[petro-code-fractal-orchestration § Binding sites](../petro-code-fractal-orchestration/SKILL.md#binding-sites--no-subclauses-hard)** (HARD) | `let x = default; if (…) { x = … }` then single use; inline policy in props; `{...(cond ? { k: v } : {})}` on JSX components in `app/**` |
| Optional JSX props: `prop={fact}` (`undefined` when absent)                                                                                                                                                      | Conditional object spread on `<Component` to “omit” props in `app/**`                                                                    |
| Split feature folder on second leaf `FC` or ~150 lines + 2 concerns                                                                                                                                              | Third concern crammed into an already dense view file                                                                                    |
| Blast-radius clean-up in the same pass when obvious                                                                                                                                                              | Wandering refactors outside the feature you touched                                                                                      |
| **Destructuring** — favor over stem repetition: **2+ reads** from one binding, **callback param stem chains** (`x => x.foo.bar` → `({ foo }) => foo.bar`), names do not clash ([§](#destructuring))              | `obj.a`, `obj.b` repeated; inline `event => event.target.value` in JSX; stem chains when param destructure is safe at the earliest site  |
| **Conformance tasks** — [report every orchestrator in scope](#conformance-report-mandatory-artifact); three passes per file ([fractal §](../petro-code-fractal-orchestration/SKILL.md#three-passes-mandatory-per-file)); zero open items before gate | Top-N caps; pass 2 only; lint-only stop; minimum-diff when user asked for rigorous / multi-pass / conformance work |

**Lint + skill-check:** `npm run lint` zero violations. Projects document extra ESLint families in their agent instructions. Run [skill-check greps](#skill-check-run-before-gate) on scope before gate — skills govern what lint does not.

---

## Conformance & refactor tasks (HARD)

When the user asks for **skill alignment**, **conformance**, **rigorous refactor**, **nit-pick**, **multiple passes**, **aggressive cleanup**, or **fractal** / **standards** sweep — this section **overrides** minimum-diff instinct. “Aggressive” and “rigorous” mean **checklist-complete in declared scope**, not “fix the loudest violations and stop.”

### Task types

| Type | Scope | Stop condition |
| ---- | ----- | -------------- |
| **Feature / fix** | Files you touch + blast-radius siblings in the same feature folder | [Hard review](#hard-review-interrogate-before-gate) on touched files + [gate](#gate-order-all-tasks) |
| **Conformance / refactor** | **Every exported orchestrator** in the declared path (user-named directory, module, or feature) | [Conformance report](#conformance-report-mandatory-artifact) shows **zero open items** in scope, then [gate](#gate-order-all-tasks) |

**Declared path:** the directory or module set named in the task. If unnamed, ask once; default to the feature folder of the first file touched.

### MUST on conformance tasks

1. **Inventory first** — list every exported orchestrator in scope (by [fractal Scope](../petro-code-fractal-orchestration/SKILL.md#scope), not a prioritized subset).
2. **Three passes per orchestrator file** — [fractal § Three passes](../petro-code-fractal-orchestration/SKILL.md#three-passes-mandatory-per-file); **pass 3 (names + destructure) is mandatory**.
3. **Conformance report** — output [before gate](#conformance-report-mandatory-artifact); one row per orchestrator; no missing rows.
4. **Fix all open items** in scope in the same task — no “follow-up pass.”
5. **Blast radius** — when any file in a feature folder is in scope, include **sibling orchestrators** in that folder unless the user narrows scope.

### MUST NOT on conformance tasks

- **Minimum-diff optimization** — completeness in scope beats small diffs.
- **Lint-only stop** — gate green without conformance report = incomplete ([Lint clean ≠ skill clean](#lint-clean--skill-clean)).
- **Top-N / prioritization caps** — no “fix the 25 loudest hits.”
- **Legacy-as-permission** — surrounding code that violates the bar is debt to fix in scope, not a pattern to copy.
- **Pass 2 only** — binding-site grep without pass 3 misses destructuring and callee-mirror debt.
- **Repo-wide roam** — stay inside declared path + feature-folder blast radius.

### Lint clean ≠ skill clean

ESLint and typecheck catch a **subset** of petro rules. These remain skill-governed until a project adds matching lint rules:

- Callee-mirror locals
- Essential-sentence / aloud test
- Feature-folder vocabulary pass
- Optional presence vs policy guards (partially: `no-optional-presence-ternary` when narrow shape matches)

**Projects may ESLint-enforce (promote warn → error after debt pass):** `no-repeated-member-stem`, `no-let-pick-accumulator`, `no-nested-await`, `no-optional-presence-ternary`, `no-return-subclause`, `no-compressed-if-test`, `helpers-below-exports`, `no-conditional-spread-on-component` (UI).

**Stop-ship:** claiming conformance complete when only `lint` / `typecheck` passed.

### Conformance report (mandatory artifact)

On conformance tasks, output this table **before** `format` / `lint` / `typecheck`. Any row with an open item = task incomplete. Re-output after fixes until every row is clean.

| File | Export | Pass 1 | Pass 2 | Pass 3 | Open items |
| ---- | ------ | ------ | ------ | ------ | ---------- |
| `path/to/Handler.ts` | `POST` | ✓ | ✓ | ✓ | — |

- **Pass columns:** ✓ only if that pass’s checklist was walked **line-by-line** on that file ([three passes](../petro-code-fractal-orchestration/SKILL.md#three-passes-mandatory-per-file)).
- **Open items:** line-level failures (`L47: parsed.data.email ×6 — destructure after guard`) or `—` when clean.
- **Row count:** must equal orchestrator count in scope. Missing rows = incomplete work.

Optional detail table when fixes are non-obvious:

| File | Line | Checklist item | Status | Fix |
| ---- | ---- | -------------- | ------ | --- |
| `Handler.ts` | 47–66 | Destructuring (pass 3) | fixed | `const { id, mode } = parsed.data` after success guard |

### Skill-check (run before gate)

Projects should wire these as `npm run skill-check` (or CI). Set `SCOPE` to the declared path; set `UI_ROOT` to the project’s UI source tree. **Review every hit in scope** — unexplained silence = incomplete.

```bash
SCOPE="${SCOPE:-src}"
UI_ROOT="${UI_ROOT:-src}"

# Binding-site subclauses in JSX props
rg 'prop=\{[^}]*\([^)]*\(' "${UI_ROOT}" --glob '*.{tsx,jsx}'

# Inline JSX arrow callbacks (named const + destructure when body stems)
rg '=\{\s*\(\w+\)\s*=>' "${UI_ROOT}" --glob '*.{tsx,jsx}'

# data-id string interpolation (static literals only — repeats in loops are fine)
rg 'data-id=\{`' "${UI_ROOT}" --glob '*.{tsx,jsx}'

# Repeated parse/validation stems (manual: 2+ reads → destructure after success guard)
rg '\.(data|payload|result|value|body)\.\w+' "${SCOPE}" --glob '*.{ts,tsx}'

# let outside obvious loops (review each — pick-accumulator?)
rg 'let \w+ = ' "${SCOPE}" --glob '*.{ts,tsx}'

# Conditional spread in object literals (if not fully ESLint-covered)
rg '\.\.\.\([^)]*(\?|&&)' "${SCOPE}" --glob '*.{ts,tsx}'

# Unexported helpers above first export (file-order smell — manual review)
rg -n '^function \w+|^const \w+ = ' "${SCOPE}" --glob '*.{ts,tsx}'
```

Add **project-specific** greps (devtools markers, humble API keys, custom ESLint families) in the project’s `skill-check` script — not in this skill.

**Portable template:** [skill-check.sh](skill-check.sh) — copy or symlink; set `SCOPE` and `UI_ROOT`; wire as `npm run skill-check`. Exit non-zero when hits remain so CI can enforce review.

### Gate order (all tasks)

1. **Conformance report** (conformance tasks) or **Hard review** (feature tasks) — zero open items
2. **`skill-check`** on scope (if the project defines it)
3. **`format` → `lint` → `typecheck`** (or project equivalents)
4. Re-read diff; confirm zero open items in scope

---

## Hard review (interrogate before gate)

**Mandatory** after substantive edits on **feature / fix** tasks, **before** [gate](#gate-order-all-tasks). On **conformance tasks**, the [conformance report](#conformance-report-mandatory-artifact) supersedes this section per file — but every checklist item below must still be satisfied. Walk the diff; any unchecked item is stop-ship until fixed or explicitly out of scope.

### ESLint (zero violations required)

- [ ] `npm run lint` clean
- [ ] `shoebox/no-data-id-camel-prop` — quoted DOM-shaped keys (`'data-id'`, `'shell-data-id'`, `'clear-data-id'`, `'data-id-prefix'`); not `dataId` / `*DataId`
- [ ] `shoebox/no-conditional-object-spread` — no `...(cond ? { … } : {})` or `...(cond && { … })` in object literals (all `**/*.{ts,tsx}` except tests)
- [ ] `no-restricted-syntax` — no `serverRuns` / `hasPendingClientRun` **object keys** in types or literals
- [ ] `@typescript-eslint/method-signature-style` — `foo(): void` not `foo: () => void`
- [ ] Conditional JSX + `cn()` + `no-nested-ternary` on touched `app/**` files
- [ ] `shoebox/no-param-stem-chain` — callbacks (JSX, `.map`, etc.) with nested param stems destructure at param; one flat read (`run => run.id`) is OK
- [ ] `shoebox/boolean-var-prefix` — new boolean locals/params use an affirmative prefix (`shouldShowBar`, not `showBar` / `pending`)
- [ ] `shoebox/no-trivial-delegate` — no unexported one-hop `return callee(sameArgs)` wrappers; call the callee or export a real vocabulary name
- [ ] `shoebox/no-nested-if` on touched `app/**` / `lib/**` files — no `if` inside another `if` in the same function (incl. `else if`); sequential guards or extract helper
- [ ] **Compressed guards** — no `if (bound && (!x \|\| f(x) < bound))` in orchestrators/helpers; [fractal § guard conditions](../petro-code-fractal-orchestration/SKILL.md#guard-conditions--no-compressed-policy)

### Skill + grep (not fully automated)

Run [skill-check](#skill-check-run-before-gate) on scope; add project-specific greps from agent instructions. Minimum on touched paths:

- [ ] **Skills before local style** — skills/docs/ESLint beat copy-paste from surrounding legacy code
- [ ] **Terse locals** — single-word names when scope disambiguates; no callee/module/folder stem on `const` bindings; humble keys on child APIs (`runs`, `hasPendingRun`)
- [ ] **Optional presence** — `value && map(value)` not `value ? map(value) : undefined` / dual `if (!value) return` when only mapping when defined ([§](#optional-presence-map-when-defined))
- [ ] **Binding sites** — `const fact = …` then `prop={fact}`; optional props via `undefined`, not spread on `<Component`
- [ ] **Optional object fields** — `const fields = cond ? { a: 1 } : {}` then `...fields`; **no** inline `...(cond && { a: 1 })` ([§](#lib-optional-object-fields-do-not-conflate-with-optional-presence)); ESLint `no-conditional-object-spread` enforces
- [ ] **data-id** — four-layer checklist ([below](#data-id-required-on-jsx)); static literals only; repeats in loops OK
- [ ] **Destructuring** — 2+ reads from one binding → destructure at earliest site; **after validation success guard** (`parsed.data`, `result.value`, …); callback **param stem chains** → destructure at param; inline JSX callbacks → named `const` + identifier prop ([§](#destructuring))
- [ ] **Fractal** — every touched **exported orchestrator** in `app/**` or `lib/**` ([fractal Scope](../petro-code-fractal-orchestration/SKILL.md#scope), not a folder allowlist); [feature-folder vocabulary pass](../petro-code-fractal-orchestration/SKILL.md#feature-folder-vocabulary-pass) if folder touched
- [ ] **Composition** — platonic child names; call-site bridges are identifiers only

---

## Terse local names

- **Single-word `const` names are the ideal** when file scope, type, and neighbors already disambiguate (e.g. one `transform` in a map callback — not `rowTransform`).
- **Every qualifier must earn its place** — folder name, prop name, parameter types, and **export/function name** are context; do not repeat them in locals (`serverRuns` in a function that only merges runs is still wrong at the API — see [epistemic humility](../petro-code-fractal-orchestration/SKILL.md#epistemic-humility)).
- **No callee mirroring** — bindings must not replay the imported helper’s stem (`runSummarySubtitleParts` → `parts`, not `summaryParts`; `getLiveRunForJobFamily` → `live`, not `liveRun`). Repo-wide names are for grep; locals are for the sentence. Full rule: [fractal — orchestrator bindings](../petro-code-fractal-orchestration/SKILL.md#module-namespace-encapsulation).
- If two facts in the **same block** would collide, add the **minimum** word that distinguishes them — not a stem stack. A value used only on the **next line** (spread, join, template) is not a collision.

## Principles

1. **Functional first** — pure functions, immutable data; composition over inheritance.
2. **Modules** — independent by default; share via `lib/domain/shared/*`, never sideways.
3. **Code is documentation** — names carry intent; comments only for **why** (constraint, trade-off, quirk).
4. **DRY, not premature** — extract on the **third** repetition.
5. **No over-engineering** — no abstraction without two concrete callers.
6. **Performance is a feature** — especially on mobile.
7. **One direction** — UI → API → domain; domain never imports `app/`.
8. **Server by default** — `'use client'` only at the leaf that needs it.
9. **Type at boundaries** — `zod` on network input; explicit return types on exports; `unknown` + narrow, never `any`.
10. **Gate before stop** — [gate order](#gate-order-all-tasks); CI runs the same scripts when present.
11. **Blast radius** — after your change, fix obvious duplication, wrong layer, or split triggers **in the same feature**; don't defer local clean-up; don't roam unrelated modules.
12. **Lint clean ≠ skill clean** — on conformance tasks, [conformance report](#conformance-report-mandatory-artifact) zero open items is the bar, not lint alone.

---

## Self-review (before gate)

Run the [Hard review (interrogate before gate)](#hard-review-interrogate-before-gate) checklist first, then this table:

| Lens            | Check                                                                                                                                                                                                                                                            |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Simpler         | Dead code, speculative branches removed?                                                                                                                                                                                                                         |
| Less engineered | Seams with no second caller collapsed?                                                                                                                                                                                                                           |
| Readable        | Top-to-bottom script; compensatory comments gone? Orchestrator sentence-only? No `let` pick-accumulators?                                                                                                                                                        |
| Robust          | Indexed access, unparsed input, swallowed errors, races?                                                                                                                                                                                                         |
| Conformant      | FC/Props/type/barrels/`&&`/one direction? Trivial two-way non-JSX → ternary not dual `if`/`return`? Optional `T \| undefined` → `U \| undefined` via `value && map(value)` not `?: undefined`?                                                                   |
| Styling         | `className` not static `style`? `cn()` object args only?                                                                                                                                                                                                         |
| Structured      | Right module; split trigger; ≤~200 lines?                                                                                                                                                                                                                        |
| Blast radius    | Siblings/call sites coherent; in-scope fix not deferred?                                                                                                                                                                                                         |
| Names           | Repeated shapes → named `type`; banned locals (`buf`,`res`,`seg`,…)? Callee-mirrored `const` compressed? Feature folder touched → [fractal feature-folder vocabulary pass](../petro-code-fractal-orchestration/SKILL.md#feature-folder-vocabulary-pass) (always) |
| Steps           | No buried `await`/I/O or nested calls in JSX props? Binding-site aloud test? No conditional spread on components in touched `app/` files? Destructure at earliest site — 2+ reads, param stem chains on callbacks ([§](#destructuring))?                         |
| Devtools        | Four layers stamped — **data-id** checklist below (static literals; repeats OK)                                                                                                                                                                                  |

---

## Tailwind `cn()`

- Short `className` → plain string; skip `cn()` for one utility group.
- Past ~4–5 utilities or multiple visual concerns → `cn()` with **one semantic group per line** + brief comment (`// layout`, …). Order: position → layout → sizing → shape → typography → color → effects → motion → state → responsive.
- Visual Tailwind (color, type, borders, radii, motion) → design-system skill (`app/_design-system/*`). Consumers: layout utilities + **`sr-only` / `not-sr-only`** only.
- **Conditionals — object notation always:** `{ 'border-b': !isLast }`. Never `isError && 'border-rose-500'`; never `cond ? 'a' : 'b'`. Variable/pass-through class args stay separate args. Keys may be computed constants: `{ [borderClass]: !isLast }`.
- Prefer shorthand: `size-11`, `inset-0`, `px-4`, `mx-auto`.

```tsx
className={cn('rounded-xl border', { 'border-rose-500': isError, 'border-b': !isLast }, titleClassName)}
```

---

## CSS placement

- Styles on the **element** (`className` / attrs), not `globals.css`, unless impossible: tokens, tag resets, pseudo-elements, `@keyframes`/`@media`, third-party `[data-*]` hooks.
- Prefer arbitrary values (`pt-[var(--safe-top)]`) over new global classes.
- **`style` allowed only:** (1) virtualiser pixel `height`/`top`/`transform`, (2) measured CSS var publish (`style={{ '--toolbar': `${n}px` }}` + `calc` in `className`), (3) rare third-party — one-line why comment.
- Owned `.kebab-class` in `globals.css` → move to element and delete.

---

## Comments & readability

- **Compensatory documentation** = comment doing the code's job → rename/extract first, delete comment second.
- File reads **guards → steps → return**; call sites are verbs. Private helpers short when module context is clear; **exports** and cross-module symbols explicit.
- **One logic step per line** for `await`, I/O, side effects, multi-step transforms — not for `return items.filter(isActive)` or single property reads.

```ts
const services = await buildInboxServices(oauth);
return harvestInbox(services, logger.child('inbox'), options);
```

---

## JSX & branching

**Exported entry structure** (FC, server action, handler, domain workflow) → **[petro-code-fractal-orchestration/SKILL.md](../petro-code-fractal-orchestration/SKILL.md)** (HARD): essential sentences, `const` from named helpers at **all binding sites** ([§ Binding sites](../petro-code-fractal-orchestration/SKILL.md#binding-sites--no-subclauses-hard)), no `let` pick-accumulators.

**Duplicated early-return JSX** or context-heavy names (`RunJobSplitPrimaryLeading`) → **[petro-code-composition-oriented/SKILL.md](../petro-code-composition-oriented/SKILL.md)**: platonic module name, purpose props, pick shape, **call-site bridges** (identifier props — not spread soup). Element variants still use paired `&&` or sibling `FC` here when trees differ.

### Binding sites & prop assembly (`app/**`)

Same readability rule as nested `? :` and `let` default-then-override — see fractal [§ Binding sites](../petro-code-fractal-orchestration/SKILL.md#binding-sites--no-subclauses-hard). **Children** conditionals are below; **props** are separate.

| Surface                    | Rule                                                                                                                                                                                                                                         |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pass data into a component | `const fact = getFact(…)` then `prop={fact}` — not `prop={getFact(…)}` or `prop={f(g(…))}`                                                                                                                                                   |
| Optional prop              | `lastRun={lastRun}` when `lastRun` may be `undefined` — not `{...(latest ? { lastRun: map(latest) } : {})}`                                                                                                                                  |
| View job ids               | Helper return type / narrow in `lib/**` — not `as RunnableJobId` on JSX props                                                                                                                                                                |
| DTO / API body in `lib/**` | `const slice = cond ? { key } : {}` then `...slice` — not inline `...(cond && { key })` in the literal; not on `<Component` in `app/**` ([§ lib optional object fields](#lib-optional-object-fields-do-not-conflate-with-optional-presence)) |

```tsx
// FORBIDDEN in app/** — prop subclauses (not covered by element-conditional ESLint)
<FolderTree {...(folderStats ? { stats: folderStats } : {})} />
<JobTile stopJobId={getStopJobIdForLiveRun(getLiveRunForJobFamily(…), jobId) as RunnableJobId} />

// OK
<FolderTree stats={folderStats} />
<JobTile jobId={jobId} latest={latest} runs={serverRuns} />
```

**Narrative:** [fractal examples §6b](../petro-code-fractal-orchestration/examples.md#6b-react--prop-subclauses-vs-binding-site-facts).

| Surface             | Rule                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------ |
| Render or nothing   | `{loaded && <Child />}` — never `{cond ? <Child /> : null}`                                |
| Leak guard          | `{items.length > 0 && <List />}` — not `{items.length && …}`                               |
| Two elements        | `{a && <A />}{!a && <B />}` — never `{a ? <A /> : <B />}`                                  |
| Two strings in text | Inline `{pending ? 'Running…' : label}` — no hoist, no `getFooLabel()`                     |
| Two non-JSX values  | `return pred ? 'a' : 'b'` or `return pred ? 'a' : MAP[k]` — see **Non-JSX two-way picks**  |
| 3+ element outcomes | Sibling `const X: FC<Props>` + early `return`s — not nested `? :`, not `renderFoo()`       |
| 3+ non-JSX values   | `function getUrl(…)` + early `return`s — simple cases first, flat `if`s, complex path last |
| Nested `? :`        | **Forbidden** in JSX, `const`, templates, returns — extract function or FC                 |
| Prop subclauses     | Nested calls / conditional spread on `<Component` in `app/**` — fractal binding sites      |

**JSX returns elements → FC, not `function get*(): ReactNode`.** Non-trivial string logic → named `function`; trivial copy stays in JSX.

```tsx
// FORBIDDEN
{empty ? <Empty /> : <List />}
const x = a ? b : c ? d : e;
const primaryLeading = busy ? <Spinner /> : showCancel ? <Square /> : <Play />;

// OK — binary elements
{kind === 'stored' && <StoredMeta … />}
{kind === 'client-pending' && <RunningElapsed … />}

// OK — trivial copy
<span>{pending ? 'Running…' : label}</span>
```

### Non-JSX two-way picks (prefer ternary)

When **all** of these hold, use a **single** `return predicate ? a : b` (same rule for one-line `const` assignments outside JSX):

1. **Exactly two** outcomes — no third branch, no nested `? :`.
2. **Non-JSX** — both sides are string/number/boolean literals, enum members, or one **map lookup** (`MAP[key]`), not element trees or `ReactNode`.
3. **Trivial** — each branch is one expression; no statements in branches.
4. **Readable on one line** (~80 chars); otherwise use early-return `function`.

```ts
// Avoid — equivalent to one ternary
if (outcome === 'wouldSave') {
  return 'outline';
}
return HARVEST_OUTCOME_FILL[outcome];

// Prefer
return outcome === 'wouldSave' ? 'outline' : HARVEST_OUTCOME_FILL[outcome];
return isFromScratchHarvestJob(jobId) ? 'Re-extracted' : 'Extracted';
```

**Keep early returns when** either branch calls a **non-trivial** helper (`wouldSaveOutcomeLabel(jobId)` — multi-step or domain copy), either branch is JSX, there are 3+ outcomes, the predicate needs nested `? :`, the “else” is a **pipeline** (guard then more named steps), or the pick belongs in `cn()` (object notation only). A **leaf** formatter in one branch (`formatPercent(score)`) still qualifies for a ternary when the function is otherwise only that pick.

**Fractal:** FC first, selectors below callers — [petro-code-fractal-orchestration/SKILL.md](../petro-code-fractal-orchestration/SKILL.md). **Composition (selectors):** ternary vs guard in [petro-code-composition-oriented/SKILL.md](../petro-code-composition-oriented/SKILL.md) (`LogVendorMatchValue`).

| Situation                                                 | Use                                               |
| --------------------------------------------------------- | ------------------------------------------------- |
| `{cond ? 'a' : 'b'}` in JSX text                          | Inline ternary                                    |
| `return cond ? 'a' : 'b'` or `return cond ? 'a' : MAP[k]` | One-line ternary                                  |
| `return cond ? <A /> : <B />`                             | Paired `&&` or FC                                 |
| `return cond ? foo() : 'b'`                               | Early-return `function`                           |
| `a ? b : c ? d : e`                                       | Forbidden (`no-nested-ternary`)                   |
| `cn(..., cond && 'x')`                                    | Object notation                                   |
| Optional `T \| undefined` → map to `U \| undefined`       | `value && map(value)`                             |
| Same optional map as above                                | `value ? map(value) : undefined`                  |
| Same optional map as above                                | `if (!value) return undefined; return map(value)` |

### Optional presence (map when defined)

When the **only** branch distinction is “input absent” vs “input present, run one mapper,” use **`value && map(value)`** (or `const x = value && map(value)`). Short-circuit yields `undefined` when `value` is `undefined` / `null` / other falsy — same as `value ? map(value) : undefined` for optional params, without a ternary or a dedicated guard `return`.

**This is not** a substitute for a **two-way pick** where both outcomes are meaningful (`isResumable ? resumeCopy : dryRunCopy` — use ternary). **This is not** a substitute for a **policy** branch that returns something **other than** “nothing” when the guard is true — keep `if` + `return` for that, then optional-map the rest.

```ts
// Avoid — ternary only to mean “undefined when absent”
return latest ? getLastRunFromRecord(latest) : undefined;
if (!lastRun) {
  return undefined;
}
return getOutcomeRunFromLastRun(lastRun);

// Prefer — optional presence
return latest && getLastRunFromRecord(latest);
return lastRun && formatRelative(lastRun.startedAt);
return lastRun && getOutcomeRunFromLastRun(lastRun);
```

**Policy first, optional map second** — when a real branch changes the outcome (not merely absence), keep an early `if` / `return`, then optional-map:

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
```

`isRunning` must not be folded into `&&`: with `lastRun` set, `lastRun && getOutcomeRunFromLastRun(lastRun)` would show the **previous** run while the job is live. The `if` is policy; the tail is presence.

**Mapper shape:** `map` should accept a **defined** `T` (`getOutcomeRunFromLastRun(lastRun: JobLastRun)`). The orchestrator owns optional input; the helper owns the definite value — same fractal split as binding sites.

**When `&&` is wrong:** absence is not “falsy optional” (`0`, `''`, `false` are valid values you still need to map). Multiple mappers or spreads after the guard → `if` + named `const` pipeline. JSX “render when present” stays `{value && <Child />}` ([Conditional JSX](#conditional-jsx-app) table) — same idea, different layer.

**Fractal:** optional presence at orchestrator `return` / `const`; [petro-code-fractal-orchestration § Optional presence](../petro-code-fractal-orchestration/SKILL.md#optional-presence-map-when-defined). **Example:** [examples.md §6d](../petro-code-fractal-orchestration/examples.md#6d-optional-presence--policy-then-map).

### `lib/**` optional object fields (do not conflate with optional presence)

Three patterns look similar; only one applies to log fields / DTO literals in `lib/**`:

| Layer                                      | Pattern                        | Example                                                                                        |
| ------------------------------------------ | ------------------------------ | ---------------------------------------------------------------------------------------------- |
| Optional **return** / prop                 | `value && map(value)`          | `return latest && getLastRunFromRecord(latest)`                                                |
| Optional **keys** in `lib/**` objects      | Named slice, then spread       | `const txtFields = txt ? { txtId: txt.id } : {}` → `...txtFields` in `fields` / logger payload |
| **Regression** — do not “modernize” slices | Inline `&&` inside the literal | `...(txt && { txtId: txt.id })` inside `{ fileId, ... }`                                       |

**Why slices, not inline `&&` spread:** Fractal wants each optional key group as a **`const` fact** before the host object (`logInvoiceOutcome`, `return { … }`). Inline `...(cond && { k })` is a **subclause at the binding site** — same smell as banned prop spreads in `app/**`.

**Sweep trap:** Replacing `cond ? { a: 1 } : {}` with `...(cond && { a: 1 })` is **not** alignment — it inverts the rule. Optional-presence `&&` applies to **one mapper / one return**, not to assembling multiple optional keys in a log payload.

**ESLint:** `shoebox/no-conditional-object-spread` on **all** `**/*.{ts,tsx}` (excl. tests, `eslint-rules/**`) flags both `...(cond ? { … } : {})` and `...(cond && { … })` inside **object** literals. Array spreads (`...(cond ? items : [])`) stay allowed.

---

## ESLint

| Rule                                        | Scope                                            | Enforces                                                                         |
| ------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------- |
| `shoebox/no-jsx-conditional-null`           | `app/**`                                         | `{cond ? x : null}` → `{cond && x}`                                              |
| `shoebox/no-element-conditional`            | `app/**`                                         | `cond ? <A /> : <B />` → paired `&&` or FC                                       |
| `shoebox/no-cn-conditional-class`           | `app/**`                                         | ternary/`&&` classes in `cn()` → object                                          |
| `shoebox/no-data-id-camel-prop`             | `app/**`                                         | `*DataId` → `'data-id'`, `'shell-data-id'`, …                                    |
| `shoebox/no-conditional-object-spread`      | `**/*.{ts,tsx}` (excl. tests, `eslint-rules/**`) | `...(cond ? obj : {})` and `...(cond && { … })` in objects → named `const` slice |
| `no-nested-ternary`                         | `app/**`                                         | nested `? :` → early returns                                                     |
| `shoebox/no-nested-if`                      | `app/**`, `lib/**`                               | nested `if` in one function → flat guards / helper                               |
| `no-restricted-syntax`                      | `app/**`, `lib/**`                               | keys `serverRuns`, `hasPendingClientRun`                                         |
| `@typescript-eslint/method-signature-style` | all `.ts`                                        | `onSave(): void` not `onSave: () => void`                                        |

**Still allowed:** JSX text ternaries; trivial non-JSX `return a ? 'x' : 'y'`; `length > 0` guards; parent `const serverRuns` bridged as `runs={serverRuns}`; **`lib/**`** object spreads only after a named `const` fact. **Hard review** covers skills-before-local-style and terse locals.

**Wire-up:** `eslint.config.mjs` + `eslint-rules/*.mjs`; `AGENTS.md` (Before you finish).

## `data-id` (required on JSX)

Stamp **on creation** on every root, layout region, interactive control, and visible content node. Decorative-only flex/icon wrappers: skip. Inline attrs only — no helper, no spread. Typed `DataDebugProps` when the repo defines it. **Props/types** use quoted keys (`'data-id': string`) — ESLint `shoebox/no-data-id-camel-prop` on `app/**`.

**Role tag, not unique id:** `data-id` names the **kind of node** (closer to an element tag than to `id="…"`). The same literal **may and should repeat** across list/map iterations — uniqueness belongs on React `key`, not on `data-id`.

| Layer       | Stamp                                                                                              |
| ----------- | -------------------------------------------------------------------------------------------------- |
| Root        | Outermost DOM of every component (`OperatorPage` / `LoadingPage` for shells)                       |
| Layout      | `section`, `nav`, toolbars, list hosts, `meta`/`tags`/`actions` clusters                           |
| Interactive | Buttons, links, inputs, clickable rows (DS primitives self-stamp; override `data-id` per instance) |
| Content     | Element owning the text node (label, time, count, empty copy)                                      |

**Literal only — no interpolation:** `data-id` values are **static string literals** only. No template literals, no `` `${…}` ``, no concatenation, no variables, no expressions.

```tsx
// ✓ — static; repeats across rows are fine
data-id="log-entry-outcome"

// ✗ — any interpolation / dynamic construction
data-id={`log-entry-outcome-${entryKey}`}
data-id={'log-entry-outcome-' + entryKey}
data-id={entryDataId}
```

**Naming:** ≥2 kebab segments + view context (`logs-run-search` ✓, `search` ✗). Optional `data-type` = what it is (`log-entry-outcome`). DS: pass `data-id`/`data-type`; don't hand-write `data-ds-component`.

**Pre-gate checklist:** root · layout · interactive · content · no bare words · static literal only (no interpolation) · repeats in loops OK · variant not `text-[Npx]` override on primitives.

---

## Code style

**Files:** PascalCase sources (`LogsView.tsx`, `LogsViewService.ts`); `kebab-case/` dirs only; no barrels; direct imports. Service/helpers: `function`; components: `const` + `FC`. Exports top; private helpers bottom. Framework routes: `page.tsx` / `layout.tsx` may `export default` after `const Page: FC = …`.

**Feature folders** — split on **second** leaf `FC`, pure non-React logic, feature-private toolbar, or orchestrator needing scroll to separate concerns; **≤~200 lines** (150 + 2 concerns = overdue). Layout: `feature-name/LogsView.tsx` + `LogsViewService.ts` + leaf FCs; orchestrator = fetch → derive → render; promote shared UI only at **second** consumer.

**Naming:** verbs / `is`·`has`·`can`; no `process`/`handle`/`manage`; no invented clips (`INV_SEP` ✗, `INVOICE_FILE_NAME_SEPARATOR` ✓). Banned locals: `buf`,`res`,`err`,`t`,`m`,`p`,`h`,`l`,`seg`,`ext` → spell out. Comparators `a`/`b`; industry tokens in clear names (`MONEY_REGEX` ✓). Callback props in **types**: `onSave(): void` not `onSave: () => void`. **Boundaries:** widest honest inputs, narrowest honest outputs; no caller context the module does not use — [epistemic humility](../petro-code-fractal-orchestration/SKILL.md#epistemic-humility).

**Types:** repeated object shapes → named `type`; optional React props `prop?: T` not `prop: T \| null`; don't destructure two `{ data }` responses in one scope.

**`readonly` (narrow):** Do **not** pepper `readonly` on every field, `*Args`, `*Options`, React `Props`, or context objects — `const` + discipline is enough. Use it only where the type is a **persisted snapshot** or **opaque blob** callers must not assign into:

- Append-only log lines (`LogEntry`) and `drain()` return type.
- Run summaries exposed as `Readonly<Record<…>>` (or equivalent).
- Return types of helpers that materialize frozen summary objects.

Skip `readonly` on internal parameter bags, service method inputs, and domain DTOs passed into a single function. Skip `readonly` on individual method properties (`readonly run: …`). Prefer `T[]` over `readonly T[]` / `ReadonlyArray<T>` unless the array is a documented frozen view.

### Destructuring

**Destructuring is favored generally** over repeating an object stem (`lastRun.status`, `lastRun.error`, …) or array index chain when the same binding supplies **two or more** reads in a block.

**Where:** earliest site that owns the value — function/callback **parameters** (preferred when the object is the param), **FC props** in the signature, or a **`const { … } = obj`** (or `const [a, b] = tuple`) right after a named `const` obtains the value when parameters cannot own it.

**When not:** pass-through (`processItem(item)`), **one flat** property read on a plain DTO (`runs.map((run) => run.id)`), or the whole binding is the value.

**Validation / parse boundaries:** Keep the full parse result while branching on success (`parsed.success`, `result.ok`, …). **After** the failure guard returns, destructure the success payload — not the wrapper.

```ts
const parsed = RequestSchema.safeParse(input);
if (!parsed.success) {
  return invalid();
}
const { id, mode, cursor } = parsed.data;
// use id, mode, cursor — not parsed.data.id on every line
```

Same for `if (!result.ok) return …` then `const { fieldA, fieldB } = result.value`.

**Callback parameters:** Destructure when the body **drills nested data** on the param (`row => row.cells.length` → `({ cells }) => cells.length`). **Do not** destructure for one flat field plus a **method** on it (`left => left.key.localeCompare(right.key)` — keep `left`/`right`; renaming to `leftKey`/`rightKey` adds noise). In JSX, use a **named `const`** and an identifier prop, not inline `event => event.target.value`.

**Scope conflicts:** destructure only when extracted names **do not collide** in that block — no shadowing a sibling `const`/`let`/param; no two `{ data }` (or other duplicate bare names) from different objects in one scope (see **Types** above). On clash, keep the stem for that field or rename (`error: runError`).

```ts
// Prefer — parameters own the object
export function getOutcomeRunFromLastRun({
  summary,
  error,
  status,
  terminationReason,
}: JobLastRun): JobRunForDisplay {
  const errorFields = error ? { error } : {};
  return { status, summary, ...errorFields };
}

// Prefer — object arrived from a helper; destructure on next line
const lastRun = getLastRunForJob(latest);
const { summary, status } = lastRun;
const parts = runSummarySubtitleParts(jobId, summary);

// Prefer — FC uses several props
export const JobTile: FC<Props> = ({ jobId, runs, latest, activeJobIds }) => { … };

// Avoid — same fields, stem on every line
export function getOutcomeRunFromLastRun(lastRun: JobLastRun): JobRunForDisplay {
  const errorFields = lastRun.error ? { error: lastRun.error } : {};
  return { status: lastRun.status, summary: lastRun.summary, ...errorFields };
}

// Prefer — callback
...fieldLines.map(({ key, value }) => row.text(key, key, value))

// Prefer — callback: named const + param destructure (binding site + fact name)
const onVendorsTextChange = ({ target }: ChangeEvent<HTMLTextAreaElement>): void => {
  onTextChange(target.value);
};
// JSX: onChange={onVendorsTextChange}

// Avoid — param stem chain inline in JSX prop
onChange={(event) => onTextChange(event.target.value)}
```

**Fractal:** [destructuring §](../petro-code-fractal-orchestration/SKILL.md#destructuring); canonical [JobTileService.ts](../../app/_components/job-tile/service/JobTileService.ts), [VendorListSurface.tsx](<../../app/(operator)/_views/vendors-view/VendorListSurface.tsx>). **Examples:** [fractal examples §6e](../petro-code-fractal-orchestration/examples.md#6e-destructuring--favored-over-stem-repetition).

**React:** one leaf FC per file (second FC = split trigger); `Props` never exported — shared shapes in sibling `types.ts`; `PropsWithChildren` for `children`; async server components still `FC<Props>`.

```tsx
type Props = PropsWithChildren<{ user: OperatorSession }>;
export const OperatorShell: FC<Props> = ({ user, children }) => …;
```

---

## Mobile-first PWA

- `viewport-fit=cover`; **`dvh`/`dvw`**, never `vh`.
- Safe areas: `var(--safe-*)` via arbitrary utilities (`pt-[max(var(--safe-top),0.5rem)]`).
- `touch-action: manipulation`; 44×44px targets (`min-h-11 min-w-11`); `overscroll-behavior: contain` on sheets.
- Hover + `:active` / `:focus-visible`; `prefers-reduced-motion`; inputs ≥16px; theme-color + apple web-app meta.

---

## Performance & loading

| Metric                           | Target                 |
| -------------------------------- | ---------------------- |
| Lighthouse perf/a11y/BP (mobile) | ≥95                    |
| LCP / TBT / CLS                  | <1.5s / <200ms / <0.05 |
| Initial JS (gz) `/`              | <100 KB                |

`npm run lhci` + `npm run analyze`. Default RSC; `loading.tsx` on non-trivial routes; `next/image` / `next/font` (swap + preload); defer third-party scripts; optimistic run-job UI.

**Motion:** 150–250ms UI / 250–350ms routes; `--ease-out-soft`; `:active scale(0.97)` on buttons. Deeper: `web-animation-design`, `emil-design-eng` skills.
