# ISSUE-P2-002: Visual polish & animations

**Status:** Ready | **Priority:** Medium | **Phase:** 2 | **Related:** Blocked by P2-001

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
- PDF export (P2-003)

## Acceptance Criteria

- [ ] All slides use layouts consistently
- [ ] Animations are tasteful and serve the content
- [ ] No walls of text
- [ ] All images render correctly
- [ ] Deck looks cohesive from start to finish
- [ ] `npm run dev` renders without errors

## Validation

- [ ] Click through entire deck in presenter view
- [ ] Visual quality is professional and consistent

---

## Technical Notes

### Dependencies
- Blocked by: P2-001
- Blocks: P2-003
