import { useEffect, useState } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { collatedTasksExists } from '../helpers';

export const useTasks = (selectedProject: string) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [archivedTasks, setArchivedTasks] = useState<any[]>([]);

  // TODO: Uncomment when types are ready
  // useEffect(() => {
  //   let unsubscribe: any = firebase
  //     .firestore()
  //     .collection('tasks')
  //     .where('userId', '==', '');

  //   unsubscribe =
  //     selectedProject && !collatedTasksExists(selectedProject)
  //       ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
  //       : selectedProject === 'TODAY'
  //       ? (unsubscribe = unsubscribe.where(
  //           'date',
  //           '==',
  //           moment().format('DD/MM/YYYY')
  //         ))
  //       : selectedProject === 'INBOX' || selectedProject === 0
  //       ? (unsubscribe = unsubscribe.where('date', '==', ''))
  //       : unsubscribe;
  //   unsubscribe = unsubscribe.onSnapshot((snapshot) => {
  //     const newTasks = snapshot.docs.map((task) => ({
  //       ...task.data(),
  //       id: task.id,
  //     }));

  //     setTasks(
  //       selectedProject === 'NEXT_7'
  //         ? newTasks.filter(
  //             (task) =>
  //               moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
  //               !task.archived
  //           )
  //         : newTasks.filter((task) => !task.archived)
  //     );

  //     setArchivedTasks(newTasks.filter((task) => task.archived));

  //     return () => unsubscribe();
  //   });
  // }, [selectedProject]);

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  // TODO: Uncomment when types are ready
  // useEffect(() => {
  //   firebase
  //     .firestore()
  //     .collection('projects')
  //     .where('userId', '==', '')
  //     .orderBy('projectId')
  //     .get()
  //     .then((snapshot) => {
  //       const allProjects = snapshot.docs.map((project) => ({
  //         ...project.data(),
  //         docId: project.id,
  //       }));

  //       if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
  //         setProjects(allProjects);
  //       }
  //     });
  // }, [projects]);

  return { projects, setProjects };
};
