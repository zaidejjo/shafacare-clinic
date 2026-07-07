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

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Shafa Care Clinic" },
      { name: "description", content: "Explore Shafa Care's medical services: general medicine, pediatrics, dental, cardiology, diagnostics, wellness, mental health and physiotherapy." },
      { property: "og:title", content: "Services — Shafa Care Clinic" },
      { property: "og:description", content: "A full range of family healthcare services under one roof." },
    ],
  }),
  component: ServicesPage,
});

const icons = [Stethoscope, Baby, Smile, HeartPulse, Microscope, ShieldCheck, Brain, Bone] as const;
const keys = ["general", "pediatrics", "dental", "cardio", "lab", "wellness", "mental", "physio"] as const;

function ServicesPage() {
  const { t } = useI18n();
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
              <article key={key} className="rounded-2xl border border-border/60 bg-card p-6 transition hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-lg font-semibold">{s.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </article>
            );
          })}
        </div>
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <Link to="/contact" className="inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground hover:opacity-90">
            {t.actions.book}
          </Link>
        </div>
      </section>
    </>
  );
}