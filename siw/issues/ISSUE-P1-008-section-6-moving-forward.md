# ISSUE-P1-008: Section 6 — Moving Forward

**Status:** DONE | **Priority:** High | **Phase:** 1 | **Related:** Blocked by G-001

## Problem

Create 8-10 slides for Section 6: the closing — practical guidance and the road ahead. End on a note that's honest but forward-looking.

## Context

The final section synthesizes everything. After the toolkit (power), cognitive debt (risk), and skills that matter (values), this section asks: so what do you actually do? The final bottleneck framing ties it together — you were always the bottleneck, and that's not a bad thing.

## Scope

### In Scope
- 8-10 slides covering:
  - The final bottleneck is you — and it always was (Ronacher)
  - Oxide: responsibility to product, customers, and each other
  - The next two years: practical advice for juniors and seniors
  - Dario Amodei: the adolescence of technology
  - The craft evolves. It always has. But it remains craft.
- Presenter notes with source attributions
- Demo placeholder: full agentic workflow recap — the human role throughout
- Closing prompt: "What's one thing you'll do differently starting tomorrow?"

### Out of Scope
- Re-explaining concepts from earlier sections

## Acceptance Criteria

- [x] 8-10 slides created (10 slides)
- [x] Sources referenced: `the-final-bottleneck.md`, `using-llms-at-oxide.md`, `next-two-years-of-software-engineering.md`, `adolescence-of-technology.md`, `the-best-engineers-never-just-wrote-code.md` (5/6 — `my-ai-adoption-journey.md` is an empty stub with no usable content)
- [x] Ends with a strong closing statement and audience prompt
- [x] Demo placeholder present with notes
- [x] Every slide has presenter notes
- [x] One idea per slide
- [x] `yarn build` succeeds without errors

## Validation

- [x] Slide count within range (10)
- [x] 5 of 6 sources represented (Hashimoto source is empty stub — skipped)
- [x] Read-through: the ending feels earned, not preachy

## Resolution

10 slides implementing the closing section:

1. Section opener — "You were always the bottleneck"
2. Ronacher quote — "I was the bottleneck all along"
3. Bottleneck cascade — textile analogy + accountability argument (3 v-clicks)
4. Oxide quote — responsibility to product, customers, one another
5. Two-cols — practical advice for earlier-career (left) and senior (right)
6. Demo placeholder — human in the loop recap: spec → harness → output
7. Amodei/Sagan — "How did you survive this technological adolescence?" + v-click
8. Statement — "The craft evolves. It always has. But it remains craft."
9. Discussion close — "What's one thing you'll do differently starting tomorrow?"
10. Resources slide with links to kramme-cc-workflow, Superpowers, GET SHIT DONE, and Compound Engineering Plugin

Hashimoto source (`my-ai-adoption-journey.md`) skipped — file contains only a title and URL with no content.

---

## Technical Notes

### Key Sources
- `sources/the-final-bottleneck.md` — Ronacher, the throughline
- `sources/using-llms-at-oxide.md` — responsibility framing
- `sources/next-two-years-of-software-engineering.md` — practical advice
- `sources/adolescence-of-technology.md` — Amodei, the bigger picture
- `sources/the-best-engineers-never-just-wrote-code.md` — closing callback
- `sources/my-ai-adoption-journey.md` — Mitchell Hashimoto

### Dependencies
- Blocked by: G-001
- Blocks: None
