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
narrator: hidden
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
  secondAttribution="Kailash Nadh, 2025"
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

BRIDGE: "And that isn't one design leader's impression. You can measure it — and it runs both ways."

ADDITIONAL POINTS:
- The teller matters: a design leader at the company building the agents
- WORDING: the on-slide lines condense Lenny Rachitsky's summary of the podcast, not Wen's own sentence — hence "via Lenny Rachitsky". His takeaway reads: "The classic discover-diverge-converge loop that designers have relied on for years doesn't work when engineers can spin up seven coding agents and ship a working version before a designer finishes exploring options." If someone asks for her verbatim words, her own answer is the Section 5 slide "Code is work an AI can check"
- When implementation compresses, the design process must adapt too
- Andrew Chen's "the prototype is the new PRD" used to share this slide; it now lives solely in Section 5 ("The prototype is the new brief"), so the point lands once, as a fresh beat — mention product work verbally here instead
- Boris offers the operating proof point: on the Claude Code team, PRDs gave way to many fast prototypes before shipping

DELIVERY:
- Let the scene land first. The seven-agents image is vivid — the room will feel it.
- Click the verdict line, then the attribution.
- If there are designers in the room, make eye contact. This is for them.
- Verbal addition: "This is not just engineering getting faster. This is the entire rhythm of collaboration shifting — and Section 5 shows what it does to product work."

SOURCE: Jenny Wen (Design Lead, Anthropic; formerly Director of Design, Figma — FigJam and Slides), via Lenny Rachitsky (x.com/lennysan/status/2028484407108194507, 2 March 2026), summarising her Lenny's Podcast episode "The design process is dead. Here's what's replacing it" (lennysnewsletter.com/p/the-design-process-is-dead, 1 March 2026) — see sources/jenny-wen-design-in-ai-era.md
-->

---
class: v-center
---

# The Crossover Runs Both Ways

<div class="crossover-stats mt-10">

<v-click>

<p><span class="crossover-num">60%</span> of developers do design work, up from 44%</p>

</v-click>
<v-click>

<p><span class="crossover-num">41%</span> of designers do development work, up from 21%</p>

</v-click>
<v-click>

<p><span class="crossover-num">Half</span> of designers have pushed AI-generated code to production</p>

</v-click>

</div>

<p class="text-sm opacity-55 mt-6 mb-0">Surveys by Figma (2025 → 2026) and Designer Fund (2026). Self-reported and directional — and neither publisher is neutral.</p>

<style>
/* Same treatment as the adoption funnel in Section 1: numbers right-aligned in
   a shared column, brand-coloured like the agenda counters, so the three
   crossings read down the page as one set. "Half" is the source's own word —
   it gives no finer figure — so the column is sized to fit it. */
.crossover-stats p {
  display: flex;
  align-items: baseline;
  gap: 1.2rem;
  font-size: 1.5rem;
  margin: 0 0 1.3rem;
}
.crossover-num {
  color: var(--brand-primary);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  font-size: 2.6rem;
  line-height: 1;
  min-width: 7rem;
  text-align: right;
  flex-shrink: 0;
}
</style>

<!--
KEY POINTS:
- Wen's scene runs one way: engineers outrunning designers. The surveys say the crossover runs both ways
- Figma, 8,403 responses across ten markets, 2025 to 2026: developers doing design work 44% → 60%; designers taking part in development doubled, 21% → 41%
- Designer Fund and Foundation Capital, 900+ designers: half have pushed AI-generated code to production — product and brand designers too, not only design engineers
- The disciplines overlap; they don't merge. The next slide is what sits in the overlap

BRIDGE: "The walls are coming down from both sides. So what's left in the middle?"

ADDITIONAL POINTS:
- More from the designer survey: 65% of designers are taking on more product or engineering work, and 40% see PMs and engineers doing more design
- Say the caveat line out loud. Both are self-reported; Figma sells the canvas its report favours, and Designer Fund and Foundation Capital are investors with a self-selected sample. Same treatment as the company-reported figures in Section 1: a direction, not a measurement
- Even the canvas vendor isn't claiming the canvas is dying: 76% still do at least half their work there, and 90% say design is at least as important as before AI — nearly six in ten say more important, and 65% of developers agree
- LinkedIn went furthest: it replaced its Associate Product Manager program with an Associate Product Builder program that teaches coding, design and PM together, and introduced a formal "Full Stack Builder" title and career ladder (Tomer Cohen, LinkedIn's chief product officer, on Lenny's Podcast, December 2025)

DELIVERY:
- Three clicks, one number each; read them flat and let the numbers carry it
- Slow down on the third. Half the designers have shipped AI-generated code to production — that's the number designers in the room will repeat afterwards

SOURCE: Madeline Stafford and Shane Johnston, "Figma's 2026 AI report: Can AI help us collaborate better?" (figma.com/blog/2026-ai-report/, 24 June 2026) — see sources/figma-2026-ai-report.md
SOURCE: Designer Fund and Foundation Capital, "AI in Design Report 2026" (stateofaidesign.com; summary at designerfund.com/blog/ai-in-design-2026) — see sources/ai-in-design-report-2026.md
SOURCE: Tomer Cohen on Lenny's Podcast, "Why LinkedIn is replacing PMs" (lennysnewsletter.com/p/why-linkedin-is-replacing-pms, 4 December 2025)
-->

---
narrator: hidden
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
- Overlap, not merger, is where most practitioners land. INNOQ's Agentic Trio keeps all three disciplines but hands them delivery too — "PM, UX and engineering share responsibility for both", and "The Agentic Trio has no delivery-only roles." Colin Matthews to PMs: "it does not make sense to spend time being a worse engineer than the rest of your team." The maximalist counter, if the room wants it: Thorsten Ball predicts "the triad of PM/Design/Eng will disappear" (his Section 6 quote is the same post)
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
SOURCE: Daniel Westheide and Fabian Walther (INNOQ), "The Agentic Trio" (agentictrio.org/en/, 22 October 2026) — see sources/agentic-trio.md
SOURCE: Colin Matthews, "How top PMs increase their leverage with AI" (lennysnewsletter.com/p/how-top-pms-increase-their-leverage, 30 June 2026) — see sources/colin-matthews-product-leverage-ladder.md
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
