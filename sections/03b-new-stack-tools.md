---
layout: section
transition: section-shift
---

# The New Stack: Tools

Skills, MCP, and guardrails — reusable building blocks for agentic workflows

<!--
[T+53:00 | S3b slide 1 of 13 | 0.5min]
Transition from Section 3a: "You've seen the concepts — context engineering and spec-driven development. Now let's look at the specific tools that implement them."

Introduce the framing: "I'll use one concrete plugin as an example, but the point is the pattern. The same approach works with any toolchain."

"We'll use that example to demonstrate all three building blocks: skills, MCP, and hooks. These are portable concepts, not tied to one vendor."

Frame briefly: Skills (reusable capabilities), MCP (external connections), Guardrails (boundaries and safety — implemented through hooks).
This part stays practical and concrete — the demos carry the weight.
-->

---
layout: center
class: text-center
---

<img src="/kitchen-analogy-apis-skills-mcp.png" alt="Kitchen analogy showing APIs as tools, skills as recipes, and MCPs as the kitchen." class="mx-auto w-full max-w-6xl" />

<v-click>

Hooks are the guardrails around this kitchen.

</v-click>

---

# One Example: kramme-cc-workflow

<v-click>

Open-source example plugin: **45 skills**, **20 specialist agents**, **5 hooks**.

</v-click>
<v-click>

Implements PR lifecycle, code quality, structured implementation, and review automation as **readable markdown workflows**.

</v-click>
<v-click>

**The point is the pattern.** Any team can build this with markdown, shell scripts, and configuration.

</v-click>

<!--
[T+54:00 | S3b slide 2 of 13 | 1.5min]
This is the "meet the tool" slide. Everything in S3b and S3c will reference this plugin — introduce it properly here so the audience has a frame.

kramme-cc-workflow is a real, open-source Claude Code plugin I built and use daily. It packages workflow automation into three component types:
- Skills (45): markdown playbooks the agent follows — /commit, /pr-review, /siw-implement, /verify
- Agents (20): specialist reviewers — security, a11y, architecture, UX, performance, logic, silent-failure-hunter
- Hooks (5): shell scripts that fire on events — block destructive commands, auto-format, surface PR/issue links

It's on GitHub (Abildtoft/kramme-cc-workflow) and listed on the Resources slide at the end.

The key message: this is not a proprietary product. It's a pattern. The plugin is just markdown files, shell scripts, and a JSON manifest. Anyone in this room could build their own version for their own workflow.
-->

---

# Skills

<v-click>

**A skill is a markdown file with instructions the agent follows on demand.**

</v-click>
<v-click>

`/commit`, `/pr-review`, `/siw-implement`, `/verify` — invoke with a slash command, the agent reads the markdown and executes.

</v-click>
<v-click>

**"You're not writing code. You're writing recipes."**

</v-click>

<!--
[T+55:30 | S3b slide 3 of 13 | 2min]
Skills connect to Osmani's "break into focused chunks" principle — skills are pre-packaged focused chunks the agent can follow.
For the non-dev audience: think of a skill like a playbook. A PR review skill contains the checklist, the patterns to look for, the output format. The agent follows it step by step.
Walk through a few categories briefly: /commit (writes commit messages following project conventions), /pr-review (runs a multi-agent code review), /siw-implement (picks up a spec issue and implements it end-to-end), /verify (runs tests, linting, type checking for affected code).
Key insight: skills are composable, version-controlled, and human-readable. No black boxes. You can open the file, read the instructions, and understand exactly what the agent will do.
For product/UX: you could write a skill for design review, accessibility checks, or copy editing. The format is the same — markdown instructions.
-->

---

# Demo: Skills

**What to show:**

1. Open a skill file — show it's just markdown with instructions
2. Invoke the skill with `/skill-name` — show the agent reading and executing it
3. Show the output — the agent followed the recipe

<!--
[T+57:00 | S3b slide 4 of 13 | 2.5min DEMO]
DEMO SLIDE — do not present this text, use it as a guide.

Suggested skill to demo: /commit or /pr-review — both are relatable and show clear before/after.
Open the markdown file first. Let them see it's readable English, not code. "This is the entire skill. There's no binary, no API, no SDK. It's instructions."
Then invoke it. Show the agent reading the file and following the steps.
Time: ~2-3 minutes. Keep it tight. The point is: skills are simple, transparent, and powerful.
FALLBACK: If the live invocation fails, open the skill markdown file in your editor and walk through its instructions as a static example. The file IS the skill — showing it is enough to make the point.
Transition: "Skills give agents capabilities. But what if the agent needs to reach beyond the codebase — talk to Linear, query a database, control a browser?"
-->

