# Nails On Salon — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 4-page static website for Nails On Salon (nail salon in National City, CA) — Home, Services, Gallery, Book — with WCAG 2.1 AA compliance, Lighthouse Performance >= 90, Accessibility >= 95.

**Architecture:** Astro 4.x SSG with Tailwind CSS, zero client JS by default (only lightbox + mobile menu as Astro islands). Content editable via markdown files (Content Collections). Deployed on Cloudflare Pages.

**Tech Stack:** Astro 4.x, TypeScript strict, Tailwind CSS, Sharp (AVIF/WebP), Cloudflare Pages

**Key Sources:**
- `CLAUDE.md` — brand tokens, constraints
- `INFO.md` — services, prices, texts, photo assets
- `tasks/design-plan.md` — approved visual design
- `tasks/prd-nailsonsalon-website.md` — PRD with 19 user stories

---

## File Structure

```
nails-on-salon/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── og-image.jpg
├── src/
│   ├── assets/
│   │   ├── hero/           ← IMG_3260.JPG, IMG_3259.JPG
│   │   ├── work/           ← 8 portfolio photos (JPG)
│   │   ├── salon/          ← IMG_9975.jpg, IMG_4535.JPG, IMG_0247.JPG
│   │   ├── phenix/         ← IMG_3266.JPG, IMG_3268.JPG
│   │   └── logos/          ← logo_black.png, logo_white.png
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── MobileMenu.astro      ← Astro island (client:load)
│   │   ├── ServiceCard.astro
│   │   ├── ServiceCardCompact.astro
│   │   ├── InstagramCTA.astro
│   │   ├── GoogleMap.astro
│   │   ├── GalleryGrid.astro
│   │   ├── GalleryStrip.astro
│   │   ├── Lightbox.astro         ← Astro island (client:visible)
│   │   ├── BookingSteps.astro
│   │   └── SectionCTA.astro
│   ├── content/
│   │   ├── config.ts
│   │   ├── services/              ← 11 markdown files
│   │   └── site/                  ← hero.md, about-technique.md, about-products.md, booking-instructions.md
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── services.astro
│   │   ├── portfolio.astro
│   │   └── book.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
└── DEPLOY.md
```

---

## Task 1: Инициализация Astro-проекта

**User Stories:** US-001
**Цель:** Создать рабочий Astro-проект с Tailwind, шрифтами и CSS-переменными.

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`, `src/styles/global.css`
- Create: `.gitignore`

### Шаги

- [ ] **Step 1: Инициализировать Astro-проект**

```bash
cd nails-on-salon
npm create astro@latest . -- --template minimal --typescript strict --no-git
```

Если спросит — выбрать: TypeScript strict, install dependencies — yes.

- [ ] **Step 2: Установить зависимости**

```bash
npm install @astrojs/tailwind tailwindcss @astrojs/sitemap sharp
```

**Почему эти пакеты:**
- `@astrojs/tailwind` — интеграция Tailwind с Astro
- `tailwindcss` — CSS-фреймворк
- `@astrojs/sitemap` — автогенерация sitemap.xml
- `sharp` — обработка изображений (AVIF/WebP)

- [ ] **Step 3: Настроить `astro.config.mjs`**

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://nailsonsalon.com', // placeholder — обновить после регистрации домена
  output: 'static',
  integrations: [
    tailwind(),
    sitemap(),
  ],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
```

