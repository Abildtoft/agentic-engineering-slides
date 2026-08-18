<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useIsSlideActive, useNav, useSlideContext } from '@slidev/client'
import {
  ShaderMount,
  meshGradientFragmentShader,
  godRaysFragmentShader,
  neuroNoiseFragmentShader,
  getShaderColorFromString,
  getShaderNoiseTexture,
  ShaderFitOptions,
} from '@paper-design/shaders'

/**
 * Each surface pairs a palette whose last entry is a no-op under its blend mode
 * — screen ignores near-black, multiply ignores near-white. That gives the
 * shader clear regions to drift through instead of tinting the whole slide, and
 * it bounds the damage: on dark slides the background can only lighten, on light
 * slides only darken, so text contrast can never invert.
 *
 * Blend mode and strength live in CSS (see the style block below), because the
 * two themes want different strengths from the same palette structure.
 */
const SURFACES = {
  dark: ['--brand-glow', '--brand-primary', '--brand-text'],
  light: ['--brand-glow', '--brand-primary', '--brand-bg'],
}

/**
 * Every shader gets the surface palette as [accent, primary, neutral], where
 * neutral is the entry the blend mode ignores. Each entry maps those three onto
 * whatever uniform names its shader wants, so a shader can be swapped per slide
 * without touching the palette or the contrast guarantees.
 */
const SHADERS = {
  meshGradient: {
    fragment: meshGradientFragmentShader,
    uniforms: ([accent, primary, neutral]) => ({
      u_colors: [accent, primary, neutral],
      u_colorsCount: 3,
      u_distortion: 0.6,
      u_swirl: 0.3,
      u_grainMixer: 0,
      u_grainOverlay: 0,
    }),
  },
  godRays: {
    fragment: godRaysFragmentShader,
    needsNoise: true,
    // Rays radiate from the centre, so the source is pushed into the top-left
    // corner — beams raking across the slide rather than bursting out from
    // behind the title. Scaled below 1 to keep the whole fan in frame.
    sizing: { scale: 0.75, offsetX: -0.55, offsetY: -0.45 },
    uniforms: ([accent, primary, neutral]) => ({
      u_colorBack: neutral,
      u_colorBloom: accent,
      u_colors: [accent, primary],
      u_colorsCount: 2,
      u_spotty: 0.2,
      u_midSize: 0.15,
      u_midIntensity: 0.15,
      u_density: 0.8,
      u_intensity: 0.9,
      u_bloom: 0.5,
    }),
  },
  neuroNoise: {
    fragment: neuroNoiseFragmentShader,
    // Zoomed well out: at scale 1 the filaments read as huge organic blobs
    // rather than the fine network the shader is recognisable for.
    sizing: { scale: 0.3 },
    uniforms: ([accent, primary, neutral]) => ({
      u_colorFront: accent,
      u_colorMid: primary,
      u_colorBack: neutral,
      u_brightness: 0.35,
      u_contrast: 0.8,
    }),
  },
}
// paperTexture is deliberately absent: its `image` param is typed optional, but
// without a source image the shader renders flat colorBack at any settings, so
// there is nothing to composite. It's an image treatment, not a background.

/**
 * Per-slide variation, so seven dividers don't run the identical backdrop.
 *
 * Only framing and time are jittered, never colour or strength. The contrast
 * figures in AGENTS.md are derived by flooding the shader's colours to one solid
 * value at its shipped opacity — the worst frame it could ever produce. Rotating,
 * offsetting, scaling or time-shifting the field changes *where* colours land,
 * not *which* colours are reachable, so every one of those figures still bounds
 * the varied output. Jittering opacity, the palette, or godRays' `bloom` /
 * `intensity` would move the bound itself and invalidate the measurements.
 *
 * Ranges are per shader because they don't have equivalent freedom:
 * - meshGradient is drifting colour pools with no canonical orientation, and it
 *   runs on the surfaces with the most contrast headroom (`light` measures
 *   9.78:1), so it gets the full range.
 * - godRays is framed deliberately — its source is pushed off the top-left corner
 *   so the beams rake across rather than burst from behind the title (see
 *   `sizing` above). Rotation is kept narrow to preserve that, and because the
 *   divider gradient is the tightest contrast case in the deck. The time offset
 *   does most of the visual work there anyway.
 */
