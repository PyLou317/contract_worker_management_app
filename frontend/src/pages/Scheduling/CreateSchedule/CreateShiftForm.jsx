import { useContext } from 'react';
import { ScheduleContext } from '@/pages/Scheduling/schedule-page-context';
import { EditScheduleContext } from '@/pages/Scheduling/EditScheduleModal/edit-schedule-context';

import Input from '@/components/Inputs/LabeledInput';
import SelectInput from '@/components/Inputs/FloatingSelectInput';
import RemoveShiftBtn from '@/pages/Scheduling/RemoveShiftBtn';
import getDaysArray from '@/utilities/getDateArray';

export default function AddShiftForm({
  dateRange,
  removeShift,
  index,
  shift,
  handleInputChange,
}) {
  const days = getDaysArray(dateRange);

  return (
    <div
      key={shift ? shift.id : shift.id}
      className="mt-4 p-4 shadow-sm bg-gray-50 rounded-xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 gap-4 md:items-end pt-4">
        <SelectInput
          label="Date"
          type="text"
          id="date"
          name="date"
          options={days}
          value={shift ? shift.date : shift[index].date ?? ''}
          onChange={(e) => handleInputChange(e, index)}
        />
        <Input
          label="Start Time"
          type="time"
          id="start_time"
          name="start_time"
          placeholder="Start Time"
          value={shift ? shift.start_time : shift[index].start_time ?? ''}
          onChange={(e) => handleInputChange(e, index)}
        />
        <Input
          label="End Time"
          type="time"
          id="end_time"
          name="end_time"
          placeholder="End Time"
          value={shift ? shift.end_time : shift[index].end_time ?? ''}
          onChange={(e) => handleInputChange(e, index)}
        />
        <Input
          label="Workers Needed"
          type="number"
          id="workers_needed"
          name="workers_needed"
          placeholder="Workers Needed"
          value={
            shift ? shift.workers_needed : shift[index].workers_needed ?? ''
          }
          onChange={(e) => handleInputChange(e, index)}
        />
        <RemoveShiftBtn onClick={removeShift} />
      </div>
    </div>
  );
}
