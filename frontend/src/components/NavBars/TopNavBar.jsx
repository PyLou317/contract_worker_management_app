import { useEffect, useState, useContext } from 'react';
import { AppContext } from '@/app-context';

import capitalizeFirstLetter from '@/utilities/capitalizeFirstLetter';
import LoadingSpinner from '@/components/Loader';
import SearchBar from '@/components/Search';

export default function TopNavBar() {
  const [userName, setUserName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { userData, userDataIsPending, userDataIsFetching, userDataError } =
    useContext(AppContext);

  useEffect(() => {
    let tempUserName = '';
    if (userData) {
      if (userData.first_name) {
        tempUserName = capitalizeFirstLetter(userData.first_name);
      } else if (userData.userName) {
        tempUserName = capitalizeFirstLetter(userData.username);
      }
      setUserName(tempUserName);
    }
  }, [userData]);

  useEffect(() => {
    if (!userDataIsPending && !userDataIsFetching) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(true);
    }
  }, [userDataIsPending, userDataIsFetching]);

  let content = '';
  if (isLoading) {
    content = <LoadingSpinner size="10" />;
  } else if (userName.length > 0) {
    content = `Welcome, ${userName}!`;
  } else {
    content = `Welcome, Guest!`;
  }

  return (
    <nav className="p-6 border-b-2 border-gray-200 w-full bg-white flex justify-between items-center space-x-4">
      <h1 className="text-2xl font-semibold">{content}</h1>
      <div className="flex items-center gap-3">
        <SearchBar />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-8 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
          />
        </svg>
      </div>
    </nav>
  );
}
