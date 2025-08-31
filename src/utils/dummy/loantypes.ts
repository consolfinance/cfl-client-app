type Question = {
  key: string;
  label: string;
  type: "boolean" | "number";
  weight: number;
};

export type LoanType = "personal" | "business";

export const dummyLoanTypes = [
  {
    id: 1,
    type: "personal",
    slug: "salary-advance",
    name: "Salary Advance Loan",
    description: "A short-term loan to cover urgent personal expenses.",
  },
  {
    id: 2,
    type: "personal",
    slug: "personal-installment",
    name: "Personal Installment Loan",
    description: "A personal loan repayable in flexible installments.",
  },
  {
    id: 3,
    type: "business",
    slug: "micro-business",
    name: "Micro Business Loan",
    description: "A loan to support very small businesses and startups.",
  },
  {
    id: 4,
    type: "business",
    slug: "sme-working-capital",
    name: "SME Working Capital Loan",
    description: "A loan to strengthen cash flow for small and medium businesses.",
  },
];

export const loanTypeQuestions = {
  "salary-advance": [
    {
      step: 1,
      title: "Personal Details",
      questions: [
        {
          key: "employed",
          label: "Are you formally employed?",
          type: "boolean",
          weight: 20,
        },
        {
          key: "monthly_income",
          label: "What is your monthly income (MWK)?",
          type: "number",
          weight: 0.002,
        },
      ],
    },
    {
      step: 2,
      title: "Credit History",
      questions: [
        {
          key: "has_judgment",
          label: "Any outstanding court judgments?",
          type: "boolean",
          weight: -30,
        },
      ],
    },
  ],

  "personal-installment": [
    {
      step: 1,
      title: "Income & Dependents",
      questions: [
        {
          key: "income_source",
          label: "Do you have a stable source of income?",
          type: "boolean",
          weight: 15,
        },
        {
          key: "dependents",
          label: "How many financial dependents do you support?",
          type: "number",
          weight: -2,
        },
      ],
    },
    {
      step: 2,
      title: "Payment Behaviour",
      questions: [
        {
          key: "utilities_paid",
          label: "Have you paid your utility bills on time in the past 6 months?",
          type: "boolean",
          weight: 10,
        },
      ],
    },
  ],

  "micro-business": [
    {
      step: 1,
      title: "Business Basics",
      questions: [
        {
          key: "registered",
          label: "Is your business registered with MBRS?",
          type: "boolean",
          weight: 20,
        },
        {
          key: "monthly_revenue",
          label: "Average monthly business revenue (MWK)",
          type: "number",
          weight: 0.001,
        },
      ],
    },
    {
      step: 2,
      title: "Financial Behaviour",
      questions: [
        {
          key: "utilities",
          label: "Has your business paid utilities on time in the last 6 months?",
          type: "boolean",
          weight: 10,
        },
        {
          key: "has_liens",
          label: "Does your business have collateral pledged elsewhere (PPSR)?",
          type: "boolean",
          weight: -25,
        },
      ],
    },
  ],

  "sme-working-capital": [
    {
      step: 1,
      title: "Financial Records",
      questions: [
        {
          key: "bank_statements",
          label: "Can you provide at least 6 months of bank statements?",
          type: "boolean",
          weight: 15,
        },
        {
          key: "revenue",
          label: "Average monthly revenue (MWK)",
          type: "number",
          weight: 0.0005,
        },
      ],
    },
    {
      step: 2,
      title: "Risk Factors",
      questions: [
        {
          key: "customer_concentration",
          label: "Is more than 50% of revenue from a single customer?",
          type: "boolean",
          weight: -20,
        },
        {
          key: "governance_risk",
          label: "Any directors with prior defaults?",
          type: "boolean",
          weight: -30,
        },
      ],
    },
  ],
};

export function computeScore(
  answers: Record<string, boolean | number>,
  questions: Question[]
) {
  let total = 0;
  let max = 0;

  for (const q of questions) {
    const val = answers[q.key];
    if (val === undefined || val === null) continue;

    if (q.type === "boolean") {
      total += (val ? 1 : 0) * q.weight;
      max += Math.abs(q.weight);
    } else if (q.type === "number") {
      if (typeof val === "number") {
        total += val * q.weight;
      }
      // For numeric, max isn’t as defined, so keep weights small
    }
  }

  // Normalize to 300–900 range for intuition
  const raw = total;
  let score = 600 + raw; // base + offset
  if (score < 300) score = 300;
  if (score > 900) score = 900;

  // Map to grade
  let grade = "E";
  if (score >= 780) grade = "A";
  else if (score >= 730) grade = "B";
  else if (score >= 680) grade = "C";
  else if (score >= 630) grade = "D";

  return { score, grade };
}
