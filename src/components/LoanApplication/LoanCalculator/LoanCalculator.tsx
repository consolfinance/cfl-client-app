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
        <input
          type="number"
          value={values.amount}
          onChange={(e) => onChange({ ...values, amount: Number(e.target.value) })}
        />
        <input
          type="number"
          value={values.term}
          onChange={(e) => onChange({ ...values, term: Number(e.target.value) })}
        />
        <input
          type="number"
          value={values.interestRate}
          onChange={(e) =>
            onChange({ ...values, interestRate: Number(e.target.value) })
          }
        />
      </View>
    </Card>
  );
};

export default LoanCalculator;
