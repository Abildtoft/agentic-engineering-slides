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

### Narrated Auto-Mode

An opt-in second way to run the deck: a pre-rendered HeyGen avatar narrates each
slide and the narration drives the clicks. Opened normally the deck is entirely
unaffected — `<AvatarNarrator>` fetches nothing and renders nothing without
`?auto=1`, which is the point. The live-presentation path stays the one with no
network dependency.

```
narration/NN-slug.md      # spoken prose, one block per slide, `---` separated
scripts/narration-lib.mjs # deck ↔ narration pairing, cue splitting, validation
scripts/narration-scaffold.mjs  # regenerates narration/ from the deck (offline)
scripts/narration-build.mjs     # HeyGen: prose → clips + cue manifest
public/narration/manifest.json  # cue times; also the build cache (tracked)
public/narration/*.mp4          # rendered clips (gitignored, regenerable)
components/AvatarNarrator.vue   # the player, mounted from global-bottom.vue
```

- **One clip per slide, not per click step.** The deck is 59 slides but ~171
  click steps; per-step clips mean 171 avatar entrances and a hard cut every
  time a bullet appears. A slide is the natural unit of speech, and the reveals
  ride inside it on cue times
- Cues are marked inline in the prose as `[click]`. The marker is stripped
  before synthesis and its position recorded, so the avatar never says the word
- **The two HeyGen calls are ordered, not interchangeable.** `POST
  /v3/voices/speech` first, because `word_timestamps` is the only thing in
  either API that can say *when* a phrase is spoken — that is what resolves a
  `[click]` into a time. Then `POST /v2/video/generate` with `voice: { type:
  'audio' }` pointing at that same audio. Generating the video from text
  instead re-synthesises the speech and silently invalidates every cue
- Cue resolution counts words into the timestamps rather than matching them.
  Measured against a live response: `word_timestamps` preserves the **written**
  tokenisation, one entry per whitespace-separated input token — `"2026"`,
  `"343"`, `"57,179"` and `"30%"` each come back as a single entry, not expanded
  into the words they are read as. So numerals are safe in narration prose and
  the counts line up. Where they don't, the build warns and spaces cues evenly
- **`word_timestamps` is bracketed by `<start>` and `<end>` sentinel entries**
  that carry timings but are never spoken — 8 entries for 6 words on a verified
  live response. They must be filtered before counting, or every cue lands one
  word early. A constant one-word offset reads as a plausible reveal rather than
  a bug, so it will not announce itself; `resolveCues` strips anything matching
  `<…>` and the unit case in the smoke test pins the expected time
- Render at **16:9** (`1280x720`), not square. A square `dimension` letterboxes
  rather than crops — it bakes white bars into the pixels, which no CSS can
  remove. The corner tile is square and crops to the face with
  `object-fit: cover`
- `/v3/voices` and `/v3/avatars` are **paginated** (`has_more` / `next_token`,
  20 per page — ~60 pages of Starfish voices). Reading page one and concluding a
  voice is unsupported is worse than not checking
- **Everything is on v3.** The v1/v2 equivalents still answer, but each returns a
  `warning` naming a **2026-10-31 sunset**: `/v2/avatars`,
  `/v2/avatar/{id}/details`, `/v2/video/generate`, `/v1/video_status.get`,
  `/v2/user/remaining_quota`. Check `payload.warning` after adding any endpoint —
  that field is the only place the deprecation appears

  | Use | Endpoint |
  |---|---|
  | Synthesise + word timings | `POST /v3/voices/speech` |
  | Render from that audio | `POST /v3/videos` (`type: avatar`, `audio_url`) |
  | Poll a render | `GET /v3/videos/{id}` |
  | Resolve the avatar | `GET /v3/avatars/looks/{look_id}` |
  | Account balance | `GET /v3/users/me` |

- In v3 an **avatar is a group and the id you generate with is a *look* inside
  it**, so `/v3/avatars` (~1.4k groups) will never contain a usable `avatar_id`
  and searching it reports valid avatars as missing. Resolve a look with
  `GET /v3/avatars/looks/{look_id}` — note the path: the
  `/v3/avatars/{group_id}/looks/{look_id}` the docs describe returns a bare 404,
  and it would need a group id we don't have anyway
