import userIcon from '@/Icons/UserIcon';
import agencyIcon from '@/Icons/AgencyIcon';
import calendarIcon from '@/Icons/CalendarIcon';

const tabItems = [
  {
    name: 'Account',
    path: '/settings/account',
    icon: userIcon,
  },
  {
    name: 'Agencies',
    path: '/settings/agencies',
    icon: agencyIcon,
  },
  {
    name: 'Managers',
    path: '/settings/managers',
    icon: calendarIcon,
  },
  {
    name: 'Departments',
    path: '/settings/areas',
    icon: calendarIcon,
  },
];

export default tabItems;
