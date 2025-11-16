import { NavLink } from 'react-router';

export default function TabMenuItem({ name, Icon, path }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex font-semibold cursor-pointer px-4 py-3 items-center rounded-t-3xl text-gray-700 bg-gray-200/75 ${
          isActive ? 'bg-white' : 'hover:bg-white'
        }`
      }
    >
      <Icon />
      <span>{name}</span>
    </NavLink>
  );
}
