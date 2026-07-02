<template>
  <!-- ====================================================
       StoryblokServices – Services Section
       ====================================================
       - Section header with title + subtitle
       - Service cards with icon, title, description, link
       - Layout variants: grid-2, grid-3, grid-4, list
       - Hover: subtle lift + deeper shadow
       - RTL-aware via doc direction + logical properties
       - Light/Dark mode via CSS variables
       - Storyblok compatible: accepts `blok` prop
       ==================================================== -->
  <section
    v-editable="blok"
    :aria-label="title"
    class="bg-surface-secondary px-4 py-20 sm:py-28"
  >
    <div class="mx-auto max-w-7xl">
      <!-- ── Section Header ──────────────────────────── -->
      <div class="mb-14 text-center">
        <h2
          class="mb-4 text-balance text-3xl font-bold text-text-primary sm:text-4xl"
        >
          {{ title }}
        </h2>
        <p
          v-if="subtitle"
          class="mx-auto max-w-2xl text-lg text-text-secondary"
        >
          {{ subtitle }}
        </p>
      </div>

      <!-- ── Service Cards Grid ──────────────────────── -->
      <div
        v-if="serviceItems?.length"
        :class="gridClass"
      >
        <article
          v-for="service in serviceItems"
          :key="service._uid"
          class="group relative rounded-xl border border-border-default bg-surface-primary p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:bg-dark-surface"
        >
          <!-- ── Icon ───────────────────────────────── -->
          <div
            class="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-500 transition-all duration-300 group-hover:bg-primary-500 group-hover:text-white dark:bg-primary-900/40 dark:group-hover:bg-primary-600"
          >
            <UIcon
              v-if="resolveIcon(service.icon)?.type === 'iconify'"
              :name="resolveIcon(service.icon)?.name || 'heroicons:heart'"
              class="h-7 w-7"
              aria-hidden="true"
            />
            <NuxtImg
              v-else-if="resolveIcon(service.icon)?.type === 'image'"
              :src="resolveIcon(service.icon)?.src || ''"
              :alt="resolveIcon(service.icon)?.alt || service.title || ''"
              class="h-7 w-7 object-contain"
              loading="lazy"
              aria-hidden="true"
            />
          </div>

          <!-- ── Title ──────────────────────────────── -->
          <h3
            class="mb-3 text-xl font-semibold text-text-primary"
          >
            {{ service.title }}
          </h3>

          <!-- ── Description ────────────────────────── -->
          <p
            class="mb-5 text-sm leading-relaxed text-text-secondary"
          >
            {{ service.description }}
          </p>

          <!-- ── Optional Link ──────────────────────── -->
          <NuxtLink
            v-if="service.linkUrl || service.linkText"
            :to="resolveLink(service.linkUrl)"
            class="inline-flex items-center gap-1.5 text-sm font-medium text-primary-500 transition-colors hover:text-primary-600"
            :class="linkChevronClass"
          >
            {{ service.linkText || $t('common.learnMore') }}
            <UIcon
              :name="linkChevronIcon"
              class="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </NuxtLink>
        </article>
      </div>

      <!-- ── Optional CTA Button ────────────────────── -->
      <div
        v-if="showCta && (ctaText || ctaLink)"
        class="mt-14 text-center"
      >
        <UButton
          size="xl"
          color="primary"
          :label="ctaText || $t('common.learnMore')"
          class="rounded-xl px-8 py-3.5 text-base font-semibold shadow-lg transition-all duration-200 hover:shadow-xl active:scale-[0.98]"
          :to="resolveLink(ctaLink)"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * ========================================================
 * StoryblokServices – Services Section
 * ========================================================
 *
 * Props:
 *   blok – Storyblok content block (optional)
 *     - title          (string, multi-language)
 *     - subtitle       (string, multi-language)
 *     - services       (array of:
 *         icon         – Iconify name | Storyblok asset | icon plugin
 *         title        – string
 *         description  – string
 *         linkText     – string (optional)
 *         linkUrl      – string | Storyblok link (optional)
 *       )
 *     - layout         ('grid-2' | 'grid-3' | 'grid-4' | 'list')
 *     - showCta        (boolean)
 *     - ctaText        (string, optional)
 *     - ctaLink        (Storyblok link, optional)
 *
 * RTL behavior:
 *   - Grid columns naturally respect doc direction
 *   - Link chevron flips via icon change in RTL
 * ========================================================
 */

