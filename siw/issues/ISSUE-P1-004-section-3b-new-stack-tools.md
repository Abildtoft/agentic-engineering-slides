# ISSUE-P1-004: Section 3b — The New Stack: Tools

**Status:** DONE | **Priority:** High | **Phase:** 1 | **Related:** Blocked by G-001

## Problem

Create ~9-10 slides for the second part of Section 3: the individual tools in the new developer toolkit. Covers skills, MCP, and hooks.

## Context

After P1-003 establishes the conceptual foundation, this part shows the specific tools. Each is demonstrated with real examples from the kramme-cc-workflow plugin.

## Scope

### In Scope
- ~9-10 slides covering:
  - **Skills** — reusable agent capabilities. The plugin ships 48 skills. Demo: invoke a skill, show what it does under the hood — it's just a markdown file.
  - **MCP (Model Context Protocol)** — connecting agents to external tools, databases, APIs. Demo: show an MCP server in action (e.g., Linear integration, browser automation).
  - **Hooks** — PreToolUse (block rm -rf, validate git), PostToolUse (auto-format), Stop (surface PR links). Demo: show a hook catching a dangerous command.
- Presenter notes with talking points
- Demo placeholder slides for each tool

### Out of Scope
- Conceptual framing (P1-003)
- Composed systems (P1-005)

## Acceptance Criteria

- [x] 9-10 slides created (10 slides)
- [x] Skills concept explained with concrete plugin examples
- [x] MCP explained with a practical demo scenario
- [x] Hooks explained with all three types (PreToolUse, PostToolUse, Stop)
- [x] Every slide has presenter notes
- [x] Demo placeholders present with notes on what to show
- [x] One idea per slide
- [x] `yarn dev` renders without errors

## Validation

- [x] Slide count within range (10)
- [x] Each tool is grounded in a real example, not abstract
- [x] Flows naturally from P1-003 and into P1-005

---

## Technical Notes

### Case Study
- kramme-cc-workflow plugin: 48 skills, hook system, cross-platform support

### Dependencies
- Blocked by: G-001
- Blocks: None

## Resolution

10 slides created in `sections/03b-new-stack-tools.md`:
1. Section divider — frames three building blocks with transition from 3a
2. Skills — markdown files as reusable agent capabilities (4 v-clicks: definition, scale, mechanic, reframe)
3. Demo: Skills — open a skill file, invoke it, show output (~3 min)
4. Quote bridge — Tacho/Fowler "DevEx = AgentEx" — bridges Skills to Guardrails/MCP/Hooks
5. Guardrails framing slide — constraints and boundaries as a first-class system concept
6. MCP — standard protocol for agent-to-tool connection (3 v-clicks: definition, mechanism, examples)
7. Hooks — three types: PreToolUse, PostToolUse, Stop (3 v-clicks, one per type)
8. Statement — "You don't make agents trustworthy by watching them. You make them trustworthy by designing the system they operate in."
9. Demo: MCP & Hooks — combined demo showing integration and safety (~4-5 min)
10. Discussion prompt — "Which of these three — skills, MCP, or hooks — would fit your workflow with the least friction?"

Design decisions:
- Two demos (Skills solo, MCP+Hooks combined) — avoids choppy 3-demo cycle
- Added a short discussion slide in 3b to break the long stretch between 3a and 3c discussions
- Quote as bridge between two demo blocks — provides conceptual breather
- Sources: Monarch (validation loops), Fowler/Tacho (DevEx=AgentEx), Entire (agent interop), Piroune (coordination)
