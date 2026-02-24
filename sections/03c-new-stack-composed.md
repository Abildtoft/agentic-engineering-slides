---
layout: section
transition: section-shift
---

# The New Stack: Composed

Harnesses, verification loops, and multi-agent teams

<!--
[T+70:45 | S3c slide 1 of 9 | 0.5min]
Transition from Section 3b: "You've seen the three building blocks — skills for capabilities, MCP for integration, hooks for safety. Now: what happens when you compose them into systems that work autonomously?"
Section 3c covers three levels of composition: a single verification loop (harness), specialized agents working in parallel, and full multi-agent teams. Each adds power — and coordination complexity.
-->

---

# Harnesses & Verification Loops

<v-click>

**Plan → Implement → Test → Review → Repeat**

</v-click>
<v-click>

The human defines the spec and owns verification. The agent executes and self-checks within the loop.

</v-click>
<v-click>

**SIW** — a concrete harness that enforces this cycle on every issue, from spec to implementation to audit.

</v-click>

<!--
[T+72:30 | S3c slide 2 of 9 | 2min]
Source: Monarch's Philosophy on AI in Dev (somehowmanage.com/2026/01/22/a-step-behind-the-bleeding-edge-monarchs-philosophy-on-ai-in-dev/)
"Creating ways for AI to validate its own work allows it to run more autonomously with less input from you."

Source: Addy Osmani (addyo.substack.com/p/my-llm-coding-workflow-going-into)
"Break the project into iterative steps or tickets and tackle them one by one."

A harness is the composed version of what 3a and 3b introduced separately. Context engineering gives the agent knowledge. Specs give it direction. Skills, MCP, and hooks give it capabilities and guardrails. A harness wires them into a repeating loop.
SIW in kramme-cc-workflow: you write a spec, it gets broken into issues with acceptance criteria, the agent picks up an issue, plans, implements, validates, and requests review. This presentation was built this way — the audience is looking at SIW output right now.
The harness is not about making the agent faster. It's about making the agent's work reviewable and iterative. Each loop is small enough to verify, large enough to be useful.
Transition: a harness with one agent and one human. What happens when you add specialized agents?
-->

---
layout: quote
---

# "Design that system — you plus AI — figuring out your role in it, since you will ultimately own the output."

Monarch Engineering

<!--
[T+73:15 | S3c slide 3 of 9 | 1min]
Source: Monarch's Philosophy on AI in Dev (somehowmanage.com/2026/01/22/a-step-behind-the-bleeding-edge-monarchs-philosophy-on-ai-in-dev/)

This captures the core insight of the harness pattern. Autonomy isn't granted — it's earned through verification loops. The human decides where to be involved: reviewing the plan, reviewing the output, or both. The agent handles everything in between.
Connect to the audience's existing experience: code review is already a verification loop. Linting is already a verification loop. CI is already a verification loop. The difference is that the harness makes these loops agent-driven and composable rather than manual and isolated.
For the non-dev audience: this same principle applies to any workflow where you delegate and review. The template is always: plan → do → check → refine.
Transition: but what if the reviewer itself is an agent?
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
[T+75:00 | S3c slide 4 of 9 | 2min]
Source: Entire announcement (entire.io/blog/hello-entire-world)
"Agents now interoperate in parallel, generating and evaluating hundreds of variants simultaneously."

In kramme-cc-workflow, each review agent is a markdown file — exactly like the skills from 3b, but with a persona. The security agent only looks for vulnerabilities. The a11y agent only checks accessibility. The architecture agent only evaluates structural decisions. No agent tries to do everything.
What happens when you trigger a review: the orchestrator reads the diff, fans it out to relevant agents, each returns findings in a structured format, results are aggregated. A PR that would take one human reviewer 30 minutes gets 20 specialized reviews in 2 minutes.
This is the same principle as microservices — decompose a complex task into focused, single-responsibility units. The "full-stack reviewer" is as problematic as the full-stack monolith.
For the non-dev audience: imagine design review where one agent checks visual consistency, another checks copy tone, another checks spacing against the design system, another checks accessibility contrast ratios. Same principle.
Transition: individual agents reviewing in sequence. What if they work as a team, in parallel?
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
[T+76:30 | S3c slide 5 of 9 | 2min]
Source: Coordination is Quietly Becoming the Hardest Engineering Problem (x.com/PirouneB)
"Coordination is quietly becoming the hardest engineering problem. When you have multiple agents working in parallel, someone has to version the prompts, manage shared state, handle failure cascading, and decide which agent gets which context window. That orchestration layer needs the same rigor as any distributed system... except the components are nondeterministic."

Source: Entire announcement (entire.io/blog/hello-entire-world)
"The terminal is becoming the new center of gravity, as developers prompt fleets of agents across multiple terminal windows at once."

Multi-agent teams are the highest level of composition. In kramme-cc-workflow, a lead agent breaks work into tasks, spawns worker agents, coordinates results. One terminal runs the orchestrator, others run the workers.
Example: team-based PR review — instead of running 20 agents sequentially, the orchestrator fans them out across parallel sessions. Or team-based implementation — one agent writes the feature, another writes tests, a third updates documentation, all coordinated by the harness.
Cross-platform: the workflow is defined in markdown and YAML. A converter CLI transpiles it to OpenCode and Codex format. You're not locked into Claude Code. The harness, agents, and skills are portable. This matters for organizations evaluating multiple tools.
This is where the real power lives — and where coordination complexity explodes. Each agent adds capability but also adds a coordination surface. Keep that tension in mind.
Transition: let me show you the full composed system in action.
-->

