export const SITE_NAME = "MoneyNext";

export const SITE_OWNER_NAME = "Akshar Dev";

export const SITE_CONTACT_EMAIL = "aksharp1504@gmail.com";

export const SITE_TAGLINE = "Know what your money should do next.";

export const SITE_DESCRIPTION =
  "Analyze your income, expenses, loans, SIP and savings and discover what your money should do next with a free AI-powered financial planning tool.";

/**
 * Bump this (to the date of the change) whenever page content meaningfully
 * changes. Used for sitemap.xml's <lastmod>. Deliberately NOT `new Date()`
 * at request time — an always-"just updated" sitemap is a well-known
 * anti-pattern that teaches crawlers to distrust your freshness signal.
 */
export const CONTENT_LAST_UPDATED = "2026-08-17";

/**
 * Resolves the canonical site URL, in order:
 *   1. An explicit NEXT_PUBLIC_SITE_URL you set (always wins — set this if
 *      you move to a custom domain).
 *   2. Vercel's own "production URL" build variable. This is the stable
 *      domain assigned to the project (e.g. moneynext-app.vercel.app) —
 *      NOT the same as VERCEL_URL, which is unique to every single
 *      deployment (e.g. moneynext-hj9exit0w-yourteam.vercel.app) and
 *      changes on every push. Using VERCEL_URL by mistake here is what
 *      causes canonical tags, sitemap.xml, and Open Graph URLs to point at
 *      a throwaway per-deployment address instead of the real site.
 *   3. VERCEL_URL as a last-resort fallback (preview deployments only).
 *   4. localhost for local dev.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (productionUrl) return `https://${productionUrl}`;

  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  return "http://localhost:3000";
}
