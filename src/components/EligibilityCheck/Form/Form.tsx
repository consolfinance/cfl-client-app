"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import styles from "./Form.module.scss";
import { Calendar, Select, TextField, View } from "reshaped";
import dayjs from "dayjs";
import {
  EligibilityFormData,
  eligibilityQuestion,
  EligibilityStep,
  FormAnswer,
} from "@/types/eligibility";

interface IFormProps {
  currentStep: number;
  currentQuestion: EligibilityStep;
  formData: EligibilityFormData;
  setFormData: Dispatch<SetStateAction<EligibilityFormData>>;
  onNext: () => void;
  onBack: () => void;
}

const Form: FC<IFormProps> = ({
  currentStep,
  currentQuestion,
  formData,
  setFormData,
  onNext,
  onBack,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const renderInput = (question: eligibilityQuestion) => {
    switch (question.type) {
      case "text":
        return (
          <TextField
            name={question.key}
            value={
              formData?.[question?.key] != null
                ? String(formData?.[question?.key])
                : ""
            }
            onChange={(args) => {
              const { value } = args;
              setFormData((prev: EligibilityFormData) => ({
                ...prev,
                [question.key]: value as unknown as FormAnswer,
              }));
            }}
          />
        );
      case "email":
        return (
          <TextField
            name={question.key}
            value={
              formData?.[question?.key] != null
                ? String(formData?.[question?.key])
                : ""
            }
            inputAttributes={{ type: "email" }}
            onChange={(args) => {
              const { value } = args;
              setFormData((prev: EligibilityFormData) => ({
                ...prev,
                [question.key]: value as unknown as FormAnswer,
              }));
            }}
          />
        );
      case "date":
        return (
          <>
            <TextField
              name={question.key}
              value={
                question.key in formData
                  ? dayjs(String(formData?.[question?.key])).format("YYYY-MM-DD")
                  : ""
              }
              placeholder="YYYY-MM-DD"
              onFocus={() => setShowDatePicker(true)}
            />
            {showDatePicker && (
              <Calendar
                value={
                  question.key in formData
                    ? new Date(String(formData?.[question?.key]))
                    : new Date()
                }
                selectedDates={
                  question.key in formData
                    ? [new Date(String(formData?.[question?.key]))]
                    : []
                }
                onChange={(args) => {
                  setShowDatePicker(false);
                  console.log("Selected date:", args);
                  setFormData((prev: EligibilityFormData) => ({
                    ...prev,
                    [question.key]:
                      args.value.toISOString() as unknown as FormAnswer,
                  }));
                }}
              />
            )}
          </>
        );
      case "select":
        return (
          <View>
            <Select
              name={question.key}
              options={
                question?.options?.map((opt) => ({
                  label: opt.label,
                  value: opt.value,
                })) || []
              }
              onChange={(option) => {
                console.log("Selected value:", { option, formData });
                setFormData((prev: EligibilityFormData) => ({
                  ...prev,
                  [question.key]: option.value as unknown as FormAnswer,
                }));
              }}
              value={String(formData?.[question?.key] ?? "")}
              placeholder={question.placeholder || "Select an option"}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.formContainer}>
        {currentQuestion.questions.map((question) => (
          <div key={question.key} className={styles.formGroup}>
            <div>
              <label>{question.label}</label>{" "}
              {question.required && (
                <span className={styles.requiredAsterisk}>*</span>
              )}
            </div>
            {renderInput(question)}
          </div>
        ))}
      </div>

      <div className={styles.buttonGroup}>
        <button onClick={onBack} disabled={currentStep === 0}>
          Back
        </button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default Form;