import type { ComputedRef } from 'vue'

const { t, locale } = useI18n()

// ── Types ─────────────────────────────────────────────────
interface StoryblokLink {
  url?: string
  cached_url?: string
  target?: string
}

interface IconField {
  name?: string
  type?: string
  filename?: string
  alt?: string
  [key: string]: unknown
}

interface ServiceItem {
  _uid?: string
  icon?: IconField | string
  title?: string
  description?: string
  linkText?: string
  linkUrl?: StoryblokLink | string
}

interface ServicesBlok {
  _uid?: string
  component?: string
  title?: string
  subtitle?: string
  services?: ServiceItem[]
  layout?: 'grid-2' | 'grid-3' | 'grid-4' | 'list'
  showCta?: boolean
  ctaText?: string
  ctaLink?: StoryblokLink | string
  [key: string]: unknown
}

const props = withDefaults(
  defineProps<{
    blok?: ServicesBlok | null
  }>(),
  { blok: () => null }
)

// ── Content Values ────────────────────────────────────────
const title: ComputedRef<string> = computed(() =>
  props.blok?.title || t('services.title')
)

const subtitle: ComputedRef<string | undefined> = computed(() =>
  props.blok?.subtitle || t('services.subtitle')
)

const layout: ComputedRef<string> = computed(() =>
  props.blok?.layout || 'grid-3'
)

const showCta: ComputedRef<boolean> = computed(() =>
  props.blok?.showCta ?? false
)

const ctaText: ComputedRef<string | undefined> = computed(() =>
  props.blok?.ctaText || undefined
)

const ctaLink: ComputedRef<StoryblokLink | string | undefined> = computed(() =>
  props.blok?.ctaLink || undefined
)

const serviceItems: ComputedRef<ServiceItem[] | undefined> = computed(() =>
  props.blok?.services?.length ? props.blok.services : undefined
)

// ── Grid Classes ──────────────────────────────────────────
const gridClass: ComputedRef<string> = computed(() => {
  switch (layout.value) {
    case 'grid-2':
      return 'grid gap-8 sm:grid-cols-2'
    case 'grid-4':
      return 'grid gap-8 sm:grid-cols-2 lg:grid-cols-4'
    case 'list':
      return 'grid gap-6 max-w-3xl mx-auto'
    default:
      // grid-3
      return 'grid gap-8 sm:grid-cols-2 lg:grid-cols-3'
  }
})

// ── Link Utilities ────────────────────────────────────────
function resolveLink(link: StoryblokLink | string | undefined): string | undefined {
  if (!link) return undefined
  if (typeof link === 'string') return link
  return link.cached_url || link.url || undefined
}

// RTL-aware chevron: flips direction
const linkChevronIcon: ComputedRef<string> = computed(() =>
  locale.value === 'ar'
    ? 'heroicons:chevron-left-20-solid'
    : 'heroicons:chevron-right-20-solid'
)

const linkChevronClass: ComputedRef<string> = computed(() =>
  locale.value === 'ar' ? 'flex-row-reverse' : ''
)

// ── Icon Resolver ─────────────────────────────────────────
interface ResolvedIcon {
  type: 'iconify' | 'image' | 'none'
  name?: string
  src?: string
  alt?: string
}

function resolveIcon(icon: IconField | string | undefined): ResolvedIcon {
  if (!icon) return { type: 'none' }

  // Direct string like "heroicons:heart"
  if (typeof icon === 'string') {
    return { type: 'iconify', name: icon }
  }

  // Storyblok icon plugin: { name: "heroicons:heart", type: "icon" }
  if (typeof icon.name === 'string' && icon.name.includes(':') && !icon.filename) {
    return { type: 'iconify', name: icon.name }
  }

  // Asset: { filename: "https://..." }
  if (typeof icon.filename === 'string') {
    return {
      type: 'image',
      src: icon.filename,
      alt: icon.alt || ''
    }
  }

  // Fallback: treat as iconify if there's a name but no filename
  if (typeof icon.name === 'string') {
    return { type: 'iconify', name: icon.name }
  }

  return { type: 'none' }
}
</script>
