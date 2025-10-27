"use client";

import { FC, useCallback } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import CFLLogo from "@/public/CFL-main-logo.png";
import { Button, Card, Divider, MenuItem, View } from "reshaped";
import { menuItems } from "@/utils/menuItems";
import styles from "./Sidebar.module.scss";
import { ExitIcon } from "@radix-ui/react-icons";

const Sidebar: FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const logout = useCallback(async () => {
    try {
      // Prevent the loop by checking if already redirecting

      await fetch("/api/auth/logout");
      window.location.href = "/auth/login"; // Redirect to login after logout
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
    }
  }, []);

  if (pathname.startsWith("/auth") || pathname === "/eligibility-check") {
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
          <View direction="row" align="center" gap={2}>
            <div onClick={() => router.push("/")} className={styles.logoContainer}>
              <Image src={CFLLogo} alt="Consol Finance" fill />
            </div>
          </View>

          <View className={styles.menu} height="100%">
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                roundedCorners
                startSlot={<item.icon width={14} height={14} />}
                disabled={item.disabled}
                selected={
                  (pathname === "/" && item.title === "Dashboard") ||
                  (pathname.startsWith("/application") &&
                    item.title === "My Applications") ||
                  (pathname.startsWith(item.route + "/") && item.route !== "/")
                }
                href={item.route}
                highlighted={pathname !== item.route}
              >
                {item.title}
              </MenuItem>
            ))}
          </View>

          <div className={styles.footer}>
            <Divider />
            <div className={styles.footerButtons}>
              <Button
                variant="solid"
                color="primary"
                onClick={() => {
                  router.push("/");
                }}
              >
                New Application
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  logout();
                }}
                icon={<ExitIcon width={14} height={14} />}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </View>
      </Card>
    </View>
  );
};

export default Sidebar;
