---
layout: section
transition: section-shift
---

# Cognitive Debt

The hidden cost of going fast without understanding

<!--

KEY POINTS:
- Post-demo pivot: from capability to responsibility
- Slow the pace and move from tooling power to human understanding
- Frame this as a systems risk, not a moral panic

BRIDGE: "We've just spent the last section exploring an incredible toolkit — context engineering, skills, MCPs, hooks, harnesses, agents, teams. Each layer added power. But each layer also added something you didn't personally write, something you may not fully understand. That accumulation has a name."
-->

---
layout: quote
---

# "A program is more than its source code. Rather a program is a theory that lives in the minds of the developers."

Peter Naur

<!--

SOURCE: Peter Naur, "Programming as Theory Building" (1985), cited by Margaret-Anne Storey (margaretstorey.com/blog/2026/02/09/cognitive-debt/)

KEY POINTS:
- Establish the foundational premise: code artifacts are not equivalent to shared understanding
- This quote gives the section a durable pre-AI anchor
- Everything after this is an implication of this idea
-->

---

# Cognitive Debt

<v-click>

**Technical debt** lives in the codebase. You can measure it, refactor it, pay it down.

</v-click>
<v-click>

**Cognitive debt** lives in the brains of the developers. It compounds when you go fast without understanding.

</v-click>
<v-click>

Even if agents produce clean code, the humans may have simply **lost the plot**.

</v-click>

<!--

SOURCE: Margaret-Anne Storey, cited by Simon Willison (simonwillison.net/2026/Feb/15/cognitive-debt/)

KEY POINTS:
- Define the distinction crisply: technical debt in code, cognitive debt in people
- Main risk: teams can ship clean output while losing comprehension
- This is the core diagnostic slide for the section

BRIDGE: "The pattern sounds abstract, so let's ground it in a concrete case."
-->

---
layout: quote
---

# "We gave a student team AI coding tools and tracked them for 10 weeks. The first few weeks were remarkably productive."

Margaret-Anne Storey

<v-click>

## "By week 8, one team hit a wall. No one could explain why certain design decisions had been made."

</v-click>

<!--

SOURCE: Simon Willison, citing Storey (simonwillison.net/2026/Feb/15/cognitive-debt/)

KEY POINTS:
- The case arc matters: early acceleration, then sudden comprehension failure
- Highlight misdiagnosis risk: teams blame code quality when the issue is understanding loss
- Use this as evidence that cognitive debt compounds nonlinearly

BRIDGE: "And this is not just a student-team problem."
-->

---
layout: quote
---

<h1>"I no longer have a firm mental model of what my projects can do and how they work,<br />
which means each additional feature becomes harder to reason about."</h1>

Simon Willison

<!--

SOURCE: Simon Willison (simonwillison.net/2026/Feb/15/cognitive-debt/)

KEY POINTS:
- Validate that this affects highly capable practitioners too
- Position the issue as structural workflow drift, not individual weakness
- Reinforces urgency without blame
-->

---
layout: statement
---

# Velocity without understanding is not sustainable.

<!--

SOURCE: Margaret-Anne Storey (margaretstorey.com/blog/2026/02/09/cognitive-debt/)

KEY POINTS:
- Hinge statement for the section
- Summarize diagnosis before showing recurring behavior patterns

DELIVERY:
- Let this hang in the air

BRIDGE: "So what does this look like when it compounds? Let me show you the patterns."
-->

---

# The Confidence Spiral

<img src="/confidence-spiral.png" class="mx-auto w-full max-w-lg mt-2 mb-4" />

<v-click>

**The prompting loop can become dependency: convenience now, weaker judgment later.**

</v-click>

<!--

SOURCE: Francedot, "Vibe Coding Paralysis" (x.com/francedot/status/2017858253439345092)

KEY POINTS:
- Make clear why the spiral is seductive: every step feels locally rational
- The risk is gradual substitution of construction with passive review
- Dependency forms by accumulation, not one dramatic event

DELIVERY:
- Walk through the spiral slowly
- Ask the room to notice whether they recognize this pattern — no hands needed, just internal recognition

BRIDGE: "That spiral appears in recognizable day-to-day patterns."
-->


---
layout: two-cols-header
---

# When Debt Compounds

::left::

<v-click>

**The Planning Loop**

