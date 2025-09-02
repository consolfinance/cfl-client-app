"use client";

import { FC, Dispatch, SetStateAction } from "react";
import Question from "../Question/Question";
import { loanTypeQuestions } from "@/utils/dummy/loantypes";
import styles from "./ApplicationSteps.module.scss";
import { LoanApplicationData } from "@/types/loans";
import type { SubQuestion } from "@/utils/dummy/loantypes";
type LoanTypeSlug = keyof typeof loanTypeQuestions;

interface ApplicationStepsProps {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  slug: LoanTypeSlug;
  loanApplicationData: LoanApplicationData;
  setLoanApplicationData: Dispatch<SetStateAction<LoanApplicationData>>;
}

const ApplicationSteps: FC<ApplicationStepsProps> = ({
  loanApplicationData,
  activeStep,
  slug,
  setLoanApplicationData,
}) => {
  return (
    <div className={styles.questionsWrapper}>
      {loanTypeQuestions[slug]?.[activeStep]?.questions.map((q) => {
        return (
          <Question
            key={q.key}
            questionKey={q.key}
            loanApplicationData={loanApplicationData}
            setLoanApplicationData={setLoanApplicationData}
            label={q.label}
            subQuestions={q.subQuestions as SubQuestion[]}
          />
        );
      })}
    </div>
  );
};

export default ApplicationSteps;
