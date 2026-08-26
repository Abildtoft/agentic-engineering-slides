# Agentic Code Quality

Addy Osmani, published 8 August 2026.

Thesis, verbatim: **"Software quality now depends on the constraints you set around your agents."** Review-by-reading doesn't scale to agent volume — "there's just too much code for anyone to read" — so quality checks migrate into the harness, environment, and operating system around the agent. Osmani still reads code, but is "very intentional about where I am comfortable with constraints as the check."

Key points:

- **Quality gates** take many forms: unit/property/acceptance tests, mutation testing, code-quality metrics (cyclomatic complexity, line length), deterministic constraints on which proposals the system will accept, custom architecture rules enforced by linters. "An agent can propose anything. Your constraints decide whether a proposal is safe enough, correct, scoped, and useful, for you and your team to ship."
- **Constraint placement:** "Some constraints shape work before it begins. Others give feedback while the agent is working. Others decide whether its output can cross the production boundary at all." Back-pressure should exist throughout the loop, "not as a single review at the very end of all the work" — compilers rejecting invalid code, tests failing, security policies blocking, CI declining to deploy.
- **Guillermo Rauch's skip-review test:** every "yes you can skip reading" is really a statement about low stakes (no users, throwaway, prototype). "Once the stakes go up, something has to read the code. If it isn't you on every diff then it has to be the constraints."
- **Environment design:** agents fail for the same reasons humans do — brittle environments, nondeterministic builds, missing permissions, weak tests. "The environment we're after is one where an agent can do real work, get feedback it can trust, and fail without doing much damage."
- **Trust:** "We start with trust, but it has to be hard-earned" — autonomy routed by risk, evidence, and track record.
- **Quality is multi-dimensional:** correctness plus maintainability, performance, security, efficiency, comprehensibility — "a collection of signals of varying importance to you and your team." What matters more than the number of constraints is whether they're challenging enough to meet the bar.
- **Three scaling levers** when verification volume exceeds capacity: scale the verification system, reduce the agent generation rate, or lower the quality bar — "we need to be ready to do all of these things." And deliberately *un*-constrain where you care less to tighten where you care most: "By providing tighter constraints where we care the most, we can maximize our throughput without sacrificing quality."
- **Human attention:** "scarce and valuable so we should proactively direct it to those most nuanced problems that require our judgment. Downstream humans should only be pulled in when the automated guardrails for constraints break." Human code review "is going to look very different."
- The ultimate constraint "is the one we place on ourselves to stand behind the decisions and actions we've taken."
- No quantified statistics in this piece — it is the framework companion to the data-heavy [[osmani-agentic-code-review]].

## Deck fit

- Secondary source for the bonus workshop (`sections/07-bonus-code-review.md`): the "constraints" statement slide and the back-pressure framing.
- Same back-pressure argument as Ronacher on the 03b constraint-ring slide and as [[osmani-own-the-outer-loop]]'s "quality is back pressure" line — this note supplies the review-specific phrasing.

https://addyosmani.com/blog/agentic-code-quality/
