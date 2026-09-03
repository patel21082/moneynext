import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/seo";
import GuidePageLayout from "@/components/GuidePageLayout";

const TITLE = "Saving & Emergency Funds: A Practical Guide";
const DESCRIPTION =
  "How much emergency fund you actually need, where to keep it, and how to build one even on a tight budget.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides/saving" },
  openGraph: { title: `${TITLE} — ${SITE_NAME}`, description: DESCRIPTION, type: "article" },
};

const FAQS = [
  {
    q: "How much emergency fund should I have?",
    a: "3–6 months of essential expenses for stable income, and 6–9+ months for variable or single-earner income, adjusted upward for more dependents. Our emergency fund calculator gives a personalized target based on these factors.",
  },
  {
    q: "Emergency fund vs investments — which first?",
    a: "Build at least a partial emergency fund before investing aggressively. Without one, an unexpected expense often forces you to sell investments at a bad time or take on high-interest debt, which can undo months of investment gains.",
  },
  {
    q: "How to build an emergency fund from a ₹30,000 salary?",
    a: "Start smaller than the full recommended target — even ₹2,000–3,000 a month builds meaningfully over a year. Automate the transfer right after payday, and treat reaching one month of expenses as a milestone before aiming for three or six.",
  },
];

export default function SavingGuidePage() {
  return (
    <GuidePageLayout
      path="/guides/saving"
      breadcrumbLabel="Saving & Emergency Funds"
      h1="Saving & Emergency Funds: A Practical Guide"
      intro="An emergency fund is the least exciting part of personal finance and one of the most important — it's what stands between a bad month and a debt spiral."
      faqs={FAQS}
      relatedToolHrefs={["/tools/emergency-fund-calculator", "/tools/savings-goal-calculator"]}
    >
      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          What an emergency fund is actually for
        </h2>
        <p className="mt-2 leading-relaxed">
          It exists to cover a genuine, unplanned disruption — job loss, a medical expense, an
          urgent repair — without forcing you to borrow at high interest or sell investments at
          a bad time. It is not meant to fund planned expenses like a vacation or a phone
          upgrade; mixing those goals makes the fund unreliable exactly when you need it most.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          How much is enough?
        </h2>
        <p className="mt-2 leading-relaxed">
          The standard range is 3–6 months of essential expenses — rent or EMI, food, utilities,
          transport, insurance — not your full lifestyle spending. Where you land in that range
          depends on how stable your income is and how many people depend on it. Our{" "}
          <a href="/tools/emergency-fund-calculator" className="text-signal underline">
            emergency fund calculator
          </a>{" "}
          walks through this based on your own numbers.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          Where to keep it
        </h2>
        <p className="mt-2 leading-relaxed">
          Liquidity and safety matter more than returns here. A savings account, a sweep-in
          fixed deposit, or a liquid mutual fund are the usual choices — all let you access the
          money within a day or two without risking a loss of principal. Equity investments,
          long-lock-in instruments, or anything with an exit penalty defeat the purpose of an
          emergency fund, however good their long-term returns look.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          Emergency fund vs investments
        </h2>
        <p className="mt-2 leading-relaxed">
          It's tempting to skip the emergency fund and put everything into investments for
          better returns, but this trades a small, controlled cost (lower returns on cash held
          in reserve) for a much larger, uncontrolled risk (being forced to sell investments at a
          loss, or borrow at a high rate, exactly when the market or your finances are already
          under stress). Most planners suggest building at least a partial buffer before
          investing aggressively, then continuing to build both in parallel.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          Building it from a tight budget
        </h2>
        <p className="mt-2 leading-relaxed">
          You don't need the full target to start benefiting — even a small buffer meaningfully
          reduces the chance of high-interest debt from a minor emergency. Set a smaller interim
          milestone, automate a fixed transfer on payday so it happens before discretionary
          spending, and increase the amount whenever your income grows.
        </p>
      </section>
    </GuidePageLayout>
  );
}
