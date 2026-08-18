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
<v-click>

<div class="ml-4 mt-4 text-sm opacity-80">

**Read on every session start.** Root file = project-wide rules; nested files add local constraints.

</div>

</v-click>

<!--
SOURCE: Garry Tan, "Markdown is the program now" (x.com/garrytan/status/2061454423034110372)
SOURCE: Pragmatic Engineer, "Building Claude Code with Boris Cherny" (newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny)

KEY POINTS:
- The left shows raw markdown — plain text anyone can write
- The right shows what it looks like rendered — structured, scannable, clear
- The agent parses the same structure: headings become sections, lists become constraints, bold becomes emphasis
- This is WHY the agentic ecosystem converged on markdown — it sits at the intersection of human readability and machine parsability
- Connect forward: every tool in section 03b (skills, agents, AGENTS.md) uses markdown as its medium
- Tan's phrase is the sharper version: markdown is no longer just documentation; for agents, it becomes executable operating context
- AGENTS.md is the highest-leverage first step for most teams adopting agentic tools — think of it as onboarding documentation where the reader is an AI, the same clarity you'd give a new team member
- Claude Code uses CLAUDE.md — same concept, vendor-specific naming
- Inheritance model: root file = project-wide rules, subdirectory files = domain-specific constraints
- The adoption advice belongs in your mouth, not on the slide (there is no room for it): start with one file at the root and add directory-level files only when you see the agent repeat the same mistake
- Real example: this presentation was built with an AGENTS.md specifying Slidev conventions, Yarn 4, multi-file structure

DELIVERY:
- Keep this brief — 90 seconds maximum
- Point at the left: "This is what you type." Point at the right: "This is what the agent sees — the same thing you see."
- If the room is unfamiliar, pause on the example: "Headers, bullet points, bold text. That's it. That's markdown."
- If the room is technical, walk through the nesting model briefly; if non-technical, use the analogy: "It's the same onboarding doc you'd write for a new hire, except the new hire is an agent"
- For designers: "Think of it like structured notes — except those notes become instructions an agent follows."

BRIDGE: "Now let's look at the first tool built on this same medium."
-->

---
layout: default
class: text-center
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
SOURCE: Garry Tan, "Markdown is the program now" (x.com/garrytan/status/2061454423034110372)

KEY POINTS:
- Two invocation models: user-invocable (slash command) vs model-invocable (auto-discovered from prompt)
- User-invocable: user explicitly triggers with /command — deterministic selection
- Model-invocable: agent reads skill descriptions, matches to current prompt, loads autonomously
- Both paths end the same way: skill .md is read, LLM interprets instructions, generates output
- Dotted arrow = the auto-discovered path — the agent chose the skill, the user didn't. The diagram shows one skill per category; say verbally that a real setup holds a pack of them (verify:run, silent-failure-hunter, ...) and only the matched one loads
- Trimmed from the slide, say verbally: a skill is a folder of instructions for one kind of task, and the same format works beyond code — design reviews, accessibility audits, copy editing
- Key contrast to say out loud: "soft guidance" — the LLM interprets the markdown and can adapt or deviate. This is the conceptual counterpart to MCP's hard schema contract on the next slides
- The loading mechanism is worth a sentence: the agent keeps only a short description in memory and loads the full playbook on demand, which keeps the context window focused and cuts repeated prompting
- The full bundle, if the room is technical: markdown instructions, minimal deterministic code, tests for the code, evals for the behaviour, and resolver logic so the agent knows when to reach for it. The resolver is what makes a skill discoverable by the agent rather than merely reusable by the human
- Keep it practical, not mystical: "a skill becomes infrastructure only when it has tests and evals"
- Ecosystem signal: Anthropic's open-source Claude Skills repo shows this pattern at scale, including a "skill creator" meta-skill
- "Skillify it" loop: do the task once, then turn the working workflow into a reusable unit of capability
- If asked "is this just prompt engineering?": yes, but versioned, reusable, and discoverable
- For product/UX: same format works for design review, accessibility checks, or copy editing

BRIDGE: "Skills shape thinking. Before the next building block, here's an analogy to hold all of this together."
-->

