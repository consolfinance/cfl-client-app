"use client";

import { FC, useEffect, useState, Dispatch, SetStateAction } from "react";
import { Badge, Button, Card, Text, useToast, View } from "reshaped";
import { ArrowLeft, ArrowRight, XCircle } from "lucide-react";
import ApplicationSteps from "../ApplicationSteps/ApplicationSteps";
import LoanCalculator from "../LoanCalculator/LoanCalculator";
import {
  computeScore,
  dummyLoanTypes,
  loanTypeQuestions,
} from "@/utils/dummy/loantypes";
import type { Question } from "@/utils/dummy/loantypes";
import type { LoanApplicationData } from "@/types/loans";

import StepSequencer from "../Stepper/StepSequencer";
import { CalculatorValues } from "@/types/loans";
import styles from "./Overview.module.scss";

interface Step {
  step: number;
  title: string;
  subtitle: string;
  questions: Question[];
}

interface OverviewProps {
  loanApplicationData: LoanApplicationData;
  setLoanApplicationData: Dispatch<SetStateAction<LoanApplicationData>>;
}

const Overview: FC<OverviewProps> = ({
  loanApplicationData,
  setLoanApplicationData,
}) => {
  const toast = useToast();

  const { loanType, loanSlug } = loanApplicationData;
  const [calculatorValues, setCalculatorValues] = useState<CalculatorValues>({
    amount: 0,
    term: 0,
    interestRate: 0,
  });
  const [scoreColor, setScoreColor] = useState<
    "positive" | "warning" | "critical" | "neutral"
  >("neutral");
  const [badgeColor, setBadgeColor] = useState<
    "positive" | "warning" | "critical" | "neutral"
  >("neutral");

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

  const isStepComplete = (
    currentStep: number,
    answers: { [key: string]: { [key: string]: unknown } }
  ): boolean => {
    const stepData = loanTypeQuestions[loanSlug]?.find(
      (step) => step.step === currentStep
    );
    if (!stepData) return false;

    return stepData.questions.every((question) =>
      question.subQuestions.every((subQuestion) => {
        if (!subQuestion.required) return true;

        const answerValue = answers?.[question.key]?.[subQuestion.key];

        // Check that required value is not undefined, null, or empty string
        return (
          answerValue !== undefined && answerValue !== null && answerValue !== ""
        );
      })
    );
  };
  const handleNext = async () => {
    try {
      // First check if all required fields are filled

      if (!isStepComplete(activeStep, loanApplicationData.answers)) {
        // Show an error message or highlight the incomplete fields
        toast.show({
          title: "Error",
          text: "Please fill all required fields.",
          color: "critical",
          icon: <XCircle />,
          size: "large",
          position: "top-end",
        });
        console.error("Please fill all required fields");
        return;
      }

      const nextStep = Math.min(
        activeStep + 1,
        (loanTypeQuestions[loanSlug]?.length || 1) - 1
      );

      const isLastStep =
        activeStep === (loanTypeQuestions[loanSlug]?.length || 1) - 1;

      const questions = loanTypeQuestions["set-up-loan"].flatMap(
        (step) => step.questions
      );

      const scoreData = isLastStep
        ? computeScore(loanApplicationData.answers, questions as Question[])
        : { score: loanApplicationData.score, grade: loanApplicationData.grade };

      const payload = JSON.stringify({
        ...loanApplicationData,
        currentStep: nextStep,
        isComplete: isLastStep,
        applicationStatus: isLastStep ? "submitted" : "draft",
        ...scoreData,
        createdAt: undefined,
        updatedAt: undefined,
        locale: undefined,
        publishedAt: undefined,
      });

      const response = await fetch(
        `/api/application/${loanApplicationData.documentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: payload,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save application step");
      }

      // Proceed to the next step
      setActiveStep((prev) =>
        Math.min(prev + 1, loanTypeQuestions[loanSlug]?.length - 1)
      );
      setLoanApplicationData((prev) => ({
        ...prev,
        ...JSON.parse(payload),
      }));
    } catch (error) {
      console.error("Error saving step:", error);
    }
  };

  const handleBack = async () => {
    try {
      const payload = {
        ...loanApplicationData,
        currentStep: activeStep - 1,
        applicationStatus: "draft",
        isComplete: false,
        score: null,
        grade: null,
        createdAt: undefined,
        updatedAt: undefined,
        locale: undefined,
        publishedAt: undefined,
      };

      const response = await fetch(
        `/api/application/${loanApplicationData.documentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save application step");
      }

      setActiveStep((prev) => Math.max(prev - 1, 0));
      setLoanApplicationData((prev) => ({
        ...prev,
        currentStep: activeStep - 1,
        applicationStatus: "draft",
        isComplete: false,
        score: 0,
        grade: "",
      }));
    } catch (error) {
      console.error("Error saving step:", error);
    }
  };

  useEffect(() => {
    console.log(`%c--> In UseEffect`, "color: blue;", { loanApplicationData });
    const newBadgeColor = getBadgeColor();
    setBadgeColor(newBadgeColor);
    const newScoreColor = getScoreColor();
    setScoreColor(newScoreColor);
  }, [
    loanApplicationData,
    loanApplicationData.applicationStatus,
    loanApplicationData.score,
  ]);

  useEffect(() => {
    loanTypeQuestions[loanSlug]?.forEach((step) => {
      step.questions.forEach((q) => {
        q?.subQuestions?.forEach((sq) => {
          if (!loanApplicationData?.answers?.[q?.key]?.[sq?.key]) {
            if (sq.type === "boolean") {
              setLoanApplicationData((prev) => ({
                ...prev,
                answers: {
                  ...prev.answers,
                  [q.key]: {
                    ...prev?.answers?.[q.key],
                    [sq.key]: false,
                  },
                },
              }));
            }
            if (sq.type === "number") {
              setLoanApplicationData((prev) => ({
                ...prev,
                answers: {
                  ...prev.answers,
                  [q.key]: {
                    ...prev?.answers?.[q.key],
                    [sq.key]: 0,
                  },
                },
              }));
            }
            if (sq.type === "string") {
              setLoanApplicationData((prev) => ({
                ...prev,
                answers: {
                  ...prev.answers,
                  [q.key]: {
                    ...prev?.answers?.[q.key],
                    [sq?.key]: "",
                  },
                },
              }));
            }
            if (sq.type === "textarea") {
              setLoanApplicationData((prev) => ({
                ...prev,
                answers: {
                  ...prev.answers,
                  [q.key]: {
                    ...prev?.answers?.[q.key],
                    [sq?.key]: "",
                  },
                },
              }));
            }
          }
        });
      });
    });
  }, [loanSlug]);

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
                <Text variant="body-1" color={scoreColor} weight={"bold"}>
                  {loanApplicationData?.score || 0} (
                  {loanApplicationData?.grade || "N/A"})
                </Text>
              </View>
            )}
            <Badge color={badgeColor} size="large" className={styles.statusBadge}>
              {loanApplicationData?.applicationStatus || "draft"}
            </Badge>
          </View>
        </View>

        <StepSequencer
          activeStep={activeStep}
          steps={(loanTypeQuestions[loanSlug] || []) as Step[]}
          setActiveStep={setActiveStep}
          loanSlug={loanSlug}
          answers={loanApplicationData.answers}
        />

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

        <div className={styles.actions}>
          {activeStep > 0 && (
            <Button
              icon={<ArrowLeft />}
              variant="outline"
              className={styles.button}
              onClick={handleBack}
              color="primary"
            >
              Previous
            </Button>
          )}
          <Button
            endIcon={<ArrowRight />}
            variant={
              activeStep === (loanTypeQuestions[loanSlug]?.length || 1) - 1
                ? "solid"
                : "outline"
            }
            onClick={handleNext}
            className={styles.button}
            color="primary"
          >
            {activeStep === (loanTypeQuestions[loanSlug]?.length || 1) - 1
              ? "Submit"
              : "Next"}
          </Button>
        </div>
      </View>
    </Card>
  );
};

export default Overview;
