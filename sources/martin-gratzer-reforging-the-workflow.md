# Reforging the Workflow: Where the Human Goes When Agents Ship

Martin Gratzer (Staff+ engineer and consultant, topmind GmbH), mgratzer.com, 22 October 2026.

A practitioner's before-and-after from his own solo projects. In February he reviewed every agent PR and merged it himself; by October his agent merges low-risk PRs on its own. His summary: "No human in the middle, a human at both ends." And: "I just spend less time reading diffs and more time at both ends."

The post's diagram, captioned "Where my time went in February, and where it goes now":

- **February, a human in the middle.** Plan the issue with the agent → the agent implements from the issue → it self-reviews (lint, build, test) → he reviews the PR with line comments → he makes the final call on the merge. Fixes and doc updates loop back to implementation.
- **October, a human at both ends.** He shapes the issue, sparring with the agent → inside the guardrails (the repo plus Forge), `ship` → `guard` → `land` → low risk auto-merges, anything else comes to him with a list of where to look. Separately, he shapes the system, turning drift into guardrails through spot checks.

The three steps are commands in **Forge**, his set of agent skills ("the skills that tell it how to work", github.com/mgratzer/forge):

- **ship** implements the issue, runs the app and "writes what it saw into the PR's `## Exercised` section". Then a "fresh-context reviewer, not the session that wrote the code, reviews the diff."
- **guard** carries the PR through CI, review feedback and mergeability. "It never merges, because a loop that fixes its own PR shouldn't also approve it."
- **land** is the newest step. "It judges a green PR's risk in fresh context, on the head commit." Mechanical checks come first ("size, migrations, CI changes, security-sensitive paths and weakened tests"), then "the verdict is low risk only if the reviewer can name what the checks would miss." Auto-merge is opt-in per repository: "With `Auto-merge: low-risk` in `AGENTS.md`, land merges a low-risk PR itself, and only the commit it judged." Otherwise the PR gets a short list of files and questions for a human.

Shaping the system means "finding where an agent drifts, asking where it could have been avoided, and fixing it there": in the issue, in the repository's rules, or in Forge itself.

Planning did not lose its place: "In February I called planning the step where the human adds the most value, and that hasn't changed." Accountability did not move either: "I decide whether a repository's guardrails are good enough."

The numbers, from his own projects:

- "In January I left 126 inline review comments on 25 Colorburst PRs." "In September and October I left none, across 159 PRs."
- Tandler has three handwritten review comments in total, all on one of its first PRs.
- A friend's project (Andreas, a civil engineer who started from a Claude Cowork prototype): "He opened 85 PRs in his first five weeks, around a thousand lines each." "In September I approved 45 of his 48 PRs."

On review: "Review didn't go away either, it moved." Every PR still gets an independent fresh-context review, and the risky ones still go to a person. He keeps the PR, where the Amp team "dropped PRs altogether", because "The PR is where the evidence lives."

His own caveats, stated plainly:

- "And these are my own projects, built for production but by one person, without a team or compliance around them." At work, "there is compliance, and there is knowledge sharing."
- Andreas's project "has no users yet", so the stakes there are currently low.
- Auto-merge was switched on in Colorburst, Tandler and Andreas's project only "a few days ago", "so it's too early to say how often land is right."

## Deck fit

- **Section 3b, "From the Middle to Both Ends".** The slide after "From Issue to Pull Request" redraws his diagram as two horizontal lanes in deck style. The previous slide's pipeline stops at a pull request for the speaker to approve; his goes one step further. The band says "repo + harness" where his says "repo + Forge", because "harness" is the word Section 3b built. The slide credits him by name: the months and the numbers are his, not the speaker's.
- **Section 4, "From Reviewing Code to Reviewing Intent".** His October lane is that slide's argument drawn as a workflow: the human checkpoint moves upstream into the issue, and verification moves downstream into `guard` and `land`. His comment counts are the practitioner version of [[osmani-selective-human-review]] and [[how-to-kill-the-code-review]]: review tiered by risk rather than read line by line.
- **Against the maximalist view.** [[thorsten-ball-future-of-software-development]] says code review "is already dead". Gratzer's own data says it moved, and that a person still reads the risky changes.
- **Harness engineering.** "Shape the system" is the Section 3b rule ("when an agent fails, don't just fix the output, improve the harness") as a standing job rather than an incident response. See [[vtrivedy-harness-engineering]] and [[osmani-agent-harness-engineering]]. `guard` refusing to approve its own fixes is the inner/outer split from [[osmani-own-the-outer-loop]] inside a single harness.
- **Keep the caveats on stage.** Solo projects, no compliance, auto-merge only days old. They make the slide honest, and they hand Section 4 its opening question: if nobody reads the diff, who still holds the understanding?

https://mgratzer.com/posts/reforging-the-workflow
