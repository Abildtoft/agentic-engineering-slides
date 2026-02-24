# ISSUE-P2-003: Export to PDF

**Status:** Ready | **Priority:** Low | **Phase:** 2 | **Related:** Blocked by P2-002

## Problem

Export the finished presentation to PDF as a backup and for sharing.

## Context

PDF backup ensures the presentation can be given even without a dev server. May also be shared with attendees after the session.

## Scope

### In Scope
- Run `npm run export` to generate PDF
- Verify all slides render correctly in PDF
- Fix any export-specific rendering issues
- Verify presenter notes are included (or create a separate notes export)

### Out of Scope
- Content or visual changes

## Acceptance Criteria

- [ ] PDF generated successfully
- [ ] All slides present and readable
- [ ] No rendering artifacts
- [ ] File size is reasonable

## Validation

- [ ] Open PDF and verify all slides match dev server rendering

---

## Technical Notes

### Implementation
- `npm run export` (may need `playwright` installed)
- Consider `slidev export --with-clicks` for animation frames

### Dependencies
- Blocked by: P2-002
- Blocks: None