- [ ] **Step 4: Настроить `tailwind.config.mjs`**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: '#FFC2D1',
        ink: '#1C1018',
        'bg-tint': '#FFF5F7',
        muted: '#6B5B5E',
        gold: '#C4A265',
        border: '#F0E8EB',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
        '5xl': '128px',
      },
      fontSize: {
        'display-mobile': ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-desktop': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1-mobile': ['1.75rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h1-desktop': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h2-mobile': ['1.5rem', { lineHeight: '1.25' }],
        'h2-desktop': ['1.875rem', { lineHeight: '1.25' }],
        'h3-mobile': ['1.125rem', { lineHeight: '1.3', letterSpacing: '0.02em' }],
        'h3-desktop': ['1.25rem', { lineHeight: '1.3', letterSpacing: '0.02em' }],
        'body-desktop': ['1.0625rem', { lineHeight: '1.6' }],
        'body-small': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'ui': ['0.875rem', { lineHeight: '1', letterSpacing: '0.06em' }],
        'ui-desktop': ['0.9375rem', { lineHeight: '1', letterSpacing: '0.06em' }],
      },
      maxWidth: {
        'container-sm': '960px',
        'container-lg': '1120px',
      },
      borderRadius: {
        'pill': '9999px',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 5: Создать `src/styles/global.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-brand: #FFC2D1;
    --color-ink: #1C1018;
    --color-bg: #FFFFFF;
    --color-bg-tint: #FFF5F7;
    --color-muted: #6B5B5E;
    --color-gold: #C4A265;
    --color-border: #F0E8EB;

    --space-xs: 4px;
    --space-sm: 8px;
    --space-md: 16px;
    --space-lg: 24px;
    --space-xl: 32px;
    --space-2xl: 48px;
    --space-3xl: 64px;
    --space-4xl: 96px;
    --space-5xl: 128px;
  }

  html {
    font-family: 'DM Sans', sans-serif;
    color: var(--color-ink);
    scroll-behavior: smooth;
  }

  body {
    font-size: 16px;
    line-height: 1.6;
  }

  @media (min-width: 1024px) {
    body {
      font-size: 17px;
    }
  }

  /* Focus indicators — WCAG requirement */
  :focus-visible {
    outline: 2px solid var(--color-ink);
    outline-offset: 3px;
  }

  /* Reduced motion — WCAG requirement */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}

/* Google Fonts — Cormorant Garamond + DM Sans */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@400;500&display=swap');
```

**Важно:** `@import` для Google Fonts должен быть в начале файла. Если Astro/Tailwind его не подхватит — перенести в `<head>` BaseLayout (Task 3).

- [ ] **Step 6: Создать структуру папок**

```bash
mkdir -p src/assets/hero src/assets/work src/assets/salon src/assets/phenix src/assets/logos
mkdir -p src/components src/content/services src/content/site src/layouts src/pages src/styles
mkdir -p public
```

- [ ] **Step 7: Скопировать фото-ассеты в `src/assets/`**

Скопировать JPG/PNG файлы из `assets/` в `src/assets/`:

```bash
# Hero photos
cp "assets/Hero/IMG_3259.JPG" src/assets/hero/
cp "assets/Hero/IMG_3260.JPG" src/assets/hero/

# Portfolio (My work)
cp "assets/My work/IMG_0013.jpg" src/assets/work/
cp "assets/My work/IMG_1043.JPG" src/assets/work/
cp "assets/My work/IMG_3148.jpg" src/assets/work/
cp "assets/My work/IMG_3206.jpg" src/assets/work/
cp "assets/My work/IMG_3209.jpg" src/assets/work/
cp "assets/My work/IMG_3213.jpg" src/assets/work/
cp "assets/My work/IMG_3221.jpg" src/assets/work/
cp "assets/My work/IMG_4349.JPG" src/assets/work/

# Salon
cp "assets/Salon/IMG_9975.jpg" src/assets/salon/
cp "assets/Salon/IMG_4535.JPG" src/assets/salon/
cp "assets/Salon/IMG_0247.JPG" src/assets/salon/

# Phenix
cp "assets/Phenix/IMG_3266.JPG" src/assets/phenix/
cp "assets/Phenix/IMG_3268.JPG" src/assets/phenix/

# Logos
cp "assets/Logos/logo_black.png" src/assets/logos/
cp "assets/Logos/logo_white.png" src/assets/logos/
```

**Примечание:** Если в `assets/` лежат HEIC-файлы — их пропускаем. Используем только JPG/PNG. По INFO.md HEIC-конвертация уже выполнена.

- [ ] **Step 8: Обновить `.gitignore`**

```
node_modules/
dist/
.astro/
.DS_Store
```

- [ ] **Step 9: Создать минимальную страницу для проверки**

Создать `src/pages/index.astro`:

```astro
---
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Nails On Salon</title>
  </head>
  <body class="font-body text-ink">
    <h1 class="font-display text-display-mobile lg:text-display-desktop text-center mt-4xl">
      Nails On Salon
    </h1>
    <p class="text-center text-muted mt-lg">Project initialized successfully</p>
  </body>
</html>
```

- [ ] **Step 10: Проверить сборку**

```bash
npm run dev
```

Открыть `http://localhost:4321` в браузере. Должна отображаться страница с заголовком "Nails On Salon" правильным шрифтом (Cormorant Garamond) и розоватым muted текстом.

```bash
npm run build
```

Expected: Build succeeds, output in `dist/`.

- [ ] **Step 11: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tailwind.config.mjs tsconfig.json .gitignore src/styles/global.css src/pages/index.astro
git commit -m "feat: initialize Astro project with Tailwind CSS, fonts, and design tokens

US-001: project scaffolding with brand colors, typography scale,
spacing system, and WCAG reduced-motion support"
```

**Checkpoint:** `npm run build` проходит без ошибок. Dev server показывает страницу с правильными шрифтами и цветами.

---

## Task 2: Content Collections — услуги и тексты

**User Stories:** US-003, US-004
**Цель:** Настроить Astro Content Collections для услуг (11 markdown-файлов) и текстов страниц (4 файла). Tetiana сможет редактировать цены и тексты без знания кода.

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/services/*.md` (11 files)
- Create: `src/content/site/*.md` (4 files)

### Шаги

- [ ] **Step 1: Создать `src/content/config.ts`**

```typescript
import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    price: z.number(),
    priceMax: z.number().optional(),
    duration: z.string().optional(),
    category: z.enum(['manicure', 'pedicure', 'additional']),
    includes: z.string().optional(),
    description: z.string().optional(),
    signature: z.boolean().default(false),
    sortOrder: z.number(),
  }),
});

const site = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { services, site };
```

**Почему `z.object`:** Zod-схема валидирует frontmatter при билде. Если Tetiana ошибётся в формате — получит понятную ошибку вместо сломанного сайта.

- [ ] **Step 2: Создать markdown-файлы услуг (Manicure)**

`src/content/services/hard-gel-overlay.md`:
```markdown
---
title: "Hard Gel Overlay"
price: 90
duration: "1.5–2 hrs"
category: "manicure"
includes: "Removal, cuticle care, nail shaping, hard gel, one-color gel polish"
description: "A structured dry manicure designed for a clean, refined, and long-lasting result. Includes detailed cuticle care, precise nail shaping, and gel leveling to create a smooth, even surface. The goal is a natural, polished look that grows out beautifully and stays neat for weeks."
signature: true
sortOrder: 1
---
```

`src/content/services/hard-gel-extensions-medium.md`:
```markdown
---
title: "Hard Gel Extensions Medium"
price: 120
duration: "2–3 hrs"
category: "manicure"
includes: "Removal, cuticle care, nail shaping, medium-length extensions, one-color gel polish"
description: "Extensions created using upper forms and hard gel to build length and shape while keeping the nails lightweight and comfortable. High-quality, low-toxicity hard gel systems that are gentle on the natural nail and provide strong, flexible wear. Medium length."
signature: false
sortOrder: 2
---
```

`src/content/services/hard-gel-extensions-long.md`:
```markdown
---
title: "Hard Gel Extensions Long"
price: 130
category: "manicure"
includes: "Removal, cuticle care, nail shaping, long-length extensions, one-color gel polish"
description: "Extensions created using upper forms and hard gel to build length and shape while keeping the nails lightweight and comfortable. High-quality, low-toxicity hard gel systems that are gentle on the natural nail and provide strong, flexible wear. Long length."
signature: false
sortOrder: 3
---
```

`src/content/services/hygienic-manicure-polish.md`:
```markdown
---
title: "Hygienic Manicure with Regular Polish"
price: 70
duration: "40 min"
category: "manicure"
includes: "Cuticle care, nail shaping, regular polish coating"
signature: false
sortOrder: 4
---
```

`src/content/services/hygienic-manicure.md`:
```markdown
---
title: "Hygienic Manicure"
price: 60
duration: "30 min"
category: "manicure"
includes: "Cuticle care, nail shaping, no polish"
signature: false
sortOrder: 5
---
```

- [ ] **Step 3: Создать markdown-файлы услуг (Pedicure)**

`src/content/services/smart-touch-pedicure-gel.md`:
```markdown
---
title: "Smart Touch Pedicure"
price: 95
duration: "1 hr"
category: "pedicure"
includes: "Dry pedicure with gel polish, massage cream"
description: "A dry pedicure focused on precise foot care and a clean aesthetic result. Includes careful treatment of the skin and soles, helping achieve smooth, well-groomed feet with a natural, fresh appearance. With gel polish finish and massage cream."
signature: true
sortOrder: 1
---
```

`src/content/services/smart-touch-pedicure-polish.md`:
```markdown
---
title: "Smart Touch Pedicure with Regular Polish"
price: 75
duration: "45 min"
category: "pedicure"
includes: "Dry pedicure, regular polish coating"
description: "A dry pedicure focused on precise foot care and a clean aesthetic result. With regular polish finish."
signature: false
sortOrder: 2
---
```

`src/content/services/smart-touch-pedicure-no-coating.md`:
```markdown
---
title: "Smart Touch Pedicure without Coating"
price: 65
duration: "35 min"
category: "pedicure"
includes: "Dry pedicure only"
description: "A dry pedicure focused on precise foot care and a clean aesthetic result. No polish — focuses on skin care and grooming."
signature: false
sortOrder: 3
---
```

- [ ] **Step 4: Создать markdown-файлы услуг (Additional)**

`src/content/services/acrylic-dip-removal.md`:
```markdown
---
title: "Acrylic / Dip Powder Removal"
price: 20
duration: "20 min"
category: "additional"
signature: false
sortOrder: 1
---
```

`src/content/services/gel-removal.md`:
```markdown
---
title: "Gel Removal"
price: 15
duration: "10 min"
category: "additional"
signature: false
sortOrder: 2
---
```

`src/content/services/design.md`:
```markdown
---
title: "Design"
price: 10
priceMax: 20
category: "additional"
includes: "Chrome, french, ombré"
signature: false
sortOrder: 3
---
```

- [ ] **Step 5: Создать markdown-файлы для текстов страниц**

`src/content/site/hero.md`:
```markdown
---
title: "Hero"
---

I specialize in clean, natural-looking manicures that enhance your hands without feeling heavy or artificial. My approach is simple — healthy nails, soft shaping, and a polished look that grows out beautifully. Every service is done with attention to detail, comfort, and long-lasting wear.
```

`src/content/site/about-technique.md`:
```markdown
---
title: "About Technique"
---

I specialize in a gentle dry technique that creates a neat, refined appearance and allows the manicure to grow out cleanly. This method helps maintain a well-groomed look for up to 4–5 weeks with minimal maintenance. The focus is on precision, smooth finish, and a naturally elegant result.
```

`src/content/site/about-products.md`:
```markdown
---
title: "About Products"
---

In my work, I use hard gel systems that are more flexible and nail-friendly, helping to protect the natural nail while providing strength and durability. This allows for a lightweight feel with long-lasting results compared to more aggressive materials.
```

`src/content/site/booking-instructions.md`:
```markdown
---
title: "Booking Instructions"
---

Every appointment takes place in a private, one-on-one suite — no waiting rooms, no distractions. Just you, your master, and a calm, beautiful space designed for relaxation.
```

- [ ] **Step 6: Проверить, что Content Collections валидируются**

```bash
npm run build
```

Expected: Build succeeds. Если есть ошибка типа "Invalid frontmatter" — проверить кавычки и типы данных в markdown-файлах.

- [ ] **Step 7: Commit**

```bash
git add src/content/
git commit -m "feat: add content collections for services and site texts

US-003: 11 service markdown files with Zod schema validation
US-004: 4 site text files (hero, technique, products, booking)"
```

**Checkpoint:** `npm run build` проходит. Все 11 услуг и 4 текста валидируются Zod-схемой.

---

## Task 3: BaseLayout + Header + Footer

**User Stories:** US-002
**Цель:** Создать общий layout для всех страниц с sticky header (frosted glass), мобильным меню и тёмным footer.

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/MobileMenu.astro`
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

### Шаги

- [ ] **Step 1: Создать `src/layouts/BaseLayout.astro`**

```astro
---
interface Props {
  title: string;
  description: string;
  ogImage?: string;
}

const { title, description, ogImage = '/og-image.jpg' } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalURL} />

    <!-- Open Graph -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={new URL(ogImage, Astro.site)} />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:type" content="website" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@400;500&display=swap"
      rel="stylesheet"
    />

    <!-- Favicon -->
    <link rel="icon" href="/favicon.ico" />
  </head>
  <body class="font-body text-ink bg-white">
    <!-- Skip to content — WCAG requirement -->
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-ink focus:underline"
    >
      Skip to main content
    </a>

    <Header currentPath={Astro.url.pathname} />

    <main id="main">
      <slot />
    </main>

    <Footer />
  </body>
</html>

<script>
  import '../styles/global.css';
</script>
```

**Важно:** Убрать `@import url(...)` из `global.css` — шрифты теперь подключены через `<link>` в `<head>` (быстрее, не блокирует рендер).

Обновить `src/styles/global.css` — удалить строку `@import url('https://fonts.googleapis.com/...')`.

- [ ] **Step 2: Создать `src/components/Header.astro`**

```astro
---
import { Image } from 'astro:assets';
import logoBlack from '../assets/logos/logo_black.png';

interface Props {
  currentPath: string;
}

const { currentPath } = Astro.props;

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/book', label: 'Book' },
];

function isActive(href: string, current: string): boolean {
  if (href === '/') return current === '/';
  return current.startsWith(href);
}
---

