# Design Spec: Service Cards Redesign (Task 7)

**Date:** 2026-04-06  
**File scope:** `src/pages/index.astro` only  
**Status:** Approved

---

## Problem

The "Featured Services" section on the homepage has three visually identical cards — same size, same border weight, same typography. There is no visual hierarchy. The copywriting is generic and the price ranges are wrong (don't match actual service content files).

---

## Design Decisions

### Layout: Option C — Featured full-width + 2-column grid below

- **Manicure** → full-width featured card with two internal columns:
  - Left column: "Signature Service" badge, heading, price range, duration
  - Right column: description text
  - Border: `border-l-[3px]` (thicker than supporting cards)
- **Pedicure + Nail Art & Design** → standard 2-column grid below
  - Border: `border-l-2` (unchanged from current)

### Visual hierarchy signals

| Element | Featured (Manicure) | Supporting cards |
|---|---|---|
| Grid span | Full width (col 1–3) | 1 column each |
| Internal layout | 2-column (meta + desc) | Single column stack |
| Border left | 3px | 2px |
| Heading size | `text-h3-mobile lg:text-h2-desktop` (larger on desktop only) | `text-h3-mobile lg:text-h3-desktop` |
| Badge | "Signature Service" (brand bg) | None |

### Copy tone: Professional / technical

Descriptions use specific terminology from Tanya's own service content files where available.

---

## Content (corrected from real service data)

### Manicure (featured)
- **Price:** $60–$130 *(was $45–$65 — wrong)*
- **Duration:** 30 min – 3 hrs *(was 30–45 min — wrong)*
- **Description:** "Structured dry manicure services from hygienic basics to hard gel overlay and extensions. Includes detailed cuticle care, precise nail shaping, and gel leveling to create a smooth, even surface. The goal is a natural, polished look that grows out beautifully and stays neat for weeks."
  - Source: adapted from `hard-gel-overlay.md` description, first sentence broadened to cover the full category

### Pedicure
- **Price:** $65–$95 *(was $55–$75 — wrong)*
- **Duration:** 35–60 min *(was 45–60 min — wrong)*
- **Description:** "A dry pedicure focused on precise foot care and a clean aesthetic result. Includes careful treatment of the skin and soles. Available with gel polish, regular polish, or without coating."
  - Source: adapted from `smart-touch-pedicure-gel.md` description

### Nail Art & Design
- **Price:** $10–$20 *(was "Custom Pricing" — imprecise)*
- **Duration:** "Add-on service" *(was "Varies")*
- **Description:** "Chrome, french, and ombré applied as add-ons to any service. Priced per nail detail or full set."
  - Source: written from scratch (no description in `design.md`)

---

## Implementation scope

**One file only: `src/pages/index.astro`**, lines 70–112 (the service cards grid).

Replace the current `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` with:
1. A featured card element spanning full width (Manicure)
2. A `grid grid-cols-1 sm:grid-cols-2` below it (Pedicure + Nail Art)

**Mobile behavior of featured card:** The two internal columns (meta + description) stack vertically on mobile (`flex-col`), switch to side-by-side on `lg:` (`lg:grid lg:grid-cols-2`). On mobile, the card looks like a regular single-column card with a badge on top.

No changes to:
- `services.astro` — content there is already correct
- `gallery.astro` — out of scope
- Content collection files — data is correct, only homepage display was wrong
- Any components

---

## What does NOT change

- The "View All Services" CTA button — style and position unchanged
- Section heading "Featured Services" — unchanged
- Hover effects, reveal animations, links — unchanged
- Overall section background and padding — unchanged
