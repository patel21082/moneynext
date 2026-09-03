import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/seo";
import SipCalculatorTool from "@/components/SipCalculatorTool";
import ToolPageLayout from "@/components/ToolPageLayout";

const TITLE = "SIP Calculator — Project Your Mutual Fund SIP Returns";
const DESCRIPTION =
  "Estimate the future value of your monthly SIP investment, total amount invested, and estimated returns, with optional annual step-up.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/sip-calculator" },
  openGraph: { title: `${TITLE} — ${SITE_NAME}`, description: DESCRIPTION, type: "website" },
};

const FAQS = [
  {
    q: "What is SIP?",
    a: "SIP (Systematic Investment Plan) is a way of investing a fixed amount into a mutual fund at regular intervals, usually monthly, instead of investing a lump sum all at once.",
  },
  {
    q: "How does SIP compounding work?",
    a: "Each instalment you invest starts earning returns from the day it's invested, and those returns themselves start earning further returns over time. Because instalments are spread out, later instalments compound for less time than earlier ones — which is why starting early matters more than the exact monthly amount.",
  },
  {
    q: "What return rate should I assume?",
    a: "There's no guaranteed rate — equity mutual funds have historically delivered a wide range of long-term annualized returns depending on the period and fund. Use a conservative assumption and treat the output as an estimate, not a promise.",
  },
  {
    q: "What does the annual step-up option do?",
    a: "It increases your monthly SIP amount by a fixed percentage every year, modeling the common practice of raising your investment as your income grows, rather than keeping it flat for the entire duration.",
  },
  {
    q: "What happens if I stop my SIP partway through?",
    a: "Amounts already invested keep growing (or shrinking) with the market, but you stop adding new instalments, which usually reduces your final corpus meaningfully compared to staying invested for the full duration — the earlier you stop, the bigger the difference.",
  },
];

export default function SipCalculatorPage() {
  return (
    <ToolPageLayout
      path="/tools/sip-calculator"
      breadcrumbLabel="SIP Calculator"
      h1="SIP Calculator"
      intro="Estimate what your monthly SIP could grow into over time, and see how much of the final value is your own money versus market growth."
      calculator={<SipCalculatorTool />}
      faqs={FAQS}
      articleSections={[
        {
          heading: "What this calculator actually shows you",
          content: (
            <p>
              Enter a monthly amount, an expected annual return, and a duration, and the
              calculator compounds your contributions month by month to project a future value.
              It also splits that future value into how much you actually put in versus how much
              came from investment growth — the gap between those two numbers is the entire case
              for investing early and staying invested.
            </p>
          ),
        },
        {
          heading: "SIP vs lump sum",
          content: (
            <p>
              A SIP spreads your investment across market ups and downs, which averages out your
              purchase price over time — a concept often called rupee-cost averaging. A lump sum,
              by contrast, is fully exposed to whatever the market does right after you invest.
              Neither is universally "better" — SIPs suit money you're setting aside from ongoing
              income, while a lump sum can make sense for a windfall you already have sitting in
              cash.
            </p>
          ),
        },
        {
          heading: "Why time in the market matters more than timing it",
          content: (
            <p>
              Because compounding is exponential, the years an instalment spends invested matter
              more than the exact month you started it. An instalment invested for 20 years does
              far more work than one invested for 10 years at the same return rate — which is why
              delaying the start of a SIP is usually more costly than a few percentage points of
              return.
            </p>
          ),
        },
      ]}
    />
  );
}
