"use client";

import { FC } from "react";
import Cookie from "js-cookie";
import { Text } from "@radix-ui/themes";
import styles from "./WelcomeBanner.module.scss";

const WelcomeBanner: FC = () => {
  const user = JSON.parse(Cookie.get("user") ?? "{}");
  const userFirstName = user?.firstName ?? "";
  return (
    <div className={styles.root}>
      <Text size="5" color="purple">
        {`Welcome${userFirstName ? `, ${userFirstName}` : ""}!`}
      </Text>
    </div>
  );
};

export default WelcomeBanner;
