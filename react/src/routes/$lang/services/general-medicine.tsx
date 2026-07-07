import { createFileRoute, Link } from "@tanstack/react-router";
import { Stethoscope, Phone, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site-config";

const slug = "general-medicine";
const serviceKey = "general";

export const Route = createFileRoute("/$lang/services/general-medicine")({
  head: ({ params }) => ({
    meta: [
      { title: params.lang === "ar" ? "الطب العام في عمّان — عيادة شفا الطبية" : "General Medicine in Amman — Shafa Care Clinic" },
      {
        name: "description",
        content: params.lang === "ar"
          ? "عيادة شفا الطبية تقدّم خدمات الطب العام في عمّان — فحوصات سنوية ورعاية الأمراض المزمنة والحالات الحادة."
          : "Shafa Care Clinic provides expert general medicine services in Amman — annual physicals, chronic disease management, and acute care for the whole family.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: params.lang === "ar" ? "الطب العام — عيادة شفا الطبية عمّان" : "General Medicine — Shafa Care Clinic Amman" },
      {
        property: "og:description",
        content: params.lang === "ar"
          ? "رعاية أولية شاملة في عمّان: فحوصات سنوية ورعاية الأمراض المزمنة والحالات الحادة في عيادة شفا."
          : "Comprehensive primary care in Amman: annual physicals, chronic care, and acute treatment at Shafa Care Clinic.",
      },
      { property: "og:url", content: `${site.url}/${params.lang}/services/${slug}` },
      { name: "twitter:title", content: params.lang === "ar" ? "الطب العام — عيادة شفا الطبية" : "General Medicine — Shafa Care Clinic" },
      { name: "twitter:description", content: params.lang === "ar" ? "رعاية أولية شاملة في عمّان" : "Comprehensive primary care in Amman at Shafa Care Clinic." },
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
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand text-brand-foreground">
            <Stethoscope className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-4xl font-bold md:text-5xl">{s.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{s.desc}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-3xl border border-border/60 bg-card p-8 md:p-12">
          <h2 className="text-2xl font-bold">Comprehensive Primary Care</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Our general medicine department provides thorough primary care for patients of all ages. From routine
            annual check-ups and preventive screenings to managing chronic conditions like diabetes, hypertension,
            and asthma — our team ensures you receive coordinated, evidence-based care. We also treat acute illnesses
            such as infections, minor injuries, and flu, with same-week appointments available.
          </p>
          <h3 className="mt-8 text-xl font-semibold">What We Offer</h3>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">• Annual physical exams & health screenings</li>
            <li className="flex items-start gap-2">• Chronic disease management (diabetes, hypertension, asthma)</li>
            <li className="flex items-start gap-2">• Acute illness & infection treatment</li>
            <li className="flex items-start gap-2">• Preventive care & lifestyle counseling</li>
            <li className="flex items-start gap-2">• Minor injury care</li>
            <li className="flex items-start gap-2">• Referrals to specialists within our clinic</li>
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to={`/${lang}/contact`}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground hover:opacity-90"
          >
            <Phone className="h-4 w-4" /> {t.actions.book}
          </Link>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.7_0.17_150)] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" /> {t.actions.whatsapp}
          </a>
          <Link
            to={`/${lang}/services`}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary"
          >
            ← {lang === "ar" ? "العودة إلى جميع الخدمات" : "Back to all services"}
          </Link>
        </div>
      </section>
    </>
  );
}