/** Every entry is a symmetric spread around the shader's own value: rotation in
    degrees (180 is the full circle once signed), offset and scale as fractions. */
const VARIANCE = {
  meshGradient: {
    rotation: 180,
    offset: 0.18,
    scale: 0.12,
    // Both are 0-1 organic-distortion powers; jitter is applied around whatever
    // the shader's own defaults are, and clamped there.
    params: { u_distortion: 0.15, u_swirl: 0.12 },
  },
  godRays: {
    rotation: 18,
    offset: 0.06,
    scale: 0.08,
  },
  neuroNoise: {
    rotation: 180,
    offset: 0.2,
    scale: 0.15,
  },
}

/** How far the starting `u_time` can be pushed. Time is `speed x seconds`, so a
    divider left up for a couple of minutes already passes 60 — the shaders
    plainly tolerate this magnitude, which a much larger range would risk in
    float precision for no extra variety. */
const FRAME_RANGE = 240

/**
 * Deterministic, not random — the distinction matters more than it looks.
 * `Math.random()` here would mean the exported PDF disagrees with the screen,
 * presenter mode's two windows disagree with each other, and the deck the speaker
 * rehearses isn't the one they present. Hashing the slide number instead gives
 * every slide its own settled look that survives all three.
 *
 * `salt` draws independent values from one seed, so rotation and offset don't
 * move together.
 */
function hashUnit(seed, salt) {
  let h = (seed * 2654435761 + salt * 40503) >>> 0
  h ^= h >>> 15
  h = (h * 2246822519) >>> 0
  h ^= h >>> 13
  return h / 4294967296
}

const signedHash = (seed, salt) => hashUnit(seed, salt) * 2 - 1
const clamp01 = v => Math.min(1, Math.max(0, v))

/** getShaderNoiseTexture() returns a fresh, still-decoding Image on every call,
    and ShaderMount's constructor throws on one that isn't complete. Created once
    here so the decode starts at import — long before the first godRays slide. */
const noiseTexture = getShaderNoiseTexture()

const props = defineProps({
  // defineProps() is hoisted out of setup(), so these validators can't
  // reference SURFACES/SHADERS — the keys are repeated literally instead.
  /** Which background the shader sits on — see SURFACES. */
  surface: {
    type: String,
    default: 'dark',
    validator: v => ['dark', 'light'].includes(v),
  },
  /** Which shader to render — see SHADERS. */
  shader: {
    type: String,
    default: 'meshGradient',
    validator: v => ['meshGradient', 'godRays', 'neuroNoise'].includes(v),
  },
  /** Animation speed. 0 renders a single static frame and stops the RAF loop. */
  speed: { type: Number, default: 0.25 },
  /** Overrides the surface's default strength. */
  opacity: { type: Number, default: null },
  /** Zoom level. Null uses the shader's own default — they frame differently. */
  scale: { type: Number, default: null },
  /** Per-shader uniform overrides, merged over the SHADERS defaults. */
  params: { type: Object, default: () => ({}) },
  /** Overrides the slide number as the variation seed — a way to reshuffle one
      slide's look without moving it in the deck. */
  seed: { type: Number, default: null },
  /** Set false to render the shader at its unjittered framing. */
  vary: { type: Boolean, default: true },
})

const colorVars = computed(() => SURFACES[props.surface] || SURFACES.dark)
const shader = computed(() => SHADERS[props.shader] || SHADERS.meshGradient)

const host = ref(null)
const shaderReady = ref(false)
const isActive = useIsSlideActive()
const { isPrintMode } = useNav()
const { $renderContext, $page } = useSlideContext()

