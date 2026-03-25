---
layout: section
transition: section-shift
---

# Cognitive Debt

The hidden cost of going fast — and how to stay in control

<!--

KEY POINTS:
- Post-demo pivot: from capability to responsibility
- Post-hype turn: the demo just showed what the tools can do — now show what they cost
- Slow the pace and move from tooling power to human understanding
- Frame this as a systems risk, not a moral panic

DELIVERY:
- Let this slide sit for 2-3 seconds before advancing — the turn should be visible, not just verbal

DELIVERY:
- Verbal bridge (use this): "We've just spent the last section exploring an incredible toolkit — context engineering, skills, MCPs, hooks, harnesses, agents, teams. Each layer added power. But each layer also added something you didn't personally write, something you may not fully understand."

BRIDGE: "And remember — going from one agent to many isn't a scaling problem. It's a distributed systems problem. Who gets which context? What happens when one agent's output breaks another's assumptions? Every component is nondeterministic. That coordination complexity has a cost. And that cost has a name."
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
- Summarize the diagnosis before showing how it changes review and team behavior

DELIVERY:
- Let this hang in the air

BRIDGE: "And this isn't just a feeling. The data backs it up."
-->

---
layout: fact
---

# 1.7x more bugs

AI-generated code vs. human-written — and **1.4x more critical issues**

<v-click>

30% of senior developers say auditing AI output **offsets their time savings**

</v-click>

<!--

SOURCE: CodeRabbit, "A Semantic History: How 'Vibe Coding' Went from a Tweet to Prod" (coderabbit.ai/blog/a-semantic-history-how-the-term-vibe-coding-went-from-a-tweet-to-prod)
SOURCE: CodeRabbit, State of AI vs. Human Code Generation study
SOURCE: Fastly developer survey

KEY POINTS:
- Ground the abstract "velocity without understanding" claim in hard numbers
- The 1.7x bug ratio comes from CodeRabbit's comparative study of AI vs human code
- The 30% audit-offset stat is from Fastly's developer survey — seniors report that the time saved by AI generation is consumed by reviewing and fixing the output
- Additional stat for verbal use: ~33% of seniors ship half their code as AI-generated vs. only 13% of juniors (Fastly)
- Cultural marker for verbal use: Collins Dictionary named "vibe coding" Word of the Year 2025; Merriam-Webster chose "slop" instead

DELIVERY:
- Let the number land before the v-click
- The audience will feel the tension: the tools are powerful, but the quality gap is measurable
- Optional verbal: "Karpathy coined 'vibe coding' for weekend hacking. Collins made it Word of the Year. Merriam-Webster's word of the year? 'Slop.' That tells you something about where the conversation went."
- Optional verbal (thdxr): "The worst part? One practitioner put it this way: 'I don't think we're even trading all this off to move faster. I think we're moving at a normal pace.' The debt accumulates without the speed payoff."

BRIDGE: "And in high-stakes domains, that gap becomes dangerous."
-->

---
layout: statement
class: statement-wide
---

# In high-stakes domains like security, privacy, and compliance, cognitive debt can be catastrophic.

<!--
KEY POINTS:
- Raise severity: this is not only about productivity or elegance
- Comprehension failures can become incidents, fines, and trust damage
- Use this as a severity marker, then move back into operating-model changes

BRIDGE: "Before the day-to-day patterns, look at what this means for review and verification."
-->

---
layout: default
---

# From Reviewing Code to Reviewing Intent

<v-click>

Line-by-line PR review does not scale with agentic output.

</v-click>
<v-click>

Move the human checkpoint upstream: **review specs, constraints, and acceptance criteria** before generation.

</v-click>
<v-click>

Move trust downstream into deterministic checks: **tests, type checks, contracts, rollout guardrails**.

</v-click>
<v-click>

Think **Swiss-cheese model**: stack imperfect controls so the holes don't align.

</v-click>
<v-click>

The question shifts from "Did you write this correctly?" to **"Are we solving the right problem under the right constraints?"**

</v-click>

<!--
SOURCE: Ankit Jain, "How to Kill the Code Review" (latent.space/p/reviews-dead)

