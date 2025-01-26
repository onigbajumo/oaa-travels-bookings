"use client";
import React, { useState } from "react";

const options = ["Web Design", "Collaboration", "Mobile App Design", "Others"];

const Form = () => {
  const [formDataContact, setFormDataContact] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    projectDetails: "",
    reasonsForContact: [],
  });

  const handleInputChangeContact = (e) => {
    const { name, value } = e.target;
    setFormDataContact((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCheckboxChangeContact = (option) => {
    setFormDataContact((prev) => {
      if (prev.reasonsForContact.includes(option)) {
        return {
          ...prev,
          reasonsForContact: prev.reasonsForContact.filter(
            (item) => item !== option
          ),
        };
      } else {
        return {
          ...prev,
          reasonsForContact: [...prev.reasonsForContact, option],
        };
      }
    });
  };

  const handleSubmitContact = (event) => {
    event.preventDefault();
    console.log(formDataContact);

    setFormDataContact({
      name: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      projectDetails: "",
      reasonsForContact: [],
    });
  };

  return (
    <div className="flex justify-center">
      <form
        name="contact"
        onSubmit={handleSubmitContact}
        className="mt-10 flex flex-col gap-8 text-[#2C3335] bg-white p-8 rounded-xl w-full md:w-4/5"
      >
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex flex-col gap-2 md:w-1/2">
            <label className="font-bold text-sm">First Name</label>
            <input
              className="rounded-lg p-4 border border-[#0000001F] outline-none"
              type="text"
              placeholder="Enter your first name"
              name="name"
              value={formDataContact.name}
              onChange={handleInputChangeContact}
              required
            />
          </div>
          <div className="flex flex-col gap-2 md:w-1/2">
            <label className="font-bold text-sm">Last Name</label>
            <input
              className="rounded-lg p-4 border border-[#0000001F] outline-none"
              type="text"
              placeholder="Enter your last name"
              name="lastName"
              value={formDataContact.lastName}
              onChange={handleInputChangeContact}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex flex-col gap-2 md:w-1/2">
            <label className="font-bold text-sm">Phone</label>
            <input
              className="rounded-lg p-4 border border-[#0000001F] outline-none"
              type="tel"
              placeholder="Enter your phone number"
              name="phoneNumber"
              value={formDataContact.phoneNumber}
              onChange={handleInputChangeContact}
              maxLength="14"
              required
            />
          </div>
          <div className="flex flex-col gap-2 md:w-1/2">
            <label className="font-bold text-sm">Email Address</label>
            <input
              className="rounded-lg p-4 border border-[#0000001F] outline-none"
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formDataContact.email}
              onChange={handleInputChangeContact}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="font-bold text-sm">What service do you need?</label>
          <div className="flex flex-wrap gap-3">
            {options.map((option) => {
              const isSelected = formDataContact.reasonsForContact.includes(option);
              return (
                <div
                  key={option}
                  onClick={() => handleCheckboxChangeContact(option)}
                  className={`cursor-pointer px-4 py-2 rounded-full border 
                    ${
                      isSelected
                        ? "bg-[#134574] text-white border-[#134574]"
                        : "text-[#134574] border-[#134574]"
                    }
                  `}
                >
                  {option}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-sm">Project Details</label>
          <input
            className="rounded-lg p-4 border border-[#0000001F] outline-none"
            type="text"
            placeholder="Enter Project Details"
            name="projectDetails"
            value={formDataContact.projectDetails}
            onChange={handleInputChangeContact}
          />
        </div>

        <div className="flex justify-center">
          <button
            className="bg-[#134574] text-sm md:text-md text-white rounded-full p-3 px-12 py-4 font-bold"
            type="submit"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
