import { useContext, useEffect } from 'react';
import { EditScheduleContext } from './edit-schedule-context';
import { ScheduleContext } from '../schedule-page-context';

import Input from '@/components/Inputs/LabeledInput';
import SelectInput from '@/components/Inputs/FloatingSelectInput';

export default function ScheduleForm() {
  const { managers, areas } = useContext(ScheduleContext);

  const { formData, handleScheduleInputChange } =
    useContext(EditScheduleContext);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Schedule</h1>
        <label
          htmlFor="is_published"
          className="inline-flex items-center cursor-pointer"
        >
          <input
            type="checkbox"
            id="is_published"
            name="is_published"
            className="sr-only peer"
            onChange={handleScheduleInputChange}
            checked={formData.is_published}
            value={formData.is_published}
          />
          <div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-400 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-700">
            Activate Schedule
          </span>
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:items-end border border-gray-300 rounded-xl shadow-md px-4 pt-10 pb-6 mb-4">
        <SelectInput
          label="Manager"
          name="manager"
          id="manager"
          value={formData.manager}
          onChange={handleScheduleInputChange}
          options={managers || []}
          required
        />
        <SelectInput
          label="Area"
          name="area"
          id="area"
          value={formData.area}
          onChange={handleScheduleInputChange}
          options={areas || []}
          required
        />
        <Input
          label="Start Date"
          type="date"
          id="start_date"
          name="start_date"
          placeholder="Start Date"
          value={formData.start_date}
          onChange={handleScheduleInputChange}
          required
        />
        <Input
          label="End Date"
          type="date"
          id="end_date"
          name="end_date"
          placeholder="End Date"
          value={formData.end_date}
          onChange={handleScheduleInputChange}
          required
        />
      </div>
    </>
  );
}
