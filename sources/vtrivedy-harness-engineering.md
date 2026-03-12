# Virat Trivedy — Can Someone Please Define a "Harness"?

SOURCE: Virat Trivedy (x.com/Vtrivedy10/status/2031408954517971368)
Full post: LangChain / deepagents blog

## Core Definition

**Agent = Model + Harness.** A harness is every piece of code, configuration, and execution logic that isn't the model itself. A raw model is not an agent. It becomes one when a harness gives it state, tool execution, feedback loops, and enforceable constraints.

Concretely, a harness includes:
- System Prompts
- Tools, Skills, MCPs + their descriptions
- Bundled Infrastructure (filesystem, sandbox, browser)
- Orchestration Logic (subagent spawning, handoffs, model routing)
- Hooks/Middleware for deterministic execution (compaction, continuation, lint checks)

## Key Concepts

### Working Backwards from Desired Behavior
Each harness feature derives from a behavior the model can't deliver on its own:
- Work with real data durably → Filesystem + Git
- Write & execute code → Bash + Code Execution
- Safe execution + default tooling → Sandboxed Environments + Tooling
- Remember and access new knowledge → Memory Files + Web Search + MCPs
- Maintain performance over long contexts → Compaction + Tool Offloading + Skills
- Complete long horizon work → Ralph Loops + Planning + Verification

### Context Rot
"Context Rot describes how models become worse at reasoning and completing tasks as their context window fills up. Context is a precious and scarce resource, so harnesses need strategies to manage it."

"Harnesses today are largely delivery mechanisms for good context engineering."

### Terminal Bench Evidence
"We improved our coding agent from Top 30 to Top 5 on Terminal Bench 2.0 by only changing the harness." — Evidence that harness quality > model quality for practical work.

### Model-Harness Training Loop
Useful primitives are discovered → added to the harness → used when training the next model → model improves at using the harness → cycle repeats. This co-evolution means models become more capable within the harness they were trained in.

"As models get more capable, some of what lives in the harness today will get absorbed into the model. But just as prompt engineering continues to be valuable today, it's likely that harness engineering will continue to be useful for building good agents."

### Open Problems
- Orchestrating hundreds of agents working in parallel on a shared codebase
- Agents that analyze their own traces to identify and fix harness-level failure modes
- Harnesses that dynamically assemble the right tools and context just-in-time

## Relevance

- Formal definition of harness engineering validates the deck's Section 3b culmination
- "Behavior → Harness Feature" mapping (image-v2) is a cleaner visual for the Harness Engineering slide
- Terminal Bench stat is concrete evidence for the harness slide
- "Context Rot" term enriches the Context Engineering slide notes
- Model-Harness Training Loop is a forward-looking insight for presenter notes
- Agent architecture diagram (image-v1) shows the full agent loop cleanly
