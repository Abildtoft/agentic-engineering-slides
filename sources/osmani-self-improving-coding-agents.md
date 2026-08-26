# Self-Improving Coding Agents

Addy Osmani, published 31 January 2026.

Long-running coding agents become more reliable when work is organized as a repeatable loop with persistent state rather than one enormous prompt. Each iteration handles a small task, validates it, records progress and lessons, then starts with a clean context.

## Key ideas

- Keep the task list, progress, and learned constraints in files that survive context resets.
- Select one small, atomic task per iteration.
- Implement, test, commit, and update the shared state before beginning the next task.
- Fresh contexts reduce drift while the repository becomes the agent’s durable memory.
- Automated checks and explicit stop conditions keep an autonomous loop from compounding mistakes.

## Deck fit

An early formulation of the loop-engineering pattern that recurs throughout Osmani’s 2026 writing.

https://addyosmani.com/blog/self-improving-agents/
