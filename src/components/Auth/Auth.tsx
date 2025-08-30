"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import { Button, Card, IconButton, Text, TextField } from "@radix-ui/themes";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import type { AuthAction } from "@/types/auth";
import { AuthFormData } from "@/types/auth";
import styles from "./Auth.module.scss";

interface IAuth {
  action: AuthAction;
}

const titleText = {
  login: "Log In to your account",
  register: "Create a new account",
  logout: "",
};

const Auth: FC<IAuth> = ({ action }) => {
  const router = useRouter();

  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState<Partial<AuthFormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<AuthFormData> = { ...errors };
    let isValid = true;
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email =
        "Please enter a valid email address in the format of name@example.com";
      isValid = false;
    }

    if (action === "register") {
      if (!/[a-z]/.test(formData.password)) {
        newErrors.password = "Password must contain at least one lowercase letter";
        isValid = false;
      }
      if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = "Password must contain at least one uppercase letter";
        isValid = false;
      }
      if (!/[0-9]/.test(formData.password)) {
        newErrors.password = "Password must contain at least one number";
        isValid = false;
      }
      if (!/[!@#$%^&*]/.test(formData.password)) {
        newErrors.password = "Password must contain at least one special character";
        isValid = false;
      }

      if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters long";
        isValid = false;
      }

      if (formData.password === "p@sSworD1!") {
        newErrors.password = "You cannot use this example password";
        isValid = false;
      }
      if (!formData.firstName) {
        newErrors.firstName = "First Name is required";
        isValid = false;
      }
      if (!formData.lastName) {
        newErrors.lastName = "Last Name is required";
        isValid = false;
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          setErrors((prev) => ({
            ...prev,
            email: "Invalid email or password",
            password: "Invalid email or password",
          }));
        }
        throw new Error("Login failed");
      }
    } catch (err) {
      throw err;
    }
  };
  const handleRegister = async () => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }
    } catch (err) {
      console.log({ err });
      throw err;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting || !validateForm()) return;

    setIsSubmitting(true);

    try {
      switch (action) {
        case "login":
          await handleLogin();
          break;
        case "register":
          await handleRegister();
          break;
        default:
          throw new Error("Unknown action");
      }

      router.push("/"); // redirect to ?redirect="optional-redirect-pathname"
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
                  color={errors.firstName ? "red" : undefined}
                  className={classNames(styles.input, {
                    [styles["errorBorder"]]: errors.firstName,
                  })}
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => {
                    setFormData({ ...formData, firstName: e.target.value });
                    setErrors({ ...errors, firstName: "" });
                  }}
                />
                {errors.firstName && (
                  <Text size="1" color="red">
                    {errors.firstName}
                  </Text>
                )}
              </div>
              <div className={styles.formGroup}>
                <Text size="1" as="label" htmlFor="lastName">
                  Last Name
                </Text>
                <TextField.Root
                  size="3"
                  name="lastName"
                  color={errors.lastName ? "red" : undefined}
                  className={classNames(styles.input, {
                    [styles["errorBorder"]]: errors.lastName,
                  })}
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => {
                    setFormData({ ...formData, lastName: e.target.value });
                    setErrors({ ...errors, lastName: "" });
                  }}
                />
                {errors.lastName && (
                  <Text size="1" color="red">
                    {errors.lastName}
                  </Text>
                )}
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
              color={errors.email ? "red" : undefined}
              className={classNames(styles.input, {
                [styles["errorBorder"]]: errors.email,
              })}
              placeholder="johnbanda@gmail.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setErrors({ ...errors, email: "" });
              }}
            />
            {errors.email && (
              <Text size="1" color="red">
                {errors.email}
              </Text>
            )}
          </div>
          <div className={styles.formGroup}>
            <Text size="1" as="label" htmlFor="password">
              Password
            </Text>
            <TextField.Root
              size="3"
              name="password"
              type={showPassword ? "text" : "password"}
              color={errors.password ? "red" : undefined}
              className={classNames(styles.input, {
                [styles["errorBorder"]]: errors.password,
              })}
              placeholder={showPassword ? "p@sSworD1!" : "********"}
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setErrors({ ...errors, password: "" });
              }}
            >
              <TextField.Slot side="right">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  variant="ghost"
                  type="button"
                  className={styles.eyeButton}
                >
                  {showPassword && <EyeOpenIcon width="12" height="12" />}
                  {!showPassword && <EyeClosedIcon width="12" height="12" />}
                </IconButton>
              </TextField.Slot>
            </TextField.Root>
            {errors.password && (
              <Text size="1" color="red">
                {errors.password}
              </Text>
            )}
          </div>

          <Button
            className={styles.submitButton}
            type="submit"
            size="3"
            // disabled={isSubmitting}
            loading={isSubmitting}
          >
            {/* {isSubmitting && <ButtonSpinner />} */}
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