/** Resolved jitter for this slide. Zeroed when `vary` is false so the unvaried
    path is the shader's own framing exactly, not a jitter that rounds to it.
    `paramDeltas` are offsets rather than values — they're applied against the
    shader's real defaults in create(), where those are in scope. */
const variance = computed(() => {
  if (!props.vary) {
    return { rotation: 0, offsetX: 0, offsetY: 0, scaleFactor: 1, frame: 0, paramDeltas: {} }
  }
  const range = VARIANCE[props.shader] || VARIANCE.meshGradient
  const seed = props.seed ?? $page?.value ?? 0
  return {
    rotation: signedHash(seed, 1) * range.rotation,
    offsetX: signedHash(seed, 2) * range.offset,
    offsetY: signedHash(seed, 3) * range.offset,
    scaleFactor: 1 + signedHash(seed, 4) * range.scale,
    frame: hashUnit(seed, 5) * FRAME_RANGE,
    paramDeltas: Object.fromEntries(
      Object.entries(range.params ?? {}).map(([name, spread], i) => [
        name,
        signedHash(seed, 6 + i) * spread,
      ]),
    ),
  }
})

let mount = null

/** Approximates the shader in plain CSS for print export and any browser
    without WebGL, so those still get depth rather than a flat panel. It also
    covers the moment before the canvas takes over on slide entry.

    Each var() falls back to transparent: an undefined token would otherwise be
    the guaranteed-invalid value, which invalidates the whole `background`
    shorthand and drops both gradients rather than just the one it appears in. */
const fallbackBackground = computed(() => {
  const [first, second] = colorVars.value
  return `radial-gradient(60% 55% at 25% 30%, var(${first}, transparent) 0%, transparent 70%),
          radial-gradient(55% 50% at 78% 72%, var(${second}, transparent) 0%, transparent 70%)`
})

/** Lets a slide override the theme's strength inline: <ShaderBackground :opacity="0.5" /> */
const rootStyle = computed(() =>
  props.opacity === null ? null : { '--shader-strength': props.opacity },
)

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const targetSpeed = () => (prefersReducedMotion() ? 0 : props.speed)

function create() {
  // A canvas exports as a frozen frame at best, and blank on a headless GPU —
  // the CSS fallback is the more reliable picture in print.
  if (mount || isPrintMode.value || !host.value) return

  // The presenter's next-frame pane and the overview grid render live copies of
  // the current slide in the same document, so isActive is true there too. A
  // shader per thumbnail is wasted GPU; they get the CSS fallback instead.
  if ($renderContext.value !== 'slide' && $renderContext.value !== 'presenter') return

  // The constructor throws on an image that hasn't decoded, so hold off until it
  // has. The CSS fallback covers the wait, and the guard above stops the retry
  // from double-mounting.
  if (shader.value.needsNoise && !noiseTexture.complete) {
    noiseTexture.addEventListener('load', () => isActive.value && create(), { once: true })
    return
  }

  const styles = getComputedStyle(document.documentElement)
  const colors = colorVars.value
    .map(name => styles.getPropertyValue(name).trim())
    .filter(Boolean)
    .map(getShaderColorFromString)

  if (colors.length < colorVars.value.length) {
    console.error('ShaderBackground: theme is missing one of', colorVars.value.join(', '))
    return
  }

  const sizing = shader.value.sizing ?? {}
  const jitter = variance.value

  /** Per-slide jitter on the shader's own 0-1 shape params, clamped to that
      range — a negative distortion is not a valid uniform. */
  const base = shader.value.uniforms(colors)
  for (const [name, delta] of Object.entries(jitter.paramDeltas)) {
    if (typeof base[name] === 'number') base[name] = clamp01(base[name] + delta)
  }

  try {
    mount = new ShaderMount(
      host.value,
      shader.value.fragment,
      {
        ...base,
        ...(shader.value.needsNoise ? { u_noiseTexture: noiseTexture } : {}),
        u_fit: ShaderFitOptions.cover,
        u_scale: (props.scale ?? sizing.scale ?? 1.4) * jitter.scaleFactor,
        u_rotation: jitter.rotation,
        u_originX: 0.5,
        u_originY: 0.5,
        u_offsetX: (sizing.offsetX ?? 0) + jitter.offsetX,
        u_offsetY: (sizing.offsetY ?? 0) + jitter.offsetY,
        u_worldWidth: 0,
        u_worldHeight: 0,
        // Last so a slide can override any of the above, framing and jitter
        // included.
        ...props.params,
      },
      // Positional, per ShaderMount(parent, fragment, uniforms,
      // webGlContextAttributes, speed, frame). No geometry edges to sample, so
      // antialias only costs a multisampled buffer and a resolve pass.
      // minPixelRatio is left at the library default of 2: the canvas is sized
      // from the untransformed layout box while Slidev scales the slide, so the
      // shader is already upscaled on screen, and dropping to 1 measured no
      // faster (median frame time flat from 2.2 to 8.3 megapixels).
      { antialias: false },
      targetSpeed(),
      // The library's own seed hook: "Pass a frame to offset the starting u_time
      // value and give deterministic results". Two slides on the same shader
      // start in different regions of its noise field.
      jitter.frame,
    )
  } catch (error) {
    // The context is created before the program is compiled, so a link failure
    // throws with a live context and a canvas already prepended — and `mount`
    // never gets assigned, so destroy() can't reach either. Clear them here or
    // every revisit to this slide leaks another. No WebGL2 at all throws too.
    console.error('ShaderBackground: mount failed, using CSS fallback', error)
    host.value.replaceChildren()
    mount = null
    return
  }

  shaderReady.value = true
}

