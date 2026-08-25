<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useNav } from '@slidev/client'
import { captureAnalytics, elapsedSecondsSince } from '../utils/analytics.mjs'

/**
 * Self-presenting mode — the default way the deck opens. `?auto=0` opts out
 * for live presentation (the presenter window and print are excluded anyway).
 *
 * The media clock owns click timing, while `phase` owns the viewer experience.
 * Keeping those concerns separate is important: a network stall must stop cues,
 * and pausing during a slide handoff must not leave a timer able to restart the
 * deck behind the viewer's back.
 */
const MANIFEST_URL = '/narration/manifest.json'
const MASCOT_URL = '/narration/mascot.json'
const SILENT_DWELL_MS = 3500
const SLIDE_GAP_MS = 700
const SECTION_GAP_MS = 1500
const INTERMISSION_DURATION_SECONDS = 5 * 60
const DISSOLVE_MS = 220
const DISSOLVE_EASE = 'cubic-bezier(0.4, 0, 0.6, 1)'

const {
  clicks,
  clicksStart,
  clicksTotal,
  currentSlideNo,
  currentSlideRoute,
  go,
  isPresenter,
  isPrintMode,
  next,
  nextSlide,
  prevSlide,
  slides,
  total,
} = useNav()

const enabled = computed(() => {
  const query = new URLSearchParams(location.search)
  return !isPrintMode.value && !isPresenter.value && query.get('auto') !== '0'
})

const phase = ref('loading')
const errorMessage = ref('')
const manifest = ref(null)
const mascotManifest = ref(null)
const hasStarted = ref(false)
const speaking = ref(false)
const playhead = ref(0)
const playbackRate = ref(1)
const captionsEnabled = ref(false)
const narratorView = ref('mascot')
const controlsOpen = ref(false)
const transcriptOpen = ref(false)
const breakSeconds = ref(0)
const startAvatarLoaded = ref(false)

const videoA = ref(null)
const videoB = ref(null)
const activeIndex = ref(0)
const elements = () => [videoA.value, videoB.value]
const activeEl = () => elements()[activeIndex.value]
const idleEl = () => elements()[1 - activeIndex.value]

let frame = null
let dwellTimer = null
let breakTimer = null
let breakStartedAt = null
let handoffTimers = []
let cueIndex = 0
let autoAdvanced = false
let pausedSlide = null
let currentMediaEl = null
let completionTracked = false
const currentCandidates = ref([])
const currentSourceIndex = ref(0)

const PLACEMENTS = ['bottom-right', 'bottom-left', 'top-right', 'top-left', 'hidden']
const frontmatter = computed(() => currentSlideRoute.value?.meta?.slide?.frontmatter ?? {})
const placement = computed(() => {
  const wanted = frontmatter.value.narrator
  return PLACEMENTS.includes(wanted) ? wanted : 'bottom-right'
})
const tileEmphasis = computed(() =>
  currentSlideNo.value === 1 || frontmatter.value.layout === 'section' ? 'featured' : 'compact',
)

const entryFor = no => manifest.value?.slides?.[no] ?? null
const entry = computed(() => entryFor(currentSlideNo.value))
const basename = url => url?.split('/').pop()

function mascotFor(no) {
  const original = entryFor(no)
  const mascot = mascotManifest.value?.slides?.[no]
  const speech = basename(original?.video ?? original?.audio)
  return mascot && mascot.source === speech ? mascot : null
}

function candidatesFor(no) {
  const original = entryFor(no)
  if (!original) return []

  const mascot = mascotFor(no)
  let originalSource = null
  if (original.video) originalSource = { url: original.video, visual: true, kind: 'original' }
  else if (original.audio) originalSource = { url: original.audio, visual: false, kind: 'audio' }
  const mascotSource = mascot?.video
    ? { url: mascot.video, visual: true, kind: 'mascot' }
    : null

  const ordered = new URLSearchParams(location.search).get('mascot') === '0'
    ? [originalSource, mascotSource]
    : [mascotSource, originalSource]

  const seen = new Set()
  return ordered.filter(candidate => {
    if (!candidate?.url || seen.has(candidate.url)) return false
    seen.add(candidate.url)
    return true
  })
}

const currentSource = computed(() => currentCandidates.value[currentSourceIndex.value] ?? null)
const avatarVisible = computed(() => narratorView.value !== 'voice' && placement.value !== 'hidden')
const still = computed(() => {
  if (currentSource.value?.kind === 'original') return manifest.value?.still ?? null
  return mascotManifest.value?.still ?? manifest.value?.still ?? null
})

watch(still, () => {
  startAvatarLoaded.value = false
})

const cardVisible = computed(() =>
  (!hasStarted.value && ['loading', 'ready'].includes(phase.value))
  || ['intermission', 'ended', 'error'].includes(phase.value),
)

const chapters = computed(() => {
  const found = [{ no: 1, title: 'Introduction' }]
  for (const route of slides.value) {
    const slide = route.meta?.slide
    if (slide?.frontmatter?.layout !== 'section') continue
    found.push({ no: route.no, title: slide.title || `Section ${found.length}` })
  }
  return found
})

