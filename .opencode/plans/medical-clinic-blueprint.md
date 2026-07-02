# Shafa Care Clinic - Comprehensive Project Blueprint & Execution Plan

**Project:** High-Performance Medical Landing Page  
**Clinic Name:** Shafa Care Clinic (عيادة شفا الطبية)  
**Date:** July 2, 2026  
**Version:** 1.0.0

---

## 1. Design System Specification

### 1.1 Color Tokens

#### Light Mode Palette

| Token Name        | Hex Code  | Usage                                                        |
| ----------------- | --------- | ------------------------------------------------------------ |
| `primary-50`      | `#FFF5F5` | Background accents, subtle highlights                        |
| `primary-100`     | `#FFE8E8` | Hover states, soft backgrounds                               |
| `primary-200`     | `#FFCACA` | Secondary accents                                            |
| `primary-300`     | `#FF9E9E` | Interactive elements                                         |
| `primary-400`     | `#FF6B6B` | Focus states                                                 |
| `primary-500`     | `#C41E3A` | **Primary CTA buttons**, key accents (Deep Burgundy/Crimson) |
| `primary-600`     | `#A01830` | CTA hover states                                             |
| `primary-700`     | `#801226` | CTA active states                                            |
| `secondary-white` | `#FFFFFF` | Card backgrounds, main content areas                         |
| `secondary-gray`  | `#F8F9FA` | Section backgrounds, subtle dividers                         |
| `text-primary`    | `#212529` | Headings, primary body text                                  |
| `text-secondary`  | `#495057` | Secondary text, descriptions                                 |
| `text-muted`      | `#6C757D` | Captions, metadata                                           |
| `border-default`  | `#DEE2E6` | Default borders                                              |
| `border-focus`    | `#C41E3A` | Focus ring colors                                            |

#### Dark Mode Palette

| Token Name          | Hex Code  | Usage                              |
| ------------------- | --------- | ---------------------------------- |
| `primary-500`       | `#E02844` | Brighter variant for dark mode CTA |
| `primary-600`       | `#C41E3A` | Dark mode primary                  |
| `surface-primary`   | `#1A1A1A` | Main background                    |
| `surface-secondary` | `#242424` | Card backgrounds                   |
| `surface-tertiary`  | `#2D2D2D` | Hover states                       |
| `text-primary`      | `#F8F9FA` | Primary text (high contrast)       |
| `text-secondary`    | `#CED4DA` | Secondary text                     |
| `text-muted`        | `#ADB5BD` | Muted text                         |
| `border-default`    | `#495057` | Default borders                    |

### 1.2 Typography Scale

#### Arabic Fonts (Primary)

- **Primary Font:** `Tajawal` (Modern, clean, highly readable)
- **Fallback:** `Cairo`, system fonts
- **Weights:** 300, 400, 500, 600, 700

#### English Fonts (Primary)

- **Primary Font:** `Inter` (Professional, neutral, excellent readability)
- **Fallback:** `Plus Jakarta Sans`, system fonts
- **Weights:** 300, 400, 500, 600, 700

#### Type Scale (Mobile First)

| Element | Mobile          | Tablet          | Desktop         | Line Height |
| ------- | --------------- | --------------- | --------------- | ----------- |
| `h1`    | 2rem (32px)     | 2.5rem (40px)   | 3.5rem (56px)   | 1.2         |
| `h2`    | 1.75rem (28px)  | 2rem (32px)     | 2.75rem (44px)  | 1.25        |
| `h3`    | 1.5rem (24px)   | 1.75rem (28px)  | 2rem (32px)     | 1.3         |
| `h4`    | 1.25rem (20px)  | 1.5rem (24px)   | 1.75rem (28px)  | 1.4         |
| `body`  | 1rem (16px)     | 1rem (16px)     | 1rem (16px)     | 1.6         |
| `small` | 0.875rem (14px) | 0.875rem (14px) | 0.875rem (14px) | 1.5         |

