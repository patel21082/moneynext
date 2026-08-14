"use client";

import { useEffect, useState } from "react";
import { HealthScoreBreakdown } from "@/lib/types";

const SIZE = 176;
const STROKE = 12;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function toneForScore(score: number) {
  if (score >= 70) return "#1FA971";
  if (score >= 45) return "#C8801A";
  return "#C4432E";
}

export default function HealthGauge({
  score,
  label,
  breakdown,
}: {
  score: number;
  label: string;
  breakdown: HealthScoreBreakdown;
}) {
  const [display, setDisplay] = useState(0);
  const color = toneForScore(score);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const duration = 1000;
    const from = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (score - from) * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const offset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE;

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-10">
      <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="-rotate-90">
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="#E8EAE4"
            strokeWidth={STROKE}
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-4xl font-semibold tabular text-ink-900">{display}</span>
          <span className="text-xs text-ink-600">/ 100</span>
        </div>
      </div>

      <div className="flex-1">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-600/60">
          Your Financial Health
        </p>
        <p className="mt-1 font-display text-xl font-semibold text-ink-900">{label}</p>

        <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3">
          <ScoreRow name="Cash Flow" value={breakdown.cashFlow} max={20} />
          <ScoreRow name="Emergency Fund" value={breakdown.emergencyFund} max={20} />
          <ScoreRow name="Debt" value={breakdown.debt} max={20} />
          <ScoreRow name="Savings" value={breakdown.savings} max={20} />
          <ScoreRow name="Investments" value={breakdown.investments} max={20} />
        </div>
      </div>
    </div>
  );
}

function ScoreRow({ name, value, max }: { name: string; value: number; max: number }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-ink-600">{name}</span>
      <span className="font-mono tabular text-ink-900">
        {value} / {max}
      </span>
    </div>
  );
}
