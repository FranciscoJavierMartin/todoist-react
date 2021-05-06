import React, { useState } from 'react';
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from 'react-icons/fa';
import { useSelectedProject } from '../../context/SelectedProjectContext';
import Projects from '../Projects';

const Sidebar: React.FC = () => {
  const { setSelectedProject } = useSelectedProject();
  const [active, setActive] = useState('INBOX');
  const [showProjects, setShowProjects] = useState(true);
  return (
    <div className='sidebar' data-testid='sidebar'>
      <ul className='sidebar__generic'>
        <li data-testid='inbox' className='inbox'>
          <span>
            <FaInbox />
          </span>
          <span>Inbox</span>
        </li>
        <li data-testid='today' className='today'>
          <span>
            <FaRegCalendar />
          </span>
          <span>Today</span>
        </li>
        <li data-testid='next_7' className='next_7'>
          <span>
            <FaRegCalendarAlt />
          </span>
          <span>Next 7 days</span>
        </li>
      </ul>
      <div className='sidebar__middle'>
        <span>
          <FaChevronDown />
        </span>
        <h2>Projects</h2>
      </div>
      <ul className='sidebar__projects'>
        {showProjects && <Projects activeValue={null} />}
      </ul>
    </div>
  );
};

export default Sidebar;