### 1.3 Border Radius Guidelines

| Component Type | Border Radius    | Rationale                               |
| -------------- | ---------------- | --------------------------------------- |
| Buttons        | `0.75rem` (12px) | Soft, approachable, matches logo curves |
| Cards          | `1rem` (16px)    | Prominent rounded corners for warmth    |
| Images         | `1rem` (16px)    | Consistent with card styling            |
| Inputs         | `0.5rem` (8px)   | Subtle rounding for form elements       |
| Modal/Dialog   | `1.5rem` (24px)  | Large, friendly modal corners           |
| Badges/Tags    | `9999px`         | Pill-shaped for modern feel             |

### 1.4 Spacing System

- Base unit: `0.25rem` (4px)
- Scale: `0.25`, `0.5`, `0.75`, `1`, `1.5`, `2`, `3`, `4`, `6`, `8`, `12`, `16`
- Touch targets: Minimum `48x48px` (12 units)

---

## 2. SEO & Mobile Strategy

### 2.1 Technical SEO Implementation

#### Semantic HTML5 Structure

- **Header:** `<header>` with `<nav>` for primary navigation
- **Main Content:** `<main>` with proper `role="main"`
- **Sections:** `<section>` with descriptive `aria-label` for each block
- **Articles:** `<article>` for blog posts, testimonials, service cards
- **Footer:** `<footer>` with `<address>` for clinic contact info
- **Heading Hierarchy:** Single `<h1>` per page, logical `<h2>`-`<h6>` nesting

#### Dynamic Meta Tags (Nuxt `useHead` & `useSeoMeta`)

```
Per-page configuration:
- Title: "{Page Title} | Shafa Care Clinic - عيادة شفا الطبية"
- Description: Dynamic based on locale (Arabic/English)
- Open Graph: og:title, og:description, og:image, og:url, og:type
- Twitter Cards: twitter:card, twitter:title, twitter:description, twitter:image
- Canonical URLs: Self-referencing with locale parameters
```

#### Sitemap & Robots

- **Auto-generated `sitemap.xml`:** Dynamic routes from Nuxt routes + Storyblok stories
- **Multi-language support:** Separate sitemaps for `/en/` and `/ar/`
- **`robots.txt`:** Allow all crawlers, sitemap reference, crawl-delay optimization
- **Dynamic generation:** Use `@nuxtjs/sitemap` module with i18n integration

#### Structured Data (Schema.org)

**Primary Schema: `MedicalBusiness`**

```
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Shafa Care Clinic",
  "alternateName": "عيادة شفا الطبية",
  "url": "https://shafacare.com",
  "logo": "https://shafacare.com/logo.png",
  "image": ["https://shafacare.com/clinic-interior.jpg", "https://shafacare.com/team.jpg"],
  "telephone": "+966-XX-XXXX-XXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "XX Street",
    "addressLocality": "City",
    "addressRegion": "Province",
    "postalCode": "XXXXX",
    "addressCountry": "SA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": XX.XXXXX,
    "longitude": XX.XXXXX
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "20:00"
    }
  ],
  "priceRange": "$$",
  "medicalSpecialty": ["FamilyMedicine", "GeneralPractice"],
  "acceptsInsurance": ["Insurance1", "Insurance2"],
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Parking",
      "value": "Free parking available"
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "WheelchairAccessible",
      "value": true
    }
  ]
}
```

**Secondary Schema: `Physician`** (for each doctor profile)
**Tertiary Schema: `Review`** (for testimonials)

#### Core Web Vitals Optimization Targets

| Metric                             | Target  | Implementation Strategy                                                   |
| ---------------------------------- | ------- | ------------------------------------------------------------------------- |
| **LCP** (Largest Contentful Paint) | < 2.5s  | Preload hero images, optimize server response, use CDN                    |
| **FID** (First Input Delay)        | < 100ms | Minimize JavaScript, code splitting, lazy load non-critical scripts       |
| **CLS** (Cumulative Layout Shift)  | < 0.1   | Reserve image space, explicit dimensions, avoid dynamic content injection |

