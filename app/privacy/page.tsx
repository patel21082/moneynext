import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} handles the information you enter, and how advertising works on this site.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
      <Link href="/" className="text-sm font-medium text-signal hover:text-signal-dim">
        ← Back to {SITE_NAME}
      </Link>

      <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-ink-900">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-ink-600">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>

      <div className="mt-8 space-y-6 text-ink-800">
        <section>
          <h2 className="font-display text-lg font-semibold text-ink-900">What we don't store</h2>
          <p className="mt-2 leading-relaxed">
            {SITE_NAME} has no database, no user accounts, and no server-side storage of the
            financial information you enter. Everything you type into the wizard — income,
            expenses, loans, investments, goals — exists only in your browser's memory for the
            current page session. Refreshing or closing the page clears it.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ink-900">
            What is sent to the AI service
          </h2>
          <p className="mt-2 leading-relaxed">
            When you tap "Analyze My Financial Situation" or ask a what-if question, the
            financial details you've entered are sent from our server to a third-party AI
            provider (NVIDIA's API) solely to generate your personalized analysis. That request
            is not logged with any identifying information about you, and we do not retain a
            copy of it after the response is returned to your browser.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ink-900">Advertising & cookies</h2>
          <p className="mt-2 leading-relaxed">
            This site may show ads served by Google AdSense. Google and its partners may use
            cookies or similar technologies to serve ads based on your prior visits to this or
            other websites. You can opt out of personalized advertising by visiting{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-signal underline"
            >
              Google Ads Settings
            </a>
            , and you can learn more about how Google uses data at{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-signal underline"
            >
              policies.google.com/technologies/partner-sites
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ink-900">Analytics</h2>
          <p className="mt-2 leading-relaxed">
            If analytics are enabled on this site, they collect aggregate, non-identifying usage
            data (such as page views and general location) to help us understand how the site is
            used. Analytics data is not linked to the financial information you enter.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-ink-900">Contact</h2>
          <p className="mt-2 leading-relaxed">
            Questions about this policy can be directed to the site owner via the contact details
            provided on this website.
          </p>
        </section>
      </div>
    </main>
  );
}
