import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useSelectedProject } from '../context/SelectedProjectContext';
import { useProjectsValue } from '../context/ProjectsContext';
import { firebase } from '../firebase';
import { Project } from '../interfaces/project';

// TODO: 2:04:44
interface ProjectProps {
  project: Project;
}

const IndividualProject: React.FC<ProjectProps> = ({ project }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProject();

  const deleteProject = (docId: string) => {
    firebase
      .firestore()
      .collection('projects')
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects]);
        setSelectedProject('INBOX');
      });
  };

  return (
    <>
      <span className='sidebar__dot'>•</span>
      <span className='sidebar__project-name'>{project.name}</span>
      <span
        className='sidebar__project-delete'
        data-testid='delete-project'
        onKeyDown={() => setShowConfirm((prevState) => !prevState)}
        onClick={() => setShowConfirm((prevState) => !prevState)}
      >
        <FaTrashAlt />
        {showConfirm && (
          <div className='project-delete-modal'>
            <div className='project-delete-modal__inner'>
              <p>Are you sure you want to delete this project?</p>
              <button
                type='button'
                onClick={() => deleteProject(project.docId)}
              >
                Delete
              </button>
              <span
                onClick={() => setShowConfirm((prevState) => !prevState)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setShowConfirm((prevState) => !prevState);
                  }
                }}
                tabIndex={0}
                role='button'
                aria-label='Cancel adding project, do not delete'
              >
                Cancel
              </span>
            </div>
          </div>
        )}
      </span>
    </>
  );
};

export default IndividualProject;
