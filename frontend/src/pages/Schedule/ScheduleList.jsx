import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { ScheduleContext } from './schedule-page-context';

import '@/utilities/toolTipStyles.css';

import formatDate from '@/utilities/formatDate';
import getTotalWorkers from '@/utilities/getTotalWorkers';
import getTotalHours from '@/utilities/getTotalHours';
import EditScheduleModal from './EditScheduleModal/EditScheduleModal';

export default function ScheduleList() {
  const { schedules, scheduleIsPending, scheduleError, scheduleIsFetching } =
    useContext(ScheduleContext);
  const [editingSchedule, setEditingSchedule] = useState(false);
  const [editingScheduleId, setEditingScheduleId] = useState(null);
  const [deletingScheduleId, setDeletingScheduleId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [hoveredScheduleId, setHoveredScheduleId] = useState({
    scheduleId: null,
    buttonId: null,
  });

  const onMouseLeaveActionToolTip = () => {
    setHoveredScheduleId({
      scheduleId: null,
      buttonId: null,
    });
  };

  const toolTipLabel = (buttonId) => {
    if (buttonId === 'add-workers') {
      return 'Add Workers';
    } else if (buttonId === 'edit-schedule') {
      return `Edit Schedule & Add Workers`;
    } else if (buttonId === 'delete-schedule') {
      return 'Delete Schedule';
    } else {
      return null;
    }
  };

  const handleOpenEditSchedule = (scheduleId) => {
    setEditingSchedule(true);
    setEditingScheduleId(scheduleId);
  };

  function totalScheduledWorkersPerShift(schedule) {
    if (!schedule || !schedule.shifts) {
      return 0;
    }

    const shiftsArray = schedule.shifts;

    let totalWorkers = 0;
    shiftsArray.forEach((shift) => {
      totalWorkers += shift.workers.length;
    });
    return totalWorkers;
  }

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
    <>
      <div className="container mx-auto p-8 mt-4 bg-white shadow-md rounded-2xl overflow-x-auto">
        <div className="my-3">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Created Schedules
          </h1>
        </div>
        <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700 uppercase text-xs text-center leading-normal">
            <tr>
              <th className="py-3 px-6 border-r border-gray-300">Area</th>
              {/* <th className="py-3 px-6 border-r border-gray-300">Manager</th> */}
              <th className="py-3 px-6 border-r border-gray-300">Start Date</th>
              <th className="py-3 px-6 border-r border-gray-300">End Date</th>
              <th className="py-3 px-6 border-r border-gray-300">Shifts</th>
              <th className="py-3 px-6 border-r border-gray-300">
                Workers Needed
              </th>
              <th className="py-3 px-6 border-r border-gray-300">
                Workers Scheduled
              </th>
              <th className="py-3 px-6 border-r border-gray-300">
                Hours Needed
              </th>
              <th className="py-3 px-6 border-r border-gray-300">
                Hours Scheduled
              </th>
              <th className="py-3 px-6 border-r border-gray-300">Active</th>
              <th className="py-3 px-6 border-r border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-xs font-light">
            {schedules.length > 0 ? (
              schedules.map((schedule, index) => (
                <tr
                  key={schedule.id}
                  className="border-b border-gray-200 text-center hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => handleOpenEditSchedule(schedule.id)}
                >
                  <td className="py-3 px-6 whitespace-nowrap border-r border-gray-200">
                    {schedule.area_detail?.name
                      ? schedule.area_detail?.name
                      : 'N/A'}
                  </td>
                  <td className="py-3 px-6 whitespace-nowrap border-r border-gray-200">
                    {formatDate(schedule.start_date)}
                  </td>
                  <td className="py-3 px-6 whitespace-nowrap border-r border-gray-200">
                    {formatDate(schedule.end_date)}
                  </td>
                  <td className="py-3 px-6 whitespace-nowrap border-r border-gray-200">
                    {schedule.shifts ? schedule.shifts.length : 'N/A'}
                  </td>
                  <td className="py-3 px-6 whitespace-nowrap border-r border-gray-200">
                    {getTotalWorkers(schedule)}
                  </td>
                  <td className="py-3 px-6 whitespace-nowrap border-r border-gray-200">
                    {totalScheduledWorkersPerShift(schedule)}
                  </td>
                  <td className="py-3 px-6 whitespace-nowrap border-r border-gray-200">
                    {Math.round(
                      getTotalHours(schedule) * getTotalWorkers(schedule)
                    )}{' '}
                    hrs
                  </td>
                  <td className="py-3 px-6 whitespace-nowrap border-r border-gray-200">
                    {Math.round(
                      getTotalHours(schedule) *
                        totalScheduledWorkersPerShift(schedule)
                    )}{' '}
                    hrs
                  </td>
                  <td className="py-3 px-6 whitespace-nowrap border-r border-gray-200">
                    <span className={`${schedule.is_active ? 'bg-green-200' : 'bg-red-200'} font-semibold px-3 py-1 rounded-full`}>
                      {schedule.is_active ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="relative text-center whitespace-nowrap border-r border-gray-200">
                    {hoveredScheduleId.scheduleId === schedule.id && (
                      <div className="absolute bottom-1/2 -translate-x-1/2 mb-2 bg-white border border-gray-300 p-2 rounded shadow-lg text-sm z-10 whitespace-nowrap">
                        {toolTipLabel(hoveredScheduleId.buttonId)}
                      </div>
                    )}
                    <button
                      className="text-blue-500 hover:text-blue-700 transition-colors duration-200 cursor-pointer me-2"
                      onMouseEnter={() =>
                        setHoveredScheduleId({
                          scheduleId: schedule.id,
                          buttonId: 'edit-schedule',
                        })
                      }
                      onMouseLeave={onMouseLeaveActionToolTip}
                      onClick={() => handleOpenEditSchedule(schedule.id)}
                    >
                      <svg
                        id="edit-schedule"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 transition-colors duration-200 cursor-pointer"
                      onMouseEnter={() =>
                        setHoveredScheduleId({
                          scheduleId: schedule.id,
                          buttonId: 'delete-schedule',
                        })
                      }
                      onMouseLeave={onMouseLeaveActionToolTip}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                <td
                  colSpan="5"
                  className="py-3 px-6 text-center whitespace-nowrap border-r border-gray-200"
                >
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
      <EditScheduleModal
        showEditScheduleModal={editingSchedule}
        onClose={() => setEditingSchedule(false)}
        Id={editingScheduleId}
        editingSchedule={editingSchedule}
      />
    </>
  );
}
