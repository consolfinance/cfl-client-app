"use client";
import { FC, useCallback, useEffect } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import Auth from "@/components/Auth/Auth";
import CustomMetadata from "@/components/Common/Metadata/Metadata";
import type { AuthAction } from "@/types/auth";
import styles from "./page.module.scss";

// Helper for runtime type checking
const isValidAuthAction = (value: string): value is AuthAction =>
  ["login", "register", "logout"].includes(value);

const AuthPage: FC = () => {
  const router = useRouter();
  const params = useParams();
  const action = params.action as AuthAction;

  const logout = useCallback(async () => {
    const response = await fetch("/api/auth/logout");
    if (response.ok) {
      router.push("/auth/login");
    }
  }, []);

  useEffect(() => {
    if (!isValidAuthAction(action)) {
      notFound();
    }
    // Redirect to login if action is logout
    if (action === "logout") {
      logout();
    }
  }, [action]);

  return (
    <>
      <CustomMetadata
        title={`${action === "login" ? "Login" : "Register"} | Consol Finance`}
        description={`Authentication page for ${action}`}
        keywords={["auth", action]}
      />
      <div className={styles.root}>
        <Auth action={action} />
      </div>
    </>
  );
};

export default AuthPage;
