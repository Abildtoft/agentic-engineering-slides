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
class: v-center
---

# From Producing Outputs to Designing the Loop

<v-click>

**The agentic level isn't “faster autocomplete.”**

</v-click>
<v-click>

You're no longer producing every artifact. You're designing the loop around the agent: **choose the work, set the bar, improve the loop.**

</v-click>
<v-click>

**Two disciplines make that work:**
1. Context engineering
2. Spec-driven development

</v-click>

<!--
KEY POINTS:
- Core shift: from producing code to designing the loop around agents
- "Choose the work, set the bar, improve the loop" — the maintainer's job, shortest form
- Emphasize ownership: human accountability does not disappear
- Frame "context + specs + verification" as the new unit of craft

BRIDGE: "Let's look at each discipline."

ADDITIONAL POINTS:
- Eriksson: "Speed without direction is just burning jet fuel on a runway... the bottleneck was never execution — it was always clarity." This directly reinforces the shift from producing artifacts to designing systems.

DELIVERY:
- Acknowledge the room: "Not every organization is there yet. Security reviews, compliance constraints, team skepticism — these are real. What I'll show you are the patterns that work when you can adopt them. Think of this as the target state, not the assumption."
- This grounds the audience before diving into tooling specifics — especially important if the room includes people from regulated industries
- Optional verbal after revealing the two disciplines: "Martin Eriksson put it well: 'Speed without direction is just burning jet fuel on a runway.' Context engineering is the direction. Specs are the runway markings."

SOURCE: Monarch's Philosophy on AI in Dev (somehowmanage.com/2026/01/22/a-step-behind-the-bleeding-edge-monarchs-philosophy-on-ai-in-dev/)
SOURCE: Martin Eriksson, "When Software Becomes Cheap, Strategy Becomes Everything" (thedecisionstack.com/when-software-becomes-cheap-strategy-becomes-everything/)
-->

---
class: v-center
---

# Context Engineering

<v-click>

**We always needed context. Now agents can find it themselves.**

</v-click>
<v-click>

But every context window is finite. Context engineering gets the *important* information into that budget: right information, right order, right time.

</v-click>
<v-click>

> “The Venn Diagram of Developer Experience and Agent Experience is a circle.”
>
> Laura Tacho

Design docs, component specs, tokens — context too. **Documentation is now production infrastructure.**

</v-click>

<!--
KEY POINTS:
- Progressive-disclosure story: copy-paste → chat-in-IDE → agent reads the project itself
- Finite context window: curate the discovery journey, don't dump everything in
- AGENTS.md/CLAUDE.md is the highest-leverage first step for most teams
- Tacho quote reframes context as universal: product docs, design tokens, component specs too

BRIDGE: "Context engineering shapes what the agent knows. The second discipline shapes what the agent does."

ADDITIONAL POINTS:
- Tell the progressive-disclosure story over the first click rather than giving it a line: copy-paste into ChatGPT was the first wave and the context was never enough. The room has lived the copy-paste phase and will nod
- The key unlock of Claude Code: the agent itself navigates, reads, and builds context — no manual feeding required
- Trivedy calls this "Context Rot": models become worse at reasoning as their context fills up. "Harnesses today are largely delivery mechanisms for good context engineering."
- Concrete architecture example from Boris: simple model-driven `glob` + `grep` beat more complex RAG approaches for codebase retrieval
- Context engineering is applied onboarding design for agents
- Nesting: put AGENTS.md in any directory; agent inherits root conventions and adds local ones. Layering: root file = project-wide rules, directory files = domain-specific constraints
- Start with one file at root. Add directory-level files only when you see repeated mistakes
- An accessibility audit agent is only as good as the guidelines you give it
- For designers: your Figma component documentation and design tokens are context inputs exactly as AGENTS.md is for engineers

DELIVERY:
- Land the opener and pause — the audience will nod because they've lived the copy-paste phase
- If the room is technical, mention the inheritance model (root AGENTS.md + subdirectory overrides)
- Keep the last click brief — it's a reframe, not a deep dive. If there are designers in the room, make eye contact on it

SOURCE: Addy Osmani (x.com/addyosmani/status/2007899127925854536)
SOURCE: Pragmatic Engineer, "Building Claude Code with Boris Cherny" (newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny)
SOURCE: Laura Tacho, via Martin Fowler (martinfowler.com/fragments/2026-02-13.html)
-->

---
class: v-center
---

# Spec-Driven Development

<v-click>

**Context shapes what the agent knows. Specs shape what good looks like.**

</v-click>
<v-click>

A spec is the smallest clear, testable packet of intent: scope, constraints, acceptance criteria. Large projects become a series of these packets.

</v-click>
<v-click>

The cycle: **spec → implement → verify → refine.** You write the spec and own the verification.

</v-click>
<v-click>

> “LLMs do best when given focused prompts: implement one function, fix one bug, add one feature at a time.”
>
> Addy Osmani

</v-click>

<!--
KEY POINTS:
- Opens by connecting to context engineering — the two disciplines are paired
- A spec, concretely: acceptance criteria, constraints, expected behavior
- Sequence matters: spec, implement, verify, refine
- Verification is part of the workflow contract, not an afterthought
- Osmani quote is the rule-of-thumb: narrow tasks outperform vague mega-prompts

BRIDGE: "In product work, this changes the medium of validation too — Section 5 makes that concrete with the prototype. Now let's make the disciplines concrete. You know the two disciplines. But without the right building blocks, they stay theoretical. Let me show you what makes them real."

ADDITIONAL POINTS:
- Scoping matters because of the finite context window — a monolithic request floods the window
- Tie to known practices: issue decomposition, acceptance criteria, iterative review

DELIVERY:
- Keep this practical and procedural
- Emphasize "you own the verification" — this is where human judgment stays essential
- Remind the room this applies to product and design workflows too

SOURCE: Addy Osmani, "My LLM coding workflow going into 2026" (addyo.substack.com/p/my-llm-coding-workflow-going-into)
SOURCE: Entire announcement (entire.io/blog/hello-entire-world)
SOURCE: Monarch's Philosophy (somehowmanage.com/2026/01/22/a-step-behind-the-bleeding-edge-monarchs-philosophy-on-ai-in-dev/)
-->
