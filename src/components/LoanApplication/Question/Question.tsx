"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import dayjs from "dayjs";
import {
  Button,
  Calendar,
  Card,
  Checkbox,
  FileUpload,
  Radio,
  RadioGroup,
  Text,
  TextArea,
  TextField,
  useToast,
  View,
} from "reshaped";
import { LoanApplicationData } from "@/types/loans";
import { CheckCircle2, UploadIcon, XCircle } from "lucide-react";
import type { Question, SubQuestion } from "@/utils/dummy/loantypes";
import styles from "./Question.module.scss";

type QuestionProps = Question & {
  questionKey: string;
  loanApplicationData: LoanApplicationData;
  setLoanApplicationData: Dispatch<SetStateAction<LoanApplicationData>>;
  supportDocumentsToUpload: Record<string, File | null>;
  setSupportDocumentsToUpload: Dispatch<SetStateAction<Record<string, File | null>>>;
};

const QuestionComponent: FC<QuestionProps> = ({
  label,
  subQuestions,
  questionKey,
  loanApplicationData,
  setLoanApplicationData,
  supportDocumentsToUpload,
  setSupportDocumentsToUpload,
}) => {
  const toast = useToast();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleFileInput = async ({
    value,
    sq,
  }: {
    value: File[];
    event?: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>;
    sq: SubQuestion;
  }) => {
    try {
      //if file is not not of the file types specified in the accept property of the subquestion or application/pdf, show an error toast and return

      if (
        sq.accept &&
        !sq.accept.split(",").some((type) => value?.[0]?.type === type.trim())
      ) {
        toast.show({
          title: "Error",
          text: `Invalid file type.`,
          color: "critical",
          icon: <XCircle />,
          size: "large",
          position: "top-end",
        });

        setSupportDocumentsToUpload((prev) => ({ ...prev, [sq.key]: null }));

        return;
      } else if (!sq.accept && value?.[0]?.type !== "application/pdf") {
        toast.show({
          title: "Error",
          text: "Only PDF files are allowed.",
          color: "critical",
          icon: <XCircle />,
          size: "large",
          position: "top-end",
        });

        setSupportDocumentsToUpload((prev) => ({ ...prev, [sq.key]: null }));
        return;
      }

      const file = value?.[0] ?? null;
      setSupportDocumentsToUpload((prev) => ({ ...prev, [sq.key]: file }));
      setLoanApplicationData((prev) => ({
        ...prev,
        answers: {
          ...prev.answers,
          [questionKey]: {
            ...prev.answers?.[questionKey],
            [sq.key]: file ? file.name : null,
          },
        },
      }));
    } catch (error) {
      console.log({ error });
    }
  };

  const getInput = (sq: SubQuestion) => {
    const value = loanApplicationData?.answers?.[questionKey]?.[sq?.key] ?? "";
    const numberValue = Number(
      loanApplicationData?.answers?.[questionKey]?.[sq?.key] ?? 0,
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

      case "date":
        return (
          <>
            <TextField
              name={sq.key}
              value={dayjs((value as string) ?? new Date()).format("YYYY-MM-DD")}
              placeholder="YYYY-MM-DD"
              onFocus={() => setShowDatePicker(true)}
            />
            {showDatePicker && (
              <Calendar
                value={(value as Date) || new Date()}
                selectedDates={
                  value
                    ? [value instanceof Date ? value : new Date(value as string)]
                    : []
                }
                onChange={(args) => {
                  setShowDatePicker(false);
                  handleChange(args?.value);
                }}
              />
            )}
          </>
        );

      default:
        return null;
    }
  };

  const getKeyName = (key: string) => {
    // change from snake case to Title Case and add .pdf on the end
    return (
      key
        .replace(/_/g, " ")
        .replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
        ) + ".pdf"
    );
  };

  return (
    <Card className={styles.card}>
      <View paddingBlock={2} direction="column" gap={4}>
        <Text variant="body-1" weight="medium" color="primary">
          {label}
        </Text>

        <View direction="column" gap={4}>
          {subQuestions.map((sq) => {
            if (sq.type !== "fileUpload") {
              return (
                <View gap={1} key={sq.key}>
                  <View direction="row">
                    <Text variant="body-3">{sq.label}</Text>
                    {sq.required && sq.type !== "checkbox" && (
                      <Text color="critical">*</Text>
                    )}
                  </View>
                  {sq.subtitle && (
                    <Text variant="caption-1" color="neutral-faded">
                      {sq.subtitle}
                    </Text>
                  )}

                  <View>{getInput(sq)}</View>
                </View>
              );
            }

            return (
              <Card key={sq.key}>
                <View gap={4}>
                  <View
                    direction="row"
                    align="center"
                    gap={2}
                    justify="space-between"
                  >
                    <View direction="row" align="center" gap={2}>
                      <Checkbox
                        name={sq.key}
                        checked={
                          Boolean(supportDocumentsToUpload?.[sq.key]) ||
                          loanApplicationData?.supportingDocuments?.some(
                            (doc) => doc.fileKey === sq.key,
                          )
                        }
                      />
                      <Text>{sq.label}</Text>
                    </View>
                    <FileUpload
                      name={sq.key}
                      inline
                      variant="headless"
                      inputAttributes={{ accept: sq?.accept ?? "application/pdf" }}
                      onChange={({ value }) =>
                        handleFileInput({
                          value,
                          sq,
                        })
                      }
                    >
                      {(props) => (
                        <Button
                          highlighted={props.highlighted}
                          variant="outline"
                          color="primary"
                          icon={<UploadIcon width={20} />}
                        >
                          Upload
                        </Button>
                      )}
                    </FileUpload>
                  </View>
                  {supportDocumentsToUpload?.[sq.key] && (
                    <Card padding={0}>
                      <View
                        direction="row"
                        align="center"
                        justify="space-between"
                        padding={2}
                        gap={2}
                      >
                        <Text variant="caption-1" color="neutral-faded">
                          {supportDocumentsToUpload?.[sq.key]?.name ||
                            getKeyName(sq.key)}
                        </Text>
                        <Button
                          variant="ghost"
                          color="critical"
                          onClick={() =>
                            setSupportDocumentsToUpload((prev) => ({
                              ...prev,
                              [sq.key]: null,
                            }))
                          }
                          icon={<XCircle />}
                          type="button"
                        />
                      </View>
                    </Card>
                  )}
                  {!supportDocumentsToUpload?.[sq.key] &&
                    loanApplicationData?.supportingDocuments?.some(
                      (doc) => doc.fileKey === sq.key,
                    ) && (
                      <Card padding={0}>
                        <View
                          direction="row"
                          align="center"
                          justify="space-between"
                          padding={2}
                          gap={2}
                        >
                          <Text variant="caption-1" color="neutral-faded">
                            {getKeyName(sq.key)}
                          </Text>
                          <Button
                            variant="ghost"
                            color="positive"
                            icon={<CheckCircle2 />}
                          />
                        </View>
                      </Card>
                    )}
                </View>
              </Card>
            );
          })}
        </View>
      </View>
    </Card>
  );
};

export default QuestionComponent;
