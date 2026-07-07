import { createFileRoute } from "@tanstack/react-router";
import { Award, Users, HeartHandshake, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Shafa Care Clinic" },
      { name: "description", content: "Learn about Shafa Care Clinic — our mission, values, and the compassionate team led by Dr. Firas Ajo." },
      { property: "og:title", content: "About Shafa Care Clinic" },
      { property: "og:description", content: "Our mission, values, and the team behind Shafa Care." },
    ],
  }),
  component: AboutPage,
});

const valueIcons = { compassion: HeartHandshake, excellence: Award, community: Users, innovation: Sparkles } as const;

function AboutPage() {
  const { t } = useI18n();
  const keys = ["compassion", "excellence", "community", "innovation"] as const;
  return (
    <>
      <section className="border-b border-border/60 bg-brand-soft/30">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">{t.about.title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">{t.about.lead}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="rounded-3xl border border-border/60 bg-card p-8 md:p-12">
          <p className="text-lg leading-relaxed md:text-xl">{t.about.mission}</p>
        </div>
      </section>

      <section className="bg-brand-soft/30 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold">{t.about.values}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {keys.map((k) => {
              const Icon = valueIcons[k];
              const v = t.about.valuesList[k];
              return (
                <div key={k} className="rounded-2xl border border-border/60 bg-card p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-brand-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}