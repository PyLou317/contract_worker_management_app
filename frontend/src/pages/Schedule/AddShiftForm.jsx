import { useContext } from 'react';
import { ScheduleContext } from './schedule-page-context';

import Input from '@/components/Inputs/LabeledInput';
import SelectInput from '@/components/Inputs/LabeledSelectInput';
import RemoveShiftBtn from './RemoveShiftBtn';
import getDaysArray from '../../utilities/getDateArray';

export default function AddShiftForm({
  dateRange,
  shift,
  handleInputChange,
  removeShift,
}) {
  const { selectLabelClasses, InputLableClasses } = useContext(ScheduleContext);
  const days = getDaysArray(dateRange);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:items-end mt-4">
        <SelectInput
          label="Date"
          type="text"
          id="date"
          name="date"
          options={days}
          value={shift.date}
          onChange={handleInputChange}
          required
          labelClasses={selectLabelClasses}
          className="flex flex-grow-1 border rounded-lg p-2 w-full h-[40px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Input
          label="Start Time"
          labelClasses={InputLableClasses}
          className="flex flex-grow-1 border rounded-lg p-2 w-full h-[40px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="time"
          id="start_time"
          name="start_time"
          value={shift.startTime}
          onChange={(e) => handleInputChange(e, shift.id)}
          step="1800"
          required
        />
        <Input
          label="End Time"
          labelClasses={InputLableClasses}
          className="flex flex-grow-1 border rounded-lg p-2 w-full h-[40px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="time"
          id="end_time"
          name="end_time"
          value={shift.endTime}
          onChange={(e) => handleInputChange(e, shift.id)}
          step="1800"
          required
        />
        <Input
          label="Workers Needed"
          labelClasses={InputLableClasses}
          className="flex flex-grow-1 border rounded-lg p-2 w-full h-[40px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          id="workers_needed"
          name="workers_needed"
          defaultValue="1"
          value={shift.workersNeeded}
          onChange={(e) => handleInputChange(e, shift.id)}
          required
        />
        <RemoveShiftBtn onClick={removeShift} />
      </div>
    </>
  );
}
