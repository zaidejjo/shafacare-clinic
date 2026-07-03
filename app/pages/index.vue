<template>
  <!-- ====================================================
       Home Page – Shafa Care Clinic
       ====================================================
       Landing page composed of Storyblok-ready sections.
       - HeroSection (LCP-optimized with Storyblok props)
       - About, Services, CTA, Contact (placeholder sections
         ready for Storyblok component migration in Phase 3+)
       - Each section has proper aria-labels and semantic tags
       - RTL-aware layout via logical CSS properties
  -->
  <div>
    <!-- ── Hero Section ─────────────────────────────── -->
    <StoryblokHeroSection :blok="heroBlok" />

    <!-- ── About Us Section ─────────────────────────── -->
    <section
      id="about"
      aria-label="About us"
      class="bg-surface-primary px-4 py-20 sm:py-28"
    >
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="mb-6 text-3xl font-bold text-text-primary sm:text-4xl">
          {{ $t("about.title") }}
        </h2>
        <p
          class="mx-auto max-w-2xl text-lg text-text-secondary leading-relaxed"
        >
          {{ $t("about.description") }}
        </p>
      </div>
    </section>

    <!-- ── Services Section ─────────────────────────── -->
    <section
      id="services"
      aria-label="Our services"
      class="bg-surface-secondary px-4 py-20 sm:py-28"
    >
      <div class="mx-auto max-w-6xl">
        <!-- Section header -->
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-3xl font-bold text-text-primary sm:text-4xl">
            {{ $t("services.title") }}
          </h2>
          <p class="text-lg text-text-secondary">
            {{ $t("services.subtitle") }}
          </p>
        </div>

        <!-- Service cards grid -->
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="i in 3"
            :key="i"
            class="group rounded-xl border border-border-default bg-surface-primary p-6 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <!-- Icon container -->
            <div
              class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 transition-colors group-hover:bg-primary-100 dark:bg-primary-900/50 dark:group-hover:bg-primary-900"
            >
              <UIcon
                name="heroicons:heart"
                class="h-6 w-6 text-primary-500"
                aria-hidden="true"
              />
            </div>

            <h3 class="mb-2 text-xl font-semibold text-text-primary">
              {{ $t("services.title") }} {{ i }}
            </h3>
            <p class="text-sm text-text-secondary leading-relaxed">
              Comprehensive medical service number {{ i }} — providing expert
              care with compassion and state-of-the-art facilities.
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- ── CTA Section ─────────────────────────────── -->
    <section
      aria-label="Call to action"
      class="relative bg-primary-600 px-4 py-20 text-white"
    >
      <!-- Subtle pattern overlay -->
      <div
        class="pointer-events-none absolute inset-0 opacity-10"
        style="
          background-image: radial-gradient(
            circle at 25% 25%,
            white 1px,
            transparent 1px
          );
          background-size: 40px 40px;
        "
        aria-hidden="true"
      />

      <div class="relative mx-auto max-w-3xl text-center">
        <h2 class="mb-4 text-3xl font-bold sm:text-4xl">
          {{ $t("hero.cta") }}
        </h2>
        <p class="mb-8 text-lg text-white/80">
          {{ $t("hero.subtitle") }}
        </p>
        <UButton
          size="xl"
          color="white"
          :label="$t('common.bookNow')"
          class="rounded-xl px-8 py-3.5 text-base font-semibold text-primary-700 shadow-lg transition-all duration-200 hover:shadow-xl active:scale-[0.98]"
        />
      </div>
    </section>

    <!-- ── Structured Data (JSON-LD, renderless) ──── -->
    <SeoMedicalSchema
      url="https://shafacare.pages.dev"
      price-range="$$"
      :medical-specialty="['GeneralPractice', 'FamilyMedicine']"
    />

    <!-- ── Contact Section ──────────────────────────── -->
    <section
      id="contact"
      aria-label="Contact information"
      class="bg-surface-primary px-4 py-20 sm:py-28"
    >
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="mb-6 text-3xl font-bold text-text-primary sm:text-4xl">
          {{ $t("contact.title") }}
        </h2>
        <p class="mx-auto mb-10 max-w-2xl text-lg text-text-secondary">
          {{ $t("contact.subtitle") }}
        </p>

        <div
          class="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10"
        >
          <!-- Phone -->
          <a
            href="tel:+962782124190"
            class="group flex items-center gap-3 text-text-secondary transition-colors hover:text-primary-500"
          >
            <span
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 transition-colors group-hover:bg-primary-100 dark:bg-primary-900/50 dark:group-hover:bg-primary-900"
            >
              <UIcon name="heroicons:phone" class="h-5 w-5 text-primary-500" />
            </span>
            <span class="text-base font-medium">+962 7 8212 4190</span>
          </a>

          <!-- Email -->
          <a
            href="mailto:info@shafacare.com"
            class="group flex items-center gap-3 text-text-secondary transition-colors hover:text-primary-500"
          >
            <span
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 transition-colors group-hover:bg-primary-100 dark:bg-primary-900/50 dark:group-hover:bg-primary-900"
            >
              <UIcon
                name="heroicons:envelope"
                class="h-5 w-5 text-primary-500"
              />
            </span>
            <span class="text-base font-medium">info@shafacare.com</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * ========================================================
 * Home Page – Shafa Care Clinic
 * ========================================================
 *
 * Main landing page composed of modular sections.
 * In the full build (Phase 3+), all sections will be
 * driven by Storyblok CMS content blocks.
 *
 * For now, a static Storyblok-compatible heroBlok object
 * provides the HeroSection props, demonstrating the
 * Storyblok integration pattern with i18n fallbacks.
 *
 * SEO meta tags are set via useClinicSeo() composable.
 * Structured data is injected via <SeoMedicalSchema />.
 * ========================================================
 */

const { t } = useI18n();

// ── Hero Section Storyblok-compatible props ─────────────
// This static object mirrors what Storyblok would send.
// When Storyblok is connected, this will come from the API.
const heroBlok = {
  _uid: "hero-static",
  component: "hero-section",
  headline: t("hero.title"),
  subheadline: t("hero.subtitle"),
  ctaText: t("hero.cta"),
  ctaLink: {
    url: "#contact",
  },
  // No background image → falls back to gradient
  backgroundImage: null,
  layout: "centered",
  animationType: "fade",
};

// ── Dynamic SEO Meta Tags (via reusable composable) ────
// Sets title, description, OG, Twitter Card, and og:locale
// Title format: "Shafa Care Clinic – Your Health, Our Priority"
useClinicSeo();

// NOTE: JSON-LD structured data is injected via the
// <SeoMedicalSchema /> component in the template below.
// This keeps the schema logic in a single reusable component
// and enables per-page override of business data.
</script>
