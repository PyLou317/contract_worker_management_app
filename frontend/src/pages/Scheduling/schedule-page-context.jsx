import { createContext } from 'react';

export const ScheduleContext = createContext({
  handleTabLinkClick: () => {},
  days: [],
  areas: [],
  managers: [],
  schedules: [],
  scheduleIsPending: false,
  scheduleError: null,
  scheduleIsFetching: false,
  selectLabelClasses: '',
  InputLableClasses: '',
  isActive: '',
});
