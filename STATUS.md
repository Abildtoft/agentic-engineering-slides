# Narrated auto-mode — status and next steps

_Last updated 2026-08-23. Mechanism lives in `AGENTS.md`; this file is state and
what to do next._

## Where this stands

The deck has a second way to run: `?auto=1` turns it into a self-presenting
talk. A HeyGen avatar ("Matt", voice "Ben") narrates, click reveals fire on cue
times measured inside his speech, and slides advance when each clip ends.
Opened normally the deck fetches nothing and renders nothing — the on-stage path
still has zero network dependency, which was the design constraint throughout.

**The pipeline is finished and verified. All 59 slides now play in auto-mode.**
10 carry a rendered avatar clip; 49 carry synthesised audio over the avatar's
still, which is the rehearsal state — `?auto=1` runs the whole deck end to end
with real voice, real word-timed cues and real auto-advance.

The viewer is now a full playback surface rather than a face with one button:
readiness and buffering states, fallback media, chapters, captions, transcript,
speed, rewind, remaining time, a real halfway intermission, and a replay/end
state. It explicitly labels the voice and character as synthetic. Captions were
added to all 59 cached entries without synthesis. The default mascot set was
transcoded from 720px/30fps to 512px/24fps, reducing it from 275.7 MiB to 106.1
MiB while keeping the reviewed motion and speech.

| | |
|---|---|
| Audio (rehearsal) | 49 / 59 slides — 36.4 min, every cue resolved from word timings, no fallbacks |
| Rendered | 10 / 59 slides (1–10) — 6.7 min, tracked via Git LFS |
| Full deck | **~43 min** of speech, 117 cues |
| Balance | **$0.57** |
| Measured cost | **$1 / min** Avatar III, **$4 / min** Avatar IV (v3 default) — TTS $0.05 / min |

## Coverage

```
                              audio  rendered
00-intro                        3/3      3/3
01-the-shift                    6/6      6/6
02-disappearing-middle          7/7      1/7
03a-new-stack-concepts          4/4      0/4
03b-new-stack-tools            10/10     0/10
04-cognitive-debt              10/10     0/10
05-pipeline-and-what-matters   11/11     0/11
06-moving-forward               8/8      0/8
                               59/59    10/59
```

Measured pace is **171 wpm**, not the 186 of the first ten slides — the new
prose has more full stops. The `.mp3`s are gitignored; a fresh checkout
re-synthesises them with `yarn narration:audio` for about $2.

`buildIndex()` validates clean: every block pairs with a slide, and the cue
counts match the real click totals (including the three the scaffold's header
comments under-count — `QuotePair` on slide 13 and the `$clicks`-driven
diagrams on 15 and 48).

## The render stopped — and why it was expensive

`yarn narration:build` on 2026-08-21 rendered slides 6–9 (3.3 min) and then
failed on slide 11 with `MOVIO_PAYMENT_INSUFFICIENT_CREDIT`. Those four clips
cost **$13.47 — about $4/min**.

**Cause: `POST /v3/videos` defaults to the Avatar IV engine when `engine` is
omitted, and Avatar IV is billed at $4/min against Avatar III's $1/min**
(HeyGen API pricing). The v2 endpoint the renderer was ported from used Avatar
III, which is why the earlier clips were cheap. Matt's look record lists
`avatar_iii`, `avatar_iv` and `avatar_v` under `supported_api_engines`.

Fixed: the build now sends `engine: avatar_iii` (override with
`HEYGEN_ENGINE`), the engine is part of the video cache hash, and slides 1–10
were restamped so the existing clips stay valid. At $1/min the remaining 49
slides (~36 min) are **~$36**, not ~$145.

**Balance is $0.57.** $1.65 was left after the render; a `--dry-run` then
re-synthesised all 49 audio slides for $1.08 because dry runs bypassed the
cache. That is also fixed — a dry run now reports cached cue times and spends
nothing.

Note that the **web plan's 600 monthly credits are a separate pool**; the API
bills only against the API wallet (`GET /v3/users/me` → `wallet`).

The build saved its progress (a mid-run failure now writes the manifest before
exiting), so nothing rendered was lost: slides 1–10 are video, 11–59 audio,
and the deck plays end to end in that mixed state.

**To finish:** top up the API wallet by ~$40 and run `yarn narration:build`.
It resumes from slide 11. Render quality differs between engines — Avatar IV
is the newer model — so compare slide 6 (IV) against slide 4 (III) before
deciding; if IV is worth it, `HEYGEN_ENGINE=avatar_iv` and ~$150.

## What to do next

1. **Listen.** `yarn dev`, open `/?auto=1`, press Start. The 49 new slides
   play as voice over the still. Revise the prose in `narration/`, re-run
   `yarn narration:audio` (only changed slides re-synthesise, ~$0.05 a minute),
   repeat. Three places are worth particular attention:
   - **Slide 2 is still invented** (see below) — unchanged from the last status.
   - **Slide 30, the temperature check**, can't offer a demo or a break in a
     recording. The draft says so and moves on. Cut it to silence if you'd
     rather the slide just held for its dwell.
   - **Slide 59** ends with "this is where I would open the floor." Decide
     whether the recording should acknowledge it is a recording at all.
2. **Check the narrator tile on the diagram slides** while it is on screen —
   the list is under Traps below.
