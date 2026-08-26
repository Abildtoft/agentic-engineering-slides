# Comprehension Debt

Addy Osmani, published 14 March 2026.

Comprehension debt is the growing gap between the amount of code in a system and the portion any human genuinely understands. Unlike technical debt, it can accumulate under clean formatting, green tests, and improving velocity metrics, producing false confidence rather than immediate friction.

Agent generation breaks the old speed relationship in review: code can now be produced faster than experienced engineers can audit and absorb it. Automated checks are necessary but cannot cover unimagined behavior, and a detailed spec cannot encode every implicit implementation decision. Updating tests to match changed behavior can even preserve green CI while silently changing intent.

Osmani argues that the scarce role becomes maintaining the system-level mental model: knowing which behaviors are load-bearing, why architecture exists, and which apparently clean changes alter user expectations. The relevant question moves from generating more code to understanding more of what ships.

## Deck fit

- Direct source for the cognitive-debt section and bonus review workshop.
- Distinguishes “tests pass” from “someone understands what this does and why.”

https://addyosmani.com/blog/comprehension-debt/
