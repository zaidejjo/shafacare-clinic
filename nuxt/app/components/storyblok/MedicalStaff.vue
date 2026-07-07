<template>
  <!-- ====================================================
       StoryblokMedicalStaff – Medical Team Section
       ====================================================
       - Section header with title + subtitle
       - Doctor profile cards with photo, info, social links
       - Layout variants: grid-2, grid-3, grid-4
       - Photo containers: soft rounded-xl, aspect-square
       - RTL-aware via doc direction + logical properties
       - Light/Dark mode via CSS variables
       - Storyblok compatible: accepts `blok` prop
       ==================================================== -->
  <section
    v-editable="blok"
    :aria-label="title"
    class="bg-surface-primary px-4 py-20 sm:py-28"
  >
    <div class="mx-auto max-w-7xl">
      <!-- ── Section Header ──────────────────────────── -->
      <div class="mb-14 text-center">
        <h2
          class="mb-4 text-balance text-3xl font-bold text-text-primary sm:text-4xl"
          :class="locale === 'ar' ? 'font-arabic' : 'font-english'"
        >
          {{ title }}
        </h2>
         <p
           v-if="subtitleText"
           class="mx-auto max-w-2xl text-lg text-text-secondary"
           :class="locale === 'ar' ? 'font-arabic' : 'font-english'"
         >
           {{ subtitleText }}
         </p>
       </div>
 
       <!-- ── Featured Section Image ──────────────────────── -->
       <div class="mb-14 overflow-hidden rounded-3xl shadow-xl">
          <NuxtImg
            src="/images/doctor-placeholder.jpg"
            alt="Professional Medical Staff"
            class="w-full aspect-video object-cover"
            loading="lazy"
            decoding="async"
          />
       </div>
 
       <!-- ── Doctors Grid ────────────────────────────── -->
       <div
         v-if="doctorList?.length"

        :class="gridClass"
      >
        <article
          v-for="doctor in doctorList"
          :key="doctor._uid"
          class="group rounded-3xl border border-border-default bg-surface-secondary p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-premium dark:bg-dark-surface-secondary"
        >
          <!-- ── Photo Container (Fixed Aspect Ratio to prevent flickering) ── -->
          <div
            class="mx-auto mb-6 overflow-hidden rounded-2xl bg-primary-100 dark:bg-primary-900/30 relative"
            :class="photoContainerClass"
          >
            <NuxtImg
              v-if="resolvePhoto(doctor.photo)"
              :src="resolvePhoto(doctor.photo)?.src || ''"
              :alt="resolvePhoto(doctor.photo)?.alt || doctor.name || ''"
              loading="lazy"
              class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              width="300"
              height="300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              decoding="async"
            />
             <!-- Fallback avatar placeholder -->
             <NuxtImg
               v-else
               src="/images/doctor-placeholder.jpg"
               alt="Doctor Placeholder"
               class="absolute inset-0 h-full w-full object-cover"
               loading="lazy"
             />
          </div>

          <!-- ── Name ────────────────────────────────── -->
          <h3
            class="mb-1 text-xl font-bold text-text-primary"
            :class="locale === 'ar' ? 'font-arabic' : 'font-english'"
          >
            {{ doctor.name }}
          </h3>

          <!-- ── Specialty Badge ─────────────────────── -->
          <p
            v-if="doctor.specialty"
            class="mb-3 inline-block rounded-pill bg-primary-50 px-4 py-1 text-sm font-medium text-primary-600 dark:bg-primary-900/40 dark:text-primary-400"
            :class="locale === 'ar' ? 'font-arabic' : 'font-english'"
          >
            {{ doctor.specialty }}
          </p>

          <!-- ── Bio ─────────────────────────────────── -->
          <p
            v-if="doctor.bio"
            class="mb-5 text-sm leading-relaxed text-text-secondary"
            :class="locale === 'ar' ? 'font-arabic' : 'font-english'"
          >
            {{ doctor.bio }}
          </p>

          <!-- ── Contact Info Row ────────────────────── -->
          <div
            v-if="doctor.email || doctor.phone"
            class="mb-5 flex items-center justify-center gap-4 text-sm"
          >
            <a
              v-if="doctor.email"
              :href="`mailto:${doctor.email}`"
              class="inline-flex items-center gap-1.5 text-text-muted transition-colors hover:text-primary-500 min-h-0"
              :aria-label="`Email ${doctor.name}`"
            >
              <UIcon name="heroicons:envelope" class="h-4 w-4" aria-hidden="true" />
              <span class="sr-only sm:not-sr-only">{{ doctor.email }}</span>
            </a>
            <a
              v-if="doctor.phone"
              :href="`tel:${doctor.phone}`"
              class="inline-flex items-center gap-1.5 text-text-muted transition-colors hover:text-primary-500 min-h-0"
              :aria-label="`Call ${doctor.name}`"
            >
              <UIcon name="heroicons:phone" class="h-4 w-4" aria-hidden="true" />
              <span class="sr-only sm:not-sr-only">{{ doctor.phone }}</span>
            </a>
          </div>

          <!-- ── Social Links ────────────────────────── -->
          <div
            v-if="doctor.socialLinks?.length"
            class="flex items-center justify-center gap-1"
          >
            <UButton
              v-for="(social, sIdx) in doctor.socialLinks"
              :key="sIdx"
              :to="social.url"
              :icon="resolveSocialIcon(social.platform)"
              color="neutral"
              variant="ghost"
              size="sm"
              square
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`${doctor.name} on ${social.platform}`"
            />
          </div>
        </article>
      </div>

      <!-- ── Optional "Book Appointment" CTA ─────────── -->
      <div
        v-if="showContactBtn"
        class="mt-14 text-center"
      >
        <UButton
          size="xl"
          color="primary"
          :label="$t('hero.cta')"
          class="rounded-xl px-8 py-3.5 text-base font-semibold shadow-lg transition-all duration-200 hover:shadow-xl active:scale-[0.98]"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * ========================================================
 * StoryblokMedicalStaff – Medical Team Section
 * ========================================================
 *
 * Props:
 *   blok – Storyblok content block (optional)
 *     - title             (string, multi-language)
 *     - subtitle          (string, multi-language)
 *     - doctors           (array of:
 *         name            – string
 *         specialty       – string
 *         bio             – string (short biography)
 *         photo           – Storyblok asset
 *         email           – string (optional)
 *         phone           – string (optional)
 *         socialLinks     – [{ platform: string, url: string }]
 *       )
 *     - layout            ('grid-2' | 'grid-3' | 'grid-4')
 *     - showContactButton (boolean)
 *
 * RTL behavior:
 *   - Grid columns naturally respect doc direction.
 *   - Text alignment is centered (works well for both).
 * ========================================================
 */

