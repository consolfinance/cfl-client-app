"use client";
import { Card, Text, View } from "reshaped";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CFLLogo from "@/public/CFL-main-logo.png";

import EligibilityCheck from "@/components/EligibilityCheck/EligibilityCheck";
import styles from "./page.module.scss";

export default function Page() {
  const router = useRouter();
  return (
    <div className={styles.root}>
      <Card className={styles.card}>
        <View className={styles.container} gap={2}>
          <View direction="row" align="center" gap={2}>
            <div onClick={() => router.push("/")} className={styles.logoContainer}>
              <Image src={CFLLogo} alt="Consol Finance" fill />
            </div>
          </View>
          <Text variant="body-1">Eligibility Check</Text>
          <EligibilityCheck />
        </View>
      </Card>
    </div>
  );
}
