<template>
  <div>
    <!--
      NuxtRouteAnnouncer – Announces route changes to screen readers
      for accessibility (WCAG 2.4.1 Skip Navigation).
    -->
    <NuxtRouteAnnouncer />

    <!--
      NuxtLoadingIndicator – Shows a top progress bar during
      client-side navigation. Color matches our brand primary.
    -->
    <NuxtLoadingIndicator
      color="#C41E3A"
      :height="3"
      :duration="3000"
    />

    <!--
      Main application layout wrapper.
      Nuxt resolves ~/layouts/default.vue automatically.
    -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
/**
 * ========================================================
 * Root App Component
 * ========================================================
 *
 * Responsibilities:
 * 1. Set document direction (rtl/ltr) based on active locale
 * 2. Set document lang attribute for accessibility and SEO
 * 3. Provide Nuxt UI color mode context (light/dark)
 * ========================================================
 */

const { locale } = useI18n()
const colorMode = useColorMode()

/**
 * Sync the HTML `dir` and `lang` attributes whenever the locale changes.
 * - Arabic (ar) → dir="rtl", lang="ar-SA"
 * - English (en) → dir="ltr", lang="en-US"
 *
 * The `watch` runs `immediate: true` so the initial page load sets
 * the correct direction before the first paint.
 */
/**
 * Client-side helper to set the HTML `dir` and `lang` attributes
 * based on the current locale. This ensures proper RTL/LTR rendering
 * and accessibility (screen readers, search engines).
 */
function setHtmlAttributes(newLocale: string): void {
  if (import.meta.client) {
    const htmlElement = document.documentElement

    if (newLocale === 'ar') {
      htmlElement.dir = 'rtl'
      htmlElement.lang = 'ar-SA'
    } else {
      htmlElement.dir = 'ltr'
      htmlElement.lang = 'en-US'
    }
  }
}

/**
 * Set initial attributes after DOM mount (client-side only).
 * This avoids `document` being undefined during SSR.
 */
onMounted(() => {
  setHtmlAttributes(locale.value)
})

/**
 * Watch for locale changes and update DOM attributes accordingly.
 * The `immediate` flag is intentionally omitted because the initial
 * setup is handled by `onMounted` above.
 */
watch(locale, (newLocale) => {
  setHtmlAttributes(newLocale)
})

/**
 * Set HTML attributes during SSR for SEO and accessibility.
 * - `dir`: Document direction (rtl for Arabic, ltr for English)
 * - `lang`: Language code for search engines and screen readers
 * - The `class` attribute is managed by `useColorMode` for dark mode
 */
useHead({
  htmlAttrs: {
    dir: computed(() => (locale.value === 'ar' ? 'rtl' : 'ltr')),
    lang: computed(() => (locale.value === 'ar' ? 'ar-SA' : 'en-US'))
  }
})
</script>
