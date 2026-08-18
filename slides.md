---
theme: default
title: Agentic Engineering
titleTemplate: '%s'
author: Consensus
colorSchema: light
fonts:
  sans: Roboto
  mono: Inconsolata
  weights: '300,400,500,600,700'
  provider: google
favicon: /consensus/favicon.svg
htmlAttrs:
  data-theme: consensus
defaults:
  # Crossfade rather than a lateral slide: eight slides carry a live WebGL
  # <ShaderBackground>, and a translating slide drags that canvas across frame.
  # Section dividers override this with `section-shift` so a chapter change
  # reads differently from a step within one.
  transition: fade
duration: 60min
timer: countdown
layout: cover
---

<ShaderBackground />
<BrandLogo />

# Agentic Engineering

How AI Is Reshaping What It Means to Build Software

---
layout: statement
---

# Hi, I'm Mikkel.

---
class: v-center
---

# Agenda

<div class="agenda-list">

1. The Shift Is Here
2. The Compressing Middle
3. The New Stack
4. **Demo Time**
5. Cognitive Debt
6. What Matters
7. Moving Forward

</div>

<style>
/* Replace the browser list numbering with brand-coloured two-digit counters, so
   the deck's second frame matches the finish of the diagrams later on. */
.agenda-list ol {
  list-style: none;
  counter-reset: agenda;
  padding-left: 0;
}
.agenda-list li {
  counter-increment: agenda;
  display: flex;
  align-items: baseline;
  gap: 1.1rem;
  font-size: 1.35rem;
  line-height: 1.35;
  margin-bottom: 1rem;
}
.agenda-list li::before {
  content: counter(agenda, decimal-leading-zero);
  color: var(--brand-primary);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  opacity: 0.85;
}
</style>

---
src: ./sections/01-the-shift.md
---

---
src: ./sections/02-disappearing-middle.md
---

---
src: ./sections/03a-new-stack-concepts.md
---

---
src: ./sections/03b-new-stack-tools.md
---

---
src: ./sections/04-cognitive-debt.md
---

---
src: ./sections/05-pipeline-and-what-matters.md
---

---
src: ./sections/06-moving-forward.md
---
