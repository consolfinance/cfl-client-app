"use client";

import { FC } from "react";
import { LoaderCircle } from "lucide-react";
import styles from "./ButtonSpinner.module.scss";

const ButtonSpinner: FC = () => {
  return (
    <div className={styles.spinner}>
      <LoaderCircle />
    </div>
  );
};

export default ButtonSpinner;
