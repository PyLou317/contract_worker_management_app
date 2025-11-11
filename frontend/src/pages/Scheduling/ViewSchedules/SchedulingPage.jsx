import { Outlet, useParams } from 'react-router';

import ScheduleListComponent from '@/pages/Scheduling/ViewSchedules/ScheduleListComponent';

export default function SchedulingPage() {
    const { scheduleId } = useParams();

  return (
    <div className="container mx-auto p-8 bg-white shadow-md rounded-2xl">
      {scheduleId ? <Outlet /> : <ScheduleListComponent />}
    </div>
  );
}
