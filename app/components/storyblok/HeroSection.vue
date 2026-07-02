<template>
  <!-- ====================================================
       HeroSection – LCP-optimized hero banner
       ====================================================
       - Full-viewport hero with responsive background image
       - Burgundy gradient overlay for brand consistency
       - Dynamic headline, subheadline, and CTA button
       - RTL-aware text alignment (text-start / text-end)
       - CTA button with 0.75rem rounded corners
       - LCP optimization: fetchpriority="high" on hero img
       - Storyblok compatible: accepts `blok` prop with
         v-editable directive for visual editor
  -->
  <section
    v-editable="blok"
    :aria-label="blok?.headline || $t('hero.title')"
    class="relative flex min-h-[80vh] items-center overflow-hidden"
    :class="contentAlignmentClass"
  >
    <!-- ── Background Image ─────────────────────────── -->
    <div
      class="absolute inset-0 -z-10"
      aria-hidden="true"
    >
<NuxtImg
        v-if="imageSrc"
        :src="imageSrc"
        :alt="imageAlt"
        fetchpriority="high"
        loading="eager"
        class="h-full w-full object-cover"
        :class="imageParallaxClass"
        sizes="100vw"
        width="1920"
        height="1080"
        decoding="async"
      />

      <!-- Fallback gradient when no image is provided -->
      <div
        v-else
        class="h-full w-full bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900"
      />
    </div>

    <!-- ── Overlay ──────────────────────────────────── -->
    <!-- Semi-transparent overlay to ensure text readability -->
    <div
      class="absolute inset-0 -z-10"
      :style="overlayStyle"
      aria-hidden="true"
    />

    <!-- ── Content ──────────────────────────────────── -->
    <div
      class="relative z-10 mx-auto w-full px-4 py-20 sm:px-6 lg:px-8"
      :class="contentContainerClass"
    >
      <div class="max-w-3xl">
        <!-- Badge / Tagline -->
        <span
          class="mb-4 inline-block rounded-pill bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
        >
          {{ $t('site.tagline') }}
        </span>

        <!-- Headline -->
        <h1
          class="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {{ headline }}
        </h1>

        <!-- Subheadline -->
        <p
          v-if="subheadline"
          class="mb-8 max-w-2xl text-balance text-lg text-white/80 sm:text-xl"
        >
          {{ subheadline }}
        </p>

        <!-- CTA Button -->
        <UButton
          v-if="ctaText"
          size="xl"
          color="white"
          :label="ctaText"
          class="rounded-xl px-8 py-3.5 text-base font-semibold shadow-lg text-primary-700 transition-all duration-200 hover:shadow-xl active:scale-[0.98]"
          :to="ctaLink?.url || undefined"
          :target="ctaLinksTarget"
        />
      </div>
    </div>

    <!-- ── Bottom Gradient Fade ──────────────────────── -->
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface-primary to-transparent"
      aria-hidden="true"
    />
  </section>
</template>

<script setup lang="ts">
/**
 * ========================================================
 * StoryblokHeroSection – Hero Banner Component
 * ========================================================
 *
 * Accepts a Storyblok `blok` object for visual editor
 * compatibility. Falls back to i18n translations when
 * Storyblok content is not provided.
 *
 * Props:
 *   blok – Storyblok content block object (optional)
 *     - headline        (string, multi-language)
 *     - subheadline     (string, multi-language)
 *     - ctaText         (string, multi-language)
 *     - ctaLink          ({ url, target?, cached_url? })
 *     - backgroundImage  ({ filename, alt?, focus? })
 *     - overlayColor     (string, hex with opacity)
 *     - layout           ('centered' | 'left-aligned' | 'split')
 *     - animationType    ('fade' | 'slide' | 'none')
 *
 * LCP Optimization:
 * - fetchpriority="high" on hero <NuxtImg>
 * - loading="eager" (above-fold)
 * - Explicit width/height to prevent CLS
 * - sizes="100vw" for responsive loading
 * ========================================================
 */

