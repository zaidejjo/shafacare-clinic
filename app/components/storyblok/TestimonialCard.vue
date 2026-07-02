<template>
  <!-- ====================================================
       StoryblokTestimonialCard – Single Testimonial Card
       ====================================================
       - Star rating (1–5) with filled / outline MDI icons
       - Quoted review text
       - Patient avatar (photo or initials fallback)
       - Service type + optional date
       - Used by StoryblokTestimonials component
       ==================================================== -->
  <div class="flex h-full flex-col rounded-xl border border-border-default bg-surface-primary p-6 shadow-sm dark:bg-dark-surface">
    <!-- Star Rating -->
    <div
      class="mb-4 flex items-center gap-0.5"
      :aria-label="`${displayRating} out of 5 stars`"
    >
      <UIcon
        v-for="(filled, idx) in starStates"
        :key="idx"
        :name="filled ? 'mdi:star' : 'mdi:star-outline'"
        class="h-5 w-5 text-amber-400"
        aria-hidden="true"
      />
    </div>

    <!-- Review Text -->
    <blockquote class="mb-5 flex-1 text-sm leading-relaxed text-text-secondary italic leading-[1.7]">
      &ldquo;{{ displayReview }}&rdquo;
    </blockquote>

    <!-- Footer: patient info -->
    <div class="flex items-center gap-3 border-t border-border-default pt-4">
      <!-- Avatar photo -->
      <div
        v-if="photoSrc"
        class="h-10 w-10 shrink-0 overflow-hidden rounded-full"
      >
        <NuxtImg
          :src="photoSrc"
          :alt="photoAlt"
          loading="lazy"
          class="h-full w-full object-cover"
          width="40"
          height="40"
          decoding="async"
        />
      </div>
      <!-- Initials fallback -->
      <div
        v-else
        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-sm font-bold text-primary-500 dark:bg-primary-900/40 dark:text-primary-400"
      >
        {{ displayInitials }}
      </div>

      <div class="min-w-0">
        <p class="truncate text-sm font-semibold text-text-primary">
          {{ displayName }}
        </p>
        <p class="truncate text-xs text-text-muted">
          <template v-if="displayServiceType">{{ displayServiceType }}</template>
          <template v-if="displayServiceType && displayDate">&nbsp;&middot;&nbsp;</template>
          <template v-if="displayDate">{{ displayDate }}</template>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * ========================================================
 * StoryblokTestimonialCard
 * ========================================================
 *
 * Props:
 *   testimonial – TestimonialItem object with:
 *     patientName, rating (1–5), reviewText, photo,
 *     date, serviceType
 * ========================================================
 */

import type { PropType } from 'vue'
import { computed } from 'vue'

interface StoryblokAsset {
  filename?: string
  alt?: string
  focus?: string
}

export interface TestimonialItem {
  _uid?: string
  patientName?: string
  rating?: number
  reviewText?: string
  photo?: StoryblokAsset
  date?: string
  serviceType?: string
  [key: string]: unknown
}

const props = defineProps({
  testimonial: {
    type: Object as PropType<TestimonialItem>,
    required: true
  }
})

// ── Star Rating ───────────────────────────────────────────
const displayRating = computed<number>(() => {
  return Math.max(0, Math.min(5, Math.round(props.testimonial.rating || 0)))
})

const starStates = computed<boolean[]>(() => {
  return Array.from({ length: 5 }, (_, i) => i < displayRating.value)
})

// ── Patient Info ──────────────────────────────────────────
const displayName = computed<string>(() => {
  return props.testimonial.patientName || ''
})

const displayInitials = computed<string>(() => {
  const name = displayName.value
  if (!name) return '?'
  return name
    .split(' ')
    .map((part: string) => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const displayReview = computed<string>(() => {
  return props.testimonial.reviewText || ''
})

const displayServiceType = computed<string | null>(() => {
  return props.testimonial.serviceType || null
})

// ── Photo ─────────────────────────────────────────────────
const photoSrc = computed<string | null>(() => {
  return props.testimonial.photo?.filename || null
})

const photoAlt = computed<string>(() => {
  return props.testimonial.photo?.alt || displayName.value
})

// ── Date ──────────────────────────────────────────────────
const displayDate = computed<string | null>(() => {
  const raw = props.testimonial.date
  if (!raw) return null
  try {
    const date = new Date(raw)
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return raw
  }
})
</script>
