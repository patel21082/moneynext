export const SITE_NAME = "MoneyNext";

export const SITE_TAGLINE = "Know what your money should do next.";

export const SITE_DESCRIPTION =
  "Analyze your income, expenses, loans, SIP and savings and discover what your money should do next with a free AI-powered financial planning tool.";

/**
 * Bump this (to the date of the change) whenever page content meaningfully
 * changes. Used for sitemap.xml's <lastmod>. Deliberately NOT `new Date()`
 * at request time — an always-"just updated" sitemap is a well-known
 * anti-pattern that teaches crawlers to distrust your freshness signal.
 */
export const CONTENT_LAST_UPDATED = "2026-09-03";

/**
 * Resolves to, in order: an explicit NEXT_PUBLIC_SITE_URL you set, Vercel's
 * auto-injected deployment URL, or localhost as a last-resort dev fallback.
 * Set NEXT_PUBLIC_SITE_URL once you have a real domain (or a vercel.app URL
 * you want to stick with) so metadata, sitemap, robots and JSON-LD all agree.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  return "http://localhost:3000";
}
