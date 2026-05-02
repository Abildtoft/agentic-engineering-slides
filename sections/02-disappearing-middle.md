---
layout: section
transition: section-shift
---

# The Compressing Middle

What's actually changing about how software gets made

<!--
KEY POINTS:
- Shift from "is AI real?" to "what exactly is changing in day-to-day work"
- Keep this section cross-functional: engineering, product, and design all move here

BRIDGE: "We've established the shift is real and accelerating. Now let's look at what's actually changing about the work itself."
-->

---

# The Middle of Software Work

<SlideImage src="/disappearing-middle.png" alt="The compressing middle of software work" />

<v-click>

"That middle absorbed most of the time, attention, and craft of software teams."

</v-click>
<v-click>

This is where juniors learn. This is where craft gets built.

</v-click>
<v-click>

## This is changing.

</v-click>

<!--
SOURCE: Karri Saarinen, Linear CEO (x.com/karrisaarinen/status/2007534281011155419)
SOURCE: Matteo Collina, "Software Engineering Splits in Three" (adventures.nodeland.dev/archive/software-engineering-splits-in-three/)

KEY POINTS:
- Define "the middle" concretely: translation, implementation, integration, and coordination work
- Clarify that the middle is compressing, not disappearing
- Seed the junior pipeline thread early — this pays off in Section 6's career advice
- Reframe seniority: less about throughput in the middle, more about intent and judgment
- Optional verbal: Malte Ubl (CTO, Vercel): "The cost of software production is trending towards zero" — sharp one-liner to land the compression claim

DELIVERY:
- Start with the historical baseline, then introduce compression
- Let "This is where juniors learn" land — plant the seed, don't elaborate yet
- Let "This is changing" land before moving on

BRIDGE: "If the middle was 80% of the effort, what happens when it drops to 20%?"
-->

---

# The Translation Layer Is Compressing

<SlideImage src="/pm-playbook-ai-exponential.jpg" alt="Before AI the PM workflow is a waterfall; with AI product, design, and engineering overlap" />

<v-click>

Issue tracking was built for a **handoff model**.

</v-click>
<v-click>

**What used to be a handoff becomes an overlap problem.**

</v-click>

<!--
SOURCE: George from prodmgmt.world (@nurijanian), "how Anthopic is changing the PM role" (March 20, 2026, x.com/nurijanian/status/2035117765749875015)
SOURCE: Cat Wu (@_catwu), "The PM playbook was built on an assumption..." (March 20, 2026, x.com/_catwu/status/2035104384007422347)
SOURCE: Karri Saarinen, "Linear Next" (linear.app/next, March 24, 2026)

KEY POINTS:
- Apply the same compression logic to product work with a cleaner operating-model visual
- Linear's phrasing sharpens the point: issue tracking was built for handoffs between roles
- What used to be a product-to-design-to-engineering waterfall increasingly becomes a shared overlap zone
- Translation-heavy work shrinks; process design, decision rights, and coordination matter more
- This creates both opportunity and pressure for Product Managers, Product Owners, designers, and engineers
- Use Linear here as a category signal, not neutral proof

DELIVERY:
- Address product/UX explicitly so they feel included in the thesis
- Call out George's line verbally: "we always wanted it to be a Venn diagram, but the reality was almost always a waterfall"
- Keep tone candid, not defensive

BRIDGE: "And Linear's own numbers suggest that this is already changing inside the issue system itself."
-->

---
layout: fact
---

<BigNumber
  value="5x"
  label="growth in agent-completed work across Linear workspaces over the prior 3 months"
  sublabel="Agents also authored nearly 25% of new issues (company-reported, March 24, 2026)"
/>

<v-click>

<p class="mt-8 text-xl">Agents are not just completing work. They are starting to shape the work entering the system.</p>

</v-click>

<!--
SOURCE: Karri Saarinen, "Linear Next" (linear.app/next, March 24, 2026)

