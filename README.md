# Agentic Engineering — Copenhagen Talk

Slidev presentation about how AI is reshaping software engineering.

## Getting Started

```bash
yarn install
yarn dev
```

Opens at http://localhost:3030

## Commands

| Command | Description |
|---------|-------------|
| `yarn dev` | Start dev server (port 3030) |
| `yarn build` | Build static SPA |
| `yarn export` | Export to PDF |

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
so `yarn dev`, `yarn build`, and `yarn export` all resolve to it. Melatech runs from the
`:melatech` script variants (`yarn dev:melatech`).

| Theme | Entry file | Primary | Font |
|-------|-----------|---------|------|
| Consensus (default) | `slides.md` | Navy `#002353` | Roboto |
| Melatech | `slides-melatech.md` | Green `#186346` | Inter |

Both are layered on `@slidev/theme-default`. Colors resolve through `--brand-*` CSS variables
scoped under `[data-theme="..."]` in `styles/themes/`, so slide content never hardcodes a hex.

## Deploying to Vercel

The repository includes `vercel.json`, which builds the default Consensus deck as a static SPA,
publishes `dist/`, supports direct links to individual slides, and gives content-hashed narration
videos a long-lived browser cache.

1. Import `Abildtoft/agentic-engineering-slides` as a new Vercel project. The committed settings
   provide the build command and output directory; no dashboard overrides are needed.
2. After the repository is connected, open **Project Settings → Git**, enable **Git Large File
   Storage (LFS)**, and redeploy. The narrated `.mp4` files are stored through Git LFS and will be
   missing from the published deck unless Vercel pulls the LFS objects.

The Vercel install uses production dependencies only, so hosting does not need the private
`MASCOT_API_KEY` required by the offline mascot-rendering scripts.

Merges to `main` become production deployments; other branches and pull requests receive preview
deployments. To publish the Melatech deck as a separate Vercel project, override the build command
with `yarn build:melatech` while keeping `dist` as the output directory.
