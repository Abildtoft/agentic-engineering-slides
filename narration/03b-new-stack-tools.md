<!-- 25. section — The New Stack: Tools -->

Those are the two disciplines. Context, and specs. Without the right building
blocks they stay theoretical, so let me show you the pieces that make them
real. I will use my own setup as the example, but the pattern is tool-agnostic.
Every vendor has a version of each of these.

---

<!-- 26. two-cols-header — Markdown Is the Program Now — ~2 clicks -->

The medium for almost all of it is markdown. Human-readable and
machine-readable, and versionable like code. Agent instructions, skills, agent
definitions, all markdown. On the left is a piece of the actual file from the
repo behind these slides. Headings, bullets, some bold text. That is it.
[click] And on the right is what the agent sees. The same thing. Headings
become sections, lists become constraints. It is the onboarding document you
would write for a new hire, except the new hire is an agent.
[click] It is read at the start of every session. One file at the root
carries the project-wide rules, and files in subdirectories add local
constraints. Start with the root file. Only add more when the agent keeps
making the same mistake in the same place.

---

<!-- 27. default — Skills: Reusable Playbooks — ~2 clicks -->

The first tool built on that medium is the skill. A skill is a folder of
instructions for one kind of task. You do the task once, carefully, and then
you turn the workflow into something reusable. Skills shape how the agent
thinks. And they are not only for code. A design review, an accessibility
audit, a copy edit, all work the same way.
[click] There are two ways a skill gets used. You can call one explicitly with
a slash command. Or the agent reads the short descriptions of every skill it
has and matches your request to one on its own. That dotted line in the
diagram is the agent choosing, not you. Either way, the instructions are soft
guidance. The model interprets them and can adapt. Hold onto that word, soft,
because the next building block is the opposite.
[click] Prompting evaporates. Skill packs compound.

---

<!-- 28. center — The Kitchen Analogy — ~3 clicks -->

An analogy to hold all of this together. APIs are utensils, each one does one
thing. Skills are recipes. And MCP is the kitchen itself. You are not building
the kitchen from scratch. You are equipping it and writing the recipes.
[click] MCP, the Model Context Protocol, is a standard plug format. Think USB.
One protocol for connecting tools and data to an agent, instead of a custom
integration for every app.
[click] Each server publishes what it offers in three kinds. Tools, things the
agent can do. Resources, things it can read. And prompts, templates it can
reuse. All of it schema-validated, so handoffs are predictable. Ask for a
Linear issue about the bug you just found, and the agent picks the create
issue tool and gets back an issue number. No interpretation at the interface.
[click] So here is the contrast. Skills tell the agent how to think. MCP tells
it what it can safely operate. Soft guidance on one side, a hard contract on
the other.

---

<!-- 29. default — MCP Example: Figma ↔ Frontend — ~3 clicks -->

Here is the same pattern in a domain that is not tickets and repos. Design.
The agent talks to a Figma MCP server, pulls the design context and the
variable definitions for an approved frame, and turns them into a scoped spec
with acceptance criteria. Then it builds. Design intent becomes structured
input, not guessing from a screenshot.
[click] The handoff is schema-bound. Frames, components and tokens cross over
through contracts, not copy and paste, so there is less ambiguity and fewer
interpretation errors.
[click] And there is one source of truth. Designers approve in Figma, and
engineers execute from it. That is design governance, not just convenience.
Your Figma file was always structured data. MCP makes it legible to the agent.
[click] And it now goes both ways. The running UI can be sent back into
Figma for review. Jenny Wen argues Figma is still indispensable, because it is
the one place you can diverge across eight or ten directions without the
investment bias of having built one. Figma for exploration. Code for
execution. And a bridge between them.

---

<!-- 30. default — Harness Engineering — ~2 clicks -->

You have now seen the pieces. Context files, skills, MCP servers. This is the
machine they all plug into. Context goes in. The model reasons and decides. It
takes action: shell commands, tools, MCPs. Results get persisted and observed,
through tests and logs and screenshots, and feed back to the model. And the
cycle repeats. Read, think, act, observe, again.
[click] The model is one box. Everything else is the harness. An agent is a
model plus a harness. That includes specialised agents: one persona, a narrow
toolset, a single job, each one a markdown file you can version. One team
went from thirtieth to fifth on a coding benchmark changing only the harness.
Same model. The leverage is in the system around it.
[click] Which gives you the operating rule. When an agent fails, do not just
fix the output. Improve the harness, so the whole loop gets better. Mitchell
Hashimoto's version: the model is the engine. The harness is the car.

---

<!-- 31. default — Guardrails — ~3 clicks -->

The model in the middle of that machine is stochastic. So the next question is
reliability.
[click] Same prompt, different result. Every time. Reliability does not come
from a perfected prompt. It comes from the system around the model.
[click] Two rails keep the loop honest, and they are ones you already know.
Tests, and reviews. Hooks fire inside the loop: block a destructive command
before it runs, format the file after every write, reject the output if it
fails validation. Tests close the loop. The agent tries, fails, and retries on
its own, which is exactly what that bounce in the diagram is drawing. Simon
Willison says tests are free now, effectively free, and no longer remotely
optional.
[click] Name the pattern: deterministic gates around probabilistic agents.
Hard checkpoints that never hallucinate, wrapped around a model that always
might. And a gate can guard anything you care about.

---

<!-- 32. default — Set the Constraints Around Your Agents — ~3 clicks -->

Tests and reviews are two gates. Here is the full ring. Correctness, security,
performance, accessibility, maintainability, cost, back-pressure,
comprehensibility. Eight things you might care about, each one a check the
model cannot argue with.
[click] The agent works inside the ring. It produces more code than you can
read, and an attempt that fails a gate bounces straight back. You never see
it. Addy Osmani calls this the inner loop, and it is not yours anymore.
Investigate, implement, test, report.
[click] What clears every gate crosses out of the agent's loop and into yours.
Decide, verify, approve, own. That one you still hold. Only output that clears
every gate ships.
[click] So the boundary is evidence. Diffs, tests, logs, a short why. Not
trust, and not your reading speed. You moved from reading the output line by
line to designing the gates, and the gates decide what is good enough to ship.

---

<!-- 33. default — From Issue to Pull Request: One Command — ~3 clicks -->

That ring, composed into a pipeline. One command, a Linear issue ID, and out
the other end a pull request. It is an orchestrator, not a monolith: it
composes narrower skills and owns only the sequencing and the handoffs.
[click] It starts with a read-only preflight, then implements the issue on its
own branch.
[click] Then the quality loop, which is where most of the wall-clock goes and
none of my attention. Code review, convention review, refactor gates, all run
against the diff. Findings get fixed, the gates run again, and a remediation
budget stops it looping forever. It never widens the scope to make a finding
disappear. Then a fresh, full verification run. A gap is reported as a gap,
never claimed as a pass.
[click] Then the PR, and CI iterated until green. If it hits a blocker it
stops, with the evidence preserved. A failed gate is a stop, not a warning.
And so your loop shrinks to two moments: write the issue, review the PR.

---

<!-- 34. center — Temperature Check — Demo, Questions, Break? -->

That is my harness, and that is the halfway mark. In the room, this is where
I stop and let the audience choose: a live demo, open questions, or a short
break. Here, we will keep going. The second half is about the cost nobody puts
on the invoice.
