# Selective Human Review

Addy Osmani, posted on X 7 September 2026.

Osmani's current review practice: more code means more selective human review — "don't read all the code." Agents do the first pass; humans cover blast radius.

## Key ideas

- **Every PR gets a multi-agent first pass.** It should find bugs, verify them, rank them by severity, and suggest fixes. Approval stays a human call on anything that matters.
- **Low blast radius can skip deep human review.** Low-risk changes on less sensitive code — "there's often a lot" — can skip a deep human read once the agent review comes back clean. This is what keeps the volume of PRs manageable.
- **Core and sensitive paths keep an owner and human sign-off.** That is where the human time goes: verification, constraints, and earning trust in what the agents can safely cover. The goal is to keep recoverability.

## Deck fit

- The short, operational form of the tiering in [[osmani-agentic-code-review]]: tier by blast radius, not by author, and spend human attention only where a mistake is expensive or hard to undo.
- Supports "From Reviewing Code to Reviewing Intent" (Section 4): verification moves downstream to agents and gates, and human sign-off concentrates on sensitive paths.
- Supports the ownership check on "The Antidote": one named owner still signs off where the blast radius is high.
- The "earning trust in what the agents can safely cover" line matches the trust-accumulation argument in [[osmani-agentic-autonomy-levels]].

https://x.com/addyosmani/status/2097027173941141799
