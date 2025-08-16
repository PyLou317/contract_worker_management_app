import { useState } from 'react';

export default function SideNavBar({ activeLink, onLinkClick }) {
    const menuItems = [
        { name: 'Dashboard' },
        { name: 'Workers' },
        { name: 'Scheduling' },
        { name: 'Settings' }
    ];

  return (
    <nav className="bg-gray-800 w-64 p-4 text-white">
      <div className="flex flex-col items-start">
        <ul className="w-full">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`my-2 p-4 hover:bg-gray-700 ${
                activeLink === item.name ? 'bg-gray-700' : 'hover:bg-gray-700'
              } cursor-pointer rounded-lg`}
              onClick={() => onLinkClick(item.name)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