- `POST /v3/videos` takes `aspect_ratio: 'auto'`, which is the structural fix for
  the letterbox — the render matches the avatar's native framing instead of a
  hardcoded `dimension`. The look record carries `image_width`/`image_height` and
  `preferred_orientation` if you need to know what that will be
- `GET /v3/users/me` reports `wallet.remaining_balance` in **actual currency**,
  which is a far more useful number than a credit count; the preflight fails on a
  zero balance because rendering otherwise dies with a 402 that reads like a
  malformed request
- Narration is keyed by `(source file, index within file)`, never by deck-wide
  slide number — a slide inserted early would otherwise re-point every later
  line onto the wrong slide, and nothing would notice until the podium.
  `buildIndex()` hard-errors on a block/slide count mismatch instead of guessing
- Click counts in the scaffold's header comments are **approximate**. A v-click
  total is only authoritative at runtime, so the player reconciles against the
  real `clicksTotal` on screen: it never fires `next()` past the last reveal
  (over-marking can't skip a slide), and warns when a slide ends with reveals
  the narration never cued
- Cues run off the clip's `currentTime` in a rAF loop, not `setTimeout` — a
  timer keeps running through a stall, a pause or a seek and walks the reveals
  out of step with the voice
- **The slide-to-slide handoff is three separate mechanisms**, each fixing a
  measured problem rather than a suspected one:
  - **A beat between slides.** Rendered clips carry ~0.2s of lead-in and
    **zero** trailing silence — they end on the final syllable — so untreated
    the deck runs one slide's last syllable into the next slide's first word
    ~300ms later. `SLIDE_GAP_MS` (700) / `SECTION_GAP_MS` (1500) hold the voice.
    The gap is taken **after** the slide has already changed, so the new slide
    lands and settles in silence before anyone speaks over it — which is what a
    speaker does, and what a chapter change needs
  - **Double-buffered media elements.** With one element, assigning `src` fires
    `emptied` at once: the frame blanks and the next clip only *starts* fetching
    then — 96ms on localhost, a whole network round trip anywhere else, once per
    slide. Two elements let `preloadNext()` have the next clip at
    `readyState: 4` before it is needed
  - **A blurred dissolve through the avatar's own still** (`DISSOLVE_MS` 340,
    `DISSOLVE_BLUR_PX` 6). Consecutive clips are independent renders, so the
    pose at the end of one doesn't match the start of the next. **Opacity alone
    is not enough**: a linear crossfade between two faces caught at different
    moments of speech shows both mouths at once and the eye resolves it as a
    glitch. The blur is what makes it a dissolve — it removes the *legibility*
    of the overlap rather than the overlap itself, so the images merge instead
    of competing. A fractional `scale(1.04)` rides with it so the blurred frame
    reads as receding rather than as a flat wash
  - The still counter-blurs, `DISSOLVE_BLUR_PX / 2` while a clip is live and
    sharp when it is the picture. Without it a blurred video dissolves into a
    sharp still and the eye catches the seam. Measured, the two cross at the
    midpoint — both at 2.0px, 461ms in — which is what stops either image
    dominating
  - Resolving *through* `preview_image_url` matters: it is the same person, same
    framing, same lighting, at rest, so neither half of the dissolve is ever
    blending two unrelated pictures. Between slides the avatar simply stops
    talking and rests. The still already sits behind both media elements, so the
    source swap happens while nothing is visible
  - A brand-coloured panel wiping over the tile was tried and rejected: it hid
    the cut but announced a transition the deck never asked for — a navy block
    sweeping a face is a broadcast lower-third, and nothing else here behaves
    like one
  - Measured on a 700ms gap: video out by ~341ms, back live at ~671ms, first
    word at 703ms. A section divider's extra time goes into the rest at the
    midpoint, not into slower dissolves
  - Manual navigation skips the settle entirely (`gap <= 0`) — a keypress should
    be answered now, not after a 260ms dissolve. Preloading is deferred past the
    fade, since assigning `src` blanks the element still on screen
