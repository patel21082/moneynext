import { NextRequest, NextResponse } from "next/server";
import { FinancialInput, CalculatedMetrics, AIAnalysisResponse } from "@/lib/types";

export const runtime = "nodejs";

const MAX_QUESTION_LENGTH = 500;
const MAX_NOTES_LENGTH = 800;

// Very small in-memory rate limiter. Fine for a single-instance MVP;
// swap for a shared store (e.g. Redis) if deployed across multiple instances.
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (bucket.count >= RATE_LIMIT_MAX_REQUESTS) return false;
  bucket.count += 1;
  return true;
}

function isFiniteNonNegative(n: unknown): n is number {
  return typeof n === "number" && Number.isFinite(n) && n >= 0;
}

function validateInput(body: any): { input: FinancialInput; metrics: CalculatedMetrics } | null {
  if (!body || typeof body !== "object") return null;
  const { input, metrics } = body;
  if (!input || typeof input !== "object") return null;
  if (!isFiniteNonNegative(input.monthlyIncome)) return null;
  if (!Array.isArray(input.expenses)) return null;
  if (!Array.isArray(input.loans)) return null;
  if (!input.investments || typeof input.investments !== "object") return null;
  if (!input.savings || typeof input.savings !== "object") return null;
  if (!Array.isArray(input.goals)) return null;

  const question = typeof input.question === "string" ? input.question.slice(0, MAX_QUESTION_LENGTH) : "";
  const goalNotes = typeof input.goalNotes === "string" ? input.goalNotes.slice(0, MAX_NOTES_LENGTH) : "";

  const cleanedInput: FinancialInput = {
    monthlyIncome: input.monthlyIncome,
    additionalIncome: isFiniteNonNegative(input.additionalIncome) ? input.additionalIncome : 0,
    expenses: input.expenses
      .filter((e: any) => e && typeof e.name === "string" && isFiniteNonNegative(e.amount))
      .slice(0, 30)
      .map((e: any) => ({ id: String(e.id ?? ""), name: e.name.slice(0, 60), amount: e.amount })),
    loans: input.loans
      .filter((l: any) => l && typeof l.type === "string")
      .slice(0, 20)
      .map((l: any) => ({
        id: String(l.id ?? ""),
        type: String(l.type).slice(0, 40),
        outstanding: isFiniteNonNegative(l.outstanding) ? l.outstanding : 0,
        emi: isFiniteNonNegative(l.emi) ? l.emi : 0,
        interestRate: isFiniteNonNegative(l.interestRate) ? l.interestRate : 0,
        remainingMonths: isFiniteNonNegative(l.remainingMonths) ? l.remainingMonths : 0,
      })),
    investments: {
      sip: isFiniteNonNegative(input.investments.sip) ? input.investments.sip : 0,
      stocks: isFiniteNonNegative(input.investments.stocks) ? input.investments.stocks : 0,
      mutualFunds: isFiniteNonNegative(input.investments.mutualFunds) ? input.investments.mutualFunds : 0,
      fd: isFiniteNonNegative(input.investments.fd) ? input.investments.fd : 0,
      gold: isFiniteNonNegative(input.investments.gold) ? input.investments.gold : 0,
      other: isFiniteNonNegative(input.investments.other) ? input.investments.other : 0,
    },
    savings: {
      emergencyFund: isFiniteNonNegative(input.savings.emergencyFund) ? input.savings.emergencyFund : 0,
      otherSavings: isFiniteNonNegative(input.savings.otherSavings) ? input.savings.otherSavings : 0,
    },
    goals: input.goals.filter((g: any) => typeof g === "string").slice(0, 15),
    goalNotes,
    question: question || "What should I do next with my money?",
  };

  return { input: cleanedInput, metrics };
}

