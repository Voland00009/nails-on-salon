# PRD: Nails On Salon — Website

## Introduction

Полноценный статичный сайт для независимого мастера маникюра **Nails On Salon** (Tetiana) в National City, California. Это первая точка онлайн-присутствия бизнеса — сайт должен вызывать доверие, показывать работы и цены, и направлять клиентов на запись через Instagram DM.

Сайт строится **с нуля** на Astro 4.x + Tailwind CSS, размещается на Cloudflare Pages (бесплатный tier).

**Визуальная концепция:** «Warm Editorial Luxury» — сайт должен ощущаться как цифровое продолжение визита в студию Tetiana. Тёплая женственность + техническая точность. Розовый бархат + золотые акценты + просторный белый layout. Напоминает высококлассный beauty-editorial в lifestyle-журнале, а НЕ шаблон для салона красоты.

**Важный контекст:** это первый проект разработчика. User stories написаны последовательно — каждая следующая опирается на предыдущую. Рекомендуется выполнять их по порядку.

### Источники данных

| Документ | Назначение |
|---|---|
| `INFO.md` | Source of truth: бизнес-данные, контакты, услуги, цены, описание фото |
| `research_nail_salon_california.md` | Маркетинговый research: рынок, конкуренты, UX-паттерны, SEO, accessibility |
| `CLAUDE.md` | Технические ограничения проекта, бренд-токены, структура |
| `assets/` | Фотографии, логотипы, прайс (подпапки: Hero, My work, Salon, Phenix, Logos, Price) |

### Чего НЕ существует / НЕ использовать

- `index.html`, `index.old` — старые демо-файлы, не являются основой. Разработка с нуля.

---

## Goals

- Создать профессиональный 4-страничный сайт, который позиционирует Nails On Salon как премиального частного мастера
- Обеспечить WCAG 2.1 AA accessibility (юридическое требование в Калифорнии — ADA/Unruh Act)
- Достичь Lighthouse Performance ≥ 90, Accessibility ≥ 95 на мобильных
- Сделать контент (услуги, тексты) редактируемым через markdown-файлы без знания кода
- Настроить deployment на Cloudflare Pages для быстрой публикации
- Обеспечить mobile-first дизайн (70-85% трафика beauty-сайтов — мобильные)

---

## Design Architecture

> Этот раздел — детальная спецификация визуального дизайна. Каждая user story ниже ссылается сюда за конкретными значениями.

### Визуальная концепция

**«Warm Editorial Luxury»** — напряжение между мягкостью и точностью. Работы Tetiana технически точные (чистые линии, идеальный French tip, безупречный гель), но её студия тёплая и мягкая (бархат, пампас, неоновое свечение). Сайт должен отражать это: строгая типографика и дисциплина сетки, обёрнутые в тёплые тона и щедрую фотографию.

**Позиционирование:** Aesop meets Emily in Paris. Не Glossier (слишком casual), не Chanel (слишком холодный). Тёплый. Личный. Возвышенный.

**Запоминающийся элемент:** фотография интерьера IMG_9975.jpg (розовое бархатное кресло, золотое зеркало, пампас, логотип в рамке) — это IS бренд-айдентика, больше чем любой логотип. Она должна быть использована как вторичный hero.

### Цветовая система

| Токен | Hex | Роль | Правила использования |
|---|---|---|---|
| `--color-brand` | `#FFC2D1` | CTA кнопки, тонкие акценты, разделители | Максимум 5% площади страницы. Скудность создаёт роскошь. Никогда не заливать большие секции целиком. |
| `--color-ink` | `#1C1018` | Основной текст, заголовки, фон footer, текст на brand | Рабочая лошадка палитры. ~10% площади. |
| `--color-bg` | `#FFFFFF` | Основной фон страниц | ~80% площади. |
| `--color-bg-tint` | `#FFF5F7` | Чередующиеся секции | Никогда два tint-секции подряд. Создаёт ритм. |
| `--color-muted` | `#6B5B5E` | Мета-текст: длительности, "Starting at", описания | Никогда для основного контента. |
| `--color-gold` | `#C4A265` | Signature-бейджи, декоративные линии | **НОВЫЙ** — вдохновлён золотыми акцентами в студии. 1-2% площади. Только декоративный — НЕ для текста (контраст 2.9:1 на белом = FAIL WCAG). |
| `--color-border` | `#F0E8EB` | Разделители карточек | Тёплый серо-розовый, тонкий. |

**Правило 80/10/5/5:** 80% белый/tint фон → 10% ink (текст + footer) → 5% brand pink (акценты) → 5% фотографии.

**КРИТИЧНО:** `#FFC2D1` — светлый цвет (luminance ~0.62). Белый текст на нём = контраст 1.5:1 — **ПРОВАЛ WCAG**. Текст на `#FFC2D1` **всегда** `#1C1018`. Без исключений.

**КРИТИЧНО для gold:** `#C4A265` на белом = контраст 2.9:1 = FAIL для текста. Использовать ТОЛЬКО как декоративные бордеры, фон бейджей (с тёмным текстом внутри), орнаментальные линии.

### Типографика (Perfect Fourth Scale — ratio 1.333)

