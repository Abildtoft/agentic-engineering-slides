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

<p class="mt-2 text-base opacity-75">An API is the menu — you place an order, the kitchen sends back your food. You don't need to know how the kitchen works.</p>

</v-click>

<v-click>

<p class="mt-2 text-xl font-semibold">Hooks are the guardrails around this kitchen.</p>

</v-click>

<!--
KEY ANALOGY — expand this for the audience:
- An API is a restaurant menu: you (the client) place an order (request), the kitchen (server) sends back your food (response). You don't need to know how the kitchen works — just what's on the menu.
- APIs = tools on the counter — each one does one thing (whisk, knife, thermometer)
- Skills = recipes the chef follows — soft guidance, adaptable to the situation
- MCP = the kitchen itself — standardised layout, appliances, plumbing that connects everything
- Hooks = safety rails — the fire suppressor, the temperature probe, the timer that beeps

"You're not building the kitchen from scratch. You're equipping it and writing the recipes."
-->

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

<p class="text-base opacity-75"><strong>Soft guidance</strong> — the LLM interprets markdown instructions. It can adapt, reorder, or reason about them.</p>

</v-click>

<!--
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

# One Approach: kramme-cc-workflow

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

**Tests close the iteration loop.** Agent writes code → tests run → failure signals what to fix → agent retries. Unit tests give seconds between attempt and feedback. Integration and e2e tests catch regressions across files.

</v-click>
<v-click>

Tests are executable specifications. They don't just catch bugs — they tell the agent what "done" looks like.

</v-click>

<!--
KEY POINTS:
- Reframe tests as runtime contracts for agent behavior
- Unit tests optimize iteration speed; broader tests protect system behavior
- "Executable definition of done" is the key phrase

BRIDGE: "Tests close the loop locally. Hooks enforce policy across the workflow lifecycle."
-->


---

# Hooks

<v-click>

**Shell scripts that fire at lifecycle points** — for example before a tool runs, after a tool runs, or when the agent stops.

</v-click>
<v-click>

**Examples:** Block destructive commands (`PreToolUse`), auto-format edits (`PostToolUse`), enforce commit standards (`Stop`).

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
