"use client";

import { FC } from "react";
import { Card, Stepper } from "reshaped";

interface IStepSequencerProps {
  steps: {
    key: string;
    label: string;
    isCompleted: boolean;
  }[];
}

const StepSequencer: FC<IStepSequencerProps> = ({ steps }) => {
  return (
    <div>
      <Card>
        <Stepper activeId={steps.findIndex((step) => !step.isCompleted)}>
          {steps.map((step) => (
            <Stepper.Item
              key={step.key}
              title={step.label}
              completed={step.isCompleted}
            />
          ))}
        </Stepper>
      </Card>
    </div>
  );
};

export default StepSequencer;