const currentChapter = computed(() => {
  let active = chapters.value[0]
  for (const chapter of chapters.value) {
    if (chapter.no > currentSlideNo.value) break
    active = chapter
  }
  return active
})

const chapterRows = computed(() => {
  const list = chapters.value
  return list.map((chapter, index) => {
    const end = list[index + 1]?.no ?? total.value + 1
    let duration = 0
    for (let no = chapter.no; no < end; no++) duration += entryFor(no)?.duration ?? 0
    const state = chapter.no === currentChapter.value.no
      ? 'current'
      : chapter.no < currentChapter.value.no ? 'played' : 'upcoming'
    return { ...chapter, index: index + 1, duration, state }
  })
})

const totalDuration = computed(() =>
  Object.values(manifest.value?.slides ?? {}).reduce((sum, slide) => sum + (slide.duration ?? 0), 0),
)
const elapsedBeforeCurrent = computed(() => {
  let elapsed = 0
  for (let no = 1; no < currentSlideNo.value; no++) elapsed += entryFor(no)?.duration ?? 0
  return elapsed
})
const overallElapsed = computed(() => Math.min(totalDuration.value, elapsedBeforeCurrent.value + playhead.value))
const remainingDuration = computed(() => Math.max(0, totalDuration.value - overallElapsed.value))
const canGoBack = computed(() => currentSlideNo.value > 1)
const canGoForward = computed(() => currentSlideNo.value < total.value)

const currentCaption = computed(() => {
  if (!captionsEnabled.value) return ''
  const captions = entry.value?.captions ?? []
  return captions.find(caption => playhead.value >= caption.start && playhead.value < caption.end)?.text ?? ''
})

const statusLabel = computed(() => ({
  buffering: 'Buffering…',
  paused: 'Paused',
  transitioning: 'Next slide…',
  intermission: 'Intermission',
  error: 'Playback problem',
}[phase.value] ?? `${currentChapter.value?.title ?? 'Talk'} · Slide ${currentSlideNo.value} of ${total.value}`))

function formatClock(seconds) {
  if (!Number.isFinite(seconds)) return '0:00'
  const rounded = Math.max(0, Math.round(seconds))
  return `${Math.floor(rounded / 60)}:${String(rounded % 60).padStart(2, '0')}`
}

function roundedSeconds(seconds) {
  return Math.round((Number(seconds) || 0) * 100) / 100
}

function captureNarration(event, properties = {}) {
  captureAnalytics(event, {
    slide_number: currentSlideNo.value,
    slide_count: total.value,
    chapter: currentChapter.value?.title ?? 'Introduction',
    playback_position_seconds: roundedSeconds(playhead.value),
    talk_position_seconds: roundedSeconds(overallElapsed.value),
    total_duration_seconds: roundedSeconds(totalDuration.value),
    playback_rate: playbackRate.value,
    phase: phase.value,
    media_source: currentSource.value?.kind ?? 'none',
    ...properties,
  })
}

function clearPlaybackTimers() {
  clearTimeout(dwellTimer)
  dwellTimer = null
  for (const timer of handoffTimers) clearTimeout(timer)
  handoffTimers = []
}

function stopBreakTimer() {
  clearInterval(breakTimer)
  breakTimer = null
}

function clearBreakTimer() {
  stopBreakTimer()
  breakStartedAt = null
}

function resetMediaElement(element, candidate) {
  if (!element || !candidate) return
  element.playbackRate = playbackRate.value
  if (element.dataset.src !== candidate.url) {
    element.dataset.src = candidate.url
    element.src = candidate.url
    element.load()
  }
}

function primeCurrent() {
  clearPlaybackTimers()
  currentCandidates.value = candidatesFor(currentSlideNo.value)
  currentSourceIndex.value = 0
  playhead.value = 0
  speaking.value = false

  if (!currentCandidates.value.length) {
    phase.value = 'ready'
    return
  }

  phase.value = 'loading'
  currentMediaEl = idleEl()
  resetMediaElement(currentMediaEl, currentCandidates.value[0])
  if (currentMediaEl?.readyState >= 3) phase.value = 'ready'
}

function preloadNext() {
  const candidate = candidatesFor(currentSlideNo.value + 1)[0]
  const buffer = idleEl()
  if (!candidate || !buffer) return
  resetMediaElement(buffer, candidate)
}

function syncClicksToTime(time) {
  const targetClicks = (entry.value?.cues ?? []).filter(cue => cue <= time).length + clicksStart.value
  go(currentSlideNo.value, Math.min(clicksTotal.value, targetClicks))
}

function tick() {
  frame = requestAnimationFrame(tick)
  const element = activeEl()
  if (!element || element.paused) return

  playhead.value = element.currentTime
  const cues = entry.value?.cues ?? []
  while (cueIndex < cues.length && element.currentTime >= cues[cueIndex]) {
    cueIndex++
    if (clicks.value < clicksTotal.value) next()
  }
}

function gapForCurrent() {
  return frontmatter.value.layout === 'section' ? SECTION_GAP_MS : SLIDE_GAP_MS
}

