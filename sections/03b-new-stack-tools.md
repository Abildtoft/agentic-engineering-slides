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
- Order here matters: building blocks first, then the harness mental model that unifies them, then constraints and composition

BRIDGE: "You've seen the concepts — context engineering and spec-driven development. Now let's look at the specific tools that implement them."
-->

---
layout: two-cols-header
class: narrated-compact
narrator: bottom-left
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

<!-- Token-derived, not Tailwind greys: the card depicts a rendered document, but
     it still sits in the deck's palette. The border tints --brand-text down
     rather than naming a fresh grey. -->
<div class="p-4 rounded-lg" style="background: var(--brand-bg); border: 1px solid color-mix(in srgb, var(--brand-text) 14%, transparent); color: var(--brand-text)">
  <div class="text-xl font-bold mb-3">AGENTS.md</div>
  <div class="text-base font-semibold mt-4 mb-1">Stack</div>
  <ul class="text-sm my-1 ml-4 list-disc">
    <li>Slidev, Vue 3, UnoCSS</li>
    <li>Package manager: <strong>Yarn 4</strong></li>
  </ul>
  <div class="text-base font-semibold mt-4 mb-1">Guidelines</div>
  <ul class="text-sm my-1 ml-4 list-disc">
    <li>One idea per slide</li>
    <li>Use <code class="px-1 rounded text-xs" style="background: var(--brand-surface); color: var(--brand-primary)">v-click</code> for reveals</li>
  </ul>
</div>

</div>

</v-click>
<v-click>

<div class="ml-4 mt-4 text-sm opacity-80">

**Read on every session start.** Root file = project-wide rules; nested files add local constraints.

</div>

</v-click>

<!--
KEY POINTS:
- Left: raw markdown you type. Right: what the agent sees — same thing
- Markdown won because it's human-readable AND machine-parsable
- Tan: markdown is no longer just documentation — executable operating context
- AGENTS.md = onboarding doc where the reader is an AI; highest-leverage first step
- Inheritance: root file = project-wide rules, subdirectory files = domain-specific constraints

BRIDGE: "Now let's look at the first tool built on this same medium."

ADDITIONAL POINTS:
- The right is the rendered view — structured, scannable, clear; the agent parses the same structure: headings become sections, lists become constraints, bold becomes emphasis
- Connect forward: every tool in section 03b (skills, agents, AGENTS.md) uses markdown as its medium
- AGENTS.md analogy: the same clarity you'd give a new team member
- Claude Code uses CLAUDE.md — same concept, vendor-specific naming
- Adoption advice belongs in your mouth, not on the slide (no room): start with one root file, add directory-level files only when the agent repeats the same mistake
- Real example: this presentation was built with an AGENTS.md specifying Slidev conventions, Yarn 4, multi-file structure

DELIVERY:
- Keep this brief — 90 seconds maximum
- Point at the left: "This is what you type." Point at the right: "This is what the agent sees — the same thing you see."
- If the room is unfamiliar, pause on the example: "Headers, bullet points, bold text. That's it. That's markdown."
- If the room is technical, walk through the nesting model briefly; if non-technical, use the analogy: "It's the same onboarding doc you'd write for a new hire, except the new hire is an agent"
- For designers: "Think of it like structured notes — except those notes become instructions an agent follows."

SOURCE: Garry Tan, "Markdown is the program now" (x.com/garrytan/status/2061454423034110372)
SOURCE: Pragmatic Engineer, "Building Claude Code with Boris Cherny" (newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny)
-->

---
layout: default
class: text-center
narrator: hidden
---

# Skills: Reusable Playbooks

<!-- The <br/> wraps are load-bearing for legibility: the SVG scales down to the
     slide width, so intrinsic width sets the effective text size. Unwrapped,
     this chain renders its 13px node text at ~8.7px. -->
<MermaidDiagram :code="`graph LR
  U1['/commit-message'] -->|slash command| A[Agent]
  U2['Check for<br/>security issues'] -->|prompt matches| A
  A -->|explicit load| SK1[commit-message<br/>skill]
  A -.->|auto-discovered| SK2[code-reviewer<br/>skill]
  SK1 --> LLM[LLM<br/>interprets]
  SK2 --> LLM
  LLM -->|soft guidance| R[Output]
