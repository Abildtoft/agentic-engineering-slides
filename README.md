# Agentic Engineering — Copenhagen Talk

Slidev presentation about how AI is reshaping software engineering.

## Getting Started

```bash
npm install
npm run dev
```

Opens at http://localhost:3030

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (port 3030) |
| `npm run build` | Build static SPA |
| `npm run export` | Export to PDF |

## Structure

```
slides.md          Main presentation (Consensus — the default)
slides-melatech.md Melatech entry point (same content, different branding)
sections/          Slide content, shared by both entry points
sources/           Research notes (one file per source)
public/            Static assets (images)
components/        Custom Vue components (auto-imported)
styles/            Custom CSS (--brand-* variables; per-theme values in styles/themes/)
uno.config.ts      UnoCSS theme (brand color tokens)
```

## Themes

Two brandings share identical slide content. **Consensus is the default** — it owns `slides.md`,
so `npm run dev`, `build`, and `export` all resolve to it. Melatech runs from the `:melatech`
script variants (`npm run dev:melatech`).

| Theme | Entry file | Primary | Font |
|-------|-----------|---------|------|
| Consensus (default) | `slides.md` | Navy `#002353` | Roboto |
| Melatech | `slides-melatech.md` | Green `#186346` | Inter |

Both are layered on `@slidev/theme-default`. Colors resolve through `--brand-*` CSS variables
scoped under `[data-theme="..."]` in `styles/themes/`, so slide content never hardcodes a hex.