function swapTo(target) {
  if (!target) {
    failPlayback('The narration player could not be prepared.')
    return
  }
  const outgoing = activeEl()
  activeIndex.value = 1 - activeIndex.value
  currentMediaEl = target
  if (target.readyState > 0 && target.currentTime !== 0) target.currentTime = 0
  outgoing?.pause()
}

function playTarget(target) {
  if (!target) return
  target.playbackRate = playbackRate.value
  phase.value = 'buffering'
  speaking.value = true
  target.play().catch(error => failPlayback(`Playback was blocked: ${error.message}`))
}

function scheduleSilentSlide() {
  phase.value = 'transitioning'
  speaking.value = false
  dwellTimer = setTimeout(() => advance(), SILENT_DWELL_MS)
}

function isIntermission() {
  return Boolean(frontmatter.value.narrationPause)
}

function playCurrent({ gap = 0 } = {}) {
  clearPlaybackTimers()
  cueIndex = 0
  playhead.value = 0
  errorMessage.value = ''

  if (!enabled.value || !hasStarted.value) return
  if (isIntermission()) {
    phase.value = 'intermission'
    speaking.value = false
    return
  }

  currentCandidates.value = candidatesFor(currentSlideNo.value)
  currentSourceIndex.value = 0
  if (!currentCandidates.value.length) {
    scheduleSilentSlide()
    return
  }

  const target = idleEl()
  currentMediaEl = target
  resetMediaElement(target, currentCandidates.value[0])

  const speak = () => {
    playTarget(target)
    handoffTimers.push(setTimeout(preloadNext, DISSOLVE_MS + 40))
  }

  if (gap <= 0) {
    swapTo(target)
    speak()
    return
  }

  phase.value = 'transitioning'
  speaking.value = false
  handoffTimers = [
    setTimeout(() => swapTo(target), Math.max(0, gap - DISSOLVE_MS)),
    setTimeout(speak, gap),
  ]
}

async function advance() {
  if (currentSlideNo.value >= total.value) {
    phase.value = 'ended'
    speaking.value = false
    if (!completionTracked) {
      completionTracked = true
      captureNarration('talk_completed', { completion_percent: 100 })
    }
    return
  }
  autoAdvanced = true
  await nextSlide()
}

function onEnded(event) {
  if (event.target !== activeEl()) return
  playhead.value = event.target.duration || entry.value?.duration || 0
  speaking.value = false

  if (clicks.value < clicksTotal.value) {
    console.warn(
      `AvatarNarrator: slide ${currentSlideNo.value} has ${clicksTotal.value - clicks.value} ` +
        'reveal(s) the narration never cued',
    )
  }
  advance()
}

function onCanPlay(event) {
  if (event.target !== currentMediaEl) return
  if (!hasStarted.value && phase.value === 'loading') phase.value = 'ready'
}

function onPlaying(event) {
  if (event.target !== activeEl()) return
  phase.value = 'playing'
  errorMessage.value = ''
}

function onWaiting(event) {
  if (event.target === activeEl() && ['playing', 'buffering'].includes(phase.value)) phase.value = 'buffering'
}

function onMediaError(event) {
  if (event.target !== currentMediaEl && event.target !== activeEl()) return
  const nextCandidate = currentCandidates.value[currentSourceIndex.value + 1]
  if (nextCandidate) {
    currentSourceIndex.value++
    resetMediaElement(event.target, nextCandidate)
    if (hasStarted.value && phase.value !== 'paused') playTarget(event.target)
    return
  }
  failPlayback('The narration clip could not be loaded.')
}

function failPlayback(message) {
  clearPlaybackTimers()
  speaking.value = false
  errorMessage.value = message
  phase.value = 'error'
  captureNarration('narration_error', { error_message: message })
}

function start() {
  if (phase.value !== 'ready') return
  hasStarted.value = true
  captureNarration('narration_started', { start_method: 'start_card' })
  playCurrent()
}

function pause(reason = 'control') {
  if (!['playing', 'buffering', 'transitioning'].includes(phase.value)) return
  pausedSlide = currentSlideNo.value
  clearPlaybackTimers()
  for (const element of elements()) element?.pause()
  phase.value = 'paused'
  captureNarration('narration_paused', { reason })
}

function resume() {
  if (phase.value !== 'paused') return
  const element = activeEl()
  const validSource = currentCandidates.value.some(candidate => candidate.url === element?.dataset.src)
  if (pausedSlide === currentSlideNo.value && validSource && element?.readyState > 0) playTarget(element)
  else playCurrent()
  captureNarration('narration_resumed')
}

function toggle() {
  if (phase.value === 'ready') start()
  else if (phase.value === 'paused') resume()
  else pause()
}

function backTen() {
  const element = activeEl()
  if (!element?.duration) return
  const target = Math.max(0, element.currentTime - 10)
  element.currentTime = target
  playhead.value = target
  cueIndex = (entry.value?.cues ?? []).filter(cue => cue <= target).length
  syncClicksToTime(target)
}

function changeSpeed(event) {
  const previousRate = playbackRate.value
  playbackRate.value = Number(event.target.value)
  for (const element of elements()) {
    if (element) element.playbackRate = playbackRate.value
  }
  localStorage.setItem('narrator-speed', String(playbackRate.value))
  captureNarration('playback_speed_changed', {
    previous_rate: previousRate,
    playback_rate: playbackRate.value,
  })
}

