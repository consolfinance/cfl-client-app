"use client";

import { FC, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Stepper, View } from "reshaped";

import styles from "./StepSequencer.module.scss";

interface IStepper {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  steps: unknown[];
}

const StepSequencer: FC<IStepper> = ({ activeStep, steps, setActiveStep }) => {
  return (
    <Card>
      <Stepper
        activeId={activeStep}
        // labelDisplay={{ s: "hidden", m: "inline" }}
        className={styles.stepper}
      >
        {steps?.map((step, index) => (
          <Stepper.Item
            key={index}
            title={step.title}
            subtitle={step.subtitle}
            // completed={step.questions.every((q) => {
            //   const answer = answers[q.key];
            //   return typeof answer === "boolean" ? true : Boolean(answer);
            // })}
          />
        ))}
      </Stepper>
    </Card>
  );
};

export default StepSequencer;
