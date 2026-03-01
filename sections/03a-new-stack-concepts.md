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
layout: center
class: text-center
---

# Quick Room Check

<v-click>

Raise one hand if you've heard of it. Two if you've used it.

</v-click>

<div class="text-left inline-block">
<v-clicks>

- `AI-driven prototyping (MagicPatterns, Figma Make, Lovable, etc.)`
- `Agentic IDEs (Cursor, Windsurf, Antigravity)`
- `Coding agents (Claude Code, Codex, Gemini CLI)`
- `AGENTS.md / CLAUDE.md`
- `MCP, Skills, Hooks`
- `Spec-driven development`
- `AI-generated product specs and user research synthesis`
- `Custom agents and agent swarms`

</v-clicks>
</div>

<!--
KEY POINTS:
- Calibrate vocabulary and maturity in the room before the practical sections
- Fast show-of-hands creates shared context for tooling and workflow slides
- Use this to decide pacing for Section 3

DELIVERY:
- Mostly new to terms: define each term in one sentence and slow the demos slightly
- Mixed familiarity: keep defaults and anchor with analogies
- Highly familiar room: move faster and spend more time on composition patterns

BRIDGE: "Now that we have a baseline, let's start with the two core disciplines."
-->

---

# From Writing Code to Designing Systems

<v-click>

**The agentic level isn't "faster autocomplete"**

</v-click>
<v-click>

You're no longer writing code line by line. You're designing a system where AI produces code and you shape the inputs, constraints, and verification.

</v-click>
<v-click>

**Two new disciplines define this work:**
1. Context engineering — shaping what the agent knows
2. Spec-driven development — shaping what the agent does

</v-click>

<!--
SOURCE: Monarch's Philosophy on AI in Dev (somehowmanage.com/2026/01/22/a-step-behind-the-bleeding-edge-monarchs-philosophy-on-ai-in-dev/)

KEY POINTS:
- Core shift: from producing code directly to designing the production system around agents
- Emphasize ownership: human accountability does not disappear
- Frame "context + specs + verification" as the new unit of craft

DELIVERY:
- Acknowledge the room: "Not every organization is there yet. Security reviews, compliance constraints, team skepticism — these are real. What I'll show you are the patterns that work when you can adopt them. Think of this as the target state, not the assumption."
- This grounds the audience before diving into tooling specifics — especially important if the room includes people from regulated industries

BRIDGE: "Let's look at each discipline."
-->

---

# Context Engineering

<v-click>

**We always needed context. Now agents can find it themselves.**

</v-click>
<v-click>

Copy-pasting snippets into ChatGPT was the first wave — but the context was always wanting. The key unlock of Claude Code and similar tools: the agent itself discovers your codebase — reading files, tracing conventions, building understanding as it goes.

</v-click>
<v-click>

Think onboarding: everything a strong new hire needs on day one, encoded as `AGENTS.md` and project context files, layered from root to subdirectory. Documentation went from "nice to have" to infrastructure.

</v-click>
<v-click>

> "The Venn Diagram of Developer Experience and Agent Experience is a circle." — **Laura Tacho**

</v-click>

<!--
SOURCE: Laura Tacho, via Martin Fowler (martinfowler.com/fragments/2026-02-13.html)
SOURCE: Addy Osmani (x.com/addyosmani/status/2007899127925854536)

KEY POINTS:
- Progressive disclosure: copy-paste → chat-in-IDE → agent discovers your whole project on its own
- The key unlock of Claude Code: the agent itself navigates, reads, and builds context — no manual feeding required
- Context engineering is applied onboarding design for agents
- AGENTS.md/CLAUDE.md is the highest-leverage first step for most teams
- Nesting: put AGENTS.md in any directory; agent inherits root conventions and adds local ones
- Layering: root file = project-wide rules, directory files = domain-specific constraints
- Start with one file at root. Add directory-level files only when you see repeated mistakes
- Documentation is now production infrastructure, not supporting material

DELIVERY:
- Land the opener and pause — the audience will nod because they've lived the copy-paste phase
- Call out that product docs and design system docs are first-class context inputs
- If the room is technical, mention the inheritance model (root AGENTS.md + subdirectory overrides)

BRIDGE: "Context engineering shapes what the agent knows. The second discipline shapes what the agent does."
-->

---

# Spec-Driven Development

<v-click>

**Don't ask for monoliths. Write specs that agents execute.**

</v-click>
<v-click>

Break work into focused chunks — one function, one bug, one feature at a time.

</v-click>
<v-click>

Iterate: spec → implement → verify → refine. The human writes the spec and owns the verification. The agent writes the code.

</v-click>
<v-click>

> "LLMs do best when given focused prompts: implement one function, fix one bug, add one feature at a time." — **Addy Osmani**

</v-click>

<!--
SOURCE: Addy Osmani, "My LLM coding workflow going into 2026" (addyo.substack.com/p/my-llm-coding-workflow-going-into)
SOURCE: Entire announcement (entire.io/blog/hello-entire-world)
SOURCE: Monarch's Philosophy (somehowmanage.com/2026/01/22/a-step-behind-the-bleeding-edge-monarchs-philosophy-on-ai-in-dev/)

KEY POINTS:
- The anti-pattern is monolithic requests; the pattern is scoped executable specs
- Sequence matters: spec, implement, verify, refine
- Verification is part of the workflow contract, not an afterthought
- Tie to known practices: issue decomposition, acceptance criteria, iterative review
- Osmani quote is the concise rule-of-thumb: narrow tasks outperform vague mega-prompts

DELIVERY:
- Keep this practical and procedural
- Remind the room this applies to product and design workflows too

BRIDGE: "You now know the two disciplines. But without the right building blocks, they stay theoretical. Let me show you what makes them real."
-->

