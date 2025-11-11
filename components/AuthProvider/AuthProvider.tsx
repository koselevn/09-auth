"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkSession } from "@/lib/api/clientApi";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const session = await checkSession();
        if (!session?.valid) {
          router.push("/sign-in");
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
          router.push("/sign-in");
          console.log(error)
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
