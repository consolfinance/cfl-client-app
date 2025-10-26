"use client";

import { FC, useState } from "react";
import Form from "./Form/Form";
import StepSequencer from "./StepSequencer/StepSequencer";
import { eligibilityQuestions } from "@/utils/dummy/eligibilityCheckData";

const EligibilityCheck: FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, eligibilityQuestions.length - 1));
  };
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div>
      <StepSequencer
        steps={eligibilityQuestions.map((question, index) => ({
          key: question.key,
          label: question.label,
          isCompleted: index < currentStep,
        }))}
      />

      <Form
        formData={formData}
        setFormData={setFormData}
        currentStep={currentStep}
        currentQuestion={eligibilityQuestions[currentStep]}
        onNext={handleNext}
        onBack={handleBack}
      />
    </div>
  );
};

export default EligibilityCheck;
