"use client";

import { Dispatch, FC, SetStateAction } from "react";
import {
  Card,
  Text,
  View,
  // Switch,
  TextField,
  Radio,
  RadioGroup,
  TextArea,
  Checkbox,
} from "reshaped";
import type { Question, SubQuestion } from "@/utils/dummy/loantypes";
import styles from "./Question.module.scss";
import { LoanApplicationData } from "@/types/loans";

type QuestionProps = Question & {
  questionKey: string;
  loanApplicationData: LoanApplicationData;
  setLoanApplicationData: Dispatch<SetStateAction<LoanApplicationData>>;
};

const Question: FC<QuestionProps> = ({
  key,
  label,
  subQuestions,
  questionKey,
  loanApplicationData,
  setLoanApplicationData,
}) => {
  console.log(`%c--> im justy happy to be here`, "color:#bada55", {
    key,
    label,
    subQuestions,
  });

  const getInput = (sq: SubQuestion) => {
    const value = loanApplicationData?.answers?.[questionKey]?.[sq?.key] ?? "";
    const numberValue = Number(
      loanApplicationData?.answers?.[questionKey]?.[sq?.key] ?? 0
    );

    const handleChange = (val: unknown) => {
      setLoanApplicationData((prev) => ({
        ...prev,
        answers: {
          ...prev.answers,
          [questionKey]: {
            ...prev.answers?.[questionKey],
            [sq.key]: val,
          },
        },
      }));
    };

    switch (sq.type) {
      case "string":
        return (
          <TextField
            name={sq.key}
            value={value as string}
            placeholder={sq.placeholder ?? ""}
            onChange={({ value }) => handleChange(value)}
          />
        );

      case "number":
        return (
          <TextField
            name={sq.key}
            value={String(numberValue)}
            placeholder={sq.placeholder ?? ""}
            onChange={({ value }) => handleChange(value)}
            inputAttributes={{ type: "number" }}
          />
        );

      case "textarea":
        return (
          <TextArea
            name={sq.key}
            value={value as string}
            placeholder={sq.placeholder ?? ""}
            onChange={({ value }) => handleChange(value)}
          />
        );

      case "radio":
        return (
          <RadioGroup
            name={sq.key}
            value={value as string}
            onChange={({ value }) => handleChange(value)}
          >
            {sq.enum?.map((option) => (
              <View className={styles.radioContainer} key={option.value} gap={2}>
                <Radio value={option.value}>{option.label}</Radio>
              </View>
            ))}
          </RadioGroup>
        );

      case "checkbox":
        return (
          <View className={styles.checkboxContainer}>
            <Checkbox
              name={sq.key}
              checked={Boolean(value)}
              onChange={({ checked }) => handleChange(checked)}
            >
              {sq.checkboxText}
            </Checkbox>
          </View>
        );

      // Uncomment and implement as needed:
      // case "boolean":
      //   return (
      //     <Switch
      //       checked={Boolean(value)}
      //       onChange={(checked) => handleChange(checked)}
      //     />
      //   );

      default:
        return null;
    }
  };

  return (
    <Card className={styles.card}>
      <View paddingBlock={2} direction="column" gap={4}>
        <Text variant="body-1" weight="medium" color="primary">
          {label}
        </Text>

        <View direction="column" gap={4}>
          {subQuestions.map((sq) => {
            return (
              <View gap={1} key={sq.key}>
                <View direction="row">
                  <Text variant="body-3">{sq.label}</Text>
                  {sq.required && <Text color="critical">*</Text>}
                </View>
                {sq.subtitle && (
                  <Text variant="caption-1" color="neutral-faded">
                    {sq.subtitle}
                  </Text>
                )}

                <View>{getInput(sq)}</View>
              </View>
            );
          })}
        </View>

        {/* {question.type === "boolean" && (
          <Switch
            name={question.key}
            checked={Boolean(value)}
            onChange={(e) => onChange(e.checked)}
          />
        )}

        {question.type === "number" && (
          <TextField
            name={question.key}
            value={
              typeof value === "string"
                ? value
                : value !== undefined && value !== null
                ? String(value)
                : ""
            }
            onChange={(e) => onChange(Number(e.value))}
            inputAttributes={{ type: "number" }}
          />
        )} */}
        {/* 
      {question.type === "select" && question.options && (
        <select
          className="w-full border rounded-md p-2"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select an option</option>
          {question.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select> */}
      </View>
    </Card>
  );
};

export default Question;
