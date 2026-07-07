import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site-config";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Shafa Care Clinic" },
      { name: "description", content: "Contact Shafa Care Clinic in Amman, Jordan. Call, WhatsApp, or send us a message to book an appointment." },
      { property: "og:title", content: "Contact Shafa Care Clinic" },
      { property: "og:description", content: "Book an appointment via phone, WhatsApp, or message." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  const items: Array<{ icon: typeof Phone; label: string; value: string; href?: string; external?: boolean }> = [
    { icon: Phone, label: t.contact.phone, value: site.phoneDisplay, href: `tel:${site.phone}` },
    { icon: MessageCircle, label: "WhatsApp", value: site.phoneDisplay, href: site.whatsapp, external: true },
    { icon: MapPin, label: t.contact.address, value: t.contact.addressValue, href: site.mapsUrl, external: true },
    { icon: Clock, label: t.contact.hours, value: t.contact.hoursValue },
    { icon: Mail, label: t.contact.email, value: site.email, href: `mailto:${site.email}` },
  ];

  return (
    <>
      <section className="border-b border-border/60 bg-brand-soft/30">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">{t.contact.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{t.contact.subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={`tel:${site.phone}`} className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/25 hover:opacity-90">
              <Phone className="h-4 w-4" /> {t.actions.callNow}
            </a>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.7_0.17_150)] px-6 py-3 text-sm font-semibold text-white hover:opacity-90">
              <MessageCircle className="h-4 w-4" /> {t.actions.whatsapp}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-5">
        <div className="md:col-span-2 space-y-6">
          {items.map((item) => {
            const inner = (
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{item.label}</p>
                  <p className="mt-1 font-medium">{item.value}</p>
                </div>
              </div>
            );
            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="block rounded-xl transition hover:bg-brand-soft/40"
              >
                {inner}
              </a>
            ) : (
              <div key={item.label}>{inner}</div>
            );
          })}
        </div>

        <form
          className="md:col-span-3 rounded-3xl border border-border/60 bg-card p-8"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          {sent ? (
            <div className="py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand text-2xl text-brand-foreground">✓</div>
              <h2 className="mt-4 text-xl font-semibold">{t.contact.form.successTitle}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t.contact.form.success}</p>
            </div>
          ) : (
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t.contact.form.name} name="name" required />
                <Field label={t.contact.form.phone} name="phone" type="tel" />
              </div>
              <Field label={t.contact.form.email} name="email" type="email" required />
              <Field label={t.contact.form.reason} name="reason" />
              <label className="text-sm">
                <span className="font-medium">{t.contact.form.message}</span>
                <textarea
                  name="message"
                  rows={4}
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
              </label>
              <button
                type="submit"
                className="mt-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition hover:opacity-90"
              >
                {t.contact.form.submit}
              </button>
            </div>
          )}
        </form>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="text-sm">
      <span className="font-medium">{label}{required && <span className="text-brand"> *</span>}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
      />
    </label>
  );
}