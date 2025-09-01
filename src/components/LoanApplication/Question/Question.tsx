"use client";

import { FC } from "react";
import { Text, View, Switch, TextField } from "reshaped";

interface QuestionProps {
  question: {
    key: string;
    label: string;
    type: unknown;
    options?: { value: string; label: string }[]; // for future select
  };
  value: unknown;
  onChange: (val: unknown) => void;
}

const Question: FC<QuestionProps> = ({ question, value, onChange }) => {
  return (
    <View paddingBlock={2}>
      <Text variant="body-2" weight="medium" className="mb-2">
        {question.label}
      </Text>

      {question.type === "boolean" && (
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
      )}
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
  );
};

export default Question;
