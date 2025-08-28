"use client";

import { FC, useState } from "react";
import { Button, Card, Text, TextField } from "@radix-ui/themes";
import type { AuthAction } from "@/types/auth";
import { AuthFormData } from "@/types/auth";
import styles from "./Auth.module.scss";

interface IAuth {
  action: AuthAction;
}

const titleText = {
  login: "Log In to your account",
  register: "Create a new account",
};

const Auth: FC<IAuth> = ({ action }) => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      console.log(`${action} form submitted with data: ${JSON.stringify(formData)}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={styles.authCard}>
      <div className={styles.root}>
        <Text size="5" weight="bold" align="center" className={styles.title}>
          {titleText[action]}
        </Text>
        <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
          {action === "register" && (
            <>
              <div className={styles.formGroup}>
                <Text size="1" as="label" htmlFor="firstName">
                  First Name
                </Text>
                <TextField.Root
                  size="3"
                  name="firstName"
                  className={styles.input}
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <Text size="1" as="label" htmlFor="lastName">
                  Last Name
                </Text>
                <TextField.Root
                  size="3"
                  name="lastName"
                  className={styles.input}
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
            </>
          )}

          <div className={styles.formGroup}>
            <Text size="1" as="label" htmlFor="email">
              Email
            </Text>
            <TextField.Root
              size="3"
              name="email"
              className={styles.input}
              placeholder="johnbanda@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <Text size="1" as="label" htmlFor="password">
              Password
            </Text>
            <TextField.Root
              size="3"
              name="password"
              type="password"
              className={styles.input}
              placeholder="********"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <Button className={styles.submitButton} type="submit" size="3">
            {action === "login" ? "Log In" : "Sign Up"}
          </Button>
        </form>
        <div className={styles.footer}>
          <Text size="1" align="center" as="p" color="gray">
            {`${
              action === "login"
                ? "Already have an account?"
                : "Don't have an account?"
            }`}{" "}
            <a
              className={styles.footerLink}
              href={`/auth/${action === "login" ? "register" : "login"}`}
            >
              {action === "login" ? "Sign Up" : "Log In"}
            </a>
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default Auth;
