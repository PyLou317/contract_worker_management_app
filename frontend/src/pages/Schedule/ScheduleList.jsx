import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { ScheduleContext } from './schedule-page-context';
import formatDate from '@/utilities/formatDate';

export default function ScheduleList() {
  const { schedules, scheduleIsPending, scheduleError, scheduleIsFetching } = useContext(ScheduleContext);

  if (scheduleIsPending || scheduleIsFetching) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <div className="flex justify-center items-center h-auto w-fit mx-auto text-gray-700 p-4 rounded-lg">
          Loading schedules...
        </div>
      </div>
    );
  }

  if (scheduleError) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <div className="flex justify-center items-center h-auto w-fit mx-auto bg-red-100 text-red-700 p-4 rounded-lg">
          An error has occurred: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 mt-4 bg-white shadow-md rounded-2xl">
      <div className="my-3">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Created Schedules</h1>
      </div>
      <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left border-r border-gray-300">Area</th>
            <th className="py-3 px-6 text-left border-r border-gray-300">Manager</th>
            <th className="py-3 px-6 text-left border-r border-gray-300">Start Date</th>
            <th className="py-3 px-6 text-left border-r border-gray-300">End Date</th>
            <th className="py-3 px-6 text-left border-r border-gray-300">Total Hours</th>
            <th className="py-3 px-6 text-left border-r border-gray-300">Active</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {schedules.length > 0 ? (
            schedules.map((schedule) => (
              <tr
                key={schedule.id}
                className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap border-r border-gray-200">
                  {schedule.area ? schedule.area.name : 'N/A'}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap border-r border-gray-200">
                  {schedule.manager ? schedule.manager.name : 'N/A'}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap border-r border-gray-200">
                  {formatDate(schedule.start_date)}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap border-r border-gray-200">
                  {formatDate(schedule.end_date)}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap border-r border-gray-200">
                    Total Hours
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap border-r border-gray-200">
                  <span className="text-green-500 font-semibold bg-green-200 px-3 py-1 rounded-full">
                    {schedule.is_active ? 'Yes' : 'No'}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200">
              <td colSpan="5" className="py-3 px-6 text-left whitespace-nowrap border-r border-gray-200">
                <div className="flex justify-center items-center h-fit py-4">
                  <div className="flex justify-center items-center h-auto w-fit mx-auto bg-yellow-100 text-yellow-700 p-4 rounded-lg">
                    No schedules found, please add some.
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
