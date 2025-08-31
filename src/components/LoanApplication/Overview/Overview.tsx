"use client";

import { FC, useEffect, useState, Dispatch, SetStateAction } from "react";
import { Text } from "reshaped";
import ApplicationSteps from "../ApplicationSteps/ApplicationSteps";
import LoanCalculator from "../LoanCalculator/LoanCalculator";
import { dummyLoanTypes, loanTypeQuestions } from "@/utils/dummy/loantypes";
import type {} from "@/utils/dummy/loantypes";
import type { LoanApplicationData } from "@/types/loans";

import { CalculatorValues } from "@/types/loans";
import styles from "./Overview.module.scss";
interface OverviewProps {
  loanApplicationData: LoanApplicationData;
  setLoanApplicationData: Dispatch<SetStateAction<LoanApplicationData>>;
}

const Overview: FC<OverviewProps> = ({
  loanApplicationData,
  setLoanApplicationData,
}) => {
  const { loanType, loanSlug } = loanApplicationData;
  const [calculatorValues, setCalculatorValues] = useState<CalculatorValues>({
    amount: 0,
    term: 0,
    interestRate: 0,
  });

  const [activeStep, setActiveStep] = useState(
    loanApplicationData?.currentStep || 0
  );
  const loan = dummyLoanTypes.find(
    (l) => l.type === loanType && l.slug === loanSlug
  );

  useEffect(() => {
    loanTypeQuestions[loanSlug]?.forEach((step) => {
      step.questions.forEach((q) => {
        if (
          !loanApplicationData?.answers ||
          loanApplicationData?.answers[q.key] === undefined ||
          loanApplicationData?.answers[q.key] === null
        ) {
          if (q.type === "boolean") {
            setLoanApplicationData((prev) => ({
              ...prev,
              answers: { ...prev.answers, [q.key]: false },
            }));
          }
          if (q.type === "number") {
            setLoanApplicationData((prev) => ({
              ...prev,
              answers: { ...prev.answers, [q.key]: 0 },
            }));
          }
        }
      });
    });
  }, [loanSlug, loanApplicationData?.answers]);

  if (!loan) {
    return null;
  }

  return (
    <div>
      <Text variant="featured-2" color="primary">
        {loan.name}
      </Text>

      <div className={styles.content}>
        {1 < 2 && (
          <LoanCalculator values={calculatorValues} onChange={setCalculatorValues} />
        )}

        <ApplicationSteps
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          slug={loanSlug}
          loanApplicationData={loanApplicationData}
          setLoanApplicationData={setLoanApplicationData}
        />
      </div>
    </div>
  );
};

export default Overview;