### 2.2 Mobile-First Responsive Strategy

#### Breakpoint Strategy

| Breakpoint | Name          | Width       | Use Case                        |
| ---------- | ------------- | ----------- | ------------------------------- |
| `xs`       | Mobile        | 0-640px     | Primary design target           |
| `sm`       | Small Tablet  | 640-768px   | Landscape phones, small tablets |
| `md`       | Tablet        | 768-1024px  | Portrait tablets                |
| `lg`       | Desktop       | 1024-1280px | Small laptops                   |
| `xl`       | Large Desktop | 1280-1536px | Standard desktops               |
| `2xl`      | Extra Large   | 1536px+     | Large monitors                  |

#### Mobile-Specific Optimizations

- **Touch Targets:** All interactive elements minimum `48x48px` with `8px` spacing
- **Font Sizes:** Minimum `16px` for body text to prevent iOS zoom
- **Navigation:** Hamburger menu for mobile, full nav for desktop
- **Images:** `srcset` with WebP/AVIF formats, lazy loading with `loading="lazy"`
- **Forms:** Mobile-optimized input types (`tel`, `email`), large touch targets
- **Performance:** Critical CSS inlined, non-critical JS deferred

### 2.3 Asset Optimization Pipeline

- **Images:** Auto-convert to WebP/AVIF, responsive `srcset`, lazy loading
- **Fonts:** `font-display: swap`, subset Arabic/English glyphs, preload critical fonts
- **CSS:** Purge unused Tailwind classes, minify, critical CSS extraction
- **JavaScript:** Tree-shaking, code splitting, dynamic imports for non-critical components
- **Caching:** HTTP cache headers, service worker for offline capability (PWA-ready)

---

## 3. Storyblok Component Architecture

### 3.1 Storyblok Space Structure

#### Top-Level Folder Structure

```
📁 Pages
  └── 📄 Home (Main landing page)
📁 Components (Reusable blocks)
  ├── 📦 Hero Section
  ├── 📦 About Us
  ├── 📦 Services
  ├── 📦 Medical Staff
  ├── 📦 Testimonials
  ├── 📦 Contact Section
  ├── 📦 FAQ
  ├── 📦 CTA Banner
  └── 📦 Footer
```

### 3.2 Component Block Specifications

#### **Hero Section Block**

**Fields:**

- `headline` (Text, required, multi-language)
- `subheadline` (Text, multi-language)
- `ctaText` (Text, multi-language)
- `ctaLink` (Link, multi-language)
- `backgroundImage` (Asset, required)
- `overlayColor` (Color picker, default: primary with opacity)
- `layout` (Enum: "centered", "left-aligned", "split")
- `animationType` (Enum: "fade", "slide", "none")

**Vue Component Mapping:** `components/Storyblok/HeroSection.vue`

---

#### **About Us Block**

**Fields:**

- `title` (Text, required, multi-language)
- `description` (Rich Text, multi-language)
- `storyText` (Rich Text, multi-language)
- `missionStatement` (Text, multi-language)
- `values` (Array of objects: `icon`, `title`, `description`)
- `image` (Asset, required)
- `layout` (Enum: "image-left", "image-right", "centered")

**Vue Component Mapping:** `components/Storyblok/AboutUs.vue`

---

#### **Services Block**

**Fields:**

- `title` (Text, required, multi-language)
- `subtitle` (Text, multi-language)
- `services` (Array of objects:
  - `icon` (Asset or Icon picker)
  - `title` (Text, multi-language)
  - `description` (Rich Text, multi-language)
  - `linkText` (Text, optional)
  - `linkUrl` (Link, optional)
    )
