import { useContext } from 'react';
import { ScheduleContext } from './schedule-page-context';

import SelectInput from '@/components/Inputs/LabeledSelectInput';

export default function AddScheduleForm() {
  const { days, selectLabelClasses } = useContext(ScheduleContext);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 md:items-end">
        <SelectInput
          label="Day"
          type="text"
          id="manager"
          name="manager"
          options={days}
          required
          labelClasses={selectLabelClasses}
          className="flex flex-grow-1 border rounded-lg p-2 w-full md:w-[250px] h-[40px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div>
          <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="abreviation">
            Start Time
          </label>
          <input
            className="flex flex-grow-1 border rounded-lg p-2 w-full md:w-[250px] h-[40px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="time"
            id="manager"
            name="manager"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="abreviation">
            End Time
          </label>
          <input
            className="flex flex-grow-1 border rounded-lg p-2 w-full md:w-[250px] h-[40px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="time"
            id="manager"
            name="manager"
            required
          />
        </div>
      </div>
    </>
  );
}
