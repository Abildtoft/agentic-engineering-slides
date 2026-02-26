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

<img src="/kitchen-analogy-apis-skills-mcp.png" alt="Kitchen analogy showing APIs as tools, skills as recipes, and MCPs as the kitchen." class="mx-auto w-full max-w-6xl" />

<p class="mt-4 text-lg opacity-85">APIs are tools. Skills are recipes. MCP is the kitchen.</p>

<v-click>

<p class="mt-2 text-xl font-semibold">Hooks are the guardrails around this kitchen.</p>

</v-click>

---

# LLMs Are Stochastic

<v-click>

**Same prompt, different result every time.** This is not a bug — it's the nature of the tool.

</v-click>
<v-click>

We instinctively value "oneshotting" — getting it right the first time. But optimizing for first-attempt perfection fights the model's strengths.

</v-click>
<v-click>

**Design for iteration instead:** generate → evaluate → refine → repeat.

</v-click>
<v-click>

The engineers getting the most from AI stopped crafting the perfect prompt. They started building fast feedback loops.

</v-click>
<v-click>

> "That orchestration layer needs the same rigor as any distributed system — except the components are nondeterministic." — **Pirouette B**, software engineer

</v-click>
<v-click>

You don't make agents trustworthy by watching them. You make them trustworthy by **designing the system they operate in.**

</v-click>

<!--
KEY POINTS:
- Anchor the section with one design truth: outputs are nondeterministic
- Replace "perfect prompt" mindset with "reliable feedback loop" mindset
- Set up guardrails as an enabler of speed, not only safety

BRIDGE: "That's the design philosophy. Now: what makes iteration safe?"
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

Lets take the concepts first, then demo.

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

<img src="/guardrails-bowling.jpg" class="mx-auto h-52 mt-1 mb-2" />

<v-click>

Without guardrails, every iteration needs human review. With them, the agent can try → fail → retry autonomously.

</v-click>
<v-click>

Context shapes knowledge. Specs shape direction. **Guardrails shape boundaries** — and enable speed.

</v-click>
<v-click>

> "The Venn Diagram of Developer Experience and Agent Experience is a circle" — **Laura Tacho**, via Martin Fowler

</v-click>

<!--
KEY POINTS:
- Guardrails convert stochastic generation into controlled iteration
- Clarify boundary between autonomy and supervision
- Keep the metaphor simple: constraints increase safe operating speed

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

# AGENTS.md / CLAUDE.md

<v-click>

**A markdown file at the root of your repo that tells the agent how to work here.**

</v-click>
<v-click>

Project conventions, architecture decisions, build commands, test patterns — everything a new team member would need on day one.

</v-click>
<v-click>

The same file that helps agents helps new hires. **Invest once, benefit twice.**

</v-click>

<v-click>

... And you can have more, nested AGENTS.md files in your repository.

</v-click>

<!--
KEY POINTS:
- Position this as the default starting point for most teams
- Same artifact serves two audiences: new teammates and agents
- Local conventions reduce variance and failure loops

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

`/kramme:git:commit-message`, `/kramme:siw:continue`, `/kramme:verify:run`, `/kramme:code:refactor-pass` — invoke with a slash command, the agent reads the markdown and executes.

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

<!--
KEY POINTS:
- Define MCP as the interoperability layer, not another proprietary feature
- Keep the three capability types practical and memorable
- Emphasize workflow participation: agents can now act across systems

DELIVERY:
- For product/UX: MCP means agents can interact with your tools too — design systems, analytics dashboards, user feedback platforms

BRIDGE: "Let me show you what that looks like in code."
-->

---

# MCP: What a Server Looks Like

```ts
const server = new McpServer({
  name: "my-server",
  version: "1.0.0",
});

server.tool(
  "get_weather",
  "Fetches current weather for a city",
  { city: z.string() },
  async ({ city }) => {
    const data = await fetchWeather(city);
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  },
);
```

<v-click>

A name, a version, and tool definitions. **That's it.**

</v-click>

<!--
KEY POINTS:
- Demystify with minimal code anatomy
- Highlight self-describing interface design (name, schema, handler)
- Keep this brief; the point is accessibility of the pattern

BRIDGE: "Now let's make it concrete with real MCPs in daily use."
-->

---

# MCPs I Use Daily

- **Linear** — issue tracking and project management
- **Context7** — up-to-date library documentation
- **Nx MCP** — monorepo workspace tools
- **Chrome DevTools** / **Playwright** — browser automation and testing
- **Markitdown** — document-to-markdown conversion
- **Magic Patterns** — design-to-code integration
- **Granola** — meeting notes

<v-click>

Nine servers, zero custom integration code. Each one is a `npm install` away.

</v-click>

<!--
KEY POINTS:
- Real-world examples anchor MCP beyond theory
- Emphasize breadth: planning, docs, browser, design, knowledge capture
- Main takeaway: one protocol, many systems, no bespoke glue code per toolchain

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

<!--
KEY POINTS:
- Define an agent operationally, not mystically
- Specialization narrows scope, tools, and evaluation criteria
- Treat each specialized agent as a testable, versioned component

BRIDGE: "The concept is simple. Why does it actually work better than one general-purpose agent?"
-->

---

# Why Specialization Works

<v-click>

**An LLM's context window is finite.** The more concerns you load into it, the shallower its attention on each one.

</v-click>
<v-click>

One agent reviewing for security, accessibility, performance, and architecture at once will be mediocre at all four.

</v-click>
<v-click>

**Single-responsibility principle — but for agents.** One persona, one evaluation lens, one job.

</v-click>
<v-click>

A focused agent doesn't just perform better — it's easier to test, debug, and trust.

</v-click>

<!--
SOURCE: Entire, "Hello Entire World" (entire.io/blog/hello-entire-world)
SOURCE: Addy Osmani, "My LLM coding workflow going into 2026" (addyo.substack.com)

KEY POINTS:
- Attention in-context is finite; specialization preserves depth
- SRP maps cleanly from code modules to agent design
- Narrow agents are easier to evaluate, debug, and trust

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
