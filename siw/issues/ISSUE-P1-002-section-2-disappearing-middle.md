# ISSUE-P1-002: Section 2 — The Disappearing Middle

**Status:** DONE | **Priority:** High | **Phase:** 1 | **Related:** Blocked by G-001

## Problem

Create 10-12 slides for Section 2: what's actually changing about how software gets made. The implementation middle is compressing — value moves to intent and judgment.

## Context

This section bridges from "here's what's happening" (Section 1) to "here's what you need to learn" (Section 3). It needs to land for the non-dev audience too — UX and product people should see themselves in this narrative. The PM/engineering convergence angle is key for them.

## Scope

### In Scope
- 10-12 slides covering: disappearing middle, "code is cheap / show me the talk", coding vs. building (Karpathy), prototype is the new PRD, spec becoming the product, cost of building → zero
- Presenter notes with talking points and source attributions
- Discussion prompt at end targeting mixed audience

### Out of Scope
- Tool-specific content (Section 3)
- Risks of this shift (Section 4)

## Acceptance Criteria

- [x] 10-12 slides created
- [x] Sources referenced: `disappearing-middle-of-software-work.md`, `code-is-cheap.md`, `karpathy-coding-vs-building.md`, `prototype-is-the-new-prd.md`, `modern-ai-pm.md`, `sprints-cost-of-building-zero.md`
- [x] Every slide has presenter notes
- [x] Discussion prompt: "For product/UX — how does your work change when building is fast and cheap? For devs — what part of your work feels most at risk?"
- [x] Accessible to non-developer roles
- [x] One idea per slide
- [x] `npm run dev` renders without errors

## Validation

- [x] Slide count within range
- [x] All six sources represented
- [x] Read-through: UX/product audience members can follow the argument

---

## Technical Notes

### Key Sources
- `sources/disappearing-middle-of-software-work.md` — Karri Saarinen
- `sources/code-is-cheap.md` — Linus inverted
- `sources/karpathy-coding-vs-building.md` — the split
- `sources/prototype-is-the-new-prd.md` — Andrew Chen
- `sources/modern-ai-pm.md` — PM role compression
- `sources/sprints-cost-of-building-zero.md` — design sprints shifting

### Dependencies
- Blocked by: G-001
- Blocks: None

## Resolution

12 slides written to `sections/02-disappearing-middle.md`:

1. Section divider (section layout)
2. The Middle of Software Work — defines the concept with Karri Saarinen quote (progressive reveal)
3. "My belief is that this is changing." (statement)
4. Linus inversion — "Talk is cheap" → "Good talk is exponentially more valuable" (quote, progressive reveal)
5. Code as commodity, critical thinking as bottleneck (statement)
6. Karpathy: coding vs. building split (quote)
7. Andrew Chen: prototype is the new PRD (quote)
8. PM translation layer compressing — Before/Now/spec-is-product (progressive reveal)
9. "Knowing what to build didn't get easier. It got more important." (statement)
10. Lenny Sanudo: sprints repurposed when building costs → zero (quote)
11. Compressing vs. Expanding two-column summary (two-cols)
12. Dual discussion prompt for product/UX and devs (center)

All 6 sources represented. Narrative arc: establish compression → show inversion → show role changes → synthesize → discuss.
