import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, getSiteUrl, CONTENT_LAST_UPDATED } from "@/lib/seo";
import FaqAccordion from "@/components/FaqAccordion";
import Footer from "@/components/Footer";

const TITLE = "Frequently Asked Questions";
const DESCRIPTION = `Answers to common questions about ${SITE_NAME}'s calculators, financial planner, privacy, and how the site works.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/faq" },
  openGraph: { title: `${TITLE} — ${SITE_NAME}`, description: DESCRIPTION, type: "website" },
};

const SECTIONS: { heading: string; items: { q: string; a: string }[] }[] = [
  {
    heading: "General",
    items: [
      {
        q: "Is MoneyNext free to use?",
        a: "Yes — every calculator, guide, and the AI financial planner are completely free, with no premium tier or paywall. The site is supported by display advertising.",
      },
      {
        q: "Do I need to create an account?",
        a: "No. Nothing on the site requires signup, login, or an account of any kind.",
      },
      {
        q: "Do you store my financial information?",
        a: "No. MoneyNext has no database or user profiles. Tool calculators run entirely in your browser; the AI planner sends your inputs to a third-party AI service only when you request an analysis, and doesn't retain them afterward.",
      },
      {
        q: "Is MoneyNext built specifically for India?",
        a: "Yes — amounts are in rupees, and the calculators and guides use Indian financial concepts (SIP, EMI, home/personal/car loans, PPF-style compounding) rather than a generic international template.",
      },
      {
        q: "Can I use MoneyNext on my phone?",
        a: "Yes, every tool, guide, and the planner are fully responsive and work on mobile, tablet, and desktop.",
      },
    ],
  },
  {
    heading: "Calculators",
    items: [
      {
        q: "How accurate are the calculators?",
        a: "They use standard, publicly documented financial formulas (reducing-balance EMI, compound interest, annuity math). Results are close estimates — your actual bank or fund may vary slightly due to fees, exact day-count conventions, or rate changes.",
      },
      {
        q: "Is anything I type into a calculator saved or sent anywhere?",
        a: "No. Every tool under /tools runs entirely in JavaScript in your browser. Nothing is sent to our servers or stored.",
      },
      {
        q: "Which calculator should I use to compare paying off debt vs investing?",
        a: "Start with the Debt Payoff Calculator to see your payoff timeline and total interest, and the SIP or Compound Interest calculator to compare what that money could grow into if invested instead.",
      },
      {
        q: "What's the difference between the SIP calculator and the Compound Interest calculator?",
        a: "The SIP calculator is tuned for monthly mutual-fund investing with equity-style return assumptions and an optional annual step-up. The Compound Interest calculator is more general-purpose, letting you set the compounding frequency explicitly — useful for FDs, RDs, or PPF-style accounts.",
      },
    ],
  },
  {
    heading: "AI Financial Planner",
    items: [
      {
        q: "How is my Financial Health Score calculated?",
        a: "It's built from five categories — cash flow, emergency fund, debt, savings, and investments — each worth up to 20 points, based on standard personal-finance benchmarks. Full detail is on our Methodology page.",
      },
      {
        q: "Is the AI's advice guaranteed to be right for me?",
        a: "No — it's educational guidance based on the numbers you provide, not personalized professional advice. It doesn't recommend specific stocks, funds, or lenders. For high-stakes decisions, consult a licensed financial advisor.",
      },
      {
        q: "What is the \"what-if\" scenario feature?",
        a: "After your initial analysis, you can ask follow-up questions like \"What if I increase my SIP to ₹15,000?\" and the AI reasons through that using the details you already entered.",
      },
      {
        q: "Can I redo my analysis with different numbers?",
        a: "Yes, anytime — use \"Start a new analysis\" after viewing your results to re-enter different figures.",
      },
    ],
  },
  {
    heading: "Guides & content",
    items: [
      {
        q: "Who writes the guides?",
        a: "Guides are researched and drafted with some AI assistance, then reviewed and edited for accuracy before publishing — see our Editorial Policy for the full process.",
      },
      {
        q: "How often is content updated?",
        a: "We update guides and calculators when formulas, typical rates, or rules meaningfully change. Each guide shows a \"last updated\" date.",
      },
      {
        q: "I think a guide or calculator has an error — how do I report it?",
        a: "Please use our Contact page — we review and correct genuine errors promptly.",
      },
    ],
  },
  {
    heading: "Privacy & legal",
    items: [
      {
        q: "Does MoneyNext show ads?",
        a: "Yes, MoneyNext is supported by Google AdSense display advertising. See our Privacy Policy and Cookie Policy for how that works.",
      },
      {
        q: "Is MoneyNext regulated financial advice?",
        a: "No — MoneyNext provides general educational information and tools, not investment, tax, legal, or other regulated professional advice. See our Disclaimer for the full scope.",
      },
      {
        q: "Can I opt out of personalized ads?",
        a: "Yes, via Google Ads Settings (adssettings.google.com) — see our Cookie Policy for the link and more detail.",
      },
    ],
  },
];

export default function FaqPage() {
  const siteUrl = getSiteUrl();
  const allItems = SECTIONS.flatMap((s) => s.items);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: allItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "FAQ", item: `${siteUrl}/faq` },
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
          <span>FAQ</span>
        </nav>

        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-2 text-xs text-ink-500">
          Last updated{" "}
          {new Date(CONTENT_LAST_UPDATED).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {SECTIONS.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="font-display text-lg font-semibold text-ink-900">
              {section.heading}
            </h2>
            <div className="mt-3">
              <FaqAccordion items={section.items} />
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
