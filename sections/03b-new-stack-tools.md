---
layout: section
transition: section-shift
---

# The New Stack: Tools

Skills, MCP, etc.— reusable building blocks for agentic workflows

<!--
KEY POINTS:
- This section translates principles into concrete building blocks
- Use one workflow as an example, but keep the pattern tool-agnostic
- Order here matters: mental model first, then components, then composition

BRIDGE: "You've seen the concepts — context engineering and spec-driven development. Now let's look at the specific tools that implement them."
-->

---
layout: two-cols-header
---

# Markdown: The Shared Language

Human-readable AND machine-readable. Versionable like code. AGENTS.md, skills, agent definitions — **all markdown.** This is from the repo behind these slides:

::left::

**You write this:**

```md
# AGENTS.md

## Stack
- Slidev, Vue 3, UnoCSS
- Package manager: **Yarn 4**

## Guidelines
- One idea per slide
- Use `v-click` for reveals
```

::right::

<v-click>

<div class="ml-4">

**The agent reads this:**

<div class="p-5 rounded-lg bg-white border border-gray-200 text-gray-800">
  <div class="text-xl font-bold mb-3">AGENTS.md</div>
  <div class="text-base font-semibold mt-4 mb-1">Stack</div>
  <ul class="text-sm my-1 ml-4 list-disc">
    <li>Slidev, Vue 3, UnoCSS</li>
    <li>Package manager: <strong>Yarn 4</strong></li>
  </ul>
  <div class="text-base font-semibold mt-4 mb-1">Guidelines</div>
  <ul class="text-sm my-1 ml-4 list-disc">
    <li>One idea per slide</li>
    <li>Use <code class="bg-gray-100 text-pink-600 px-1 rounded text-xs">v-click</code> for reveals</li>
  </ul>
</div>

</div>

</v-click>

<!--
KEY POINTS:
- The left shows raw markdown — plain text anyone can write
- The right shows what it looks like rendered — structured, scannable, clear
- The agent parses the same structure: headings become sections, lists become constraints, bold becomes emphasis
- This is WHY the agentic ecosystem converged on markdown — it sits at the intersection of human readability and machine parsability
- Connect forward: every tool in section 03b (skills, agents, AGENTS.md) uses markdown as its medium

DELIVERY:
- Keep this brief — 60-90 seconds maximum
- Point at the left: "This is what you type." Point at the right: "This is what the agent sees — the same thing you see."
- If the room raised many hands for AGENTS.md/Skills in the room check, move through quickly
- If the room was unfamiliar, pause on the example: "Headers, bullet points, bold text. That's it. That's markdown."
- For designers: "Think of it like structured notes — except those notes become instructions an agent follows."

BRIDGE: "Now that you know the medium, let's look at the first tool built on it."
-->

---
layout: default
---

# Skills in Plain Language

<v-click>

A skill is a **reusable playbook**: a folder with instructions for one kind of task.

</v-click>
<v-click>

Write the workflow once, then run it whenever that task shows up.

</v-click>
<v-click>

The agent keeps only a short description in memory, not the full playbook.

</v-click>
<v-click>

When needed, it loads full instructions on demand. Less prompt repetition, cleaner context.

</v-click>
<v-click>

Same playbook can run across terminal tools, web apps, and API workflows.

</v-click>

<!--
KEY POINTS:
- Use "playbook" language for non-developer audiences
- Core mechanism: lightweight discovery first, full instructions loaded only when relevant
- Benefit: keeps the context window focused and reduces repeated prompting
- Portability: one encoded workflow can be reused across CLI, web UI, and API surfaces
- Ecosystem signal: Anthropic's open-source Claude Skills repo shows this pattern at scale, including a "skill creator" meta-skill
- Translate to business language: dynamic memory loading improves reliability by reducing context-window overload
- If asked "is this just prompt engineering?": yes, but versioned, reusable, and discoverable

BRIDGE: "Now let's look at how skills are triggered in practice."
-->

---
layout: default
class: text-center
---

