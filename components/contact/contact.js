import React from "react";
import Form from "./form";
import Tag from "../tag/Tag";

const Contact = () => {
  return (
    <section className=" py-20 bg-[#F4F7F8]">
      <div className="container">
      <div className="space-y-5 ">
        <Tag text="Contact Us" />
        <h2 className="text-main">Get in Touch</h2>
        <p>
        We’re here to help bring your ideas to life
        </p>
      </div>

      <Form />
      </div>
    </section>
  );
};

export default Contact;
