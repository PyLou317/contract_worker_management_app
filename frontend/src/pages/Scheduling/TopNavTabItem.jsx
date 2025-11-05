import { useContext } from 'react';
import { ScheduleContext } from './schedule-page-context';

export default function TabMenuItem({ name, Icon }) {
  const { isActive, handleTabLinkClick } = useContext(ScheduleContext);

  return (
    <li
      className={`flex font-semibold cursor-pointer px-4 py-3 rounded-t-3xl text-gray-700 bg-gray-200/75 ${
        isActive === name ? 'bg-white' : 'hover:bg-white'
      }`}
      onClick={() => handleTabLinkClick(name)}
      aria-current={isActive === name ? 'page' : undefined}
    >
      <Icon />
      {name}
    </li>
  );
}
