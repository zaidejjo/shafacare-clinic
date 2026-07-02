<template>
  <!-- ====================================================
       AppHeader – Sticky navigation with mobile slideover
       ====================================================
       - Responsive: hamburger on mobile, full nav on lg+
       - RTL-aware: slides from correct side
       - Dark mode toggle + Language switcher
       - Glassmorphism effect with backdrop blur
  -->
  <header
    ref="headerRef"
    class="sticky top-0 z-50 w-full border-b border-border-default/50 bg-surface-primary/80 backdrop-blur-xl transition-all duration-300"
  >
    <nav
      class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      aria-label="Main navigation"
    >
      <!-- ── Logo ────────────────────────────────────── -->
      <NuxtLink
        :to="localePath('/')"
        class="flex shrink-0 items-center gap-2.5"
        :aria-label="$t('site.name')"
      >
        <!-- Logo mark -->
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 text-xs font-bold tracking-tight text-white shadow-sm"
        >
          <span aria-hidden="true">SC</span>
        </div>
        <!-- Logo text (hidden on smallest screens) -->
        <span
          class="hidden text-lg font-bold text-text-primary sm:inline"
          :class="locale === 'ar' ? 'font-arabic' : 'font-english'"
        >
          {{ $t('site.name') }}
        </span>
      </NuxtLink>

      <!-- ── Desktop Navigation ──────────────────────── -->
      <ul class="hidden items-center gap-0.5 lg:flex">
        <li v-for="link in navLinks" :key="link.key">
          <NuxtLink
            :to="link.to"
            class="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-tertiary hover:text-text-primary"
            :class="{ 'text-primary-600': isActive(link.to) }"
          >
            {{ $t(link.label) }}
          </NuxtLink>
        </li>
      </ul>

      <!-- ── Right Actions ───────────────────────────── -->
      <div class="flex items-center gap-0.5">
        <!-- Language Switcher -->
        <UButton
          :label="otherLocaleCode === 'en' ? 'EN' : 'AR'"
          color="neutral"
          variant="ghost"
          size="sm"
          class="font-semibold tracking-wide"
          :aria-label="$t('common.language')"
          @click="switchLanguage"
        />

        <!-- Dark / Light Mode Toggle -->
        <UButton
          :icon="isDark ? 'heroicons:sun' : 'heroicons:moon'"
          color="neutral"
          variant="ghost"
          size="sm"
          square
          :aria-label="$t(isDark ? 'common.lightMode' : 'common.darkMode')"
          @click="toggleColorMode"
        />

        <!-- Mobile Hamburger -->
        <UButton
          icon="heroicons:bars-3"
          color="neutral"
          variant="ghost"
          size="sm"
          square
          class="lg:hidden"
          :aria-label="$t('common.menu')"
          @click="mobileMenuOpen = true"
        />
      </div>
    </nav>

    <!-- ==================================================
         Mobile Navigation – Slideover Panel
         ==================================================
         Uses Nuxt UI's USlideover with RTL-aware side.
         In RTL mode, the panel slides from the left (end).
    -->
    <USlideover
      v-model:open="mobileMenuOpen"
      :side="locale === 'ar' ? 'left' : 'right'"
      :title="$t('site.name')"
      :close="{
        color: 'neutral',
        variant: 'ghost',
        size: 'sm'
      }"
      :ui="{
        width: 'max-w-sm w-full',
        container: 'h-full flex flex-col',
        body: 'flex-1 overflow-y-auto px-6 pb-6',
        header: 'px-6 pt-4 pb-0',
        footer: 'px-6 pb-6 pt-2'
      }"
      @close="mobileMenuOpen = false"
    >
      <!-- Header slot with logo -->
      <template #title>
        <NuxtLink
          :to="localePath('/')"
          class="flex items-center gap-2.5"
          @click="mobileMenuOpen = false"
        >
          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-500 text-xs font-bold text-white"
          >
            SC
          </div>
          <span
            class="text-base font-bold text-text-primary"
            :class="locale === 'ar' ? 'font-arabic' : 'font-english'"
          >
            {{ $t('site.name') }}
          </span>
        </NuxtLink>
      </template>

      <!-- Body slot – Navigation links -->
      <ul class="space-y-1">
        <li v-for="link in navLinks" :key="link.key">
          <NuxtLink
            :to="link.to"
            class="flex items-center rounded-xl px-4 py-3 text-base font-medium text-text-secondary transition-colors hover:bg-surface-tertiary hover:text-text-primary"
            :class="isActive(link.to) ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : ''"
            @click="mobileMenuOpen = false"
          >
            {{ $t(link.label) }}
          </NuxtLink>
        </li>
      </ul>

      <!-- Footer slot – Language + Theme toggles -->
      <template #footer>
        <div class="flex flex-col gap-3">
          <hr class="border-border-default" />
          <div class="flex items-center gap-3">
            <UButton
              :label="otherLocaleCode === 'en' ? 'English' : 'العربية'"
              color="neutral"
              variant="outline"
              size="sm"
              class="flex-1"
              @click="switchLanguage; mobileMenuOpen = false"
            />
            <UButton
              :icon="isDark ? 'heroicons:sun' : 'heroicons:moon'"
              color="neutral"
              variant="outline"
              size="sm"
              class="flex-1"
              @click="toggleColorMode"
            >
              {{ $t(isDark ? 'common.lightMode' : 'common.darkMode') }}
            </UButton>
          </div>
        </div>
      </template>
    </USlideover>
  </header>
