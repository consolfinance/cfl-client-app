"use client";
import { FC, useEffect, useCallback, useState } from "react";
import { Card, View, Skeleton, Text, Badge } from "reshaped";
import styles from "./UserApplications.module.scss";
import { LoanApplicationData } from "@/types/loans";
import { dummyLoanTypes } from "@/utils/dummy/loantypes";

const SkeletonLoader = () => (
  <View className={styles.skeleton}>
    <Skeleton height="40px" />
    <Skeleton height="40px" />
    <Skeleton height="40px" />
  </View>
);

const UserApplications: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [applications, setApplications] = useState<LoanApplicationData[]>([]);

  const getLoanData = (appId: string) => {
    try {
      const slug = applications.find((app) => app.documentId === appId)?.loanSlug;
      const title =
        dummyLoanTypes.find((loan) => loan.slug === slug)?.name || "Unknown Loan";

      return { title };
    } catch (error) {
      console.error("Error getting loan data:", error);
      return { title: "" };
    }
  };

  const getBadgeColor = (data: LoanApplicationData) => {
    switch (data.applicationStatus) {
      case "draft":
        return "neutral";
      case "submitted":
        return "positive";
      case "approved":
        return "positive";
      case "rejected":
        return "critical";
      default:
        return "neutral";
    }
  };

  const getScoreColor = (data: LoanApplicationData) => {
    switch (data.grade) {
      case "A":
        return "positive";
      case "B":
        return "positive";
      case "C":
        return "warning";
      default:
        return "critical";
    }
  };

  const fetchUserApplications = useCallback(async () => {
    try {
      if (isLoading) return;
      setIsLoading(true);
      const response = await fetch("/api/user/applications");
      if (!response.ok) {
        throw new Error("Failed to fetch user applications");
      }
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching user applications:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserApplications();
  }, [fetchUserApplications]);

  return (
    <View className={styles.root} backgroundColor="elevation-base">
      <div className={styles.header}>
        <Text variant="featured-3" weight="bold">
          Your Applications
        </Text>
      </div>

      {isLoading &&
        Array.from({ length: 3 }).map((_, index) => <SkeletonLoader key={index} />)}

      {!isLoading && applications.length === 0 && (
        <Text>No applications found.</Text>
      )}

      {!isLoading && applications.length > 0 && (
        <View className={styles.applicationsList} gap={4}>
          {applications //reverse order
            ?.slice()
            ?.reverse()
            .map((application) => (
              <Card
                padding={0}
                key={application.documentId}
                href={`/applications/${application.documentId}`}
              >
                <View className={styles.applicationItem} padding={6}>
                  <View
                    direction={"row"}
                    align="center"
                    gap={4}
                    justify={"space-between"}
                  >
                    <Text variant="body-3" weight="medium">
                      {getLoanData(application.documentId).title}
                    </Text>
                    <View direction={"row"} align="center" gap={2}>
                      {application.applicationStatus !== "draft" &&
                        !!application.score && (
                          <View direction={"row"} align="center" gap={2}>
                            <Text variant="body-3" weight="medium">
                              Score:
                            </Text>
                            <Text
                              variant="body-3"
                              weight="medium"
                              color={getScoreColor(application)}
                            >
                              {application.score} ({application.grade})
                            </Text>
                          </View>
                        )}

                      <Badge
                        color={getBadgeColor(application)}
                        size="large"
                        className={styles.badge}
                      >
                        {application.applicationStatus}
                      </Badge>
                    </View>
                  </View>
                </View>
              </Card>
            ))}
        </View>
      )}
    </View>
  );
};

export default UserApplications;
