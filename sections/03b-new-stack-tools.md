---
layout: section
transition: section-shift
---

# The New Stack: Tools

Skills, MCP, and guardrails — reusable building blocks for agentic workflows

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

> "That orchestration layer needs the same rigor as any distributed system — except the components are nondeterministic." — **Pirouette B**

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

# One Example: kramme-cc-workflow

<v-click>

My personal set of **recipes and guardrails** — tailored to how I work.

</v-click>
<v-click>

**45 skills**, **20 specialist agents**, **5 hooks** — encoding commit hygiene, PR review, structured implementation, and code quality standards.

</v-click>
<v-click>

Inspired by open-source tools like **Superpowers**, **GET SHIT DONE**, and **Compound Engineering** — but shaped to my workflow.

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

`/commit-message`, `/siw:continue`, `/verify:run`, `/refactor-pass` — invoke with a slash command, the agent reads the markdown and executes.

</v-click>
<v-click>

**"You're not writing code. You're writing recipes."**

</v-click>

<!--
[T+57:30 | S3b slide 6 of 14 | 2min]

KEY POINTS:
- Skills connect to Osmani's "break into focused chunks" principle — pre-packaged focused chunks the agent can follow
- For non-dev audience: think of a skill like a playbook (checklist, patterns, output format)
- Example skills from kramme-cc-workflow:
  - /commit-message — writes commit messages with issue references and project conventions
  - /siw:continue — picks up a spec issue from the structured implementation workflow and implements it end-to-end
  - /verify:run — runs tests, formatting, builds, linting, type checking for affected code
  - /refactor-pass — performs a simplicity-focused refactor pass after recent changes
  - Other skills: /before-completion (verification gate before claiming done), /humanize (removes AI writing patterns), /to-markdown (document conversion), /update-agents-md (maintains agent docs)
- Skills are composable, version-controlled, and human-readable — no black boxes
- You can open the file, read the instructions, and understand exactly what the agent will do

DELIVERY:
- For product/UX: you could write a skill for design review, accessibility checks, or copy editing — same format, markdown instructions

BRIDGE: "Let me show you a skill in action."
-->

---

# MCP (Model Context Protocol)

<v-click>

**A standard way for agents to connect to external tools, databases, and APIs.**

</v-click>
<v-click>

Think of it as USB for AI — a standard way for agents to connect to any tool.

</v-click>
<v-click>

Real examples: Linear (project management), browser automation, database queries, Slack integration.

</v-click>

<!--
[T+62:30 | S3b slide 10 of 14 | 2min]

SOURCE: Entire announcement (entire.io/blog/hello-entire-world)

KEY POINTS:
- Entire: "Agents now interoperate in parallel, generating and evaluating hundreds of variants simultaneously." MCP enables this interoperability.
- Analogy: MCP is like USB for AI — before USB, every device had its own connector; MCP standardizes how agents talk to tools
- kramme-cc-workflow configures MCP servers for Linear and browser automation
- Agent creates issues via Linear MCP server, checks deployed pages via browser MCP server — no custom integration code
- MCP turns the agent from "a thing that writes code" into "a thing that participates in your workflow"

DELIVERY:
- For product/UX: MCP means agents can interact with your tools too — design systems, analytics dashboards, user feedback platforms
- The protocol is tool-agnostic

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

**20 review agents** — code quality, security, architecture, UX, accessibility, performance. Each is a markdown file with a focused persona.

</v-click>
<v-click>

One PR, twenty perspectives. Each agent knows only its domain and reviews only through that lens.

</v-click>
<v-click>

**The reviewer is no longer a bottleneck. It's a fleet.**

</v-click>

<!--
[T+75:00 | S3b slide 13 | 2min]

SOURCE: Entire, "Hello Entire World" (entire.io/blog/hello-entire-world)

KEY POINTS:
- Each review agent is a markdown file — exactly like skills, but with a persona
- Security agent only looks for vulnerabilities; a11y agent only checks accessibility; architecture agent only evaluates structural decisions
- A PR that takes one human reviewer 30 minutes gets 20 specialized reviews in 2 minutes
- Same principle as microservices — decompose into focused, single-responsibility units

BRIDGE: "Individual agents reviewing in sequence. What if they work as a team, in parallel?"
-->

---

# Multi-Agent Teams

<v-click>

**Parallel execution** — multiple agents working on different parts of the same problem simultaneously.

</v-click>
<v-click>

Orchestration layer handles shared state, failure cascading, and context allocation. Same rigor as any distributed system.

</v-click>
<v-click>

**Not locked to one tool** — converter CLI transpiles workflows to OpenCode and Codex formats. The harness is portable.

</v-click>

<!--
[T+76:30 | S3b slide 14 | 2min]

SOURCE: PirouneB, "Coordination is Quietly Becoming the Hardest Engineering Problem" (x.com/PirouneB)
SOURCE: Entire, "Hello Entire World" (entire.io/blog/hello-entire-world)

KEY POINTS:
- Multi-agent teams are the highest level of composition
- Lead agent breaks work into tasks, spawns worker agents, coordinates results
- Cross-platform: workflow defined in markdown and YAML, converter CLI transpiles to OpenCode and Codex format
- Not locked into Claude Code — harness, agents, and skills are portable
- This is where real power lives — and where coordination complexity explodes
-->

