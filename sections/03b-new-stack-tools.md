---
layout: section
transition: section-shift
---

# The New Stack: Tools

Skills, MCP, and guardrails — the building blocks of agentic workflows

<!--
[T+53:00 | S3b slide 1 of 10 | 0.5min]
Transition from Section 3a: "You've seen the concepts — context engineering and spec-driven development. Now let's look at the specific tools that implement them. Three building blocks, each demonstrated with a real plugin I use daily."
Frame briefly: Skills (reusable capabilities), MCP (external connections), Guardrails (boundaries and safety — implemented through hooks).
This part stays practical and concrete — the demos carry the weight.
-->

---

# Skills

<v-click>

**A skill is a markdown file with instructions the agent follows on demand.**

</v-click>
<v-click>

kramme-cc-workflow ships 48 skills — PR lifecycle, code quality, git ops, structured workflows. (Think of each as a playbook the agent follows.)

</v-click>
<v-click>

Invoke with `/skill-name`. The agent reads the markdown and executes the instructions.

</v-click>
<v-click>

**"You're not writing code. You're writing recipes."**

</v-click>

<!--
[T+54:30 | S3b slide 2 of 10 | 2min]
Skills connect to Osmani's "break into focused chunks" principle — skills are pre-packaged focused chunks the agent can follow.
For the non-dev audience: think of a skill like a playbook. A PR review skill contains the checklist, the patterns to look for, the output format. The agent follows it step by step.
The 48 number is real — walk through categories briefly: /pr-review, /commit, /security-scan, /plan. Each is a markdown file anyone can read, modify, or create.
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
[T+57:00 | S3b slide 3 of 10 | 3min DEMO]
DEMO SLIDE — do not present this text, use it as a guide.

Suggested skill to demo: /commit or /pr-review — both are relatable and show clear before/after.
Open the markdown file first. Let them see it's readable English, not code. "This is the entire skill. There's no binary, no API, no SDK. It's instructions."
Then invoke it. Show the agent reading the file and following the steps.
Time: ~3 minutes. Keep it tight. The point is: skills are simple, transparent, and powerful.
FALLBACK: If the live invocation fails, open the skill markdown file in your editor and walk through its instructions as a static example. The file IS the skill — showing it is enough to make the point.
Transition: "Skills give agents capabilities. But what if the agent needs to reach beyond the codebase — talk to Linear, query a database, control a browser?"
-->

---
layout: quote
---

# "The Venn Diagram of Developer Experience and Agent Experience is a circle"

Laura Tacho, via Martin Fowler

<!--
[T+58:15 | S3b slide 4 of 10 | 1.5min]
Source: Martin Fowler (martinfowler.com/fragments/2026-02-13.html)

This bridges from Skills to the next two tools — MCP and Hooks.
The point: the same tooling that makes developers productive makes agents productive. MCP is the plumbing that connects agents to your existing tools. Hooks are the guardrails that keep them safe.
For the mixed audience: everything you invest in developer experience — smooth tooling, clear APIs, good documentation — now pays double. Your human team AND your agents benefit.
Fowler also notes the sad irony: some organizations are investing in agent documentation that they never invested in for human developers. Same docs, different motivation.
-->

---

# Guardrails

<v-click>

**Shaping what the agent *can't* do is as important as shaping what it can.**

</v-click>
<v-click>

Context engineering shapes knowledge. Specs shape direction. Guardrails shape boundaries.

</v-click>
<v-click>

Hooks, verification loops, safety rules, CLAUDE.md constraints — all guardrails. Different mechanisms, same principle.

</v-click>

<!--
[T+59:30 | S3b slide 5 of 10 | 1.5min]
This names the concept explicitly. The audience has seen context engineering (what the agent knows) and spec-driven development (what the agent does). Guardrails complete the triad: what the agent can't do.
The word "guardrails" is intuitive for the non-dev audience. Everyone understands highway guardrails — they don't steer the car, but they prevent the car from going off a cliff.
Key insight: guardrails are not about distrust. They're about design. You put guardrails on a highway not because drivers are bad, but because the system should be safe by default.
Connect forward: "The next three slides show you the primary mechanism for guardrails: hooks."
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
[T+61:00 | S3b slide 6 of 10 | 2min]
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

