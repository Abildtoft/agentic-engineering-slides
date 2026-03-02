# Agentic Engineering — Copenhagen Talk

## Project

Slidev presentation about how AI is reshaping software engineering. Source material in `sources/` as individual markdown files. Section content lives in `sections/` and is shared across two branded entry points (see Themes below).

## Stack

- Slidev (v52+), Vue 3, UnoCSS/Tailwind
- Package manager: Yarn 4 (do NOT use npm)
- Dev: `yarn dev` / `yarn dev:consensus` (port 3030)
- Build: `yarn build` / `yarn build:consensus`
- Export: `yarn export` / `yarn export:consensus`

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
slides.md              # Melatech entry point (headmatter + cover + src imports)
slides-consensus.md    # Consensus entry point (same src imports, different theme)
sections/              # Shared slide content (one file per section)
sources/               # Research notes, one file per source
public/                # Melatech static assets (images, logos, favicon)
public/consensus/      # Consensus-branded images and favicon
components/            # Custom Vue components (auto-imported, theme-aware)
styles/                # Shared CSS using --brand-* CSS variables
styles/themes/         # Per-theme color definitions (melatech.css, consensus.css)
```

### Themes

The deck ships with two themes that share **identical slide content**:

| Theme | Entry file | `data-theme` | Brand colors |
|-------|-----------|--------------|--------------|
| Melatech | `slides.md` | `melatech` | Green (#186346) |
| Consensus | `slides-consensus.md` | `consensus` | Indigo (#4957F5) |

- Both entry files import the same `sections/` files — **all content updates are automatically reflected in both themes**
- Colors are driven by `--brand-*` CSS variables scoped under `[data-theme="..."]` in `styles/themes/`
- Theme-aware components (`BrandLogo`, `SlideImage`, `MermaidDiagram`) read `data-theme` at runtime to load the correct assets
- Branded images live in `public/` (Melatech) and `public/consensus/` (Consensus) — when adding or updating an image, provide a version for each theme

### Multi-File Convention

- Entry files (`slides.md`, `slides-consensus.md`) contain only headmatter, cover slide, and `src:` imports
- Each section lives in `sections/NN-slug.md` (e.g., `01-the-shift.md`)
- Section files start with a `layout: section` divider slide
- When working on a P1 issue, edit only the corresponding section file
- Section → P1 issue mapping:
  - `01-the-shift.md` → P1-001
  - `02-disappearing-middle.md` → P1-002
  - `03a-new-stack-concepts.md` → P1-003
  - `03b-new-stack-tools.md` → P1-004, P1-005 (Section 3c was consolidated into 3b)
  - `04-cognitive-debt.md` → P1-006
  - `05-pipeline-and-what-matters.md` → P1-007
  - `06-moving-forward.md` → P1-008

## Guidelines

- Keep slides minimal — one idea per slide
- Use presenter notes for talking points, not slide content
- Prefer quotes and bold statements over walls of text
- When referencing a source, note the author/publication in presenter notes
- Use `v-click` for progressive reveal, not too many per slide
- Use `<SlideImage>` for branded images — it resolves the correct theme path automatically
- When adding a new image, place the Melatech version in `public/` and a Consensus-branded version in `public/consensus/`
- Use `var(--brand-*)` CSS variables for colors — never hardcode hex values
