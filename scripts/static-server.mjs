import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('dist');
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.ico': 'image/x-icon', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.woff': 'font/woff', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };
async function respond(res, pathname, status, head) {
  const data = await readFile(pathname);
  res.writeHead(status, { 'Content-Type': mime[path.extname(pathname)] || 'application/octet-stream', 'Content-Length': data.length });
  res.end(head ? undefined : data);
}
createServer(async (req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (['/mahmoud-fawzy-cv.pdf', '/wp-content/uploads/2025/03/mahmoud-fawzy-c.v.pdf'].includes(pathname)) {
      res.writeHead(301, { Location: '/assets/mahmoud-fawzy%20c.v.pdf' }); res.end(); return;
    }
    let file = path.resolve(root, `.${pathname}`);
    if ((file !== root && !file.startsWith(root + path.sep)) || pathname.split('/').some(part => part.startsWith('.'))) throw new Error('Not found');
    if ((await stat(file)).isDirectory()) {
      if (!pathname.endsWith('/')) { res.writeHead(301, { Location: `${pathname}/` }); res.end(); return; }
      file = path.join(file, 'index.html');
    }
    await respond(res, file, 200, req.method === 'HEAD');
  } catch {
    try { await respond(res, path.join(root, '404.html'), 404, req.method === 'HEAD'); }
    catch { res.writeHead(404); res.end('Build the portfolio before starting the preview.'); }
  }
}).listen(4173, '127.0.0.1', () => console.log('Static portfolio preview: http://127.0.0.1:4173 (Hostinger-style routes and 404s)'));
