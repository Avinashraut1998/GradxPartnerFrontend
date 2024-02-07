import React, { useState } from "react";
import LeadsForm from "./LeadsForm";

const Modal = () => {
  const [showModal, setShowModal] = useState(false);

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
          <div className="relative z-50 w-full max-w-5xl p-3 mx-auto bg-white rounded-lg shadow-lg  dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-start justify-between pb-3 border-b border-gray-300">
              <h3 className="text-3xl font-semibold">General Info</h3>
              <button
                className="text-black"
                onClick={() => setShowModal(false)}
              >
                <span className="text-2xl font-bold">×</span>
              </button>
            </div>
            <div className="overflow-y-auto max-h-125 ">
              {/* Ensure to set max height and overflow for the content */}
              <LeadsForm />
            </div>
            <div className="flex items-center justify-end pt-4 border-t border-gray-300">
              <button
                className="text-red-500 font-bold uppercase px-4 py-2 mr-2"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className=" bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6 cursor-pointer"
                onClick={() => setShowModal(false)}
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
