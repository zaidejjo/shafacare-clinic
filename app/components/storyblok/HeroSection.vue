<template>
  <!-- ====================================================
       HeroSection – Elite LCP-Optimized Hero Banner
       ====================================================
       - Full-viewport hero with responsive background image or premium mesh gradient
       - Deep burgundy and gold glowing abstract overlays
       - Dynamic headline, subheadline, and dual CTA buttons
       - RTL-aware text alignment and layout grid
       - Premium glassmorphic highlights card in split layout
       - LCP optimization: fetchpriority="high" on hero img
       - Storyblok compatible: accepts `blok` prop with v-editable
  -->
  <section
    v-editable="blok"
    :aria-label="blok?.headline || $t('hero.title')"
    class="relative flex min-h-[90vh] items-center overflow-hidden bg-surface-primary py-16 lg:py-24"
  >
    <!-- ── Background Image / Mesh Gradient ─────────── -->
    <div
      class="absolute inset-0 -z-20"
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

      <!-- Fallback Premium Mesh Gradient when no image is provided -->
      <div
        v-else
        class="h-full w-full bg-gradient-to-br from-surface-secondary via-surface-primary to-surface-secondary dark:from-dark-surface dark:via-dark-surface-secondary dark:to-dark-surface"
      />
    </div>

    <!-- ── Glowing Abstract Orbs for Premium Glassmorphic Atmosphere ── -->
    <div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <!-- Orb 1: Deep Burgundy -->
      <div class="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-primary-900/10 blur-[120px] dark:bg-primary-950/30" />
      <!-- Orb 2: Soft Crimson -->
      <div class="absolute top-1/2 -right-40 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary-600/5 blur-[100px] dark:bg-primary-800/15" />
      <!-- Orb 3: Subtle Gold/Amber for Luxury Touch -->
      <div class="absolute -bottom-40 left-1/3 h-[400px] w-[400px] rounded-full bg-amber-500/5 blur-[80px] dark:bg-amber-500/10" />
    </div>

    <!-- ── Semi-transparent overlay for image readability ── -->
    <div
      v-if="imageSrc"
      class="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/50 to-transparent dark:from-black/90 dark:via-black/70 dark:to-black/30"
      aria-hidden="true"
    />

    <!-- ── Content Container ────────────────────────── -->
    <div
      class="relative z-10 mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-7xl animate-fade-in"
    >
      <div :class="layout === 'split' ? 'grid lg:grid-cols-12 gap-12 lg:gap-16 items-center' : 'max-w-3xl mx-auto'">
        
        <!-- Left Column: Text Content -->
        <div 
          :class="[
            layout === 'split' ? 'lg:col-span-7' : '',
            contentAlignmentClass
          ]"
        >
          <!-- Badge / Tagline -->
          <div class="mb-6" :class="layout === 'centered' ? 'mx-auto' : ''">
            <span
              class="inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-600 dark:border-primary-400/20 dark:bg-primary-400/10 dark:text-primary-400"
            >
              <UIcon name="heroicons:sparkles" class="h-4 w-4 animate-pulse" />
              {{ $t('site.tagline') }}
            </span>
          </div>

          <!-- Headline -->
          <h1
            class="mb-6 text-balance text-4xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
            :class="locale === 'ar' ? 'font-arabic' : 'font-english'"
          >
            {{ headline }}
          </h1>

          <!-- Subheadline -->
          <p
            v-if="subheadline"
            class="mb-8 max-w-2xl text-balance text-lg text-text-secondary sm:text-xl font-medium leading-relaxed"
          >
            {{ subheadline }}
          </p>

          <!-- Dual CTA Buttons -->
          <div class="flex flex-wrap gap-4" :class="layout === 'centered' ? 'justify-center' : 'justify-start'">
            <UButton
              v-if="ctaText"
              size="xl"
              color="primary"
              :label="ctaText"
              class="rounded-xl px-8 py-4 text-base font-bold shadow-lg transition-all duration-300 hover:shadow-burgundy-glow hover:scale-[1.02] active:scale-[0.98]"
              :to="ctaLink?.url || undefined"
              :target="ctaLinksTarget"
            />
            <UButton
              size="xl"
              color="neutral"
              variant="outline"
              :label="locale === 'ar' ? 'تعرف على خدماتنا' : 'Explore Services'"
              class="rounded-xl px-8 py-4 text-base font-bold transition-all duration-300 hover:bg-primary-500/5 dark:hover:bg-primary-400/5"
              to="#services"
            />
          </div>
        </div>

        <!-- Right Column: Premium Glassmorphic Highlights Card (Split Layout) -->
        <div v-if="layout === 'split'" class="lg:col-span-5">
          <div class="glass-card-light dark:glass-card-dark rounded-3xl p-8 border border-white/20 dark:border-white/5 shadow-2xl hover-lift">
            <div class="flex items-center gap-3 mb-6">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-500 dark:bg-primary-400/10 dark:text-primary-400">
                <UIcon name="heroicons:heart" class="h-6 w-6" />
              </div>
              <h3 class="text-xl font-extrabold text-text-primary" :class="locale === 'ar' ? 'font-arabic' : 'font-english'">
                {{ locale === 'ar' ? 'رعاية طبية متميزة' : 'Premium Medical Care' }}
              </h3>
            </div>
            
            <ul class="space-y-5">
              <li v-for="item in highlights" :key="item.title" class="group flex items-start gap-4">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white dark:bg-primary-400/10 dark:text-primary-400 dark:group-hover:bg-primary-400 dark:group-hover:text-black">
                  <UIcon :name="item.icon" class="h-5 w-5" />
                </div>
                <div class="flex flex-col">
                  <h4 class="text-sm font-bold text-text-primary transition-colors duration-300 group-hover:text-primary-500 dark:group-hover:text-primary-400">
                    {{ item.title }}
                  </h4>
                  <p class="text-xs text-text-muted mt-1 leading-relaxed">
                    {{ item.desc }}
                  </p>
                </div>
              </li>
            </ul>

            <!-- Subtle Trust Indicator -->
            <div class="mt-8 pt-6 border-t border-border-default/30 flex items-center justify-between text-xs font-bold text-text-muted">
              <span>{{ locale === 'ar' ? '✓ معتمد من وزارة الصحة' : '✓ MOH Certified' }}</span>
              <span>{{ locale === 'ar' ? '★ تقييم 4.9/5' : '★ 4.9/5 Rated' }}</span>
            </div>
          </div>
        </div>

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
  return null
})

