# Long-running Agents

Addy Osmani, published 28 April 2026.

Long-running agents make progress across many context windows, processes, and sandboxes over hours or days. Osmani separates long-horizon reasoning, long-running execution, and persistent agency, then identifies three recurring walls: finite context, missing durable state, and unreliable self-verification.

The durable patterns are external plans and progress logs, small bounded tasks, fresh sessions that reload state from disk, explicit handoffs, isolated environments, and separate planner/worker/judge roles. The filesystem and Git become the continuity layer; the model may be amnesiac while the workspace remembers.

Osmani surveys the convergence of practitioner Ralph loops and lab systems around event logs, recoverable sessions, planner/worker/judge separation, and independent evaluation. Longer runs amplify every shortcut, so persistence without verification merely creates longer-lived drift.

## Deck fit

- Source for the move from single sessions to durable agent systems.
- Supports the claims that Markdown is operational state and that verification must live outside the model's confidence.

https://addyosmani.com/blog/long-running-agents/