function toggleCaptions() {
  captionsEnabled.value = !captionsEnabled.value
  localStorage.setItem('narrator-captions', captionsEnabled.value ? '1' : '0')
  captureNarration('captions_toggled', { enabled: captionsEnabled.value })
}

function toggleNarratorView() {
  narratorView.value = narratorView.value === 'voice' ? 'mascot' : 'voice'
  localStorage.setItem('narrator-view', narratorView.value)
  captureNarration('narrator_view_changed', { view: narratorView.value === 'voice' ? 'voice' : 'face' })
}

function toggleTranscript() {
  transcriptOpen.value = !transcriptOpen.value
  controlsOpen.value = false
  captureNarration('transcript_toggled', { open: transcriptOpen.value })
}

function closeTranscript() {
  if (!transcriptOpen.value) return
  transcriptOpen.value = false
  captureNarration('transcript_toggled', { open: false })
}

function toggleChapters() {
  controlsOpen.value = !controlsOpen.value
  if (transcriptOpen.value) closeTranscript()
}

async function navigateSlide(direction) {
  autoAdvanced = false
  if (direction < 0) await prevSlide()
  else await nextSlide()
}

async function goChapter(no) {
  const targetChapter = chapterRows.value.find(chapter => chapter.no === no)
  const wasStarted = hasStarted.value
  if (!wasStarted) {
    captureNarration('narration_started', {
      start_method: 'chapter',
      target_slide_number: no,
      target_chapter: targetChapter?.title,
    })
  }
  captureNarration('chapter_selected', {
    target_slide_number: no,
    target_chapter: targetChapter?.title,
  })
  completionTracked = false
  hasStarted.value = true
  controlsOpen.value = false
  transcriptOpen.value = false
  if (no === currentSlideNo.value) playCurrent()
  else await go(no)
}

function startBreak() {
  clearBreakTimer()
  breakStartedAt = Date.now()
  breakSeconds.value = INTERMISSION_DURATION_SECONDS
  breakTimer = setInterval(() => {
    const elapsed = elapsedSecondsSince(breakStartedAt, Date.now(), INTERMISSION_DURATION_SECONDS)
    breakSeconds.value = INTERMISSION_DURATION_SECONDS - elapsed
    if (breakSeconds.value === 0) stopBreakTimer()
  }, 1000)
  captureNarration('intermission_started', { break_duration_seconds: INTERMISSION_DURATION_SECONDS })
}

async function continueIntermission() {
  const breakElapsed = elapsedSecondsSince(breakStartedAt, Date.now(), INTERMISSION_DURATION_SECONDS)
  captureNarration('intermission_continued', { break_elapsed_seconds: breakElapsed })
  clearBreakTimer()
  breakSeconds.value = 0
  autoAdvanced = true
  await nextSlide()
}

async function restart() {
  captureNarration('talk_replayed')
  completionTracked = false
  hasStarted.value = true
  if (currentSlideNo.value === 1) playCurrent()
  else await go(1)
}

function retryCurrent() {
  if (!manifest.value) {
    loadManifests()
    return
  }
  hasStarted.value = true
  playCurrent()
}

function leaveAutoMode() {
  captureNarration('narration_disabled', { disabled_from_phase: phase.value })
  const url = new URL(location.href)
  url.searchParams.set('auto', '0')
  url.searchParams.delete('mascot')
  location.assign(url)
}

async function loadManifests() {
  phase.value = 'loading'
  errorMessage.value = ''
  try {
    const [response, mascot] = await Promise.all([
      fetch(MANIFEST_URL),
      fetch(MASCOT_URL).then(r => (r.ok ? r.json() : null)).catch(() => null),
    ])
    if (!response.ok) throw new Error(`manifest returned ${response.status}`)
    const loadedManifest = await response.json()

    // Commit both manifests in the same render. Publishing the speech manifest
    // first briefly exposed its HeyGen still before the preferred mascot
    // manifest arrived, making the start card flash between two faces.
    mascotManifest.value = mascot
    manifest.value = loadedManifest
    await nextTick()
    primeCurrent()
  } catch (error) {
    failPlayback(`Narration could not be prepared: ${error.message}`)
  }
}

function onKeydown(event) {
  if (!enabled.value || ['INPUT', 'SELECT', 'BUTTON'].includes(event.target?.tagName)) return
  if (event.key === 'k' || event.key === ' ') {
    event.preventDefault()
    toggle()
  } else if (event.key.toLowerCase() === 'c') {
    toggleCaptions()
  } else if (event.key.toLowerCase() === 'm') {
    toggleNarratorView()
  }
}

function onVisibilityChange() {
  if (document.hidden) pause('tab_hidden')
}

