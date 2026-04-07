# Nails On Salon — Project Context

## Что это

Статичный сайт для частного мастера маникюра Tanya. National City, CA.
Первая точка онлайн-присутствия: портфолио, услуги, цены, направление в Instagram.

PRD с полным ТЗ: `tasks/prd-nailsonsalon-website.md`

## Стек

- **Astro 4.x** — SSG, TypeScript strict, zero client JS по умолчанию
- **Tailwind CSS** — utility-first стили
- **Cloudflare Pages** — хостинг (бесплатный tier, auto SSL)
- **Sharp** — обработка изображений (AVIF/WebP)

## Бренд

| Токен | Hex | Использование |
|---|---|---|
| `--color-brand` | `#FFC2D1` | CTA кнопки, акцентные секции |
| `--color-ink` | `#1C1018` | Текст на brand, фон футера, основной текст |
| `--color-bg` | `#FFFFFF` | Фон страниц |
| `--color-bg-tint` | `#FFF5F7` | Чередующиеся секции |
| `--color-muted` | `#6B5B5E` | Описания, мета-текст |

**КРИТИЧНО:** `#FFC2D1` — светлый цвет (luminance ~0.62). Белый текст на нём = контраст 1.5:1 — **ПРОВАЛ WCAG**.
Текст на `#FFC2D1` **всегда** `#1C1018`. Без исключений.

**Шрифты:**
- Заголовки: Cormorant Garamond (300, 400, 600)
- Текст и UI: DM Sans (400, 500)

**Логотипы:**
- `logo_black.png` — светлый хедер (на белом фоне)
- `logo_white.png` — тёмный футер (на `#1C1018`)

## Ключевые ограничения

- **`index.old` — НЕ использовать.** Устаревший демо-файл, разработка с нуля.
- **Запись только через Instagram DM.** Нет форм, нет телефона, нет сторонних виджетов.
- **WCAG 2.1 AA обязателен** — юридический риск ADA lawsuit в Калифорнии. Lighthouse Accessibility ≥ 95.
- **HEIC-изображения** — Sharp на Windows может не поддерживать. Нужен pre-conversion скрипт (`heic-convert`).

## Структура контента

```
nails-on-salon/
├── assets/                    — исходные фото (15 шт., HEIC + JPG/PNG)
├── Logos/                     — логотипы (logo_black.png, logo_white.png)
├── Brand color/               — референсы бренда
├── tasks/
│   └── prd-nailsonsalon-website.md  — PRD (полное ТЗ)
├── research_nail_salon_california.md
└── index.old                  — НЕ ИСПОЛЬЗОВАТЬ
```

После инициализации Astro проекта структура будет в `src/`:
```
src/
├── assets/          — сконвертированные фото для Astro <Image>
├── components/      — Logo, Nav, Footer, InstagramCTA, GoogleMap, ServiceCard, GalleryLightbox
├── layouts/         — BaseLayout.astro
├── pages/           — index, services, gallery, book
├── content/services/  — *.md файлы, редактируемые Таней без знания кода
└── styles/global.css
```

## Сайт — 4 страницы

- `/` — Home: hero, teaser услуг, gallery strip, Instagram CTA + карта
- `/services` — полный прайс по категориям
- `/gallery` — сетка 15 фото с lightbox (`<dialog>`)
- `/book` — инструкция по записи через Instagram + карта + адрес

## Instagram

Ссылка на всех страницах:
```
https://www.instagram.com/nailsonsalon?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr
```
Всегда `target="_blank" rel="noopener noreferrer"`.

## Адрес

3030 Plaza Bonita Rd, Unit 1336, Suite 117, National City, CA 91950

## Цели производительности

| Метрика | Цель |
|---|---|
| LCP | ≤ 1.8s |
| CLS | < 0.05 |
| INP | ≤ 150ms |
| Lighthouse Performance (mobile) | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 (все страницы) |

## Команды (после инициализации проекта)

```bash
npm run dev      # локальный сервер
npm run build    # production build
npm run preview  # preview production build
```
