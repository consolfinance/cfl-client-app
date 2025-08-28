import { Text } from "@radix-ui/themes";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <Text size="8" color="purple">
        Consol Finance App
      </Text>
    </div>
  );
}
