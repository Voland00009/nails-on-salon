---
phase: B.2
status: completed
blocking: none
created: 2026-05-01
updated: 2026-05-02
completed: 2026-05-02
parent: docs/compliance/audit-report-2026-05-01.md
target: implement legal pages + site-level a11y/privacy hardening per audit decisions
---

## Implementation outcome (2026-05-02)

Все 8 пунктов выполнены, `npm run build` проходит, 8 страниц сгенерированы (4 контентных + 3 legal + 404).

### Изменения
- `package.json` — добавлены `@fontsource/cormorant-garamond`, `@fontsource/dm-sans`
- `src/styles/global.css` — 6 `@import` строк для self-hosted шрифтов перед `@tailwind`
- `src/layouts/BaseLayout.astro` — убраны 3 `<link>` на Google Fonts; в Schema добавлены `openingHoursSpecification` (description-only) и `accessibilityFeature: ['alternativeText','structuralNavigation']`
- `src/config/site.ts` — UTM strip из `instagramProfileUrl`
- `src/components/Footer.astro` — License full opacity ("CA Cosmetology License M 368744") + nav block с Accessibility / Privacy / Terms
- `src/components/StaticMap.astro` — новый компонент (адрес + ссылка на Google Maps); удалён `src/components/GoogleMap.astro` (iframe)
- `src/pages/index.astro` — `<GoogleMap />` → `<StaticMap />`
- `src/pages/accessibility.astro`, `privacy.astro`, `terms.astro` — 3 новые страницы с финальным wording из audit Section 3

### Deviations from spec (документировано)
- StaticMap link использует `text-ink underline decoration-brand` вместо `text-brand hover:text-ink` из audit Section 4.4 — `#FFC2D1` на `bg-bg-tint` даёт контраст ~1.5:1 (нарушение WCAG 1.4.3, противоречит whole point B.2). Перешёл на проверенный паттерн из book.astro.

### Verified в build output
- `fonts.googleapis.com` — 0 occurrences
- `google.com/maps/embed` — 0 occurrences
- `utm_source=qr` — 0 occurrences
- Schema содержит `openingHoursSpecification`, `accessibilityFeature`, `By appointment only`
- Footer содержит legal nav + "CA Cosmetology License M 368744"
- Legal pages содержат `Tetiana Yaresko`, `nailsonsalon@gmail.com`, дату `2026-05-02`
- Terms §4 содержит "remove it promptly"

### Pre-existing issue (не из B.2, отдельный фикс)
В `src/pages/gallery.astro:57` есть `<GalleryLightbox client:visible />` — Astro предупреждает: Astro components нельзя гидрировать (`client:*` — для framework components). Появилось в Phase A (commit 95ce345 / 394433a). Сейчас не ломает build, но загрязняет лог. Стоит просто убрать `client:visible` — у компонента есть собственный `<script>`, который Astro инлайнит автоматически.

### Next steps
1. Deploy на Cloudflare Pages (auto-deploy от main при наличии GitHub integration; иначе — manual `wrangler pages deploy dist`)
2. После deploy → Phase B.3 (manual a11y audit: NVDA + VoiceOver iOS + keyboard, чек-лист в audit report Section 6)
3. Напомнить Tetiana про ICANN email confirmation для домена (14-дневный лимит до suspension)


## All inputs received (2026-05-02)

- **Legal name:** Tetiana Yaresko
- **Email:** `nailsonsalon@gmail.com`
- **Entity:** sole proprietor
- **Domain:** `nailsonsalon.com` — registered via Cloudflare Registrar, connected to Pages, https://nailsonsalon.com active with SSL
- **Photos:** owner accepted verbal-consent risk; NO written releases. Use defensive removal-on-request wording in /terms §4 (see `memory/photo-release-required.md`)

**Status:** unblocked, ready to execute.

**Note:** Email verification от ICANN — outstanding action item для Tetiana (must click link in email within 14 days of registration to avoid domain suspension). Не блокирует B.2 implementation, но напомни юзеру если ещё не сделано.

# Phase B.2 — Implementation Session

## Что мы делаем

Реализуем decisions из `docs/compliance/audit-report-2026-05-01.md` Section 4 (Site-Level Changes).

**8 изменений в одной сессии:**