<header class="sticky top-0 z-50 min-h-[72px] lg:min-h-[72px] bg-white/95 backdrop-blur-sm border-b border-border">
  <div class="mx-auto max-w-container-lg px-5 sm:px-10 h-16 lg:h-[72px] flex items-center justify-between">
    <!-- Logo -->
    <a href="/" aria-label="Nails On Salon — Home">
      <Image
        src={logoBlack}
        alt="Nails On Salon"
        height={32}
        class="h-8 lg:h-10 w-auto"
        loading="eager"
      />
    </a>

    <!-- Desktop nav -->
    <nav aria-label="Main navigation" class="hidden lg:flex items-center gap-8">
      {navLinks.map(link => (
        <a
          href={link.href}
          class:list={[
            'font-body font-medium text-ui uppercase text-ink transition-colors duration-200',
            link.label === 'Book'
              ? 'bg-brand text-ink px-5 py-2 rounded-pill hover:bg-[#FFB3C6]'
              : 'relative hover:text-ink group',
            isActive(link.href, currentPath) && link.label !== 'Book'
              ? 'underline decoration-brand decoration-2 underline-offset-4'
              : '',
          ]}
          {...(isActive(link.href, currentPath) ? { 'aria-current': 'page' } : {})}
        >
          {link.label}
          {link.label !== 'Book' && !isActive(link.href, currentPath) && (
            <span class="absolute left-0 -bottom-1 h-0.5 w-0 bg-brand transition-all duration-300 ease-out group-hover:w-full" />
          )}
        </a>
      ))}
    </nav>

    <!-- Mobile hamburger -->
    <button
      id="mobile-menu-toggle"
      type="button"
      class="lg:hidden flex flex-col justify-center items-end gap-[5px] w-12 h-12"
      aria-label="Open menu"
      aria-expanded="false"
      aria-controls="mobile-menu"
    >
      <span class="block h-0.5 w-[22px] bg-ink transition-transform duration-300" id="hamburger-top"></span>
      <span class="block h-0.5 w-[22px] bg-ink transition-opacity duration-300" id="hamburger-mid"></span>
      <span class="block h-0.5 w-[16px] bg-ink transition-transform duration-300" id="hamburger-bot"></span>
    </button>
  </div>

  <!-- Mobile menu overlay -->
  <div
    id="mobile-menu"
    class="fixed inset-0 z-40 hidden lg:hidden"
    role="dialog"
    aria-modal="true"
    aria-label="Navigation menu"
  >
    <!-- Backdrop -->
    <div id="mobile-menu-backdrop" class="absolute inset-0 bg-ink/30"></div>

    <!-- Panel -->
    <div
      id="mobile-menu-panel"
      class="absolute right-0 top-0 h-full w-full bg-white flex flex-col items-center justify-center translate-x-full transition-transform duration-300 ease-out"
    >
      <!-- Close button -->
      <button
        id="mobile-menu-close"
        type="button"
        class="absolute top-4 right-5 w-12 h-12 flex items-center justify-center"
        aria-label="Close menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <nav aria-label="Mobile navigation" class="flex flex-col items-center gap-8">
        {navLinks.map((link, i) => (
          <a
            href={link.href}
            class:list={[
              'font-body font-medium text-xl text-ink mobile-nav-link',
              link.label === 'Book'
                ? 'bg-brand px-8 py-3 rounded-pill mt-4'
                : '',
              isActive(link.href, currentPath) ? 'underline decoration-brand decoration-2 underline-offset-4' : '',
            ]}
            style={`transition-delay: ${i * 50}ms`}
            {...(isActive(link.href, currentPath) ? { 'aria-current': 'page' } : {})}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  </div>
</header>

<script>
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const panel = document.getElementById('mobile-menu-panel');
  const backdrop = document.getElementById('mobile-menu-backdrop');
  const closeBtn = document.getElementById('mobile-menu-close');

  function openMenu() {
    menu?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      panel?.classList.remove('translate-x-full');
      panel?.classList.add('translate-x-0');
    });
    toggle?.setAttribute('aria-expanded', 'true');
    closeBtn?.focus();
  }

  function closeMenu() {
    panel?.classList.remove('translate-x-0');
    panel?.classList.add('translate-x-full');
    document.body.style.overflow = '';
    toggle?.setAttribute('aria-expanded', 'false');
    setTimeout(() => menu?.classList.add('hidden'), 300);
    toggle?.focus();
  }

  toggle?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu?.classList.contains('hidden')) {
      closeMenu();
    }
  });

  // Focus trap inside mobile menu
  menu?.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = menu.querySelectorAll<HTMLElement>('a, button');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  });
</script>
```

**Почему inline `<script>`:** Astro автоматически бандлит `<script>` теги в компонентах. Не нужен отдельный JS-файл.

- [ ] **Step 3: Создать `src/components/Footer.astro`**

```astro
---
import { Image } from 'astro:assets';
import logoWhite from '../assets/logos/logo_white.png';

const instagramUrl = 'https://www.instagram.com/nailsonsalon?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services & Pricing' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/book', label: 'Book an Appointment' },
];
---

