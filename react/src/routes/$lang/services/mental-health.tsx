import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, Phone, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site-config";

const slug = "mental-health";
const serviceKey = "mental";

export const Route = createFileRoute("/$lang/services/mental-health")({
  head: ({ params }) => ({
    meta: [
      { title: params.lang === "ar" ? "الصحة النفسية في عمّان — عيادة شفا الطبية" : "Mental Health in Amman — Shafa Care Clinic" },
      { name: "description", content: params.lang === "ar" ? "عيادة شفا تقدّم خدمات صحة نفسية سرية في عمّان — استشارات ودعم من مختصين مرخصين." : "Shafa Care Clinic provides confidential mental health services in Amman — professional counseling and support by licensed clinicians." },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: params.lang === "ar" ? "الصحة النفسية — عيادة شفا الطبية عمّان" : "Mental Health — Shafa Care Clinic Amman" },
      { property: "og:url", content: `${site.url}/${params.lang}/services/${slug}` },
      { name: "twitter:title", content: params.lang === "ar" ? "الصحة النفسية — عيادة شفا الطبية" : "Mental Health — Shafa Care Clinic" },
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
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand text-brand-foreground"><Brain className="h-8 w-8" /></div>
          <h1 className="mt-6 text-4xl font-bold md:text-5xl">{s.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{s.desc}</p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-3xl border border-border/60 bg-card p-8 md:p-12">
          <h2 className="text-2xl font-bold">Your Mental Health Matters</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">Mental health is an essential part of your overall wellbeing. Our licensed clinicians provide a safe, confidential space where you can discuss your concerns.</p>
          <h3 className="mt-8 text-xl font-semibold">What We Offer</h3>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>• Individual counseling & therapy sessions</li>
            <li>• Anxiety & depression management</li>
            <li>• Stress management & coping strategies</li>
            <li>• Grief & trauma support</li>
            <li>• Family & relationship counseling</li>
            <li>• Referrals to psychiatric specialists</li>
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
