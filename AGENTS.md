# Agentic Engineering — Copenhagen Talk

## Project

Slidev presentation about how AI is reshaping software engineering. Source material in `sources/` as individual markdown files. Section content lives in `sections/` and is shared across two branded entry points (see Themes below).

## Stack

- Slidev (v52+), Vue 3, UnoCSS/Tailwind
- Package manager: Yarn 4 (do NOT use npm)
- Dev: `yarn dev` (Consensus, the default) / `yarn dev:melatech` (port 3030)
- Build: `yarn build` / `yarn build:melatech`
- Export: `yarn export` / `yarn export:melatech`

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
slides.md              # Consensus entry point — the default (headmatter + cover + src imports)
slides-melatech.md     # Melatech entry point (same src imports, different theme)
sections/              # Shared slide content (one file per section)
sources/               # Research notes, one file per source
public/                # Melatech static assets (images, logos, favicon)
public/consensus/      # Consensus-branded images and favicon
components/            # Custom Vue components (auto-imported, theme-aware)
layouts/               # Layouts shadowing @slidev/theme-default by filename
styles/                # Shared CSS using --brand-* CSS variables
styles/themes/         # Per-theme color definitions (melatech.css, consensus.css)
```

### Themes

The deck ships with two themes that share **identical slide content**:

| Theme | Entry file | `data-theme` | Brand colors |
|-------|-----------|--------------|--------------|
| Consensus (default) | `slides.md` | `consensus` | Navy (#002353), Azure (#5396C7) |
| Melatech | `slides-melatech.md` | `melatech` | Green (#186346) |

Consensus is the default: it owns `slides.md`, so a bare `slidev`, `yarn dev`, `yarn build`, and
`yarn export` all resolve to it. Melatech runs from the `:melatech` script variants.

- Both entry files import the same `sections/` files — **all content updates are automatically reflected in both themes**
- Colors are driven by `--brand-*` CSS variables scoped under `[data-theme="..."]` in `styles/themes/`
- Theme-aware components (`BrandLogo`, `SlideImage`, `MermaidDiagram`) read `data-theme` at runtime to load the correct assets
- Branded images live in `public/` (Melatech) and `public/consensus/` (Consensus) — when adding or updating an image, provide a version for each theme

### Multi-File Convention

- Entry files (`slides.md`, `slides-melatech.md`) contain only headmatter, cover slide, and `src:` imports
- Each section lives in `sections/NN-slug.md` (e.g., `01-the-shift.md`)
- Section files start with a `layout: section` divider slide (the shader comes from `layouts/section.vue`, not the markdown)
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
- Text-only content slides take `class: v-center` so a three-line slide sits composed in the middle of the frame; slides carrying a diagram or image keep the top-anchored default
- `statement` headlines are punch-sized (3.4rem cap); a full-sentence headline needs `class: statement-wide`, which keeps the smaller 2.8rem size and a wider measure — without it the sentence wraps past four lines
- Prefer quotes and bold statements over walls of text
- When referencing a source, note the author/publication in presenter notes
- Use `v-click` for progressive reveal, not too many per slide
- Use `<SlideImage>` for branded images — it resolves the correct theme path automatically
- When adding a new image, place the Melatech version in `public/` and a Consensus-branded version in `public/consensus/`
- Use `var(--brand-*)` CSS variables for colors — never hardcode hex values
- Diagrams that need to tell several things apart use the categorical slots `--brand-cat-1/2/3`, assigned in fixed order. Slots 1-2 are shared across both themes; only slot 3 is theme-specific. They are validated for colour-blind separation and 3:1 mark contrast — if you change one, re-validate the whole set rather than picking by eye
- The slots separate by hue against the page background, not by luminance against each other (the closest pair is 1.02:1), so a diagram that abuts or overlaps them must also carry position or a label — colour alone won't survive greyscale or severe CVD
- Categorical colors are for marks (fills, strokes), not text. Labels take `--brand-text`; the palette is tuned to the 3:1 marks threshold, not the 4.5:1 text one

### Motion

Durations, the easing curve, and the reveal offset are tokens in `styles/index.css`
(`--motion-base`, `--motion-slow`, `--motion-draw`, `--motion-ease`, `--motion-rise`). Use them
rather than fresh numbers, so a click reveal, an image entrance and a diagram build settle on the
same curve at the same rate. Animated backgrounds are a separate system — see below.

**Two mechanisms, chosen by trigger, not by taste.**

| Trigger | Mechanism | Why |
|---|---|---|
| A click (`v-click`, `$clicks`) | `transition` | Reversible — stepping back undoes it, which is what the speaker needs during Q&A |
| Slide entry | `animation` | Slidev keeps all 55 slides in the DOM and `display: none`s the inactive ones. Animations don't run on a box that doesn't exist and restart when one appears, so "slide became visible" is a free trigger with no JS. Replays on every revisit |

A bare `animation` on slide content would otherwise run for the whole deck at page load, finishing
long before the audience reaches slide 40 — this is why every entrance in the deck is CSS-only and
still correct.

**The one invariant: an element's hidden state lives in the keyframe's `from`, never in a base
rule.** Everything degrades to fully visible when animation is off — which is exactly what print
and reduced motion do. Break this and an exported PDF gets blank elements.

- Export (`.print-slide-container`) kills all animation and transition, pseudo-elements included —
  `*` alone doesn't match `::before`, and the quote rule is one. `$clicks`-driven builds need no
  guard: export steps the click states properly
- `prefers-reduced-motion` collapses durations **and delays**. Zeroing duration alone leaves a
  staggered build waiting out its delay before appearing
- Anything JS-timed (the `BigNumber` count-up, `MermaidDiagram`'s tagging) also checks
  `useNav().isPrintMode` directly, the same way `ShaderBackground` does — a screenshot lands
  whenever it lands
- Slide-entry animation on a component must be bound to `useIsSlideActive()`, not `onMounted` —
  mount happens at page load for every slide in the deck

**What's animated where:**

| Surface | Motion |
|---|---|
| Slide-to-slide | `fade` from headmatter `defaults`. Crossfade rather than a lateral slide because eight slides carry a live WebGL canvas. Verified to keep one live shader context through a transition |
| Section dividers | `section-shift` (fade + 20px Y), overriding the deck default so a chapter change reads differently from a step within one |
| `v-click` reveals | Opacity + an 8px rise; instant when navigating backward (`.slidev-nav-go-backward`) |
| Dense build slides | Opt in with `class: dim-prior` — dims already-revealed lines to 0.5 so the eye finds the live one. Gated on `:has(.slidev-vclick-hidden)`: once the last reveal lands, the whole slide rests at full strength — a finished slide dimmed to 0.5 reads as disabled, in Q&A and in the exported PDF, which captures exactly that final state. Deliberately not global; most slides want the speaker able to point back at full strength. Currently on four slides |
| `cover`, `statement`, `fact` | Staggered entrance on the heading. `fact` gets opacity only — that layout runs to within ~12px of the bottom edge, so no Y travel |
| `quote` | The 4px rule draws itself (`scaleY`), as a `::before` — a `border-left` can only animate its width, in layout, against the text. `padding-left: calc(1rem + 4px)` carries the border's old offset so text position is unchanged |
| `MermaidDiagram` | Builds node by node on entry, ~90ms apart, in mermaid source order. Reads `.node[data-id]` / `.edge[data-from][data-to]` off the rendered SVG, which is **not** a documented `beautiful-mermaid` contract — a version bump that renames those loses the stagger and keeps the diagram. Edges wait for the later of their two endpoints, or feedback arrows draw out of nodes that don't exist yet. Disable per slide with `reveal="none"` |
| `ProblemExplorationDiagram` | One panel per click (3 clicks); panel 1 is present on arrival and draws its spiral via `pathLength="1"` + `stroke-dashoffset`, with the 86 dots trailing the line |
| `RolesBlurDiagram` | Three beats: sequential handoffs, then the three lobes converging, then JUDGMENT. The caption is held to the last beat because it names the overlap — showing it earlier gives away the punchline the diagram spends two clicks earning |
| `BigNumber` | 800ms count-up, easeOutCubic, timed from the first rAF frame (a frame timestamp can predate the `performance.now()` just before it, which rendered one frame of `-0.1%`). A hidden sizer holds the final width so the centred number doesn't drift as digits are added |

If a diagram build consumes clicks, the slide's markdown `v-click`s must be pinned past them with
`at="N"` — Slidev auto-numbers otherwise and the text collides with the build.

### Animated Backgrounds

`<ShaderBackground />` puts a slow Paper Shaders mesh gradient behind a slide, tinted from
`--brand-*` CSS variables. It comes in two surfaces:

| `surface` | Used on | Blend | Palette | Melatech | Consensus |
|-----------|---------|-------|---------|----------|-----------|
| `dark` (default) | `cover`, `section` | `screen` | glow, primary, text | 0.30 | 0.45 |
| `light` | `statement` | `multiply` | glow, primary, bg | 0.12 | 0.22 |

The two `dark` layouts do not share a backdrop. On Melatech both are flat `--brand-bg-accent`,
but on Consensus both are gradients (`styles/themes/consensus.css`): `cover` runs Navy → Ink,
`section` runs Azure → Navy, reaching navy by 32%. Only `section` matters for contrast — it
opens on Azure, where white text is 3.20:1 before any shader runs (see the contrast note
below), while `cover` only gets darker than its Navy start, so flat `--brand-bg-accent` still
bounds it. That 32% stop is the divider contrast knob; it is tuned against the *widest*
divider title, not a typical one.

The seven section dividers override both, running `godRays` at `:opacity="0.22"` and
`:speed="0.6"` from `layouts/section.vue`; the cover and the statement slides stay on
`meshGradient` at the theme strength and the default speed.

Strength is per theme: both themes declare it with `--brand-shader-dark` /
`--brand-shader-light`, and `components/ShaderBackground.vue` carries the same values as
`var()` fallbacks so a theme that forgets them still renders. Consensus runs stronger
because Navy and Azure are close in value, so the same opacity reads fainter than Melatech's
green. A single slide can override with `<ShaderBackground :opacity="0.5" />`.

Each palette ends in a colour the blend mode ignores (screen ignores near-black, multiply
ignores near-white), so the shader drifts through clear regions instead of tinting the whole
slide — and contrast can only move one direction.

Three shaders are wired up, selected with the `shader` prop. Each maps the surface palette
onto its own uniforms and carries its own framing, so they are interchangeable per slide:

| `shader` | Look | Notes |
|----------|------|-------|
| `meshGradient` (default) | Soft drifting colour pools | The only one calm enough for the theme's normal strength |
| `godRays` | Light beams raking from off-frame | Used on the section dividers at `:opacity="0.22"`, `:speed="0.6"` |
| `neuroNoise` | Cellular filament network | Unused so far; looks best on `dark` at around `:opacity="0.16"` and is far too busy on `light`. Nothing enforces either — both validators are independent |

#### Per-slide variation

Every slide jitters its own backdrop so seven dividers and fourteen statement slides don't run
the identical frame. It is on by default; `:vary="false"` opts out and `:seed="N"` reshuffles one
slide without moving it in the deck.

**It is deterministic, not random, and that is the point.** The seed is a hash of the slide
number, so a slide's look is fixed forever. `Math.random()` would mean the exported PDF disagrees
with the screen, presenter mode's two windows disagree with each other, and the deck the speaker
rehearsed isn't the one they present. Verified: the same slide re-loaded twice produces a
byte-identical backdrop (measured under `prefers-reduced-motion`, where `speed` is 0 and `u_time`
is pinned to the seed, making the render a single fixed frame).

**Only framing and time are jittered — never colour or strength.** This is what keeps every
contrast figure below valid. Those figures are derived by flooding the shader's colours to one
solid value at its shipped opacity, i.e. the worst frame it could ever produce; rotating,
offsetting, scaling or time-shifting the field changes *where* colours land, not *which* colours
are reachable, so the same bound holds. Jittering opacity, the palette, or `godRays`' `bloom` /
`intensity` would move the bound itself and invalidate the measurements.

| Axis | meshGradient | godRays | Contrast-safe? |
|---|---|---|---|
| `frame` (start time) | 0-240 | 0-240 | Yes — same argument as `speed` below |
| `u_rotation` | ±180° (full circle) | ±18° | Yes |
| `u_offsetX/Y` | ±0.18 | ±0.06 | Yes |
| `u_scale` | ±12% | ±8% | Yes |
| `u_distortion`, `u_swirl` | ±0.15, ±0.12 | — | Yes — 0-1 shape powers, clamped |
| opacity, palette, `bloom`, `intensity` | **never** | **never** | No — these move the bound |

The ranges differ per shader because the two don't have equivalent freedom. `meshGradient` is
drifting colour pools with no canonical orientation, and it runs on the surfaces with the most
headroom, so it gets the full range. `godRays` is framed deliberately — its source is pushed off
the top-left corner so the beams rake across rather than burst from behind the title — so rotation
stays narrow to preserve that, and because the divider gradient is the tightest contrast case in
the deck. The time offset does most of the visual work there anyway.

`speed` is deliberately not jittered: on the `light` surface it is load-bearing for WCAG 2.3.1
(see below), so it is not a free knob.

Measured with variation on, glyph-extent method, worst of 8 frames (scripts in
`.context/measure-*-contrast.js`; they reproduce the divider glyph widths in the table below
exactly, which is how the method was checked against the original figures):

| Surface | Slides sampled | Range measured | Floor |
|---|---|---|---|
| Consensus dividers, white on `godRays` 0.22 | all 7 | 5.78:1 - 10.93:1 | **5.78:1** (the 1015px title) |
| Consensus covers, white on `meshGradient` 0.45 | both | 7.80:1 - 8.38:1 | **7.80:1** |
| Consensus statements, `--brand-primary` on `meshGradient` light 0.22 | 11 of 14 | 10.77:1 - 12.13:1 | **10.77:1** |

The binding case is unaffected by variation: the widest divider title measures 5.41:1 with
`:vary="false"` and 5.78:1 with it on — same method, same frame count. Individual dividers move by
up to ±0.5 in either direction; none approaches the 4.5:1 floor. Re-run the scripts after changing
any range, and don't read a single slide's figure as the result — the floor is what matters.

Statement slides can pick one via frontmatter (`shader: godRays`), though none currently do;
other layouts pass the prop. `paperTexture` was tried and rejected — it renders flat colour
without a source image.

- Both cover slides carry it inline in markdown (`cover.vue` takes a `background` prop, so shadowing it would mean duplicating theme internals for two call sites); section dividers and statement slides get it from `layouts/section.vue` and `layouts/statement.vue`, which shadow the theme layouts so their markdown stays clean. The divider's `:opacity="0.22"` lives only in `layouts/section.vue` — it is the input to the contrast floor below, so keep it in one place
- The divider's `:speed="0.6"` is set at that same call site rather than as a per-shader default, because statement slides can also select `godRays` and they sit on the `light` surface, where speed is load-bearing for the flash threshold (see below). `godRays` only advances time as a radial drift through its noise field (`t = 0.2 * u_time`, and `u_time` is `speed × seconds`), so it reads as near-frozen at the component's default `0.25`; `0.6` crosses a noise cell about every 3s, ≈0.36Hz
- Only use it on layouts that set `isolation: isolate` in `styles/index.css` (`cover`, `section`, `statement`) — that stacking context is what keeps the shader above the slide background and below the text
- The blend mode goes on the `.shader-bg` wrapper, not on the layers inside it. The wrapper's `z-index` makes it a stacking context, and a stacking context is an isolated group, so a blend mode on a child composites against the wrapper's own empty backdrop and does nothing
- It reads brand colors from CSS variables, so a new theme needs its own `--brand-glow`. A missing token logs a `console.error` and leaves the CSS fallback up
- It mounts only while its slide is active, so at most one live WebGL context per render context — two when presenter mode's second window is open. The presenter's next-frame pane and the overview grid render live copies of the current slide in the same document, so the component skips any render context other than `slide` and `presenter`
- It skips WebGL entirely in print mode and falls back to a static CSS gradient, so `yarn export` stays reliable
- Don't put `light` on slides with images — the illustration PNGs have white mattes that show as boxes on any tinted background (the same reason `--brand-bg` is `#FFFFFF`)
- Raising strength cuts text contrast. Measured worst case (shader colours flooded to one solid value at its shipped settings, so no frame can be worse), white text on Consensus over flat `--brand-bg-accent`: **4.98:1** for `meshGradient` on `dark` 0.45, **5.86:1** for `godRays` on `dark` 0.22; and `--brand-primary` on white for **9.78:1** on `light` 0.22. AA needs 4.5:1
- Those figures do **not** cover the Consensus `section` gradient, which is the tightest case in the deck. `godRays`' additive bloom ceiling at `:opacity="0.22"` derives to about **4.53:1** in the text band (theoretical worst frame). Re-measure against this gradient, not flat `--brand-bg-accent`, before raising the section strength
- The binding constraint on dividers is **title width**, not shader strength. Titles are centred, so a wider one reaches further into the light Azure corner, where the bare gradient is 3.20:1. Measured per title — lightest background pixel under the actual glyph extent, worst of several rendered frames, Consensus:

  | Divider title | Width | at 55% stop | at 32% stop |
  |---|---|---|---|
  | `The New Stack: Core Concepts` | 1015px | 4.02:1 ✗ | **5.13:1** |
  | `The Compressing Middle` | 822px | 4.53:1 | **6.59:1** |
  | `The New Stack: Tools` | 708px | 4.85:1 | **8.08:1** |
  | `The Shift Is Here` | 549px | 5.64:1 | **10.04:1** |
  | `Moving Forward` | 530px | 5.64:1 | **10.04:1** |
  | `Cognitive Debt` | 481px | 5.98:1 | **10.04:1** |
  | `What Matters` | 444px | 6.31:1 | **10.04:1** |

  The 55% column is why the stop moved: one title below AA and the next at 4.53:1, i.e. no margin against an ordinary copy edit. The 32% column is what ships. Measure the widest title when adding or lengthening one — a typical title clears AA by so much that it tells you nothing

  Both columns predate per-slide variation and were measured before it; the current shipped figures are in the variation table above, and the widest title is unmoved (5.13:1 then, 5.78:1 now on a fresh 8-frame sample). The relationship the table exists to record — width is the variable, not strength — is unchanged
