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

BRIDGE: "We've diagnosed the risks. Now let's name the constraint that remains."

DELIVERY:
- Energy: grounded, forward-looking
-->

---
layout: quote
class: quote-long
---

<div class="quote-progressive">
  <div class="quote-progressive-line">“It is amazing how much work it is to wrestle these agents to my will.</div>

  <v-click>
    <div class="quote-progressive-line">Don’t get me wrong, it’s crazy productive. But it’s also a lot of hard, focussed work.</div>
  </v-click>

  <v-click>
    <div class="quote-progressive-line">All my software engineering and problem solving skills are brought into play — even though I barely look at the code.”</div>
  </v-click>
</div>

Robert C. Martin

<!--
KEY POINTS:
- This is the hinge from warning to what endures, grounded in lived experience rather than an abstract claim
- Productivity and effort rise together: the work moves away from syntax and into steering, constraints, judgment, and problem-solving
- The engineering skills did not disappear when the code-writing did; agentic work reveals which skills were carrying the value all along
- Keep the section cross-functional even though Martin uses engineering language — product and design judgment move outward in the same way

BRIDGE: "That is the hinge: the compression of the implementation middle isn't making engineering less important. It is revealing what was always important. So where does that judgment get applied? Zoom out from the agent loop, and there are three."

DELIVERY:
- Let “wrestle” land before the first click — the room will recognize the feeling
- Stress “hard, focussed work,” then give the final clause its own beat: barely touching code does not mean barely engineering

SOURCE: Robert C. Martin (x.com/unclebobmartin/status/2090077791278489800)
-->

---
layout: default
class: text-center
narrator: hidden
---

# Three Loops. Three Clocks.

<!-- Concentric rather than stacked: the three loops are nested — the agent's
     cycle runs inside the developer's, which runs inside the market's — and
     rings carry the nesting and the cadence contrast in one shape. Also echoes
     the constraint ring from Section 3. -->
<ThreeLoopsDiagram size="lg" />

<v-click>

<p class="text-lg">The maintainer’s job moves outward: <strong>choose the work, set the bar, improve the loop.</strong></p>

</v-click>

<!--
KEY POINTS:
- Three nested loops, three cadences: minutes / tens of minutes to hours / hours to weeks
- Information flows inward: evidence → vision → spec → agent
- Maintainer works on the loop: choose the work, set the bar, improve the loop
- Ng: the durable human advantage is a "context advantage"
- Nadella: the durable asset is the institutional system that captures judgment

BRIDGE: "Notice what all three loops actually produce. Not just code — evidence."

ADDITIONAL POINTS:
- Widen the lens from the technical agent loop to the full product-development system
- The agentic loop turns a spec and optional evals into tested software
- The developer loop reviews the current product and updates the vision, design, flow, or spec
- The external loop gathers real-world evidence from friends, alpha users, production, or experiments
- The maintainer works on the loop, not only inside it: selecting what deserves work, defining quality, and strengthening the system from feedback
- Ng's "context advantage" is not merely taste: humans know things about users and operating context that the AI does not
- As agents take over more QA, engineers move into partial product-management responsibility
- Nadella's ownership test applies across all three loops: judgment captured in specs, evals, traces, and harnesses
- This delivers on the section divider's tagline: choose the work, set the bar, improve the loop

DELIVERY:
- Start at the centre ring: "This is the loop from the harness section and the demo — the agent can cycle every few minutes."
- Move outward: "A developer reviews less often and steers at a higher level. Real users close the slowest, outermost ring."
- The nesting is the argument the old stacked boxes couldn't make: each loop literally runs inside the next one's clock
- Land the context advantage: "So long as you know something about the user that the agent does not, you still have information to inject into the system."
- Optional enterprise translation: "The model is replaceable. The loop that captures feedback and turns it into reusable judgment is the compounding asset."

SOURCE: Andrew Ng, "Loop Engineering" (x.com/AndrewYNg/status/2071988145667928442)
SOURCE: Satya Nadella, "A frontier without an ecosystem is not stable" (x.com/satyanadella/status/2066182223213293753)
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
KEY POINTS:
- Payoff of the diagram: every loop is a learning loop, priced very differently
- Inner loop nearly free → outer loop is the binding constraint
- The test is cost of evidence, not choice of artifact
- Not anti-building: building IS often the cheapest experiment now
- Cheap learning is what earns the right to build

