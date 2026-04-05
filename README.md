# Nails On Salon — Веб-сайт

Статичный веб-сайт для мастера маникюра Tanya. Построен на **Astro** + **Tailwind CSS**.

**Хостинг:** Cloudflare Pages  
**Домен:** nailsonsalon.com (когда будет готово)

---

## 🚀 Быстрый старт

### Локальная разработка
```bash
npm install      # Установить зависимости
npm run dev      # Запустить dev сервер (localhost:3000)
```

### Сборка для production
```bash
npm run build    # Собирает в dist/
npm run preview  # Просмотр production версии
```

---

## 📖 Важные гайды

- **[QUICK_START.md](./QUICK_START.md)** — быстрый старт (логотип + Cloudflare)
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** — полная инструкция деплойменту
- **[CHECKLIST.md](./CHECKLIST.md)** — проверочный лист перед запуском
- **[CLAUDE.md](./CLAUDE.md)** — контекст проекта

---

## 📁 Структура проекта

```
src/
├── assets/
│   ├── logos/          — логотипы (logo_black.png, logo_white.png)
│   └── photos/         — фото услуг и портфолио
├── components/
│   ├── Header.astro    — шапка с навигацией
│   ├── Footer.astro    — футер с контактами
│   ├── Gallery*        — компоненты галереи
│   └── ...
├── layouts/
│   └── BaseLayout.astro — базовый layout
├── pages/
│   ├── index.astro     — главная страница
│   ├── services.astro  — услуги и цены
│   ├── gallery.astro   — полная галерея фото
│   └── book.astro      — инструкция по записи
├── content/
│   └── services/       — контент услуг (markdown)
└── styles/
    └── global.css      — глобальные стили
```

---

## 🎨 Дизайн и бренд

| Токен | Цвет | Использование |
|-------|------|---|
| `--color-brand` | `#FFC2D1` | CTA кнопки, акценты |
| `--color-ink` | `#1C1018` | Основной текст, фон футера |
| `--color-bg` | `#FFFFFF` | Фон страниц |
| `--color-bg-tint` | `#FFF5F7` | Альтернативные секции |
| `--color-muted` | `#6B5B5E` | Вторичный текст |

**Шрифты:**
- Заголовки: Cormorant Garamond
- Текст: DM Sans

⚠️ **ВАЖНО:** На светло-розовом фоне (`#FFC2D1`) **всегда** используется тёмный текст (`#1C1018`). WCAG требует контраст ≥ 4.5:1.

---

## 🔍 Логотип

**Расположение:** `src/assets/logos/logo_black.png`

Логотип используется в компоненте `Header.astro`:
```astro
import logoBlack from '../assets/logos/logo_black.png';

<Image
  src={logoBlack}
  alt="Nails On Salon"
  height={80}
/>
```

Через Astro Image компонент логотип:
- ✓ Автоматически оптимизируется (AVIF/WebP)
- ✓ Встраивается в bundle
- ✓ Работает везде (dev, prod, Cloudflare Pages)

---

## 📱 Требования к производительности

| Метрика | Цель |
|---------|------|
| LCP | ≤ 1.8s |
| CLS | < 0.05 |
| INP | ≤ 150ms |
| Lighthouse Performance | ≥ 90 (mobile) |
| Lighthouse Accessibility | ≥ 95 |

---

## 🌐 Социальные сети

Instagram: https://www.instagram.com/nailsonsalon  
(Ссылка есть на всех страницах, opens in new tab)

---

## 🚢 Деплойменту на Cloudflare Pages

См. **[DEPLOYMENT.md](./DEPLOYMENT.md)** для полной инструкции.

**TL;DR:**
1. `npm run build`
2. `git push origin main`
3. Cloudflare Pages → подключить репозиторий
4. ✓ Done! Сайт live через 2-3 минуты

---

## 📝 Лицензия и авторство

Разработано как учебный проект.  
Контент принадлежит Tanya (nailsonsalon@example.com).

---

## 🔗 Ссылки

- [Astro документация](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [Cloudflare Pages](https://pages.cloudflare.com)
