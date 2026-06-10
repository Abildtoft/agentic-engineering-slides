# Markdown is the program now

Garry Tan argues that the first wave of agentic coding still carried a Web 2.0 instinct: wrap model calls in large applications, tests, validators, queues, retries, and control systems because code felt cheap and model intelligence felt expensive.

His post frames that approach as building a factory around an AI worker. Garry's List reached roughly 540,000 lines across Rails application code and tests, but Tan says the real lesson was not the app. It was the smaller agent setup that emerged from building it: GStack, GBrain, and reusable skill packs.

The claimed inversion:

- model calls are getting cheaper while model capability keeps rising
- code is no longer the scarce artifact
- instructions, judgment, evals, and reusable agent capabilities become the durable layer
- deterministic code should shrink to the thin layer for I/O and things that must not hallucinate

Key phrase for the deck: "Markdown is the program now."

Tan distinguishes this from vibe coding by insisting that markdown skills need tests:

- the markdown skill
- minimal deterministic code
- unit tests for code
- LLM evals for the skill
- integration tests across both
- resolver logic so the agent invokes the skill automatically
- evals for the resolver

He calls this bundle a skill pack: a reusable unit of capability that can compound. The hackathon judging example shows the shape of the argument: instead of building a traditional scoring system, scraper, video analysis pipeline, research module, and ranking app, the agent performed the task, then turned the workflow into a reusable skill pack.

The broader claim is that agentic engineering shifts the bottleneck away from writing more code and toward clarity, taste, and judgment. Useful closing quote: "The engineer who writes the least code is often the one building the most."

Deck fit:

- Section 3a: new stack concepts, especially markdown/instructions as durable program layer
- Section 3b: tools, harnesses, skill packs, evals, and agent control loops
- Section 5: what matters now, especially spending tokens and moving bottlenecks to judgment
- Section 6: moving forward, especially designing systems that free agents instead of enclosing them in control-heavy code

https://x.com/garrytan/status/2061454423034110372
