import { useState, useContext, createContext, useEffect } from 'react';
import { ScheduleContext } from './schedule-page-context';

import SelectInput from '@/components/Inputs/LabeledSelectInput';
import SubmitButton from '@/components/Buttons/SubmitBtn';
import AddShiftForm from './AddShiftForm';
import AddShiftBtn from './AddShiftBtn';

export default function CreateScheduleForm() {
  const [shifts, setShifts] = useState([
    {
      id: Date.now(),
      day: '',
      start_time: '',
      end_time: '',
    },
  ]);

  const [formData, setFormData] = useState({
    manager: '',
    area: '',
    shifts: [],
  });

  const { selectLabelClasses } = useContext(ScheduleContext);

  const handleAddShift = (e) => {
    e.preventDefault();
    setShifts([...shifts, { id: Date.now(), day: '', startTime: '', endTime: '' }]);
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    const updateSchedule = formData.map((schedule) => (schedule.id === id ? { ...schedule, [name]: value } : schedule));
    setShifts(updateSchedule);
    console.log(shifts);
  };

  const handleInputChangeShifts = (e, id) => {
    const { name, value } = e.target;
    const updateShifts = shifts.map((shift) => (shift.id === id ? { ...shift, [name]: value } : shift));
    setShifts(updateShifts);
    console.log(shifts);
  };

  const handleRemoveShift = (id) => {
    setShifts(shifts.filter((shift) => shift.id !== id));
  };

  return (
    <form className="container mx-auto p-8 bg-white shadow-md rounded-2xl">
      {/* {showSuccess && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">Skill added successfully!</span>
        </div>
      )} */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Create a New Schedule</h1>
        <div className="border-b border-gray-300 my-6"></div>
        {/* <p className="text-gray-700 mb-4">1. Select the area and manager aligned to the new schedule:</p> */}
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row gap-4 md:items-end">
            <SelectInput
              label="Manager"
              name="manager"
              id="manager"
              options={[]}
              labelClasses={selectLabelClasses}
              className="flex flex-grow-1 border rounded-lg p-2 w-full md:w-[250px] h-[40px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <SelectInput
              label="Area"
              name="area"
              id="area"
              options={[]}
              labelClasses={selectLabelClasses}
              className="flex flex-grow-1 border rounded-lg p-2 w-full md:w-[250px] h-[40px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div key={shifts.id} className="mt-8">
          {/* <h1 className="text-2xl font-semibold text-gray-800 mt-12 mb-2">Add Shifts to Schedule</h1> */}
          {/* <p className="text-gray-700 mt-8 mb-4">2. Select the days and times for each shift:</p> */}
          {shifts.map((shift) => (
            <AddShiftForm
              shift={shift}
              handleInputChange={(e) => handleInputChangeShifts(e, shift.id)}
              key={shift.id}
              removeShift={() => handleRemoveShift(shift.id)}
            />
          ))}
        </div>
        <AddShiftBtn onClick={handleAddShift} />
      </div>
      <SubmitButton
        type="submit"
        label="Create Schedule"
        className="px-4 py-2 mt-8 w-full bg-yellow-400 font-medium rounded-lg hover:bg-yellow-300 transition-colors"
      />
    </form>
  );
}
