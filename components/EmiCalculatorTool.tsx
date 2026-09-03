"use client";

import { useMemo, useState } from "react";
import { calculateEMI, formatINR } from "@/lib/calculations";
import NumberField from "@/components/NumberField";

export default function EmiCalculatorTool() {
  const [principal, setPrincipal] = useState(3000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [extra, setExtra] = useState(0);

  const result = useMemo(
    () =>
      calculateEMI({
        principal,
        annualRate: rate,
        tenureYears: tenure,
        extraMonthlyPayment: extra,
      }),
    [principal, rate, tenure, extra]
  );

  const principalSharePct =
    result.totalPayment > 0 ? Math.round((principal / result.totalPayment) * 100) : 0;

  return (
    <div className="rounded-xl2 border border-ink-900/8 bg-paper-100/60 p-5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField
          label="Loan amount"
          value={principal}
          onChange={setPrincipal}
          suffix="₹"
          step={10000}
        />
        <NumberField
          label="Interest rate (annual)"
          value={rate}
          onChange={setRate}
          suffix="%"
          step={0.05}
        />
        <NumberField label="Loan tenure" value={tenure} onChange={setTenure} suffix="years" />
        <NumberField
          label="Extra monthly payment (optional)"
          value={extra}
          onChange={setExtra}
          suffix="₹"
          step={500}
        />
      </div>

      {/* Results */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-ink-900 p-5 text-paper-50">
          <p className="text-xs uppercase tracking-wide text-paper-200/70">Monthly EMI</p>
          <p className="mt-1 font-display text-2xl font-semibold tabular">
            {formatINR(result.emi)}
          </p>
        </div>
        <div className="rounded-xl border border-ink-900/8 bg-paper-50 p-5">
          <p className="text-xs uppercase tracking-wide text-ink-600">Total interest</p>
          <p className="mt-1 font-display text-2xl font-semibold text-ink-900 tabular">
            {formatINR(result.totalInterest)}
          </p>
        </div>
        <div className="rounded-xl border border-ink-900/8 bg-paper-50 p-5">
          <p className="text-xs uppercase tracking-wide text-ink-600">Total payment</p>
          <p className="mt-1 font-display text-2xl font-semibold text-ink-900 tabular">
            {formatINR(result.totalPayment)}
          </p>
        </div>
      </div>

      {/* Principal vs interest bar */}
      <div className="mt-6">
        <div className="flex justify-between text-xs text-ink-600">
          <span>Principal ({principalSharePct}%)</span>
          <span>Interest ({100 - principalSharePct}%)</span>
        </div>
        <div className="mt-1.5 flex h-2.5 w-full overflow-hidden rounded-full bg-paper-200">
          <div className="h-full bg-signal" style={{ width: `${principalSharePct}%` }} />
          <div className="h-full bg-signal-light" style={{ width: `${100 - principalSharePct}%` }} />
        </div>
      </div>

      {extra > 0 && result.withExtra && (
        <div className="mt-6 rounded-xl border border-gain/30 bg-gain-soft p-5">
          <p className="font-display text-sm font-semibold text-ink-900">
            Paying {formatINR(extra)} extra every month
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <p className="text-sm text-ink-800">
              You'd be debt-free in{" "}
              <span className="font-semibold tabular">
                {Math.floor(result.withExtra.monthsToPayoff / 12)}y{" "}
                {result.withExtra.monthsToPayoff % 12}m
              </span>{" "}
              — {result.withExtra.monthsSaved} months sooner.
            </p>
            <p className="text-sm text-ink-800">
              You'd save{" "}
              <span className="font-semibold tabular">
                {formatINR(result.withExtra.interestSaved)}
              </span>{" "}
              in interest.
            </p>
          </div>
        </div>
      )}

      {/* Year-by-year schedule */}
      <div className="mt-8">
        <p className="font-display text-sm font-semibold text-ink-900">
          Yearly amortization (principal vs interest)
        </p>
        <div className="mt-3 max-h-72 overflow-y-auto rounded-xl border border-ink-900/8">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-paper-100 text-xs uppercase tracking-wide text-ink-600">
              <tr>
                <th className="px-4 py-2 font-medium">Year</th>
                <th className="px-4 py-2 font-medium">Principal paid</th>
                <th className="px-4 py-2 font-medium">Interest paid</th>
                <th className="px-4 py-2 font-medium">Balance</th>
              </tr>
            </thead>
            <tbody>
              {result.schedule.map((row) => (
                <tr key={row.year} className="border-t border-ink-900/6">
                  <td className="px-4 py-2 tabular text-ink-800">{row.year}</td>
                  <td className="px-4 py-2 tabular text-ink-800">
                    {formatINR(row.principalPaid)}
                  </td>
                  <td className="px-4 py-2 tabular text-ink-800">
                    {formatINR(row.interestPaid)}
                  </td>
                  <td className="px-4 py-2 tabular text-ink-800">{formatINR(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
