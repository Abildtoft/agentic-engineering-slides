# ISSUE-P1-003: Section 3a — The New Stack: Concepts

**Status:** Ready | **Priority:** High | **Phase:** 1 | **Related:** Blocked by G-001

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

- [ ] 6-8 slides created
- [ ] Autonomy spectrum is clear and visually communicated
- [ ] Context engineering explained with concrete examples from kramme-cc-workflow
- [ ] Spec-driven development introduced with SIW as example
- [ ] Every slide has presenter notes
- [ ] Demo placeholders present with notes on what to show
- [ ] One idea per slide
- [ ] `npm run dev` renders without errors

## Validation

- [ ] Slide count within range
- [ ] Non-developer audience can follow the concepts
- [ ] Flows naturally into P1-004 (specific tools)

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