---
layout: center
class: text-center
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
- Orientation beat for non-technical audiences, now carrying the MCP definition itself
- APIs are the utensils — each does one thing
- Skills are the recipes — soft guidance, adaptable to the situation
- MCP is the kitchen itself — standardised layout and plumbing, bundling APIs, auth, and tool definitions into one server
- Keep "plug format" language for non-technical audiences; the value proposition is interoperability and lower integration overhead
- The three capability types map to practical intuition: do, read, reuse
- Trimmed from the slide, say verbally: each server publishes what it offers — actions are Tools, context is Resources, reusable templates are Prompts. "For the tools and data an agent can use" is the plug format's object
- Hard contracts reduce ambiguity, retries, and brittle handoffs
- Contrast to hold, and the reason this pairs with the skills slide: skills are soft guidance in markdown; MCP is a hard interface contract — inputs and outputs are schema-validated, no interpretation at the interface
- Concrete verbal example (Linear): "Create a Linear issue about the bug we just found" → the agent picks the create_issue tool from the Linear MCP server → schema-validated result: issue LIN-1234. One server, three capability types

DELIVERY:
- Open light and quick on the image — 30 seconds: "You're not building the kitchen from scratch. You're equipping it and writing the recipes."
- Then let the clicks do the definition; don't re-explain the picture

BRIDGE: "Now let's look at one concrete MCP example where design and implementation share the same source of truth."
-->

---
layout: default
class: text-center
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
SOURCE: Figma Help Center, "Use Figma MCP in Claude Code, Codex CLI, and Cursor" (help.figma.com/hc/en-us/articles/32132100833559-Use-Figma-MCP-in-Claude-Code-Codex-CLI-and-Cursor)
SOURCE: Figma Developers, "Figma Dev Mode MCP Server" (www.figma.com/developers/mcp)

KEY POINTS:
- Make this concrete: same MCP pattern, different domain (design instead of issue tracking)
- Emphasize handoff quality: less ambiguity and fewer interpretation errors
- Position this as cross-functional leverage, not just a developer trick
- The output is not "perfect UI in one shot" — it is a better scoped spec and implementation plan
- New workflow to call out: Claude Code -> Figma handoff via `generate_figma_design`
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

BRIDGE: "Once you have context and interfaces, the next question is reliability. Let's look at the deterministic checks that keep the loop honest."
-->

---
layout: default
---

# Guardrails

<v-click>

**LLMs are stochastic** — same prompt, different result. Reliability comes from the system around the model, not perfected prompts.

</v-click>
<v-click>

<GuardrailsLaneDiagram size="lg" />

</v-click>
<v-click>

**Deterministic gates around probabilistic agents** — and a gate can guard anything you care about.

</v-click>

<!--
SOURCE: Claire Vo (x.com/clairevo/status/2026331055012319450)
SOURCE: Monarch's Philosophy on AI in Dev (somehowmanage.com/2026/01/22/a-step-behind-the-bleeding-edge-monarchs-philosophy-on-ai-in-dev/)
SOURCE: Simon Willison, Pragmatic Summit Fireside Chat (simonwillison.net/2026/Mar/14/pragmatic-summit/)

KEY POINTS:
- Anchor with design truth: outputs are nondeterministic — system design, not prompt craft
- Name the pattern explicitly: deterministic gates + probabilistic agents
- The retry line moved verbal (the closing line only fits one line on screen): "the agent can try, fail, and retry on its own" — say it over the bounce in the diagram, which draws exactly that
- Hooks and tests are now entirely verbal — the line naming them came off the slide, so the lane diagram carries them visually (the two rails ARE tests and reviews) and you name them out loud. Point at the rails as you do it
- Trimmed from the slide, say verbally: hooks fire inside the loop — block `rm -rf`, auto-format, gate the output; tests close it, and *the test is the spec*. Hooks block destructive commands *before they run* and gate output *before the agent stops*; write the test first; and the closing contrast — hard checkpoints that never hallucinate wrapped around models that always might, without them every iteration needs human review
- Hooks are shell scripts firing at lifecycle points in the agent loop, and the lifecycle framing is worth naming if the room is technical: PreToolUse blocks destructive commands before they execute, PostToolUse auto-formats and lints after every file write, Stop rejects output that fails validation and triggers a retry. Same idea as CI/CD or Git hooks — but running inside the loop, not after it, so the agent self-corrects without a human
- Tests are the most familiar guardrail and the one to dwell on: TDD means the test IS the spec the agent implements against, closing the loop attempt → failure → retry. They are executable definitions of done
- Willison (worth quoting verbatim): "Tests are free now. They're effectively free." He starts every coding session by telling the agent how to run the tests; the prompt "red-green TDD" is five tokens and dramatically improves reliability. "Tests are no longer even remotely optional"
- Every repeated human intervention is a signal that the harness is incomplete
- Schema validation, permission scoping, and linters are the other members of the set
- Guardrails convert stochastic generation into controlled iteration
- Connects backward to MCP contracts and forward to the Swiss-cheese model in Section 04
- Callback line for verbal use: "Context shapes what the agent knows. Specs shape what good looks like. Guardrails shape boundaries."
- For designers: visual regression tests, accessibility checks, component snapshots serve the same role