KEY POINTS:
- Company-reported metrics from Linear's March 24, 2026 launch page
- Use them as ecosystem signal: one leading issue tracker now sees agents inside the issue system itself
- Optional verbal detail: coding agents are installed in 75%+ of Linear enterprise workspaces
- Important nuance: this is not independent market research; it is a directional signal from a category leader
- The strategic implication matters more than the raw numbers: issue systems are shifting from backlog management toward context plus execution infrastructure

DELIVERY:
- Let "5x" land first
- Then emphasize the stronger organizational signal: agents are not only closing work, they are helping define and shape the work entering the system

BRIDGE: "And for PMs, that compression shows up as a much shorter path from idea to first draft."
-->

---
layout: quote
class: quote-long
---

<div class="quote-progressive">
  <div class="quote-progressive-line">"A PM with a good idea can now get to a first draft faster than ever.</div>
  <v-click>
    <div class="quote-progressive-line">They can visualize concepts, test directions, and move quickly."</div>
  </v-click>
</div>

<div v-after class="mt-6 text-xl font-normal not-italic">
  Duolingo Chief Product Officer, via Aakash Gupta
</div>

<v-click>

## The distance between idea and artifact has shrunk.

</v-click>

<!--
SOURCE: Aakash Gupta, quoting Duolingo's Chief Product Officer (x.com/aakashgupta/status/2034356648764948686, March 18, 2026)

KEY POINTS:
- This is the product-side lived experience of the same compression
- PM leverage moves closer to first-draft creation, experimentation, and direction-setting
- Faster artifact creation does not reduce the need for product judgment; it increases the premium on it
- Strong verbal line: "The role becomes more independent and more creative because the distance from idea to artifact collapses"

DELIVERY:
- Let the first sentence land before revealing the second
- Land the final line as the synthesis; that is the transferable idea
- Optional verbal line: "If you can show instead of describe, the role changes."

BRIDGE: "Once the idea-to-artifact gap collapses, precision of intent becomes the leverage point."
-->

---
layout: quote
---

<QuotePair
  first="Talk is cheap. Show me the code."
  firstAttribution="Linus Torvalds, 2000"
  second="For the first time ever, good talk is exponentially more valuable than good code."
  secondAttribution="Nadh, 2025"
/>

<!--
SOURCE: Nadh, "Code is Cheap. Show me the talk" (nadh.in/blog/code-is-cheap/)

KEY POINTS:
- Use this as a cultural inversion slide
- "Talk" here means precise problem definition, not vague ideation
- Connect the inversion to all disciplines, not just engineering

DELIVERY:
- Let the Torvalds quote land first, then reveal the inversion
- Briefly explain why this is not anti-code; it is pro-clarity

BRIDGE: "And once implementation complexity stops dictating team boundaries, those role walls start to compress too."
-->

---
layout: statement
---

The walls between design, product, and engineering were built from implementation complexity.

<v-click>

## As that complexity compresses — so do the walls.

</v-click>

<!--
SOURCE: Carly Ayres, "Designers! Designers! Designers!" (carly.substack.com/p/designers-designers-designers)

KEY POINTS:
- Synthesis slide: role walls were partly a response to implementation friction
- As friction drops, collaboration surfaces increase and handoff surfaces shrink
- Distinct disciplines remain, but their operating model converges around shared judgment
- Ayres provides market evidence: layoffs eliminated production design roles while demand surged for strategic hybrids who ship end-to-end — the walls are compressing because the market is pricing them out

DELIVERY:
- Let the statement land — this should feel like a reveal, not an argument
- Pause before the next slide — let the room process the implication

BRIDGE: "Jenny Wen describes what that compression looks like from inside Anthropic."
-->

---
layout: quote
---

<QuotePair
  first="Engineers spin up seven coding agents and ship a working version — before a designer finishes exploring options. The classic discover-diverge-converge loop is breaking down."
  firstAttribution="Jenny Wen, Design Lead at Anthropic — via Lenny Rachitsky"
  second="The prototype is the new PRD. If your team needs a 20-page product strategy doc, you're already behind someone with a weekend prototype."
  secondAttribution="Andrew Chen"
