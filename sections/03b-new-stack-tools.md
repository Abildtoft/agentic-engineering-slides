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
layout: center
class: text-center
---

<SlideImage src="/kitchen-analogy-apis-skills-mcp.png" alt="Kitchen analogy showing APIs as tools, skills as recipes, and MCPs as the kitchen." size="xl" />

<p class="mt-4 text-lg opacity-85">APIs are tools. Skills are recipes. MCP is the kitchen.</p>

<v-click>

<p class="mt-2 text-xl font-semibold">Hooks are the guardrails around this kitchen.</p>

</v-click>

---
layout: center
class: text-center
---

<MermaidDiagram :code="`graph LR
  U1[User: /commit-message] -->|slash command| A[Agent]
  U2[Review this PR] -->|prompt matches| A
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

<p class="text-base opacity-75"><strong>User-invocable</strong> — triggered by a slash command. You choose when to run it. (<code>/commit-message</code>, <code>/verify:run</code>)</p>

</v-click>
<v-click>

<p class="text-base opacity-75"><strong>Model-invocable</strong> — the agent matches your prompt to a skill description and loads it automatically. (<code>code-reviewer</code>, <code>silent-failure-hunter</code>)</p>

</v-click>
<v-click>

<p class="text-base opacity-75"><strong>Soft guidance</strong> — the LLM interprets the markdown instructions. It can adapt, reorder, or reason about them. Non-deterministic by design.</p>

</v-click>

<!--
- Two invocation models: user-invocable (slash command) vs model-invocable (auto-discovered from prompt)
- User-invocable: user explicitly triggers with /command — deterministic selection
- Model-invocable: agent reads skill descriptions, matches to current prompt, loads autonomously
- Both paths end the same way: skill .md is read, LLM interprets instructions, generates output
- Dotted arrows = available but not loaded for this invocation
- Key contrast: "soft guidance" — the LLM can deviate, adapt, reason about the instructions
- This is the conceptual counterpart to MCP on the next slide
-->

---
layout: center
class: text-center
---

<MermaidDiagram :code="`graph LR
  U[Create issue from spec] --> A[Agent]
  A -->|selects tool| C[MCP Client]
  C -->|JSON-RPC| S[Linear MCP Server]
  subgraph Capabilities
    T1[Tool: create_issue]
    T2[Tool: update_issue]
    R1[Resource: team_members]
    P1[Prompt: bug_report]
  end
  S --> T1
  S --> T2
  S --> R1
  S --> P1
  T1 -->|schema-validated| RES[Issue LIN-1234]
