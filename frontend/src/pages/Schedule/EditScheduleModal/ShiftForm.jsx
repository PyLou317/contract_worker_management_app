import { useContext, useRef, useEffect, useState } from 'react';
import { EditScheduleContext } from './edit-schedule-context';

import ScheduledWorkersList from './ScheduledWorkersList';
import WorkerList from '@/pages/Schedule/EditScheduleModal/WorkerList';
import Input from '@/components/Inputs/LabeledInput';
import calcShiftDuration from '@/utilities/calculateShiftDuration';
import RemoveShiftBtn from '../RemoveShiftBtn';

export default function ScheduleForm() {
  const [addWorkersId, setAddWorkersId] = useState(false);

  const { formData, handleShiftInputChange } = useContext(EditScheduleContext);
  const shifts = formData?.shifts || [];

  const handleAddWorkerClick = (shiftId) => {
    const isAlreadyOpen = addWorkersId === shiftId;
    setAddWorkersId(isAlreadyOpen ? null : shiftId);
  };
    
    const handleRemoveShift = () => { }

  if (!formData || !shifts || formData.shifts.length === 0) {
    return <p className="text-gray-500">No shifts to display.</p>;
  }

  const inputClasses = 'border border-gray-300 text-gray-800';
  const labelClasses = 'text-gray-800 text-sm';
  const workersScheduledClasses = 'text-gray-800';
  const shiftInputLabelClasses = 'text-gray-800 text-sm';

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
                id={`${shift.date}-${index}`}
                value={shift.date}
                onChange={(e) => handleShiftInputChange(e, index)}
                className={inputClasses}
                labelClasses={labelClasses}
                required
              />
              <Input
                label="Start Time"
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
                label="End Time"
                type="time"
                name="end_time"
                id={`end_time-${index}`}
                value={shift.end_time}
                onChange={(e) => handleShiftInputChange(e, index)}
                className={inputClasses}
                labelClasses={labelClasses}
                required
              />
              <div>
                <label className="text-gray-800 text-sm">Shift Duration:</label>
                <div className="border border-gray-300 rounded-md shadow text-gray-800 px-4 py-2 mt-1 flex justify-center items-center w-full">
                  {calcShiftDuration(shift.start_time, shift.end_time)}
                </div>
              </div>
              <Input
                label="Workers Needed"
                type="number"
                name="workers_needed"
                id={`workers-${index}`}
                value={shift.workers_needed}
                onChange={(e) => handleShiftInputChange(e, index)}
                className={inputClasses + ' text-center'}
                labelClasses={labelClasses}
                required
              />
              <div>
                <label className="text-gray-800 text-sm">
                  Scheduled Workers:
                </label>
                <div
                  id={`workers-${index}`}
                  className={
                    inputClasses +
                    ' text-center py-2 mt-1 rounded-md shadow bg-gray-200'
                  }
                >
                  <span className={`${workersScheduledClasses}`}>
                    {shift.workers ? shift.workers.length : 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <ScheduledWorkersList shiftId={shift.id} index={index} />
          <div className="flex justify-between items-center">
            <WorkerList
              shiftId={shift.id}
              index={index}
              handleAddWorkerClick={handleAddWorkerClick}
              addWorkersId={addWorkersId}
            />
            <div className="ms-auto">
              <RemoveShiftBtn onClick={handleRemoveShift} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
