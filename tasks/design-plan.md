# Design Plan: Nails On Salon — Website

> **Статус:** Готов к ревью
> **Подход:** Hybrid — shared components + page flow maps с конкретными размерами
> **Основа:** PRD (`tasks/prd-nailsonsalon-website.md`), Design Architecture из PRD

---

## Принятые решения

| # | Решение | Выбор | Почему |
|---|---|---|---|
| 1 | Hero layout | **A — Split (40% текст / 60% фото)** | Текст всегда читаемый, accessibility, не нарушает PRD anti-pattern #8 (текст поверх лица) |
| 2 | Структура дизайн-плана | **C — Hybrid** | Shared components описаны один раз + каждая страница как самостоятельный документ |
| 3 | Логотип | **Всегда "NAILS·ON SALON" полностью** | Бренд-стандарт Tetiana — нигде не сокращать, включая мобильный header |

---

## Логотип — Правила

Логотип состоит из двух частей:
1. **Иконка** — стилизованный флакон лака для ногтей (линейная графика)
2. **Текст** — `NAILS·ON SALON` (с interpunct · между NAILS и ON)

**Файлы:**
- `logo_black.png` — для светлого фона (header, белые секции)
- `logo_white.png` — для тёмного фона (footer на `#1C1018`)

**Правила использования:**
- НИКОГДА не сокращать до "NAILS·ON" — всегда полное написание "NAILS·ON SALON"
- Логотип используется как единый `<img>`, не воспроизводится текстом
- Минимальная высота: 40px (desktop header), 32px (mobile header), 36px (desktop footer), 28px (mobile footer)
- В header: ссылка на `/`, `alt="Nails On Salon"`

---

## Shared Components

### 1. Header (Sticky, Frosted Glass)

**Desktop (≥ 1024px):**
- Высота: **72px**, sticky top, `z-index: 50`
- Фон: `rgba(255,255,255,0.95)` + `backdrop-filter: blur(8px)` (frosted glass)
- Bottom border: `1px solid #F0E8EB`
- Container: centered, max-width по breakpoint (960px / 1120px)
- **Слева:** `logo_black.png` (height 40px), ссылка на `/`
- **Справа:** nav-ссылки в ряд, gap 32px
  - Шрифт: DM Sans 500, 14px, uppercase, `letter-spacing: 0.06em`, цвет `#1C1018`
  - Активная страница: underline 2px `#FFC2D1`, `text-underline-offset: 4px`, `aria-current="page"`
  - Hover: underline выезжает слева (width 0→100%), `transition: 0.3s ease`
  - "Book" — стилизована как pill-кнопка: `#FFC2D1` bg, `#1C1018` text, `border-radius: 9999px`, padding `8px 20px`

**Mobile (< 1024px):**
- Высота: **64px**
- Padding: `0 20px`
- **Слева:** `logo_black.png` (height 32px) — полный логотип "NAILS·ON SALON"
- **Справа:** hamburger icon (3 линии, `#1C1018`)
  - Верхние 2 линии: 22px шириной
  - Нижняя линия: 16px (асимметрия = дизайнерская деталь)
  - Touch target: 48×48px
- **Мобильное меню:** fullscreen overlay
  - Белый фон, ссылки центрированы вертикально
  - Slide-in справа: `translateX(100% → 0)`, `0.3s ease-out`
  - Ссылки stagger: delay 0.05s каждая
  - Backdrop: `rgba(28,16,24,0.3)` — клик = закрытие
  - Focus trap внутри, scroll lock на body
  - Закрытие: X-кнопка (на месте hamburger) или swipe right

**CLS prevention:** фиксированная `min-height: 72px` (desktop) / `64px` (mobile) на header wrapper, чтобы контент не прыгал.

---

### 2. Footer

**Desktop (≥ 1024px):**
- Фон: `#1C1018` (ink)
- Padding: **64px** top, **32px** bottom
- Container: centered, max-width по breakpoint
- **3 колонки** (grid: `1fr 1fr 1fr`, gap 40px):
  1. **Brand:** `logo_white.png` (36px height) + краткое описание
  2. **Quick Links:** Home, Services & Pricing, Portfolio, Book an Appointment
  3. **Contact:** Адрес (3 строки), Instagram `@nailsonsalon` (цвет `#FFC2D1`)
- **Divider:** `1px solid rgba(255,255,255,0.1)`, margin-top 40px
- **Copyright row:** flex space-between
  - Слева: `© 2026 Nails On Salon`
  - Справа: `CA License: M 368744` (12px, `rgba(255,255,255,0.5)`)
- Текст: DM Sans 400, 13-14px, `rgba(255,255,255,0.7)`
- Заголовки колонок: DM Sans 500, 12px, uppercase, `letter-spacing: 0.08em`, white
- Link hover: color → `#FFFFFF`, `0.2s ease`
- Instagram: `target="_blank" rel="noopener noreferrer"`

**Mobile (< 1024px):**
- Padding: **48px** top, **24px** bottom, **20px** sides
- Всё центрировано, стопка
- Logo: 28px height
- Quick Links: одна строка через `·` разделители
- Адрес: 2 строки, 12px
- Copyright и license: стопка, 11px

---

### 3. InstagramCTA Button

