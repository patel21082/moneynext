import type { Metadata } from "next";
import { SITE_NAME, SITE_TAGLINE, CONTENT_LAST_UPDATED } from "@/lib/seo";
import InfoPageLayout from "@/components/InfoPageLayout";

export const metadata: Metadata = {
  title: "About",
  description: `What ${SITE_NAME} is, who it's for, and how it works.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <InfoPageLayout title={`About ${SITE_NAME}`} lastUpdated={CONTENT_LAST_UPDATED}>
      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">What {SITE_NAME} is</h2>
        <p className="mt-2 leading-relaxed">
          {SITE_NAME} — "{SITE_TAGLINE}" — is a free set of financial calculators, educational
          guides, and an AI-assisted financial planning tool. It exists to help people understand
          their own numbers — loans, savings, investments, debts — clearly enough to make better
          decisions, without needing to hire an advisor for every question.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">Why it exists</h2>
        <p className="mt-2 leading-relaxed">
          Most people make financial decisions — taking a loan, starting a SIP, building an
          emergency fund — without an easy way to see the actual numbers behind them. Bank and
          fintech calculators are often built to sell a specific product. {SITE_NAME} was built
          to be a neutral starting point: plain formulas, clear explanations, and no product to
          push.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">Who it's for</h2>
        <p className="mt-2 leading-relaxed">
          Anyone trying to make sense of a specific financial decision — how much a loan will
          actually cost, whether a SIP or lump sum makes more sense, how big an emergency fund
          should be, or how to prioritize paying off debt versus investing. No account or signup
          is required to use any of the tools.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">What the AI does</h2>
        <p className="mt-2 leading-relaxed">
          The free financial planner on our homepage takes the numbers you enter, runs them
          through fixed formulas to calculate your Financial Health Score and key metrics, then
          uses an AI model to turn those numbers into a written summary and a prioritized,
          plain-language roadmap. See our{" "}
          <a href="/ai-financial-planner" className="text-signal underline">
            AI Financial Planner
          </a>{" "}
          page for the full detail, including its limitations.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">
          What calculations are performed locally
        </h2>
        <p className="mt-2 leading-relaxed">
          Every tool under <code>/tools</code> — EMI, SIP, compound interest, emergency fund,
          debt payoff, and savings goal — runs entirely in your browser. Nothing you type into
          those calculators is sent anywhere. Only the financial planner's AI analysis sends your
          data to a server, and only to generate that specific response — see our{" "}
          <a href="/privacy" className="text-signal underline">
            Privacy Policy
          </a>{" "}
          for full detail.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">
          What {SITE_NAME} does not do
        </h2>
        <p className="mt-2 leading-relaxed">
          {SITE_NAME} does not manage money, execute trades, sell financial products, or provide
          regulated financial, tax, or legal advice. It is an educational and planning tool —
          see our{" "}
          <a href="/disclaimer" className="text-signal underline">
            Disclaimer
          </a>{" "}
          for the full scope of that distinction.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">
          How financial information is reviewed
        </h2>
        <p className="mt-2 leading-relaxed">
          Our calculators use standard, publicly documented financial formulas (EMI, compound
          interest, annuity math). Guides are researched, drafted, and reviewed for accuracy
          before publication — see our{" "}
          <a href="/editorial-policy" className="text-signal underline">
            Editorial Policy
          </a>{" "}
          for the principles behind that process.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">
          How {SITE_NAME} makes money
        </h2>
        <p className="mt-2 leading-relaxed">
          {SITE_NAME} is supported by display advertising. Ads do not influence which
          calculations, guides, or recommendations appear on the site, and are placed to avoid
          disrupting the tools and content themselves.
        </p>
      </section>
    </InfoPageLayout>
  );
}