/>

<!--
SOURCE: Jenny Wen (Design Lead, Anthropic; formerly Design Director, Notion), via Lenny Rachitsky (x.com/lennysan/status/2028484407108194507)
SOURCE: Andrew Chen, a16z general partner (x.com/andrewchen/status/2025022470550684037)

KEY POINTS:
- Jenny Wen: the compression made visceral — not a theoretical claim but a scene from a design leader at the company building the agents
- The discover-diverge-converge model assumed implementation was the bottleneck; when implementation compresses, the design process must adapt too
- Important: this is not anti-design — it signals that the operating model changes for everyone
- Andrew Chen: the artifact shift — from document-first to experience-first validation
- Together these two quotes show the same compression from different angles: design process and product process both change
- Boris offers the operating proof point: on the Claude Code team, PRDs gave way to many fast prototypes before shipping

DELIVERY:
- Let the Jenny Wen quote land first. The seven-agents image is vivid — the room will feel it.
- Then reveal Andrew Chen — the audience sees the same compression hitting product work too.
- If there are designers in the room, make eye contact. This is for them.
- Verbal addition: "This is not just engineering getting faster. This is the entire rhythm of collaboration shifting."

BRIDGE: "So if implementation stops being the bottleneck, what skill survives across all three disciplines?"
-->

---

# One Surviving Skill Set

<v-click>

**Design** — from creating artifacts to articulating intent and judging quality

</v-click>
<v-click>

**Product** — from translating requirements to creating clarity, setting priorities, and aligning execution

</v-click>
<v-click>

**Engineering** — from writing code to designing systems and verifying correctness

</v-click>
<v-click>

## Three job titles. One job: turning ambiguity into clarity.

</v-click>

<!--
SOURCE: Sergio Rocks on the rise of the Product Engineer (x.com/SergioRocks/status/2029558863901389076)
SOURCE: PostHog, "WTF does a product manager do? (and why engineers should care)" (x.com/posthog/status/2032169174496076171)
SOURCE: Carly Ayres, "Designers! Designers! Designers!" (carly.substack.com/p/designers-designers-designers)

KEY POINTS:
- Make one pass per role and keep each description concrete
- The throughline is identical across roles: reduce ambiguity, raise judgment quality
- Important distinction: convergence of capabilities is not collapse of professions
- Sergio's framing is useful here as a market signal: more teams now expect end-to-end ownership, and some will explicitly call that convergence point the Product Engineer
- PostHog makes the overlap operational: context, feedback loops, and actionable communication become engineering-adjacent skills too
- Ayres calls this the "Super IC" — companies now demand senior ICs who set direction, make autonomous decisions, ship to production, and measure results
- Product line translation: "A great PM creates clarity, sets priorities, and aligns the team to execute."
- Optional verbal for the Design reveal: "Preston Attebery nailed this: 'Once everyone can make an app, we will remember that the hard part about apps isn't making the app.'"

DELIVERY:
- Reveal each role one at a time, let the pattern emerge
- Land the final line as the handoff into section 3's practical model
- After "turning ambiguity into clarity" lands, optional verbal: "It's amazing how much productive AI makes you if you're able to ask the right questions. That's the clarity we're talking about."
- Optional verbal clarification: "I don't mean every company will standardize on that title. I mean this is the overlap zone the market is rewarding."
- When revealing Design: Jenny Wen frames the new design work as two modes — (a) supporting execution: consulting on in-flight work, giving feedback, polishing in code; (b) setting short-range vision: 3–6 month direction, not multi-year roadmaps
- Verbal expansion: "Articulating intent means two things now — shaping execution as it happens, and setting near-term direction. Not yearly roadmaps, not pixel-perfect comps. Three to six months of clarity."
- Eriksson's radiology example is useful color here: as AI expands what's feasible, domain knowledge and strategy become more central, not less

