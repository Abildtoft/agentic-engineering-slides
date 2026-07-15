---
layout: section
transition: section-shift
---

# The New Stack: Tools

Skills, MCP, hooks — reusable building blocks for agentic workflows

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

# Markdown Is the Program Now

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
SOURCE: Garry Tan, "Markdown is the program now" (x.com/garrytan/status/2061454423034110372)

KEY POINTS:
- The left shows raw markdown — plain text anyone can write
- The right shows what it looks like rendered — structured, scannable, clear
- The agent parses the same structure: headings become sections, lists become constraints, bold becomes emphasis
- This is WHY the agentic ecosystem converged on markdown — it sits at the intersection of human readability and machine parsability
- Connect forward: every tool in section 03b (skills, agents, AGENTS.md) uses markdown as its medium
- Tan's phrase is the sharper version: markdown is no longer just documentation; for agents, it becomes executable operating context

DELIVERY:
- Keep this brief — 60-90 seconds maximum
- Point at the left: "This is what you type." Point at the right: "This is what the agent sees — the same thing you see."
- If the room is already familiar with AGENTS.md and skills, move through quickly
- If the room is unfamiliar, pause on the example: "Headers, bullet points, bold text. That's it. That's markdown."
- For designers: "Think of it like structured notes — except those notes become instructions an agent follows."

BRIDGE: "You just saw an AGENTS.md on the left. Let's zoom in on what that file actually does."
-->

---

# AGENTS.md — Your Agent's Onboarding Doc

<v-click>

`AGENTS.md` at the repo root — project conventions, patterns, constraints, workflow rules. **Read by the agent on every session start.**

</v-click>
<v-click>

Nest it: put an `AGENTS.md` in any directory. The agent inherits root conventions and adds local ones.

</v-click>
<v-click>

Start with one file at root. Add directory-level files only when you see repeated mistakes.

</v-click>

<!--
SOURCE: Pragmatic Engineer, "Building Claude Code with Boris Cherny" (newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny)

KEY POINTS:
- AGENTS.md is the highest-leverage first step for most teams adopting agentic tools
- Claude Code uses CLAUDE.md — same concept, vendor-specific naming
- Inheritance model: root file = project-wide rules, subdirectory files = domain-specific constraints
- Real example: this presentation was built with an AGENTS.md specifying Slidev conventions, Yarn 4, multi-file structure
- Think of it as onboarding documentation where the reader is an AI — the same clarity you'd give a new team member

DELIVERY:
- If the room is technical, walk through the nesting model briefly
- If non-technical, focus on the analogy: "It's the same onboarding doc you'd write for a new hire, except the new hire is an agent"

BRIDGE: "Now let's look at the first tool built on this same medium."
-->

---
layout: default
---

# Skills

<v-click>

A skill is a **reusable playbook**: a folder with instructions for one kind of task. Write the workflow once, run it whenever that task shows up.

</v-click>
<v-click>

The agent keeps only a short description in memory and loads the full playbook on demand — less prompt repetition, cleaner context.

</v-click>
<v-click>

**The bundle:** markdown instructions, minimal deterministic code, tests for the code, evals for the behavior, and resolver logic so the agent knows when to use it.

</v-click>
<v-click>

**Vibe coding evaporates. Skill packs compound.**

</v-click>

<!--
SOURCE: Garry Tan, "Markdown is the program now" (x.com/garrytan/status/2061454423034110372)

KEY POINTS:
- Use "playbook" language for non-developer audiences
- Core mechanism: lightweight discovery first, full instructions loaded only when relevant
- Benefit: keeps the context window focused and reduces repeated prompting
- Portability: one encoded workflow can be reused across CLI, web UI, and API surfaces
- Ecosystem signal: Anthropic's open-source Claude Skills repo shows this pattern at scale, including a "skill creator" meta-skill
- Tan's distinction: prompting is ephemeral; skill packs are versioned, reusable, and testable
- "Skillify it" loop: do the task once, then turn the working workflow into a reusable unit of capability
- The resolver matters because it makes the skill discoverable by the agent, not just manually reusable by the human
- If asked "is this just prompt engineering?": yes, but versioned, reusable, and discoverable

DELIVERY:
- Keep this practical, not mystical: "A skill becomes infrastructure only when it has tests and evals."
- Optional verbal: "The source phrase is useful: markdown is the program now. Not because code disappears, but because more behavior lives in editable instructions."

