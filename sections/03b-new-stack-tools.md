---
layout: section
transition: section-shift
---

# The New Stack: Tools

Skills, MCP, etc.— reusable building blocks for agentic workflows

<!--
[T+53:00 | S3b slide 1 of 14 | 0.5min]

KEY POINTS:
- Framing: "I'll use one concrete plugin as an example, but the point is the pattern. The same approach works with any toolchain."
- "But before the tools themselves, I want to name something about the medium we're working in. It changes how we design."
- Structure: design philosophy (LLMs are stochastic), then three building blocks — Skills, MCP, Guardrails (hooks and tests)
- This part stays practical and concrete — the demos carry the weight

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
[T+55:30 | S3b slide 4 of 14 | 2min]

KEY POINTS:
- This is the design philosophy that explains why the building blocks exist
- LLMs are fundamentally stochastic — same prompt, different results every time
- This isn't a flaw — it's a feature of how models work
- The "oneshot" mindset (get it right first time) is the wrong optimization target
- Best engineers shifted from "write the perfect prompt" to "build infrastructure for fast iteration"
- Generate, evaluate, refine, repeat — each cycle takes seconds, not hours
- Tests, hooks, verification loops are not just safety nets — they're the infrastructure that makes rapid iteration efficient
- You can let the agent try, fail, and retry because guardrails catch mistakes automatically
- The shift: from "write it once, correctly" to "converge on correctness through fast feedback loops"

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
- kramme-cc-workflow: a Claude Code plugin I built and use daily
- Three component types: Skills (45), Agents (20), Hooks (5)
- Inspired by open-source tools: Superpowers, GET SHIT DONE, Compound Engineering
- Tailored to my use — you build or adapt one that reflects how you work
- On GitHub (Abildtoft/kramme-cc-workflow) — just markdown files, shell scripts, and a JSON manifest
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
[T+56:15 | S3b slide 5 of 14 | 1.5min]

KEY POINTS:
- Connects to previous slide: if LLMs are stochastic and we design for iteration, guardrails make that loop viable
- Without guardrails, every agent attempt needs a human looking over its shoulder
- With guardrails, the agent can try, fail, learn from the failure signal, and retry — all autonomously
- Analogy: highway guardrails don't steer the car, but prevent it from going off a cliff
- Guardrails are not about distrust — they're about design
- You put guardrails on a highway not because drivers are bad, but because the system should be safe by default

BRIDGE: "That's the philosophy. Now let me show you the building blocks — starting with skills."
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
- TDD is more relevant than ever — not despite AI, but because of it
- When you write the test first, you hand the agent an unambiguous definition of "done"
- Tests are the guardrail mechanism every developer already uses — frame as familiar ground
- Key reframe: tests aren't just quality assurance — they're the feedback signal driving the iteration loop
- Unit tests: tightest feedback loop (seconds, not minutes) — agent writes, tests fail, agent fixes
- Integration/e2e tests: catches regressions three layers away that the agent can't see from a single file

BRIDGE: "Tests verify correctness. But what if the agent needs to reach beyond the codebase?"
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
- AGENTS.md / CLAUDE.md is the simplest, highest-leverage agentic tool — a single markdown file
- It's the "onboarding doc" for both humans and agents
- Contains: project structure, stack, conventions, build/test commands, key patterns
- Claude Code reads it automatically at session start — no configuration needed
- If your repo doesn't have one, the agent starts from zero context every time
- This is where context engineering begins — before skills, before MCP, before hooks
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
[T+57:30 | S3b slide 6 of 14 | 2min]

KEY POINTS:
- Skills connect to Osmani's "break into focused chunks" principle — pre-packaged focused chunks the agent can follow
- Two invocation modes:
  - User-invocable: human types /kramme:git:commit-message, agent reads the skill markdown and follows the instructions. Human decides when to use it.
  - Model-invocable: the skill's description is visible to the agent, and the agent can decide to invoke it on its own when the situation matches. Example: a code-review skill that the agent triggers automatically when it finishes writing code.
