"use client";

import { FC, Dispatch, SetStateAction } from "react";
import { Button, Card, Stepper, View } from "reshaped";
import Question from "../Question/Question";
import { loanTypeQuestions } from "@/utils/dummy/loantypes";
import styles from "./ApplicationSteps.module.scss";
import { LoanApplicationData } from "@/types/loans";

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
  setActiveStep,
  slug,
  setLoanApplicationData,
}) => {
  const handleSave = async (buttonType: "back" | "next") => {
    try {
      let newStep = activeStep;
      if (buttonType === "back") {
        newStep = Math.max(activeStep - 1, 0);
      } else {
        newStep = Math.min(activeStep + 1, loanTypeQuestions[slug]?.length - 1);
      }

      const payload = JSON.stringify({
        ...loanApplicationData,
        currentStep: newStep,
        isComplete: newStep === loanTypeQuestions[slug]?.length - 1,
        applicationStatus:
          newStep === loanTypeQuestions[slug]?.length - 1 ? "submitted" : "draft",
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

      setActiveStep(newStep);
    } catch (error) {
      console.error("Error saving step:", error);
    }
  };

  return (
    <Card padding={0} className={styles.card}>
      <View className={styles.root} padding={8} backgroundColor="elevation-overlay">
        <div className={styles.stepperWrapper}>
          <Stepper
            activeId={activeStep}
            labelDisplay={{ s: "hidden", m: "inline" }}
            className={styles.stepper}
          >
            {loanTypeQuestions[slug]?.map((step, index) => (
              <Stepper.Item
                key={index}
                title={step.title}
                // completed={step.questions.every((q) => {
                //   const answer = answers[q.key];
                //   return typeof answer === "boolean" ? true : Boolean(answer);
                // })}
              />
            ))}
          </Stepper>
        </div>

        <div className={styles.questionsWrapper}>
          {loanTypeQuestions[slug]?.[activeStep]?.questions.map((q) => {
            console.log({ loanApplicationData, q });

            return (
              <Question
                key={q.key}
                question={q}
                value={
                  loanApplicationData?.answers
                    ? loanApplicationData.answers[q.key]
                    : undefined
                }
                onChange={(val) =>
                  setLoanApplicationData((prev) => ({
                    ...prev,
                    answers: { ...prev.answers, [q.key]: val },
                  }))
                }
              />
            );
          })}
        </div>

        <div className={styles.buttons}>
          <Button
            className={styles.button}
            variant="solid"
            color="primary"
            onClick={() => {
              handleSave("back");
            }}
          >
            Back
          </Button>
          <Button
            className={styles.button}
            variant="solid"
            color="primary"
            onClick={() => {
              handleSave("next");
            }}
            // disabled={
            //   //if its the last step and theres an incomplete non boolean question
            //   activeStep === loanTypeQuestions[slug]?.length - 1 &&
            //   !loanTypeQuestions[slug]?.[activeStep]?.questions.every((q) => {
            //     const answer = answers[q.key];
            //     console.log({ answer });
            //     return typeof answer === "boolean" ? true : Boolean(answer);
            //   })
            // }
          >
            {activeStep === loanTypeQuestions[slug]?.length - 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </View>
    </Card>
  );
};

export default ApplicationSteps;
