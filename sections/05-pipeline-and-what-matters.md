---
layout: section
transition: section-shift
---

# What Matters

Choose the work. Set the bar. Improve the loop.

<!--

KEY POINTS:
- Shift from diagnosis to what endures
- Central question: what capabilities become more valuable when execution cost collapses?
- The three-loop model lands in this section and delivers on the divider tagline: select the work, define quality, and improve the system
- Use this section as a short bridge into the close, not a second body section

DELIVERY:
- Energy: grounded, forward-looking

BRIDGE: "We've diagnosed the risks. Now let's name the constraint that remains."
-->

---
layout: statement
class: statement-wide
---

# The compression of the implementation middle isn't making engineering less important — it's revealing what was always important.

<!--
SOURCE: Addy Osmani, "The Best Engineers Never Just Wrote Code" (x.com/addyosmani/status/2007899127925854536)

KEY POINTS:
- This is the hinge from warning to what endures
- "Revealing" is the key word — these are not new skills, they were always underneath the implementation work
- Keep the section cross-functional even though the source is engineering phrasing

BRIDGE: "So where does that judgment get applied? Zoom out from the agent loop, and there are three."
-->

---
layout: default
class: text-center
---

# Three Loops. Three Clocks.

<MermaidDiagram :code="`graph TB
  X[External feedback · hours to weeks<br/>Release → Observe users → Update direction ↺]
  D[Developer feedback · tens of minutes to hours<br/>Product vision → Review product → Refine spec + steer ↺]
  A[Agentic coding · minutes<br/>Spec + evals → Build → Test + inspect ↺]
  X -.-> D
  D -.-> A
