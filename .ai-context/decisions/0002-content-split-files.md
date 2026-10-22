# 0002. Content split into typed files

## Status

Accepted

## Context

A single mega JSON/SITE object is hard to review in PRs and easy to desync from TypeScript.

## Decision

Split content into `src/content/{profile,experience,projects,skills,education,seo}.ts` with shared types in `types.ts`, re-exported as one `content` object from `index.ts`.

## Consequences

- UI, markdown, llms.txt, and JSON-LD all import `content`.
- Schema tests validate the aggregated object.
- Editors change one concern per file.
