import calendarIcon from '@/Icons/CalendarIcon';
import scheduleIcon from '@/Icons/ScheduleIcon';
import scheduleListIcon from '@/Icons/ScheduleListIcon';

const tabItems = [
  {
    name: 'Account',
    path: '/settings/account',
    icon: scheduleIcon,
  },
  {
    name: 'Agencies',
    path: '/settings/agencies',
    icon: scheduleListIcon,
  },
  {
    name: 'Managers',
    path: '/settings/managers',
    icon: calendarIcon,
  },
];

export default tabItems;
