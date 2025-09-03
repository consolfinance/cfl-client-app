"use client";

import { FC, useEffect, useCallback, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Overview from "@/components/LoanApplication/Overview/Overview";
import type { LoanApplicationData } from "@/types/loans";
import styles from "./page.module.scss";

const LoanApplicationPage: FC = () => {
  const router = useRouter();
  const params = useParams();
  const applicationId = params.applicationId;

  const [loanApplicationData, setLoanApplicationData] =
    useState<LoanApplicationData>(undefined as unknown as LoanApplicationData);

  const getApplicationDetails = useCallback(async () => {
    try {
      const response = await fetch(`/api/application/${applicationId}`);

      if (!response.ok) {
        if (response.status === 404) {
          router.push("/404");
        }
        throw new Error("Failed to fetch application details");
      }
      const data = await response.json();
      setLoanApplicationData(data);
    } catch (error) {
      console.error("Error fetching application details:", error);
    }
  }, [applicationId]);

  useEffect(() => {
    getApplicationDetails();
  }, [applicationId]);

  return (
    <>
      {loanApplicationData && (
        <div className={styles.root}>
          <Overview
            loanApplicationData={loanApplicationData}
            setLoanApplicationData={setLoanApplicationData}
          />
        </div>
      )}
    </>
  );
};

export default LoanApplicationPage;