- The distinction matters: user-invocable = human-initiated recipes. Model-invocable = agent-initiated behaviors. Together they define when the agent acts on instruction vs. when it acts on judgment.
- For non-dev audience: think of a skill like a playbook (checklist, patterns, output format)
- Example skills from kramme-cc-workflow:
  - /kramme:git:commit-message — writes commit messages with issue references and project conventions
  - /kramme:siw:continue — picks up a spec issue from the structured implementation workflow and implements it end-to-end
  - /kramme:verify:run — runs tests, formatting, builds, linting, type checking for affected code
  - /kramme:code:refactor-pass — performs a simplicity-focused refactor pass after recent changes
  - Other skills: /kramme:verify:before-completion (verification gate before claiming done), /kramme:text:humanize (removes AI writing patterns), /kramme:docs:to-markdown (document conversion), /kramme:docs:update-agents-md (maintains agent docs)
- Skills are composable, version-controlled, and human-readable — no black boxes
- You can open the file, read the instructions, and understand exactly what the agent will do

DELIVERY:
- For product/UX: you could write a skill for design review, accessibility checks, or copy editing — same format, markdown instructions

BRIDGE: "Let me show you a skill in action."
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
- Analogy: MCP is like USB for AI — before USB, every device had its own connector; MCP standardizes how agents talk to tools
- Three capability types map to familiar concepts: Tools ≈ API endpoints, Resources ≈ GET requests, Prompts ≈ templates
- Real examples: Linear (project management), browser automation, database queries, Slack integration
- kramme-cc-workflow configures MCP servers for Linear and browser automation
- MCP turns the agent from "a thing that writes code" into "a thing that participates in your workflow"

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
- This is a real, working MCP server — TypeScript with @modelcontextprotocol/sdk
- Emphasize simplicity: a name, a version, and tool definitions — no framework magic
- The tool definition is self-describing: name, description, input schema, handler
- The agent reads the tool name + description + schema and decides when/how to call it
- You can add resources (read-only data) and prompts (reusable templates) the same way
- This is why MCP adoption is exploding — the barrier to entry is trivially low

BRIDGE: "MCP connects agents to tools. Now: how do you enforce boundaries?"
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
- These are real MCP servers configured in kramme-cc-workflow — not hypothetical
- Linear: agent creates issues, reads sprint boards, links PRs to issues — all through MCP
- Context7: agent fetches current docs for any library instead of relying on training data
- Markitdown: agent converts PDFs, Word docs, PowerPoints into markdown for processing
- Chrome DevTools / Playwright: agent can navigate pages, take screenshots, run browser tests
- Magic Patterns: design tool integration — agent can pull design specs into code
- Granola: agent queries meeting notes to inform implementation decisions
- The point: MCP turns the agent from "a thing that writes code" into "a thing that participates in your workflow"

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
[T+64:30 | S3b slide 11 of 14 | 2min]

SOURCE: Monarch's Philosophy on AI in Dev (somehowmanage.com/2026/01/22/a-step-behind-the-bleeding-edge-monarchs-philosophy-on-ai-in-dev/)
SOURCE: Coordination is the hardest engineering problem (x.com/PirouneB/status/2022783395139318007)

KEY POINTS:
- Monarch: "Carefully design validation/verification loops. Creating ways for AI to validate its own work allows it to run more autonomously with less input from you."
- PirouneB: "Someone has to handle failure cascading." Hooks are one mechanism for catching failures before they cascade.
- These are real hooks from a production workflow plugin — concrete examples
- Distinction: hook type = when it runs; hook behavior = what it does
- One example per type:
  - PreToolUse: blocks risky operations and commands that strand the agent in interactive editors
  - PostToolUse: auto-formats and runs lightweight quality checks after edits
  - Stop: surfaces relevant issue/PR links and next actions at handoff
