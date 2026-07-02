// ========================================================
// Tailwind CSS Configuration
// ========================================================
//
// IMPORTANT: This project uses Tailwind CSS v4 with Nuxt UI v4.
// In Tailwind v4, theme configuration is done via CSS @theme
// blocks in `assets/css/main.css` rather than in this file.
//
// This config file is provided for:
//   - IDE autocompletion and IntelliSense
//   - Documentation of design tokens in TypeScript format
//   - Backward compatibility with tooling that expects this file
//
// The ACTUAL theme configuration that controls the build lives in:
//   ~/assets/css/main.css  (see the @theme { ... } block)
// ========================================================

import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx,md}',
    './components/**/*.{vue,js,ts,jsx,tsx,md}'
  ],

  // ========================================================
  // Design Tokens (documentation only – see main.css for active config)
  // ========================================================
  //
  // Primary: Deep Burgundy / Crimson Red (#C41E3A)
  // Fonts:
  //   - Arabic: Tajawal, Cairo
  //   - English: Inter, Plus Jakarta Sans
  // Border Radius:
  //   - Cards/Images: 1rem (16px)
  //   - Buttons: 0.75rem (12px)
  //   - Modals: 1.5rem (24px)
  //   - Badges/Pills: 9999px (fully rounded)
  //
  // These tokens are implemented in main.css and available
  // via Tailwind utility classes (bg-primary-500, text-primary,
  // font-arabic, rounded-xl, etc.).
}