`" size="xl" />

<p class="mt-4 text-lg opacity-85">MCP shapes what the agent can <strong>do</strong>.</p>

<v-click>

<p class="text-base opacity-75"><strong>One server, three capability types</strong> — Tools (functions to call), Resources (read-only data), Prompts (reusable templates).</p>

</v-click>
<v-click>

<p class="text-base opacity-75"><strong>JSON-RPC</strong> over a standard protocol. The agent selects a tool, the server validates inputs against a schema.</p>

</v-click>
<v-click>

<p class="text-base opacity-75"><strong>Hard contracts</strong> — inputs and outputs are schema-validated. No interpretation, no ambiguity at the interface.</p>

</v-click>

<!--
- User task → Agent selects a tool from the Linear MCP Server via JSON-RPC
- A single MCP server exposes three capability types: Tools, Resources, Prompts
- Tools: functions the LLM calls (create_issue, update_issue)
- Resources: read-only data (team_members list)
- Prompts: reusable templates (bug_report format)
- Execution: schema-constrained — input/output validated against a JSON schema
- Key contrast with Skills: Skills are soft guidance (markdown), MCP is hard contracts (schema)
- Linear is the primary example, but the same protocol connects to any system
-->

---

# We will exemplify with kramme-cc-workflow

<v-click>

My personal set of **recipes and guardrails** — tailored to how I work.

</v-click>
<v-click>

**45 skills**, **20 specialist agents**, **5 hooks** — encoding commit hygiene, PR review, structured implementation, and code quality standards.

</v-click>
<v-click>

Inspired by open-source tools like **Superpowers**, **GET SHIT DONE**, and **Compound Engineering** — but shaped to my workflow.

</v-click>

<v-click>

**Your workflow will look different — and should.** For designers, this might be design system governance, accessibility audits, or component specs. The numbers don't matter. The pattern does.

</v-click>

<v-click>

Let's take the concepts first, then demo.

</v-click>

<!--
KEY POINTS:
- This is the concrete reference implementation for the remaining slides
- Emphasize "adaptable pattern," not "copy my setup"
- The value is explicit workflow design encoded in files

BRIDGE: "With that framing, let's start with guardrails."
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

Context shapes knowledge. Specs shape direction. **Guardrails shape boundaries** — and enable speed.

</v-click>
<v-click>

Every repeated human intervention is a signal that the harness is incomplete.

</v-click>

<!--
SOURCE: Claire Vo (x.com/clairevo/status/2026331055012319450)

KEY POINTS:
- Anchor with design truth: outputs are nondeterministic — system design, not prompt craft
- Guardrails convert stochastic generation into controlled iteration
- Clarify boundary between autonomy and supervision
- Every repeated human intervention signals harness incompleteness

DELIVERY:
- "That orchestration layer needs the same rigor as any distributed system — except the components are nondeterministic." — Pirouette B
- Laura Tacho: "The Venn Diagram of Developer Experience and Agent Experience is a circle"

BRIDGE: "The most familiar guardrail is tests."
-->

---

# Tests as Guardrails

<v-click>

**TDD is more relevant than ever.** Write the test first — it becomes the spec the agent implements against.

</v-click>
<v-click>

**Tests close the iteration loop.** Agent writes code → tests run → failure signals what to fix → agent retries.

</v-click>
<v-click>

**Unit tests** — tightest loop. Seconds between attempt and feedback. The agent self-corrects without waiting for you.

</v-click>
<v-click>

**Integration and e2e tests** — wider net. Catches regressions the agent can't see from a single file.

</v-click>
<v-click>

Tests are executable specifications. They don't just catch bugs — they tell the agent what "done" looks like.

</v-click>

<!--
KEY POINTS:
- Reframe tests as runtime contracts for agent behavior
- Unit tests optimize iteration speed; broader tests protect system behavior
- "Executable definition of done" is the key phrase

BRIDGE: "Before external tools, we still need strong local context."
-->

---

# AGENTS.md in Practice

<v-click>

**You've seen the concept. Here's what makes it work at scale.**

</v-click>
<v-click>

**Nesting** — Put an `AGENTS.md` in any directory. The agent inherits root conventions and adds local ones. `src/api/AGENTS.md` can specify API patterns without repeating the global config.

</v-click>
<v-click>

**Layering** — Root file: project-wide rules. Directory files: domain-specific constraints. The agent reads all applicable layers.

</v-click>
<v-click>

Start with one file at the root. Add directory-level files only when you see repeated mistakes.

</v-click>

<!--
KEY POINTS:
- Builds on S3a's conceptual intro — this slide is about operational patterns
- Nesting is the key practical detail most teams miss
- "Start with one, add when you see repeated mistakes" prevents over-engineering

BRIDGE: "Once local context is stable, skills package repeatable workflows."
-->

---

# Skills

<v-click>

**A skill is a markdown file with instructions the agent follows on demand.**

</v-click>
<v-click>

Two types: **user-invocable** — you trigger it with a slash command (`/kramme:git:commit-message`, `/kramme:verify:run`). **Model-invocable** — the agent discovers and triggers it autonomously when the situation fits.

</v-click>
<v-click>

`/kramme:git:commit-message`, `/kramme:siw:continue`, `/kramme:verify:run`, `/kramme:code:refactor-pass`, `/kramme:a11y-auditor` — invoke with a slash command, the agent reads the markdown and executes.

</v-click>
<v-click>

**"You're not writing code. You're writing recipes."**

</v-click>

<!--
KEY POINTS:
- Skills are reusable playbooks encoded in markdown
- Distinguish invocation models clearly: human-triggered vs model-triggered
- Keep examples short; emphasize composability and transparency
- Tie back to spec-driven work: skills reduce ambiguity in repeated tasks

DELIVERY:
- For product/UX: you could write a skill for design review, accessibility checks, or copy editing — same format, markdown instructions

BRIDGE: "Skills orchestrate internal workflows. MCP connects those workflows to external systems."
-->

---

# MCP (Model Context Protocol)

<v-click>

**A standard way for agents to connect to external tools, databases, and APIs.** Think of it as USB for AI.

</v-click>
<v-click>

An MCP server exposes three types of capabilities:

- **Tools** — functions the LLM can call (like API endpoints)
- **Resources** — read-only data the client can fetch (like files or DB records)
- **Prompts** — reusable prompt templates the client can retrieve

</v-click>
<v-click>

**Examples I use daily:** Linear, Context7, Nx MCP, Chrome DevTools / Playwright, Figma, Markitdown, Magic Patterns, Granola — one protocol, many systems, no bespoke glue code.

</v-click>

<!--
KEY POINTS:
- Define MCP as the interoperability layer, not another proprietary feature
- Keep the three capability types practical and memorable
- Emphasize workflow participation: agents can now act across systems
- Real-world examples anchor MCP beyond theory
- Emphasize breadth: planning, docs, browser, design, knowledge capture

DELIVERY:
- For product/UX: MCP means agents can interact with your tools too — design systems, analytics dashboards, user feedback platforms

BRIDGE: "MCP connects agents to tools. Now: how do you enforce boundaries?"
-->

---

# Hooks

<v-click>

**Hook type tells you when it runs (lifecycle), not what policy it enforces.**

</v-click>
<v-click>

**All hook types:**

- `UserPromptSubmit` — before a prompt is processed
- `PreToolUse` — before a tool runs
- `PostToolUse` — after a tool runs
- `Stop` — when the agent hands back control
- `SubagentStop` — when a subagent finishes
- `Notification` — when a notification is shown

</v-click>
<v-click>

**Examples:** Block destructive commands, auto-format edits, enforce commit standards, surface PR/issue links.

</v-click>
<v-click>

Hook type tells you **when** it runs. What it does is up to you.

</v-click>

<!--
SOURCE: Monarch's Philosophy on AI in Dev (somehowmanage.com/2026/01/22/a-step-behind-the-bleeding-edge-monarchs-philosophy-on-ai-in-dev/)
SOURCE: Coordination is the hardest engineering problem (x.com/PirouneB/status/2022783395139318007)

KEY POINTS:
- Clarify lifecycle vs policy: hook type defines timing, policy defines behavior
- Hooks are enforcement and observability points in the workflow
- Use concrete examples so this doesn't stay abstract

BRIDGE: "Once guardrails are in place, we can discuss specialization."
-->

---

# Specialized Agents

<v-click>

An agent is an LLM with a system prompt, a set of tools, and permission to act autonomously in a loop — **read, think, act, observe, repeat.**

</v-click>
<v-click>

A **specialized agent** narrows that loop. It gets a focused persona, a constrained toolset, and a single job — security review, accessibility audit, architecture check.

</v-click>
<v-click>

Each agent is a markdown file — persona, constraints, evaluation criteria — with optional scripts and tools scoped just to it. **A mini MCP per agent.**

</v-click>
<v-click>

**Single-responsibility principle — but for agents.** Context windows are finite — the more concerns you load, the shallower the attention. One persona, one evaluation lens, one job.

</v-click>
<v-click>

A focused agent doesn't just perform better — it's easier to test, debug, and trust.

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

BRIDGE: "That's what agent teams look like in practice. Now — what's actually hard about this?"
-->

---

# The Coordination Problem

<v-click>

**Going from one agent to many is not a scaling problem. It's a distributed systems problem.**

</v-click>
<v-click>

Who gets which context? How do you share state without conflicts? What happens when one agent's output breaks another's assumptions?

</v-click>
<v-click>

The patterns are familiar — task decomposition, work queues, failure handling. **But every component is nondeterministic.**

</v-click>
<v-click>

The hard part is no longer getting the agent to write code. **It's designing how agents work together.**

</v-click>

<!--
SOURCE: PirouneB, "Coordination is Quietly Becoming the Hardest Engineering Problem" (x.com/PirouneB/status/2022783395139318007)
SOURCE: Entire, "Hello Entire World" (entire.io/blog/hello-entire-world)

KEY POINTS:
- Conclude section 3b with the real hard problem: coordination under nondeterminism
- Name the three pressure points: context allocation, shared state, cascade control
- This is the setup for naming the discipline on the next slide

BRIDGE: This leads directly into the Harness Engineering statement — the discipline of designing these systems IS the new engineering.
-->

---
layout: statement
---

<h1>Harness Engineering</h1>

<SlideImage src="/verification-loop.png" alt="Verification loop diagram" size="xs" />

<v-click>

Context. Specs. Skills. MCP. Hooks. Tests. Specialized agents. Coordinated teams. **All one discipline — turning ambiguity into clarity, at scale.**

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

---
layout: statement
---

# That was the power. Now: what can go wrong?

<!--
DELIVERY:
- Post-demo tonal pivot — make the turn visible, not just verbal
- Let this slide sit for 2-3 seconds before advancing
- This is the "peak hype" moment the agenda slide foreshadowed
-->
