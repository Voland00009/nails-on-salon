---
phase: B.1
type: legal-compliance-audit
created: 2026-05-01
status: ready-for-review
target: ADA Title III + Unruh Act + CA legal compliance for Nails On Salon (sole proprietor, National City, CA)
methodology: research-first (WebSearch May 2026) + 4-agent debate (researcher / architect / critic / orchestrator)
---

# Phase B Compliance Audit — Nails On Salon

## TL;DR

Сайт сейчас не имеет accessibility statement, privacy policy, terms of service, и публикует Google Fonts + Maps iframe + UTM-tracking ссылки в IG. Это **повышенная экспозиция** в #1 ADA-litigation jurisdiction страны (California, 3,252 web a11y лawsuit-ов в 2025).

**Решено:** в Phase B.2 публикуем 3 legal страницы (с пост-критик формулировками), убираем Maps iframe и Google Fonts (data-leak vectors), зачищаем UTM из публичных ссылок, фиксим conspicuous display лицензии в footer.

**Блокировка B.2:** нужны от Тани — legal name, email, домен, photo release confirmation.

**B.3** — manual a11y audit (NVDA + VoiceOver iOS + keyboard) после B.2.

---

## 1. Risk Landscape (May 2026)

### 1.1 ADA Title III + Unruh Act