| Уровень | Шрифт | Weight | Mobile | Desktop | Line-height | Letter-spacing | Где |
|---|---|---|---|---|---|---|---|
| Display | Cormorant Garamond | 300 (Light) | 2.25rem (36px) | 3.5rem (56px) | 1.1 | -0.02em | Hero headline ТОЛЬКО. Один на страницу max. |
| H1 | Cormorant Garamond | 400 | 1.75rem (28px) | 2.5rem (40px) | 1.2 | -0.01em | Заголовки страниц |
| H2 | Cormorant Garamond | 400 | 1.5rem (24px) | 1.875rem (30px) | 1.25 | 0 | Заголовки секций |
| H3 | Cormorant Garamond | 600 | 1.125rem (18px) | 1.25rem (20px) | 1.3 | 0.02em | Названия услуг, заголовки карточек |
| Body | DM Sans | 400 | 1rem (16px) | 1.0625rem (17px) | 1.6 | 0 | Весь основной текст |
| Body Small | DM Sans | 400 | 0.875rem (14px) | 0.875rem (14px) | 1.5 | 0.01em | Мета-инфо, длительности, подписи |
| UI / Button | DM Sans | 500 | 0.875rem (14px) | 0.9375rem (15px) | 1 | 0.06em | Кнопки, nav-ссылки. UPPERCASE для nav. |

**Почему Cormorant Garamond 300 для Display:** Light weight serif на больших размерах = сигнал журнального editorial. Это то, что отличает от шаблонных сайтов.

**Почему 17px body на десктопе (не 16):** +1px на уровне параграфа значительно улучшает читаемость без ощущения крупности.

**Почему letter-spacing 0.06em на UI:** Слегка разреженный uppercase в навигации = сигнал бутика.

### Система отступов (8px grid)

| Токен | Значение | Где |
|---|---|---|
| `--space-xs` | 4px | Зазоры иконок, inline-элементы |
| `--space-sm` | 8px | Плотный padding, между мета-элементами |
| `--space-md` | 16px | Внутренний padding карточек, между связанными элементами |
| `--space-lg` | 24px | Между карточками, группы формы |
| `--space-xl` | 32px | Между блоками контента внутри секции |
| `--space-2xl` | 48px | Между секциями на мобильных |
| `--space-3xl` | 64px | Между секциями на планшетах |
| `--space-4xl` | 96px | Между секциями на десктопе |
| `--space-5xl` | 128px | Вертикальный padding hero на десктопе |

**Правило роскоши:** Щедрый вертикальный spacing между секциями (96-128px на десктопе) — самый эффективный способ сделать сайт премиальным. Тесные секции = дёшево. Пространство для дыхания = editorial. Это важнее любого выбора цвета или шрифта.

### Container и Grid

| Breakpoint | Container max-width | Боковой padding |
|---|---|---|
| Mobile (< 640px) | 100% | 20px |
| Tablet (640–1023px) | 100% | 40px |
| Desktop (1024–1279px) | 960px | auto (centered) |
| Wide (≥ 1280px) | 1120px | auto (centered) |

12-колонная сетка на десктопе, 6 на планшетах, full-width стопка на мобильных. Ключевые секции (hero, gallery strip) ЛОМАЮТ container и идут edge-to-edge — ритм contained → full-bleed → contained создаёт визуальную драму.

### Breakpoints (Mobile-First)

| Имя | Ширина | Tailwind | Что меняется |
|---|---|---|---|
| Base (mobile) | 0–639px | (none) | Одна колонка, стопка, full-width фото, бургер-меню |
| Tablet | 640–1023px | `sm:` | 2-колоночные сетки, увеличенная типографика, больше padding |
| Desktop | 1024–1279px | `lg:` | Полная навигация, split hero, 3-колоночные сетки, sticky header |
| Wide | ≥ 1280px | `xl:` | Max container width (1120px), самый крупный type scale |

### Контрастность цветов (WCAG verification)

| Комбинация | Ratio | WCAG | Статус |
|---|---|---|---|
| `#1C1018` на `#FFFFFF` | 16.5:1 | AAA | OK |
| `#1C1018` на `#FFC2D1` | 8.2:1 | AAA | OK — поэтому текст на brand всегда тёмный |
| `#1C1018` на `#FFF5F7` | 15.8:1 | AAA | OK |
| `#6B5B5E` на `#FFFFFF` | 5.3:1 | AA | OK для обычного текста |
| `#6B5B5E` на `#FFF5F7` | 5.0:1 | AA | OK но пограничный — только для мета/крупного текста |
| `#FFFFFF` на `#1C1018` | 16.5:1 | AAA | OK — текст в footer |
| `#FFFFFF` на `#FFC2D1` | 1.5:1 | FAIL | **НИКОГДА НЕ ИСПОЛЬЗОВАТЬ** |
| `#C4A265` на `#FFFFFF` | 2.9:1 | FAIL | Только для декоративных элементов, НЕ текста |

### Стратегия изображений

**Hero (IMG_3260.JPG) — LCP элемент, самое критичное фото:**

| Breakpoint | Crop | Aspect | Поведение |
|---|---|---|---|
| Mobile | Портрет, фокус на Tetiana + неон | 4:5 | Неон полностью виден |
| Tablet | Шире, больше контекста студии | 4:3 | Декор видим по бокам |
| Desktop | Полная композиция, Tetiana правее центра | 16:9 | Текст размещён слева на белом пространстве |

**Портфолио — все фото принудительно 4:5 (portrait), `object-fit: cover`:**

| Фото | Focal point | Качество | Назначение |
|---|---|---|---|
| `My work/IMG_3209.jpg` | center 40% (фокус на ногтях, не на сумке) | Отличное | **LEAD IMAGE** — красные на LV, premium-сигнал |
| `My work/IMG_1043.JPG` | center | Хорошее | French ombré, неон в фоне |
| `My work/IMG_3148.jpg` | center | Хорошее | Чёрный кружевной дизайн — артистизм |
| `My work/IMG_3206.jpg` | center | Хорошее | Классический красный — элегантность |
| `My work/IMG_4349.JPG` | center | Отличное | Классический French — техничность |
| `My work/IMG_0013.jpg` | center 30% | Хорошее | Новогодний дизайн — креативность |
| `My work/IMG_3213.jpg` | center | Хорошее | Hot pink — смелый цвет |
| `My work/IMG_3221.jpg` | center | Хорошее | Hot pink 2 — другой ракурс |