`" size="lg" />

<p class="mt-4 text-lg opacity-85">Skills shape how the agent <strong>thinks</strong> — write the workflow once, run it whenever that task shows up.</p>

<v-click>

<p class="text-base opacity-75"><strong>Manual trigger</strong> — <code>/commit-message</code> · <strong>Automatic trigger</strong> — the agent matches your request to a skill description.</p>

</v-click>
<v-click>

<p class="text-base opacity-75"><strong>Prompting evaporates. Skill packs compound.</strong></p>

</v-click>

<!--
KEY POINTS:
- Two invocation models: user-invocable (/command) vs model-invocable (auto-discovered)
- Both paths end the same: skill .md read, LLM interprets, generates output
- Say out loud: "soft guidance" — counterpart to MCP's hard schema contract next
- A skill is a folder of instructions for one kind of task — say verbally
- "Skillify it": do the task once, turn the workflow into a reusable unit

BRIDGE: "Skills shape thinking. Before the next building block, here's an analogy to hold all of this together."

ADDITIONAL POINTS:
- User-invocable: user explicitly triggers with /command — deterministic selection; model-invocable: agent reads skill descriptions, matches to current prompt, loads autonomously
- Dotted arrow = the auto-discovered path — the agent chose the skill, the user didn't. The diagram shows one skill per category; say verbally that a real setup holds a pack of them (verify:run, silent-failure-hunter, ...) and only the matched one loads
- Soft guidance means the LLM interprets the markdown and can adapt or deviate
- Trimmed from the slide, say verbally: the same format works beyond code — design reviews, accessibility audits, copy editing (the point to make for product/UX)
- The loading mechanism is worth a sentence: the agent keeps only a short description in memory and loads the full playbook on demand, which keeps the context window focused and cuts repeated prompting
- The full bundle, if the room is technical: markdown instructions, minimal deterministic code, tests for the code, evals for the behaviour, and resolver logic so the agent knows when to reach for it. The resolver is what makes a skill discoverable by the agent rather than merely reusable by the human
- Keep it practical, not mystical: "a skill becomes infrastructure only when it has tests and evals"
- Ecosystem signal: Anthropic's open-source Claude Skills repo shows this pattern at scale, including a "skill creator" meta-skill
- If asked "is this just prompt engineering?": yes, but versioned, reusable, and discoverable

SOURCE: Garry Tan, "Markdown is the program now" (x.com/garrytan/status/2061454423034110372)
-->

---
layout: center
class: text-center
narrator: hidden
---

# The Kitchen Analogy

<KitchenAnalogyDiagram size="lg" />

<v-click>

<p class="text-base opacity-75">MCP is a <strong>standard plug format</strong> — think USB — one protocol instead of a custom integration per app.</p>

</v-click>
<v-click>

<p class="text-base opacity-75"><strong>Tools</strong> (do) · <strong>Resources</strong> (read) · <strong>Prompts</strong> (reuse) — all schema-validated, so handoffs are predictable.</p>

</v-click>
<v-click>

<p class="text-base opacity-75">Skills tell the agent <strong>how to think</strong>. MCP tells it <strong>what it can safely operate</strong>.</p>

</v-click>

<!--
KEY POINTS:
- APIs = utensils (each does one thing), skills = recipes, MCP = the kitchen itself
- MCP bundles APIs, auth, and tool definitions into one server
- Three capability types: do, read, reuse — Tools, Resources, Prompts
- Contrast to hold: skills are soft markdown guidance; MCP is a hard contract
- Linear example: "create an issue" → create_issue tool → LIN-1234

BRIDGE: "Now let's look at one concrete MCP example where design and implementation share the same source of truth."

ADDITIONAL POINTS:
- Orientation beat for non-technical audiences, now carrying the MCP definition itself
- Skills as recipes: soft guidance, adaptable to the situation; MCP as kitchen: standardised layout and plumbing
- Keep "plug format" language for non-technical audiences; the value proposition is interoperability and lower integration overhead
- Trimmed from the slide, say verbally: each server publishes what it offers — actions are Tools, context is Resources, reusable templates are Prompts. "For the tools and data an agent can use" is the plug format's object
- Hard contracts reduce ambiguity, retries, and brittle handoffs — inputs and outputs are schema-validated, no interpretation at the interface. This contrast is the reason this pairs with the skills slide
- Linear example in full: "Create a Linear issue about the bug we just found" → the agent picks the create_issue tool from the Linear MCP server → schema-validated result: issue LIN-1234. One server, three capability types

DELIVERY:
- Open light and quick on the image — 30 seconds: "You're not building the kitchen from scratch. You're equipping it and writing the recipes."
- Then let the clicks do the definition; don't re-explain the picture
-->

---
layout: default
class: text-center
narrator: hidden
---

# MCP Example: Figma ↔ Frontend

<!-- The <br/> wraps are load-bearing for legibility: this is the widest chain
     in the deck, and unwrapped it renders its 13px node text at ~7.6px. Tool
     names stay on one line — a wrapped identifier reads as two identifiers. -->
<MermaidDiagram :code="`graph LR
  A[Agent] --> F[Figma MCP<br/>Server]
  F --> T[get_design_context]
  F --> R[get_variable_defs]
  T --> S[Scoped spec +<br/>acceptance criteria]
  R --> S
  S --> UI[Running UI<br/>in browser]
  UI --> G[generate_figma_design]
  G --> B[Back to<br/>Figma file]
