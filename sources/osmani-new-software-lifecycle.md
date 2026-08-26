# The New Software Lifecycle

Addy Osmani, published 16 June 2026.

Osmani's companion to a Google whitepaper argues that an agent is a model plus a harness. The harness includes instructions, skills, tools and MCP servers, sandboxes, orchestration, hooks, memory, evaluation, observability, and infrastructure. He cites benchmark examples where changing the harness or its prompt/tool layer materially changed results without changing the model.

The lifecycle increasingly moves from prototype to evaluated and deployed agent through the same coding interface. Work alternates between conductor mode (interactive, exploratory, close supervision) and orchestrator mode (asynchronous, well-specified delegation). Model routing becomes part of the system: expensive reasoning goes to capable models while routine generation, tests, review, and CI can use cheaper ones.

The core engineering lesson is to debug the harness before assuming the model is incapable; missing tools, vague rules, weak guardrails, and polluted context are configuration problems humans can fix.

## Deck fit

- Direct source for the new-stack framing and model-versus-harness distinction.
- Connects MCP, skills, orchestration, evaluation, and deployment into one lifecycle.

https://addyosmani.com/blog/new-sdlc-vibe-coding/
