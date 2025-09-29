import TabMenuItem from './TopNavTabItem';
import calendarIcon from './Icons/CalendarIcon';
import scheduleIcon from './Icons/ScheduleIcon';

export default function NavTabs() {
  const tabItems = [
    { name: 'Create Schedule', icon: scheduleIcon },
    { name: 'Calendar', icon: calendarIcon },
  ];

  return (
    <div className='ms-4'>
      <ul className="flex flex-row gap-1 justify-start">
        {tabItems.map((item, index) => (
          <TabMenuItem name={item.name} Icon={item.icon} key={index} />
        ))}
      </ul>
    </div>
  );
}
