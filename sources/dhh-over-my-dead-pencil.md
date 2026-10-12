# Over My Dead Pencil

David Heinemeier Hansson (creator of Ruby on Rails, co-founder and CTO of 37signals), HEY World post, 6 October 2026. The post is a short write-up of his Rails World 2026 opening keynote (Austin, 23 September 2026); the keynote carries most of the usable material, so both are noted here.

## The post

- **The verdict.** "We're not going to write the vast majority of code by hand any longer. Coding agents have gotten so good that it's simply not an economically viable enterprise going forward to have humans typing out lines of Ruby, Rust, or C++."
- **The poll.** Asked how many people in the room were still writing "a material amount of code by hand on a weekly basis," "only a handful put up their hands."
- **Coworkers, not tools.** AI is "far more like gaining some new coworkers who are exceptionally good and fast at a wide range of tasks, but still need a bit of help with some."
- **The bloom.** "We're about to see an absolute bloom in software development as the price of development plummets and everyone realizes how much automation we still have left to do in this world."
- **Who should worry.** "The only programmers who have to worry about this change are those who refuse to embrace, or drag their feet on, the progress brought by the age of agents." It closes: "Don't go down with the pencils. There's so much to build. We need you."

## The keynote

Timestamps against the Rails World recording.

- **Pencils down (20:45).** "At 37signals a couple of weeks ago, we made the decision that it clearly means we're done writing code by hand." Hand-written code is now "an exceptional state. It is like seeing a bug in Sentry. Something here went wrong." "Maybe for a little while we'll still get the old pencil out and jot it down for them. But then we fix the machine. We fix the factory."
- **The poll (21:46).** "How many people here are still writing material amounts of code by hand on a weekly basis? Show of hands." His count: "about five." Two or three months earlier, he says, the same proclamation would have had people saying "that dude's got a screw loose."
- **The date (11:19).** "On November 24th 2025 we got the Kodak Brownie of our era" — Opus 4.5. "There was everything before November 24 and then there was everything after."
- **The painter (04:38–07:26).** He opens on Laurits Tuxen's portrait of the Danish royal family. Tuxen is his great-great-grandfather, and the painting, he says, still hangs in Copenhagen. After the Kodak Brownie (1900), painters "realized that depicting reality as perfectly as possible was no longer really an economically viable skill" and moved on: the Skagen painters to impressionism, Picasso to cubism. Tuxen himself sat for the camera late in life.
- **English (38:12).** "There is actually a programming language I like better than Ruby… It's called English."
- **His ledger (36:48–37:50).** About 30,000 lines of production Ruby a year for 21 years; 150,000 lines in August 2026 alone, "about 60 times" his long-run average. He concedes much of it is verbose Rust he never reads. Over half his work used to be Ruby; this year, about 3%.
- **Retired, without regret (39:21–41:05).** He has "retired from being a professional programmer," around March. "I spent a quarter of a damn century chiseling code by hand and loving every moment of it." Writing code by hand "is no longer an economically productive enterprise for the vast majority of programmers working at the vast majority of companies. That's today."
- **The Basecamp 5 false start (22:34–23:15).** In the spring, designers wrote the release's last features with agents. Each PR "seemed reasonable," but 20 or 30 together left the architecture "a little like a Swiss cheese," so 37signals went back to manual review. He now calls that "the wrong conclusion": a better model arrived weeks later.

## Before: the holdout

Lex Fridman Podcast #474, 12 July 2025: "I love chiseling my code, and the way I use AI is in a separate window. I don't let it drive my code. I've tried that. I've tried the Cursors and the Windsurfs and I don't enjoy that way of writing… I can literally feel competence draining out of my fingers." By Lex Fridman #501 (26 August 2026) he had written none of the code that shipped in his latest Omarchy release by hand.

## Deck fit

- **Section 1, closing beat.** The result that follows Clark's prediction ([[silent-sirens]]): Clark put a date on the parallel world, and DHH reports back from after it. The poll turns Clark's "which side of the divide" into a show of hands, and it can be rerun live.
- **The messenger is the evidence.** Danish, not an AI vendor, and the best-known holdout of 2025. The verdict alone repeats what Spotify and the frontier labs claim on "It's Not Just One Tool"; the conversion is what's new.
- **"The Curve Bent in January."** He dates the inflection to 24 November 2025, a month before the speaker's own ledger bends: the same curve, from someone else's career.
- **"Harness Engineering."** "Then we fix the machine. We fix the factory" is the slide's second click — improve the harness, not the output — in a CTO's words.
- **"Markdown Is the Program Now."** English as a better programming language than Ruby, from the person who loves Ruby most. Same claim as [[garry-tan-markdown-is-the-program]].
- **Closing statement.** The Tuxen story is "The craft evolves. It always has. But it remains craft." told through a painting in the same city as the talk, and it turns on the same words as the quote: "economically viable." It sits beside [[thorsten-ball-future-of-software-development]]'s shoemaker line: Ball says handcraft survives as a niche; Tuxen's generation found a new art.
- **Use with care.** The lines-of-code ledger invites the generated-code debate the deck avoids by keeping lines changed off its own ledger slides, and he concedes the point himself. The Basecamp 5 story looks like [[cognitive-debt]] evidence, but he draws the opposite conclusion (stepping back was the mistake), and "Swiss cheese" would collide with the deck's Swiss-cheese safety model. The keynote's 1,000× claim (17:38), the worst programmer without agents against the best with them, is a provocation, not evidence.

https://world.hey.com/dhh/over-my-dead-pencil-fb0f3647
https://www.youtube.com/watch?v=vDjW_dRyKXY
https://lexfridman.com/dhh-david-heinemeier-hansson-transcript/
