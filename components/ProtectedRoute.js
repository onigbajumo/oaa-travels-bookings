"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {Array<string>} [props.allowedRoles]
 */
export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { loading, isAuthenticated, userRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
      router.push("/"); 
    }
  }, [loading, isAuthenticated, userRole, allowedRoles, router]);

  if (loading || !isAuthenticated) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
