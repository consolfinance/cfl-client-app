"use client";

import { FC } from "react";
import ApplicationsOverview from "./ApplicationsOverview/ApplicationsOverview";
import WelcomeBanner from "./WelcomeBanner/WelcomeBanner";

import styles from "./Dashboard.module.scss";

const Dashboard: FC = () => {
  return (
    <div className={styles.root}>
      <WelcomeBanner />
      <ApplicationsOverview />
    </div>
  );
};

export default Dashboard;
