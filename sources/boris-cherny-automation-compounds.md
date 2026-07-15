# Automation Compounds: Encode Domain Knowledge as Infrastructure

Boris Cherny (Head of Claude Code) argues that the classic senior-engineer habit — automating your own work — has become more valuable, not less, in the agent era. Strong source for the "loops" idea and for why CLAUDE.md/skills/docs are engineering work, not overhead.

- Posted on X by Boris Cherny on July 15, 2026.
- The best engineers always automated: editor tooling, lint rules, e2e suites. These were the highest-leverage activities because they multiplied their own output.
- Three reasons automation matters more now:
  1. DevX automation speeds up every agent in your fleet, not just you. More automation == more output per unit of time.
  2. Moving fixes into code beats re-solving with tokens. An agent can fix an issue each time it appears, but a lint rule, CI step, or routine automates that class of issue forever. "This is really what people are talking about when they talk about loops."
  3. Most important: automation lets others contribute. Engineers ship on day one and non-engineers contribute as effectively as engineers — what blocks them is domain knowledge living in people's heads instead of in automation.
- The new unlock: encodable domain knowledge is no longer limited to lint rules, types, and tests. It now includes code comments, skills, CLAUDE.md rules, and memories — nearly all domain knowledge can become infrastructure.
- Sharp reframe: a PR rejected for using the wrong framework or ignoring architectural patterns is "a failure of automation," not a failure of the contributor.
- The bar: every team should write the CLAUDE.md's, REVIEW.md's, skills, and docs that let agents work productively "with zero additional context from the prompter."
- Best use in the talk: grounds the loop-engineering section (pairs with andrew-ng-loop-engineering) and the claim that context/docs are the new infrastructure; continues the thread from the-best-engineers-never-just-wrote-code and item 4 in building-claude-code-with-boris-cherny (repeat review comments → lint rules).

https://x.com/bcherny/status/2077460395279692197
