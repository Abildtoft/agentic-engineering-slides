# ISSUE-P1-001: Section 1 — The Shift Is Here

**Status:** Ready | **Priority:** High | **Phase:** 1 | **Related:** Blocked by G-001

## Problem

Create 8-10 slides for Section 1: the opening that establishes where we are and why this moment matters. Sets the tone for the entire session.

## Context

This is the opening section. The audience is on Copilot — meet them there. Establish that AI coding has shifted from autocomplete to something fundamentally different. Frame the historical context (rising abstraction) so the rest of the talk has a foundation.

## Scope

### In Scope
- 8-10 slides covering: current moment, 4% GitHub stat, Grady Booch abstraction history, model capabilities changing rapidly, "this is the next compiler"
- Presenter notes with talking points and source attributions
- Demo placeholder slide: Copilot autocomplete vs. agentic task completion
- Discussion prompt slide at end

### Out of Scope
- Detailed tool comparisons (that's Section 3)

## Acceptance Criteria

- [ ] 8-10 slides created
- [ ] Sources referenced: `rising-levels-of-abstraction.md`, `four-percent-github-claude-code.md`, `model-capabilities-change-rapidly.md`, `silent-sirens.md`
- [ ] Every slide has presenter notes with talking points
- [ ] Demo placeholder slide present with notes on what to show
- [ ] Section ends with discussion prompt: "What's your experience been with Copilot so far?"
- [ ] One idea per slide — no walls of text
- [ ] `npm run dev` renders all slides without errors

## Validation

- [ ] Slide count within range
- [ ] All four sources represented
- [ ] Read-through: opening hooks the audience and sets up Section 2

---

## Technical Notes

### Key Sources
- `sources/rising-levels-of-abstraction.md` — Grady Booch quote
- `sources/four-percent-github-claude-code.md` — GitHub stat
- `sources/model-capabilities-change-rapidly.md` — Head of Claude Code quote
- `sources/silent-sirens.md` — Jack Clark on the pace

### Dependencies
- Blocked by: G-001
- Blocks: None (P1 tasks are independent)
