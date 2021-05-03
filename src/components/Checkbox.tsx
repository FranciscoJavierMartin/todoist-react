import React from 'react';
import { firebase } from '../firebase';

interface CheckboxProps {
  id: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ id }) => {
  const archiveTask = () => {
    firebase.firestore().collection('tasks').doc(id).update({
      archived: true,
    });
  };

  return (
    <div
      className='checkbox-holder'
      data-testid='checkbox-action'
      onClick={() => archiveTask()}
    >
      <span className='checkbox' />
    </div>
  );
};

export default Checkbox;
