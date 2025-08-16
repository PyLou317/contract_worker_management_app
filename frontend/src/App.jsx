import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import TopNavBar from './components/TopNavBar';
import SideNavBar from './components/SideNavBar';
import Dashboard from './pages/DashboardPage';
import Workers from './pages/WorkersPage';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const [isActive, setIsActive] = useState('Dashboard');

  const handleSideLinkClick = (name) => {
    console.log(`Clicked: ${name}`);
    setIsActive(name);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col h-screen">
        <TopNavBar />
        <div className="flex flex-1">
          <SideNavBar activeLink={isActive} onLinkClick={handleSideLinkClick} />
          <div className="flex justify-center items-center h-screen w-screen">
            <div>
              {isActive === 'Dashboard' && <Dashboard />}
              {isActive === 'Workers' && <Workers />}
              {isActive === 'Scheduling' && <Scheduling />}
              {isActive === 'Settings' && <Settings />}
            </div>
          </div>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
