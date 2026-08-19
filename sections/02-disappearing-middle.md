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

<SoftwareMiddleDiagram size="lg" />

<v-click>

> “That middle absorbed most of the time, attention, and craft of software teams.”
>
> Karri Saarinen, Linear CEO

</v-click>
<v-click>

This is where juniors learn. This is where craft gets built.

</v-click>
<v-click>

## This is changing.

</v-click>

<style>
/* The full-height diagram plus the blockquote's standard 1.75rem margins run
   the last reveal 31px past the slide frame (measured); the quote convention
   stays, its breathing room compresses on this slide only. */
.slidev-layout blockquote {
  margin-block: 0.8rem;
}
.slidev-layout h2 {
  margin-top: 0.4rem;
}
</style>

<!--
KEY POINTS:
- Define "the middle": translation, implementation, integration, and coordination work
- The middle is compressing, not disappearing
- Seed the junior pipeline thread early — pays off in Section 6's career advice
- Reframe seniority: less middle throughput, more intent and judgment
- Say the product/design half out loud — this is not engineering-only

BRIDGE: "If the middle was 80% of the effort, what happens when it drops to 20%? For anyone whose job was producing the artifact, that question gets uncomfortable fast."

ADDITIONAL POINTS:
- Optional verbal: Malte Ubl (CTO, Vercel): "The cost of software production is trending towards zero" — sharp one-liner to land the compression claim
- The product/design half in full: the same compression hits the translation layer between roles. Issue tracking was built for a handoff model, and what used to be a handoff becomes an overlap problem — a PM-to-design-to-engineering waterfall turning into a shared zone. Translation-heavy work shrinks; process design, decision rights, and coordination matter more
- George's line is the sharpest version: "we always wanted it to be a Venn diagram, but the reality was almost always a waterfall"
- Optional verbal (Linear's own numbers, company-reported, 24 March 2026): agent-completed work grew 5x across Linear workspaces in three months, agents authored nearly 25% of new issues, and coding agents are installed in 75%+ of Linear enterprise workspaces. Agents are not just completing work — they are shaping the work entering the system. Use Linear as a category signal, not neutral proof

DELIVERY:
- Start with the historical baseline, then introduce compression
- Let "This is where juniors learn" land — plant the seed, don't elaborate yet
- Let "This is changing" land before moving on
- Address product/UX explicitly here; keep the tone candid, not defensive

SOURCE: Karri Saarinen, Linear CEO (x.com/karrisaarinen/status/2007534281011155419)
SOURCE: Matteo Collina, "Software Engineering Splits in Three" (adventures.nodeland.dev/archive/software-engineering-splits-in-three/)
SOURCE: George from prodmgmt.world (@nurijanian), "how Anthropic is changing the PM role" (March 20, 2026, x.com/nurijanian/status/2035117765749875015)
SOURCE: Cat Wu (@_catwu), "The PM playbook was built on an assumption..." (March 20, 2026, x.com/_catwu/status/2035104384007422347)
SOURCE: Karri Saarinen, "Linear Next" (linear.app/next, March 24, 2026)
-->

---
layout: statement
class: statement-wide
---

# The artifact was never the job.

<v-click>

> “A PM with a good idea can now get to a first draft faster than ever.”
>
> Duolingo Chief Product Officer

</v-click>
<v-click>

The job is deciding what should happen next. **The artifact is just evidence that the thinking happened.**

</v-click>

<!--
KEY POINTS:
- Duolingo quote = the product-side lived experience of the compression
- Faster artifact creation raises the premium on product judgment, not lowers it
- Task vs job: when a job is mostly one task, automating the task can end the job
- Software: the code is not the whole job

BRIDGE: "Twenty-five years apart, two one-liners show how far the culture just moved."

ADDITIONAL POINTS:
- PM leverage moves closer to first-draft creation, experimentation, and direction-setting
- Most professional roles are not paid for the visible artifact alone
- Consulting example: the slide deck is not the core value; the core value is diagnosing the enterprise, reading the politics, talking to customers, and creating a direction people can act on
- Applied to software: the job is discovering the real problem, choosing the constraints, shaping the system, and owning the outcome

DELIVERY:
- Trimmed from the slide, say verbally: the full Duolingo line continues "They can visualize concepts, test directions, and move quickly" — the distance between idea and artifact has shrunk. And the job line's long form: walking the terrain, understanding the politics, deciding what should happen next. The full artifact list — "the deck, prototype, and code" — is also verbal now
- Land the headline cold — after the compression slides it should sound like a mild contradiction for a second
- The quote grounds it; the final reveal resolves it
- Keep this calm; it is not meant to reassure everyone equally — the distinction should feel useful rather than comforting
- Optional verbal line: "If you can show instead of describe, the role changes."

SOURCE: Aakash Gupta, quoting Duolingo's Chief Product Officer (x.com/aakashgupta/status/2034356648764948686, March 18, 2026)
SOURCE: Lenny Rachitsky summarizing Benedict Evans (x.com/lennysan/status/2061452384153505897)
SOURCE: Nadh, "Code is Cheap. Show me the talk" (nadh.in/blog/code-is-cheap/)
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
KEY POINTS:
- The cultural inversion that caps the artifact argument: the room will recognise the Torvalds line and half of them will agree with it
- Frame it as pro-clarity, not anti-code: "talk" here means precise problem definition, not vague ideation, and it applies to every discipline in the room

BRIDGE: "Jenny Wen describes what that shift looks like from inside the company building the agents."

DELIVERY:
- Read the Torvalds line first, pause, and let the 25-year gap do the work before clicking to reveal Nadh

SOURCE: Nadh, "Code is Cheap. Show me the talk" (nadh.in/blog/code-is-cheap/)
-->

---
layout: quote
class: quote-long
---

<div class="quote-progressive">
  <div class="quote-progressive-line">“Engineers spin up seven coding agents and ship a working version — before a designer finishes exploring options.</div>

  <v-click>
    <!-- Explicit break: at the 48ch balanced measure this line otherwise
         splits inside "discover-diverge-converge". -->
    <div class="quote-progressive-line">The classic discover-diverge-converge loop<br />is breaking down.”</div>
  </v-click>
</div>

<v-click>

Jenny Wen, Design Lead at Anthropic — via Lenny Rachitsky

</v-click>

<!--
KEY POINTS:
- Jenny Wen: the compression made visceral — a scene, not a theoretical claim
- Scene lands first; the verdict — the loop breaking down — arrives on its own click
- Discover-diverge-converge assumed implementation was the bottleneck
- Not anti-design — the operating model changes for everyone

BRIDGE: "So if implementation stops being the bottleneck, what skill survives across all three disciplines?"

ADDITIONAL POINTS:
- The teller matters: a design leader at the company building the agents
- When implementation compresses, the design process must adapt too
- Andrew Chen's "the prototype is the new PRD" used to share this slide; it now lives solely in Section 5 ("The prototype is the new brief"), so the point lands once, as a fresh beat — mention product work verbally here instead
- Boris offers the operating proof point: on the Claude Code team, PRDs gave way to many fast prototypes before shipping

DELIVERY:
- Let the scene land first. The seven-agents image is vivid — the room will feel it.
- Click the verdict line, then the attribution.
- If there are designers in the room, make eye contact. This is for them.
- Verbal addition: "This is not just engineering getting faster. This is the entire rhythm of collaboration shifting — and Section 5 shows what it does to product work."

SOURCE: Jenny Wen (Design Lead, Anthropic; formerly Design Director, Notion), via Lenny Rachitsky (x.com/lennysan/status/2028484407108194507)
-->

---

# One Surviving Skill Set

<RolesBlurDiagram size="md" caption="Some teams name the overlap: the Product Engineer — frames the problem, ships the code, measures the outcome." />

<!-- Clicks 1 and 2 build the diagram (handoffs → convergence → judgment), so the
     text picks up at 3. -->
<v-click at="3">

## Three job titles. One job: turning ambiguity into clarity.

</v-click>

<!--
KEY POINTS:
- Left panel: implementation complexity justified sequential handoffs
- Right panel: implementation compressed, disciplines overlap — the center is judgment
- The JUDGMENT label is the visual punchline — the thing that doesn't compress
- Convergence of capabilities is not collapse of professions
- Throughline for every role: reduce ambiguity, raise judgment quality

BRIDGE: "And once you see that convergence, the bottleneck shift becomes easier to understand."

ADDITIONAL POINTS:
- State the walls argument over the diagram rather than on a slide before it: the walls between design, product, and engineering were built from implementation complexity, so as that complexity compresses, so do the walls. Distinct disciplines remain; their operating model converges around shared judgment
- Ayres supplies the market evidence that this is already priced in: layoffs eliminated production design roles while demand surged for strategic hybrids who ship end-to-end; she calls this the "Super IC" — companies now demand senior ICs who set direction, make autonomous decisions, ship to production, and measure results
- The per-role translation (trimmed from the slide, say it over the converged diagram): Design — articulating intent, judging quality; Product — creating clarity, setting priorities; Engineering — designing systems, verifying correctness
- The Product Engineer caption names the convergence point: overlapping capabilities and end-to-end ownership, not a mandate that every org adopt one new title
- Sergio's framing is a market signal: more teams now expect end-to-end ownership
- PostHog makes the overlap operational: context, feedback loops, and actionable communication become engineering-adjacent skills too; deciding what to build is becoming more constrained than building it
- Product line translation: "A great PM creates clarity, sets priorities, and aligns the team to execute."
- Jenny Wen frames the new design work as two modes — (a) supporting execution: consulting on in-flight work, giving feedback, polishing in code; (b) setting short-range vision: 3–6 month direction, not multi-year roadmaps

DELIVERY:
- Don't read the diagram aloud. Let the eye do the work.
- Optional verbal: "The walls were never about the disciplines. They were about implementation cost. Take that cost out and the walls go with it."
- On the roles reveal: "I don't mean every company will standardize on the Product Engineer title. I mean this is the overlap zone the market is rewarding."
- After "turning ambiguity into clarity" lands, optional verbal: "It's amazing how productive AI makes you if you're able to ask the right questions. That's the clarity we're talking about."
- Optional verbal for Design: "Preston Attebery nailed this: 'Once everyone can make an app, we will remember that the hard part about apps isn't making the app.'"
- Eriksson's radiology example is useful color here: as AI expands what's feasible, domain knowledge and strategy become more central, not less

SOURCE: Adapted in-house from a reference graphic shared by the speaker.
SOURCE: Sergio Rocks on the rise of the Product Engineer (x.com/SergioRocks/status/2029558863901389076)
SOURCE: PostHog, "WTF does a product manager do? (and why engineers should care)" (x.com/posthog/status/2032169174496076171)
SOURCE: Carly Ayres, "Designers! Designers! Designers!" (carly.substack.com/p/designers-designers-designers)
-->

---
class: dim-prior v-center
---

# The Bottleneck Cascade

<v-click>

When weaving sped up, **yarn** became the constraint. When spinning caught up, **raw cotton**. When cotton flooded in, the constraint snapped back to **weaving**.

</v-click>
<v-click>

Every time a bottleneck is removed, the constraint moves upstream — **not away.**

</v-click>
<v-click>

The middle is compressing. The constraint is moving to **clarity, judgment, and system design.**

> “Figure out your bottleneck, automate it, then find the next bottleneck.”
>
> Armin Ronacher

</v-click>

<!--
KEY POINTS:
- The cascade is the durable mental model for the rest of the talk
- Clarity becomes the bottleneck mechanically, not aspirationally
- Radiology numbers: salaries rose 44% ($525K avg), 29% more cancers detected
- The final click's operating principle is the section's takeaway line

BRIDGE: "Now let me show you the toolkit for the new bottleneck: context, specs, and tooling."

ADDITIONAL POINTS:
- Collina's three-tier framework is the cascade applied per market segment: the constraint lands differently in tech companies (platform engineering), enterprises (fractional expertise), and mid-market (business understanding)
- We'll return to this frame in the wrap-up: "the bottleneck ultimately isn't technology — it's expert knowledge extraction"
- Radiology in full — the modern proof of the same Jevons Paradox pattern: Geoffrey Hinton predicted AI would eliminate radiologists within five years. Instead, radiologist salaries rose 44% ($525K avg), Mayo Clinic doubled its staff, AI mammography detects 29% more cancers while reducing workload by 44%, and over 1,000 FDA-cleared AI radiology devices now exist. "AI didn't replace radiologists. It made imaging so much faster and cheaper that we started doing vastly more of it."
- The takeaway line turns the cascade from an explanatory model into something repeatable: automation does not end the work; it reveals where judgment and system design are needed next

DELIVERY:
- The weaving/yarn/cotton sequence should feel like a story, not a list. The third beat is the loop-back: once the gin flooded the market with cotton, the constraint snapped back to weaving and the power loom answered it — the cascade never ends, it circles
- Pause after "not away" — this is the insight that makes the rest of the talk feel inevitable
- Optional verbal addition after the weaving story: "Same thing happened in radiology. Geoffrey Hinton predicted AI would replace radiologists in five years. Instead, salaries went up 44%, Mayo Clinic doubled its staff, and AI mammography is catching 29% more cancers. When costs collapse, demand explodes. The constraint moved upstream — to the humans interpreting the results."
- On the last click, let the principle sit on its own before advancing — don't elaborate. Then hand off verbally: "That's the new stack."

SOURCE: Armin Ronacher, "The Final Bottleneck" (lucumr.pocoo.org/2026/2/13/the-final-bottleneck/)
SOURCE: Matteo Collina, "Software Engineering Splits in Three" (adventures.nodeland.dev/archive/software-engineering-splits-in-three/)
SOURCE: Martin Eriksson, "When Software Becomes Cheap, Strategy Becomes Everything" (thedecisionstack.com/when-software-becomes-cheap-strategy-becomes-everything/)
-->
