---
layout: section
transition: section-shift
---

# The New Stack: Core Concepts

From principles to practice

<!--
KEY POINTS:
- This section translates the earlier thesis into operating practice
- Part A is conceptual; Part B is tooling; Part C is synthesis + demo
- Keep this accessible to both technical and non-technical roles

BRIDGE: "We've named the shift — the middle is compressing, value moves to intent and judgment. Now: what does the new way of working actually look like?"
-->

---

# From Producing Artifacts to Designing Systems

<v-click>

**The agentic level isn't "faster autocomplete"**

</v-click>
<v-click>

You're no longer producing the artifact step by step. You're designing a system where AI generates code, prototypes, and analysis while you shape the inputs, constraints, and verification.

</v-click>
<v-click>

**Two disciplines make that work:**
1. Context engineering
2. Spec-driven development

</v-click>

<!--
SOURCE: Monarch's Philosophy on AI in Dev (somehowmanage.com/2026/01/22/a-step-behind-the-bleeding-edge-monarchs-philosophy-on-ai-in-dev/)
SOURCE: Martin Eriksson, "When Software Becomes Cheap, Strategy Becomes Everything" (thedecisionstack.com/when-software-becomes-cheap-strategy-becomes-everything/)

KEY POINTS:
- Core shift: from producing code directly to designing the production system around agents
- Emphasize ownership: human accountability does not disappear
- Frame "context + specs + verification" as the new unit of craft
- Eriksson: "Speed without direction is just burning jet fuel on a runway... the bottleneck was never execution — it was always clarity." This directly reinforces the shift from producing artifacts to designing systems.

DELIVERY:
- Acknowledge the room: "Not every organization is there yet. Security reviews, compliance constraints, team skepticism — these are real. What I'll show you are the patterns that work when you can adopt them. Think of this as the target state, not the assumption."
- This grounds the audience before diving into tooling specifics — especially important if the room includes people from regulated industries
- Optional verbal after revealing the two disciplines: "Martin Eriksson put it well: 'Speed without direction is just burning jet fuel on a runway.' Context engineering is the direction. Specs are the runway markings."

BRIDGE: "Let's look at each discipline."
-->

---

# Context Engineering

<v-click>

**We always needed context. Now agents can find it themselves.**

</v-click>
<v-click>

Copy-pasting snippets into ChatGPT was the first wave — but the context was always wanting. The key unlock of Claude Code and similar tools: the agent itself discovers your codebase.

</v-click>
<v-click>

But every model has a finite memory — a context window. Not everything fits. Context engineering is the discipline of ensuring the *important* information makes it into that budget: the right information, in the right order, at the right time.

</v-click>

<!--
SOURCE: Addy Osmani (x.com/addyosmani/status/2007899127925854536)
SOURCE: Pragmatic Engineer, "Building Claude Code with Boris Cherny" (newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny)

KEY POINTS:
- Progressive disclosure: copy-paste → chat-in-IDE → agent discovers your whole project on its own
- The key unlock of Claude Code: the agent itself navigates, reads, and builds context — no manual feeding required
- Finite context window means you can't dump everything in — you must curate the discovery journey
- Trivedy calls this "Context Rot": models become worse at reasoning as their context fills up. "Harnesses today are largely delivery mechanisms for good context engineering."
- Concrete architecture example from Boris: simple model-driven `glob` + `grep` beat more complex RAG approaches for codebase retrieval
- Context engineering is applied onboarding design for agents
- AGENTS.md/CLAUDE.md is the highest-leverage first step for most teams
- Nesting: put AGENTS.md in any directory; agent inherits root conventions and adds local ones
- Layering: root file = project-wide rules, directory files = domain-specific constraints
- Start with one file at root. Add directory-level files only when you see repeated mistakes

DELIVERY:
- Land the opener and pause — the audience will nod because they've lived the copy-paste phase
- If the room is technical, mention the inheritance model (root AGENTS.md + subdirectory overrides)

BRIDGE: "And this isn't just an engineering concern."
-->

---

# Context Is Cross-Functional

> "The Venn Diagram of Developer Experience and Agent Experience is a circle." — **Laura Tacho**

<v-click>

Your design system docs, component specs, and token definitions are context too. An accessibility audit agent is only as good as the guidelines you give it.

</v-click>
<v-click>

Documentation is now production infrastructure, not supporting material.

</v-click>

<!--
SOURCE: Laura Tacho, via Martin Fowler (martinfowler.com/fragments/2026-02-13.html)

KEY POINTS:
- The Tacho quote reframes context engineering as universal, not code-specific
- Product docs, design tokens, component specs — all first-class context for agents
- For designers in the room: your Figma component documentation and design tokens are first-class context inputs, same as AGENTS.md for engineers

DELIVERY:
- If there are designers in the room, make eye contact on this slide
- Keep this brief — it's a reframe, not a deep dive

BRIDGE: "Context engineering shapes what the agent knows. The second discipline shapes what the agent does."
-->

---

# Spec-Driven Development

<v-click>

**Context shapes what the agent knows. Specs shape what good looks like.**

</v-click>
<v-click>

A spec is the smallest clear, testable packet of intent: scope, constraints, acceptance criteria, expected behavior. Large projects become a series of these packets, each small enough to fit inside the agent's context window with room to reason.

</v-click>
<v-click>

The cycle: **spec → implement → verify → refine.** You write the spec and own the verification. The agent generates the first implementation.

</v-click>
<v-click>

> "LLMs do best when given focused prompts: implement one function, fix one bug, add one feature at a time." — **Addy Osmani**

</v-click>

<!--
SOURCE: Addy Osmani, "My LLM coding workflow going into 2026" (addyo.substack.com/p/my-llm-coding-workflow-going-into)
SOURCE: Entire announcement (entire.io/blog/hello-entire-world)
SOURCE: Monarch's Philosophy (somehowmanage.com/2026/01/22/a-step-behind-the-bleeding-edge-monarchs-philosophy-on-ai-in-dev/)

KEY POINTS:
- Opens by connecting directly to context engineering — the two disciplines are paired
- A spec is defined concretely: acceptance criteria, constraints, expected behavior
- Scoping matters because of the finite context window — a monolithic request floods the window
- Sequence matters: spec, implement, verify, refine
- Verification is part of the workflow contract, not an afterthought
- Tie to known practices: issue decomposition, acceptance criteria, iterative review
- Osmani quote is the concise rule-of-thumb: narrow tasks outperform vague mega-prompts

DELIVERY:
- Keep this practical and procedural
- Emphasize "you own the verification" — this is where human judgment stays essential
- Remind the room this applies to product and design workflows too

BRIDGE: "In product work, this changes the medium of validation too — and you've already seen that with the Andrew Chen quote. Now let's make it concrete. You know the two disciplines. But without the right building blocks, they stay theoretical. Let me show you what makes them real."
-->
