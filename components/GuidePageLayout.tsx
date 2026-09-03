import type { ReactNode } from "react";
import Link from "next/link";
import { SITE_NAME, getSiteUrl, CONTENT_LAST_UPDATED } from "@/lib/seo";
import { TOOLS } from "@/lib/siteNav";
import AdSlot from "@/components/AdSlot";
import Footer from "@/components/Footer";

export interface GuideFAQ {
  q: string;
  a: string;
}

export interface GuidePageLayoutProps {
  path: string; // e.g. "/guides/budgeting"
  breadcrumbLabel: string;
  h1: string;
  intro: string;
  children: ReactNode;
  faqs?: GuideFAQ[];
  relatedToolHrefs?: string[]; // subset of TOOLS hrefs to cross-link
}

export default function GuidePageLayout({
  path,
  breadcrumbLabel,
  h1,
  intro,
  children,
  faqs = [],
  relatedToolHrefs = [],
}: GuidePageLayoutProps) {
  const siteUrl = getSiteUrl();
  const relatedTools = TOOLS.filter((t) => relatedToolHrefs.includes(t.href));

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: h1,
        description: intro,
        dateModified: CONTENT_LAST_UPDATED,
        publisher: { "@type": "Organization", name: SITE_NAME },
      },
      ...(faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Learn", item: `${siteUrl}/learn` },
          { "@type": "ListItem", position: 3, name: breadcrumbLabel, item: `${siteUrl}${path}` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <nav className="text-sm text-ink-600">
          <Link href="/" className="font-medium text-signal hover:text-signal-dim">
            {SITE_NAME}
          </Link>
          <span className="mx-2">/</span>
          <Link href="/learn" className="font-medium text-signal hover:text-signal-dim">
            Learn
          </Link>
          <span className="mx-2">/</span>
          <span>{breadcrumbLabel}</span>
        </nav>

        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
          {h1}
        </h1>
        <p className="mt-2 text-xs text-ink-500">
          Last updated{" "}
          {new Date(CONTENT_LAST_UPDATED).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="mt-3 max-w-2xl text-ink-700">{intro}</p>

        <div className="mt-6">
          <AdSlot slot="0000000001" />
        </div>

        <article className="mt-8 space-y-8 text-ink-800">{children}</article>

        {faqs.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-ink-900">
              Frequently asked questions
            </h2>
            <div className="mt-4 space-y-5">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-display text-base font-semibold text-ink-900">{f.q}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink-700">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {relatedTools.length > 0 && (
          <section className="mt-10 rounded-xl2 border border-ink-900/8 bg-paper-100/60 p-6">
            <p className="font-display text-sm font-semibold text-ink-900">Related calculators</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="rounded-full border border-ink-900/12 bg-paper-50 px-4 py-2 text-sm font-medium text-ink-800 transition hover:border-signal/40"
                >
                  {tool.label}
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-8 rounded-xl2 border border-ink-900/8 bg-paper-100/60 p-6">
          <p className="font-display text-sm font-semibold text-ink-900">
            See where you stand
          </p>
          <p className="mt-1.5 text-sm text-ink-700">
            {SITE_NAME}'s free financial planner looks at your whole picture and tells you what
            to prioritize next.
          </p>
          <Link
            href="/"
            className="mt-3 inline-block rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-paper-50 transition hover:bg-ink-800"
          >
            Run your free financial analysis
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
