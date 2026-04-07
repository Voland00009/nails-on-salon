# Service Cards Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace three identical service cards on the homepage with a featured Manicure card (full width) and two supporting cards (Pedicure + Nail Art), fixing wrong prices and generic copy along the way.

**Architecture:** Single-file edit — `src/pages/index.astro` lines 64–123. No new components, no new files. The featured card uses a two-column internal layout on desktop that stacks on mobile.

**Tech Stack:** Astro 4.x, Tailwind CSS. No automated tests — verification is visual via `npm run dev`.

---

## File Map

| File | Action | What changes |
|---|---|---|
| `src/pages/index.astro` | Modify lines 70–122 | Replace 3-column identical grid with featured + 2-column layout |

---

### Task 1: Replace the service cards section

**Files:**
- Modify: `src/pages/index.astro` lines 70–122

- [ ] **Step 1: git pull**

```bash
# Run from repo root: h:/Мой диск/6. Training - automation/Projects
git pull
```

Expected: up to date or clean fast-forward.

- [ ] **Step 2: Replace the cards grid**

In `src/pages/index.astro`, find and replace the entire block from `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">` through its closing `</div>` (the grid that wraps all three cards, lines ~70–112).

Replace with:

```astro
<!-- Featured card: Manicure -->
<a href="/services#manicure" class="group reveal block mb-lg" style="transition-delay: 0.1s">
  <div class="p-lg lg:p-xl border-l-[3px] border-l-brand rounded-lg bg-white transition-all duration-200 hover:shadow-lg hover:-translate-y-px">
    <span class="inline-block font-body font-medium text-xs uppercase tracking-[0.08em] text-ink bg-brand px-3 py-1 rounded-full mb-md">
      Signature Service
    </span>
    <div class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-xl">
      <div>
        <h3 class="font-display font-semibold text-h3-mobile lg:text-h2-desktop text-ink">
          Manicure
        </h3>
        <p class="text-brand font-medium mt-1">$60–$130</p>
        <p class="text-muted text-sm mt-1">30 min – 3 hrs</p>
      </div>
      <p class="text-muted text-body-small mt-md lg:mt-0 leading-relaxed">
        Structured dry manicure services from hygienic basics to hard gel overlay and extensions. Includes detailed cuticle care, precise nail shaping, and gel leveling to create a smooth, even surface. The goal is a natural, polished look that grows out beautifully and stays neat for weeks.
      </p>
    </div>
  </div>
</a>

<!-- Supporting cards: Pedicure + Nail Art -->
<div class="grid grid-cols-1 sm:grid-cols-2 gap-lg">
  <a href="/services#pedicure" class="group reveal" style="transition-delay: 0.2s">
    <div class="p-lg border-l-2 border-l-brand rounded-lg bg-white transition-all duration-200 hover:shadow-lg hover:-translate-y-px h-full flex flex-col">
      <h3 class="font-display font-semibold text-h3-mobile lg:text-h3-desktop text-ink">
        Pedicure
      </h3>
      <p class="text-brand font-medium mt-1">$65–$95</p>
      <p class="text-muted text-sm mt-1">35–60 min</p>
      <p class="text-muted text-body-small mt-md flex-grow leading-relaxed">
        A dry pedicure focused on precise foot care and a clean aesthetic result. Includes careful treatment of the skin and soles. Available with gel polish, regular polish, or without coating.
      </p>
    </div>
  </a>

  <a href="/services#nail-art" class="group reveal" style="transition-delay: 0.3s">
    <div class="p-lg border-l-2 border-l-brand rounded-lg bg-white transition-all duration-200 hover:shadow-lg hover:-translate-y-px h-full flex flex-col">
      <h3 class="font-display font-semibold text-h3-mobile lg:text-h3-desktop text-ink">
        Nail Art & Design
      </h3>
      <p class="text-brand font-medium mt-1">$10–$20</p>
      <p class="text-muted text-sm mt-1">Add-on service</p>
      <p class="text-muted text-body-small mt-md flex-grow leading-relaxed">
        Chrome, french, and ombré applied as add-ons to any service. Priced per nail detail or full set.
      </p>
    </div>
  </a>
</div>
```

- [ ] **Step 3: Start dev server and verify visually**

```bash
# Run from nails-on-salon directory
cd "h:/Мой диск/6. Training - automation/Projects/nails-on-salon"
npm run dev
```

Open http://localhost:4321 and check:

1. **Desktop (≥1024px):** Manicure card spans full width. Inside it: badge top-left, title+price+duration left column, description right column.
2. **Tablet/mobile (<1024px):** Manicure card is single column — badge, then title+price+duration, then description stacked vertically.
3. **Below Manicure card:** Two equal cards side by side (sm+) or stacked (mobile).
4. **Prices are correct:** Manicure $60–$130, Pedicure $65–$95, Nail Art $10–$20.
5. **Hover effect works** on all three cards (shadow + slight lift).
6. **Reveal animation** fires on scroll for all cards.

Stop the dev server when done (`Ctrl+C`).

- [ ] **Step 4: Commit and push**

```bash
# Run from repo root: h:/Мой диск/6. Training - automation/Projects
git add nails-on-salon/src/pages/index.astro
git commit -m "feat: redesign service cards with featured manicure + correct prices"
git push
```

Expected: push succeeds, Cloudflare Pages starts a new deploy.
