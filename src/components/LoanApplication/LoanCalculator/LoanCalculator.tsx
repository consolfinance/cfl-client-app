"use client";

import { FC, Dispatch, SetStateAction } from "react";
import { Card, View, Text } from "reshaped";
import { CalculatorValues } from "@/types/loans";
import styles from "./LoanCalculator.module.scss";

interface LoanCalculatorProps {
  values: CalculatorValues;
  onChange: Dispatch<SetStateAction<CalculatorValues>>;
}

const LoanCalculator: FC<LoanCalculatorProps> = ({ values, onChange }) => {
  return (
    <Card padding={0} className={styles.root}>
      <View padding={6} backgroundColor="neutral-faded" className={styles.content}>
        <Text variant={"featured-2"}>CALCULATOR</Text>
      </View>
    </Card>
  );
};

export default LoanCalculator;
