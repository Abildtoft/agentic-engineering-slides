# Agent Harness Engineering

Addy Osmani, published 19 April 2026.

A coding agent is the model plus its harness: prompts, rules, tools, skills, MCP servers, filesystem, Git, sandbox, orchestration, hooks, memory, compaction, observability, and recovery. Osmani argues that many apparent model failures are configuration failures and that substantial capability can be unlocked without changing model weights.

Harness engineering is a ratchet: observe a real failure, derive the behavior the system needs, then add the smallest mechanism that prevents recurrence. Instructions cover non-discoverable conventions; hooks enforce invariants; tests provide back-pressure; sandboxes constrain damage; the filesystem preserves state; progressive disclosure protects the context window.

The harness should be shaped by a project's actual failure history, not copied wholesale. Each component must have a named job, and each persistent rule should justify the attention it consumes.

## Deck fit

- Anchor source for the harness layer of the new stack.
- Connects constraints, context engineering, observability, security, and long-running execution.

https://addyosmani.com/blog/agent-harness-engineering/
