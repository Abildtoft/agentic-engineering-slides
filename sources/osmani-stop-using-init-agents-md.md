# Stop Using `/init` for `AGENTS.md`

Addy Osmani, published 23 February 2026.

Auto-generated repository instructions often restate information an agent can discover, increasing context cost without improving outcomes. Osmani argues that `AGENTS.md` should be short, human-authored, and reserved for operational knowledge the repository cannot reveal on its own.

## Key ideas

- Generated instruction files have been measured to increase agent cost by roughly 20% while slightly reducing success rates.
- Human-written instructions can help, but every line consumes context and must justify its presence.
- Good entries capture non-obvious commands, constraints, ownership boundaries, and recurring failure modes.
- Hierarchical files and progressive disclosure route agents toward relevant context without loading the whole repository handbook.
- Treat the file as a living friction ledger: add guidance after a real failure, and remove it when the code or tooling makes the guidance discoverable.
- The cited studies are not perfectly aligned, so the practical conclusion is restraint rather than a universal prohibition.

## Deck fit

Supports the case for intentional context engineering and the distinction between durable operational knowledge and redundant documentation.

https://addyosmani.com/blog/agents-md/
