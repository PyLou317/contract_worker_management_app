import { useEffect, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import TopNavBar from './components/TopNavBar';
import SideNavBar from './components/SideNavBar';
import Dashboard from './pages/DashboardPage';
import Workers from './pages/WorkersPage';
import Login from './components/LoginPage';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isActive, setIsActive] = useState('Dashboard');

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
        <div className="flex flex-col h-screen">
          <TopNavBar />
          <div className="flex flex-1">
            <SideNavBar activeLink={isActive} onLinkClick={handleSideLinkClick} />
            <div className="m-4 flex-1 flex-col justify-start items-start h-screen w-screen">
              <div>
                {isActive === 'Dashboard' && <Dashboard />}
                {isActive === 'Employees' && <Workers />}
                {/* {isActive === 'Scheduling' &&  <Scheduling />}
              {isActive === 'Settings' && <Settings />} */}
              </div>
            </div>
          </div>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
  }
}

export default App;