Planning becomes procrastination in disguise. You re-plan the same feature three times in a day.

</v-click>
<v-click>

**The Coherence Bottleneck**

Productivity was never the real bottleneck. The bottleneck was always coherence.

</v-click>

::right::

<v-click>

**Context Collapse**

You lose track of which session "knows" what. The AI mirrors your own fragmentation.

</v-click>
<v-click>

**The Completionist Trap**

Starting feels amazing. The last 20% still takes time. Graveyard of almost-finished projects.

</v-click>

<!--

SOURCE: Francedot, "Vibe Coding Paralysis" (x.com/francedot/status/2017858253439345092)

KEY POINTS:
- Treat these four items as symptoms, not separate problems
- The common denominator is weakened coherence under speed
- Tie back to earlier thesis: typing was never the real bottleneck

DELIVERY:
- Walk through briefly — the audience will recognize at least one
- Don't linger on each pattern — the recognition should be fast and uncomfortable

BRIDGE: "At this point, the question becomes what we are outsourcing by default."
-->

---
layout: quote
---

<h1>"I caught myself asking the AI for the umpteenth time how to do a certain if conditional.<br />
Why have I not internalized this?<br />
Because I've outsourced it to the AI."</h1>

<v-click>

## "You will actually turn yourself into an idiot if you can't do seven times seven real quick in your head."

Matija Grcic

</v-click>

<!--

SOURCE: Matija Grcic (x.com/matijagrcic/status/2012517043711492558)

KEY POINTS:
- This quote reframes the issue as skill atrophy, not tooling adoption
- Preserve the distinction: not anti-tool, anti-outsourcing-core-reasoning
- Keep emphasis on maintaining mental primitives

DELIVERY:
- For non-devs: substitute "code" with any domain skill — if you outsource all your judgment to a tool, what remains?

BRIDGE: "So the risk is real, but it is not inevitable."
-->

---
layout: quote
---

<h1>"If we treat them as a substitute for effort,<br />
we're barely a step away from grift — and I really believe<br />
we'll wake up one day, completely hollow."</h1>

<v-click>

## "We don't have to treat AI as a zero-effort shortcut to success."

</v-click>

<!--

SOURCE: "It is not — and should not be — zero-effort" (sources/not-zero-effort.md)

KEY POINTS:
- The emotional low point of the section
- "Completely hollow" is a strong phrase — let it sit
- The second reveal is the turn from fatalism to agency
- Choice of practice determines outcome

DELIVERY:
- Let "completely hollow" land before the second reveal

BRIDGE: "So what does non-hollow look like? What is the antidote?"
-->

---

# The Antidote — The Human in the Loop

<v-click>

**The spec** — the intent, authored by a human. Ask "why," not just "what."

</v-click>
<v-click>

**The harness in motion** — the agent executing, the human reviewing. At least one human must fully understand each change before it ships.

</v-click>
<v-click>

**The output** — shipped, understood, owned. Document not just what changed, but **why.**

</v-click>
<v-click>

**A simple test:** Can you explain every commit message you submitted this week — not just what changed, but why? If not, the debt is already accumulating.

</v-click>

<!--

SOURCE: Addy Osmani, on Anthropic study (linkedin.com/posts/addyosmani_ai-programming-softwareengineering-activity-7423836698100416513-H0W4)
SOURCE: Margaret-Anne Storey (margaretstorey.com/blog/2026/02/09/cognitive-debt/)

KEY POINTS:
- Close the section with a practical control model: intent, review, ownership
- Stress accountability: at least one human must understand each shipped change
- Link back to section 3: harness discipline is the preventive mechanism

DELIVERY:
- THE COMMIT MESSAGE EXAMPLE (use when landing the third bullet): "We had this conversation in our own Slack channel recently. One colleague argued that commit messages must be hand-written — that the discipline of formulating them is a prerequisite for meaningful collaboration. Another colleague reframed it: it's about quality, not origin. A developer who submits a merge request is accountable for understanding the work and explaining it. Writing a commit message forces reflection — but the operative word is reflection, not typing. If you can't explain a commit message you submitted, you have a problem regardless of who wrote it. The expectation is comprehension and ultimate authorship, not initial authorship."

BRIDGE: "The antidote works — if you have competent humans in the loop. But what happens to the pipeline that produces those humans? That's what we need to talk about next."
-->
