"use client";

import { FC } from "react";
import { usePathname } from "next/navigation";
import { Card, Text, View } from "reshaped";
import styles from "./Sidebar.module.scss";

const Sidebar: FC = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/auth")) {
    return null;
  }
  return (
    <View className={styles.root}>
      <Card padding={0} className={styles.card}>
        <View
          height="100%"
          width="100%"
          backgroundColor="elevation-base"
          className={styles.sidebar}
          padding={6}
        >
          <Text variant="featured-3" color="neutral">
            Consol Finance
          </Text>
        </View>
      </Card>
    </View>
  );
};

export default Sidebar;
