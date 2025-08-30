"use client";

import { FC } from "react";
import { Badge, Button, Card, Text } from "@radix-ui/themes";
import styles from "./LoanCard.module.scss";

interface LoanCardProps {
  id: string | number;
  type: string;
  slug: string;
  name: string;
  description: string;
}

const LoanCard: FC<LoanCardProps> = ({ id, type, slug, name, description }) => {
  return (
    <div className={styles.root}>
      <Card>
        <div className={styles.content}>
          <div className={styles.header}>
            <Text size="5">{name}</Text>
            <Badge
              color={type === "personal" ? "green" : "blue"}
              variant="solid"
              size="2"
              className={styles.badge}
            >
              {type}
            </Badge>
          </div>
          <div className={styles.description}>
            <Text size="3" color="gray">
              {description}
            </Text>
          </div>
          <div className={styles.footer}>
            <Button variant="outline" className={styles.button}>
              Apply Now
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoanCard;
