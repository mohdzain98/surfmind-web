import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Update this to your production domain
const SITE_URL = "https://surfmind.vercel.app";

const routes = [
  { path: "/",        priority: "1.0", changefreq: "weekly"  },
  { path: "/contact", priority: "0.7", changefreq: "monthly" },
  { path: "/privacy", priority: "0.5", changefreq: "yearly"  },
  { path: "/terms",   priority: "0.5", changefreq: "yearly"  },
];

const today = new Date().toISOString().split("T")[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const output = resolve(__dirname, "../public/sitemap.xml");
writeFileSync(output, xml, "utf-8");
console.log(`Sitemap written → public/sitemap.xml`);
