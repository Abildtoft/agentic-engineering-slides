# ISSUE-P2-001: Full-deck flow review & timing markers

**Status:** DONE | **Priority:** Medium | **Phase:** 2 | **Related:** Blocked by Phase 1

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
- Export pipeline work

## Acceptance Criteria

- [x] Full read-through completed
- [x] No redundant points across sections
- [x] Transitions between sections feel natural
- [x] Timing markers added
- [x] Core talk reaches the closing discussion marker at `T+150:00` (resource slide extends to `T+156:00`)
- [x] `yarn dev` renders without errors

## Validation

- [ ] A dry-run click-through of the full deck takes ~2.5 hours at expected pace
- [ ] No slides feel out of place or disconnected from neighbors

---

## Resolution

1. **Global timer**: Added `duration: 150min` + `timer: countdown` to `slides.md` headmatter
2. **Redundancy R1**: Rephrased S4 Antidote slide — "AI doesn't make you dumber" now only appears on-screen in S5 (hinge slide). S4 uses "The tool isn't the risk. Surrendering your judgment to it is."
3. **Redundancy R2**: Paraphrased Tacho "Venn Diagram" quote in S5 — verbatim only appears in S3b. S5 uses "Every investment in developer experience now pays double."
4. **Discussion gap**: Added 2-min pulse check to S3b statement slide notes (breaks 40-min gap between S3a and S3c discussions)
5. **Comfort break**: Added break marker to S3c discussion notes (~1:40 midpoint)
6. **Bottleneck bridge**: Added explicit callback to S5 discussion transition ("being the bottleneck isn't the problem — it's the point")
7. **Timing markers**: Added `[T+MM:SS | SX slide Y of Z | Xmin]` across all section slides (87 markers across 8 section files; cover slide intentionally unmarked)
8. **Discussion trim**: Tightened all "7-10 minutes" discussions to "6-8 minutes" (recovers ~6 min)
9. **Timing normalization**: Rebalanced markers so the final discussion starts at `T+150:00`, with an optional resources close at `T+156:00`

---

## Technical Notes

### Dependencies
- Blocked by: All P1 issues
- Blocks: P2-002