DELIVERY:
- Let the headline land for 2-3 seconds before clicking — tone: conviction, naming something the audience already senses
- Optional verbal: "Every reliable AI system I've seen follows this pattern. The model is creative and unpredictable. The system around it is rigid and unforgiving. That tension is the design."
- "That orchestration layer needs the same rigor as any distributed system — except the components are nondeterministic." — Pirouette B
- Laura Tacho: "The Venn Diagram of Developer Experience and Agent Experience is a circle"

BRIDGE: "The last line is the hinge into the next slide — say it pointing at the rails: tests and reviews are two gates. Here's the full ring."
-->

---
layout: default
class: text-center
# Three now, not two: the ring reads $clicks without consuming any (1 bounces,
# 2 ships), so the count has to be declared. Click 3 carries the payoff line.
clicks: 3
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
SOURCE: "Set the constraints around your agents" diagram (shared reference image), adapted
SOURCE: Armin Ronacher, "The Final Bottleneck" (lucumr.pocoo.org/2026/2/13/the-final-bottleneck/) — back-pressure framing
SOURCE: Addy Osmani, "Own the Outer Loop" (addyosmani.com/blog/own-the-outer-loop/, 7/15/26) — inner/outer loop split; see sources/osmani-own-the-outer-loop.md

KEY POINTS:
- This is the payoff of the guardrails + tests beat: name the full set of constraints, then make the exit criterion explicit
- Osmani's inner/outer loop split (see SOURCE) is the frame for the whole slide: agents run the inner execution loop — investigate, implement, test, report back; engineers own what he calls the outer loop — decide, verify, approve, own. His four sub-loops on the human side if the room wants detail: constraints (what instructions to set), sampling (how much output to review), audit (what evidence to keep), ownership (what production boundary you take)
- VOCABULARY — say "your loop", never "the outer loop". Section 05's three-loop slide gives "outer" to Ng's External feedback ring (real users, hours to weeks) and calls this ring Developer feedback. Osmani splits in two, Ng in three, so Osmani's outer loop covers Ng's outer two; saying "outer" here collides with the §05 point that the outer loop is the only one producing real-world evidence. Attribute the idea to Osmani freely — just don't hand the room the word. "Inner loop" is safe and deliberate: it means the agent's cycle in both sections
- The ring already drew this before it was named, which is why the labels are pinned to the clicks rather than sitting on the slide from the start: the agent bouncing off the gates IS the inner loop, and the pipeline opening IS the handoff to you
- The key move is that the boundary is evidence, not trust — diffs, tests, logs, and a short why. Quality is the set of checks that produce that evidence. Osmani's supporting figures, if challenged: 96% do not fully trust AI code, only 48% always verify before commit, 38% say reviewing AI code takes longer than reviewing human code
- Osmani's "quality is back pressure — grant only as much autonomy as you can still stop and check" is the same idea as Ronacher's back-pressure gate above; name one or the other, not both
- Eight constraint dimensions: correctness (unit, property, mutation tests), security (SAST, dependency and secret scanning), performance (perf budgets, load tests), accessibility (axe, contrast, keyboard), maintainability (coverage, complexity), cost efficiency (token/compute budgets), back-pressure (throttle inflow, cap work in progress), comprehensibility (review, answerability)
- The quality gates are deterministic: unit, property, acceptance and mutation tests, schema contracts, token and compute budgets, quality metrics — checks the model can't argue with
- Back-pressure is the odd one out and worth a sentence: when agents produce more than the pipeline can absorb, throttle inflow or shed load so the system remains operable; it controls the queue rather than judging output quality (Ronacher's framing)
- Comprehensibility as a gate connects forward to Section 04's explainability gate: no merge until someone can answer for the change
- The human role shifts from reviewing output line by line to designing the gates and deciding where the bar sits

DELIVERY:
- Open on the callback before anything builds: the two rails from the last slide — tests and reviews — are two of these eight gates. The ring is the "anything you care about" from the previous line, made literal
- Walk the ring clockwise from Correctness; don't read every sub-label aloud
- First click, as the attempts start bouncing: "the agent works inside the ring — it produces more code than you can read, and attempts that fail a gate bounce straight back. You never see them. Addy Osmani calls this the inner loop, and it isn't yours anymore."
- Second click: the ring slides left and the pipeline opens — "what clears every gate crosses out of the agent's loop and into yours — and that one you still own." Land the line "only output that clears every gate ships"
- Third click is the punchline; don't rush the gap before it. The whole slide argues that you moved from reading output to designing the boundary
- Optional verbal closer: "Set your constraints. They decide whether the code your agents generate is good enough to ship — not your reading speed."

BRIDGE: "With the constraints in place, you can safely narrow responsibilities and compose agents together."
-->

---
layout: default
class: text-center
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
SOURCE: OpenAI, "Harness Engineering" (openai.com/index/harness-engineering/)
SOURCE: Mitchell Hashimoto, "My AI Adoption Journey" (mitchellh.com/writing/my-ai-adoption-journey)
SOURCE: Virat Trivedy, "Can Someone Please Define a Harness?" (x.com/Vtrivedy10/status/2031408954517971368)
SOURCE: Entire, "Hello Entire World" (entire.io/blog/hello-entire-world)
SOURCE: Addy Osmani, "My LLM coding workflow going into 2026" (addyo.substack.com)

KEY POINTS:
- Define an agent operationally when you land the first click, rather than mystically: an LLM with a system prompt, a set of tools, and permission to act autonomously in a loop — read, think, act, observe, repeat
- Specialisation is the single-responsibility principle applied to agents: the more concerns you load, the shallower the attention, so a focused agent performs better and is easier to test, debug and trust
- Trimmed from the slide, say verbally: each specialized agent is a markdown file you can version
- A lead agent can then coordinate several specialists in parallel — narrow roles, explicit handoffs, deterministic checks. Say this out loud: it is the setup for Section 04's opening, where going from one agent to many becomes a distributed-systems problem
- The previous slide's bridge promised a name — deliver it with the diagram: five harness components around the model (Context Injection, Control, Action, Persist, Observe & Verify)
- The cycle: context flows in → model reasons → actions fire → results persist and feed back → model reasons again
- Dashed arrows = feedback paths; solid arrows = primary flow
- Trivedy formal definition: "Agent = Model + Harness. A harness is every piece of code, configuration, and execution logic that isn't the model itself."
- Make the maintainer's role explicit: choose what enters the loop, encode the quality criteria, and improve the system when it misses — choose the work, set the bar, turn every miss into a stronger harness
- Emphasize failure-as-signal: improve the harness, not just the output
- This is the conceptual peak before the live demo
- Terminal Bench evidence: LangChain improved from Top 30 to Top 5 on Terminal Bench 2.0 by only changing the harness — model stayed the same. The harness is where the leverage is.
- Model-Harness Training Loop: useful primitives get discovered → added to the harness → used to train the next model → model improves at using the harness → cycle repeats. This co-evolution is why harness engineering remains valuable even as models improve.

DELIVERY:
- Walk through the cycle once: "Context goes in. The model reasons and decides. It takes action — bash, tools, MCPs. Results get persisted and verified. Feedback loops back. And the cycle repeats."
- Then land the bottom line: "The model is one box. Everything else? That's the harness."
- Optional verbal: "One team demonstrated this concretely: they went from 30th to 5th place on a coding benchmark by only changing the harness. Same model. The system around the model is where the leverage lives."
- Optional verbal (forward-looking): "And here's the interesting part — harness primitives get absorbed into model training. Skills, compaction, verification loops — these become training data. The model gets better at using the harness it was trained in. It's a co-evolution."
- Close on Hashimoto verbally rather than on screen — the slide has no room for it and the line lands fine spoken: "The model is the engine. The harness is the car."

BRIDGE: "Don't take my word for how far to push this. Here's the person who built Claude Code."
-->

---
layout: quote
class: quote-long
---

<div class="quote-progressive">
  <div class="quote-progressive-line">“Every team should be writing the CLAUDE.md’s, REVIEW.md’s, skills, and docs that enable agents to productively work in their codebase with zero additional context from the prompter.</div>

  <v-click>
    <div class="quote-progressive-line">This sounds crazy, and at the same time is a natural extension of the stuff engineers have always done: automate, and encode domain knowledge as infrastructure.”</div>
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

BRIDGE: "That's the mandate. Now let's watch this operating model in motion."
-->

---
layout: center
class: text-center
---

# Demo Time

<!-- Capped measure: at full slide width this line runs ~120 characters. -->
<p class="mx-auto" style="max-width: 70ch">Watch three things: where context enters, where a deterministic check catches a failure, and how the human changes the next move.</p>

<!--
DELIVERY:
- Prime the audience: what to watch for during the demo
- Quick reset slide before context switch to live workflow
- State what the demo will prove: speed with guardrails and human accountability
-->