<footer class="bg-ink text-white/70 font-body text-sm">
  <div class="mx-auto max-w-container-lg px-5 sm:px-10 pt-3xl lg:pt-4xl pb-xl lg:pb-xl">
    <!-- 3-column grid (desktop) / stack (mobile) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 text-center lg:text-left">

      <!-- Brand -->
      <div class="flex flex-col items-center lg:items-start">
        <Image
          src={logoWhite}
          alt="Nails On Salon"
          height={28}
          class="h-7 lg:h-9 w-auto mb-4"
          loading="lazy"
        />
        <p class="max-w-[280px]">
          Private nail studio in National City, CA. Clean techniques, premium materials, personal attention.
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-white font-medium text-xs uppercase tracking-[0.08em] mb-4">Quick Links</h3>
        <nav aria-label="Footer navigation">
          <ul class="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-2 lg:flex-col lg:gap-2">
            {quickLinks.map(link => (
              <li>
                <a href={link.href} class="hover:text-white transition-colors duration-200">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <!-- Contact -->
      <div>
        <h3 class="text-white font-medium text-xs uppercase tracking-[0.08em] mb-4">Contact</h3>
        <address class="not-italic text-xs lg:text-sm leading-relaxed">
          3030 Plaza Bonita Rd<br />
          Unit 1336, Suite 117<br />
          National City, CA 91950
        </address>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 mt-3 text-brand hover:text-white transition-colors duration-200"
          aria-label="Follow Nails On Salon on Instagram (opens in new tab)"
        >
          <!-- Instagram icon (inline SVG) -->
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
          @nailsonsalon
        </a>
      </div>
    </div>

    <!-- Divider + Copyright -->
    <div class="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/50">
      <span>&copy; 2026 Nails On Salon</span>
      <span>CA License: M 368744</span>
    </div>
  </div>
</footer>
```

- [ ] **Step 4: Обновить BaseLayout — подключить Header и Footer**

Добавить импорты в начало `BaseLayout.astro`:
```astro
---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
// ... остальной frontmatter
---
```

- [ ] **Step 5: Обновить `src/pages/index.astro` для использования BaseLayout**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout
  title="Nails On Salon — Premium Nail Studio in National City, CA"
  description="Private nail studio specializing in clean, natural-looking manicures and dry pedicures. Book via Instagram DM."
>
  <section class="py-4xl px-5 text-center">
    <h1 class="font-display text-display-mobile lg:text-display-desktop font-light">
      Coming Soon
    </h1>
    <p class="text-muted mt-lg">Site under construction</p>
  </section>
</BaseLayout>
```

- [ ] **Step 6: Проверить в браузере**

```bash
npm run dev
```

Проверить:
- Header виден с логотипом и навигацией (desktop)
- Hamburger-меню работает (resize < 1024px)
- Footer с тремя колонками, Instagram-ссылка открывает новую вкладку
- Frosted glass эффект при прокрутке
- Focus trap в мобильном меню (Tab циклится внутри)
- Escape закрывает мобильное меню

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 7: Commit**

```bash
git add src/layouts/BaseLayout.astro src/components/Header.astro src/components/Footer.astro src/pages/index.astro src/styles/global.css
git commit -m "feat: add BaseLayout with sticky header and dark footer

US-002: frosted glass header, mobile menu with focus trap,
3-column footer with Instagram link and CA license"
```

**Checkpoint:** Все 4 навигационные ссылки видны. Мобильное меню открывается/закрывается. Footer показывает адрес, Instagram, лицензию. `aria-current="page"` на активной ссылке.

---

## Task 4: Shared Components — ServiceCard и InstagramCTA

**User Stories:** US-005, US-006
**Цель:** Создать переиспользуемые компоненты для услуг и CTA-кнопки.

**Files:**
- Create: `src/components/ServiceCard.astro`
- Create: `src/components/ServiceCardCompact.astro`
- Create: `src/components/InstagramCTA.astro`

### Шаги

- [ ] **Step 1: Создать `src/components/InstagramCTA.astro`**

```astro
---
interface Props {
  variant?: 'primary' | 'secondary';
  hint?: string;
  class?: string;
}

const { variant = 'primary', hint, class: className } = Astro.props;
const isPrimary = variant === 'primary';
---

<div class:list={['flex flex-col items-center', className]}>
  <a
    href="https://ig.me/m/nailsonsalon"
    target="_blank"
    rel="noopener noreferrer"
    class:list={[
      'inline-flex items-center justify-center gap-2 font-body font-medium rounded-pill bg-brand text-ink transition-all duration-200',
      isPrimary
        ? 'px-8 py-4 text-[15px] tracking-[0.03em] min-h-[48px] w-full sm:w-auto hover:bg-[#FFB3C6] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(28,16,24,0.1)] active:translate-y-0 active:shadow-[0_2px_6px_rgba(28,16,24,0.08)]'
        : 'px-6 py-3 text-sm w-full sm:w-auto hover:bg-[#FFB3C6] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(28,16,24,0.1)] active:translate-y-0',
    ]}
  >
    {isPrimary && (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    )}
    {isPrimary ? 'Book via Instagram' : 'Book Now \u2192'}
  </a>

  {hint && (
    <p class="text-muted text-[13px] mt-3 text-center">{hint}</p>
  )}
</div>
```

- [ ] **Step 2: Создать `src/components/ServiceCard.astro`**

```astro
---
interface Props {
  title: string;
  price: number;
  priceMax?: number;
  duration?: string;
  description?: string;
  includes?: string;
  signature?: boolean;
}

const { title, price, priceMax, duration, description, includes, signature = false } = Astro.props;

const priceDisplay = priceMax ? `$${price}\u2013${priceMax}` : `$${price}`;
---

<div
  class:list={[
    'py-lg border-b border-border transition-colors duration-200',
    signature
      ? 'bg-bg-tint pl-lg border-l-[3px] border-l-gold'
      : 'hover:bg-bg-tint',
  ]}
>
  {signature && (
    <span class="block font-body font-medium text-[11px] uppercase tracking-[0.08em] text-gold mb-1">
      Signature
    </span>
  )}

  <!-- Desktop: row layout. Mobile: stack -->
  <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
    <div class="flex-1 min-w-0">
      <h3 class="font-display font-semibold text-h3-mobile lg:text-h3-desktop text-ink">
        {title}
      </h3>
      {/* Mobile: price + duration inline under title */}
      <p class="sm:hidden text-sm text-ink mt-1">
        <span class="font-medium">{priceDisplay}</span>
        {duration && <span class="text-muted"> &middot; {duration}</span>}
      </p>
    </div>

    {/* Desktop: price + duration right-aligned */}
    <div class="hidden sm:flex flex-col items-end flex-shrink-0">
      <span class="font-body font-medium text-lg text-ink">{priceDisplay}</span>
      {duration && <span class="text-body-small text-muted">{duration}</span>}
    </div>
  </div>

  {(description || includes) && (
    <p class="text-body-small text-muted mt-2 line-clamp-2">
      {description || (includes && `Includes: ${includes}`)}
    </p>
  )}
</div>
```

- [ ] **Step 3: Создать `src/components/ServiceCardCompact.astro`**

Для секции "Additional Services" — компактный формат без описаний.

```astro
---
interface Props {
  title: string;
  price: number;
  priceMax?: number;
  duration?: string;
  includes?: string;
}

const { title, price, priceMax, duration, includes } = Astro.props;
const priceDisplay = priceMax ? `$${price}\u2013${priceMax}` : `$${price}`;
const priceAndDuration = duration ? `${priceDisplay} \u00b7 ${duration}` : priceDisplay;
---

<div class="flex flex-col sm:flex-row sm:justify-between py-md border-b border-border">
  <span class="text-ink">
    {title}
    {includes && <span class="text-muted text-sm"> ({includes})</span>}
  </span>
  <span class="font-medium text-ink text-sm sm:text-base flex-shrink-0 mt-1 sm:mt-0">
    {priceAndDuration}
  </span>
</div>
```

- [ ] **Step 4: Проверить сборку**

```bash
npm run build
```

Expected: Build succeeds (компоненты пока не используются на страницах, но не должны ломать билд).

- [ ] **Step 5: Commit**

```bash
git add src/components/InstagramCTA.astro src/components/ServiceCard.astro src/components/ServiceCardCompact.astro
git commit -m "feat: add ServiceCard and InstagramCTA shared components

US-005: ServiceCard with signature variant (gold border + badge)
US-006: InstagramCTA with primary/secondary variants and hint prop"
```

**Checkpoint:** Компоненты созданы. Билд проходит.

---

## Task 5: Home Page — Hero секция

**User Stories:** US-007
**Цель:** Создать split hero (40% текст / 60% фото) с art direction по breakpoints.

**Files:**
- Modify: `src/pages/index.astro`

### Шаги

- [ ] **Step 1: Реализовать hero-секцию в `src/pages/index.astro`**

```astro
---
import { Image } from 'astro:assets';
import { getEntry } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import InstagramCTA from '../components/InstagramCTA.astro';
import heroImage from '../assets/hero/IMG_3260.JPG';

const heroContent = await getEntry('site', 'hero');
const { Content: HeroText } = await heroContent.render();
---
<BaseLayout
  title="Nails On Salon — Premium Nail Studio in National City, CA"
  description="Private nail studio specializing in clean, natural-looking manicures and dry pedicures. Located in National City, CA. Book via Instagram DM."
>
  <!-- HERO -->
  <section class="bg-white">
    <!-- Mobile: photo on top, text below -->
    <!-- Desktop: text 40% left, photo 60% right -->
    <div class="flex flex-col lg:flex-row lg:items-center lg:min-h-[80vh]">

      <!-- Photo (mobile: first, desktop: second via order) -->
      <div class="lg:order-2 lg:w-[60%] overflow-hidden">
        <Image
          src={heroImage}
          alt="Tetiana in her private nail studio with pink 'Hello Gorgeous' neon sign"
          widths={[640, 768, 1024, 1280, 1536]}
          sizes="(min-width: 1280px) 672px, (min-width: 1024px) 576px, 100vw"
          quality={80}
          loading="eager"
          fetchpriority="high"
          class="w-full h-[70vh] lg:h-full object-cover object-center animate-hero-fade"
        />
      </div>

      <!-- Text -->
      <div class="lg:order-1 lg:w-[40%] px-5 sm:px-10 lg:pr-10 lg:pl-0 py-xl lg:py-5xl">
        <div class="mx-auto max-w-container-lg lg:mx-0 lg:ml-auto lg:max-w-[480px] lg:pr-10">
          <!-- Decorative line -->
          <div class="w-[60px] h-[2px] bg-brand mb-lg animate-hero-text" aria-hidden="true"></div>

          <h1 class="font-display font-light text-display-mobile lg:text-display-desktop text-ink animate-hero-text" style="animation-delay: 0.1s">
            Clean Nails.<br />Gentle Touch.
          </h1>

          <div class="mt-md max-w-[400px] text-ink leading-relaxed animate-hero-text" style="animation-delay: 0.15s">
            <HeroText />
          </div>

          <div class="mt-xl animate-hero-text" style="animation-delay: 0.2s">
            <InstagramCTA variant="primary" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Placeholder for next sections (Tasks 6+) -->
</BaseLayout>
```

- [ ] **Step 2: Добавить CSS-анимации hero в `global.css`**

Добавить в конец `src/styles/global.css`:

```css
/* Hero animations */
@keyframes heroFade {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes heroTextSlide {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-hero-fade {
  animation: heroFade 0.4s ease-out both;
}

.animate-hero-text {
  animation: heroTextSlide 0.4s ease-out both;
}
```

- [ ] **Step 3: Проверить в браузере**

```bash
npm run dev
```

Проверить:
- Desktop: текст слева (40%), фото справа (60%), min-height 80vh
- Mobile: фото сверху (70vh), текст снизу
- Фото fade-in, текст slide-up с задержкой
- CTA кнопка "Book via Instagram" с Instagram иконкой
- `loading="eager"` и `fetchpriority="high"` на hero image (View Source)

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro src/styles/global.css
git commit -m "feat: add hero section with split layout and art-directed image

US-007: 40/60 split hero, responsive crops, CSS fade-in animation,
hero text from content collection, InstagramCTA primary"
```

**Checkpoint:** Hero выглядит как split layout на desktop, стопка на mobile. Фото загружается с eager/high priority. Анимации работают.

---

## Task 6: Home Page — остальные секции

**User Stories:** US-008, US-009, US-010
**Цель:** Добавить Services Teaser, Gallery Strip, Studio & Location на Home Page.

**Files:**
- Modify: `src/pages/index.astro`
- Create: `src/components/GalleryStrip.astro`
- Create: `src/components/GoogleMap.astro`

### Шаги

- [ ] **Step 1: Создать `src/components/GoogleMap.astro`**

```astro
---
interface Props {
  class?: string;
}

const { class: className } = Astro.props;

const mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3356.8!2d-117.1!3d32.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDM5JzAwLjAiTiAxMTfCsDA2JzAwLjAiVw!5e0!3m2!1sen!2sus!4v1';
---

<div class:list={['relative overflow-hidden rounded-xl shadow-[0_2px_8px_rgba(28,16,24,0.06)]', className]}>
  <iframe
    src={mapSrc}
    width="100%"
    height="100%"
    style="border:0"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    title="Nails On Salon location on Google Maps — 3030 Plaza Bonita Rd, National City, CA"
    class="absolute inset-0 w-full h-full"
  ></iframe>
</div>
```

**Примечание:** `mapSrc` — placeholder. Нужно получить правильный embed URL из Google Maps для адреса "3030 Plaza Bonita Rd, Unit 1336, Suite 117, National City, CA 91950". Заменить при реализации.

- [ ] **Step 2: Создать `src/components/GalleryStrip.astro`**

```astro
---
import { Image } from 'astro:assets';

import img1 from '../assets/work/IMG_3209.jpg';
import img2 from '../assets/work/IMG_1043.JPG';
import img3 from '../assets/work/IMG_3148.jpg';
import img4 from '../assets/work/IMG_3206.jpg';
import img5 from '../assets/work/IMG_4349.JPG';
import img6 from '../assets/work/IMG_3213.jpg';

const photos = [
  { src: img1, alt: 'Almond-shaped nails with bold red polish' },
  { src: img2, alt: 'Short rounded nails with French ombre design' },
  { src: img3, alt: 'Stiletto nails with intricate black lace pattern' },
  { src: img4, alt: 'Classic red polish on natural nail shape' },
  { src: img5, alt: 'Short nails with clean French tip design' },
  { src: img6, alt: 'Hot pink gel polish on almond-shaped nails' },
];
---

<section class="bg-bg-tint py-3xl lg:py-4xl">
  <div class="mx-auto max-w-container-lg px-5 sm:px-10 mb-lg">
    <p class="font-body font-medium text-xs uppercase tracking-[0.08em] text-muted">
      Recent Work
    </p>
  </div>

  <!-- Horizontal scroll strip — breaks out of container -->
  <div
    class="flex gap-2 lg:gap-3 overflow-x-auto scroll-snap-x-mandatory scrollbar-none overscroll-x-contain px-5 sm:px-10"
    role="region"
    aria-label="Gallery of recent nail work"
  >
    {photos.map(photo => (
      <div class="flex-shrink-0 w-[280px] lg:w-[320px] scroll-snap-start">
        <div class="aspect-[4/5] overflow-hidden rounded">
          <Image
            src={photo.src}
            alt={photo.alt}
            widths={[320, 400, 640]}
            sizes="320px"
            quality={75}
            loading="lazy"
            class="w-full h-full object-cover transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.02]"
          />
        </div>
      </div>
    ))}
  </div>

  <div class="mx-auto max-w-container-lg px-5 sm:px-10 mt-lg">
    <a href="/portfolio" class="font-body font-medium text-sm text-ink hover:underline">
      See Full Gallery &rarr;
    </a>
  </div>
</section>
```

- [ ] **Step 3: Добавить scroll-snap утилиты в `global.css`**

```css
/* Scroll snap utilities */
.scroll-snap-x-mandatory {
  scroll-snap-type: x mandatory;
}
.scroll-snap-start {
  scroll-snap-align: start;
}
.scrollbar-none {
  scrollbar-width: none;
}
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
```

- [ ] **Step 4: Добавить Services Teaser, Gallery Strip и Studio секции в `index.astro`**

Добавить после hero-секции (перед `</BaseLayout>`):

```astro
  <!-- SERVICES TEASER -->
  <section class="bg-white py-2xl lg:py-4xl">
    <div class="mx-auto max-w-container-lg px-5 sm:px-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-lg">
        <!-- Card 1: Hard Gel Overlay (signature) -->
        <a href="/services" class="block py-lg sm:p-lg border-b sm:border-b-0 border-border sm:border-l-2 sm:border-l-brand transition-colors duration-200 hover:bg-bg-tint">
          <h3 class="font-display font-semibold text-h3-mobile lg:text-h3-desktop text-ink">Hard Gel Overlay</h3>
          <div class="flex items-baseline gap-2 mt-1">
            <span class="font-medium">$90</span>
            <span class="text-sm text-muted">1.5–2 hrs</span>
          </div>
          <p class="text-body-small text-muted mt-2 line-clamp-1">Signature dry manicure for a clean, refined result</p>
        </a>

        <!-- Card 2: Smart Touch Pedicure (signature) -->
        <a href="/services" class="block py-lg sm:p-lg border-b sm:border-b-0 border-border sm:border-l-2 sm:border-l-brand transition-colors duration-200 hover:bg-bg-tint">
          <h3 class="font-display font-semibold text-h3-mobile lg:text-h3-desktop text-ink">Smart Touch Pedicure</h3>
          <div class="flex items-baseline gap-2 mt-1">
            <span class="font-medium">$95</span>
            <span class="text-sm text-muted">1 hr</span>
          </div>
          <p class="text-body-small text-muted mt-2 line-clamp-1">Dry pedicure with gel polish and massage cream</p>
        </a>

        <!-- Card 3: Gel Extensions -->
        <a href="/services" class="block py-lg sm:p-lg border-b sm:border-b-0 border-border sm:border-l-2 sm:border-l-[#E8E0E2] transition-colors duration-200 hover:bg-bg-tint">
          <h3 class="font-display font-semibold text-h3-mobile lg:text-h3-desktop text-ink">Gel Extensions Medium</h3>
          <div class="flex items-baseline gap-2 mt-1">
            <span class="font-medium">$120</span>
            <span class="text-sm text-muted">2–3 hrs</span>
          </div>
          <p class="text-body-small text-muted mt-2 line-clamp-1">Lightweight hard gel extensions with upper forms</p>
        </a>
      </div>

      <div class="mt-xl">
        <a href="/services" class="font-body font-medium text-sm text-ink hover:underline">
          View All Services &amp; Pricing &rarr;
        </a>
      </div>
    </div>
  </section>

  <!-- GALLERY STRIP -->
  <GalleryStrip />

  <!-- STUDIO & LOCATION -->
  <section class="bg-white py-2xl lg:py-4xl">
    <div class="mx-auto max-w-container-lg px-5 sm:px-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-xl lg:gap-2xl items-start">
        <!-- Photo -->
        <div>
          <Image
            src={studioImage}
            alt="Nails On Salon private studio — pink velvet chair, gold mirror, pampas grass, and framed salon logo"
            widths={[400, 640, 800, 1120]}
            sizes="(min-width: 1024px) 560px, calc(100vw - 40px)"
            quality={80}
            loading="lazy"
            class="w-full aspect-[4/5] object-cover rounded-lg"
          />
        </div>

        <!-- Text + Map -->
        <div>
          <p class="font-body text-sm text-muted uppercase tracking-[0.04em] mb-3">
            Suite 117 &middot; Phenix Salon Suites
          </p>
          <h2 class="font-display text-h2-mobile lg:text-h2-desktop text-ink">
            Your Private Studio
          </h2>
          <p class="mt-md leading-relaxed">
            Every appointment takes place in a private, one-on-one suite — no waiting rooms, no distractions. Just you, your master, and a calm, beautiful space designed for relaxation.
          </p>

          <div class="mt-lg aspect-video lg:aspect-video rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(28,16,24,0.06)]">
            <GoogleMap class="w-full h-full" />
          </div>

          <p class="text-sm text-muted mt-3">
            3030 Plaza Bonita Rd, Unit 1336, Suite 117<br />
            National City, CA 91950
          </p>

          <div class="mt-lg">
            <InstagramCTA variant="secondary" />
          </div>
        </div>
      </div>
    </div>
  </section>
```

Добавить импорты в frontmatter `index.astro`:
```astro
import GalleryStrip from '../components/GalleryStrip.astro';
import GoogleMap from '../components/GoogleMap.astro';
import studioImage from '../assets/salon/IMG_9975.jpg';
```

- [ ] **Step 5: Проверить в браузере**

```bash
npm run dev
```

Проверить:
- Services Teaser: 3 карточки в ряд (desktop), стопка (mobile)
- Gallery Strip: горизонтальный скролл, 4:5 portrait фото, ~1.2 карточки видно (сигнал скролла)
- Studio: split layout с фото слева и картой справа
- Все ссылки работают

- [ ] **Step 6: Commit**

```bash
git add src/pages/index.astro src/components/GalleryStrip.astro src/components/GoogleMap.astro src/styles/global.css
git commit -m "feat: complete Home page with teaser, gallery strip, and studio section

US-008: services teaser with 3 cards and signature borders
US-009: full-bleed horizontal scroll gallery strip
US-010: studio photo, Google Maps iframe, secondary CTA"
```

**Checkpoint:** Home page полностью собрана — 4 секции + header/footer. Gallery strip скроллится горизонтально. Карта lazy-loaded.

---

## Task 7: Services Page

**User Stories:** US-011
**Цель:** Создать страницу со всеми 11 услугами, сгруппированными по категориям.

**Files:**
- Create: `src/pages/services.astro`

### Шаги

- [ ] **Step 1: Создать `src/pages/services.astro`**

```astro
---
import { getCollection, getEntry } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import ServiceCard from '../components/ServiceCard.astro';
import ServiceCardCompact from '../components/ServiceCardCompact.astro';
import InstagramCTA from '../components/InstagramCTA.astro';

const allServices = await getCollection('services');
const manicure = allServices
  .filter(s => s.data.category === 'manicure')
  .sort((a, b) => a.data.sortOrder - b.data.sortOrder);
const pedicure = allServices
  .filter(s => s.data.category === 'pedicure')
  .sort((a, b) => a.data.sortOrder - b.data.sortOrder);
const additional = allServices
  .filter(s => s.data.category === 'additional')
  .sort((a, b) => a.data.sortOrder - b.data.sortOrder);

const technique = await getEntry('site', 'about-technique');
const { Content: TechniqueText } = await technique.render();

const products = await getEntry('site', 'about-products');
const { Content: ProductsText } = await products.render();
---
<BaseLayout
  title="Services & Pricing | Nails On Salon"
  description="Full service menu and pricing for Nails On Salon — manicures, pedicures, gel extensions, and nail art. National City, CA."
>
  <!-- PAGE HEADER -->
  <section class="bg-white pt-3xl lg:pt-4xl pb-xl lg:pb-2xl">
    <div class="mx-auto max-w-container-lg px-5 sm:px-10 text-center">
      <div class="max-w-[640px] mx-auto">
        <h1 class="font-display text-h1-mobile lg:text-h1-desktop text-ink">
          Services &amp; Pricing
        </h1>
        <div class="w-10 h-[2px] bg-brand mx-auto mt-md" aria-hidden="true"></div>
        <div class="mt-lg text-center leading-relaxed">
          <TechniqueText />
        </div>
      </div>
    </div>
  </section>

  <!-- MANICURE -->
  <section class="bg-white pb-2xl lg:pb-4xl" aria-labelledby="manicure-heading">
    <div class="mx-auto max-w-container-lg px-5 sm:px-10">
      <h2 id="manicure-heading" class="font-display text-h2-mobile lg:text-h2-desktop text-ink mb-xl">
        Manicure
      </h2>
      {manicure.map(service => (
        <ServiceCard
          title={service.data.title}
          price={service.data.price}
          priceMax={service.data.priceMax}
          duration={service.data.duration}
          description={service.data.description}
          includes={service.data.includes}
          signature={service.data.signature}
        />
      ))}
    </div>
  </section>

  <!-- PEDICURE (tint bg) -->
  <section class="bg-bg-tint py-2xl lg:py-4xl" aria-labelledby="pedicure-heading">
    <div class="mx-auto max-w-container-lg px-5 sm:px-10">
      <h2 id="pedicure-heading" class="font-display text-h2-mobile lg:text-h2-desktop text-ink mb-xl">
        Pedicure
      </h2>
      {pedicure.map(service => (
        <ServiceCard
          title={service.data.title}
          price={service.data.price}
          priceMax={service.data.priceMax}
          duration={service.data.duration}
          description={service.data.description}
          includes={service.data.includes}
          signature={service.data.signature}
        />
      ))}

      <!-- Blockquote about technique -->
      <blockquote class="mt-2xl pl-lg border-l-[3px] border-l-brand">
        <div class="italic text-ink leading-relaxed">
          <ProductsText />
        </div>
        <footer class="mt-3 font-medium text-sm text-muted">
          &mdash; Tetiana, Nails On Salon
        </footer>
      </blockquote>
    </div>
  </section>

  <!-- ADDITIONAL SERVICES -->
  <section class="bg-white py-2xl lg:py-4xl" aria-labelledby="additional-heading">
    <div class="mx-auto max-w-container-lg px-5 sm:px-10">
      <h2 id="additional-heading" class="font-display text-h2-mobile lg:text-h2-desktop text-ink mb-lg">
        Additional Services
      </h2>
      {additional.map(service => (
        <ServiceCardCompact
          title={service.data.title}
          price={service.data.price}
          priceMax={service.data.priceMax}
          duration={service.data.duration}
          includes={service.data.includes}
        />
      ))}
    </div>
  </section>

  <!-- FINAL CTA -->
  <section class="bg-bg-tint py-3xl lg:py-4xl">
    <div class="mx-auto max-w-[480px] px-5 text-center">
      <h2 class="font-display text-h2-mobile lg:text-h2-desktop text-ink">
        Ready to book?
      </h2>
      <p class="text-muted mt-2 mb-xl">
        Write to us on Instagram to schedule your appointment
      </p>
      <InstagramCTA variant="primary" hint="Write 'Hi, I'd like to book...' in DM" />
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Проверить в браузере**

```bash
npm run dev
```

Открыть `/services`. Проверить:
- Page header центрирован, intro из markdown
- Manicure: 5 карточек, Hard Gel Overlay = signature (gold border + badge)
- Pedicure: tint bg, 3 карточки, Smart Touch = signature, blockquote после
- Additional: компактный формат, Design показывает "$10–20"
- Чередование фонов: white → tint → white → tint
- CTA внизу

- [ ] **Step 3: Commit**

```bash
git add src/pages/services.astro
git commit -m "feat: add Services page with all 11 services from content collection

US-011: manicure/pedicure/additional sections, signature variants,
technique blockquote, final CTA"
```

**Checkpoint:** Все 11 услуг отображаются правильно. Цены совпадают с INFO.md. Signature-карточки выделены gold border.

---

## Task 8: Gallery Page с Lightbox

**User Stories:** US-012
**Цель:** Создать страницу с сеткой 8 фото и lightbox на `<dialog>` с swipe и keyboard navigation.

**Files:**
- Create: `src/pages/portfolio.astro`
- Create: `src/components/GalleryGrid.astro`
- Create: `src/components/Lightbox.astro`

### Шаги

- [ ] **Step 1: Создать `src/components/Lightbox.astro`**

Lightbox — единственный компонент с клиентским JS (Astro island).

```astro
---
interface Props {
  images: { src: string; alt: string }[];
}

const { images } = Astro.props;
---

<div id="lightbox-data" data-images={JSON.stringify(images)}></div>

<dialog
  id="lightbox-dialog"
  class="fixed inset-0 w-screen h-screen max-w-none max-h-none m-0 p-0 bg-transparent backdrop:bg-ink/[0.92] backdrop:backdrop-blur-sm"
  aria-label="Photo lightbox"
>
  <div class="relative w-full h-full flex items-center justify-center">
    <!-- Close -->
    <button
      id="lightbox-close"
      type="button"
      class="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 transition-colors text-white"
      aria-label="Close lightbox"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>

    <!-- Previous -->
    <button
      id="lightbox-prev"
      type="button"
      class="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 transition-colors text-white"
      aria-label="Previous photo"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>

    <!-- Next -->
    <button
      id="lightbox-next"
      type="button"
      class="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 transition-colors text-white"
      aria-label="Next photo"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>

    <!-- Image -->
    <img
      id="lightbox-image"
      src=""
      alt=""
      class="max-w-[90vw] max-h-[85vh] object-contain transition-opacity duration-200"
    />

    <!-- Counter -->
    <div id="lightbox-counter" class="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-body">
    </div>
  </div>
</dialog>

<script>
  const dataEl = document.getElementById('lightbox-data');
  const dialog = document.getElementById('lightbox-dialog') as HTMLDialogElement;
  const img = document.getElementById('lightbox-image') as HTMLImageElement;
  const counter = document.getElementById('lightbox-counter')!;
  const closeBtn = document.getElementById('lightbox-close')!;
  const prevBtn = document.getElementById('lightbox-prev')!;
  const nextBtn = document.getElementById('lightbox-next')!;

  const images: { src: string; alt: string }[] = JSON.parse(dataEl?.dataset.images || '[]');
  let current = 0;
  let triggerElement: HTMLElement | null = null;

  // Touch state
  let touchStartX = 0;
  let touchStartY = 0;

  function show(index: number) {
    current = index;
    img.src = images[current].src;
    img.alt = images[current].alt;
    counter.textContent = `${current + 1} / ${images.length}`;
    // Preload adjacent
    [current - 1, current + 1].forEach(i => {
      if (i >= 0 && i < images.length) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = images[i].src;
        document.head.appendChild(link);
      }
    });
  }

  function open(index: number, trigger: HTMLElement) {
    triggerElement = trigger;
    show(index);
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    dialog.close();
    document.body.style.overflow = '';
    triggerElement?.focus();
  }

  function prev() { show((current - 1 + images.length) % images.length); }
  function next() { show((current + 1) % images.length); }

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  // Click on backdrop = close
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) close();
  });

  // Keyboard
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'ArrowRight') next();
    else if (e.key === 'Escape') close();
    // Focus trap
    else if (e.key === 'Tab') {
      const focusable = [closeBtn, prevBtn, nextBtn];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  });

  // Touch/Swipe
  dialog.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  dialog.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      dx > 0 ? prev() : next();
    } else if (dy > 80 && Math.abs(dy) > Math.abs(dx)) {
      close(); // Swipe down = close
    }
  }, { passive: true });

  // Expose open function globally for gallery grid
  (window as any).__lightboxOpen = open;
</script>
```

- [ ] **Step 2: Создать `src/pages/portfolio.astro`**

```astro
---
import { Image } from 'astro:assets';
import BaseLayout from '../layouts/BaseLayout.astro';
import InstagramCTA from '../components/InstagramCTA.astro';
import Lightbox from '../components/Lightbox.astro';

import img1 from '../assets/work/IMG_3209.jpg';
import img2 from '../assets/work/IMG_1043.JPG';
import img3 from '../assets/work/IMG_3148.jpg';
import img4 from '../assets/work/IMG_3206.jpg';
import img5 from '../assets/work/IMG_4349.JPG';
import img6 from '../assets/work/IMG_0013.jpg';
import img7 from '../assets/work/IMG_3213.jpg';
import img8 from '../assets/work/IMG_3221.jpg';

const photos = [
  { src: img1, alt: 'Almond-shaped nails with bold red polish, holding a luxury handbag' },
  { src: img2, alt: 'Short rounded nails with French ombre design' },
  { src: img3, alt: 'Stiletto nails with intricate black lace pattern' },
  { src: img4, alt: 'Classic bold red polish on natural nail shape' },
  { src: img5, alt: 'Short nails with clean French tip design' },
  { src: img6, alt: 'Festive holiday nail design with green and gold accents' },
  { src: img7, alt: 'Hot pink gel polish on almond-shaped nails' },
  { src: img8, alt: 'Hot pink gel polish, alternate angle view' },
];

// For lightbox: need processed image URLs
// Astro Image generates optimized URLs at build time
---
<BaseLayout
  title="Portfolio | Nails On Salon"
  description="Browse the nail art portfolio of Tetiana at Nails On Salon — gel overlays, extensions, French tips, and creative designs."
>
  <!-- PAGE HEADER -->
  <section class="bg-white pt-3xl lg:pt-4xl pb-xl">
    <div class="mx-auto max-w-container-lg px-5 sm:px-10 text-center">
      <h1 class="font-display text-h1-mobile lg:text-h1-desktop text-ink">Portfolio</h1>
      <p class="text-muted mt-3">A selection of recent work</p>
    </div>
  </section>

  <!-- PHOTO GRID -->
  <section class="bg-white pb-2xl lg:pb-4xl" aria-label="Photo gallery">
    <div class="mx-auto max-w-container-lg px-5 sm:px-10">
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2 lg:gap-3">
        {photos.map((photo, index) => (
          <button
            type="button"
            class="aspect-[4/5] overflow-hidden rounded cursor-zoom-in group"
            aria-label={`View photo: ${photo.alt}`}
            data-lightbox-index={index}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              widths={[200, 320, 400, 640]}
              sizes="(min-width: 1280px) 365px, (min-width: 1024px) 312px, (min-width: 640px) 33vw, 50vw"
              quality={75}
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>
    </div>
  </section>

  <!-- FINAL CTA -->
  <section class="bg-bg-tint py-3xl lg:py-4xl">
    <div class="mx-auto max-w-[480px] px-5 text-center">
      <h2 class="font-display text-h2-mobile lg:text-h2-desktop text-ink">
        Love what you see?
      </h2>
      <p class="text-muted mt-2 mb-xl">
        Let's create your perfect nails. Book a session via Instagram.
      </p>
      <InstagramCTA variant="primary" />
    </div>
  </section>

  <!-- LIGHTBOX -->
  <Lightbox images={photos.map((p, i) => ({ src: p.src.src, alt: p.alt }))} />

  <script>
    // Connect grid buttons to lightbox
    document.querySelectorAll('[data-lightbox-index]').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt((btn as HTMLElement).dataset.lightboxIndex || '0');
        (window as any).__lightboxOpen?.(index, btn as HTMLElement);
      });
    });
  </script>
</BaseLayout>
```

**Примечание:** Передача `src` из Astro Image в lightbox — может потребоваться адаптация. `photo.src.src` — это путь к файлу, Astro Image может генерировать другой URL. При реализации проверить, что lightbox получает правильные URL оптимизированных изображений. Если нет — использовать `getImage()` helper из `astro:assets`.

- [ ] **Step 3: Проверить в браузере**

```bash
npm run dev
```

Открыть `/portfolio`. Проверить:
- Grid: 2 колонки (mobile), 3 колонки (tablet/desktop)
- Все 8 фото в правильном порядке, 4:5 aspect ratio
- Hover: scale(1.03) на desktop
- Клик на фото → lightbox открывается
- Стрелки prev/next работают
- Escape закрывает
- Swipe на мобильном (touch)
- Counter "3 / 8" внизу
- Focus возвращается на фото при закрытии

- [ ] **Step 4: Commit**

```bash
git add src/pages/portfolio.astro src/components/Lightbox.astro
git commit -m "feat: add Gallery page with photo grid and dialog-based lightbox

US-012: responsive 2/3-column grid, lightbox with swipe/keyboard nav,
focus trap, scroll lock, preload adjacent images"
```

**Checkpoint:** 8 фото в grid, lightbox с навигацией, swipe, keyboard. `<dialog>` для accessibility.

---

## Task 9: Book Page

**User Stories:** US-013
**Цель:** Создать страницу записи с 3 шагами, большой CTA, About Studio, Location.

**Files:**
- Create: `src/pages/book.astro`

### Шаги

- [ ] **Step 1: Создать `src/pages/book.astro`**

```astro
---
import { Image } from 'astro:assets';
import BaseLayout from '../layouts/BaseLayout.astro';
import InstagramCTA from '../components/InstagramCTA.astro';
import GoogleMap from '../components/GoogleMap.astro';
import tetianaImage from '../assets/hero/IMG_3259.JPG';
import phenixImage from '../assets/phenix/IMG_3268.JPG';

const steps = [
  {
    number: 1,
    title: 'Open Instagram',
    description: 'Tap the button below to open a chat with @nailsonsalon',
  },
  {
    number: 2,
    title: 'Send a Message',
    description: 'Tell us your preferred service and time',
  },
  {
    number: 3,
    title: 'Get Confirmed',
    description: 'Receive confirmation from Tetiana within 24 hours',
  },
];
---
<BaseLayout
  title="Book an Appointment | Nails On Salon"
  description="Book your nail appointment at Nails On Salon via Instagram DM. Located at Phenix Salon Suites, National City, CA."
>
  <!-- BOOKING STEPS -->
  <section class="bg-white pt-3xl lg:pt-4xl pb-3xl lg:pb-4xl">
    <div class="mx-auto max-w-container-lg px-5 sm:px-10 text-center">
      <h1 class="font-display text-h1-mobile lg:text-h1-desktop text-ink">
        Book an Appointment
      </h1>
      <div class="w-10 h-[2px] bg-brand mx-auto mt-md mb-2xl" aria-hidden="true"></div>

      <!-- 3 Steps -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-lg lg:gap-xl max-w-[800px] mx-auto">
        {steps.map((step, i) => (
          <div class="flex flex-col items-center text-center max-w-[320px] mx-auto">
            <!-- Number circle -->
            <div class="w-12 h-12 rounded-full border border-brand flex items-center justify-center mb-md">
              <span class="font-display font-light text-2xl text-ink">{step.number}</span>
            </div>
            <h2 class="font-body font-medium text-base text-ink mb-2">{step.title}</h2>
            <p class="text-sm text-muted leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>

      <!-- CTA -->
      <div class="mt-2xl">
        <InstagramCTA variant="primary" hint="Write 'Hi, I'd like to book...' in DM" />
      </div>
    </div>
  </section>

  <!-- ABOUT STUDIO (tint bg) -->
  <section class="bg-bg-tint py-2xl lg:py-4xl">
    <div class="mx-auto max-w-container-lg px-5 sm:px-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-xl lg:gap-2xl items-center">
        <!-- Photo -->
        <Image
          src={tetianaImage}
          alt="Tetiana standing at Suite 117 entrance in Phenix Salon Suites"
          widths={[400, 640, 800, 1120]}
          sizes="(min-width: 1024px) 560px, calc(100vw - 40px)"
          quality={80}
          loading="lazy"
          class="w-full aspect-[4/5] object-cover rounded-lg"
        />

        <!-- Text -->
        <div>
          <p class="font-body text-sm text-muted uppercase tracking-[0.04em] mb-3">
            Suite 117 &middot; Phenix Salon Suites
          </p>
          <h2 class="font-display text-h2-mobile lg:text-h2-desktop text-ink mb-md">
            Your Private Studio
          </h2>
          <p class="leading-relaxed">
            Every appointment takes place in a private, one-on-one suite — no waiting rooms, no distractions. Just you, your master, and a calm, beautiful space designed for relaxation.
          </p>
          <p class="font-medium text-sm text-muted uppercase tracking-[0.04em] mt-lg">
            By appointment only
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- LOCATION -->
  <section class="bg-white py-2xl lg:py-4xl">
    <div class="mx-auto max-w-container-lg px-5 sm:px-10">
      <!-- Map -->
      <div class="aspect-video sm:aspect-[16/9] mb-2xl">
        <GoogleMap class="w-full h-full" />
      </div>

      <!-- Address + Photo -->
      <div class="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-xl items-start">
        <div>
          <h3 class="font-display text-h2-mobile text-ink mb-md">Find Us</h3>
          <address class="not-italic leading-[1.8]">
            3030 Plaza Bonita Rd<br />
            Unit 1336, Suite 117<br />
            National City, CA 91950
          </address>
          <p class="text-sm text-muted mt-md">Located inside Phenix Salon Suites</p>
          <p class="text-[13px] text-muted mt-3">CA License: M 368744</p>
        </div>

        <Image
          src={phenixImage}
          alt="Phenix Salon Suites building exterior"
          widths={[320, 480, 640]}
          sizes="(min-width: 1024px) 448px, calc(100vw - 40px)"
          quality={75}
          loading="lazy"
          class="w-full aspect-video object-cover rounded-lg max-h-[200px] lg:max-h-none"
        />
      </div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Проверить в браузере**

```bash
npm run dev
```

Открыть `/book`. Проверить:
- 3 шага с номерами в кругах
- Большая CTA кнопка "Book via Instagram" с подсказкой
- About Studio: фото Tetiana + текст
- Location: карта + адрес + фото Phenix
- Лицензия отображается

- [ ] **Step 3: Commit**

```bash
git add src/pages/book.astro
git commit -m "feat: add Book page with 3-step booking flow and location

US-013: booking steps, Instagram CTA, about studio section,
Google Maps, address, Phenix exterior photo, CA license"
```

**Checkpoint:** Все 4 страницы сайта готовы. Навигация работает между всеми страницами.

---

## Task 10: SEO — Meta-теги, JSON-LD, Sitemap

**User Stories:** US-014, US-015, US-016
**Цель:** Добавить OG-теги, JSON-LD structured data, sitemap, robots.txt.

**Files:**
- Modify: `src/layouts/BaseLayout.astro` (уже есть OG-теги)
- Create: `public/robots.txt`
- Modify: `src/pages/index.astro` (JSON-LD)

### Шаги

- [ ] **Step 1: Создать `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://nailsonsalon.com/sitemap-index.xml
```

- [ ] **Step 2: Добавить JSON-LD на главную страницу**

Добавить в `src/pages/index.astro` перед `</BaseLayout>`:

```astro
  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json" set:html={JSON.stringify({
    "@context": "https://schema.org",
    "@type": "NailSalon",
    "name": "Nails On Salon",
    "image": "https://nailsonsalon.com/og-image.jpg",
    "url": "https://nailsonsalon.com",
    "telephone": "",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3030 Plaza Bonita Rd, Unit 1336, Suite 117",
      "addressLocality": "National City",
      "addressRegion": "CA",
      "postalCode": "91950",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 32.65,
      "longitude": -117.10
    },
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "description": "By appointment only"
    },
    "sameAs": [
      "https://www.instagram.com/nailsonsalon"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Nail Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Hard Gel Overlay",
            "description": "Signature dry manicure with gel leveling"
          },
          "price": "90.00",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Smart Touch Pedicure",
            "description": "Dry pedicure with gel polish"
          },
          "price": "95.00",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Hard Gel Extensions Medium",
            "description": "Lightweight extensions with upper forms"
          },
          "price": "120.00",
          "priceCurrency": "USD"
        }
      ]
    }
  })} />