watch(currentSlideNo, () => {
  const remainPaused = phase.value === 'paused'
  clearBreakTimer()
  breakSeconds.value = 0
  const gap = autoAdvanced ? gapForCurrent() : 0
  autoAdvanced = false
  if (!manifest.value) return
  if (!hasStarted.value) primeCurrent()
  else if (remainPaused) {
    clearPlaybackTimers()
    currentCandidates.value = candidatesFor(currentSlideNo.value)
    currentSourceIndex.value = 0
    currentMediaEl = idleEl()
    if (currentCandidates.value[0]) resetMediaElement(currentMediaEl, currentCandidates.value[0])
    speaking.value = false
    playhead.value = 0
    pausedSlide = currentSlideNo.value
    phase.value = 'paused'
  }
  else playCurrent({ gap })
})

onMounted(() => {
  if (!enabled.value) return
  document.documentElement.dataset.narrated = ''
  playbackRate.value = Number(localStorage.getItem('narrator-speed')) || 1
  captionsEnabled.value = localStorage.getItem('narrator-captions') === '1'
  narratorView.value = localStorage.getItem('narrator-view') === 'voice' ? 'voice' : 'mascot'
  frame = requestAnimationFrame(tick)
  document.addEventListener('keydown', onKeydown, true)
  document.addEventListener('visibilitychange', onVisibilityChange)
  loadManifests()
})

onBeforeUnmount(() => {
  delete document.documentElement.dataset.narrated
  cancelAnimationFrame(frame)
  clearPlaybackTimers()
  clearBreakTimer()
  document.removeEventListener('keydown', onKeydown, true)
  document.removeEventListener('visibilitychange', onVisibilityChange)
})
</script>

