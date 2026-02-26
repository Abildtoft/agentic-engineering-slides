---
layout: section
transition: section-shift
---

# Cognitive Debt

The hidden cost of going fast without understanding

<!--
[T+92:45 | S4 slide 1 of 15 | 0.5min]

KEY POINTS:
- This section is the emotional core of the talk
- Shift the energy from excitement to reflection

BRIDGE: "We've just spent the last section exploring an incredible toolkit — context engineering, skills, MCPs, hooks, harnesses, agents, teams. Each layer added power. But each layer also added something you didn't personally write, something you may not fully understand. That accumulation has a name."
-->

---
layout: quote
---

# "A program is more than its source code. Rather a program is a theory that lives in the minds of the developers."

Peter Naur

<!--
[T+94:00 | S4 slide 2 of 15 | 1.5min]

SOURCE: Peter Naur, "Programming as Theory Building" (1985), cited by Margaret-Anne Storey (margaretstorey.com/blog/2026/02/09/cognitive-debt/)

KEY POINTS:
- Naur wrote this in 1985 — decades before AI
- Understanding is not in the code — it is distributed across the minds of the people who built it
- Source code is an artifact; the theory (the why behind the what) lives in human heads
- This is the intellectual anchor for everything that follows in this section
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
[T+95:45 | S4 slide 3 of 15 | 2min]

SOURCE: Margaret-Anne Storey, cited by Simon Willison (simonwillison.net/2026/Feb/15/cognitive-debt/)

KEY POINTS:
- Storey: "The debt compounded from going fast lives in the brains of the developers and affects their lived experiences and abilities to go fast or to make changes."
- Technical debt is visible, measurable, addressable
- Cognitive debt is invisible until it paralyzes you
- The third reveal is the key insight: clean code is not the same as understood code
- AI can produce perfectly structured, well-tested code that nobody on the team can explain
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
[T+97:00 | S4 slide 4 of 15 | 1.5min]

SOURCE: Simon Willison, citing Storey (simonwillison.net/2026/Feb/15/cognitive-debt/)

KEY POINTS:
- Storey coached a student team using AI tools
- They went fast at first — incredibly productive — then hit paralysis
- They initially blamed technical debt: messy code, poor architecture
- The real problem: nobody understood the system anymore
- "They had accumulated cognitive debt faster than technical debt, and it paralyzed them."
- This is not hypothetical — it happened in an academic setting with full supervision
- It is happening right now in production teams without supervision
-->

---
layout: quote
---

<h1>"I no longer have a firm mental model of what my projects can do and how they work,<br />
which means each additional feature becomes harder to reason about."</h1>

Simon Willison

<!--
[T+97:45 | S4 slide 5 of 15 | 1min]

SOURCE: Simon Willison (simonwillison.net/2026/Feb/15/cognitive-debt/)

KEY POINTS:
- Willison co-created Django, built datasette, has been publicly experimenting with AI coding for over a year
- One of the most thoughtful and experienced developers writing about AI tools
- Even he lost the plot: "I've found myself getting lost in my own projects."
- If Willison experiences cognitive debt, the rest of us are not immune
- This is not a skill issue — it is structural
-->

---
layout: statement
---

# Velocity without understanding is not sustainable.

<!--
[T+98:15 | S4 slide 6 of 15 | 0.5min]

SOURCE: Margaret-Anne Storey (margaretstorey.com/blog/2026/02/09/cognitive-debt/)

KEY POINTS:
- Five words that summarize the entire risk
- This is the hinge slide — we've defined the concept (Naur, Storey, Willison)
- Now we turn to how cognitive debt manifests in practice

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
[T+100:00 | S4 slide 7 of 15 | 2min]

SOURCE: Francedot, "Vibe Coding Paralysis" (x.com/francedot/status/2017858253439345092)

KEY POINTS:
- Each step feels rational in the moment — of course you prompt again when something breaks
- But each loop erodes your own judgment
- Deeper mechanism (Husom, "Outsourcing Thinking"): even if you're still thinking just as hard, what you think about changes
- Constructing a solution from scratch and reviewing someone else's solution are categorically different cognitive acts
- One builds mental models; the other consumes them
- Each loop shifts more of your thinking from construction to consumption — and that difference compounds
- "The tool that was supposed to give you confidence — 'I can build anything now!' — slowly takes it away."

