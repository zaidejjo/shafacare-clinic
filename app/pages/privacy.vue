<template>
  <div class="min-h-screen bg-surface-primary py-24 lg:py-32">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="mb-12 text-center">
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl" :class="locale === 'ar' ? 'font-arabic' : 'font-english'">
          {{ $t('footer.privacy') }}
        </h1>
        <div class="mx-auto h-1 w-20 rounded-full bg-primary-500" />
      </div>

      <!-- Content Card -->
      <div class="glass-morphism rounded-3xl p-8 shadow-premium dark:bg-dark-surface-secondary">
        <div class="prose prose-slate max-w-none dark:prose-invert">
          <p class="mb-6 text-lg leading-relaxed text-text-secondary" :class="locale === 'ar' ? 'font-arabic' : 'font-english'">
            {{ $t('privacy.intro') || 'Your privacy is important to us. This policy explains how we handle your personal information.' }}
          </p>
          
          <div class="space-y-8">
            <section>
              <h2 class="mb-3 text-xl font-bold text-primary-600 dark:text-primary-400" :class="locale === 'ar' ? 'font-arabic' : 'font-english'">
                {{ $t('privacy.dataCollection') || 'Data Collection' }}
              </h2>
              <p class="text-text-secondary leading-relaxed" :class="locale === 'ar' ? 'font-arabic' : 'font-english'">
                We collect information necessary to provide the highest quality of medical care, including patient history, contact details, and insurance information.
              </p>
            </section>

            <section>
              <h2 class="mb-3 text-xl font-bold text-primary-600 dark:text-primary-400" :class="locale === 'ar' ? 'font-arabic' : 'font-english'">
                {{ $t('privacy.dataUsage') || 'How We Use Your Data' }}
              </h2>
              <p class="text-text-secondary leading-relaxed" :class="locale === 'ar' ? 'font-arabic' : 'font-english'">
                Your data is used strictly for clinical purposes, appointment scheduling, and improving our healthcare services.
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
  title: 'Privacy Policy | Shafa Care Clinic',
  description: 'Learn how Shafa Care Clinic protects and manages your personal medical data.'
})
</script>
