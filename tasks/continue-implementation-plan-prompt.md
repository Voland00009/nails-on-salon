# Промпт для создания implementation plan

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
4. **PRD** — `tasks/prd-nailsonsalon-website.md` — полное ТЗ с Design Architecture и 19 user stories (US-001 — US-019)
5. **Дизайн-план (ГОТОВ, ОДОБРЕН)** — `tasks/design-plan.md` — **полностью готовый, одобренный мной**

## Что сделано в дизайн-плане (всё завершено)

- **Принятые решения:** Split Hero (A), Hybrid-подход, логотип всегда "NAILS·ON SALON" полностью
- **Правила логотипа** — иконка (флакон лака) + текст, два файла (black/white), никогда не сокращать
- **Shared Components:** Header (frosted glass), Footer (тёмный), InstagramCTA (Primary + Secondary)
- **Home Page:** 4 секции (Hero split 40/60, Services Teaser, Gallery Strip, Studio & Location)
- **Services Page:** 5 секций (Page Header, Manicure 5 карточек, Pedicure 3 карточки + blockquote, Additional компактный, Final CTA)
- **Gallery Page:** 3 секции + Lightbox (Page Header, Photo Grid 2→3 col, Final CTA, Lightbox с `<dialog>`)
- **Book Page:** 3 секции (Booking Steps 3 шага, About Studio, Location с картой)
- **Responsive Image Sizes** — таблица для каждого фото
- **Spec self-review пройден**, я одобрил

## Что нужно сделать сейчас

Дизайн-план одобрен → следующий шаг по процессу brainstorming skill — **invoke `superpowers:writing-plans` skill** для создания implementation plan.

Используй skill `superpowers:writing-plans` чтобы создать пошаговый план реализации на основе:
- PRD: `tasks/prd-nailsonsalon-website.md` (19 user stories, US-001 — US-019)
- Дизайн-план: `tasks/design-plan.md` (одобренный)
- CLAUDE.md — технические ограничения
- INFO.md — данные для контента

### Важные моменты для плана:

1. **User stories в PRD идут последовательно** — каждая опирается на предыдущую. Рекомендуется выполнять по порядку.
2. **Я начинающий разработчик** — план должен быть подробным, с объяснениями
3. **Стек:** Astro 4.x + TypeScript strict + Tailwind CSS + Cloudflare Pages
4. **Запись только через Instagram DM** — никаких форм, `https://ig.me/m/nailsonsalon`
5. **WCAG 2.1 AA обязателен** — California ADA/Unruh Act
6. **Целевые метрики:** LCP ≤ 1.8s, Lighthouse Performance ≥ 90, Accessibility ≥ 95
7. **Контент редактируемый** — услуги через `src/content/services/*.md`, тексты через `src/content/site/*.md`
8. **Не сокращай "NAILS·ON SALON"** — всегда полное написание

## Ключевые файлы для чтения

- `tasks/design-plan.md` — дизайн-план (одобрен, готов к реализации)
- `tasks/prd-nailsonsalon-website.md` — PRD с 19 user stories
- `CLAUDE.md` — бренд-токены, шрифты, ограничения
- `INFO.md` — услуги, цены, тексты, фото-ассеты
