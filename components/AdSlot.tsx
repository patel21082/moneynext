"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdSlotProps {
  slot: string;
  format?: "auto" | "horizontal" | "rectangle";
  className?: string;
}

/**
 * Placeholder-first ad container. Once NEXT_PUBLIC_ADSENSE_CLIENT (in
 * app/layout.tsx, loads the adsbygoogle.js script once for the whole site)
 * and a NEXT_PUBLIC_AD_SLOT_* value are both set, this renders a real
 * AdSense unit and requests an ad for it. Until then it shows a labeled
 * placeholder so the layout never breaks.
 */
export default function AdSlot({ slot, format = "auto", className = "" }: AdSlotProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const configured = Boolean(client && slot);
  const insRef = useRef<HTMLModElement>(null);
  const requested = useRef(false);

  useEffect(() => {
    if (!configured || requested.current) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      requested.current = true;
    } catch {
      // adsbygoogle script hasn't loaded yet (e.g. blocked by an ad blocker) — safe to ignore.
    }
  }, [configured]);

  return (
    <div
      role="complementary"
      aria-label="Advertisement"
      className={`w-full rounded-2xl border border-dashed border-ink-600/20 bg-paper-100/60 ${className}`}
    >
      {configured ? (
        <ins
          ref={insRef}
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex min-h-[90px] items-center justify-center py-6 text-xs uppercase tracking-[0.2em] text-ink-600/50">
          Advertisement
        </div>
      )}
    </div>
  );
}