BRIDGE: "One artifact captures cheap learning better than anything else: the prototype."

ADDITIONAL POINTS:
- The author or maintainer is accountable for the whole learning system: selecting the work, defining the criteria, and improving the loop that produces the product — the maintainer's leverage is in the loops that decide what to build and whether it worked (trimmed from the slide, say it over the first click)
- The outer loop is the only one that produces real-world evidence
- Knapp's reframe backs this: sprints used to reduce uncertainty because building was expensive; when building trends to zero, the sprint is about deciding what is worth standing behind
- Careful framing on the second click: the cheapest-experiment point is exactly why Chen's "prototype is the new PRD" works
- The honest defense against the accumulation trap later in this section
- Sets up "a failure mode is just building yesteryear's software faster", two slides ahead — throughput without learning is just faster wrongness

DELIVERY:
- Land the headline cold, before either click. It should sound like a contradiction for a second.
- Optional verbal: "Every team I see optimizing AI adoption is optimizing the minutes loop. The minutes loop was never the problem."
- Optional verbal: "Agents made building cheap. They did not make being wrong cheap. That bill still arrives."

SOURCE: Andrew Ng, "Loop Engineering" (x.com/AndrewYNg/status/2071988145667928442)
SOURCE: Jake Knapp on design sprints, via Lenny Rachitsky (x.com/lennysan/status/2024300694891864304)
SOURCE: Andrew Chen (x.com/andrewchen/status/2025022470550684037)
-->

---
layout: statement
---

# The prototype is the new brief.

<v-click>

A concept you can click beats a concept you can read. **People react to artifacts, not descriptions.**

</v-click>
<v-click>

The first draft no longer needs a developer. A written idea becomes a working demo **in an afternoon, not a sprint.**

</v-click>
<v-click>

Most prototypes should die. **That's the point** — they are the cheapest way to find out you're wrong.

</v-click>

<!--
KEY POINTS:
- Chen's original phrasing: "the prototype is the new PRD" — credit him verbally
- The prototype is the cheap-evidence artifact everyone in the room can produce
- First draft is no longer gated on engineering
- The kill rate is the feature, not the waste
- A prototype is not a product — guardrails apply the moment it's real

BRIDGE: "And don't mistake cheaper learning for shrinking demand. The opposite is happening."

ADDITIONAL POINTS:
- Reworded to "brief" so it lands for non-product audiences
- Tools like Lovable, v0, Bolt, and Claude Artifacts turn a written concept into something clickable — name the tools verbally rather than on the slide, they date fast
- The division of labor that follows: domain people build the throwaway draft, developers harden only what earns survival — that is how prototyping protects development hours instead of consuming them
- A dead prototype is validated learning at the lowest possible price; a dead production feature is not
- Honesty note: the moment a prototype touches real data or real users, the guardrails story from Section 3 applies — this is exactly why cheap drafts don't make developers optional
- Connects back to "a failure mode is just building yesteryear's software faster": the prototype is how you avoid scoping the wrong thing at production quality

DELIVERY:
- For client-facing audiences: "Instead of describing a concept in a deck, hand the client something they can click. The reaction you get to an artifact is a different class of evidence than the reaction you get to a slide."
- Land the third click with a pause — "most prototypes should die" sounds like failure until the second half reframes it

SOURCE: Andrew Chen, "the prototype is the new PRD" (x.com/andrewchen/status/2025022470550684037)
SOURCE: Jake Knapp on design sprints, via Lenny Rachitsky (x.com/lennysan/status/2024300694891864304)
-->

---
narrator: hidden
---

# The Long Tail of Internal Software

Every team runs on invisible workflows: the report assembled by hand, the data moved by copy-paste, the checklist in someone's head.

<!-- The diagram reads $clicks without consuming any: the threshold drops with
     the second click, alongside the line that names the drop. The two markdown
     v-clicks define the click count. -->
<LongTailDiagram size="lg" />

<v-click>

Too small for a development project, too specific to buy off the shelf. **Below the build threshold — so it stayed manual.**

</v-click>
<v-click>

As production cost collapses, the threshold drops — **and demand expands.** The backlog nobody ever wrote down becomes buildable.

</v-click>

