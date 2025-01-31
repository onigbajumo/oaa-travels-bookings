"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const { forgotPassword, loading } = useAuth();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[url('/images/background.png')] bg-cover bg-center">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow w-80 rounded-3xl"
      >
        <div className="space-y-3 mb-8">
          <div className="grid place-content-center">
            <Image
              src="/logo.png"
              width={1000}
              height={1000}
              className="w-52"
              alt="logo"
            />
          </div>
          <h2 className="text-center font-semibold text-3xl">Forgot Password</h2>
          <p className="text-center text-sm text-[#525252]">
            Enter your email address below and we&lsquo;ll send you instructions to reset your password.
          </p>
        </div>
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 w-full p-2 mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className={`bg-secondary text-white w-full p-2 rounded-lg ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Instructions"}
        </button>
        <div className="mt-4 text-center text-sm text-[#525252]">
          <a href="/access-management" className="text-main hover:underline hover:text-secondary">
            Back to Login
          </a>
        </div>
      </form>
    </div>
  );
}
