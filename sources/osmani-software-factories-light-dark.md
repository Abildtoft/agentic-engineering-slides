# Software Factories, Light and Dark

Addy Osmani, published 20 July 2026.

Osmani defines a stack of loop → harness → factory. A loop repeats one job; a harness supplies tools, memory, sandboxes, and gates; a factory runs many harnessed loops from a work queue through verification, deployment, and production feedback.

The light/dark distinction is about where humans remain. A dark factory ships code read only by machines. It appears fast because the expensive review gate disappears, but it accumulates comprehension debt while green tests preserve false confidence. A light factory places judgment upstream in intent and architecture and downstream at evidence, risk, and ownership boundaries.

The factory's limiting resource is verification, not generation. Autonomy should never exceed the amount of work the system can cheaply and reliably verify. Tests help but cannot specify behaviors nobody thought to encode, and automated checks can preserve correctness while human understanding still erodes.

## Deck fit

- The clearest source for turning “software factory” from metaphor into an operating model.
- Directly reinforces the bonus workshop's review bottleneck and the main deck's comprehension-debt argument.

https://addyosmani.com/blog/software-factories/
