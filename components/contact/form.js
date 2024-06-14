'use client'
import React, {useState} from 'react'

const Form = () => {
    const [formDataContact, setFormDataContact] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        companyName: "",
        country: "",
        message: "",
        document: "",
        reasonsForContact: [],
      });

      const handleInputChangeContact = (e) => {
        const { name, value } = e.target;
        setFormDataContact((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };

      const handleSubmitContact = (event) => {
        event.preventDefault();
        console.log(formDataContact)
    
          setFormDataContact({
            name: "",
            email: "",
            phoneNumber: "",
            companyName: "",
            country: "",
            message: "",
            document: "",
            reasonsForContact: [],
          });
      };

    return (
        <div>


            <form
              name="contact"
              onSubmit={handleSubmitContact}
              className="my-24 flex flex-col gap-8 text-[#2C3335] mx-8  lg:mx-[100px] md:mx-[150px]"
            >
              <div className="flex flex-col gap-8 md:flex-row">
                <div className="flex flex-col gap-2 md:w-1/2">
                  <label className="font-bold text-sm">First Name</label>
                  <input
                    className="rounded-lg p-4 border border-[#0000001F] outline-none"
                    type="text"
                    placeholder='Enter your first name'
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
                    placeholder='Enter your last name'
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
                    placeholder='Enter your phone number'
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
                    placeholder='Enter your email'
                    name="email"
                    value={formDataContact.email}
                    onChange={handleInputChangeContact}
                    required
                  />
                </div>
              </div>

             

              <div className="flex flex-col gap-2 w-full">
                <label className="font-bold text-sm">
                What service do you need?
                </label>
                {/* <div className="rounded bg-[#F7F7F7] grid grid-cols-1 md:grid-cols-2 gap-5 p-4 md:p-8">
                  <div className="flex items-center gap-3">
                    <input
                      className="rounded p-2 w-5 h-5"
                      name="reasonsForContact"
                      value="Web Design"
                      checked={formDataContact.reasonsForContact.includes(
                        "Web Design"
                      )}
                      onChange={handleCheckboxChangeContact}
                      type="checkbox"
                    />
                    <label>Web Design</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      className="rounded p-2 w-5 h-5"
                      name="reasonsForContact"
                      value="Collaboration"
                      checked={formDataContact.reasonsForContact.includes(
                        "Collaboration"
                      )}
                      onChange={handleCheckboxChangeContact}
                      type="checkbox"
                    />
                    <label>Collaboration</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      className="rounded p-2 w-5 h-5"
                      name="reasonsForContact"
                      value="Mobile App Design"
                      checked={formDataContact.reasonsForContact.includes(
                        "Mobile App Design"
                      )}
                      onChange={handleCheckboxChangeContact}
                      type="checkbox"
                    />
                    <label>Mobile App Design</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      className="rounded p-2 w-5 h-5"
                      name="reasonsForContact"
                      value="Others"
                      checked={formDataContact.reasonsForContact.includes(
                        "Others"
                      )}
                      onChange={handleCheckboxChangeContact}
                      type="checkbox"
                    />
                    <label>Others</label>
                  </div>
                </div> */}
              </div>
              <div className="flex flex-col gap-2 ">
                  <label className="font-bold text-sm">Project Details</label>
                  <input
                    className="rounded-lg p-4 border border-[#0000001F] outline-none"
                    type="text"
                    placeholder='Enter Project Details'
                    name="projectDetails"
                    value={formDataContact.projectDetails}
                    onChange={handleInputChangeContact}
                    
                  />
                </div>

              <div className="flex flex-col gap-8 md:flex-row">
                <div className="flex flex-col gap-2 md:w-1/2">
                  <label className="font-bold text-sm">Project Budget</label>
                  <input
                    className="rounded-lg p-4 border border-[#0000001F] outline-none"
                    type="text"
                    placeholder='Enter Project Budget'
                    name="projectBudget"
                    value={formDataContact.projectBudget}
                    onChange={handleInputChangeContact}
                    
                  />
                </div>
                <div className="flex flex-col gap-2 md:w-1/2">
                  <label className="font-bold text-sm">Project Budget</label>
                  <input
                    className="rounded-lg p-4 border border-[#0000001F] outline-none"
                    type="text"
                    placeholder='Enter Project Budget'
                    name="projectBudget"
                    value={formDataContact.projectBudget}
                    onChange={handleInputChangeContact}
                    
                  />
                </div>
              </div>

             <div className='flex justify-center '>

              <button className="bg-[#134574] text-sm md:text-md text-white rounded-full p-3 px-12 py-4 font-bold" type="submit">
                Send Message
              </button>
             </div>
            </form>

        </div>
    )
}


export default Form;