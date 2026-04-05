# Деплойменту на Cloudflare Pages

## Шаг 1: Подготовка репозитория

Проект готов к деплойменту на Cloudflare Pages. Это статический сайт (SSG), собирается в папку `dist/`.

```bash
npm run build
```

После успешной сборки:
- `dist/` — готовый сайт для деплойменту
- Все изображения оптимизированы (Sharp обрабатывает их в AVIF/WebP)
- Логотипы встроены в сборку автоматически

## Шаг 2: Загрузить репозиторий на GitHub

**Важно:** Убедитесь, что в `.gitignore` исключены:
```
node_modules/
dist/
.env
```

Загрузить код:
```bash
git add .
git commit -m "feat: prepare for Cloudflare Pages deployment"
git branch -M main
git push -u origin main
```

## Шаг 3: Подключить GitHub к Cloudflare Pages

1. Откройте [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Выберите **Pages** → **Create a project**
3. Выберите **Connect to Git**
4. Авторизуйтесь в GitHub и выберите репозиторий `nails-on-salon`
5. Нажмите **Begin setup**

### Параметры сборки в Cloudflare Pages UI:

| Параметр | Значение |
|----------|----------|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Environment | (Leave default or set Node version to 18+) |

6. Нажмите **Save and Deploy**

Cloudflare автоматически:
- Клонирует ваш репозиторий
- Запустит `npm install && npm run build`
- Загрузит содержимое `dist/` на Edge сеть
- Выдаст URL (например, `https://nails-on-salon.pages.dev`)

## Шаг 4: Привязать собственный домен

Если у вас есть `nailsonsalon.com`:

1. В Cloudflare Pages → **Settings** → **Custom domains**
2. Нажмите **Add custom domain**
3. Введите `nailsonsalon.com`
4. Обновите DNS записи вашего регистратора домена (инструкции Cloudflare подскажут)

## Возможные проблемы

### Логотип не показывается на dev сервере

**Причина:** Путь к логотипу.

**Решение:** Проверьте `src/components/Header.astro`:
```astro
import logoBlack from '../assets/logos/logo_black.png';
```

Логотип должен быть в `src/assets/logos/` (именно там).

### HEIC-изображения не конвертируются

Sharp на Windows может не поддерживать HEIC. Используйте скрипт:
```bash
node setup-node.sh
```

Это конвертирует все HEIC в JPG перед сборкой.

### Сборка падает с ошибкой памяти

Проблема с Sharp на Windows. Решение:
```bash
npm install --no-optional
npm run build
```

## Проверка перед деплойментом

Перед тем как пушить на GitHub:

```bash
npm run build      # Локальная сборка
npm run preview    # Просмотр production версии
```

Откройте `http://localhost:3000` и проверьте:
- ✓ Логотип видно в хедере
- ✓ Все страницы доступны (Home, Services, Gallery, Book)
- ✓ Изображения загружаются
- ✓ Mobile меню работает
- ✓ Lighthouse Accessibility ≥ 95

## Автоматические деплойменты

После подключения GitHub:
- Каждый коммит в `main` автоматически деплоится
- Cloudflare покажет статус деплойменту в Pages UI
- Production URL обновляется в течение 2-3 минут

## Откатить деплойменту

1. В Cloudflare Pages → **Deployments**
2. Найдите предыдущую версию
3. Нажмите **Rollback to this deployment**