KEY POINTS:
- This reframes review from post-hoc diff reading to upstream intent validation
- Keep nuance explicit: this is not "no accountability"; it is relocating accountability
- Put this in the cognitive-debt section because the review model now directly sets up the layered-failure argument
- Deterministic verification is the safety net when output volume exceeds human diff-reading capacity
- Explicitly anchor the layer concept to the Swiss-cheese model (James Reason)

DELIVERY:
- Position as an operating-model shift, not a provocative slogan
- Emphasize "review intent" and "deterministic checks" as complementary controls
- Land the final line as a framing question the audience can reuse in their teams

BRIDGE: "And once you start thinking in layered controls, the Swiss-cheese model becomes the right metaphor."
-->

---
layout: statement
class: statement-wide
---

# Swiss-cheese model

<v-click>

Every safeguard has holes: tests, reviews, policies, humans.

</v-click>
<v-click>

Cognitive debt makes the holes bigger. Incidents happen when they line up.

</v-click>

<!--
SOURCE: James Reason, Swiss-cheese model of accident causation
SOURCE: CodeRabbit, "A Semantic History of Vibe Coding" (coderabbit.ai/blog/a-semantic-history-how-the-term-vibe-coding-went-from-a-tweet-to-prod)

KEY POINTS:
- The point is layered defense: no single control is perfect
- Cognitive debt weakens multiple layers at once because people stop understanding intent, assumptions, and failure modes
- The risk is not one failed check. It's several imperfect checks aligning.
- Real-world examples of holes lining up (2025): AWS suffered a 13-hour outage where an internal AI assistant was involved in problematic changes; Moonwell issued $1.8M in bad debt in a possibly AI-related incident; Kimi chatbot had reliability issues amid aggressive AI-assisted scaling

BRIDGE: "And the dangerous part is that those holes do not only show up in audits and incidents. They also start in everyday working habits."
-->

---
layout: default
---

# Cognitive Surrender

<v-click>

Kahneman's System 1 (fast intuition) and System 2 (slow analysis). AI is becoming **System 3** — an external cognitive system that operates outside your brain.

</v-click>
<v-click>

**Cognitive Surrender**: your brain stops questioning AI output and recodes it as your own conclusion. It doesn't feel outsourced — it feels self-generated.

</v-click>
<v-click>

This is not laziness. It's a **cognitive architecture problem**.

</v-click>

<!--

SOURCE: Steven D. Doshi & Gideon Neel, "Thinking — Fast, Slow, and Artificial: How AI is Reshaping Human Reasoning and the Rise of Cognitive Surrender" (Wharton School, University of Pennsylvania, 2026)
SOURCE: Rohan Paul (x.com/rohanpaul_ai/status/2036134704999694835)

KEY POINTS:
- Distinguish from offloading: using a calculator, you know the tool did the work. With surrender, your brain recodes the AI's answer as YOUR judgment — you genuinely believe you thought it through
- This names the specific hole in the Swiss-cheese model's "human review" layer
- 3 preregistered studies, 1,372 participants, 9,593 trials — robust methodology
- People deferred to AI on over 50% of questions
- Time pressure didn't eliminate the effect. Incentives and feedback reduced it but didn't remove it.
- People most resistant scored higher on fluid intelligence and need for cognition — this is structural, not about effort

DELIVERY:
- Let System 3 land before the v-click
- The word "self-generated" is the key — pause on it
- Verbal bridge: "This is the hole in the safety net we just described. Human review is supposed to catch AI mistakes. But what if the reviewer's brain has already accepted the answer?"

BRIDGE: "And the data makes this hard to brush off."
-->

---
layout: fact
---

# 79.8% followed AI — even when it was wrong

Across 3 preregistered studies — 1,372 participants, 9,593 trials

<v-click>

Without AI: 45.8% accuracy. With incorrect AI: **31.5%** — worse than having no AI at all.

</v-click>
<v-click>

AI boosted confidence by **11.7 percentage points**, even on wrong answers.

</v-click>

<!--

SOURCE: Doshi & Neel, "Thinking — Fast, Slow, and Artificial" (Wharton, 2026)

KEY POINTS:
- When AI was correct, 92.7% followed it — that's expected
- When AI was wrong, 79.8% still followed — that's the problem
- Baseline accuracy without AI was 45.8%; with correct AI jumped to 71.0%; with incorrect AI dropped to 31.5% — access to wrong AI made people perform WORSE than no AI
- Confidence increased 11.7 percentage points across the board, including wrong answers — people didn't just follow bad advice, they became more sure of it
- Human review is supposed to be the safety net. This research shows the safety net has a hole: people don't just miss bad output, they become more confident in it.