<MermaidDiagram :code="`graph LR
  U1[User: '/commit-message'] -->|slash command| A[Agent]
  U2[User: 'Check our changes for security issues'] -->|prompt matches| A
  A --> SL[Skill Loader]
  subgraph User-Invocable
    SK1[git:commit-message]
    SK2[verify:run]
  end
  subgraph Model-Invocable
    SK3[code-reviewer]
    SK4[silent-failure-hunter]
  end
  SL -->|explicit load| SK1
  SL -.->|available| SK2
  SL -.->|auto-discovered| SK3
  SL -.->|available| SK4
  SK1 -->|instructions| LLM[LLM Interprets]
  SK3 -->|instructions| LLM
  LLM -->|soft guidance| R[Output]
`" size="xl" />

<p class="mt-4 text-lg opacity-85">Skills shape how the agent <strong>thinks</strong>.</p>

<v-click>

<p class="text-base opacity-75"><strong>Manual trigger</strong> — run a slash command when you want a specific playbook. (<code>/commit-message</code>, <code>/verify:run</code>)</p>

</v-click>
<v-click>

<p class="text-base opacity-75"><strong>Automatic trigger</strong> — the agent matches your request to a skill description and loads it for you. (<code>code-reviewer</code>, <code>silent-failure-hunter</code>)</p>

</v-click>
<v-click>

<p class="text-base opacity-75"><strong>Guidance, not rigid code</strong> — the model interprets markdown instructions and can adapt them to the task.</p>

</v-click>
<v-click>

<p class="text-base opacity-75">Same format applies beyond code: design reviews, accessibility audits, copy editing. <strong>If you can describe the workflow in markdown, you can turn it into a skill.</strong></p>

</v-click>

<!--
FRAMING (use verbally): Think of it like a kitchen. APIs are the utensils — each does one thing. Skills are the recipes — soft guidance, adaptable to the situation. MCP is the kitchen itself — standardised layout and plumbing. "You're not building the kitchen from scratch. You're equipping it and writing the recipes."

- Two invocation models: user-invocable (slash command) vs model-invocable (auto-discovered from prompt)
- User-invocable: user explicitly triggers with /command — deterministic selection
- Model-invocable: agent reads skill descriptions, matches to current prompt, loads autonomously
- Both paths end the same way: skill .md is read, LLM interprets instructions, generates output
- Dotted arrows = available but not loaded for this invocation
- Key contrast: "soft guidance" — the LLM can deviate, adapt, reason about the instructions
- This is the conceptual counterpart to MCP on the next slide
- Concrete examples: /commit-message (user-invocable), code-reviewer (model-invocable)
- For product/UX: same format works for design review, accessibility checks, or copy editing

BRIDGE: "Skills shape thinking. MCP shapes doing. Let's look at MCP."
-->

---
layout: default
---

# MCP in Plain Language

<v-click>

MCP is a **standard plug format** (think like USB) for tools and data an agent can use.

</v-click>
<v-click>

Instead of building a custom integration for every app, one protocol works across many apps.

</v-click>
<v-click>

Each MCP server publishes what it offers: actions (Tools), context (Resources), and reusable templates (Prompts).

</v-click>
<v-click>

Requests and responses follow schemas, so handoffs are predictable and machine-checkable.

</v-click>
<v-click>

In plain terms: skills tell the agent how to think. MCP tells it what systems it can safely operate.

</v-click>

<!--
KEY POINTS:
- Keep "plug format" language for non-technical audiences
- Value proposition: interoperability and lower integration overhead
- Three capability types map to practical intuition: do, read, reuse
- Hard contracts reduce ambiguity, retries, and brittle handoffs
- Pairing model: skills = workflow behavior, MCP = external system interface

BRIDGE: "Now let's look at one concrete MCP flow end to end."
-->

---
layout: default
class: text-center
---

# From Concept to Workflow

<p class="text-base opacity-75 mb-4">One concrete MCP flow, end to end.</p>

<MermaidDiagram :code="`graph LR
  U[User: 'Create a Linear issue about the bug we just found'] -->|prompt| A[Agent]
  A -->|picks a tool| C[MCP Client]
  C -->|connects to| S[Linear MCP Server]
  subgraph Capabilities
    T1[Tool: create_issue]
    T2[Tool: update_issue]
    R1[Resource: team_members]
    P1[Prompt: bug_report]
  end
  S -->|exposes| T1
  S -->|exposes| T2
  S -->|exposes| R1
  S -->|exposes| P1
  T1 -->|validated result| RES[Issue LIN-1234]
