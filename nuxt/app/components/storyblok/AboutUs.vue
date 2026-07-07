<template>
  <!-- ====================================================
       StoryblokAboutUs – About Us Section
       ====================================================
       - Image + text intro with layout variants
       - Mission statement highlight block
       - Values grid with icon, title, description
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
      <!-- ── Intro: Image + Text Layout ──────────────── -->
      <div
        v-if="layout !== 'centered'"
        class="grid items-center gap-12 lg:grid-cols-2"
      >
        <!-- Image -->
        <div
          class="overflow-hidden rounded-2xl"
          :class="imageColumnOrder"
        >
          <NuxtImg
            v-if="imageSrc"
            :src="imageSrc"
            :alt="imageAlt"
            loading="lazy"
            class="h-full w-full object-cover"
            :class="imageSizeClass"
            sizes="(max-width: 768px) 100vw, 50vw"
            decoding="async"
          />
          <!-- Fallback placeholder -->
          <div
            v-else
            class="flex h-80 w-full items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/50 dark:to-primary-800/50 lg:h-full lg:min-h-[480px]"
          >
            <UIcon
              name="heroicons:heart"
              class="h-16 w-16 text-primary-300 dark:text-primary-600"
              aria-hidden="true"
            />
          </div>
        </div>

        <!-- Text content -->
        <div :class="textColumnOrder">
          <h2
            class="mb-6 text-balance text-3xl font-bold text-text-primary sm:text-4xl"
          >
            {{ title }}
          </h2>
          <p
            class="mb-6 text-lg leading-relaxed text-text-secondary"
          >
            {{ description }}
          </p>
          <p
            v-if="missionStatementText"
            class="border-s-4 border-primary-500 bg-primary-50 ps-4 text-base leading-relaxed text-text-secondary dark:bg-primary-900/20 dark:text-text-muted"
            :class="missionStatementClass"
          >
            {{ missionStatementText }}
          </p>
        </div>
      </div>

      <!-- ── Centered Layout Variant ────────────────── -->
      <div
        v-else
        class="mx-auto max-w-4xl text-center"
      >
        <!-- Image (centered, smaller) -->
        <div
          v-if="imageSrc"
          class="mx-auto mb-10 overflow-hidden rounded-2xl max-w-2xl"
        >
          <NuxtImg
            :src="imageSrc"
            :alt="imageAlt"
            loading="lazy"
            class="h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            decoding="async"
          />
        </div>

        <h2
          class="mb-6 text-balance text-3xl font-bold text-text-primary sm:text-4xl"
        >
          {{ title }}
        </h2>
        <p
          class="mx-auto mb-6 max-w-2xl text-lg leading-relaxed text-text-secondary"
        >
          {{ description }}
        </p>
        <p
          v-if="missionStatementText"
          class="mx-auto max-w-2xl rounded-xl bg-primary-50 px-6 py-4 text-base leading-relaxed text-text-secondary dark:bg-primary-900/20 dark:text-text-muted"
        >
          {{ missionStatementText }}
        </p>
      </div>

      <!-- ── Values Section ─────────────────────────── -->
      <div
        v-if="values?.length"
        class="mt-20"
      >
        <h3
          class="mb-12 text-center text-2xl font-bold text-text-primary sm:text-3xl"
        >
          {{ $t('about.ourValues') }}
        </h3>

        <div
          class="grid gap-8 sm:grid-cols-2"
          :class="valuesGridClass"
        >
          <article
            v-for="val in values"
            :key="val._uid"
            class="group rounded-xl border border-border-default bg-surface-secondary p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:bg-dark-surface-secondary"
          >
            <!-- Icon -->
            <div
              class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-500 transition-colors group-hover:bg-primary-100 dark:bg-primary-900/50 dark:group-hover:bg-primary-900/70"
            >
              <UIcon
                v-if="resolveIcon(val.icon)?.type === 'iconify'"
                :name="resolveIcon(val.icon)?.name || 'heroicons:sparkles'"
                class="h-6 w-6"
                aria-hidden="true"
              />
<NuxtImg
                v-else-if="resolveIcon(val.icon)?.type === 'image'"
                :src="resolveIcon(val.icon)?.src || ''"
                :alt="resolveIcon(val.icon)?.alt || val.title || ''"
                class="h-6 w-6 object-contain"
                loading="lazy"
                aria-hidden="true"
              />
            </div>

            <h4
              class="mb-2 text-lg font-semibold text-text-primary"
            >
              {{ val.title }}
            </h4>
            <p
              class="text-sm leading-relaxed text-text-secondary"
            >
              {{ val.description }}
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * ========================================================
 * StoryblokAboutUs – About Us Section
 * ========================================================
 *
 * Props:
 *   blok – Storyblok content block object (optional)
 *     - title           (string, multi-language)
 *     - description     (string or rich text, multi-language)
 *     - missionStatement (string, multi-language)
 *     - image           ({ filename, alt, focus })
 *     - values          (array of { icon, title, description })
 *     - layout          ('image-left' | 'image-right' | 'centered')
 *
 * RTL behavior:
 *   - "image-left" renders image as first DOM child (start side
 *     in LTR → left, in RTL → right). The card grid naturally
 *     flips with the document direction via CSS grid.
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