<template>
  <div v-if="enabled" class="narrator-ui" :data-phase="phase">
    <Transition name="narrator-scrim">
      <div v-if="cardVisible" class="narrator-scrim" aria-hidden="true" />
    </Transition>
    <section v-if="!hasStarted && ['loading', 'ready'].includes(phase)" class="narrator-card narrator-start" aria-live="polite">
      <div class="narrator-start-avatar" aria-hidden="true">
        <img
          v-if="still"
          :src="still"
          :class="{ 'is-loaded': startAvatarLoaded && phase !== 'loading' }"
          alt=""
          @load="startAvatarLoaded = true"
        />
        <span v-if="phase === 'loading' || !startAvatarLoaded" class="narrator-start-spinner" />
      </div>
      <div>
        <p class="narrator-kicker">AI-narrated talk</p>
        <h2>Agentic Engineering</h2>
        <p class="narrator-card-copy">
          How AI agents are reshaping software engineering: the shift underway, what happens
          to the middle of the job, the new stack — context, specs, skills, MCP — the
          cognitive debt it creates, and the skills that survive. Mikkel’s first-person
          talk, read by a synthetic voice and character.
        </p>
        <p class="narrator-meta">{{ formatClock(totalDuration) }} · {{ total }} slides · captions included</p>
      </div>
      <button class="narrator-primary" type="button" :disabled="phase === 'loading'" @click="start">
        {{ phase === 'loading' ? 'Preparing narration…' : 'Play from beginning' }}
      </button>
      <button class="narrator-dismiss" type="button" @click="leaveAutoMode">Present without narration</button>
      <details v-if="phase === 'ready'" class="narrator-chapters">
        <summary>Start from a chapter</summary>
        <div class="narrator-chapter-list">
          <button
            v-for="chapter in chapterRows"
            :key="chapter.no"
            type="button"
            :data-state="chapter.state"
            :aria-current="chapter.state === 'current' ? 'true' : undefined"
            @click="goChapter(chapter.no)"
          >
            <span class="narrator-chapter-index">{{ String(chapter.index).padStart(2, '0') }}</span>
            <span class="narrator-chapter-title">{{ chapter.title }}</span>
            <span class="narrator-chapter-length">{{ formatClock(chapter.duration) }}</span>
          </button>
        </div>
      </details>
    </section>

    <section v-if="phase === 'intermission'" class="narrator-card narrator-moment" aria-live="polite">
      <p class="narrator-kicker">Halfway point</p>
      <h2>{{ breakSeconds ? 'Break timer' : 'Take a breath' }}</h2>
      <p v-if="breakSeconds" class="narrator-break-clock">{{ formatClock(breakSeconds) }}</p>
      <p v-else class="narrator-card-copy">Continue now, or take five minutes before Cognitive Debt.</p>
      <div class="narrator-actions">
        <button class="narrator-primary" type="button" @click="continueIntermission">Continue</button>
        <button v-if="!breakSeconds" class="narrator-secondary" type="button" @click="startBreak">Start 5 min break</button>
      </div>
    </section>

    <section v-if="phase === 'ended'" class="narrator-card narrator-moment" aria-live="polite">
      <p class="narrator-kicker">Talk complete</p>
      <h2>Thanks for watching</h2>
      <p class="narrator-card-copy">Replay the talk or jump back to a chapter.</p>
      <button class="narrator-primary" type="button" @click="restart">Replay from beginning</button>
      <div class="narrator-chapter-list narrator-end-chapters">
        <button
            v-for="chapter in chapterRows"
            :key="chapter.no"
            type="button"
            :data-state="chapter.state"
            :aria-current="chapter.state === 'current' ? 'true' : undefined"
            @click="goChapter(chapter.no)"
          >
            <span class="narrator-chapter-index">{{ String(chapter.index).padStart(2, '0') }}</span>
            <span class="narrator-chapter-title">{{ chapter.title }}</span>
            <span class="narrator-chapter-length">{{ formatClock(chapter.duration) }}</span>
          </button>
      </div>
    </section>

    <section v-if="phase === 'error'" class="narrator-card narrator-moment" role="alert">
      <p class="narrator-kicker">Playback problem</p>
      <h2>Narration stopped</h2>
      <p class="narrator-card-copy">{{ errorMessage }}</p>
      <div class="narrator-actions">
        <button class="narrator-primary" type="button" @click="retryCurrent">Retry</button>
        <button v-if="canGoForward" class="narrator-secondary" type="button" @click="navigateSlide(1)">Next slide</button>
        <button class="narrator-secondary" type="button" @click="leaveAutoMode">Open without narration</button>
      </div>
    </section>

    <div
      v-if="manifest"
      class="narrator"
      :data-placement="placement"
      :data-emphasis="tileEmphasis"
      :data-hidden="!hasStarted || !avatarVisible || ['ended', 'error', 'intermission'].includes(phase) || null"
    >
      <div class="narrator-frame">
        <img v-if="still" class="narrator-layer" :src="still" alt="" />
        <video
          v-for="(_, index) in 2"
          :key="index"
          :ref="element => (index === 0 ? (videoA = element) : (videoB = element))"
          class="narrator-layer narrator-video"
          :class="{ 'is-active': activeIndex === index && currentSource?.visual && speaking && avatarVisible }"
          playsinline
          preload="auto"
          @canplay="onCanPlay"
          @ended="onEnded"
          @error="onMediaError"
          @playing="onPlaying"
          @waiting="onWaiting"
        />
      </div>
    </div>

    <aside v-if="transcriptOpen && entry?.transcript" class="narrator-transcript" aria-label="Current slide transcript">
      <div>
        <strong>{{ currentChapter?.title }} · Slide {{ currentSlideNo }}</strong>
        <button type="button" aria-label="Close transcript" @click="closeTranscript">×</button>
      </div>
      <p>{{ entry.transcript }}</p>
    </aside>

    <nav v-if="hasStarted && !['ended', 'error', 'intermission'].includes(phase)" class="narrator-controls" aria-label="Narration controls">
      <div class="narrator-progress" :style="{ '--narrator-progress': `${(overallElapsed / totalDuration) * 100 || 0}%` }" />
      <div v-if="captionsEnabled" class="narrator-caption" aria-live="off">{{ currentCaption }}</div>
      <div class="narrator-controls-row">
        <button type="button" :disabled="!canGoBack" aria-label="Previous slide" title="Previous slide" @click="navigateSlide(-1)">←</button>
        <button type="button" aria-label="Back ten seconds" title="Back 10 seconds" @click="backTen">−10</button>
        <button class="narrator-play" type="button" :aria-label="phase === 'paused' ? 'Resume narration' : 'Pause narration'" @click="toggle">
          {{ phase === 'paused' ? '▶' : 'Ⅱ' }}
        </button>
        <button type="button" :disabled="!canGoForward" aria-label="Next slide" title="Next slide" @click="navigateSlide(1)">→</button>
        <div class="narrator-status">
          <strong>{{ statusLabel }}</strong>
          <span>{{ formatClock(overallElapsed) }} · −{{ formatClock(remainingDuration) }}</span>
        </div>
        <button type="button" :aria-pressed="captionsEnabled" title="Toggle captions (C)" @click="toggleCaptions">CC</button>
        <button type="button" :aria-pressed="narratorView === 'voice'" title="Toggle narrator picture (M)" @click="toggleNarratorView">
          {{ narratorView === 'voice' ? 'Voice' : 'Face' }}
        </button>
        <label class="narrator-speed">
          <span class="sr-only">Playback speed</span>
          <select :value="playbackRate" title="Playback speed" @change="changeSpeed">
            <option value="0.8">0.8×</option>
            <option value="1">1×</option>
            <option value="1.2">1.2×</option>
            <option value="1.5">1.5×</option>
          </select>
        </label>
        <button type="button" :aria-expanded="transcriptOpen" title="Transcript" @click="toggleTranscript">Transcript</button>
        <button type="button" :aria-expanded="controlsOpen" title="Chapters" @click="toggleChapters">Chapters</button>
      </div>
      <div v-if="controlsOpen" class="narrator-chapter-list narrator-control-chapters">
        <button
            v-for="chapter in chapterRows"
            :key="chapter.no"
            type="button"
            :data-state="chapter.state"
            :aria-current="chapter.state === 'current' ? 'true' : undefined"
            @click="goChapter(chapter.no)"
          >
            <span class="narrator-chapter-index">{{ String(chapter.index).padStart(2, '0') }}</span>
            <span class="narrator-chapter-title">{{ chapter.title }}</span>
            <span class="narrator-chapter-length">{{ formatClock(chapter.duration) }}</span>
          </button>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.narrator-ui {
  position: fixed;
  inset: 0;
  z-index: 60;
  pointer-events: none;
  color: var(--brand-text);
}

.narrator-ui button,
.narrator-ui details,
.narrator-ui select {
  pointer-events: auto;
}

