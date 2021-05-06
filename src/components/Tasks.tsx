import React from 'react';
import { useTasks } from '../hooks';
import Checkbox from './Checkbox';

const Tasks: React.FC = () => {
  const { tasks } = useTasks('INBOX');
  let projectName = '';

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
