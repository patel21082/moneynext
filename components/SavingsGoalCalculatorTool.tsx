"use client";

import { useMemo, useState } from "react";
import { calculateSavingsGoal } from "@/lib/toolCalculators";
import { formatINR } from "@/lib/calculations";
import NumberField from "@/components/NumberField";

export default function SavingsGoalCalculatorTool() {
  const [goalAmount, setGoalAmount] = useState(1000000);
  const [currentSavings, setCurrentSavings] = useState(100000);
  const [years, setYears] = useState(5);
  const [annualReturn, setAnnualReturn] = useState(9);

  const result = useMemo(
    () =>
      calculateSavingsGoal({
        goalAmount,
        currentSavings,
        years,
        annualReturnPct: annualReturn,
      }),
    [goalAmount, currentSavings, years, annualReturn]
  );

  return (
    <div className="rounded-xl2 border border-ink-900/8 bg-paper-100/60 p-5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField label="Goal amount" value={goalAmount} onChange={setGoalAmount} suffix="₹" step={10000} />
        <NumberField
          label="Current savings"
          value={currentSavings}
          onChange={setCurrentSavings}
          suffix="₹"
          step={5000}
        />
        <NumberField label="Time period" value={years} onChange={setYears} suffix="years" />
        <NumberField
          label="Expected annual return"
          value={annualReturn}
          onChange={setAnnualReturn}
          suffix="%"
          step={0.5}
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-ink-900 p-5 text-paper-50 sm:col-span-1">
          <p className="text-xs uppercase tracking-wide text-paper-200/70">
            Required monthly saving
          </p>
          <p className="mt-1 font-display text-2xl font-semibold tabular">
            {formatINR(Math.max(0, result.requiredMonthlyContribution))}
          </p>
        </div>
        <div className="rounded-xl border border-ink-900/8 bg-paper-50 p-5">
          <p className="text-xs uppercase tracking-wide text-ink-600">Total you'll contribute</p>
          <p className="mt-1 font-display text-2xl font-semibold text-ink-900 tabular">
            {formatINR(Math.max(0, result.totalContributions))}
          </p>
        </div>
        <div className="rounded-xl border border-ink-900/8 bg-paper-50 p-5">
          <p className="text-xs uppercase tracking-wide text-ink-600">Growth from returns</p>
          <p className="mt-1 font-display text-2xl font-semibold text-gain tabular">
            {formatINR(Math.max(0, result.projectedGrowth))}
          </p>
        </div>
      </div>

      {result.requiredMonthlyContribution <= 0 && (
        <p className="mt-6 rounded-xl border border-gain/30 bg-gain-soft p-4 text-sm text-ink-800">
          Your current savings, growing at this rate, are already projected to reach your goal —
          you may not need to add anything extra.
        </p>
      )}
    </div>
  );
}
