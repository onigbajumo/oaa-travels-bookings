"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import BookingPage from "../booking/page";



export default function LandingPage() {
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
    <>
    <BookingPage />
    </>
  );
}


