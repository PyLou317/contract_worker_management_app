import { useContext, useEffect, useState } from 'react';

import { DepartmentPageContext } from './department-page-context';

import AreaCard from '@/pages/Settings/Departments/DepartmentCard';
import LoadingSpinner from '@/components/Loader';

export default function AreasList() {
  const { areas, isPending, isFetching, error } = useContext(DepartmentPageContext);

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
      ) : areas.length > 0 ? (
        <ul>
          {areas.map((area) => (
            <AreaCard key={area.id} area={area} />
          ))}
        </ul>
      ) : (
        <div className="mt-8 w-full">
          <div className="mt-4 w-fit mx-auto overflow-x-auto border border-gray-200 bg-gray-100/50 rounded-lg p-4">
            <p className="text-gray-500">
              No active areas found. Please add new manager above.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
