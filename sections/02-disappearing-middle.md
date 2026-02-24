---
layout: section
transition: section-shift
---

# The Disappearing Middle

What's actually changing about how software gets made

<!--
[T+16:00 | S2 slide 1 of 11 | 0.5min]
Transition from Section 1: "We've established the shift is real and accelerating. Now let's look at what's actually changing about the work itself."
This section is for everyone in the room — not just developers. If you're in product or UX, pay close attention. Your work is in this story too.
-->

---

# The Middle of Software Work

<v-click>

**Idea** &nbsp; → &nbsp; _the middle_ &nbsp; → &nbsp; **Shipped product**

</v-click>
<v-click>

"Turning intent into something real meant opening the codebase, booting up the environment, and writing the code. That middle absorbed most of the time, attention, and craft of software teams."

</v-click>

<!--
[T+17:45 | S2 slide 2 of 11 | 2min]
Source: Karri Saarinen, Linear CEO (x.com/karrisaarinen/status/2007534281011155419)

Before we talk about what's changing, let's name what existed. For decades, the middle was where most of the work lived. You had an idea on one end and a shipped product on the other. Everything in between — writing code, debugging, integrating, testing — that was the job.
For product and UX too: your specs, your designs, your requirements — they all fed into this middle. The middle is where your intent met reality.
Seniority was measured by how well you navigated this middle.
-->

---
layout: statement
---

# "My belief is that this is changing."

<!--
[T+18:30 | S2 slide 3 of 11 | 1min]
Source: Karri Saarinen (same post)

Understatement from the CEO of Linear — a company whose entire product is a tool for managing that middle.
The implementation layer — the part between "I know what to build" and "here it is" — is compressing. Not disappearing entirely, but the time and effort it absorbs is shrinking fast.
Think about what Section 1 showed: agentic tools don't just speed up typing. They compress the entire cycle of plan-write-test-iterate.
If the middle was 80% of the effort, what happens when it drops to 20%?
-->

---
layout: quote
---

# "Talk is cheap. Show me the code."

Linus Torvalds, 2000

<v-click>

# "For the first time ever, good talk is exponentially more valuable than good code."

Nadh, 2025

</v-click>

<!--
[T+20:15 | S2 slide 4 of 11 | 2min]
Source: Nadh, "Code is Cheap. Show me the talk" (nadh.in/blog/code-is-cheap/)

This is probably the most famous quote in software engineering. And it just inverted.
For 25 years, code was the proof. Talking about what you'd build was considered cheap. Doing the work — writing the code — was what mattered.
Now: an experienced developer who can imagine, articulate, define problem statements, architect and engineer has a massive advantage. Knowledge of specific syntax and frameworks is no longer the bottleneck.
Even Linus himself merged AI-generated code and said: "Is this much better than I could do by hand? Sure is."
For the non-devs: this is huge. The skill you've always had — articulating what needs to exist and why — just became the most valuable skill in the building process.
-->

---
layout: statement
---

# The machinery for creating code is now a commodity. What remains is critical thinking and foundational human skills.

<!--
[T+21:00 | S2 slide 5 of 11 | 1min]
Source: Nadh (same essay)

Distilled insight from the Linus inversion. Let this sit.
"Foundational human skills" — articulating problems, making judgment calls, understanding users, sensing quality. These are not new skills. They're skills this room already has. They're just suddenly the bottleneck.
The machinery is available to everyone. No special training needed. Just good old critical thinking and competence to run the machinery.
Transition: so if there's a split happening, what does it look like?
-->

---
layout: quote
---

# "LLM coding will split up engineers based on those who primarily liked coding and those who primarily liked building"

Andrej Karpathy

<!--
[T+22:15 | S2 slide 6 of 11 | 1.5min]
Source: Andrej Karpathy (x.com/karpathy/status/2015883857489522876)

Karpathy was a founding member of OpenAI and led Tesla's AI division. This is not a hot take — it's a diagnosis.
"Coding" = the craft of writing elegant, efficient code. The syntax, the patterns, the clever solutions.
"Building" = the work of making something that solves a problem. Understanding what users need, making architecture decisions, shipping something that works.
Both are valid. But AI makes the first one less scarce and the second one more valuable.
Ask the room (rhetorically): which one do you identify with more? And for the product/UX people — where do you see yourselves in this split?
-->

---
layout: quote
---

# "The prototype is the new PRD. If your team needs a 20-page product strategy doc, you're already behind someone with a weekend prototype."

