---
layout: section
transition: section-shift
---

# Cognitive Debt

The hidden cost of going fast — and what it means for the next generation

<!--

KEY POINTS:
- Post-demo pivot: from capability to responsibility
- This is the "peak hype" moment the agenda slide foreshadowed — now make the turn
- Slow the pace and move from tooling power to human understanding
- Frame this as a systems risk, not a moral panic

DELIVERY:
- Let this slide sit for 2-3 seconds before advancing — the turn should be visible, not just verbal

BRIDGE: "We've just spent the last section exploring an incredible toolkit — context engineering, skills, MCPs, hooks, harnesses, agents, teams. Each layer added power. But each layer also added something you didn't personally write, something you may not fully understand. And remember — going from one agent to many isn't a scaling problem. It's a distributed systems problem. Who gets which context? What happens when one agent's output breaks another's assumptions? Every component is nondeterministic. That coordination complexity has a cost. And that cost has a name."
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
- For designers: same risk applies — AI generates a complete component library, but no one can explain the spacing scale rationale, the color system logic, or why a particular interaction pattern was chosen. Cognitive debt is not code-specific.

BRIDGE: "The pattern sounds abstract, so let's ground it in a concrete case."
-->

---
layout: quote
class: quote-long
---

<div class="quote-progressive">
  <div class="quote-progressive-line">"We gave a student team AI coding tools and tracked them for 10 weeks.</div>

  <v-click>
    <div class="quote-progressive-line">Early results were impressive — they were shipping faster than any cohort we'd seen.</div>
  </v-click>

  <v-click>
    <div class="quote-progressive-line">By week 8, one team hit a wall. No one could explain why certain design decisions had been made."</div>
  </v-click>
</div>

<v-click>
  Margaret-Anne Storey
</v-click>

<v-click>

## "I no longer have a firm mental model of what my projects can do and how they work, which means each additional feature becomes harder to reason about."

Simon Willison

</v-click>

<!--

SOURCE: Simon Willison, citing Storey (simonwillison.net/2026/Feb/15/cognitive-debt/)
SOURCE: Margaret-Anne Storey (margaretstorey.com/blog/2026/02/09/cognitive-debt/)

KEY POINTS:
- The case arc matters: early acceleration, then sudden comprehension failure
- Highlight misdiagnosis risk: teams blame code quality when the issue is understanding loss
- Validate that this affects highly capable practitioners too — not just students
- Position the issue as structural workflow drift, not individual weakness

BRIDGE: "It's not just a student-team problem. It's a structural pattern."
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

<SlideImage src="/confidence-spiral.png" alt="The confidence spiral diagram" />

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

**The Coherence Trap**

You're shipping faster than you can hold the system in your head. The codebase grows; your mental model doesn't.

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

<h1>"If we treat them as a substitute for effort,<br />
we're barely a step away from grift — and I really believe<br />
we'll wake up one day, completely hollow."</h1>

<v-click>

## "We don't have to treat AI as a zero-effort shortcut to success."

</v-click>

<!--

SOURCE: "It is not — and should not be — zero-effort" (sources/not-zero-effort.md)
SOURCE: Matija Grcic (x.com/matijagrcic/status/2012517043711492558)

KEY POINTS:
- The emotional low point of the section
- "Completely hollow" is a strong phrase — let it sit
- The second reveal is the turn from fatalism to agency
- Choice of practice determines outcome

DELIVERY:
- Let "completely hollow" land before the second reveal
- Optional verbal color from Grcic: "I caught myself asking the AI for the umpteenth time how to do a certain if conditional. Why have I not internalized this? Because I've outsourced it to the AI."
- For non-devs: substitute "code" with any domain skill — if you outsource all your judgment to a tool, what remains?

BRIDGE: "So what does non-hollow look like? What is the antidote?"
-->

---
layout: statement
---

# This is a choice, not a fate.

<!--

KEY POINTS:
- Let the room exhale after the emotional valley
- The previous slide ended with "we don't have to" — this gives that idea its own visual beat
- Brief pause before the practical antidote checklist

