# ISSUE-P1-005: Section 3c — The New Stack: Composed Systems

**Status:** DONE | **Priority:** High | **Phase:** 1 | **Related:** Blocked by G-001

## Problem

Create ~8-10 slides for the third part of Section 3: composed systems built from the individual tools. Covers harnesses, specialized agents, multi-agent teams, and cross-platform support.

## Context

After tools (P1-004), this shows how they compose into larger systems. This is where the real power becomes visible — and where the coordination challenge emerges (bridging to Section 4's cognitive debt theme).

## Scope

### In Scope
- ~8-10 slides covering:
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

- [x] 8-10 slides created (9 slides)
- [x] Harness concept shown with SIW as example (slide 2)
- [x] Multi-agent shown as a real workflow, not abstract (slides 4-5)
- [x] Cross-platform mentioned as ecosystem point (slide 5, v-click 3)
- [x] Every slide has presenter notes
- [x] Demo placeholders present (slide 6)
- [x] Section 3 discussion prompt at end (slide 8, before break slide 9)
- [x] One idea per slide
- [x] `yarn build` renders without errors

## Validation

- [x] Slide count within range (9)
- [x] Sources referenced: `coordination-hardest-engineering-problem.md`, `entire-announcement.md`
- [x] Bridges naturally to Section 4 (cognitive debt) — slide 8 discussion notes and slide 9 break

## Resolution

9 slides created following the established 3a/3b style patterns:
1. Section divider
2. Harnesses & Verification Loops (concept, 3 v-clicks)
3. Monarch Engineering quote on designing the human+AI system
4. Specialized Agents (concept, 3 v-clicks) — 20 review agents as fleet
5. Multi-Agent Teams (concept, 3 v-clicks) — parallel execution + cross-platform
6. Demo: Harness, Agents & Teams (~6-8 min centerpiece demo)
7. Starting Points — reworked Vetted Alternatives (Superpowers, GSD, Compound Engineering)
8. Section 3 discussion close with bridge to Section 4 (Cognitive Debt)
9. Break slide to split the session at midpoint before Section 4

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
