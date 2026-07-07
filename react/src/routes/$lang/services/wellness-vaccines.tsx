import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Phone, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site-config";

const slug = "wellness-vaccines";
const serviceKey = "wellness";

export const Route = createFileRoute("/$lang/services/wellness-vaccines")({
  head: ({ params }) => ({
    meta: [
      { title: params.lang === "ar" ? "الصحة واللقاحات في عمّان — عيادة شفا الطبية" : "Wellness & Vaccines in Amman — Shafa Care Clinic" },
      { name: "description", content: params.lang === "ar" ? "عيادة شفا تقدّم خدمات الصحة واللقاحات في عمّان — تطعيمات وإرشاد غذائي وخطط وقائية." : "Shafa Care Clinic provides wellness and vaccination services in Amman — immunizations, nutrition guidance, and preventive care." },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: params.lang === "ar" ? "الصحة واللقاحات — عيادة شفا الطبية عمّان" : "Wellness & Vaccines — Shafa Care Clinic Amman" },
      { property: "og:url", content: `${site.url}/${params.lang}/services/${slug}` },
      { name: "twitter:title", content: params.lang === "ar" ? "الصحة واللقاحات — عيادة شفا الطبية" : "Wellness & Vaccines — Shafa Care Clinic" },
    ],
    links: [
      { rel: "canonical", href: `${site.url}/${params.lang}/services/${slug}` },
      { rel: "alternate", hrefLang: "x-default", href: `${site.url}/en/services/${slug}` },
      { rel: "alternate", hrefLang: "en", href: `${site.url}/en/services/${slug}` },
      { rel: "alternate", hrefLang: "ar", href: `${site.url}/ar/services/${slug}` },
    ],
  }),
  component: ServicePage,
});

function ServicePage() {
  const { t, lang } = useI18n();
  const s = t.services.items[serviceKey];
  return (
    <>
      <section className="border-b border-border/60 bg-brand-soft/30">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand text-brand-foreground"><ShieldCheck className="h-8 w-8" /></div>
          <h1 className="mt-6 text-4xl font-bold md:text-5xl">{s.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{s.desc}</p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-3xl border border-border/60 bg-card p-8 md:p-12">
          <h2 className="text-2xl font-bold">Preventive Care for Lifelong Health</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">Staying healthy starts with prevention. Our wellness and vaccination department provides comprehensive immunizations, nutritional counseling, and personalized wellness plans.</p>
          <h3 className="mt-8 text-xl font-semibold">What We Offer</h3>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>• Routine immunizations (children & adults)</li>
            <li>• Seasonal flu & travel vaccines</li>
            <li>• Nutritional counseling & weight management</li>
            <li>• Preventive health screenings</li>
            <li>• Wellness plans & lifestyle coaching</li>
            <li>• School & travel health certificates</li>
          </ul>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to={`/${lang}/contact`} className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground hover:opacity-90"><Phone className="h-4 w-4" /> {t.actions.book}</Link>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.7_0.17_150)] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"><MessageCircle className="h-4 w-4" /> {t.actions.whatsapp}</a>
          <Link to={`/${lang}/services`} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary">← {lang === "ar" ? "العودة إلى جميع الخدمات" : "Back to all services"}</Link>
        </div>
      </section>
    </>
  );
}
