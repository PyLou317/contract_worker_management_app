import Brand from '../Brand';
import mainItems from './main-items-list';
import settingItems from './settings-items-list';
import Modal from '@/components/Modals/Modal';
import LogoutModal from '@/components/Modals/Logout';

export default function SideNavBar({
  activeLink,
  onLinkClick,
  onLogoutClick,
  showModal,
  setShowModal,
}) {
  return (
    <>
      <nav className="bg-gray-800 w-64 text-white p-4 h-screen overflow-y-auto flex flex-col">
        <div className="border-b-2 border-gray-700 py-4">
          <Brand className="text-2xl" />
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
              <span>{item.name}</span>
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
              <span>{item.name}</span>
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
