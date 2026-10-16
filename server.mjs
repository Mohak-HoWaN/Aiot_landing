import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2' };
const allowed = new Set(['index.html', 'styles.css', 'app.js', 'copy.js', 'render.js', 'favicon.svg', 'JonaRu-Reimagined.jpeg', 'locales/en.js', 'locales/hi.js', 'locales/gu.js', 'locales/mr.js', 'assets/receipt.png', 'assets/udhaar.png', 'assets/invoice.png', 'assets/reports.png', 'assets/social-preview.png']);
const server = http.createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' }).end();
      return;
    }
    const path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const relative = path === '/' ? 'index.html' : path.slice(1);
    const file = resolve(root, relative);
    if (!file.startsWith(root + sep) || !allowed.has(relative)) {
      response.writeHead(404).end('Not found');
      return;
    }
    const body = await readFile(file);
    response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin' });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(404).end('Not found');
  }
});
server.listen(port, '127.0.0.1', () => console.log(`JonaRu Model-1 preview: http://127.0.0.1:${port}`));
