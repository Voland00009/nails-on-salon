# Решение проблем при разработке

## npm install падает на Windows

**Проблема:** `TAR_ENTRY_ERROR`, `EBADF`, или ошибки удаления файлов

**Решение 1 (Быстрое):**

Открыть **PowerShell как администратор** в папке проекта:
```powershell
rmdir /s /q node_modules
npm cache clean --force
npm install
```

**Решение 2 (Более надёжное):**

```bash
# Очистить npm cache полностью
npm cache clean --force
npm config set registry https://registry.npmjs.org/

# Удалить node_modules и package-lock.json
rmdir /s /q node_modules      # Windows bash
del package-lock.json

# Переустановить
npm install --no-audit
```

**Решение 3 (Если ничего не помогает):**

Использовать `yarn` вместо `npm`:
```bash
npm install -g yarn
yarn install
yarn dev      # вместо npm run dev
yarn build    # вместо npm run build
```

---

## Dev сервер не запускается

**Проблема:** `npm run dev` падает с ошибкой

**Решение:**

```bash
# Проверить, что порт 3000 свободен
netstat -ano | findstr :3000

# Если порт занят, либо:
# 1. Закрыть процесс в Task Manager
# 2. Использовать другой порт:
npm run dev -- --port 3001
```

---

## Сборка `npm run build` падает

**Проблема:** Build завершается ошибкой

**Решение:**

1. Проверить формат изображений (HEIC не поддерживается на Windows):
```bash
node setup-node.sh    # Конвертирует HEIC → JPG
```

2. Проверить что все импорты существуют:
```bash
ls src/assets/logos/    # Должны быть logo_black.png и logo_white.png
```

3. Проверить конфиг:
```bash
cat astro.config.mjs    # Должен быть корректный
```

4. Чистая сборка:
```bash
npm cache clean --force
rm -rf dist/
npm run build
```

---

## Логотип не показывается в dev сервере

**Проблема:** Header видно, но логотип пуст

**Решение:**

1. Проверить путь в `src/components/Header.astro`:
```astro
import logoBlack from '../assets/logos/logo_black.png';
```

Путь должен быть **относительный** от компонента.

2. Проверить, что файл существует:
```bash
ls -la src/assets/logos/logo_black.png
```

3. Перезагрузить dev сервер:
```bash
# Ctrl+C чтобы остановить
npm run dev
```

4. Очистить браузер кэш:
   - DevTools → Application → Clear storage → Clear all
   - Или используй Ctrl+Shift+Delete

---

## Tailwind стили не применяются

**Проблема:** CSS не работает

**Решение:**

1. Проверить `tailwind.config.mjs`:
```bash
cat tailwind.config.mjs
```

Должен включать пути к шаблонам:
```javascript
content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}']
```

2. Проверить, что `@tailwind` в `src/styles/global.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. Перезагрузить dev сервер.

---

## Производительность медленная

**Проблема:** Dev сервер медленно перестраивает или долго открывается

**Решение:**

1. Использовать более свежую версию Node:
```bash
node --version    # Должно быть v18+
```

Обновить через [nodejs.org](https://nodejs.org)

2. Увеличить timeout для dev сервера:
```bash
npm run dev -- --host
```

3. Проверить систему — может быть недостаточно RAM или диск перегружен

---

## Sharp (обработка изображений) не работает

**Проблема:** Ошибка при обработке изображений

**Решение:**

Sharp на Windows может нуждаться в дополнительных зависимостях.

```bash
npm install --build-from-source
```

Или переключиться на встроенный Astro image handler:
```javascript
// astro.config.mjs
export default defineConfig({
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      }
    }
  },
});
```

---

## Порт 3000 уже занят

**Проблема:** `EADDRINUSE: address already in use :::3000`

**Решение:**

```bash
# Найти процесс на порту 3000
netstat -ano | findstr :3000

# Убить процесс (где PID — номер из вывода выше)
taskkill /PID <PID> /F

# Или просто использовать другой порт
npm run dev -- --port 3001
```

---

## Нужна дополнительная помощь?

Проверить лог ошибки:
```bash
npm run dev 2>&1 | tee build.log    # Сохранит вывод в build.log
```

Или создать issue в GitHub репозитории с полным логом ошибки.
