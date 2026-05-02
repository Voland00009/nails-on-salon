---
phase: B
status: ready-to-start
created: 2026-05-01
target: legal/regulatory compliance audit for US small-business website (CA-based nail salon)
---

# Phase B — US legal compliance audit

## Кратко

Тане-мастеру в National City, CA нужен сайт, который не подставит её под характерный для Калифорнии ADA-litigation бизнес. Это значит: WCAG 2.1 AA по букве, плюс privacy/disclosure documents, плюс пара мелочей под California-specific нормы.

Триггер: знакомых судили за неадаптированное приложение для слепых. ADA Title III + Unruh Act = распространённая связка для serial plaintiffs.

## Стек экспертов для `/captain-debate`

3 domain эксперта (по 20+ лет в нише) + orchestrator. Подбери промпты под конкретные personas — например:

- **Researcher (ADA litigation analyst)** — изучает 2026 trends в digital accessibility lawsuits в California: что становится reasonable, какие demand letters most common, какие плагины / overlays считаются insufficient. Источники: court filings 2024–2026, Seyfarth Shaw ADA tracker, ADA Title III News.
- **Architect (a11y engineer + privacy attorney hybrid)** — проектирует concrete remediation plan: какие страницы добавить (Accessibility Statement, Privacy Policy, Terms), какие schema-markup поправки, нужен ли cookie banner (сейчас нет analytics, но если будут — нужен), какой VPAT уровень закрываем.
- **Critic (defendant-side lawyer)** — атакует план: где скрытые риски, что забыто, какие утверждения нельзя делать ("we are fully compliant" — это запрещённая формулировка), нужны ли disclaimers.
- **Orchestrator** — синтезирует, выдаёт punch list по приоритетам (must / should / nice).

## Scope (research-first, перед debate)

Перед debate сделай сначала research через `WebSearch` + `context7`:

1. **ADA Title III + WCAG 2.1 AA** — текущий target. Lighthouse ≥ 95 ≠ полная compliance. Нужен manual audit паттернов: keyboard nav, screen reader, focus management, error messages, контрастные тесты для всего, не только heading.
2. **California Unruh Civil Rights Act** — амплифицирует ADA до $4 000 statutory damages per visit. Главный driver litigation в CA.
3. **CCPA / CPRA** — если на сайте появятся: cookies, GTM, analytics, contact form, subscribe — нужен Privacy Policy + "Do Not Sell or Share" link для CA residents. Сейчас сайт чистый (zero trackers), но нужно зафиксировать политику.
4. **Privacy Policy + Terms of Service** — даже без сбора данных рекомендуют иметь. Шаблон + персонализация под Tanya's setup.
5. **California Bureau of Barbering & Cosmetology** — license display rule. Уже есть `M 368744` в footer. Проверить — точно ли формат соответствует требованиям (M-prefix, 6 digits).
6. **FTC truth-in-advertising** — claims на сайте: "premium", "signature", "unhurried". Вроде безопасны (subjective), но проверить best practice.
7. **VPAT 2.5** — formal accessibility conformance report. Для small business overkill, но если хочется максимум защиты — заполнить шаблон.
8. **Section 508** — только если federal procurement. Skip.

## Deliverables Phase B

1. `docs/compliance/audit-report-2026-05-XX.md` — что нашли, severity, references на actual statutes/cases
2. `src/pages/accessibility.astro` — Accessibility Statement (обязательный артефакт для serial-plaintiff defense)
3. `src/pages/privacy.astro` — Privacy Policy (даже для zero-tracking сайта)
4. `src/pages/terms.astro` — Terms of Service
5. Footer link block для этих 3 страниц
6. Manual a11y audit checklist пройти: keyboard nav (Tab order), screen reader (NVDA/VoiceOver smoke test), форму focus management, error states (нет форм, но проверить mobile menu), motion preferences (prefers-reduced-motion уже есть)
7. Update `BaseLayout.astro` schema.org — `accessibilityFeature` array (alternativeText, structuralNavigation), `accessibilityHazard: "none"`

## Подготовка перед стартом

- Прочитай `~/.claude/projects/<hash>/memory/MEMORY.md` и все project memories — там уже зафиксирован context
- Прочитай `tasks/prd-nailsonsalon-website.md` — оригинальный ТЗ
- Проверь `git log --oneline -5` чтобы понять текущее состояние

## Continue prompt для копипаста в новой сессии

```
Продолжай по плану: plans/next-session-phase-b-legal.md

Кратко: Phase A (контент-правда + a11y базовый + code quality + deploy) завершена и запушена в main, Cloudflare Pages production = коммит 95ce345. Сайт живой на https://nails-on-salon.pages.dev. Теперь делаем Phase B — legal compliance audit для US small-business в California (ADA Title III, Unruh Act, CCPA, Privacy/Terms, accessibility statement).

Старт: research-first через WebSearch + context7 (ADA litigation 2026 trends, current WCAG manual audit techniques, CA Unruh Act recent cases), потом /captain-debate с тремя экспертами (ADA litigation analyst, a11y+privacy hybrid, defendant-side lawyer) + orchestrator. Цель — punch list по приоритетам и реализация Accessibility Statement + Privacy Policy + Terms + manual a11y audit.

Не пропускай research — твой knowledge cutoff устаревает, текущая ADA litigation практика в CA меняется ежеквартально. Пиши результаты в docs/compliance/audit-report-2026-05-XX.md, страницы — в src/pages/{accessibility,privacy,terms}.astro.
```
