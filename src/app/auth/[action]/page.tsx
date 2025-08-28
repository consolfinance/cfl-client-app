"use client";
import { useEffect, FC } from "react";
import { notFound, useParams } from "next/navigation";
import Auth from "@/components/Auth/Auth";
import CustomMetadata from "@/components/Common/Metadata/Metadata";
import type { AuthAction } from "@/types/auth";
import styles from "./page.module.scss";

// Helper for runtime type checking
const isValidAuthAction = (value: string): value is AuthAction =>
  ["login", "register"].includes(value);

const AuthPage: FC = () => {
  const params = useParams();
  const action = params.action as AuthAction;

  useEffect(() => {
    if (!isValidAuthAction(action)) {
      notFound();
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
