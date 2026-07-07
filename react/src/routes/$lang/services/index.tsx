import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Stethoscope,
  Baby,
  Smile,
  HeartPulse,
  Microscope,
  ShieldCheck,
  Brain,
  Bone,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site-config";

export const Route = createFileRoute("/$lang/services/")({
  head: ({ params }) => ({
    meta: [
      { title: params.lang === "ar" ? "الخدمات الطبية — عيادة شفا | طب عام، أطفال، أسنان والمزيد" : "Medical Services — Shafa Care Clinic | General, Pediatric, Dental & More" },
      {
        name: "description",
        content: params.lang === "ar"
          ? "تصفّح خدمات عيادة شفا الطبية الشاملة في عمّان: طب عام، أطفال، أسنان، قلب، مختبر، صحة وقائية، صحة نفسية، وعلاج طبيعي."
          : "Explore Shafa Care Clinic's full range of medical services in Amman: general medicine, pediatrics, dental care, cardiology, lab diagnostics, wellness, mental health, and physiotherapy.",
      },
      { name: "robots", content: "index, follow" },
      {
        property: "og:title",
        content: params.lang === "ar" ? "الخدمات الطبية — عيادة شفا" : "Medical Services — Shafa Care Clinic | Family Healthcare in Amman",
      },
      {
        property: "og:description",
        content: params.lang === "ar"
          ? "رعاية صحية متكاملة في عمّان: 8 تخصصات طبية تحت سقف واحد. احجز موعدك اليوم."
          : "Full-spectrum family healthcare in Amman: 8 medical specialties under one roof. Book your appointment today.",
      },
      { property: "og:url", content: `${site.url}/${params.lang}/services` },
      { name: "twitter:title", content: params.lang === "ar" ? "الخدمات الطبية — عيادة شفا" : "Medical Services — Shafa Care Clinic" },
      {
        name: "twitter:description",
        content: params.lang === "ar"
          ? "8 تخصصات طبية في عمّان"
          : "Full-spectrum family healthcare in Amman: 8 medical specialties under one roof.",
      },
    ],
    links: [
      { rel: "canonical", href: `${site.url}/${params.lang}/services` },
      { rel: "alternate", hrefLang: "x-default", href: `${site.url}/en/services` },
      { rel: "alternate", hrefLang: "en", href: `${site.url}/en/services` },
      { rel: "alternate", hrefLang: "ar", href: `${site.url}/ar/services` },
    ],
  }),
  component: ServicesPage,
});

const icons = [Stethoscope, Baby, Smile, HeartPulse, Microscope, ShieldCheck, Brain, Bone] as const;
const keys = ["general", "pediatrics", "dental", "cardio", "lab", "wellness", "mental", "physio"] as const;
const slugs = {
  general: "general-medicine",
  pediatrics: "pediatrics",
  dental: "dental-care",
  cardio: "cardiology",
  lab: "lab-diagnostics",
  wellness: "wellness-vaccines",
  mental: "mental-health",
  physio: "physiotherapy",
} as const;

function ServicesPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <section className="border-b border-border/60 bg-brand-soft/30">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-foreground">
            {t.services.heroBadge}
          </span>
          <h1 className="mt-5 text-4xl font-bold md:text-5xl">{t.services.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{t.services.subtitle}</p>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
          {keys.map((key, i) => {
            const Icon = icons[i];
            const s = t.services.items[key];
            return (
              <Link
                key={key}
                to={`/${lang}/services/${slugs[key]}`}
                className="rounded-2xl border border-border/60 bg-card p-6 transition hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-lg font-semibold">{s.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </Link>
            );
          })}
        </div>
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <Link to={`/${lang}/contact`} className="inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground hover:opacity-90">
            {t.actions.book}
          </Link>
        </div>
      </section>
    </>
  );
}
