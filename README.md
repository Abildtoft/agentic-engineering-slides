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
slides.md          Main presentation
sources/           Research notes (one file per source)
public/            Static assets (images)
components/        Custom Vue components (auto-imported)
styles/            Custom CSS (Melatech branding)
uno.config.ts      UnoCSS theme (brand color tokens)
```

## Theme

Custom Melatech branding layered on `@slidev/theme-default`:

- **Primary green**: `#186346`
- **Dark green** (cover/section backgrounds): `#11402E`
- **Text**: `#282625`
- **Font**: Inter (Google Fonts)

UnoCSS utilities available: `bg-melatech-green`, `text-melatech-dark`, `bg-melatech-bg`, etc.