```

**Примечание:** `latitude`/`longitude` — приблизительные. Уточнить при deploy через Google Maps.

- [ ] **Step 3: Создать OG image placeholder**

Создать `public/og-image.jpg` — временно можно скопировать hero-фото и обрезать до 1200x630. Или создать при реализации через Sharp.

```bash
cp src/assets/hero/IMG_3260.JPG public/og-image.jpg
```

(Позже заменить на правильный кроп 1200x630.)

- [ ] **Step 4: Добавить favicon placeholder**

```bash
cp src/assets/logos/logo_black.png public/favicon.ico
```

(Позже конвертировать в настоящий .ico формат.)

- [ ] **Step 5: Проверить sitemap генерацию**

```bash
npm run build
```

Проверить что `dist/sitemap-index.xml` и `dist/sitemap-0.xml` созданы:
```bash
cat dist/sitemap-index.xml
```

Expected: XML с ссылками на все 4 страницы.

- [ ] **Step 6: Commit**

```bash
git add public/robots.txt public/og-image.jpg public/favicon.ico src/pages/index.astro
git commit -m "feat: add SEO — JSON-LD, Open Graph, sitemap, robots.txt

US-014: OG meta tags on all pages via BaseLayout
US-015: JSON-LD NailSalon schema on homepage
US-016: auto-generated sitemap.xml, robots.txt"
```

**Checkpoint:** `npm run build` создаёт sitemap. JSON-LD виден в View Source главной страницы. OG-теги на каждой странице.

---

## Task 11: Accessibility — WCAG 2.1 AA

**User Stories:** US-017
**Цель:** Пройтись по всем страницам и убедиться в WCAG compliance.

**Files:**
- Modify: various components (fixes if needed)

### Шаги

- [ ] **Step 1: Проверить alt-тексты на всех изображениях**

Все `<Image>` и `<img>` должны иметь descriptive `alt`:
- Hero: описание Tetiana и студии
- Portfolio: описание работы (уже добавлено в Task 8)
- Studio: описание обстановки
- Логотипы: `alt="Nails On Salon"`
- Декоративные элементы: `alt=""` или `aria-hidden="true"`

- [ ] **Step 2: Проверить семантический HTML**

Каждая страница должна содержать:
- `<html lang="en">`
- `<header>` с `<nav aria-label="...">`
- `<main id="main">`
- `<footer>`
- `<section aria-labelledby="...">` (или `aria-label`)
- Skip-to-content ссылка (уже в BaseLayout)

- [ ] **Step 3: Проверить контрастность**

По матрице из дизайн-плана:
- `#1C1018` на `#FFFFFF` = 16.5:1 (OK)
- `#1C1018` на `#FFC2D1` = 8.2:1 (OK)
- `#6B5B5E` на `#FFFFFF` = 5.3:1 (OK для обычного текста)
- **НИКОГДА** белый текст на `#FFC2D1` (1.5:1 = FAIL)
- `#C4A265` gold = только декоративный, не для текста

