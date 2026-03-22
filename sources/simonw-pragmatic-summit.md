# Simon Willison — Pragmatic Summit Fireside Chat

**Source:** simonwillison.net/2026/Mar/14/pragmatic-summit/
**Date:** March 14, 2026

## Key Insights

### Trust Progression
Stages: using ChatGPT for questions → coding agents writing code → agents writing more code than humans → not reading generated code at all. Marks the inflection ~6 months before the talk. Claude Opus 4.5 as the first model that genuinely earned his trust.

### Tests Are Free Now
"Tests are free now. They're effectively free... tests are no longer even remotely optional." TDD becomes obvious when agents bear the execution cost. "Red-green TDD" as a five-token prompt that dramatically improves code reliability. Every coding session starts with: "here's how to run the tests."

### Code Quality Is a Choice
"Having poor quality code from an agent is a choice that you make." Agents can refactor extensively without human fatigue constraints. Poor code is a harness failure, not a model limitation.

### Manual Testing Paradox
Agents must perform manual testing because automated test suites don't verify runtime behavior. His tool "Showboat" creates markdown documentation of manual API tests agents conduct.

### Conformance-Driven Development
Extract test suites from multiple implementations of a standard (Go, Node.js, Django, Starlette), then use those tests to guide implementing that standard in a new framework. Reverse-engineers specifications.

### The Lethal Trifecta (Security)
Three dangerous conditions: (1) agent access to private data (API keys, email), (2) exposure to malicious instructions, (3) exfiltration vectors. Classic threat: compromised digital assistant forwarding sensitive emails.

### Template & Pattern Consistency
Agents follow established codebase patterns nearly perfectly. Starting with high-quality templates (cookiecutter) ensures consistent style. "If you're the first person to use Redis at your company, you have to do it perfectly."

### Open Source Implications
- Reduced library demand: "Why would I use a date picker library when I could have Claude write me the exact one I want?"
- Junk contributions flooding projects: maintainers requesting GitHub disable pull requests
- Contradiction: agents excel at recommending and stitching libraries — capability "built on the back of the open source community"

### Cognitive Exhaustion
The work is "absolutely exhausting." Manages three simultaneous projects to avoid burnout — switching between 10-minute tasks prevents mental collapse.

### Career Advice
"If you've always stuck to two programming languages because of overhead, go and learn a third right now — and don't learn it, just start writing code in it." Shipped three Go projects without fluency. Continuously discover model boundaries; revisit failed tasks every six months.

### Vibe-Coded vs. Maintained Code
Distinguishes single-page tools ("Who cares, right? It either works or it doesn't") from long-term projects where quality matters. Context determines appropriate quality bar.

### YOLO Mode Tension
Despite security expertise, runs Claude with --dangerously-skip-permissions locally because convenience outweighs theoretical danger — but avoids dumping untrusted repository instructions into such environments.
