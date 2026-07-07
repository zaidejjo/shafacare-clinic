import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site-config";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Medical Services — Shafa Care Clinic | General, Pediatric, Dental & More" },
      {
        name: "description",
        content:
          "Explore Shafa Care Clinic's full range of medical services in Amman: general medicine, pediatrics, dental care, cardiology, lab diagnostics, wellness, mental health, and physiotherapy.",
      },
      { name: "robots", content: "index, follow" },
      {
        property: "og:title",
        content: "Medical Services — Shafa Care Clinic | Family Healthcare in Amman",
      },
      {
        property: "og:description",
        content:
          "Full-spectrum family healthcare in Amman: 8 medical specialties under one roof. Book your appointment today.",
      },
      { property: "og:url", content: `${site.url}/services` },
      {
        name: "twitter:title",
        content: "Medical Services — Shafa Care Clinic | Family Healthcare in Amman",
      },
      {
        name: "twitter:description",
        content:
          "Full-spectrum family healthcare in Amman: 8 medical specialties under one roof.",
      },
    ],
    links: [
      { rel: "canonical", href: `${site.url}/services` },
      { rel: "alternate", hrefLang: "en", href: `${site.url}/services` },
      { rel: "alternate", hrefLang: "ar", href: `${site.url}/services` },
    ],
  }),
  component: ServicesLayout,
});

function ServicesLayout() {
  return <Outlet />;
}
