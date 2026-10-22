# 0009. Concept-b-v9 UI refinements

## Status

Accepted

## Context

The approved mockup (`concept-b-v9`) tightens typography, stack presentation, project tag density, and the Human/Agent control without changing content SSOT or hosting.

## Decision

- **About highlights** (`**…**` and `==…==`) render in Geist Mono at neutral `--fg` (no accent). Section indexes keep the Cobalt accent.
- **Earlier work** rows show company + role title + dates only; detail lines stay in markdown/JSON-LD narrative via projects, not in the timeline.
- **Stack** items are plain Geist Mono, comma-separated (no pills). Labels use a two-column grid (`index | name`) so the name never wraps under the number.
- **Projects** add `visibleTags` (3–5) for cards; full `tags` remain the source for JSON-LD, `llms.txt`, and `index.md`.
- **Human/Agent** control is icon-only with `aria-label`, hover/focus tooltips, and the same height/radius/border as Get in touch / Resume (`--header-control-h`).
- **Motion / layout**: `scroll-behavior: smooth` + `scroll-padding-top` for the sticky header; disabled under `prefers-reduced-motion`. Fluid type/spacing tokens live in `:root` (`clamp`). Mobile header stays single-row with compact labels and 40px touch targets.

## Consequences

- Card tags can diverge visually from the full tag list by design.
- Header height tokens must stay shared so e2e can assert equal control heights.
