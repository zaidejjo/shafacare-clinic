import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { site } from "@/lib/site-config";

const BASE_URL = site.url;

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/services", changefreq: "weekly", priority: "0.9" },
          { path: "/services/general-medicine", changefreq: "monthly", priority: "0.7" },
          { path: "/services/pediatrics", changefreq: "monthly", priority: "0.7" },
          { path: "/services/dental-care", changefreq: "monthly", priority: "0.7" },
          { path: "/services/cardiology", changefreq: "monthly", priority: "0.7" },
          { path: "/services/lab-diagnostics", changefreq: "monthly", priority: "0.7" },
          { path: "/services/wellness-vaccines", changefreq: "monthly", priority: "0.7" },
          { path: "/services/mental-health", changefreq: "monthly", priority: "0.7" },
          { path: "/services/physiotherapy", changefreq: "monthly", priority: "0.7" },
          { path: "/about", changefreq: "monthly", priority: "0.6" },
          { path: "/contact", changefreq: "monthly", priority: "0.6" },
        ];
        const urls = entries
          .map(
            (e) =>
              `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
