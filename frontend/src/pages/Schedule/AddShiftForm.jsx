import { useContext } from 'react';
import { ScheduleContext } from './schedule-page-context';

import Input from '@/components/Inputs/LabeledInput';
import SelectInput from '@/components/Inputs/LabeledSelectInput';
import RemoveShiftBtn from './RemoveShiftBtn';

export default function AddShiftForm({ shift, handleInputChange, removeShift }) {
  const { days, selectLabelClasses, InputLableClasses } = useContext(ScheduleContext);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:items-end mt-4">
        <SelectInput
          label="Day"
          type="text"
          id="day"
          name="day"
          options={days}
          value={shift.day}
          onChange={handleInputChange}
          required
          labelClasses={selectLabelClasses}
          className="flex flex-grow-1 border rounded-lg p-2 w-full h-[40px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div>
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
        </div>
        <div>
          <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="abreviation">
            End Time
          </label>
          <input
            className="flex flex-grow-1 border rounded-lg p-2 w-full h-[40px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="time"
            id="end_time"
            name="end_time"
            value={shift.endTime}
            onChange={(e) => handleInputChange(e, shift.id)}
            step="1800"
            required
          />
        </div>
        <RemoveShiftBtn onClick={removeShift} />
      </div>
    </>
  );
}