---
layout: quote
---

# "The Venn Diagram of Developer Experience and Agent Experience is a circle"

Laura Tacho, via Martin Fowler

<!--
[T+58:15 | S3b slide 5 of 13 | 1.5min]
Source: Martin Fowler (martinfowler.com/fragments/2026-02-13.html)

This bridges from Skills to the next two tools — MCP and Hooks.
The point: the same tooling that makes developers productive makes agents productive. MCP is the plumbing that connects agents to your existing tools. Hooks are the guardrails that keep them safe.
For the mixed audience: everything you invest in developer experience — smooth tooling, clear APIs, good documentation — now pays double. Your human team AND your agents benefit.
Fowler also notes the sad irony: some organizations are investing in agent documentation that they never invested in for human developers. Same docs, different motivation.
-->

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

<!--
[T+59:00 | S3b slide 6 of 13 | 2min]
This is the conceptual bridge to guardrails.

LLMs are fundamentally stochastic: the same prompt can produce different results every time. This isn't a flaw — it's a feature of how the models work. But it means the "oneshot" mindset — get it right the first time — is the wrong optimization target.
The engineers getting the best results have shifted from "write the perfect prompt" to "build infrastructure for fast iteration." Generate, evaluate, refine, repeat. Each cycle takes seconds, not hours.
This is why guardrails matter so much. Tests, hooks, verification loops — they're not just safety nets. They're the infrastructure that makes rapid iteration efficient. You can let the agent try, fail, and retry because the guardrails catch mistakes automatically.
The shift: from "write it once, correctly" to "converge on correctness through fast feedback loops."
-->

---

# Guardrails

<v-click>

**Guardrails are the infrastructure that make iteration safe and fast.**

</v-click>
<v-click>

Without them, every iteration needs human review. With them, the agent can try → fail → retry autonomously.

</v-click>
<v-click>

Context shapes knowledge. Specs shape direction. **Guardrails shape boundaries** — and enable speed.

</v-click>

<!--
[T+59:30 | S3b slide 7 of 13 | 1.5min]
Connect directly to the previous slide: if LLMs are stochastic and we're designing for iteration, guardrails are what make that iteration loop viable. Without guardrails, every agent attempt needs a human looking over its shoulder. With guardrails, the agent can try, fail, learn from the failure signal, and retry — all autonomously.
The word "guardrails" is intuitive for the non-dev audience. Everyone understands highway guardrails — they don't steer the car, but they prevent the car from going off a cliff.
Key insight: guardrails are not about distrust. They're about design. You put guardrails on a highway not because drivers are bad, but because the system should be safe by default.
Connect forward: "Let me show you three guardrail mechanisms — starting with the one you already know: tests."
-->

---

# Tests as Guardrails

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
[T+61:00 | S3b slide 8 of 13 | 1.5min]
Tests are the guardrail mechanism every developer already uses. Frame this as familiar ground before introducing MCP and hooks.
The key reframe from the stochastic slide: tests aren't just quality assurance — they're the feedback signal that drives the iteration loop. A failing test isn't a problem. It's information the agent uses to self-correct.
Unit tests: the agent writes a function, runs the test, sees it fail, fixes it. This is the tightest feedback loop — seconds, not minutes. This is why stochastic output doesn't matter — the agent converges on correctness through rapid iteration.
Integration and e2e tests: the agent changes a component, the test suite catches a regression three layers away. Without these, the agent would ship broken code confidently.
Connect to Monarch's "validation/verification loops" philosophy: tests are the most established verification loop in software engineering. Hooks and MCP are newer mechanisms, but tests have been doing this for decades.
Transition: "Tests verify correctness. But what if the agent needs to reach beyond the codebase?"
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
[T+62:30 | S3b slide 9 of 13 | 2min]
Source: Entire announcement (entire.io/blog/hello-entire-world)
"Agents now interoperate in parallel, generating and evaluating hundreds of variants simultaneously." MCP is the protocol that enables this interoperability.

Analogy for the audience: MCP is like USB for AI. Before USB, every device had its own connector. MCP standardizes how agents talk to tools.
The kramme-cc-workflow plugin configures MCP servers for Linear and browser automation. When the agent needs to create an issue, it talks to the Linear MCP server. When it needs to check a deployed page, it uses the browser MCP server. No custom integration code — just a standard protocol.
For product/UX: MCP means agents can interact with your tools too — design systems, analytics dashboards, user feedback platforms. The protocol is tool-agnostic.
Key insight: MCP turns the agent from "a thing that writes code" into "a thing that participates in your workflow."
-->

---

# Hooks

<v-click>

