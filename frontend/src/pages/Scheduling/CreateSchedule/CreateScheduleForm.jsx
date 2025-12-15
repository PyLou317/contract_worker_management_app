import { useState, useContext, createContext, useEffect } from 'react';
import { ScheduleContext } from '@/pages/Scheduling/schedule-page-context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import addSchedule from '@/hooks/addSchedule';

import PageContainer from '@/components/PageContainer';
import SelectInput from '@/components/Inputs/FloatingSelectInput';
import Input from '@/components/Inputs/LabeledInput';
import SubmitButton from '@/components/Buttons/SubmitBtn';
import CreateShiftForm from '@/pages/Scheduling/CreateSchedule/CreateShiftForm';
import AddShiftBtn from '@/pages/Scheduling/AddShiftBtn';
import SectionHeader from '@/components/SectionHeader';

export default function CreateScheduleForm() {
  const queryClient = useQueryClient();
  const [showSuccess, setShowSuccess] = useState(false);
  const [dateRange, setDateRange] = useState([]);
  const [validationError, setValidationError] = useState('');
  const { areas, managers } = useContext(ScheduleContext);

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
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    console.log(managers);

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
    console.log('Submitted Data:', formData);
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
      <PageContainer>
        <SectionHeader title="Create New Schedule" />
        <div className="mt-12">
          <form>
            <div className="flex flex-col px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:items-end">
                <SelectInput
                  label="Manager"
                  name="manager"
                  id="manager"
                  value={formData.manager}
                  onChange={handleInputChange}
                  options={managers}
                  required
                />
                <SelectInput
                  label="Area"
                  name="area"
                  id="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  options={areas}
                  required
                />
                <Input
                  label="Start Date"
                  type="date"
                  id="start_date"
                  placeholder="Start Date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="End Date"
                  type="date"
                  id="end_date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div key={shifts.id} className="mt-8 p-2 bg-white rounded-2xl">
              <h1 className="text-xl font-semibold text-gray-800 mb-4">
                Add Shifts
              </h1>
              {shifts.map((shift) => (
                <CreateShiftForm
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
            <div className="p-2">
              <AddShiftBtn onClick={handleAddShift} />
            </div>
            <SubmitButton
              type="submit"
              label="Create Schedule"
              handleSubmit={handleSumbit}
              className="px-4 py-2 mt-8 w-full bg-yellow-400 font-medium rounded-lg hover:bg-yellow-300 transition-colors cursor-pointer"
            />
          </form>
        </div>
      </PageContainer>
    </>
  );
}
