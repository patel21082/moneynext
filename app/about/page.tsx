import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_OWNER_NAME } from "@/lib/seo";
import AdSlot from "@/components/AdSlot";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About",
  description: `Who built ${SITE_NAME} and why — a free, no-signup AI financial planning tool for Indian users.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <main className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
      <Link href="/" className="text-sm font-medium text-signal hover:text-signal-dim">
        ← Back to {SITE_NAME}
      </Link>

      <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-ink-900">
        About {SITE_NAME}
      </h1>

      <div className="mt-8 space-y-6 text-ink-800">
        <section>
          <h2 className="font-display text-lg font-semibold text-ink-900">Why {SITE_NAME} exists</h2>
          <p className="mt-2 leading-relaxed">
            Most budgeting tools ask users to sign up, connect a bank account, or pay a
            subscription before they'll tell you anything useful. {SITE_NAME} was built to remove
            all of that friction: you enter your income, expenses, loans, and investments, and get
            an immediate, structured breakdown of your financial health — a score, the reasoning
            behind it, and a prioritized next-step plan — without creating an account or handing
            over any banking credentials.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ink-900">Who built it</h2>
          <p className="mt-2 leading-relaxed">
            {SITE_NAME} is built and maintained by {SITE_OWNER_NAME}, a full-stack developer based in
            India. It's an independent, self-funded project — the core calculations (surplus,
            savings rate, debt-to-income ratio, emergency fund coverage, and the financial health
            score) run entirely client-side in your browser using standard personal-finance
            benchmarks, and are not outsourced to a third party.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ink-900">What it is — and isn't</h2>
          <p className="mt-2 leading-relaxed">
            {SITE_NAME} is an educational financial planning tool. It is not a registered
            investment advisor, a bank, an NBFC, or a licensed financial planning service, and
            nothing it produces is personalized regulated financial advice. It doesn't recommend
            specific stocks, mutual funds, insurance products, or lenders. For decisions involving
            significant money, we'd encourage you to also speak with a SEBI-registered investment
            advisor or a certified financial planner.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ink-900">Get in touch</h2>
          <p className="mt-2 leading-relaxed">
            Questions, feedback, or found something that looks wrong? See the{" "}
            <Link href="/contact" className="text-signal underline">
              Contact page
            </Link>
            .
          </p>
        </section>
      </div>

      <div className="mt-10">
        <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM ?? ""} />
      </div>
    </main>
    <Footer />
    </>
  );
}
