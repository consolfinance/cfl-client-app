"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames";
// import { Badge, Button, Card, Text } from "@radix-ui/themes";
import { Badge, Button, Card, Text, View } from "reshaped";

import styles from "./LoanCard.module.scss";

interface LoanCardProps {
  id: string | number;
  type: string;
  slug: string;
  name: string;
  description: string;
}

const LoanCard: FC<LoanCardProps> = ({ id, type, slug, name, description }) => {
  const router = useRouter();

  const handleApplyNow = async () => {
    try {
      const payload = JSON.stringify({
        loanType: type,
        loanSlug: slug,
        name,
        description,
        step: 1,
      });

      const response = await fetch("/api/application/new", {
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      router.push(`/applications/${data.documentId}`);
    } catch (error) {
      console.error("Error applying for loan:", error);
    }
  };

  return (
    <div className={styles.root}>
      <Card padding={0}>
        <View backgroundColor="elevation-base" padding={4}>
          <div className={styles.content}>
            <div className={styles.header}>
              <Text variant="body-2" color="primary">
                {name}
              </Text>
              <Badge
                // color={type === "personal" ? "green" : "violet"}
                // variant="solid"
                size="medium"
                className={classNames(styles.badge, {
                  [styles.personal]: type === "personal",
                  [styles.business]: type === "business",
                })}
              >
                <Text>{type}</Text>
              </Badge>
            </div>
            <div className={styles.description}>
              <Text variant="body-3" color="primary">
                {description}
              </Text>
            </div>
            <div className={styles.footer}>
              <Button
                variant="solid"
                className={styles.button}
                onClick={handleApplyNow}
              >
                Apply Now
              </Button>
            </div>
          </div>
        </View>
      </Card>
    </div>
  );
};

export default LoanCard;
