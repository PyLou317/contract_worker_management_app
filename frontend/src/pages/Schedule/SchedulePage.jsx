import { useQuery } from '@tanstack/react-query';
import { createContext, useState } from 'react';
import CalendarComponent from './Calendar';
import NavTabs from './SchedulePageTopNavMenu';
import ScheduleTabPage from './ScheduleTabPage';
import { ScheduleContext } from './schedule-page-context';

export default function Schedule() {
  const [isActive, setIsActive] = useState('AddSchedule');

  const handleTabLinkClick = (name) => {
    setIsActive(name);
  };

  const ctxValue = {
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
