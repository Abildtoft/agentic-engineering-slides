---
layout: section
transition: section-shift
---

# Moving Forward

You were always the bottleneck. Here's what to do about it.

<!--
[T+138:30 | S6 slide 1 of 10 | 0.5min]
Transition from Section 5: "We've mapped the risk and named what matters. Now: what do you actually do about it?"

The audience has been through 2+ hours of diagnosis. S1 named the shift. S2 named the compression. S3 gave them tools. S4 named the hidden cost. S5 named the structural risk and the skills that survive.

This section does not introduce new problems. It closes the loop. It's synthesis — practical, honest, forward-looking.

The subtitle reframes everything that came before: "you were always the bottleneck" sounds like criticism. By the end of this section, the audience should hear it as the opposite — as clarity, accountability, and possibility.

Energy: calm and resolved. Not a victory lap. An honest landing.
-->

---
layout: quote
---

# "I too am the bottleneck now. But you know what? Two years ago, I too was the bottleneck. I was the bottleneck all along."

Armin Ronacher

<!--
[T+139:45 | S6 slide 2 of 10 | 1.5min]
Source: Armin Ronacher, "The Final Bottleneck" (lucumr.pocoo.org/2026/2/13/the-final-bottleneck/)

Ronacher created Flask — one of the most widely used Python frameworks in the world. He's not someone who fears technology. He's someone who builds it.

His argument: AI didn't create a new bottleneck — it revealed the one that was always there. The human who carries responsibility for what ships is the constraint. That was true before AI. It's still true now. "The machine did not really change that."

The relief in this framing: you're not being replaced by something faster. You are the thing that matters — the accountability, the judgment, the responsibility for what ships. The tools changed. Your role as the accountable person didn't.

For the room: which of you is worried about being made redundant? That worry assumes the thing that was valuable was your typing speed. It wasn't. It was your judgment and your accountability. Both of those are still yours.

Bridge: "But what does this pattern actually look like? Ronacher has a historical analogy."
-->

---

# The Bottleneck Cascade

<v-click>

When weaving sped up, **yarn became the constraint.** When spinning caught up, **fibre became the constraint.** When fibre improved, **cotton had to be automated.**

</v-click>
<v-click>

Every time a bottleneck is removed, the constraint moves upstream — **not away.**

</v-click>
<v-click>

**"Non-sentient machines will never be able to carry responsibility."**

</v-click>

<!--
[T+141:15 | S6 slide 3 of 10 | 2min]
Source: Armin Ronacher, "The Final Bottleneck" (lucumr.pocoo.org/2026/2/13/the-final-bottleneck/)

Walk through each reveal:

1. The textile industry bottleneck cascade from the industrial revolution. Each time one stage accelerated, the constraint moved to the previous stage. This is the counter-narrative to "AI solves everything" — it moves the problem, it doesn't eliminate it.

2. The same pattern applies now: AI writes code faster → review becomes the bottleneck → review gets AI-assisted → accountability moves upstream to the human who sets the intent and verifies the output. We are in the middle of that cascade right now.

3. The core accountability argument. Machines don't go to court. Machines don't get fired. Machines don't carry the reputational and professional weight of what ships under their watch. Humans do. This is not a weakness — it's the permanent foundation of human value in the loop.

Connect to cognitive debt (S4): the confidence spiral and outsourced understanding aren't just individual risks. They're accountability risks. If you don't understand what you ship, you cannot carry responsibility for it.

Bridge: "Which brings us to what this looks like as a team value."
-->

---
layout: quote
---

# "LLM use is encouraged at Oxide, but never at the expense of responsibility."

Oxide Computer Company

<v-click>

# "This isn't a productivity question. It's a question about what kind of work — and lives — we want to build."

</v-click>

<!--
[T+142:30 | S6 slide 4 of 10 | 1.5min]
Source: Oxide Computer Company, "Using LLMs at Oxide" (rfd.shared.oxide.computer/rfd/0576)

Oxide builds server hardware — they make things that have to work, in datacenters, under real loads, for real customers. Software failures there have physical consequences.

Their policy statement is notable for what it doesn't say. It doesn't say "LLMs are banned." It doesn't say "LLMs are approved." It says: use them, but never in conflict with your responsibility.

The three layers of responsibility are worth naming explicitly:
- To the product: does this output meet the bar we've set for what we ship?
- To the customer: does this decision serve the people who depend on us?
- To one another: does this approach respect what we're building together?

