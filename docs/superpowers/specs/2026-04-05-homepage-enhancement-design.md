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
3. GALLERY STRIP     — без изменений (6 фото работ)
4. HELLO GORGEOUS    — НОВАЯ СЕКЦИЯ (IMG_3260 + neon-текст + CTA)
5. STUDIO & LOCATION — расширить Phenix-фото (IMG_3263, IMG_3266, IMG_3267)
```

---

## Task 1: Scroll-Reveal Animations

**Что:** CSS-анимации появления элементов при скролле.

**Как:**
- Добавить CSS-класс `.reveal` с `opacity: 0; transform: translateY(20px)`
- Добавить `.reveal.visible` с `opacity: 1; transform: translateY(0); transition: 0.6s ease-out`
- Inline `<script>` с IntersectionObserver (~15 строк JS), который добавляет `.visible` при пересечении viewport
- Применить `.reveal` к: заголовкам секций, карточкам услуг (с stagger-delay), кнопкам CTA, фото в gallery strip
- Карточки услуг получают `.reveal` с `style="transition-delay: 0.1s/0.2s/0.3s"` для эффекта каскада
- Уважать `prefers-reduced-motion` — уже есть в global.css, transition-duration обнулится автоматически

**Файлы:**
- `src/styles/global.css` — добавить `.reveal` / `.reveal.visible`
- `src/pages/index.astro` — добавить классы `.reveal` к элементам + inline script
- `src/layouts/BaseLayout.astro` — если скрипт вынести глобально (опционально)

**Не трогать:** Существующие `.animate-hero-fade` и `.animate-hero-text` в hero — они работают на CSS animation (не на scroll), оставить как есть.

---

## Task 2: "Hello Gorgeous" Section

**Что:** Новая секция между Gallery Strip и Studio & Location.

**Layout:**
- Фон: `bg-white` (контраст с `bg-tint` секций вокруг)
- Desktop: фото слева (50%), текст справа (50%)
- Mobile: фото сверху, текст снизу
- Фото: `IMG_3260.JPG` (портрет Тани с неоновой вывеской) — нужно предварительно скопировать в `src/assets/hero/`
- Текст: "Hello Gorgeous" в стиле Cormorant Garamond + 1-2 строки тёплого текста + CTA кнопка

**Neon Glow Effect:**
- CSS-класс `.neon-glow` для текста "Hello Gorgeous"
- `text-shadow` с несколькими слоями розового (#FFC2D1) и белого свечения
- `@keyframes neonPulse` — мягкое мерцание (opacity text-shadow от 0.6 до 1.0), 3-4 секунды цикл
- Цвет текста: `#FFC2D1` на белом фоне **не пройдёт WCAG** для обычного текста, НО это декоративный заголовок (не несущий информацию), поэтому допустимо. Рядом должен быть читаемый текст в `text-ink`.
- `prefers-reduced-motion: reduce` — отключить пульсацию, оставить статичный glow

**Файлы:**
- `src/assets/hero/IMG_3260.JPG` — уже есть в src/assets/hero/
- `src/styles/global.css` — добавить `.neon-glow` и `@keyframes neonPulse`
- `src/pages/index.astro` — добавить секцию между Gallery Strip и Studio

---

## Task 3: Enhance Studio & Location with Wayfinding Photos

**Что:** Добавить фото "как найти студию" в секцию Studio & Location.

**Текущее состояние:** 2 колонки — фото Phenix (IMG_3268) + Google Map.

**После изменений:**
- Над фото+картой добавить горизонтальную полоску из 3 маленьких фото-подсказок:
  - IMG_3263 (дверь студии с логотипом Nails On)
  - IMG_3266 (холл Phenix Salon Suites внутри)
  - IMG_3267 (входная дверь Phenix снаружи)
- Layout: 3 фото в ряд, одинаковый размер, rounded, с подписями ("Find the entrance", "Walk through the hall", "Look for our door")
- Mobile: горизонтальный скролл (как gallery strip)
- Это создаёт мини-путеводитель: фасад → холл → дверь студии

**Файлы:**
- `src/assets/hero/IMG_3263.JPG` — скопировать из `assets/Hero/`
- `src/assets/phenix/IMG_3266.JPG` — уже есть в src/assets/phenix/
- `src/assets/phenix/IMG_3267.JPG` — уже есть в src/assets/phenix/
- `src/pages/index.astro` — изменить секцию Studio & Location

**Не трогать:** Существующие фото студии (IMG_3268) и Google Map остаются на месте.

---

## Task 4: Add Remaining Hero Photos

**Что:** Интегрировать оставшиеся неиспользованные Hero-фото.

**Фото:**
- IMG_3265 (Таня за работой, крупный план, розовый фартук)
- IMG_3264 (Таня улыбается во время работы)
- IMG_3259 (Таня в коридоре, улыбается)

**Варианты использования:**
- IMG_3265 + IMG_3264: добавить в Gallery Strip как "process" фото (показать не только результаты, но и процесс работы), ИЛИ использовать в "Hello Gorgeous" секции как дополнительные
- IMG_3259: можно использовать на странице Book или About (не на главной — перебор фото одного человека на одной странице = "культ личности")

**Решение:** Добавить IMG_3265 и IMG_3264 в начало Gallery Strip (процесс → результат). IMG_3259 — отложить для страницы /book.

**Файлы:**
- `src/assets/hero/IMG_3265.JPG` — скопировать из `assets/Hero/`
- `src/assets/hero/IMG_3264.JPG` — скопировать из `assets/Hero/`
- `src/components/GalleryStrip.astro` — добавить 2 фото в массив

---

## Technical Constraints

- **Zero client JS по умолчанию (Astro).** IntersectionObserver — единственное исключение, добавляется как inline `<script>` (~15 строк).
- **WCAG 2.1 AA:** Neon glow текст — декоративный (дублируется читаемым текстом). `prefers-reduced-motion` уже обрабатывается в global.css.
- **Lighthouse Performance >= 90:** Все новые фото — через `<Image>` компонент Astro (автоматические AVIF/WebP, srcset). `loading="lazy"` для всего кроме hero.
- **CLS < 0.05:** Все фото-контейнеры — фиксированные `aspect-ratio` или `h-[XXXpx]`.

## Git Strategy

Каждая задача = отдельный коммит на ветке `main`. Формат:
- Task 1: `feat: add scroll-reveal animations to homepage sections`
- Task 2: `feat: add Hello Gorgeous section with neon glow effect`
- Task 3: `feat: add wayfinding photos to Studio & Location section`
- Task 4: `feat: add process photos to gallery strip`

Если что-то сломалось — `git revert <commit-hash>` для отката конкретной задачи.
