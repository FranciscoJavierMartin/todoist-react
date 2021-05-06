import { useEffect, useState } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { collatedTasksExists } from '../helpers';
import { Task } from '../interfaces/task';
import { FIREBASE_COLLECTION_TASKS, USER_ID } from '../constants';
import { Project } from '../interfaces/project';

export const useTasks = (selectedProject: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      let tasksByProject;

      const tasksByUser = firebase
        .firestore()
        .collection(FIREBASE_COLLECTION_TASKS)
        .where('userId', '==', USER_ID);

      if (selectedProject && collatedTasksExists(selectedProject)) {
        tasksByProject = tasksByUser.where('projectId', '==', selectedProject);
      } else if (selectedProject === 'TODAY') {
        tasksByProject = tasksByUser.where(
          'date',
          '==',
          moment().format('DD/MM/YYYY')
        );
      } else if (selectedProject === 'INBOX' || selectedProject === '0') {
        tasksByProject = tasksByUser.where('date', '==', '');
      } else {
        tasksByProject = tasksByUser;
      }

      const tasksFromServer = await tasksByProject.get();
      const newTasks: Task[] = tasksFromServer.docs.map<Task>(
        (task) =>
          ({
            ...task.data(),
            docId: task.id,
          } as Task)
      );
      let nonArchivedTasks: Task[] = newTasks.filter((task) => !task.archived);

      if (selectedProject === 'NEXT_7') {
        nonArchivedTasks = nonArchivedTasks.filter(
          (task) => moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7
        );
      }

      setTasks(nonArchivedTasks);
      setArchivedTasks(newTasks.filter((task: Task) => task.archived));
    })();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    (async () => {
      const result = await firebase
        .firestore()
        .collection('projects')
        .where('userId', '==', USER_ID)
        .orderBy('projectId')
        .get();

      const allProjects: Project[] = result.docs.map<Project>(
        (project) =>
          ({
            ...project.data(),
            docId: project.id,
          } as Project)
      );

      if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
        setProjects(allProjects);
      }
    })();
  }, [projects]);

  return { projects, setProjects };
};
