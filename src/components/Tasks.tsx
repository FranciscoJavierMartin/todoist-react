import React, { useEffect } from 'react';
import { useTasks } from '../hooks';
import Checkbox from './Checkbox';
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExists } from '../helpers';
import { useSelectedProjectValue } from '../context/SelectedProjectContext';
import { useProjectsValue } from '../context/ProjectsContext';

const Tasks: React.FC = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);
  let projectName = '';

  if (projects && selectedProject && !collatedTasksExists(selectedProject)) {
    projectName = getTitle(projects, selectedProject)?.name || '';
  }

  if (collatedTasksExists(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject)?.name || '';
  }

  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  }, [projectName]);

  return (
    <div className='tasks' data-testid='tasks'>
      <h2 data-testid='project-name'>{projectName}</h2>
      <ul className='tasks__list'>
        {tasks.map((task) => (
          <li key={task.docId}>
            <Checkbox id={task.docId} />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