**Студия и Phenix:**

| Фото | Назначение | Рекомендация |
|---|---|---|
| `Salon/IMG_9975.jpg` | **Вторичный hero** — розовое кресло, золотое зеркало, пампас, логотип | Home → секция Studio. Это фото IS бренд. |
| `Salon/IMG_4535.JPG` | Декор — золотое сердце + песочные часы | Детали атмосферы, мелкое использование |
| `Salon/IMG_0247.JPG` | Декор — розовый пампас | Атмосфера, мелкое использование |
| `Phenix/IMG_3266.JPG` | Лобби Phenix — арки, паркет | Book page — premium здание |
| `Phenix/IMG_3268.JPG` | Фасад Phenix | Book page — для узнавания при визите |
| `Salon/IMG_0074.jpg` | Кофемашина | **НЕ использовать** — слишком специфично |
| `Salon/IMG_9085.jpg` | UV-лампа | **НЕ использовать** — оборудование не строит эмоциональную связь |
| `Salon/IMG_0169.JPG` | Макро сухоцветы | Возможно мелкий декор, но не обязательно |

### Взаимодействия и микро-анимации

**Загрузка страницы:** Никаких тяжёлых анимаций. Сайт должен ощущаться мгновенным.
- Hero image: `opacity: 0 → 1` fade за 0.4s (CSS only)
- Hero text: появляется через 0.1s после image, slide up 10px

**НЕТ scroll-triggered анимациям:** никаких intersection-observer fade-in. Это шаблонный паттерн. Editorial-подход: контент просто ЕСТЬ. Уверенно. Без перформанса.

**Hover-состояния (только десктоп, обёрнуты в `@media (hover: hover)`):**

| Элемент | Эффект | Transition |
|---|---|---|
| Nav-ссылки | `#FFC2D1` underline выезжает (width: 0→100%) | 0.3s ease |
| CTA кнопка | Фон темнеет до `#FFB3C6`, поднимается на 1px, тонкая тень | 0.2s ease |
| Service card | Фон тинтируется до `#FFF5F7` | 0.2s ease |
| Gallery item | Image `scale(1.03)` | 0.4s cubic-bezier(0.25,0.46,0.45,0.94) |
| Footer ссылки | Цвет → `#FFFFFF` | 0.2s ease |

**`prefers-reduced-motion: reduce`:** Все анимации и transitions отключаются для пользователей с чувствительностью к движению.

### Анти-паттерны (чего НЕ делать)

1. **Полноширинные розовые секции.** `background: #FFC2D1` на весь viewport = мгновенный шаблонный вид. Brand-цвет в МАЛЕНЬКИХ дозах: тонкая линия 2px, заливка кнопки, лёгкий left-border.
2. **Script/cursive шрифты.** Cormorant Garamond идеален. НЕ добавлять рукописные, каллиграфические, brush-шрифты. "Nail salon script font" = клише №1.
3. **Блёстки/глиттер-эффекты.** Никаких CSS shimmer, gradient shines, particle effects. Премиальность = сдержанность.
4. **Сетка со скруглёнными углами 20px+.** Скругления тонкие (4px) или отсутствуют — это editorial.
5. **Избыточные иконки.** Не ставить beauty/nail-иконки повсюду. Иконка в логотипе достаточна. Дополнительные иконки — только функциональные (Instagram glyph, стрелки, map pin).
6. **Pink-to-purple градиенты.** Никаких радужных акцентов. Один розовый, один тёмный, один нейтральный.
7. **Parallax на hero.** Убивает performance, ничего не добавляет.
8. **Текст поверх лица на фото.** Если текст overlaps hero-фото, только над чистой областью (белая стена). Никогда поверх лица или неоновой надписи.
9. **Центрирование всего подряд.** Заголовки секций — left-aligned, body text — left-aligned. Центрировать только: заголовки страниц, финальные CTA.
10. **"Welcome to Nails On Salon."** Никогда не начинать с "Welcome to..." — самый generic opening.

---

## User Stories

### US-001: Инициализация Astro-проекта

**Описание:** Как разработчик, я хочу настроить базовый Astro-проект с Tailwind CSS, чтобы иметь рабочий фундамент для всех страниц.

**Acceptance Criteria:**
- [ ] Astro 4.x проект инициализирован в `nails-on-salon/` с TypeScript strict
- [ ] Tailwind CSS подключён и работает
- [ ] Структура папок создана:
  ```
  src/
  ├── assets/          ← сконвертированные фото (JPG/PNG)
  ├── components/
  ├── content/
  │   ├── services/    ← markdown-файлы услуг
  │   └── site/        ← markdown-файлы текстов страниц
  ├── layouts/
  ├── pages/
  └── styles/
  ```
- [ ] `global.css` содержит все CSS-переменные из секции "Цветовая система" (включая `--color-gold` и `--color-border`)
- [ ] `global.css` содержит spacing-токены из секции "Система отступов"
- [ ] Tailwind config расширен кастомными цветами, шрифтами и spacing из Design Architecture
- [ ] Шрифты Cormorant Garamond (300, 400, 600) и DM Sans (400, 500) подключены с `font-display: swap`
- [ ] Базовые стили body: `font-family: 'DM Sans'`, `color: var(--color-ink)`, `font-size: 16px` (mobile) / `17px` (desktop)
- [ ] `@media (prefers-reduced-motion: reduce)` правило в global.css
- [ ] `npm run dev` запускает dev-сервер без ошибок
- [ ] `npm run build` создаёт production-сборку без ошибок

---

### US-002: Базовый layout и навигация

**Описание:** Как посетитель, я хочу видеть логотип и навигацию на каждой странице, чтобы легко перемещаться по сайту.

