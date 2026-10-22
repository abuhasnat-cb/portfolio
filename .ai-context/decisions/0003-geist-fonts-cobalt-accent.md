# 0003. Geist fonts and Cobalt accent tokens

## Status

Accepted

## Context

Typography and accent must be editable in one place without hunting through components. Brand accent is Cobalt, used sparingly (~10%).

## Decision

- Load fonts via the `geist` package; expose `--font-geist-sans` and `--font-geist-mono`, mapped once in Tailwind `@theme`.
- Define `--accent: #3047c8` and `--accent-dark: #8fa2ff`; dark theme swaps to the light Cobalt tint.
- About section numbers stay neutral (no accent).

## Consequences

- Changing fonts or accent is a one-line token edit in `globals.css` / layout.
- Components consume `var(--accent)` or theme colors, never hard-coded Cobalt hex.
