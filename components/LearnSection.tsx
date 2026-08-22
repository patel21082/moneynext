const ARTICLES = [
  {
    title: "How the Financial Health Score is calculated",
    body: [
      "MoneyNext scores your financial situation out of 100, split across five equally-weighted factors (20 points each): cash flow, emergency fund coverage, debt burden, savings, and investments.",
      "Cash flow looks at your monthly surplus — income minus expenses and EMIs — as a share of income. Emergency fund coverage checks how many months of expenses your emergency fund would cover if your income stopped today; 3–6 months is the commonly recommended range in India. Debt burden looks at what share of your monthly income goes toward EMIs — lenders and planners generally consider anything above 40% a warning sign. Savings and investments look at how consistently you're setting money aside relative to your income, including SIPs, mutual funds, fixed deposits and gold.",
      "None of these five factors are pass/fail on their own — a low score in one area simply tells you where to focus first, which is what the action plan on your results page is built around.",
    ],
  },
  {
    title: "SIP vs lump sum: which suits you",
    body: [
      "A Systematic Investment Plan (SIP) is a fixed amount invested into a mutual fund on a set schedule, usually monthly. Because it buys in at whatever the price is that month, it naturally averages your purchase cost over time — you buy more units when prices are low and fewer when prices are high, which is why it's often recommended for salaried income.",
      "A lump sum investment puts a larger amount in at once. It can outperform a SIP if the market rises steadily right after you invest, but it also carries more timing risk — investing a large sum right before a downturn hurts more than a SIP would, since a SIP is only ever exposed to that month's contribution.",
      "In practice, most people with regular monthly income default to SIPs for ongoing investing, and use lump sums opportunistically — a bonus, a windfall, or maturity proceeds from an FD — rather than as their main strategy.",
    ],
  },
  {
    title: "What counts as a healthy debt-to-income ratio",
    body: [
      "Debt-to-income (DTI) here means total monthly EMI payments divided by monthly income. Most Indian lenders use 40–50% as an upper ceiling when assessing new loan eligibility, but for your own financial health, staying meaningfully under that gives you breathing room for emergencies and new goals.",
      "A DTI under 20% is generally considered comfortable, 20–35% is manageable but worth watching, and above 40% usually means a large share of income is committed before you've paid for anything else — food, rent, or savings. If you're in that range, MoneyNext's action plan will typically prioritize either restructuring or accelerating repayment of the highest-interest loan first (commonly a credit card or personal loan) before increasing investments.",
    ],
  },
  {
    title: "How big should your emergency fund be",
    body: [
      "The standard guidance is 3 to 6 months of essential expenses — rent, food, utilities, EMIs, insurance — kept somewhere accessible within a day or two, such as a savings account or a liquid mutual fund, rather than locked into a fixed deposit with a penalty for early withdrawal.",
      "Where you land in that 3–6 month range depends on how stable your income is. Salaried employees with stable jobs and dependents typically lean toward 3–4 months; freelancers, commission-based earners, or single-income households with dependents are usually better served by 6 months or more, since an income gap is more likely and harder to predict.",
    ],
  },
];

export default function LearnSection() {
  return (
    <section id="learn" className="border-y border-ink-900/6 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
          Understanding your numbers
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-600">
          A short explainer on how MoneyNext scores your finances, and the personal-finance
          benchmarks it's built around.
        </p>

        <div className="mt-10 space-y-10">
          {ARTICLES.map((article) => (
            <article key={article.title}>
              <h3 className="font-display text-lg font-semibold text-ink-900">
                {article.title}
              </h3>
              <div className="mt-2 space-y-3 text-sm leading-relaxed text-ink-700">
                {article.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
