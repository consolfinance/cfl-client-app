import { EligibilityStep } from "@/types/eligibility";

export const eligibilityQuestions: EligibilityStep[] = [
  {
    key: "personal_info",
    label: "Your Details",
    questions: [
      {
        key: "full_name",
        label: "Full Name",
        type: "text",
        required: true,
      },
      {
        key: "phone_number",
        label: "Phone Number",
        type: "text",
        required: true,
        // onChange: (value: string) => {
        //   // Simple phone number validation
        //   const phoneRegex = /^[0-9]{10,15}$/;
        // }
      },
      {
        key: "email",
        label: "Email Address",
        type: "email",
        required: true,
      },
      {
        key: "national_id",
        label: "National ID Number",
        type: "text",
        required: true,
      },
      {
        key: "employment_number",
        label: "Employment Number",
        type: "number",
        required: true,
      },
      {
        key: "date_last_paid",
        label: "Date Last Paid",
        type: "date",
        required: true,
      },
    ],
  },
  {
    key: "goals",
    label: "Your Goals",
    questions: [
      {
        key: "job_type",
        label: "What best describes you?",
        type: "select",
        placeholder: "Select an option",
        options: [
          { label: "I own a small, medium business", value: "business_owner" },
          {
            label: "I work for the government or public sector",
            value: "civil_servant",
          },
          { label: "I work for a private company", value: "private_employee" },
          { label: "I am self-employed", value: "self_employed" },
          { label: "I am unemployed", value: "unemployed" },
          {
            label: "Other",
            value: "other",
          },
        ],
        required: true,
      },
      {
        key: "loan_purpose",
        label: "What is the main purpose for seeking a loan?",
        type: "select",
        placeholder: "Select an option",
        options: [
          { label: "Pay school fees", value: "school_fees" },
          {
            label: "Cover emergency or medical expenses",
            value: "emergency_medical",
          },
          { label: "Manage cash flow for my workers' salaries", value: "cash_flow" },
          { label: "Purchase inventory or supplies", value: "inventory_supplies" },
          { label: "Send money to family or dependents", value: "send_money" },
          { label: "Other", value: "other" },
        ],
        required: true,
      },
      {
        key: "loan_amount",
        label: "How much are you looking to borrow (in MWK)?",
        type: "select",
        placeholder: "Select an option",

        options: [
          { label: "Under K100,000", value: "under_100k" },
          { label: "K100,000 - K500,000", value: "100k_500k" },
          { label: "K500,000 - K1,000,000", value: "500k_1M" },
          { label: "K1,000,000 - K2,000,000", value: "1M_2M" },
        ],
        required: true,
      },
      {
        key: "monthly_income",
        label: "What is your approximate monthly income (in MWK)?",
        type: "select",
        placeholder: "Select an option",

        options: [
          { label: "K100,000 - K300,000", value: "100k_300k" },
          { label: "K300,000 - K500,000", value: "300k_500k" },
          { label: "K500,000 - K1,000,000", value: "500k_1M" },
          { label: "K1,000,000 - K2,000,000", value: "1M_2M" },
          { label: "Over K2,000,000", value: "over_2M" },
        ],
        required: true,
      },
    ],
  },
];

export const eligibilityMatrix = {
  "credit-builder-loan": {
    url: "/loan-application/credit-builder-loan",
    acceptedAnswers: [
      {
        job_type: "civil_servant",
        monthly_income: ["100k_300k", "300k_500k", "500k_1M", "1M_2M", "over_2M"],
      },
      {
        job_type: "private_employee",
        monthly_income: ["500k_1M", "1M_2M", "over_2M"],
      },
    ],
  },
  "growth-loan": {
    url: "/loan-application/growth-loan",
    acceptedAnswers: [
      {
        job_type: "civil_servant",
        monthly_income: ["1M_2M", "over_2M"],
      },
      {
        job_type: "private_employee",
        monthly_income: ["over_2M"],
      },
    ],
  },
};
