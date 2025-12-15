import { useState, useEffect, useContext } from 'react';

import { AgencyPageContext } from './agency-page-context';

import AgencyCard from '@/pages/Settings/Agencies/AgencyCard';
import LoadingSpinner from '@/components/Loader';

export default function AgenciesList() {
  const { agencies, isPending, isFetching, error } =
    useContext(AgencyPageContext);

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
      ) : agencies.length > 0 ? (
        <ul>
          {agencies.map((agency) => (
            <AgencyCard key={agency.id} agency={agency} />
          ))}
        </ul>
      ) : (
        <div className="mt-8 w-full">
          <div className="mt-4 w-fit mx-auto overflow-x-auto border border-gray-200 bg-gray-100/50 rounded-lg p-4">
            <p className="text-gray-500">
              No active agencies found. Please add new agency above.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
