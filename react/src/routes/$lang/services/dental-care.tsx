import { createFileRoute, Link } from "@tanstack/react-router";
import { Smile, Phone, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site-config";

const slug = "dental-care";
const serviceKey = "dental";

export const Route = createFileRoute("/$lang/services/dental-care")({
  head: ({ params }) => ({
    meta: [
      { title: params.lang === "ar" ? "طب الأسنان في عمّان — عيادة شفا الطبية" : "Dental Care in Amman — Shafa Care Clinic" },
      { name: "description", content: params.lang === "ar" ? "عيادة شفا تقدّم رعاية أسنان شاملة في عمّان — تنظيف وتجميل وتقويم في بيئة مريحة." : "Shafa Care Clinic provides comprehensive dental care in Amman — cleanings, cosmetic treatments, and orthodontics." },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: params.lang === "ar" ? "طب الأسنان — عيادة شفا الطبية عمّان" : "Dental Care — Shafa Care Clinic Amman" },
      { property: "og:url", content: `${site.url}/${params.lang}/services/${slug}` },
      { name: "twitter:title", content: params.lang === "ar" ? "طب الأسنان — عيادة شفا الطبية" : "Dental Care — Shafa Care Clinic" },
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
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand text-brand-foreground"><Smile className="h-8 w-8" /></div>
          <h1 className="mt-6 text-4xl font-bold md:text-5xl">{s.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{s.desc}</p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-3xl border border-border/60 bg-card p-8 md:p-12">
          <h2 className="text-2xl font-bold">A Calming Space for a Confident Smile</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">Our dental department, led by Dr. Rana Al-Salem, offers a full range of dental services in a relaxing environment. From routine cleanings to advanced cosmetic procedures and orthodontic treatment.</p>
          <h3 className="mt-8 text-xl font-semibold">What We Offer</h3>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>• Professional teeth cleaning & exams</li>
            <li>• Cosmetic treatments (whitening, veneers)</li>
            <li>• Orthodontics (braces & aligners)</li>
            <li>• Fillings, crowns & bridges</li>
            <li>• Pediatric dentistry</li>
            <li>• Emergency dental care</li>
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
