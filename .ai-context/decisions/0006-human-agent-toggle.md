# 0006. Human/Agent toggle is fun-only

## Status

Accepted

## Context

Recruiters want a polished HTML page. Agents want markdown. A toggle that re-skins the same data is delightful but must not be the only agent channel.

## Decision

- Human/Agent segmented control is a client-side novelty.
- Agent view renders markdown generated from `content` (same as `/index.md`).
- Canonical agent/AEO surfaces remain `/llms.txt`, `/index.md`, alternate link tags, and JSON-LD.

## Consequences

- Toggle state may live in `localStorage` / `?mode=`; it is not a separate content source.
- Do not omit static markdown artifacts because the toggle exists.
