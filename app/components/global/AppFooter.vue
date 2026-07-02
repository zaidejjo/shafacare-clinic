<template>
  <!-- ====================================================
       AppFooter – Premium Semantic Site Footer
       ====================================================
       - HTML5 <footer> with <address> for contact info
       - 4-column grid on lg, stacked on mobile
       - Logo, quick links, services, contact, social
       - Copyright bar with privacy + terms links
       - RTL-aware column ordering and hover transitions
       - Top burgundy gradient accent line
  -->
  <footer
    class="relative border-t border-border-default/50 bg-surface-secondary dark:bg-dark-surface-secondary overflow-hidden"
    role="contentinfo"
  >
    <!-- Top Burgundy Accent Line -->
    <div class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary-500 via-primary-700 to-primary-900" />

    <!-- ── Main Footer Content ───────────────────────── -->
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">
        
        <!-- ── Column 1: Logo + Tagline ──────────────── -->
        <div class="sm:col-span-2 lg:col-span-1">
          <!-- Logo -->
          <NuxtLink
            :to="localePath('/')"
            class="group mb-6 inline-flex items-center gap-3 focus:outline-none"
            :aria-label="$t('site.name')"
          >
            <div
              class="relative h-12 w-12 overflow-hidden rounded-xl border border-primary-500/20 bg-white p-0.5 shadow-md transition-all duration-500 group-hover:scale-105 group-hover:border-primary-500/40 group-hover:shadow-burgundy-glow dark:border-white/10 dark:bg-black/40"
            >
              <NuxtImg
                src="/shafa-care-logo.jpg"
                alt="Shafa Care Clinic Logo"
                class="h-full w-full rounded-lg object-cover"
                width="48"
                height="48"
              />
            </div>
            <div class="flex flex-col">
              <span
                class="text-lg font-extrabold tracking-tight text-text-primary transition-colors duration-300 group-hover:text-primary-500 dark:group-hover:text-primary-400 sm:text-xl"
                :class="locale === 'ar' ? 'font-arabic' : 'font-english'"
              >
                {{ $t('site.name') }}
              </span>
              <span 
                class="text-[10px] font-medium uppercase tracking-widest text-text-muted transition-colors duration-300 group-hover:text-primary-400"
                :class="locale === 'ar' ? 'font-arabic' : 'font-english'"
              >
                {{ $t('site.tagline') }}
              </span>
            </div>
          </NuxtLink>

          <!-- Tagline & Description -->
          <p class="mb-4 text-sm text-text-secondary leading-relaxed font-medium">
            {{ $t('site.tagline') }}
          </p>
          <p class="text-sm text-text-muted leading-relaxed">
            {{ $t('site.description') }}
          </p>
        </div>

        <!-- ── Column 2: Quick Links ─────────────────── -->
        <div>
          <h3 class="relative mb-6 text-sm font-bold uppercase tracking-wider text-text-primary">
            <span>{{ $t('footer.quickLinks') }}</span>
            <span class="absolute -bottom-2 block h-0.5 w-8 bg-primary-500 rounded-full" :class="locale === 'ar' ? 'right-0' : 'left-0'" />
          </h3>
          <ul class="space-y-3.5">
            <li v-for="link in quickLinks" :key="link.key">
              <NuxtLink
                :to="link.to"
                class="group flex items-center text-sm font-semibold text-text-secondary transition-all duration-300 hover:text-primary-500 dark:hover:text-primary-400"
              >
                <!-- RTL-aware hover slide indicator -->
                <span class="h-1.5 w-0 bg-primary-500 rounded-full transition-all duration-300 group-hover:w-2" :class="locale === 'ar' ? 'ml-0 group-hover:ml-2' : 'mr-0 group-hover:mr-2'" />
                {{ $t(link.label) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- ── Column 3: Services ────────────────────── -->
        <div>
          <h3 class="relative mb-6 text-sm font-bold uppercase tracking-wider text-text-primary">
            <span>{{ $t('footer.services') }}</span>
            <span class="absolute -bottom-2 block h-0.5 w-8 bg-primary-500 rounded-full" :class="locale === 'ar' ? 'right-0' : 'left-0'" />
          </h3>
          <ul class="space-y-3.5">
            <li v-for="link in serviceLinks" :key="link.key">
              <NuxtLink
                :to="link.to"
                class="group flex items-center text-sm font-semibold text-text-secondary transition-all duration-300 hover:text-primary-500 dark:hover:text-primary-400"
              >
                <span class="h-1.5 w-0 bg-primary-500 rounded-full transition-all duration-300 group-hover:w-2" :class="locale === 'ar' ? 'ml-0 group-hover:ml-2' : 'mr-0 group-hover:mr-2'" />
                {{ $t(link.label) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- ── Column 4: Contact Info ────────────────── -->
        <div>
          <h3 class="relative mb-6 text-sm font-bold uppercase tracking-wider text-text-primary">
            <span>{{ $t('footer.contactInfo') }}</span>
            <span class="absolute -bottom-2 block h-0.5 w-8 bg-primary-500 rounded-full" :class="locale === 'ar' ? 'right-0' : 'left-0'" />
          </h3>

          <!-- Semantic <address> with premium styling -->
          <address class="not-italic space-y-4">
            <!-- Phone -->
            <div class="group flex items-start gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500/10 text-primary-500 transition-colors duration-300 group-hover:bg-primary-500 group-hover:text-white dark:bg-primary-400/10 dark:text-primary-400 dark:group-hover:bg-primary-400 dark:group-hover:text-black">
                <UIcon
                  name="heroicons:phone"
                  class="h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
              </div>
              <div class="flex flex-col">
                <span class="text-[10px] font-bold uppercase tracking-wider text-text-muted">{{ $t('contact.phone') }}</span>
                <a
                  :href="`tel:${contactPhone}`"
                  class="text-sm font-bold text-text-secondary transition-colors hover:text-primary-500 dark:hover:text-primary-400"
                >
                  {{ contactPhone }}
                </a>
              </div>
            </div>

            <!-- Email -->
            <div class="group flex items-start gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500/10 text-primary-500 transition-colors duration-300 group-hover:bg-primary-500 group-hover:text-white dark:bg-primary-400/10 dark:text-primary-400 dark:group-hover:bg-primary-400 dark:group-hover:text-black">
                <UIcon
                  name="heroicons:envelope"
                  class="h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
              </div>
              <div class="flex flex-col">
                <span class="text-[10px] font-bold uppercase tracking-wider text-text-muted">{{ $t('contact.email') }}</span>
                <a
                  :href="`mailto:${contactEmail}`"
                  class="text-sm font-bold text-text-secondary transition-colors hover:text-primary-500 dark:hover:text-primary-400"
                >
                  {{ contactEmail }}
                </a>
              </div>
            </div>

            <!-- Address -->
            <div class="group flex items-start gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500/10 text-primary-500 transition-colors duration-300 group-hover:bg-primary-500 group-hover:text-white dark:bg-primary-400/10 dark:text-primary-400 dark:group-hover:bg-primary-400 dark:group-hover:text-black">
                <UIcon
                  name="heroicons:map-pin"
                  class="h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
              </div>
              <div class="flex flex-col">
                <span class="text-[10px] font-bold uppercase tracking-wider text-text-muted">{{ $t('contact.address') }}</span>
                <span class="text-sm font-bold text-text-secondary">
                  {{ contactAddress }}
                </span>
              </div>
            </div>
          </address>

          <!-- Social Links with Premium Glassmorphic Buttons -->
          <div class="mt-6 flex items-center gap-2">
            <template v-for="social in socialLinks" :key="social.label">
              <UButton
                :to="social.url"
                :icon="social.icon"
                color="neutral"
                variant="ghost"
                size="md"
                square
                target="_blank"
                rel="noopener noreferrer"
                class="rounded-xl hover:bg-primary-500/10 hover:text-primary-500 dark:hover:bg-primary-400/10 dark:hover:text-primary-400"
                :aria-label="social.label"
              />
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Copyright Bar ─────────────────────────────── -->
    <div class="border-t border-border-default/30 bg-surface-primary/40 dark:bg-dark-surface/40 backdrop-blur-md">
      <div
        class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8"
      >
        <p class="text-sm font-medium text-text-muted">
          {{ $t('footer.copyright', { year: currentYear }) }}
        </p>

        <div class="flex items-center gap-6">
          <NuxtLink
            to="/privacy"
            class="text-sm font-bold text-text-muted transition-colors hover:text-primary-500 dark:hover:text-primary-400"
          >
            {{ $t('footer.privacy') }}
          </NuxtLink>
          <NuxtLink
            to="/terms"
            class="text-sm font-bold text-text-muted transition-colors hover:text-primary-500 dark:hover:text-primary-400"
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
const contactPhone = '+966 11 456 7890'
const contactEmail = 'info@shafacare.com.sa'
const contactAddress = 'Riyadh, King Fahd Road, Al-Olaya District'

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
