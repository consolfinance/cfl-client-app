"use client";

import { FC } from "react";
import { Text } from "@radix-ui/themes";
import styles from "./ApplicationsOverview.module.scss";
import { dummyLoanTypes } from "@/utils/dummy/loantypes";
import LoanCard from "../LoanCard/LoanCard";

const ApplicationsOverview: FC = () => {
  return (
    <div className={styles.root}>
      <Text size="4">Start a new application or continue where you left off.</Text>
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
    </div>
  );
};

export default ApplicationsOverview;
