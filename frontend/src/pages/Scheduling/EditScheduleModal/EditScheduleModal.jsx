import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { EditScheduleContext } from '@/pages/Scheduling/EditScheduleModal/edit-schedule-context';
import { apiFetch } from '@/utilities/apiClient';
import sendData from '@/hooks/sendData';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import ScheduleForm from './ScheduleForm';
import ShiftForm from './ShiftForm';
import CancelBtn from '@/components/Buttons/CancelBtn';
import SubmitBtn from '@/components/Buttons/SubmitBtn';
import AddShiftBtn from '@/pages/Scheduling/AddShiftBtn';
import AddShiftForm from '@/pages/Scheduling/EditScheduleModal/AddShiftForm';
import SaveAddedShiftBtn from '@/pages/Scheduling/EditScheduleModal/SaveAddedShift';
import getDaysArray from '@/utilities/getDateArray';

export default function EditScheduleModal({
  Id,
  showEditScheduleModal,
  onClose,
  editingSchedule,
}) {
  const dialogRef = useRef(null);
  const [pendingNewShifts, setPendingNewShifts] = useState([]);
  const [dateRange, setDateRange] = useState([]);

  const [formData, setFormData] = useState({
    manager: '',
    area: '',
    start_date: '',
    end_date: '',
    is_published: '',
    shifts: [],
  });

  const {
    data: scheduleData,
    isPending: scheduleIsPending,
    error: scheduleError,
  } = useQuery({
    queryKey: ['schedule', Id],
    queryFn: () => apiFetch(`/schedules/${Id}`),
    enabled: !!Id,
  });

  useEffect(() => {
    if (scheduleData) {
      const apiShifts = scheduleData.shifts || [];

      const transformedShifts = apiShifts.map((shift) => ({
        ...shift,
        contract_workers: shift.workers
          ? shift.workers.map((w) => ({ id: w.id }))
          : [],
      }));

      setFormData({
        manager: scheduleData.manager_detail.id,
        area: scheduleData.area_detail.id,
        start_date: scheduleData.start_date ? scheduleData.start_date : '',
        end_date: scheduleData.end_date ? scheduleData.end_date : '',
        is_published: scheduleData.is_published,
        shifts: transformedShifts,
      });

      const startDate = new Date(scheduleData.start_date);
      const endDate = new Date(scheduleData.end_date);
      const dateRange = {
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
      };
      setDateRange(dateRange);
    }
  }, [scheduleData]);

  //   console.log('Original Shifts:', formData.shifts);

  const handleScheduleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    console.log(newValue);

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleShiftInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedShifts = [...formData.shifts];

    let processedValue = value;

    if (name === 'workers_needed') {
      processedValue = parseInt(value);
      if (isNaN(processedValue)) {
        processedValue = 0;
      }
    }

    updatedShifts[index][name] = processedValue;

    setFormData((prevData) => ({
      ...prevData,
      shifts: updatedShifts,
    }));
  };

  const handlePendingShiftInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPendingShifts = [...pendingNewShifts];

    let processedValue = value;
    if (name === 'workers_needed') {
      processedValue = parseInt(value, 10);
      if (isNaN(processedValue)) {
        processedValue = 0;
      }
    }

    updatedPendingShifts[index] = {
      ...updatedPendingShifts[index],
      [name]: processedValue,
    };

    setPendingNewShifts(updatedPendingShifts);
  };

  const handleSaveAddedShifts = (e) => {
    e.preventDefault();
    const validNewShifts = pendingNewShifts.filter(
      (shift) => shift.date && shift.start_time && shift.end_time
    );

    if (validNewShifts.length === 0) {
      setPendingNewShifts([]);
      return;
    }

    setFormData((prevData) => {
      const newFormData = {
        ...prevData,
        shifts: [...prevData.shifts, ...validNewShifts],
      };
      console.log('New formData state being queued:', newFormData.shifts);
      return newFormData;
    });
    setPendingNewShifts([]);
  };

  const handleWorkerCheck = (shiftIndex, workerId, isChecked) => {
    const numericWorkerId = Number(workerId);

    setFormData((prevData) => {
      const updatedShifts = [...prevData.shifts];
      const targetShift = updatedShifts[shiftIndex];

      if (isChecked) {
        const workersArray = targetShift.contracto_workers || [];

        const isAlreadyAdded = workersArray.some(
          (workerObj) => workerObj.id === numericWorkerId
        );

        if (!isAlreadyAdded) {
          targetShift.contract_workers = [
            ...targetShift.contract_workers,
            { id: numericWorkerId },
          ];
        }
      } else {
        targetShift.contract_workers = targetShift.contract_workers.filter(
          (workerObj) => workerObj.id !== numericWorkerId
        );
      }

      return {
        ...prevData,
        shifts: updatedShifts,
      };
    });
  };

  const handleAddShift = (e) => {
    e.preventDefault();
    setPendingNewShifts((prevShifts) => [
      ...prevShifts,
      {
        date: '',
        start_time: '',
        end_time: '',
        workers_needed: '',
        contract_workers: [],
      },
    ]);
  };

  const handleRemoveShift = (id) => {
    setPendingNewShifts((prevShifts) =>
      prevShifts.filter((shift) => shift.id !== id)
    );
  };

  const queryClient = useQueryClient();
  const editScheduleMutation = useMutation({
    mutationFn: (payload) =>
      sendData(payload.formData, payload.endpoint, payload.method),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      queryClient.invalidateQueries({ queryKey: ['shifts'] });
      await queryClient.invalidateQueries({ queryKey: ['schedule', Id] });
      queryClient.invalidateQueries({ queryKey: ['workers'] });
    },
    onError: (error) => {
      console.error('Error editing schedule:', error);
      alert('Failed to edit schedule. Please try again. ' + error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Submitted Data:', formData);

    const payload = {
      formData: formData,
      endpoint: `/schedules/${Id}/`,
      method: 'PATCH',
    };
    editScheduleMutation.mutate(payload);
  };

  const ctxValue = {
    handleScheduleInputChange: handleScheduleInputChange,
    handleShiftInputChange: handleShiftInputChange,
    handleWorkerCheck: handleWorkerCheck,
    handlePendingShiftInputChange: handlePendingShiftInputChange,
    scheduleData: scheduleData,
    scheduleIsPending: scheduleIsPending,
    scheduleError: scheduleError,
    shiftsData: scheduleData?.shifts || [],
    showEditScheduleModal: showEditScheduleModal,
    onClose: onClose,
    formData: formData,
    setFormData: setFormData,
    pendingNewShifts: pendingNewShifts,
    setPendingNewShifts: setPendingNewShifts,
  };

  return (
    <EditScheduleContext.Provider value={ctxValue}>
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
          showEditScheduleModal
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="bg-gray-800/75 absolute inset-0"
          onClick={onClose}
        ></div>
        <dialog
          ref={dialogRef}
          className={`text-white p-8 rounded-2xl shadow-xl max-w-7xl w-full max-h-9/10 transform transition-transform duration-300 relative overflow-auto ${
            showEditScheduleModal ? 'scale-100' : 'scale-95'
          }`}
          open={showEditScheduleModal}
          onClose={onClose}
        >
          <div className="flex justify-between items-center pb-3">
            <div className="flex flex-col w-full">
              <h3 className="text-2xl font-semibold text-gray-800">
                Edit Schedule
              </h3>
              <div className="border-b border-gray-300 mt-2 mb-4"></div>
            </div>
            <button
              onClick={onClose}
              className="mb-6 text-gray-700 hover:text-gray-300"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <ScheduleForm />
            <div className="mt-8">
              <h1 className="text-xl font-semibold text-gray-800 my-2">
                Shifts
              </h1>
              <ShiftForm />
            </div>
            <AddShiftBtn onClick={handleAddShift} />
            {pendingNewShifts.map((shift, index) => (
              <AddShiftForm
                index={index}
                key={shift.id}
                removeShift={() => handleRemoveShift(shift.id)}
                dateRange={dateRange}
              />
            ))}
            {pendingNewShifts.length > 0 && (
              <SaveAddedShiftBtn onClick={handleSaveAddedShifts} />
            )}
            <div className="mt-6 flex justify-end gap-3">
              <CancelBtn onClick={onClose} label="Cancel" />
              <SubmitBtn
                label={
                  editScheduleMutation.isPending
                    ? 'Adding...'
                    : editingSchedule
                    ? 'Save Changes'
                    : 'Add Schedule'
                }
                disabled={editScheduleMutation.isPending}
              />
            </div>
          </form>
        </dialog>
      </div>
    </EditScheduleContext.Provider>
  );
}
