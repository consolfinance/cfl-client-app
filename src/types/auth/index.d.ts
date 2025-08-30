export type AuthAction = "login" | "register" | "logout";

export interface AuthFormData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
