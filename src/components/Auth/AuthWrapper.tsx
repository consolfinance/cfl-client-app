"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Cookies from "js-cookie";
import FullLoader from "@/components/Common/FullLoader/FullLoader";
import { isPublicRoute } from "@/utils/publicRoutes";

const AuthWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false); // Flag to prevent multiple redirects

  const [hasFetched, setHasFetched] = useState(false);

  const getUserData = useCallback(async () => {
    try {
      // Prevent multiple fetches
      if (hasFetched) return;

      const userData = !!Cookies.get("user");

      // Even if we *have* user data in cookies, fetch it once
      if (!hasFetched) {
        setIsLoading(true);

        const response = await fetch("/api/user/me");

        if (!response.ok) {
          if (!isRedirecting) {
            setIsRedirecting(true);
            logout();
          }
        }

        setHasFetched(true);
      } else if (userData) {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [hasFetched, isRedirecting, pathname]);

  const logout = useCallback(async () => {
    try {
      // Prevent the loop by checking if already redirecting
      if (isRedirecting) return;

      setIsRedirecting(true); // Set flag before logout

      await fetch("/api/auth/logout");
      window.location.href = "/auth/login"; // Redirect to login after logout
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isRedirecting]);

  useEffect(() => {
    // Check if the current route is public
    if (isPublicRoute(pathname)) {
      setIsLoading(false);
      return;
    }

    // --- Token expiry check ---
    const tokenExp = Cookies.get("token_exp");

    if (!tokenExp) {
      logout(); // If no token exists, log out immediately
      return;
    }

    try {
      const exp = Number(tokenExp); // Convert to number (expiry timestamp)
      const now = Date.now() / 1000; // Current time in seconds

      // Token is expired or expiring in the next 60 seconds
      if (exp < now + 60) {
        logout(); // Expired token, log out
      } else {
        getUserData(); // Fetch user data if token is valid
      }
    } catch (err) {
      console.error("Error decoding token:", err);
    }
  }, [getUserData, logout, pathname]);

  return (
    <>
      {!isLoading && children}
      {isLoading && <FullLoader />}
    </>
  );
};

export default AuthWrapper;
