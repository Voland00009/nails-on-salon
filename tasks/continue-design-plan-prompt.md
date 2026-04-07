# Промпт для продолжения работы над дизайн-планом

> Скопируй текст ниже и вставь в новую сессию Claude Code (или после /compact).

---

## Контекст проекта

Я делаю сайт для жены Тани — **Nails On Salon**, салон маникюра в National City, California.
Стек: **Astro 4 + Tailwind CSS + Cloudflare Pages**. Сайт: 4 страницы (Home, Services, Gallery, Book).

Все файлы проекта находятся в `nails-on-salon/`.

## Что уже готово

1. **Research** — `research_nail_salon_california.md` (60+ страниц маркетингового исследования)
2. **INFO.md** — source of truth: бизнес-данные, услуги (11 штук), цены, тексты, описание фотоассетов
3. **CLAUDE.md** — бренд-токены (цвета, шрифты), технические ограничения, структура проекта
4. **PRD** — `tasks/prd-nailsonsalon-website.md` — полное ТЗ с Design Architecture и 19 user stories
5. **Дизайн-план (ЧАСТИЧНО)** — `tasks/design-plan.md` — **именно этот файл нужно доделать**

## Что сделано в дизайн-плане

Прочитай `tasks/design-plan.md` — там уже готово:

- **Принятые решения:** Split Hero (A), Hybrid-подход к структуре, логотип всегда "NAILS·ON SALON" полностью
- **Правила логотипа** — иконка (флакон лака) + текст, два файла (black/white), никогда не сокращать
- **Shared Components** (полностью готовы):
  - Header (desktop 72px + mobile 64px, frosted glass, hamburger, fullscreen menu)
  - Footer (desktop 3 колонки + mobile стопка, на тёмном `#1C1018`)
  - InstagramCTA (Primary + Secondary варианты)
- **Home Page** (полностью готова): 4 секции с точными размерами, фото, breakpoint-адаптацией
- **Services, Gallery, Book Pages** — только flow maps (структура секций), **детали НЕ описаны**

## Что нужно доделать

Используй skill `superpowers:brainstorming` и visual companion (если хочешь показывать wireframes в браузере).

Для каждой из 3 оставшихся страниц допиши в `tasks/design-plan.md` детальное описание **каждой секции** по тому же формату, что у Home Page:

1. **Services Page** (`/services`):
   - Page Header (H1 + декоративная линия + intro текст из about-technique.md)
   - Manicure секция (5 ServiceCard, signature = Hard Gel Overlay с gold border)
   - Pedicure секция (tint bg, 3 ServiceCard, signature = Smart Touch, blockquote из about-products.md)
   - Additional секция (компактный формат: название + цена + длительность в одну строку)
   - Final CTA

2. **Gallery Page** (`/portfolio`):
   - Page Header (минимальный)
   - Photo Grid (2→3 колонки, 8 фото в курированном порядке, 4:5 ratio)
   - Lightbox specs (`<dialog>`, warm ink backdrop `rgba(28,16,24,0.92)`, swipe, keyboard nav, focus trap)
   - Final CTA

3. **Book Page** (`/book`):
   - Booking Steps (3 шага в ряд desktop / стопка mobile, нумерация в кругах)
   - About Studio (tint bg, 2 колонки: фото IMG_3259.JPG + текст о приватном suite)
   - Location (карта Google Maps + адрес + фото Phenix/IMG_3268.JPG)

Для каждой секции опиши:
- Layout (desktop и mobile)
- Конкретные размеры (padding, gap, max-width, image dimensions)
- Фон (белый или tint, ритм чередования)
- Типографику (какой уровень из PRD Design Architecture)
- Фотографии (какой файл, aspect-ratio, object-fit, quality, loading)
- Hover/interactions (если есть)

**ВАЖНО:**
- Не сокращай "NAILS·ON SALON" — всегда полное написание
- WCAG 2.1 AA: текст на `#FFC2D1` всегда `#1C1018`, `#C4A265` gold только декоративный
- Не пиши код — только дизайн-план
- После завершения всех 3 страниц — добавь таблицу responsive image sizes
- Потом выполни spec self-review и попроси меня проверить

## Ключевые файлы для чтения

- `tasks/design-plan.md` — текущий дизайн-план (доделать)
- `tasks/prd-nailsonsalon-website.md` — PRD с Design Architecture и user stories (US-011, US-012, US-013)
- `CLAUDE.md` — бренд-токены, шрифты, ограничения
- `INFO.md` — услуги, цены, тексты, фото-ассеты