- Hooks are how you build trust with autonomous agents — you don't watch every command, you design the system they operate in

BRIDGE: "Let me distill this into one principle."
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
[T+73:00 | S3b slide 12 | 2min]

KEY POINTS:
- Define "agent" concretely: an LLM in a loop with tools. Not magic — a while loop with an API call and tool dispatch.
- The agentic loop: model reads context, decides what to do, calls a tool, observes the result, decides again. Repeats until it's done or you stop it.
- A specialized agent constrains this loop: narrower system prompt, fewer tools, one evaluation lens
- Implementation is trivial: a markdown file with instructions. The agent reads it on session start — exactly like AGENTS.md but scoped to a single concern.
- Example: a security review agent gets the diff, the OWASP top 10 as context, and permission to read files. Nothing else.
- 20 of these running in parallel on a single PR = 20 focused reviews in under 2 minutes

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
[T+75:00 | S3b slide 13 | 2min]

SOURCE: Entire, "Hello Entire World" (entire.io/blog/hello-entire-world)
SOURCE: Addy Osmani, "My LLM coding workflow going into 2026" (addyo.substack.com)

KEY POINTS:
- Core insight: context windows are zero-sum. Every additional concern dilutes attention on the others.
- Osmani: "LLMs do best when given focused prompts: implement one function, fix one bug, add one feature at a time."
- Same principle applies to review — a security-only agent doesn't waste tokens parsing accessibility rules
- Analogy to human teams: you don't ask the DBA to also do UX research. Depth beats breadth when quality matters.
- SRP is a concept the audience already knows — reframe it as applying to agents, not just code modules
- A specialized agent is also easier to evaluate: you can write narrow tests for "did it catch the SQL injection?" vs. "did it do a good review?"
- Each agent is just a markdown file — persona, constraints, evaluation criteria. Low cost to create, easy to iterate.
- The specialization pattern compounds: 20 narrow agents each running in seconds produces a richer review than one generalist spending 30 minutes

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
[T+76:00 | S3b slide 14 | 2min]

KEY POINTS:
- Agent teams are the composition layer: multiple specialized agents coordinated by a lead
- Lead agent: receives the high-level task, decomposes into subtasks, assigns to workers, reviews results
- Workers: each gets a focused task, a constrained toolset, and isolation (worktree or branch)
- Coordination primitives: shared task list (create, claim, update, complete), direct messages between agents, dependency tracking (blockedBy/blocks)
- The pattern mirrors human engineering teams: tech lead breaks down a feature, assigns stories, reviews PRs, merges to main
- Workers can run in parallel on independent tasks — real parallelism, not just concurrency
- Each worker has its own context window — no shared memory, communication through explicit messages and task state

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
[T+76:30 | S3b slide 14 | 2min]

SOURCE: PirouneB, "Coordination is Quietly Becoming the Hardest Engineering Problem" (x.com/PirouneB/status/2022783395139318007)
SOURCE: Entire, "Hello Entire World" (entire.io/blog/hello-entire-world)

KEY POINTS:
- Multi-agent teams are the highest level of composition in this toolkit section
- The shift: one-agent workflows hit a ceiling. Real projects need parallel work on frontend, backend, tests, docs — simultaneously.
- Lead agent decomposes work into tasks, spawns workers, coordinates results — exactly like a tech lead managing a sprint
- Three hard sub-problems:
  1. Context allocation — each agent's window is finite, who gets what information?
  2. Shared state — agents editing the same codebase risk conflicts, need merge strategies
  3. Failure cascading — one agent's bad output becomes another's bad input; error propagation is nonlinear
- Callback to PirouneB quote from the stochastic slide: "That orchestration layer needs the same rigor as any distributed system — except the components are nondeterministic."
- The closing line reframes the entire section: the bottleneck moved from "can the agent code?" to "can you design the system where agents collaborate?"

BRIDGE: This leads directly into the Harness Engineering statement — the discipline of designing these systems IS the new engineering.
-->