Единственный способ записи — Instagram DM. Кнопка используется на всех страницах.

**Primary variant** (hero, book page, финальные CTA):
- Ссылка: `https://ig.me/m/nailsonsalon`
- Attributes: `target="_blank" rel="noopener noreferrer"`
- Фон: `#FFC2D1`, текст: `#1C1018`
- Шрифт: DM Sans 500, 15px, `letter-spacing: 0.03em`
- Padding: `16px 32px`, `border-radius: 9999px` (pill)
- Min height: **48px** (touch target)
- Instagram glyph icon (18px) слева, gap 8px
- Текст: **"Book via Instagram"** (не "Book Now" — пользователь должен знать куда перейдёт)
- Hover (`@media (hover: hover)`): bg → `#FFB3C6`, `translateY(-1px)`, `box-shadow: 0 4px 12px rgba(28,16,24,0.1)`
- Active: `translateY(0)`, тень уменьшена
- Focus: `outline: 2px solid #1C1018`, `outline-offset: 3px`
- Mobile: `width: 100%`

**Secondary variant** (inline CTA в секциях):
- Padding: `12px 24px`, font-size 14px
- Без иконки
- Текст: **"Book Now →"**
- Остальное идентично primary

**Опциональная подсказка** (prop): "Write 'Hi, I'd like to book...' in DM" — мелкий текст под кнопкой.

---

## Page Flow Maps

> Каждая страница описана как поток секций сверху вниз.
> Для каждой секции: layout, фон, spacing, конкретные размеры, фото, мобильная адаптация.

### Система чередования фонов (ритм)

Секции чередуют фон для создания визуального ритма:
- `#FFFFFF` (белый) → `#FFF5F7` (tint) → `#FFFFFF` → ...
- **Никогда** два tint подряд
- Full-bleed секции (gallery strip) могут ломать ритм для драмы

### Spacing между секциями

| Breakpoint | Spacing |
|---|---|
| Mobile (< 640px) | 48px (`--space-2xl`) |
| Tablet (640–1023px) | 64px (`--space-3xl`) |
| Desktop (≥ 1024px) | 96px (`--space-4xl`) |

Hero section использует увеличенный spacing: 128px (`--space-5xl`) на desktop.

---

### Home Page (`/`)

**Поток секций:**

```
┌─────────────────────────────────┐
│ [HEADER — sticky, frosted]      │ 72px / 64px
├─────────────────────────────────┤
│                                 │
│ 1. HERO                         │ bg: #FFFFFF
│    Split: text 40% | photo 60%  │
│                                 │
├─────────────────────────────────┤
│                                 │
│ 2. SERVICES TEASER              │ bg: #FFFFFF
│    3 карточки в ряд             │
│                                 │
├─────────────────────────────────┤
│                                 │
│ 3. GALLERY STRIP                │ bg: #FFF5F7
│    Full-bleed, горизонт. scroll │ ← ломает container
│                                 │
├─────────────────────────────────┤
│                                 │
│ 4. STUDIO & LOCATION            │ bg: #FFFFFF
│    2 колонки: фото + текст/карта│
│                                 │
├─────────────────────────────────┤
│ [FOOTER]                        │ bg: #1C1018
└─────────────────────────────────┘
```

**Ритм фонов:** white → white → tint (full-bleed) → white → ink (footer)

#### Секция 1: Hero

**Desktop layout:**
```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  ┌─────────────┐  ┌──────────────────────────────┐   │
│  │ ── (2px pink)│  │                              │   │
│  │              │  │                              │   │
│  │ Display      │  │     IMG_3260.JPG             │   │
│  │ heading      │  │     Tetiana + "Hello          │   │
│  │              │  │     Gorgeous" neon            │   │
│  │ Body text    │  │                              │   │
│  │              │  │                              │   │
│  │ [CTA button] │  │                              │   │
│  │              │  │                              │   │
│  └─────────────┘  └──────────────────────────────┘   │
│      40%                     60%                     │
└──────────────────────────────────────────────────────┘
```

- **Фон:** `#FFFFFF`
- **Min-height:** `80vh` (desktop), `auto` (mobile)
- **Desktop:** flex row, align-items center
  - Left column (40%): padding 0 40px 0 0
    - Декоративная линия: `2px × 60px`, `#FFC2D1`, margin-bottom 24px
    - Heading: Cormorant Garamond 300, **56px** desktop / **36px** mobile, `line-height: 1.1`, `letter-spacing: -0.02em`, color `#1C1018`
    - Body: DM Sans 400, 17px, `line-height: 1.6`, color `#1C1018`, max-width 400px, margin-top 16px
    - CTA: InstagramCTA Primary, margin-top 32px
  - Right column (60%): overflow hidden
    - Image: `object-fit: cover`, `border-radius: 0` (edge-to-edge right)
- **Mobile:** flex column
  - Photo сверху: 70vh height, `object-fit: cover`, aspect-ratio 4:5
  - Text + CTA снизу: padding 32px 20px
- **Art direction (responsive crops):**
  - Mobile: portrait 4:5, Tetiana в центре, неон виден сверху
  - Tablet: 4:3, больше контекста студии
  - Desktop: 16:9, Tetiana правее центра
