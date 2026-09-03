import { MetadataRoute } from "next";
import { getSiteUrl, CONTENT_LAST_UPDATED } from "@/lib/seo";
import { TOOLS, GUIDES } from "@/lib/siteNav";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date(CONTENT_LAST_UPDATED);

  const toolEntries: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${siteUrl}${tool.href}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const guideEntries: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${siteUrl}${guide.href}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const infoEntries: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/tools`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${siteUrl}/learn`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${siteUrl}/about`, priority: 0.5, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/how-it-works`, priority: 0.5, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/ai-financial-planner`, priority: 0.5, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/methodology`, priority: 0.4, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/editorial-policy`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${siteUrl}/faq`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/contact`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${siteUrl}/privacy`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${siteUrl}/terms`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${siteUrl}/disclaimer`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${siteUrl}/cookie-policy`, priority: 0.3, changeFrequency: "yearly" as const },
  ].map((entry) => ({ ...entry, lastModified }));

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...toolEntries,
    ...guideEntries,
    ...infoEntries,
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