<!--
KEY POINTS:
- Jevons Paradox for knowledge work: efficiency expands demand, it doesn't shrink it
- Every org has an implicit build threshold and an unwritten backlog below it
- Agentic production drops the threshold by an order of magnitude
- Collina: the "software plumber"; Willison: bespoke beats generic
- Internal tools are the safest place to start

BRIDGE: "So if the work expands, the question becomes: what kind of work?"

ADDITIONAL POINTS:
- This slide now carries the demand-expansion economics too (its own statement slide was folded in here); the expansion lands first in the long tail, not in flagship products
- The diagram is the argument: every workflow ranked by payoff, a horizontal build threshold, and the head — the roadmap — is the only part that ever cleared it. The second click drops the threshold and shades the newly buildable region: the backlog nobody wrote down
- The implicit threshold is "not worth a developer's time"; the unwritten backlog is the first demand that becomes real
- Say the Jevons frame verbally over the drop: "An economist would call this Jevons Paradox. When coal engines got more efficient, we didn't use less coal — we used more. As software gets cheaper to produce, demand expands."
- Optional accounting parallel: adding machines, punch cards, ERP, spreadsheets did not eliminate accountants; cheaper accounting made more analysis, reporting, compliance and planning economically worthwhile
- Collina's "software plumber" wires bespoke small tools and glue for organizations that could never justify custom software before
- Willison's date-picker point is the same force one level down: when generation is cheap, bespoke beats generic — and internal tools are the most bespoke software there is
- Internal tools: known users, low blast radius, and the guardrails story from Section 3 applies at small scale
- Cross-role implication: the person who feels the manual workflow can now spec it directly — this sets up the knowledge-into-systems slide in Section 6
- Keep the individual pain caveat honest if asked: on average society gets richer, but averages hide real displacement — people lose jobs and transitions hurt before the new roles are visible

DELIVERY:
- Make it interactive if the room allows: "What do you assemble by hand every week? That list is the backlog nobody wrote down."
- Tailor the examples to the audience — reporting stitched across systems, asset handoff between tools, one-off client utilities, glue around the in-house product
- Don't oversell: the threshold drops, it doesn't vanish. Someone still owns, runs, and retires these tools — that's the accumulation warning coming later in this section

SOURCE: Dave Kellogg, "Why I'm Not Worried About Running Out of Work in the Age of AI" (kellblog.com, March 2026)
SOURCE: Matteo Collina, "Software Engineering Splits in Three" (adventures.nodeland.dev/archive/software-engineering-splits-in-three/)
SOURCE: Simon Willison, Pragmatic Summit Fireside Chat (simonwillison.net/2026/Mar/14/pragmatic-summit/)
SOURCE: Lenny Rachitsky summarizing Benedict Evans (x.com/lennysan/status/2061452384153505897)
-->

---
layout: statement
class: statement-wide
---

# A failure mode is just building yesteryear's software faster.

<v-click>

If AI only helps you ship the apps you'd have built five years ago, you've changed throughput — not strategy.

</v-click>
<v-click>

The question isn't “how much more can we build?” It's **what becomes worth building now.**

</v-click>

<!--
KEY POINTS:
- Answers the long-tail question: expansion is worthless pointed at yesterday's ideas
- Tan's "time traveler" argument: modern tools, old mental model
- Not bad productivity — productivity pointed at an obsolete idea of software
- Throughput without learning is just faster wrongness

BRIDGE: "Choosing what's worth building is frontier work — and there's a clean division of labor for it."

ADDITIONAL POINTS:
- The full second beat, trimmed from the slide: the question is also what should become a workflow, a skill, or nothing at all — say it over the reveal
- Tie this to Eriksson's strategy-layer argument: when feasibility changes, the product question changes too
- Completes the "cheapest way to learn" slide's argument

DELIVERY:
- Keep this short and pointed. The audience should feel the strategic question shift under the demand expansion they just accepted.
- Optional verbal: "The dangerous version of AI adoption is not failure. It is succeeding at the old game."

SOURCE: Garry Tan, "Markdown is the program now" (x.com/garrytan/status/2061454423034110372)
SOURCE: Martin Eriksson, "When Software Becomes Cheap, Strategy Becomes Everything" (thedecisionstack.com/when-software-becomes-cheap-strategy-becomes-everything/)
-->

---
layout: default
narrator: hidden
---

# Humans find new nodes. AI maps the edges.

