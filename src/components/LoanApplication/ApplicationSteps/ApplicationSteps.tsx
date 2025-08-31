"use client";

import { FC, useState, Dispatch, SetStateAction } from "react";
import { Button, Card, Stepper, View } from "reshaped";
import Question from "../Question/Question";
import { loanTypeQuestions } from "@/utils/dummy/loantypes";
import styles from "./ApplicationSteps.module.scss";

type LoanTypeSlug = keyof typeof loanTypeQuestions;

interface ApplicationStepsProps {
  slug: LoanTypeSlug;
  answers: Record<string, unknown>;
  setAnswers: Dispatch<SetStateAction<Record<string, unknown>>>;
}

const ApplicationSteps: FC<ApplicationStepsProps> = ({
  answers,
  slug,
  setAnswers,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Card padding={0} className={styles.card}>
      <View className={styles.root} padding={8} backgroundColor="neutral-faded">
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
                completed={step.questions.every((q) => {
                  const answer = answers[q.key];
                  return typeof answer === "boolean" ? true : Boolean(answer);
                })}
              />
            ))}
          </Stepper>
        </div>

        <div className={styles.questionsWrapper}>
          {loanTypeQuestions[slug]?.[activeStep]?.questions.map((q) => (
            <Question
              key={q.key}
              question={q}
              value={answers[q.key]}
              onChange={(val) => setAnswers((prev) => ({ ...prev, [q.key]: val }))}
            />
          ))}
        </div>

        <div className={styles.buttons}>
          <Button
            className={styles.button}
            variant="solid"
            color="primary"
            onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
          >
            Back
          </Button>
          <Button
            className={styles.button}
            variant="solid"
            color="primary"
            onClick={() => {
              setActiveStep((prev) =>
                Math.min(prev + 1, loanTypeQuestions[slug]?.length - 1)
              );
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