- `layout` (Enum: "grid-2", "grid-3", "grid-4", "list")
- `showCta` (Boolean)
- `ctaText` (Text, optional)
- `ctaLink` (Link, optional)

**Vue Component Mapping:** `components/Storyblok/Services.vue`

---

#### **Medical Staff Block**

**Fields:**

- `title` (Text, required, multi-language)
- `subtitle` (Text, multi-language)
- `doctors` (Array of objects:
  - `name` (Text, required, multi-language)
  - `specialty` (Text, required, multi-language)
  - `bio` (Rich Text, multi-language)
  - `photo` (Asset, required)
  - `email` (Text, optional)
  - `phone` (Text, optional)
  - `socialLinks` (Array: `platform`, `url`)
  - `order` (Number, for sorting)
    )
- `layout` (Enum: "grid-2", "grid-3", "grid-4")
- `showContactButton` (Boolean)

**Vue Component Mapping:** `components/Storyblok/MedicalStaff.vue`

---

#### **Testimonials Block**

**Fields:**

- `title` (Text, required, multi-language)
- `subtitle` (Text, multi-language)
- `testimonials` (Array of objects:
  - `patientName` (Text, required, multi-language)
  - `rating` (Number, 1-5, required)
  - `reviewText` (Rich Text, required, multi-language)
  - `photo` (Asset, optional)
  - `date` (Date, optional)
  - `serviceType` (Text, optional)
    )
- `layout` (Enum: "carousel", "grid", "list")
- `autoSlide` (Boolean, default: true)
- `slideInterval` (Number, milliseconds)

**Vue Component Mapping:** `components/Storyblok/Testimonials.vue`

---

#### **Contact Section Block**

**Fields:**

- `title` (Text, required, multi-language)
- `subtitle` (Text, multi-language)
- `address` (Text, multi-language)
- `phone` (Text, required, multi-language)
- `email` (Text, required, multi-language)
- `mapEmbedUrl` (Text, required)
- `mapImage` (Asset, optional)
- `hours` (Array: `day`, `openTime`, `closeTime`)
- `showForm` (Boolean)
- `formFields` (Array of form field configurations)

**Vue Component Mapping:** `components/Storyblok/ContactSection.vue`

---

#### **FAQ Block**

**Fields:**

- `title` (Text, required, multi-language)
- `faqs` (Array of objects:
  - `question` (Text, required, multi-language)
  - `answer` (Rich Text, required, multi-language)
  - `order` (Number)
    )
- `layout` (Enum: "accordion", "grid")
- `expandMultiple` (Boolean, default: false)

**Vue Component Mapping:** `components/Storyblok/FAQ.vue`

---

#### **CTA Banner Block**

**Fields:**

- `headline` (Text, required, multi-language)
- `subheadline` (Text, multi-language)
- `ctaText` (Text, required, multi-language)
- `ctaLink` (Link, required)
- `secondaryCtaText` (Text, optional)
- `secondaryCtaLink` (Link, optional)
- `backgroundColor` (Color picker)
- `backgroundImage` (Asset, optional)
- `layout` (Enum: "centered", "split")

**Vue Component Mapping:** `components/Storyblok/CTABanner.vue`

---

#### **Footer Block** (Global Component)

**Fields:**

- `logo` (Asset, required)
- `tagline` (Text, multi-language)
- `quickLinks` (Array: `title`, `url`)
- `servicesLinks` (Array: `title`, `url`)
- `contactInfo` (Object: `phone`, `email`, `address`)
- `socialLinks` (Array: `platform`, `url`)
- `copyrightText` (Text, multi-language)
- `privacyPolicyUrl` (Link)
- `termsOfServiceUrl` (Link)

**Vue Component Mapping:** `components/Global/Footer.vue`

---

### 3.3 Storyblok Visual Editor Bridge