**Acceptance Criteria:**
- [ ] Создан `BaseLayout.astro` — общая обёртка для всех страниц
- [ ] `<html lang="en">`, skip-to-content ссылка первым элементом в `<body>`
- [ ] Семантическая структура: `<header>` → `<main id="main">` → `<footer>`
- [ ] **Header (десктоп ≥ 1024px):**
  - Sticky top, `background: rgba(255,255,255,0.95)` + `backdrop-filter: blur(8px)` (frosted glass)
  - Высота: 72px
  - Логотип `logo_black.png` слева (~40px height), ссылка на `/`
  - Nav-ссылки справа: DM Sans 500, 14px, uppercase, letter-spacing 0.06em
  - Активная страница: underline `#FFC2D1` (2px, offset 4px)
  - Hover: underline выезжает слева (width: 0→100%), 0.3s ease
  - "Book" ссылка стилизована как мини-кнопка: `#FFC2D1` bg, `#1C1018` текст, rounded-full
- [ ] **Header (мобильный < 1024px):**
  - Высота: 64px
  - Логотип слева, hamburger справа (3 линии, 24px, `#1C1018`)
  - Меню: fullscreen overlay, белый фон, центрированные ссылки
  - Анимация: slide-in справа (`translateX(100% → 0)`, 0.3s ease-out), ссылки stagger с delay 0.05s
  - Backdrop: `rgba(28,16,24,0.3)` — клик = закрытие
  - Focus trap внутри меню, scroll lock на body
  - Закрытие: X-кнопка (на месте hamburger) или swipe right
- [ ] **Footer:**
  - Фон `#1C1018`, padding: 64px top, 32px bottom
  - 3 колонки на десктопе (Brand | Quick Links | Contact), стопка на мобильных
  - Логотип `logo_white.png` (~36px height)
  - Текст: DM Sans 400, 14px, `rgba(255,255,255,0.7)`
  - Ссылки hover → `#FFFFFF`
  - Ссылка на Instagram @nailsonsalon с Instagram glyph icon (`target="_blank" rel="noopener noreferrer"`)
  - Адрес: 3030 Plaza Bonita Rd, Unit 1336, Suite 117, National City, CA 91950
  - Разделитель: 1px `rgba(255,255,255,0.1)` над copyright
  - CA License: M 368744, 12px, `rgba(255,255,255,0.5)`
  - Copyright © 2026 Nails On Salon
- [ ] Активная страница визуально выделена, `aria-current="page"` на текущей ссылке
- [ ] CLS prevention: фиксированная `min-height` на header wrapper
- [ ] Verify in browser using dev-browser skill

---

### US-003: Markdown-контент для услуг

**Описание:** Как Tetiana (владелец), я хочу редактировать услуги и цены в простых текстовых файлах, чтобы не обращаться к разработчику для каждого изменения цены.

**Acceptance Criteria:**
- [ ] Astro Content Collections настроены для `src/content/services/`
- [ ] Схема (schema) для услуг определена в `src/content/config.ts`:
  - `title` (string) — название услуги
  - `price` (number) — цена в долларах
  - `priceMax` (number, optional) — максимальная цена для диапазона (например, Design $10-20)
  - `duration` (string, optional) — время выполнения
  - `category` (enum: "manicure" | "pedicure" | "additional") — категория
  - `includes` (string, optional) — что входит в услугу
  - `description` (string, optional) — развёрнутое описание
  - `signature` (boolean, default false) — флаг для фирменной услуги
  - `sortOrder` (number) — порядок отображения
- [ ] Созданы markdown-файлы для всех 11 услуг (данные из INFO.md section 4):
  - `hard-gel-overlay.md` (signature: true)
  - `hard-gel-extensions-medium.md`
  - `hard-gel-extensions-long.md`
  - `hygienic-manicure-polish.md`
  - `hygienic-manicure.md`
  - `smart-touch-pedicure-gel.md` (signature: true)
  - `smart-touch-pedicure-polish.md`
  - `smart-touch-pedicure-no-coating.md`
  - `acrylic-dip-removal.md`
  - `gel-removal.md`
  - `design.md`
- [ ] Все цены, длительности и описания точно соответствуют INFO.md

---

### US-004: Markdown-контент для текстов страниц

**Описание:** Как Tetiana (владелец), я хочу редактировать тексты на страницах (hero, about, описание техники) в простых файлах.

**Acceptance Criteria:**
- [ ] Astro Content Collections настроены для `src/content/site/`
- [ ] Созданы файлы:
  - `hero.md` — текст для hero-секции (из INFO.md section 6)
  - `about-technique.md` — описание техники (из INFO.md section 7, "Technique")
  - `about-products.md` — о материалах (из INFO.md section 7, "Products & Materials")
  - `booking-instructions.md` — инструкция по записи через Instagram DM
- [ ] Тексты на английском языке (целевая аудитория — жители Калифорнии)
- [ ] Все тексты из INFO.md скопированы точно, без редактирования смысла

---

### US-005: Компонент ServiceCard

**Описание:** Как посетитель, я хочу видеть информацию об услуге в структурированном виде, чтобы быстро понять, что предлагается.

**Acceptance Criteria:**
- [ ] Компонент `ServiceCard.astro` принимает данные из content collection
- [ ] **Layout:** горизонтальный на десктопе (текст 70% слева, цена 30% справа), вертикальная стопка на мобильных
- [ ] Отображает:
  - Название: H3, Cormorant Garamond 600, `#1C1018`
  - Цена: DM Sans 500, 1.125rem, `#1C1018`, right-aligned на десктопе
  - Длительность: DM Sans 400, 14px, `#6B5B5E`
  - Описание (если есть): DM Sans 400, 16px, `#1C1018`, max 2 строки
