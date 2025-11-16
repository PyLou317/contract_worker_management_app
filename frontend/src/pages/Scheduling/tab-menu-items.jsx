import calendarIcon from '@/Icons/CalendarIcon';
import scheduleIcon from '@/Icons/ScheduleIcon';
import scheduleListIcon from '@/Icons/ScheduleListIcon';

const tabItems = [
  {
    name: 'Create Schedule',
    path: '/scheduling/create-schedule',
    icon: scheduleIcon,
  },
  {
    name: 'View Schedules',
    path: '/scheduling/view-schedules',
    icon: scheduleListIcon,
  },
  {
    name: 'Calendar',
    path: '/scheduling/calendar',
    icon: calendarIcon,
  },
];

export default tabItems;
