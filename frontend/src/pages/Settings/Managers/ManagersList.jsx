import { useContext, useEffect, useState } from 'react';

import { ManagerPageContext } from './manager-page-context';

import ManagerCard from '@/pages/Settings/Managers/ManagerCard';
import LoadingSpinner from '@/components/Loader';

export default function ManagersList() {
  const { managers, isPending, isFetching, error } =
    useContext(ManagerPageContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !isFetching) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(true);
    }
  }, [isPending, isFetching]);

  //   if (isPending || isFetching) {
  //     return (
  //       <div className="mt-8 text-center text-gray-500">
  //         Loading managers...
  //         <span>
  //           <div className="flex justify-center items-center h-[400px]">
  //             <LoadingSpinner size="10" />
  //           </div>
  //         </span>
  //       </div>
  //     );
  //   }

  if (error) {
    return (
      <div className="mt-8 text-center text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="mt-4 mb-8 lg:w-full">
      {isLoading ? (
        <div className="flex w-full justify-center">
          <LoadingSpinner size="10" />
        </div>
      ) : managers.length > 0 ? (
        <ul>
          {managers.map((manager) => (
            <ManagerCard key={manager.id} manager={manager} />
          ))}
        </ul>
      ) : (
        <div className="mt-8 w-full">
          <div className="mt-4 w-fit mx-auto overflow-x-auto border border-gray-200 bg-gray-100/50 rounded-lg p-4">
            <p className="text-gray-500">
              No active managers found. Please add new manager above.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