interface StoryblokIcon {
  name?: string
  type?: string
  filename?: string
  [key: string]: unknown
}

interface ValueItem {
  _uid?: string
  icon?: StoryblokIcon | string
  title?: string
  description?: string
}

interface AboutBlok {
  _uid?: string
  component?: string
  title?: string
  description?: string
  missionStatement?: string
  image?: StoryblokAsset
  values?: ValueItem[]
  layout?: 'image-left' | 'image-right' | 'centered'
  [key: string]: unknown
}

const props = withDefaults(
  defineProps<{
    blok?: AboutBlok | null
  }>(),
  { blok: () => null }
)

// ── Content Values ────────────────────────────────────────
const title: ComputedRef<string> = computed(() =>
  props.blok?.title || (locale.value === 'ar' ? 'عن عيادة شفاء كير' : 'About Shafa Care Clinic')
)

const description: ComputedRef<string> = computed(() => {
  if (props.blok?.description) return props.blok.description
  
  return locale.value === 'ar' 
    ? 'تعد عيادة شفاء كير صرحاً طبياً متميزاً يهدف إلى تقديم رعاية صحية عالمية المستوى. تحت القيادة الخبيرة للدكتور فراس عجو، نجمع بين أحدث التقنيات الطبية والنهج الإنساني في العلاج، لضمان حصول كل مريض على تشخيص دقيق وعلاج فعال في بيئة مريحة وفاخرة.'
    : 'Shafa Care Clinic is a premier healthcare destination dedicated to providing world-class medical services. Under the expert leadership of Dr. Firas Ajo, we combine cutting-edge medical technology with a compassionate, patient-first approach, ensuring every patient receives an accurate diagnosis and effective treatment in a comfortable, luxury environment.'
})

const missionStatementText: ComputedRef<string | undefined> = computed(() => {
  if (props.blok?.missionStatement) return props.blok.missionStatement
  
  return locale.value === 'ar'
    ? 'رؤيتنا هي الارتقاء بمعايير الرعاية الصحية في المنطقة من خلال الابتكار المستمر والالتزام بأعلى معايير الجودة العالمية.'
    : 'Our vision is to elevate healthcare standards in the region through continuous innovation and an unwavering commitment to the highest global quality standards.'
})

const layout: ComputedRef<string> = computed(() =>
  props.blok?.layout || 'image-left'
)

const values: ComputedRef<ValueItem[] | undefined> = computed(() =>
  props.blok?.values?.length ? props.blok.values : undefined
)

// ── Image ─────────────────────────────────────────────────
const imageSrc: ComputedRef<string | undefined> = computed(() =>
  props.blok?.image?.filename || undefined
)

const imageAlt: ComputedRef<string> = computed(() =>
  props.blok?.image?.alt || ''
)

// ── Layout Classes ───────────────────────────────────────
// RTL-aware: first DOM element appears on the start side.
// We render image first for image-left, text first for image-right.
const imageColumnOrder: ComputedRef<string> = computed(() => {
  return layout.value === 'image-right' ? 'lg:order-last' : 'lg:order-first'
})

const textColumnOrder: ComputedRef<string> = computed(() => {
  return layout.value === 'image-right' ? 'lg:order-first' : 'lg:order-last'
})

const imageSizeClass: ComputedRef<string> = computed(() => {
  return 'max-h-96 lg:max-h-[520px] lg:min-h-[400px]'
})

const missionStatementClass: ComputedRef<string> = computed(() => {
  return locale.value === 'ar' ? 'border-e-4 border-s-0 pe-4 ps-0' : ''
})

const valuesGridClass: ComputedRef<string> = computed(() => {
  if (!values.value) return ''
  const count = values.value.length
  if (count >= 6) return 'lg:grid-cols-3'
  if (count >= 4) return 'lg:grid-cols-2'
  return 'lg:grid-cols-1 max-w-md mx-auto'
})

// ── Icon Resolver ─────────────────────────────────────────
interface ResolvedIcon {
  type: 'iconify' | 'image' | 'none'
  name?: string
  src?: string
  alt?: string
}

function resolveIcon(icon: StoryblokIcon | string | undefined): ResolvedIcon {
  if (!icon) return { type: 'none' }

  // Direct string like "heroicons:heart"
  if (typeof icon === 'string') {
    return { type: 'iconify', name: icon }
  }

  // Icon picker plugin: { name: "heroicons:heart" }
  if (typeof icon.name === 'string' && !icon.filename) {
    return { type: 'iconify', name: icon.name }
  }

  // Asset: { filename: "https://..." }
  if (typeof icon.filename === 'string') {
    return {
      type: 'image',
      src: icon.filename,
      alt: (icon as StoryblokAsset).alt || ''
    }
  }

  return { type: 'none' }
}
</script>
