"use client";

import { FC } from "react";
import { useParams, notFound } from "next/navigation";
import { dummyLoanTypes } from "@/utils/dummy/loantypes";
import type { LoanType } from "@/utils/dummy/loantypes";

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

  return <div>Loan Application Page</div>;
};

export default LoanApplicationPage;
