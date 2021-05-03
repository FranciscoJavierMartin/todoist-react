import React from 'react';
import Sidebar from './Sidebar';
import Tasks from '../Tasks';

const Content: React.FC = () => {
  return (
    <section>
      <Sidebar />
      <Tasks />
    </section>
  );
};

export default Content;
