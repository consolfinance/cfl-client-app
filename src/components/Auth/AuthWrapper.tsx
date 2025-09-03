"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Cookies from "js-cookie";
import FullLoader from "@/components/Common/FullLoader/FullLoader";
import { isPublicRoute } from "@/utils/publicRoutes";

const cachedUserRef = { current: null }; // ⚡️ Store user between renders

const AuthWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const hasFetchedRef = useRef(false);

  const logout = useCallback(async () => {
    if (isRedirecting) return;
    setIsRedirecting(true);
    await fetch("/api/auth/logout");
    window.location.href = "/auth/login?returnUrl=" + encodeURIComponent(pathname);
  }, [isRedirecting]);

  const fetchUserData = useCallback(async () => {
    if (cachedUserRef.current || hasFetchedRef.current) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/user/me");
      if (!res.ok) throw new Error("Unauthorized");
      const user = await res.json();
      cachedUserRef.current = user;
      hasFetchedRef.current = true;
    } catch (err) {
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    if (isPublicRoute(pathname)) {
      setIsLoading(false);
      return;
    }

    const tokenExp = Cookies.get("token_exp");
    if (!tokenExp) {
      logout();
      return;
    }

    const exp = Number(tokenExp);
    const now = Date.now() / 1000;

    if (exp < now + 60) {
      logout();
    } else {
      fetchUserData();
    }
  }, [pathname, fetchUserData, logout]);

  return isLoading ? <FullLoader /> : <>{children}</>;
};

export default AuthWrapper;
