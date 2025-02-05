"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const ResetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters.")
      .required("New Password is required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match.")
      .required("Confirm Password is required."),
  });

  const handleSubmit = async (values, actions) => {
    if (!token) {
      toast.error("Invalid or missing token.");
      actions.setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/auth/reset-password?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword: values.newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to reset password.");
      }

      toast.success("Password has been reset successfully!");

      setTimeout(() => {
        router.push("/hub-login");
      }, 3000);
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      actions.setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setIsRedirecting(true);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  }, [token, router]);

  if (isRedirecting) {
    return <p className="text-white text-lg">Redirecting...</p>;
  }

  return (
    <Formik
      initialValues={{ newPassword: "", confirmPassword: "" }}
      validationSchema={ResetPasswordSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="p-6 bg-white shadow w-80 rounded-3xl">
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
            <h3 className="text-center">
              Reset Your Password
            </h3>
            <p className="text-center text-sm text-[#525252]">
              Please enter your new password below.
            </p>
          </div>

          {/* New Password Field */}
          <Field name="newPassword">
            {({ field }) => (
              <div className="mb-4">
                <label htmlFor="newPassword" className="block mb-1 font-medium">
                  New Password
                </label>
                <div className="relative">
                  <input
                    {...field}
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.newPassword && touched.newPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute z-10 inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    aria-label={
                      showNewPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showNewPassword ? (
                      <BsEyeSlash size={20} />
                    ) : (
                      <BsEye size={20} />
                    )}
                  </button>
                </div>
                {errors.newPassword && touched.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.newPassword}
                  </p>
                )}
              </div>
            )}
          </Field>

          {/* Confirm Password Field */}
          <Field name="confirmPassword">
            {({ field }) => (
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-1 font-medium"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    {...field}
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute z-10 inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <BsEyeSlash size={20} />
                    ) : (
                      <BsEye size={20} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}
          </Field>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-secondary text-white rounded-lg ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-[url('/images/background.png')] bg-cover bg-center">
      <Suspense fallback={<div></div>}>
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}
