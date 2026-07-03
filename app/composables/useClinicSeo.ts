/**
 * ========================================================
 * useClinicSeo – Reusable SEO Meta Composable
 * ========================================================
 *
 * Provides a consistent SEO meta-tagging API for all pages.
 * - Auto-formats title: "{Page Title} | Shafa Care Clinic"
 * - Sets Open Graph (og:), Twitter Card, and standard meta
 * - Supports per-page overrides for title, description, image
 * - Optional JSON-LD injection for structured data
 * - Locale-aware via i18n – hreflang/canonical handled by
 *   @nuxtjs/i18n v9 seo module (configured in nuxt.config.ts)
 *
 * Usage:
 *   // Basic – uses i18n defaults for title/description
 *   useClinicSeo()
 *
 *   // With custom values
 *   useClinicSeo({
 *     title: 'About Us',
 *     description: 'Learn about our clinic and team.'
 *   })
 *
 *   // With JSON-LD structured data
 *   useClinicSeo({
 *     title: 'Services',
 *     jsonLd: { '@context': 'https://schema.org', '@type': 'MedicalBusiness', ... }
 *   })
 *
 *   // With custom OG image
 *   useClinicSeo({
 *     title: 'Contact',
 *     image: 'https://shafacare.pages.dev/images/contact-hero.jpg'
 *   })
 * ========================================================
 */

export interface ClinicSeoOptions {
  /** Page title (without " | Shafa Care Clinic" suffix) */
  title?: string
  /** Meta description */
  description?: string
  /** Open Graph / Twitter Card image URL */
  image?: string
  /** Alt text for the OG image */
  imageAlt?: string
  /** og:type (default: "website") */
  ogType?: string
  /** JSON-LD structured data object(s) to inject */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export function useClinicSeo(options?: ClinicSeoOptions) {
  const { t, locale } = useI18n()
  const route = useRoute()
  const config = useRuntimeConfig()

  const siteUrl: string =
    (config.public as Record<string, string>).siteUrl || 'https://shafacare.pages.dev'

  // ── Build the fully-qualified page title ────────────────
  const fullTitle = computed<string>(() => {
    if (options?.title) {
      return `${options.title} | ${t('site.name')}`
    }
    return `${t('site.name')} – ${t('site.tagline')}`
  })

  // ── Description (page-specific or site default) ─────────
  const metaDescription = computed<string>(() => {
    return options?.description || t('site.description')
  })

  // ── Open Graph / Twitter image ─────────────────────────
  const ogImageUrl = computed<string>(() => {
    return options?.image || `${siteUrl}/images/og-default.jpg`
  })

  // ── Current page canonical URL ─────────────────────────
  const currentUrl = computed<string>(() => {
    return `${siteUrl}${route.path}`
  })

  // ── og:locale mapping ──────────────────────────────────
  const ogLocale = computed<string>(() => {
    return locale.value === 'ar' ? 'ar_SA' : 'en_US'
  })

  // ── Inject all SEO meta tags ────────────────────────────
  useSeoMeta({
    // Standard meta
    title: () => fullTitle.value,
    description: () => metaDescription.value,

    // Open Graph
    ogTitle: () => fullTitle.value,
    ogDescription: () => metaDescription.value,
    ogUrl: () => currentUrl.value,
    ogImage: () => ogImageUrl.value,
    ogImageAlt: () => options?.imageAlt || t('site.name'),
    ogType: options?.ogType || 'website',
    ogLocale: () => ogLocale.value,
    ogSiteName: () => t('site.name'),

    // Twitter Card
    twitterCard: 'summary_large_image',
    twitterTitle: () => fullTitle.value,
    twitterDescription: () => metaDescription.value,
    twitterImage: () => ogImageUrl.value,
    twitterImageAlt: () => options?.imageAlt || t('site.name')
  })

  // ── Optional JSON-LD structured data injection ─────────
  if (options?.jsonLd) {
    const scripts = Array.isArray(options.jsonLd)
      ? options.jsonLd
      : [options.jsonLd]

    useHead({
      script: scripts.map((data) => ({
        type: 'application/ld+json',
        children: JSON.stringify(data)
      }))
    })
  }

  // ── Return computed values for consumer use ────────────
  return {
    fullTitle,
    metaDescription,
    currentUrl,
    ogImage: ogImageUrl
  }
}