const { t, locale } = useI18n()

// ── Props ─────────────────────────────────────────────────
interface StoryblokLink {
  url?: string
  target?: string
  cached_url?: string
}

interface StoryblokAsset {
  filename?: string
  alt?: string
  focus?: string
}

interface HeroBlok {
  _uid?: string
  component?: string
  headline?: string
  subheadline?: string
  ctaText?: string
  ctaLink?: StoryblokLink
  backgroundImage?: StoryblokAsset
  overlayColor?: string
  layout?: 'centered' | 'left-aligned' | 'split'
  animationType?: 'fade' | 'slide' | 'none'
  [key: string]: unknown
}

const props = withDefaults(
  defineProps<{
    blok?: HeroBlok | null
  }>(),
  {
    blok: () => null
  }
)

// ── Computed Content Values ──────────────────────────────
// Use Storyblok content when available, fall back to i18n
const headline = computed(() => props.blok?.headline || t('hero.title'))
const subheadline = computed(() => props.blok?.subheadline || t('hero.subtitle'))
const ctaText = computed(() => props.blok?.ctaText || t('hero.cta'))

// CTA Link
const ctaLink = computed(() => {
  if (props.blok?.ctaLink) {
    return {
      url: props.blok.ctaLink.cached_url || props.blok.ctaLink.url,
      target: props.blok.ctaLink.target
    }
  }
  return null
})

const ctaLinksTarget = computed(() => ctaLink.value?.target || undefined)

// ── Background Image ─────────────────────────────────────
const imageSrc = computed(() => {
  if (props.blok?.backgroundImage?.filename) {
    return props.blok.backgroundImage.filename
  }
  // Fallback: use a placeholder gradient (no actual image)
  return null
})

const imageAlt = computed(() => {
  return props.blok?.backgroundImage?.alt || ''
})

// ── Layout Classes ───────────────────────────────────────
const contentAlignmentClass = computed(() => {
  const layout = props.blok?.layout || 'centered'
  switch (layout) {
    case 'left-aligned':
      return 'justify-start'
    case 'split':
      return 'justify-start lg:justify-start'
    default:
      return 'justify-center'
  }
})

const contentContainerClass = computed(() => {
  const layout = props.blok?.layout || 'centered'
  switch (layout) {
    case 'left-aligned':
      return 'ps-4 sm:ps-6 lg:ps-8'
    case 'split':
      return ''
    default:
      return 'text-center'
  }
})

// ── Overlay Style ────────────────────────────────────────
const overlayStyle = computed(() => {
  // Use the overlay color from Storyblok, or default to primary gradient
  if (props.blok?.overlayColor) {
    return {
      background: `linear-gradient(135deg, ${props.blok.overlayColor} 0%, rgba(0,0,0,0.6) 100%)`
    }
  }
  return {
    background:
      'linear-gradient(135deg, rgba(196, 30, 58, 0.85) 0%, rgba(128, 18, 38, 0.7) 50%, rgba(0, 0, 0, 0.5) 100%)'
  }
})

// ── Image Parallax / Effect Classes ──────────────────────
const imageParallaxClass = computed(() => {
  const animation = props.blok?.animationType || 'none'
  switch (animation) {
    case 'fade':
      return 'animate-fade-in'
    case 'slide':
      return 'scale-105'
    default:
      return ''
  }
})

// ── Dynamic SEO: Preload the hero image for LCP ──────────
// This injects a <link rel="preload"> for the hero image
// so the browser starts fetching it early.
if (imageSrc.value) {
  useHead({
    link: [
      {
        rel: 'preload',
        as: 'image',
        href: imageSrc.value,
        fetchpriority: 'high'
      }
    ]
  })
}
</script>

<style scoped>
/**
 * Subtle fade-in animation for the hero section
 */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

/**
 * Ensure the hero image covers the entire section
 * without layout shift while loading
 */
img {
  background-color: var(--color-primary-700);
}
</style>