- [ ] Для диапазона цен: "$10–20" (используя priceMax)
- [ ] Padding: 24px, bottom border: 1px `#F0E8EB`
- [ ] **Signature variant:**
  - Фон: `#FFF5F7`
  - Left border: 3px `#C4A265` (gold)
  - Бейдж "Signature" над названием: DM Sans 500, 11px, uppercase, letter-spacing 0.08em, `#C4A265`
- [ ] **Hover (desktop):** фон тинтируется до `#FFF5F7` (для обычных карточек), 0.2s ease
- [ ] Verify in browser using dev-browser skill

---

### US-006: Компонент InstagramCTA

**Описание:** Как посетитель, я хочу быстро попасть в Instagram DM мастера для записи, не запоминая имя аккаунта.

**Acceptance Criteria:**
- [ ] Компонент `InstagramCTA.astro` — переиспользуемая кнопка
- [ ] Ссылка: `https://ig.me/m/nailsonsalon`, `target="_blank" rel="noopener noreferrer"`
- [ ] **Primary variant (hero, book page, финальные CTA):**
  - Фон: `#FFC2D1`, текст: `#1C1018`
  - DM Sans 500, 15px, letter-spacing 0.03em
  - Padding: 16px 32px, border-radius: 9999px (pill)
  - Min height: 48px (touch target)
  - Instagram glyph icon (18px) слева от текста, gap 8px
  - Текст: "Book via Instagram" (НЕ просто "Book Now" — пользователь должен знать, что откроется Instagram)
  - Hover: фон `#FFB3C6`, `translateY(-1px)`, `box-shadow: 0 4px 12px rgba(28,16,24,0.1)`
  - Active: `translateY(0)`, тень уменьшена
  - Full-width на мобильных
- [ ] **Secondary variant (inline CTA):**
  - Тот же стиль но: padding 12px 24px, 14px, без иконки
  - Текст: "Book Now →"
- [ ] **Focus state:** `outline: 2px solid #1C1018`, `outline-offset: 3px`
- [ ] Опциональный prop для подсказки: "Write 'Hi, I'd like to book...' in DM"
- [ ] Verify in browser using dev-browser skill

---

### US-007: Home Page — Hero секция

**Описание:** Как посетитель, я хочу сразу увидеть, кто такая Tetiana и чем она занимается, чтобы за 3 секунды понять, на том ли я сайте.

**Acceptance Criteria:**
- [ ] **Layout (десктоп):** Split — фото справа (60%), текст слева (40%). НЕ overlay текста на фото.
- [ ] **Layout (мобильный):** Стопка — фото сверху (70vh), текст + CTA снизу
- [ ] Фото: `assets/Hero/IMG_3260.JPG` (Tetiana в студии с "Hello Gorgeous" неоном)
- [ ] **Art direction по breakpoints:**
  - Mobile: portrait crop (4:5), Tetiana в центре, неон виден сверху
  - Tablet: шире (4:3), больше контекста студии
  - Desktop: полная композиция, Tetiana правее центра, текст на левом белом пространстве
- [ ] Декоративный элемент: тонкая горизонтальная линия 2px × 60px, `#FFC2D1`, над заголовком
- [ ] Текст из `src/content/site/hero.md`
- [ ] Display heading: Cormorant Garamond 300, 36px mobile / 56px desktop
- [ ] CTA кнопка — InstagramCTA primary variant
- [ ] Hero image через Astro `<Image>`, `loading="eager"`, `fetchpriority="high"`
- [ ] Hero image widths: [640, 768, 1024, 1280, 1536], quality: 80
- [ ] Анимация: image fade-in 0.4s, текст stagger 0.1s после (CSS only)
- [ ] Verify in browser using dev-browser skill

---

### US-008: Home Page — Services Teaser

**Описание:** Как посетитель, я хочу увидеть краткий обзор основных услуг, чтобы заинтересоваться.

**Acceptance Criteria:**
- [ ] 3 карточки в ряд (десктоп), стопка (мобильный)
- [ ] Показать: Hard Gel Overlay (signature), Smart Touch Pedicure (signature), Gel Extensions
- [ ] Каждая карточка: название (H3, Cormorant), цена, 1-строчное описание, маленькая стрелка-ссылка
- [ ] **Signature карточки:** left-border 2px `#FFC2D1`. Обычные: left-border 2px `#E8E0E2`
- [ ] Ссылка "View All Services & Pricing →" под карточками
- [ ] Фон секции: `#FFFFFF` (чередование с hero). Spacing: 96px padding на десктопе
- [ ] Verify in browser using dev-browser skill

---

### US-009: Home Page — Gallery Strip

**Описание:** Как посетитель, я хочу увидеть примеры работ на главной, чтобы оценить уровень мастера.

**Acceptance Criteria:**
- [ ] **Full-bleed секция** (выходит за container), фон `#FFF5F7`
- [ ] Горизонтальный scroll strip с CSS scroll-snap:
  - Container: `overflow-x: auto`, `scroll-snap-type: x mandatory`, `scrollbar-width: none`
  - Items: `scroll-snap-align: start`
  - `overscroll-behavior-x: contain` (предотвращает hijack скролла страницы)
- [ ] 5–6 фото в порядке (курация, не случайный):
  1. IMG_3209.jpg (красные на LV — premium signal)
  2. IMG_1043.JPG (French ombré)
  3. IMG_3148.jpg (чёрное кружево)
  4. IMG_3206.jpg (красный)
  5. IMG_4349.JPG (French классика)
  6. IMG_3213.jpg (hot pink)
