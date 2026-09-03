import type { Metadata } from "next";
import { SITE_NAME, CONTENT_LAST_UPDATED } from "@/lib/seo";
import InfoPageLayout from "@/components/InfoPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} handles the information you enter, and how advertising works on this site.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <InfoPageLayout title="Privacy Policy" lastUpdated={CONTENT_LAST_UPDATED}>
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
          When you tap "Analyze My Financial Situation" or ask a what-if question, the financial
          details you've entered are sent from our server to a third-party AI provider (NVIDIA's
          API) solely to generate your personalized analysis. That request is not logged with any
          identifying information about you, and we do not retain a copy of it after the response
          is returned to your browser.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">
          The tool calculators (EMI, SIP, and others)
        </h2>
        <p className="mt-2 leading-relaxed">
          The calculators under <code>/tools</code> run entirely in your browser using
          JavaScript. Nothing you enter into them — loan amounts, interest rates, savings goals,
          debts — is ever sent to our servers or stored anywhere.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">Advertising & cookies</h2>
        <p className="mt-2 leading-relaxed">
          This site may show ads served by Google AdSense. Google and its partners may use
          cookies or similar technologies to serve ads based on your prior visits to this or
          other websites. See our{" "}
          <a href="/cookie-policy" className="text-signal underline">
            Cookie Policy
          </a>{" "}
          for details, or opt out of personalized advertising at{" "}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-signal underline"
          >
            Google Ads Settings
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
          Questions about this policy can be directed to us via our{" "}
          <a href="/contact" className="text-signal underline">
            Contact page
          </a>
          .
        </p>
      </section>
    </InfoPageLayout>
  );
}
