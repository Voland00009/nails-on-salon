# Instagram URL Centralization & CTA Reduction

**Date:** 2026-04-06  
**Task:** Design Audit Task 6

## Problem

Instagram URL is hardcoded in 4 places with two different variants:
- `https://ig.me/m/nailsonsalon` — in `InstagramCTA.astro`
- `https://www.instagram.com/nailsonsalon?igsh=...` — in `Footer.astro`, `services.astro`, `book.astro`

Homepage has 3 Instagram CTAs (hero, Hello Gorgeous, Studio section) — one too many.

## Design

### Part 1: Centralize URLs

Create `src/config/site.ts`:

```ts
export const instagramDmUrl = 'https://ig.me/m/nailsonsalon';
export const instagramProfileUrl = 'https://www.instagram.com/nailsonsalon?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr';
```

Two constants because they serve different purposes:
- `instagramDmUrl` — opens a DM directly (better UX for booking CTAs)
- `instagramProfileUrl` — links to the profile page (appropriate for Footer social icon)

**Consumer mapping:**
| File | Constant |
|---|---|
| `InstagramCTA.astro` | `instagramDmUrl` |
| `services.astro` | `instagramDmUrl` |
| `book.astro` | `instagramDmUrl` |
| `Footer.astro` | `instagramProfileUrl` |

### Part 2: Reduce Homepage CTAs

Remove `<InstagramCTA variant="primary" />` from the "Hello Gorgeous" section (`index.astro` line ~174).

**Kept CTAs:** Hero (primary) + Studio & Location (secondary) = 2 total.
