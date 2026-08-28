# Narrated auto-mode — current status

_Last updated 2026-08-28. Stable mechanisms and implementation constraints live in
`AGENTS.md`; this file records only current state, routine commands, and open risks._

## Current state

- The deck has **63 slides** and **130 narration cues**.
- Auto-mode is the default browser experience. `?auto=0` opts out; presenter and print modes
  always disable narration.
- Speech is ElevenLabs `eleven_v3`, using the default Eric voice
  (`cjVigY5qzO86Huf0OWal`) at **1.2×** pace.
- `public/narration/manifest.json` covers all 63 slides with transcripts and captions. Its
  tracked duration is about **49 minutes**.
- `public/narration/mascot.json` covers the same 63 speech sources with Retrobot clips rendered
  at 512 px and 24 fps. The player attempts the original speech source if a mascot clip fails,
  but the currently shipped deck contains no speech fallback assets.
- Narration video is tracked through Git LFS. Speech `.mp3` files are local build intermediates
  and remain gitignored.
- HeyGen is retired. References that remain in code or tests document compatibility with legacy
  manifests; no current build command calls HeyGen.
- The narration feature surface is frozen until browser-level tests cover playback transitions,
  buffering, fallback, pause/resume, navigation, and keyboard controls. Fixes, test extraction,
  dependency maintenance, and content/media rebuilds remain in scope; new controls, states,
  providers, and integrations do not.

## Definition of done

```bash
yarn test      # deck parity, access gate, narration, analytics, and manifest checks
yarn verify    # all tests, then both branded Slidev builds
yarn doctor    # local runtime, LFS materialization/media headers, and optional authoring tools
```

CI runs `yarn verify` for pull requests and pushes to `main`.

## Routine narration workflow

After adding, removing, reordering, or rewriting slides:

1. Run `yarn narration:scaffold` to reconcile narration blocks with the deck.
2. Edit and review the corresponding prose in `narration/`.
3. Run `yarn narration:voices` before any paid synthesis.
4. Run `yarn narration:audio --dry-run` to review cache use, cue timing, and expected duration.
5. Run `yarn narration:audio` only when the paid rebuild is intentional.
6. Listen to changed slides, revise as needed, then run `yarn narration:mascot` for matching face
   clips.
7. Run `yarn verify` before committing the manifest and LFS changes.

Useful offline commands:

```bash
yarn narration:captions
yarn narration:mascot --optimize-existing
```

## Open risks and manual checks

- Synthesised narration still needs listening; structural checks cannot detect an awkward take,
  incorrect emphasis, or prose that is semantically out of step with a slide.
- Diagram-heavy slides need a visual check with the narrator tile and captions visible.
- A clone without Git LFS materialises pointer text instead of playable mascot video. Install it
  with `brew install git-lfs && git lfs install` before relying on auto-mode.
- ElevenLabs synthesis requires `ELEVENLABS_API_KEY` and ffmpeg. Mascot rendering additionally
  requires Chrome, the isolated renderer dependencies, and a valid Mascotbot plan/key.
- Confirm the commercial right to distribute Mascotbot characters before publishing rendered
  clips outside the currently licensed context.

Credentials and non-secret overrides are documented in `.env.example`.
