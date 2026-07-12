# Andrew Ng — Loop Engineering

SOURCE: Andrew Ng (x.com/AndrewYNg/status/2071988145667928442)

## Core Model

Building a 0-to-1 product involves three connected feedback loops operating at different speeds:

1. **Agentic coding loop — minutes.** Given a product specification and optionally evals, an agent writes code, tests and inspects its work, and iterates until the implementation meets the specification.
2. **Developer feedback loop — tens of minutes to hours.** A developer reviews the current product and steers the agent by refining the product vision, visual design, user flow, feature set, specification, or evals.
3. **External feedback loop — hours to weeks.** Friends, alpha testers, production users, and experiments provide evidence that updates the developer's vision, which then flows into the specification and agentic loop.

## Human Context Advantage

Ng prefers **context advantage** over “taste” as the explanation for why people remain essential. Humans often know more than the AI system about the users, goals, constraints, and environment in which the product must operate. Human-in-the-loop work injects that missing knowledge into the system.

As coding agents improve at testing their own work, developers spend less time acting as manual QA and more time making higher-level product decisions. This pushes engineers toward partial product-management responsibility: deciding what to build, translating vision into specifications, and balancing building with real-user learning.

## Relevance

- Extends the deck's technical agent loop into a complete product-development operating model
- Makes the bottleneck shift concrete through three distinct timescales
- Connects harness engineering to product judgment, external evidence, and end-to-end ownership
- Reframes human “taste” as missing context that can be deliberately captured in specs, evals, and feedback systems
