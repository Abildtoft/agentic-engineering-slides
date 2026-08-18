# Own the Outer Loop

Addy Osmani, published 15 July 2026.

The operating model for agentic engineering, split across two loops:

- **Inner loop — the agent's domain.** "Investigation, implementation, verification, and repeat." The agent can "investigate tasks, implement plans, test their results, and report back." This is the model plus its harness: tools, memory, permissions, sandboxes, tests.
- **Outer loop — the engineer's domain.** "Agents run the inner execution loop. Engineers own the outer loop." The engineer's four verbs: **decide, verify, approve, and own** — whether the work is worth doing, whether the evidence holds, approve or block, and carry the consequence.

Osmani decomposes the engineer's side further into a constraints loop (what inputs and instructions to set), a sampling loop (how much output to review), an audit loop (what evidence to keep), and an ownership loop (what production boundary to own).

**The boundary between the loops is evidence** — diffs, tests, logs, and a short why. Quality is the set of checks that produce that evidence. A human sees the evidence and returns a verdict; that verdict is where accountability attaches.

Framing: "Inside the system, there's really just one kind of thing our agents are doing: capability... Outside the system, there's a single kind of thing: agency."

Related: "Quality is back pressure — grant only as much autonomy as you can still stop and check," which lines up with Ronacher's back-pressure framing already used on the constraint-ring slide. Osmani also cites survey figures: 96% do not fully trust AI code, only 48% always verify before commit, and 38% say reviewing AI code takes longer than reviewing human code.

Deck fit:

- Section 3b, "Set the Constraints Around Your Agents": the ring already choreographs both loops — the agent bounces off the gates inside the ring (inner), and only output clearing every gate reaches the pipeline where a human decides (outer). This note supplies the names.
- **The slide says "Your loop", not "outer loop" — deliberately, don't change it back.** Section 05's three-loop slide follows Ng and gives "outer" to the External feedback ring: real users, hours to weeks, and the notes there call it the only loop producing real-world evidence. Osmani splits the world in two where Ng splits it in three, so Osmani's outer loop spans Ng's outer two and the word would point at two different rings twelve slides apart — with a second "evidence" claim attached to each. "Inner loop" is kept in both places because it means the same thing in both: the agent's own cycle.
- Connects to [[andrew-ng-loop-engineering]], which extends the same split into three timescales, and to [[agency-ladder]], which is Osmani on what the human still owns.

https://addyosmani.com/blog/own-the-outer-loop/
