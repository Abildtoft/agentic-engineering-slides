# Narrated auto-mode — status and next steps

_Last updated 2026-08-20. Mechanism lives in `AGENTS.md`; this file is state and
what to do next._

## Where this stands

The deck has a second way to run: `?auto=1` turns it into a self-presenting
talk. A HeyGen avatar ("Matt", voice "Ben") narrates, click reveals fire on cue
times measured inside his speech, and slides advance when each clip ends.
Opened normally the deck fetches nothing and renders nothing — the on-stage path
still has zero network dependency, which was the design constraint throughout.

**The pipeline is finished and verified. 10 of 59 slides have narration.** The
remaining work is almost entirely writing, not engineering.

| | |
|---|---|
| Narrated | 10 / 59 slides — 881 words, 14 cues, 4.7 min of speech |
| Rendered | 10 clips, 62 MB, tracked via Git LFS |
| Balance | **$17.15** |
| Measured cost | **$0.48 per minute** of rendered narration |

## Coverage

```
00-intro                      3/3   ✓
01-the-shift                  6/6   ✓
02-disappearing-middle        1/7   ← stopped mid-section
03a-new-stack-concepts        0/4
03b-new-stack-tools           0/10
04-cognitive-debt             0/10
05-pipeline-and-what-matters  0/11
06-moving-forward             0/8
                             10/59
```

## What to do next

**49 slides of prose. That is the only real blocker.** Everything below is
sequencing advice.

1. **Draft the prose as text, section by section.** Costs nothing — it is
   markdown in `narration/`. The presenter notes carry the substance; they are
   deliberately not reused verbatim, because they are instructions to a speaker
   ("let it sit for a beat"), not spoken prose.
2. **Review it as text before spending anything.** Cheaper and faster than
   reviewing it as speech, and prose is where the remaining risk lives.
3. **Then one `yarn narration:audio` pass.** Real voice, real word-timed cues,
   real auto-advance, with a still instead of video. This is where pacing gets
   judged by ear for the first time. Video is ~99% of the cost, so revise here
   as many times as it takes.
4. **`yarn narration:build` once, at the end**, when the prose has stopped
   moving.

Use `--only=<section>` while writing so a build touches one section at a time.

## Decisions waiting on you

**1. Slide 2's narration is invented.** It reads, in full:

> Hi, I'm Mikkel. I build software at Consensus, and for the past year I have
> been building it in a way that would have been unrecognisable to me two years
> ago.

Everything after the first sentence was inferred from the deck, not from you.
Replace it before anyone hears it.

**2. Slides 4–10 will re-render on a full build (~$2), for nothing.** Their
cache hashes predate `resolution` entering the hash string, so they mismatch
even though the clips on disk are correct. Re-rendering would also make them
*worse*: they are v2-encoded at ~158 KB/s, and v3 re-renders come back at
~520 KB/s — you would pay to triple their size and get different takes of clips
already approved.
   - **Cheapest:** use `--only=<section>` and never trigger a full build.
   - **Or:** a small restamp step that recomputes the hash for entries whose
     file on disk is already correct for the current parameters. Not built —
     say the word.

**3. Pacing is still unvalidated by ear.** `SLIDE_GAP_MS` 700, `SECTION_GAP_MS`
1500, `CUE_LEAD_SECONDS` 0.25, `DISSOLVE_MS` 220 — all chosen by measurement and
reasoning, none confirmed against your own sense of timing. One line each.
   - Related: the drafted narration runs at **186 words/min**, which is brisk
     for a talk. Worth listening for whether it feels rushed before writing 49
     more slides at the same pace.

**4. Nothing is pushed.** Two commits sit on `heygen-avatar-slide-narration-v1`
ahead of `origin/main`. Pushing is also the moment the Git LFS bandwidth clock
starts.

**5. The HeyGen MCP is registered but unauthorized** (`⏸ Pending approval`).
Only affects the `heygen-video` skill; this pipeline does not use it. Needs an
interactive `claude` session to approve, then `/mcp` for OAuth.

## Budget

Remaining 49 slides project to **~23 min more speech ≈ $11**, against a **$17.15**
balance. That fits, but without much room to render the whole deck twice — which
is exactly why the prose review happens in text and the pacing review in audio
mode.

A fully narrated deck projects to **~28 min of speech**. Worth noting that is
shorter than a 45-minute slot: the narrated version is a companion artifact, not
a recording of the live talk.

## Traps worth knowing

These have each already cost something once. Full detail in `AGENTS.md`.

- **A render is not reproducible.** Re-rendering the same prose returns a
  *different take* — same words, different head movement. A lost clip can be
  replaced but never reproduced, which is why clips are versioned and why
  `narration:recover` exists.
- **`git-lfs` is now required to clone this repo.** Without it the clips arrive
  as pointer text and auto-mode plays silence — a failure that reads like a bug
  rather than a missing tool.
- **After adding, removing or reordering slides, run `yarn narration:scaffold`.**
  Narration is keyed by (file, index within file); the build hard-errors on a
  count mismatch rather than guessing, which is the intended behaviour.
- **Full-frame diagram slides generally want `narrator: hidden`.** Verified on
  both data slides in section 1, where every corner covers a number the slide
  exists to show. Voice and cues carry on; only the picture goes.
- **`yarn narration:voices` before spending.** The voice must be Starfish, or
  `word_timestamps` comes back null, cues get spaced evenly, and the drift only
  shows up on stage.

## Commands

```
yarn narration:scaffold          # regenerate narration/ from the deck (offline)
yarn narration:voices            # preflight: voice, avatar, balance
yarn narration:build --dry-run   # resolved cue times + duration, no video spend
yarn narration:audio             # cheap mode — voice + cues + a still
yarn narration:build             # the real render
yarn narration:recover           # re-download clips from the account, free
```

Credentials: `HEYGEN_API_KEY` comes from the Conductor-exported environment;
`.env` carries the two resource ids. See `.env.example`.

## Verified / not verified

**Verified:** both themes build; all 10 clips play at 1280×720 and ship into
`dist/narration/`; a fresh clone materialises real video through LFS; cue times
land within ~30 ms of the manifest in-browser; `narration:recover` restored all
ten clips for $0 and is idempotent; the build re-downloads rather than re-renders
a deleted clip, byte-identically.

**Not verified:** pacing by ear over a full section; anything past slide 10.
