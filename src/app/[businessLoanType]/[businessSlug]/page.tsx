"use client";

import { FC } from "react";
import { useParams, notFound } from "next/navigation";
import Overview from "@/components/LoanApplication/Overview/Overview";
import { dummyLoanTypes } from "@/utils/dummy/loantypes";
import type { LoanType, loanTypeQuestions } from "@/utils/dummy/loantypes";
import styles from "./page.module.scss";

type LoanTypeSlug = keyof typeof loanTypeQuestions;
const LoanApplicationPage: FC = () => {
  const params = useParams();

  // Destructure from `params` with runtime safety
  const businessLoanType = params.businessLoanType as string;
  const businessSlug = params.businessSlug as string;

  // Runtime type guard for LoanType
  const isValidLoanType = (type: string): type is LoanType =>
    ["personal", "business"].includes(type);

  const isValid =
    isValidLoanType(businessLoanType) &&
    dummyLoanTypes.some(
      (loan) => loan.slug === businessSlug && loan.type === businessLoanType
    );

  if (!isValid) {
    notFound();
  }

  return (
    <div className={styles.root}>
      <Overview
        loanType={businessLoanType}
        loanSlug={businessSlug as LoanTypeSlug}
      />
    </div>
  );
};

export default LoanApplicationPage;