DELIVERY:
- Walk through the spiral slowly
- Ask the room to notice whether they recognize this pattern — no hands needed, just internal recognition
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
[T+103:30 | S4 slide 9 of 15 | 2min]

SOURCE: Francedot, "Vibe Coding Paralysis" (x.com/francedot/status/2017858253439345092)

KEY POINTS:
- Four manifestations, each a symptom of the same root cause: cognitive debt
- The planning loop connects back to Section 3: specs can become procrastination if understanding is absent
- The coherence bottleneck challenges the hype narrative: "Humans aren't bottlenecked by typing speed. We're bottlenecked by coherence."

DELIVERY:
- Walk through briefly — the audience will recognize at least one
- Don't linger on each pattern — the recognition should be fast and uncomfortable
-->

---
layout: quote
---

<h1>"I caught myself asking the AI for the umpteenth time how to do a certain if conditional.<br />
Why have I not internalized this?<br />
Because I've outsourced it to the AI."</h1>

<v-click>

## "You will actually turn yourself into an idiot if you can't do seven times seven real quick in your head."

</v-click>

<!--
[T+105:30 | S4 slide 10 of 15 | 1.5min]

SOURCE: Matija Grcic (x.com/matijagrcic/status/2012517043711492558)

KEY POINTS:
- The calculator analogy is powerful
- Teachers in the 1970s thought calculators would make arithmetic unnecessary — they were wrong
- Mental arithmetic is foundational to mathematical reasoning
- The same thing is happening with code
- If you can't hold basic patterns in your head, you cannot reason about systems
- Not about memorizing syntax — about maintaining the cognitive infrastructure that lets you think about software at all

DELIVERY:
- For non-devs: substitute "code" with any domain skill — if you outsource all your judgment to a tool, what remains?
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
[T+110:00 | S4 slide 13 of 15 | 1.5min]

SOURCE: "It is not — and should not be — zero-effort" (sources/not-zero-effort.md)

KEY POINTS:
- The emotional low point of the section
- "Completely hollow" is a strong phrase — let it sit
- The second reveal is the turn: this is not a deterministic outcome, it is a choice
- The pivot from diagnosis to agency
- We do not have to end up hollow — the question is how we choose to use these tools

DELIVERY:
- Let "completely hollow" land before the second reveal

BRIDGE: "So what does non-hollow look like? What is the antidote?"
-->

---

# The Antidote

<v-click>

**Ask "why," not just "what."** The tool isn't the risk. Surrendering your judgment to it is.

</v-click>
<v-click>

**At least one human must fully understand each AI-generated change before it ships.**

</v-click>
<v-click>

**Document not just what changed, but why.** Rebuild the shared theory of the system.

</v-click>

<!--
[T+111:30 | S4 slide 14 of 15 | 2min]

SOURCE: Addy Osmani, on Anthropic study (linkedin.com/posts/addyosmani_ai-programming-softwareengineering-activity-7423836698100416513-H0W4)
SOURCE: Margaret-Anne Storey (margaretstorey.com/blog/2026/02/09/cognitive-debt/)

KEY POINTS:
- Osmani: "AI doesn't make you dumber, but passive reliance does. The difference is asking 'why' vs. treating it like a code vending machine."
- Storey's concrete mitigations: require human understanding, document the why, create regular checkpoints where teams rebuild shared understanding
- Documentation of the why is not about typing — it's about the cognitive act of understanding
- AI can draft the commit message; the human must own the meaning
- Connect back to Section 3: context engineering and spec-driven development are cognitive debt prevention
- The CLAUDE.md you write is documentation of the why; the spec you author is proof of understanding
- The verification loop is the checkpoint; hooks from S3b break Ralph Wiggum loops before they start
- The new stack is the antidote — if used with intention

DELIVERY:
- THE COMMIT MESSAGE EXAMPLE (use when landing the third bullet): "We had this conversation in our own Slack channel recently. One colleague argued that commit messages must be hand-written — that the discipline of formulating them is a prerequisite for meaningful collaboration. Another colleague reframed it: it's about quality, not origin. A developer who submits a merge request is accountable for understanding the work and explaining it. Writing a commit message forces reflection — but the operative word is reflection, not typing. If you can't explain a commit message you submitted, you have a problem regardless of who wrote it. The expectation is comprehension and ultimate authorship, not initial authorship."

BRIDGE: "What skills and practices actually matter?" (to Section 5)
-->

