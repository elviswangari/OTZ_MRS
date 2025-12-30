import React, { createContext, useContext, useState, useEffect } from 'react';

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [activePatient, setActivePatient] = useState(null);

  // Clear active patient on logout or role change could be handled here if needed
  // For now, we'll just provide the state

  return (
    <PatientContext.Provider value={{ activePatient, setActivePatient }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatient must be used within a PatientProvider');
  }
  return context;
};
