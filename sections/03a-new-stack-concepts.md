---
layout: section
transition: section-shift
---

# The New Stack: Core Concepts

Context engineering, spec-driven development, and the new role of the engineer

<!--
[T+36:15 | S3a slide 1 of 8 | 0.5min]

KEY POINTS:
- Section 3 is the practical core of this session
- Three parts: concepts (mental model shifts), tools (specific mechanisms), composed systems (how they fit together)
- This first part is for everyone — concepts apply whether you write code, design products, or define requirements

BRIDGE: "We've named the shift — the middle is compressing, value moves to intent and judgment. Now: what does the new way of working actually look like?"
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
[T+37:45 | S3a slide 2 of 8 | 2min]

SOURCE: Monarch's Philosophy on AI in Dev (somehowmanage.com/2026/01/22/a-step-behind-the-bleeding-edge-monarchs-philosophy-on-ai-in-dev/)

KEY POINTS:
- Monarch: "Design that system (you + AI), figuring out your role in it, since you will ultimately own the output."
- Section 1 showed the spectrum — autocomplete, assisted editing, agentic
- Most of you are at level 1; the jump to level 3 isn't a better tool — it's a different kind of work
- You stop being the coder and start being the system designer
- For non-dev audience: forming clear intent, defining constraints, evaluating output — that IS the work now

BRIDGE: "Let's look at each discipline."
-->

---

# Context Engineering

<v-click>

The models could already reason about code. The unlock was giving them tools to read yours.

</v-click>
<v-click>

**Your codebase is the prompt.**

</v-click>
<v-click>

`AGENTS.md` — Project conventions, patterns, constraints, workflow definitions. Read by the agent on every session start.

</v-click>
<v-click>

Project context files — Architecture docs, style guides, domain knowledge. Everything the agent needs to make good decisions.

</v-click>

<!--
[T+39:30 | S3a slide 3 of 8 | 2min]

SOURCE: Laura Tacho, via Martin Fowler (martinfowler.com/fragments/2026-02-13.html)

KEY POINTS:
- Claude Code's key insight: Bash, Grep, file reads — basic codebase traversal tools — unlocked capabilities already latent in the models
- The models didn't get smarter; they got eyes into existing codebases
- That's why context engineering matters: the model can reason, but only about what it can see
- Tacho: "The Venn Diagram of Developer Experience and Agent Experience is a circle."
- The same clarity you'd give a new team member, you now give your agent
- AGENTS.md: markdown file at repo root, read by the agent on every session start
- Contains project conventions — framework, tests, patterns, workflow definitions, agent-specific behavior
- Think of it as onboarding docs, but the reader is an AI
- Claude Code uses the name CLAUDE.md — same concept, non-standard naming
- Real example: this presentation was built with a CLAUDE.md specifying Slidev conventions, Yarn 4, multi-file structure
- The quality of your agent's output is directly proportional to the quality of the context you provide

DELIVERY:
- For PMs and UX: design system docs, product requirements, domain glossaries — they're all context now

BRIDGE: "Good documentation went from nice-to-have to the single biggest lever on agent output quality."
-->

---
layout: statement
---

# Good documentation went from "nice to have" to the single biggest lever on agent output quality

<!--
[T+40:15 | S3a slide 4 of 8 | 1min]

SOURCE: Martin Fowler / Laura Tacho (martinfowler.com/fragments/2026-02-13.html)
SOURCE: Addy Osmani (x.com/addyosmani/status/2007899127925854536)

KEY POINTS:
- Fowler/Tacho: "It's sad that this implies that the execs won't make the effort for humans that they are making for the robots."
- Osmani: "Design the context architecture that makes good outcomes inevitable."
- Let this land — every architecture doc, style guide, README now does double duty (helps your team AND your agents)
- How much context would a new team member need to be productive? That's exactly how much your agent needs
- If onboarding a person takes weeks because nothing is written down, your agent will struggle too

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

<!--
[T+42:00 | S3a slide 5 of 8 | 2min]

SOURCE: Addy Osmani, "My LLM coding workflow going into 2026" (addyo.substack.com/p/my-llm-coding-workflow-going-into)
SOURCE: Entire announcement (entire.io/blog/hello-entire-world)
SOURCE: Monarch's Philosophy (somehowmanage.com/2026/01/22/a-step-behind-the-bleeding-edge-monarchs-philosophy-on-ai-in-dev/)

KEY POINTS:
- Osmani: "A crucial lesson I've learned is to avoid asking the AI for large, monolithic outputs. Instead, we break the project into iterative steps or tickets and tackle them one by one."
- Entire: "Spec-driven development is becoming the primary driver of code generation."
- Monarch: "Creating ways for AI to validate its own work allows it to run more autonomously with less input from you."
- Same discipline as good engineering management — you wouldn't give a junior a vague, massive task
- Break it down, define acceptance criteria, review incrementally — agents work the same way
- Practical example: the SIW workflow — write a presentation plan (the spec), break into issues (focused chunks), implement one at a time with clear acceptance criteria

DELIVERY:
- For the mixed audience: product people write specs, UX people define requirements
- The difference is that now the spec is executable
- Recall Section 2 — "the spec is becoming the product." This is the practical mechanism behind that statement

BRIDGE: "LLMs do best when given focused prompts."
-->

---
layout: quote
---

# "LLMs do best when given focused prompts: implement one function, fix one bug, add one feature at a time."

Addy Osmani

<!--
[T+42:45 | S3a slide 6 of 8 | 1min]

SOURCE: Addy Osmani, "My LLM coding workflow going into 2026" (addyo.substack.com/p/my-llm-coding-workflow-going-into)

KEY POINTS:
- Osmani is a Chrome engineering lead at Google — hard-won workflow wisdom, not theory
- Connect to audience's Copilot experience: Copilot is better at completing a single function than scaffolding an entire feature
- Same principle applies at the agentic level, just with larger chunks
- Actionable takeaway: whatever you're building, decompose it
- The spec is the unit of work now, not the line of code

BRIDGE: "Let me show you what both of these concepts look like in practice."
-->


