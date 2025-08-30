import { FC } from "react";
import { LoaderCircle } from "lucide-react";

import styles from "./FullLoader.module.scss";

const FullLoader: FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.spinner}>
        <LoaderCircle />
      </div>
    </div>
  );
};

export default FullLoader;