`" size="xl" />

<p class="mt-4 text-lg opacity-85">MCP shapes what the agent can <strong>do</strong>.</p>

<v-click>

<p class="text-base opacity-75"><strong>One server, three capability types</strong> — Tools (functions to call), Resources (read-only data), Prompts (reusable templates).</p>

</v-click>
<v-click>

<p class="text-base opacity-75"><strong>Hard contracts</strong> — inputs and outputs are schema-validated. No interpretation, no ambiguity at the interface.</p>

</v-click>

<!--
- User task → Agent selects a tool from the Linear MCP Server
- A single MCP server exposes three capability types: Tools, Resources, Prompts
- Tools: functions the LLM calls (create_issue, update_issue)
- Resources: read-only data (team_members list)
- Prompts: reusable templates (bug_report format)
- Execution: schema-constrained — input/output validated against a JSON schema
- Key contrast with Skills: Skills are soft guidance (markdown), MCP is hard contracts (schema)
- Linear is the primary example, but the same protocol connects to any system
-->

---
layout: default
class: text-center
---

# MCP Example: Figma <-> Frontend

<MermaidDiagram :code="`graph LR
  U[User: 'Implement the approved pricing frame'] --> A[Agent]
  A --> C[MCP Client]
  C --> F[Figma MCP Server]
  subgraph Figma Data
    T[Tool: get_design_context]
    R[Tool: get_variable_defs]
    P[Prompt: handoff_checklist]
    G[Tool: generate_figma_design]
  end
  F -->|exposes| T
  F -->|exposes| R
  F -->|exposes| P
  F -->|exposes| G
  T --> S[Scoped spec + acceptance criteria]
  R --> S
  P --> S
  S --> PR[Implementation plan + PR]
  PR --> UI[Running UI in browser]
  UI --> G
  G --> OUT[Back to Figma file]
