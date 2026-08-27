<!-- 46. section — What Matters -->

We have diagnosed the risks. Now let's name what endures. What capabilities
become more valuable when the cost of execution collapses?

---

<!-- 47. quote — ~2 clicks -->

Robert Martin captured the experience perfectly. In his words: it is amazing
how much work it is to wrestle these agents to my will.
[click] Do not get me wrong, it is crazy productive. But it is also a lot of
hard, focused work.
[click] All my software engineering and problem-solving skills are brought
into play, even though I barely look at the code. That is the hinge. The
compression of the implementation middle is not making engineering less
important. It is revealing what was always important. So where does that
judgment get applied? Zoom out from the agent loop, and there are three places.

---

<!-- 48. default — Three Loops. Three Clocks. — ~1 clicks -->

Three nested loops, running on three different clocks. The centre ring is the
one from the harness section. The agent turns a spec into tested software, and
it can cycle every few minutes. Around it, the developer loop. You review the
current product and update the vision, the design, the spec, less often, and
at a higher level. And the outer ring is the market. Real users, production,
experiments. Hours to weeks, and the only loop that produces real-world
evidence. Information flows inward: evidence, to vision, to spec, to agent.
Andrew Ng calls the durable human advantage a context advantage. As long as
you know something about the user that the agent does not, you still have
something to inject into the system.
[click] And so the maintainer's job moves outward. Choose the work, set the
bar, improve the loop. You work on the loop, not only inside it. The model is
replaceable. The loop that captures feedback and turns it into reusable
judgment is the compounding asset.

---

<!-- 49. statement — The fastest way to build is to find the cheapest way to learn. — ~2 clicks -->

Which leads to a line that should sound like a contradiction for a second. The
fastest way to build is to find the cheapest way to learn.
[click] Remember the jet fuel burning on the runway? This is the runway. Every
one of those loops is a learning loop, and they are priced very
differently. The inner loop is nearly free now. So accelerating it just gets
you to the wrong answer sooner. Every team I see optimising AI adoption is
optimising the minutes loop, and the minutes loop was never the problem.
Agents made building cheap. They did not make being wrong cheap. That bill
still arrives.
[click] So the question to ask is: what is the cheapest thing that would
change our mind? Often it is not code. A prototype, a landing page, five
conversations. This is not anti-building. Building is often the cheapest
experiment now. But cheap learning is what earns the right to build.

---

<!-- 50. statement — The prototype is the new brief. — ~3 clicks -->

The artifact was never the job. But it is now the cheapest evidence that the
thinking happened. Andrew Chen's phrasing is that the prototype is the new PRD.
I would widen it: the prototype is the new brief.
[click] A concept you can click beats a concept you can read. People react to
artifacts, not descriptions. Instead of describing an idea in a deck, hand
someone something they can click. The reaction is a different class of
evidence. We now do this for complicated system changes: rather than asking
stakeholders to sign off on a written spec, we hand them a throwaway prototype
of the actual interaction, and they approve behaviour they have seen instead
of behaviour they have imagined.
[click] And the first draft no longer needs to wait for a developer. A written idea
becomes a working demo in an afternoon, not a sprint. The people closest to
the domain build the throwaway draft, and developers harden only what earns
survival. The quiz platform from the first section started exactly that way,
as an experiment to see what I could build with tools I had never used before.
It earned survival. It is rapidly turning into a full production system now. That is how
prototyping protects development hours instead of consuming them.
[click] Remember the eighteen-times curve: cheap to build has to mean cheap to
discard. Most prototypes should die. That sounds like failure until you hear
the second half: that is the point. They are the cheapest way to find out you
are wrong. A dead prototype is validated learning at the lowest possible price.
A dead production feature is not. And the moment a prototype touches real data
or real users, everything from the guardrails section applies.

---

<!-- 51. default — The Long Tail of Internal Software — ~3 clicks -->

Now, do not mistake cheaper learning for shrinking demand. The opposite is
happening, and it lands first here. Every team runs on invisible workflows.
The report assembled by hand every Monday, the data moved by copy and paste,
the checklist that lives in someone's head. Rank every one of them by payoff
and you get this curve. The head is the roadmap. It is the only part that ever
got built.
[click] Everything else was too small for a development project and too
specific to buy off the shelf. Below the build threshold. So it stayed manual.
[click] As production cost collapses, the threshold drops. And demand expands.
An economist would call this Jevons Paradox: when coal engines got more
efficient, we did not use less coal, we used more. The backlog nobody ever
wrote down becomes buildable. Ask yourself what you assemble by hand every
week. That list is the backlog.
[click] Internal tools are also the safest place to start: known users, low
blast radius, and the guardrails story works at small scale. One honest
caveat. The threshold drops, it does not vanish. Someone still owns, runs and
retires these tools. Hold that thought.

