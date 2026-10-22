# 0007. Privacy and link rules

## Status

Accepted

## Context

Public portfolio should be easy to contact professionally without exposing a phone number or inviting drive-by cloning of private repos.

## Decision

- Never publish a phone number in content, UI, markdown, JSON-LD, or build output (enforced by tests).
- Project cards may only link to **live** URLs — no GitHub/GitLab/Bitbucket project links.
- Resume button uses `profile.resumeUrl` (Google Drive placeholder). While empty, the button is not rendered.

## Consequences

- Contact CTA is email (`mailto:`) + social profile links.
- Filling in the resume is a one-field content change when the Drive file is ready.
