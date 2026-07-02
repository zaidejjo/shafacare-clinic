<template>
  <!-- ====================================================
       StoryblokTestimonials – Patient Testimonials Section
       ====================================================
       - Section header with title + subtitle
       - Three layout variants:
         - carousel (default): CSS scroll-snap horizontal
         - grid: responsive card grid
         - list: stacked single-column
       - Uses <StoryblokTestimonialCard /> sub-component
       - Carousel: touch-swipeable, nav dots, desktop arrows
       - Auto-slide timer with pause on interaction
       - RTL-aware via doc direction + logical properties
       - Light/Dark mode via CSS variables
       - Storyblok compatible: accepts `blok` prop
       ==================================================== -->
  <section
    v-editable="blok"
    :aria-label="sectionTitle"
    class="bg-surface-secondary px-4 py-20 sm:py-28"
  >
    <div class="mx-auto max-w-7xl">
      <!-- ── Section Header ──────────────────────────── -->
      <div class="mb-14 text-center">
        <h2 class="mb-4 text-balance text-3xl font-bold text-text-primary sm:text-4xl">
          {{ sectionTitle }}
        </h2>
        <p
          v-if="sectionSubtitle"
          class="mx-auto max-w-2xl text-lg text-text-secondary"
        >
          {{ sectionSubtitle }}
        </p>
      </div>

      <!-- ── Grid Layout ────────────────────────────── -->
      <div
        v-if="currentLayout === 'grid' && items?.length"
        class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        <StoryblokTestimonialCard
          v-for="item in items"
          :key="item._uid"
          :testimonial="item"
        />
      </div>

      <!-- ── List Layout ────────────────────────────── -->
      <div
        v-else-if="currentLayout === 'list' && items?.length"
        class="mx-auto max-w-3xl space-y-8"
      >
        <StoryblokTestimonialCard
          v-for="item in items"
          :key="item._uid"
          :testimonial="item"
        />
      </div>

      <!-- ── Carousel Layout ────────────────────────── -->
      <div
        v-else-if="items?.length"
        class="relative"
      >
        <!-- Scrolling track -->
        <div
          ref="carouselRef"
          @scroll="onCarouselScroll"
          @mouseenter="pauseAutoSlide"
          @mouseleave="resumeAutoSlide"
          @touchstart.passive="pauseAutoSlide"
          @touchend="debounceResumeSlide"
          class="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory -mx-4 px-4 pb-4"
          style="scrollbar-width: none; -ms-overflow-style: none;"
        >
          <div
            v-for="item in items"
            :key="item._uid"
            class="snap-start shrink-0 w-[85vw] sm:w-[420px] lg:w-[460px]"
          >
            <StoryblokTestimonialCard :testimonial="item" />
          </div>
        </div>

        <!-- Navigation dots -->
        <div
          v-if="items.length > 1"
          class="mt-8 flex items-center justify-center gap-2"
        >
          <button
            v-for="(_, idx) in items"
            :key="idx"
            @click="scrollToSlide(idx)"
            class="rounded-full transition-all duration-300"
            :class="activeSlide === idx ? 'w-6 bg-primary-500' : 'w-2.5 bg-border-default hover:bg-text-muted'"
            :style="{ height: '10px' }"
            :aria-label="`Go to testimonial ${idx + 1}`"
          />
        </div>

        <!-- Desktop arrow buttons -->
        <button
          v-if="items.length > 1"
          @click="scrollToSlide(activeSlide - 1)"
          :disabled="activeSlide <= 0"
          class="absolute start-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface-primary p-3 shadow-lg transition-all hover:bg-surface-secondary disabled:cursor-not-allowed disabled:opacity-0 lg:flex"
          aria-label="Previous testimonial"
        >
          <UIcon
            name="heroicons:chevron-left-20-solid"
            class="h-5 w-5 text-text-primary"
            aria-hidden="true"
          />
        </button>
        <button
          v-if="items.length > 1"
          @click="scrollToSlide(activeSlide + 1)"
          :disabled="activeSlide >= items.length - 1"
          class="absolute end-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-1/2 rounded-full bg-surface-primary p-3 shadow-lg transition-all hover:bg-surface-secondary disabled:cursor-not-allowed disabled:opacity-0 lg:flex"
          aria-label="Next testimonial"
        >
          <UIcon
            name="heroicons:chevron-right-20-solid"
            class="h-5 w-5 text-text-primary"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * ========================================================
 * StoryblokTestimonials – Testimonials Section
 * ========================================================
 *
 * Props:
 *   blok – Storyblok content block (optional)
 *     - title          (string, multi-language)
 *     - subtitle       (string, multi-language)
 *     - testimonials   (array of TestimonialItem)
 *     - layout         ('carousel' | 'grid' | 'list')
 *     - autoSlide      (boolean, default: true)
 *     - slideInterval  (number, ms, default: 5000)
 *
 * RTL behavior:
 *   - Carousel scroll-snap respects doc direction
 *   - Desktop arrows use logical start/end positioning
 *   - Star ratings are direction-agnostic
 *
 * Uses:
 *   <StoryblokTestimonialCard> from the same directory
 * ========================================================
 */

