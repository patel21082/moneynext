import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/seo";
import GuidePageLayout from "@/components/GuidePageLayout";

const TITLE = "Credit Score: What Drives It and What Hurts It";
const DESCRIPTION =
  "What a credit score is, how credit utilization affects it, and the common mistakes that quietly damage your credit profile.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides/credit-score" },
  openGraph: { title: `${TITLE} — ${SITE_NAME}`, description: DESCRIPTION, type: "article" },
};

const FAQS = [
  {
    q: "What is a credit score?",
    a: "A credit score is a number, typically ranging from 300–900 in India, that summarizes your credit history and repayment behavior. Lenders use it to assess how risky it is to lend to you, and it directly affects the interest rate and loan amount you're offered.",
  },
  {
    q: "How does credit utilization affect my score?",
    a: "Credit utilization is how much of your available credit card limit you're using at any given time. Consistently using a large share of your limit — even if you pay it off every month — can lower your score, since it's read as a sign of dependence on credit.",
  },
  {
    q: "What are common mistakes that hurt credit scores?",
    a: "Missing or delaying payments, maxing out credit cards, applying for many loans or cards in a short period, closing your oldest credit accounts, and not checking your credit report for errors are among the most common and most damaging habits.",
  },
];

export default function CreditScoreGuidePage() {
  return (
    <GuidePageLayout
      path="/guides/credit-score"
      breadcrumbLabel="Credit Score"
      h1="Credit Score: What Drives It and What Hurts It"
      intro="Your credit score quietly affects the interest rate you're offered on every future loan — small, consistent habits protect it more than any one-time fix."
      faqs={FAQS}
      relatedToolHrefs={["/tools/emi-calculator", "/tools/debt-payoff-calculator"]}
    >
      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          What is a credit score?
        </h2>
        <p className="mt-2 leading-relaxed">
          It's a numerical summary of your credit history — how many loans and cards you've had,
          how consistently you've repaid them, how much of your available credit you typically
          use, and how long you've held credit accounts. Lenders use it as a fast way to gauge
          repayment risk, and it directly influences the interest rate and credit limit you're
          offered.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          How credit utilization affects your profile
        </h2>
        <p className="mt-2 leading-relaxed">
          Utilization is the percentage of your total available credit limit that you're
          currently using. Keeping this low — commonly cited guidance suggests below roughly
          30% — signals that you're not overly reliant on credit, even if you pay your full bill
          every month. High utilization can lower your score even with a perfect payment record,
          since the score looks at usage patterns, not just whether bills were paid on time.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          Common mistakes that quietly hurt your score
        </h2>
        <ul className="mt-2 list-inside list-disc space-y-1.5 leading-relaxed">
          <li>Missing a payment due date, even by a few days</li>
          <li>Regularly using most or all of your credit card limit</li>
          <li>Applying for several loans or cards within a short window</li>
          <li>Closing your oldest credit card, which shortens your credit history</li>
          <li>Never checking your credit report for errors or fraudulent accounts</li>
        </ul>
        <p className="mt-3 leading-relaxed">
          None of these individually is catastrophic, but they compound — a credit score
          reflects patterns built over months and years, not a single event, which is why
          consistent small habits protect it far better than an occasional large repayment.
        </p>
      </section>
    </GuidePageLayout>
  );
}
