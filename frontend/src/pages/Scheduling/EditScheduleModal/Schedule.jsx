import { useParams } from 'react-router';
import EditSchedule from './EditSchedule';

export default function Schedule() {
  const { scheduleId } = useParams();

  return (
    <div id="schedule-detail-page">
      <EditSchedule scheduleId={scheduleId} />
    </div>
  );
}