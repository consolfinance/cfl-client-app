"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Text, View } from "reshaped";
import { dummyLoanTypes } from "@/utils/dummy/loantypes";
import styles from "./LoanCard.module.scss";

interface IStepSequencerProps {
  eligibleLoan: string;
}

const LoanCard: FC<IStepSequencerProps> = ({ eligibleLoan }) => {
  const loan = dummyLoanTypes.find((loan) => loan.slug === eligibleLoan);

  if (!loan) {
    return null;
  }

  return (
    <Card className={styles.root}>
      <View>
        <Text variant="body-1" color="neutral">
          {loan.name}
        </Text>
        <Text variant="body-3" color="neutral-faded">
          {loan.description}
        </Text>
        <Button
          href={`/${loan.slug}/apply`}
          variant="outline"
          color="primary"
          fullWidth
        >
          Apply Now
        </Button>
      </View>
    </Card>
  );
};

export default LoanCard;
