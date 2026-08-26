<!-- 35. section — Cognitive Debt -->

We have just spent a whole section on an incredible toolkit. Context, skills,
MCPs, hooks, harnesses, agents. Each layer added power. But each layer also
added something you did not personally write, and may not fully understand.
And going from one agent to many is not a scaling problem, it is a distributed
systems problem, where every component is nondeterministic. That coordination
has a cost. And the cost has a name.

---

<!-- 36. default — Two Kinds of Debt — ~3 clicks -->

Peter Naur wrote, back in 1985, that a program is more than its source code.
A program is a theory that lives in the minds of the developers. Everything in
this section follows from that idea.
[click] Technical debt lives in the codebase. You can measure it, refactor it,
pay it down. You know this one.
[click] Cognitive debt lives in the brains of the developers. It compounds
when you go fast without understanding. And it is not code-specific. An agent
can generate an entire component library, and nobody can explain the spacing
scale or why the colour system works the way it does. Same debt.
[click] So here is the risk in one line. Even if the agents produce clean
code, the humans may have simply lost the plot.

---

<!-- 37. quote — “I no longer have a firm mental model of what my projects can do and how they work, which means each additional feature becomes harder to reason about.” — ~4 clicks -->

That sounds abstract, so here is a concrete case. Margaret-Anne Storey gave a
student team AI coding tools and tracked them for ten weeks.
[click] Early results were impressive. They were shipping faster than any
cohort she had seen.
[click] By week eight, one team hit a wall. Nobody could explain why certain
design decisions had been made. And notice the misdiagnosis risk here: a team
in that state will blame the code quality, when the problem is that the
understanding is gone.
[click] That is Storey's account.
[click] And in case you think it is a student problem, here is Simon Willison,
one of the most experienced developers working with these tools. I no longer
have a firm mental model of what my projects can do and how they work, which
means each additional feature becomes harder to reason about. This is not a
junior problem. It is structural.

---

<!-- 38. statement — The trap is not AI. — ~2 clicks -->

So let me be precise about what the trap is, because it would be easy to walk
out of here with the wrong lesson. The trap is not AI.
[click] It is the frictionless path. The tool can remove friction by
generating thoughts for you to approve, or it can create productive friction
by challenging the thoughts you already have. The first path is the trap. And
it may not even be buying speed: one team lead put it as, I don't think we are
trading all this off to move faster. I think we are moving at a normal pace.
[click] You can outsource thinking. You cannot outsource understanding.
Understanding is the integration your own brain does, the part that becomes
judgment. It still has to be earned.

---

<!-- 39. default — From Reviewing Code to Reviewing Intent — ~3 clicks -->

If understanding is what is at risk, the practical response is to change what
humans actually review. Code review used to work because of a happy accident:
a senior could read code faster than a junior could write it. Agentic output
reversed that. The reviewer may now be the first human to see the code, forced
to reconstruct intent that the diff never captured.
[click] So the human checkpoint moves upstream, to before generation. Specs,
constraints, acceptance criteria. That is where your attention goes.
[click] And verification moves downstream, to the things that do not get tired.
Tests, type checks, contracts, rollout guardrails. This is not removing
accountability. It is relocating it.
[click] The question shifts from, did you write this correctly, to, are we
solving the right problem, under the right constraints. That is a question you
can take back to your team on Monday.

---

<!-- 40. default — The Swiss-Cheese Model — ~2 clicks -->

Once you start thinking in layered controls, there is a metaphor that fits.
James Reason's Swiss-cheese model. Each slice is a safeguard, and each one has
holes.
[click] Tests, reviews, policies, humans. None of them is perfect, and nobody
expects them to be. The design relies on the holes not lining up.
[click] Cognitive debt makes the holes bigger, in several layers at once,
because people stop understanding the intent and the assumptions and the
failure modes. And incidents happen when the holes line up. Not one failed
check. Several imperfect checks, aligned. And the biggest hole is in the layer
we trust most.

---

<!-- 41. fact — ~2 clicks -->

Human review. Three preregistered studies at Wharton, nearly fourteen hundred
participants, almost ten thousand trials. When the AI was wrong, 79.8% of
people followed it anyway.
[click] Without AI, people were right 45.8% of the time. With an AI that was
wrong, 31.5%. Worse than having no AI at all. And their confidence went up,
by nearly twelve points, including on the wrong answers. Not only wrong more
often. More sure about it.
[click] Kahneman gave us System 1 and System 2. Think of AI as System 3, an
external cognitive system running outside your head. The researchers call
what happens next cognitive surrender, and it is different from offloading.
With a calculator, you know the tool did the work. With surrender, the brain
recodes the answer as its own. It does not feel outsourced. It feels
self-generated. That is the hole in the human review layer: the reviewer's
brain has already accepted the answer.

---

<!-- 42. default — The Confidence Spiral — ~2 clicks -->

And here is how that shows up in everyday working habits. Each prompt is a
slot-machine pull. The response partially satisfies and opens a new question,
so there is never quite enough to stop and always enough to continue. The
researchers call these epistemic rabbit holes. Every step feels locally
rational. The dependency forms by accumulation. You might recognise the
symptoms: re-planning the same feature three times in a day. Shipping faster
than you can hold the system in your head. A graveyard of almost-finished
projects.
[click] The prompting loop can become a dependency. Convenience now, weaker
judgment later.
[click] One team lead put it honestly. We went from barely using coding agents
to using them for every minor change in six months, and I think they have
eroded our ability to delay gratification. I am not moralising. The mechanism
is predictable, and predictable means manageable.

---

<!-- 43. statement — This is a choice, not a fate. — ~2 clicks -->

So let's exhale. This is a choice, not a fate. And the stakes are real: in
security, privacy and compliance, a comprehension failure becomes an incident,
a fine, lost trust. But fear of harm cannot be the whole operating model.
[click] Simon Willison again: having poor quality code from an agent is a
choice that you make. Poor output is a harness failure, not a model
limitation. The quality of what the agents produce reflects the quality of the
system you built around them.
[click] So the goal is thoughtful deployment, not paralysis. Build safeguards.
Hold people accountable. And keep capturing the upside.

---

<!-- 44. default — The Antidote — The Human in the Loop — ~3 clicks -->

Here is the antidote, as three team operating rules. Raise the intake bar
before review starts: require stated intent, a readable diff, test output, and
proof the tests actually ran. Read changes to tests especially carefully. An
agent can make a failing change green by rewriting the assertion around its new
behavior.
[click] The spec. Intent, authored by a human. Ask why, not just what. If you
cannot explain your own change in the commit message, the debt has already
started accumulating.
[click] The explainability gate. No merge until the author can explain the
intent, the tradeoffs and the failure modes. At least one human fully
understands each change before it ships.
[click] And the ownership check. One named human owns the change end to end.
If that fails, slow down and re-scope. That is the operating model, and it
connects straight back to the harness discipline from earlier: the harness is
the preventive mechanism. The final question is what kind of people this model
rewards.
