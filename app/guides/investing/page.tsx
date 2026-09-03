import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/seo";
import GuidePageLayout from "@/components/GuidePageLayout";

const TITLE = "Investing & SIPs: How Long-Term Investing Actually Works";
const DESCRIPTION =
  "SIP vs lump sum, how SIP compounding works, and how long you should stay invested to see meaningful growth.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides/investing" },
  openGraph: { title: `${TITLE} — ${SITE_NAME}`, description: DESCRIPTION, type: "article" },
};

const FAQS = [
  {
    q: "What is SIP?",
    a: "A Systematic Investment Plan invests a fixed amount into a mutual fund at regular intervals — typically monthly — rather than all at once, spreading your purchase price across market ups and downs.",
  },
  {
    q: "SIP vs lump sum — which is better?",
    a: "Neither is universally better. SIP suits money you're setting aside from ongoing income and reduces the impact of bad timing. A lump sum can make sense for a windfall already sitting in cash, especially if markets are reasonably valued — the 'better' choice depends on your situation, not a fixed rule.",
  },
  {
    q: "What happens if I stop my SIP?",
    a: "Money already invested keeps growing or shrinking with the market, but you stop adding new contributions. Stopping early in a long-term SIP typically has a larger negative effect on your final corpus than stopping late, since early contributions had more time left to compound.",
  },
  {
    q: "How long should I stay invested?",
    a: "Long enough for the goal the money is meant for — equity-oriented investments are generally suited to goals at least 5–7 years away, since shorter horizons leave little time to recover from a downturn.",
  },
];

export default function InvestingGuidePage() {
  return (
    <GuidePageLayout
      path="/guides/investing"
      breadcrumbLabel="Investing & SIPs"
      h1="Investing & SIPs: How Long-Term Investing Actually Works"
      intro="Most of the benefit of long-term investing comes from time and consistency, not from picking the perfect fund or the perfect month to start."
      faqs={FAQS}
      relatedToolHrefs={["/tools/sip-calculator", "/tools/compound-interest-calculator"]}
    >
      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">What is SIP?</h2>
        <p className="mt-2 leading-relaxed">
          A Systematic Investment Plan is simply a standing instruction to invest a fixed amount
          into a mutual fund on a set date each month. Instead of trying to time when to invest
          a large amount, you invest smaller amounts continuously — which averages your purchase
          price across both expensive and cheap periods in the market, a concept known as
          rupee-cost averaging.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          SIP vs lump sum investing
        </h2>
        <p className="mt-2 leading-relaxed">
          A lump sum invests everything on day one, fully exposed to whatever happens right
          after. A SIP spreads that exposure over time. If markets rise steadily, a lump sum
          invested early tends to outperform; if markets are volatile or you're investing money
          you're earning gradually anyway (like a salary), a SIP is both more practical and less
          stressful, since you're not trying to guess the "right" moment to invest.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          How does SIP compounding work?
        </h2>
        <p className="mt-2 leading-relaxed">
          Every instalment starts earning returns from the day it's invested, and those returns
          generate further returns over time. Because later instalments have less time left to
          compound than earlier ones, the bulk of a long-term SIP's growth typically comes from
          the earliest few years of contributions — which is why starting early tends to matter
          more than optimizing the exact monthly amount. Try this out on our{" "}
          <a href="/tools/sip-calculator" className="text-signal underline">
            SIP calculator
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          What happens if you stop your SIP?
        </h2>
        <p className="mt-2 leading-relaxed">
          Existing units keep participating in the market, but you stop adding new contributions
          — and you stop benefiting from rupee-cost averaging going forward. If the stop is
          temporary due to a genuine cash-flow need, that's a reasonable trade-off; if it's
          driven by short-term market fear, it tends to work against the entire point of
          investing systematically through volatility.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          How long should you stay invested?
        </h2>
        <p className="mt-2 leading-relaxed">
          Match the investment horizon to the goal. Equity-oriented investments suit goals at
          least 5–7 years away, giving enough time to ride out volatility. For goals closer than
          2–3 years, lower-risk instruments are usually more appropriate, since there's little
          time to recover from a downturn right before you need the money.
        </p>
      </section>
    </GuidePageLayout>
  );
}