- [ ] Aspect ratio: принудительный 4:5 (portrait), `object-fit: cover`
- [ ] На мобильных: карточки ~280px шириной, gap 8px, видно ~1.2 карточки (сигнал скроллинга)
- [ ] На десктопе: ряд фото с gap 8px, выходящий за container с обеих сторон
- [ ] Hover (desktop only, `@media (hover: hover)`): `scale(1.02)` + subtle shadow. Cursor: `zoom-in`
- [ ] Ссылка "See Full Gallery →" после strip
- [ ] Все фото через Astro `<Image>` с `loading="lazy"`
- [ ] Verify in browser using dev-browser skill

---

### US-010: Home Page — Studio & Location

**Описание:** Как посетитель, я хочу увидеть студию и узнать, где она, чтобы чувствовать уверенность перед визитом.

**Acceptance Criteria:**
- [ ] **Layout (десктоп):** 2 колонки — фото слева, текст + карта справа. Мобильный: стопка.
- [ ] **Главное фото: `Salon/IMG_9975.jpg`** — розовое кресло, золотое зеркало, пампас, логотип. Это фото = бренд-айдентика. Показать крупно.
- [ ] Дополнительно (опционально): `Phenix/IMG_3266.JPG` — лобби Phenix (premium здание)
- [ ] Текст о приватном suite-опыте
- [ ] Мета-label: "Suite 117 · Phenix Salon Suites" — DM Sans, `--color-muted`, small caps, tracked
- [ ] Google Maps iframe: lazy-loaded, `border-radius: 12px`, `box-shadow: 0 2px 8px rgba(28,16,24,0.06)`
- [ ] Aspect ratio карты: 16:9 десктоп, 4:3 мобильный
- [ ] Адрес текстом рядом с картой
- [ ] InstagramCTA (secondary variant) в конце секции
- [ ] Spacing: 96px padding на десктопе
- [ ] Verify in browser using dev-browser skill

---

### US-011: Services Page

**Описание:** Как посетитель, я хочу видеть полный прайс-лист с описаниями, чтобы выбрать подходящую услугу.

**Acceptance Criteria:**
- [ ] URL: `/services`
- [ ] **Page header:** H1 "Services & Pricing" центрирован, узкая ширина (max 640px)
  - Декоративная линия: 2px × 40px, `#FFC2D1`, центрирована под H1
  - Описание техники из `about-technique.md` под заголовком
- [ ] **Manicure секция:** H2 "Manicure", карточки ServiceCard. Hard Gel Overlay = signature variant с gold border.
- [ ] **Pedicure секция (tint bg):** H2 "Pedicure", карточки. Smart Touch = signature. Блок "About This Technique" — italic текст из `about-products.md` в рамке с left-border `#FFC2D1`
- [ ] **Additional секция:** Компактный формат — название + цена + длительность на одной строке (не полные карточки)
- [ ] Все 11 услуг из Content Collection, сгруппированы по category
- [ ] CTA в конце — InstagramCTA
- [ ] Meta: title "Services & Pricing | Nails On Salon"
- [ ] Verify in browser using dev-browser skill

---

### US-012: Gallery Page с Lightbox

**Описание:** Как посетитель, я хочу просматривать портфолио в большом размере со swipe.

**Acceptance Criteria:**
- [ ] URL: `/portfolio`
- [ ] Минимальный header: H1 "Portfolio" + одна строка "A selection of recent work"
- [ ] **Сетка:**
  - Mobile: 2 колонки, gap 4px
  - Tablet: 3 колонки, gap 8px
  - Desktop: 3 колонки, gap 12px
  - Все фото: aspect-ratio 4:5 (portrait), `object-fit: cover`, `border-radius: 4px`
- [ ] **Порядок фото (курация):**
  1. IMG_3209.jpg (red on LV — hero shot)
  2. IMG_1043.JPG (French ombré)
  3. IMG_3148.jpg (black lace)
  4. IMG_3206.jpg (bold red)
  5. IMG_4349.JPG (French short)
  6. IMG_0013.jpg (Christmas green)
  7. IMG_3213.jpg (hot pink)
  8. IMG_3221.jpg (hot pink angle 2)
- [ ] **Hover (desktop, `@media (hover: hover)`):** `scale(1.03)`, `transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)`, `cursor: zoom-in`
- [ ] **Lightbox (Astro island, `client:visible`):**
  - Backdrop: `rgba(28, 16, 24, 0.92)` (НЕ чистый чёрный — тёплый ink)
  - Фото: центрировано, max 90vw × 85vh, `object-fit: contain`
  - Навигация: стрелки 48px, `rgba(255,255,255,0.15)` bg, hover → 0.3
  - Close: X top-right, 48px
  - Счётчик: "3 / 8" внизу, DM Sans 14px, white 70% opacity
  - Open: fade + scale(0.9→1), 0.3s ease-out
  - Close: reverse, 0.2s
  - Swipe: touch events, threshold 50px, image follows finger
  - Keyboard: Left/Right стрелки, Escape = закрыть
  - Preload: adjacent images (prev + next) при открытии
- [ ] HTML `<dialog>` для accessibility
- [ ] Focus trap: Tab cycles close → prev → next
- [ ] Scroll lock: `body { overflow: hidden }` при открытом lightbox
- [ ] При закрытии: focus возвращается на элемент, который открыл lightbox
- [ ] CTA внизу: "Love what you see? Let's create your perfect nails." + InstagramCTA
- [ ] Verify in browser using dev-browser skill

---

### US-013: Book Page

**Описание:** Как посетитель, я хочу понять, как записаться, и быстро попасть в Instagram DM.

**Acceptance Criteria:**
- [ ] URL: `/book`
- [ ] **Шаги записи:** 3 шага в горизонтальном ряду (десктоп), вертикальная стопка (мобильный)
  - Дизайн: номер в круге (Cormorant Garamond 300, 2rem), тонкий бордер 1px `#FFC2D1`, номер `#1C1018`
  - Step 1: "Tap the button below" — Instagram glyph
  - Step 2: "Tell us your preferred service & time"
  - Step 3: "Receive confirmation from Tetiana"
