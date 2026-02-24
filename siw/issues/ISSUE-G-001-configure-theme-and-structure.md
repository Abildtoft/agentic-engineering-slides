# ISSUE-G-001: Configure theme and multi-file structure

**Status:** DONE | **Priority:** High | **Phase:** General | **Related:** Blocks all P1 issues

## Problem

Every slide task depends on knowing: which theme, which layouts are available, and whether we use a single `slides.md` or import sections via `src:`. This must be decided first.

## Context

The current setup uses `theme: default` with a single `slides.md`. With 68-84 slides, the file will be 1000+ lines. Slidev supports `src: ./sections/01-the-shift.md` imports for multi-file structure.

## Scope

### In Scope
- Choose and install a Slidev theme (or configure default with custom styles)
- Set up headmatter configuration (title, author, fonts, transitions)
- Decide single-file vs. multi-file structure and implement it
- Create `styles/` directory with base CSS if needed
- Document the convention in AGENTS.md

### Out of Scope
- Writing any slide content beyond a cover slide

## Acceptance Criteria

- [x] Theme is chosen and installed (if not default)
- [x] Headmatter is configured with title, author, transition defaults
- [x] File structure decision is made and documented
- [x] If multi-file: section files are created with placeholder content
- [x] `yarn dev` shows a styled cover slide
- [x] AGENTS.md is updated with any new conventions

## Validation

- [x] `yarn dev` renders without errors
- [x] Cover slide looks professional and matches intended aesthetic
- [x] Layout test: verify key layouts (cover, center, default, two-cols, quote, section) render correctly with the theme

---

## Technical Notes

### Implementation Approach
- Review Slidev theme gallery for options
- Consider: `@slidev/theme-seriph`, `@slidev/theme-apple-basic`, or enhanced default
- If multi-file: create `sections/` directory with numbered files

### Affected Areas
- `slides.md` (headmatter + structure)
- `package.json` (theme dependency)
- `styles/` (custom CSS)
- `AGENTS.md` (conventions)

### Dependencies
- Blocked by: None
- Blocks: All P1 issues

## Resolution

**Theme:** Kept `@slidev/theme-default` with existing Melatech CSS overrides in `styles/index.css`. No theme change needed — branding covers cover, section, statement, quote, and fact layouts.

**Structure:** Multi-file with `src:` imports. `slides.md` is entry point (headmatter + cover slide + imports). Section content lives in `sections/NN-slug.md`.

**Headmatter:** Added `author: Melatech`, `colorSchema: light`, `defaults.transition: fade`, `favicon: /favicon.svg`.

**Files created:**
- 8 section placeholder files in `sections/`
- `public/favicon.svg` (Melatech icon mark)

**Files updated:**
- `slides.md` — enhanced headmatter, removed placeholder, added src imports
- `AGENTS.md` — documented multi-file convention and section-to-issue mapping
