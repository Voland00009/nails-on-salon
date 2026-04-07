# Sticky Mobile CTA — Design Spec
**Date:** 2026-04-06
**Task:** Homepage Task 11 — Sticky mobile CTA

## Problem

On mobile, the hero "Book via Instagram" button scrolls off-screen quickly. Between the hero and the footer there's no persistent booking action. Users who scroll past the hero have to scroll all the way back up or all the way down to the footer CTA to book.

## Solution

A fixed bar at the bottom of the screen, visible only on mobile, that appears once the hero CTA has left the viewport and disappears when the footer becomes visible.

## Approach: IntersectionObserver × 2

No scroll event listener. Two observers:

1. **Hero CTA observer** — watches `#hero-cta-wrapper`. When it leaves the viewport, show the bar. When it returns, hide the bar.
2. **Footer observer** — watches `<footer>`. When it enters the viewport, hide the bar. When it leaves, restore visibility (if hero CTA is still gone).

**State logic:**
```
show bar = heroCtaGone && !footerVisible
```

This means:
- Page loads → bar is hidden (hero CTA is visible)
- User scrolls past hero → bar slides up into view
- User scrolls to footer → bar slides down out of view
- User scrolls back up → bar hides again once hero CTA is back in view

## Component: `src/components/StickyMobileCTA.astro`

**HTML structure:**
```html
<div id="sticky-mobile-cta"
  class="fixed bottom-0 left-0 right-0 z-40 lg:hidden
         translate-y-full transition-transform duration-300 ease-out"
  aria-hidden="true"
>
  <div class="bg-white border-t border-border px-5 py-3"
       style="padding-bottom: max(12px, env(safe-area-inset-bottom))">
    <a href={instagramDmUrl} target="_blank" rel="noopener noreferrer"
       tabindex="-1"
       class="inline-flex items-center justify-center gap-2 w-full
              font-body font-medium rounded-pill bg-brand text-ink
              min-h-[48px] px-8 text-ui-medium tracking-[0.03em]
              hover:bg-brand-hover transition-colors duration-200">
      [Instagram SVG icon] Book via Instagram
    </a>
  </div>
</div>
```

**Notes:**
- `translate-y-full` = hidden below screen by default
- Removing `translate-y-full` + adding `translate-y-0` = slides up (300ms)
- `aria-hidden="true"` and `tabindex="-1"` on the link when bar is hidden; both removed when bar is visible
- `env(safe-area-inset-bottom)` handles iPhone home indicator (notch area)
- `z-40` stays below the sticky header (`z-50`) and mobile menu (`z-[60]`)

**JavaScript:**
```js
const bar = document.getElementById('sticky-mobile-cta');
const link = bar.querySelector('a');

let heroCtaGone = false;
let footerVisible = false;

function update() {
  const shouldShow = heroCtaGone && !footerVisible;
  bar.classList.toggle('translate-y-full', !shouldShow);
  bar.classList.toggle('translate-y-0', shouldShow);
  bar.setAttribute('aria-hidden', String(!shouldShow));
  link.setAttribute('tabindex', shouldShow ? '0' : '-1');
}

new IntersectionObserver(([e]) => {
  heroCtaGone = !e.isIntersecting;
  update();
}).observe(document.getElementById('hero-cta-wrapper'));

new IntersectionObserver(([e]) => {
  footerVisible = e.isIntersecting;
  update();
}).observe(document.querySelector('footer'));
```

## Changes to `src/pages/index.astro`

Line 56 — add `id="hero-cta-wrapper"` to the wrapper div around the hero InstagramCTA:

```astro
<!-- Before -->
<div class="mt-xl animate-hero-text" style="animation-delay: 0.2s">
  <InstagramCTA variant="primary" />
</div>

<!-- After -->
<div id="hero-cta-wrapper" class="mt-xl animate-hero-text" style="animation-delay: 0.2s">
  <InstagramCTA variant="primary" />
</div>
```

The `<StickyMobileCTA />` import and usage on lines 8 and 281 are already in place.

## Files Changed

| File | Change |
|------|--------|
| `src/components/StickyMobileCTA.astro` | Create new component |
| `src/pages/index.astro` | Add `id="hero-cta-wrapper"` to div on line 56 |

## Out of Scope

- Desktop behavior (bar is `lg:hidden`, invisible on desktop)
- Other pages (only index.astro uses this component)
- Scroll direction detection (not needed with IntersectionObserver approach)
