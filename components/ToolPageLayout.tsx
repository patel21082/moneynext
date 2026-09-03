import type { ReactNode } from "react";
import Link from "next/link";
import { SITE_NAME, getSiteUrl } from "@/lib/seo";
import AdSlot from "@/components/AdSlot";
import Footer from "@/components/Footer";

export interface ToolFAQ {
  q: string;
  a: string;
}

export interface ToolArticleSection {
  heading: string;
  content: ReactNode;
}

export interface ToolPageLayoutProps {
  path: string; // e.g. "/tools/emi-calculator"
  breadcrumbLabel: string; // e.g. "EMI Calculator"
  h1: string;
  intro: string;
  calculator: ReactNode;
  articleSections: ToolArticleSection[];
  faqs: ToolFAQ[];
  ctaHeading?: string;
  ctaText?: string;
}

export default function ToolPageLayout({
  path,
  breadcrumbLabel,
  h1,
  intro,
  calculator,
  articleSections,
  faqs,
  ctaHeading = "Want the full picture, not just one number?",
  ctaText = `${SITE_NAME}'s free financial planner looks at your income, expenses, loans and savings together, and tells you what to prioritize next.`,
}: ToolPageLayoutProps) {
  const siteUrl = getSiteUrl();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Tools", item: `${siteUrl}/tools` },
          {
            "@type": "ListItem",
            position: 3,
            name: breadcrumbLabel,
            item: `${siteUrl}${path}`,
          },
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
          <Link href="/tools" className="font-medium text-signal hover:text-signal-dim">
            Tools
          </Link>
          <span className="mx-2">/</span>
          <span>{breadcrumbLabel}</span>
        </nav>

        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
          {h1}
        </h1>
        <p className="mt-3 max-w-2xl text-ink-700">{intro}</p>

        <div className="mt-8">{calculator}</div>

        <div className="mt-8">
          <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_TOOLS ?? ""} />
        </div>

        <article className="mt-12 space-y-8 text-ink-800">
          {articleSections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-xl font-semibold text-ink-900">
                {section.heading}
              </h2>
              <div className="mt-2 space-y-3 leading-relaxed">{section.content}</div>
            </section>
          ))}

          <section id="faq">
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
        </article>

        <div className="mt-10 rounded-xl2 border border-ink-900/8 bg-paper-100/60 p-6">
          <p className="font-display text-sm font-semibold text-ink-900">{ctaHeading}</p>
          <p className="mt-1.5 text-sm text-ink-700">{ctaText}</p>
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
