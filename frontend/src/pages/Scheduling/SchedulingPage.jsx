import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { ScheduleContext } from './schedule-page-context';
import { apiFetch } from '@/utilities/apiClient';

import tabItems from '@/pages/scheduling/tab-menu-items';
import NavTabs from '@/components/NavBars/PageTopNavMenu';
import { Outlet } from 'react-router';

export default function Schedule() {
  const [isActive, setIsActive] = useState('Create Schedule');

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const handleTabLinkClick = (name) => {
    setIsActive(name);
  };

  const {
    isPending: areaIsPending,
    error: areaError,
    data: areaData,
    isFetching: areaIsFetching,
  } = useQuery({
    queryKey: ['areas'],
    queryFn: () => apiFetch('/areas'),
    keepPreviousData: true,
  });
  const areas = areaData?.results || [];
  const areaNames = areas.map((area) => area.name);
  const areaOptions = areas.map((area) => ({
    label: area.name,
    value: area.id,
  }));

  const {
    isPending: managersIsPending,
    error: managersError,
    data: managersData,
    isFetching: managersIsFetching,
  } = useQuery({
    queryKey: ['managers'],
    queryFn: () => apiFetch('/managers'),
    keepPreviousData: true,
  });
  const managers = managersData?.results || [];
  const managerNames = managers.map((manager) => manager.name);
  const managerOptions = managers.map((manager) => ({
    label: manager.name,
    value: manager.id,
  }));

  const {
    isPending: scheduleIsPending,
    error: scheduleError,
    data: scheduleData,
    isFetching: scheduleIsFetching,
  } = useQuery({
    queryKey: ['schedules'],
    queryFn: () => apiFetch('/schedules'),
    keepPreviousData: true,
  });
  const schedules = scheduleData?.results || [];

  const ctxValue = {
    days: days,
    areas: areaNames,
    managers: managerOptions,
    schedules: schedules,
    scheduleIsPending: scheduleIsPending,
    scheduleError: scheduleError,
    scheduleIsFetching: scheduleIsFetching,
    isActive: isActive,
    handleTabLinkClick: handleTabLinkClick,
  };

  return (
    <ScheduleContext.Provider value={ctxValue}>
      <NavTabs tabItems={tabItems} />
      <Outlet />
    </ScheduleContext.Provider>
  );
}
