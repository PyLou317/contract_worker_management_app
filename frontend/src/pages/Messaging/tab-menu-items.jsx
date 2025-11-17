import WorkersIcon from '@/Icons/WorkersIcon';
import SMSIcon from '@/Icons/SMSIcon';
import ArchiveIcon from '@/Icons/ArchiveIcon';

const tabItems = [
  {
    name: 'Request Workers',
    path: '/messaging/request-workers',
    icon: WorkersIcon,
  },
  {
    name: 'Send SMS',
    path: '/messaging/send-sms',
    icon: SMSIcon,
  },
  {
    name: 'Archived Messages',
    path: '/messaging/view-messages',
    icon: ArchiveIcon,
  },
];

export default tabItems;