1. Self-host fonts (`@fontsource/cormorant-garamond` + `@fontsource/dm-sans`) — убираем Google Fonts из BaseLayout
2. Remove Google Maps iframe — заменяем на `StaticMap.astro` компонент (адрес + ссылка на Maps)
3. Strip UTM из Instagram profile URL в `src/config/site.ts`
4. Footer fix — License text "CA Cosmetology License M 368744" с full opacity
5. Footer add — legal nav block (Accessibility / Privacy / Terms)
6. Schema.org — добавить `openingHoursSpecification` с `description` only + `accessibilityFeature: ["alternativeText", "structuralNavigation"]`. **NOT** добавлять `accessibilityHazard`, `accessibilityAPI`
7. Создать 3 страницы: `src/pages/accessibility.astro`, `src/pages/privacy.astro`, `src/pages/terms.astro` с финальными текстами из Section 3 audit report
8. Smoke check — `npm run build`, открыть страницы локально, проверить footer rendering, lightbox/menu по-прежнему работают

## Перед стартом B.2 — обязательные blocks

Без этих данных **не стартуем**. Документы с placeholders в production = ещё хуже, чем без документов.

### Status (resolved 2026-05-02)

| # | Что | Status |
|---|---|---|
| 1 | Legal name | ✓ Tetiana Yaresko |
| 2 | Email | ✓ nailsonsalon@gmail.com |
| 3 | Domain | ⏳ Cloudflare Registrar checkout in progress |
| 4 | Entity | ✓ sole proprietor |
| 5 | Photo releases | ✓ owner accepted risk; defensive Terms §4 wording |

### Photo decision (2026-05-02 — risk accepted)

No written releases will be obtained. Verbal consent at session time is the only basis. /terms §4 uses **removal-on-request** posture (NOT affirmative "with permission" claim):

> "Portfolio photographs displayed on this website show original nail work performed at Nails On Salon. If you are depicted in any photograph and would like it removed, please contact us at nailsonsalon@gmail.com and we will remove it promptly."

See `memory/photo-release-required.md` for full reasoning.

### Domain (almost done)

Tani is purchasing via Cloudflare Registrar. Once complete, she will report the final domain (`nailsonsalon.com` or alternative). Used for canonical URLs + effective dates in all 3 legal documents.

## Continue prompt для копипаста

```
Продолжай по плану: plans/next-session-phase-b2-implementation.md

Все B.1.5 blocks разрешены:
- Legal name: Tetiana Yaresko
- Email: nailsonsalon@gmail.com
- Entity: sole proprietor
- Domain: nailsonsalon.com (live, SSL active)
- Photo decision: accept risk, defensive removal-on-request wording в /terms §4 (см. memory/photo-release-required.md)

Выполняй decisions из docs/compliance/audit-report-2026-05-01.md Section 4 строго в порядке:
1. self-host fonts → 2. remove Maps iframe → 3. strip UTM → 4-5. footer fix+legal nav → 6. schema → 7. 3 legal pages → 8. smoke check + build

Wording для 3 страниц — буквально как в audit report Section 3, без отсебятины. Ничего не добавляй типа "ADA Compliant" или time-commitment в feedback. Banned wording list — Section 3.4 audit report.

После B.2 deploy на Cloudflare Pages → переходим в B.3 (manual a11y audit).
```

## Out of scope для B.2 (relegate to later)

- Manual a11y audit (это B.3 — отдельная сессия)
- VPAT 2.5 заполнение (overkill для small business, skip)
- Section 508 compliance (только для federal procurement, N/A)
- Google Business Profile setup
- Real Google Analytics replacement (если когда-нибудь добавлять — Plausible / Cloudflare Web Analytics privacy-friendly options, тогда отдельная Privacy update)

## Что важно помнить

- **Никаких overlays.** AccessiBe / UserWay / EqualWeb — полный запрет. FTC fined AccessiBe $1M в 2024.
- **Никаких "ADA Compliant" claims.** Нет такой US сертификации.
- **Никаких time commitments** в accessibility feedback.
- **Email-only** для accessibility feedback channel. Instagram — НЕ accessibility channel.
- **`accessibilityHazard: "none"`** не добавлять в Schema. Сайт имеет анимации — это будет misrepresentation.
- **Maps iframe убираем полностью** — не пытаться "пофиксить" iframe accessibility.

## Reference

- Полный audit report: `docs/compliance/audit-report-2026-05-01.md`
- Phase B parent plan: `plans/next-session-phase-b-legal.md`
- Project memory: `~/.claude/projects/<hash>/memory/MEMORY.md` (compliance-decisions, banned-wording, photo-release entries)
