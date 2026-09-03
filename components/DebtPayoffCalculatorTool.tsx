"use client";

import { useMemo, useState } from "react";
import { calculateDebtPayoff, DebtItemInput, DebtPayoffInput } from "@/lib/toolCalculators";
import { formatINR } from "@/lib/calculations";
import NumberField from "@/components/NumberField";
import { Trash2, Plus } from "lucide-react";

let nextId = 1;
function newDebt(name: string, outstanding: number, rate: number, minPayment: number): DebtItemInput {
  return { id: `debt-${nextId++}`, name, outstanding, annualRatePct: rate, minPayment };
}

const DEFAULT_DEBTS: DebtItemInput[] = [
  newDebt("Credit card", 80000, 36, 4000),
  newDebt("Personal loan", 200000, 14, 6500),
];

export default function DebtPayoffCalculatorTool() {
  const [debts, setDebts] = useState<DebtItemInput[]>(DEFAULT_DEBTS);
  const [extra, setExtra] = useState(5000);
  const [strategy, setStrategy] = useState<DebtPayoffInput["strategy"]>("avalanche");

  const result = useMemo(
    () => calculateDebtPayoff({ debts, extraMonthlyPayment: extra, strategy }),
    [debts, extra, strategy]
  );

  function updateDebt(id: string, patch: Partial<DebtItemInput>) {
    setDebts((prev) => prev.map((d) => (d.id === id ? { ...d, ...patch } : d)));
  }

  function removeDebt(id: string) {
    setDebts((prev) => prev.filter((d) => d.id !== id));
  }

  function addDebt() {
    setDebts((prev) => [...prev, newDebt("Other debt", 50000, 12, 2000)]);
  }

  const years = Math.floor(result.monthsToPayoff / 12);
  const months = result.monthsToPayoff % 12;

  return (
    <div className="rounded-xl2 border border-ink-900/8 bg-paper-100/60 p-5 sm:p-8">
      <div className="space-y-4">
        {debts.map((debt) => (
          <div
            key={debt.id}
            className="grid gap-3 rounded-xl border border-ink-900/8 bg-paper-50 p-4 sm:grid-cols-[1.2fr_1fr_1fr_1fr_auto] sm:items-end"
          >
            <label className="block">
              <span className="text-xs font-medium text-ink-800">Name</span>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border border-ink-900/12 bg-paper-50 px-3 py-2 text-sm text-ink-900 outline-none focus:border-signal"
                value={debt.name}
                onChange={(e) => updateDebt(debt.id, { name: e.target.value })}
              />
            </label>
            <NumberField
              label="Outstanding (₹)"
              value={debt.outstanding}
              onChange={(v) => updateDebt(debt.id, { outstanding: v })}
              step={1000}
            />
            <NumberField
              label="Rate (% p.a.)"
              value={debt.annualRatePct}
              onChange={(v) => updateDebt(debt.id, { annualRatePct: v })}
              step={0.5}
            />
            <NumberField
              label="Min payment (₹)"
              value={debt.minPayment}
              onChange={(v) => updateDebt(debt.id, { minPayment: v })}
              step={100}
            />
            <button
              type="button"
              onClick={() => removeDebt(debt.id)}
              className="justify-self-end rounded-lg border border-ink-900/12 p-2.5 text-ink-600 transition hover:border-danger/40 hover:text-danger"
              aria-label={`Remove ${debt.name}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addDebt}
          className="flex items-center gap-1.5 rounded-full border border-dashed border-ink-900/20 px-4 py-2 text-sm font-medium text-ink-700 transition hover:border-ink-900/40"
        >
          <Plus size={16} /> Add another debt
        </button>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <NumberField
          label="Extra monthly payment"
          value={extra}
          onChange={setExtra}
          suffix="₹"
          step={500}
        />
        <div>
          <span className="text-sm font-medium text-ink-800">Payoff strategy</span>
          <div className="mt-1.5 flex gap-2">
            <button
              type="button"
              onClick={() => setStrategy("avalanche")}
              className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium transition ${
                strategy === "avalanche"
                  ? "bg-ink-900 text-paper-50"
                  : "border border-ink-900/12 bg-paper-50 text-ink-700"
              }`}
            >
              Avalanche (highest rate first)
            </button>
            <button
              type="button"
              onClick={() => setStrategy("snowball")}
              className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium transition ${
                strategy === "snowball"
                  ? "bg-ink-900 text-paper-50"
                  : "border border-ink-900/12 bg-paper-50 text-ink-700"
              }`}
            >
              Snowball (smallest balance first)
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-ink-900 p-5 text-paper-50">
          <p className="text-xs uppercase tracking-wide text-paper-200/70">Debt-free in</p>
          <p className="mt-1 font-display text-2xl font-semibold tabular">
            {years}y {months}m
          </p>
        </div>
        <div className="rounded-xl border border-ink-900/8 bg-paper-50 p-5">
          <p className="text-xs uppercase tracking-wide text-ink-600">Total outstanding</p>
          <p className="mt-1 font-display text-2xl font-semibold text-ink-900 tabular">
            {formatINR(result.totalOutstanding)}
          </p>
        </div>
        <div className="rounded-xl border border-ink-900/8 bg-paper-50 p-5">
          <p className="text-xs uppercase tracking-wide text-ink-600">Total interest paid</p>
          <p className="mt-1 font-display text-2xl font-semibold text-warn tabular">
            {formatINR(result.totalInterestPaid)}
          </p>
        </div>
      </div>

      {result.payoffOrder.length > 0 && (
        <div className="mt-6 rounded-xl border border-ink-900/8 bg-paper-50 p-5">
          <p className="font-display text-sm font-semibold text-ink-900">Payoff order</p>
          <ol className="mt-2 list-inside list-decimal text-sm text-ink-700">
            {result.payoffOrder.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
