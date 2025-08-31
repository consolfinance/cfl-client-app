"use client";

import { FC, useEffect, useState } from "react";
import { Text } from "reshaped";
import LoanCalculator from "../LoanCalculator/LoanCalculator";
import { dummyLoanTypes, loanTypeQuestions } from "@/utils/dummy/loantypes";

import type { LoanType } from "@/utils/dummy/loantypes";
import { CalculatorValues } from "@/types/loans";
import ApplicationSteps from "../ApplicationSteps/ApplicationSteps";

type LoanTypeSlug = keyof typeof loanTypeQuestions;
interface OverviewProps {
  loanType: LoanType;
  loanSlug: LoanTypeSlug;
}

const Overview: FC<OverviewProps> = ({ loanType, loanSlug }) => {
  const [calculatorValues, setCalculatorValues] = useState<CalculatorValues>({
    amount: 0,
    term: 0,
    interestRate: 0,
  });
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  console.log({ answers });
  const loan = dummyLoanTypes.find(
    (l) => l.type === loanType && l.slug === loanSlug
  );

  useEffect(() => {
    loanTypeQuestions[loanSlug]?.forEach((step) => {
      step.questions.forEach((q) => {
        if (q.type === "boolean") {
          setAnswers((prev) => ({ ...prev, [q.key]: false }));
        }
        if (q.type === "number") {
          setAnswers((prev) => ({ ...prev, [q.key]: 0 }));
        }
      });
    });
  }, [loanSlug]);

  if (!loan) {
    return null;
  }

  return (
    <div>
      <Text variant="featured-2" color="primary">
        {loan.name}
      </Text>

      {1 < 0 && (
        <LoanCalculator values={calculatorValues} onChange={setCalculatorValues} />
      )}

      <ApplicationSteps slug={loanSlug} answers={answers} setAnswers={setAnswers} />
    </div>
  );
};

export default Overview;
