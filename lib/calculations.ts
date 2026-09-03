import {
  FinancialInput,
  CalculatedMetrics,
  HealthScore,
  ExpenseItem,
} from "./types";

const ESSENTIAL_EXPENSE_NAMES = new Set([
  "rent / housing",
  "food",
  "utilities",
  "transport",
  "insurance",
]);

function isEssential(expense: ExpenseItem): boolean {
  return ESSENTIAL_EXPENSE_NAMES.has(expense.name.trim().toLowerCase());
}

export function calculateMetrics(input: FinancialInput): CalculatedMetrics {
  const totalIncome = safe(input.monthlyIncome) + safe(input.additionalIncome);

  const totalMonthlyExpenses = input.expenses.reduce(
    (sum, e) => sum + safe(e.amount),
    0
  );

  const essentialMonthlyExpenses = input.expenses
    .filter(isEssential)
    .reduce((sum, e) => sum + safe(e.amount), 0);

  // Fall back to total expenses if nothing is tagged essential, so the
  // emergency-fund estimate still means something.
  const essentialBase =
    essentialMonthlyExpenses > 0 ? essentialMonthlyExpenses : totalMonthlyExpenses;

  const totalOutstandingDebt = input.loans.reduce(
    (sum, l) => sum + safe(l.outstanding),
    0
  );
  const totalEMI = input.loans.reduce((sum, l) => sum + safe(l.emi), 0);

  const monthlySIP = safe(input.investments.sip);
  const totalInvestmentValue =
    safe(input.investments.stocks) +
    safe(input.investments.mutualFunds) +
    safe(input.investments.fd) +
    safe(input.investments.gold) +
    safe(input.investments.other);

  const monthlySurplus = totalIncome - totalMonthlyExpenses - totalEMI - monthlySIP;

  const savingsRate = totalIncome > 0 ? monthlySurplus / totalIncome : 0;
  const debtToIncomeRatio = totalIncome > 0 ? totalEMI / totalIncome : 0;
  const emergencyFundCoverageMonths =
    essentialBase > 0 ? safe(input.savings.emergencyFund) / essentialBase : 0;

  return {
    totalIncome,
    totalMonthlyExpenses,
    essentialMonthlyExpenses: essentialBase,
    totalOutstandingDebt,
    totalEMI,
    monthlySIP,
    totalInvestmentValue,
    monthlySurplus,
    savingsRate,
    debtToIncomeRatio,
    emergencyFundCoverageMonths,
  };
}

function safe(n: number | undefined | null): number {
  if (n === undefined || n === null || Number.isNaN(n) || n < 0) return 0;
  return n;
}

export function calculateHealthScore(
  input: FinancialInput,
  metrics: CalculatedMetrics
): HealthScore {
  // Cash flow — up to 20 points, scaled by savings rate.
  let cashFlow = 0;
  if (metrics.totalIncome > 0) {
    if (metrics.savingsRate >= 0.3) cashFlow = 20;
    else if (metrics.savingsRate >= 0.15) cashFlow = 16;
    else if (metrics.savingsRate >= 0.05) cashFlow = 12;
    else if (metrics.savingsRate >= 0) cashFlow = 8;
    else cashFlow = 0;
  }

  // Emergency fund — up to 20 points, scaled by months of coverage (target 6 months).
  const efMonths = metrics.emergencyFundCoverageMonths;
  const emergencyFund = Math.round(Math.min(20, (efMonths / 6) * 20));

  // Debt — up to 20 points, penalized by debt-to-income ratio.
  let debt = 20;
  if (metrics.totalEMI > 0 || metrics.totalOutstandingDebt > 0) {
    const dti = metrics.debtToIncomeRatio;
    if (dti > 0.5) debt = 2;
    else if (dti > 0.4) debt = 6;
    else if (dti > 0.3) debt = 10;
    else if (dti > 0.2) debt = 14;
    else if (dti > 0.1) debt = 18;
    else debt = 20;
  }

  // Savings — up to 20 points, based on savings rate + presence of other savings.
  let savings = Math.round(Math.min(14, Math.max(0, metrics.savingsRate) * 60));
  if (safe(input.savings.otherSavings) > 0) savings = Math.min(20, savings + 6);

  // Investments — up to 20 points, scaled by SIP as a share of income.
  let investments = 0;
  if (metrics.totalIncome > 0) {
    const sipRatio = metrics.monthlySIP / metrics.totalIncome;
    investments = Math.round(Math.min(16, sipRatio * 80));
    if (metrics.totalInvestmentValue > 0) investments = Math.min(20, investments + 4);
  }

  // Goals — up to 0 points by default (informational only, per spec example),
  // but we give a small nudge for having at least articulated goals.
  const goals = input.goals.length > 0 ? 0 : 0;

  const rawScore = cashFlow + emergencyFund + debt + savings + investments + goals;
  const score = Math.max(0, Math.min(100, rawScore));

  let label = "Needs attention";
  if (score >= 85) label = "Excellent standing";
  else if (score >= 70) label = "Good foundation";
  else if (score >= 50) label = "Building steadily";
  else if (score >= 30) label = "Getting started";

  return {
    score,
    label,
    breakdown: { cashFlow, emergencyFund, debt, savings, investments, goals },
  };
}

