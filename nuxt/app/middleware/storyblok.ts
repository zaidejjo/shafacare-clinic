/**
 * ========================================================
 * Storyblok Preview Middleware
 * ========================================================
 *
 * This middleware detects when the Storyblok Visual Editor
 * loads the page in preview/draft mode (via the `_storyblok`
 * query parameter) and sets a cookie to indicate preview mode.
 *
 * When the preview cookie is present, the Storyblok bridge
 * will fetch the latest draft content instead of the
 * published version.
 * ========================================================
 */

export default defineNuxtRouteMiddleware(async (to) => {
  /**
   * Check if the URL contains the Storyblok preview query param.
   * Storyblok appends `?_storyblok=true` when loading the page
   * inside the Visual Editor iframe.
   */
  if (to.query._storyblok) {
    // Set a cookie to persist the preview mode during editing
    const previewCookie = useCookie('storyblok_preview', {
      default: () => 'false',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 // 24 hours
    })

    previewCookie.value = 'true'

    // Log for debugging in development
    if (process.dev) {
      console.log('[Storyblok] Preview mode activated')
    }
  }

  /**
   * Optional: Clear the preview cookie when leaving preview mode.
   * The cookie will automatically expire after 24 hours.
   */
})
