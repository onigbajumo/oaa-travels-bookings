"use client";
import React from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import courses from "@/content/data";
import FAQs from "@/components/faq";

const Enrol = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("course") || "";
  const course = courses.find((course) => course.slug === slug);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    gender: Yup.string().required("Gender is required"),
    state: Yup.string().required("State is required"),
    learningMode: Yup.string().required("Learning Mode is required"),
    paymentPlan: Yup.string().required("Payment Plan is required"),
    terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      gender: "",
      state: "",
      learningMode: "",
      paymentPlan: "",
      terms: false,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      toast.success("Enrollment successful!");
    },
  });

  const filteredPaymentPlans = course?.payments.filter(
    (payment) => payment.mode.toLowerCase() === formik.values.learningMode.toLowerCase()
  );

  return (
    <>
      <section className="bg-[url('/images/background.png')] bg-no-repeat bg-cover">
        <div className="container py-20">
          <div className="flex items-center gap-2 flex-wrap mb-5">
            <Link href="/" className="hover:text-secondary">
              Home
            </Link>{" "}
            <IoIosArrowForward />{" "}
            <Link
              href="/upskill-program/courses"
              className="hover:text-secondary"
            >
              All courses
            </Link>{" "}
            <IoIosArrowForward />{" "}
            <Link
              href={`/upskill-program/${course?.slug}`}
              className="hover:text-secondary"
            >
              {course?.title}
            </Link>
            <IoIosArrowForward />{" "}
            <Link href="#" className="text-gray-500">
              Enrol
            </Link>
          </div>
          <div className="space-y-6 flex flex-col justify-center">
            <div className="space-y-8">
              <h1 className="text-main capitalize">Enrollment for {course.title}</h1>
              <p className="xl:pr-48 lg:pr-12">
                You're just a few steps away from starting your learning
                journey!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F4F7F8] py-20">
        <div className="container flex justify-center w-full md:w-3/4 lg:w-2/3">
          <div className="w-full">
            <h2 className="text-main text-center">Welcome to Ehizua Hub!</h2>
            <p className="text-center text-[#828282] mt-2">
              Please fill out the form below to finalize your enrollment for {course.title}.
            </p>

            <form onSubmit={formik.handleSubmit} className="mt-5 bg-white border-2 rounded-xl p-5 grid md:grid-cols-2 gap-5 gap-y-8">
              <div className="flex flex-col">
                <label>First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="eg. John"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-red-500">{formik.errors.firstName}</div>
                ) : null}
              </div>

              <div className="flex flex-col">
                <label>Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="eg. Doe"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="text-red-500">{formik.errors.lastName}</div>
                ) : null}
              </div>

              <div className="flex flex-col">
                <label>Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="eg. 08012345678"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div className="text-red-500">{formik.errors.phoneNumber}</div>
                ) : null}
              </div>

              <div className="flex flex-col">
                <label>Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="eg. john@mail.com"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500">{formik.errors.email}</div>
                ) : null}
              </div>

              <div className="flex flex-col">
                <label>Gender</label>
                <select
                  id="gender"
                  name="gender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.gender}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {formik.touched.gender && formik.errors.gender ? (
                  <div className="text-red-500">{formik.errors.gender}</div>
                ) : null}
              </div>

              <div className="flex flex-col">
                <label>State</label>
                <select
                  id="state"
                  name="state"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                >
                  <option value="">Select state</option>
                  <option value="oyo">Oyo</option>
                  <option value="lagos">Lagos</option>
                </select>
                {formik.touched.state && formik.errors.state ? (
                  <div className="text-red-500">{formik.errors.state}</div>
                ) : null}
              </div>

              <div className="flex flex-col">
                <label>Learning Mode</label>
                <select
                  id="learningMode"
                  name="learningMode"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.learningMode}
                >
                  <option value="">Select mode</option>
                  {course?.mode.map((mode, index) => (
                    <option key={index} value={mode.toLowerCase()}>
                      {mode}
                    </option>
                  ))}
                </select>
                {formik.touched.learningMode && formik.errors.learningMode ? (
                  <div className="text-red-500">{formik.errors.learningMode}</div>
                ) : null}
              </div>

              <div className="flex flex-col">
                <label>Payment Plan</label>
                <select
                  id="paymentPlan"
                  name="paymentPlan"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.paymentPlan}
                  disabled={!formik.values.learningMode}
                >
                  <option value="">Select plan</option>
                  {filteredPaymentPlans?.map((payment, index) => (
                    <option key={index} value={payment.title}>
                      {payment.title} - {payment.price}
                    </option>
                  ))}
                </select>
                {formik.touched.paymentPlan && formik.errors.paymentPlan ? (
                  <div className="text-red-500">{formik.errors.paymentPlan}</div>
                ) : null}
              </div>

              <div className="md:col-span-2">
                <label className="flex md:items-center gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.terms}
                  />
                  <span>I have read and agreed to Ehizua Hub <span className="text-main">Terms & Conditions</span></span>
                </label>
                {formik.touched.terms && formik.errors.terms ? (
                  <div className="text-red-500">{formik.errors.terms}</div>
                ) : null}
              </div>

              <div className="md:col-span-2 flex justify-center mb-6">
                <button type="submit" className="bg-main text-white rounded-full text-center text-base px-7 py-3 font-medium">
                  Proceed with Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <FAQs limit={4} />
    </>
  );
};

export default Enrol;