<p class="text-lg opacity-80">Facts are nodes; the connections between them are edges. AI searches the known graph densely — new nodes come from humans wandering beyond it.</p>

<ProblemExplorationDiagram />

<v-click at="3">

Not AI replacing human exploration — **more human-chosen frontier points, each explored more deeply.** The human job is choosing which points deserve the machine's depth.

</v-click>

<!--
KEY POINTS:
- Facts as nodes; correlations as edges
- AI searches the known graph densely; humans widen it with new nodes
- Combined model: more human-chosen waypoints, dense AI exploration around each
- Human job: choosing which frontier points deserve the machine's depth

BRIDGE: "That makes the human work more specific. We become clarity merchants."

ADDITIONAL POINTS:
- Use this as the AI-positive narrative after the economic demand-expansion slide
- AI is powerful inside the known graph: it finds correlations and changes direction probabilistically
- The combined model is not "AI becomes self-directed breadth"
- The closing line now says the Clarity Merchants setup on-slide — it also answers the previous slide's "what becomes worth building now"

DELIVERY:
- The intro line defines the metaphor so the panels don't have to — read it once, then let the diagram build without narration
- Do not over-explain the visual; land the line "humans find new nodes, AI maps the edges"
- Optional verbal: "The best discoveries come when someone wanders outside the current point of view. AI is excellent once you give it a place to search."

SOURCE: Atmo (@atmoio), X post (x.com/atmoio/status/2061916783309692989)
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
KEY POINTS:
- "We're not bottlenecked by typing speed, we're bottlenecked by coherence"
- Integration scales with focus and understanding, not generation speed
- Doshi: tools commoditise; human judgment on top is the differentiator
- Eriksson: winners rethink at the Strategy layer, not the feature layer
- Cross-role: specs, context design, and quality judgment are not engineering-only

BRIDGE: "There's a sharper way to ask what all that clarity work adds up to: how much of the problem do you own?"

ADDITIONAL POINTS:
- The headline version of the last click, worth saying before the reveal: AI can generate five features in a day; integrating them into a system that makes sense is still your job
- Ground the abstract capability in the operating model the audience now understands
- Trimmed examples to say over the clicks: framing includes defining the MVP; "design the context" means an AGENTS.md; the hidden flaws are the wrong abstraction, the missing edge case, the architecture that won't scale
- This is where the new source adds value: the work compresses toward framing the problem, defining scope, and carrying intent across the full loop
- Doshi's 5-skill decomposition (empathy, simulation, strategic thinking, taste, creative execution) maps directly to these bullet points — use as verbal framework if audience asks "how do you build judgment?"
- Eriksson's "playing at the wrong stack level" concept maps directly here: most companies add AI at the feature layer (Opportunities). The clarity merchant work IS strategy-layer work.
- Eriksson: "What wasn't feasible before but now is? Product has always been good at managing feasibility risk. But that calculus has changed." — use this to reframe the first bullet about framing the problem
- Tan's closing thesis reinforces this slide: when intent can become tested reusable systems faster, the scarce resource becomes clarity, taste, and judgment

DELIVERY:
- Optional verbal when landing "Frame the problem and define the MVP": "Eriksson makes a useful distinction: most companies apply AI at the feature layer — bolt on a chatbot, speed up a workflow. The winners rethink at the strategy layer. That's what this list is. This is strategy-layer work."
- Optional verbal closer: "Garry Tan puts the same idea more sharply: the engineer who writes the least code is often the one building the most."

SOURCE: Sergio Rocks on the rise of the Product Engineer (x.com/SergioRocks/status/2029558863901389076)
SOURCE: Shreyas Doshi, "Why Product Sense Is the Only Product Skill That Will Matter in the AI Age" (shreyasdoshi.substack.com/p/why-product-sense-is-the-only-product)
SOURCE: Martin Eriksson, "When Software Becomes Cheap, Strategy Becomes Everything" (thedecisionstack.com/when-software-becomes-cheap-strategy-becomes-everything/)
SOURCE: Garry Tan, "Markdown is the program now" (x.com/garrytan/status/2061454423034110372)
SOURCE: Francedot, "Vibe Coding Paralysis" (x.com/francedot/status/2017858253439345092)
-->

---
layout: default
narrator: hidden
---

# How much of the problem do you own?

