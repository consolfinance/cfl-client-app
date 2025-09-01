import type { loanTypeQuestions } from "@/utils/dummy/loantypes";
export interface CalculatorValues {
  amount: number;
  term: number;
  interestRate: number;
}

export type LoanTypeSlug = keyof typeof loanTypeQuestions;

export type LoanApplicationData = {
  loanType: string;
  loanSlug: LoanTypeSlug;
  currentStep: number;
  documentId: string;
  grade: string;
  score: number;
  answers: Record<string, unknown>;
  applicationStatus?: string;
};
