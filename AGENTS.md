# Agentic Engineering — Copenhagen Talk

## Project

Slidev presentation about how AI is reshaping software engineering. Source material in `sources/` as individual markdown files. Deck entry point is `slides.md`, with section content in `sections/`.

## Stack

- Slidev (v52+), Vue 3, UnoCSS/Tailwind
- Package manager: Yarn 4 (do NOT use npm)
- Dev: `yarn dev` (port 3030)
- Build: `yarn build`
- Export: `yarn export`

## Slidev Syntax

- `---` separates slides
- First YAML block = headmatter (deck config)
- Per-slide YAML frontmatter for layout, class, transition
- HTML comments `<!-- -->` = presenter notes
- Refer to `.agents/skills/slidev/` for full syntax reference

## Key Layouts

| Layout | Use |
|--------|-----|
| `cover` | Title slide |
| `center` | Centered content |
| `default` | Standard slide |
| `two-cols` | Two columns (`::right::` slot) |
| `image-right` / `image-left` | Image + content |
| `quote` | Quotation |
| `section` | Section divider |
| `statement` | Bold statement |
| `fact` | Data point |

## Structure

```
slides.md          # Entry point: headmatter + cover slide + src imports
sections/          # One file per presentation section (NN-slug.md)
sources/           # Research notes, one file per source
public/            # Static assets (images, etc.)
components/        # Custom Vue components (auto-imported)
styles/            # Custom CSS (Melatech brand overrides)
```

### Multi-File Convention

- `slides.md` contains only the headmatter, cover slide, and `src:` imports
- Each section lives in `sections/NN-slug.md` (e.g., `01-the-shift.md`)
- Section files start with a `layout: section` divider slide
- When working on a P1 issue, edit only the corresponding section file
- Section → P1 issue mapping:
  - `01-the-shift.md` → P1-001
  - `02-disappearing-middle.md` → P1-002
  - `03a-new-stack-concepts.md` → P1-003
  - `03b-new-stack-tools.md` → P1-004
  - `03c-new-stack-composed.md` → P1-005
  - `04-cognitive-debt.md` → P1-006
  - `05-pipeline-and-what-matters.md` → P1-007
  - `06-moving-forward.md` → P1-008

## Guidelines

- Keep slides minimal — one idea per slide
- Use presenter notes for talking points, not slide content
- Prefer quotes and bold statements over walls of text
- When referencing a source, note the author/publication in presenter notes
- Use `v-click` for progressive reveal, not too many per slide
- Images go in `public/`, referenced as `/image.png`
