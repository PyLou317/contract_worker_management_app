import { useContext } from 'react';
import { ScheduleContext } from '../schedule-page-context';
import { EditScheduleContext } from '@/pages/Scheduling/EditScheduleModal/edit-schedule-context';

import Input from '@/components/Inputs/LabeledInput';
import SelectInput from '@/components/Inputs/FloatingSelectInput';
import RemoveShiftBtn from '../RemoveShiftBtn';
import getDaysArray from '@/utilities/getDateArray';

export default function AddShiftForm({ dateRange, removeShift, index, shift }) {
  const { handlePendingShiftInputChange, pendingNewShifts } =
    useContext(EditScheduleContext);
  const days = getDaysArray(dateRange);
  const shiftData = shift ? shift : pendingNewShifts;

  return (
    <div
      key={shift ? shift.id : shiftData.id}
      className="mt-4 border border-gray-300 p-4 rounded-xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 gap-4 md:items-end mt-4">
        <SelectInput
          label="Date"
          type="text"
          id="date"
          name="date"
          options={days}
          value={shift ? shift.date : shiftData[index].date ?? ''}
          onChange={(e) => handlePendingShiftInputChange(e, index)}
        />
        <Input
          label="Start Time"
          type="time"
          id="start_time"
          name="start_time"
          placeholder="Start Time"
          value={shift ? shift.start_time : shiftData[index].start_time ?? ''}
          onChange={(e) => handlePendingShiftInputChange(e, index)}
        />
        <Input
          label="End Time"
          type="time"
          id="end_time"
          name="end_time"
          placeholder="End Time"
          value={shift ? shift.end_time : shiftData[index].end_time ?? ''}
          onChange={(e) => handlePendingShiftInputChange(e, index)}
        />
        <Input
          label="Workers Needed"
          type="number"
          id="workers_needed"
          name="workers_needed"
          placeholder="Workers Needed"
          value={
            shift ? shift.workers_needed : shiftData[index].workers_needed ?? ''
          }
          onChange={(e) => handlePendingShiftInputChange(e, index)}
        />
        <RemoveShiftBtn onClick={removeShift} />
      </div>
    </div>
  );
}