const SYSTEM_PROMPT = `You are a financial planning assistant.

Analyze the user's provided financial information.

Do not invent missing information.
Do not claim certainty.
Do not recommend specific financial products, stocks, securities, funds, insurance products or lenders.
Do not encourage risky investments.
Do not make guaranteed return claims.

Provide educational financial planning guidance.

Prioritize:
1. Financial stability
2. Emergency savings
3. High-cost debt awareness
4. Sustainable cash flow
5. Long-term goals
6. Investment planning

Clearly explain why each recommendation is suggested.

Return structured JSON only, with exactly this shape and no other text:
{
  "summary": "string",
  "financial_health": { "score": number, "label": "string" },
  "priorities": [
    { "priority": number, "title": "string", "description": "string", "reason": "string", "severity": "high" | "medium" | "low" }
  ],
  "roadmap": [
    { "period": "Now" | "Next 3 months" | "3-6 months" | "6-12 months", "actions": ["string"] }
  ],
  "warnings": ["string"],
  "next_question_suggestions": ["string"]
}`;

function buildUserPrompt(input: FinancialInput, metrics: CalculatedMetrics): string {
  return JSON.stringify(
    {
      monthly_income: input.monthlyIncome,
      additional_income: input.additionalIncome,
      expenses: input.expenses.map((e) => ({ name: e.name, amount: e.amount })),
      loans: input.loans.map((l) => ({
        type: l.type,
        outstanding: l.outstanding,
        emi: l.emi,
        interest_rate: l.interestRate,
        remaining_months: l.remainingMonths,
      })),
      investments: input.investments,
      savings: input.savings,
      goals: input.goals,
      goal_notes: input.goalNotes,
      user_question: input.question,
      calculated_metrics: metrics,
    },
    null,
    2
  );
}

function isValidAIResponse(data: any): data is AIAnalysisResponse {
  if (!data || typeof data !== "object") return false;
  if (typeof data.summary !== "string") return false;
  if (!data.financial_health || typeof data.financial_health.score !== "number") return false;
  if (!Array.isArray(data.priorities)) return false;
  if (!Array.isArray(data.roadmap)) return false;
  if (!Array.isArray(data.warnings)) return false;
  if (!Array.isArray(data.next_question_suggestions)) return false;
  return true;
}

function extractJson(text: string): any | null {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

export async function POST(req: NextRequest) {
  const clientKey = req.headers.get("x-forwarded-for") ?? "anonymous";
  if (!checkRateLimit(clientKey)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validated = validateInput(body);
  if (!validated) {
    return NextResponse.json({ error: "Invalid financial data provided." }, { status: 400 });
  }
  const { input, metrics } = validated;

  const apiKey = process.env.NVIDIA_API_KEY;
  const model = process.env.NVIDIA_MODEL || "meta/llama-3.1-70b-instruct";

  if (!apiKey) {
    return NextResponse.json(
      { error: "AI analysis is not configured on the server yet." },
      { status: 503 }
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60_000);

  try {
    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(input, metrics) },
        ],
        temperature: 0.4,
        max_tokens: 1600,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (response.status === 429) {
      return NextResponse.json(
        { error: "The AI service is busy right now. Please try again shortly." },
        { status: 429 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: "We couldn't complete the analysis right now. Please try again." },
        { status: 502 }
      );
    }

    const payload = await response.json();
    const content: string | undefined = payload?.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "We didn't get a usable response. Please try again." },
        { status: 502 }
      );
    }

    const parsed = extractJson(content);
    if (!isValidAIResponse(parsed)) {
      return NextResponse.json(
        { error: "We couldn't understand the analysis result. Please try again." },
        { status: 502 }
      );
    }

    // Clamp score defensively; the AI is a guide, not a source of truth for bounds.
    parsed.financial_health.score = Math.max(0, Math.min(100, Math.round(parsed.financial_health.score)));

    return NextResponse.json(parsed satisfies AIAnalysisResponse);
  } catch (err: any) {
    clearTimeout(timeout);
    if (err?.name === "AbortError") {
      return NextResponse.json(
        { error: "The analysis took too long. Please try again." },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: "We couldn't complete the analysis right now. Please try again." },
      { status: 500 }
    );
  }
}
