# ISSUE-P1-005: Section 3c — The New Stack: Composed Systems

**Status:** Ready | **Priority:** High | **Phase:** 1 | **Related:** Blocked by G-001

## Problem

Create ~6-8 slides for the third part of Section 3: composed systems built from the individual tools. Covers harnesses, specialized agents, multi-agent teams, and cross-platform support.

## Context

After tools (P1-004), this shows how they compose into larger systems. This is where the real power becomes visible — and where the coordination challenge emerges (bridging to Section 4's cognitive debt theme).

## Scope

### In Scope
- ~6-8 slides covering:
  - **Harnesses & verification loops** — plan → implement → test → review. SIW as a concrete harness. Demo: walk through the full SIW loop.
  - **Specialized agents** — 20 review agents (code, security, architecture, UX, a11y, performance). Each is a markdown file with a focused persona. Demo: multi-agent PR review.
  - **Multi-agent teams** — parallel agents, orchestration. Team-based PR review and implementation. Demo: team-based execution.
  - **Cross-platform** — converter CLI that transpiles to OpenCode and Codex. Not locked to one tool.
- Presenter notes
- Demo placeholders
- Discussion prompt at end of full Section 3: "Which of these layers feels most relevant? What would you try first?"

### Out of Scope
- Individual tool explanations (P1-004)
- Risks of these systems (Section 4)

## Acceptance Criteria

- [ ] 6-8 slides created
- [ ] Harness concept shown with SIW as example
- [ ] Multi-agent shown as a real workflow, not abstract
- [ ] Cross-platform mentioned as ecosystem point
- [ ] Every slide has presenter notes
- [ ] Demo placeholders present
- [ ] Section 3 discussion prompt at end
- [ ] One idea per slide
- [ ] `npm run dev` renders without errors

## Validation

- [ ] Slide count within range
- [ ] Sources referenced: `coordination-hardest-engineering-problem.md`, `entire-announcement.md`
- [ ] Bridges naturally to Section 4 (cognitive debt)

---

## Technical Notes

### Key Sources
- `sources/coordination-hardest-engineering-problem.md`
- `sources/entire-announcement.md`

### Case Study
- kramme-cc-workflow: SIW harness, 20 specialized agents, team-based execution, cross-platform converter

### Dependencies
- Blocked by: G-001
- Blocks: None
