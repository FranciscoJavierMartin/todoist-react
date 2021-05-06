import React, { createContext, useContext, useState } from 'react';

interface SelectedProjectContextState {
  selectedProject: string;
  setSelectedProject: React.Dispatch<React.SetStateAction<string>>
}
export const SelectedProjectContext = createContext<SelectedProjectContextState>({} as SelectedProjectContextState);
export const SelectedProjectProvider:React.FC = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState<string>('INBOX');

  return (
    <SelectedProjectContext.Provider
      value={{ selectedProject, setSelectedProject }}
    >
      {children}
    </SelectedProjectContext.Provider>
  );
};

export const useSelectedProject = () => useContext(SelectedProjectContext);
