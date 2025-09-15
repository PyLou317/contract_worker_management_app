import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import StatCard from './StatCard';
import totalWorkerIcon from './Icons/TotalWorkersIcon';
import scheduledWorkerIcon from './Icons/ScheduledWorkersIcon';
import clockedInWorkerIcon from './Icons/ClockInIcon';
import clockedOutWorkerIcon from './Icons/ClockOutIcon';

import { getWorkers } from '../../api/getWorkersApi';

export default function Dashboard() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['workers'],
    queryFn: getWorkers,
    keepPreviousData: true,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect runs when isPending or isFetching changes
    if (!isPending && !isFetching) {
      // Data fetching is complete. Now, start the timer for the minimum spinner duration.
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500); // Minimum display time of 500ms

      return () => clearTimeout(timer);
    } else {
      // Data is pending or fetching, so set isLoading to true
      setIsLoading(true);
    }
  }, [isPending, isFetching]);

  const workerCount = data?.count || 0;

  return (
    <div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
        <StatCard icon={totalWorkerIcon} value={workerCount} title="Total Workers" loading={isLoading} />
        <StatCard icon={scheduledWorkerIcon} value="200" title="Total Scheduled Workers" loading={isLoading} />
        <StatCard icon={clockedInWorkerIcon} value="200" title="Clocked In Workers" loading={isLoading}/>
        <StatCard icon={clockedOutWorkerIcon} value="200" title="Clocked Out Workers" loading={isLoading}/>
      </div>
    </div>
  );
}
