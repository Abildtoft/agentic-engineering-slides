<!-- 21. section — The New Stack: Core Concepts -->

We have named the shift. The middle is compressing, and the value moves to
intent and judgment. So what does the new way of working actually look like,
day to day? That is the next two sections. This one is the concepts. The next
one is the tools. And I want to keep both of them accessible whether you write
code or not, because the concepts apply either way.

---

<!-- 22. default — From Producing Outputs to Designing the Loop — ~3 clicks -->

One thing to get out of the way first, because it is where most people's
mental model is stuck.
[click] The agentic level is not faster autocomplete. If that is your picture
of it, everything that follows will sound like an overreaction.
[click] What actually changes is this. You are no longer producing every
artifact yourself. You are designing the loop around the agent. Choose the
work, set the bar, improve the loop. That is the shortest description I have of
the new job. And I want to be honest that not every organisation is there yet.
Security reviews, compliance, a skeptical team. Those are real. Treat what
follows as the target state, not the assumption.
[click] Two disciplines make that loop work. Context engineering, and
spec-driven development. Martin Eriksson has a line I like: speed without
direction is just burning jet fuel on a runway. Context is the direction. Specs
are the runway markings.

---

<!-- 23. default — Context Engineering — ~3 clicks -->

Start with context.
[click] We always needed it. The first wave was copy-pasting code into a chat
window, and the context was never enough. You have all lived that. What
changed is that agents can now go and find the context themselves. They
navigate the project, read the files, build their own picture.
[click] But every context window is finite, and models reason worse as it
fills up. So context engineering is not dumping everything in. It is getting
the important information into that budget. Right information, right order,
right time. For most teams the highest-leverage first step is a single file at
the root of the repo: an onboarding document where the reader is an agent.
[click] And this is not an engineering-only idea. Laura Tacho put it well: the
Venn diagram of developer experience and agent experience is a circle. Your
design docs, your component specs, your design tokens. That is context too.
Documentation is now production infrastructure.

---

<!-- 24. default — Spec-Driven Development — ~4 clicks -->

The second discipline.
[click] Context shapes what the agent knows. Specs shape what good looks like.
The two are a pair.
[click] A spec, concretely, is the smallest clear, testable packet of intent.
Scope, constraints, acceptance criteria. A large project becomes a series of
those packets, and that is not new. It is issue decomposition and acceptance
criteria, practices you already have, applied with more discipline because the
context window rewards it.
[click] The cycle is spec, implement, verify, refine. You write the spec, and
you own the verification. That second part is where human judgment stays
essential, and it is the part people are most tempted to skip.
[click] Addy Osmani's rule of thumb: models do best with focused prompts.
Implement one function, fix one bug, add one feature at a time. Narrow,
well-specified tasks beat vague mega-prompts every time. And that holds for
product and design work just as much as for code.