function destroy() {
  mount?.dispose()
  mount = null
  shaderReady.value = false
}

/** Bound to the visible slide rather than mounted once: Slidev keeps every
    slide in the DOM, so mounting eagerly would hold one WebGL context per
    section at all times — enough to hit the browser's overall context limit,
    which presenter mode's second window doubles pressure on. */
watch(isActive, active => (active ? create() : destroy()))

/** A different shader means a different fragment program, so it needs a fresh
    mount rather than a uniform update. The variation is read once at mount, so a
    seed change needs the same treatment. */
watch([() => props.shader, () => props.surface, () => props.seed, () => props.vary], () => {
  if (!isActive.value) return
  destroy()
  create()
})

onMounted(() => {
  if (isActive.value) create()
})

onBeforeUnmount(destroy)
</script>

<template>
  <div class="shader-bg" :data-surface="surface" :style="rootStyle" aria-hidden="true">
    <div
      class="shader-bg-layer"
      :class="{ 'is-visible': !shaderReady }"
      :style="{ background: fallbackBackground }"
    />
    <div ref="host" class="shader-bg-layer" :class="{ 'is-visible': shaderReady }" />
  </div>
</template>

<style scoped>
.shader-bg,
.shader-bg-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* Negative z-index inside the layout's isolated stacking context: paints over
   the slide's own gradient, under every piece of content. */
.shader-bg {
  z-index: -1;
  overflow: hidden;
}

/* Strength defaults live here and are overridable per theme in styles/themes/,
   because the same palette reads differently against each brand's backgrounds.
   Raising either cuts text contrast — re-measure before you do.

   The blend mode sits on the wrapper, not the layers: `z-index` above makes
   .shader-bg a stacking context, and a stacking context is an isolated group,
   so a blend mode on a child would composite against this element's own empty
   backdrop instead of the slide's background — a no-op. */
.shader-bg[data-surface='dark'] {
  --shader-strength: var(--brand-shader-dark, 0.3);
  mix-blend-mode: screen;
}

.shader-bg[data-surface='light'] {
  --shader-strength: var(--brand-shader-light, 0.12);
  mix-blend-mode: multiply;
}

.shader-bg-layer {
  opacity: 0;
  transition: opacity 500ms ease;
}

.shader-bg-layer.is-visible {
  opacity: var(--shader-strength);
}
</style>
