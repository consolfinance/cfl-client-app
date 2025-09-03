export type SubQuestion = {
  key: string;
  label: string;
  subtitle?: string;
  placeholder?: string;
  required?: boolean;
  type:
    | "string"
    | "boolean"
    | "number"
    | "radio"
    | "select"
    | "textarea"
    | "checkbox"
    | "fileUpload";
  enum?: { label: string; value: string }[];
  checkboxText?: string;
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
    slug: "credit-builder-loan",
    name: "Credit Builder Loan",
    description: "Build trust and prove repayment.",
  },
  {
    id: 2,
    type: "personal",
    slug: "growth-loan",
    name: "Growth Loan",
    description: "Longer terms, lower fees, more flexibility.",
  },
  {
    id: 3,
    type: "business",
    slug: "business-step-up-loan",
    name: "Step Up Loan",
    description: "A loan to support very small businesses and startups.",
  },
  {
    id: 4,
    type: "business",
    slug: "business-boost-loan",
    name: "Business Boost Loan",
    description: "Working capital for SMEs and small traders.",
  },
  {
    id: 5,
    type: "business",
    slug: "trade-finance-loan",
    name: "Trade Finance Loan",
    description: "For confirmed B2B orders, larger and safer transactions.",
  },
];

export const loanTypeQuestions = {
  "credit-builder-loan": [
    {
      step: 0,
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
      step: 1,
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
              weight: 5,
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
                { label: "< 1 month", value: "less_than_1_year" },
                { label: "1-3 months", value: "1_3_years" },
                { label: "3-5 months", value: "3_5_years" },
                { label: "> 5 months", value: "more_than_5_years" },
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
      step: 2,
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
    {
      step: 3,
      title: "Loan Request",
      subtitle: "Credit & Governance",
      questions: [
        {
          key: "crb_authorisation",
          label: "Credit Authorisation",
          subQuestions: [
            {
              key: "authorisation",
              label: "",
              checkboxText:
                "I agree to the terms & conditions, data use policy, and credit assessment using transaction history.",
              required: false,
              type: "checkbox",
              weight: 5,
            },
          ],
        },
        {
          key: "payment_behaviour",
          label: "Payment Behaviour",
          subQuestions: [
            {
              key: "supplier_payment_behaviour",
              label: "Supplier Payment Behaviour",
              subtitle:
                "In the last 12 months, how often were supplier payments made on time (per agreed terms)?",
              required: false,
              type: "radio",
              enum: [
                { label: "Always (≥95%)", value: "always" },
                { label: "Usually (80-94%)", value: "usually" },
                { label: "Sometimes (50-79%)", value: "sometimes" },
                { label: "Rarely (<50%)", value: "rarely" },
              ],
              weight: 5,
            },
            {
              key: "supplier_payment_behaviour_utilities",
              label: "Supplier Payment Behaviour",
              subtitle:
                "Utility bills (electricity/water) for the trading site in the last 6 months were:",
              required: false,
              type: "radio",
              enum: [
                { label: "All paid on time", value: "all_paid_on_time" },
                { label: "1-2 late payments", value: "1_2_late_payments" },
                {
                  label: "3+ late payments/disconnections",
                  value: "3+_late_payments_disconnections",
                },
              ],
              weight: 5,
            },
          ],
        },
        {
          key: "governance_signals",
          label: "Governance Signals",
          subQuestions: [
            {
              key: "director_changes",
              label: "Director Changes",
              subtitle: "Director/authorized signatory changes in last 24 months:",
              required: false,
              type: "radio",
              enum: [
                { label: "None", value: "none" },
                { label: "1 change", value: "1_change" },
                {
                  label: "2+ frequent changes",
                  value: "2_or_more_frequent_changes",
                },
              ],
              weight: 5,
            },
            {
              key: "related_party_exposure",
              label: "Related Party Exposure",
              subtitle: "Related-party exposure (sales to director-owned entities):",
              required: false,
              type: "radio",
              enum: [
                { label: "None/immaterial", value: "none" },
                { label: "Some (≤20% of revenue)", value: "some" },
                {
                  label: "High (>20% of revenue)",
                  value: "high",
                },
              ],
              weight: 5,
            },
          ],
        },
        {
          key: "sector_and_location",
          label: "Sector and Location",
          subQuestions: [
            {
              key: "sector",
              label: "Sector (choose closest)",
              required: true,
              type: "radio",
              enum: [
                { label: "Agriculture", value: "agriculture" },
                { label: "Trading & Wholesale", value: "trading_and_wholesale" },
                { label: "Retail", value: "retail" },
                { label: "Manufacturing", value: "manufacturing" },
                { label: "Transport & Logistics", value: "transport_and_logistics" },
                { label: "Hospitality", value: "hospitality" },
                { label: "Services", value: "services" },
                { label: "Other", value: "other" },
              ],
              weight: 5,
            },
            {
              key: "operating_district",
              label: "Operating District",
              placeholder: "E.g. Blantyre, Lilongwe",
              required: true,
              type: "string",
              weight: 5,
            },
          ],
        },
      ],
    },
    {
      step: 4,
      title: "Submit Application",
      subtitle: "Review & Confirm",
      questions: [
        {
          key: "payment_preferences",
          label: "Repayment Preferences",
          subQuestions: [
            {
              key: "preferred_repayment_mode",
              label: "Preferred Repayment Mode",
              required: true,
              type: "radio",
              enum: [
                { label: "Monthly equal installments", value: "monthly" },
                { label: "Weekly/Fortnightly schedule", value: "weekly" },
                { label: "Cash-Flow Seasonality", value: "bi_annually" },
                { label: "Annually", value: "annually" },
              ],
              weight: 5,
            },
            {
              key: "seasonality_pattern",
              label: "Seasonality Pattern",
              subtitle: "Are there months with significantly higher or lower sales?",
              required: true,
              type: "radio",
              enum: [
                { label: "Yes", value: "yes" },
                { label: "No / Minor variation", value: "no" },
              ],
              weight: 5,
            },
            {
              key: "financial_management_support",
              label: "Financial Management Support",
              subtitle:
                "Would you like free financial literacy content or mentorship?",
              required: false,
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
          key: "additional_information",
          label: "Additional Information",
          subQuestions: [
            {
              key: "additional_info",
              label: "Additional Notes to Credit Officer (optional)",
              placeholder:
                "Any additional information you'd like to share with the credit officer",
              required: false,
              type: "textarea",
              weight: 5,
            },
          ],
        },
        {
          key: "final_uploads",
          label: "Final Uploads",
          subQuestions: [
            {
              key: "bank_statements",
              label: "Last 6–12 months bank statements / wallet exports",
              required: false,
              type: "fileUpload",
              weight: 5,
            },
            {
              key: "trade_documents",
              label: "Trade documents (invoices/POs/settlements)",
              required: false,
              type: "fileUpload",
              weight: 5,
            },
            {
              key: "utility_bills",
              label: "Utility bills (3–6 months)",
              required: false,
              type: "fileUpload",
              weight: 5,
            },
            {
              key: "collateral_documents",
              label: "Any collateral documents (valuation, deed, logbook, etc.)",
              required: false,
              type: "fileUpload",
              weight: 5,
            },
          ],
        },
      ],
    },
  ],

  "growth-loan": [
    {
      step: 0,
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
      step: 1,
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
              weight: 5,
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
                { label: "< 1 month", value: "less_than_1_year" },
                { label: "1-3 months", value: "1_3_years" },
                { label: "3-5 months", value: "3_5_years" },
                { label: "> 5 months", value: "more_than_5_years" },
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
      step: 2,
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
    {
      step: 3,
      title: "Loan Request",
      subtitle: "Credit & Governance",
      questions: [
        {
          key: "crb_authorisation",
          label: "Credit Authorisation",
          subQuestions: [
            {
              key: "authorisation",
              label: "",
              checkboxText:
                "I agree to the terms & conditions, data use policy, and credit assessment using transaction history.",
              required: false,
              type: "checkbox",
              weight: 5,
            },
          ],
        },
        {
          key: "payment_behaviour",
          label: "Payment Behaviour",
          subQuestions: [
            {
              key: "supplier_payment_behaviour",
              label: "Supplier Payment Behaviour",
              subtitle:
                "In the last 12 months, how often were supplier payments made on time (per agreed terms)?",
              required: false,
              type: "radio",
              enum: [
                { label: "Always (≥95%)", value: "always" },
                { label: "Usually (80-94%)", value: "usually" },
                { label: "Sometimes (50-79%)", value: "sometimes" },
                { label: "Rarely (<50%)", value: "rarely" },
              ],
              weight: 5,
            },
            {
              key: "supplier_payment_behaviour_utilities",
              label: "Supplier Payment Behaviour",
              subtitle:
                "Utility bills (electricity/water) for the trading site in the last 6 months were:",
              required: false,
              type: "radio",
              enum: [
                { label: "All paid on time", value: "all_paid_on_time" },
                { label: "1-2 late payments", value: "1_2_late_payments" },
                {
                  label: "3+ late payments/disconnections",
                  value: "3+_late_payments_disconnections",
                },
              ],
              weight: 5,
            },
          ],
        },
        {
          key: "governance_signals",
          label: "Governance Signals",
          subQuestions: [
            {
              key: "director_changes",
              label: "Director Changes",
              subtitle: "Director/authorized signatory changes in last 24 months:",
              required: false,
              type: "radio",
              enum: [
                { label: "None", value: "none" },
                { label: "1 change", value: "1_change" },
                {
                  label: "2+ frequent changes",
                  value: "2_or_more_frequent_changes",
                },
              ],
              weight: 5,
            },
            {
              key: "related_party_exposure",
              label: "Related Party Exposure",
              subtitle: "Related-party exposure (sales to director-owned entities):",
              required: false,
              type: "radio",
              enum: [
                { label: "None/immaterial", value: "none" },
                { label: "Some (≤20% of revenue)", value: "some" },
                {
                  label: "High (>20% of revenue)",
                  value: "high",
                },
              ],
              weight: 5,
            },
          ],
        },
        {
          key: "sector_and_location",
          label: "Sector and Location",
          subQuestions: [
            {
              key: "sector",
              label: "Sector (choose closest)",
              required: true,
              type: "radio",
              enum: [
                { label: "Agriculture", value: "agriculture" },
                { label: "Trading & Wholesale", value: "trading_and_wholesale" },
                { label: "Retail", value: "retail" },
                { label: "Manufacturing", value: "manufacturing" },
                { label: "Transport & Logistics", value: "transport_and_logistics" },
                { label: "Hospitality", value: "hospitality" },
                { label: "Services", value: "services" },
                { label: "Other", value: "other" },
              ],
              weight: 5,
            },
            {
              key: "operating_district",
              label: "Operating District",
              placeholder: "E.g. Blantyre, Lilongwe",
              required: true,
              type: "string",
              weight: 5,
            },
          ],
        },
      ],
    },
    {
      step: 4,
      title: "Submit Application",
      subtitle: "Review & Confirm",
      questions: [
        {
          key: "payment_preferences",
          label: "Repayment Preferences",
          subQuestions: [
            {
              key: "preferred_repayment_mode",
              label: "Preferred Repayment Mode",
              required: true,
              type: "radio",
              enum: [
                { label: "Monthly equal installments", value: "monthly" },
                { label: "Weekly/Fortnightly schedule", value: "weekly" },
                { label: "Cash-Flow Seasonality", value: "bi_annually" },
                { label: "Annually", value: "annually" },
              ],
              weight: 5,
            },
            {
              key: "seasonality_pattern",
              label: "Seasonality Pattern",
              subtitle: "Are there months with significantly higher or lower sales?",
              required: true,
              type: "radio",
              enum: [
                { label: "Yes", value: "yes" },
                { label: "No / Minor variation", value: "no" },
              ],
              weight: 5,
            },
            {
              key: "financial_management_support",
              label: "Financial Management Support",
              subtitle:
                "Would you like free financial literacy content or mentorship?",
              required: false,
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
          key: "additional_information",
          label: "Additional Information",
          subQuestions: [
            {
              key: "additional_info",
              label: "Additional Notes to Credit Officer (optional)",
              placeholder:
                "Any additional information you'd like to share with the credit officer",
              required: false,
              type: "textarea",
              weight: 5,
            },
          ],
        },
        {
          key: "final_uploads",
          label: "Final Uploads",
          subQuestions: [
            {
              key: "bank_statements",
              label: "Last 6–12 months bank statements / wallet exports",
              required: false,
              type: "fileUpload",
              weight: 5,
            },
            {
              key: "trade_documents",
              label: "Trade documents (invoices/POs/settlements)",
              required: false,
              type: "fileUpload",
              weight: 5,
            },
            {
              key: "utility_bills",
              label: "Utility bills (3–6 months)",
              required: false,
              type: "fileUpload",
              weight: 5,
            },
            {
              key: "collateral_documents",
              label: "Any collateral documents (valuation, deed, logbook, etc.)",
              required: false,
              type: "fileUpload",
              weight: 5,
            },
          ],
        },
      ],
    },
  ],

  "business-step-up-loan": [
    {
      step: 0,
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
      step: 1,
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
              weight: 5,
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
                { label: "< 1 month", value: "less_than_1_year" },
                { label: "1-3 months", value: "1_3_years" },
                { label: "3-5 months", value: "3_5_years" },
                { label: "> 5 months", value: "more_than_5_years" },
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
      step: 2,
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
    {
      step: 3,
      title: "Loan Request",
      subtitle: "Credit & Governance",
      questions: [
        {
          key: "crb_authorisation",
          label: "Credit Authorisation",
          subQuestions: [
            {
              key: "authorisation",
              label: "",
              checkboxText:
                "I agree to the terms & conditions, data use policy, and credit assessment using transaction history.",
              required: false,
              type: "checkbox",
              weight: 5,
            },
          ],
        },
        {
          key: "payment_behaviour",
          label: "Payment Behaviour",
          subQuestions: [
            {
              key: "supplier_payment_behaviour",
              label: "Supplier Payment Behaviour",
              subtitle:
                "In the last 12 months, how often were supplier payments made on time (per agreed terms)?",
              required: false,
              type: "radio",
              enum: [
                { label: "Always (≥95%)", value: "always" },
                { label: "Usually (80-94%)", value: "usually" },
                { label: "Sometimes (50-79%)", value: "sometimes" },
                { label: "Rarely (<50%)", value: "rarely" },
              ],
              weight: 5,
            },
            {
              key: "supplier_payment_behaviour_utilities",
              label: "Supplier Payment Behaviour",
              subtitle:
                "Utility bills (electricity/water) for the trading site in the last 6 months were:",
              required: false,
              type: "radio",
              enum: [
                { label: "All paid on time", value: "all_paid_on_time" },
                { label: "1-2 late payments", value: "1_2_late_payments" },
                {
                  label: "3+ late payments/disconnections",
                  value: "3+_late_payments_disconnections",
                },
              ],
              weight: 5,
            },
          ],
        },
        {
          key: "governance_signals",
          label: "Governance Signals",
          subQuestions: [
            {
              key: "director_changes",
              label: "Director Changes",
              subtitle: "Director/authorized signatory changes in last 24 months:",
              required: false,
              type: "radio",
              enum: [
                { label: "None", value: "none" },
                { label: "1 change", value: "1_change" },
                {
                  label: "2+ frequent changes",
                  value: "2_or_more_frequent_changes",
                },
              ],
              weight: 5,
            },
            {
              key: "related_party_exposure",
              label: "Related Party Exposure",
              subtitle: "Related-party exposure (sales to director-owned entities):",
              required: false,
              type: "radio",
              enum: [
                { label: "None/immaterial", value: "none" },
                { label: "Some (≤20% of revenue)", value: "some" },
                {
                  label: "High (>20% of revenue)",
                  value: "high",
                },
              ],
              weight: 5,
            },
          ],
        },
        {
          key: "sector_and_location",
          label: "Sector and Location",
          subQuestions: [
            {
              key: "sector",
              label: "Sector (choose closest)",
              required: true,
              type: "radio",
              enum: [
                { label: "Agriculture", value: "agriculture" },
                { label: "Trading & Wholesale", value: "trading_and_wholesale" },
                { label: "Retail", value: "retail" },
                { label: "Manufacturing", value: "manufacturing" },
                { label: "Transport & Logistics", value: "transport_and_logistics" },
                { label: "Hospitality", value: "hospitality" },
                { label: "Services", value: "services" },
                { label: "Other", value: "other" },
              ],
              weight: 5,
            },
            {
              key: "operating_district",
              label: "Operating District",
              placeholder: "E.g. Blantyre, Lilongwe",
              required: true,
              type: "string",
              weight: 5,
            },
          ],
        },
      ],
    },
    {
      step: 4,
      title: "Submit Application",
      subtitle: "Review & Confirm",
      questions: [
        {
          key: "payment_preferences",
          label: "Repayment Preferences",
          subQuestions: [
            {
              key: "preferred_repayment_mode",
              label: "Preferred Repayment Mode",
              required: true,
              type: "radio",
              enum: [
                { label: "Monthly equal installments", value: "monthly" },
                { label: "Weekly/Fortnightly schedule", value: "weekly" },
                { label: "Cash-Flow Seasonality", value: "bi_annually" },
                { label: "Annually", value: "annually" },
              ],
              weight: 5,
            },
            {
              key: "seasonality_pattern",
              label: "Seasonality Pattern",
              subtitle: "Are there months with significantly higher or lower sales?",
              required: true,
              type: "radio",
              enum: [
                { label: "Yes", value: "yes" },
                { label: "No / Minor variation", value: "no" },
              ],
              weight: 5,
            },
            {
              key: "financial_management_support",
              label: "Financial Management Support",
              subtitle:
                "Would you like free financial literacy content or mentorship?",
              required: false,
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
          key: "additional_information",
          label: "Additional Information",
          subQuestions: [
            {
              key: "additional_info",
              label: "Additional Notes to Credit Officer (optional)",
              placeholder:
                "Any additional information you'd like to share with the credit officer",
              required: false,
              type: "textarea",
              weight: 5,
            },
          ],
        },
        {
          key: "final_uploads",
          label: "Final Uploads",
          subQuestions: [
            {
              key: "bank_statements",
              label: "Last 6–12 months bank statements / wallet exports",
              required: false,
              type: "fileUpload",
              weight: 5,
            },
            {
              key: "trade_documents",
              label: "Trade documents (invoices/POs/settlements)",
              required: false,
              type: "fileUpload",
              weight: 5,
            },
            {
              key: "utility_bills",
              label: "Utility bills (3–6 months)",
              required: false,
              type: "fileUpload",
              weight: 5,
            },
            {
              key: "collateral_documents",
              label: "Any collateral documents (valuation, deed, logbook, etc.)",
              required: false,
              type: "fileUpload",
              weight: 5,
            },
          ],
        },
      ],
    },
  ],

  "business-boost-loan": [
    {
      step: 0,
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
      step: 1,
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
              weight: 5,
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
                { label: "< 1 month", value: "less_than_1_year" },
                { label: "1-3 months", value: "1_3_years" },
                { label: "3-5 months", value: "3_5_years" },
                { label: "> 5 months", value: "more_than_5_years" },
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
      step: 2,
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
    {
      step: 3,
      title: "Loan Request",
      subtitle: "Credit & Governance",
      questions: [
        {
          key: "crb_authorisation",
          label: "Credit Authorisation",
          subQuestions: [
            {
              key: "authorisation",
              label: "",
              checkboxText:
                "I agree to the terms & conditions, data use policy, and credit assessment using transaction history.",
              required: false,
              type: "checkbox",
              weight: 5,
            },
          ],
        },
        {
          key: "payment_behaviour",
          label: "Payment Behaviour",
          subQuestions: [
            {
              key: "supplier_payment_behaviour",
              label: "Supplier Payment Behaviour",
              subtitle:
                "In the last 12 months, how often were supplier payments made on time (per agreed terms)?",
              required: false,
              type: "radio",
              enum: [
                { label: "Always (≥95%)", value: "always" },
                { label: "Usually (80-94%)", value: "usually" },
                { label: "Sometimes (50-79%)", value: "sometimes" },
                { label: "Rarely (<50%)", value: "rarely" },
              ],
              weight: 5,
            },
            {
              key: "supplier_payment_behaviour_utilities",
              label: "Supplier Payment Behaviour",
              subtitle:
                "Utility bills (electricity/water) for the trading site in the last 6 months were:",
              required: false,
              type: "radio",
              enum: [
                { label: "All paid on time", value: "all_paid_on_time" },
                { label: "1-2 late payments", value: "1_2_late_payments" },
                {
                  label: "3+ late payments/disconnections",
                  value: "3+_late_payments_disconnections",
                },
              ],
              weight: 5,
            },
          ],
        },
        {
          key: "governance_signals",
          label: "Governance Signals",
          subQuestions: [
            {
              key: "director_changes",
              label: "Director Changes",
              subtitle: "Director/authorized signatory changes in last 24 months:",
              required: false,
              type: "radio",
              enum: [
                { label: "None", value: "none" },
                { label: "1 change", value: "1_change" },
                {
                  label: "2+ frequent changes",
                  value: "2_or_more_frequent_changes",
                },
              ],
              weight: 5,
            },
            {
              key: "related_party_exposure",
              label: "Related Party Exposure",
              subtitle: "Related-party exposure (sales to director-owned entities):",
              required: false,
              type: "radio",
              enum: [
                { label: "None/immaterial", value: "none" },
                { label: "Some (≤20% of revenue)", value: "some" },
                {
                  label: "High (>20% of revenue)",
                  value: "high",
                },
              ],
              weight: 5,
            },
          ],
        },
        {
          key: "sector_and_location",
          label: "Sector and Location",
          subQuestions: [
            {
              key: "sector",
              label: "Sector (choose closest)",
              required: true,
              type: "radio",
              enum: [
                { label: "Agriculture", value: "agriculture" },
                { label: "Trading & Wholesale", value: "trading_and_wholesale" },
                { label: "Retail", value: "retail" },
                { label: "Manufacturing", value: "manufacturing" },
                { label: "Transport & Logistics", value: "transport_and_logistics" },
                { label: "Hospitality", value: "hospitality" },
                { label: "Services", value: "services" },
                { label: "Other", value: "other" },
              ],
              weight: 5,
            },
            {
              key: "operating_district",
              label: "Operating District",
              placeholder: "E.g. Blantyre, Lilongwe",
              required: true,
              type: "string",
              weight: 5,
            },
          ],
        },
      ],
    },
    {
      step: 4,
      title: "Submit Application",
      subtitle: "Review & Confirm",
      questions: [
        {
          key: "payment_preferences",
          label: "Repayment Preferences",
          subQuestions: [
            {
              key: "preferred_repayment_mode",
              label: "Preferred Repayment Mode",
              required: true,
              type: "radio",
              enum: [
                { label: "Monthly equal installments", value: "monthly" },
                { label: "Weekly/Fortnightly schedule", value: "weekly" },
                { label: "Cash-Flow Seasonality", value: "bi_annually" },
                { label: "Annually", value: "annually" },
              ],
              weight: 5,
            },
            {
              key: "seasonality_pattern",
              label: "Seasonality Pattern",
              subtitle: "Are there months with significantly higher or lower sales?",
              required: true,
              type: "radio",
              enum: [
                { label: "Yes", value: "yes" },
                { label: "No / Minor variation", value: "no" },
              ],
              weight: 5,
            },
            {
              key: "financial_management_support",
              label: "Financial Management Support",
              subtitle:
                "Would you like free financial literacy content or mentorship?",
              required: false,
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
          key: "additional_information",
          label: "Additional Information",
          subQuestions: [
            {
              key: "additional_info",
              label: "Additional Notes to Credit Officer (optional)",
              placeholder:
                "Any additional information you'd like to share with the credit officer",
              required: false,
              type: "textarea",
              weight: 5,
            },
          ],
        },
        {
          key: "final_uploads",
          label: "Final Uploads",
          subQuestions: [
            {
              key: "bank_statements",
              label: "Last 6–12 months bank statements / wallet exports",
              required: false,
              type: "fileUpload",
              weight: 5,
            },
            {
              key: "trade_documents",
              label: "Trade documents (invoices/POs/settlements)",
              required: false,
              type: "fileUpload",
              weight: 5,
            },
            {
              key: "utility_bills",
              label: "Utility bills (3–6 months)",
              required: false,
              type: "fileUpload",
              weight: 5,
            },
            {
              key: "collateral_documents",
              label: "Any collateral documents (valuation, deed, logbook, etc.)",
              required: false,
              type: "fileUpload",
              weight: 5,
            },
          ],
        },
      ],
    },
  ],

  "trade-finance-loan": [
    {
      step: 0,
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
      step: 1,
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
              weight: 5,
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
                { label: "< 1 month", value: "less_than_1_year" },
                { label: "1-3 months", value: "1_3_years" },
                { label: "3-5 months", value: "3_5_years" },
                { label: "> 5 months", value: "more_than_5_years" },
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
      step: 2,
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
    {
      step: 3,
      title: "Loan Request",
      subtitle: "Credit & Governance",
      questions: [
        {
          key: "crb_authorisation",
          label: "Credit Authorisation",
          subQuestions: [
            {
              key: "authorisation",
              label: "",
              checkboxText:
                "I agree to the terms & conditions, data use policy, and credit assessment using transaction history.",
              required: false,
              type: "checkbox",
              weight: 5,
            },
          ],
        },
        {
          key: "payment_behaviour",
          label: "Payment Behaviour",
          subQuestions: [
            {
              key: "supplier_payment_behaviour",
              label: "Supplier Payment Behaviour",
              subtitle:
                "In the last 12 months, how often were supplier payments made on time (per agreed terms)?",
              required: false,
              type: "radio",
              enum: [
                { label: "Always (≥95%)", value: "always" },
                { label: "Usually (80-94%)", value: "usually" },
                { label: "Sometimes (50-79%)", value: "sometimes" },
                { label: "Rarely (<50%)", value: "rarely" },
              ],
              weight: 5,
            },
            {
              key: "supplier_payment_behaviour_utilities",
              label: "Supplier Payment Behaviour",
              subtitle:
                "Utility bills (electricity/water) for the trading site in the last 6 months were:",
              required: false,
              type: "radio",
              enum: [
                { label: "All paid on time", value: "all_paid_on_time" },
                { label: "1-2 late payments", value: "1_2_late_payments" },
                {
                  label: "3+ late payments/disconnections",
                  value: "3+_late_payments_disconnections",
                },
              ],
              weight: 5,
            },
          ],
        },
        {
          key: "governance_signals",
          label: "Governance Signals",
          subQuestions: [
            {
              key: "director_changes",
              label: "Director Changes",
              subtitle: "Director/authorized signatory changes in last 24 months:",
              required: false,
              type: "radio",
              enum: [
                { label: "None", value: "none" },
                { label: "1 change", value: "1_change" },
                {
                  label: "2+ frequent changes",
                  value: "2_or_more_frequent_changes",
                },
              ],
              weight: 5,
            },
            {
              key: "related_party_exposure",
              label: "Related Party Exposure",
              subtitle: "Related-party exposure (sales to director-owned entities):",
              required: false,
              type: "radio",
              enum: [
                { label: "None/immaterial", value: "none" },
                { label: "Some (≤20% of revenue)", value: "some" },
                {
                  label: "High (>20% of revenue)",
                  value: "high",
                },
              ],
              weight: 5,
            },
          ],
        },
        {
          key: "sector_and_location",
          label: "Sector and Location",
          subQuestions: [
            {
              key: "sector",
              label: "Sector (choose closest)",
              required: true,
              type: "radio",
              enum: [
                { label: "Agriculture", value: "agriculture" },
                { label: "Trading & Wholesale", value: "trading_and_wholesale" },
                { label: "Retail", value: "retail" },
                { label: "Manufacturing", value: "manufacturing" },
                { label: "Transport & Logistics", value: "transport_and_logistics" },
                { label: "Hospitality", value: "hospitality" },
                { label: "Services", value: "services" },
                { label: "Other", value: "other" },
              ],
              weight: 5,
            },
            {
              key: "operating_district",
              label: "Operating District",
              placeholder: "E.g. Blantyre, Lilongwe",
              required: true,
              type: "string",
              weight: 5,
            },
          ],
        },
      ],
    },
    {
      step: 4,
      title: "Submit Application",
      subtitle: "Review & Confirm",
      questions: [
        {
          key: "payment_preferences",
          label: "Repayment Preferences",
          subQuestions: [
            {
              key: "preferred_repayment_mode",
              label: "Preferred Repayment Mode",
              required: true,
              type: "radio",
              enum: [
                { label: "Monthly equal installments", value: "monthly" },
                { label: "Weekly/Fortnightly schedule", value: "weekly" },
                { label: "Cash-Flow Seasonality", value: "bi_annually" },
                { label: "Annually", value: "annually" },
              ],
              weight: 5,
            },
            {
              key: "seasonality_pattern",
              label: "Seasonality Pattern",
              subtitle: "Are there months with significantly higher or lower sales?",
              required: true,
              type: "radio",
              enum: [
                { label: "Yes", value: "yes" },
                { label: "No / Minor variation", value: "no" },
              ],
              weight: 5,
            },
            {
              key: "financial_management_support",
              label: "Financial Management Support",
              subtitle:
                "Would you like free financial literacy content or mentorship?",
              required: false,
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
          key: "additional_information",
          label: "Additional Information",
          subQuestions: [
            {
              key: "additional_info",
              label: "Additional Notes to Credit Officer (optional)",
              placeholder:
                "Any additional information you'd like to share with the credit officer",
              required: false,
              type: "textarea",
              weight: 5,
            },
          ],
        },
        {
          key: "final_uploads",
          label: "Final Uploads",
          subQuestions: [
            {
              key: "bank_statements",
              label: "Last 6–12 months bank statements / wallet exports",
              required: false,
              type: "fileUpload",
              weight: 5,
            },
            {
              key: "trade_documents",
              label: "Trade documents (invoices/POs/settlements)",
              required: false,
              type: "fileUpload",
              weight: 5,
            },
            {
              key: "utility_bills",
              label: "Utility bills (3–6 months)",
              required: false,
              type: "fileUpload",
              weight: 5,
            },
            {
              key: "collateral_documents",
              label: "Any collateral documents (valuation, deed, logbook, etc.)",
              required: false,
              type: "fileUpload",
              weight: 5,
            },
          ],
        },
      ],
    },
  ],
};

type LoanAnswers = Record<string, Record<string, unknown>>;
export function computeScore(answers: LoanAnswers, questions: Question[]) {
  let total = 0;
  let max = 0;

  for (const question of questions) {
    for (const subQuestion of question.subQuestions ?? []) {
      const weight = subQuestion.weight ?? 0;
      const answerObj = answers?.[question.key]?.[subQuestion.key];
      const value = answerObj;

      if (value === undefined || value === null) continue;

      switch (subQuestion.type) {
        case "boolean":
        case "checkbox": {
          if (typeof value === "boolean") {
            total += (value ? 1 : 0) * weight;
            max += Math.abs(weight);
          }
          break;
        }

        case "number": {
          if (typeof value === "number") {
            total += value * weight;
            // We don’t increment `max` unless you define a cap
          }
          break;
        }

        case "radio":
        case "select": {
          // Optional: assign weights to specific enum values
          // e.g., subQuestion.enum = [{ label: "High", value: "high", weight: 3 }]
          const match = subQuestion.enum?.find((opt) => opt.value === value);
          if (match) {
            total += weight;
            max += Math.abs(weight);
          }
          break;
        }

        case "string":
        case "textarea": {
          // Generally not scored unless filled = +weight
          if (typeof value === "string" && value.trim() !== "") {
            total += weight;
            max += Math.abs(weight);
          }
          break;
        }

        default:
          // ignore unknown types
          break;
      }
    }
  }

  // Normalize to 300–900 range
  const raw = total;
  let score = 600 + raw;
  if (score < 300) score = 300;
  if (score > 900) score = 900;

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
