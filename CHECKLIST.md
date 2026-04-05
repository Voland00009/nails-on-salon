# Checklist перед деплойментом

## Локальные проверки

- [ ] **Сборка работает:** `npm run build` завершается без ошибок
- [ ] **Production preview работает:** `npm run preview` показывает сайт на localhost:3000
- [ ] **Логотип видно** на всех страницах (особенно в header)
- [ ] **Все изображения** загружаются (gallery, services)
- [ ] **Mobile меню** работает (гамбургер и закрытие)
- [ ] **Ссылки работают** (Home, Services, Gallery, Book)
- [ ] **Lighthouse Accessibility** ≥ 95 (запустить в DevTools)

## Git подготовка

- [ ] **Коммиты сделаны:** `git log` показывает ваши изменения
- [ ] **Нет незакоммиченных файлов:** `git status` чистый
- [ ] **Ветка main:** `git branch` показывает вы на main
- [ ] **Push на GitHub:** `git push origin main` выполнен

## Cloudflare Pages

- [ ] **GitHub repo connected** (можно увидеть в Pages Settings → Git)
- [ ] **Build settings правильные:**
  - Build command: `npm run build`
  - Output directory: `dist`
- [ ] **Первый деплойменту успешен** (статус "Success" в Deployments)
- [ ] **Сайт доступен** по URL (например, nails-on-salon.pages.dev)

## Аспекты Tanya

- [ ] **Ссылка на Instagram** работает везде
- [ ] **Адрес в footer** правильный (3030 Plaza Bonita Rd...)
- [ ] **Google Map** показывает правильную локацию
- [ ] **Цвета бренда** соответствуют: #FFC2D1 (brand), #1C1018 (ink)
- [ ] **Шрифты** загружаются (Cormorant Garamond, DM Sans)

## Доменные имена (если используются)

- [ ] **CNAME DNS запись** добавлена у регистратора домена
- [ ] **SSL сертификат** автоматически выпущен (Cloudflare это делает)
- [ ] **Редирект от www** настроен (если нужно)

---

**Всё готово?** Контакт Tanya через Instagram (ссылка в footer) для финальной проверки
