import React, { createContext, useContext } from 'react';
import { useProjects } from '../hooks';
import { Project } from '../interfaces/project';

interface ProjectsContextState {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}
export const ProjectsContext = createContext<ProjectsContextState>(
  {} as ProjectsContextState
);
export const ProjectsProvider: React.FC = ({ children }) => {
  const { projects, setProjects } = useProjects();

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjectsValue = () => useContext(ProjectsContext);
