# ISSUE-P2-002: Visual polish & animations

**Status:** DONE | **Priority:** Medium | **Phase:** 2 | **Related:** Blocked by P2-001

## Problem

Ensure consistent visual quality across the entire deck — layouts, spacing, typography, and tasteful use of animations.

## Context

With 8 people writing slides across different issues (or the same person at different times), visual consistency drifts. This pass ensures the deck looks like one cohesive presentation.

## Scope

### In Scope
- Consistent use of layouts across similar slide types
- Add `v-click` animations where progressive reveal helps (not everywhere)
- Check spacing, typography, and alignment
- Ensure images in `public/` render correctly
- Verify no walls of text remain
- Check dark/light mode rendering if applicable

### Out of Scope
- Content changes (P2-001)
- Export pipeline work

## Acceptance Criteria

- [x] All slides use layouts consistently
- [x] Animations are tasteful and serve the content
- [x] No walls of text
- [x] All images render correctly
- [x] Deck looks cohesive from start to finish
- [x] `yarn build` renders without errors

## Validation

- [x] Build succeeds with zero errors
- [x] Visual quality is professional and consistent

---

## Resolution

### CSS additions to `styles/index.css` (~60 lines added)
- **Statement h1**: increased to 2.25rem / weight 700 for more visual impact
- **Quote attribution (p)**: green, uppercase, 0.95rem — quiet authority
- **Fact h1**: 4rem / weight 800 — data points hit harder
- **Discussion headings**: green color ties them to statement slides
- **Two-cols**: added 1.5rem padding between columns
- **v-click animation**: smoothed from 100ms to 200ms
- **Custom section transition** (`section-shift`): gentle vertical slide+fade for section boundaries
- **Logo breathe keyframe**: moved from inline `<style>` in slides.md to index.css

### Section transitions
- Added `transition: section-shift` to all 8 section divider slides
- All other slides keep the global `fade` default

### No v-click changes
- Reviewed all 88 slides; current v-click distribution is well-considered and intentional
- No additions or removals needed

## Technical Notes

### Dependencies
- Blocked by: P2-001
- Blocks: None
