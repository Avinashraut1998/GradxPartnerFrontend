import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LeadViewpage = () => {
  const [lead, setLead] = useState({});
  let { id } = useParams();

  const fetchJobs = async () => {
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
        setLead(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="w-full p-3 mx-auto bg-white rounded-lg shadow-lg dark:border-strokedark dark:bg-boxdark">
      <h3 className="text-title-lg mb-4 text-black-2 dark:text-white">
        Lead Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4  text-black">
        {/* Column 1: Personal Information and Address Details */}
        <div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold  mb-2 text-black-2 dark:text-white">
              Personal Information
            </h4>
            <div>
              <span className="font-bold"> Name:</span> {lead?.firstname}{" "}
              {lead?.middlename} {lead?.lastname}
            </div>
            <div>
              {" "}
              <span className="font-bold"> Date of Birth:</span>{" "}
              {lead?.dateOfBirth}
            </div>
            <div>
              {" "}
              <span className="font-bold"> Email: </span>
              {lead?.email}
            </div>
            <div>
              <span className="font-bold"> Phone Number: </span>
              {lead?.phoneNumber}
            </div>
            <div>
              <span className="font-bold">Alternate Phone Number:</span>{" "}
              {lead?.alternatePhoneNumber}
            </div>
            <div>
              <span className="font-bold">WhatsApp Number:</span>{" "}
              {lead?.whatsappNumber}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2  text-black-2 dark:text-white">
              Address Details
            </h4>
            <div>
              <span className="font-bold"> Street Address:</span>{" "}
              {lead?.address?.street}
            </div>
            <div>
              <span className="font-bold"> City:</span> {lead?.address?.city}
            </div>
            <div>
              <span className="font-bold"> State:</span> {lead?.address?.state}
            </div>
            <div>
              <span className="font-bold"> Code:</span>{" "}
              {lead?.address?.postalCode}
            </div>
            <div>
              <span className="font-bold"> Country:</span>{" "}
              {lead?.address?.country}
            </div>
          </div>
        </div>

        {/* Column 2: Educational Background, Work Experience, Family Information */}
        <div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2  text-black-2 dark:text-white">
              Educational Background
            </h4>
            <div>
              <span className="font-bold"> Course:</span>{" "}
              {lead?.educationalBackground?.course}
            </div>
            <div>
              <span className="font-bold"> Percentage:</span>{" "}
              {lead?.educationalBackground?.percentage}%
            </div>
            <div>
              <span className="font-bold"> University:</span>{" "}
              {lead?.educationalBackground?.university}
            </div>
            <div>
              <span className="font-bold"> Passing Year:</span>{" "}
              {lead?.educationalBackground?.passingYear}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2 text-black-2 dark:text-white">
              Work Experience
            </h4>
            <div>
              <span className="font-bold"> Company Name:</span>{" "}
              {lead?.workExperience?.companyName}
            </div>
            <div>
              <span className="font-bold">Experience Years: </span>{" "}
              {lead?.workExperience?.experienceYears}
            </div>
          </div>

          <div className="mb-4  text-black-2 dark:text-white">
            <h4 className="text-lg font-semibold mb-2">Family Information</h4>
            <div>
              <span className="font-bold">Mother's Occupation: </span>{" "}
              {lead?.mothersOccupation}
            </div>
            <div>
              <span className="font-bold">Father's Occupation: </span>{" "}
              {lead?.fathersOccupation}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadViewpage;
