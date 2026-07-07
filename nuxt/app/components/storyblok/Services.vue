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
 
       <!-- ── Featured Section Image ──────────────────────── -->
       <div class="mb-14 overflow-hidden rounded-3xl shadow-xl">
         <NuxtImg
           src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200"
           alt="Advanced Medical Services"
           class="w-full aspect-video object-cover"
           loading="lazy"
           decoding="async"
         />
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
  props.blok?.title || (locale.value === 'ar' ? 'خدماتنا الطبية المتميزة' : 'Our Premium Medical Services')
)

const subtitle: ComputedRef<string | undefined> = computed(() => {
  if (props.blok?.subtitle) return props.blok.subtitle
  
  return locale.value === 'ar'
    ? 'نقدم مجموعة متكاملة من الخدمات الطبية المتقدمة باستخدام أحدث التقنيات العالمية لضمان أفضل النتائج الصحية.'
    : 'We provide a comprehensive range of advanced medical services using the latest global technologies to ensure optimal health outcomes.'
})

const layout: ComputedRef<string> = computed(() =>
  props.blok?.layout || 'grid-3'
)

const showCta: ComputedRef<boolean> = computed(() =>
  props.blok?.showCta ?? true
)

const ctaText: ComputedRef<string | undefined> = computed(() => {
  if (props.blok?.ctaText) return props.blok.ctaText
  return locale.value === 'ar' ? 'احجز استشارتك الآن' : 'Book Your Consultation'
})

const ctaLink: ComputedRef<StoryblokLink | string | undefined> = computed(() => {
  if (props.blok?.ctaLink) return props.blok.ctaLink
  return 'https://wa.me/962782124190'
})

const serviceItems: ComputedRef<ServiceItem[] | undefined> = computed(() => {
  if (props.blok?.services?.length) return props.blok.services
  
  if (locale.value === 'ar') {
    return [
      {
        _uid: 's1',
        icon: 'heroicons:sparkles',
        title: 'زراعة الأسنان المتقدمة',
        description: 'أحدث تقنيات زراعة الأسنان لتعويض الأسنان المفقودة بدقة عالية ونتائج طبيعية تدوم طويلاً.'
      },
      {
        _uid: 's2',
        icon: 'heroicons:shield-check',
        title: 'تجميل الأسنان والابتسامة',
        description: 'تصميم الابتسامة الرقمي، الفينير، وتبييض الأسنان الاحترافي للحصول على مظهر جذاب وثقة مطلقة.'
      },
      {
        _uid: 's3',
        icon: 'heroicons:heart',
        title: 'علاجات اللثة المتطورة',
        description: 'رعاية متكاملة لصحة اللثة باستخدام تقنيات الليزر الحديثة لضمان استقرار وصحة الأسنان.'
      },
      {
        _uid: 's4',
        icon: 'heroicons:beaker',
        title: 'التشخيص الرقمي الدقيق',
        description: 'استخدام الأشعة ثلاثية الأبعاد والماسحات الضوئية لضمان تشخيص دقيق وخطة علاجية مخصصة.'
      },
      {
        _uid: 's5',
        icon: 'heroicons:clock',
        title: 'طوارئ الأسنان العاجلة',
        description: 'استجابة سريعة لحالات الألم الحاد والطوارئ لضمان تخفيف المعاناة وتقديم العلاج الفوري.'
      },
      {
        _uid: 's6',
        icon: 'heroicons:user-group',
        title: 'رعاية الأطفال المتخصصة',
        description: 'بيئة مريحة وودودة للأطفال لضمان تجربة علاجية خالية من الخوف وبناء علاقة صحية مع طبيب الأسنان.'
      }
    ]
  } else {
    return [
      {
        _uid: 's1',
        icon: 'heroicons:sparkles',
        title: 'Advanced Dental Implants',
        description: 'State-of-the-art implantology to replace missing teeth with high precision and long-lasting natural results.'
      },
      {
        _uid: 's2',
        icon: 'heroicons:shield-check',
        title: 'Cosmetic Dentistry & Smile Design',
        description: 'Digital smile design, veneers, and professional whitening for a stunning look and absolute confidence.'
      },
      {
        _uid: 's3',
        icon: 'heroicons:heart',
        title: 'Advanced Periodontal Care',
        description: 'Comprehensive gum health treatments using modern laser technology to ensure stability and oral health.'
      },
      {
        _uid: 's4',
        icon: 'heroicons:beaker',
        title: 'Precision Digital Diagnostics',
        description: 'Utilizing 3D imaging and intraoral scanners for accurate diagnosis and personalized treatment planning.'
      },
      {
        _uid: 's5',
        icon: 'heroicons:clock',
        title: 'Urgent Dental Care',
        description: 'Rapid response for acute pain and dental emergencies to ensure immediate relief and treatment.'
      },
      {
        _uid: 's6',
        icon: 'heroicons:user-group',
        title: 'Specialized Pediatric Care',
        description: 'A friendly, comfortable environment for children to ensure a fear-free experience and healthy habits.'
      }
    ]
  }
})

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