Проверить в коде: нет ли `text-white` на `bg-brand`.

- [ ] **Step 4: Проверить keyboard navigation**

В dev-сервере пройти Tab-ом по каждой странице:
- Все интерактивные элементы доступны через Tab
- Focus visible на каждом элементе (outline 2px solid ink)
- Мобильное меню: focus trap работает
- Lightbox: focus trap работает, Escape закрывает
- CTA кнопки: Enter открывает Instagram

- [ ] **Step 5: Проверить touch targets**

Все кнопки и ссылки ≥ 48x48px (min-h-[48px] или p-3):
- Hamburger button: 48x48
- Mobile nav links: достаточный padding
- CTA buttons: min-height 48px (уже задано)
- Lightbox controls: 48x48

- [ ] **Step 6: Проверить `prefers-reduced-motion`**

Включить reduced motion в OS и проверить:
- Hero fade/slide отключены
- Gallery hover scale отключён
- Lightbox transitions отключены
- Mobile menu slide отключён

- [ ] **Step 7: Запустить Lighthouse Accessibility**

```bash
npm run build && npm run preview
```

Открыть в Chrome, DevTools → Lighthouse → Accessibility.
Target: ≥ 95.

Исправить все findings и повторить.

- [ ] **Step 8: Commit фиксы (если были)**