BRIDGE: "Once you have a skill pack, the next question is how the agent selects it."
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
KEY POINTS:
- Two invocation models: user-invocable (slash command) vs model-invocable (auto-discovered from prompt)
- User-invocable: user explicitly triggers with /command — deterministic selection
- Model-invocable: agent reads skill descriptions, matches to current prompt, loads autonomously
- Both paths end the same way: skill .md is read, LLM interprets instructions, generates output
- Dotted arrows = available but not loaded for this invocation
- Key contrast: "soft guidance" — the LLM can deviate, adapt, reason about the instructions
- This is the conceptual counterpart to MCP on the next slide
- Concrete examples: /commit-message (user-invocable), code-reviewer (model-invocable)
- For product/UX: same format works for design review, accessibility checks, or copy editing

BRIDGE: "Skills shape thinking. Before the next building block, here's an analogy to hold all of this together."
-->

---
layout: center
class: text-center
---

<SlideImage src="/kitchen-analogy-apis-skills-mcp.png" alt="The kitchen analogy: APIs are the utensils, skills are the recipes, MCPs are the kitchen" size="lg" />

<!--
KEY POINTS:
- Orientation beat for non-technical audiences before the MCP deep-dive
- APIs are the utensils — each does one thing
- Skills are the recipes — soft guidance, adaptable to the situation
- MCP is the kitchen itself — standardised layout and plumbing, bundling APIs, auth, and tool definitions into one server

DELIVERY:
- Keep it light and quick — 30-45 seconds
- Verbal: "You're not building the kitchen from scratch. You're equipping it and writing the recipes."

BRIDGE: "Skills are the recipes. Now let's look at the kitchen — MCP."
-->

---
layout: default
---

# MCPs

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

BRIDGE: "Now let's look at one concrete MCP example where design and implementation share the same source of truth."
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

<p class="text-base opacity-75"><strong>One server, three capability types</strong> — Tools, Resources, Prompts.</p>

</v-click>
<v-click>

<p class="text-base opacity-75"><strong>Hard contracts</strong> — inputs and outputs are schema-validated. No interpretation, no ambiguity at the interface.</p>

</v-click>

<!--
KEY POINTS:
- User task -> Agent selects a tool from the MCP server
- One server exposes three capability types: Tools, Resources, Prompts
- Skills are soft guidance in markdown; MCP is a hard interface contract
- Linear is just the example; the pattern generalizes to any system

BRIDGE: "Now swap issue tracking for design tooling and the same pattern becomes much more interesting."
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
- "Source of truth" is the key phrase — this reframes the bridge as design governance, not convenience. For designers: your Figma file is already structured data; MCP makes that data legible to the agent.

BRIDGE: "Once you have context and interfaces, the next question is reliability. Let's look at how deterministic checks keep the loop honest — starting with hooks."
-->

---
layout: default
---

# Hooks

<v-click>

Shell scripts that fire at **lifecycle points** in the agent loop — before a tool runs, after it runs, or when the agent stops.

</v-click>
<v-click>

**PreToolUse** — block destructive commands before they execute (e.g., prevent `rm -rf`, force confirmation on `git push --force`)

</v-click>
<v-click>

**PostToolUse** — auto-format code, run linters, enforce standards after every file write

</v-click>
<v-click>

**Stop** — final gate: reject output that fails validation, trigger a retry

</v-click>
<v-click>

Same idea as CI/CD pipelines or Git hooks — but running **inside the agent loop**, not after it.

</v-click>

<!--
KEY POINTS:
- Hooks are the least familiar guardrail for most audiences — give them a concrete mental model
- The lifecycle framing (pre/post/stop) maps to familiar patterns: middleware, Git hooks, CI gates
- For designers: think of hooks as automated design-review checkpoints — accessibility checks, component validation
- The key insight: hooks run inside the loop, so the agent can self-correct without human intervention

BRIDGE: "Hooks are one type of guardrail. Let's zoom out to the full picture."
-->

---
layout: statement
---

# The best AI tooling adds deterministic gates around probabilistic agents.

<v-click>

Hooks, tests, schema validation, permission boundaries — **hard checkpoints that never hallucinate** wrapped around models that always might.

</v-click>

<!--
KEY POINTS:
- Name the pattern explicitly: deterministic gates + probabilistic agents
- Hooks are one instance; tests, schema validation, permission scoping, linters are others
- Connects forward to guardrails (bowling-lane metaphor) and backward to MCP contracts
- Also connects to the Swiss-cheese model in Section 04