.narrator-scrim {
  position: absolute;
  inset: 0;
  background: color-mix(in srgb, var(--brand-bg) 12%, transparent);
  backdrop-filter: blur(14px);
}

.narrator-scrim-enter-active,
.narrator-scrim-leave-active {
  transition: opacity var(--motion-slow) var(--motion-ease);
}

.narrator-scrim-enter-from,
.narrator-scrim-leave-to {
  opacity: 0;
}

.narrator-card {
  position: absolute;
  left: 50%;
  top: 50%;
  width: min(430px, calc(100% - 3rem));
  transform: translate(-50%, -50%);
  padding: 1.4rem;
  border: 1px solid color-mix(in srgb, var(--brand-primary) 22%, transparent);
  border-radius: 1rem;
  background: color-mix(in srgb, var(--brand-bg) 94%, transparent);
  box-shadow: 0 18px 60px rgb(0 0 0 / 22%);
  backdrop-filter: blur(12px);
  pointer-events: auto;
}

.narrator-start {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 1rem;
}

.narrator-start-avatar {
  position: relative;
  width: 72px;
  height: 72px;
  grid-row: span 2;
  overflow: hidden;
  border-radius: 0.8rem;
  background: var(--brand-bg-accent);
}

.narrator-start-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity var(--motion-base) var(--motion-ease);
}

.narrator-start-avatar img.is-loaded {
  opacity: 1;
}

.narrator-start-spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 24px;
  height: 24px;
  border: 3px solid color-mix(in srgb, var(--brand-bg) 28%, transparent);
  border-top-color: var(--brand-bg);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: narrator-spin 0.8s linear infinite;
}

@keyframes narrator-spin {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .narrator-start-spinner { animation: none; }
}

.narrator-card h2 {
  margin: 0.12rem 0 0.45rem;
  color: var(--brand-primary);
  font-size: 1.45rem;
  line-height: 1.15;
}

.narrator-kicker,
.narrator-meta,
.narrator-card-copy {
  margin: 0;
}

.narrator-kicker {
  color: var(--brand-primary);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.narrator-card-copy {
  font-size: 0.85rem;
  line-height: 1.45;
  opacity: 0.82;
}

.narrator-meta {
  margin-top: 0.55rem;
  font-size: 0.76rem;
  opacity: 0.68;
}

.narrator-primary,
.narrator-secondary,
.narrator-chapter-list button {
  border-radius: 0.6rem;
  font: inherit;
  cursor: pointer;
}

.narrator-primary {
  grid-column: 1 / -1;
  padding: 0.65rem 0.85rem;
  border: 1px solid var(--brand-primary);
  background: var(--brand-primary);
  color: var(--brand-bg);
  font-weight: 650;
}

.narrator-primary:disabled {
  cursor: wait;
  opacity: 0.62;
}

.narrator-secondary {
  padding: 0.6rem 0.8rem;
  border: 1px solid color-mix(in srgb, var(--brand-primary) 32%, transparent);
  background: var(--brand-bg);
  color: var(--brand-primary);
}

.narrator-dismiss {
  grid-column: 1 / -1;
  padding: 0;
  border: 0;
  background: none;
  color: var(--brand-text);
  font: inherit;
  font-size: 0.78rem;
  opacity: 0.6;
  text-decoration: underline;
  cursor: pointer;
  justify-self: center;
}

.narrator-chapters {
  grid-column: 1 / -1;
  font-size: 0.78rem;
}

.narrator-chapters summary {
  cursor: pointer;
  color: var(--brand-primary);
  font-weight: 600;
}

.narrator-chapter-list {
  display: grid;
  gap: 0.3rem;
  margin-top: 0.55rem;
}

.narrator-chapter-list button {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.55rem;
  align-items: baseline;
  padding: 0.42rem 0.6rem;
  border: 0;
  background: var(--brand-surface);
  color: var(--brand-text);
  text-align: left;
}

.narrator-chapter-list button:hover,
.narrator-chapter-list button:focus-visible {
  background: color-mix(in srgb, var(--brand-primary) 10%, var(--brand-surface));
}

.narrator-chapter-index {
  color: var(--brand-primary);
  font-size: 0.68rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  opacity: 0.75;
}

.narrator-chapter-length {
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  opacity: 0.6;
}

/* Where you are in the talk: chapters already heard recede, the live one
   carries the tint. */
.narrator-chapter-list button[data-state='played'] :is(.narrator-chapter-title, .narrator-chapter-index) {
  opacity: 0.55;
}

.narrator-chapter-list button[data-state='current'] {
  background: color-mix(in srgb, var(--brand-primary) 12%, var(--brand-surface));
}

.narrator-chapter-list button[data-state='current'] .narrator-chapter-title {
  color: var(--brand-primary);
  font-weight: 650;
}

.narrator-moment {
  text-align: center;
}

.narrator-actions {
  display: flex;
  justify-content: center;
  gap: 0.55rem;
  margin-top: 1rem;
}

.narrator-moment .narrator-primary {
  display: inline-block;
  margin-top: 1rem;
}

.narrator-actions .narrator-primary {
  margin-top: 0;
}

.narrator-break-clock {
  margin: 0.7rem 0;
  color: var(--brand-primary);
  font-size: 2.8rem;
  font-variant-numeric: tabular-nums;
}

.narrator-end-chapters {
  margin-top: 0.8rem;
  text-align: left;
}

.narrator {
  position: absolute;
  width: 118px;
  transition: width var(--motion-base) var(--motion-ease);
}

.narrator[data-emphasis='featured'] {
  width: 150px;
}

.narrator[data-placement='bottom-right'] { right: 0.75rem; bottom: 0.75rem; }
.narrator[data-placement='bottom-left'] { left: 0.75rem; bottom: 0.75rem; }
.narrator[data-placement='top-right'] { right: 1.5rem; top: 1.5rem; }
.narrator[data-placement='top-left'] { left: 1.5rem; top: 1.5rem; }
.narrator[data-placement='hidden'],
.narrator[data-hidden] { right: 0.75rem; bottom: 0.75rem; }

.narrator[data-placement='hidden'] .narrator-frame,
.narrator[data-hidden] .narrator-frame {
  width: 1px;
  height: 1px;
  opacity: 0;
  box-shadow: none;
}

.narrator-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border: 2px solid color-mix(in srgb, var(--brand-primary) 24%, transparent);
  border-radius: 0.75rem;
  background: var(--brand-bg-accent);
  box-shadow: 0 6px 24px rgb(0 0 0 / 18%);
}