| Метрика 2025 | Значение | Источник |
|---|---|---|
| Total federal ADA Title III lawsuits | 8,667 (-2% YoY) | Seyfarth Shaw [adatitleiii.com](https://www.adatitleiii.com/) |
| Web accessibility federal lawsuits | 3,117 (+27% YoY) | Seyfarth Shaw |
| California ranking | #1 (3,252 lawsuits) | Seyfarth Shaw |
| % targeting businesses < $25M revenue | 67% | TestParty / WCAGsafe |
| Pro se filings increase | +40% YoY | UsableNet, AI-assisted draft via ChatGPT |
| Settlement single-plaintiff | $5,000 – $20,000 | UsableNet tracker |
| Settlement w/ consent decree | $25,000 – $75,000 | UsableNet tracker |
| Unruh Act statutory damages | **$4,000 minimum per violation** + atty fees | CA Civil Code §52 |
| De facto standard | **WCAG 2.1 Level AA** | CA settlement agreements pattern |

**Implication для Тани:** small CA business — primary target demographic. WCAG 2.1 AA — обязательный baseline.

### 1.2 Accessibility Overlays (Definitively Avoid)

- 1,023 lawsuits в 2024 против сайтов **с overlay'ами** (UsableNet)
- 119 defendants/month sued WHILE having a 3rd-party widget (UsableNet, May 2025)
- FTC fined AccessiBe **$1M** в 2024 за deceptive marketing claims
- Lainey Feingold: overlays часто **активно мешают** screen readers
- [Why Your Website's Accessibility Widget Might Be a Lawsuit Waiting to Happen](https://blog.usablenet.com/why-your-websites-accessibility-widget-might-be-a-lawsuit-waiting-to-happen)

**Implication:** ZERO tolerance. Никаких AccessiBe / UserWay / EqualWeb / overlay-плагинов. Никогда.

### 1.3 Lighthouse — Coverage Gap

- Автоматизированные тулы покрывают **30-40%** WCAG criteria
- Manual coverage обязательна: keyboard nav, NVDA/VoiceOver smoke test, focus management (focus trap, focus return after dialog close), logical heading order, accessible name calculation, ARIA correctness, error states
- Reference: [WebAIM WCAG 2 Checklist](https://webaim.org/standards/wcag/checklist), [W3C Accessibility Evaluation Tools](https://www.w3.org/WAI/test-evaluate/tools/list/)

**Implication:** Phase A Lighthouse ≥95 — необходимый, но не достаточный baseline. B.3 manual audit обязателен.

### 1.4 CCPA / CPRA Scope

| Threshold (2026) | Значение |
|---|---|
| Annual gross revenue | $26,625,000+ |
| CA consumers/households | 100,000+ annually |
| Revenue from data sale/share | 50%+ |

**Status для Тани:** ни одного threshold не достигает. Static сайт с zero analytics, zero forms, zero cookies — формально **NOT covered** by CCPA.

**Caveats (best practice anyway):**
- Google Maps iframe → ships данные пользователя на Google
- Google Fonts → ships IP-адрес пользователя на Google
- Adding GA / contact form / Pixel позже без service-provider контракта → AG может квалифицировать как "sale" of PI (retroactive liability если Privacy Policy утверждает обратное)

**Implication:** Privacy Policy не обязателен по букве, но **публикуем** как trust signal + future-proofing. Wording должен быть *честным* про third-party data flows.

### 1.5 Accessibility Statement — Wording Best Practice

- DO NOT claim "fully compliant" — **liability admission**
- DO NOT claim "ADA Compliant" — нет такой сертификации в США; invitation to sue
- DO NOT promise specific response time — становится self-enforcing trigger
- DO use W3C WCAG-EM language: "aims to conform... working to identify and address..."
- DO provide **email** as primary feedback channel (NOT Instagram — недоступен screen-reader users без онбординга)
- Reference: [W3C Accessibility Statement Generator](https://www.w3.org/WAI/planning/statements/generator/), [Lainey Feingold 2026 Resources](https://www.lflegal.com/2026/03/legal-update-links/)

---

## 2. Decisions (Disputed Points → Final Calls)

| # | Disputed point | Final decision | Reason |
|---|---|---|---|
| 1 | Response time commitment в a11y statement | **Removed** | Self-enforcing trigger. Plaintiff sends test request, waits 6 days, files demand letter |
| 2 | Instagram DM as a11y feedback channel | **Removed; email-only** | Blind users часто не могут пройти Instagram onboarding → circular Unruh §51 fail |
| 3 | "Partially conformant" wording | **Replaced with "aims to conform"** | "Partially conformant" = prima facie admission в CA court |
| 4 | Google Maps iframe | **Removed; static replacement** | Admitted "known barrier" + third-party data leak. Заменяем на статический block с адресом + ссылкой на Maps |
| 5 | `accessibilityHazard: "none"` в Schema | **Removed entirely** | Сайт имеет lightbox `scale(0.9→1)` + transitions. Заявление в индексируемом Schema = potential FTC §5 deceptive practice |
| 6 | Photo releases от клиентов | **Owner accepted risk 2026-05-02 — no written releases; use defensive Terms wording instead** | Tetiana confirmed verbal consent at session time, no written. /terms §4 reformulated to removal-on-request posture (no affirmative "with permission" claim) |
| 7 | Google Fonts | **Self-host via @fontsource** | `fonts.googleapis.com` шлёт IP пользователя на Google. "We do not collect" claim противоречит |
| 8 | Domain timing для legal docs | **Publish only after domain registered** | Effective date + canonical URL должны быть финальными для audit trail |
| 9 | License display в footer | **Full opacity, "CA Cosmetology License M 368744"** | BPC §7390+ требует "conspicuous display"; `text-white/50` + 12px не conspicuous |
| 10 | UTM в Instagram profile URL | **Strip from public code** | `utm_source=qr` шлёт tracking parameter в Meta — противоречит "no analytics" claim |
| 11 | `openingHoursSpecification` для "by appointment only" | **Description-only, no hours** | Стандартного Schema для "by appt only" нет; `description` field не покажет неверные часы в SERP |
| 12 | Lightbox + VoiceOver iOS | **Audit in B.3** | `body{overflow:hidden}` может ломать VoiceOver iOS scroll — нужна проверка |
| 13 | Mobile menu swipe | **Don't document as primary mode** | X-кнопка + Escape покрывают WCAG 2.5.1; swipe = progressive enhancement |
| 14 | `rel="noopener noreferrer"` на IG | **Keep as-is** | Trade-off: безопасность важнее retro analytics, которые Тане не нужны |

---

## 3. Final Document Outlines

### 3.1 `/accessibility` — Accessibility Statement

**Structure (W3C-aligned, post-critic):**

1. **Our Commitment**
   > "Nails On Salon is committed to ensuring this website is accessible to people with disabilities. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA."

2. **Measures We Have Taken**
   - Semantic HTML5 landmarks (header, main, footer, nav)
   - Descriptive alt text on all content images
   - Keyboard navigation: skip-to-content link, visible focus indicators, focus trap in dialogs and mobile menu
   - `prefers-reduced-motion` respected for all animations
   - ARIA labels on interactive elements
   - Color contrast meeting WCAG 1.4.3 AA

3. **Areas We Are Working On**
   - Screen reader testing across NVDA + JAWS combinations is ongoing
   - VoiceOver iOS scroll behaviour in photo viewer is under review

4. **Third-Party Content**
   > "This site links to Instagram for booking. Instagram's accessibility is outside our control. If you cannot use Instagram to book an appointment, please contact us by email and we will arrange an alternative."

5. **Feedback and Contact**
   > "We welcome feedback on accessibility barriers. Email: `[TETIANA_EMAIL]`. We will acknowledge your message and work to address the issue."
   > **No Instagram. No time commitment.**

6. **Formal Complaints**
   > "If you are not satisfied with our response, you may contact the U.S. Access Board (access-board.gov) or file a complaint under the Americans with Disabilities Act."

7. **Date of Statement** — populated post-domain-registration

---

### 3.2 `/privacy` — Privacy Policy

**Structure (post-critic):**

1. **Who We Are**
   > "Nails On Salon is operated by `[TETIANA LEGAL NAME]`, a sole proprietor located at 3030 Plaza Bonita Rd, Unit 1336, Suite 117, National City, CA 91950."

2. **Information We Do Not Collect**
   > "This website does not use cookies. It does not collect, store, or process any personal information directly. There are no contact forms or analytics on this website."

3. **Third-Party Services That May Process Your Data**
   - **Cloudflare Pages** (hosting): "Our hosting provider may log standard server access data including IP addresses. See [Cloudflare's Privacy Policy](https://www.cloudflare.com/privacypolicy/)."
   - **Instagram**: "Clicking our Instagram link takes you to Instagram (Meta Platforms). Meta's data practices are governed by their [Privacy Policy](https://privacycenter.instagram.com/policy)."

   *(Google Maps removed — replaced with static block in B.2. Google Fonts removed — self-hosted in B.2.)*

4. **Instagram Booking**
   > "Booking is handled via Instagram Direct Message. Any information you share via DM is subject to Instagram's (Meta's) Privacy Policy, not ours."

5. **Your California Privacy Rights**
   > "As a California resident, you have rights under the CCPA/CPRA. Because we do not collect personal information through this website, there is no data to access, delete, or opt out of. For privacy questions: `[TETIANA_EMAIL]`."

6. **Changes to This Policy** — generic statement
7. **Effective Date** — populated post-domain-registration

---

### 3.3 `/terms` — Terms of Service

**Structure (post-critic):**

1. **Acceptance** — "By using this website, you agree to these Terms."
2. **About This Website** — informational only; sole proprietorship of `[TETIANA LEGAL NAME]`
3. **Booking** — exclusively via Instagram DM; no booking commitment created by viewing site
4. **Photography** (UPDATED 2026-05-02 — owner accepted verbal-consent risk):
   > "Portfolio photographs displayed on this website show original nail work performed at Nails On Salon. If you are depicted in any photograph and would like it removed, please contact us at nailsonsalon@gmail.com and we will remove it promptly."

   *Defensive removal-on-request wording. Replaces earlier "with client permission" formulation, which is an unverifiable affirmative claim absent written releases. (See `memory/photo-release-required.md`.)*
5. **Accuracy of Information** — reasonable efforts; prices/availability subject to change
6. **External Links** — disclaimer about Instagram + third parties
7. **Limitation of Liability** — to the extent permitted by law
8. **Governing Law** — California, San Diego County
9. **Contact** — `[TETIANA_EMAIL]`
10. **Last Updated** — populated post-domain-registration

---

### 3.4 Banned Wording Across All 3 Documents

| Phrase | Reason |
|---|---|
| "ADA Compliant" / "ADA Certified" | Нет такой US сертификации; false advertising + invitation to sue |
| "Fully accessible to all users" | Непроверяемо; один баг опровергает — admission of misrepresentation |
| "Fully conformant with WCAG" | Liability admission без VPAT |
| "Partially conformant" | Prima facie evidence в CA court |
| "We use [overlay/widget] to ensure accessibility" | FTC precedent (AccessiBe $1M); overlays interfere with AT |
| "We are not responsible for third-party content" | Не освобождает от ответственности за embedded iframes — суды это не принимают |
| "This site is best viewed in Chrome/...." | WCAG 1.3.4 fail — implied browser restriction |
| "We reserve the right to deny service" | В CA — flag для Unruh Act discrimination claim |
| "By using this site you agree..." без visible link | Unenforceable + FTC dark pattern |
| "We will respond within X business days" | Self-enforcing litigation trigger |
| "We comply with GDPR" | Без EU audience — пустая декларация |

---

## 4. Site-Level Changes (B.2 Scope)

### 4.1 Footer (`src/components/Footer.astro`)

**Change A — License display (BPC §7390+ conspicuous fix):**

```diff
- <span>CA License: M 368744</span>
+ <span class="text-white text-xs">CA Cosmetology License M 368744</span>
```
Full opacity. Polite text size. Explicit "Cosmetology License" wording.

**Change B — Add legal links nav block** (above copyright row):

```html
<nav aria-label="Legal">
  <ul role="list" class="flex gap-4 text-white/70 text-xs">
    <li><a href="/accessibility">Accessibility</a></li>
    <li><a href="/privacy">Privacy Policy</a></li>
    <li><a href="/terms">Terms of Service</a></li>
  </ul>
</nav>
```
Min `py-1` для tap target ≥ 44px.

### 4.2 Instagram URL (`src/config/site.ts`)

```diff
- export const instagramProfileUrl =
-   'https://www.instagram.com/nailsonsalon?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr';
+ export const instagramProfileUrl = 'https://www.instagram.com/nailsonsalon';
```
`instagramDmUrl` (`ig.me/m/nailsonsalon`) — без UTM, оставляем как есть.

### 4.3 BaseLayout (`src/layouts/BaseLayout.astro`)

**Change A — Self-host fonts** (replace lines 64-69):

Install:
```
npm install @fontsource/cormorant-garamond @fontsource/dm-sans
```

In `src/styles/global.css`:
```css
@import '@fontsource/cormorant-garamond/300.css';
@import '@fontsource/cormorant-garamond/400.css';
@import '@fontsource/cormorant-garamond/600.css';
@import '@fontsource/cormorant-garamond/400-italic.css';
@import '@fontsource/dm-sans/400.css';
@import '@fontsource/dm-sans/500.css';
```

Remove from BaseLayout (`<head>`):
```diff
- <link rel="preconnect" href="https://fonts.googleapis.com" />
- <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
- <link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet" />
```

**Change B — Schema.org adjustments** (in `localBusinessSchema`):

```diff
+ openingHoursSpecification: {
+   '@type': 'OpeningHoursSpecification',
+   dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
+   description: 'By appointment only'
+ },
+ accessibilityFeature: ['alternativeText', 'structuralNavigation'],
```

**NOT adding:**
- `accessibilityHazard` (overclaim risk)
- `accessibilityAPI` (overclaim без полного аудита)
- Стандартные `opens`/`closes` времена (некорректны для appt-only)

### 4.4 Google Maps → StaticMap

Удалить `src/components/GoogleMap.astro` (весь iframe + lang script).

Создать `src/components/StaticMap.astro`:

```astro
---
const address = '3030 Plaza Bonita Rd, Unit 1336, Suite 117, National City, CA 91950';
const mapsUrl = 'https://maps.google.com/?q=3030+Plaza+Bonita+Rd+National+City+CA+91950';
---
<div class="rounded-lg bg-bg-tint p-6 text-center">
  <p class="font-medium text-ink mb-2">{address}</p>
  <a
    href={mapsUrl}
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center gap-2 text-brand hover:text-ink transition-colors py-2"
    aria-label="Open location in Google Maps (opens in new tab)"
  >
    View on Google Maps →
  </a>
</div>
```

Заменить все `<GoogleMap />` на `<StaticMap />` в `src/pages/index.astro`, `src/pages/book.astro`.

**Опционально:** добавить static screenshot карты как `<img>` с `alt="Map showing salon location at 3030 Plaza Bonita Rd, National City"` — если визуально просится. Но это требует генерации скриншота и оптимизации в AVIF/WebP — лучше дискутировать в B.2.

### 4.5 Mobile menu swipe documentation

В `/accessibility` — НЕ упоминаем swipe-to-close как primary mode. X-кнопка + Escape + клавиатура покрывают WCAG 2.5.1. Swipe в коде остаётся как progressive enhancement (это допустимо).

---

## 5. Pre-Implementation Blocks (B.1.5 — нужна Таня)

### 5.1 Required Data Points

| # | Data | Used in | Blocks |
|---|---|---|---|
| 1 | **Legal full name** (first + last) | `/privacy` §1, `/terms` §2 | All B.2 docs |
| 2 | **Email for accessibility/privacy feedback** | `/accessibility` §5, `/privacy` §5, `/terms` §9 | All B.2 docs |
| 3 | **Domain decision** (register `nailsonsalon.com` or alternative) | Effective date + canonical URL во всех документах | All B.2 docs |
| 4 | **Domain registration timing** | Когда стартуем B.2 | B.2 scheduling |
| 5 | **Photo identifiability confirmation** | `/terms` §4 wording | B.2 docs |
| 6 | **Business entity confirmation** (sole prop / LLC / DBA) | `/privacy` §1, `/terms` §2 | B.2 docs |

### 5.2 Photo Releases

**Decision tree:**

- **All photos = unidentifiable hands only** (no jewelry, rings, tattoos, distinctive marks): достаточно formula в Terms §4 + verbal client agreement
- **ANY photo с identifiable element**: требуется письменный photo release ДО публикации

**Reference template (для photo release):**

> "I, `[Client Name]`, grant Nails On Salon (operated by `[Tetiana Legal Name]`) permission to use photographs of my hands and nail work taken on `[Date]` for portfolio and marketing purposes on the Nails On Salon website (`[Domain]`) and Instagram account (@nailsonsalon). I understand these images may be displayed publicly and may be reproduced for similar purposes. I waive any claims for compensation related to such use."
>
> Signed: `[Client Name]` / Date: `[Date]`

**Action для Тани:** пройтись по 8 портфолио-фото, идентифицировать клиентов → отправить релиз каждой → собрать подписи (digital ok via DocuSign / e-mail confirmation).

### 5.3 Domain Decision Recommendation

Prefer registering `nailsonsalon.com` before publishing legal docs. Cost: ~$12-15/year. Cloudflare Registrar — at-cost pricing, авто-подключение к Pages.

---

## 6. Manual Audit Checklist (B.3 Scope)

### P0 — Blockers

- [ ] **Keyboard nav** — Tab через все 4 страницы без мыши; каждый interactive element достижим
- [ ] **Focus indicator** — visible на каждом focusable element (no `outline: none` без замены)
- [ ] **Focus trap** — mobile menu trap; lightbox `<dialog>` trap; Escape закрывает оба; focus возврат к trigger
- [ ] **Lightbox + VoiceOver iOS** — тест на real iPhone; `body{overflow:hidden}` может ломать VO scroll
- [ ] **Color contrast** — все text/bg pairs через WebAIM contrast checker; особо `#6B5B5E` на `#FFF5F7`
- [ ] **Skip link** — работает в Chrome/Firefox/Safari

### P1 — Pre-Production

- [ ] **NVDA + Chrome** — главная + gallery; verify nav landmarks, alt text, lightbox announces image alt при смене
- [ ] **Target size** — все кнопки ≥ 44×44px (WCAG 2.5.5). Footer legal links: добавить `py-1` или `py-2`
- [ ] **`aria-current="page"`** — screen reader озвучивает correctly
- [ ] **Image alt quality review** — каждый alt описывает содержимое (NOT "photo 1", "image")
- [ ] **`target="_blank"` + `aria-label`** — все external links имеют "(opens in new tab)" hint
- [ ] **JSON-LD validator** — schema.org validator после B.2 changes; verify `openingHoursSpecification` с `description` не вызывает Rich Results errors
- [ ] **Lightbox image alt switching** — NVDA/VoiceOver анонсирует новый alt при prev/next navigation (может потребовать `aria-live` на image container)

### P2 — Nice to Have

- [ ] **AAA contrast (7:1)** — for primary text
- [ ] **`prefers-reduced-motion`** — Header.astro mobile menu transitions обёрнуты
- [ ] **Lighthouse Accessibility ≥ 95** — на ВСЕХ 4 страницах + 3 новых legal страницах

### Tools

- **axe DevTools** (browser extension) — automated baseline
- **NVDA** (Windows, free) + Chrome
- **VoiceOver** (macOS / iOS) + Safari
- **Windows Narrator** — secondary check
- **Keyboard-only browsing** в обычном Chrome

---

## 7. Phase B Sub-Session Split

| Session | Scope | Duration | Blockers |
|---|---|---|---|
| **B.1** (current) | Audit report, debate synthesis, B.2 plan | ~1.5h | None |
| **B.1.5** (offline, не сессия) | Tetiana data + photo releases + domain registration | days | Депенды от Тани |
| **B.2** (next session) | Implementation: 3 страницы + footer + schema + Maps swap + fonts self-host + UTM cleanup | ~2-3h | B.1.5 complete |
| **B.3** (after B.2 deploy) | Manual a11y audit + fixes | ~2-4h | B.2 deployed |

---

## 8. Top 3 Production Blockers (MUST NOT Ship Without)

### 8.1 No "Partially conformant" wording in any document

Replace with: *"Nails On Salon is committed to ensuring this website is accessible. We aim to meet WCAG 2.1 Level AA and are actively working to identify and address any barriers."*

Reason: "Partially conformant" = prima facie admission в CA court. Plaintiff не должен доказывать нарушение — бизнес сам задокументировал.

### 8.2 No `accessibilityHazard: "none"` in Schema

Site has `transform: scale(0.9→1)` lightbox (GalleryLightbox.astro:151-158), fade animations, hover transitions. Schema field в Google index = публичное утверждение.

Misrepresentation в индексируемых данных = potential **FTC §5 deceptive practice** на топе WCAG нарушения. Поле **удалить полностью** — не значение менять.

### 8.3 No Google Maps iframe + No "5 business days" response promise

Maps iframe → "known intentional barrier" theory + third-party data leak (контролируемый Google).
Replace with `StaticMap.astro` (адрес + ссылка на Google Maps).

Time commitment в a11y feedback channel → self-enforcing litigation trigger. Plaintiff sends test request, waits, files demand letter on day 6.

---

## 9. Anti-Patterns (Confirmed Don'ts)

- **No accessibility overlay** (AccessiBe / UserWay / EqualWeb / etc.) — повышают exposure, не снижают
- **No "ADA Compliant" claim** anywhere — нет такой US сертификации
- **No response time commitment** в accessibility statement
- **No Instagram-only feedback channel** — недоступен screen-reader users
- **No Privacy/Terms publication ДО регистрации домена**
- **No `openingHoursSpecification` со стандартными часами** — у нас "by appointment only"
- **No "we reserve the right to deny service"** wording — Unruh Act flag в CA
- **No "we comply with GDPR"** — пустая декларация без EU audience
- **No click-to-contract** без visible link на Terms

---

## 10. References

### ADA Title III + Litigation Trends
- [Seyfarth Shaw — ADA Title III blog](https://www.adatitleiii.com/)
- [Federal Court Website Accessibility Filings 2025](https://www.adatitleiii.com/2026/03/federal-court-website-accessibility-lawsuit-filings-bounce-back-in-2025/)
- [Seyfarth Shaw — Federal lawsuit filings 8,667 in 2025](https://www.adatitleiii.com/2026/02/ada-title-iii-federal-lawsuit-filings-fall-slightly-to-8667-in-2025/)
- [TestParty — ADA Lawsuit Trends 2025-2026](https://testparty.ai/blog/ada-lawsuit-trends-ecommerce-2025-2026-data)
- [WCAGsafe — ADA Lawsuit Statistics](https://wcagsafe.com/blog/ada-lawsuit-statistics)
- [UsableNet ADA Compliance Lawsuit Tracker](https://info.usablenet.com/ada-website-compliance-lawsuit-tracker)

### Unruh Civil Rights Act
- [Hoge Fenton — ADA Drive-By Lawsuits and Unruh](https://www.hogefenton.com/news-events/rise-of-ada-drive-by-lawsuits-unruh/)
- [Accessibility.Works — Unruh Act Website Accessibility](https://www.accessibility.works/california-unruh-act-website-accessibility/)
- [JMBM — California Unruh Civil Rights Act Basics](https://ada.jmbm.com/california-unruh-civil-rights-act-law-basics/)

### Accessibility Overlays — Litigation Risk
- [Lainey Feingold — Beware of AI Accessibility Promises (FTC v. AccessiBe)](https://www.lflegal.com/2025/01/ftc-accessibe-million-dollar-fine/)
- [Lainey Feingold — UserWay Overlay Lawsuit](https://www.lflegal.com/2025/02/userway-overlay-lawsuit/)
- [Lainey Feingold — 2026 Legal Update Resources](https://www.lflegal.com/2026/03/legal-update-links/)

### WCAG / Manual Audit
- [WebAIM — WCAG 2 Checklist](https://webaim.org/standards/wcag/checklist)
- [W3C — Web Accessibility Evaluation Tools](https://www.w3.org/WAI/test-evaluate/tools/list/)
- [Accessible.org — WCAG 2.1 AA + 2.2 AA Checklist](https://accessible.org/wcag/)

### CCPA / CPRA
- [CA AG — CCPA Overview](https://oag.ca.gov/privacy/ccpa)
- [CCPA — Effective January 1, 2026 (statute)](https://cppa.ca.gov/regulations/pdf/ccpa_statute_eff_20260101.pdf)
- [Jackson Lewis — Navigating CCPA 2026 FAQs](https://www.jacksonlewis.com/insights/navigating-california-consumer-privacy-act-30-essential-faqs-covered-businesses-including-clarifying-regulations-effective-1126)
- [Clym — CCPA Applicability 2026 Guide](https://www.clym.io/blog/ccpa-applicability-guide)

### Accessibility Statement Templates
- [W3C WAI — Accessibility Statement Generator](https://www.w3.org/WAI/planning/statements/generator/)
- [W3C WAI — Complete Accessibility Statement Example](https://www.w3.org/WAI/planning/statements/complete-example/)
- [Accessiblu — Accessibility Statement Trap](https://www.accessiblu.com/insights/the-accessibility-statement-trap-what-most-companies-get-wrong-and-how-yours-can-actually-protect-you/)
- [ABA — Digital Accessibility Under Title III: Recent Developments](https://www.americanbar.org/groups/business_law/resources/business-law-today/2025-august/digital-accessibility-under-title-iii-ada/)

### CA License Display
- [CA Board of Barbering and Cosmetology](https://barbercosmo.ca.gov/) (BPC §7390+ — conspicuous license display)

---

*Audit completed 2026-05-01 by Claude (Opus 4.7) via 4-agent debate (architect, critic, orchestrator) on top of WebSearch research from May 2026 sources.*
