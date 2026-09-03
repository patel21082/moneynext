import type { Metadata } from "next";
import { SITE_NAME, CONTENT_LAST_UPDATED } from "@/lib/seo";
import InfoPageLayout from "@/components/InfoPageLayout";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `How cookies and similar technologies are used on ${SITE_NAME}.`,
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <InfoPageLayout title="Cookie Policy" lastUpdated={CONTENT_LAST_UPDATED}>
      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">What are cookies?</h2>
        <p className="mt-2 leading-relaxed">
          Cookies are small text files stored on your device by your browser. They're commonly
          used to remember information about your visit, such as preferences, or to enable
          advertising and analytics services.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">
          Cookies used on {SITE_NAME}
        </h2>
        <p className="mt-2 leading-relaxed">
          {SITE_NAME} does not set its own tracking cookies to identify you personally. If
          advertising (Google AdSense) or analytics services are active on this site, those
          third parties may set their own cookies as described below.
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-ink-900/8">
          <table className="w-full text-left text-sm">
            <thead className="bg-paper-100 text-xs uppercase tracking-wide text-ink-600">
              <tr>
                <th className="px-4 py-2 font-medium">Category</th>
                <th className="px-4 py-2 font-medium">Purpose</th>
                <th className="px-4 py-2 font-medium">Set by</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Advertising", "Serve and measure ads, including personalization", "Google AdSense"],
                ["Analytics", "Understand aggregate site usage", "Site analytics provider (if enabled)"],
                ["Essential", "Basic site functionality (no tracking)", `${SITE_NAME}`],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-ink-900/6">
                  {row.map((cell, i) => (
                    <td key={i} className="px-4 py-2 text-ink-800">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">Managing cookies</h2>
        <p className="mt-2 leading-relaxed">
          You can control or delete cookies through your browser settings. Most browsers let you
          block third-party cookies or clear existing ones. To opt out of personalized
          advertising from Google specifically, visit{" "}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-signal underline"
          >
            Google Ads Settings
          </a>
          . Note that blocking all cookies may affect how some parts of the site function.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">More information</h2>
        <p className="mt-2 leading-relaxed">
          See our{" "}
          <a href="/privacy" className="text-signal underline">
            Privacy Policy
          </a>{" "}
          for how we handle the information you enter into our tools, and Google's own
          documentation at{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            className="text-signal underline"
          >
            policies.google.com/technologies/partner-sites
          </a>{" "}
          for how it uses data across partner sites.
        </p>
      </section>
    </InfoPageLayout>
  );
}
