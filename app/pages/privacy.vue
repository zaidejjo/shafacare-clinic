<template>
  <!-- ====================================================
       Privacy Policy Page
       ====================================================
       Static placeholder for the clinic's privacy policy.
       Will be replaced with Storyblok content in Phase 2.
  -->
  <div class="mx-auto max-w-4xl px-4 py-20 sm:py-28">
    <article>
      <h1 class="mb-6 text-3xl font-bold text-text-primary sm:text-4xl">
        {{ $t('footer.privacy') }}
      </h1>

      <div class="prose prose-slate max-w-none dark:prose-invert space-y-6 text-text-secondary leading-relaxed">
        <p>
          At {{ $t('site.name') }}, we are committed to protecting your privacy.
          This Privacy Policy explains how we collect, use, disclose, and safeguard
          your information when you visit our website.
        </p>

        <h2 class="text-xl font-semibold text-text-primary">Information We Collect</h2>
        <p>
          We may collect personal information such as your name, email address,
          phone number, and any other details you provide when filling out our
          contact form or booking an appointment.
        </p>

        <h2 class="text-xl font-semibold text-text-primary">How We Use Your Information</h2>
        <p>
          The information we collect is used to respond to your inquiries, process
          appointment requests, improve our services, and send relevant updates
          with your consent.
        </p>

        <h2 class="text-xl font-semibold text-text-primary">Data Protection</h2>
        <p>
          We implement appropriate security measures to protect your personal
          information. However, no method of transmission over the Internet is
          100% secure.
        </p>

        <h2 class="text-xl font-semibold text-text-primary">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at <a href="mailto:info@shafacare.com" class="text-primary-500 hover:underline">info@shafacare.com</a>.
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
 * Privacy Policy Page
 * ========================================================
 * Static placeholder page. Will be migrated to Storyblok
 * CMS content in Phase 2.
 * ========================================================
 */

useClinicSeo({
  title: 'Privacy Policy',
  description: 'Privacy Policy for Shafa Care Clinic – how we collect, use, and protect your personal information.'
})
</script>
