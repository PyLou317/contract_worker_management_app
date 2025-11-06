import { useContext } from 'react';
import { ScheduleContext } from '../schedule-page-context';

import ScheduleList from './ScheduleList';
import SectionHeader from '../../WorkerListPage/EditWorkerModal/SectionHeader';

export default function ViewCreatedSchedules({}) {
  const { schedules, scheduleIsPending, scheduleError, scheduleIsFetching } =
    useContext(ScheduleContext);

  const todaysDate = new Date();
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  const formattedDate = todaysDate.toLocaleDateString('sv-SE', options);

  function getWeekRange(date) {
    const parts = date.split('-');
    const d = new Date(
      Date.UTC(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]))
    );

    const day = d.getUTCDay();
    const diffToSunday = day * 24 * 60 * 60 * 1000;

    const startOfWeekUTC = new Date(d.getTime() - diffToSunday);
    startOfWeekUTC.setUTCHours(0, 0, 0, 0);
    const endOfWeekUTC = new Date(
      startOfWeekUTC.getTime() + 6 * 24 * 60 * 60 * 1000
    );
    endOfWeekUTC.setUTCHours(23, 59, 59, 999);

    return {
      start: startOfWeekUTC,
      end: endOfWeekUTC,
    };
  }

  function formatAsISODate(date) {
    return date.toISOString().split('T')[0];
  }

  const dateRange = getWeekRange(formattedDate);

  const currentSchedules = schedules.filter((schedule) => {
    return (
      (schedule.start_date >= formatAsISODate(dateRange.start) &&
        schedule.start_date <= formatAsISODate(dateRange.end)) ||
      (schedule.end_date >= formatAsISODate(dateRange.start) &&
        schedule.end_date <= formatAsISODate(dateRange.end))
    );
  });

  const upcomingSchedules = schedules.filter((schedule) => {
    return schedule.start_date > formatAsISODate(dateRange.end);
  });

  const archivedSchedules = schedules.filter((schedule) => {
    return (
      schedule.start_date < formatAsISODate(dateRange.start) &&
      schedule.end_date < formatAsISODate(dateRange.start)
    );
  });

  return (
    <>
      <SectionHeader title="Created Schedules" />
      <div className="border-b border-gray-300 mb-6"></div>
      <ScheduleList
        title="Current Week Schedules"
        schedules={currentSchedules}
        scheduleIsPending={scheduleIsPending}
        scheduleError={scheduleError}
        scheduleIsFetching={scheduleIsFetching}
      />
      <ScheduleList
        title="Upcoming Schedules"
        schedules={upcomingSchedules}
        scheduleIsPending={scheduleIsPending}
        scheduleIsFetching={scheduleIsFetching}
        scheduleError={scheduleError}
      />
      <ScheduleList
        title="Archived Schedules"
        schedules={archivedSchedules}
        scheduleIsPending={scheduleIsPending}
        scheduleIsFetching={scheduleIsFetching}
        scheduleError={scheduleError}
      />
    </>
  );
}
