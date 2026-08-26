# Practical Loop Engineering

Addy Osmani, published 14 August 2026.

Operational companion to [[osmani-loop-engineering]]. A loop is a bounded feedback cycle that repeatedly acts, evaluates, and adjusts until a measurable stop condition holds. Osmani separates turn-based, goal-based, time-based, and proactive loops, and argues for using the simplest form that fits the task.

The quality of the stop condition is load-bearing. Deterministic targets work well; vague goals invite drift. A maker agent should not be the final judge of its own work, and a transcript-level goal evaluator is not a substitute for an independent content reviewer. Sensitive work involving authentication, security, finance, or consequential permissions stays under closer human supervision.

His practical pattern combines scheduled discovery with goal-driven execution, isolated worktrees, persistent state, and independent verification. Delegation does not include taste: agents can execute and prove mechanical conditions, while the human still decides whether the result is worth shipping.

## Deck fit

- Concrete implementation source for the three-loop and constraint-ring slides.
- Useful counterweight to abstract autonomy claims: goals need bounds, evidence, and abort conditions.

https://addyosmani.com/blog/practical-loop-engineering/
