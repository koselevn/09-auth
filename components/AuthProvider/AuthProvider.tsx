"use client";

import { ReactNode, useEffect, useState } from "react";
import { checkSession, getCurrentUser } from "@/lib/api/clientApi";
import { useAuth } from "@/lib/store/authStore";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const setUser = useAuth((state) => state.setUser);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const session = await checkSession();

        if (session?.valid) {
          const user = await getCurrentUser();
          setUser(user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("AuthProvider error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [setUser]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
}
