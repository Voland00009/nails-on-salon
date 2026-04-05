# Быстрый старт: Логотип и Cloudflare Pages

## 1. Логотип ✓ (уже исправлен)

**Где находится:** `src/assets/logos/logo_black.png`

**Как используется в Header:**
```astro
import logoBlack from '../assets/logos/logo_black.png';

<Image
  src={logoBlack}
  alt="Nails On Salon"
  height={80}
  style="height: 80px; width: auto;"
  loading="eager"
/>
```

Через Astro Image компонент логотип автоматически:
- Оптимизируется (AVIF/WebP)
- Встраивается в bundle
- Корректно показывается на всех версиях сайта (dev, production, Cloudflare Pages)

**Проблема на dev сервере?**
- Логотип работает через путь относительно компонента
- Если не видно — проверьте, что папка `src/assets/logos/` существует
- Перезагрузите dev сервер: `npm run dev`

## 2. Деплойменту на Cloudflare Pages (3 шага)

### Шаг 1: Собрать и проверить локально
```bash
npm run build    # Собирает в dist/
npm run preview  # Смотрит production версию
```

### Шаг 2: Загрузить на GitHub
```bash
git add .
git commit -m "chore: prepare for Cloudflare deployment"
git push origin main
```

### Шаг 3: Подключить в Cloudflare
1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages** → **Create a project**
2. **Connect to Git** → Выберите репозиторий
3. Параметры:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Нажмите **Deploy**

✓ Готово! Через 2-3 минуты сайт будет на URL типа `https://nails-on-salon.pages.dev`

## Привязка собственного домена

После успешного деплойменту:
1. Pages → **Settings** → **Custom domains**
2. Добавить `nailsonsalon.com`
3. Cloudflare подскажет DNS записи

---

**Полная инструкция:** см. [DEPLOYMENT.md](./DEPLOYMENT.md)
