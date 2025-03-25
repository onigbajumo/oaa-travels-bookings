"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminLanding() {
  const { isAuthenticated, userRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === "superadmin") {
        router.push("/superadmin");
      } else if (userRole === "admin") {
        router.push("/admin");
      }
    }
  }, [isAuthenticated, userRole, router]);

  return (
    <div className="flex items-center justify-center h-screen bg-[url('/images/background.png')] bg-cover bg-center">
      <div className="p-8 bg-white shadow-lg rounded-xl text-center max-w-xl">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
        <p className="text-gray-600 mt-2">We're glad to have you here.</p>

        <button
          onClick={() => router.push("/login")}
          className="mt-6 bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary-dark transition-all duration-200"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}