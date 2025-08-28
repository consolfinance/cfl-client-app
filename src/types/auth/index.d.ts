export type AuthAction = "login" | "register";

export interface AuthFormData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
