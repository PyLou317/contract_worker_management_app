import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import StatCard from './StatCard';
import WorkerSkillsList from './WorkersSkillsList';
import DashboardCard from './DashboardCard';

import totalWorkerIcon from './Icons/TotalWorkersIcon';
import scheduledWorkerIcon from './Icons/ScheduledWorkersIcon';
import clockedInWorkerIcon from './Icons/ClockInIcon';
import clockedOutWorkerIcon from './Icons/ClockOutIcon';

import { apiFetch } from '@/utilities/apiClient';

export default function Dashboard() {
  const {
    isPending: workerIsPending,
    error: workerError,
    data: workerData,
    isFetching: workerIsFetching,
  } = useQuery({
    queryKey: ['workers'],
    queryFn: () => apiFetch('/workers'),
    keepPreviousData: true,
  });

  const {
    isPending: scheduleIsPending,
    error: scheduleError,
    data: scheuleData,
    isFetching: scheduleIsFetching,
  } = useQuery({
    queryKey: ['schedules'],
    queryFn: () => apiFetch('/schedules'),
    keepPreviousData: true,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect runs when isPending or isFetching changes
    if (!workerIsPending && !workerIsFetching) {
      // Data fetching is complete. Now, start the timer for the minimum spinner duration.
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500); // Minimum display time of 500ms

      return () => clearTimeout(timer);
    } else {
      // Data is pending or fetching, so set isLoading to true
      setIsLoading(true);
    }
  }, [workerIsPending, workerIsFetching]);

  const workerCount = workerData?.count || 0;
  const scheduleCount = scheuleData?.count || 0;
  const workerListData = workerData?.results || [];

  function calculateTotalScheduledWorkers(schedules) {
    let totalWorkers = 0;
    schedules?.forEach((schedule) => {
      schedule?.shifts?.forEach((shift) => {
        totalWorkers += shift.workers.length;
      });
    });
    return totalWorkers;
  }

  return (
    <div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
        <StatCard
          icon={totalWorkerIcon}
          value={workerCount}
          title="Total Workers"
          loading={isLoading}
        />
        <StatCard
          icon={scheduledWorkerIcon}
          value={scheduleCount}
          title="Schedules Created"
          loading={isLoading}
        />
        <StatCard
          icon={clockedOutWorkerIcon}
          value={calculateTotalScheduledWorkers(scheuleData?.results)}
          title="Scheduled Workers"
          loading={isLoading}
        />
        <StatCard
          icon={clockedInWorkerIcon}
          value="0"
          title="Clocked In Workers"
          loading={isLoading}
        />
      </div>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
        <DashboardCard heading="Skills" subHeading="Worker Skills List">
          <WorkerSkillsList
            workers={workerListData}
            isFetching={workerIsFetching}
            isPending={workerIsPending}
          />
        </DashboardCard>
        <DashboardCard
          heading="Clocked In Workers"
          subHeading="Current Active Workers On Shift"
        >
          <WorkerSkillsList
            workers={workerListData}
            isFetching={workerIsFetching}
            isPending={workerIsPending}
          />
        </DashboardCard>
      </div>
    </div>
  );
}
