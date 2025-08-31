import { useEffect, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import TopNavBar from './components/TopNavBar';
import SideNavBar from './components/SideNavBar';
import Dashboard from './pages/DashboardPage';
import Workers from './pages/WorkersPage';
import Login from './components/LoginPage';
import WarningModal from './components/WarningModal';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isActive, setIsActive] = useState('Dashboard');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check for the auth token when the app loads
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSideLinkClick = (name) => {
    setIsActive(name);
  };

  if (!isLoggedIn) {
    return <Login />;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="flex w-full min-h-screen">
          <SideNavBar
            activeLink={isActive}
            onLinkClick={handleSideLinkClick}
            onLogoutClick={() => {setShowModal(true); console.log('Logout clicked')}}
          />
          <WarningModal show={showModal} onClose={() => setShowModal(false)}>
            <p className="text-lg font-semibold">Are you sure you want to log out?</p>
            <p className="text-sm text-gray-400 mt-2">You will need to sign in again to access your account.</p>
          </WarningModal>
          <div className="flex flex-col flex-1 h-screen overflow-y-auto">
            <TopNavBar />
            <main className="m-4 flex-1">
              {isActive === 'Dashboard' && <Dashboard />}
              {isActive === 'Employees' && <Workers />}
              {/* {isActive === 'Scheduling' &&  <Scheduling />}
              {isActive === 'Settings' && <Settings />} */}
            </main>
          </div>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
  }
}

export default App;
