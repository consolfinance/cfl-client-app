import { Placeholder } from "reshaped";

export type SubQuestion = {
  key: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type: "string" | "boolean" | "number" | "radio" | "select" | "textarea";
  enum?: { label: string; value: string }[];
  weight: number;
};

export type Question = {
  key: string;
  label: string;
  subQuestions: SubQuestion[];
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
    slug: "set-up-loan",
    name: "Set Up Loan",
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
  // "salary-advance": [
  //   {
  //     step: 1,
  //     title: "Personal Details",
  //     questions: [
  //       {
  //         key: "employed",
  //         label: "Are you formally employed?",
  //         type: "boolean",
  //         weight: 20,
  //       },
  //       {
  //         key: "monthly_income",
  //         label: "What is your monthly income (MWK)?",
  //         type: "number",
  //         weight: 0.002,
  //       },
  //     ],
  //   },
  //   {
  //     step: 2,
  //     title: "Credit History",
  //     questions: [
  //       {
  //         key: "has_judgment",
  //         label: "Any outstanding court judgments?",
  //         type: "boolean",
  //         weight: -30,
  //       },
  //     ],
  //   },
  // ],

  // "personal-installment": [
  //   {
  //     step: 1,
  //     title: "Income & Dependents",
  //     questions: [
  //       {
  //         key: "income_source",
  //         label: "Do you have a stable source of income?",
  //         type: "boolean",
  //         weight: 15,
  //       },
  //       {
  //         key: "dependents",
  //         label: "How many financial dependents do you support?",
  //         type: "number",
  //         weight: -2,
  //       },
  //     ],
  //   },
  //   {
  //     step: 2,
  //     title: "Payment Behaviour",
  //     questions: [
  //       {
  //         key: "utilities_paid",
  //         label: "Have you paid your utility bills on time in the past 6 months?",
  //         type: "boolean",
  //         weight: 10,
  //       },
  //     ],
  //   },
  // ],

  "set-up-loan": [
    {
      step: 1,
      title: "Your Details",
      subtitle: "Business Information",
      questions: [
        {
          key: "business_details",
          label: "Business Details",
          subQuestions: [
            {
              key: "registered_business_name",
              label: "Registered Business Name",
              placeholder: "Enter your registered business name",
              required: true,
              type: "string",
              weight: 5,
            },
            {
              key: "mbrs",
              label: "MBRS / Registrar General No.",
              placeholder: "e.g. BRN-### / RG-###",
              required: true,
              type: "string",
              weight: 5,
            },
            {
              key: "tpin",
              label: "TPIN (MRA Taxpayer Identification Number)",
              placeholder: "Enter your TPIN",
              required: true,
              type: "string",
              weight: 5,
            },
            {
              key: "legal_entity_type",
              label: "Legal Entity Type",
              required: true,
              type: "radio",
              enum: [
                { label: "Sole Proprietorship", value: "sole_proprietorship" },
                { label: "Partnership", value: "partnership" },
                { label: "Private Limited Company", value: "private_limited" },
                { label: "Limited Liability Company (LLC)", value: "llc" },
                { label: "Corporation", value: "corporation" },
                { label: "Non-Profit Organization", value: "non_profit" },
                { label: "Other", value: "other" },
              ],
              weight: 5,
            },
          ],
        },
        {
          key: "trading_address",
          label: "Trading Address",
          subQuestions: [
            {
              key: "street",
              label: "Street/Vilage/T.A.",
              placeholder: "Enter physical trading address",
              type: "string",
              required: true,
              weight: 5,
            },
            {
              key: "district",
              label: "District/City.",
              placeholder: "Enter district or city",
              type: "string",
              required: true,
              weight: 5,
            },
            {
              key: "utility_account",
              label: "Utility Account / Meter Number (ESCOM/Water)",
              placeholder: "Optional but recommended",
              type: "string",
              required: false,
              weight: 5,
            },
          ],
        },
        {
          key: "business_activity",
          label: "Business Activity",
          subQuestions: [
            {
              key: "principal_activity",
              label: "Principal Activity / Sector",
              placeholder:
                "E.g. Wholesale farm inputs; retail shop; poultry farming",
              type: "textarea",
              required: true,
              weight: 5,
            },
          ],
        },
        {
          key: "business_contacts",
          label: "Business Contacts",
          subQuestions: [
            {
              key: "primary_phone",
              label: "Primary Phone",
              placeholder: "+265...",
              type: "string",
              required: true,
              weight: 5,
            },
            {
              key: "email_address",
              label: "Email Address",
              placeholder: "business@example.com",
              type: "string",
              required: false,
              weight: 5,
            },
          ],
        },
      ],
    },
    {
      step: 2,
      title: "Your Business",
      subtitle: "Loan Request",
      questions: [
        {
          key: "facility_details",
          label: "Facility Details",
          type: "radio",
          subQuestions: [
            {
              key: "facility_type",
              label: "Facility Type",
              required: true,
              type: "radio",
              enum: [
                { label: "Working Capital", value: "working_capital" },
                { label: "Asset Finance", value: "asset_finance" },
                {
                  label: "Trade Loan (e.g., invoice/PO finance)",
                  value: "trade_loan",
                },
                { label: "Overdraft", value: "overdraft" },
                { label: "Other", value: "other" },
              ],
            },
            {
              key: "amount_requested",
              label: "Loan Amount Requested (MWK)",
              placeholder: "Enter amount in MWK",
              type: "number",
              required: true,
              weight: 5,
            },
            {
              key: "preferred_repayment_period",
              label: "Preferred Repayment Period (Tenor)",
              placeholder: "Enter preferred repayment period",
              required: true,
              type: "radio",
              enum: [
                { label: "< 1 year", value: "less_than_1_year" },
                { label: "1-3 years", value: "1_3_years" },
                { label: "3-5 years", value: "3_5_years" },
                { label: "> 5 years", value: "more_than_5_years" },
              ],
              weight: 5,
            },
          ],
        },
        {
          key: "purpose_collateral",
          label: "Purpose of Loan / Collateral",
          subQuestions: [
            {
              key: "purpose",
              label: "Purpose of funds",
              required: true,
              type: "textarea",
              weight: 5,
            },
            {
              key: "collateral",
              label: "Proposed Collateral",
              required: true,
              type: "radio",
              enum: [
                {
                  label: "Moveable assets (to be registered on PPSR)",
                  value: "moveable_assets",
                },
                {
                  label: "Property",
                  value: "property",
                },
                {
                  label: "Guarantor(s)",
                  value: "guarantors",
                },
                {
                  label: "None",
                  value: "none",
                },
              ],
              weight: 5,
            },
          ],
        },
      ],
    },
    {
      step: 3,
      title: "Financials",
      subtitle: "Financial Information",
      questions: [
        {
          key: "revenue_expenses",
          label: "Revenue and Expenses",
          subQuestions: [
            {
              key: "average_monthly_revenue",
              label: "Average Monthly Revenue (MWK)",
              type: "number",
              required: true,
              weight: 5,
            },
            {
              key: "average_monthly_operating_expenses",
              label: "Average Monthly Operating Expenses (MWK)",
              type: "number",
              required: true,
              weight: 5,
            },
          ],
        },
        {
          key: "existing_borrowings",
          label: "Existing Borrowings",
          subQuestions: [
            {
              key: "existing_overdraft",
              label: "Do you have any current loans/overdrafts?",
              required: true,
              type: "radio",
              enum: [
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ],
              weight: 5,
            },
          ],
        },
        {
          key: "returned_or_cancelled_sales",
          label: "Returned/Cancelled Sales",
          subQuestions: [
            {
              key: "returned_or_cancelled_sales_rate",
              label: "Approximate % credit notes/returns last 6 months:",
              required: true,
              type: "radio",
              enum: [
                { label: "0-2%", value: "0-2%" },
                { label: "3-5%", value: "3-5%" },
                { label: "6-10%", value: "6-10%" },
                { label: "> 10%", value: "more_than_10%" },
              ],
              weight: 5,
            },
          ],
        },
      ],
    },
  ],

  // "sme-working-capital": [
  //   {
  //     step: 1,
  //     title: "Financial Records",
  //     questions: [
  //       {
  //         key: "bank_statements",
  //         label: "Can you provide at least 6 months of bank statements?",
  //         type: "boolean",
  //         weight: 15,
  //       },
  //       {
  //         key: "revenue",
  //         label: "Average monthly revenue (MWK)",
  //         type: "number",
  //         weight: 0.0005,
  //       },
  //     ],
  //   },
  //   {
  //     step: 2,
  //     title: "Risk Factors",
  //     questions: [
  //       {
  //         key: "customer_concentration",
  //         label: "Is more than 50% of revenue from a single customer?",
  //         type: "boolean",
  //         weight: -20,
  //       },
  //       {
  //         key: "governance_risk",
  //         label: "Any directors with prior defaults?",
  //         type: "boolean",
  //         weight: -30,
  //       },
  //     ],
  //   },
  // ],
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

  return {
    score: Math.round(score),
    grade,
  };
}
