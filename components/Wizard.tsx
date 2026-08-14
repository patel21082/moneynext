"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Plus, Trash2, Loader2 } from "lucide-react";
import {
  FinancialInput,
  ExpenseItem,
  LoanItem,
  LoanType,
  GoalId,
} from "@/lib/types";
import { formatINR } from "@/lib/calculations";

const STEPS = [
  { id: 1, label: "Income" },
  { id: 2, label: "Expenses" },
  { id: 3, label: "Loans" },
  { id: 4, label: "Investments" },
  { id: 5, label: "Goals" },
  { id: 6, label: "Analyze" },
];

const DEFAULT_EXPENSE_NAMES = [
  "Rent / Housing",
  "Food",
  "Utilities",
  "Transport",
  "Insurance",
  "Education",
  "Entertainment",
  "Shopping",
];

const LOAN_TYPES: LoanType[] = [
  "Home loan",
  "Personal loan",
  "Car loan",
  "Education loan",
  "Credit card",
  "Other",
];

const GOALS: { id: GoalId; label: string }[] = [
  { id: "emergency_fund", label: "Build emergency fund" },
  { id: "debt_free", label: "Become debt free" },
  { id: "increase_investments", label: "Increase investments" },
  { id: "buy_house", label: "Buy a house" },
  { id: "buy_car", label: "Buy a car" },
  { id: "retirement", label: "Retirement" },
  { id: "marriage", label: "Marriage" },
  { id: "child_education", label: "Child education" },
  { id: "travel", label: "Travel" },
  { id: "build_savings", label: "Build savings" },
  { id: "other", label: "Other" },
];

const QUESTION_EXAMPLES = [
  "What should I do with my extra money?",
  "Should I increase my SIP?",
  "Should I repay my loan faster?",
  "How should I build my emergency fund?",
  "What should my next financial priority be?",
];

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `f${idCounter}-${Date.now().toString(36)}`;
}

function emptyInput(): FinancialInput {
  return {
    monthlyIncome: NaN as unknown as number,
    additionalIncome: 0,
    expenses: [],
    loans: [],
    investments: { sip: 0, stocks: 0, mutualFunds: 0, fd: 0, gold: 0, other: 0 },
    savings: { emergencyFund: 0, otherSavings: 0 },
    goals: [],
    goalNotes: "",
    question: "",
  };
}

interface WizardProps {
  onAnalyze: (input: FinancialInput) => void;
  loading: boolean;
  errorMessage: string | null;
}

