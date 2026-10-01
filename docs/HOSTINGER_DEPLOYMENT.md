# Static Hostinger deployment

Updated October 1, 2026. Local deployment package prepared; the website upload is manual.

## Build and archive

Run npm ci, npm run build, npm run lint, npm run check, npm test, npm run verify:static and npm run package:hostinger. Run npm run preview and npm run verify:http in separate terminals for local routing checks.

output/portfolio-hostinger.zip contains dist contents directly at the archive root. No form configuration, React runtime, Node server or SSR infrastructure is required. Contact uses the existing mailto and profile links. This follows Astro's [static deployment model](https://docs.astro.build/en/guides/deploy/).

## Contents

Root .htaccess, index.html, 404.html, robots.txt and generated sitemaps; _astro/.htaccess plus hashed CSS/local fonts; assets including the current PDF, project/portrait images, responsive images and social PNG; work, experience, contact, case index and three nested cases. There is no Privacy directory.

## Hosting policy

- Options disables MultiViews and directory listings; DirectoryIndex serves index.html. No catch-all SPA rewrite.
- ErrorDocument serves the custom page while preserving HTTP 404. Two legacy CV URLs retain 301 redirects.
- PDF, WebP, SVG, PNG, JS, CSS and font MIME declarations are explicit.
- Guarded mod_headers adds nosniff, SAMEORIGIN, strict-origin-when-cross-origin and disabled camera/microphone/geolocation permissions.
- The obsolete X-XSS-Protection header is omitted; [MDN documents its deprecation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-XSS-Protection).
- Replaceable files, including HTML, images and CV, use no-cache (revalidate before reuse). _astro/.htaccess overrides this only for content-hashed JS/CSS/fonts with public, max-age=31536000, immutable.
- Guarded mod_deflate compresses text/HTML/CSS/JavaScript/JSON/XML/SVG where available. Existing compressed images/fonts/PDF are not forced through compression.

The rules follow Apache's [headers](https://httpd.apache.org/docs/2.4/mod/mod_headers.html), [compression](https://httpd.apache.org/docs/2.4/mod/mod_deflate.html) and [redirect](https://httpd.apache.org/docs/2.4/mod/mod_alias.html#redirect) documentation. Local tests verify configuration contracts and emulate routes; they do not execute Hostinger's Apache/LiteSpeed stack.

## When publication is authorized

1. Back up public_html, including hidden hosting files.
2. Extract the ZIP contents into the domain's public_html, with index.html directly at the root. Include both root and _astro/.htaccess.
3. Keep the public_html directory itself. To match this lean archive, back up and remove the old portfolio-owned contents before copying the new files: old entry HTML, portfolio assets and _astro directories, and portfolio route directories (including privacy if present). Preserve unrelated files, subdomains, domain-verification files and host-managed .well-known content. If ownership is unclear, compare with the old portfolio package instead of deleting everything. Extracting and overwriting matching names alone leaves removed pages and old hashed assets online. Include the new root .htaccess; replace old SPA rules while preserving any unrelated hosting directives that your account requires. If extraction creates a subfolder, move its contents, including hidden files, into public_html so index.html is directly at its root.
4. Remove the uploaded ZIP and clear hosting/CDN caches.
5. Check direct nested cases, custom 404 status, /privacy/ 404, current PDF MIME and both CV redirects, social PNG, robots and eight sitemap URLs.
6. Check mailto, LinkedIn, GitHub, keyboard/mobile navigation and animations. Inspect response security/compression/cache headers on Hostinger: CV/HTML/images revalidate, hashed CSS/fonts can cache immutably.

Hostinger account overrides and CDN behavior remain a production check after an authorized upload. No live account settings were changed.

Hostinger File Manager upload/extraction guidance: [official website upload instructions](https://www.hostinger.com/support/how-to-upload-a-website-from-backups/). This portfolio is static and requires no database import.