- Melatech dividers are flat `--brand-bg-accent`, so none of this applies there; the equivalent sample measures **7.46:1**
- For `godRays` the bound also depends on `bloom` — it blends additively, so output can exceed the palette's own brightness. Raising `bloom` or `intensity` invalidates the measurements above
- On the `light` surface, `speed` is load-bearing for WCAG 2.3.1: the white→`#C7CFD9` swing meets the flash threshold's magnitude test, and only the very low frequency keeps it compliant. Don't raise it much
- `speed` does not affect contrast on either surface — it changes how fast the shader traverses its noise field, not which colours that field contains, so the reachable states and their bounds are identical at any non-zero speed. Verified on the `dark` section gradient: with the stop still at 55%, the worst frame over the longest title measured 3.98:1 at both `0.25` and `0.6`. Only the flash-threshold concern above scales with speed
- `prefers-reduced-motion` is read at mount and maps to speed 0 (a single static frame, no RAF loop). Toggling it mid-deck takes effect on the next slide change. The frame that freezes is still the slide's own seeded one, so reduced-motion users get the per-slide variety too, just static
- Other props: `speed`, `scale`, and `params` for per-shader uniform overrides — e.g. `:params="{ u_distortion: 0.9, u_swirl: 0.5 }"`. `params` is applied last, so it can override framing *and* the per-slide jitter. Plus `seed` and `vary` — see the variation section above
