import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/seo";
import InfoPageLayout from "@/components/InfoPageLayout";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SITE_NAME} — questions, corrections, or feedback.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <InfoPageLayout title="Contact MoneyNext">
      <p className="leading-relaxed">
        Have a question, spotted an error, or want to suggest something? Send us a message and
        we'll get back to you.
      </p>

      <ContactForm />

      <section className="pt-4">
        <h2 className="font-display text-lg font-semibold text-ink-900">
          Content corrections
        </h2>
        <p className="mt-2 leading-relaxed">
          Spotted an outdated figure or an error in a guide or calculator? Mention it in the
          message above with the page it's on — we review and correct genuine errors promptly.
          See our{" "}
          <a href="/editorial-policy" className="text-signal underline">
            Editorial Policy
          </a>{" "}
          for how content is reviewed.
        </p>
      </section>
    </InfoPageLayout>
  );
}