---

# Demo: Harness, Agents & Teams

**What to show:**

1. SIW harness — walk through the full loop on a real issue
2. Multi-agent PR review — fan out to specialized agents, aggregate results
3. Team-based execution — parallel agents working a task list

<!--
[T+82:30 | S3c slide 6 of 9 | 7min DEMO]
DEMO SLIDE — do not present this text, use it as a guide.

Part 1 — SIW harness (~3 min):
- Open the SIW workflow in the kramme-cc-workflow project.
- Show siw/PRESENTATION_PLAN.md (the spec). Show siw/OPEN_ISSUES_OVERVIEW.md (the work breakdown). Show a specific issue file with acceptance criteria.
- Show the agent picking up the issue and running the loop: plan, implement, validate.
- "This presentation is being built using the workflow I'm describing. The slide you're looking at was produced by the SIW harness."

Part 2 — Multi-agent review (~3 min):
- Trigger /review on a PR or diff.
- Show the agent reading review agent definitions (the markdown persona files).
- Show it fanning out to multiple reviewers.
- Show the aggregated output — findings by category, severity, recommendation.
- The audience should see that 20 perspectives ran in the time it takes to read the diff once.

Part 3 — Team execution (~2 min):
- Show a team-based execution: the lead agent breaking a task into subtasks, spawning workers, coordinating results.
- This is the "fleet of agents" pattern. If time is short, show the team configuration and describe the execution flow verbally.

Total: ~6-8 minutes. This is the centerpiece demo of Section 3 — it brings together everything from concepts, tools, and composed systems.
FALLBACK: If the live demo fails, walk through the SIW files statically (siw/PRESENTATION_PLAN.md, an issue file, the resulting section file). For multi-agent review, show the agent markdown persona files in the .agents/ directory and describe the fan-out pattern verbally. For team execution, describe the pattern over the slide bullets — the concept is clear without a live demo.
ABORT POINT: If running 10+ minutes over at this point, skip Part 3 (team execution) and describe it verbally in 30 seconds.
Transition: before we discuss, a few open-source starting points if you want to try this yourself.
-->

---

# Starting Points

<v-click>

**Superpowers** — Design-first agentic skills framework. Composable skill library with autonomous planning and execution.

</v-click>
<v-click>

**GET SHIT DONE** — Phase-based meta-prompting with XML-structured tasks and multi-agent orchestration.

</v-click>
<v-click>

**Compound Engineering Plugin** — Claude Code plugin with /plan, /work, /review commands. 80% planning, 20% execution.

</v-click>

<!--
[T+83:45 | S3c slide 7 of 9 | 1.5min]
These three open-source repos each take a different angle on the composed systems we just demonstrated:
- Superpowers (obra/Jesse): skills-first. Composable skill library with TDD, debugging, code review, and autonomous planning. Closest to the "specialized agents" pattern. github.com/obra/superpowers
- GET SHIT DONE (TÂCHES): process-first. Enforces strict phases (init → discuss → research → plan → execute → test) with XML task definitions. Closest to the "harness" pattern. github.com/gsd-build/get-shit-done
- Compound Engineering Plugin (EveryInc): lightest-touch. Plugs into Claude Code with opinionated commands. Core insight is the 80/20 planning-to-execution split. Closest to a starter harness. github.com/EveryInc/compound-engineering-plugin

All three are open-source and actively maintained. Links will be in the shared slides.
You don't have to build from scratch. Pick the one whose philosophy matches yours and adapt it.
-->

---
layout: center
class: text-center
---

# Which of these layers feels most relevant to your work?

What would you try first?

<!--
[T+85:45 | S3c slide 8 of 9 | 6min DISCUSSION]
DISCUSSION PROMPT — pause here for 5-7 minutes. This closes all of Section 3 (concepts, tools, composed systems).

The dual prompt is deliberate: "most relevant" invites reflection on current needs; "try first" invites commitment to action.
Prompt follow-ups:
- "We covered three layers: concepts (context engineering, specs), tools (skills, MCP, hooks), and composed systems (harnesses, agents, teams). Where would you start?"
- "For those already using Copilot: what's the first thing from today that you'd add to your workflow?"
- "For product/UX: which of these patterns would change how you work with your dev team?"
- "What feels achievable in the next month? What feels like a six-month investment?"
Listen for: practical ideas about what to try, questions about team adoption, and — critically — concerns about complexity. The complexity concerns are the bridge.
Bridge to Section 4: after the discussion, say: "You may have noticed something in that last section. Each layer we added — from a single harness to specialized agents to multi-agent teams — added power. But it also added coordination cost. More things to understand, more things that can break, more things you didn't personally write. That accumulation has a name." Transition to the break slide.
-->

---
layout: center
class: text-center
---

# Break

Back in 5 minutes

<!--
[T+91:45 | S3c slide 9 of 9 | 5min BREAK]
COMFORT BREAK — This falls at approximately the session midpoint. Announce: "Good stopping point. Let's take five minutes." Adjust the countdown timer when resuming.
After the break, transition to Section 4: Cognitive Debt.
-->
