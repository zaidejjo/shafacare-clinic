import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Stethoscope,
  Baby,
  Smile,
  HeartPulse,
  Microscope,
  ShieldCheck,
  Clock,
  MapPin,
  Phone,
  Star,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-clinic.jpg";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shafa Care Clinic — Compassionate Family Healthcare in Amman, Jordan" },
      {
        name: "description",
        content:
          "Shafa Care Clinic offers expert general medicine, pediatrics, dental, cardiology, and wellness services in Amman. Book your appointment today — compassionate care for your whole family.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Shafa Care Clinic — Compassionate Family Healthcare in Amman" },
      {
        property: "og:description",
        content:
          "Expert family medicine, pediatrics, dental care, cardiology, and wellness services in Amman, Jordan. Trusted by 30k+ patients. Book today.",
      },
      { property: "og:url", content: site.url },
      { name: "twitter:title", content: "Shafa Care Clinic — Compassionate Family Healthcare in Amman" },
      {
        name: "twitter:description",
        content:
          "Expert family medicine, pediatrics, dental care, cardiology, and wellness services in Amman, Jordan.",
      },
    ],
    links: [
      { rel: "canonical", href: site.url },
      { rel: "alternate", hrefLang: "en", href: site.url },
      { rel: "alternate", hrefLang: "ar", href: site.url },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useI18n();
  const serviceIcons = [Stethoscope, Baby, Smile, HeartPulse, Microscope, ShieldCheck] as const;
  const serviceKeys = ["general", "pediatrics", "dental", "cardio", "lab", "wellness"] as const;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness"],
    "@id": site.url,
    name: site.fullName,
    alternateName: "Shafa Care",
    description:
      "Shafa Care is a modern family clinic offering general medicine, pediatrics, dental care, cardiology, lab diagnostics, wellness services, mental health support, and physiotherapy in Amman, Jordan.",
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: site.ogImage,
    logo: `${site.url}/shafa-logo.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amman",
      addressCountry: "JO",
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "16:00" },
    ],
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      ratingCount: "30000",
    },
    medicalSpecialty: [
      "GeneralPractice",
      "Pediatrics",
      "Dentistry",
      "Cardiology",
      "Diagnostic",
      "PreventiveMedicine",
      "MentalHealth",
      "Physiotherapy",
    ],
    founder: {
      "@type": "Person",
      name: "Dr. Firas Ajo",
      jobTitle: "Founder & Medical Director",
    },
    employee: [
      { "@type": "Person", name: "Dr. Firas Ajo", jobTitle: "Founder & Medical Director" },
      { "@type": "Person", name: "Dr. Layla Mansour", jobTitle: "Pediatrician" },
      { "@type": "Person", name: "Dr. Omar Haddad", jobTitle: "Cardiologist" },
      { "@type": "Person", name: "Dr. Rana Al-Salem", jobTitle: "Dentist" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Medical Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "General Medicine", description: "Comprehensive primary care — annual physicals, chronic care, and acute treatment." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pediatrics", description: "Gentle, kid-friendly care from newborn check-ups through adolescence." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dental Care", description: "Cleanings, cosmetic treatments, and orthodontics in a calming space." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cardiology", description: "Heart health screenings, ECGs, and specialist consultations." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lab & Diagnostics", description: "On-site laboratory with fast, accurate results you can trust." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wellness & Vaccines", description: "Immunizations, nutrition guidance, and preventive wellness plans." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mental Health", description: "Confidential counseling and support by licensed clinicians." } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Physiotherapy", description: "Rehabilitation and mobility programs by certified therapists." } },
      ],
    },
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "General Medicine" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pediatrics" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dental Care" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cardiology" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lab & Diagnostics" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wellness & Vaccines" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mental Health" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Physiotherapy" } },
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,oklch(0.42_0.15_25/0.15),transparent_60%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
              <ShieldCheck className="h-3.5 w-3.5" /> {t.hero.badge}
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              {t.hero.title}
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              {t.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/25 transition hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" /> {t.actions.whatsapp}
              </a>
              <a
                href={`tel:${site.phone}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary"
              >
                <Phone className="h-4 w-4" /> {t.actions.callNow}
              </a>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border/60 pt-6">
              <div>
                <dt className="text-2xl font-bold text-brand">15+</dt>
                <dd className="text-xs text-muted-foreground">{t.hero.stat1}</dd>
              </div>
              <div>
                <dt className="text-2xl font-bold text-brand">30k+</dt>
                <dd className="text-xs text-muted-foreground">{t.hero.stat2}</dd>
              </div>
              <div>
                <dt className="text-2xl font-bold text-brand">4.9★</dt>
                <dd className="text-xs text-muted-foreground">{t.hero.stat3}</dd>
              </div>
            </dl>
          </div>
          <div className="relative">
            <img
              src={heroImage}
              alt="Shafa Care Clinic — modern family medical clinic in Amman, Jordan featuring a welcoming interior"
              width={1600}
              height={1000}
              loading="eager"
              className="rounded-3xl border border-border/60 shadow-2xl"
            />
            <div className="absolute -bottom-6 -start-6 hidden rounded-2xl bg-card p-4 shadow-lg md:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-warm/20 text-accent-warm">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.hero.openToday}</p>
                  <p className="text-xs text-muted-foreground">{t.hero.hours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-brand-soft/30 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">{t.services.title}</h2>
            <p className="mt-4 text-muted-foreground">{t.services.subtitle}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serviceKeys.map((key, i) => {
              const Icon = serviceIcons[i];
              const s = t.services.items[key];
              const slug = key === "general" ? "general-medicine" : key === "dental" ? "dental-care" : key === "cardio" ? "cardiology" : key === "lab" ? "lab-diagnostics" : key === "wellness" ? "wellness-vaccines" : key;
              return (
                <Link
                  key={key}
                  to={`/services/${slug}`}
                  className="group rounded-2xl border border-border/60 bg-card p-6 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand transition group-hover:bg-brand group-hover:text-brand-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </Link>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary"
            >
              {t.actions.explore}
            </Link>
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">{t.doctors.title}</h2>
            <p className="mt-4 text-muted-foreground">{t.doctors.subtitle}</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.doctors.list.map((d) => (
              <div key={d.name} className="rounded-2xl border border-border/60 bg-card p-6 text-center">
                <div
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand to-accent-warm/70 text-2xl font-bold text-brand-foreground"
                  role="img"
                  aria-label={`${d.name} — ${d.role} at Shafa Care Clinic`}
                >
                  {d.name.slice(-3, -2) || d.name[0]}
                </div>
                <h3 className="mt-4 font-semibold">{d.name}</h3>
                <p className="mt-1 text-sm text-brand">{d.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-brand-soft/30 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">{t.testimonials.title}</h2>
            <p className="mt-4 text-muted-foreground">{t.testimonials.subtitle}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {t.testimonials.list.map((tst) => (
              <div key={tst.name} className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="flex gap-1 text-accent-warm">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4" fill="currentColor" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed">"{tst.quote}"</p>
                <div className="mt-6">
                  <p className="text-sm font-semibold">{tst.name}</p>
                  <p className="text-xs text-muted-foreground">{tst.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-3xl font-bold md:text-4xl">{t.faq.title}</h2>
          <div className="mt-10 space-y-3">
            {t.faq.items.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand via-brand to-[oklch(0.30_0.14_25)] px-8 py-14 text-center text-brand-foreground shadow-2xl">
            <div aria-hidden className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%)]" />
            <h2 className="relative text-3xl font-bold md:text-4xl">{t.actions.book}</h2>
            <p className="relative mx-auto mt-3 max-w-xl opacity-90">{t.hero.subtitle}</p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`tel:${site.phone}`}
                className="inline-flex items-center gap-2 rounded-full bg-brand-foreground px-6 py-3 text-sm font-semibold text-brand transition hover:opacity-90"
              >
                <Phone className="h-4 w-4" /> {site.phoneDisplay}
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.7_0.17_150)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" /> {t.actions.whatsapp}
              </a>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-brand-foreground/40 px-6 py-3 text-sm font-semibold transition hover:bg-brand-foreground/10"
              >
                <MapPin className="h-4 w-4" /> {t.actions.directions}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-border/60 bg-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start text-sm font-semibold"
      >
        {q}
        <ChevronDown className={`h-4 w-4 shrink-0 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="px-5 pb-5 text-sm text-muted-foreground">{a}</p>}
    </div>
  );
}
