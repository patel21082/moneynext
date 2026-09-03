# MoneyNext

A free, single-page AI financial planner. Next.js (App Router) + TypeScript + Tailwind CSS.

## What it does

Users step through a six-step wizard (income → expenses → loans → investments →
goals → question). All arithmetic — surplus, savings rate, debt-to-income ratio,
emergency fund coverage, financial health score — is calculated **locally in the
browser** (`lib/calculations.ts`). Only when the user taps **Analyze My Financial
Situation** is the data sent to a server route (`app/api/analyze/route.ts`),
which calls the NVIDIA API and returns a structured, validated JSON action plan.

No database, no auth, no persistent storage. Refreshing the page clears
everything — state lives in React only.

## Getting started

```bash
npm install
cp .env.example .env.local   # add your NVIDIA_API_KEY
npm run dev
```

Open http://localhost:3000.

Without `NVIDIA_API_KEY` set, the wizard and local calculations still work;
the analysis step will return a friendly "not configured yet" error instead
of crashing.

## Project structure

```
app/
  page.tsx              single-page composition of all sections
  api/analyze/route.ts   server-side NVIDIA call (key never reaches the browser)
  layout.tsx             fonts, SEO metadata
  robots.ts / sitemap.ts metadata routes
components/
  Wizard.tsx              the 6-step input flow + local validation
  ResultsDashboard.tsx     health score, snapshot, priorities, roadmap
  HealthGauge.tsx          animated circular score (signature UI element)
  WhatIf.tsx               follow-up scenario questions
  AdSlot.tsx               single file to wire up real AdSense later
lib/
  calculations.ts   pure functions: metrics + health score, unit-testable
  types.ts          shared TypeScript types
```

## Ads

`components/AdSlot.tsx` renders a labeled placeholder until
`NEXT_PUBLIC_ADSENSE_CLIENT` and `NEXT_PUBLIC_AD_SLOT_BOTTOM` are set — at that
point it's the only file that needs to change to go live with real AdSense units.

Every page on the site (home, tool pages, guide pages, info pages, FAQ, tools
index, learn index) renders at least one `AdSlot` using the single shared
`NEXT_PUBLIC_AD_SLOT_BOTTOM` slot. The home page additionally uses
`NEXT_PUBLIC_AD_SLOT_ANALYSIS` (next to the wizard form) and
`NEXT_PUBLIC_AD_SLOT_RESULTS` (inside the results view) — these are optional;
only `NEXT_PUBLIC_AD_SLOT_BOTTOM` is required for ads to appear on every page.

## Notes

- This is intentionally an MVP: no database, no accounts, no saved plans.
- The AI is instructed not to name specific products, promise returns, or
  invent numbers — see `SYSTEM_PROMPT` in `app/api/analyze/route.ts`.
- The in-memory rate limiter in the API route is fine for a single instance;
  swap in a shared store if you deploy across multiple instances.
