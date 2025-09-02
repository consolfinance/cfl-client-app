"use client";

import { FC, Dispatch, SetStateAction } from "react";
import { Card, Stepper } from "reshaped";
import { loanTypeQuestions } from "@/utils/dummy/loantypes";
import type { Question } from "@/utils/dummy/loantypes";
import styles from "./StepSequencer.module.scss";

interface Step {
  step: number;
  title: string;
  subtitle: string;
  questions: Question[];
}

type LoanSlug = keyof typeof loanTypeQuestions;

interface IStepper {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  steps: Step[];
  answers: { [key: string]: { [key: string]: unknown } };
  loanSlug: LoanSlug;
}

const isStepComplete = (
  currentStep: number,
  loanSlug: LoanSlug,
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
      return answerValue !== undefined && answerValue !== null && answerValue !== "";
    })
  );
};

const StepSequencer: FC<IStepper> = ({ activeStep, steps, answers, loanSlug }) => {
  return (
    <Card>
      <Stepper activeId={activeStep} className={styles.stepper}>
        {steps?.map((step, index) => (
          <Stepper.Item
            key={index}
            title={step.title}
            subtitle={step.subtitle}
            completed={isStepComplete(step.step, loanSlug, answers)}
          />
        ))}
      </Stepper>
    </Card>
  );
};

export default StepSequencer;