- **Image:** Astro `<Image>`, `loading="eager"`, `fetchpriority="high"`, widths `[640, 768, 1024, 1280, 1536]`, quality 80
- **Анимация (CSS only):** image fade `opacity: 0→1` за 0.4s, text slide-up 10px с delay 0.1s

#### Секция 2: Services Teaser

- **Фон:** `#FFFFFF`
- **Container:** centered, max-width по breakpoint
- **Spacing:** padding-top/bottom 96px (desktop) / 48px (mobile)
- **Заголовок:** нет отдельного H2 — секция "говорит" через карточки
- **Desktop:** grid 3 колонки, gap 24px
- **Tablet:** grid 2 колонки (3-я карточка полная ширина), gap 16px
- **Mobile:** стопка, gap 0 (карточки разделены border-bottom)
- **3 карточки:**
  1. Hard Gel Overlay (**signature**) — left-border 2px `#FFC2D1`
  2. Smart Touch Pedicure (**signature**) — left-border 2px `#FFC2D1`
  3. Gel Extensions Medium — left-border 2px `#E8E0E2`
- **Каждая карточка:** padding 24px, название (H3 Cormorant 600), цена (DM Sans 500, right-aligned desktop), 1-строчное описание (DM Sans 400, 14px, `#6B5B5E`), стрелка-ссылка
- **Под карточками:** "View All Services & Pricing →" — DM Sans 500, 14px, `#1C1018`, underline on hover

#### Секция 3: Gallery Strip

- **Фон:** `#FFF5F7` (tint)
- **FULL-BLEED** — выходит за container на всю ширину viewport
- **Padding:** 64px top/bottom (desktop) / 32px (mobile)
- **Мини-заголовок:** "Recent Work" — DM Sans 500, 12px, uppercase, `letter-spacing: 0.08em`, `#6B5B5E`, внутри container, margin-bottom 24px
- **Strip:** горизонтальный scroll
  - `overflow-x: auto`, `scroll-snap-type: x mandatory`, `scrollbar-width: none`
  - `overscroll-behavior-x: contain`
  - Items: `scroll-snap-align: start`
- **Mobile:** карточки **280px** шириной, gap **8px**, видно ~1.2 карточки (сигнал скроллинга)
- **Desktop:** карточки **320px** шириной, gap **12px**, выходят за container с обеих сторон
- **Все фото:** aspect-ratio **4:5** (portrait), `object-fit: cover`, `border-radius: 4px`
- **Порядок (курированный):**
  1. IMG_3209.jpg (красные на LV — premium)
  2. IMG_1043.JPG (French ombré)
  3. IMG_3148.jpg (чёрное кружево)
  4. IMG_3206.jpg (красный)
  5. IMG_4349.JPG (French)
  6. IMG_3213.jpg (hot pink)
- **Hover (desktop, `@media (hover: hover)`):** `scale(1.02)`, subtle shadow, `cursor: zoom-in`, `transition: 0.4s cubic-bezier(0.25,0.46,0.45,0.94)`
- **После strip:** "See Full Gallery →" ссылка, внутри container, margin-top 24px
- **Все фото:** Astro `<Image>`, `loading="lazy"`, quality 75

#### Секция 4: Studio & Location

- **Фон:** `#FFFFFF`
- **Container:** centered
- **Spacing:** padding 96px top/bottom (desktop) / 48px (mobile)
- **Desktop:** grid 2 колонки (1fr 1fr), gap 48px, align-items start
- **Mobile:** стопка, gap 32px

**Левая колонка (фото):**
- `Salon/IMG_9975.jpg` — розовое кресло, золотое зеркало, пампас, логотип. **THE brand identity shot.**
- Aspect-ratio: 4:5, `object-fit: cover`, `border-radius: 8px`
- Astro `<Image>`, `loading="lazy"`, quality 80
- Optional: `Phenix/IMG_3266.JPG` ниже (мелкое, aspect 16:9, `border-radius: 8px`)

**Правая колонка (текст + карта):**
- Мета-label: "Suite 117 · Phenix Salon Suites" — DM Sans 400, 14px, `#6B5B5E`, `letter-spacing: 0.04em`, uppercase
- H2: "Your Private Studio" — Cormorant Garamond 400, 30px
- Body text: о приватном suite-опыте, DM Sans 400, 17px
- **Google Maps iframe:**
  - `loading="lazy"`, `border-radius: 12px`
  - `box-shadow: 0 2px 8px rgba(28,16,24,0.06)`
  - Aspect-ratio: 16:9 (desktop), 4:3 (mobile)
  - Width: 100% контейнера
  - Margin-top: 24px
- Адрес текстом: DM Sans 400, 14px, `#6B5B5E`, margin-top 12px
- InstagramCTA Secondary: margin-top 24px

---

### Services Page (`/services`)

**Meta:** `<title>Services & Pricing | Nails On Salon</title>`

