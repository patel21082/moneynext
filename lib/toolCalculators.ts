// Pure, framework-free calculation functions for the standalone tool pages
// (/tools/*). Kept separate from lib/calculations.ts, which is specific to
// the financial-planner wizard's FinancialInput/HealthScore shapes.

function safe(n: number | undefined | null): number {
  if (n === undefined || n === null || Number.isNaN(n) || n < 0) return 0;
  return n;
}

// ---------------------------------------------------------------------------
// SIP Calculator
// ---------------------------------------------------------------------------

export interface SIPInput {
  monthlyInvestment: number;
  annualReturnPct: number;
  years: number;
  stepUpPct?: number; // optional annual step-up in the monthly contribution
}

export interface SIPYearRow {
  year: number;
  invested: number;
  value: number;
}

export interface SIPResult {
  totalInvested: number;
  estimatedReturns: number;
  futureValue: number;
  schedule: SIPYearRow[];
}

/**
 * Future value of a monthly SIP, compounded monthly, with an optional annual
 * step-up applied to the contribution at the start of each new year.
 */
export function calculateSIP(input: SIPInput): SIPResult {
  const years = Math.max(1, Math.round(safe(input.years)));
  const monthlyRate = safe(input.annualReturnPct) / 12 / 100;
  const stepUp = safe(input.stepUpPct) / 100;

  let contribution = safe(input.monthlyInvestment);
  let value = 0;
  let invested = 0;
  const schedule: SIPYearRow[] = [];

  for (let y = 1; y <= years; y++) {
    for (let m = 1; m <= 12; m++) {
      value = value * (1 + monthlyRate) + contribution;
      invested += contribution;
    }
    schedule.push({ year: y, invested, value });
    contribution = contribution * (1 + stepUp);
  }

  return {
    totalInvested: invested,
    estimatedReturns: value - invested,
    futureValue: value,
    schedule,
  };
}

// ---------------------------------------------------------------------------
// Compound Interest Calculator
// ---------------------------------------------------------------------------

export interface CompoundInterestInput {
  principal: number;
  monthlyContribution: number;
  annualRatePct: number;
  years: number;
  compoundingFrequency: "annually" | "semi-annually" | "quarterly" | "monthly";
}

export interface CompoundInterestYearRow {
  year: number;
  invested: number;
  value: number;
}

export interface CompoundInterestResult {
  totalInvested: number;
  estimatedInterest: number;
  finalValue: number;
  schedule: CompoundInterestYearRow[];
}

const COMPOUNDING_PERIODS_PER_YEAR: Record<CompoundInterestInput["compoundingFrequency"], number> = {
  annually: 1,
  "semi-annually": 2,
  quarterly: 4,
  monthly: 12,
};

export function calculateCompoundInterest(
  input: CompoundInterestInput
): CompoundInterestResult {
  const years = Math.max(1, Math.round(safe(input.years)));
  const n = COMPOUNDING_PERIODS_PER_YEAR[input.compoundingFrequency] ?? 12;
  const ratePerPeriod = safe(input.annualRatePct) / 100 / n;
  const monthsPerPeriod = 12 / n;
  const monthlyContribution = safe(input.monthlyContribution);

  let value = safe(input.principal);
  let invested = safe(input.principal);
  const schedule: CompoundInterestYearRow[] = [];

  const totalPeriods = years * n;
  let monthCounter = 0;

  for (let p = 1; p <= totalPeriods; p++) {
    // Add contributions made during this compounding period, then apply
    // interest on the period's ending balance (contribution-first ordering
    // is a common, conservative convention for retail SIP-style deposits).
    for (let i = 0; i < monthsPerPeriod; i++) {
      value += monthlyContribution;
      invested += monthlyContribution;
      monthCounter++;
    }
    value = value * (1 + ratePerPeriod);

    if (monthCounter % 12 === 0) {
      schedule.push({ year: monthCounter / 12, invested, value });
    }
  }

  return {
    totalInvested: invested,
    estimatedInterest: value - invested,
    finalValue: value,
    schedule,
  };
}

// ---------------------------------------------------------------------------
// Emergency Fund Calculator
// ---------------------------------------------------------------------------

export interface EmergencyFundInput {
  monthlyEssentialExpenses: number;
  existingEmergencySavings: number;
  incomeStability: "stable" | "variable" | "single_earner_variable";
  dependents: number;
}

export interface EmergencyFundResult {
  recommendedMonths: number;
  target3Month: number;
  target6Month: number;
  targetRecommended: number;
  currentCoverageMonths: number;
  shortfall: number;
}

