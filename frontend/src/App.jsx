import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { apiFetch } from '@/utilities/apiClient';
import { useQuery } from '@tanstack/react-query';
import { AppContext } from './app-context';

import TopNavBar from './components/NavBars/TopNavBar';
import SideNavBar from './components/NavBars/SideNavBar';

import Login from './components/Authentication/LoginPage';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const {
    isPending: userDataIsPending,
    error: userDataError,
    data: userData,
    isFetching: userDataIsFetching,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => apiFetch(`/user`),
    keepPreviousData: true,
  });

  const ctxValue = {
    userData: userData,
    userDataIsPending: userDataIsPending,
    userDataIsFetching: userDataIsFetching,
    userDataError: userDataError,
  };

  if (isLoggedIn === false) {
    return <Login />;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <AppContext.Provider value={ctxValue}>
          <div className="flex w-full min-h-screen bg-gray-100/75">
            <SideNavBar
              showModal={showModal}
              setShowModal={setShowModal}
              onLogoutClick={() => {
                setShowModal(true);
              }}
            />
            <div className="flex flex-col flex-1 h-screen overflow-y-auto">
              <TopNavBar />
              <main className="m-4 flex-1">
                <Outlet />
              </main>
            </div>
          </div>
        </AppContext.Provider>
      </QueryClientProvider>
    );
  }
}

export default App;
