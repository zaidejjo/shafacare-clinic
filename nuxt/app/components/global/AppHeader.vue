<template>
  <!-- ====================================================
       AppHeader – Premium Sticky Glassmorphic Navigation
       ====================================================
       - Responsive: hamburger on mobile, full nav on lg+
       - RTL-aware: slides from correct side, logical properties
       - Dark mode toggle + Language switcher
       - Glassmorphism effect with backdrop blur and scroll trigger
       - High-end logo integration with explicit dimensions
  -->
  <header
    ref="headerRef"
    class="sticky top-0 z-50 w-full transition-all duration-500"
    :class="isScrolled 
      ? 'glass-morphism py-2 shadow-lg' 
      : 'bg-transparent py-4 border-b border-transparent'"
  >
    <nav
      class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      aria-label="Main navigation"
    >
      <!-- ── Logo & Brand ────────────────────────────── -->
      <NuxtLink
        :to="localePath('/')"
        class="group flex shrink-0 items-center gap-3 focus:outline-none"
        :aria-label="$t('site.name')"
      >
        <!-- Logo Container with Premium Glassmorphic Border & Glow -->
        <div
          class="relative h-12 w-12 overflow-hidden rounded-xl border border-primary-500/20 bg-white/80 p-0.5 shadow-md transition-all duration-500 group-hover:scale-105 group-hover:border-primary-500/40 group-hover:shadow-burgundy-glow dark:border-white/10 dark:bg-black/40"
        >
          <NuxtImg
            src="/shafa-care-logo.jpg"
            alt="Shafa Care Clinic Logo"
            class="h-full w-full rounded-lg object-cover"
            width="48"
            height="48"
            loading="eager"
            fetchpriority="high"
          />
        </div>
        
        <!-- Brand Name with Editorial Typography -->
        <div class="flex flex-col">
          <span
            class="text-lg font-extrabold tracking-tight text-text-primary transition-colors duration-300 group-hover:text-primary-500 dark:group-hover:text-primary-400 sm:text-xl"
            :class="locale === 'ar' ? 'font-arabic' : 'font-english'"
          >
            {{ $t('site.name') }}
          </span>
          <span 
            class="text-[10px] font-medium uppercase tracking-widest text-text-muted transition-colors duration-300 group-hover:text-primary-400"
            :class="locale === 'ar' ? 'font-arabic' : 'font-english'"
          >
            {{ $t('site.tagline') }}
          </span>
        </div>
      </NuxtLink>

      <!-- ── Desktop Navigation ──────────────────────── -->
      <ul class="hidden items-center gap-1 lg:flex">
        <li v-for="link in navLinks" :key="link.key">
          <NuxtLink
            :to="link.to"
            class="relative inline-flex items-center rounded-xl px-4 py-2 text-sm font-bold tracking-wide text-text-secondary transition-all duration-300 hover:bg-primary-500/5 hover:text-primary-500 dark:hover:bg-primary-400/5 dark:hover:text-primary-400"
            :class="{ 'text-primary-500 dark:text-primary-400 bg-primary-500/5 dark:bg-primary-400/5': isActive(link.to) }"
          >
            {{ $t(link.label) }}
            <!-- Active indicator dot -->
            <span
              v-if="isActive(link.to)"
              class="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary-500 dark:bg-primary-400"
            />
          </NuxtLink>
        </li>
      </ul>

      <!-- ── Right Actions ───────────────────────────── -->
      <div class="flex items-center gap-1.5">
        <!-- Language Switcher -->
        <UButton
          :label="otherLocaleCode === 'en' ? 'EN' : 'AR'"
          color="neutral"
          variant="ghost"
          size="md"
          class="rounded-xl font-bold tracking-wider hover:bg-primary-500/10 hover:text-primary-600 dark:hover:bg-primary-400/10 dark:hover:text-primary-400"
          :aria-label="$t('common.language')"
          @click="switchLanguage"
        />

        <!-- Dark / Light Mode Toggle -->
        <UButton
          :icon="isDark ? 'heroicons:sun' : 'heroicons:moon'"
          color="neutral"
          variant="ghost"
          size="md"
          square
          class="rounded-xl hover:bg-primary-500/10 hover:text-primary-600 dark:hover:bg-primary-400/10 dark:hover:text-primary-400"
          :aria-label="$t(isDark ? 'common.lightMode' : 'common.darkMode')"
          @click="toggleColorMode"
        />

        <!-- Mobile Hamburger -->
        <UButton
          icon="heroicons:bars-3"
          color="neutral"
          variant="ghost"
          size="md"
          square
          class="rounded-xl lg:hidden hover:bg-primary-500/10 hover:text-primary-600 dark:hover:bg-primary-400/10 dark:hover:text-primary-400"
          :aria-label="$t('common.menu')"
          @click="mobileMenuOpen = true"
        />
      </div>
    </nav>

    <!-- Mobile Navigation – Slideover Panel -->
    <!-- v-if strictly prevents rendering on desktop screens and when closed -->
    <USlideover
      v-if="mobileMenuOpen && !isLargeScreen"
      v-model:open="mobileMenuOpen"
      :side="locale === 'ar' ? 'left' : 'right'"
      :title="$t('site.name')"
      :close="{
        color: 'neutral',
        variant: 'ghost',
        size: 'md',
        class: 'rounded-xl'
      }"
      :ui="{
        width: 'max-w-xs w-full',
        container: 'h-full flex flex-col glass-morphism border-y-0 border-r-0',
        body: 'flex-1 overflow-y-auto px-6 pb-6 pt-4',
        header: 'px-6 pt-6 pb-2 border-b border-border-default/30',
        footer: 'px-6 pb-6 pt-4 border-t border-border-default/30'
      }"
      @close="mobileMenuOpen = false"
    >
      <!-- Header slot with logo -->
      <template #title>
        <NuxtLink
          :to="localePath('/')"
          class="flex items-center gap-3"
          @click="mobileMenuOpen = false"
        >
          <div
            class="h-10 w-10 overflow-hidden rounded-xl border border-primary-500/20 bg-white p-0.5 shadow-sm dark:border-white/10 dark:bg-black/40"
          >
            <NuxtImg
              src="/shafa-care-logo.jpg"
              alt="Shafa Care Clinic Logo"
              class="h-full w-full rounded-lg object-cover"
              width="40"
              height="40"
            />
          </div>
          <span
            class="text-base font-extrabold text-text-primary"
            :class="locale === 'ar' ? 'font-arabic' : 'font-english'"
          >
            {{ $t('site.name') }}
          </span>
        </NuxtLink>
      </template>

      <!-- Body slot – Navigation links -->
      <ul class="space-y-1.5">
        <li v-for="link in navLinks" :key="link.key">
          <NuxtLink
            :to="link.to"
            class="flex items-center rounded-xl px-4 py-3 text-base font-bold text-text-secondary transition-all duration-300 hover:bg-primary-500/5 hover:text-primary-500 dark:hover:bg-primary-400/5 dark:hover:text-primary-400"
            :class="isActive(link.to) ? 'bg-primary-500/10 text-primary-600 dark:bg-primary-400/10 dark:text-primary-400' : ''"
            @click="mobileMenuOpen = false"
          >
            {{ $t(link.label) }}
          </NuxtLink>
        </li>
      </ul>

      <!-- Footer slot – Language + Theme toggles -->
      <template #footer>
        <div class="flex flex-col gap-4 w-full">
          <div class="flex items-center gap-3">
            <UButton
              :label="otherLocaleCode === 'en' ? 'English' : 'العربية'"
              color="neutral"
              variant="outline"
              size="md"
              class="flex-1 rounded-xl font-bold hover:bg-primary-500/10 hover:text-primary-600 dark:hover:bg-primary-400/10 dark:hover:text-primary-400"
              @click="switchLanguage(); mobileMenuOpen = false"
            />
            <UButton
              :icon="isDark ? 'heroicons:sun' : 'heroicons:moon'"
              color="neutral"
              variant="outline"
              size="md"
              class="flex-1 rounded-xl font-bold hover:bg-primary-500/10 hover:text-primary-600 dark:hover:bg-primary-400/10 dark:hover:text-primary-400"
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

// ── Scroll Listener for Glassmorphism ────────────────────
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)
const isLargeScreen = ref(false)

if (import.meta.client) {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 10
  }
  const handleResize = () => {
    isLargeScreen.value = window.innerWidth >= 1024 // lg breakpoint
  }
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    handleScroll()
    handleResize()
  })
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
  })
}

// ── Sync Mobile Menu State with Screen Size ──────────────
watch(isLargeScreen, (newVal) => {
  if (newVal) {
    mobileMenuOpen.value = false
  }
})

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