DELIVERY:
- Let the heading land for 2-3 seconds before clicking
- Tone: conviction — naming something the audience already senses
- Optional verbal: "Every reliable AI system I've seen follows this pattern. The model is creative and unpredictable. The system around it is rigid and unforgiving. That tension is the design."

BRIDGE: "So how do you design a whole system around this principle? That's guardrails."
-->

---
layout: default
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

<!--
SOURCE: Claire Vo (x.com/clairevo/status/2026331055012319450)
SOURCE: Monarch's Philosophy on AI in Dev (somehowmanage.com/2026/01/22/a-step-behind-the-bleeding-edge-monarchs-philosophy-on-ai-in-dev/)

KEY POINTS:
- Anchor with design truth: outputs are nondeterministic — system design, not prompt craft
- Guardrails convert stochastic generation into controlled iteration
- Hooks (just introduced) are one guardrail; tests, validation scripts, permission scoping are others
- For designers: visual regression tests, accessibility checks, component snapshots serve the same role

DELIVERY:
- "That orchestration layer needs the same rigor as any distributed system — except the components are nondeterministic." — Pirouette B
- Laura Tacho: "The Venn Diagram of Developer Experience and Agent Experience is a circle"

BRIDGE: "The most familiar guardrail deserves its own moment: tests."
-->

---
layout: default
---

# Tests Close the Loop

<SlideImage src="/verification-loop.png" alt="The verification loop: plan, implement, test, review" size="sm" />

<v-click>

Write the test first — **the test IS the spec.** The agent implements against it: attempt → failure → retry.

</v-click>
<v-click>

> "Tests are free now. They're effectively free." — **Simon Willison**

Start every agent session with how to run the tests. Five tokens — "red-green TDD" — and reliability jumps.

</v-click>
<v-click>

Every repeated human intervention is a signal that the harness is incomplete.

</v-click>

<!--
SOURCE: Simon Willison, Pragmatic Summit Fireside Chat (simonwillison.net/2026/Mar/14/pragmatic-summit/)
SOURCE: Monarch's Philosophy on AI in Dev (somehowmanage.com/2026/01/22/a-step-behind-the-bleeding-edge-monarchs-philosophy-on-ai-in-dev/)

KEY POINTS:
- Tests are the most familiar guardrail: TDD means the test IS the spec the agent implements against. Tests close the iteration loop — attempt → failure → retry. They're executable specifications.
- Every repeated human intervention signals harness incompleteness
- Willison: TDD becomes obvious when agents bear the execution cost. "Tests are no longer even remotely optional." Every coding session starts with "here's how to run the tests." The prompt "red-green TDD" is only five tokens but dramatically improves agent reliability.

DELIVERY:
- Expand verbally: "Write the test first — it becomes the spec. Agent writes code, tests run, failure signals what to fix, agent retries. Tests are executable definitions of done."
- Willison verbal option: "Simon Willison says he starts every single coding session by telling the agent how to run the tests. Five tokens — 'red-green TDD' — and the reliability jumps. Tests are free when agents write and run them."

BRIDGE: "With guardrails in place, you can safely narrow responsibilities and compose agents together."
-->

---
layout: default
---

# Agent Composition

<v-click>

An agent is an LLM with a system prompt, a set of tools, and permission to act autonomously in a loop — **read, think, act, observe, repeat.**

</v-click>
<v-click>

A **specialized agent** narrows that loop. Focused persona, constrained toolset, single job — security review, accessibility audit, architecture check. Each agent is a markdown file you can read, edit, and version.

</v-click>
<v-click>

**Single-responsibility principle — but for agents.** Context windows are finite — the more concerns you load, the shallower the attention. A focused agent doesn't just perform better — it's easier to test, debug, and trust.

</v-click>
<v-click>

A **lead agent** can then coordinate several specialists in parallel. The pattern is simple: narrow roles, explicit handoffs, deterministic checks.

</v-click>

<!--
KEY POINTS:
- Define an agent operationally, not mystically
- Specialization narrows scope, tools, and evaluation criteria
- Treat each specialized agent as a testable, versioned component
- Composition is orchestrating many narrow agents under one control loop
- Coordination primitives matter more than "chatting" between agents
- Trivedy's agent architecture: Model at center, surrounded by Context Injection (prompts, memory, skills) → Action (bash, tools, MCPs) → Observe & Verify (screenshots, tests, logs) → Persist (filesystem, git) → back to Model. Plus Control (compaction, orchestration, ralph loops). This is the full loop.