3. **`yarn narration:build`** — only after the cost decision above. Safe to
   run bare, safe after audio passes (a video build replaces audio entries, an
   audio build never replaces a current video clip), and safe to interrupt: a
   failed render saves the manifest and the next run continues from there.

## Decisions waiting on you

**1. Slide 2's narration is invented.** It reads, in full:

> Hi, I'm Mikkel. I build software at Consensus, and for the past year I have
> been building it in a way that would have been unrecognisable to me two years
> ago.

Everything after the first sentence was inferred from the deck, not from you.
Replace it before anyone hears it.

**2. Rendering cost — see the section above.** ~$36 on Avatar III for the
remaining 49 slides; the wallet needs topping up first. Length still matters:
the longest slides are 7 (72s), 6 (69s), 46 (66s), 57 (65s), 45 (63s), 25
(62s), 20 (62s), 43 (61s), 26 (61s). Slides 6 and 7 grew when section 1 was
reworded for non-developers.

**3. Pacing is still unvalidated by ear.** `SLIDE_GAP_MS` 700, `SECTION_GAP_MS`
1500, `CUE_LEAD_SECONDS` 0.25, `DISSOLVE_MS` 220 — all chosen by measurement and
reasoning, none confirmed against your own sense of timing. One line each.
   - Related: 186 words/min is brisk for a talk. Worth listening to section 1
     before spending on 49 more slides at the same pace. Speed is a voice-side
     setting, not a prose one, so it can be changed without rewriting.

**4. The HeyGen MCP is registered but unauthorized** (`⏸ Pending approval`).
Only affects the `heygen-video` skill; this pipeline does not use it. Needs an
interactive `claude` session to approve, then `/mcp` for OAuth.

## Resolved since last status

- **Slides 4–10 no longer re-render on a full build.** Their hashes predated
  `resolution` entering the hash string. A new `--restamp=<slides>` option
  re-keys manifest entries to the current hash when the clip is already on
  disk; it was run once, and a bare `yarn narration:build` now reports
  `10 reused, 0.0 min of new speech`. Detail in `AGENTS.md`.
- **Section 1 reworded for non-developers** (slides 6–9: what an agent is
  versus an assistant, what a merged pull request, a commit and a test are).
  Re-rendered as video for $13.47 on Avatar IV — which is how the engine
  default was discovered. Those four are the only Avatar IV clips in the deck.
- **The whole deck plays.** One `yarn narration:audio` over the deck, $1.88,
  no cue fallbacks. Audio builds now leave a current video clip alone instead
  of replacing its manifest entry (which would have orphaned the mp4 and let
  `pruneOrphans` delete an approved take).
- **The narration work is merged and pushed** (#84, #85). The LFS bandwidth
  clock is running: every fresh checkout of the repo pulls 62 MB of clips.

## Traps worth knowing

These have each already cost something once. Full detail in `AGENTS.md`.

- **A render is not reproducible.** Re-rendering the same prose returns a
  *different take* — same words, different head movement. A lost clip can be
  replaced but never reproduced, which is why clips are versioned and why
  `narration:recover` exists.
- **A new hash input invalidates every cached clip.** If a parameter is ever
  added to the hash string again, `--restamp` the rendered slides before the
  next build, or pay to replace approved takes with different ones.
- **`git-lfs` is required to clone this repo.** Without it the clips arrive
  as pointer text and auto-mode plays silence — a failure that reads like a bug
  rather than a missing tool.
- **After adding, removing or reordering slides, run `yarn narration:scaffold`.**
  Narration is keyed by (file, index within file); the build hard-errors on a
  count mismatch rather than guessing, which is the intended behaviour.
- **Full-frame diagram slides generally want `narrator: hidden`.** Verified on
  both data slides in section 1. Sections 2–5 have several more diagram slides
  (11, 15, 23–29, 36, 43, 46, 48, 50) that have not been checked for tile
  collisions yet — do it during the audio pass, when the tile is on screen.
- **`yarn narration:voices` before spending.** The voice must be Starfish, or
  `word_timestamps` comes back null, cues get spaced evenly, and the drift only
  shows up on stage.

## Commands

```
yarn narration:scaffold          # regenerate narration/ from the deck (offline)
yarn narration:captions          # add captions to cached clips (offline)
yarn narration:voices            # preflight: voice, avatar, balance
yarn narration:build --dry-run   # cue times + duration; cached slides cost nothing
yarn narration:audio             # cheap mode — voice + cues + a still
yarn narration:build             # the real render
yarn narration:build --restamp=4-10   # re-key cached entries, no render
yarn narration:recover           # re-download clips from the account, free
yarn narration:mascot --optimize-existing  # resize current mascot clips offline
```

Credentials: `HEYGEN_API_KEY` comes from the Conductor-exported environment;
`.env` carries the two resource ids (they are also in `manifest.json`, which is
how a fresh workspace can recreate it). See `.env.example`.

## Verified / not verified

**Verified:** both themes build; all 10 clips play at 1280×720 and ship into
`dist/narration/`; a fresh clone materialises real video through LFS; cue times
land within ~30 ms of the manifest in-browser; `narration:recover` restored all
ten clips for $0 and is idempotent; the build re-downloads rather than re-renders
a deleted clip, byte-identically; after restamping, a bare build reuses all 10.

**Not verified:** any of the 49 new blocks by ear — they are built, not yet
listened to; pacing over a full section; tile placement on the diagram slides
past section 1.
