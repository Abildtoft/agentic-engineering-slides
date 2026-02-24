# Agentic Engineering: Developers Moving Forward

## Overview

Slidev presentation for a 2.5-hour session at a MedTech company in Copenhagen. The session covers how AI is reshaping software engineering — the shifting value of developers, cognitive debt, the junior pipeline crisis, and what it means to be an engineer when code generation approaches zero cost. Includes hands-on coverage of the new developer toolkit: skills, MCPs, hooks, context engineering, harnesses, and multi-agent teams.

**Status:** Planning
**Created:** 2026-02-23

## Audience

- **Size:** 10-15 attendees
- **Roles:** Developers, UX, Product (mixed)
- **Current AI tooling:** GitHub Copilot, some OpenCode
- **Implication:** Audience is familiar with AI-assisted coding but not yet deep into agentic workflows (Claude Code, multi-agent, spec-driven development). The talk should meet them where they are and take them forward — not assume they're already living in the agentic world.

## Format

- **Duration:** 2.5 hours
- **Style:** This is a session, not a keynote — room for discussion, Q&A, and reflection between sections
- **Pacing:** ~60-80 slides with natural pause points for conversation

## Objectives

- [x] Define talk structure and narrative arc
- [ ] Create slides from source material in `sources/`
- [ ] Add presenter notes with talking points and source attributions
- [ ] Build in discussion prompts / pause points for the audience
- [ ] Style and polish the presentation
- [ ] Export to PDF for backup

## Scope

### In Scope
- Slide content and structure
- Presenter notes
- Visual styling and layout
- Source attribution
- Discussion prompts at section transitions
- Live demo placeholders (slides marking where demos happen + presenter notes on what to show)

### Out of Scope
- Video recording
- Printed handouts

## Success Criteria

- [ ] Coherent narrative arc from start to finish
- [ ] Each slide conveys one clear idea
- [ ] Presenter notes cover talking points for every slide
- [ ] Natural pause points for discussion every 15-20 minutes
- [ ] Accessible to non-developer roles (UX, Product)
- [ ] Presentation runs cleanly in Slidev dev server

---

## Narrative Structure

### Section 1: The Shift Is Here (~15 min, 8-10 slides)
*Where we are, and why it feels different this time*

- The current moment: from Copilot to agents
- 4% of GitHub code is now Claude Code output
- Grady Booch: rising levels of abstraction (assembly → compilers → AI)
- Model capabilities change rapidly (Head of Claude Code quote)
- This isn't hype — it's the next compiler

**Sources:** `rising-levels-of-abstraction.md`, `four-percent-github-claude-code.md`, `model-capabilities-change-rapidly.md`, `silent-sirens.md`

**Demo:** Quick taste — Copilot autocomplete vs. agentic task completion

**Discussion:** *What's your experience been with Copilot so far?*

---

### Section 2: The Disappearing Middle (~20 min, 10-12 slides)
*What's actually changing about how software gets made*

- Karri Saarinen: the middle of software work is compressing
- "Code is cheap. Show me the talk" — Linus inverted
- Karpathy: coding vs. building — the split
- The prototype is the new PRD
- The spec is becoming the product — PM/engineering convergence
- Cost of building → zero; value moves to intent and judgment

**Sources:** `disappearing-middle-of-software-work.md`, `code-is-cheap.md`, `karpathy-coding-vs-building.md`, `prototype-is-the-new-prd.md`, `modern-ai-pm.md`, `sprints-cost-of-building-zero.md`

**Discussion:** *For product/UX — how does your work change when building is fast and cheap? For devs — what part of your work feels most at risk?*

---

### Section 3: The New Developer Toolkit (~35 min, 18-22 slides)
*What you actually need to learn — hands-on*

