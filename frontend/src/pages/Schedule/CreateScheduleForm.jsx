import { useState, useContext, createContext, useEffect } from 'react';
import { ScheduleContext } from './schedule-page-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import addSchedule from '@/hooks/addSchedule';

import SelectInput from '@/components/Inputs/LabeledSelectInput';
import Input from '@/components/Inputs/LabeledInput';
import SubmitButton from '@/components/Buttons/SubmitBtn';
import AddShiftForm from './AddShiftForm';
import AddShiftBtn from './AddShiftBtn';

export default function CreateScheduleForm() {
  const queryClient = useQueryClient();
  const [showSuccess, setShowSuccess] = useState(false);
  const [dateRange, setDateRange] = useState([]);

  const [shifts, setShifts] = useState([
    {
      id: Date.now(),
      date: '',
      start_time: '',
      end_time: '',
      workers_needed: '',
    },
  ]);

  const [formData, setFormData] = useState({
    manager: '',
    area: '',
    start_date: '',
    end_date: '',
    is_active: true,
    shifts: [],
  });

  const { selectLabelClasses, InputLableClasses, areas, managers } =
    useContext(ScheduleContext);

  const handleAddShift = (e) => {
    e.preventDefault();
    setShifts([
      ...shifts,
      { id: Date.now(), date: '', start_time: '', end_time: '' },
    ]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === 'start_date') {
      setDateRange((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    if (name === 'end_date') {
      setDateRange((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleInputChangeShifts = (e, id) => {
    const { name, value } = e.target;
    const updateShifts = shifts.map((shift) =>
      shift.id === id ? { ...shift, [name]: value } : shift
    );
    setShifts(updateShifts);
    setFormData((prevData) => ({
      ...prevData,
      shifts: updateShifts,
    }));
  };

  const handleRemoveShift = (id) => {
    setShifts(shifts.filter((shift) => shift.id !== id));
  };

  const addScheduleMutation = useMutation({
    mutationFn: addSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      setFormData({
        manager: '',
        area: '',
        start_date: '',
        end_date: '',
        is_active: true,
        shifts: [],
      });
      setShifts([
        {
          id: Date.now(),
          date: '',
          start_time: '',
          end_time: '',
          workers_needed: '',
        },
      ]);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    },
    onError: (error) => {
      console.error('Error adding schedule:', error);
      alert('Failed to add schedule. Please try again. ' + error.message);
    },
  });

  const handleSumbit = (e) => {
    e.preventDefault();
    console.log('Schedule Created:', formData);
    addScheduleMutation.mutate(formData);
  };

  return (
    <form className="container mx-auto p-8 bg-white shadow-md rounded-2xl">
      {showSuccess && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">Schedule added successfully!</span>
        </div>
      )}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Create a New Schedule
        </h1>
        <div className="border-b border-gray-300 my-6"></div>
        {/* <p className="text-gray-700 mb-4">1. Select the area and manager aligned to the new schedule:</p> */}
        <div className="flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:items-end">
            {/* <div className="flex flex-col md:flex-row gap-4 md:items-end"> */}
            <SelectInput
              label="Manager"
              name="manager"
              id="manager"
              value={formData.manager}
              onChange={handleInputChange}
              options={managers}
              labelClasses={selectLabelClasses}
              className="flex flex-grow-1 border rounded-lg p-2 w-full h-[40px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <SelectInput
              label="Area"
              name="area"
              id="area"
              value={formData.area}
              onChange={handleInputChange}
              options={areas}
              labelClasses={selectLabelClasses}
              className="flex flex-grow-1 border rounded-lg p-2 w-full h-[40px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <Input
              label="Start Date"
              labelClasses={InputLableClasses}
              className="flex flex-grow-1 border rounded-lg p-2 w-full h-[40px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="date"
              id="start_date"
              name="start_date"
              value={formData.start_date}
              onChange={handleInputChange}
              required
            />
            <Input
              label="End Date"
              labelClasses={InputLableClasses}
              className="flex flex-grow-1 border rounded-lg p-2 w-full h-[40px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="date"
              id="end_date"
              name="end_date"
              value={formData.end_date}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div
          key={shifts.id}
          className="mt-8 border border-gray-300 p-4 rounded-xl"
        >
          <h1>Add Shifts</h1>
          {shifts.map((shift) => (
            <AddShiftForm
              shift={shift}
              handleInputChange={(e) => handleInputChangeShifts(e, shift.id)}
              key={shift.id}
              removeShift={() => handleRemoveShift(shift.id)}
              dateRange={dateRange}
            />
          ))}
        </div>
        <AddShiftBtn onClick={handleAddShift} />
      </div>
      <SubmitButton
        type="submit"
        label="Create Schedule"
        handleSubmit={handleSumbit}
        className="px-4 py-2 mt-8 w-full bg-yellow-400 font-medium rounded-lg hover:bg-yellow-300 transition-colors"
      />
    </form>
  );
}
