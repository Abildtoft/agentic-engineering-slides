# ISSUE-P2-001: Full-deck flow review & timing markers

**Status:** Ready | **Priority:** Medium | **Phase:** 2 | **Related:** Blocked by Phase 1

## Problem

Read through the entire presentation for narrative coherence, pacing, redundancy, and transitions. Add timing markers for the 2.5-hour session.

## Context

After all sections are written independently, the deck needs a coherence pass. Transitions between sections may be abrupt, themes may repeat across sections, and pacing may be uneven. The presenter also needs timing guidance for a 2.5-hour session with discussion breaks.

## Scope

### In Scope
- Read entire deck start to finish
- Check narrative flow and transitions between sections
- Identify and fix redundancy across sections
- Add bridging slides where transitions feel abrupt
- Add `duration:` timing markers in headmatter
- Verify discussion prompts are well-placed (~every 15-20 min)
- Verify demo placeholders make sense in sequence

### Out of Scope
- Visual styling (P2-002)
- PDF export (P2-003)

## Acceptance Criteria

- [ ] Full read-through completed
- [ ] No redundant points across sections
- [ ] Transitions between sections feel natural
- [ ] Timing markers added
- [ ] Total timing adds up to ~140 min (with ~10 min buffer)
- [ ] `npm run dev` renders without errors

## Validation

- [ ] A dry-run click-through of the full deck takes ~2.5 hours at expected pace
- [ ] No slides feel out of place or disconnected from neighbors

---

## Technical Notes

### Dependencies
- Blocked by: All P1 issues
- Blocks: P2-002
