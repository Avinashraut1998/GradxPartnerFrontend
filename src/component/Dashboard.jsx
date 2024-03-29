import React from "react";
import LeadsTable from "./LeadsTable";
import Modal from "./Modal";

const Dashboard = () => {
  return (
    <>
      <div className=" font-bold text-xl  flex items-center justify-between text-black dark:text-white">
        <div> Leads</div>
        <Modal />
      </div>
      <LeadsTable />
    </>
  );
};

export default Dashboard;
