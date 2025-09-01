"use client";

import { FC } from "react";
import Cookie from "js-cookie";
import { Card, Text, View } from "reshaped";
import styles from "./WelcomeBanner.module.scss";

const WelcomeBanner: FC = () => {
  const user = JSON.parse(Cookie.get("user") ?? "{}");
  const userFirstName = user?.firstName ?? "";
  return (
    <Card padding={0}>
      <View className={styles.root} backgroundColor="elevation-base">
        <Text variant="body-3" color="primary" weight="medium">
          {`Welcome${userFirstName ? `, ${userFirstName}` : ""}!`}
        </Text>
      </View>
    </Card>
  );
};

export default WelcomeBanner;
