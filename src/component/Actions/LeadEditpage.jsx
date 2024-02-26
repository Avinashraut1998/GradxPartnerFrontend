import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlertSuccess from "../AlertSuccess";

const LeadEditpage = () => {
  const [autoFill, setAutoFill] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);

  let { id } = useParams();

  const handleAutoFillChange = () => {
    if (mobileNumber !== null && mobileNumber !== "") {
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

  const handleWhatsappNumberChange = (e) => {
    const newValue = e.target.value;
    if (isNumeric(newValue) || newValue === "") {
      setWhatsappNumber(newValue);
    }
  };

  const fetchLead = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await axios.get(
          `http://localhost:8000/api/v1/users/lead/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFirstName(response.data.data.firstname);
        setLastName(response.data.data.lastname);
        setEmail(response.data.data.email);
        setMobileNumber(response.data.data.phoneNumber.toString());
        setWhatsappNumber(response.data.data.whatsappNumber.toString());
        setStreet(response.data.data.address.street || "");
        setCity(response.data.data.address.city || "");
        setPincode(response.data.data.address.pincode || "");
        setState(response.data.data.address.state || "");
        setCountry(response.data.data.address.country || "");
      }
    } catch (error) {
      console.error("Error fetching lead:", error.message);
    }
  };

  useEffect(() => {
    fetchLead();
  }, []);

  const saveLead = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await axios.put(
          `http://localhost:8000/api/v1/users/lead/${id}`,
          {
            firstname: firstName,
            lastname: lastName,
            email: email,
            phoneNumber: parseInt(mobileNumber),
            whatsappNumber: autoFill
              ? parseInt(mobileNumber)
              : parseInt(whatsappNumber),
            address: {
              street: street,
              city: city,
              pincode: pincode,
              state: state,
              country: country,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setAlertMessage(response.data.message);
        }
        // Handle the response as needed
      }
    } catch (error) {
      console.error("Error saving lead:", error.message);
      // Handle the error as needed
    }
  };

  return (
    <>
      {alertMessage ? <AlertSuccess message={alertMessage} /> : <h1>failed</h1>}
      <h3 className="text-title-lg mb-2 text-black-2 dark:text-white">
        Edit Leads
      </h3>
      <div className="w-full p-2 mx-auto bg-white rounded-lg shadow-lg dark:border-strokedark dark:bg-boxdark">
        <form className="font-thin ">
          <div className="p-2  sm:p-2 lg:p-4 xl:p-6">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/3">
                <label className="mb-1 block text-black dark:text-white">
                  First name <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  name="firstname"
                  placeholder="first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/3">
                <label className="mb-1 block text-black dark:text-white">
                  Middle name
                </label>
                <input
                  type="text"
                  name="middlename"
                  placeholder="middle name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/3">
                <label className="mb-1 block text-black dark:text-white">
                  Last name <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  name="lastname"
                  placeholder="last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-1 block text-black dark:text-white">
                  Email <span className="text-meta-1">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row"></div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-1 block text-black dark:text-white">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-1 block text-black dark:text-white">
                  Mobile Number <span className="text-meta-1">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="mobile number"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  value={mobileNumber || ""}
                  onChange={handleMobileNumberChange}
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-1 block text-black dark:text-white">
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
            </div>
            <div className="mb-1 block text-black dark:text-white">
              Address:
            </div>
            {/* First Line */}
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-1 block text-black dark:text-white">
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
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Pincode
                </label>
                <input
                  type="number"
                  placeholder="pincode"
                  onChange={(e) => setPincode(e.target.value)}
                  value={pincode}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  State
                </label>
                <input
                  type="text"
                  placeholder="state"
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Country
                </label>
                <input
                  type="text"
                  placeholder="country"
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="mb-2.5 block text-black dark:text-white">
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
            </div>{" "}
            <label className="mb-4.5 block text-black dark:text-white">
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
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
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
            </div>
          </div>
          <div className="flex justify-end mb-2 ">
            <h3
              className="inline-flex items-center justify-center bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6 cursor-pointer"
              onClick={saveLead}
            >
              Save
            </h3>
          </div>
        </form>
      </div>
    </>
  );
};

export default LeadEditpage;