DELIVERY:
- Short slide — hold for a few seconds, then advance
- Tone shift: from warning to agency
- Verbal bridge: "Simon Willison — one of the most experienced developers working with AI tools — said something honest: 'I no longer have a firm mental model of what my projects can do.' This isn't a junior problem. It's a structural one. Which means the antidote has to be structural too."
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
<v-click>

**Three checks for non-trivial changes:** explainability gate, reasoning log, ownership check.

</v-click>
<v-click>

If one check fails, slow down and re-scope.

</v-click>

<!--

SOURCE: Addy Osmani, on Anthropic study (linkedin.com/posts/addyosmani_ai-programming-softwareengineering-activity-7423836698100416513-H0W4)
SOURCE: Margaret-Anne Storey (margaretstorey.com/blog/2026/02/09/cognitive-debt/)

KEY POINTS:
- Close the section with a practical control model: intent, review, ownership
- Stress accountability: at least one human must understand each shipped change
- Link back to section 3: harness discipline is the preventive mechanism
- Operational framework for teams:
  - Explainability gate: no merge until the author can explain intent, tradeoffs, and failure modes
  - Reasoning log: capture why this approach, what was rejected, and what validated it
  - Ownership check: one named human confirms end-to-end understanding and maintenance ownership
  - If one check fails: slow down and re-scope

DELIVERY:
- THE COMMIT MESSAGE EXAMPLE (use when landing the third bullet): "We had this conversation in our own Slack channel recently. One colleague argued that commit messages must be hand-written — that the discipline of formulating them is a prerequisite for meaningful collaboration. Another colleague reframed it: it's about quality, not origin. A developer who submits a merge request is accountable for understanding the work and explaining it. Writing a commit message forces reflection — but the operative word is reflection, not typing. If you can't explain a commit message you submitted, you have a problem regardless of who wrote it. The expectation is comprehension and ultimate authorship, not initial authorship."

BRIDGE: "The antidote works — if you have competent humans in the loop. But what happens to the pipeline that produces those humans?"
-->

---
layout: statement
class: statement-wide
---

# If we skip the 10,000 hours of practice and jump straight to "overseer of AI output" — are we actually training architects?

<!--

SOURCE: Developer Pipeline Getting Strangled (linkedin.com)
SOURCE: Husom, "Outsourcing Thinking"

KEY POINTS:
- Frame this as a capability formation problem, not nostalgia for manual coding
- Prompting output is not the same as building architectural intuition
- The unresolved part for organizations: how juniors progress toward senior judgment

DELIVERY:
- Rhetorical question — don't answer it yet, let the audience sit with it

BRIDGE: "This question has a concrete answer from Harvard Business Review."
-->

---
layout: quote
---

<h1>"What I hear most often from executives is not that they fear AI will replace empathy.<br />
It's that they fear it will replace the contexts<br />
in which empathy is developed."</h1>

Harvard Business Review

<!--

SOURCE: "AI is Changing How We Learn at Work" (hbr.org/2025/12/ai-is-changing-how-we-learn-at-work)

KEY POINTS:
- The risk is losing the contexts where judgment is formed
- Translate "empathy" to role-specific tacit capability (product sense, architectural sense, design taste)
- Connect this directly to mentorship, practice, and feedback loops

BRIDGE: "So what does this imply for how we train juniors now?"
-->



---
layout: default
---

# Raising the Bar for Juniors

<v-click>

**Before:** Juniors wrote code designed by others. Mid and senior engineers owned system design.

</v-click>
<v-click>

**Now:** Writing code is no longer the primary constraint. Syntax and frameworks are becoming interchangeable.

</v-click>
<v-click>

**The new focus:** Deciding what should exist — whether that's code, a component, or a product direction.

</v-click>

<!--

SOURCE: "Junior Developers Should Go ALL-IN on System Design" (linkedin.com/posts/lukasz2_junior-developers-should-go-all-in-on-system-activity-7422568656930299905-sW94)

KEY POINTS:
- Clarify the before/now shift in entry-level expectations
- Output capacity increases quickly; judgment still develops slowly
- Main message: bar is moving from syntax execution to system thinking

DELIVERY:
- For managers in the room: how are you restructuring junior onboarding? Optimising for code output or for judgment development?

BRIDGE: "This can feel alarming, but it also clarifies what has always mattered."
-->
