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
  const [validationError, setValidationError] = useState('');
  const [createSchedule, setCreateSchedule] = useState(false);
  const { selectLabelClasses, InputLableClasses, areas, managers } =
    useContext(ScheduleContext);

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

  const handleAddShift = (e) => {
    e.preventDefault();
    setShifts([
      ...shifts,
      { id: Date.now(), date: '', start_time: '', end_time: '' },
    ]);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValidationError('');

    setFormData((prevData) => {
      let newFormData = { ...prevData, [name]: value };

      if (name === 'start_date') {
        const startDate = new Date(value);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 7);
        const newEndDateString = formatDate(endDate);

        newFormData.end_date = newEndDateString;

        setDateRange({
          start_date: value,
          end_date: newEndDateString,
        });
      } else if (name === 'end_date') {
        const startDateTime = new Date(prevData.start_date);
        const endDateTime = new Date(value);

        if (endDateTime < startDateTime) {
          setValidationError('End date cannot be before the start date.');
          newFormData[name] = prevData.start_date;
        }

        setDateRange((prevRange) => ({
          ...prevRange,
          [name]: newFormData[name],
        }));
      }
      return newFormData;
    });
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

  const handleSumbit = (e, id) => {
    e.preventDefault();
    addScheduleMutation.mutate(formData);
  };

  const handleCreateScheduleClick = () => {
    setCreateSchedule((prevCreateSchedule) => !prevCreateSchedule);
  };

  return (
    <>
      {/* SUCCESS MESSAGE */}
      {showSuccess && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">Schedule added successfully!</span>
        </div>
      )}
      {/* VALIDATION ERROR MESSAGE */}
      {validationError && (
        <div
          className="bg-red-100 border border-red-500 text-red-700 p-3 rounded-xl relative mb-4 transition-all"
          role="alert"
        >
          <span className="block sm:inline font-medium">
            Validation Error:{' '}
          </span>
          <span className="block sm:inline">{validationError}</span>
        </div>
      )}
      <div className="container mx-auto p-8 bg-white shadow-md rounded-2xl">
        <button
          type="button"
          onClick={handleCreateScheduleClick}
          className="flex align-center items-center gap-2 cursor-pointer text-gray-800 hover:text-gray-900 hover:scale-101 transition-transform"
        >
          <h1 className="text-2xl font-semibold text-gray-800">
            {createSchedule ? 'Close' : 'Create a New Schedule'}{' '}
          </h1>
          {createSchedule ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          )}
        </button>

        <div className="border-b border-gray-300 mt-6"></div>
        {createSchedule && (
          <form className="mt-6">
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
                  handleInputChange={(e) =>
                    handleInputChangeShifts(e, shift.id)
                  }
                  key={shift.id}
                  removeShift={() => handleRemoveShift(shift.id)}
                  dateRange={dateRange}
                />
              ))}
            </div>
            <AddShiftBtn onClick={handleAddShift} />
            <SubmitButton
              type="submit"
              label="Create Schedule"
              handleSubmit={handleSumbit}
              className="px-4 py-2 mt-8 w-full bg-yellow-400 font-medium rounded-lg hover:bg-yellow-300 transition-colors"
            />
          </form>
        )}
      </div>
    </>
  );
}