import type { ComputedRef } from 'vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { TestimonialItem } from './TestimonialCard.vue'

const { t } = useI18n()

// ── Types ─────────────────────────────────────────────────
interface TestimonialsBlok {
  _uid?: string
  component?: string
  title?: string
  subtitle?: string
  testimonials?: TestimonialItem[]
  layout?: 'carousel' | 'grid' | 'list'
  autoSlide?: boolean
  slideInterval?: number
  [key: string]: unknown
}

const props = withDefaults(
  defineProps<{
    blok?: TestimonialsBlok | null
  }>(),
  { blok: () => null }
)

// ── Content Values ────────────────────────────────────────
const sectionTitle: ComputedRef<string> = computed(() =>
  props.blok?.title || t('testimonials.title')
)

const sectionSubtitle: ComputedRef<string | undefined> = computed(() =>
  props.blok?.subtitle || t('testimonials.subtitle')
)

const currentLayout: ComputedRef<string> = computed(() =>
  props.blok?.layout || 'carousel'
)

const autoSlideEnabled: ComputedRef<boolean> = computed(() =>
  props.blok?.autoSlide ?? true
)

const slideIntervalMs: ComputedRef<number> = computed(() =>
  props.blok?.slideInterval || 5000
)

const items: ComputedRef<TestimonialItem[] | undefined> = computed(() =>
  props.blok?.testimonials?.length ? props.blok.testimonials : undefined
)

// ── Carousel Logic ────────────────────────────────────────
const carouselRef = ref<HTMLElement | null>(null)
const activeSlide = ref(0)

function onCarouselScroll(): void {
  const el = carouselRef.value
  if (!el) return

  const { scrollLeft, scrollWidth, clientWidth } = el
  const maxScroll = scrollWidth - clientWidth

  if (maxScroll <= 0) {
    activeSlide.value = 0
    return
  }

  const progress = scrollLeft / maxScroll
  const count = items.value?.length || 1
  activeSlide.value = Math.round(progress * (count - 1))
}

function scrollToSlide(index: number): void {
  const el = carouselRef.value
  if (!el || !items.value) return

  const clamped = Math.max(0, Math.min(index, items.value.length - 1))
  const children = el.children as HTMLCollection

  if (clamped < children.length) {
    const slide = children[clamped] as HTMLElement
    slide.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    })
    activeSlide.value = clamped
  }
}

// ── Auto-slide Timer ─────────────────────────────────────
let autoSlideTimer: ReturnType<typeof setInterval> | null = null

function startAutoSlide(): void {
  if (!autoSlideEnabled.value || !items.value || items.value.length <= 1) return

  autoSlideTimer = setInterval(() => {
    const count = items.value?.length || 0
    if (count <= 1) return
    const next = (activeSlide.value + 1) % count
    scrollToSlide(next)
  }, slideIntervalMs.value)
}

function pauseAutoSlide(): void {
  if (autoSlideTimer !== null) {
    clearInterval(autoSlideTimer)
    autoSlideTimer = null
  }
}

function resumeAutoSlide(): void {
  // Don't restart immediately after pause – wait for debounce or clean restart
  startAutoSlide()
}

let resumeTimeout: ReturnType<typeof setTimeout> | null = null

function debounceResumeSlide(): void {
  if (resumeTimeout !== null) {
    clearTimeout(resumeTimeout)
  }
  resumeTimeout = setTimeout(() => {
    startAutoSlide()
  }, 3000)
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  pauseAutoSlide()
  if (resumeTimeout !== null) {
    clearTimeout(resumeTimeout)
  }
})
</script>
