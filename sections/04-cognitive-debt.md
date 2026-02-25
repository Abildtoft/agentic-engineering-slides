---
layout: section
transition: section-shift
---

# Cognitive Debt

The hidden cost of going fast without understanding

<!--
[T+92:45 | S4 slide 1 of 15 | 0.5min]
Transition from Section 3: "We've just spent the last section exploring an incredible toolkit — context engineering, skills, MCPs, hooks, harnesses, agents, teams. Each layer added power. But each layer also added something you didn't personally write, something you may not fully understand. That accumulation has a name."
Shift the energy from excitement to reflection. This section is the emotional core of the talk.
-->

---
layout: quote
---

# "A program is more than its source code. Rather a program is a theory that lives in the minds of the developers."

Peter Naur

<!--
[T+94:00 | S4 slide 2 of 15 | 1.5min]
Source: Peter Naur, "Programming as Theory Building" (1985), cited by Margaret-Anne Storey (margaretstorey.com/blog/2026/02/09/cognitive-debt/)

Naur wrote this in 1985 — decades before AI. The insight: understanding is not in the code. It is distributed across the minds of the people who built it. Source code is an artifact. The theory — the why behind the what — lives in human heads.
This is the intellectual anchor for everything that follows in this section.
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
Source: Margaret-Anne Storey, cited by Simon Willison (simonwillison.net/2026/Feb/15/cognitive-debt/)

Storey's definition: "the debt compounded from going fast lives in the brains of the developers and affects their lived experiences and abilities to go fast or to make changes."
The contrast matters: technical debt is visible, measurable, addressable. Cognitive debt is invisible until it paralyzes you.
The third reveal is the key insight: clean code is not the same as understood code. AI can produce perfectly structured, well-tested code that nobody on the team can explain.
-->

---
layout: quote
---

# "By week 8, one team hit a wall."

Margaret-Anne Storey

<v-click>

## "No one on the team could explain why certain design decisions had been made."

</v-click>

<!--
[T+97:00 | S4 slide 4 of 15 | 1.5min]
Source: Simon Willison citing Storey (simonwillison.net/2026/Feb/15/cognitive-debt/)

Storey coached a student team using AI tools. They went fast at first — incredibly productive. Then paralysis. They initially blamed technical debt: messy code, poor architecture. But the real problem was that nobody understood the system anymore.
"They had accumulated cognitive debt faster than technical debt, and it paralyzed them."
This is not hypothetical. It happened in an academic setting with full supervision. It is happening right now in production teams without supervision.
-->

---
layout: quote
---

<h1>"I no longer have a firm mental model of what my projects can do and how they work,<br />
which means each additional feature becomes harder to reason about."</h1>

Simon Willison

<!--
[T+97:45 | S4 slide 5 of 15 | 1min]
Source: Simon Willison (simonwillison.net/2026/Feb/15/cognitive-debt/)

Willison is one of the most thoughtful and experienced developers writing about AI tools — he co-created Django, built datasette, has been publicly experimenting with AI coding for over a year.
Even he lost the plot: "I've found myself getting lost in my own projects."
If Willison — who understands these tools better than almost anyone — experiences cognitive debt, the rest of us are not immune. This is not a skill issue. It is structural.
-->

---
layout: statement
---

# Velocity without understanding is not sustainable.

<!--
[T+98:15 | S4 slide 6 of 15 | 0.5min]
Source: Margaret-Anne Storey (margaretstorey.com/blog/2026/02/09/cognitive-debt/)

Five words that summarize the entire risk. Let this hang in the air.
This is the hinge slide — we've defined the concept (Naur, Storey, Willison). Now we turn to how cognitive debt manifests in practice. "So what does this look like when it compounds? Let me show you the patterns."
-->

---

# The Confidence Spiral

<v-click>

AI writes code → you don't fully understand it → something breaks

</v-click>
<v-click>

You prompt again → you understand less → you defer more

</v-click>
<v-click>

**The prompting loop can become dependency: convenience now, weaker judgment later.**

</v-click>

<!--
[T+100:00 | S4 slide 7 of 15 | 2min]
Source: "Vibe Coding Paralysis" (x.com/francedot/status/2017858253439345092)

