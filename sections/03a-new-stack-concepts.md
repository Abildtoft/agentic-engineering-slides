---
layout: section
transition: section-shift
---

# The New Stack: Concepts

Context engineering, spec-driven development, and the new role of the engineer

<!--
[T+36:15 | S3a slide 1 of 8 | 0.5min]
Transition from Section 2: "We've named the shift — the middle is compressing, value moves to intent and judgment. Now: what does the new way of working actually look like?"
Section 3 is the practical core of this session. We'll cover it in three parts: concepts (the mental model shifts), tools (the specific mechanisms), and composed systems (how they fit together).
This first part is for everyone — the concepts apply whether you write code, design products, or define requirements.
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
Source: Monarch's Philosophy on AI in Dev (somehowmanage.com/2026/01/22/a-step-behind-the-bleeding-edge-monarchs-philosophy-on-ai-in-dev/)

"Design that system (you + AI), figuring out your role in it, since you will ultimately own the output."
Section 1 showed the spectrum — autocomplete, assisted editing, agentic. Most of you are at level 1. The jump to level 3 isn't just about a better tool. It's a different kind of work. You stop being the coder and start being the system designer.
For the non-dev audience: this is where your skills become directly valuable. Forming clear intent, defining constraints, evaluating output — that IS the work now.
Let's look at each discipline.
-->

---

# Context Engineering

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
Source: Laura Tacho, via Martin Fowler (martinfowler.com/fragments/2026-02-13.html)
"The Venn Diagram of Developer Experience and Agent Experience is a circle."

The same clarity you'd give a new team member, you now give your agent.
AGENTS.md: a markdown file at the root of your repo that the agent reads on every session start. It contains your project's conventions — what framework you use, how tests work, what patterns to follow, workflow definitions, and agent-specific behavior. Think of it as onboarding docs, but the reader is an AI. (Claude Code uses the name CLAUDE.md — same concept, non-standard naming.)
Real example: the presentation you're looking at right now was built with a CLAUDE.md that specifies Slidev conventions, Yarn 4, the multi-file structure. The agent followed those conventions because they were in the context.
Key insight: the quality of your agent's output is directly proportional to the quality of the context you provide.
For PMs and UX: design system docs, product requirements, domain glossaries — they're all context now.
-->

---
layout: statement
---

# Good documentation went from "nice to have" to the single biggest lever on agent output quality

<!--
[T+40:15 | S3a slide 4 of 8 | 1min]
Source: Martin Fowler / Laura Tacho (martinfowler.com/fragments/2026-02-13.html)
"It's sad that this implies that the execs won't make the effort for humans that they are making for the robots."

Source: Addy Osmani (x.com/addyosmani/status/2007899127925854536)
"Design the context architecture that makes good outcomes inevitable."

Let this land. Every architecture decision doc, every style guide, every README you maintain is now doing double duty — it helps your team AND your agents.
Think about your repos. How much context would a new team member need to be productive? That's exactly how much context your agent needs. If onboarding a person takes weeks because nothing is written down, your agent will struggle too.
Transition: context engineering shapes what the agent knows. The second discipline shapes what the agent does.
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
Source: Addy Osmani, "My LLM coding workflow going into 2026" (addyo.substack.com/p/my-llm-coding-workflow-going-into)
"A crucial lesson I've learned is to avoid asking the AI for large, monolithic outputs. Instead, we break the project into iterative steps or tickets and tackle them one by one."

Source: Entire announcement (entire.io/blog/hello-entire-world)
"Spec-driven development is becoming the primary driver of code generation."

Source: Monarch's Philosophy — "Creating ways for AI to validate its own work allows it to run more autonomously with less input from you."

This is the same discipline as good engineering management. You wouldn't give a junior a vague, massive task. You'd break it down, define acceptance criteria, and review incrementally. Agents work the same way.
Practical example: the SIW workflow we use — you write a presentation plan (the spec), it gets broken into issues (focused chunks), each issue gets implemented one at a time with clear acceptance criteria.
For the mixed audience: product people write specs. UX people define requirements. The difference is that now the spec is executable. Remember Section 2 — "the spec is becoming the product." Here's the practical mechanism behind that statement.
-->

---
layout: quote
---

# "LLMs do best when given focused prompts: implement one function, fix one bug, add one feature at a time."

Addy Osmani

<!--
[T+42:45 | S3a slide 6 of 8 | 1min]
Source: Addy Osmani, "My LLM coding workflow going into 2026" (addyo.substack.com/p/my-llm-coding-workflow-going-into)

Osmani is a Chrome engineering lead at Google. This isn't theoretical — it's hard-won workflow wisdom from someone shipping production code with AI daily.
Connect to the audience's Copilot experience: you've probably noticed this yourselves — Copilot is better at completing a single function than scaffolding an entire feature. The same principle applies at the agentic level, just with larger chunks.
The takeaway is actionable: whatever you're building, decompose it. The spec is the unit of work now, not the line of code.
Transition: let me show you what both of these concepts look like in practice.
-->

---

# Demo: Context Engineering & Spec-Driven Workflow

**What to show:**

1. Context engineering — open a project's CLAUDE.md and AGENTS.md, show how they shape agent behavior
2. SIW workflow — walk through spec → issues → focused implementation on this presentation

<!--
[T+47:30 | S3a slide 7 of 8 | 4min DEMO]
DEMO SLIDE — do not present this text, use it as a guide.

Part 1 — Context engineering (~2 min):
- Open a project's CLAUDE.md/AGENTS.md. Show the structure: conventions, stack info, file structure, and guidelines.
- Key point: "Every time Claude Code starts a session in this project, it reads these files first. That's why it knows to use Yarn, not npm. That's why it creates slides with the right layout patterns."

Part 2 — SIW workflow (~2 min):
- Show siw/PRESENTATION_PLAN.md — the spec.
- Show siw/OPEN_ISSUES_OVERVIEW.md — work broken into issues with status tracking.
- Show a specific issue file (e.g., ISSUE-P1-002) — focused scope, clear acceptance criteria.
- Show the resulting section file — the agent's output, constrained by the spec.
- "This is the same loop any team can run — define intent, execute in small chunks, verify continuously."

Keep total demo to 4-5 minutes. The demo is the proof that these concepts work.
FALLBACK: If the live demo is unresponsive, open the files directly in your editor (CLAUDE.md, AGENTS.md, siw/PRESENTATION_PLAN.md, an issue file) and walk through them as static examples. The files themselves are the proof — no running tool needed.
-->

---
layout: center
class: text-center
---

# What context would your agents need to be effective in your codebase?

<!--
[T+52:30 | S3a slide 8 of 8 | 4min DISCUSSION]
DISCUSSION PROMPT — pause here for 3-5 minutes.

This question is deliberately practical and forward-looking, not abstract.
Prompt follow-ups:
- "Think about your onboarding process. What do new team members need to learn? That's your starting context."
- "What conventions does your team follow that aren't written down anywhere?"
- "Where do you think the biggest gap is between what's in your repo and what agents need to know?"
For product/UX: "What domain knowledge would an agent need to make good product decisions in your space?"
Listen for: recognition that documentation gaps are real, concrete ideas about what they'd write, questions about how much context is too much.
This discussion sets up Section 3b: "Now that you understand the concepts — context and specs — let's look at the specific tools that implement them."
-->
