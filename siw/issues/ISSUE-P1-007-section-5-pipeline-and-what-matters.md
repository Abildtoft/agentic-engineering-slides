# ISSUE-P1-007: Section 5 — The Junior Pipeline & What Matters

**Status:** DONE | **Priority:** High | **Phase:** 1 | **Related:** Blocked by G-001

## Problem

Create 12-15 slides for Section 5: the long-term pipeline risk and the skills that survive. Two sub-themes — the junior developer crisis and what actually matters now.

## Context

This section follows the cognitive debt wake-up call (Section 4) with two threads: (1) the systemic risk to the profession — where do future senior engineers come from? and (2) the skills that remain valuable — judgment, taste, systems thinking, subtraction. It sets up the closing call to action in Section 6.

## Scope

### In Scope
- 12-15 slides covering:
  - **The pipeline problem:** AI amplifies seniors but starves the pipeline, 10,000 hours question, pathways to mastery disappearing (HBR), "everyone becomes a manager" fatigue (Fournier), trio-programming, The Whispering Earring
  - **What matters now:** clarity merchants, judgment/taste/systems thinking (Osmani), Paul Graham on taste, on subtraction, coordination as hardest problem, DevEx = AgentEx (Fowler/Tacho), passive reliance vs. active engagement
- Presenter notes with source attributions
- Discussion prompt: "How does your team onboard juniors? What does 'taste' mean in your product?"

### Out of Scope
- Practical next steps (Section 6)
- Tool-specific content

## Acceptance Criteria

- [x] 12-15 slides created (14 slides)
- [x] Sources referenced: `developer-pipeline-getting-strangled.md`, `ai-changing-how-we-learn-at-work.md`, `techs-new-generation-end-of-thinking.md`, `the-best-engineers-never-just-wrote-code.md`, `bottleneck-judgment-taste-systems-thinking.md`, `taste-even-more-important.md`, `on-subtraction.md`, `martin-fowler.md`, `juniors-go-all-in-on-system-design.md`
- [x] Both sub-themes (pipeline + what matters) clearly present
- [x] Every slide has presenter notes
- [x] Discussion prompt at end
- [x] One idea per slide
- [x] `yarn dev` renders without errors

## Validation

- [x] Slide count within range (14)
- [x] All nine sources represented
- [x] UX/product audience can engage with the "taste" and "subtraction" themes

---

## Technical Notes

### Key Sources
- `sources/developer-pipeline-getting-strangled.md` — the core pipeline argument
- `sources/ai-changing-how-we-learn-at-work.md` — HBR, pathways to mastery
- `sources/techs-new-generation-end-of-thinking.md` — The Whispering Earring
- `sources/the-best-engineers-never-just-wrote-code.md` — clarity merchants
- `sources/bottleneck-judgment-taste-systems-thinking.md` — Osmani + Cherny
- `sources/taste-even-more-important.md` — Paul Graham
- `sources/on-subtraction.md` — conviction over accumulation
- `sources/martin-fowler.md` — DevEx = AgentEx, Fournier quote
- `sources/juniors-go-all-in-on-system-design.md` — raising the bar

### Dependencies
- Blocked by: G-001
- Blocks: None

## Resolution

14 slides (including section divider) covering both sub-themes. Changes from the initial draft:

1. **Added "passive reliance" statement slide** — spec-required hinge between the pipeline and what-matters halves. Placed after Trio-Programming, before the "revealing" statement.
2. **Surfaced Laura Tacho's "DevEx = AgentEx" quote** on the Fournier/Tacho slide (was notes-only). Replaced Fowler paraphrase that was incorrectly formatted as a direct quote.
3. **Restored full Fournier quote** including the punchline "and now you all get to enjoy it too."
4. **Added "reflexive action" detail** to the Whispering Earring parable for precision.

All 9 sources referenced. Both sub-themes clearly present. Every slide has presenter notes. Discussion prompt at end.
