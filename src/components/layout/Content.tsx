import React from 'react';
import Sidebar from './Sidebar';
import Tasks from '../Tasks';

const Content: React.FC = () => {
  return (
    <section className='content'>
      <Sidebar />
      <Tasks />
    </section>
  );
};

export default Content;
