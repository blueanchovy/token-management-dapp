import React, { createContext, useContext, useState } from "react";

// Create the context
const ActiveSectionContext = createContext();

// Create a provider component
export const ActiveSectionProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  );
};

// Custom hook to use the ActiveSectionContext
export const useActiveSection = () => {
  return useContext(ActiveSectionContext);
};
