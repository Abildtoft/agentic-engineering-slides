# Agentic Code Review

Addy Osmani, published 15 June 2026.

Thesis: the hard part of engineering moved from writing code to deciding whether to trust it, "which makes review the most leveraged skill in software right now." Review used to work because of a happy accident of relative speed — a senior could read faster than a junior could write, so review kept pace without anyone designing it to, and knowledge sharing fell out as a side effect. Agents ended that fact; the constraint moved downstream to the one step that did not get faster: a person being confident the change is right.

## The 2026 data

- **Faros AI (March 2026, 22,000 developers / 4,000 teams, low → high AI adoption):** code churn +861%; incidents-to-PR +242.7%; per-developer defect rate 9% → 54%; median review duration +441.5% (time-to-first-review and average review time both roughly doubled); PRs merged with zero review +31.3%. Nobody chose the last one — reviewers couldn't keep pace, so code began merging unread. Mature, disciplined teams were hit just as hard. Agent PRs also run **51% larger** on average.
- **GitClear (through 2025):** daily AI users produce ~4× the raw output of non-users, but against their own prior year the real productivity gain is ~12% (Bill Harding concedes part of even that is selection bias). Osmani: "the gap between 4x the code and a tenth more value is the review problem stated in one line."
- **CodeRabbit (Dec 2025, 470 OSS PRs: 320 AI-coauthored / 150 human):** AI changes carried ~1.7× more issues — logic/correctness +75%, security 1.5–2×, readability more than tripled. "Predictable, measurable weaknesses" (David Loker) — i.e. aimable.
- **GitHub:** Copilot review past 60M reviews, 10× in under a year; >1 in 5 reviews on the platform involves an agent.
- **Anthropic code review:** <1% of findings marked incorrect by engineers; internal rate of PRs receiving a substantive review rose 16% → 54%.
- **Four-reviewer parallel experiment (146 PRs, 679 findings, 3.5 weeks; CodeRabbit, Sentry Seer, Greptile, Cursor BugBot):** of 617 distinct flagged locations, 93.4% caught by exactly one tool, 6% by two, none by all four — the tools never once flagged the same line. Heterogeneity is the point; four copies of one model is "a single reviewer with a larger invoice." Martian benchmark (Jan–Feb 2026): CodeRabbit tops F1 (~49% precision, best recall); Greptile ~82% bug-catch vs CodeRabbit's 44%, more false positives.
- **Early-Stage Prediction of Review Effort (Jan 2026, 33,707 agent PRs):** ~28% merge almost instantly; agents "ghost" after subjective feedback; a companion paper attributes 38% of rejected agent PRs to reviewer abandonment. A cheap circuit-breaker (file types, patch size) predicts high-maintenance PRs before a human looks.
- Vendor caveat Osmani states himself: CodeRabbit and Faros sell into this market; the numbers hold because effect sizes are large and consistent across unrelated sources.

## Frameworks

- **Three variables** decide what review must do: blast radius, code lifespan, how many people must understand it. "Most bad advice in this space is one position on that spectrum prescribing to another." Solo/no users: lean on tests, review what matters — "no users is permission to defer review. It is not permission to skip verification." The dangerous middle is the unnoticed crossing when users arrive. Large org: every figure lands at full strength.
- **Intent debt:** agents reason visibly, then the reasoning is discarded when the diff is produced. Review shifts from checking stated reasoning to reconstructing missing intent — "we keep acting surprised that it takes 441% longer." From *AI Slop and the Software Commons* (2026; 1,154 posts, 15 threads): reviewing an agent PR made a developer "the first human being to ever lay eyes on this code"; review "wasn't built to recover missing intent." Fix: capture decision logs on the PR — "a tooling problem, and tooling problems get solved."
- **Playbook:** tier by risk, not by author (config → linter + glance; features → types, tests, one AI reviewer; payments/auth → full stack, two different AI reviewers, human system owner, security pass). Raise the intake bar (statement of intent, readable diff size, test output, proof it ran). Keep PRs small — a readable diff is a design constraint. Read test changes more carefully than code (assertion-rewrite failure mode; mutation testing tells you whether the test would notice). Treat CI as the wall that does not move (removed tests, skipped lint, lowered thresholds, untrusted input into LLM calls = latent prompt injection; agents weaken gates as "gradient descent finding the cheapest path to green"). A human owns the merge — every AI review is a sensor, not a verdict.
- **Borrowed confidence / loop engineering:** agent writes, agent reviews, agent judges = closed loop of models with correlated blind spots, "very sure and very wrong, with no human left to tell the difference." The human does not leave; the human moves up a level — accountability, right-change judgment, high-blast-radius gates, and the behavior nobody specified. Human in the loop becomes human **on** the loop.
- **Kun Chen** (ex-Meta L8): ~40 PRs/day solo, 20–30 parallel agents, largely stopped reviewing — but writes detailed plans up front (intent captured before the code) and runs an automated review gate ("No Mistakes"). "He is not wrong; he is a long way down one specific end of the spectrum."
- Team lens: the binding constraint on shipping is how fast a trusted human can be confident a change is correct. "Reducing engineering headcount because 'AI made us faster' is dangerous unless you have closed the review gap first." Closes on Willison: "your job is to deliver code you have proven to work."

## Deck fit

- Anchor source for the bonus workshop section (`sections/07-bonus-code-review.md`) — supplies the socratic questions' payoffs, all the statistics slides, the tier table, the intake-bar slide, and the borrowed-confidence close.
- Counterweight to Section 1's ×18 ledger: raw output vs delivered value (4× vs 12%) is the honest bridge between the two decks.
- Extends [[osmani-own-the-outer-loop]] (the outer-loop verbs decide/verify/approve/own are what "moves up a level" here) and the constraint-ring slide in 03b; [[how-to-kill-the-code-review]] is the adjacent older note.

https://addyosmani.com/blog/agentic-code-review/
