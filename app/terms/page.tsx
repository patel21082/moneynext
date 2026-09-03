import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_OWNER_NAME } from "@/lib/seo";
import AdSlot from "@/components/AdSlot";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms that apply to using ${SITE_NAME}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <main className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
      <Link href="/" className="text-sm font-medium text-signal hover:text-signal-dim">
        ← Back to {SITE_NAME}
      </Link>

      <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-ink-900">
        Terms of Use
      </h1>
      <p className="mt-2 text-sm text-ink-600">
        Last updated:{" "}
        {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="mt-8 space-y-6 text-ink-800">
        <section>
          <h2 className="font-display text-lg font-semibold text-ink-900">1. Acceptance of terms</h2>
          <p className="mt-2 leading-relaxed">
            By using {SITE_NAME}, you agree to these terms. If you don't agree, please don't use
            the site. {SITE_NAME} is provided by {SITE_OWNER_NAME}, an independent developer based in
            India.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ink-900">
            2. Educational use only — not financial advice
          </h2>
          <p className="mt-2 leading-relaxed">
            {SITE_NAME} generates a financial health score, a narrative analysis, and suggested
            next steps based entirely on the numbers you enter. This output is for general
            educational and informational purposes only. It is not personalized financial,
            investment, tax, or legal advice, is not a recommendation to buy, sell, or hold any
            specific financial product, and should not be relied on as the sole basis for a
            financial decision. {SITE_NAME} and its operator are not a SEBI-registered investment
            advisor, and nothing on this site constitutes regulated financial advice under Indian
            law.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ink-900">3. Accuracy of results</h2>
          <p className="mt-2 leading-relaxed">
            Calculations depend entirely on the figures you provide. We don't verify these figures
            against any bank, credit bureau, or official record. Results, including the financial
            health score and any AI-generated commentary, may contain errors or oversimplifications
            and should be treated as estimates, not guarantees.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ink-900">4. No warranty</h2>
          <p className="mt-2 leading-relaxed">
            {SITE_NAME} is provided "as is" without warranties of any kind, express or implied,
            including fitness for a particular purpose or uninterrupted availability. We're not
            liable for any loss or decision made based on the site's output.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ink-900">5. Advertising</h2>
          <p className="mt-2 leading-relaxed">
            This site may display third-party ads, including through Google AdSense. See the{" "}
            <Link href="/privacy" className="text-signal underline">
              Privacy Policy
            </Link>{" "}
            for details on how advertising and cookies work here.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ink-900">6. Changes</h2>
          <p className="mt-2 leading-relaxed">
            These terms may be updated from time to time. Continued use of the site after a change
            means you accept the revised terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ink-900">7. Contact</h2>
          <p className="mt-2 leading-relaxed">
            Questions about these terms can be sent via the{" "}
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
