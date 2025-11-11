import { useContext, useState } from 'react';
import { EditScheduleContext } from './edit-schedule-context';

import ScheduledWorkersList from './ScheduledWorkersList';
import UnscheduledWorkerList from '@/pages/Scheduling/EditScheduleModal/UnscheduledWorkerList';
import Input from '@/components/Inputs/LabeledInput';
import calcShiftDuration from '@/utilities/calculateShiftDuration';
import RemoveShiftBtn from '@/pages/Scheduling/RemoveShiftBtn';
import ViewSchedWorkerBtn from '@/pages/Scheduling/EditScheduleModal/ViewSchedWorkerBtn';
import ViewWorkersBtn from './ViewWorkersBtn';

export default function ScheduleForm() {
  const [addWorkersId, setAddWorkersId] = useState(null);
  const [scheduledWorkersId, setScheduledWorkersId] = useState(null);

  const { formData, handleShiftInputChange } = useContext(EditScheduleContext);
  const shifts = formData?.shifts || [];

  const toggleAddWorkersClick = (shiftId) => {
    const isAlreadyOpen = addWorkersId === shiftId;
    setAddWorkersId(isAlreadyOpen ? null : shiftId);
    setScheduledWorkersId(null);
  };

  const toggleViewScheduledWorkers = (shiftId) => {
    const isAlreadyOpen = scheduledWorkersId === shiftId;
    setScheduledWorkersId(isAlreadyOpen ? null : shiftId);
    setAddWorkersId(null);
  };

  const handleRemoveShift = () => {};

  if (!formData || !shifts || formData.shifts?.length === 0) {
    return <p className="text-gray-500">No shifts to display.</p>;
  }

  return (
    <div className="mb-4">
      {formData?.shifts?.map((shift, index) => (
        <div
          key={shift.id || index}
          className="border border-gray-300 bg-white rounded-xl shadow p-4 mb-4"
        >
          <div className="mb-2">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:items-end">
              <Input
                label="Date"
                type="date"
                name="date"
                placeholder="Date"
                id={`${shift.date}-${index}`}
                value={shift.date}
                onChange={(e) => handleShiftInputChange(e, index)}
                required
              />
              <Input
                label="Start Time"
                type="time"
                name="start_time"
                placeholder="Start Time"
                id={`start_time-${index}`}
                value={shift.start_time}
                onChange={(e) => handleShiftInputChange(e, index)}
                required
              />
              <Input
                label="End Time"
                type="time"
                name="end_time"
                placeholder="End Time"
                id={`end_time-${index}`}
                value={shift.end_time}
                onChange={(e) => handleShiftInputChange(e, index)}
                required
              />
              <div>
                <label className="text-gray-500 text-sm">Shift Duration</label>
                <div className="border border-gray-200 text-gray-800 bg-gray-100 rounded-md px-4 py-2 flex justify-center items-center w-full">
                  {calcShiftDuration(shift.start_time, shift.end_time)}
                </div>
              </div>
              <Input
                label="Workers Needed"
                type="number"
                name="workers_needed"
                placeholder="Workers Needed"
                id={`workers-${index}`}
                value={shift.workers_needed}
                onChange={(e) => handleShiftInputChange(e, index)}
                required
                className="text-center"
              />
              <div>
                <label className="text-gray-500 text-sm">
                  Scheduled Workers:
                </label>
                <div
                  id={`workers-${index}`}
                  className="border border-gray-200 text-gray-800 bg-gray-100 rounded-md px-4 py-2 flex justify-center items-center w-full"
                >
                  <span className="text-gray-800">
                    {shift.workers ? shift.workers.length : 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:items-end mt-6">
            <ViewSchedWorkerBtn
              shiftId={shift.id}
              scheduledWorkersId={scheduledWorkersId}
              toggleViewScheduledWorkers={toggleViewScheduledWorkers}
            />
            <ViewWorkersBtn
              shiftId={shift.id}
              addWorkersId={addWorkersId}
              toggleAddWorkersClick={toggleAddWorkersClick}
            />
            <RemoveShiftBtn onClick={handleRemoveShift} />
          </div>
          {addWorkersId === shift.id && (
            <UnscheduledWorkerList
              shiftId={shift.id}
              index={index}
              addWorkersId={addWorkersId}
            />
          )}
          {scheduledWorkersId === shift.id && (
            <ScheduledWorkersList
              shiftId={shift.id}
              index={index}
              scheduledWorkersId={scheduledWorkersId}
            />
          )}
        </div>
      ))}
    </div>
  );
}
