export interface ExpenseItem {
  id: string;
  name: string;
  amount: number;
}

export type LoanType =
  | "Home loan"
  | "Personal loan"
  | "Car loan"
  | "Education loan"
  | "Credit card"
  | "Other";

export interface LoanItem {
  id: string;
  type: LoanType;
  outstanding: number;
  emi: number;
  interestRate: number;
  remainingMonths: number;
}

export interface InvestmentData {
  sip: number;
  stocks: number;
  mutualFunds: number;
  fd: number;
  gold: number;
  other: number;
}

export interface SavingsData {
  emergencyFund: number;
  otherSavings: number;
}

export type GoalId =
  | "emergency_fund"
  | "debt_free"
  | "increase_investments"
  | "buy_house"
  | "buy_car"
  | "retirement"
  | "marriage"
  | "child_education"
  | "travel"
  | "build_savings"
  | "other";

export interface FinancialInput {
  monthlyIncome: number;
  additionalIncome: number;
  expenses: ExpenseItem[];
  loans: LoanItem[];
  investments: InvestmentData;
  savings: SavingsData;
  goals: GoalId[];
  goalNotes: string;
  question: string;
}

export interface CalculatedMetrics {
  totalIncome: number;
  totalMonthlyExpenses: number;
  essentialMonthlyExpenses: number;
  totalOutstandingDebt: number;
  totalEMI: number;
  monthlySIP: number;
  totalInvestmentValue: number;
  monthlySurplus: number;
  savingsRate: number;
  debtToIncomeRatio: number;
  emergencyFundCoverageMonths: number;
}

export interface HealthScoreBreakdown {
  cashFlow: number;
  emergencyFund: number;
  debt: number;
  savings: number;
  investments: number;
  goals: number;
}

export interface HealthScore {
  score: number;
  label: string;
  breakdown: HealthScoreBreakdown;
}

export interface AIPriority {
  priority: number;
  title: string;
  description: string;
  reason: string;
  severity: "high" | "medium" | "low";
}

export interface AIRoadmapStage {
  period: string;
  actions: string[];
}

export interface AIAnalysisResponse {
  summary: string;
  financial_health: { score: number; label: string };
  priorities: AIPriority[];
  roadmap: AIRoadmapStage[];
  warnings: string[];
  next_question_suggestions: string[];
}
