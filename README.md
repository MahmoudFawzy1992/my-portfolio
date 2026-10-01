# Mahmoud Fawzy — Developer Portfolio

A static Astro portfolio for developer applications, with 31 projects, three case studies, nine employment entries, technical skills, the current CV and direct contact links. The approved original design and animations are retained. No React runtime, form service, environment configuration or production Node server is required.

## Run locally

Use Node.js 22.12 or newer (verified with 24.20.0).

```powershell
npm ci
npm run dev
```

Open [the development site](http://127.0.0.1:5173/). Image preparation runs automatically.

## Validate and package

```powershell
npm run build
npm run lint
npm run check
npm test
npm run verify:static
npm run measure
npm audit
npm run package:hostinger
```

Run `npm run preview`, then `npm run verify:http` in another terminal. [Static preview](http://127.0.0.1:4173/) tests nested routes, real 404s and legacy CV redirects. Stop servers with Ctrl+C.

The ZIP is `output/portfolio-hostinger.zip`, with build files at its root, including both hosting configuration files. Packaging does not upload anything.

## Editing

Identity/contact/skills: `src/data/profile.js`. Projects: `src/data/projects.js`. Employment: `src/data/experience.js`. Cases: `src/data/caseStudies.js`. Current unchanged CV: `public/assets/mahmoud-fawzy c.v.pdf`.

Pages: Home, Work, Experience, Contact, case index/three case pages, and 404. Home uses section navigation; inner pages use dedicated-page links. Contact provides email, LinkedIn, GitHub, location, phone and CV. No analytics, tracking or embedded third-party content is included. Privacy was removed; its old URL returns 404.

Read [the final cleanup report](docs/FINAL_CLEANUP.md), [validation](docs/VALIDATION.md), [the implementation guide](docs/CODEBASE_GUIDE.md), [Hostinger instructions](docs/HOSTINGER_DEPLOYMENT.md) and [the audit](docs/PORTFOLIO_AUDIT.md). [Visual comparisons](docs/VISUAL_RESTORATION.md) remain a historical record of the accepted restoration, superseded only by this limited cleanup.

The [approved repository hygiene results](docs/HYGIENE_CLEANUP_RESULTS.md) list all removals, the remaining blocked temporary folder, final checks and deployment package details.
