# Local validation record

September 30, 2026, final pre-deployment cleanup. No push, deployment or production change.

## Automated checks

| Check | Result | Coverage |
| --- | --- | --- |
| Production build and Hostinger packaging | Pass | Nine HTML files, eight indexable pages; static output, no React integration or SSR |
| ESLint | Pass | Zero warnings/errors |
| Astro checks | Pass | 34 files; zero errors, warnings or hints. JavaScript checkJs is disabled; no claim of full strict JS checking |
| npm test | Pass, three regression tests | Approved project/case inventory; existing contact/Codex evidence; static routing and filename-scoped cache policy |
| Static verification | Pass | Links/assets and cross-page hashes, heading order, unique titles/descriptions, canonical/schema, srcset dimensions, 31 projects, three cases, nine roles, unchanged CV, eight sitemap URLs, no form/island/embed or Privacy links |
| Production exclusion checks | Pass | Removed form/runtime/configuration names absent; no legacy lighter pink/button shades or form styles; no private workflow patterns/source/env/dependencies at output root |
| HTTP verification | Pass | Eight direct routes; /privacy/, /privacy and /privacy/index.html return 404; missing/nested pages/assets return 404; hidden hosting files remain inaccessible; directory/CV 301; real PDF, PNG, CSS and WOFF/WOFF2 MIME; robots/sitemaps |
| Dependency audit | Pass | Zero reported vulnerabilities at review time |
| ZIP verification | Pass | 126 files, 11,540,534 bytes; extracted bytes match dist, including both .htaccess files |
| Whitespace check | Pass | Git's LF/CRLF normalization notices are not whitespace failures |

The five obsolete form-validation tests were removed with the form utility. The three remaining portfolio/hosting regression tests protect relevant behavior; static and HTTP verification were strengthened rather than bypassed.

## Browser verification

The static output runs at http://127.0.0.1:4173/. Contact was inspected at 1440×900, 390×844 and 320×740: no horizontal overflow, zero forms/islands, selectable email text, exact existing mailto/LinkedIn/GitHub destinations and exact #FF014F button background. Full-page screenshots and DOM checks are in [final-cleanup](final-cleanup/contact-checks.json).

All five unchanged homepage links navigated to #home, #expertise, #portfolio, #resume and #contact. Inner headers retain the same Home/Work/Cases/Experience/Contact destinations; actual clicks reached those pages. Generated verification checks every local anchor and asset. No obsolete privacy links remain.

Typing samples confirmed Web Developer, Full-Stack Developer and Automation Engineer. After section reveal, project hover measured -10px and the preview reached 50% 100% image position after its original five-second transition. Drawer, keyboard and focus were checked after cleanup. All timings and site.ts implementation remain unchanged. No new captured browser warnings/errors occurred in this run. No email was sent and no external profile account was changed.

## Colors and measurements

Only #FF014F and transparent tints of that exact color remain as pink accents. Small text uses existing white/muted neutrals. Pink-filled controls use #101114 text, approximately 4.83:1 contrast. Original decorative/large accent and focus outlines remain. This does not claim full WCAG conformance.

[BUILD_MEASUREMENTS.json](BUILD_MEASUREMENTS.json): zero external JavaScript files/React islands; shared inline module 3,947 bytes; CSS 26,522 bytes / 6,151 gzip; four WOFF2 fonts 31,448 bytes; optimized hero 59,294 bytes. These are local bytes, not network timing, Lighthouse or field Core Web Vitals.

## Limits

Local preview emulates routing; it does not execute Apache/LiteSpeed .htaccess security/compression/cache directives. Verify actual Hostinger behavior after an authorized upload. Real-device/screen-reader and actual OS reduced-motion checks remain manual; source support is retained. Published search/AI discovery and social previews need a deployed baseline. Earlier restoration screenshots/logs are historical and linked from VISUAL_RESTORATION.md, not current form/color evidence.

Automatic approval review blocked removal of tmp/emailjs-configured with the reason “blocked by policy.” This ignored historical dummy test output remains outside public/dist/ZIP; its generator, source configuration and dependencies are removed.
