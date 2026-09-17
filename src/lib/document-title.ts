export const APP_NAME = "OneX"
export const APP_DESCRIPTION =
  "Download releases and manage licenses for the OneX Governance platform."
export const APP_OG_TITLE = "OneX | Artifacts & Releases"
export const APP_OG_IMAGE = "/og-image.png"

// formats a browser tab title with the app name
// e.g. "License | OneX"
export function documentTitle(title?: string | null): string {
  return title ? `${title} | ${APP_NAME}` : APP_NAME
}

function socialMeta(title: string) {
  return [
    { title },
    { name: "description", content: APP_DESCRIPTION },
    { property: "og:locale", content: "en_US" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:title", content: title },
    { property: "og:description", content: APP_DESCRIPTION },
    { property: "og:image", content: APP_OG_IMAGE },
    { property: "og:image:secure_url", content: APP_OG_IMAGE },
    { property: "og:image:alt", content: "OneX Artifacts & Releases" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: APP_DESCRIPTION },
    { name: "twitter:image", content: APP_OG_IMAGE },
    {
      name: "twitter:image:alt",
      content: "OneX Artifacts & Releases",
    },
  ]
}

// default share/title tags used by the root route
export function siteHead() {
  return () => ({
    meta: socialMeta(APP_OG_TITLE),
  })
}

// sets the document title in a component's head meta tags
// e.g. { meta: [{ title: "License | OneX" }] }
export function titleHead(title: string) {
  return () => ({ meta: socialMeta(documentTitle(title)) })
}

// extracts the page title from a tab/document title
// e.g. "License | OneX" to "License"
export function pageTitle(title: string): string | null {
  if (title === APP_NAME) return null
  const suffix = ` | ${APP_NAME}`
  return title.endsWith(suffix) ? title.slice(0, -suffix.length) : title
}
