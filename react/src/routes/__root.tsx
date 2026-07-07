import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Menu, Phone, MessageCircle, Sun, Moon, Languages } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { I18nProvider, useI18n } from "../lib/i18n";
import { ThemeProvider, useTheme } from "../lib/theme";
import { site } from "../lib/site-config";
import logoAsset from "../assets/shafa-logo.jpg";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Shafa Care Clinic" },
      { name: "theme-color", content: site.themeColor },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: site.name },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "ar_AR" },
      { property: "og:image", content: site.ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: site.ogImage },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      { rel: "alternate", hrefLang: "x-default", href: site.url },
      { rel: "alternate", hrefLang: "en", href: site.url },
      { rel: "alternate", hrefLang: "ar", href: site.url },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <I18nProvider>
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <SiteHeader />
            <main className="flex-1">
              {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
              <Outlet />
            </main>
            <SiteFooter />
            <FloatingActions />
          </div>
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function SiteHeader() {
  const { t } = useI18n();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-brand ring-2 ring-brand/20">
            <img
              src={logoAsset}
              alt="Shafa Care Clinic — Home"
              className="h-full w-full object-cover"
            />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Shafa Care <span className="text-brand">Clinic</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-brand" }}
            className="text-muted-foreground transition hover:text-foreground"
          >
            {t.nav.home}
          </Link>
          <Link
            to="/services"
            activeProps={{ className: "text-brand" }}
            className="text-muted-foreground transition hover:text-foreground"
          >
            {t.nav.services}
          </Link>
          <Link
            to="/about"
            activeProps={{ className: "text-brand" }}
            className="text-muted-foreground transition hover:text-foreground"
          >
            {t.nav.about}
          </Link>
          <Link
            to="/contact"
            activeProps={{ className: "text-brand" }}
            className="text-muted-foreground transition hover:text-foreground"
          >
            {t.nav.contact}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <Link
            to="/contact"
            className="hidden rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground shadow-sm transition hover:opacity-90 md:inline-flex"
          >
            {t.actions.book}
          </Link>
          <button aria-label={t.ui.menu} className="md:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

function LanguageToggle() {
  const { lang, setLang, t } = useI18n();
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "en" ? "ar" : "en")}
      aria-label={t.ui.language}
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-secondary"
    >
      <Languages className="h-3.5 w-3.5" />
      {lang === "en" ? "AR" : "EN"}
    </button>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useI18n();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.ui.theme}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:bg-secondary"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

function FloatingActions() {
  const { t } = useI18n();
  return (
    <div className="fixed bottom-5 end-5 z-50 flex flex-col gap-3">
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.actions.whatsapp}
        className="flex h-13 w-13 items-center justify-center rounded-full bg-[oklch(0.7_0.17_150)] p-3.5 text-white shadow-xl transition hover:scale-105"
      >
        <MessageCircle className="h-6 w-6" fill="currentColor" />
      </a>
      <a
        href={`tel:${site.phone}`}
        aria-label={t.actions.callNow}
        className="flex h-13 w-13 items-center justify-center rounded-full bg-brand p-3.5 text-brand-foreground shadow-xl transition hover:scale-105"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}

function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border/60 bg-brand-soft/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-brand">
              <img
                src={logoAsset}
                alt="Shafa Care Clinic Logo"
                className="h-full w-full object-cover"
              />
            </span>
            <span className="font-display font-bold">Shafa Care</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{t.footer.tagline}</p>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-brand hover:opacity-80"
          >
            <span aria-hidden className="text-base">
              ◍
            </span>{" "}
            Instagram · {site.instagramHandle}
          </a>
        </div>
        <div>
          <h4 className="text-sm font-semibold">{t.footer.quickLinks}</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-foreground">
                {t.nav.about}
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-foreground">
                {t.nav.services}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                {t.nav.contact}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">{t.footer.hours}</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>{t.footer.monFri}</li>
            <li>{t.footer.sat}</li>
            <li>{t.footer.sun}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">{t.footer.contact}</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={`tel:${site.phone}`} className="hover:text-foreground">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                Amman, Jordan
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Shafa Care Clinic. {t.footer.rights}
      </div>
    </footer>
  );
}
