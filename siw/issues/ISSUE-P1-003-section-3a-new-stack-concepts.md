# ISSUE-P1-003: Section 3a — The New Stack: Concepts

**Status:** DONE | **Priority:** High | **Phase:** 1 | **Related:** Blocked by G-001

## Problem

Create ~6-8 slides for the first part of Section 3: the conceptual foundation of the new developer toolkit. Covers the spectrum of autonomy, context engineering, and prompt/spec-driven development.

## Context

Section 3 is the practical core of the session (~35 min total, split across 3 issues). This first part sets up the conceptual framework before diving into specific tools. The kramme-cc-workflow plugin is the running case study throughout.

## Scope

### In Scope
- ~6-8 slides covering:
  - **From autocomplete to agents** — the spectrum: inline autocomplete (Copilot) → AI-assisted editing (Cursor, Copilot Chat) → agentic coding (Claude Code, Codex, OpenCode)
  - **Context engineering** — CLAUDE.md, AGENTS.md, project context files. Your codebase is the prompt. Demo: show how the plugin's context files shape agent behavior.
  - **Prompt engineering for code** — writing specs agents can execute, iterative prompting, focused chunks. Demo: SIW workflow — spec → issues → implementation.
- Presenter notes with talking points
- Demo placeholder slides where indicated

### Out of Scope
- Specific tools (skills, MCP, hooks) — that's P1-004
- Composed systems (harnesses, multi-agent) — that's P1-005

## Acceptance Criteria

- [x] 6-8 slides created
- [x] Autonomy spectrum is clear and visually communicated
- [x] Context engineering explained with concrete examples from kramme-cc-workflow
- [x] Spec-driven development introduced with SIW as example
- [x] Every slide has presenter notes
- [x] Demo placeholders present with notes on what to show
- [x] One idea per slide
- [x] `yarn dev` renders without errors

## Validation

- [x] Slide count within range
- [x] Non-developer audience can follow the concepts
- [x] Flows naturally into P1-004 (specific tools)

---

## Technical Notes

### Key Sources
- `sources/llm-coding-workflow-2026.md` — Osmani's iterative workflow
- `sources/monarchs-philosophy-on-ai.md` — validation loops

### Case Study
- kramme-cc-workflow plugin: CLAUDE.md, AGENTS.md, SIW workflow

### Dependencies
- Blocked by: G-001
- Blocks: None

## Resolution

8 slides created in `sections/03a-new-stack-concepts.md`:
1. Section divider — frames three-part Section 3 structure
2. From Writing Code to Designing Systems — introduces context engineering + spec-driven development as two pillars
3. Context Engineering — CLAUDE.md, AGENTS.md, project context files with v-click progression
4. Statement — "Good documentation went from 'nice to have' to the single biggest lever on agent output quality"
5. Spec-Driven Development — iterative chunks, spec → implement → verify → refine
6. Osmani quote — "LLMs do best when given focused prompts"
7. Demo — context files + SIW workflow (combined demo slot, ~5-6 min)
8. Discussion — "What context would your agents need to be effective in your codebase?"

Design decisions:
- No repeat of autonomy spectrum (already in Section 1 slide 3) — instead goes deeper into what changes at the agentic level
- "Prompt engineering for code" reframed as "spec-driven development" to avoid overloaded terminology and connect to Section 2's throughline
- Single combined demo slot covering both concepts rather than two interruptions
- Sources: Osmani (workflow + clarity merchants), Monarch (validation loops), Entire (spec-driven), Fowler/Tacho (DevEx = AgentEx)