const imageAlt = computed(() => {
  return props.blok?.backgroundImage?.alt || ''
})

// ── Layout Classes ───────────────────────────────────────
const layout = computed(() => props.blok?.layout || 'split') // Default to split for a premium look

const contentAlignmentClass = computed(() => {
  if (layout.value === 'centered') {
    return 'text-center items-center'
  }
  return 'text-start items-start'
})

const contentContainerClass = computed(() => {
  if (layout.value === 'centered') {
    return 'items-center'
  }
  return 'items-start'
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

// ── Clinic Highlights for Split Layout ───────────────────
const highlights = computed(() => {
  if (locale.value === 'ar') {
    return [
      {
        icon: 'heroicons:user-group',
        title: 'أطباء استشاريون ذوو خبرة',
        desc: 'نخبة من الأطباء الاستشاريين الحاصلين على أعلى الشهادات العالمية لتقديم أفضل رعاية.'
      },
      {
        icon: 'heroicons:shield-check',
        title: 'أحدث التقنيات الطبية',
        desc: 'نستخدم أحدث الأجهزة والتقنيات الطبية لضمان دقة التشخيص وسلامة العلاج.'
      },
      {
        icon: 'heroicons:clock',
        title: 'رعاية متكاملة ومستمرة',
        desc: 'نحن هنا دائماً لتقديم الرعاية الطبية الطارئة والمستمرة لك ولعائلتك بكل رحمة.'
      }
    ]
  } else {
    return [
      {
        icon: 'heroicons:user-group',
        title: 'Experienced Consultant Doctors',
        desc: 'A select group of consultant doctors with top international certifications.'
      },
      {
        icon: 'heroicons:shield-check',
        title: 'State-of-the-Art Technology',
        desc: 'We use the latest medical devices and technologies for precise diagnosis.'
      },
      {
        icon: 'heroicons:clock',
        title: 'Comprehensive & Continuous Care',
        desc: 'We are always here to provide emergency and continuous medical care with compassion.'
      }
    ]
  }
})

// ── Dynamic SEO: Preload the hero image for LCP ──────────
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
 * Entrance fade-in animation for the hero section content
 */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/**
 * Ensure the hero image covers the entire section
 * without layout shift while loading
 */
img {
  background-color: var(--color-primary-950);
}
</style>
