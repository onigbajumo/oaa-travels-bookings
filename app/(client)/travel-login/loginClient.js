"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function LoginPage() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
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
              src="/oaa-travel.png"
              width={1000}
              height={1000}
              className="w-52"
              alt="logo"
            />
          </div>
          <h3 className="text-center">Welcome</h3>
          <p className="text-center text-sm text-[#525252]">
            Please enter your credentials to gain access.
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
        <div className="relative">
          <input
            type={viewPassword ? "text" : "password"}
            placeholder="Password"
            className="border border-gray-300 w-full p-2 mb-4 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="absolute top-5 right-2">
            {viewPassword ? (
              <IoEyeOutline size={16} onClick={() => setViewPassword(false)} />
            ) : (
              <IoEyeOffOutline size={16} onClick={() => setViewPassword(true)} />
            )}
          </div>
        </div>
        <button
          type="submit"
          className={`bg-secondary text-white w-full p-2 rounded-lg ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
        <div className="mt-4 text-center text-sm text-[#525252]">
          <Link
            href="/forgot-password"
            className="text-main hover:underline hover:text-secondary"
          >
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}