DELIVERY:
- Let the headline number land
- The 31.5% stat is the gut punch — being wrong WITH AI is worse than guessing without it
- The confidence stat closes the trap: not only are you wrong more often, you're more sure about it
- Optional verbal: "The 'just review the AI output' model is breaking down. Not because people are lazy — because cognition itself starts to defer to the machine."

BRIDGE: "And the dangerous part is how this shows up in everyday working habits."
-->

---
layout: default
---

# The Confidence Spiral

<SlideImage src="/confidence-spiral.png" alt="The confidence spiral diagram" />

<v-click>

**The prompting loop can become dependency: convenience now, weaker judgment later.**

</v-click>
<v-click>

"We went from barely using coding agents to using them for every minor change in the past 6 months and I think they've **eroded our ability to delay gratification.**"

</v-click>

<!--

SOURCE: Francedot, "Vibe Coding Paralysis" (x.com/francedot/status/2017858253439345092)

SOURCE: Francedot, "Vibe Coding Paralysis" (x.com/francedot/status/2017858253439345092)
SOURCE: thdxr (x.com/thdxr/status/2031377117007454421)

KEY POINTS:
- Make clear why the spiral is seductive: every step feels locally rational
- The risk is gradual substitution of construction with passive review
- Dependency forms by accumulation, not one dramatic event
- thdxr observation: "We went from barely using coding agents to using them for every minor change in the past 6 months and I think they've eroded our ability to delay gratification"

DELIVERY:
- Walk through the spiral slowly
- Ask the room to notice whether they recognize this pattern — no hands needed, just internal recognition
- Optional verbal: "One team lead described it as eroded delayed gratification — the agents keep pulling you toward the next feature instead of cleaning up what you have."

BRIDGE: "Leave that spiral unchecked, and you stop outsourcing effort occasionally and start outsourcing it by default."
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
- Treat these as symptoms, not separate problems
- The common denominator is weakened coherence under speed
- Tie back to the earlier thesis: typing was never the real bottleneck

DELIVERY:
- Walk through briefly — the audience will recognize at least one

BRIDGE: "At that point, convenience stops being occasional help and starts becoming default dependency."
-->

---
layout: statement
---

# This is a choice, not a fate.

<!--

KEY POINTS:
- Pivot from the debt patterns to agency — the audience needs to exhale
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

<!--

SOURCE: Addy Osmani, on Anthropic study (linkedin.com/posts/addyosmani_ai-programming-softwareengineering-activity-7423836698100416513-H0W4)
SOURCE: Margaret-Anne Storey (margaretstorey.com/blog/2026/02/09/cognitive-debt/)

KEY POINTS:
- Close the section with a practical control model: intent, review, ownership
- Stress accountability: at least one human must understand each shipped change
- Link back to section 3: harness discipline is the preventive mechanism

DELIVERY:
- Land the three-part model cleanly before introducing operating checks

BRIDGE: "And for non-trivial work, that operating model needs explicit checks."
-->

---
layout: default
---

# Three checks for non-trivial changes

<v-click>

**Explainability gate** — no merge until the author can explain intent, tradeoffs, and failure modes.

</v-click>
<v-click>

**Reasoning log** — capture why this approach won, what was rejected, and what validated it.

</v-click>
<v-click>

**Ownership check** — one named human confirms end-to-end understanding and maintenance ownership.

</v-click>
<v-click>

If one check fails, slow down and re-scope.

</v-click>

<!--

SOURCE: Addy Osmani, on Anthropic study (linkedin.com/posts/addyosmani_ai-programming-softwareengineering-activity-7423836698100416513-H0W4)
SOURCE: Margaret-Anne Storey (margaretstorey.com/blog/2026/02/09/cognitive-debt/)

KEY POINTS:
- Translate the antidote into team-level operating rules
- This is the point where governance becomes memorable and actionable
- Use the commit-message example verbally: if you cannot explain a change you submitted, the debt is already accumulating

BRIDGE: "That is the operating model. The final question is what kind of people this model rewards."
-->