export interface EMIInput {
  principal: number;
  annualRate: number; // percent, e.g. 8.5
  tenureYears: number;
  extraMonthlyPayment?: number;
}

export interface EMIYearRow {
  year: number;
  principalPaid: number;
  interestPaid: number;
  balance: number;
}

export interface EMIResult {
  emi: number;
  totalPayment: number;
  totalInterest: number;
  schedule: EMIYearRow[];
  // Populated only when extraMonthlyPayment > 0.
  withExtra?: {
    monthsToPayoff: number;
    totalInterest: number;
    interestSaved: number;
    monthsSaved: number;
  };
}

/**
 * Standard reducing-balance EMI calculation:
 * EMI = P * r * (1+r)^n / ((1+r)^n - 1), where r is the monthly rate.
 */
export function calculateEMI(input: EMIInput): EMIResult {
  const principal = safe(input.principal);
  const months = Math.max(1, Math.round(safe(input.tenureYears) * 12));
  const monthlyRate = safe(input.annualRate) / 12 / 100;

  const emi =
    monthlyRate > 0
      ? (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
      : principal / months;

  const schedule: EMIYearRow[] = [];
  let balance = principal;
  let yearPrincipal = 0;
  let yearInterest = 0;
  let year = 1;

  for (let m = 1; m <= months; m++) {
    const interestPortion = balance * monthlyRate;
    const principalPortion = Math.min(emi - interestPortion, balance);
    balance = Math.max(0, balance - principalPortion);
    yearPrincipal += principalPortion;
    yearInterest += interestPortion;

    if (m % 12 === 0 || m === months) {
      schedule.push({
        year,
        principalPaid: yearPrincipal,
        interestPaid: yearInterest,
        balance,
      });
      year++;
      yearPrincipal = 0;
      yearInterest = 0;
    }
  }

  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  const result: EMIResult = { emi, totalPayment, totalInterest, schedule };

  const extra = safe(input.extraMonthlyPayment);
  if (extra > 0) {
    let extraBalance = principal;
    let extraInterestTotal = 0;
    let m = 0;
    while (extraBalance > 0 && m < 12 * 100) {
      m++;
      const interestPortion = extraBalance * monthlyRate;
      const payment = emi + extra;
      const principalPortion = Math.min(payment - interestPortion, extraBalance);
      extraBalance = Math.max(0, extraBalance - principalPortion);
      extraInterestTotal += interestPortion;
    }
    result.withExtra = {
      monthsToPayoff: m,
      totalInterest: extraInterestTotal,
      interestSaved: totalInterest - extraInterestTotal,
      monthsSaved: months - m,
    };
  }

  return result;
}

export function formatINR(amount: number): string {
  const rounded = Math.round(amount);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rounded);
}