.narrator-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.narrator-video {
  opacity: 0;
  transform: scale(1.015);
  transition:
    opacity v-bind('`${DISSOLVE_MS}ms`') v-bind('DISSOLVE_EASE'),
    transform v-bind('`${DISSOLVE_MS}ms`') v-bind('DISSOLVE_EASE');
}

.narrator-video.is-active {
  opacity: 1;
  transform: scale(1);
}

.narrator-caption {
  /* Lives inside the dock so the chrome is one band over the slide, not two.
     The row keeps its height while a caption is empty so the dock never
     jumps between sentences. */
  min-height: 1.7rem;
  padding: 0.3rem 0.75rem 0;
  font-size: 0.86rem;
  line-height: 1.35;
  text-align: center;
  text-wrap: balance;
  color: var(--brand-text);
}

.narrator-transcript {
  position: absolute;
  right: 1.5rem;
  bottom: calc(150px + 1.5rem); /* clears the featured tile in the corner below */
  width: 310px;
  max-height: 240px;
  overflow: auto;
  padding: 0.8rem;
  border: 1px solid color-mix(in srgb, var(--brand-primary) 20%, transparent);
  border-radius: 0.7rem;
  background: color-mix(in srgb, var(--brand-bg) 96%, transparent);
  box-shadow: 0 8px 28px rgb(0 0 0 / 18%);
  font-size: 0.72rem;
  line-height: 1.45;
  pointer-events: auto;
}

.narrator-transcript > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  color: var(--brand-primary);
}

.narrator-transcript button {
  border: 0;
  background: transparent;
  color: inherit;
  font-size: 1rem;
  cursor: pointer;
}

.narrator-transcript p {
  margin: 0.55rem 0 0;
}

.narrator-controls {
  position: absolute;
  left: 50%;
  bottom: 0.8rem;
  width: min(620px, calc(100% - 3rem));
  transform: translateX(-50%);
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--brand-primary) 20%, transparent);
  border-radius: 0.8rem;
  background: color-mix(in srgb, var(--brand-bg) 94%, transparent);
  box-shadow: 0 8px 28px rgb(0 0 0 / 18%);
  backdrop-filter: blur(12px);
  pointer-events: auto;
}

.narrator-progress {
  height: 3px;
  background:
    linear-gradient(90deg, var(--brand-primary) var(--narrator-progress), color-mix(in srgb, var(--brand-text) 12%, transparent) 0);
}

.narrator-controls-row {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.38rem;
}

.narrator-controls button,
.narrator-controls select {
  min-height: 30px;
  padding: 0.28rem 0.48rem;
  border: 0;
  border-radius: 0.42rem;
  background: transparent;
  color: var(--brand-primary);
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
}

.narrator-controls button:hover,
.narrator-controls button:focus-visible,
.narrator-controls select:hover,
.narrator-controls select:focus-visible {
  outline: none;
  background: var(--brand-surface);
}

.narrator-controls button:disabled {
  cursor: default;
  opacity: 0.35;
}

.narrator-controls .narrator-play {
  min-width: 34px;
  background: var(--brand-primary);
  color: var(--brand-bg);
}

.narrator-status {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  padding: 0 0.35rem;
  font-size: 0.66rem;
  line-height: 1.25;
}

.narrator-status strong,
.narrator-status span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.narrator-status span {
  opacity: 0.62;
  font-variant-numeric: tabular-nums;
}

.narrator-speed select {
  appearance: none;
}

.narrator-control-chapters {
  grid-template-columns: 1fr 1fr;
  margin-top: 0;
  padding: 0.1rem 0.45rem 0.45rem;
}

@media (prefers-reduced-motion: reduce) {
  .narrator,
  .narrator-video {
    transition-duration: 1ms;
  }
}
</style>