- Auto-mode never runs in the presenter window (`isPresenter`) or in print
  (`isPrintMode`). Presenter mode renders the deck twice against one shared nav
  state, so without the guard both copies narrate and every reveal fires twice
- The first play needs a user gesture — browsers block autoplay with sound — so
  the tile carries a Start button. Everything after it is chained
- After adding, removing or reordering slides, run `yarn narration:scaffold`;
  it rewrites the header comments from the current deck and preserves prose
- Credentials live in `.env` (gitignored; `.env.example` documents them) and are
  loaded with node's `--env-file-if-exists`, so there is no dotenv dependency
- `yarn narration:voices` is the preflight, and the voice check is the one that
  matters: `word_timestamps` only comes back for **Starfish-engine** voices, and
  any other voice synthesises fine while returning null there — the build then
  spaces every cue evenly and the drift only shows up on stage. `--list` prints
  the compatible voices
- Run `yarn narration:build --dry-run` before spending credits: it stops after
  the TTS step and prints resolved cue times and total spoken duration
- **`yarn narration:audio` is the mode to work in.** It builds everything except
  the rendered clip — real voice, real word-timed cues, real auto-advance — and
  shows a still of the avatar (`/v2/avatar/{id}/details` → `preview_image_url`)
  instead. Video generation is the overwhelming majority of the credit cost, so
  the prose can be revised as many times as it needs to be here, and
  `yarn narration:build` run once at the end. `mode` is part of the cache hash,
  so switching rebuilds rather than serving the other mode's asset
- Audio and video can coexist per slide: the player picks `entry.video` first,
  then `entry.audio`, so a few slides can carry a rendered face while the rest
  stay audio. One `<video>` element plays both — an audio source is held at
  `opacity: 0` rather than `display: none`, since an element removed from the
  render tree may be throttled and it still has to play
- The narrator tile's `position: fixed` resolves against Slidev's transformed
  `.slidev-slide-content`, not the viewport, so it scales with the slide and
  keeps its framing at any window size. It still doesn't ride the slide
  transition — `GlobalBottom` is a sibling of the slide components
- Un-narrated slides hold for `SILENT_DWELL_MS` (3.5s) and move on, so a partly
  written deck races through the gaps rather than stalling
