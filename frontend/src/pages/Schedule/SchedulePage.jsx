import { useQuery } from '@tanstack/react-query';
import { createContext, useState } from 'react';
import CalendarComponent from './Calendar';
import NavTabs from './SchedulePageTopNavMenu';
import ScheduleTabPage from './ScheduleTabPage';
import { ScheduleContext } from './schedule-page-context';

export default function Schedule() {
  const [isActive, setIsActive] = useState('AddSchedule');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const selectLabelClasses = 'block text-gray-700 text-xs font-bold mb-2 grow';

  const handleTabLinkClick = (name) => {
    setIsActive(name);
  };

  const ctxValue = {
    days: days,
    selectLabelClasses: selectLabelClasses,
    isActive: isActive,
    handleTabLinkClick: handleTabLinkClick,
  };

  return (
    <ScheduleContext.Provider value={ctxValue}>
      <NavTabs />
      {isActive === 'AddSchedule' && <ScheduleTabPage />}
      {isActive === 'Calendar' && <CalendarComponent />}
    </ScheduleContext.Provider>
  );
}