**Hooks allow you to add context, validate actions, enforce policies, loop the agent to continue to iterate, and more.**

</v-click>
<v-click>

**PreToolUse** — validate actions and enforce policies before execution.

</v-click>
<v-click>

**PostToolUse** — add context and feedback after each edit.

</v-click>
<v-click>

**Stop** — loop the agent with the right next context to continue iterating.

</v-click>

<!--
[T+64:30 | S3b slide 10 of 13 | 2min]
Source: Monarch's Philosophy on AI in Dev (somehowmanage.com/2026/01/22/a-step-behind-the-bleeding-edge-monarchs-philosophy-on-ai-in-dev/)
"Carefully design validation/verification loops. Creating ways for AI to validate its own work allows it to run more autonomously with less input from you."

These are real hooks from a production workflow plugin — concrete examples of the pattern.

Walk through the three types:
- PreToolUse: blocks risky operations and commands that strand the agent in interactive editors.
- PostToolUse: auto-formats and runs lightweight quality checks after edits.
- Stop: surfaces relevant issue/PR links and next actions at handoff.

Key insight: hooks are how you build trust with autonomous agents. You don't watch every command — you design the system they operate in.

Source: Coordination is the hardest engineering problem (x.com/PirouneB/status/2022783395139318007)
"Someone has to handle failure cascading." Hooks are one mechanism for catching failures before they cascade.
-->

---
layout: statement
---

# You don't make agents trustworthy by watching them. You make them trustworthy by designing the system they operate in.

<!--
[T+66:30 | S3b slide 11 of 13 | 1min]
Source: Monarch's Philosophy — "design that system (you + AI), figuring out your role in it, since you will ultimately own the output."

This distills the entire section's thesis. Skills give agents capabilities. Tests give agents feedback. MCP gives agents reach. Hooks give agents constraints. Together, they form a system you can trust to operate autonomously.
For the audience: this is the same principle as any engineering system. You don't make a pipeline reliable by watching every step. You build in monitoring, circuit breakers, and rollback mechanisms. Hooks are the circuit breakers for agentic workflows.
Let this sit for a moment before moving to the demo.
Transition: "Let me show you MCP and Hooks working together."
-->

---

# Demo: MCP & Hooks

**What to show:**

1. MCP in action — agent queries Linear or automates browser
2. Hook catching a dangerous command — PreToolUse blocking `rm -rf`
3. Hook surfacing results — Stop hook showing PR link on completion

<!--
[T+67:30 | S3b slide 12 of 13 | 3.5min DEMO]
DEMO SLIDE — do not present this text, use it as a guide.

Part 1 — MCP (~1.5 min):
Show the agent interacting with an MCP server. Preferred: Linear integration (create or query an issue). Alternative: browser automation (navigate to a URL, take a screenshot).
The audience should see the agent seamlessly reaching beyond the codebase. No custom API code — just the protocol at work.

Part 2 — Hooks (~1.5-2 min):
Trigger a PreToolUse hook. Have the agent attempt something the hook catches (e.g., rm -rf or git push --force). Show the block message. This is the "wow" moment for the safety-conscious audience.
Then show a PostToolUse hook — save a file, watch auto-formatting happen automatically.

Part 3 — Stop hook (~30 sec):
If time permits, show the Stop hook surfacing a PR link when the agent finishes work. Otherwise, mention it verbally.

Total: ~3-4 minutes. Run this as one continuous demo flow to keep momentum.
FALLBACK: If MCP or hooks fail to trigger live, describe the scenario verbally while showing the hook configuration file (.claude/settings.json). The config itself shows the before/after/stop pattern. For MCP, show the .mcp.json file — the server definition is the proof that agents connect to external tools.
Transition to the discussion prompt.
-->

---
layout: center
class: text-center
---

# Which of these three — skills, MCP, or hooks — would fit into your current workflow with the least friction?

<!--
[T+68:00 | S3b slide 13 of 13 | 3min DISCUSSION]
DISCUSSION PROMPT — pause here for 2-4 minutes. This breaks the long stretch between S3a and S3c discussions.

This is a practical, low-stakes question. Everyone should be able to answer it.
Prompt follow-ups:
- "Show of hands — who already uses git hooks or CI checks? That's the same principle as agent hooks."
- "For product/UX: could you imagine writing a skill — a markdown playbook — for design review or copy editing?"
- "What external tools would you most want an agent to connect to via MCP?"
Listen for: practical ideas, existing workflows that map to these concepts, and comfort level with each tool.
Transition to Section 3c: "You've now seen three building blocks: skills for capabilities, MCP for integration, hooks for safety. Next: what happens when you compose them into larger systems — harnesses, verification loops, and multi-agent teams."
-->
