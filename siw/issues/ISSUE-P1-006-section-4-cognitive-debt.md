# ISSUE-P1-006: Section 4 — Cognitive Debt

**Status:** DONE | **Priority:** High | **Phase:** 1 | **Related:** Blocked by G-001

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

- [x] 12-15 slides created (15 slides)
- [x] Sources referenced: `cognitive-debt.md`, `more-on-cognitive-debt.md`, `vibe-coding-paralysis.md`, `outsourcing-understanding-to-ai.md`, `senior-engineer-quitting.md`, `not-zero-effort.md`, `agent-psychosis.md`, `osmani-on-anthropic-study.md`
- [x] Cognitive debt is clearly defined early in the section (slides 2-3)
- [x] Other risks are framed as manifestations of cognitive debt (slides 7-13)
- [x] Antidote bridge leads naturally to Section 5 (slide 14)
- [x] Every slide has presenter notes
- [x] Discussion prompt at end (slide 15)
- [x] One idea per slide
- [x] `yarn build` succeeds without errors

## Validation

- [x] Slide count within range (15)
- [x] All eight sources represented
- [x] Emotional impact: intellectual grounding → visceral recognition → existential weight → hope/agency → discussion

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

## Resolution

Replaced placeholder stub with 15 slides in `sections/04-cognitive-debt.md`:

1. Section divider with transition from S3
2. Naur quote — "a program is a theory" (intellectual anchor)
3. Cognitive debt defined — 3 v-clicks contrasting with technical debt
4. Storey's student team — two-part wall-at-week-7-8 quote sequence
5. Willison's confession — "lost my mental model"
6. Statement: "Velocity without understanding is not sustainable" (hinge)
7. Confidence spiral — crutch → habit → addiction
8. Patterns of paralysis — "Ralph Wiggum loops"
9. Two-column manifestations: planning loop, coherence bottleneck, context collapse, completionist trap
10. Outsourcing understanding — "seven times seven" calculator analogy
11. Senior engineer who quit — 15 years, loved craft, disappeared
12. Agent psychosis — Ronacher statement
13. Not zero effort — "completely hollow" + turn to choice
14. The antidote — ask why, one human understands, document the why (bridge to S5)
15. Discussion prompt — "Have you felt any of this?"

Build verified: `yarn build` succeeds.