- [ ] Текст инструкции из `src/content/site/booking-instructions.md`
- [ ] **Большая кнопка InstagramCTA** (primary variant) — главный элемент после шагов
- [ ] **Секция About Studio (tint bg):**
  - 2 колонки (десктоп): фото слева (`Hero/IMG_3259.JPG` — Tetiana у входа), текст справа
  - О приватном suite, "by appointment only"
- [ ] **Секция Location (белый bg):**
  - Google Maps iframe (full container width, rounded, lazy-loaded)
  - Адрес текстом, "Located inside Phenix Salon Suites"
  - Фото `Phenix/IMG_3268.JPG` (фасад) — маленькое, рядом с адресом
  - CA License: M 368744, `--color-muted`, мелкий текст
- [ ] Meta: title "Book an Appointment | Nails On Salon"
- [ ] Verify in browser using dev-browser skill

---

### US-014: SEO — Meta-теги и Open Graph

**Описание:** Как владелец бизнеса, я хочу, чтобы сайт красиво отображался в поиске и при репосте.

**Acceptance Criteria:**
- [ ] Каждая страница: уникальные `<title>` и `<meta name="description">`
- [ ] Open Graph теги: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- [ ] OG image — hero-фото Tetiana (кроп 1200×630px)
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1">`
- [ ] `<link rel="canonical">` на каждой странице
- [ ] Favicon из логотипа (favicon.ico + apple-touch-icon)
- [ ] `<html lang="en">`

---

### US-015: SEO — JSON-LD Structured Data

**Описание:** Как владелец, я хочу чтобы Google показывал rich snippets.

**Acceptance Criteria:**
- [ ] JSON-LD `<script type="application/ld+json">` в `<head>` главной страницы
- [ ] Тип: `NailSalon` (подтип `HealthAndBeautyBusiness`)
- [ ] Поля: name, address (PostalAddress), geo (lat/lng), url (placeholder), image, priceRange "$$", openingHoursSpecification "By appointment", sameAs [Instagram URL], hasOfferCatalog (основные услуги)
- [ ] Валидация через Google Rich Results Test после deploy

---

### US-016: SEO — Sitemap и Robots.txt

**Описание:** Как владелец, я хочу чтобы поисковики нашли все страницы.

**Acceptance Criteria:**
- [ ] `@astrojs/sitemap` integration подключена
- [ ] `sitemap.xml` генерируется автоматически при build
- [ ] `robots.txt` разрешает полную индексацию
- [ ] `site` в `astro.config.mjs`: placeholder URL (обновить после регистрации домена)

---

### US-017: Accessibility — WCAG 2.1 AA

**Описание:** Как владелец в Калифорнии, я хочу WCAG compliance (Unruh Act, $4,000+ за нарушение).

**Acceptance Criteria:**
- [ ] Все изображения: descriptive `alt` text (см. правила ниже)
  - Hero/portrait: описание Tetiana и студии
  - Portfolio: описание работы ("Almond-shaped nails with pink French ombré design")
  - Studio interior: описание обстановки
  - Декоративные: `alt=""` + `role="presentation"`
  - Логотипы: `alt="Nails On Salon"`
- [ ] Контрастность ≥ 4.5:1 (обычный текст), ≥ 3:1 (крупный). Проверить по матрице контрастности.
- [ ] **КРИТИЧНО:** текст на `#FFC2D1` = всегда `#1C1018`. `#C4A265` gold = только декоративный, не текст.
- [ ] Все интерактивные элементы: keyboard accessible (Tab, Enter, Escape)
- [ ] Focus indicators: `outline: 2px solid #1C1018`, `outline-offset: 3px` — на ВСЕХ элементах. Никогда `outline: none` без замены.
- [ ] Touch targets ≥ 48×48px
- [ ] Skip-to-content ссылка: визуально скрыта, появляется при focus
- [ ] Семантический HTML: `<header>`, `<nav aria-label="...">`, `<main>`, `<footer>`, `<section aria-labelledby="...">`
- [ ] `prefers-reduced-motion: reduce` — все анимации и transitions отключены
- [ ] Lighthouse Accessibility ≥ 95

---

### US-018: Performance

**Описание:** Как посетитель на мобильном, я хочу быстрой загрузки.

**Acceptance Criteria:**
- [ ] Все фото: Astro `<Image>` (AVIF/WebP, responsive srcset)
- [ ] Hero: `loading="eager"`, `fetchpriority="high"`, widths [640, 768, 1024, 1280, 1536], quality 80
- [ ] Portfolio thumbnails: quality 75. Lightbox full: quality 85
- [ ] Все не-hero фото: `loading="lazy"`
- [ ] Google Maps iframe: `loading="lazy"`
- [ ] Шрифты: `font-display: swap`
- [ ] Минимум client JS (lightbox + мобильное меню = единственные Astro islands)
- [ ] LCP ≤ 1.8s, CLS < 0.05, INP ≤ 150ms, Lighthouse Performance ≥ 90

---

### US-019: Cloudflare Pages — Deployment

**Описание:** Как разработчик, я хочу настроить deployment для публикации.

**Acceptance Criteria:**
- [ ] Astro `output: "static"` (Cloudflare Pages static hosting, adapter не нужен)
- [ ] `astro.config.mjs`: корректная конфигурация
- [ ] `DEPLOY.md` — пошаговая инструкция для новичка:
  1. Создать Cloudflare аккаунт (бесплатно)
  2. Подключить GitHub репозиторий
  3. Build command: `npm run build`
  4. Output directory: `dist/`
  5. Подключение домена
- [ ] `.gitignore`: `node_modules/`, `dist/`, `.astro/`
- [ ] `package.json`: scripts `dev`, `build`, `preview`
- [ ] Build без ошибок

