"use client";

import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import { Button, Card, View, Text, TextField } from "reshaped";
import { IconButton } from "@radix-ui/themes";
import CFLLogo from "@/public/CFL-main-logo.png";
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
  const returnUrl = new URL(window.location.href).searchParams.get("returnUrl");

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

      router.push(returnUrl || "/"); // redirect to ?redirect="optional-redirect-pathname"
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={styles.authCard} elevated padding={0}>
      <View className={styles.root} backgroundColor="elevation-base" padding={8}>
        <View justify="center" width="100%" align={"center"} gap={2}>
          <div onClick={() => router.push("/")} className={styles.logoContainer}>
            <Image src={CFLLogo} alt="Consol Finance" fill />
          </div>
          <Text
            variant="featured-3"
            weight="bold"
            align="center"
            className={styles.title}
          >
            {titleText[action]}
          </Text>
        </View>
        <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
          {action === "register" && (
            <>
              <div className={styles.formGroup}>
                <Text variant="caption-1" as="label">
                  First Name
                </Text>
                <TextField
                  name="firstName"
                  hasError={!!errors.firstName}
                  className={classNames(styles.input, {
                    [styles["errorBorder"]]: errors.firstName,
                  })}
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(args) => {
                    const { value } = args;
                    setFormData({ ...formData, firstName: value });
                    setErrors({ ...errors, firstName: "" });
                  }}
                  onFocus={() => setErrors({ ...errors, firstName: "" })}
                />
                {errors.firstName && (
                  <Text variant="caption-1" color="critical">
                    {errors.firstName}
                  </Text>
                )}
              </div>
              <div className={styles.formGroup}>
                <Text variant="caption-1" as="label">
                  Last Name
                </Text>
                <TextField
                  name="lastName"
                  hasError={!!errors.lastName}
                  className={classNames(styles.input, {
                    [styles["errorBorder"]]: errors.lastName,
                  })}
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(args) => {
                    const { value } = args;
                    setFormData({ ...formData, lastName: value });
                    setErrors({ ...errors, lastName: "" });
                  }}
                  onFocus={() => setErrors({ ...errors, lastName: "" })}
                />
                {errors.lastName && (
                  <Text variant="caption-1" color="critical">
                    {errors.lastName}
                  </Text>
                )}
              </div>
            </>
          )}

          <div className={styles.formGroup}>
            <Text variant="caption-1" as="label">
              Email
            </Text>
            <TextField
              name="email"
              hasError={!!errors.email}
              className={classNames(styles.input, {
                [styles["errorBorder"]]: errors.email,
              })}
              placeholder="johnbanda@gmail.com"
              value={formData.email}
              onChange={(args) => {
                const { value } = args;
                setFormData({ ...formData, email: value });
                setErrors({ ...errors, email: "" });
              }}
              onFocus={() => setErrors({ ...errors, email: "" })}
            />
            {errors.email && (
              <Text variant="caption-1" color="critical">
                {errors.email}
              </Text>
            )}
          </div>
          <div className={styles.formGroup}>
            <Text variant="caption-1" as="label">
              Password
            </Text>
            <TextField
              hasError={!!errors.password}
              name="password"
              inputAttributes={{
                type: showPassword ? "text" : "password",
              }}
              className={classNames(styles.input, {
                [styles["errorBorder"]]: errors.password,
              })}
              placeholder={showPassword ? "p@sSworD1!" : "********"}
              value={formData.password}
              onChange={(args) => {
                const { value } = args;
                setFormData({ ...formData, password: value });
                setErrors({ ...errors, password: "" });
              }}
              onFocus={() => setErrors({ ...errors, password: "" })}
              endIcon={
                <>
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                    type="button"
                    className={styles.eyeButton}
                  >
                    {showPassword && <EyeOpenIcon width="12" height="12" />}
                    {!showPassword && <EyeClosedIcon width="12" height="12" />}
                  </IconButton>
                </>
              }
            />
            {errors.password && (
              <Text variant="caption-1" color="critical">
                {errors.password}
              </Text>
            )}
          </div>

          <Button
            color="primary"
            className={styles.submitButton}
            type="submit"
            // disabled={isSubmitting}
            loading={isSubmitting}
          >
            {/* {isSubmitting && <ButtonSpinner />} */}
            {action === "login" ? "Log In" : "Sign Up"}
          </Button>
        </form>
        <div className={styles.footer}>
          <Text variant="caption-1" align="center" as="p" color="neutral-faded">
            {`${
              action === "register"
                ? "Already have an account?"
                : "Don't have an account?"
            }`}{" "}
            <Link
              className={styles.footerLink}
              href={`/auth/${action === "login" ? "register" : "login"}${
                returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ""
              }`}
            >
              {action === "login" ? "Sign Up" : "Log In"}
            </Link>
          </Text>
        </div>
      </View>
    </Card>
  );
};

export default Auth;