- **Component Registration:** Auto-register all Storyblok components using `storyblok-rich-text` resolver
- **Live Preview:** Configure Nuxt middleware for Storyblok preview mode
- **Draft Mode:** Use Nuxt `useRoute().query._storyblok` for draft preview
- **Webhook Integration:** Set up Storyblok webhooks for cache invalidation on content updates

---

## 4. Nuxt.js & Bun Setup Configuration

### 4.1 Project Initialization with Bun

#### Step 1: Create Project

```bash
# Initialize Nuxt project with Bun
bunx nuxi@latest init shafa-care-clinic --packageManager=bun
cd shafa-care-clinic
```

#### Step 2: Install Dependencies

```bash
# Core dependencies
bun add nuxt @nuxt/ui @nuxtjs/i18n @nuxtjs/sitemap @storyblok/nuxt

# Storyblok SDK
bun add @storyblok/vue

# Icons
bun add @iconify-json/heroicons @iconify-json/mdi

# Utilities
bun add date-fns slugify

# Dev dependencies
bun add -d @types/node
```

### 4.2 Nuxt Configuration (`nuxt.config.ts`)

#### Core Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // App configuration
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Shafa Care Clinic - عيادة شفا الطبية",
      meta: [
        {
          name: "description",
          content: "Professional medical care at Shafa Care Clinic",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: "https://shafacare.com" },
      ],
    },
  },

  // Modules
  modules: ["@nuxt/ui", "@nuxtjs/i18n", "@nuxtjs/sitemap", "@storyblok/nuxt"],

  // Nuxt UI configuration
  ui: {
    icons: ["heroicons", "mdi"],
  },

  // i18n configuration
  i18n: {
    locales: [
      {
        code: "en",
        name: "English",
        language: "en-US",
        file: "en.json",
        dir: "ltr",
      },
      {
        code: "ar",
        name: "العربية",
        language: "ar-SA",
        file: "ar.json",
        dir: "rtl",
      },
    ],
    defaultLocale: "ar",
    strategy: "prefix",
    vueI18n: "./i18n.config.ts",
    seo: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },

  // Sitemap configuration
  sitemap: {
    urls: async () => {
      // Dynamic routes from Storyblok
      const stories = await fetchStoryblokStories();
      return stories.map((story) => `/en/${story.slug}`);
    },
    i18n: {
      locales: ["en", "ar"],
      defaultLocale: "ar",
    },
  },

  // Storyblok configuration
  storyblok: {
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
    use: ["vue"],
    resolveRelations: ["storyblok-component"],
  },

  // CSS
  css: ["~/assets/css/main.css"],

  // PostCSS for Tailwind
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // Runtime config
  runtimeConfig: {
    public: {
      storyblok: {
        accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
      },
    },
  },

  // Vite configuration
  vite: {
    optimizeDeps: {
      include: ["@storyblok/vue"],
    },
  },
});
```

### 4.3 i18n Configuration (`i18n.config.ts`)

```typescript
// i18n.config.ts
export default defineI18nConfig(() => ({
  legacy: false,
  locale: "ar",
  messages: {
    en: await import("./locales/en.json"),
    ar: await import("./locales/ar.json"),
  },
}));
```

### 4.4 Tailwind Configuration (`tailwind.config.ts`)

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF5F5",
          100: "#FFE8E8",
          200: "#FFCACA",
          300: "#FF9E9E",
          400: "#FF6B6B",
          500: "#C41E3A",
          600: "#A01830",
          700: "#801226",
          800: "#6B0F1F",
          900: "#580A1A",
        },
        dark: {
          surface: "#1A1A1A",
          "surface-secondary": "#242424",
          "surface-tertiary": "#2D2D2D",
        },
      },
      fontFamily: {
        arabic: ["Tajawal", "Cairo", "sans-serif"],
        english: ["Inter", "Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        pill: "9999px",
      },
    },
  },
};
```

### 4.5 Storyblok Connection Setup

#### Environment Variables (`.env`)

