<template>
  <div class="min-h-screen bg-surface-primary py-24 lg:py-32">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="mb-12 text-center">
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl" :class="locale === 'ar' ? 'font-arabic' : 'font-english'">
          {{ $t('footer.terms') }}
        </h1>
        <div class="mx-auto h-1 w-20 rounded-full bg-primary-500" />
      </div>

      <!-- Content Card -->
      <div class="glass-morphism rounded-3xl p-8 shadow-premium dark:bg-dark-surface-secondary">
        <div class="prose prose-slate max-w-none dark:prose-invert">
          <p class="mb-6 text-lg leading-relaxed text-text-secondary" :class="locale === 'ar' ? 'font-arabic' : 'font-english'">
            {{ $t('terms.intro') || 'By using our services, you agree to the following terms and conditions.' }}
          </p>
          
          <div class="space-y-8">
            <section>
              <h2 class="mb-3 text-xl font-bold text-primary-600 dark:text-primary-400" :class="locale === 'ar' ? 'font-arabic' : 'font-english'">
                {{ $t('terms.appointments') || 'Appointments & Cancellations' }}
              </h2>
              <p class="text-text-secondary leading-relaxed" :class="locale === 'ar' ? 'font-arabic' : 'font-english'">
                We request a 24-hour notice for any appointment cancellations to ensure other patients can be accommodated.
              </p>
            </section>

            <section>
              <h2 class="mb-3 text-xl font-bold text-primary-600 dark:text-primary-400" :class="locale === 'ar' ? 'font-arabic' : 'font-english'">
                {{ $t('terms.liability') || 'Liability' }}
              </h2>
              <p class="text-text-secondary leading-relaxed" :class="locale === 'ar' ? 'font-arabic' : 'font-english'">
                Our clinic adheres to the highest medical standards and regulations of the Ministry of Health.
              </p>
            </section>
          </div>
        </div>
      </div>

      <!-- Back to Home -->
      <div class="mt-12 text-center">
        <UButton
          to="/"
          color="primary"
          variant="outline"
          size="md"
          class="rounded-xl font-bold"
          :label="locale === 'ar' ? 'العودة للرئيسية' : 'Back to Home'"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
useClinicSeo({
  title: 'Terms of Service | Shafa Care Clinic',
  description: 'Review the terms and conditions for receiving medical care at Shafa Care Clinic.'
})
</script>