`" size="xl" />

<p class="mt-4 text-lg opacity-85">Design intent becomes structured input, not screenshot guessing.</p>

<v-click>

<p class="text-base opacity-75"><strong>Schema-bound handoff</strong> — frames, components, and tokens through contracts, not copy/paste.</p>

</v-click>
<v-click>

<p class="text-base opacity-75"><strong>One source of truth</strong> — designers approve in Figma, engineers execute from it.</p>

</v-click>
<v-click>

<p class="text-base opacity-75"><strong>Now bidirectional</strong> — live UI back to Figma via <code>generate_figma_design</code>.</p>

</v-click>

<!--
KEY POINTS:
- Same MCP pattern, different domain — design instead of issue tracking
- Output is a better scoped spec and plan, not "perfect UI in one shot"
- New workflow: Claude Code -> Figma handoff via `generate_figma_design`
- Cross-functional leverage, not just a developer trick

BRIDGE: "You've now seen the pieces — context files, skills, MCP servers. Here's the machine they all plug into."

ADDITIONAL POINTS:
- Emphasize handoff quality: less ambiguity and fewer interpretation errors
- Constraint: this handoff path requires the remote Figma MCP server and currently supports Claude Code and Codex
- Diagram simplified for legibility: the user-prompt node, the implementation-plan/PR step, the MCP-client hop and the handoff_checklist Prompt are elided — narrate the user's ask ("implement the approved pricing frame") and the plan+PR step over the arrows. If asked how prompts fit, the kitchen slide's three capability types cover it

DELIVERY:
- "This is where MCP gets interesting: not just tickets and repos, but design systems and approved frames."
- "Instead of guessing from screenshots, the agent pulls structured frame and token data."
- "The immediate win is cleaner handoff and traceability from design decision to code change."
- "And now it goes both ways: not only Figma to code, but code UI back to Figma for review."
- DESIGN PERSPECTIVE (Jenny Wen, Design Lead at Anthropic, via Lenny Rachitsky): Figma remains essential because canvas exploration lets you rapidly explore 8–10 directions simultaneously. Coding tools are too linear — once you start building one direction, investment bias sets in.
- Verbal option: "Jenny Wen argues Figma is still indispensable — it's the only tool that lets you diverge across 8 to 10 directions without the investment bias of building one. That's why the MCP bridge matters: Figma for exploration, code for execution."
- "Source of truth" is the key phrase — this reframes the bridge as design governance, not convenience. For designers: your Figma file is already structured data; MCP makes that data legible to the agent.

SOURCE: Figma Help Center, "Use Figma MCP in Claude Code, Codex CLI, and Cursor" (help.figma.com/hc/en-us/articles/32132100833559-Use-Figma-MCP-in-Claude-Code-Codex-CLI-and-Cursor)
SOURCE: Figma Developers, "Figma Dev Mode MCP Server" (www.figma.com/developers/mcp)
-->

---
layout: default
class: text-center
narrator: hidden
---

# Harness Engineering

<MermaidDiagram :code="`graph LR
  CI[Context: prompts, memory, skills] -->|shapes| M[Model: reasons and decides]
  M -->|calls| A[Action: bash, tools, MCPs]
  A -->|writes| P[Persist: filesystem, git]
  A -->|triggers| OV[Observe: tests, logs, screenshots]
  P -.->|reads| M
  OV -.->|results back| M
  CO[Control: compaction, orchestration] -->|manages| M
