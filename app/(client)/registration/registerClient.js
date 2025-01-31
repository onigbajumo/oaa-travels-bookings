"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupPage() {
  const { loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email, phoneNumber, password };

    try {
      const response = await fetch("/api/auth/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        router.push("/login");
        toast.success("Account created successfully. Please login.");
      } else {
        const error = await response.json();
        toast.error(error.message || "An error occurred during signup.");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred. Please try again later.");
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
              src="/logo.png"
              width={1000}
              height={1000}
              className="w-52"
              alt="logo"
            />
          </div>
          <h2 className="text-center font-semibold text-3xl">
            Create Account
          </h2>
          <p className="text-center text-sm text-[#525252]">
            Please fill in your details to create a new account.
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

        <input
          type="tel"
          placeholder="Phone Number"
          className="border border-gray-300 w-full p-2 mb-4 rounded"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
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
          <div className="absolute top-2 right-2 cursor-pointer">
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
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <div className="mt-4 text-center text-sm text-[#525252]">
          <Link
            href="/login"
            className="text-main hover:underline hover:text-secondary"
          >
            Already have an account? Login here.
          </Link>
        </div>
      </form>
    </div>
  );
}