**Before the agent acts** — Intercept and validate. Block dangerous commands, enforce safety rules.

</v-click>
<v-click>

**After the agent acts** — React automatically. Auto-format saved files, run linters, update indexes.

</v-click>
<v-click>

**When work completes** — Surface results. Show PR links, notify stakeholders, run final checks.

</v-click>

<!--
[T+63:00 | S3b slide 7 of 10 | 2min]
Source: Monarch's Philosophy on AI in Dev (somehowmanage.com/2026/01/22/a-step-behind-the-bleeding-edge-monarchs-philosophy-on-ai-in-dev/)
"Carefully design validation/verification loops. Creating ways for AI to validate its own work allows it to run more autonomously with less input from you."

Hooks are the verification loops Monarch describes. They're the engineering discipline that makes autonomy safe.
Walk through the three types with real examples from the plugin:
- PreToolUse: the agent tries to run rm -rf / — the hook catches it, blocks it, logs a warning. The agent never executes the command. Same for git push --force to main.
- PostToolUse: the agent saves a TypeScript file — the hook runs Prettier automatically. No manual formatting step.
- Stop: the agent finishes implementing an issue — the hook surfaces the PR URL and any related Linear issues so you can review immediately.
Key insight for the audience: hooks are how you build trust with autonomous agents. You don't need to watch every command — you set the guardrails and let the agent work within them.

Source: Coordination is the hardest engineering problem (x.com/PirouneB/status/2022783395139318007)
"Someone has to handle failure cascading." Hooks are one mechanism for catching failures before they cascade.
-->

---
layout: statement
---

# You don't make agents trustworthy by watching them. You make them trustworthy by designing the system they operate in.

<!--
[T+65:00 | S3b slide 8 of 10 | 1min]
Source: Monarch's Philosophy — "design that system (you + AI), figuring out your role in it, since you will ultimately own the output."

This distills the entire section's thesis. Skills give agents capabilities. MCP gives agents reach. Hooks give agents constraints. Together, they form a system you can trust to operate autonomously.
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
[T+66:00 | S3b slide 9 of 10 | 4.5min DEMO]
DEMO SLIDE — do not present this text, use it as a guide.

Part 1 — MCP (~2 min):
Show the agent interacting with an MCP server. Preferred: Linear integration (create or query an issue). Alternative: browser automation (navigate to a URL, take a screenshot).
The audience should see the agent seamlessly reaching beyond the codebase. No custom API code — just the protocol at work.

Part 2 — Hooks (~2-3 min):
Trigger a PreToolUse hook. Have the agent attempt something the hook catches (e.g., rm -rf or git push --force). Show the block message. This is the "wow" moment for the safety-conscious audience.
Then show a PostToolUse hook — save a file, watch auto-formatting happen automatically.

Part 3 — Stop hook (~1 min):
If time permits, show the Stop hook surfacing a PR link when the agent finishes work. Otherwise, mention it verbally.

Total: ~4-5 minutes. The key moment is the hook catching the dangerous command.
FALLBACK: If MCP or hooks fail to trigger live, describe the scenario verbally while showing the hook configuration file (.claude/settings.json). The config itself shows the before/after/stop pattern. For MCP, show the .mcp.json file — the server definition is the proof that agents connect to external tools.
Transition to the discussion prompt.
-->

---
layout: center
class: text-center
---

# Which of these three — skills, MCP, or hooks — would fit into your current workflow with the least friction?

<!--
[T+66:30 | S3b slide 10 of 10 | 4min DISCUSSION]
DISCUSSION PROMPT — pause here for 3-5 minutes. This breaks the long stretch between S3a and S3c discussions.

This is a practical, low-stakes question. Everyone should be able to answer it.
Prompt follow-ups:
- "Show of hands — who already uses git hooks or CI checks? That's the same principle as agent hooks."
- "For product/UX: could you imagine writing a skill — a markdown playbook — for design review or copy editing?"
- "What external tools would you most want an agent to connect to via MCP?"
Listen for: practical ideas, existing workflows that map to these concepts, and comfort level with each tool.
Transition to Section 3c: "You've now seen three building blocks: skills for capabilities, MCP for integration, hooks for safety. Next: what happens when you compose them into larger systems — harnesses, verification loops, and multi-agent teams."
-->