BRIDGE: "Ambiguity into clarity. But where does the constraint actually go?"
-->

---

# The Product Engineer

<v-click>

Sits at the overlap of **design judgment, product thinking, and engineering execution.**

</v-click>
<v-click>

Frames the problem, defines the MVP, shapes the system, ships the code, and measures the outcome.

</v-click>
<v-click>

**Less handoff. Faster learning. More end-to-end ownership.**

</v-click>

<!--
SOURCE: Sergio Rocks on the rise of the Product Engineer (x.com/SergioRocks/status/2029558863901389076)
SOURCE: PostHog, "WTF does a product manager do? (and why engineers should care)" (x.com/posthog/status/2032169174496076171)

KEY POINTS:
- This slide names the convergence point explicitly after the previous slide establishes that the three disciplines are moving toward the same core work
- Keep the framing concrete: this is about overlapping capabilities and end-to-end ownership, not a mandate that every org adopt one new title
- The three lines should map clearly to the audience's mental model: design judgment, product thinking, engineering execution
- PostHog provides the practical reason this overlap matters: deciding what to build is becoming more constrained than building it

DELIVERY:
- Open with: "Some teams are starting to give that overlap a name."
- Emphasize the sequence: frame, define, shape, ship, measure
- Land the final line as an operating-model shift, not a job-title fad

BRIDGE: "And once you see that convergence, the bottleneck shift becomes easier to understand."
-->

---

# The Bottleneck Cascade

<v-click>

When weaving sped up, **yarn became the constraint.** When spinning caught up, **fibre became the constraint.** When fibre improved, **cotton had to be automated.**

</v-click>
<v-click>

Every time a bottleneck is removed, the constraint moves upstream — **not away.**

</v-click>
<v-click>

The implementation middle is compressing. The constraint is moving to **clarity, judgment, and system design.** That's the new stack.

</v-click>

<!--

SOURCE: Armin Ronacher, "The Final Bottleneck" (lucumr.pocoo.org/2026/2/13/the-final-bottleneck/)
SOURCE: Matteo Collina, "Software Engineering Splits in Three" (adventures.nodeland.dev/archive/software-engineering-splits-in-three/)
SOURCE: Martin Eriksson, "When Software Becomes Cheap, Strategy Becomes Everything" (thedecisionstack.com/when-software-becomes-cheap-strategy-becomes-everything/)

KEY POINTS:
- This gives the audience a durable mental model to carry through the rest of the talk
- The cascade pattern explains WHY clarity becomes the bottleneck — it's not aspirational, it's mechanical
- Collina's three-tier framework is the cascade applied per market segment: the constraint lands differently in tech companies (platform engineering), enterprises (fractional expertise), and mid-market (business understanding)
- We'll return to this frame in the wrap-up: "the bottleneck ultimately isn't technology — it's expert knowledge extraction"
- The radiology case study is the modern proof of the same Jevons Paradox pattern: Geoffrey Hinton predicted AI would eliminate radiologists within five years. Instead, radiologist salaries rose 44% ($525K avg), Mayo Clinic doubled its staff, AI mammography detects 29% more cancers while reducing workload by 44%, and over 1,000 FDA-cleared AI radiology devices now exist. "AI didn't replace radiologists. It made imaging so much faster and cheaper that we started doing vastly more of it."

DELIVERY:
- The weaving/yarn/fibre sequence should feel like a story, not a list
- Pause after "not away" — this is the insight that makes the rest of the talk feel inevitable
- Optional verbal addition after the weaving story: "Same thing happened in radiology. Geoffrey Hinton predicted AI would replace radiologists in five years. Instead, salaries went up 44%, Mayo Clinic doubled its staff, and AI mammography is catching 29% more cancers. When costs collapse, demand explodes. The constraint moved upstream — to the humans interpreting the results."

BRIDGE: "Now let me show you the toolkit for the new bottleneck: context, specs, and tooling."
-->