---

<!-- 52. statement — A failure mode is just building yesteryear's software faster. — ~2 clicks -->

So if the work expands, the question becomes what kind of work. Because there
is a failure mode here, and it is just building yesteryear's software faster.
[click] If AI only helps you ship the apps you would have built five years
ago, you have changed throughput, not strategy. Modern tools, old mental
model. The dangerous version of AI adoption is not failure. It is succeeding
at the old game.
[click] The question is not how much more can we build. It is what becomes
worth building now. And what should become a workflow, or a skill, or nothing
at all.

---

<!-- 53. default — Humans find new nodes. AI maps the edges. — ~1 clicks -->

Choosing what is worth building is frontier work, and there is a clean
division of labour for it. Think of knowledge as a graph. Facts are nodes, and
the connections between them are edges. AI searches the known graph densely.
It is excellent at finding correlations inside what is already mapped.
[click] New nodes come from somewhere else. They come from humans wandering
beyond the current point of view. That is where the best discoveries have
always come from.
[click] Put the two together and you get the combined model.
[click] Not AI replacing human exploration. More human-chosen frontier points,
each one explored more deeply than a human ever could. The human job is
choosing which points deserve the machine's depth. Humans find new nodes. AI
maps the edges.

---

<!-- 54. default — Clarity Merchants — ~3 clicks -->

That makes the human work more specific. We become clarity merchants. I
studied philosophy before I ever wrote code, and for twenty years that looked
like a detour. It turns out it was vocational training. We were never
bottlenecked by typing speed. We are bottlenecked by coherence.
[click] Frame the problem before the agent writes a line, which includes
deciding what the smallest useful version is. Design the context so the same
mistake cannot happen three times. That is what an agent instructions file is
for.
[click] Spot the flaw that clean code is hiding: the wrong abstraction, the
missing edge case, the architecture that will not scale. And articulate why an
interaction is wrong. The principle, not the vibe. None of this is
engineering-only work. Most companies apply AI at the feature layer. The
winners rethink at the strategy layer, and this list is strategy-layer work.
[click] The core work has not changed. The boundaries have. An agent can generate
five features in a day. Integrating them into a system that makes sense is
still your job, and focus, finishing and judgment scale with you, not with AI
speed.

---

<!-- 55. default — How much of the problem do you own? — ~1 clicks -->

There is a sharper way to ask what all that clarity work adds up to. How much
of the problem do you own? Addy Osmani draws it as a ladder. Flag the problem.
Execute a fix. Diagnose the cause. Propose options. Recommend one. Resolve it
yourself. And at the top, discern: decide whether it was worth doing at all.
Good engineers live at recommend from day one, and earn resolve.
[click] Agents can run rungs one through six for you, and it is getting cheap
fast. They can assist with rung seven too, but accountability for discernment
never gets cheap. It looks like doing nothing, which is why it is hard to grant
and harder to trust. It means you priced the fix against everything else on the
table and put your name on the tradeoff.
Deciding it was not worth doing. Deciding the evidence is good enough to ship.
Being the person who can explain why when you turn out to be wrong. Agency was
never about how much you can do. It is about how much of the problem you still
own after it leaves your hands.

---

<!-- 56. statement — Many products don't die from missing features. They die from accumulation. — ~2 clicks -->

And rung seven at product scale looks like this. Many products do not die
from missing features. They die from accumulation. It is easy to prompt a new
feature into existence, so naturally the bar for what ships drops. That is the
accumulation trap, and it is the flip side of the long tail I just sold you.
[click] Great product people fall in love with the problem, not the roadmap.
They ship features, and they kill them. They have the guts to say: this is not
solving it. This adds complexity. This does not matter.
[click] And it is not only a product skill. PMs kill features. Designers
simplify flows. Engineers remove abstractions. Subtraction is a
cross-discipline skill — the same discipline as those thrown-away projects
from the first section, applied to a living product. Addition gets cheaper
every quarter. Subtraction never does.
