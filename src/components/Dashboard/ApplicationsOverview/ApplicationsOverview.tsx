"use client";

import { FC } from "react";
import { Text, View } from "reshaped";
import LoanCard from "../LoanCard/LoanCard";
import { dummyLoanTypes } from "@/utils/dummy/loantypes";
import styles from "./ApplicationsOverview.module.scss";

const ApplicationsOverview: FC = () => {
  return (
    <View className={styles.root} backgroundColor="elevation-base">
      <div className={styles.header}>
        <Text variant="featured-3" weight="bold">
          Loan Applications
        </Text>
        <Text variant="caption-1" color="neutral-faded">
          Start a new application or continue where you left off.
        </Text>
      </div>

      <div className={styles.loansOverview}>
        {dummyLoanTypes?.map((loan) => (
          <LoanCard
            key={loan.id}
            id={loan.id}
            name={loan.name}
            type={loan.type}
            slug={loan.slug}
            description={loan.description}
          />
        ))}
      </div>
    </View>
  );
};

export default ApplicationsOverview;
