<template>
  <!-- ====================================================
       Default Layout – Wraps every page with header + footer
       ====================================================
       - Flex column layout that pushes footer to bottom
       - Skip-to-content link for accessibility
       - Semantic HTML5 structure
       - RTL-aware: layout adapts via CSS logical properties
  -->
  <div class="flex min-h-screen flex-col">
    <!--
      Skip-to-content link for keyboard / screen reader users.
      Hidden visually but focusable on Tab press.
    -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:inset-x-0 focus:top-0 focus:z-[100] focus:flex focus:h-12 focus:items-center focus:justify-center focus:bg-primary-500 focus:text-white focus:outline-none"
    >
      {{ $t('common.skipToContent') }}
    </a>

    <!-- Global Header -->
    <AppHeader />

    <!--
      Main Content Area
      - `id="main-content"` – target for skip link
      - `flex-1` – pushes footer to bottom on short pages
      - `outline-none` – removes focus ring on programmatic focus
    -->
    <main
      id="main-content"
      class="flex-1 outline-none"
      role="main"
      tabindex="-1"
    >
      <slot />
    </main>

    <!-- Global Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
/**
 * ========================================================
 * Default Layout
 * ========================================================
 *
 * This layout wraps every page in the application.
 * It provides:
 * - Skip-to-content link for accessibility
 * - Sticky header (GlobalAppHeader) at the top
 * - Main content slot with proper landmark role
 * - Global footer (GlobalAppFooter) at the bottom
 * - Sticky footer behavior via flex column min-h-screen
 *
 * Nuxt automatically applies this layout because it's
 * named `default.vue` in the `app/layouts/` directory.
 * ========================================================
 */

// No additional setup needed — the layout is purely structural.
</script>
