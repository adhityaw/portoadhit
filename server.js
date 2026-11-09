// Server lokal: jalanin portfolio + AI di laptop sendiri. Tanpa install apa-apa selain Node.js.
// Pakai:  node server.js   lalu buka http://localhost:3000
const http = require("http");
const fs = require("fs");
const path = require("path");

// baca .env (kalau ada)
try {
  fs.readFileSync(path.join(__dirname, ".env"), "utf8").split(/\r?\n/).forEach((l) => {
    const m = l.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
    if (m && !l.trim().startsWith("#") && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  });
} catch (e) {}
process.env.NINEROUTER_BASE_URL = process.env.NINEROUTER_BASE_URL || "http://localhost:20128/v1";

const chat = require("./api/chat.js");
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".webp": "image/webp", ".ico": "image/x-icon" };
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  const url = decodeURI(req.url.split("?")[0]);
  if (url === "/api/chat") {
    let raw = "";
    req.on("data", (d) => { raw += d; if (raw.length > 20000) req.destroy(); });
    req.on("end", () => {
      try { req.body = JSON.parse(raw || "{}"); } catch (e) { req.body = {}; }
      res.status = (c) => { res.statusCode = c; return res; };
      res.json = (o) => { res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify(o)); };
      chat(req, res);
    });
    return;
  }
  let f = path.normalize(path.join(__dirname, url === "/" ? "index.html" : url));
  if (!f.startsWith(__dirname) || f.includes(path.sep + "api" + path.sep) || f.endsWith(".env")) { res.statusCode = 403; return res.end("403"); }
  fs.readFile(f, (err, data) => {
    if (err) { res.statusCode = 404; return res.end("404"); }
    res.setHeader("Content-Type", TYPES[path.extname(f)] || "application/octet-stream");
    res.end(data);
  });
}).listen(PORT, () => console.log("Buka http://localhost:" + PORT));