SOURCE: Entire, "Hello Entire World" (entire.io/blog/hello-entire-world)
SOURCE: Addy Osmani, "My LLM coding workflow going into 2026" (addyo.substack.com)
SOURCE: Virat Trivedy, "Can Someone Please Define a Harness?" (x.com/Vtrivedy10/status/2031408954517971368)

BRIDGE: "Markdown, skills, MCP, guardrails, composition. All of this — the whole system around the model — has a name."
-->

---
layout: default
class: text-center
---

# The Agent Loop

<MermaidDiagram :code="`graph LR
  CI[Context: prompts, memory, skills] -->|shapes| M[Model: reasons and decides]
  M -->|calls| A[Action: bash, tools, MCPs]
  A -->|writes| P[Persist: filesystem, git]
  A -->|triggers| OV[Observe: tests, logs, screenshots]
  P -.->|reads| M
  OV -.->|results back| M
  CO[Control: compaction, orchestration] -->|manages| M
`" size="xl" />

<p class="mt-2 text-base opacity-75">The model reasons and decides. <strong>Everything else is the harness.</strong></p>

<!--
SOURCE: Virat Trivedy, "Can Someone Please Define a Harness?" (x.com/Vtrivedy10/status/2031408954517971368)

KEY POINTS:
- Visual architecture before naming the discipline on the next slide
- Five harness components around the model: Context Injection, Control, Action, Persist, Observe & Verify
- The cycle: context flows in → model reasons → actions fire → results persist and feed back → model reasons again
- Dashed arrows = feedback paths (reads from persist, results back from observation)
- Solid arrows = primary flow (context shapes model, model calls actions, actions write to persist and trigger verification)

DELIVERY:
- Walk through the cycle once: "Context goes in. The model reasons and decides. It takes action — bash, tools, MCPs. Results get persisted and verified. Feedback loops back. And the cycle repeats."
- Then land the bottom line: "The model is one box. Everything else? That's the harness."

BRIDGE: "This whole system has a name."
-->

---
layout: statement
---

<h1>Harness Engineering</h1>

## Agent = Model + Harness

<v-click>

The harness is every piece of code, configuration, and execution logic that isn't the model itself. Context. Specs. Skills. MCP. Hooks. Tests. Specialized agents. Coordinated teams. **All one discipline — designing the system around the model.**

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
SOURCE: Virat Trivedy, "Can Someone Please Define a Harness?" (x.com/Vtrivedy10/status/2031408954517971368)

KEY POINTS:
- Name the discipline that ties all prior concepts together
- Treat each v-click as a recap ladder from parts to operating model
- Emphasize failure-as-signal: improve the harness, not just the output
- This is the conceptual peak before the live demo
- Trivedy formal definition: "Agent = Model + Harness. A harness is every piece of code, configuration, and execution logic that isn't the model itself."
- Terminal Bench evidence: LangChain improved from Top 30 to Top 5 on Terminal Bench 2.0 by only changing the harness — model stayed the same. The harness is where the leverage is.
- Model-Harness Training Loop: useful primitives get discovered → added to the harness → used to train the next model → model improves at using the harness → cycle repeats. This co-evolution is why harness engineering remains valuable even as models improve.

DELIVERY:
- Optional verbal: "One team demonstrated this concretely: they went from 30th to 5th place on a coding benchmark by only changing the harness. Same model. The system around the model is where the leverage lives."
- Optional verbal (forward-looking): "And here's the interesting part — harness primitives get absorbed into model training. Skills, compaction, verification loops — these become training data. The model gets better at using the harness it was trained in. It's a co-evolution."

BRIDGE: "Don't take my word for how far to push this. Here's the person who built Claude Code."
-->

---
layout: quote
class: quote-long
---

<div class="quote-progressive">
  <div class="quote-progressive-line">"Every team should be writing the CLAUDE.md's, REVIEW.md's, skills, and docs that enable agents to productively work in their codebase with zero additional context from the prompter.</div>

  <v-click>
    <div class="quote-progressive-line">This sounds crazy, and at the same time is a natural extension of the stuff engineers have always done: automate, and encode domain knowledge as infrastructure."</div>
  </v-click>
</div>

<v-click>
  Boris Cherny, creator of Claude Code
</v-click>

<!--
SOURCE: Boris Cherny, X post, July 15, 2026 (x.com/bcherny/status/2077460395279692197)

KEY POINTS:
- This is the team-level mandate that caps the whole section: everything just covered — AGENTS.md, skills, hooks, guardrails, harness engineering — is what Cherny is telling every team to build
- "Zero additional context from the prompter" is the bar: if the agent needs you to explain conventions in the prompt, that knowledge should have been encoded in the repo
- Cherny's three reasons automation matters MORE now: (1) DevX automation speeds up every agent in your fleet, not just you; (2) a lint rule, CI step, or routine automates a class of issue forever — cheaper than re-solving it with tokens each time; (3) most importantly, it lets others contribute — engineers ship on day one, non-engineers contribute as effectively as engineers
- His sharpest reframe: a PR rejected for using the wrong framework or ignoring architectural patterns is "a failure of automation" — the domain knowledge lived in someone's head instead of in the repo
- The unlock: encodable domain knowledge is no longer limited to what fits in lint rules, types, and tests — it now includes code comments, skills, CLAUDE.md rules, and memories
- His "loops" line connects back to the harness slide: "it's about automating entire types of busywork rather than solving them one off"

DELIVERY:
- Land the first line, pause, then click: "This sounds crazy" — let the audience feel that he names their skepticism himself
- Verbal option: "Notice what he's saying: this isn't new work. Lint rules, tests, editor tooling — the best engineers always encoded their knowledge as infrastructure. The only thing that changed is how much knowledge is now encodable."
- Verbal option (the reframe): "When a PR gets rejected because it doesn't follow your architecture patterns — Cherny calls that a failure of automation, not a failure of the contributor."

BRIDGE: "But the engineering loop is only the innermost loop."
-->

---
layout: default
class: text-center
---

# Three Loops. Three Clocks.

<MermaidDiagram :code="`graph TB
  X[External feedback · hours to weeks<br/>Release → Observe users → Update direction ↺]
  D[Developer feedback · tens of minutes to hours<br/>Product vision → Review product → Refine spec + steer ↺]
  A[Agentic coding · minutes<br/>Spec + evals → Build → Test + inspect ↺]
  X -.-> D
  D -.-> A
