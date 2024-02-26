import { createContext, useContext, useState } from "react";

const LeadContext = createContext();

const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([]); // Initialize as an empty array
  const value = {
    leads,
    setLeads,
  };
  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
};

export { LeadContext, LeadProvider };