`" size="xl" />

<p class="mt-4 text-lg opacity-85">Design intent becomes structured input, not screenshot guessing.</p>

<v-click>

<p class="text-base opacity-75"><strong>Schema-bound handoff</strong> — the agent reads frames, components, and tokens through contracts, not manual copy/paste.</p>

</v-click>
<v-click>

<p class="text-base opacity-75"><strong>Bridge across teams</strong> — designers approve in Figma, engineers execute from the same source of truth.</p>

</v-click>
<v-click>

<p class="text-base opacity-75"><strong>Now bidirectional</strong> — Claude Code can hand live UI back to Figma with <code>generate_figma_design</code> (remote server).</p>

</v-click>

<!--
SOURCE: Figma Help Center, "Use Figma MCP in Claude Code, Codex CLI, and Cursor" (help.figma.com/hc/en-us/articles/32132100833559-Use-Figma-MCP-in-Claude-Code-Codex-CLI-and-Cursor)
SOURCE: Figma Developers, "Figma Dev Mode MCP Server" (www.figma.com/developers/mcp)

KEY POINTS:
- Make this concrete: same MCP pattern, different domain (design instead of issue tracking)
- Emphasize handoff quality: less ambiguity and fewer interpretation errors
- Position this as cross-functional leverage, not just a developer trick
- The output is not "perfect UI in one shot" — it is a better scoped spec and implementation plan
- New workflow to call out: Claude Code -> Figma handoff via `generate_figma_design`
- Constraint: this handoff path requires the remote Figma MCP server and currently supports Claude Code and Codex

DELIVERY:
- "This is where MCP gets interesting: not just tickets and repos, but design systems and approved frames."
- "Instead of guessing from screenshots, the agent pulls structured frame and token data."
- "The immediate win is cleaner handoff and traceability from design decision to code change."
- "And now it goes both ways: not only Figma to code, but code UI back to Figma for review."
- DESIGN PERSPECTIVE (Jenny Wen, Design Lead at Anthropic, via Lenny Rachitsky): Figma remains essential because canvas exploration lets you rapidly explore 8–10 directions simultaneously. Coding tools are too linear — once you start building one direction, investment bias sets in.
- Verbal option: "Jenny Wen argues Figma is still indispensable — it's the only tool that lets you diverge across 8 to 10 directions without the investment bias of building one. That's why the MCP bridge matters: Figma for exploration, code for execution."

BRIDGE: "Now zoom out from one MCP integration to the workflow you intentionally compose around these building blocks."
-->

---
layout: statement
---

# With Figma MCP, Claude reads your file directly. Components, design tokens, spacing — all of it. It's not guessing at the design. It's working from the source of truth.

<!--
KEY POINTS:
- This is the speaker's own framing — land it with conviction, not as a quote
- "Source of truth" is the key phrase — reframes the Figma MCP bridge as design governance, not just developer convenience
- Connects to context engineering: design tokens and component specs are first-class context, same as AGENTS.md for engineers
- The specificity matters: components, tokens, spacing — not vague "design intent" but structured, machine-readable data

DELIVERY:
- This follows the technical diagram — shift from "here's how it works" to "here's what it means"
- If designers in the room: "Your Figma files are already structured data. MCP just makes them legible to agents."

BRIDGE: "This pattern — structured handoff from domain tools into agent context — scales beyond Figma."
-->

---
layout: two-cols-header
---

# Claude Cowork: Same Stack, Wider Audience

::left::

<v-click>

**Under the hood (same primitives)**

- Context shaping behavior
- Tools and MCP integrations
- Skills and workflow templates
- Guardrails and verification loops

</v-click>

::right::

<v-click>

**In the experience (new interface)**

- Task-first prompts, not terminal commands
- Opinionated defaults for common workflows
- Domain experts can operate directly
- Engineers still design the harness

</v-click>
<v-click>

**Not just "AI for engineers" anymore.**
This is becoming cross-functional infrastructure.

</v-click>

<!--
KEY POINTS:
- Frame this as continuity, not novelty: same agentic primitives, different UX
- "Regular people" means domain experts in operations, support, marketing, finance, legal — people who don't live in IDEs
- Keep responsibility clear: broader access does not remove the need for engineered guardrails
- Core takeaway: agent workflow design is becoming cross-functional

BRIDGE: "So the question is no longer 'Will this stay in engineering?' It's 'How intentionally will you design your workflow?'"
-->

---

# One Approach: kramme-cc-workflow

<v-click>

My personal set of **recipes and guardrails** — skills, agents, and hooks encoding how I want to work. I've built mine. **You'll build yours.**

</v-click>
<v-click>

The numbers don't matter. The pattern does: **explicit workflow design, encoded in files, versioned like code.** Let's look at the building blocks.

</v-click>

<!--
KEY POINTS:
- Keep this brief — the point is that the pattern exists, not the scale of your implementation
- Emphasize "adaptable pattern," not "copy my setup"
- For designers: same pattern works for design system governance, accessibility audits, component specs

BRIDGE: "Let's start with guardrails."
-->

---

# Guardrails

<SlideImage src="/guardrails-bowling.jpg" alt="Bowling lane guardrails" size="sm" />

<v-click>

**LLMs are stochastic.** Same prompt, different result every time. You don't get reliability by perfecting prompts — you get it by **designing the system around them.**

</v-click>
<v-click>

Without guardrails, every iteration needs human review. With them, the agent can try → fail → retry autonomously.

</v-click>
<v-click>

Context shapes knowledge. Specs shape direction. **Guardrails shape boundaries** — tests, hooks, and validation scripts.

</v-click>
<v-click>

Every repeated human intervention is a signal that the harness is incomplete.

</v-click>

<!--
SOURCE: Claire Vo (x.com/clairevo/status/2026331055012319450)
SOURCE: Monarch's Philosophy on AI in Dev (somehowmanage.com/2026/01/22/a-step-behind-the-bleeding-edge-monarchs-philosophy-on-ai-in-dev/)

KEY POINTS:
- Anchor with design truth: outputs are nondeterministic — system design, not prompt craft
- Guardrails convert stochastic generation into controlled iteration
- Tests are the most familiar guardrail: TDD means the test IS the spec the agent implements against. Tests close the iteration loop — attempt → failure → retry. They're executable specifications.
- Hooks are another: shell scripts at lifecycle points (PreToolUse blocks destructive commands, PostToolUse auto-formats, Stop enforces standards)
- For designers: visual regression tests, accessibility checks, component snapshots serve the same role
- Every repeated human intervention signals harness incompleteness

DELIVERY:
- "That orchestration layer needs the same rigor as any distributed system — except the components are nondeterministic." — Pirouette B
- Laura Tacho: "The Venn Diagram of Developer Experience and Agent Experience is a circle"
- Expand on tests verbally: "Write the test first — it becomes the spec. Agent writes code, tests run, failure signals what to fix, agent retries. Tests are executable definitions of done."
- Expand on hooks verbally: "Shell scripts that fire at lifecycle points — blocking destructive commands, auto-formatting, enforcing standards."

BRIDGE: "With guardrails in place, we can talk about specialization."
-->

---

# Specialized Agents

<v-click>

An agent is an LLM with a system prompt, a set of tools, and permission to act autonomously in a loop — **read, think, act, observe, repeat.**

</v-click>
<v-click>

A **specialized agent** narrows that loop. Focused persona, constrained toolset, single job — security review, accessibility audit, architecture check. Each agent is a markdown file you can read, edit, and version.

</v-click>
<v-click>

**Single-responsibility principle — but for agents.** Context windows are finite — the more concerns you load, the shallower the attention. A focused agent doesn't just perform better — it's easier to test, debug, and trust.

</v-click>

<!--
KEY POINTS:
- Define an agent operationally, not mystically
- Specialization narrows scope, tools, and evaluation criteria
- Treat each specialized agent as a testable, versioned component
- Attention in-context is finite; specialization preserves depth
- SRP maps cleanly from code modules to agent design

SOURCE: Entire, "Hello Entire World" (entire.io/blog/hello-entire-world)
SOURCE: Addy Osmani, "My LLM coding workflow going into 2026" (addyo.substack.com)

BRIDGE: "Individual agents each doing one job well. What happens when you need them to work together?"
-->

---

# Agent Teams

<v-click>

A **lead agent** receives a task, breaks it into subtasks, and spawns specialized agents to work on each one — in parallel.

</v-click>
<v-click>

Workers report back. The lead reviews, coordinates, and merges results. **Same pattern as a tech lead running a sprint.**

</v-click>
<v-click>

Shared task list, message passing, dependency tracking. The agents coordinate through structure, not conversation.

</v-click>

<!--
KEY POINTS:
- This is composition: orchestrating many narrow agents under one control loop
- Keep the analogy to a tech lead and sprint team
- Coordination primitives matter more than "chatting" between agents

BRIDGE: "Individual agents, teams, coordination through structure. All of this — the whole system around the model — has a name."
-->

---
layout: statement
---

<h1>Harness Engineering</h1>

<SlideImage src="/verification-loop.png" alt="Verification loop diagram" size="xs" />

<v-click>

Context. Specs. Skills. MCP. Hooks. Tests. Specialized agents. Coordinated teams. **All one discipline — designing the system around the model.**

</v-click>
<v-click>

Humans remain in the loop — but at a different layer. We prioritize work, translate feedback into acceptance criteria, and validate outcomes.

</v-click>
<v-click>

Every time an agent fails, you don't just fix the output, you take it as a signal to improve the harness so it doesn't fail that way again.

</v-click>
<v-click>

> "The model is the engine. The harness is the car." — **Mitchell Hashimoto**

</v-click>

<!--
SOURCE: OpenAI, "Harness Engineering" (openai.com/index/harness-engineering/)
SOURCE: Mitchell Hashimoto, "My AI Adoption Journey" (mitchellh.com/writing/my-ai-adoption-journey)

KEY POINTS:
- Name the discipline that ties all prior concepts together
- Treat each v-click as a recap ladder from parts to operating model
- Emphasize failure-as-signal: improve the harness, not just the output
- This is the conceptual peak before the live demo

BRIDGE: "Now let's watch this operating model in motion."
-->

---
layout: center
class: text-center
---

# Demo Time

Context flowing in. Specs driving execution. Guardrails catching failures. A human in the loop.

<!--
DELIVERY:
- Prime the audience: what to watch for during the demo
- Quick reset slide before context switch to live workflow
- State what the demo will prove: speed with guardrails and human accountability
-->