</template>

<script setup lang="ts">
/**
 * ========================================================
 * AppHeader – Global Navigation Component
 * ========================================================
 *
 * Features:
 * - Sticky header with glassmorphism effect
 * - Desktop: horizontal nav links
 * - Mobile: USlideover panel with nav + actions
 * - Language switcher (AR ↔ EN)
 * - Dark/Light mode toggle
 * - Fully RTL-aware (slideover side flips, margins invert)
 * - Touch targets all ≥ 48×48px
 * ========================================================
 */

// ── i18n ─────────────────────────────────────────────────
const { locale, t } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

// ── Color Mode (Dark / Light) ────────────────────────────
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

function toggleColorMode(): void {
  colorMode.value = isDark.value ? 'light' : 'dark'
}

// ── Language Switcher ────────────────────────────────────
const otherLocaleCode = computed(() => (locale.value === 'ar' ? 'en' : 'ar'))

function switchLanguage(): void {
  const targetPath = switchLocalePath(otherLocaleCode.value)
  if (targetPath) {
    navigateTo(targetPath)
  }
}

// ── Navigation Links ─────────────────────────────────────
interface NavLink {
  key: string
  label: string
  to: string
}

const navLinks: NavLink[] = [
  { key: 'nav.home', label: 'nav.home', to: '#' },
  { key: 'nav.about', label: 'nav.about', to: '#about' },
  { key: 'nav.services', label: 'nav.services', to: '#services' },
  { key: 'nav.doctors', label: 'nav.doctors', to: '#doctors' },
  { key: 'nav.testimonials', label: 'nav.testimonials', to: '#testimonials' },
  { key: 'nav.contact', label: 'nav.contact', to: '#contact' }
]

// ── Active Link Detection ────────────────────────────────
const route = useRoute()

function isActive(to: string): boolean {
  if (to === '#') return route.path === localePath('/')
  if (to.startsWith('#')) {
    // For hash links, check if we're on the home page
    return route.path === localePath('/')
  }
  return route.path === to
}

// ── Mobile Menu State ────────────────────────────────────
const mobileMenuOpen = ref(false)

/**
 * Close mobile menu on route change (user navigates to a new page).
 * This handles both NuxtLink clicks and browser back/forward.
 */
watch(
  () => route.path,
  () => {
    mobileMenuOpen.value = false
  }
)
</script>
