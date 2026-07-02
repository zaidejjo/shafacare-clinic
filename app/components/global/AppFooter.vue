<template>
  <!-- ====================================================
       AppFooter – Semantic site footer with address
       ====================================================
       - HTML5 <footer> with <address> for contact info
       - 4-column grid on lg, stacked on mobile
       - Logo, quick links, services, contact, social
       - Copyright bar with privacy + terms links
       - RTL-aware column ordering
  -->
  <footer
    class="border-t border-border-default bg-surface-secondary dark:bg-dark-surface"
    role="contentinfo"
  >
    <!-- ── Main Footer Content ───────────────────────── -->
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div
        class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12"
      >
        <!-- ── Column 1: Logo + Tagline ──────────────── -->
        <div class="sm:col-span-2 lg:col-span-1">
          <!-- Logo -->
          <NuxtLink
            :to="localePath('/')"
            class="mb-4 inline-flex items-center gap-2.5"
            :aria-label="$t('site.name')"
          >
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 text-xs font-bold tracking-tight text-white shadow-sm"
            >
              SC
            </div>
            <span
              class="text-lg font-bold text-text-primary"
              :class="locale === 'ar' ? 'font-arabic' : 'font-english'"
            >
              {{ $t('site.name') }}
            </span>
          </NuxtLink>

          <!-- Tagline -->
          <p class="mb-4 text-sm text-text-secondary leading-relaxed">
            {{ $t('site.tagline') }}
          </p>

          <p class="text-sm text-text-muted leading-relaxed">
            {{ $t('site.description') }}
          </p>
        </div>

        <!-- ── Column 2: Quick Links ─────────────────── -->
        <div>
          <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
            {{ $t('footer.quickLinks') }}
          </h3>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.key">
              <NuxtLink
                :to="link.to"
                class="text-sm text-text-secondary transition-colors hover:text-primary-500"
              >
                {{ $t(link.label) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- ── Column 3: Services ────────────────────── -->
        <div>
          <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
            {{ $t('footer.services') }}
          </h3>
          <ul class="space-y-3">
            <li v-for="link in serviceLinks" :key="link.key">
              <NuxtLink
                :to="link.to"
                class="text-sm text-text-secondary transition-colors hover:text-primary-500"
              >
                {{ $t(link.label) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- ── Column 4: Contact Info ────────────────── -->
        <div>
          <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
            {{ $t('footer.contactInfo') }}
          </h3>

          <!--
            Using <address> for contact information as per
            HTML5 semantics. This improves accessibility
            for screen readers.
          -->
          <address class="not-italic space-y-4">
            <!-- Phone -->
            <div class="flex items-start gap-3">
              <UIcon
                name="heroicons:phone"
                class="mt-0.5 h-5 w-5 shrink-0 text-primary-500"
                aria-hidden="true"
              />
              <a
                :href="`tel:${contactPhone}`"
                class="text-sm text-text-secondary transition-colors hover:text-primary-500"
              >
                {{ contactPhone }}
              </a>
            </div>

            <!-- Email -->
            <div class="flex items-start gap-3">
              <UIcon
                name="heroicons:envelope"
                class="mt-0.5 h-5 w-5 shrink-0 text-primary-500"
                aria-hidden="true"
              />
              <a
                :href="`mailto:${contactEmail}`"
                class="text-sm text-text-secondary transition-colors hover:text-primary-500"
              >
                {{ contactEmail }}
              </a>
            </div>

            <!-- Address -->
            <div class="flex items-start gap-3">
              <UIcon
                name="heroicons:map-pin"
                class="mt-0.5 h-5 w-5 shrink-0 text-primary-500"
                aria-hidden="true"
              />
              <span class="text-sm text-text-secondary">
                {{ $t('contact.address') }}: {{ contactAddress }}
              </span>
            </div>
          </address>

          <!-- Social Links -->
          <div class="mt-6 flex items-center gap-2">
            <template v-for="social in socialLinks" :key="social.label">
              <UButton
                :to="social.url"
                :icon="social.icon"
                color="neutral"
                variant="ghost"
                size="sm"
                square
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="social.label"
              />
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Copyright Bar ─────────────────────────────── -->
    <div class="border-t border-border-default bg-surface-primary/50 dark:bg-dark-surface-secondary/50">
      <div
        class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8"
      >
        <p class="text-sm text-text-muted">
          {{ $t('footer.copyright', { year: currentYear }) }}
        </p>

        <div class="flex items-center gap-6">
          <NuxtLink
            to="/privacy"
            class="text-sm text-text-muted transition-colors hover:text-text-secondary"
          >
            {{ $t('footer.privacy') }}
          </NuxtLink>
          <NuxtLink
            to="/terms"
            class="text-sm text-text-muted transition-colors hover:text-text-secondary"
          >
            {{ $t('footer.terms') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
/**
 * ========================================================
 * AppFooter – Global Footer Component
 * ========================================================
 *
 * Features:
 * - Semantic HTML5 <footer> with <address> for contact
 * - 4-column responsive grid (stacks on mobile)
 * - Quick links, services, contact info, social links
 * - Dynamic copyright year
 * - RTL-aware layout via Tailwind logical properties
 * ========================================================
 */

const { t, locale } = useI18n()
const localePath = useLocalePath()

// ── Current Year for Copyright ───────────────────────────
const currentYear = new Date().getFullYear()

// ── Contact Details ──────────────────────────────────────
const contactPhone = '+966 XX XXX XXXX'
const contactEmail = 'info@shafacare.com'
const contactAddress = 'City, Street Name, Building X'

// ── Navigation Links ─────────────────────────────────────
interface FooterLink {
  key: string
  label: string
  to: string
}

const quickLinks: FooterLink[] = [
  { key: 'nav.home', label: 'nav.home', to: localePath('/') },
  { key: 'nav.about', label: 'nav.about', to: localePath('/#about') },
  { key: 'nav.doctors', label: 'nav.doctors', to: localePath('/#doctors') },
  { key: 'nav.testimonials', label: 'nav.testimonials', to: localePath('/#testimonials') },
  { key: 'nav.contact', label: 'nav.contact', to: localePath('/#contact') }
]

const serviceLinks: FooterLink[] = [
  { key: 'nav.services', label: 'nav.services', to: localePath('/#services') },
  { key: 'nav.faq', label: 'nav.faq', to: localePath('/#faq') }
]

// ── Social Media Links ───────────────────────────────────
interface SocialLink {
  label: string
  icon: string
  url: string
}

const socialLinks: SocialLink[] = [
  {
    label: 'Facebook',
    icon: 'mdi:facebook',
    url: 'https://facebook.com/shafacare'
  },
  {
    label: 'Twitter / X',
    icon: 'mdi:twitter',
    url: 'https://twitter.com/shafacare'
  },
  {
    label: 'Instagram',
    icon: 'mdi:instagram',
    url: 'https://instagram.com/shafacare'
  },
  {
    label: 'LinkedIn',
    icon: 'mdi:linkedin',
    url: 'https://linkedin.com/company/shafacare'
  }
]
</script>
