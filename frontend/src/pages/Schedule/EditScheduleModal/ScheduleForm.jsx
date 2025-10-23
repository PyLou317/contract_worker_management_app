import { useContext, useEffect } from 'react';
import { EditScheduleContext } from './edit-schedule-context';
import { ScheduleContext } from '../schedule-page-context';

import Input from '@/components/Inputs/LabeledInput';
import SelectInput from '@/components/Inputs/LabeledSelectInput';

export default function ScheduleForm() {
    const { managers, areas } = useContext(ScheduleContext);

  const { formData, handleScheduleInputChange } =
      useContext(EditScheduleContext);


  const inputClasses =
    'flex flex-grow-1 border border-gray-300 rounded-lg p-2 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500';
  const labelClasses = 'text-gray-800';

  return (
    <>
      <h1 className="text-xl font-semibold text-gray-800 mb-2">Schedule</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:items-end border border-gray-300 rounded-xl shadow p-4 mb-4">
        <SelectInput
          label="Manager"
          name="manager"
          id="manager"
          value={formData.manager}
          onChange={handleScheduleInputChange}
          options={managers || []}
          className={inputClasses}
          labelClasses={labelClasses}
          required
        />
        <SelectInput
          label="Area"
          name="area"
          id="area"
          value={formData.area}
          onChange={handleScheduleInputChange}
          options={areas || []}
          className={inputClasses}
          labelClasses={labelClasses}
          required
        />
        <Input
          label="Start Date"
          labelClasses={labelClasses}
          className={inputClasses}
          type="date"
          id="start_date"
          name="start_date"
          value={formData.start_date}
          onChange={handleScheduleInputChange}
          required
        />
        <Input
          label="End Date"
          labelClasses={labelClasses}
          className={inputClasses}
          type="date"
          id="end_date"
          name="end_date"
          value={formData.end_date}
          onChange={handleScheduleInputChange}
          required
        />
      </div>
    </>
  );
}
