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

export default function AdSlot({
  slot,
  format = "auto",
  className = "",
}: AdSlotProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const configured = Boolean(client && slot);

  const insRef = useRef<HTMLModElement>(null);
  const requested = useRef(false);

  useEffect(() => {
    if (!configured || requested.current || !insRef.current) {
      return;
    }

    const requestAd = () => {
      if (requested.current || !insRef.current) {
        return;
      }

      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        requested.current = true;
      } catch (error) {
        console.error("AdSense initialization failed:", error);
      }
    };

    // Give AdSense a moment to load.
    if (window.adsbygoogle) {
      requestAd();
    } else {
      const timer = setTimeout(requestAd, 500);
      return () => clearTimeout(timer);
    }
  }, [configured]);

  if (!configured) {
    return (
      <div
        role="complementary"
        aria-label="Advertisement"
        className={`w-full rounded-2xl border border-dashed border-ink-600/20 bg-paper-100/60 ${className}`}
      >
        <div className="flex min-h-[90px] items-center justify-center py-6 text-xs uppercase tracking-[0.2em] text-ink-600/50">
          Advertisement
        </div>
      </div>
    );
  }

  return (
    <div
      role="complementary"
      aria-label="Advertisement"
      className={`w-full ${className}`}
    >
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
        }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}