<AgencyLadderDiagram size="md" />

<v-click>

<div class="text-center">

Agents will run rungs 1–6 for you — and it's getting cheap fast. **Rung 7 never does.**

</div>

</v-click>

<!--
KEY POINTS:
- Osmani's ladder: Flag → Execute → Diagnose → Propose → Recommend → Resolve → Discern
- Agents now run rungs 1–6, and all of it is getting cheap, fast
- Rung 7, Discern, doesn't get cheap
- Good engineers live at rung 5 (Recommend) from day one; you earn 6 (Resolve)

BRIDGE: "And rung 7 at product scale? That's the next slide."

ADDITIONAL POINTS:
- "High agency is the art of knowing when to delegate, when to inspect, when to stop, and when to own the result of a process"
- Rung 7 is rare because it looks like doing nothing — that's why it's hard to grant and harder to trust. It means you priced the fix against everything else on the table and put your name on the tradeoff
- What doesn't get cheap: deciding it wasn't worth doing, deciding the evidence is good enough to ship, being the person who can explain why when it turns out you were wrong

DELIVERY:
- Walk the ladder bottom-up quickly; don't read every quote aloud
- Land the click: the tide rises over rungs 1–6, only Discern stays above water
- Optional verbal closer: "Agency was never about how much you can do. It's about how much of the problem you still own after it leaves your hands."

SOURCE: Addy Osmani, "The Agency Ladder" (linkedin.com/posts/addyosmani_ai-programming-softwareengineering-activity-7489205791766274048-H0sG)
-->

---
layout: statement
class: statement-wide
---

# Many products don't die from missing features. They die from accumulation.

<v-click>

Great PMs fall in love with the problem, not the roadmap — and have the guts to say: **This isn't solving it. This doesn't matter.**

</v-click>
<v-click>

PMs kill features. Designers simplify flows. Engineers remove abstractions. **Subtraction is a cross-discipline skill.**

<p class="mt-6 text-2xl font-semibold">Addition gets cheaper every quarter. Subtraction never does.</p>

</v-click>

<!--
KEY POINTS:
- Killing features IS rung 7 — discernment applied at product scale
- Addition gets cheaper; subtraction does not
- Works across functions: product scope, UX complexity, technical surface area
- thdxr: easy to prompt features into existence, so the bar for what ships drops
- Closing line is the section's takeaway: building is cheap, curating is hard

BRIDGE: "So what survives when execution gets cheap?"

ADDITIONAL POINTS:
- Trimmed beats to say verbally: "PMs and POs don't just ship features — they also kill them" (the old first click), and the full courage line includes "this adds complexity"
- The point is disciplined coherence, not maximal output
- thdxr in full: "It's pretty easy to prompt a new feature into existence so naturally the bar for what ships drops." and "There's 100x more value in fixing what we have and improving our process of how we build things"
- thdxr: "When iterating on a feature sometimes the original design is off... our willingness to refactor the original design drops. We should fight this — leave the code better than you found it."
- Willison (optional verbal): "Why would I use a date picker library when I could have Claude write me the exact one I want?" — when agents generate bespoke implementations, demand for generic libraries collapses. Tailwind's paid component library faced declining demand.
- Flip side (verbal): open source projects are also flooded with junk AI-generated contributions. Some maintainers have asked GitHub to disable pull requests entirely — historically the platform's core value proposition.
- The closing line on the final click is this section's equivalent of "velocity without understanding is not sustainable" from Section 4

DELIVERY:
- Optional verbal: "One practitioner nailed this: 'It's easy to prompt a new feature into existence, so the bar for what ships drops.' That's the accumulation trap. The bar should stay high."
- If you use the Willison line: "This cuts both ways. Demand for libraries drops, but the open source ecosystem is also flooded with low-quality AI contributions. Some maintainers are asking GitHub to disable PRs entirely. The irony: agents are built on open source, and they're simultaneously undermining it."
- Hold on the last line for 2-3 seconds before advancing — it is the single sentence the audience should carry into the close

SOURCE: "On Subtraction" (x.com/ryolu_/status/2015824853121477198)
SOURCE: thdxr (x.com/thdxr/status/2031377117007454421)
SOURCE: Simon Willison, Pragmatic Summit Fireside Chat (simonwillison.net/2026/Mar/14/pragmatic-summit/)
-->
