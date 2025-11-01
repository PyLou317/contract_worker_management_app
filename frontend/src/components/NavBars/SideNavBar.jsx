import { useState } from 'react';

import Brand from '../Brand';
import mainItems from './main-items-list';
import settingItems from './settings-items-list';
import Modal from '@/components/Modals/Modal';
import LogoutModal from '@/components/Modals/Logout';
import SidebarToggleBtn from './ToggleSidebarBtn';

export default function SideNavBar({
  activeLink,
  onLinkClick,
  onLogoutClick,
  showModal,
  setShowModal,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  let sidebarWidth = '';
  if (sidebarOpen) {
    sidebarWidth = 'w-64';
  } else {
    sidebarWidth = 'w-20';
  }

  let toggleBtnPosition = '';
  if (sidebarOpen) {
    toggleBtnPosition = 'left-59';
  } else {
    toggleBtnPosition = 'left-15';
  }

  return (
    <>
      <nav
        className={`bg-gray-800 ${sidebarWidth} text-white p-4 h-screen overflow-y-auto flex flex-col rounded-r-xl`}
      >
        <div className="flex border-b-2 border-gray-700 py-4">
          <Brand className="text-2xl" sidebarOpen={sidebarOpen} />
          <SidebarToggleBtn
            onClick={toggleSidebar}
            position={toggleBtnPosition}
            sidebarOpen={sidebarOpen}
          />
        </div>
        <ul className="w-full flex-1">
          {mainItems.map((item, index) => (
            <li
              key={index}
              className={`flex my-2 p-4 hover:bg-gray-700 gap-4 ${
                activeLink === item.name ? 'bg-gray-700' : 'hover:bg-gray-700'
              } cursor-pointer rounded-lg`}
              onClick={() => onLinkClick(item.name)}
            >
              <span
                className={`${
                  activeLink === item.name
                    ? 'bg-gradient-to-b from-blue-300 to-blue-600 bg-clip-text text-transparent'
                    : 'text-white group-hover:bg-gradient-to-b group-hover:from-blue-300 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent'
                }`}
              >
                {item.icon}
              </span>
              {sidebarOpen && <span>{item.name}</span>}
            </li>
          ))}
        </ul>

        <ul className="w-full mt-auto">
          {settingItems.map((item, index) => (
            <li
              key={item.name}
              className={`flex my-2 p-4 gap-4 ${
                activeLink === item.name ? 'bg-gray-700' : 'hover:bg-gray-700'
              } cursor-pointer rounded-lg`}
              onClick={() => {
                onLinkClick(item.name);
                {
                  if (item.name === 'Logout') {
                    {
                      onLogoutClick();
                    }
                  }
                }
              }}
            >
              <span
                className={`${
                  activeLink === item.name
                    ? 'bg-gradient-to-b from-blue-300 to-blue-600 bg-clip-text text-transparent'
                    : 'text-white group-hover:bg-gradient-to-b group-hover:from-blue-300 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent'
                }`}
              >
                {item.icon}
              </span>
              {sidebarOpen && <span>{item.name}</span>}
            </li>
          ))}
        </ul>
      </nav>
      <Modal
        modalTitle="Logout"
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        <LogoutModal onClose={() => setShowModal(false)} />
      </Modal>
    </>
  );
}
