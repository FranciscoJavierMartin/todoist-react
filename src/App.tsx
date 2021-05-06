import React from 'react';
import Content from './components/layout/Content';
import Header from './components/layout/Header';
import { ProjectsProvider } from './context/ProjectsContext';
import { SelectedProjectProvider } from './context/SelectedProjectContext';

const App: React.FC = () => {
  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <div className='App'>
          <Header />
          <Content />
        </div>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
};

export default App;
