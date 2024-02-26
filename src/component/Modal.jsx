import React, { useContext, useState } from "react";

import axios from "axios";
import { LeadContext } from "../context/LeadContext";

const Modal = () => {
  const { leads, setLeads } = useContext(LeadContext);

  const [showModal, setShowModal] = useState(false);

  const [autoFill, setAutoFill] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // address state
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const handleAutoFillChange = () => {
    if (mobileNumber !== "") {
      setAutoFill(!autoFill);
      if (!autoFill) {
        setWhatsappNumber(mobileNumber);
      } else {
        setWhatsappNumber("");
      }
    }
  };

  const isNumeric = (value) => {
    return /^-?\d+$/.test(value);
  };

  const handleMobileNumberChange = (e) => {
    const newValue = e.target.value;
    if (isNumeric(newValue) || newValue === "") {
      setMobileNumber(newValue);
      if (autoFill) {
        setWhatsappNumber(newValue);
      }
    }
  };

  // const handleAlternateNumberChange = (e) => {
  //   const newValue = e.target.value;
  //   if (isNumeric(newValue) || newValue === "") {
  //     setAlternateNumber(newValue);
  //   }
  // };
  const handleWhatsappNumberChange = (e) => {
    const newValue = e.target.value;
    if (isNumeric(newValue) || newValue === "") {
      setWhatsappNumber(newValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/lead",
        {
          firstname: firstName,
          lastname: lastName,
          email: email,
          address: { street, city, pincode, state, country },
          phoneNumber: mobileNumber,
          whatsappNumber: whatsappNumber,
          // Add other form data properties
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLeads([...leads, response.data.data]);
    } catch (error) {
      console.error("Error submitting form:", error.message);
      // You can add more specific error handling here based on your application's needs
    }

    setShowModal(false);
  };

  return (
    <>
      <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3
          className="inline-flex items-center justify-center bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          Create Lead
        </h3>
      </div>
      {showModal ? (
        <div className="fixed inset-0 z-9999 overflow-hidden flex items-center justify-center ">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-50 w-full max-w-4xl p-1 mx-auto bg-white rounded-lg shadow-lg dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-start justify-between pb-1 border-b border-gray-300">
              <h3 className="text-3xl font-semibold">General Info</h3>
              <button
                className="text-black"
                onClick={() => setShowModal(false)}
              >
                <span className="text-2xl font-bold">×</span>
              </button>
            </div>
            <div className="overflow-y-auto max-h-80  lg:max-h-90">
              {/* Ensure to set max height and overflow for the content */}

              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-3 px-4.5 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Leads
                  </h3>
                </div>
                <form onSubmit={handleSubmit} className="font-thin ">
                  <div className="p-2  sm:p-2 lg:p-4 xl:p-6">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full xl:w-1/3">
                        <label className="mb-2.5 block text-black dark:text-white">
                          First name <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstname"
                          placeholder="first name"
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>

                      {/* <div className="w-full xl:w-1/3">
                <label className="mb-2.5 block text-black dark:text-white">
                  Middle name
                </label>
                <input
                  type="text"
                  name="middlename"
                  placeholder="middle name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div> */}

                      <div className="w-full xl:w-1/3">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Last name <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastname"
                          placeholder="last name"
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Email <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="email address"
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row"></div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="dob"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Mobile Number <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          placeholder="mobile number"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          value={mobileNumber}
                          onChange={handleMobileNumberChange}
                        />
                      </div>

                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          placeholder="WhatsApp number"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          value={whatsappNumber}
                          onChange={handleWhatsappNumberChange}
                        />
                        <div className="block text-sm mt-2 text-black dark:text-white">
                          <input
                            type="checkbox"
                            onChange={handleAutoFillChange}
                            checked={autoFill}
                            className="mr-2"
                          />
                          &nbsp; Fill WhatsApp if same as Mobile
                        </div>
                      </div>

                      {/* <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Alternate Mobile Number
                </label>
                <input
                  type="tel"
                  placeholder=" alternate mobile number"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  onChange={handleAlternateNumberChange}
                  value={alternateNumber}
                />
              </div> */}
                    </div>

                    <div className="mb-2.5 block text-black dark:text-white">
                      Address:
                    </div>

                    {/* First Line */}
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Street
                        </label>
                        <input
                          type="text"
                          placeholder="street"
                          onChange={(e) => setStreet(e.target.value)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          City
                        </label>
                        <input
                          type="text"
                          placeholder="city"
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                    </div>

                    {/* Second Line */}
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full xl:w-1/3">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Pincode
                        </label>
                        <input
                          type="number"
                          placeholder="pincode"
                          onChange={(e) => setPincode(e.target.value)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                      <div className="w-full xl:w-1/3">
                        <label className="mb-2.5 block text-black dark:text-white">
                          State
                        </label>
                        <input
                          type="text"
                          placeholder="state"
                          onChange={(e) => setState(e.target.value)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                      <div className="w-full xl:w-1/3">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Country
                        </label>
                        <input
                          type="text"
                          placeholder="country"
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                    </div>

                    {/* <div className="mb-2.5 block text-black dark:text-white">
              Educational Details:
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              
              <div className="w-full xl:1/4">
                <label className="mb-2.5 block text-black dark:text-white">
                  Last Education
                </label>
                <input
                  type="text"
                  placeholder="highest education"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div className="w-full xl:1/4">
                <label className="mb-2.5 block text-black dark:text-white">
                  Percentage
                </label>
                <input
                  type="text"
                  placeholder="percentage"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div className="w-full xl:1/4">
                <label className="mb-2.5 block text-black dark:text-white">
                  University
                </label>
                <input
                  type="text"
                  placeholder="university"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div className="w-full xl:1/4">
                <label className="mb-2.5 block text-black dark:text-white">
                  Year
                </label>
                <input
                  type="text"
                  placeholder="year of completion"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div> */}

                    {/* <label className="mb-4.5 block text-black dark:text-white">
              Last Work Experience:
            </label>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Company Name:
                </label>
                <input
                  type="text"
                  placeholder="Company"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Years of Experience:
                </label>

                <input
                  type="text"
                  placeholder="Year Experience"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div> */}

                    {/* <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <div className="mb-2.5 block text-black dark:text-white">
                  Father Occupation
                </div>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-1.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                    <option value="">select</option>
                    <option value="Goverment Employee">
                      Goverment Employee
                    </option>
                    <option value="Business">Business</option>
                    <option value="other">other</option>
                  </select>
                  <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <svg
                      className="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill=""
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="w-full xl:w-1/2">
                <div className="mb-2.5 block text-black dark:text-white">
                  Mothers Occupation
                </div>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-1.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                    <option value="">select</option>
                    <option value="Government Employee">
                      Government Employee
                    </option>
                    <option value="Business">Business</option>
                    <option value="Housewife">Housewife</option>
                    <option value="Other">Other</option>
                  </select>
                  <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <svg
                      className="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill=""
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>
            </div> */}
                  </div>
                </form>
              </div>
            </div>
            <div className="flex items-center justify-end pt-4 border-t border-gray-300">
              <button
                className="text-red-500 font-bold uppercase px-4 py-2 mr-2"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6 cursor-pointer"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