---

## Functional Requirements

### Навигация и структура

- **FR-01:** 4 страницы: Home (`/`), Services (`/services`), Gallery (`/portfolio`), Book (`/book`)
- **FR-02:** Навигация на всех страницах (header) со ссылками на все 4 страницы
- **FR-03:** На мобильных (< 1024px) навигация за hamburger-меню с fullscreen overlay
- **FR-04:** Footer на всех страницах: адрес, Instagram, лицензия, copyright

### Контент и данные

- **FR-05:** Услуги и цены — markdown-файлы (`src/content/services/*.md`), отображаются динамически
- **FR-06:** Тексты страниц — markdown-файлы (`src/content/site/*.md`)
- **FR-07:** Услуги сгруппированы: Manicure, Pedicure, Additional
- **FR-08:** Signature-услуги визуально выделены (gold border + badge)

### Запись

- **FR-09:** Запись только через Instagram DM: `https://ig.me/m/nailsonsalon`
- **FR-10:** CTA-кнопка на всех страницах (footer + Home + Book)
- **FR-11:** Никаких форм, телефонов, email
- **FR-12:** Book page: пошаговая инструкция (3 шага)

### Галерея

- **FR-13:** Адаптивная сетка фото (2→3 колонки), все фото 4:5 portrait ratio
- **FR-14:** Lightbox: swipe, keyboard nav, focus trap
- **FR-15:** Lightbox на `<dialog>` элементе

### Карта

- **FR-16:** Google Maps iframe на Home и Book
- **FR-17:** Lazy-loaded, `border-radius: 12px`
- **FR-18:** Адрес текстом рядом

### SEO

- **FR-19:** Уникальные `<title>`, `<meta description>`, OG-теги на каждой странице
- **FR-20:** JSON-LD NailSalon schema на главной
- **FR-21:** Автоматический `sitemap.xml`
- **FR-22:** `robots.txt` разрешает индексацию

---

## Non-Goals (Out of Scope)

- Онлайн-запись / booking widget — только Instagram DM
- Телефон или email на сайте — не отображаются
- Blog — не нужен
- Многоязычность — только английский
- CRM / аналитика — за рамками v1 (GA можно позже)
- Тёмная тема
- Онлайн-оплата
- Scroll-triggered анимации — уверенный editorial-подход: контент просто есть
- E-commerce
- Parallax-эффекты

---

## Technical Considerations

### Стек

| Layer | Choice | Почему |
|---|---|---|
| Framework | Astro 4.x | SSG, zero JS по умолчанию, TypeScript strict |
| Styling | Tailwind CSS | Utility-first, маленький bundle |
| Hosting | Cloudflare Pages | Бесплатный, auto SSL, CDN, deploy из Git |
| Images | Astro `<Image>` + Sharp | Auto AVIF/WebP, responsive srcset |
| Maps | Google Maps iframe | Lazy-loaded, без API-ключа |

### Ограничения

- **HEIC → JPG:** Все HEIC-файлы уже сконвертированы в JPG. ✅
- **Instagram DM:** `ig.me/m/nailsonsalon` deep link (проверен Feb 2026). Нет fallback.
- **Domain:** Не зарегистрирован. `site` в config = placeholder.
- **Google Business Profile:** Не создан. JSON-LD готовится заранее.

### Зависимости

| Package | Назначение |
|---|---|
| `astro` | Фреймворк |
| `@astrojs/tailwind` | Tailwind integration |
| `@astrojs/sitemap` | Sitemap |
| `tailwindcss` | CSS |
| `sharp` | Images (build-time) |

### Структура проекта

```
nails-on-salon/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── og-image.jpg          ← OG 1200×630
├── src/
│   ├── assets/
│   │   ├── hero/
│   │   ├── work/
│   │   ├── salon/
│   │   ├── phenix/
│   │   └── logos/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── MobileMenu.astro   ← island (client:load)
│   │   ├── ServiceCard.astro
│   │   ├── InstagramCTA.astro
│   │   ├── GoogleMap.astro
│   │   ├── GalleryGrid.astro
│   │   └── Lightbox.astro     ← island (client:visible)
│   ├── content/
│   │   ├── config.ts
│   │   ├── services/          ← 11 markdown
│   │   └── site/              ← hero, about, booking
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

## Success Metrics

| Метрика | Цель | Как измерить |
|---|---|---|
| Lighthouse Performance (mobile) | ≥ 90 | Chrome DevTools → Lighthouse |
| Lighthouse Accessibility | ≥ 95 | Chrome DevTools → Lighthouse |
| LCP | ≤ 1.8s | Chrome DevTools |
| CLS | < 0.05 | Chrome DevTools |
| INP | ≤ 150ms | Chrome DevTools |
| Все страницы | 4/4 | Визуальная проверка |
| Все услуги | 11/11 | Сверка с INFO.md |
| Instagram DM link | ✅ | Клик → Instagram DM |
| Build | ✅ | `npm run build` exit 0 |
| Deploy | ✅ | Сайт доступен по URL |

---

## Open Questions

| # | Вопрос | Статус |
|---|---|---|
| 1 | Какой домен? (nailsonsalon.com, nailson.salon) | ⏳ Решение владельца |
| 2 | OG image — кроп hero или специальное? | ⏳ При US-014 |
| 3 | Координаты lat/lng для JSON-LD | ⏳ При US-015 |
| 4 | Google Analytics с запуска? | ⏳ Перед deploy |

---

*Создано: 2026-03-31 | Обновлено: 2026-04-01 (интеграция Design Architecture от frontend-design skill)*
*Источники: INFO.md, research_nail_salon_california.md, CLAUDE.md, анализ всех фото-ассетов*