```bash
# .env
STORYBLOK_ACCESS_TOKEN=your_access_token_here
STORYBLOK_SPACE_ID=your_space_id
NUXT_PUBLIC_STORYBLOK_PREVIEW_URL=https://app.storyblok.com/#!/preview
```

#### Storyblok Middleware (`middleware/storyblok.ts`)

```typescript
// middleware/storyblok.ts
export default defineNuxtRouteMiddleware(async (to) => {
  if (to.query._storyblok) {
    // Enable draft mode
    useCookie("storyblok_preview", { value: "true" });
  }
});
```

---

## 5. Step-by-Step Milestones & Timeline

### Phase 1: Environment Setup (Day 1-2)

#### Milestone 1.1: Project Initialization

- [ ] Initialize Nuxt project with Bun
- [ ] Install all dependencies (Nuxt UI, i18n, Storyblok, Sitemap)
- [ ] Configure Git repository with `.gitignore`
- [ ] Set up environment variables structure

#### Milestone 1.2: Base Configuration

- [ ] Configure `nuxt.config.ts` with all modules
- [ ] Set up Tailwind with custom color tokens
- [ ] Configure i18n with Arabic/English locales
- [ ] Create base locale files (`en.json`, `ar.json`)
- [ ] Set up Storyblok connection

#### Milestone 1.3: Design System Implementation

- [ ] Create global CSS with Tailwind directives
- [ ] Define CSS variables for theme colors
- [ ] Set up font imports (Tajawal, Inter)
- [ ] Configure dark mode strategy (class-based)
- [ ] Create utility classes for RTL/LTR

**Deliverable:** Fully configured development environment with design system foundation

---

### Phase 2: CMS Mapping & Storyblok Setup (Day 3-4)

#### Milestone 2.1: Storyblok Space Configuration

- [ ] Create Storyblok space for Shafa Care Clinic
- [ ] Set up component folder structure
- [ ] Create all component schemas (Hero, About, Services, etc.)
- [ ] Configure multi-language fields for each component
- [ ] Set up asset folders for images

#### Milestone 2.2: Content Modeling

- [ ] Define field types and validation rules
- [ ] Set up default values for components
- [ ] Configure component preview templates
- [ ] Create content guidelines documentation
- [ ] Set up webhook for cache invalidation

#### Milestone 2.3: Nuxt-Storyblok Bridge

- [ ] Implement Storyblok component resolver
- [ ] Create dynamic component loader
- [ ] Set up draft/preview mode middleware
- [ ] Configure live preview functionality
- [ ] Test content fetching from Storyblok

**Deliverable:** Storyblok space fully configured with all component schemas and Nuxt integration

---

### Phase 3: Component Development (Day 5-10)

#### Milestone 3.1: Layout Components (Day 5)

- [ ] Create `AppHeader` component with responsive navigation
- [ ] Implement mobile hamburger menu
- [ ] Create `AppFooter` with all required sections
- [ ] Build language switcher component
- [ ] Implement dark/light mode toggle
- [ ] Test responsive behavior across breakpoints

#### Milestone 3.2: Hero Section (Day 6)

- [ ] Create `HeroSection` component
- [ ] Implement multiple layout variants
- [ ] Add responsive image handling
- [ ] Configure animations (fade, slide)
- [ ] Test RTL/LTR flipping
- [ ] Optimize LCP with preload

#### Milestone 3.3: About & Services (Day 7-8)

- [ ] Build `AboutUs` component with image layouts
- [ ] Create `Services` grid/list variants
- [ ] Implement icon rendering (Iconify)
- [ ] Add hover states and interactions
- [ ] Test accessibility (ARIA labels)
- [ ] Optimize image loading

#### Milestone 3.4: Medical Staff & Testimonials (Day 9)

- [ ] Create `MedicalStaff` grid component
- [ ] Implement doctor card with social links
- [ ] Build `Testimonials` carousel/grid
- [ ] Add star rating component
- [ ] Implement auto-slide functionality
- [ ] Test touch gestures on mobile

