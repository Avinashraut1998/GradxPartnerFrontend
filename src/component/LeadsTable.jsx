import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaEye } from "react-icons/fa";
import DeleteAction from "./Actions/DeleteAction";
import { useNavigate } from "react-router-dom";
import { LeadContext } from "../context/LeadContext";

const LeadsTable = () => {
  const { leads, setLeads } = useContext(LeadContext);
  const navigate = useNavigate();

  const handleDelete = async (leadId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:8000/api/v1/users/lead/${leadId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update leads after successful deletion
      fetchLeads();
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  const fetch = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8000/api/v1/users/leads", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setLeads(res.data.data));
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-bodydark  text-left dark:bg-meta-4">
                <th className="min-w-[100px]  py-4 px-4 font-bold text-black dark:text-white xl:pl-11">
                  Name
                </th>

                <th className="min-w-[100px] py-4 px-4 font-bold text-black dark:text-white">
                  Mobile Number
                </th>
                <th className="min-w-[100px] py-4 px-4  font-bold text-black dark:text-white">
                  Email
                </th>
                <th className=" min-w-[100px] py-4 px-4 font-bold text-center text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {leads?.map((lead) => (
                <tr className="  dark:bg-meta-4" key={lead._id}>
                  <td className="border-b border-[#eee] py-3 px-2 pl-9 dark:border-strokedark xl:pl-11">
                    {lead.firstname} {lead.lastname}
                  </td>

                  <td className="border-b border-[#eee] py-3 px-2 pl-9 dark:border-strokedark xl:pl-11">
                    {lead.phoneNumber}
                  </td>
                  <td className="border-b border-[#eee] py-3 px-2 pl-9 dark:border-strokedark xl:pl-11">
                    {lead.email}
                  </td>
                  <td className="border-b border-[#eee] py-3 px-2 pl-9  dark:border-strokedark xl:pl-11">
                    <div className="flex gap-2 justify-center  ">
                      <button onClick={() => navigate(`view/${lead._id}`)}>
                        {<FaEye />}
                      </button>
                      <button onClick={() => navigate(`edit/${lead._id}`)}>
                        {<FaEdit />}
                      </button>
                      <DeleteAction onDelete={() => handleDelete(lead._id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default LeadsTable;
