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
- Verbal bridge (use this): "We've just spent the last section exploring an incredible toolkit — context engineering, skills, MCPs, hooks, harnesses, agents, teams. Each layer added power. But each layer also added something you didn't personally write, something you may not fully understand."

BRIDGE: "And remember — going from one agent to many isn't a scaling problem. It's a distributed systems problem. Who gets which context? What happens when one agent's output breaks another's assumptions? Every component is nondeterministic. That coordination complexity has a cost. And that cost has a name."
-->

---
class: v-center
---

# Two Kinds of Debt

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
SOURCE: Peter Naur, "Programming as Theory Building" (1985), cited by Storey (margaretstorey.com/blog/2026/02/09/cognitive-debt/)

KEY POINTS:
- Open on Naur rather than giving him a slide — he is the durable pre-AI anchor, and everything in this section is an implication of the idea: "A program is more than its source code. Rather a program is a theory that lives in the minds of the developers." Code artifacts are not the same thing as shared understanding
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
  <div class="quote-progressive-line">“We gave a student team AI coding tools and tracked them for 10 weeks.</div>

  <v-click>
    <div class="quote-progressive-line">Early results were impressive — they were shipping faster than any cohort we’d seen.</div>
  </v-click>

  <v-click>
    <div class="quote-progressive-line">By week 8, one team hit a wall. No one could explain why certain design decisions had been made.”</div>
  </v-click>
</div>

<v-click>

Margaret-Anne Storey

</v-click>

<v-click>

## “I no longer have a firm mental model of what my projects can do and how they work, which means each additional feature becomes harder to reason about.”

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
class: statement-wide
---

# The trap is not AI.

<v-click>

## It is the frictionless path.

</v-click>

<v-click>

## You can outsource thinking, but not understanding.

</v-click>

<!--
SOURCE: Søren Christensen, "The Frictionless Trap" (linkedin.com/pulse/frictionless-trap-s%C3%B8ren-christensen-n1cce/)
SOURCE: CodeRabbit, State of AI vs. Human Code Generation study
SOURCE: Fastly developer survey

KEY POINTS:
- Reframes Christensen's key point in the cognitive-debt section's language
- Lead in with the one-line version of the diagnosis: "velocity without understanding is not sustainable"
- The hard numbers behind it, if the room wants evidence rather than assertion: CodeRabbit's comparative study found 1.7x more bugs in AI-generated code than human-written and 1.4x more critical issues; Fastly found 30% of senior developers say auditing AI output offsets their time savings, and ~33% of seniors ship half their code as AI-generated versus only 13% of juniors
- Cultural marker if useful: Collins Dictionary named "vibe coding" Word of the Year 2025; Merriam-Webster chose "slop"
- Optional verbal (thdxr): "I don't think we're even trading all this off to move faster. I think we're moving at a normal pace." The debt accumulates without the speed payoff
- "Understanding" is the irreducibly human work — the integration your brain does that becomes judgment
- Christensen's useful distinction: AI can remove friction by generating thoughts for approval, or create productive friction by challenging thoughts the human already has
- The trap is the frictionless path, not the tool itself

DELIVERY:
- Let "The trap is not AI" sit long enough to defuse anti-AI framing
- Reveal "frictionless path" as the actual risk
- The final reveal is the operating boundary: AI can accelerate thought, but understanding still has to be earned

BRIDGE: "And if understanding is what's at risk, the practical response is to change what humans actually review."
-->

---
layout: default
class: dim-prior v-center
---

# From Reviewing Code to Reviewing Intent

Line-by-line PR review does not scale with agentic output.

<v-click>

The human checkpoint moves upstream: **specs, constraints, acceptance criteria.**

</v-click>
<v-click>

Trust moves downstream: **tests, type checks, contracts, rollout guardrails.**

</v-click>
<v-click>

The question shifts from “Did you write this correctly?” to **“Are we solving the right problem?”**

</v-click>

