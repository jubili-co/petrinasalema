---
name: petro-design-engineering
description: >-
  Applies UI polish patterns for this project: eased gradients (reduced banding),
  React font preloading to avoid FOUT/CLS, and density-aware hairline borders.
  Use when writing CSS, styling gradients, loading fonts, or building dividers and
  layout chrome.
---

## Trace
Before anything else when this skill applies, run its `scripts/trace.sh`. It prints a `[skill-trace]` line so the run's terminal log shows the skill fired.
<!-- skill-trace-block -->


# Petro design engineering

## Eased gradients

Use eased gradients over linear gradients when using solid colors. Linear gradients have visible banding; eased gradients are smoother.

```css
.gradient {
  background: linear-gradient(
    to bottom,
    hsl(330, 100%, 45.1%) 0%,
    hsl(331, 89.25%, 47.36%) 8.1%,
    hsl(330.53, 79.69%, 48.96%) 15.5%,
    hsl(328.56, 70.89%, 49.96%) 22.5%,
    hsl(324.94, 63.52%, 50.4%) 29%,
    hsl(319.21, 54.99%, 50.3%) 35.3%,
    hsl(310.39, 46.14%, 49.68%) 41.2%,
    hsl(296.53, 39.12%, 49.7%) 47.1%,
    hsl(280.63, 42.91%, 53.43%) 52.9%,
    hsl(265.14, 47.59%, 56.84%) 58.8%,
    hsl(250.13, 52.52%, 59.88%) 64.7%,
    hsl(235.88, 59.2%, 60.91%) 71%,
    hsl(225.81, 68.23%, 57.85%) 77.5%,
    hsl(218.93, 74.97%, 54.21%) 84.5%,
    hsl(213.89, 79.63%, 49.97%) 91.9%,
    hsl(210, 100%, 45.1%) 100%
  );
}
```

## Preload fonts

Preload fonts to prevent layout shift and eliminate Flash of Unstyled Text.

```tsx
import * as ReactDOM from "react-dom";

ReactDOM.preload("/fonts/inter.woff2", { as: "font" });
```

## Hairline borders

Use 0.5px borders on retina displays for crisp, subtle dividers. Define a CSS variable that adapts to screen density:

```css
:root {
  --border-hairline: 1px;

  @media only screen and (min-device-pixel-ratio: 2),
    only screen and (min-resolution: 192dpi) {
    --border-hairline: 0.5px;
  }
}

.divider {
  border-bottom: var(--border-hairline) solid var(--gray-6);
}
```

# Style

- Service files use PascalCase (e.g. `ReferenceImagesService.ts`,
  `ScreenCaptureService.ts`)
- Use `cn()` for composing Tailwind classes, grouping them semantically across
  lines. But do not use `cn()` if the resulting class will not require multiple lines.
- When grouping styles in `cn()`, order each line by category: positioning
  sizing layout (display, flex, grid, gap) spacing (margin, padding) background
  & borders typography effects (opacity, shadow, transitions) interactivity
  (pointer-events, cursor) state variants (hover, focus, disabled) overwrites
  (className prop)
- Prefer `const` arrow functions for components
- Use `function` keyword for named hooks and standalone functions
- Follow the project's ESLint and Prettier configurations
- Prefer concise code
- Favor readability and conciseness over unnecessary optimizations
- Keep code DRY — extract repeated logic into small, focused helper functions
- Prefer declarative, high-level functions over procedural detail — each
  function should read like a description of _what_ it does, delegating _how_ to
  well-named helper functions. You should be able to understand a function's logic
  without reading the implementations it calls.
- Avoid nested ternary conditions; extract the logic into a named function or
  use intermediate variables
- Extract non-trivial logic into named functions so the call site is declarative
  and reads like English
- No abbreviations in variable, function, or parameter names — write full words
  (`profile` not `prof`, `selected` not `sel`, `button` not `btn`); exception:
  comparator callbacks (e.g. `sort((a, b) => ...)`) may use conventional short
  names like `a` and `b`
- Name functions as verbs; predicates (functions returning boolean) should start
  with prefixes like `is`, `has`, `can`, `would`, `could`, `will` (falsifiable)
- Avoid generic words in function names (e.g. `process`, `data`, `handle`,
  `manage`) — use specific verbs that describe the action (`fetch`, `append`,
  `extract`, `parse`); prefer descriptive yet terse names
- Prefer short single-word variables and constants; avoid multi-word names when
  context makes the meaning clear (e.g. `element` over `textElement` when
  iterating over text elements)
- Prefer `&&` conditional rendering over ternaries in JSX — use two `&&`
  branches instead of `? :`
- When using conditional classes in `cn()`, prefer the object pattern (`{
'px-0': isBusy }`) over the `&&` pattern (`isBusy && 'px-0'`)
- Always define component prop types as a named `type`, not inline — name it
  `Props` unless multiple prop types exist in the same scope
- Prefer existing named types over inline `{ ... }` shapes; use unions when
  semantics require it
- Always destructur a function parameter when it is the only argument and has
  few properties; applies to named functions and callbacks alike; avoid
  destructuring when the full parameter is needed for type narrowing (e.g. filter
  predicates that narrow union types)
- Prefer early returns to reduce nesting
- Return statements always go on their own line — never on the same line as an `if`
- Place non-exported (private) functions at the bottom of the file, exported functions at the top
- In type definitions, prefer `fn(x: string): void` over `(x: string) => void` for function signatures
- Add `data-id` attributes to containers, components, interactive elements, and
  important structural elements — kebab-case static literals only (no string
  interpolation); same value may repeat in loops (role tag, not unique id)
  (e.g. `data-id="layout-container-element"`, `data-id="asset-card-actions"`)