#### Milestone 3.5: Contact & FAQ (Day 10)

- [ ] Build `ContactSection` with map integration
- [ ] Create contact form with validation
- [ ] Implement `FAQ` accordion component
- [ ] Add business hours display
- [ ] Test form submission (mock endpoint)
- [ ] Verify map responsiveness

#### Milestone 3.6: CTA & Utility Components (Day 10)

- [ ] Create `CTABanner` component
- [ ] Build `FAQ` component
- [ ] Implement loading states
- [ ] Create error boundary components
- [ ] Add skeleton loaders

**Deliverable:** All Storyblok components fully implemented and tested

---

### Phase 4: SEO & i18n Rigging (Day 11-13)

#### Milestone 4.1: Meta Tags & Dynamic SEO (Day 11)

- [ ] Implement `useHead` for each page/component
- [ ] Create SEO helper composable
- [ ] Configure Open Graph tags
- [ ] Set up Twitter Card metadata
- [ ] Implement canonical URLs
- [ ] Test meta tag rendering

#### Milestone 4.2: Structured Data (Day 12)

- [ ] Create `MedicalBusiness` schema generator
- [ ] Implement `Physician` schema for doctors
- [ ] Add `Review` schema for testimonials
- [ ] Create schema injection utility
- [ ] Test with Google Rich Results Test
- [ ] Validate JSON-LD syntax

#### Milestone 4.3: Sitemap & Robots (Day 12)

- [ ] Configure dynamic sitemap generation
- [ ] Implement multi-language sitemap
- [ ] Create `robots.txt` with rules
- [ ] Test sitemap.xml rendering
- [ ] Submit to Google Search Console (mock)

#### Milestone 4.4: i18n SEO Features (Day 13)

- [ ] Configure hreflang tags automatically
- [ ] Implement self-referencing URLs
- [ ] Test language switcher SEO impact
- [ ] Verify locale-specific meta tags
- [ ] Test cross-language linking

**Deliverable:** Complete SEO implementation with structured data and multi-language support

---

### Phase 5: Performance Optimization (Day 14-15)

#### Milestone 5.1: Image Optimization (Day 14)

- [ ] Implement WebP/AVIF conversion
- [ ] Configure `srcset` for responsive images
- [ ] Add lazy loading with Intersection Observer
- [ ] Set up image CDN integration (if applicable)
- [ ] Test Core Web Vitals (LCP, CLS)

#### Milestone 5.2: Code Splitting & Loading (Day 14)

- [ ] Implement dynamic imports for non-critical components
- [ ] Configure route-based code splitting
- [ ] Add preload/prefetch directives
- [ ] Optimize font loading with `font-display: swap`
- [ ] Minimize JavaScript bundle size

#### Milestone 5.3: Caching & CDN (Day 15)

- [ ] Configure HTTP cache headers
- [ ] Set up service worker (PWA-ready)
- [ ] Implement stale-while-revalidate strategy
- [ ] Test offline functionality
- [ ] Configure CDN rules (if applicable)

**Deliverable:** Optimized performance targeting 90+ Lighthouse scores

---

### Phase 6: QA & Mobile Testing (Day 16-18)

#### Milestone 6.1: Cross-Browser Testing (Day 16)

- [ ] Test on Chrome (latest)
- [ ] Test on Firefox (latest)
- [ ] Test on Safari (latest)
- [ ] Test on Edge (latest)
- [ ] Test on mobile browsers (iOS Safari, Chrome Mobile)
- [ ] Fix browser-specific issues

#### Milestone 6.2: Mobile Responsiveness (Day 17)

- [ ] Test all breakpoints (xs, sm, md, lg, xl, 2xl)
- [ ] Verify touch targets (48x48px minimum)
- [ ] Test landscape/portrait orientations
- [ ] Validate mobile navigation
- [ ] Test form inputs on mobile
- [ ] Check font readability on small screens

