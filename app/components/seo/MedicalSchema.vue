<!--
  ============================================================
  SeoMedicalSchema – Renderless JSON-LD Structured Data
  ============================================================
  Injects MedicalBusiness schema.org structured data via useHead.
  No visual output – acts purely as a head-data injector.

  Automatically uses i18n locale to set name/alternateName.
  Accepts override props for production clinic data.

  Usage:
    <SeoMedicalSchema
      telephone="+966-12-345-6789"
      :address="{ streetAddress: '123 Example St', ... }"
      :geo="{ latitude: 24.7136, longitude: 46.6753 }"
    />

  Blueprint reference:
    .opencode/plans/medical-clinic-blueprint.md § 2.1
  ============================================================
-->
<script setup lang="ts">
import type { ComputedRef } from 'vue'

// ── Props ─────────────────────────────────────────────────
export interface MedicalSchemaAddress {
  streetAddress: string
  addressLocality: string
  addressRegion: string
  postalCode: string
  addressCountry: string
}

export interface MedicalSchemaGeo {
  latitude: number
  longitude: number
}

export interface MedicalSchemaHours {
  dayOfWeek: string[]
  opens: string
  closes: string
}

export interface MedicalSchemaAmenity {
  name: string
  value: string | boolean
}

export interface MedicalSchemaProps {
  /** Full business name (default: t('site.name')) */
  name?: string
  /** Alternative name – defaults to opposite locale's site.name */
  alternateName?: string
  /** Website URL */
  url?: string
  /** Logo image URL */
  logo?: string
  /** Array of clinic images */
  image?: string[]
  /** Contact telephone */
  telephone?: string
  /** Physical address */
  address?: MedicalSchemaAddress
  /** GPS coordinates */
  geo?: MedicalSchemaGeo
  /** Opening hours specifications */
  openingHours?: MedicalSchemaHours[]
  /** Price range indicator (default: "$$") */
  priceRange?: string
  /** Medical specialties (default: FamilyMedicine, GeneralPractice) */
  medicalSpecialty?: string[]
  /** Insurance providers accepted */
  acceptsInsurance?: string[]
  /** Amenity features (parking, wheelchair access, etc.) */
  amenityFeature?: MedicalSchemaAmenity[]
}

const props = withDefaults(defineProps<MedicalSchemaProps>(), {
  url: 'https://shafacare.com',
  logo: 'https://shafacare.com/logo.png',
  telephone: '+966-XX-XXXX-XXXX',
  priceRange: '$$',
  medicalSpecialty: () => ['FamilyMedicine', 'GeneralPractice'],
  acceptsInsurance: () => [],
  amenityFeature: () => [
    {
      name: 'Parking',
      value: 'Free parking available'
    },
    {
      name: 'WheelchairAccessible',
      value: true
    }
  ],
  address: (): MedicalSchemaAddress => ({
    streetAddress: 'XX Street',
    addressLocality: 'City',
    addressRegion: 'Province',
    postalCode: 'XXXXX',
    addressCountry: 'SA'
  }),
  geo: (): MedicalSchemaGeo => ({
    latitude: 24.7136,
    longitude: 46.6753
  }),
  openingHours: (): MedicalSchemaHours[] => [
    {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '20:00'
    }
  ]
})

const { t, locale } = useI18n()
const config = useRuntimeConfig()
const siteUrl: string =
  (config.public as Record<string, string>).siteUrl || 'https://shafacare.com'

// ── Locale-aware name / alternateName ─────────────────────
const businessName: ComputedRef<string> = computed(() => {
  return props.name || t('site.name')
})

const businessAlternateName: ComputedRef<string> = computed(() => {
  if (props.alternateName) return props.alternateName
  // Default: swap to the other locale's site name
  return locale.value === 'ar'
    ? 'Shafa Care Clinic'
    : 'عيادة شفا الطبية'
})

const defaultImages: string[] = [
  `${siteUrl}/images/clinic-interior.jpg`,
  `${siteUrl}/images/team.jpg`
]

// ── Build the full MedicalBusiness schema ─────────────────
const schema = computed<Record<string, unknown>>(() => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: businessName.value,
  alternateName: businessAlternateName.value,
  url: props.url,
  logo: props.logo,
  image: props.image && props.image.length > 0 ? props.image : defaultImages,
  telephone: props.telephone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: props.address.streetAddress,
    addressLocality: props.address.addressLocality,
    addressRegion: props.address.addressRegion,
    postalCode: props.address.postalCode,
    addressCountry: props.address.addressCountry
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: props.geo.latitude,
    longitude: props.geo.longitude
  },
  openingHoursSpecification: props.openingHours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.dayOfWeek,
    opens: h.opens,
    closes: h.closes
  })),
  priceRange: props.priceRange,
  medicalSpecialty: props.medicalSpecialty,
  acceptsInsurance: props.acceptsInsurance,
  amenityFeature: props.amenityFeature.map((a) => ({
    '@type': 'LocationFeatureSpecification',
    name: a.name,
    value: a.value
  }))
}))

// ── Inject JSON-LD into document <head> ───────────────────
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: computed(() => JSON.stringify(schema.value))
    }
  ]
})
</script>

<template>
  <!-- Renderless: MedicalBusiness JSON-LD structured data injection -->
</template>