`" size="md" />

<v-click>

As implementation accelerates, the human role moves outward — **from checking code to shaping products.**

</v-click>

<!--
SOURCE: Andrew Ng, "Loop Engineering" (x.com/AndrewYNg/status/2071988145667928442)
SOURCE: Satya Nadella, "A frontier without an ecosystem is not stable" (x.com/satyanadella/status/2066182223213293753)

KEY POINTS:
- Widen the lens from the technical agent loop to the full product-development system
- The three loops operate at different cadences: minutes, tens of minutes to hours, and hours to weeks
- The agentic loop turns a spec and optional evals into tested software
- The developer loop reviews the current product and updates the vision, design, flow, or spec
- The external loop gathers real-world evidence from friends, alpha users, production, or experiments
- Information flows inward: external evidence shapes product vision; developer judgment shapes the spec; the spec drives the agent
- Ng calls the durable human advantage a "context advantage," not merely taste: humans know things about users and operating context that the AI does not
- As agents take over more QA, engineers move into partial product-management responsibility
- Nadella's ownership test still applies across all three loops: the durable asset is the institutional system that captures judgment in specs, evals, traces, and harnesses

DELIVERY:
- Start at the bottom: "This is the loop we just examined — the agent can cycle every few minutes."
- Move upward: "A developer reviews less often and steers at a higher level. Real users close the slowest, outer loop."
- Land the context advantage: "So long as you know something about the user that the agent does not, you still have information to inject into the system."
- Optional enterprise translation: "The model is replaceable. The loop that captures feedback and turns it into reusable judgment is the compounding asset."

BRIDGE: "One more signal about where this whole stack is heading — then we go live."
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
- Frame this as continuity, not novelty: same agentic primitives, different UX surface
- Wider access does not remove the need for engineered guardrails
- Core takeaway: workflow design is becoming cross-functional infrastructure
- Multiple products are moving this direction (Claude Cowork, Cursor for Teams, Copilot Workspace) — the pattern matters more than any one product

BRIDGE: "Now let's watch this operating model in motion."
-->

---
layout: center
class: text-center
---

# Demo Time

Watch three things: where context enters, where a deterministic check catches a failure, and how the human changes the next move.

<!--
DELIVERY:
- Prime the audience: what to watch for during the demo
- Quick reset slide before context switch to live workflow
- State what the demo will prove: speed with guardrails and human accountability
-->