#### Milestone 6.3: RTL/LTR Testing (Day 17)

- [ ] Verify all layouts flip correctly
- [ ] Test icon mirroring
- [ ] Validate text alignment
- [ ] Check margin/padding flipping
- [ ] Test form layouts in RTL
- [ ] Verify navigation in Arabic

#### Milestone 6.4: Accessibility Audit (Day 18)

- [ ] Run axe-core accessibility tests
- [ ] Verify WCAG 2.1 AA compliance
- [ ] Test keyboard navigation
- [ ] Check screen reader compatibility (NVDA, VoiceOver)
- [ ] Validate ARIA labels
- [ ] Test color contrast ratios

#### Milestone 6.5: Performance Validation (Day 18)

- [ ] Run Lighthouse audits (mobile & desktop)
- [ ] Verify Core Web Vitals scores
- [ ] Test with real devices (if available)
- [ ] Run WebPageTest analysis
- [ ] Optimize any remaining bottlenecks

**Deliverable:** Fully tested, production-ready website

---

### Phase 7: Deployment & Handoff (Day 19-20)

#### Milestone 7.1: Production Build (Day 19)

- [ ] Configure production environment variables
- [ ] Build production bundle
- [ ] Test production build locally
- [ ] Set up staging environment
- [ ] Deploy to staging server

#### Milestone 7.2: Final QA on Staging (Day 19)

- [ ] Test all features on staging
- [ ] Verify Storyblok preview mode
- [ ] Test form submissions
- [ ] Check analytics integration
- [ ] Validate SEO tags in production

#### Milestone 7.3: Documentation & Handoff (Day 20)

- [ ] Create content editor guide (Storyblok)
- [ ] Document component usage patterns
- [ ] Write deployment runbook
- [ ] Create troubleshooting guide
- [ ] Conduct client training session

#### Milestone 7.4: Production Launch (Day 20)

- [ ] Deploy to production server
- [ ] Configure DNS and SSL
- [ ] Set up monitoring (error tracking, analytics)
- [ ] Submit sitemap to search engines
- [ ] Configure backup strategy
- [ ] Final production verification

**Deliverable:** Live, production-ready website with full documentation

---

## 6. Post-Launch Maintenance Plan

### Ongoing Tasks

- **Weekly:** Monitor analytics and Core Web Vitals
- **Monthly:** Update dependencies, review security patches
- **Quarterly:** A/B test CTAs, optimize conversion rates
- **Bi-annually:** Content audit, SEO review

### Monitoring Stack

- **Analytics:** Google Analytics 4 + Search Console
- **Error Tracking:** Sentry or similar
- **Performance:** Lighthouse CI, WebPageTest
- **Uptime:** UptimeRobot or Pingdom

---

## 7. Risk Mitigation

### Technical Risks

1. **Storyblok API Rate Limits:** Implement caching layer
2. **Large Bundle Size:** Aggressive code splitting, tree-shaking
3. **RTL Layout Issues:** Extensive testing, CSS logical properties
4. **Mobile Performance:** Prioritize critical CSS, lazy load everything

### Mitigation Strategies

- **Backup Plan:** Static fallback if Storyblok fails
- **Performance Budget:** Max 100KB JS, 500KB images per page
- **Rollback Strategy:** Versioned deployments, instant rollback capability

---

## 8. Success Metrics

### Key Performance Indicators (KPIs)

- **Lighthouse Score:** 90+ on all metrics (mobile & desktop)
- **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1
- **SEO:** Indexing within 48 hours, rich snippets appearing
- **Conversion:** Contact form submissions, phone clicks
- **Accessibility:** WCAG 2.1 AA compliance (100% pass)

---

**Document Version:** 1.0.0  
**Last Updated:** July 2, 2026  
**Next Step:** Begin Phase 1 - Environment Setup