<!--
SOURCE: Ankit Jain, "How to Kill the Code Review" (latent.space/p/reviews-dead)

KEY POINTS:
- This reframes review from post-hoc diff reading to upstream intent validation
- Trimmed qualifiers, say verbally: the upstream review happens *before generation*, and the full closing question is "are we solving the right problem *under the right constraints*"
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
layout: default
---

# The Swiss-Cheese Model

<SwissCheeseDiagram size="lg" />

<v-click>

Every safeguard has holes: tests, reviews, policies, humans.

</v-click>
<v-click>

Cognitive debt makes the holes bigger. **Incidents happen when they line up.**

</v-click>

<!--
SOURCE: James Reason, Swiss-cheese model of accident causation
SOURCE: Layer labels from Ankit Jain, "How to Kill the Code Review" (latent.space/p/reviews-dead) — diagram redrawn in deck style
NOTE: The "incident" through-arrow draws on the second click, with the "they line up" line — don't advance past it early
SOURCE: CodeRabbit, "A Semantic History of Vibe Coding" (coderabbit.ai/blog/a-semantic-history-how-the-term-vibe-coding-went-from-a-tweet-to-prod)

KEY POINTS:
- The point is layered defense: no single control is perfect
- Cognitive debt weakens multiple layers at once because people stop understanding intent, assumptions, and failure modes
- The risk is not one failed check. It's several imperfect checks aligning.
- Real-world examples of holes lining up (2025): AWS suffered a 13-hour outage where an internal AI assistant was involved in problematic changes; Moonwell issued $1.8M in bad debt in a possibly AI-related incident; Kimi chatbot had reliability issues amid aggressive AI-assisted scaling

BRIDGE: "And the biggest hole is in the layer we trust most: human review."
-->

---
layout: fact
---

<BigNumber
  value="79.8%"
  label="followed the AI — even when it was wrong"
  sublabel="3 preregistered studies, 1,372 participants, 9,593 trials (Wharton, 2026)"
/>

<v-click>

<p class="mt-8 text-xl">Without AI: 45.8% accuracy. With incorrect AI: <strong>31.5%</strong> — worse than having no AI at all.</p>

</v-click>
<v-click>

<p class="mt-6 text-lg"><strong>Cognitive surrender</strong> — the brain recodes the answer as its own. It doesn’t feel outsourced. It feels self&#8209;generated.</p>

</v-click>

<!--

SOURCE: Doshi & Neel, "Thinking — Fast, Slow, and Artificial: How AI is Reshaping Human Reasoning and the Rise of Cognitive Surrender" (Wharton School, University of Pennsylvania, 2026)
SOURCE: Rohan Paul (x.com/rohanpaul_ai/status/2036134704999694835)

KEY POINTS:
- Set up the last click with Kahneman before revealing it: System 1 is fast intuition, System 2 is slow analysis, and AI is becoming System 3 — an external cognitive system operating outside your brain
- Distinguish surrender from offloading: with a calculator you know the tool did the work; with surrender your brain recodes the AI's answer as YOUR judgment and you genuinely believe you reasoned it through. This is not laziness, it is a cognitive architecture problem
- This names the specific hole in the Swiss-cheese model's "human review" layer — the reviewer's brain has already accepted the answer
- People deferred to AI on over 50% of questions. Time pressure didn't eliminate the effect; incentives and feedback reduced it without removing it. Those most resistant scored higher on fluid intelligence and need for cognition — structural, not about effort
- When AI was correct, 92.7% followed it — that's expected
- When AI was wrong, 79.8% still followed — that's the problem
- Baseline accuracy without AI was 45.8%; with correct AI jumped to 71.0%; with incorrect AI dropped to 31.5% — access to wrong AI made people perform WORSE than no AI
- Confidence increased 11.7 percentage points across the board, including wrong answers — people didn't just follow bad advice, they became more sure of it
- Human review is supposed to be the safety net. This research shows the safety net has a hole: people don't just miss bad output, they become more confident in it.

