import { useEffect, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import TopNavBar from './components/NavBars/TopNavBar';
import SideNavBar from './components/NavBars/SideNavBar';
import Dashboard from './pages/Dashboard/DashboardPage';
import Workers from './pages/WorkerListPage/WorkersPage';
import Skills from './pages/SkillsPage/SkillsPage';
import Schedule from './pages/Schedule/SchedulePage';
import Messaging from './pages/Messaging/MessagingPage';
import Modal from './components/Modals/Modal';
import LogoutModal from './components/Modals/Logout';

import Login from './components/Authentication/LoginPage';
import handleLogout from './components/Authentication/LogoutFunction';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isActive, setIsActive] = useState('Dashboard');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSideLinkClick = (name) => {
    setIsActive(name);
  };

  const mainContent = (isActive) => {
    if (isActive === 'Dashboard') {
      return <Dashboard />;
    } else if (isActive === 'Workers') {
      return <Workers />;
    } else if (isActive === 'Skills') {
      return <Skills />;
    } else if (isActive === 'Scheduling') {
      return <Schedule />;
    } else if (isActive === 'Messaging') {
      return <Messaging />;
    } else if (isActive === 'Settings') {
      return <Settings />;
    }
  };

  if (isLoggedIn === false) {
    return <Login />;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="flex w-full min-h-screen bg-gray-100/50">
          <SideNavBar
            activeLink={isActive}
            onLinkClick={handleSideLinkClick}
            showModal={showModal}
            setShowModal={setShowModal}
            onLogoutClick={() => {
              setShowModal(true);
            }}
          />
          <div className="flex flex-col flex-1 h-screen overflow-y-auto">
            <TopNavBar />
            <main className="m-4 flex-1">{mainContent(isActive)}</main>
          </div>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
  }
}

export default App;
