// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  /**
   * ========================================================
   * Application Metadata
   * ========================================================
   */
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Shafa Care Clinic - عيادة شفا الطبية',
      meta: [
        {
          name: 'description',
          content: 'Professional, compassionate medical care at Shafa Care Clinic. Your health is our priority — عيادة شفا الطبية تقدم رعاية صحية متكاملة بثقة واحترافية.'
        },
        {
          name: 'theme-color',
          content: '#C41E3A'
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        },
        {
          rel: 'canonical',
          href: 'https://shafacare.com'
        },
        // ── Google Fonts Preconnect ─────────────────────
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        // ── Google Fonts Preload (Inter + Tajawal) ────
        {
          rel: 'preload',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
          as: 'style'
        },
        {
          rel: 'preload',
          href: 'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap',
          as: 'style'
        },
        // ── Google Fonts Stylesheets ───────────────────
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap',
          crossorigin: ''
        }
      ]
    }
  },

  /**
   * ========================================================
   * Development Tools
   * ========================================================
   */
  devtools: {
    enabled: true
  },

  /**
   * ========================================================
   * CSS – Global stylesheet with Tailwind v4 and design tokens
   * ========================================================
   */
  css: ['~/assets/css/main.css'],

  /**
   * ========================================================
   * Modules
   * - @nuxt/ui: Tailwind-based UI component library
   * - @nuxt/image: Optimized image component with WebP/AVIF
   * - @nuxtjs/i18n: Internationalization (Arabic/English, RTL/LTR)
   * - @nuxtjs/sitemap: Automatic sitemap.xml generation
   * - @storyblok/nuxt: Headless CMS visual editor integration
   * ========================================================
   */
  modules: ['@nuxt/ui', '@nuxt/image', '@nuxtjs/i18n', '@nuxtjs/sitemap', '@storyblok/nuxt'],

  /**
   * ========================================================
   * Nuxt UI v4 Configuration
   * - Primary color uses our deep burgundy custom palette
   * - Neutral uses slate for clean medical aesthetic
   * ========================================================
   */
  ui: {
    colors: {
      primary: 'primary',
      neutral: 'slate'
    }
  },

  /**
   * ========================================================
   * Internationalization (i18n) v9 Configuration
   * - Arabic (ar) is the default locale (RTL)
   * - English (en) is secondary (LTR)
   * - Strategy: prefix – /en/ for English, / for Arabic (default)
   * - SEO features enabled for hreflang tags
   * - Browser language detection with cookie persistence
   * - Lazy loading for locale files to reduce initial bundle
   * ========================================================
   */
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        language: 'en-US',
        file: 'en.json',
        dir: 'ltr'
      },
      {
        code: 'ar',
        name: 'العربية',
        language: 'ar-SA',
        file: 'ar.json',
        dir: 'rtl'
      }
    ],
    defaultLocale: 'ar',
    strategy: 'prefix',
    lazy: true,
    langDir: 'locales',
    // vueI18n is deprecated in v9 – config is handled via nuxt.config.ts
    // Locale files are stored in i18n/locales/
    bundle: {
      optimizeTranslationDirective: false
    },
    seo: {
      canonicalUrl: true,
      selfReferencing: true,
      hreflang: true
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  /**
   * ========================================================
   * Sitemap Configuration (@nuxtjs/sitemap v7)
   * - Pre-rendered at build time via zeroRuntime: true
   * - Full i18n locale awareness for multi-language URLs
   * - Dynamic route integration ready for Storyblok pages
   * - Auto-compressed gzip sitemap output
   * ========================================================
   */
  sitemap: {
    enabled: true,
    zeroRuntime: true,
    gzip: true,
    i18n: {
      locales: ['en', 'ar'],
      defaultLocale: 'ar'
    },
    urls: async () => {
      // Dynamic routes from Storyblok will be added here in Phase 2
      // Example:
      //   const { storyblokApi } = useStoryblokApi()
      //   const { data } = await storyblokApi.get('cdn/stories', {
      //     version: 'published',
      //     starts_with: 'pages/'
      //   })
      //   return data.stories.map(story => `/${story.slug}`)
      return []
    }
  },

  /**
   * ========================================================
   * Storyblok Headless CMS Configuration
   * - API bridge for visual editor and content delivery
   * - Draft/preview mode support via _storyblok query param
   * ========================================================
   */
  storyblok: {
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
    bridge: {
      resolveRelations: []
    },
    apiOptions: {
      region: 'eu' // Adjust based on your Storyblok space region
    }
  },

  /**
   * ========================================================
   * Runtime Config – Publicly accessible at runtime
   * ========================================================
   */
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://shafacare.com',
      storyblokAccessToken: process.env.STORYBLOK_ACCESS_TOKEN
    }
  },

  /**
   * ========================================================
   * Route Rules
   * ========================================================
   */
  routeRules: {
    '/': { prerender: true },
    '/ar': { prerender: true },
    '/en': { prerender: true },
    '/privacy': { prerender: true },
    '/terms': { prerender: true }
  },

  /**
   * ========================================================
   * Compatibility
   * ========================================================
   */
  compatibilityDate: '2026-06-30',

  /**
   * ========================================================
   * ESLint Configuration
   * ========================================================
   */
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})