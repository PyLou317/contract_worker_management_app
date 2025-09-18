import { useContext } from 'react';
import { ScheduleContext } from '../Schedule/schedule-page-context';

export default function TabMenuItem({ name, icon }) {
  const { isActive, handleTabLinkClick } = useContext(ScheduleContext);

  return (
    <li
      className={`flex gap-1 font-semibold cursor-pointer px-4 py-2 rounded-t-3xl text-gray-700 ${
        isActive === name ? 'bg-gray-100' : 'hover:bg-gray-100'
      }`}
      onClick={() => handleTabLinkClick(name)}
      aria-current={isActive === name ? 'page' : undefined}
    >
      {icon}
      {name}
    </li>
  );
}
