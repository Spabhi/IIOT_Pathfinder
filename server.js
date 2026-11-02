// Minimal static file server for IIoT Pathfinder: node server.js  → http://localhost:8080
const http = require("http"), fs = require("fs"), path = require("path");
const PORT = process.env.PORT || 8080, ROOT = __dirname;
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml" };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  const file = path.join(ROOT, path.normalize(p));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end("Not found"); }
    res.writeHead(200, {
      "Content-Type": (TYPES[path.extname(file)] || "application/octet-stream") + "; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate"
    });
    res.end(data);
  });
}).listen(PORT, () => console.log(`IIoT Pathfinder running at http://localhost:${PORT}`));
