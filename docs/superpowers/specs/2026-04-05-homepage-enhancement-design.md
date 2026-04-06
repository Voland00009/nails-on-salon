# Homepage Enhancement Design

## Problem

Главная страница Nails On Salon функциональна, но не цепляет. Не хватает:
- Анимаций — страница статична, нет ощущения "живости"
- Истории — секции не связаны в нарратив, нет эмоционального пути
- Использования фотоматериала — 7 из 12 фото Hero/Phenix не задействованы
- Запоминающейся фишки — ничего, что выделяет сайт среди конкурентов

## Solution

### Принятые решения

1. **Подход к анимациям:** Мягкие микро-анимации (CSS + IntersectionObserver) как фундамент + одна запоминающаяся деталь
2. **Нарратив страницы:** Профессионал за работой -> Услуги -> Работы -> Личное знакомство -> Как добраться
3. **Фишка:** Надпись "Hello Gorgeous" с CSS neon-glow эффектом (реальная вывеска из салона Тани)
4. **Hero:** Остаётся текущее фото (Таня за работой через стекло) — упор на профессионализм

### Поток страницы (после изменений)

```
1. HERO              — без изменений (IMG_3262, текст, CTA)
2. SERVICES TEASER   — без изменений (3 карточки)
3. GALLERY STRIP     — убрать process-фото (IMG_3264, IMG_3265)
4. HELLO GORGEOUS    — исправить обрезку фото (пропорциональное)
5. STUDIO & LOCATION — текст-инструкция + пропорциональные фото + vertical stack mobile
```

---

## Уже реализовано (коммиты на main)

- `153f45b` — scroll-reveal анимации (Task 1) — **DONE**
- `9f9cb5f` — Hello Gorgeous секция (Task 2) — **DONE, нужны правки**
- `c723733` — wayfinding фото в Studio & Location (Task 3) — **DONE, нужны правки**
- `a3933d6` — process фото в Gallery Strip (Task 4) — **DONE, нужен откат**

---

## Task A: Удалить process-фото из Gallery Strip

**Файл:** `src/components/GalleryStrip.astro`

**Что:** Убрать IMG_3264 и IMG_3265 из imports и массива `photos`. Остаётся 6 фото работ.

**Почему:** Process-фото (Таня за работой) не относятся к портфолио nail art. Gallery Strip — витрина результатов.

---

## Task B: Исправить обрезку фото в Hello Gorgeous

**Файл:** `src/pages/index.astro` (секция HELLO GORGEOUS)

**Что:** Убрать фиксированную высоту, показать фото пропорционально.

```
Было:  class="w-full h-[400px] lg:h-[480px] object-cover rounded-lg"
Будет: class="w-full rounded-lg"
```

**Почему:** Фиксированная высота + object-cover обрезает верх фото — теряется надпись "Hello Gorgeous" на неоновой вывеске.

---

## Task C: Переработка Wayfinding в Studio & Location

**Файл:** `src/pages/index.astro` (секция STUDIO & LOCATION)

Четыре изменения:

### C1. Текст-инструкция перед wayfinding-фото

Добавить между описанием секции и wayfinding-фото:

```html
<h3> "How to Find Nails On Salon"           — Cormorant Garamond, font-light
<p>  "We're inside Phenix Salon Suites
      at Plaza Bonita. Here's how to
      get to Unit 117:"                      — text-ink, text-body-small
<p>  "We have a separate entrance from
      the parking lot — no need to walk
      through the mall."                     — text-ink, text-body-small
```

Стилистика совпадает с существующим описанием секции.

**Контекст:** Клиенты часто не понимают, что у Phenix есть отдельный вход с парковки. Можно оставить машину прямо у входа, не нужно идти через молл.

### C2. Фото без обрезки

```
Было:  <div class="h-[200px] lg:h-[240px]"> + object-cover
Будет: убрать фиксированный контейнер, фото пропорциональное
```

Все 3 wayfinding-фото вертикальные (portrait). object-cover с фиксированной высотой обрезает:
- IMG_3267: стеклянную дверь Phenix
- IMG_3266: логотип Phenix Salon Suites на стене
- IMG_3263: логотип Nails On и QR-код на двери

### C3. Mobile: вертикальный стек

```
Было:  max-lg:flex max-lg:overflow-x-auto (горизонтальный скролл, 75% ширины)
Будет: grid-cols-1 на mobile (вертикальный стек, полная ширина)
       grid-cols-3 на desktop (три в ряд)
```

Интуитивнее — клиент листает сверху вниз и видит маршрут.

### C4. Подпись третьего фото

```
Было:  "Look for our door"
Будет: "Look for our door, Unit 117"
```

---

## Task D: Проверить предыдущие коммиты на ошибки

Проверить коммиты 153f45b, 9f9cb5f, c723733, a3933d6 на:
- Неиспользуемые imports
- Accessibility issues
- CLS problems
- Стилистические несоответствия с бренд-гайдом

---

## Technical Constraints

- **Zero client JS по умолчанию (Astro).** IntersectionObserver — единственное исключение, добавляется как inline `<script>` (~15 строк).
- **WCAG 2.1 AA:** Neon glow текст — декоративный (дублируется читаемым текстом). `prefers-reduced-motion` уже обрабатывается в global.css.
- **Lighthouse Performance >= 90:** Все новые фото — через `<Image>` компонент Astro (автоматические AVIF/WebP, srcset). `loading="lazy"` для всего кроме hero.
- **Brand:** Cormorant Garamond (заголовки), DM Sans (текст), brand #FFC2D1, ink #1C1018, bg-tint #FFF5F7. Текст на brand-фоне всегда ink. max-w-container-xl (1280px), px-5 sm:px-10.

## Git Strategy

Каждая задача = отдельный коммит + push на `main`. Формат conventional commits.

## Порядок реализации (по сессиям)

**Сессия 1:** Task A (Gallery Strip) + Task B (Hello Gorgeous crop fix) — быстрые правки
**Сессия 2:** Task C (Wayfinding переработка) — крупная задача
**Сессия 3:** Task D (аудит предыдущих коммитов)
