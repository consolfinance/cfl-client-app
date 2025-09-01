"use client";

import { FC, useEffect, useState, Dispatch, SetStateAction } from "react";
import { Badge, Card, Text, View } from "reshaped";
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

  const showCalculator = JSON.parse(
    process.env.NEXT_PUBLIC_APP_SHOW_CALCULATOR || "false"
  );

  const getBadgeColor = () => {
    switch (loanApplicationData.applicationStatus) {
      case "draft":
        return "neutral";
      case "submitted":
        return "positive";
      case "approved":
        return "positive";
      case "rejected":
        return "critical";
      default:
        return "neutral";
    }
  };

  const getScoreColor = () => {
    switch (loanApplicationData.grade) {
      case "A":
        return "positive";
      case "B":
        return "positive";
      case "C":
        return "warning";
      default:
        return "critical";
    }
  };

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
    <Card padding={0} className={styles.card}>
      <View
        gap={4}
        padding={6}
        className={styles.root}
        backgroundColor="elevation-base"
      >
        <View align="center" gap={2} justify={"space-between"} direction={"row"}>
          <Text variant="featured-2" color="primary">
            {loan.name}
          </Text>

          <View align="center" gap={2} justify={"space-between"} direction={"row"}>
            {loanApplicationData.applicationStatus !== "draft" && (
              <View direction={"row"} gap={2} align="center">
                <Text variant="body-1" color="neutral">
                  Your Score:{" "}
                </Text>
                <Text variant="body-1" color={getScoreColor()} weight={"bold"}>
                  {loanApplicationData?.score || 0} (
                  {loanApplicationData?.grade || "N/A"})
                </Text>
              </View>
            )}
            <Badge
              color={getBadgeColor()}
              size="large"
              className={styles.statusBadge}
            >
              {loanApplicationData?.applicationStatus || "draft"}
            </Badge>
          </View>
        </View>

        <div className={styles.content}>
          {showCalculator && (
            <LoanCalculator
              values={calculatorValues}
              onChange={setCalculatorValues}
            />
          )}

          <ApplicationSteps
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            slug={loanSlug}
            loanApplicationData={loanApplicationData}
            setLoanApplicationData={setLoanApplicationData}
          />
        </div>
      </View>
    </Card>
  );
};

export default Overview;
