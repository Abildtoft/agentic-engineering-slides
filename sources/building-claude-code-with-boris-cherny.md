# Building Claude Code with Boris Cherny

Gergely Orosz interviews Boris Cherny, Head of Claude Code, on how Anthropic actually builds and uses coding agents day to day. Strong source for workflow specifics, not just macro claims.

1. Boris runs multiple Claude Code sessions in parallel and treats planning as the leverage point. Once the plan is strong, implementation is often one-shot.

2. Claude Code's internal "agentic search" reportedly found that model-directed `glob` and `grep` beat fancier RAG-style indexing approaches. Freshness and simplicity mattered more than elaborate retrieval stacks.

3. Code quality still has a measurable productivity effect in the AI era. Half-finished migrations and mixed frameworks confuse both humans and models, so clean foundations matter more, not less.

4. Repeated review comments should become deterministic checks. Boris describes logging recurring review feedback and turning repeat patterns into lint rules.

5. Prototypes replaced PRDs on the Claude Code team. They build many working versions early because static mocks and long documents are too slow for this pace of product iteration.

6. Claude Cowork grew out of demand from non-engineers already using Claude Code. The hard problem was not only product logic but safety, permissions, and sandboxing for less technical users.

7. The role shift is toward generalists who can context-switch, coordinate parallel work, and decide what matters across product, design, and engineering boundaries.

8. Boris uses a printing-press analogy: coding becomes less exclusive, but the total market for software creation expands and the role of engineers mutates rather than simply disappears.

https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny
