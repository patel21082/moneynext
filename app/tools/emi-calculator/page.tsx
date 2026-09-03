import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/seo";
import EmiCalculatorTool from "@/components/EmiCalculatorTool";
import ToolPageLayout from "@/components/ToolPageLayout";

const TITLE = "EMI Calculator — Home, Personal & Car Loans";
const DESCRIPTION =
  "Calculate your monthly EMI, total interest and total payment for home, personal or car loans. See how tenure and prepayments change what you owe.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/emi-calculator" },
  openGraph: { title: `${TITLE} — ${SITE_NAME}`, description: DESCRIPTION, type: "website" },
};

const FAQS = [
  {
    q: "What is EMI?",
    a: "EMI (Equated Monthly Instalment) is the fixed amount you pay each month toward a loan until it's fully repaid. Every EMI is split between interest (the cost of borrowing) and principal (the amount you actually borrowed) — early in the loan, more of it goes toward interest.",
  },
  {
    q: "How is EMI calculated?",
    a: "EMI is calculated on the reducing balance method: EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1), where P is the loan amount, r is the monthly interest rate, and n is the number of monthly instalments. This calculator applies that formula directly to your inputs.",
  },
  {
    q: "Why does a longer tenure increase total interest?",
    a: "A longer tenure lowers your monthly EMI, but you're borrowing the lender's money for more months, so more interest accrues overall — even though the total amount you're borrowing hasn't changed.",
  },
  {
    q: "Does prepaying reduce my EMI or my tenure?",
    a: "It depends on what you choose with your lender. Most borrowers keep the EMI the same and shorten the tenure, which saves more interest overall — that's what the 'extra monthly payment' field above estimates.",
  },
  {
    q: "Is this calculator accurate for my actual loan?",
    a: "It gives a close estimate using standard EMI math, but actual figures from your lender may vary slightly due to processing fees, insurance add-ons, floating-rate resets, or day-count conventions specific to that lender.",
  },
];

export default function EmiCalculatorPage() {
  return (
    <ToolPageLayout
      path="/tools/emi-calculator"
      breadcrumbLabel="EMI Calculator"
      h1="EMI Calculator for Home, Personal & Car Loans"
      intro="Work out your monthly instalment, total interest, and how much a prepayment could save you — instantly, with no signup."
      calculator={<EmiCalculatorTool />}
      faqs={FAQS}
      articleSections={[
        {
          heading: "What EMI actually means",
          content: (
            <>
              <p>
                EMI stands for Equated Monthly Instalment — the fixed sum you pay your lender
                every month until a loan is cleared. Each instalment is really two things
                bundled together: a portion that covers <strong>interest</strong> (what the
                lender charges you for the loan) and a portion that reduces your{" "}
                <strong>principal</strong> (the amount you originally borrowed).
              </p>
              <p>
                Because interest is charged on whatever principal is still outstanding, early
                EMIs are interest-heavy and later EMIs are principal-heavy — even though the
                total monthly amount never changes.
              </p>
            </>
          ),
        },
        {
          heading: "How EMI is calculated",
          content: (
            <>
              <p>Lenders use the reducing-balance formula:</p>
              <div className="overflow-x-auto rounded-xl border border-ink-900/8 bg-paper-100/60 p-4 font-mono text-sm text-ink-900">
                EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)
              </div>
              <p>
                Here, <strong>P</strong> is the loan amount, <strong>r</strong> is the monthly
                interest rate (annual rate ÷ 12 ÷ 100), and <strong>n</strong> is the total
                number of monthly instalments (tenure in years × 12).
              </p>
              <p>
                Example: a ₹30 lakh home loan at 8.5% annual interest over 20 years works out to
                an EMI of roughly ₹26,000 a month, with total interest close to ₹32 lakh over
                the life of the loan — try the numbers above to see the exact figures.
              </p>
            </>
          ),
        },
        {
          heading: "How interest rate affects your EMI",
          content: (
            <p>
              Interest rate has an outsized effect on EMI because it compounds over every
              remaining month of the loan. A 1 percentage point rate increase on a 20-year home
              loan typically raises the EMI by roughly 6–7%, and raises total interest paid by
              considerably more — since that higher rate applies for the loan's entire tenure,
              not just one year.
            </p>
          ),
        },
        {
          heading: "How tenure affects total interest",
          content: (
            <p>
              Stretching a loan over a longer tenure lowers your monthly EMI — which helps
              affordability — but increases the total interest you'll pay, because interest
              keeps accruing on the outstanding balance for more months. Shortening tenure does
              the opposite: higher EMI, but meaningfully less interest overall.
            </p>
          ),
        },
        {
          heading: "Should you make prepayments?",
          content: (
            <p>
              Prepaying — putting extra money toward your principal beyond the required EMI —
              is one of the most effective ways to cut the total interest on a long-tenure loan,
              because it directly reduces the balance interest is calculated on. The "extra
              monthly payment" field above estimates how many months sooner you'd be debt-free
              and how much interest you'd save. Before prepaying, check whether your lender
              charges a prepayment penalty and whether the money might earn more invested
              elsewhere.
            </p>
          ),
        },
      ]}
    />
  );
}