```bash
git add -u
git commit -m "fix: accessibility improvements for WCAG 2.1 AA compliance

US-017: alt texts, semantic HTML, contrast, keyboard nav,
touch targets, reduced motion"
```

**Checkpoint:** Lighthouse Accessibility ≥ 95 на всех страницах. Keyboard navigation работает. Контрастность соблюдена.

---

## Task 12: Performance

**User Stories:** US-018
**Цель:** Убедиться, что все изображения оптимизированы, lazy-loaded, и метрики достигнуты.

**Files:**
- Review/modify: all pages and components

### Шаги

- [ ] **Step 1: Проверить image loading стратегию**

| Изображение | loading | fetchpriority | quality |
|---|---|---|---|
| Hero IMG_3260 | eager | high | 80 |
| Все остальные фото | lazy | — | 75-80 |
| Google Maps iframe | lazy | — | — |

Убедиться в коде, что ТОЛЬКО hero image имеет `loading="eager"`.

- [ ] **Step 2: Проверить widths и sizes атрибуты**

По таблице из дизайн-плана (секция "Responsive Image Sizes"):
- Hero: `widths={[640, 768, 1024, 1280, 1536]}`
- Portfolio grid: `widths={[200, 320, 400, 640]}`
- Gallery strip: `widths={[320, 400, 640]}`
- Studio: `widths={[400, 640, 800, 1120]}`