import type { ComputedRef } from 'vue'

const { t, locale } = useI18n()

// ── Types ─────────────────────────────────────────────────
interface StoryblokAsset {
  filename?: string
  alt?: string
  focus?: string
}

interface SocialLinkItem {
  platform?: string
  url?: string
}

interface DoctorItem {
  _uid?: string
  name?: string
  specialty?: string
  bio?: string
  photo?: StoryblokAsset
  email?: string
  phone?: string
  socialLinks?: SocialLinkItem[]
  order?: number
}

interface MedicalStaffBlok {
  _uid?: string
  component?: string
  title?: string
  subtitle?: string
  doctors?: DoctorItem[]
  layout?: 'grid-2' | 'grid-3' | 'grid-4'
  showContactButton?: boolean
  [key: string]: unknown
}

const props = withDefaults(
  defineProps<{
    blok?: MedicalStaffBlok | null
  }>(),
  { blok: () => null }
)

// ── Content Values ────────────────────────────────────────
const title: ComputedRef<string> = computed(() =>
  props.blok?.title || t('doctors.title')
)

const subtitleText: ComputedRef<string | undefined> = computed(() =>
  props.blok?.subtitle || t('doctors.subtitle')
)

const layout: ComputedRef<string> = computed(() =>
  props.blok?.layout || 'grid-3'
)

const showContactBtn: ComputedRef<boolean> = computed(() =>
  props.blok?.showContactButton ?? true
)

const doctorList: ComputedRef<DoctorItem[] | undefined> = computed(() => {
  const docs = props.blok?.doctors
  if (!docs?.length) return undefined
  // Sort by order if available
  return [...docs].sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
})

// ── Grid Classes ──────────────────────────────────────────
const gridClass: ComputedRef<string> = computed(() => {
  switch (layout.value) {
    case 'grid-2':
      return 'grid gap-10 sm:grid-cols-2 max-w-3xl mx-auto'
    case 'grid-4':
      return 'grid gap-10 sm:grid-cols-2 lg:grid-cols-4'
    default:
      // grid-3
      return 'grid gap-10 sm:grid-cols-2 lg:grid-cols-3'
  }
})

// ── Photo Container (Fixed Aspect Ratio to prevent flickering) ──
const photoContainerClass: ComputedRef<string> = computed(() => {
  return 'aspect-square w-full max-w-[224px] mx-auto'
})

// ── Photo Resolver ────────────────────────────────────────
interface ResolvedPhoto {
  src: string
  alt: string
}

function resolvePhoto(photo: StoryblokAsset | undefined): ResolvedPhoto | null {
  if (!photo?.filename) return null
  return {
    src: photo.filename,
    alt: photo.alt || ''
  }
}

// ── Social Icon Resolver ──────────────────────────────────
const platformIconMap: Record<string, string> = {
  facebook: 'mdi:facebook',
  twitter: 'mdi:twitter',
  x: 'mdi:twitter',
  instagram: 'mdi:instagram',
  linkedin: 'mdi:linkedin',
  youtube: 'mdi:youtube',
  whatsapp: 'mdi:whatsapp',
  telegram: 'mdi:telegram',
  tiktok: 'mdi:tiktok',
  snapchat: 'mdi:snapchat'
}

function resolveSocialIcon(platform: string | undefined): string {
  if (!platform) return 'mdi:web'
  const normalized = platform.toLowerCase().trim()
  return platformIconMap[normalized] || 'mdi:web'
}
</script>