`" size="md" />

<v-click>

<p class="text-lg">The maintainer’s job moves outward: <strong>choose the work, set the bar, improve the loop.</strong></p>

</v-click>

<!--
SOURCE: Andrew Ng, "Loop Engineering" (x.com/AndrewYNg/status/2071988145667928442)
SOURCE: Satya Nadella, "A frontier without an ecosystem is not stable" (x.com/satyanadella/status/2066182223213293753)

KEY POINTS:
- Widen the lens from the technical agent loop to the full product-development system
- The three loops operate at different cadences: minutes, tens of minutes to hours, and hours to weeks
- The agentic loop turns a spec and optional evals into tested software
- The developer loop reviews the current product and updates the vision, design, flow, or spec
- The external loop gathers real-world evidence from friends, alpha users, production, or experiments
- Information flows inward: external evidence shapes product vision; developer judgment shapes the spec; the spec drives the agent
- The maintainer works on the loop, not only inside it: selecting what deserves work, defining quality, and strengthening the system from feedback
- Ng calls the durable human advantage a "context advantage," not merely taste: humans know things about users and operating context that the AI does not
- As agents take over more QA, engineers move into partial product-management responsibility
- Nadella's ownership test still applies across all three loops: the durable asset is the institutional system that captures judgment in specs, evals, traces, and harnesses
- This delivers on the section divider's tagline: choose the work, set the bar, improve the loop

DELIVERY:
- Start at the bottom: "This is the loop from the harness section and the demo — the agent can cycle every few minutes."
- Move upward: "A developer reviews less often and steers at a higher level. Real users close the slowest, outer loop."
- Land the context advantage: "So long as you know something about the user that the agent does not, you still have information to inject into the system."
- Optional enterprise translation: "The model is replaceable. The loop that captures feedback and turns it into reusable judgment is the compounding asset."

BRIDGE: "Notice what all three loops actually produce. Not just code — evidence."
-->

---
layout: statement
---

# The fastest way to build is to find the cheapest way to learn.

<v-click>

Accelerating the inner loop just gets you to the wrong answer sooner.

</v-click>
<v-click>

**What is the cheapest thing that would change our mind?** Often it isn't code — a prototype, a landing page, five conversations.

</v-click>

<!--
SOURCE: Andrew Ng, "Loop Engineering" (x.com/AndrewYNg/status/2071988145667928442)
SOURCE: Jake Knapp on design sprints, via Lenny Rachitsky (x.com/lennysan/status/2024300694891864304)
SOURCE: Andrew Chen (x.com/andrewchen/status/2025022470550684037)

KEY POINTS:
- This is the payoff of the three-loop diagram: every loop is a learning loop, and they are priced very differently
- Agentic speed makes the inner loop nearly free, which makes the outer loop the binding constraint — and the only one that produces real-world evidence
- The author or maintainer is accountable for the whole learning system: selecting the work, defining the criteria, and improving the loop that produces the product — the maintainer's leverage is in the loops that decide what to build and whether it worked (trimmed from the slide, say it over the first click)
- Knapp's reframe backs this: sprints used to reduce uncertainty because building was expensive; when building trends to zero, the sprint is about deciding what is worth standing behind
- Careful framing on the second click: this is not anti-building. Building IS often the cheapest experiment now — that is exactly why Chen's "prototype is the new PRD" works. The test is cost of evidence, not choice of artifact.
- This is also the honest defense against the accumulation trap later in this section: cheap learning is what earns the right to build
- Sets up "the failure mode is building yesterday's software faster", two slides ahead — throughput without learning is just faster wrongness

DELIVERY:
- Land the headline cold, before either click. It should sound like a contradiction for a second.
- Optional verbal: "Every team I see optimizing AI adoption is optimizing the minutes loop. The minutes loop was never the problem."
- Optional verbal: "Agents made building cheap. They did not make being wrong cheap. That bill still arrives."

BRIDGE: "And don't mistake cheaper learning for shrinking demand. The opposite is happening."
-->

---
layout: statement
---

# The agentic era multiplies demand for software.

<v-click>

Software has been the force multiplier behind nearly every business transformation of the last two decades.

</v-click>
<v-click>

The constraint was the cost and time of producing and managing it. **That constraint is collapsing.**

</v-click>
<v-click>

As the cost of producing software collapses, **demand expands.**

</v-click>

<!--
SOURCE: Dave Kellogg, "Why I'm Not Worried About Running Out of Work in the Age of AI" (kellblog.com, March 2026)
SOURCE: Lenny Rachitsky summarizing Benedict Evans (x.com/lennysan/status/2061452384153505897)

KEY POINTS:
- Jevons Paradox applied to knowledge work: efficiency expands demand, it doesn't shrink it
- Software has already been the force multiplier behind business transformation; agentic coding changes the production constraint, not the appetite for software
- The claim is not "everyone builds the same things faster" — it is "more software becomes economically worth building and managing"
- Accounting is a useful historical parallel: adding machines, punch cards, mainframes, databases, ERP, cloud accounting, spreadsheets, and PCs did not eliminate accountants; cheaper accounting made more analysis, reporting, compliance, planning, and control economically worthwhile
- Concrete example: after decades of BI tooling advancement, organizations still lack sufficient data-informed decision-making — the tools got better, the work expanded into questions that weren't even askable before
- Management itself is proof of abundance: prioritization and focus exist BECAUSE the space of possible work is unlimited
- This reframes the anxiety: the question is not "will there be work?" but "will we have the judgment to choose the RIGHT work?"

DELIVERY:
- Let this land as the economic counterweight to displacement anxiety
- Optional verbal: "An economist would call this Jevons Paradox. When coal engines got more efficient, we didn't use less coal — we used more. The same thing is happening with code. As software gets cheaper to produce, demand for software expands."
- Optional accounting version: "Accounting has been automated for a century. The profession did not vanish; the surface area expanded because the ROI of measuring, reporting, and planning changed."
- Keep the individual pain caveat honest: on average society gets richer, but the averages hide real displacement. People lose jobs, towns hollow out, and transitions hurt before the new roles are visible.

BRIDGE: "So if the work expands, the question becomes: what kind of work?"
-->

---
layout: statement
class: statement-wide
---

# The failure mode is building yesterday's software faster.

<v-click>

If AI only helps you ship the apps you'd have built five years ago, you've changed throughput — not strategy.

</v-click>
<v-click>

The question isn't “how much more can we build?” It's **what becomes worth building now.**

</v-click>

<!--
SOURCE: Garry Tan, "Markdown is the program now" (x.com/garrytan/status/2061454423034110372)
SOURCE: Martin Eriksson, "When Software Becomes Cheap, Strategy Becomes Everything" (thedecisionstack.com/when-software-becomes-cheap-strategy-becomes-everything/)

KEY POINTS:
- This answers the demand slide's closing question directly: the work expands, but the expansion is worthless if it's pointed at yesterday's ideas
- This is the explicit version of the "time traveler" argument from Tan's post: modern tools, old mental model
- The failure mode is not bad productivity; it is productivity pointed at an obsolete idea of what software should be
- The full second beat, trimmed from the slide: the question is also what should become a workflow, a skill, or nothing at all — say it over the reveal
- Tie this to Eriksson's strategy-layer argument: when feasibility changes, the product question changes too
- Completes the "cheapest way to learn" slide's argument: throughput without learning is just faster wrongness

DELIVERY:
- Keep this short and pointed. The audience should feel the strategic question shift under the demand expansion they just accepted.
- Optional verbal: "The dangerous version of AI adoption is not failure. It is succeeding at the old game."

BRIDGE: "Choosing what's worth building is frontier work — and there's a clean division of labor for it."
-->

---
layout: default
---

# Humans find new nodes. AI maps the edges.

<p class="text-lg opacity-80">Facts are nodes; the connections between them are edges. AI searches the known graph densely — new nodes come from humans wandering beyond it.</p>

<ProblemExplorationDiagram />

<v-click at="3">

Not AI replacing human exploration — **more human-chosen frontier points, each explored more deeply.** The human job is choosing which points deserve the machine's depth.

</v-click>

<!--
SOURCE: Atmo (@atmoio), X post (x.com/atmoio/status/2061916783309692989)

KEY POINTS:
- Use this as the AI-positive narrative after the economic demand-expansion slide
- Facts as nodes; correlations as edges
- AI is powerful inside the known graph: it searches densely, finds correlations, and changes direction probabilistically
- Humans and science widen the graph by looking outward and finding new nodes
- The combined model is not "AI becomes self-directed breadth" — it is more human-chosen waypoints with dense AI exploration around each one
- The closing line now says the Clarity Merchants setup on-slide: the human job is choosing which frontier points deserve the machine's depth — it also answers the previous slide's "what becomes worth building now"

DELIVERY:
- The intro line defines the metaphor so the panels don't have to — read it once, then let the diagram build without narration
- Do not over-explain the visual; land the line "humans find new nodes, AI maps the edges"
- Optional verbal: "The best discoveries come when someone wanders outside the current point of view. AI is excellent once you give it a place to search."

BRIDGE: "That makes the human work more specific. We become clarity merchants."
-->

---
layout: default
class: dim-prior v-center
---

# Clarity Merchants

<v-click>

**Frame the problem** before the agent writes a line. **Design the context** so the same mistake can't happen three times.

</v-click>
<v-click>

**Spot the flaw** clean code is hiding. **Articulate why** an interaction is wrong — the principle, not the vibe.

</v-click>
<v-click>

The work hasn't changed. The boundaries have. Focus, finishing, and judgment **scale with you, not with AI speed.**

</v-click>

<!--
SOURCE: Sergio Rocks on the rise of the Product Engineer (x.com/SergioRocks/status/2029558863901389076)
SOURCE: Shreyas Doshi, "Why Product Sense Is the Only Product Skill That Will Matter in the AI Age" (shreyasdoshi.substack.com/p/why-product-sense-is-the-only-product)
SOURCE: Martin Eriksson, "When Software Becomes Cheap, Strategy Becomes Everything" (thedecisionstack.com/when-software-becomes-cheap-strategy-becomes-everything/)
SOURCE: Garry Tan, "Markdown is the program now" (x.com/garrytan/status/2061454423034110372)
SOURCE: Francedot, "Vibe Coding Paralysis" (x.com/francedot/status/2017858253439345092)

KEY POINTS:
- The headline version of the last click, worth saying before the reveal: "we're not bottlenecked by typing speed, we're bottlenecked by coherence." AI can generate five features in a day; integrating them into a system that makes sense is still your job. Integration does not scale with generation speed — it scales with focus and understanding
- Doshi's chain reinforces it: AI tools commoditise → tools never provide lasting advantage → human judgment on top of AI output is the differentiator
- Ground the abstract capability in the operating model the audience now understands
- Trimmed examples to say over the clicks: framing includes defining the MVP; "design the context" means an AGENTS.md; the hidden flaws are the wrong abstraction, the missing edge case, the architecture that won't scale
- This is where the new source adds value: the work compresses toward framing the problem, defining scope, and carrying intent across the full loop
- Doshi's 5-skill decomposition (empathy, simulation, strategic thinking, taste, creative execution) maps directly to these bullet points — use as verbal framework if audience asks "how do you build judgment?"
- Keep it explicitly cross-role: specs, context design, and quality judgment are not engineering-only traits
- Eriksson's "playing at the wrong stack level" concept maps directly here: most companies add AI at the feature layer (Opportunities); winners rethink at the Strategy layer. The clarity merchant work IS strategy-layer work.
- Eriksson: "What wasn't feasible before but now is? Product has always been good at managing feasibility risk. But that calculus has changed." — use this to reframe the first bullet about framing the problem
- Tan's closing thesis reinforces this slide: when intent can become tested reusable systems faster, the scarce resource becomes clarity, taste, and judgment

DELIVERY:
- Optional verbal when landing "Frame the problem and define the MVP": "Eriksson makes a useful distinction: most companies apply AI at the feature layer — bolt on a chatbot, speed up a workflow. The winners rethink at the strategy layer. That's what this list is. This is strategy-layer work."
- Optional verbal closer: "Garry Tan puts the same idea more sharply: the engineer who writes the least code is often the one building the most."

BRIDGE: "There's a sharper way to ask what all that clarity work adds up to: how much of the problem do you own?"
-->

---
layout: default
---

# How much of the problem do you own?

<AgencyLadderDiagram size="md" />

<v-click>

<div class="text-center">

Agents will run rungs 1–6 for you — and it's getting cheap fast. **Rung 7 never does.**

</div>

</v-click>

<!--
SOURCE: Addy Osmani, "The Agency Ladder" (linkedin.com/posts/addyosmani_ai-programming-softwareengineering-activity-7489205791766274048-H0sG)

KEY POINTS:
- Osmani's ladder of agency, adapted: Flag → Execute → Diagnose → Propose → Recommend → Resolve → Discern
- "High agency is the art of knowing when to delegate, when to inspect, when to stop, and when to own the result of a process"
- Good engineers live at rung 5 (Recommend) from day one; you earn your way up to 6 (Resolve)
- Rung 7, Discern, is rare because it looks like doing nothing — that's why it's hard to grant and harder to trust. It means you priced the fix against everything else on the table and put your name on the tradeoff
- Agents now run rungs 1–6: flag, diagnose, propose, recommend, resolve. All of it is getting cheap, fast
- What doesn't get cheap: deciding it wasn't worth doing, deciding the evidence is good enough to ship, being the person who can explain why when it turns out you were wrong

DELIVERY:
- Walk the ladder bottom-up quickly; don't read every quote aloud
- Land the click: the tide rises over rungs 1–6, only Discern stays above water
- Optional verbal closer: "Agency was never about how much you can do. It's about how much of the problem you still own after it leaves your hands."

BRIDGE: "And rung 7 at product scale? That's the next slide."
-->

---
layout: statement
class: statement-wide
---

# Most products don't die from missing features. They die from accumulation.

<v-click>

Great PMs fall in love with the problem, not the roadmap — and have the guts to say: **This isn't solving it. This doesn't matter.**

</v-click>
<v-click>

PMs kill features. Designers simplify flows. Engineers remove abstractions. **Subtraction is a cross-discipline skill.**

<p class="mt-6 text-2xl font-semibold">Addition gets cheaper every quarter. Subtraction never does.</p>

</v-click>

<!--
SOURCE: "On Subtraction" (x.com/ryolu_/status/2015824853121477198)
SOURCE: thdxr (x.com/thdxr/status/2031377117007454421)
SOURCE: Simon Willison, Pragmatic Summit Fireside Chat (simonwillison.net/2026/Mar/14/pragmatic-summit/)

KEY POINTS:
- Callback to the Agency Ladder: killing features IS rung 7 — discernment applied at product scale
- Trimmed beats to say verbally: "PMs and POs don't just ship features — they also kill them" (the old first click), and the full courage line includes "this adds complexity"
- Addition gets cheaper; subtraction does not
- This works across functions: product scope, UX complexity, technical surface area
- The point is disciplined coherence, not maximal output
- thdxr: "It's pretty easy to prompt a new feature into existence so naturally the bar for what ships drops." and "There's 100x more value in fixing what we have and improving our process of how we build things"
- thdxr: "When iterating on a feature sometimes the original design is off... our willingness to refactor the original design drops. We should fight this — leave the code better than you found it."
- Willison (optional verbal): "Why would I use a date picker library when I could have Claude write me the exact one I want?" — when agents generate bespoke implementations, demand for generic libraries collapses. Tailwind's paid component library faced declining demand.
- Flip side (verbal): open source projects are also flooded with junk AI-generated contributions. Some maintainers have asked GitHub to disable pull requests entirely — historically the platform's core value proposition.

- The closing line on the final click is the section's takeaway: building is cheap, curating what to keep is the hard part. It is this section's equivalent of "velocity without understanding is not sustainable" from Section 4

DELIVERY:
- Optional verbal: "One practitioner nailed this: 'It's easy to prompt a new feature into existence, so the bar for what ships drops.' That's the accumulation trap. The bar should stay high."
- If you use the Willison line: "This cuts both ways. Demand for libraries drops, but the open source ecosystem is also flooded with low-quality AI contributions. Some maintainers are asking GitHub to disable PRs entirely. The irony: agents are built on open source, and they're simultaneously undermining it."
- Hold on the last line for 2-3 seconds before advancing — it is the single sentence the audience should carry into the close

BRIDGE: "So what survives when execution gets cheap?"
-->