Andrew Chen

<!--
[T+23:30 | S2 slide 7 of 11 | 1.5min]
Source: Andrew Chen, a16z general partner (x.com/andrewchen/status/2025022470550684037)

This is the slide where product and UX people should sit up.
A PRD was the artifact that bridged product thinking and engineering execution — 20 pages of requirements, edge cases, acceptance criteria.
When building is fast and cheap, you can just... build it. Try it. Feel it. "The ability to feel how good a product is, from actually using it, beats all the theorizing and market analysis and user research."
This does not mean product thinking is dead. It means the artifact changes. Instead of describing what to build, you show what to build.
For UX designers: your prototyping tools already moved in this direction. Now the prototype can be the real thing.
-->

---

# The Translation Layer Is Compressing

<v-click>

**Before:** PM talks to customers, writes specs, hands them to engineers

</v-click>
<v-click>

**Now:** PM forms intent clearly enough that agents can act on it directly

</v-click>
<v-click>

**"The spec is becoming the product."**

</v-click>

<!--
[T+25:15 | S2 slide 8 of 11 | 2min]
Source: Shubham Saboo, "The Modern AI PM in the Age of Agents" (x.com/Saboo_Shubham_/status/2008742211194913117)

The PM role used to be translation. You were the bridge between "what people need" and "what gets built." The value was in that translation layer.
That layer is compressing. When agents can take a well-formed problem and produce working code, you're no longer translating for engineers. You're forming intent clearly enough that agents can act on it directly.
This is both empowering and threatening. The PM who can articulate clear intent becomes more powerful than ever. The PM who primarily managed the handoff process has less to do.
Same dynamic as the developer split: the "middle" of PM work is compressing. What remains is knowing what to build.
-->

---
layout: statement
---

# The time between "I know what we should build" and "here it is" collapsed. But the work of knowing what to build didn't get easier. It got more important.

<!--
[T+26:00 | S2 slide 9 of 11 | 1min]
Source: Shubham Saboo (same post)

This is the key counterpoint to any naive "AI replaces everyone" reading.
Building got cheaper. Deciding what to build did not. In fact, it got harder because:
- You can build more things faster, so you need better judgment about what's worth building
- Bad decisions compound faster when execution is instant
- The feedback loop tightens — you have to be ready to evaluate, not just specify

This applies across every role:
- Devs need better architecture judgment (more gets built, faster)
- Product needs sharper problem identification (no hiding behind slow execution)
- UX needs faster taste-making (prototypes replace mockups)
-->

---
layout: quote
---

# "Sprints are no longer about reducing uncertainty in the face of high costs. Today they are about deciding what to do and how to stand out when the cost of building moves toward zero."

Lenny Sanudo, creator of the Design Sprint

<!--
[T+27:15 | S2 slide 10 of 11 | 1.5min]
Source: Lenny Sanudo (x.com/lennysan/status/2024300694891864304)

The practical consequence of everything we've discussed.
The entire Agile/Scrum framework was designed for a world where building was expensive and risky. Sprints existed to manage uncertainty when each iteration cost weeks of engineering time.
When building costs approach zero, the bottleneck shifts entirely to decision quality. What should we build? How do we differentiate? What is worth our users' attention?
For this team specifically: think about your sprint planning. How much time is spent on estimation and prioritization based on engineering cost? What if that variable mostly went away?
Transition: let's discuss.
-->

---
layout: center
class: text-center
---

# For product/UX — how does your work change when building is fast and cheap?

# For devs — what part of your work feels most at risk?

<!--
[T+29:00 | S2 slide 11 of 11 | 8min DISCUSSION]
DISCUSSION PROMPT — pause here for 5-7 minutes.
ABORT POINT: If running 10+ minutes over at this point, shorten this discussion to 3 minutes and skip to S3a.

The dual-prompt is intentional: it gives each sub-audience a specific entry point.
For product/UX, prompt follow-ups:
- "If you could prototype in real code tomorrow, what would you try first?"
- "What does your role look like if specs become prototypes?"
For devs, prompt follow-ups:
- "Is the risk in what AI can do, or in what the organization decides it needs humans for?"
- "What's the part of your work that feels uniquely human?"
Listen for: tension between excitement and anxiety, recognition of the convergence theme, specific examples from their own workflow.
This discussion directly sets up Section 3: "OK, so the work is changing — what do you actually need to learn?"
-->
