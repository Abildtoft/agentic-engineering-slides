# ISSUE-P1-006: Section 4 — Cognitive Debt

**Status:** Ready | **Priority:** High | **Phase:** 1 | **Related:** Blocked by G-001

## Problem

Create 12-15 slides for Section 4: cognitive debt as the framing concept for all the risks of AI-assisted development. This is the emotional core of the talk.

## Context

After the excitement of Section 3 (the toolkit), this section is the counterweight. Cognitive debt is the hidden cost of velocity without understanding. Every other risk — paralysis, competence loss, agent psychosis — is a manifestation of it. The section should also bridge to the antidote (Section 5).

## Scope

### In Scope
- 12-15 slides structured as:
  - **The concept:** Peter Naur (program as theory), cognitive debt defined, Storey's student team anecdote, Willison's "lost my mental model", velocity without understanding
  - **How it shows up:** vibe coding paralysis (confidence spiral, planning loop, completionist trap, context collapse), outsourcing understanding ("seven times seven"), senior engineer who quit, agent psychosis, "not zero effort"
  - **The antidote (bridge):** asking "why" vs. code vending machine, one human must understand each change, document the why, rebuild shared understanding
- Presenter notes with source attributions
- Discussion prompt: "Have you felt any of this? Do you understand what your tools produce?"

### Out of Scope
- Solutions and skills (Section 5)
- Tool-specific content

## Acceptance Criteria

- [ ] 12-15 slides created
- [ ] Sources referenced: `cognitive-debt.md`, `more-on-cognitive-debt.md`, `vibe-coding-paralysis.md`, `outsourcing-understanding-to-ai.md`, `senior-engineer-quitting.md`, `not-zero-effort.md`, `agent-psychosis.md`, `osmani-on-anthropic-study.md`
- [ ] Cognitive debt is clearly defined early in the section
- [ ] Other risks are framed as manifestations of cognitive debt
- [ ] Antidote bridge leads naturally to Section 5
- [ ] Every slide has presenter notes
- [ ] Discussion prompt at end
- [ ] One idea per slide
- [ ] `npm run dev` renders without errors

## Validation

- [ ] Slide count within range
- [ ] All eight sources represented
- [ ] Emotional impact: this section should make people pause and reflect

---

## Technical Notes

### Key Sources
- `sources/cognitive-debt.md` — Willison citing Storey
- `sources/more-on-cognitive-debt.md` — Storey's full piece, Naur reference
- `sources/vibe-coding-paralysis.md` — confidence spiral, patterns
- `sources/outsourcing-understanding-to-ai.md` — "seven times seven"
- `sources/senior-engineer-quitting.md` — the 15-year engineer
- `sources/not-zero-effort.md` — leverage vs. grift
- `sources/agent-psychosis.md` — Ronacher
- `sources/osmani-on-anthropic-study.md` — passive reliance

### Dependencies
- Blocked by: G-001
- Blocks: None