Walk through the spiral slowly. Each step feels rational in the moment — of course you prompt again when something breaks, the tool is right there. But each loop erodes your own judgment.
The deeper mechanism (Husom, "Outsourcing Thinking"): even if you're still thinking just as hard, what you think about changes. Constructing a solution from scratch and reviewing someone else's solution are categorically different cognitive acts. One builds mental models; the other consumes them. Each loop through the spiral shifts more of your thinking from construction to consumption — and that difference compounds.
"The tool that was supposed to give you confidence — 'I can build anything now!' — slowly takes it away."
Ask the room to notice whether they recognize this pattern. No hands needed — just internal recognition.
-->

---

# Ralph Wiggum Loops

<v-click>

The agent tries to fix a test. Breaks something else. Fixes that. Breaks the original thing. Around and around.

</v-click>
<v-click>

**The agent isn't confused. It's doing exactly what you'd expect from a system with no memory of why it's failing.**

</v-click>
<v-click>

The Confidence Spiral is the human going in circles. Ralph Wiggum loops are the agent going in circles. **Without guardrails, they reinforce each other.**

</v-click>

<!--
[T+101:30 | S4 slide 8 of 15 | 2min]
The name: Ralph Wiggum from The Simpsons — earnestly trying, going nowhere. The agent isn't malicious or broken. It's doing its best with no meta-model of why it keeps failing. It sees "test broken," tries to fix the test, doesn't step back to ask "am I approaching this fundamentally wrong?"

This is the agent-side mirror of the Confidence Spiral. The human defers more, understands less. The agent retries more, succeeds less. When both loops are running simultaneously — the human can't diagnose the loop because they've lost understanding, and the agent can't break the loop because it has no self-awareness — you get compounding failure.

Connect back to S3b: guardrails (hooks that detect repetitive failures, context constraints that force the agent to stop and report, verification loops that break the cycle) are specifically designed to prevent this. This is what "shaping boundaries" looks like in practice.

For the audience: ask them to notice whether they've seen this. "Has anyone watched an AI agent go in circles? Retrying the same thing, getting the same error, trying again?" Most hands will go up.
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
Source: "Vibe Coding Paralysis" (x.com/francedot/status/2017858253439345092)

Four manifestations, each a symptom of the same root cause: cognitive debt. Walk through briefly — the audience will recognize at least one.
The planning loop connects back to Section 3: we just taught spec-driven development, but even specs can become procrastination if understanding is absent.
The coherence bottleneck challenges the hype narrative directly: "Humans aren't bottlenecked by typing speed. We're bottlenecked by coherence."
Don't linger on each pattern — the recognition should be fast and uncomfortable.
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
Source: Matija Grcic (x.com/matijagrcic/status/2012517043711492558)

The calculator analogy is powerful. Teachers in the 1970s thought calculators would make arithmetic unnecessary. They were wrong — mental arithmetic is foundational to mathematical reasoning.
The same thing is happening with code. If you can't hold basic patterns in your head, you cannot reason about systems. This is not about memorizing syntax. It is about maintaining the cognitive infrastructure that lets you think about software at all.
For the non-devs: substitute "code" with any domain skill. If you outsource all your judgment to a tool, what remains?
-->

---

# The Craft Disappeared

<v-click>

A senior engineer. 15 years of experience. Loved the craft. Mentored juniors. Built systems from scratch.

</v-click>
<v-click>

**He quit.**

</v-click>
<v-click>

"His entire job became prompting AI and reviewing generated code. The actual engineering — the part he loved — disappeared."

</v-click>

<!--
[T+107:00 | S4 slide 11 of 15 | 2min]
Source: Ishaan Sehgal (x.com/ishaansehgal/status/2016198542566588700)

Let this story land. Don't rush to the next slide. This is not about someone who couldn't adapt. This is someone who was deeply skilled, who loved the work, and who found that the thing he loved was being extracted from his role.
The risk is not just cognitive debt in the abstract — it is the loss of craft, meaning, and identity.
Connect to Section 2's Karpathy split: "those who primarily liked coding" are watching their practice disappear.
-->

---
layout: statement
---

# When Dependence Becomes Anxiety

<!--
[T+109:00 | S4 slide 12 of 15 | 1min]
Source: Armin Ronacher, "Agent Psychosis: Are We Going Insane?" (lucumr.pocoo.org/2026/1/18/agent-psychosis/)