DELIVERY:
- Let the headline number land
- The 31.5% stat is the gut punch — being wrong WITH AI is worse than guessing without it
- The confidence stat is verbal now (trimmed from the slide so the gut punch owns the space): "and AI boosted confidence by 11.7 points — even on wrong answers. Not only wrong more often; more sure about it"
- Optional verbal: "The 'just review the AI output' model is breaking down. Not because people are lazy — because cognition itself starts to defer to the machine."

BRIDGE: "And the dangerous part is how this shows up in everyday working habits."
-->

---
layout: default
---

# The Confidence Spiral

<ConfidenceSpiralDiagram size="md" />

<v-click>

**The prompting loop can become dependency: convenience now, weaker judgment later.**

</v-click>
<v-click>

“We went from barely using coding agents to using them for every minor change in the past 6 months and I think they've **eroded our ability to delay gratification.**”

</v-click>

<!--

SOURCE: Francedot, "Vibe Coding Paralysis" (x.com/francedot/status/2017858253439345092)
SOURCE: thdxr (x.com/thdxr/status/2031377117007454421)
SOURCE: Katie Parrott, "AI Was Supposed to Free My Time. It Consumed It." (every.to/working-overtime/ai-was-supposed-to-free-my-time-it-consumed-it)
SOURCE: M. Karen Shen (UBC), research on compulsive chatbot use — "AI genie phenomenon" and "epistemic rabbit holes"
SOURCE: B.F. Skinner, variable-ratio reinforcement schedules (1950s)

KEY POINTS:
- Name the mechanism while the spiral is on screen: each prompt is a pull on a slot machine. Variable-ratio reinforcement, the same schedule that makes gambling compulsive — each response partially satisfies but opens a new question. Researchers call these "epistemic rabbit holes": never quite enough to stop, always enough to continue
- Say it without moralising — the point is that the mechanism is predictable, and predictable means manageable
- Parrott's anecdote if you want the human version: she sat down on a Friday afternoon to configure an AI assistant for "a few hours, tops" — 12 hours later she had written essays, rebuilt her website and added app features, then got out of bed at 1 a.m. to keep going
- What keeps people at the machine — FOBO (Fear of Becoming Obsolete) is the ignition, the dopamine loop is the fuel (Ernst & Young 2025): 54% of employees feel they're falling behind peers in AI use, 85% are learning on their own time. Organisations may not intervene because "workers voluntarily take on more and produce faster without being asked"
- Make clear why the spiral is seductive: every step feels locally rational
- The risk is gradual substitution of construction with passive review
- Dependency forms by accumulation, not one dramatic event
- thdxr observation: "We went from barely using coding agents to using them for every minor change in the past 6 months and I think they've eroded our ability to delay gratification"
- Four named symptoms of the compounding debt (Francedot) — use verbally, the room will recognize at least one:
  - The Planning Loop: planning becomes procrastination in disguise; you re-plan the same feature three times in a day
  - The Coherence Trap: you ship faster than you can hold the system in your head; the codebase grows, your mental model doesn't
  - Context Collapse: you lose track of which session "knows" what; the AI mirrors your own fragmentation
  - The Completionist Trap: starting feels amazing, the last 20% still takes time — a graveyard of almost-finished projects
- The common denominator across all four is weakened coherence under speed; typing was never the real bottleneck

DELIVERY:
- Walk through the spiral slowly
- Ask the room to notice whether they recognize this pattern — no hands needed, just internal recognition
- Optional verbal: "One team lead described it as eroded delayed gratification — the agents keep pulling you toward the next feature instead of cleaning up what you have."
- Name one or two of the four symptoms verbally while the spiral is on screen — pick the ones that fit the room

BRIDGE: "Leave that spiral unchecked, and you stop outsourcing effort occasionally and start outsourcing it by default."
-->

---
layout: statement
---

# This is a choice, not a fate.

<v-click>

> “Having poor quality code from an agent is a choice that you make.”
>
> Simon Willison

</v-click>
<v-click>

