<template>
  <!-- ====================================================
       Terms of Service Page
       ====================================================
       Static placeholder for the clinic's terms of service.
       Will be replaced with Storyblok content in Phase 2.
  -->
  <div class="mx-auto max-w-4xl px-4 py-20 sm:py-28">
    <article>
      <h1 class="mb-6 text-3xl font-bold text-text-primary sm:text-4xl">
        {{ $t('footer.terms') }}
      </h1>

      <div class="prose prose-slate max-w-none dark:prose-invert space-y-6 text-text-secondary leading-relaxed">
        <p>
          Welcome to {{ $t('site.name') }}. By accessing and using this website,
          you agree to comply with and be bound by the following terms and conditions.
        </p>

        <h2 class="text-xl font-semibold text-text-primary">Use of the Website</h2>
        <p>
          This website is provided for informational purposes only. It does not
          constitute medical advice, diagnosis, or treatment. Always consult a
          qualified healthcare provider for medical concerns.
        </p>

        <h2 class="text-xl font-semibold text-text-primary">Appointments & Services</h2>
        <p>
          Appointment requests submitted through this website are subject to
          availability. We reserve the right to modify or cancel appointments
          as necessary.
        </p>

        <h2 class="text-xl font-semibold text-text-primary">Intellectual Property</h2>
        <p>
          All content on this website, including text, graphics, logos, and images,
          is the property of {{ $t('site.name') }} unless otherwise noted and is
          protected by applicable copyright laws.
        </p>

        <h2 class="text-xl font-semibold text-text-primary">Limitation of Liability</h2>
        <p>
          {{ $t('site.name') }} shall not be liable for any damages arising from
          the use or inability to use this website or its content.
        </p>

        <h2 class="text-xl font-semibold text-text-primary">Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Changes will be
          effective immediately upon posting to this page.
        </p>

        <p class="pt-6 text-sm text-text-muted">
          Last updated: July 2026
        </p>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
/**
 * ========================================================
 * Terms of Service Page
 * ========================================================
 * Static placeholder page. Will be migrated to Storyblok
 * CMS content in Phase 2.
 * ========================================================
 */

useClinicSeo({
  title: 'Terms of Service',
  description: 'Terms of Service for Shafa Care Clinic – rules and guidelines for using our website and services.'
})
</script>
