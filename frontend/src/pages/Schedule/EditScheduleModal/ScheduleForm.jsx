import { useContext, useEffect } from 'react';
import { EditScheduleContext } from './edit-schedule-context';
import { ScheduleContext } from '../schedule-page-context';

import Input from '@/components/Inputs/LabeledInput';
import SelectInput from '@/components/Inputs/LabeledSelectInput';

export default function ScheduleForm() {
  const { managers, areas } = useContext(ScheduleContext);

  const { formData, handleScheduleInputChange } =
    useContext(EditScheduleContext);

  const inputClasses = 'border border-gray-300 text-gray-800';
  const labelClasses = 'text-gray-800';

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:items-end">
        <SelectInput
          label="Manager"
          name="manager"
          id="manager"
          value={formData.manager.name}
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
          value={formData.area.name}
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