export function calculateEmergencyFund(input: EmergencyFundInput): EmergencyFundResult {
  const monthlyExpenses = safe(input.monthlyEssentialExpenses);
  const existing = safe(input.existingEmergencySavings);
  const dependents = Math.max(0, Math.round(safe(input.dependents)));

  // Base recommendation by income stability, nudged up for dependents.
  let recommendedMonths = 6;
  if (input.incomeStability === "stable") recommendedMonths = 3;
  else if (input.incomeStability === "variable") recommendedMonths = 6;
  else if (input.incomeStability === "single_earner_variable") recommendedMonths = 9;

  if (dependents >= 3) recommendedMonths += 2;
  else if (dependents >= 1) recommendedMonths += 1;

  recommendedMonths = Math.min(12, recommendedMonths);

  const targetRecommended = monthlyExpenses * recommendedMonths;
  const currentCoverageMonths = monthlyExpenses > 0 ? existing / monthlyExpenses : 0;

  return {
    recommendedMonths,
    target3Month: monthlyExpenses * 3,
    target6Month: monthlyExpenses * 6,
    targetRecommended,
    currentCoverageMonths,
    shortfall: Math.max(0, targetRecommended - existing),
  };
}

// ---------------------------------------------------------------------------
// Debt Payoff Calculator
// ---------------------------------------------------------------------------

export interface DebtItemInput {
  id: string;
  name: string;
  outstanding: number;
  annualRatePct: number;
  minPayment: number;
}

export interface DebtPayoffInput {
  debts: DebtItemInput[];
  extraMonthlyPayment: number;
  strategy: "avalanche" | "snowball"; // avalanche = highest rate first, snowball = smallest balance first
}

export interface DebtPayoffResult {
  totalOutstanding: number;
  totalMinPayment: number;
  monthsToPayoff: number;
  totalInterestPaid: number;
  payoffOrder: string[]; // debt names in the order they get fully paid off
}

/**
 * Simulates month-by-month payoff across all debts: every debt gets its
 * minimum payment, and the extra payment is funneled entirely into whichever
 * debt is "first" under the chosen strategy until it's cleared, then rolls
 * onto the next one.
 */
export function calculateDebtPayoff(input: DebtPayoffInput): DebtPayoffResult {
  const debts = input.debts
    .filter((d) => safe(d.outstanding) > 0)
    .map((d) => ({
      id: d.id,
      name: d.name,
      balance: safe(d.outstanding),
      monthlyRate: safe(d.annualRatePct) / 12 / 100,
      minPayment: safe(d.minPayment),
    }));

  const totalOutstanding = debts.reduce((s, d) => s + d.balance, 0);
  const totalMinPayment = debts.reduce((s, d) => s + d.minPayment, 0);
  const extra = safe(input.extraMonthlyPayment);

  const payoffOrder: string[] = [];
  let totalInterestPaid = 0;
  let months = 0;
  const MAX_MONTHS = 12 * 100;

  const order = () =>
    [...debts]
      .filter((d) => d.balance > 0.01)
      .sort((a, b) =>
        input.strategy === "avalanche" ? b.monthlyRate - a.monthlyRate : a.balance - b.balance
      );

  while (debts.some((d) => d.balance > 0.01) && months < MAX_MONTHS) {
    months++;
    let pool = extra;

    // Apply minimum payments (interest first, then principal) to every debt.
    for (const d of debts) {
      if (d.balance <= 0.01) continue;
      const interest = d.balance * d.monthlyRate;
      totalInterestPaid += interest;
      const principalPortion = Math.min(d.minPayment - interest, d.balance);
      d.balance = Math.max(0, d.balance - Math.max(0, principalPortion));
    }

    // Funnel the extra payment down the priority order.
    for (const d of order()) {
      if (pool <= 0) break;
      if (d.balance <= 0.01) continue;
      const applied = Math.min(pool, d.balance);
      d.balance -= applied;
      pool -= applied;
    }

    // Record any debt that just hit zero this month.
    for (const d of debts) {
      if (d.balance <= 0.01 && !payoffOrder.includes(d.name)) {
        payoffOrder.push(d.name);
      }
    }
  }

  return {
    totalOutstanding,
    totalMinPayment,
    monthsToPayoff: months,
    totalInterestPaid,
    payoffOrder,
  };
}

// ---------------------------------------------------------------------------
// Savings Goal Calculator
// ---------------------------------------------------------------------------

export interface SavingsGoalInput {
  goalAmount: number;
  currentSavings: number;
  years: number;
  annualReturnPct: number;
}

export interface SavingsGoalResult {
  requiredMonthlyContribution: number;
  totalContributions: number;
  projectedGrowth: number;
}

/**
 * Solves for the level monthly contribution needed so that current savings
 * plus contributions, compounded monthly, reach the goal amount by the
 * target date.
 */
export function calculateSavingsGoal(input: SavingsGoalInput): SavingsGoalResult {
  const months = Math.max(1, Math.round(safe(input.years) * 12));
  const monthlyRate = safe(input.annualReturnPct) / 12 / 100;
  const goal = safe(input.goalAmount);
  const current = safe(input.currentSavings);

  const futureValueOfCurrent = current * Math.pow(1 + monthlyRate, months);
  const remainingGoal = Math.max(0, goal - futureValueOfCurrent);

  let requiredMonthlyContribution: number;
  if (monthlyRate > 0) {
    const annuityFactor = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
    requiredMonthlyContribution = remainingGoal / annuityFactor;
  } else {
    requiredMonthlyContribution = remainingGoal / months;
  }

  const totalContributions = requiredMonthlyContribution * months;

  return {
    requiredMonthlyContribution,
    totalContributions,
    projectedGrowth: goal - current - totalContributions,
  };
}
