"use client";
import { EligibilityFormData } from "@/types/eligibility";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button, Card, Text, View } from "reshaped";
import LoanCard from "./LoanCard";
import { eligibilityMatrix } from "@/utils/dummy/eligibilityCheckData";
import styles from "./Results.module.scss";

interface IResultsProps {
  formData: EligibilityFormData;
  setShowResults: Dispatch<SetStateAction<boolean>>;
}

const Results: FC<IResultsProps> = ({ formData, setShowResults }) => {
  const [isEligible, setIsEligible] = useState<boolean>(false);
  const [eligibleLoans, setEligibleLoans] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");

  const calculateEligibility = () => {
    const allEligibleLoans: string[] = [];

    for (const loanKey in eligibilityMatrix) {
      const loan = eligibilityMatrix[loanKey as keyof typeof eligibilityMatrix];

      // Check if user's job type is valid for this loan
      const jobMatch = loan.acceptedAnswers.some(
        (answer) => String(answer.job_type) === String(formData.job_type)
      );
      if (!jobMatch) continue; // If no match for job type, skip this loan

      // Check if user's income is valid for this loan
      const incomeMatch = loan.acceptedAnswers.some((answer) =>
        String(answer.monthly_income).includes(String(formData.monthly_income))
      );
      if (incomeMatch) {
        allEligibleLoans.push(loanKey); // Add loan to eligible list
      }
    }

    if (allEligibleLoans.length > 0) {
      setEligibleLoans(allEligibleLoans);
      setDescription(`You are eligible for the following loans:`);
      setIsEligible(true);
    } else {
      setDescription(
        "Based on your answers, you are not eligible for any loan products."
      );
      setIsEligible(false);
    }
  };

  useEffect(() => {
    calculateEligibility();
  }, [formData]);

  return (
    <Card>
      <View>
        <Text variant="body-1" color="neutral">
          Eligibility Results
        </Text>
        <Text variant="body-2" color="neutral">
          {description}
        </Text>

        <View className={styles.loansContainer} gap={2}>
          {eligibleLoans.map((loan) => (
            <LoanCard key={loan} eligibleLoan={loan} />
          ))}
        </View>

        <Button
          color="primary"
          variant="outline"
          onClick={() => setShowResults(false)}
        >
          Back to Questions
        </Button>
      </View>
    </Card>
  );
};

export default Results;