- The tile's corner is per slide: `narrator: top-right | bottom-left | top-left |
  hidden` in frontmatter, defaulting to `bottom-right`. The key is ignored when
  the deck is presented normally. **Full-frame diagram slides generally want
  `hidden`** — verified on both data slides in section 1, where every corner
  covers a number the slide exists to show (`MergeLedgerCompare`'s multipliers
  sit hard right on each row; `MergeLedgerChart`'s curve climbs into the
  top-right). Hidden shrinks the tile to 1px at `opacity: 0` rather than
  removing it, so the media element keeps playing, and the Pause control stays

## Guidelines

- Keep slides minimal — one idea per slide
- Use presenter notes for talking points, not slide content
- Text-only content slides take `class: v-center` so a three-line slide sits composed in the middle of the frame; slides carrying a diagram or image keep the top-anchored default
- `statement` headlines are punch-sized (3.4rem cap); a full-sentence headline needs `class: statement-wide`, which keeps the smaller 2.8rem size and a wider measure — without it the sentence wraps past four lines
- Prefer quotes and bold statements over walls of text
- A quote that sits inside another slide is a markdown blockquote, and the attribution is a **second paragraph inside it** — `> “…”`, `>`, `> Name` — never an inline `— **Name**` trailing the sentence. The theme ships blockquotes dressed as code blocks (grey `--slidev-code-background` fill, rounded 1px border, `text-sm`); `styles/index.css` strips that and gives them the `quote` layout's drawn rule, italic setting and small-caps attribution, so a quote reads the same whether it is its own slide or a beat inside one. Nothing else in the deck uses a markdown blockquote — if a quote deserves the whole frame, use `layout: quote` or `<QuotePair>` instead
- When referencing a source, note the author/publication in presenter notes
- Use `v-click` for progressive reveal, not too many per slide
- Use `<SlideImage>` for branded images — it resolves the correct theme path automatically
- When adding a new image, place the Melatech version in `public/` and a Consensus-branded version in `public/consensus/`
- Use `var(--brand-*)` CSS variables for colors — never hardcode hex values
- Diagrams that need to tell several things apart use the categorical slots `--brand-cat-1/2/3`, assigned in fixed order. Each theme owns its own full set — slots 1-2 used to be shared, but Consensus retuned all three onto Navy/Azure and the two brands want different neighbours. They are validated for colour-blind separation and 3:1 mark contrast by `.context/measure-cat-palette.js`, which scores both themes at once — if you change one slot, re-run it and re-validate the whole set rather than picking by eye
- The slots separate by hue against the page background, not by luminance against each other (Melatech's closest pair is 1.02:1, Consensus' 1.30:1), so a diagram that abuts or overlaps them must also carry position or a label — colour alone won't survive greyscale or severe CVD. `RolesBlurDiagram` is currently their only consumer
- Categorical colors are for marks (fills, strokes), not text. Labels take `--brand-text`; the palette is tuned to the 3:1 marks threshold, not the 4.5:1 text one
- `--brand-strike` is the one signal colour in the deck — the red the opening cover crosses "Vibe Coding" out with. Both themes share the value: red is what reads as "struck", and no brand palette carries it. It is a mark, not text, and only ever used over a dark cover

### Motion

Durations, the easing curve, and the reveal offset are tokens in `styles/index.css`
(`--motion-base`, `--motion-slow`, `--motion-draw`, `--motion-ease`, `--motion-rise`). Use them
rather than fresh numbers, so a click reveal, an image entrance and a diagram build settle on the
same curve at the same rate. Animated backgrounds are a separate system — see below.

**Two mechanisms, chosen by trigger, not by taste.**

| Trigger | Mechanism | Why |
|---|---|---|
| A click (`v-click`, `$clicks`) | `transition` | Reversible — stepping back undoes it, which is what the speaker needs during Q&A |
| Slide entry | `animation` | Slidev keeps every slide in the DOM and `display: none`s the inactive ones. Animations don't run on a box that doesn't exist and restart when one appears, so "slide became visible" is a free trigger with no JS. Replays on every revisit |

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
| `v-click` reveals | Opacity + an 8px rise; instant when navigating backward (`.slidev-nav-go-backward`). The global backward rule only matches `.slidev-vclick-target`, so components with `$clicks`-driven transitions each carry their own zero-duration override. The **whole** selector goes inside `:global(...)` — Vue's scoped compiler keeps only the `:global()` portion of a mixed selector like `:global(.a) .b` and silently drops the rest |
| Dense build slides | Opt in with `class: dim-prior` — dims already-revealed lines to 0.5 so the eye finds the live one. Gated on `:has(.slidev-vclick-hidden)`: once the last reveal lands, the whole slide rests at full strength — a finished slide dimmed to 0.5 reads as disabled, in Q&A and in the exported PDF, which captures exactly that final state. Deliberately not global; most slides want the speaker able to point back at full strength. Currently on four slides |
| `cover`, `statement`, `fact` | Staggered entrance on the heading. `fact` gets opacity only — that layout runs to within ~12px of the bottom edge, so no Y travel. The opening cover is the exception: its title is `<CoverTitleSwap>`, below, and its subtitle arrives at the end of that build, so it opts out of the `h1 + p` entrance with `:not(.cover-title-swap)`. The closing "Thank You" cover still takes the plain path, and its one click — "Questions..?", the floor opening — rides the global `v-click` reveal with no motion of its own |
| `quote` | The 4px rule draws itself (`scaleY`), as a `::before` — a `border-left` can only animate its width, in layout, against the text. `padding-left: calc(1rem + 4px)` carries the border's old offset so text position is unchanged. Progressive quotes and `QuotePair` carry the rule per line/quote, not per container: a v-click hides with opacity so hidden content keeps its height, and a container-level rule would draw to final height on entry. Click-gated segments ride the v-click state as a `transition` (reversible, instant backward), each extended up over the line gap so the finished bar is seamless |
| Markdown blockquotes | Same drawn rule, sharing the `quote` layout's `::before` declaration. All eight in the deck sit inside a `<v-click>`, so the rule always takes the transition path rather than the entry animation — the `.slidev-vclick-target` / `-hidden` / backward overrides are duplicated for the `blockquote` selector because the progressive-line ones carry a different geometry (negative `left`, extended `top`). Unlike the layout, the rule spans the attribution too: it is a paragraph inside the same block here, not a separate grid item |
| `MermaidDiagram` | Builds node by node on entry, ~90ms apart, in mermaid source order. Reads `.node[data-id]` / `.edge[data-from][data-to]` off the rendered SVG, which is **not** a documented `beautiful-mermaid` contract — a version bump that renames those loses the stagger and keeps the diagram. Edges wait for the later of their two endpoints, or feedback arrows draw out of nodes that don't exist yet. Disable per slide with `reveal="none"` |
| `ProblemExplorationDiagram` | One panel per click (3 clicks); panel 1 is present on arrival and draws its spiral via `pathLength="1"` + `stroke-dashoffset`, with the 86 dots trailing the line |
| `RolesBlurDiagram` | Three beats: sequential handoffs, then the three lobes converging, then JUDGMENT. The caption is held to the last beat because it names the overlap — showing it earlier gives away the punchline the diagram spends two clicks earning |
| `SoftwareMiddleDiagram`, `KitchenAnalogyDiagram`, `GuardrailsLaneDiagram`, `SwissCheeseDiagram`, `ConfidenceSpiralDiagram` | Redrawn from the old raster illustrations as brand-token SVG (theme-aware via `var(--brand-*)`, no per-theme image pairs needed). CSS-only staggered rise entrances on the motion tokens, line draws via `pathLength="1"` dashes; hidden states live in keyframe `from`s. Arrowheads on drawn lines are polygons that fade in when the draw lands, never `marker-end` — a marker sits at the path's end from the start, ignoring the dash draw. `SwissCheeseDiagram` *reads* `$clicks` without consuming any: its "incident" through-arrow rides the slide's second text click as a transition (reversible, instant backward), brightening the aligned holes as it threads them. `GuardrailsLaneDiagram` is the exception on entrances: its only call site sits inside a `<v-click>`, and a slide-entry animation would run to completion behind the opacity-hidden wrapper — so its build rides the wrapping v-click state as a transition (`:global(.slidev-vclick-hidden)` holds the pre-build state), playing when the click reveals it. Marks that trail a draw (Guardrails' bounce impacts, SwissCheese's brightening holes, ConfidenceSpiral's pills) fire on delays computed through `--motion-ease`'s progress curve, not linear path fractions — the draw decelerates, covering ~73% of the path in the first ~34% of its duration, so a linear delay lags the tip by an increasing margin. The inverse-bezier fractions live in each component's comments; redo that math if the token curve changes |
| `ConstraintRingDiagram`, `AgencyLadderDiagram`, `IssueToPrDiagram` | Entry builds on the static pre-click elements only, so the animation never contends with the `$clicks`-driven transitions for the same properties: the ring's eight gates and the ladder's seven rungs land on the deck's ~90ms stagger; `IssueToPrDiagram` enters with just its issue card, because its stages ARE the click choreography and an entry build would replay it |
| `ThreeLoopsDiagram` | Ng's three loops as nested rings, not stacked boxes — the agent's cycle runs inside the developer's inside the market's, and the shape echoes the constraint ring. Arrowheads sit on each rect's stroke (top edge running right, bottom running left) so the rectangles read as circulations. Staggered rise entrance, outermost ring first, inward-flow arrows last; consumes no clicks |
| `LongTailDiagram` | Every internal workflow ranked by payoff, with a dashed build threshold. The curve draws on entry (`pathLength="1"`), threshold and head fill land after the draw; the threshold's drop rides the slide's **second** click as a transform transition (reading `$clicks` without consuming any, like `SwissCheeseDiagram`), leaving a ghost line at the old height while the newly buildable band fades in beneath it. Both wedge fills are too steep for interior text, so region labels sit in adjacent clear space |
| `MergeLedgerCompare` | Year-against-year bars from the personal Merge Ledger export (aggregate only — no repo names). The legend is the only slide-entry animation; each metric takes two clicks (`clicks: 6`, the component consumes none) so the speaker can hold the old year as long as the narration needs — the odd click lands the label and the old year's sliver, the even click sweeps the new year's bar over `--motion-draw` while a BigNumber-recipe count-up (rAF-timestamped, easeOutCubic, print- and reduced-motion-guarded, duration read off `--motion-draw` at mount so it can never desync from the sweep) runs the number up beside it, multiplier last. The prior bars carry a 3px floor: 5 tests against 57,179 is 0.008%, and "practically nothing but not nothing" is the honest rendering |
| `MergeLedgerChart` | Real data, not a stylised curve: monthly merged-PR counts from the personal Merge Ledger export, hardcoded in the component (aggregate only — no repo names). The line is two paths split at December 2025 because the halves are two story beats: the flat year draws on slide entry at 1.5× `--motion-draw` — deliberately the slowest draw in the deck, since the beat *is* how long a normal year takes — and stops dead at the bend; the climb, per-month point labels and a dashed January-2026 event rule (with its emphasized axis tick — the moment the title names) ride the slide's first click as transitions (reversible, instant backward), like `SwissCheeseDiagram` reading `$clicks` without consuming any, so the markdown reveal is pinned `at="2"` and the slide declares `clicks: 2`. No area fill — it was tried and cut for how it entered. The climb is direct-labeled selectively, not one number per point — seven labels in the climb's quarter of the frame collide however placed, so the story months carry their counts (176, 264, 790, bold 1,354 under a small date, 1,172; Apr and May only echo their neighbours and stay bare), halo-stroked in `--brand-bg`, placement following the line's shape. Two recessive gridlines (500 / 1,000, static chrome) give the numbers a scale — without one, the flat year reads as literally zero. The climb's easing is the deck's one deliberate departure from `--motion-ease`: an ease-in, because the line is a story of acceleration and the token curve decelerates |
| `CoverTitleSwap` | The deck's opening beat, and the one place a single click runs a multi-step build: a red rule draws across "Vibe Coding", holds, the name swaps to "Agentic Engineering", then the subtitle lands — about 1.9s end to end, chained on `transition-delay` (1040 / 1320 / 1720ms) rather than on further clicks. It reads `$clicks` and the slide declares `clicks: 1`; nothing here is a `v-click`, so Slidev has no other way to know there is a step. Transitions, not animations, and the backward overrides matter more here than anywhere else — a two-second build replayed in reverse with its delays intact is the worst case of stepping back. The rule is a second copy of the word set in transparent ink so only its `line-through` shows, clipped from the left to draw: that hands placement to the font's own strikethrough metrics rather than a guessed percentage, which matters because the cover's 5rem line box is far taller than its 3.75rem text. A ~0.05em upward nudge on top, since a mid-x-height rule reads low under 60px display caps; Roboto and Inter have the same cap-to-x-height gap, so one nudge fits both themes. A diagonal was tried and rejected — the ink band runs 33-76% of the line box under a word ~440pt wide, and at that aspect ratio any angle steep enough to read as a gesture drops below the baseline over the first third of the word, so it looks like an underline sliding up rather than a cross-out. Both names share one grid cell, so the swap crossfades in place with no reflow. The revealed subtitle restates `opacity: 0.5` — the theme's own `h1 + p` value, which the scoped selector would otherwise outrank |
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

Every slide jitters its own backdrop so seven dividers and thirteen statement slides don't run
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
without a source image. Shader backdrops on the white text-only content slides were also tried
and rejected (`dotGrid`, `dithering`, `waves` full-field patterns and a `pulsingBorder` edge
treatment, at 0.14/0.08 strength via a shadowed default layout): none survived review, and
content slides stay deliberately flat white — texture belongs to the display layouts.

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