The goal is **thoughtful deployment, not paralysis.** Build safeguards. Hold people accountable. Keep capturing the upside.

</v-click>

<!--
SOURCE: Simon Willison, Pragmatic Summit Fireside Chat (simonwillison.net/2026/Mar/14/pragmatic-summit/)
SOURCE: Lenny Rachitsky summarizing Benedict Evans (x.com/lennysan/status/2061452384153505897)

KEY POINTS:
- Pivot from the debt patterns to agency — the audience needs to exhale
- Willison's quote sharpens the pivot: poor output is a harness failure, not a model limitation. Agents CAN produce quality code if you invest in the system around them.
- Raise the stakes before the release valve: cognitive debt can be catastrophic in security, privacy and compliance. Comprehension failures become incidents, fines and trust damage, not just inelegant code. Every technology wave creates new ways to harm people — databases, social media, AI all changed the harm surface area — but fear of possible harm cannot be the whole operating model
- The second click is the governance posture for the section: risk awareness, safeguards, accountability, and continued deployment. Keep the tone sober rather than alarmed
- Brief pause before the practical antidote checklist

DELIVERY:
- Short slide — hold for a few seconds, then advance
- Tone shift: from warning to agency
- Verbal bridge: "Simon Willison — one of the most experienced developers working with AI tools — said something honest: 'I no longer have a firm mental model of what my projects can do.' This isn't a junior problem. It's a structural one. Which means the antidote has to be structural too."
- After the v-click quote: "The quality of what agents produce reflects the quality of the harness you built. Invest in the system, not just the prompt."
-->

---
class: dim-prior v-center
---

# The Antidote — The Human in the Loop

<v-click>

**The spec** — intent, authored by a human. Ask “why,” not just “what.”

</v-click>
<v-click>

**The explainability gate** — no merge until the author can explain intent, tradeoffs, and failure modes.

</v-click>
<v-click>

**The ownership check** — one named human owns the change end to end. If that fails, slow down and re-scope.

</v-click>

<!--

SOURCE: Addy Osmani, on Anthropic study (linkedin.com/posts/addyosmani_ai-programming-softwareengineering-activity-7423836698100416513-H0W4)
SOURCE: Margaret-Anne Storey (margaretstorey.com/blog/2026/02/09/cognitive-debt/)
SOURCE: Martin Eriksson, "When Software Becomes Cheap, Strategy Becomes Everything" (thedecisionstack.com/when-software-becomes-cheap-strategy-becomes-everything/)

KEY POINTS:
- Close the section with a practical control model: intent, review, ownership. These are the team-level operating rules, and this is the point where governance becomes memorable and actionable
- The third check that didn't fit on screen is the reasoning log: capture why this approach won, what was rejected, and what validated it. Document not just what changed, but why
- Use the commit-message example verbally: if you cannot explain a change you submitted, the debt is already accumulating
- Stress accountability: at least one human must fully understand each change before it ships (the long form of the explainability gate, trimmed from the slide)
- Link back to section 3: harness discipline is the preventive mechanism
- Eriksson's Intercom/Fin case study is a positive counterexample of getting this right: they built Fin (resolving 1M+ weekly tickets), shifted to outcome-based pricing ($0.99/resolution), and reached $100M+ ARR in under a year. The key: they aligned incentives so the AI had to actually work — not just ship fast. Outcome-based pricing is a structural antidote to cognitive debt because it forces you to own the quality of AI output, not just its volume.

DELIVERY:
- Land the three-part model cleanly before introducing operating checks
- Optional verbal after "the output — shipped, understood, owned": "Intercom did something smart here. When they built Fin — their AI support agent — they didn't just bolt it on. They shifted to outcome-based pricing: 99 cents per resolved ticket. That forces you to own quality, not volume. If the AI doesn't actually work, you don't get paid. That's the kind of structural incentive that prevents cognitive debt from compounding."

BRIDGE: "That is the operating model. The final question is what kind of people this model rewards."
-->
