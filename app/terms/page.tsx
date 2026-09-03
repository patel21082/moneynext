import type { Metadata } from "next";
import { SITE_NAME, CONTENT_LAST_UPDATED } from "@/lib/seo";
import InfoPageLayout from "@/components/InfoPageLayout";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms governing your use of ${SITE_NAME}'s tools and content.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <InfoPageLayout title="Terms of Use" lastUpdated={CONTENT_LAST_UPDATED}>
      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">Acceptance of terms</h2>
        <p className="mt-2 leading-relaxed">
          By using {SITE_NAME}, you agree to these Terms of Use. If you don't agree with any
          part of them, please don't use the site.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">What {SITE_NAME} is</h2>
        <p className="mt-2 leading-relaxed">
          {SITE_NAME} provides free educational financial calculators and content, along with an
          AI-assisted financial planning tool. It is provided "as is," for general educational
          and informational purposes only.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">Not professional advice</h2>
        <p className="mt-2 leading-relaxed">
          Nothing on this site constitutes investment, tax, legal, insurance, or other regulated
          professional advice. Calculators produce estimates based on the inputs and assumptions
          you provide; they are not guarantees of future results. Consult a qualified professional
          before making significant financial decisions.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">Accuracy of information</h2>
        <p className="mt-2 leading-relaxed">
          We aim to keep calculations and content accurate and up to date, but we make no
          warranty — express or implied — about the completeness, reliability, or accuracy of any
          information on this site. Interest rates, tax rules, and financial products change, and
          you should verify current figures with your bank, lender, or advisor.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">Limitation of liability</h2>
        <p className="mt-2 leading-relaxed">
          To the fullest extent permitted by law, {SITE_NAME} and its operator are not liable for
          any loss or damage arising from your use of, or reliance on, this site's tools or
          content, including financial decisions made based on calculator outputs or AI-generated
          suggestions.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">Third-party links and services</h2>
        <p className="mt-2 leading-relaxed">
          This site may link to third-party websites or use third-party services (such as
          advertising or AI providers). We aren't responsible for the content, accuracy, or
          practices of third parties.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">Changes to these terms</h2>
        <p className="mt-2 leading-relaxed">
          We may update these terms from time to time. Continued use of the site after changes
          are posted constitutes acceptance of the revised terms.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold text-ink-900">Contact</h2>
        <p className="mt-2 leading-relaxed">
          Questions about these terms can be sent via our{" "}
          <a href="/contact" className="text-signal underline">
            Contact page
          </a>
          .
        </p>
      </section>
    </InfoPageLayout>
  );
}
