import { useContext, useRef, useEffect, useState } from 'react';
import { EditScheduleContext } from './edit-schedule-context';
import WorkerList from '@/pages/Schedule/EditScheduleModal/WorkerList';

import Input from '@/components/Inputs/LabeledInput';

export default function ScheduleForm() {
  const [addWorkersId, setAddWorkersId] = useState(false);

  const { formData, handleShiftInputChange } = useContext(EditScheduleContext);
  const shifts = formData?.shifts || [];

  const handleAddWorkerClick = (shiftId) => {
    const isAlreadyOpen = addWorkersId === shiftId;

    // 2. If it's already open, set 'addWorkersId' to null to close it (toggle off).
    // 3. If it's closed, set 'addWorkersId' to the current 'shiftId' to open it (toggle on).
    setAddWorkersId(isAlreadyOpen ? null : shiftId);
  };

  const calcShiftDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return 'N/A';

    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);

    const duration = end.getTime() - start.getTime();
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  if (!formData || !shifts || formData.shifts.length === 0) {
    return <p className="text-gray-500">No shifts to display.</p>;
  }

  const inputClasses = 'border border-gray-300 text-gray-800';
  const labelClasses = 'text-gray-800';

  return (
    <div className="mb-8">
      <h1 className="text-xl font-semibold text-gray-800 mt-12 mb-4">Shifts</h1>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 md:items-end text-gray-600 mb-2">
        <span>Date</span>
        <span>Start Time</span>
        <span>End Time</span>
        <span>Shift Duration</span>
        <span>Workers Needed</span>
        <span>Workers Scheduled</span>
      </div>
      {formData?.shifts?.map((shift, index) => (
        <>
          <div key={shift.id || index} className="mb-2">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 md:items-end">
              <Input
                type="date"
                name="date"
                id={`${shift.date}-${index}`}
                value={shift.date}
                onChange={(e) => handleShiftInputChange(e, index)}
                className={inputClasses}
                labelClasses={labelClasses}
                required
              />
              <Input
                type="time"
                name="start_time"
                id={`start_time-${index}`}
                value={shift.start_time}
                onChange={(e) => handleShiftInputChange(e, index)}
                className={inputClasses}
                labelClasses={labelClasses}
                required
              />
              <Input
                type="time"
                name="end_time"
                id={`end_time-${index}`}
                value={shift.end_time}
                onChange={(e) => handleShiftInputChange(e, index)}
                className={inputClasses}
                labelClasses={labelClasses}
                required
              />
              <div className="border border-gray-300 rounded-md shadow text-gray-800 px-4 py-2 flex justify-center items-center w-full">
                {calcShiftDuration(shift.start_time, shift.end_time)}
              </div>
              <Input
                type="number"
                name="workers_needed"
                id={`workers-${index}`}
                value={shift.workers_needed}
                onChange={(e) => handleShiftInputChange(e, index)}
                className={inputClasses + ' text-center'}
                labelClasses={labelClasses}
                required
              />
              <Input
                type="number"
                name="workers_scheduled"
                id={`workers-${index}`}
                value={shift.workers_scheduled || '0'}
                onChange={(e) => handleShiftInputChange(e, index)}
                className={inputClasses + ' text-center'}
                labelClasses={labelClasses}
                required
              />
              <button
                type="button"
                className="flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-200 mb-2 cursor-pointer"
                onClick={() => {
                  if (shift.id) handleAddWorkerClick(shift.id);
                  else console.warn('Shift ID is missing, cannot add workers.');
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 me-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                  />
                </svg>
                <span>Add Workers</span>
              </button>
            </div>
          </div>
          {addWorkersId === shift.id &&  <WorkerList />}
        </>
      ))}
    </div>
  );
}
