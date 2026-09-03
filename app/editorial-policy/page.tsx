import type { Metadata } from "next";
import { SITE_NAME, CONTENT_LAST_UPDATED } from "@/lib/seo";
import InfoPageLayout from "@/components/InfoPageLayout";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: `The principles behind how ${SITE_NAME} researches, writes, and reviews financial content.`,
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <InfoPageLayout title="Editorial Policy" lastUpdated={CONTENT_LAST_UPDATED}>
      <section>
        <p className="leading-relaxed">
          Our goal is to provide clear, practical personal-finance education that helps people
          make better decisions with their money — not to sell a specific product or push a
          particular investment.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">Our principles</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 leading-relaxed">
          <li>Use reliable, well-established sources for factual and regulatory claims.</li>
          <li>Clearly distinguish general facts and formulas from opinions or judgment calls.</li>
          <li>Explain the assumptions behind every calculation, rather than presenting a number without context.</li>
          <li>Review content before publication and correct errors promptly when found.</li>
          <li>Update outdated information as rules, rates, or products change.</li>
          <li>Clearly disclose any sponsored or affiliate content, if and when it exists.</li>
          <li>Avoid promising specific investment returns or outcomes.</li>
          <li>Avoid presenting educational information as personalized professional advice.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">How content is produced</h2>
        <p className="mt-2 leading-relaxed">
          Some drafting and research assistance for our guides is done with AI tools. Every
          published guide is reviewed, fact-checked against the calculations and assumptions
          documented in our{" "}
          <a href="/methodology" className="text-signal underline">
            Methodology
          </a>{" "}
          page, and edited for accuracy and clarity before publication — AI drafting is a
          starting point, not the final word.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">Corrections</h2>
        <p className="mt-2 leading-relaxed">
          If you spot an error or an outdated figure in any of our guides or calculators, please
          let us know via our{" "}
          <a href="/contact" className="text-signal underline">
            Contact page
          </a>
          . We aim to review and correct genuine errors promptly.
        </p>
      </section>
    </InfoPageLayout>
  );
}