This is the organisational translation of Ronacher's individual accountability. It's not a rule — it's a value. And values travel differently than rules.

The v-click broadens from one company's policy to the universal question (inspired by Husom, "Outsourcing Thinking"): deciding which human activities to protect from automation is a values choice, not a productivity optimization. We don't have to frame every AI adoption decision as "is this more efficient?" — we can ask "is this the kind of work we want humans to keep doing?" That reframe is what separates intentional adoption from drift.

For managers in the room: this is the conversation to take back to your team. Not "what's our AI policy?" — but "what's our responsibility framework, and how does AI fit into it?"

Bridge: "Values are the what. Now let's talk about the how — the practical advice for the next two years."
-->

---
layout: two-cols-header
---

# The Next Two Years

::left::

<v-click>

**If you're earlier in your career**

- Use AI to punch above your weight
- Understand and explain every line
- Build skills AI can't replace: communication, decomposition, domain knowledge

</v-click>

::right::

<v-click>

**If you're more senior**

- Your value is multiplying the team, not writing code
- Lean on automation for the grunt work
- Invest in mentorship — and be frank about all-senior team risks

</v-click>

<!--
[T+144:15 | S6 slide 5 of 10 | 2min]
Source: "The Next Two Years of Software Engineering" (sources/next-two-years-of-software-engineering.md)

Two audiences, two distinct challenges — and the two-cols layout makes the duality visible.

For juniors/earlier-career: the opportunity is real. AI lets you build bigger things, punch above your weight class, and demonstrate senior-level output on day one. But the trap is dependency — building things you can't explain. "Understand and explain every line if not most" is the key practice.

The framing "be immediately useful" shifts the conversation from anxiety ("am I competing with AI?") to agency ("I can create more value than my title suggests").

For seniors: "fewer juniors means more grunt work landing on your plate" is honest. The automation response is the right one, not heroic solo execution. And the mentorship investment is a force multiplier — it's both a systemic responsibility and a practical survival strategy for the team.

Both columns converge on the same insight: your value is relational and multiplicative, not isolated and additive. AI does isolated work. Humans do multiplicative work.

Bridge: "Let me show you what that human role actually looks like in practice."
-->

---

# The Human in the Loop

<v-click>

**The spec** — the intent, authored by a human. Someone formulated this problem and made a judgment about what mattered.

</v-click>
<v-click>

**The harness in motion** — the agent executing, the human reviewing. Watch where it stops and returns to you. That's where accountability lives.

</v-click>
<v-click>

**The output** — shipped, understood, owned. Not generated. Not rubber-stamped. Owned.

</v-click>

<!--
[T+147:15 | S6 slide 6 of 10 | 3.5min DEMO]
DEMO PLACEHOLDER — ~3-4 minutes.

This is not a new demo. It's a re-reading of the Section 3 demo through the lens of everything that followed.

Walk through the same SIW harness from Section 3c — but this time narrate the human role at each step:

1. The spec (Section 3a skill): "This is the human. Someone formulated this problem, structured this intent, made this judgment about what mattered. An agent didn't decide to build this. A human did."

2. The harness in motion (Section 3c demo): "This is the agent — fast, consistent, tireless. Watch what it does autonomously. Now watch where it stops and returns to the human. The verification point. The place where accountability lives."

3. The output: "This slide you're looking at right now was produced by this system. A human decided what argument to make, what sources to use, what arc to follow. The agent formatted it, maintained consistency, flagged issues. The human shipped it."

The point: we've been watching the human role throughout this entire talk. The tool stack (S3), the cognitive risks (S4), the systemic risks (S5), the practical advice — all of it is the infrastructure for human judgment and accountability. Not its replacement.

Keep this to 3-4 minutes. It should feel like a recognition, not a revelation.
FALLBACK: If the live tool is unresponsive, narrate the three steps over the bullet points on screen. The bullets already describe the human role — no live tool needed for the point to land. Just walk through each bullet with the framing above.

Bridge: "That's the near-term. Now: the bigger picture."
-->

---
layout: quote
---

# "How did you do it? How did you evolve, how did you survive this technological adolescence without destroying yourself?"

Carl Sagan, Contact — cited by Dario Amodei

<v-click>

