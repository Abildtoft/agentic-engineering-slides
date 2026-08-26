# Human judgment doesn't leave the software factory. It relocates.

Addy Osmani, published 21 August 2026.

Thesis: a repeatable software factory still needs human taste, risk judgment, and ownership, but those interventions move to the places where they have the most leverage. Humans shape product intent, architecture, and the quality bar before execution; deterministic checks run continuously; people return where automated back-pressure is weak or the consequences are subjective.

Osmani distinguishes ordinary use of several coding-agent sessions from a factory: the factory is repeatable, event-driven, queued, isolated, and explicit about handoffs, evidence, review, and production boundaries. Verification has a budget: cheap deterministic checks should run early, heavier checks near the release gate, and every check should justify its cost with signal.

The human constraint remains cognitive bandwidth. More parallel agents produce more review queues and more cold mental-model reloads. A good factory is therefore optimized for the reviewer, not for maximum agent utilization. Ownership does not fall with the percentage of code typed by humans; someone still chooses the problem, architecture, quality bar, evidence threshold, and shipping decision.

## Deck fit

- Strong bridge between the factory model, the orchestration tax, and the bonus workshop's human-on-the-loop close.
- Supplies the verification-budget concept and the four human factory roles: shape, steer, hand off, approve.

https://addyosmani.com/blog/human-judgment-doesnt-leave-the-software/