Ronacher is the creator of Flask — one of the most respected Python developers in the world. This is the psychological endpoint of unchecked cognitive debt.
When you depend on a tool you don't understand, when its behavior is unpredictable, when you can't tell if its output is correct — that is not productivity. That is anxiety with a productivity veneer.
This connects all the patterns: the confidence spiral, the outsourced understanding, the lost craft. They all lead here if left unchecked.
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
Source: "It is not — and should not be — zero-effort" (sources/not-zero-effort.md)

The emotional low point of the section. "Completely hollow" is a strong phrase — let it sit.
But the second reveal is the turn. This is not a deterministic outcome. It is a choice. The pivot from diagnosis to agency.
We do not have to end up hollow. The question is how we choose to use these tools.
Transition: "So what does non-hollow look like? What is the antidote?"
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
Source: Addy Osmani on Anthropic study (linkedin.com/posts/addyosmani_ai-programming-softwareengineering-activity-7423836698100416513-H0W4) and Margaret-Anne Storey (margaretstorey.com/blog/2026/02/09/cognitive-debt/)

Osmani: "AI doesn't make you dumber, but passive reliance does. The difference is asking 'why' vs. treating it like a code vending machine."

Storey's concrete mitigations: require human understanding, document the why, create regular checkpoints where teams rebuild shared understanding.

THE COMMIT MESSAGE EXAMPLE — use when landing the third bullet:
"We had this conversation in our own Slack channel recently. One colleague argued that commit messages must be hand-written — that the discipline of formulating them is a prerequisite for meaningful collaboration. Another colleague reframed it: it's about quality, not origin. A developer who submits a merge request is accountable for understanding the work and explaining it. Writing a commit message forces reflection — but the operative word is reflection, not typing. If you can't explain a commit message you submitted, you have a problem regardless of who wrote it. The expectation is comprehension and ultimate authorship, not initial authorship."

This grounds the antidote in daily practice: documentation of the why is not about the mechanical act of typing — it's about the cognitive act of understanding. AI can draft the commit message. The human must own the meaning.

Connect back to Section 3: context engineering and spec-driven development are not just productivity tools — they are cognitive debt prevention. The CLAUDE.md you write is documentation of the why. The spec you author is proof of understanding. The verification loop is the checkpoint. And the guardrails from S3b — hooks that detect repetitive failures, constraints that force agents to stop and report — are specifically designed to break Ralph Wiggum loops before they start.
The new stack is the antidote — if used with intention. That's the bridge to Section 5: what skills and practices actually matter.
-->

---
layout: center
class: text-center
---

# Have you felt any of this?

<h2 class="mt-8">Do you understand what your tools produce?</h2>

<!--
[T+113:30 | S4 slide 15 of 15 | 8min DISCUSSION]
DISCUSSION PROMPT — pause here for 5-7 minutes. This is the most emotionally loaded discussion in the talk.
ABORT POINT: If running 10+ minutes over, shorten to 3 minutes and keep it to the first question only ("Have you felt any of this?"). Skip the second question.

The dual prompt mirrors Section 2's pattern: the first question invites personal recognition, the second invites honest self-assessment.

Prompt follow-ups:
- "Which pattern resonated most — the confidence spiral, the planning loop, the outsourced understanding?"
- "For those using Copilot daily: do you understand the code it writes? Could you write it yourself?"
- "Has anyone experienced the senior engineer's feeling — that the craft is changing in ways that feel like loss?"

FACILITATION: This discussion carries professional risk — people admitting "I don't understand what my tools produce" in front of colleagues. To create safety:
1. Go first yourself: "I'll share first — here's where I've felt it..." (normalizes vulnerability)
2. Frame as observational, not confessional: "You don't need to share specifics — I'm curious about patterns you recognize."
3. Consider 2 minutes in pairs before full-room discussion (reduces exposure).
Listen for: vulnerability, recognition, stories of their own cognitive debt experiences.

CLOCK CHECK: Target time is T+121:30. If you're at T+130:00 or later, you have ~32 minutes for S5 + S6. Compress the S5 discussion to 3 minutes (taste question only) and trim the S6 demo to verbal walkthrough. That keeps the closing on time.

This discussion bridges directly to Section 5. After it winds down: "Everything we just named — the spirals, the patterns, the lost understanding — they all point to the same question: what skills actually matter when AI can write the code? That's where we're going next."
-->
