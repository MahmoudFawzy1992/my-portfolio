# Portfolio implementation map

Updated September 30, 2026. Base Git commit: d882363, branch main. Work remains local and uncommitted.

## Architecture

Astro statically generates eight indexable pages plus the custom 404. No SSR adapter, React integration, client island, EmailJS dependency, contact form or environment configuration remains. Sitemap is the only Astro integration.

BaseLayout assembles local Poppins fonts, metadata, canonical/social tags, Person/WebSite/case Article JSON-LD, header/footer, skip link and the shared enhancement script. ContactSection is static Astro markup reused on Home and Contact: existing portrait/profile plus direct email/profile cards. Email text supports full selection and mailto links open the visitor's email application. Nothing is submitted by the website.

site.ts retains the approved typing roles, active section links, drawer dismissal/focus containment, reveals, project filters and Load More. Native details handles the mobile menu without JavaScript. All 31 projects are initially HTML; Home enhances to nine, revealing six per action, while Work shows all. Experience keeps all nine roles visible. Reduced-motion support remains; essential content never starts fully transparent. Reveal classes clear after completion so hover transforms work.

## Routes

Home /; Work /work/; Experience /experience/; Contact /contact/; cases /case-studies/ and its happylife-tourism, upc-realty and n8n-acquisition-workflow children. Unknown URLs, including /privacy/, return the 404 page with HTTP 404. Legacy CV URLs retain 301 redirects.

## Where to edit

| Area | Files |
| --- | --- |
| Identity, existing contact, verified capabilities | src/data/profile.js |
| 31 projects; filters and previews | src/data/projects.js; components/ProjectGallery.astro |
| Three scoped, public-safe cases | src/data/caseStudies.js; pages/case-studies/[slug].astro |
| Nine CV roles | src/data/experience.js; components/ExperienceList.astro |
| Four homepage and nine detailed skills groups | components/TechnologyGroups.astro; profile.js |
| Approved hybrid navigation | components/Header.astro; Footer.astro; scripts/site.ts |
| Static contact cards | components/ContactSection.astro |
| Labeled static SVG icons | components/Icon.astro; SocialLinks.astro |
| Original design, exact pink, neutral small text | styles/site.css |
| Metadata and schema | layouts/BaseLayout.astro |
| Responsive images/social PNG | scripts/prepare-assets.mjs; src/lib/images.js |
| Hosting | public/.htaccess; public/_astro/.htaccess |
| Content/hosting regression tests | tests/portfolio.test.mjs |
| Static/HTTP checks, bytes and ZIP | scripts/verify-static.mjs; verify-http.mjs; measure-build.mjs; package-hostinger.mjs |

## Design and evidence

The live original and original Git CSS informed the approved restoration. Exact #FF014F is now the only pink accent. Small text uses white or the existing muted neutral; pink-filled buttons use dark #101114 text. Card geometry, hero proportions, hover/reveal timings and drawer behavior were preserved during cleanup.

OpenAI Codex is explicitly a primary engineering tool for architecture, implementation, refactoring, troubleshooting, testing and review. Other verified skills remain based on the CV and the September 30 user confirmation. No invented certifications, per-technology years or extensive mail-server responsibility are added.

Keep the original portrait/project imagery, supplied UPC screenshot and unchanged CV. Generated responsive assets/social PNG are reproduced locally and ignored by Git. Only manually curated automation summaries belong in site data. Never import raw workflow exports, IDs, credentials, private URLs, campaigns or lead records into public output. No workflow was executed for this task.

## Hosting and maintenance

Root .htaccess preserves directory routing, 404, MIME handling and CV redirects, adds guarded security/compression rules and makes replaceable files revalidate. Only the nested _astro configuration permits immutable caching, and only for content-hashed JS/CSS/fonts. CV and images do not receive year-long immutable caching. Preview tests routing; it does not execute Apache directives.

Rebuild after source edits and run relevant checks. Preserve crawlable HTML, real anchors, visible focus, scoped case evidence and all approved content. Deployment ZIP includes both .htaccess files. No source, dependencies, docs or environment files are packaged. See HOSTINGER_DEPLOYMENT.md for an eventual authorized upload.
