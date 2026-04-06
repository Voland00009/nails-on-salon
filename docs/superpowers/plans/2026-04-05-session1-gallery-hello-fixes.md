# Session 1: Gallery Strip Cleanup + Hello Gorgeous Crop Fix

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove process photos from Gallery Strip and fix photo cropping in Hello Gorgeous section.

**Architecture:** Two surgical edits — one in GalleryStrip.astro (remove 2 imports + 2 array items), one in index.astro (change one CSS class string). Each task is an independent commit.

**Tech Stack:** Astro, Tailwind CSS

**Design spec:** `docs/superpowers/specs/2026-04-05-homepage-enhancement-design.md`

---

### Task A: Remove process photos from Gallery Strip

**Files:**
- Modify: `src/components/GalleryStrip.astro`

**Context:** IMG_3264 and IMG_3265 are "process" photos (Tetiana working on nails). They don't belong in a portfolio gallery — Gallery Strip should only show finished nail art results. After removal, 6 photos remain.

- [ ] **Step 1: Remove process photo imports**

In `src/components/GalleryStrip.astro`, delete these two import lines (lines 9-10):

```diff
- import imgProcess1 from '../assets/hero/IMG_3265.JPG';
- import imgProcess2 from '../assets/hero/IMG_3264.JPG';
```

- [ ] **Step 2: Remove process photos from the array**

In the same file, remove the first two entries from the `photos` array (lines 13-14):

```diff
 const photos = [
-  { src: imgProcess1, alt: 'Tetiana carefully working on a client\'s nails' },
-  { src: imgProcess2, alt: 'Tetiana smiling while doing nail work' },
   { src: img3209, alt: 'Detailed nail polish work' },
   { src: img1043, alt: 'Natural nail care and styling' },
   { src: img3148, alt: 'Professional nail art application' },
   { src: img3206, alt: 'Beautiful pedicure design' },
   { src: img4349, alt: 'Signature nail studio design' },
   { src: img3213, alt: 'Custom nail design' },
 ];
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors or warnings about unused imports.

- [ ] **Step 4: Visual check**

Run: `npm run dev`
Verify: Gallery Strip shows 6 photos (no process photos). Horizontal scroll on mobile, grid on desktop.

- [ ] **Step 5: Commit and push**

```bash
git add src/components/GalleryStrip.astro
git commit -m "fix: remove process photos from Gallery Strip

IMG_3264 and IMG_3265 are process shots, not portfolio pieces.
Gallery Strip now shows only finished nail art (6 photos).

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
git push
```

---

### Task B: Fix photo cropping in Hello Gorgeous

**Files:**
- Modify: `src/pages/index.astro` (line 162, HELLO GORGEOUS section)

**Context:** The Hello Gorgeous photo (IMG_3260) shows Tetiana next to her pink neon "Hello Gorgeous" sign. The fixed height `h-[400px] lg:h-[480px]` plus `object-cover` crops the top of the photo, cutting off the neon sign text. Removing the height constraint lets the photo display at its natural aspect ratio.

- [ ] **Step 1: Change the Image class**

In `src/pages/index.astro`, in the HELLO GORGEOUS section, find the Image component (line 162):

```diff
-            class="w-full h-[400px] lg:h-[480px] object-cover rounded-lg"
+            class="w-full rounded-lg"
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Visual check**

Run: `npm run dev`
Verify:
- Photo shows full height — neon "Hello Gorgeous" sign visible at top
- Photo is proportional (no cropping)
- Layout still looks balanced on both mobile and desktop
- Text block still aligned properly next to photo on desktop

- [ ] **Step 4: Commit and push**

```bash
git add src/pages/index.astro
git commit -m "fix: show Hello Gorgeous photo at natural aspect ratio

Remove fixed height + object-cover that cropped the neon sign.
Photo now displays proportionally with full content visible.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
git push
```

---

## Session 2 Handoff

After completing Tasks A and B, write a prompt for Session 2 (Task C: wayfinding overhaul) that includes all context needed for a fresh conversation.
