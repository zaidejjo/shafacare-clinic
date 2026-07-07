// https://i18n.nuxtjs.org/docs/options/vue-i18n
import type { I18nOptions } from 'vue-i18n'

export default defineI18nConfig((): Partial<I18nOptions> => ({
  /**
   * Disable legacy mode to use Vue I18n Composition API
   * (required for Nuxt 4 / vue-i18n v10 compatibility)
   */
  legacy: false,

  /**
   * Fallback locale used when a translation key is missing
   * in the active locale. Falls back to Arabic.
   */
  fallbackLocale: 'ar',

  /**
   * Default locale for the Vue I18n instance.
   * The actual initial locale is determined by the Nuxt i18n module
   * based on browser detection and cookies.
   */
  locale: 'ar',

  /**
   * Silent fallback – don't warn when a key is missing
   * in the active locale (it will fall back gracefully).
   */
  silentFallbackWarn: true,

  /**
   * Silent translation warnings in production
   */
  silentTranslationWarn: true
}))
