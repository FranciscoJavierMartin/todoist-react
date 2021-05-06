import React, { useState } from 'react';
import { useProjectsValue } from '../context/ProjectsContext';
import { generatePushId } from '../helpers';
import { firebase } from '../firebase';
import { FIREBASE_COLLECTION_PROJECTS, USER_ID } from '../constants';

interface AddProjectProps {
  shouldShow?: boolean;
}

// TODO: 2:44:50
const AddProject: React.FC<AddProjectProps> = ({ shouldShow = false }) => {
  const [show, setShow] = useState<boolean>(shouldShow);
  const [projectName, setProjectName] = useState<string>('');

  const projectId = generatePushId();
  const { setProjects } = useProjectsValue();

  const addProject = () => {
    firebase
      .firestore()
      .collection(FIREBASE_COLLECTION_PROJECTS)
      .add({
        projectId,
        name: projectName,
        userId: USER_ID,
      })
      .then(() => {
        setProjects([]);
        setProjectName('');
        setShow(false);
      });
  };

  return (
    <div className='add-project' data-testid='add-project'>
      {show && (
        <div className='add-project__input'>
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className='add-project__name'
            data-testid='project-name'
            type='text'
            placeholder='Project name'
          />
          <button
            className='add-project__submit'
            type='button'
            onClick={() => addProject()}
            data-testid='add-project-submit'
          >
            Add Project
          </button>
          <span
            data-testid='hide-project-overlay'
            className='add-project__cancel'
            onClick={() => setShow(false)}
          >
            Cancel
          </span>
        </div>
      )}
      <span className='add-project__plus'>+</span>
      <span
        data-testid='add-project-action'
        className='add-project__text'
        onClick={() => setShow((prevState) => !prevState)}
      >
        Add Project
      </span>
    </div>
  );
};

export default AddProject;
