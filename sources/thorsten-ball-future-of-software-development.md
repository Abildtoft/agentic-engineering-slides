# What I Believe About the Future of Software Development

Thorsten Ball (Amp / Sourcegraph, previously Zed; author of *Writing an Interpreter in Go*), X post, 19 September 2026. The post is a screenshot of a note; the caption reads "Most predictions I see are still way too conservative. Here's mine."

Seventeen short beliefs, deliberately maximalist. The ones that matter for this deck:

- **Code review will die.** "It's already dead." Humans won't find a bug in model-written code in a reasonable time. They will "only review the system and its composition, but it won't be in PRs and it won't be by looking through every line of the code."
- **Unit tests might die too.** "Why have training wheels if you never fall over?" He has had models write 900 lines of Arduino C that compiled clean and ran first time on the device.
- **The craft of writing code will disappear.** "Yes, there are still Italian shoe makers around. But look at your feet."
- **The craft of building software will be more important than ever.** "Knowing how to solve business problems with software, how other software did it and why and why not, when and how to ship it, how to get feedback on it — that's the new game."
- **Most bugs won't be "coding" bugs.** "They'll be 'you asked for the wrong thing' bugs."
- **The terminal is dead.** Shells, editors and CLI flags will look as arcane as Perl one-liners. Said, he notes, as a lover of the terminal.
- **Tokens are the new computing paradigm.** Eighty years of deterministic computers have made us confuse "how computers have worked" with "how computers must work." "We're entering the post-binary era."
- **The triad of PM/Design/Eng will disappear.** Agile and SCRUM with it. "Engineers who act as 'meat proxies' and shove tickets into agents and report back to humans will no longer be valuable."
- **The gap between large-company and small-company engineering will widen.** Start-ups copying Google practices will look sillier than before.
- **There's no proof "good code" will matter.** The notion rests on code being cheap for humans to work with, and humans won't modify most code anymore.
- **Some people will be priced out.** "If you can't get enough tokens, you're playing second league."
- **It's questionable whether cheaper models will be used.** A smarter model makes fewer mistakes and needs fewer turns: "When do you really think 'I'm okay with it being wrong a few times?'"
- **UI will be generated on the fly.** Menus, settings, dashboards, filters are "a human-accessible API to a dumb machine. Smart machines need much less UI."
- **It'll take a while to play out.** A generation, like ASP developers still employed today. "But do you want to have that job?"

## Deck fit

- **Section 4, "From Reviewing Code to Reviewing Intent."** Ball is the maximalist end of the line that Jain ([[how-to-kill-the-code-review]]) and Osmani ([[osmani-selective-human-review]]) sit on: they relocate review upstream and tier it by blast radius; he says the line-by-line read is already gone and only the system and its composition get reviewed. "You asked for the wrong thing" bugs is the sharpest one-line version of the slide's closing question, "Are we solving the right problem?", and of [[osmani-intent-debt]].
- **Section 2 and the closing statement.** "The craft of writing code will disappear" against "the craft of building software will be more important than ever" is the same split as [[karpathy-coding-vs-building]] and [[code-is-cheap]], and it is the honest version of "The craft evolves. It always has. But it remains craft." The Italian shoemaker line is quotable and lands the "look at your feet" beat in one breath.
- **Agency ladder (Section 6).** "Meat proxies" who shove tickets into agents and report back is the bottom rung of [[agency-ladder]] named from the other side: the role that stays valuable is the one that owns the problem, not the one that relays it.
- **Product engineer / triad collapse.** The PM/Design/Eng triad disappearing supports [[rise-of-the-product-engineer]] and [[software-engineering-splits-in-three]], but Ball goes further than the deck currently does (the deck says roles blur; he says the triad makes no sense at all).
- **Use as the contrarian voice, not as evidence.** Two beliefs cut against what the deck argues elsewhere. "Unit tests might die" contradicts Willison's "tests are no longer even remotely optional" ([[simonw-pragmatic-summit]], Section 3b), and "no proof good code will matter" contradicts [[osmani-agentic-code-quality]]. Both are worth a line in presenter notes as "the strongest form of the opposite view" rather than a slide claim. "The terminal is dead" is also worth a smile in a deck whose main tool slide is a CLI.
- "Tokens are the new computing paradigm" and "priced out of producing software" are the individual-scale version of [[satya-nadella-frontier-ecosystem]] and [[software-cheap-strategy-everything]]: access to inference becomes the constraint, not ability to write code.

https://x.com/thorstenball/status/2101305394190557466