`" size="lg" />

<v-click>

<p class="text-base opacity-85"><strong>Agent = Model + Harness.</strong> Context, specs, skills, MCP, hooks, tests — and <strong>specialized agents</strong>: one persona, a narrow toolset, a single job.</p>

</v-click>
<v-click>

<p class="text-base opacity-85">When an agent fails, don’t just fix the output. <strong>Improve the harness so the whole loop gets better.</strong></p>

</v-click>

<!--
KEY POINTS:
- Agent, operationally: LLM + system prompt + tools + permission to act in a loop
- Trivedy: "Agent = Model + Harness" — everything that isn't the model itself
- Five harness components: Context Injection, Control, Action, Persist, Observe & Verify
- Terminal Bench: LangChain went Top 30 → Top 5 changing only the harness
- Failure-as-signal: improve the harness, not just the output

BRIDGE: "That's the machine. But the model in the middle is stochastic — so the next question is reliability. Let's look at the deterministic checks that keep the loop honest."

ADDITIONAL POINTS:
- Define the agent operationally when you land the first click, rather than mystically — the loop is read, think, act, observe, repeat
- Specialisation is the single-responsibility principle applied to agents: the more concerns you load, the shallower the attention, so a focused agent performs better and is easier to test, debug and trust
- Trimmed from the slide, say verbally: each specialized agent is a markdown file you can version
- A lead agent can then coordinate several specialists in parallel — narrow roles, explicit handoffs, deterministic checks. Say this out loud: the issue-to-PR pipeline a few slides on composes exactly such specialists, and it is the setup for Section 04's opening, where going from one agent to many becomes a distributed-systems problem
- The previous slide's bridge promised the machine the pieces plug into — deliver the name with the diagram
- Hooks and tests in the component list are a preview — the next two slides unpack them as guardrails and gates
- The cycle: context flows in → model reasons → actions fire → results persist and feed back → model reasons again. Dashed arrows = feedback paths; solid arrows = primary flow
- Trivedy's definition in full: "Agent = Model + Harness. A harness is every piece of code, configuration, and execution logic that isn't the model itself."
- Make the maintainer's role explicit: choose what enters the loop, encode the quality criteria, and improve the system when it misses — choose the work, set the bar, turn every miss into a stronger harness
- Terminal Bench detail: Terminal Bench 2.0, model stayed the same. The harness is where the leverage is.
- Model-Harness Training Loop: useful primitives get discovered → added to the harness → used to train the next model → model improves at using the harness → cycle repeats. This co-evolution is why harness engineering remains valuable even as models improve.

DELIVERY:
- Walk through the cycle once: "Context goes in. The model reasons and decides. It takes action — bash, tools, MCPs. Results get persisted and verified. Feedback loops back. And the cycle repeats."
- Then land the bottom line: "The model is one box. Everything else? That's the harness."
- Optional verbal: "One team demonstrated this concretely: they went from 30th to 5th place on a coding benchmark by only changing the harness. Same model. The system around the model is where the leverage lives."
- Optional verbal (forward-looking): "And here's the interesting part — harness primitives get absorbed into model training. Skills, compaction, verification loops — these become training data. The model gets better at using the harness it was trained in. It's a co-evolution."
- Close on Hashimoto verbally rather than on screen — the slide has no room for it and the line lands fine spoken: "The model is the engine. The harness is the car."

SOURCE: OpenAI, "Harness Engineering" (openai.com/index/harness-engineering/)
SOURCE: Mitchell Hashimoto, "My AI Adoption Journey" (mitchellh.com/writing/my-ai-adoption-journey)
SOURCE: Virat Trivedy, "Can Someone Please Define a Harness?" (x.com/Vtrivedy10/status/2031408954517971368)
SOURCE: Entire, "Hello Entire World" (entire.io/blog/hello-entire-world)
SOURCE: Addy Osmani, "My LLM coding workflow going into 2026" (addyo.substack.com)
-->

---
layout: default
narrator: hidden
---

# Guardrails

<v-click>

**LLMs are stochastic** — same prompt, different result. Reliability comes from the system around the model, not perfected prompts.

</v-click>
<v-click>

<GuardrailsLaneDiagram size="lg" />

</v-click>
<v-click>

**Explicit gates around probabilistic agents.** Automate the measurable; own the judgment.

</v-click>

<!--
KEY POINTS:
- Outputs are nondeterministic — system design, not prompt craft
- Name the pattern: explicit gates around probabilistic agents
- Hooks and tests are entirely verbal — the two rails ARE tests and reviews
- TDD: the test IS the spec. Willison: "Tests are free now."
- Every repeated human intervention signals an incomplete harness

BRIDGE: "The last line is the hinge into the next slide — say it pointing at the rails: tests and reviews are two gates. Here's the full ring."

ADDITIONAL POINTS:
- The retry line moved verbal (the closing line only fits one line on screen): "the agent can try, fail, and retry on its own" — say it over the bounce in the diagram, which draws exactly that
- The line naming hooks and tests came off the slide, so the lane diagram carries them visually and you name them out loud. Point at the rails as you do it
- Trimmed from the slide, say verbally: hooks fire inside the loop — block `rm -rf`, auto-format, gate the output; tests close it. Hooks block destructive commands *before they run* and gate output *before the agent stops*; write the test first; and the closing contrast — hard checkpoints that never hallucinate wrapped around models that always might, without them every iteration needs human review
- Hooks are shell scripts firing at lifecycle points in the agent loop, and the lifecycle framing is worth naming if the room is technical: PreToolUse blocks destructive commands before they execute, PostToolUse auto-formats and lints after every file write, Stop rejects output that fails validation and triggers a retry. Same idea as CI/CD or Git hooks — but running inside the loop, not after it, so the agent self-corrects without a human
- Tests are the most familiar guardrail and the one to dwell on: they close the loop attempt → failure → retry, and are executable definitions of done
- Willison in full (worth quoting verbatim): "Tests are free now. They're effectively free." He starts every coding session by telling the agent how to run the tests; the prompt "red-green TDD" is five tokens and dramatically improves reliability. "Tests are no longer even remotely optional"
- Schema validation, permission scoping, and linters are the other members of the set
- Guardrails convert stochastic generation into controlled iteration: deterministic checks where possible, accountable judgment where necessary
- Connects backward to MCP contracts and forward to the Swiss-cheese model in Section 04
- Callback line for verbal use: "Context shapes what the agent knows. Specs shape what good looks like. Guardrails shape boundaries."
- For designers: visual regression tests, accessibility checks, component snapshots serve the same role

DELIVERY:
- Let the headline land for 2-3 seconds before clicking — tone: conviction, naming something the audience already senses
- Optional verbal: "Every reliable AI system I've seen follows this pattern. The model is creative and unpredictable. The system around it is rigid and unforgiving. That tension is the design."
- "That orchestration layer needs the same rigor as any distributed system — except the components are nondeterministic." — Pirouette B
- Laura Tacho: "The Venn Diagram of Developer Experience and Agent Experience is a circle"

SOURCE: Claire Vo (x.com/clairevo/status/2026331055012319450)
SOURCE: Monarch's Philosophy on AI in Dev (somehowmanage.com/2026/01/22/a-step-behind-the-bleeding-edge-monarchs-philosophy-on-ai-in-dev/)
SOURCE: Simon Willison, Pragmatic Summit Fireside Chat (simonwillison.net/2026/Mar/14/pragmatic-summit/)
-->

---
layout: default
class: text-center
# Three now, not two: the ring reads $clicks without consuming any (1 bounces,
# 2 ships), so the count has to be declared. Click 3 carries the payoff line.
clicks: 3
narrator: hidden
---

# Set the Constraints Around Your Agents

<ConstraintRingDiagram size="sm" />

<!-- Each loop is named on the click that already enacts it: click 1 bounces the
     agent's attempts off the gates, click 2 opens the pipeline for the output
     that cleared them.

     Osmani's own term for the second one is "outer loop", and it is deliberately
     NOT used here. Section 05's three-loop slide reserves "outer" for Ng's
     External feedback ring — real users, the slowest clock — and calls the
     engineer's ring "Developer feedback". Osmani splits the world in two and Ng
     in three, so Osmani's outer loop spans Ng's outer TWO; keeping the word here
     would put "Outer loop — you" on a slide twelve before the speaker says the
     outer loop is where real users close it. "Inner loop" stays: it means the
     agent's own cycle in both sections, and section 05's "accelerating the inner
     loop" line leans on exactly that. -->
<!-- One line per loop, not a label + description pair: the ring runs to within
     ~75px of the slide's bottom edge at this size, and a two-line block pushed
     the payoff line below the fold. -->
<div class="grid grid-cols-2 gap-x-12 mt-1">
  <p class="text-sm my-0" v-click="1"><strong style="color: var(--brand-primary)">Inner loop</strong> — the agent: investigate, implement, test, report.</p>
  <p class="text-sm my-0" v-click="2"><strong style="color: var(--brand-primary)">Your loop</strong> — decide, verify, approve, own.</p>
</div>

<v-click at="3">

<p class="text-lg mt-3">The boundary is <strong>evidence</strong> — diffs, tests, logs the model can’t argue with. <strong>The gates decide what’s good enough to ship.</strong></p>

</v-click>

<!--
KEY POINTS:
- Payoff of the guardrails beat: name the constraints, make the exit criterion explicit
- Osmani's split: agents run the inner loop; you decide, verify, approve, own
- VOCABULARY — say "your loop", never "the outer loop" (§05 reserves "outer" for Ng)
- The boundary is evidence, not trust — diffs, tests, logs, a short why
- Human role shifts from reading output line by line to designing the gates

BRIDGE: "With the constraints in place, you can compose harnessed agents together. Here's that ring wired into a real pipeline — one command."

ADDITIONAL POINTS:
- Osmani's inner/outer loop split (see SOURCE) frames the whole slide: the inner execution loop is investigate, implement, test, report back. His four sub-loops on the human side if the room wants detail: constraints (what instructions to set), sampling (how much output to review), audit (what evidence to keep), ownership (what production boundary you take)
- VOCABULARY in full: Section 05's three-loop slide gives "outer" to Ng's External feedback ring (real users, hours to weeks) and calls this ring Developer feedback. Osmani splits in two, Ng in three, so Osmani's outer loop covers Ng's outer two; saying "outer" here collides with the §05 point that the outer loop is the only one producing real-world evidence. Attribute the idea to Osmani freely — just don't hand the room the word. "Inner loop" is safe and deliberate: it means the agent's cycle in both sections
- The ring already drew this before it was named, which is why the labels are pinned to the clicks rather than sitting on the slide from the start: the agent bouncing off the gates IS the inner loop, and the pipeline opening IS the handoff to you
- Quality is the set of checks that produce the evidence. Osmani's supporting figures, if challenged: 96% do not fully trust AI code, only 48% always verify before commit, 38% say reviewing AI code takes longer than reviewing human code
- Osmani's "quality is back pressure — grant only as much autonomy as you can still stop and check" is the same idea as Ronacher's back-pressure gate above; name one or the other, not both
- Eight constraint dimensions: correctness (unit, property, mutation tests), security (SAST, dependency and secret scanning), performance (perf budgets, load tests), accessibility (axe, contrast, keyboard), maintainability (coverage, complexity), cost efficiency (token/compute budgets), back-pressure (throttle inflow, cap work in progress), comprehensibility (review, answerability)
- Automate the gates that can be deterministic: unit, property, acceptance and mutation tests, schema contracts, token and compute budgets, and measurable quality thresholds. Comprehensibility and other judgment calls still need named human ownership
- Back-pressure is the odd one out and worth a sentence: when agents produce more than the pipeline can absorb, throttle inflow or shed load so the system remains operable; it controls the queue rather than judging output quality (Ronacher's framing)
- Comprehensibility as a gate connects forward to Section 04's explainability gate: no merge until someone can answer for the change

DELIVERY:
- Open on the callback before anything builds: the two rails from the last slide — tests and reviews — are two of these eight gates. The ring is the "anything you care about" from the previous line, made literal
- Walk the ring clockwise from Correctness; don't read every sub-label aloud
- First click, as the attempts start bouncing: "the agent works inside the ring — it produces more code than you can read, and attempts that fail a gate bounce straight back. You never see them. Addy Osmani calls this the inner loop, and it isn't yours anymore."
- Second click: the ring slides left and the pipeline opens — "what clears every gate crosses out of the agent's loop and into yours — and that one you still own." Land the line "only output that clears every gate ships"
- Third click is the punchline; don't rush the gap before it. The whole slide argues that you moved from reading output to designing the boundary
- Optional verbal closer: "Set your constraints. They decide whether the code your agents generate is good enough to ship — not your reading speed."

SOURCE: "Set the constraints around your agents" diagram (shared reference image), adapted
SOURCE: Armin Ronacher, "The Final Bottleneck" (lucumr.pocoo.org/2026/2/13/the-final-bottleneck/) — back-pressure framing
SOURCE: Addy Osmani, "Own the Outer Loop" (addyosmani.com/blog/own-the-outer-loop/, 7/15/26) — inner/outer loop split; see sources/osmani-own-the-outer-loop.md
-->

---
layout: default
class: text-center
# The pipeline reads $clicks without consuming any (1 implements, 2 runs the
# review loop, 3 ships), so the count has to be declared. Click 3 also lands
# the payoff line.
clicks: 3
narrator: hidden
---

# From Issue to Pull Request: One Command

<p class="text-sm mt-2 mb-1 opacity-70"><code>/kramme:linear:issue-to-pr ENG-142 --ship</code></p>

<IssueToPrDiagram size="lg" />

<v-click at="3">

<p class="text-lg mt-4">The constraint ring, composed into a pipeline. <strong>Your loop shrinks to two moments: approve the intent, review the evidence.</strong></p>

</v-click>

<!--
KEY POINTS:
- Previous slide made concrete: one slash command, Linear issue ID → Pull Request
- Orchestrator, not monolith — composes narrower skills, owns sequencing and handoffs
- Quality loop is the heart: gates run, findings fixed, re-run to *bounded* convergence
- `--ship` authorizes the irreversible tail; without it, stops review-ready
- What crosses to you is evidence: a green PR, gates cleared, verification passed — human judgment approves the intent and owns the result

BRIDGE: "That's my harness. Halfway mark — your call what comes next: demo, questions, or a break."

ADDITIONAL POINTS:
- The ring's gates are wired into the loop; the composed skills are issue implementation, code review, convention review, refactor discovery, verification, PR creation, CI fixing — the command owns only their sequencing, convergence criteria, and handoffs
- Stage by stage: a read-only preflight (clean worktree, the issue's exact branch name from Linear, no existing PR on that branch) → delegated implementation on the issue branch → the quality loop → fresh full verification → PR
- Quality loop detail: code-review, convention, and refactor gates run against the diff. A remediation budget stops it looping forever on rejected advice, and it never widens the issue's scope to make findings disappear
- Verification is a fresh, project-configured run after review settles — not a re-read of earlier results. A gap is reported as a gap, never claimed as a pass
- `--ship` tail: history cleanup, PR creation, then CI and review feedback iterated until green. Without it, the workflow hands you the exact next commands
- It pauses only for hard blockers or decisions the issue and codebase can't determine safely — missing requirements are asked about, not invented
- The payoff restates the last slide's boundary: evidence, not a stream of keystrokes to supervise

DELIVERY:
- Walk left to right, one click per stage; the audience has just seen the agent circle, the dotted gate ring, and the checkbox gate on the previous slide — name the reuse: "same ring, now in a pipeline"
- On click 2, dwell on the loop: "this is where most of the wall-clock goes, and none of my attention"
- Land the payoff line verbatim — it is the whole argument of the section in one sentence and sets up the review-of-intent argument in Cognitive Debt
- If asked what happens when it fails: it stops at the blocker with the evidence preserved — a failed gate is a stop, not a warning

SOURCE: kramme-cc-workflow plugin, `kramme:linear:issue-to-pr` skill (personal workflow, live demo material)
-->

---
layout: center
class: text-center
narrationPause: true
---

# Temperature Check — Demo, Questions, Break?

<p class="mx-auto" style="max-width: 70ch">Halfway through. Your call on what comes next: a live demo, open questions, or a quick break.</p>

<!--
DELIVERY:
- Deliberate pause before the second half — read the room and let them choose
- If demo: connect back to the ×18 mechanics — the workflow can run 10+ agents in isolated workspaces with layered review on every merge
- Prime the demo with three things to watch: where context enters, where a deterministic check catches a failure, and how the human changes the next move
- If questions: park anything that Cognitive Debt or What Matters will answer anyway
- If break: keep it short, then pick up with Cognitive Debt
-->