export default function Wizard({ onAnalyze, loading, errorMessage }: WizardProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FinancialInput>(emptyInput());
  const [incomeError, setIncomeError] = useState<string | null>(null);

  const totalExpenses = useMemo(
    () => data.expenses.reduce((sum, e) => sum + (Number.isFinite(e.amount) ? e.amount : 0), 0),
    [data.expenses]
  );
  const totalDebt = useMemo(
    () => data.loans.reduce((sum, l) => sum + (Number.isFinite(l.outstanding) ? l.outstanding : 0), 0),
    [data.loans]
  );
  const totalEMI = useMemo(
    () => data.loans.reduce((sum, l) => sum + (Number.isFinite(l.emi) ? l.emi : 0), 0),
    [data.loans]
  );

  function goNext() {
    if (step === 1) {
      if (!Number.isFinite(data.monthlyIncome) || data.monthlyIncome <= 0) {
        setIncomeError("Enter your monthly take-home income to continue.");
        return;
      }
      if (data.monthlyIncome > 100_00_00_000) {
        setIncomeError("That amount looks too large. Please check the value.");
        return;
      }
      setIncomeError(null);
    }
    setStep((s) => Math.min(6, s + 1));
  }

  function goBack() {
    setStep((s) => Math.max(1, s - 1));
  }

  function skip() {
    setStep((s) => Math.min(6, s + 1));
  }

  return (
    <section id="analysis" className="bg-paper-100/50 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <ProgressBar step={step} />

        <div className="mt-8 rounded-xl2 border border-ink-900/8 bg-white p-6 shadow-[0_20px_50px_-30px_rgba(11,18,32,0.2)] sm:p-9">
          {step === 1 && (
            <StepIncome
              data={data}
              setData={setData}
              error={incomeError}
              clearError={() => setIncomeError(null)}
            />
          )}
          {step === 2 && <StepExpenses data={data} setData={setData} total={totalExpenses} />}
          {step === 3 && (
            <StepLoans data={data} setData={setData} totalDebt={totalDebt} totalEMI={totalEMI} />
          )}
          {step === 4 && <StepInvestments data={data} setData={setData} />}
          {step === 5 && <StepGoals data={data} setData={setData} />}
          {step === 6 && <StepQuestion data={data} setData={setData} />}

          {errorMessage && step === 6 && (
            <p role="alert" className="mt-4 rounded-lg bg-danger-soft px-4 py-3 text-sm text-danger">
              {errorMessage}
            </p>
          )}

          <div className="mt-9 flex items-center justify-between gap-3 border-t border-ink-900/6 pt-6">
            <button
              onClick={goBack}
              disabled={step === 1}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-ink-700 transition hover:bg-paper-100 disabled:opacity-0"
            >
              <ArrowLeft size={16} /> Back
            </button>

            <div className="flex items-center gap-3">
              {(step === 3 || step === 4) && (
                <button
                  onClick={skip}
                  className="rounded-full px-4 py-2.5 text-sm font-medium text-ink-600 transition hover:bg-paper-100"
                >
                  Skip
                </button>
              )}

              {step < 6 ? (
                <button
                  onClick={goNext}
                  className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800"
                >
                  Continue <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={() => onAnalyze(data)}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-medium text-white transition hover:bg-signal-dim disabled:opacity-70"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                  {loading ? "Analyzing…" : "Analyze My Financial Situation"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgressBar({ step }: { step: number }) {
  return (
    <ol className="flex flex-wrap items-center justify-center gap-2 sm:gap-3" aria-label="Wizard progress">
      {STEPS.map((s) => {
        const state = s.id === step ? "current" : s.id < step ? "done" : "upcoming";
        return (
          <li key={s.id} className="flex items-center gap-2">
            <span
              aria-current={state === "current" ? "step" : undefined}
              className={`flex h-8 min-w-8 items-center justify-center rounded-full px-2.5 font-mono text-xs font-medium tabular transition ${
                state === "current"
                  ? "bg-signal text-white"
                  : state === "done"
                  ? "bg-gain-soft text-gain"
                  : "bg-white text-ink-600/50 ring-1 ring-inset ring-ink-900/8"
              }`}
            >
              {String(s.id).padStart(2, "0")}
            </span>
            <span
              className={`hidden text-xs sm:inline ${
                state === "current" ? "font-medium text-ink-900" : "text-ink-600/60"
              }`}
            >
              {s.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/* ---------------- Step 1: Income ---------------- */

function StepIncome({
  data,
  setData,
  error,
  clearError,
}: {
  data: FinancialInput;
  setData: React.Dispatch<React.SetStateAction<FinancialInput>>;
  error: string | null;
  clearError: () => void;
}) {
  return (
    <div className="animate-fadeIn">
      <StepHeading title="What's your monthly take-home income?" />
      <p className="mb-6 text-sm text-ink-600">
        Use the amount you actually receive after taxes and deductions.
      </p>

      <label htmlFor="income" className="mb-1.5 block text-sm font-medium text-ink-800">
        Monthly income
      </label>
      <CurrencyInput
        id="income"
        value={data.monthlyIncome}
        onChange={(v) => {
          clearError();
          setData((d) => ({ ...d, monthlyIncome: v }));
        }}
        placeholder="80,000"
        error={error}
      />
      {error && (
        <p role="alert" className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}

      <label htmlFor="additional-income" className="mb-1.5 mt-6 block text-sm font-medium text-ink-800">
        Additional monthly income <span className="font-normal text-ink-600">(optional)</span>
      </label>
      <CurrencyInput
        id="additional-income"
        value={data.additionalIncome}
        onChange={(v) => setData((d) => ({ ...d, additionalIncome: v }))}
        placeholder="0"
      />
    </div>
  );
}

/* ---------------- Step 2: Expenses ---------------- */

function StepExpenses({
  data,
  setData,
  total,
}: {
  data: FinancialInput;
  setData: React.Dispatch<React.SetStateAction<FinancialInput>>;
  total: number;
}) {
  function ensureDefaults() {
    if (data.expenses.length > 0) return;
    setData((d) => ({
      ...d,
      expenses: DEFAULT_EXPENSE_NAMES.map((name) => ({
        id: nextId(),
        name,
        amount: NaN as unknown as number,
      })),
    }));
  }

  useEffect(() => {
    ensureDefaults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateExpense(id: string, patch: Partial<ExpenseItem>) {
    setData((d) => ({
      ...d,
      expenses: d.expenses.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }));
  }

  function removeExpense(id: string) {
    setData((d) => ({ ...d, expenses: d.expenses.filter((e) => e.id !== id) }));
  }

  function addExpense() {
    setData((d) => ({
      ...d,
      expenses: [...d.expenses, { id: nextId(), name: "Other", amount: NaN as unknown as number }],
    }));
  }

  return (
    <div className="animate-fadeIn">
      <StepHeading title="What are your monthly expenses?" />
      <p className="mb-6 text-sm text-ink-600">Add each regular monthly expense and its amount.</p>

      <div className="space-y-3">
        {data.expenses.map((expense) => (
          <div key={expense.id} className="flex items-center gap-2">
            <input
              type="text"
              value={expense.name}
              onChange={(e) => updateExpense(expense.id, { name: e.target.value })}
              aria-label="Expense name"
              className="w-2/5 rounded-lg border border-ink-900/10 bg-paper-50 px-3 py-2.5 text-sm text-ink-900 focus-visible:bg-white sm:w-1/2"
            />
            <div className="flex-1">
              <CurrencyInput
                value={expense.amount}
                onChange={(v) => updateExpense(expense.id, { amount: v })}
                placeholder="0"
                compact
              />
            </div>
            <button
              onClick={() => removeExpense(expense.id)}
              aria-label={`Remove ${expense.name}`}
              className="rounded-lg p-2.5 text-ink-600/50 transition hover:bg-danger-soft hover:text-danger"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addExpense}
        className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 px-4 py-2 text-sm font-medium text-ink-700 transition hover:bg-paper-100"
      >
        <Plus size={15} /> Add expense
      </button>

      <div className="mt-7 flex items-center justify-between rounded-xl bg-paper-100 px-5 py-4">
        <span className="text-sm text-ink-700">Total monthly expenses</span>
        <span className="font-mono text-lg font-semibold tabular text-ink-900">{formatINR(total)}</span>
      </div>
    </div>
  );
}

/* ---------------- Step 3: Loans ---------------- */

function StepLoans({
  data,
  setData,
  totalDebt,
  totalEMI,
}: {
  data: FinancialInput;
  setData: React.Dispatch<React.SetStateAction<FinancialInput>>;
  totalDebt: number;
  totalEMI: number;
}) {
  function addLoan(type: LoanType) {
    setData((d) => ({
      ...d,
      loans: [
        ...d.loans,
        {
          id: nextId(),
          type,
          outstanding: NaN as unknown as number,
          emi: NaN as unknown as number,
          interestRate: NaN as unknown as number,
          remainingMonths: NaN as unknown as number,
        },
      ],
    }));
  }

  function updateLoan(id: string, patch: Partial<LoanItem>) {
    setData((d) => ({ ...d, loans: d.loans.map((l) => (l.id === id ? { ...l, ...patch } : l)) }));
  }

  function removeLoan(id: string) {
    setData((d) => ({ ...d, loans: d.loans.filter((l) => l.id !== id) }));
  }

  return (
    <div className="animate-fadeIn">
      <StepHeading title="Do you currently have any loans or debt?" />
      <p className="mb-6 text-sm text-ink-600">Add each loan you're repaying. Skip this step if none apply.</p>

      <div className="flex flex-wrap gap-2">
        {LOAN_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => addLoan(type)}
            className="rounded-full border border-ink-900/10 px-3.5 py-1.5 text-xs font-medium text-ink-700 transition hover:bg-paper-100"
          >
            + {type}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {data.loans.map((loan) => (
          <div key={loan.id} className="rounded-xl border border-ink-900/8 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-ink-900">{loan.type}</span>
              <button
                onClick={() => removeLoan(loan.id)}
                aria-label={`Remove ${loan.type}`}
                className="rounded-lg p-1.5 text-ink-600/50 transition hover:bg-danger-soft hover:text-danger"
              >
                <Trash2 size={15} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Field label="Outstanding">
                <CurrencyInput
                  value={loan.outstanding}
                  onChange={(v) => updateLoan(loan.id, { outstanding: v })}
                  placeholder="0"
                  compact
                />
              </Field>
              <Field label="EMI">
                <CurrencyInput
                  value={loan.emi}
                  onChange={(v) => updateLoan(loan.id, { emi: v })}
                  placeholder="0"
                  compact
                />
              </Field>
              <Field label="Interest %">
                <NumberInput
                  value={loan.interestRate}
                  onChange={(v) => updateLoan(loan.id, { interestRate: v })}
                  placeholder="0"
                />
              </Field>
              <Field label="Remaining (months)">
                <NumberInput
                  value={loan.remainingMonths}
                  onChange={(v) => updateLoan(loan.id, { remainingMonths: v })}
                  placeholder="0"
                />
              </Field>
            </div>
          </div>
        ))}
        {data.loans.length === 0 && (
          <p className="rounded-xl bg-paper-100 px-4 py-6 text-center text-sm text-ink-600">
            No loans added. Tap a loan type above to add one, or continue if debt-free.
          </p>
        )}
      </div>

      {data.loans.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-3">
          <SummaryTile label="Total outstanding debt" value={formatINR(totalDebt)} />
          <SummaryTile label="Total monthly EMI" value={formatINR(totalEMI)} />
        </div>
      )}
    </div>
  );
}

/* ---------------- Step 4: Investments & Savings ---------------- */

function StepInvestments({
  data,
  setData,
}: {
  data: FinancialInput;
  setData: React.Dispatch<React.SetStateAction<FinancialInput>>;
}) {
  return (
    <div className="animate-fadeIn">
      <StepHeading title="Savings and investments" />

      <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-ink-600/60">Savings</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Emergency fund">
          <CurrencyInput
            value={data.savings.emergencyFund}
            onChange={(v) => setData((d) => ({ ...d, savings: { ...d.savings, emergencyFund: v } }))}
            placeholder="0"
          />
        </Field>
        <Field label="Other savings">
          <CurrencyInput
            value={data.savings.otherSavings}
            onChange={(v) => setData((d) => ({ ...d, savings: { ...d.savings, otherSavings: v } }))}
            placeholder="0"
          />
        </Field>
      </div>

      <p className="mb-3 mt-7 text-xs font-medium uppercase tracking-[0.14em] text-ink-600/60">
        Investments
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="SIP / month">
          <CurrencyInput
            value={data.investments.sip}
            onChange={(v) => setData((d) => ({ ...d, investments: { ...d.investments, sip: v } }))}
            placeholder="0"
          />
        </Field>
        <Field label="Stocks">
          <CurrencyInput
            value={data.investments.stocks}
            onChange={(v) => setData((d) => ({ ...d, investments: { ...d.investments, stocks: v } }))}
            placeholder="0"
          />
        </Field>
        <Field label="Mutual funds">
          <CurrencyInput
            value={data.investments.mutualFunds}
            onChange={(v) => setData((d) => ({ ...d, investments: { ...d.investments, mutualFunds: v } }))}
            placeholder="0"
          />
        </Field>
        <Field label="Fixed deposits">
          <CurrencyInput
            value={data.investments.fd}
            onChange={(v) => setData((d) => ({ ...d, investments: { ...d.investments, fd: v } }))}
            placeholder="0"
          />
        </Field>
        <Field label="Gold">
          <CurrencyInput
            value={data.investments.gold}
            onChange={(v) => setData((d) => ({ ...d, investments: { ...d.investments, gold: v } }))}
            placeholder="0"
          />
        </Field>
        <Field label="Other investments">
          <CurrencyInput
            value={data.investments.other}
            onChange={(v) => setData((d) => ({ ...d, investments: { ...d.investments, other: v } }))}
            placeholder="0"
          />
        </Field>
      </div>
    </div>
  );
}

/* ---------------- Step 5: Goals ---------------- */

function StepGoals({
  data,
  setData,
}: {
  data: FinancialInput;
  setData: React.Dispatch<React.SetStateAction<FinancialInput>>;
}) {
  function toggleGoal(id: GoalId) {
    setData((d) => ({
      ...d,
      goals: d.goals.includes(id) ? d.goals.filter((g) => g !== id) : [...d.goals, id],
    }));
  }

  return (
    <div className="animate-fadeIn">
      <StepHeading title="What are your financial goals?" />
      <p className="mb-6 text-sm text-ink-600">Select all that apply.</p>

      <div className="flex flex-wrap gap-2">
        {GOALS.map((goal) => {
          const active = data.goals.includes(goal.id);
          return (
            <button
              key={goal.id}
              onClick={() => toggleGoal(goal.id)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                active
                  ? "border-signal bg-signal text-white"
                  : "border-ink-900/10 text-ink-700 hover:bg-paper-100"
              }`}
            >
              {goal.label}
            </button>
          );
        })}
      </div>

      <label htmlFor="goal-notes" className="mb-1.5 mt-7 block text-sm font-medium text-ink-800">
        Tell us anything else about your situation
      </label>
      <textarea
        id="goal-notes"
        value={data.goalNotes}
        onChange={(e) => setData((d) => ({ ...d, goalNotes: e.target.value.slice(0, 800) }))}
        placeholder="Example: I want to become debt free within 3 years."
        rows={4}
        className="w-full resize-none rounded-lg border border-ink-900/10 bg-paper-50 px-4 py-3 text-sm text-ink-900 focus-visible:bg-white"
      />
    </div>
  );
}

/* ---------------- Step 6: Question ---------------- */

function StepQuestion({
  data,
  setData,
}: {
  data: FinancialInput;
  setData: React.Dispatch<React.SetStateAction<FinancialInput>>;
}) {
  return (
    <div className="animate-fadeIn">
      <StepHeading title="What do you want to know?" />

      <div className="mb-4 flex flex-wrap gap-2">
        {QUESTION_EXAMPLES.map((q) => (
          <button
            key={q}
            onClick={() => setData((d) => ({ ...d, question: q }))}
            className="rounded-full border border-ink-900/10 px-3.5 py-1.5 text-xs text-ink-600 transition hover:bg-paper-100"
          >
            {q}
          </button>
        ))}
      </div>

      <textarea
        value={data.question}
        onChange={(e) => setData((d) => ({ ...d, question: e.target.value.slice(0, 500) }))}
        placeholder="What should I do next with my money?"
        rows={3}
        aria-label="Your question"
        className="w-full resize-none rounded-lg border border-ink-900/10 bg-paper-50 px-4 py-3 text-sm text-ink-900 focus-visible:bg-white"
      />
    </div>
  );
}

/* ---------------- Shared bits ---------------- */

function StepHeading({ title }: { title: string }) {
  return <h3 className="mb-1 font-display text-2xl font-semibold text-ink-900">{title}</h3>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-ink-600">{label}</label>
      {children}
    </div>
  );
}

function SummaryTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-paper-100 px-4 py-3.5">
      <p className="text-xs text-ink-600">{label}</p>
      <p className="mt-1 font-mono text-base font-semibold tabular text-ink-900">{value}</p>
    </div>
  );
}

function CurrencyInput({
  id,
  value,
  onChange,
  placeholder,
  error,
  compact,
}: {
  id?: string;
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
  error?: string | null;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg border bg-paper-50 px-3.5 focus-within:bg-white ${
        error ? "border-danger" : "border-ink-900/10"
      } ${compact ? "py-2" : "py-3"}`}
    >
      <span className="text-sm text-ink-600/70">₹</span>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={0}
        value={Number.isFinite(value) ? value : ""}
        onChange={(e) => onChange(e.target.value === "" ? (NaN as unknown as number) : Number(e.target.value))}
        placeholder={placeholder}
        className="w-full bg-transparent font-mono text-sm tabular text-ink-900 outline-none"
      />
    </div>
  );
}

function NumberInput({
  value,
  onChange,
  placeholder,
}: {
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex items-center rounded-lg border border-ink-900/10 bg-paper-50 px-3.5 py-2 focus-within:bg-white">
      <input
        type="number"
        inputMode="decimal"
        min={0}
        value={Number.isFinite(value) ? value : ""}
        onChange={(e) => onChange(e.target.value === "" ? (NaN as unknown as number) : Number(e.target.value))}
        placeholder={placeholder}
        className="w-full bg-transparent font-mono text-sm tabular text-ink-900 outline-none"
      />
    </div>
  );
}
