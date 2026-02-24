# ISSUE-P1-004: Section 3b — The New Stack: Tools

**Status:** Ready | **Priority:** High | **Phase:** 1 | **Related:** Blocked by G-001

## Problem

Create ~6-8 slides for the second part of Section 3: the individual tools in the new developer toolkit. Covers skills, MCP, and hooks.

## Context

After P1-003 establishes the conceptual foundation, this part shows the specific tools. Each is demonstrated with real examples from the kramme-cc-workflow plugin.

## Scope

### In Scope
- ~6-8 slides covering:
  - **Skills** — reusable agent capabilities. The plugin ships 48 skills. Demo: invoke a skill, show what it does under the hood — it's just a markdown file.
  - **MCP (Model Context Protocol)** — connecting agents to external tools, databases, APIs. Demo: show an MCP server in action (e.g., Linear integration, browser automation).
  - **Hooks** — PreToolUse (block rm -rf, validate git), PostToolUse (auto-format), Stop (surface PR links). Demo: show a hook catching a dangerous command.
- Presenter notes with talking points
- Demo placeholder slides for each tool

### Out of Scope
- Conceptual framing (P1-003)
- Composed systems (P1-005)

## Acceptance Criteria

- [ ] 6-8 slides created
- [ ] Skills concept explained with concrete plugin examples
- [ ] MCP explained with a practical demo scenario
- [ ] Hooks explained with all three types (PreToolUse, PostToolUse, Stop)
- [ ] Every slide has presenter notes
- [ ] Demo placeholders present with notes on what to show
- [ ] One idea per slide
- [ ] `npm run dev` renders without errors

## Validation

- [ ] Slide count within range
- [ ] Each tool is grounded in a real example, not abstract
- [ ] Flows naturally from P1-003 and into P1-005

---

## Technical Notes

### Case Study
- kramme-cc-workflow plugin: 48 skills, hook system, cross-platform support

### Dependencies
- Blocked by: G-001
- Blocks: None
