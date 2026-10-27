# Design Systems for AI Agents

Luke Wroblewski (author of *Mobile First*; building Intent, an agent workspace app), lukew.com, 1 October 2026.

## The argument

- **Design systems go stale.** Teams invest in a system and then struggle to keep it current as the product changes: "Inevitably the design system ends up describing a product that no longer exists."
- **Agents change who reads it.** "Design teams have spent years trying to get people to actually read their design system documentation. Agents read it every single time." (One paragraph, the two sentences adjacent.)
- **A steering layer.** "Put simply, a design system for agents is a steering layer for a site's design and front-end code." When marketing, engineering and product people all edit a site through agents, the shared system pulls their changes toward one result instead of relying on a design-system team or central review to police consistency.
- **Examples.** The Intent, Sol and Aria websites: agent instructions (AGENTS.md files) point at shared design tokens, and the design-system pages are built from the same code as the sites, so the documentation cannot drift from the product.

## Deck fit

- **Section 3b, "The design system was documentation. Now it steers the agents."** The design-side payoff of [[garry-tan-markdown-is-the-program]] and of the Context Engineering slide's "Documentation is now production infrastructure": the most-ignored document in a design org becomes the one every agent reads first.
- **First-party example.** This deck works the same way: its AGENTS.md carries the motion tokens, the colour-blind-validated categorical palette and the contrast floors measured on its shader backdrops, and every agent session on the repo loads it.
- **Division of labour** comes from the companion post, [[wroblewski-handoff-is-dead]]: designers encode the visual rules, developers the tests and conventions.
- **Bias.** The examples are sites built with Intent, the author's own product.

https://www.lukew.com/ff/2164/design-systems-for-ai-agents
