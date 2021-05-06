import React, { useState } from 'react';
import { useProjectsValue } from '../context/ProjectsContext';
import { useSelectedProjectValue } from '../context/SelectedProjectContext';
import { Project } from '../interfaces/project';
import IndividualProject from './IndividualProject';

interface ProjectsProps {
  activeValue: any;
}

const Projects: React.FC<ProjectsProps> = ({ activeValue = true }) => {
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  return (
    <>
      {projects.map((project: Project) => (
        <li
          key={project.projectId}
          data-doc-id={project.docId}
          data-testid='project-action'
          className={
            active === project.projectId
              ? 'active sidebar__project'
              : 'side__project'
          }
          onKeyDown={() => {
            setActive(project.projectId);
            setSelectedProject(project.projectId);
          }}
          onClick={() => {
            setActive(project.projectId);
            setSelectedProject(project.projectId);
          }}
        >
          <IndividualProject project={project} />
        </li>
      ))}
    </>
  );
};

export default Projects;
