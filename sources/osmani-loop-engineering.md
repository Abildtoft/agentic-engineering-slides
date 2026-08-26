# Loop Engineering

Addy Osmani, published 7 June 2026.

Loop engineering moves the engineer from repeatedly prompting an agent to designing a system that discovers work, assigns it, checks it, records state, and decides what happens next. Osmani places it one level above harness engineering: the harness governs one run; the loop supplies recurrence and self-direction.

His minimal stack is scheduled discovery, worktree isolation, reusable skills, plugins or MCP connectors, subagents for separate generation and checking, and durable state outside the conversation. The agent forgets between runs, so the repository, task tracker, or progress file must remember.

The pattern only works with explicit stopping conditions, cost limits, verification, and human review capacity. Worktrees solve file collisions but not the orchestration tax; the number of productive loops remains bounded by how much output a person or independent verifier can responsibly close.

## Deck fit

- Primary source for the shift from prompts to loops.
- Connects every “new stack” element into a single operational pattern.

https://addyosmani.com/blog/loop-engineering/