- [ ] **Step 3: Проверить client JS bundle**

Только 2 Astro islands с клиентским JS:
1. Mobile menu (inline script в Header)
2. Lightbox (inline script в Lightbox)

Никакого другого JS не должно быть.

- [ ] **Step 4: Запустить Lighthouse Performance**

```bash
npm run build && npm run preview
```

Chrome DevTools → Lighthouse → Performance (mobile).
Target: ≥ 90. LCP ≤ 1.8s. CLS < 0.05.

- [ ] **Step 5: Оптимизировать если нужно**

Возможные оптимизации:
- Если LCP > 1.8s: добавить `<link rel="preload">` для hero image в BaseLayout
- Если CLS > 0.05: проверить, что все images имеют explicit width/height или aspect-ratio
- Если шрифты блокируют: убедиться `font-display: swap`

- [ ] **Step 6: Commit фиксы (если были)**

```bash
git add -u
git commit -m "perf: optimize images and loading for Lighthouse >= 90

US-018: verified eager/lazy loading, image sizes, minimal JS"
```

**Checkpoint:** Lighthouse Performance ≥ 90 (mobile). LCP ≤ 1.8s. CLS < 0.05.

---

## Task 13: Cloudflare Pages — Deployment Setup

**User Stories:** US-019
**Цель:** Подготовить проект к deployment на Cloudflare Pages.

**Files:**
- Create: `DEPLOY.md`
- Verify: `astro.config.mjs`, `package.json`, `.gitignore`

### Шаги

- [ ] **Step 1: Проверить конфигурацию**

`astro.config.mjs`:
- `output: 'static'` (уже есть)
- `site:` — placeholder URL

`package.json` scripts:
- `dev`, `build`, `preview` (созданы при init)

`.gitignore`:
- `node_modules/`, `dist/`, `.astro/`

- [ ] **Step 2: Создать `DEPLOY.md`**

```markdown
# Deployment Guide — Nails On Salon

## Prerequisites

- GitHub account
- Cloudflare account (free tier is fine)

## Steps

### 1. Push to GitHub

Make sure all code is committed and pushed to your GitHub repository.

### 2. Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** → **Create application** → **Pages**
3. Click **Connect to Git** and select your GitHub repository
4. Configure build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `nails-on-salon`
5. Click **Save and Deploy**

### 3. Custom Domain (after domain registration)

1. In Cloudflare Pages project settings → **Custom domains**
2. Add your domain (e.g., nailsonsalon.com)
3. Follow DNS configuration instructions
4. SSL is automatic

### 4. After Domain is Set

Update `astro.config.mjs`:
- Change `site` to your actual domain URL

Update `public/robots.txt`:
- Change sitemap URL to actual domain

Rebuild and redeploy.

## Useful Commands

```bash
npm run dev      # Local development server
npm run build    # Production build
npm run preview  # Preview production build locally
```

## Notes

- Cloudflare Pages free tier: unlimited sites, 500 builds/month
- Auto-deploy on every push to main branch
- Preview deployments for pull requests
```

- [ ] **Step 3: Финальная проверка build**

```bash
npm run build
```

Expected: Build succeeds, output in `dist/`, sitemap generated.

```bash
npm run preview
```

Пройтись по всем 4 страницам, проверить что всё работает.

- [ ] **Step 4: Commit**

```bash
git add DEPLOY.md
git commit -m "docs: add Cloudflare Pages deployment guide

US-019: step-by-step instructions for Cloudflare Pages setup"
```

**Checkpoint:** `npm run build` проходит без ошибок. DEPLOY.md содержит пошаговую инструкцию. Все 4 страницы работают в preview.

---

## Summary

| Task | User Stories | Что делает |
|---|---|---|
| 1 | US-001 | Astro + Tailwind + шрифты + CSS tokens |
| 2 | US-003, US-004 | Content Collections (11 услуг + 4 текста) |
| 3 | US-002 | BaseLayout + Header + Footer |
| 4 | US-005, US-006 | ServiceCard + InstagramCTA |
| 5 | US-007 | Home — Hero секция |
| 6 | US-008, US-009, US-010 | Home — Teaser + Gallery Strip + Studio |
| 7 | US-011 | Services Page (полный прайс) |
| 8 | US-012 | Gallery Page + Lightbox |
| 9 | US-013 | Book Page (3 шага + карта) |
| 10 | US-014, US-015, US-016 | SEO (OG, JSON-LD, sitemap) |
| 11 | US-017 | Accessibility audit (WCAG 2.1 AA) |
| 12 | US-018 | Performance (Lighthouse ≥ 90) |
| 13 | US-019 | Deployment setup (Cloudflare Pages) |

**Порядок выполнения:** строго последовательный (1 → 2 → 3 → ... → 13), каждый task опирается на предыдущий.

---

*Created: 2026-04-01*
*Sources: PRD (tasks/prd-nailsonsalon-website.md), Design Plan (tasks/design-plan.md), CLAUDE.md, INFO.md*
