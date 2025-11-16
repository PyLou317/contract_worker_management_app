import { Outlet, useParams } from 'react-router';
import PageContainer from '@/components/PageContainer';

import ScheduleListComponent from '@/pages/Scheduling/ViewSchedules/ScheduleListComponent';

export default function SchedulingPage() {
  const { scheduleId } = useParams();

  return (
    <PageContainer>
      {scheduleId ? <Outlet /> : <ScheduleListComponent />}
    </PageContainer>
  );
}