# "Humanity is about to be handed almost unimaginable power, and it is deeply unclear whether our systems possess the maturity to wield it."

Dario Amodei — The Adolescence of Technology

</v-click>

<!--
[T+148:30 | S6 slide 7 of 10 | 1.5min]
Source: Dario Amodei, "The Adolescence of Technology" (darioamodei.com/essay/the-adolescence-of-technology)

Amodei is the CEO of Anthropic — the company that built Claude. This is not an outsider's observation. It's the person building the most capable AI systems in the world reflecting on what they're building.

The Contact framing: the question is asked by someone who found something extraordinary and is now being asked "are you ready for this?" That's the position every engineer in this room is in. We found the tool. We're using the tool. Are we ready for it?

The v-click builds from question to assessment: the first reveal is the question (open, uncertain, almost hopeful — "how did you survive?"). The second is Amodei's honest answer ("deeply unclear").

"Deeply unclear" is the important phrase. Not "probably fine" and not "we're doomed." Unclear. Which means the outcome depends on what choices are made — including the choices being made by the people in this room.

Connect back to Ronacher: the textile industry bottleneck cascade resolved because humans adapted, regulated, and developed new norms. It took decades and was painful. We're at the beginning of that process, not the end.

The "technological adolescence" framing reframes anxiety from existential threat to developmental challenge. Adolescence is turbulent. It's also survivable. It produces adults.

Bridge: "We don't know the ending yet. But we do know something about what survives."
-->

---
layout: statement
---

# The craft evolves. It always has. But it remains craft.

<!--
[T+149:15 | S6 slide 8 of 10 | 1min]
Source: Addy Osmani, "The Best Engineers Never Just Wrote Code" (x.com/addyosmani/status/2007899127925854536)

This is the closing line of Osmani's essay. It was cited in S5's presenter notes but deliberately held back from appearing on a slide — this is its first direct appearance on screen.

Twelve words of philosophical weight:
- "The craft evolves" — the tools change (assembly → languages → frameworks → agents)
- "It always has" — historical reassurance, this is not the first time
- "But it remains craft" — the judgment, the taste, the responsibility for what you build does not change

This is the answer to the senior engineer from S4 who quit because "the thing he loved disappeared." The thing he loved was not the syntax. The craft is not the syntax. The craft is the judgment, the taste, the care for what you build and for the people who use it.

Sit with this slide. It's the emotional landing point of the entire talk. Let it breathe.

Bridge: "So: what does that mean for you, specifically, tomorrow morning?"
-->

---
layout: center
class: text-center
---

# What's one thing you'll do differently starting tomorrow?

<!--
[T+156:00 | S6 slide 9 of 10 | 6min DISCUSSION]
DISCUSSION PROMPT — pause here for 6-8 minutes. This is the final prompt of the talk.

Single question, not two. The dual-prompt structure was right for S2, S4, and S5 where the content had two distinct threads. Here, the single question focuses energy and creates a commitment, not an analysis.

"Tomorrow" is the important word. Not "in the next quarter." Not "eventually." Tomorrow. The talk ends at a specific moment and the audience walks out into a specific world. What does the first step look like?

Follow-up prompts if the room is quiet:
- "You've seen a full agentic workflow today. What's the first piece of it you'd try?"
- "If you're earlier in your career: what's the one skill you'll invest in that AI can't replicate?"
- "If you're more senior: who on your team would benefit from trio-programming this week?"
- "What does your team's responsibility framework look like for AI-generated code?"

What to listen for: specific and concrete answers — not "I'll think about AI more" but "I'll write a spec before I open Claude Code on Monday." The specificity is the signal that the talk landed.

Close the discussion by reading back a few of the most concrete answers you heard. Then:

"We are the bottleneck. We always were. That's not a constraint — it's a foundation. The craft evolves. It always has. But it remains craft. Go make something."
-->

---

# Resources

- [**kramme-cc-workflow**](https://github.com/Abildtoft/kramme-cc-workflow)
- [**Superpowers**](https://github.com/obra/superpowers)
- [**GET SHIT DONE**](https://github.com/gsd-build/get-shit-done)
- [**Compound Engineering Plugin**](https://github.com/EveryInc/compound-engineering-plugin)

<!--
[T+162:00 | S6 slide 10 of 10 | 0.5min]
Leave this slide up as people leave. It gives them something concrete to photograph or note down.
-->