The practical core of the session. Walk through the new stack layer by layer, using the **kramme-cc-workflow plugin** (https://github.com/Abildtoft/kramme-cc-workflow) as a running case study — it touches every layer, so each concept gets demonstrated with a real tool instead of explained abstractly.

- **From autocomplete to agents** — the spectrum of autonomy: inline autocomplete (Copilot) → AI-assisted editing (Cursor, Copilot Chat) → agentic coding (Claude Code, Codex, OpenCode). What changes at each level.
- **Context engineering** — CLAUDE.md, AGENTS.md, project context files. Your codebase is the prompt. Good documentation is now a force multiplier. *Demo: show how the plugin's CLAUDE.md and AGENTS.md shape agent behavior.*
- **Prompt engineering for code** — writing specs that agents can execute. Iterative prompting. Breaking work into focused chunks. *Demo: SIW workflow — spec → issues → focused implementation.*
- **Skills** — reusable agent capabilities. Installing, using, creating them. The plugin ships 48 skills across PR lifecycle, code quality, git ops, and structured workflows. *Demo: invoke a skill, show what it does under the hood — it's just a markdown file with instructions.*
- **MCP (Model Context Protocol)** — connecting agents to external tools, databases, APIs. What it is, why it matters. *Demo: show an MCP server in action (e.g., Linear integration, browser automation).*
- **Hooks** — automated validation, formatting, safety checks that run alongside agents. The plugin uses PreToolUse hooks (block rm -rf, validate git commands), PostToolUse hooks (auto-format on save), and Stop hooks (surface PR/issue links). *Demo: show a hook catching a dangerous command.*
- **Harnesses & verification loops** — designing the system around the agent: plan → implement → test → review. SIW is a harness: spec → issue-define → issue-implement → audit. *Demo: walk through the full SIW loop.*
- **Specialized agents** — the plugin ships 20 review agents (code, security, architecture, UX, accessibility, performance). Each is a markdown file with a focused persona. *Demo: run a multi-agent PR review — show agents working in parallel.*
- **Multi-agent teams** — running parallel agents, coordination, the orchestration challenge. The plugin supports team-based execution for PR review and issue implementation. *Demo: team-based implementation or review.*
- **Cross-platform** — the plugin includes a converter CLI that transpiles Claude Code skills to OpenCode and Codex formats. The ecosystem isn't locked to one tool.

**Sources:** `llm-coding-workflow-2026.md`, `monarchs-philosophy-on-ai.md`, `coordination-hardest-engineering-problem.md`, `entire-announcement.md`

**Case study:** kramme-cc-workflow plugin — https://github.com/Abildtoft/kramme-cc-workflow

**Discussion:** *Which of these layers feels most relevant to your current work? What would you try first?*

---

### Section 4: Cognitive Debt (~25 min, 12-15 slides)
*The hidden cost of going fast*

Cognitive debt is the framing concept for this section. It's not just technical debt in the code — it's the debt that accumulates in your head when you stop understanding what you're building. Every other risk in this section is a manifestation of cognitive debt.

**The concept:**
- Peter Naur: a program is a theory that lives in the minds of its developers — not just source code
- Cognitive debt = the gap between what the system does and what the team understands
- Margaret-Anne Storey's student team: they hit a wall at week 7 — no one could explain why anything was built the way it was. They had accumulated cognitive debt faster than technical debt.
- Simon Willison: "I no longer have a firm mental model of what my projects can do"
- Velocity without understanding is not sustainable

**How it shows up:**
- Vibe coding paralysis — the confidence spiral: AI writes → you don't understand → you prompt again → you understand less → spiral continues
- The planning loop, the completionist trap, the context collapse — all forms of losing the plot
- Outsourcing understanding → loss of competence ("seven times seven" — you stop internalizing fundamentals)
- The senior engineer who quit — his entire job became rubber-stamping code he didn't write
- Agent psychosis (Ronacher) — when you can no longer tell what's real in your own codebase
- "Not zero effort" — the line between leverage and hollowness

**The antidote (bridge to Section 5):**
- "AI doesn't make you dumber; passive reliance does" — the difference is asking "why"
- At least one human must fully understand each AI-generated change before it ships
- Document not just _what_ changed but _why_
- Regular checkpoints where the team rebuilds shared understanding

**Sources:** `cognitive-debt.md`, `more-on-cognitive-debt.md`, `vibe-coding-paralysis.md`, `outsourcing-understanding-to-ai.md`, `senior-engineer-quitting.md`, `not-zero-effort.md`, `agent-psychosis.md`, `osmani-on-anthropic-study.md`

**Discussion:** *Have you felt any of this? Do you understand what your tools produce? How does your team maintain shared understanding today?*

---

### Section 5: The Junior Pipeline & What Matters (~25 min, 12-15 slides)
*The long-term risk and the skills that survive*

**The pipeline problem:**
- AI amplifies seniors but starves the pipeline that creates them
- 10,000 hours of practice — can you skip it?
- Pathways to mastery disappearing (HBR)
- Camille Fournier: "everyone becomes a manager" fatigue
- Trio-programming: senior + junior + AI
- The Whispering Earring — what happens when you stop thinking

**What matters now:**
- The best engineers never just wrote code — clarity merchants
- Judgment, taste, systems thinking (Osmani)
- Paul Graham: "taste will become even more important"
- On subtraction — conviction over accumulation
- Coordination is the hardest engineering problem
- DevEx = AgentEx (Martin Fowler / Laura Tacho)
- AI doesn't make you dumber; passive reliance does

**Sources:** `developer-pipeline-getting-strangled.md`, `ai-changing-how-we-learn-at-work.md`, `techs-new-generation-end-of-thinking.md`, `the-best-engineers-never-just-wrote-code.md`, `bottleneck-judgment-taste-systems-thinking.md`, `taste-even-more-important.md`, `on-subtraction.md`, `martin-fowler.md`, `juniors-go-all-in-on-system-design.md`

**Discussion:** *How does your team onboard juniors? What does "taste" mean in your product?*

---

### Section 6: Moving Forward (~20 min, 8-10 slides)
*The road ahead*

- The final bottleneck is you — and it always was (Armin Ronacher)
- Oxide: responsibility to product, customers, and each other
- The next two years: practical advice for juniors and seniors
- Dario Amodei: the adolescence of technology — surviving this passage
- The craft evolves. It always has. But it remains craft.

**Sources:** `the-final-bottleneck.md`, `using-llms-at-oxide.md`, `next-two-years-of-software-engineering.md`, `adolescence-of-technology.md`, `the-best-engineers-never-just-wrote-code.md`, `my-ai-adoption-journey.md`

**Demo:** Full agentic workflow recap — the human role throughout

**Closing:** *What's one thing you'll do differently starting tomorrow?*

---

## Timing Summary

| Section | Duration | Slides (est.) |
|---------|----------|---------------|
| 1. The Shift Is Here | ~15 min | 8-10 |
| 2. The Disappearing Middle | ~20 min | 10-12 |
| 3. The New Developer Toolkit | ~35 min | 18-22 |
| 4. The Risks | ~25 min | 12-15 |
| 5. Pipeline & What Matters | ~25 min | 12-15 |
| 6. Moving Forward | ~20 min | 8-10 |
| **Total** | **~140 min** | **~68-84** |

~10 min buffer for overruns and a break.

---

## Tasks

Tasks will be tracked in individual issue files. See `siw/OPEN_ISSUES_OVERVIEW.md` for active work.

## Design Decisions

Key decisions will be documented in `siw/LOG.md` as they are made.

## References

- Issues: `siw/OPEN_ISSUES_OVERVIEW.md`
- Progress: `siw/LOG.md`
- Source material: `sources/`
