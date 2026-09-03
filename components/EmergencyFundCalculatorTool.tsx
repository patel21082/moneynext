"use client";

import { useMemo, useState } from "react";
import { calculateEmergencyFund, EmergencyFundInput } from "@/lib/toolCalculators";
import { formatINR } from "@/lib/calculations";
import NumberField from "@/components/NumberField";

const STABILITY_OPTIONS: { value: EmergencyFundInput["incomeStability"]; label: string }[] = [
  { value: "stable", label: "Stable (salaried, secure job)" },
  { value: "variable", label: "Variable (freelance, commission, business)" },
  { value: "single_earner_variable", label: "Single earner, variable income" },
];

export default function EmergencyFundCalculatorTool() {
  const [monthlyEssentialExpenses, setMonthlyEssentialExpenses] = useState(40000);
  const [existingEmergencySavings, setExistingEmergencySavings] = useState(50000);
  const [incomeStability, setIncomeStability] =
    useState<EmergencyFundInput["incomeStability"]>("stable");
  const [dependents, setDependents] = useState(1);

  const result = useMemo(
    () =>
      calculateEmergencyFund({
        monthlyEssentialExpenses,
        existingEmergencySavings,
        incomeStability,
        dependents,
      }),
    [monthlyEssentialExpenses, existingEmergencySavings, incomeStability, dependents]
  );

  const coveragePct = Math.min(
    100,
    result.targetRecommended > 0
      ? Math.round((existingEmergencySavings / result.targetRecommended) * 100)
      : 0
  );

  return (
    <div className="rounded-xl2 border border-ink-900/8 bg-paper-100/60 p-5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField
          label="Monthly essential expenses"
          value={monthlyEssentialExpenses}
          onChange={setMonthlyEssentialExpenses}
          suffix="₹"
          step={1000}
        />
        <NumberField
          label="Existing emergency savings"
          value={existingEmergencySavings}
          onChange={setExistingEmergencySavings}
          suffix="₹"
          step={1000}
        />
        <NumberField
          label="Number of dependents"
          value={dependents}
          onChange={setDependents}
          suffix="people"
        />
        <label className="block">
          <span className="text-sm font-medium text-ink-800">Income stability</span>
          <select
            className="mt-1.5 w-full rounded-xl border border-ink-900/12 bg-paper-50 px-4 py-3 text-sm text-ink-900 outline-none focus:border-signal"
            value={incomeStability}
            onChange={(e) =>
              setIncomeStability(e.target.value as EmergencyFundInput["incomeStability"])
            }
          >
            {STABILITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-ink-900 p-5 text-paper-50">
          <p className="text-xs uppercase tracking-wide text-paper-200/70">
            Recommended target ({result.recommendedMonths} months)
          </p>
          <p className="mt-1 font-display text-2xl font-semibold tabular">
            {formatINR(result.targetRecommended)}
          </p>
        </div>
        <div className="rounded-xl border border-ink-900/8 bg-paper-50 p-5">
          <p className="text-xs uppercase tracking-wide text-ink-600">Your current coverage</p>
          <p className="mt-1 font-display text-2xl font-semibold text-ink-900 tabular">
            {result.currentCoverageMonths.toFixed(1)} months
          </p>
        </div>
        <div className="rounded-xl border border-ink-900/8 bg-paper-50 p-5">
          <p className="text-xs uppercase tracking-wide text-ink-600">Shortfall</p>
          <p className="mt-1 font-display text-2xl font-semibold text-warn tabular">
            {formatINR(result.shortfall)}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-xs text-ink-600">
          <span>Coverage toward target</span>
          <span>{coveragePct}%</span>
        </div>
        <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-paper-200">
          <div
            className={`h-full ${coveragePct >= 100 ? "bg-gain" : "bg-signal"}`}
            style={{ width: `${coveragePct}%` }}
          />
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-ink-900/8 bg-paper-50 p-5">
          <p className="text-xs uppercase tracking-wide text-ink-600">3-month target</p>
          <p className="mt-1 font-display text-lg font-semibold text-ink-900 tabular">
            {formatINR(result.target3Month)}
          </p>
        </div>
        <div className="rounded-xl border border-ink-900/8 bg-paper-50 p-5">
          <p className="text-xs uppercase tracking-wide text-ink-600">6-month target</p>
          <p className="mt-1 font-display text-lg font-semibold text-ink-900 tabular">
            {formatINR(result.target6Month)}
          </p>
        </div>
      </div>
    </div>
  );
}
