<!-- 5. section — The Shift Is Here -->

You have heard this before. For three years running, someone has stood roughly
where I am standing and told you that everything was about to change. And for
three years, the people who rolled their eyes were right. So let me say that
plainly first: the skepticism was earned. Something has changed since then, and
I would rather show you the pattern than assert it.

---

<!-- 6. statement — We're in 1997 for AI — ~3 clicks -->

Here is my honest calibration for where we actually are. 1997. The category is
real, and almost nothing about it is settled yet.
[click] This is as big as the internet or mobile.
[click] And it is only as big as the internet or mobile. Both of those things
are true at the same time, and most arguments about AI are just people holding
one of them and refusing the other.
[click] Think about what 1997 actually looked like. Most things did not work
reliably. Most of what would end up mattering had not been built. And the
companies that went on to win the next decade were, for the most part, not yet
in the room. That is where we are standing.

---

<!-- 7. default — Almost Nobody Is Here Yet — ~3 clicks -->

And if 1997 sounds like an exaggeration, here is how early this actually is.
[click] 84% of the world's population has never used AI. Not "doesn't use it
every day" — never touched it once. Whatever you have heard about how fast this
is moving, most people's daily lives are still completely untouched by it.
[click] Three people in a thousand have ever paid for it.
[click] And the thing this talk is about — building software with AI — has been
tried by 0.04%. Four people in every ten thousand. So whatever this turns out
to be, nobody in this room is late to it. Almost nobody is here yet.

---

<!-- 8. statement — Not Just a Developer Story — ~2 clicks -->

Which raises a fair question: if almost nobody is here yet, why does the rest
of this talk keep pointing at software? Because this is not a developer story.
[click] AI is starting to reach every discipline that works with knowledge —
design, law, finance, sales, medicine. The pattern is the same everywhere; only
the timing differs.
[click] Software just happens to be first, and for a mechanical reason. Code is
work an AI can check on its own: it can run what it wrote, test it, and see
whether it broke — thousands of times, in seconds. No other profession gives it
that tight a feedback loop yet. So treat software as the lens, not the subject.
What is happening to my profession right now is the early picture of what
reaches everyone else's.

---

<!-- 9. default — It's Not Just One Tool — ~2 clicks -->

These are the tools developers now use to build software with AI. Claude Code,
Cursor, Windsurf, Copilot, Gemini CLI, Codex. Six names, but this was not one
product launch. In a single 30-day window last December, all three of the big
AI companies shipped new versions, and the whole category quietly renamed
itself. They stopped calling these things assistants and started calling them
agents. An assistant suggests the next line while you type. An agent is given
a task, goes away, and comes back with the work done. That is the shift
underneath all six names.
[click] So zoom out from the tool names to what the companies themselves are
saying. Spotify's co-CEO says their best developers have not written a line of
code since December. Google says AI now writes over 30% of all its new code.
Microsoft puts it at 20 to 30%. And at the AI labs themselves, Anthropic and
OpenAI, the teams report that essentially all of their code is now written by
AI.
[click] One thing about those numbers before we move on. Every single one of
them is at least six months old. These are the last figures these companies
chose to publish, which makes every one of them a floor, not a ceiling.

---

<!-- 10. default — Same Job, Same Me, Different Years — ~6 clicks -->

If that still sounds like vendor hype, you do not have to take their word for
it. This is my own record. Every piece of software work leaves a trail, and
this is mine: same person, same job, two consecutive years. The only thing
that changed between them is the way I work.
[click] Last year: 343 finished pieces of work that made it into the product.
In our world those are called merged pull requests, and I want to give that
number its due. That was a normal, productive year, and I was proud of it.
[click] This year, the same measure, same person.
[click] Commits tell the same story. A commit is a saved step along the way,
so this is roughly how many times the work moved forward. 967 in the old year.
[click] And 16 times that in the new one.
[click] And then the tests. A test is a small automatic check that a piece of
software still does what it is supposed to. Last year I wrote five. Five, in
an entire year. That is the honest number, and I am not proud of it.
[click] This year, 57,179. That multiplier is not a typo. The agents check
their own work far more thoroughly than I ever checked mine, and that turns
out to be the part that matters most.

---

<!-- 11. default — The Curve Bent in January — ~2 clicks -->

Now the same data month by month, because the totals are not the interesting
part. When it happened is. Watch the flat year draw itself out. That was me
being productive: somewhere between 25 and 65 finished pieces of work a month,
every month, for a year. Nothing wrong with that line. It is just a line that
goes nowhere.
[click] And then January. 176. Then 264 in February. Then 790 in March, which
means one single month out-produced the entire year that came before it.
[click] The skeptics were right for three years. Then the curve bent.

---

<!-- 12. default — What ×18 Actually Measures — ~5 clicks -->

Before you file that curve away as me simply working eighteen times faster,
let me be honest about what it is made of, because the multiplier is the
easiest number in this talk to misread.
[click] On the work I was already doing — the production systems, the feature
work — the honest speedup is maybe two or three times. Real, but that is not
where the curve comes from.
[click] The rest of it is work that was not worth starting a year ago. Less
than half of those merged pieces of work land in systems that are in
production use today. The rest is new products and internal tooling that used
to sit below the threshold of what one person could justify building at all.
[click] Three examples, all real. This talk — the deck you are watching right
now narrates itself, through a pipeline that did not exist a year ago. A
real-time multiplayer quiz platform for live events. And a flight simulator
for the conversations that actually decide deals, where salespeople rehearse
the hard ones against an AI counterpart that reacts not just to what they
say, but to how they say it.
[click] And there is a discipline that comes with all this. When code is this
cheap to write, it has to become cheap to let go of, too. Some of that work
has already been thrown away — on purpose, and faster than I would ever have
dared before. That used to feel like waste. It is not. Hanging on to software
nobody needs is the waste, and for the first time we can afford to stop doing
it.
[click] And mechanically, this is not one heroic typist. At peak it is more
than ten agents working in parallel, each in its own isolated copy of the
code, and everything that merges passes layered review — automated reviewers
first, then my own judgment, then colleagues, scaled to how much damage a
mistake could do. The number is big because the set of things worth building
exploded — and working inside that expansion, honestly, already feels like
living in a different world.

---

<!-- 13. quote — “By summer 2026, people working with frontier AI will feel like they live in a parallel world” -->

Jack Clark, one of the co-founders of Anthropic, put a date on this feeling. By
summer 2026, he wrote, people working with the most advanced AI will feel like
they live in a parallel world. It is summer 2026. So here is the question I
would ask you to hold onto for the rest of this hour, and I genuinely do not
know the answer for your team. Which side of that divide are you on?