**Поток секций:**
```
┌─────────────────────────────────┐
│ [HEADER]                        │
├─────────────────────────────────┤
│ 1. PAGE HEADER                  │ bg: #FFFFFF
│    H1 + декор линия + intro     │
├─────────────────────────────────┤
│ 2. MANICURE                     │ bg: #FFFFFF
│    ServiceCards (5 штук)        │
├─────────────────────────────────┤
│ 3. PEDICURE                     │ bg: #FFF5F7
│    ServiceCards (3) + blockquote│
├─────────────────────────────────┤
│ 4. ADDITIONAL                   │ bg: #FFFFFF
│    Компактный формат (3 строки) │
├─────────────────────────────────┤
│ 5. FINAL CTA                    │ bg: #FFF5F7
│    InstagramCTA                 │
├─────────────────────────────────┤
│ [FOOTER]                        │
└─────────────────────────────────┘
```

**Ритм фонов:** white → white → tint → white → tint → ink (footer)

#### Секция 1: Page Header

- **Фон:** `#FFFFFF`
- **Container:** centered, max-width по breakpoint
- **Padding:** 64px top (desktop) / 48px top (mobile), 48px bottom (desktop) / 32px bottom (mobile)
- **Контент центрирован** (исключение из правила left-align — заголовки страниц центрируются, PRD anti-pattern #9)
- **Max-width текста:** 640px, margin auto

**Содержимое (сверху вниз):**
1. **H1:** "Services & Pricing" — Cormorant Garamond 400, 40px desktop / 28px mobile, `line-height: 1.2`, `letter-spacing: -0.01em`, `#1C1018`
2. **Декоративная линия:** 2px × 40px, `#FFC2D1`, centered, margin-top 16px
3. **Intro текст:** из `about-technique.md` — DM Sans 400, 17px desktop / 16px mobile, `line-height: 1.6`, `#1C1018`, margin-top 24px, text-align center

#### Секция 2: Manicure

- **Фон:** `#FFFFFF`
- **Container:** centered, max-width по breakpoint
- **Padding:** 0 top (продолжает page header), 96px bottom (desktop) / 48px bottom (mobile)

**Содержимое:**
1. **H2:** "Manicure" — Cormorant Garamond 400, 30px desktop / 24px mobile, `line-height: 1.25`, `#1C1018`, left-aligned, margin-bottom 32px
2. **5 ServiceCard** в стопке (все breakpoints), gap 0, разделены `border-bottom: 1px solid #F0E8EB`

**ServiceCard layout:**
```
Desktop:
┌──────────────────────────────────────────────────────┐
│ [Signature]                                    $90   │
│  Hard Gel Overlay                          1.5–2 hrs │
│  Includes removal, cuticle care, nail shaping...     │
└──────────────────────────────────────────────────────┘

Mobile:
┌──────────────────────────────────────────┐
│ [Signature]                              │
│  Hard Gel Overlay                        │
│  $90 · 1.5–2 hrs                         │
│  Includes removal, cuticle care...       │
└──────────────────────────────────────────┘
```

**Каждая ServiceCard:**
- Padding: 24px vertical, 0 horizontal (inside container)
- **Desktop:** flex row, space-between
  - Левая часть (flex: 1): название H3 + описание
  - Правая часть: цена + длительность, text-align right, flex-shrink 0
- **Mobile:** стопка, цена и длительность на одной строке под названием
- **Название (H3):** Cormorant Garamond 600, 20px desktop / 18px mobile, `line-height: 1.3`, `letter-spacing: 0.02em`, `#1C1018`
- **Цена:** DM Sans 500, 18px, `#1C1018`
- **Длительность:** DM Sans 400, 14px, `#6B5B5E`, рядом с ценой через `·`
- **Описание (если есть):** DM Sans 400, 14px, `#6B5B5E`, `line-height: 1.5`, max 2 строки (`-webkit-line-clamp: 2`), margin-top 8px
- **Hover (desktop):** фон → `#FFF5F7`, `transition: background 0.2s ease`

**Hard Gel Overlay — Signature variant (ПЕРВАЯ карточка):**
- Фон: `#FFF5F7`
- Left border: `3px solid #C4A265` (gold)
- Бейдж "Signature" над названием: DM Sans 500, 11px, uppercase, `letter-spacing: 0.08em`, `#C4A265`, margin-bottom 4px
- Hover: фон остаётся (уже tint)

**Порядок карточек:**
1. Hard Gel Overlay — $90 — **signature**
2. Hard Gel Extensions Medium — $120
3. Hard Gel Extensions Long — $130
4. Hygienic Manicure with Regular Polish — $70
5. Hygienic Manicure — $60

#### Секция 3: Pedicure

- **Фон:** `#FFF5F7` (tint) — full-width bg, container centered внутри
- **Padding:** 96px top/bottom (desktop) / 48px (mobile)

**Содержимое:**
1. **H2:** "Pedicure" — Cormorant Garamond 400, 30px desktop / 24px mobile, left-aligned, margin-bottom 32px
2. **3 ServiceCard** — тот же формат, что в Manicure, gap 0, разделены `border-bottom: 1px solid #F0E8EB`
   - Smart Touch Pedicure (gel) — $95 — **signature** (gold left-border + badge)
   - Smart Touch Pedicure (regular polish) — $75
   - Smart Touch Pedicure (no coating) — $65
3. **Blockquote "About This Technique"** после карточек:
   - Margin-top: 48px
   - Left border: `3px solid #FFC2D1`
   - Padding-left: 24px
   - Текст из `about-products.md` — DM Sans 400, 16px, `font-style: italic`, `#1C1018`, `line-height: 1.6`
   - Подпись: "— Tetiana, Nails On Salon" — DM Sans 500, 14px, `#6B5B5E`, margin-top 12px

**Signature карточка на tint bg:** фон карточки = `#FFFFFF` (чтобы выделялась на `#FFF5F7`), gold left-border остаётся.

#### Секция 4: Additional Services

- **Фон:** `#FFFFFF`
- **Container:** centered
- **Padding:** 96px top/bottom (desktop) / 48px (mobile)

**Содержимое:**
1. **H2:** "Additional Services" — Cormorant Garamond 400, 30px desktop / 24px mobile, left-aligned, margin-bottom 24px
2. **Компактный формат** — не карточки, а простые строки:

```
Desktop:
Acrylic / Dip Powder Removal ··················· $20 · 20 min
Gel Removal ···································· $15 · 10 min
Design (chrome, french, ombré) ················· $10–20
```

- Каждая строка: flex row, space-between, padding 16px 0, `border-bottom: 1px solid #F0E8EB`
- **Название:** DM Sans 400, 16px, `#1C1018`
- **Цена + длительность:** DM Sans 500, 16px, `#1C1018`, flex-shrink 0
- **Mobile:** стопка — название сверху, цена + длительность снизу (14px)
- Нет hover, нет описаний — компактность

#### Секция 5: Final CTA

- **Фон:** `#FFF5F7` (tint)
- **Padding:** 96px top/bottom (desktop) / 64px (mobile)
- **Контент центрирован**
- **Max-width:** 480px, margin auto

**Содержимое:**
1. **Текст:** "Ready to book?" — Cormorant Garamond 400, 30px desktop / 24px mobile, text-align center, margin-bottom 8px
2. **Подтекст:** "Write to us on Instagram to schedule your appointment" — DM Sans 400, 16px, `#6B5B5E`, text-align center, margin-bottom 32px
3. **InstagramCTA Primary** — centered, full-width на mobile
4. **Подсказка (опц.):** "Write 'Hi, I'd like to book...' in DM" — DM Sans 400, 13px, `#6B5B5E`, margin-top 12px, text-align center

---

### Gallery Page (`/portfolio`)

**Meta:** `<title>Portfolio | Nails On Salon</title>`

**Поток секций:**
```
┌─────────────────────────────────┐
│ [HEADER]                        │
├─────────────────────────────────┤
│ 1. PAGE HEADER                  │ bg: #FFFFFF
│    H1 "Portfolio" + subtitle    │
├─────────────────────────────────┤
│ 2. PHOTO GRID                   │ bg: #FFFFFF
│    2→3 col, 8 фото, 4:5 ratio  │
├─────────────────────────────────┤
│ 3. FINAL CTA                    │ bg: #FFF5F7
│    "Love what you see?" + CTA   │
├─────────────────────────────────┤
│ [FOOTER]                        │
└─────────────────────────────────┘

+ LIGHTBOX (overlay, <dialog>)
```

**Ритм фонов:** white → white (grid) → tint → ink (footer)

#### Секция 1: Page Header

- **Фон:** `#FFFFFF`
- **Container:** centered, max-width по breakpoint
- **Padding:** 64px top (desktop) / 48px top (mobile), 32px bottom
- **Контент центрирован**

**Содержимое:**
1. **H1:** "Portfolio" — Cormorant Garamond 400, 40px desktop / 28px mobile, `line-height: 1.2`, `#1C1018`
2. **Subtitle:** "A selection of recent work" — DM Sans 400, 17px desktop / 16px mobile, `#6B5B5E`, margin-top 12px

Минимальный header — на этой странице фотографии говорят сами за себя.

#### Секция 2: Photo Grid

- **Фон:** `#FFFFFF`
- **Container:** centered, max-width по breakpoint
- **Padding:** 0 top, 96px bottom (desktop) / 48px bottom (mobile)

**Grid layout:**
- **Mobile (< 640px):** 2 колонки, gap 4px
- **Tablet (640–1023px):** 3 колонки, gap 8px
- **Desktop (≥ 1024px):** 3 колонки, gap 12px

**Каждая ячейка:**
- `aspect-ratio: 4/5` (portrait)
- `overflow: hidden`, `border-radius: 4px`
- Image: `object-fit: cover`, `width: 100%`, `height: 100%`
- `cursor: zoom-in`
- Astro `<Image>`, `loading="lazy"`, quality 75

**8 фото в курированном порядке:**
1. `My work/IMG_3209.jpg` — красные на LV bag (premium lead shot)
2. `My work/IMG_1043.JPG` — French ombré
3. `My work/IMG_3148.jpg` — чёрное кружево
4. `My work/IMG_3206.jpg` — классический красный
5. `My work/IMG_4349.JPG` — French short
6. `My work/IMG_0013.jpg` — Christmas/новогодний дизайн
7. `My work/IMG_3213.jpg` — hot pink
8. `My work/IMG_3221.jpg` — hot pink angle 2

**Grid visual pattern (desktop 3 col):**
```
┌─────┐ ┌─────┐ ┌─────┐
│  1  │ │  2  │ │  3  │
│ 4:5 │ │ 4:5 │ │ 4:5 │
└─────┘ └─────┘ └─────┘
┌─────┐ ┌─────┐ ┌─────┐
│  4  │ │  5  │ │  6  │
│ 4:5 │ │ 4:5 │ │ 4:5 │
└─────┘ └─────┘ └─────┘
┌─────┐ ┌─────┐
│  7  │ │  8  │   (empty)
│ 4:5 │ │ 4:5 │
└─────┘ └─────┘
```

**Hover (desktop, `@media (hover: hover)`):**
- Image: `scale(1.03)`, `transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)`
- Без тени — чистый масштаб

**Alt-тексты (WCAG):**
Каждое фото должно иметь описательный alt, например:
- "Almond-shaped nails with bold red polish, holding a Louis Vuitton bag"
- "Short rounded nails with French ombré design"
- "Stiletto nails with intricate black lace pattern"

#### Lightbox

Открывается по клику на фото в grid. Astro island, `client:visible`.

**HTML:** `<dialog>` элемент для нативной accessibility.

**Backdrop:**
- `rgba(28, 16, 24, 0.92)` — тёплый ink, НЕ чистый чёрный
- `backdrop-filter: blur(4px)` (опционально)

**Фото:**
- Центрировано, `max-width: 90vw`, `max-height: 85vh`
- `object-fit: contain`
- Quality: 85 (выше чем thumbnails)

**Навигация:**
- Стрелки (prev/next): 48×48px touch target, `rgba(255,255,255,0.15)` bg, hover → `rgba(255,255,255,0.3)`
- Позиционирование: по центру вертикально, по бокам фото, gap 16px от краёв
- Close (X): top-right, 48×48px, тот же стиль

**Счётчик:** "3 / 8" — DM Sans 400, 14px, `rgba(255,255,255,0.7)`, bottom center, margin-bottom 24px

**Анимации:**
- Open: fade-in backdrop 0.2s + image `scale(0.9→1)` + `opacity: 0→1`, 0.3s ease-out
- Close: reverse, 0.2s
- Prev/Next slide: image crossfade 0.2s

**Touch/Swipe:**
- Touch events: `touchstart`, `touchmove`, `touchend`
- Threshold: 50px horizontal swipe = navigate
- Image follows finger during swipe (elastic)
- Vertical swipe down > 80px = close

**Keyboard:**
- `ArrowLeft` / `ArrowRight` = prev / next
- `Escape` = close
- `Tab` = циклится: close → prev → next (focus trap)

**Preload:** при открытии lightbox, preload adjacent images (prev + next) через `<link rel="preload" as="image">`

**Scroll lock:** `body { overflow: hidden }` при открытом lightbox. При закрытии — focus возвращается на элемент, который открыл lightbox.

#### Секция 3: Final CTA

- **Фон:** `#FFF5F7` (tint)
- **Padding:** 96px top/bottom (desktop) / 64px (mobile)
- **Контент центрирован**
- **Max-width:** 480px, margin auto

**Содержимое:**
1. **Текст:** "Love what you see?" — Cormorant Garamond 400, 30px desktop / 24px mobile, text-align center
2. **Подтекст:** "Let's create your perfect nails. Book a session via Instagram." — DM Sans 400, 16px, `#6B5B5E`, margin-top 8px, margin-bottom 32px, text-align center
3. **InstagramCTA Primary** — centered, full-width на mobile

---

### Book Page (`/book`)

**Meta:** `<title>Book an Appointment | Nails On Salon</title>`

**Поток секций:**
```
┌─────────────────────────────────┐
│ [HEADER]                        │
├─────────────────────────────────┤
│ 1. BOOKING STEPS                │ bg: #FFFFFF
│    3 шага + большая CTA кнопка  │
├─────────────────────────────────┤
│ 2. ABOUT STUDIO                 │ bg: #FFF5F7
│    Фото Tetiana + текст         │
├─────────────────────────────────┤
│ 3. LOCATION                     │ bg: #FFFFFF
│    Карта + адрес + фото Phenix  │
├─────────────────────────────────┤
│ [FOOTER]                        │
└─────────────────────────────────┘
```

**Ритм фонов:** white → tint → white → ink (footer)

#### Секция 1: Booking Steps + CTA

- **Фон:** `#FFFFFF`
- **Container:** centered, max-width по breakpoint
- **Padding:** 64px top (desktop) / 48px (mobile), 96px bottom (desktop) / 64px (mobile)

**Содержимое (сверху вниз):**

1. **H1:** "Book an Appointment" — Cormorant Garamond 400, 40px desktop / 28px mobile, text-align center, `#1C1018`
2. **Декоративная линия:** 2px × 40px, `#FFC2D1`, centered, margin 16px auto 48px

3. **3 шага в ряд (desktop) / стопка (mobile):**

**Desktop layout:**
```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│     (1)      │    │     (2)      │    │     (3)      │
│              │    │              │    │              │
│  Tap the     │    │  Tell us     │    │  Receive     │
│  button      │    │  your        │    │  confirmation│
│  below       │    │  preferred   │    │  from        │
│              │    │  service     │    │  Tetiana     │
└──────────────┘    └──────────────┘    └──────────────┘
```

- **Desktop:** grid 3 колонки, gap 32px, max-width 800px, margin auto
- **Mobile:** стопка, gap 24px, max-width 320px, margin auto

**Каждый шаг:**
- Text-align: center
- **Номер в круге:** width/height 48px, `border: 1px solid #FFC2D1`, `border-radius: 50%`, display flex center
  - Номер: Cormorant Garamond 300, 24px (2rem), `#1C1018`
  - Margin-bottom: 16px
- **Заголовок шага:** DM Sans 500, 16px, `#1C1018`, margin-bottom 8px
  - Step 1: "Open Instagram"
  - Step 2: "Send a Message"
  - Step 3: "Get Confirmed"
- **Описание:** DM Sans 400, 14px, `#6B5B5E`, `line-height: 1.5`
  - Step 1: "Tap the button below to open a chat with @nailsonsalon"
  - Step 2: "Tell us your preferred service and time"
  - Step 3: "Receive confirmation from Tetiana within 24 hours"

**Между шагами (desktop only):** декоративная пунктирная линия, 1px `#F0E8EB`, горизонтальная, соединяет круги. Скрыта на mobile.

4. **InstagramCTA Primary** — margin-top 48px, centered, full-width на mobile
5. **Подсказка:** "Write 'Hi, I'd like to book...' in DM" — DM Sans 400, 13px, `#6B5B5E`, margin-top 12px, text-align center

6. **Текст из `booking-instructions.md`** (если есть дополнительный контент): DM Sans 400, 16px, `#1C1018`, max-width 600px, margin 32px auto 0, text-align center

#### Секция 2: About Studio

- **Фон:** `#FFF5F7` (tint)
- **Container:** centered, max-width по breakpoint
- **Padding:** 96px top/bottom (desktop) / 48px (mobile)

**Desktop layout:**
```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  ┌──────────────────┐  ┌──────────────────────────┐  │
│  │                  │  │ Suite 117 · Phenix Salon  │  │
│  │  IMG_3259.JPG    │  │                          │  │
│  │  Tetiana at      │  │ Your Private Studio      │  │
│  │  Suite entrance  │  │                          │  │
│  │                  │  │ Text about private       │  │
│  │                  │  │ suite experience...       │  │
│  │                  │  │                          │  │
│  │                  │  │ "By appointment only"     │  │
│  └──────────────────┘  └──────────────────────────┘  │
│         50%                      50%                 │
└──────────────────────────────────────────────────────┘
```

- **Desktop:** grid 2 колонки (1fr 1fr), gap 48px, align-items center
- **Mobile:** стопка, gap 32px, фото сверху

**Левая колонка (фото):**
- `Hero/IMG_3259.JPG` — Tetiana у входа в Suite 117
- Aspect-ratio: 4:5, `object-fit: cover`, `border-radius: 8px`
- Astro `<Image>`, `loading="lazy"`, quality 80
- Alt: "Tetiana standing at Suite 117 entrance in Phenix Salon Suites"

**Правая колонка (текст):**
- **Мета-label:** "Suite 117 · Phenix Salon Suites" — DM Sans 400, 14px, `#6B5B5E`, uppercase, `letter-spacing: 0.04em`, margin-bottom 12px
- **H2:** "Your Private Studio" — Cormorant Garamond 400, 30px desktop / 24px mobile, `#1C1018`, margin-bottom 16px
- **Body:** о приватном suite-опыте — DM Sans 400, 17px desktop / 16px mobile, `#1C1018`, `line-height: 1.6`
  - Примерный текст: "Every appointment takes place in a private, one-on-one suite — no waiting rooms, no distractions. Just you, your master, and a calm, beautiful space designed for relaxation."
- **Акцент:** "By appointment only" — DM Sans 500, 14px, `#6B5B5E`, uppercase, `letter-spacing: 0.04em`, margin-top 24px

#### Секция 3: Location

- **Фон:** `#FFFFFF`
- **Container:** centered, max-width по breakpoint
- **Padding:** 96px top/bottom (desktop) / 48px (mobile)

**Desktop layout:**
```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  ┌──────────────────────────────────────────────┐    │
│  │                                              │    │
│  │            Google Maps iframe                │    │
│  │                                              │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
│  ┌──────────────────────────┐  ┌──────────────────┐  │
│  │ 3030 Plaza Bonita Rd    │  │                  │  │
│  │ Unit 1336, Suite 117    │  │  IMG_3268.JPG    │  │
│  │ National City, CA 91950 │  │  Phenix facade   │  │
│  │                         │  │                  │  │
│  │ Located inside Phenix   │  │                  │  │
│  │ Salon Suites            │  └──────────────────┘  │
│  │                         │                         │
│  │ CA License: M 368744    │                         │
│  └──────────────────────────┘                        │
│         60%                      40%                 │
└──────────────────────────────────────────────────────┘
```

**Google Maps iframe:**
- Full container width, `border-radius: 12px`
- `loading="lazy"`
- `box-shadow: 0 2px 8px rgba(28,16,24,0.06)`
- **Aspect-ratio:** 16:9 (desktop) / 4:3 (mobile)
- Margin-bottom: 48px (desktop) / 32px (mobile)

**Под картой — 2 колонки (desktop) / стопка (mobile):**
- **Desktop:** grid 60% / 40%, gap 32px, align-items start
- **Mobile:** стопка, gap 24px

**Левая часть (адрес):**
- **H3:** "Find Us" — Cormorant Garamond 400, 24px, `#1C1018`, margin-bottom 16px
- **Адрес:** DM Sans 400, 16px, `#1C1018`, `line-height: 1.8`
  - 3030 Plaza Bonita Rd
  - Unit 1336, Suite 117
  - National City, CA 91950
- **Пометка:** "Located inside Phenix Salon Suites" — DM Sans 400, 14px, `#6B5B5E`, margin-top 16px
- **Лицензия:** "CA License: M 368744" — DM Sans 400, 13px, `#6B5B5E`, margin-top 12px

**Правая часть (фото):**
- `Phenix/IMG_3268.JPG` — фасад Phenix Salon Suites
- Aspect-ratio: 16:9, `object-fit: cover`, `border-radius: 8px`
- Max-height: 200px
- Astro `<Image>`, `loading="lazy"`, quality 75
- Alt: "Phenix Salon Suites building exterior"

---

## Responsive Image Sizes

Таблица точных размеров для `sizes` атрибута Astro `<Image>`. Все фото генерируются в AVIF + WebP через Sharp.

### Hero Image (IMG_3260.JPG)

| Breakpoint | Layout | Rendered width | `sizes` hint |
|---|---|---|---|
| Mobile (< 640px) | Full-width, 70vh | 100vw | `100vw` |
| Tablet (640–1023px) | Full-width, 60vh | 100vw | `100vw` |
| Desktop (1024–1279px) | 60% of container (960px) | ~576px | `576px` |
| Wide (≥ 1280px) | 60% of container (1120px) | ~672px | `672px` |

**Widths array:** `[640, 768, 1024, 1280, 1536]`
**Quality:** 80 | **Loading:** `eager` | **Fetchpriority:** `high`

### Portfolio Photos (My work/*.jpg) — Gallery Grid Thumbnails

| Breakpoint | Columns | Gap | Approx. rendered width |
|---|---|---|---|
| Mobile (< 640px) | 2 | 4px | ~(50vw - 22px) ≈ 148px @320w |
| Tablet (640–1023px) | 3 | 8px | ~(33vw - 32px) ≈ 195px @640w |
| Desktop (1024–1279px) | 3 | 12px | ~(960px / 3 - 8px) ≈ 312px |
| Wide (≥ 1280px) | 3 | 12px | ~(1120px / 3 - 8px) ≈ 365px |

**Sizes attr:** `(min-width: 1280px) 365px, (min-width: 1024px) 312px, (min-width: 640px) 33vw, 50vw`
**Widths array:** `[200, 320, 400, 640]`
**Quality:** 75 | **Loading:** `lazy`
**Aspect-ratio:** 4:5 (CSS enforced)

### Portfolio Photos — Lightbox Full Size

**Max rendered:** 90vw × 85vh, `object-fit: contain`
**Widths array:** `[640, 1024, 1536, 2048]`
**Quality:** 85 | **Loading:** lazy (preload adjacent via JS)

### Gallery Strip (Home Page) — Horizontal Scroll

| Breakpoint | Card width | Aspect |
|---|---|---|
| Mobile | 280px | 4:5 |
| Desktop | 320px | 4:5 |

**Sizes attr:** `320px`
**Widths array:** `[320, 400, 640]`
**Quality:** 75 | **Loading:** `lazy`

### Studio Photo (IMG_9975.jpg) — Home Page

| Breakpoint | Layout | Rendered width |
|---|---|---|
| Mobile | Full container - 40px | ~(100vw - 40px) |
| Desktop | 50% of container | ~480px (960px) / ~560px (1120px) |

**Sizes attr:** `(min-width: 1024px) 560px, calc(100vw - 40px)`
**Widths array:** `[400, 640, 800, 1120]`
**Quality:** 80 | **Loading:** `lazy`

### Tetiana Portrait (IMG_3259.JPG) — Book Page

| Breakpoint | Layout | Rendered width |
|---|---|---|
| Mobile | Full container - 40px | ~(100vw - 40px) |
| Desktop | 50% of container | ~480px / ~560px |

**Sizes attr:** `(min-width: 1024px) 560px, calc(100vw - 40px)`
**Widths array:** `[400, 640, 800, 1120]`
**Quality:** 80 | **Loading:** `lazy`

### Phenix Photos

**IMG_3268.JPG (фасад, Book page):**
- Aspect: 16:9, max-height 200px
- Rendered width: ~40% container на desktop ≈ 384–448px
- **Widths:** `[320, 480, 640]` | **Quality:** 75 | **Loading:** `lazy`

**IMG_3266.JPG (лобби, Home page — опциональный):**
- Aspect: 16:9, decorative small
- **Widths:** `[320, 480, 640]` | **Quality:** 75 | **Loading:** `lazy`

---

## Переходы между страницами

Нет кастомных page transitions. Astro по умолчанию делает full page reload (SSG). Это OK для 4-страничного сайта — простота и performance важнее.

Если позже захочется плавности — можно добавить Astro View Transitions (`astro:transitions`), но это out of scope для v1.

---

*Создано: 2026-04-01 | Обновлено: 2026-04-01 | Статус: Готов к ревью*
*Источники: PRD (tasks/prd-nailsonsalon-website.md), CLAUDE.md, INFO.md*
