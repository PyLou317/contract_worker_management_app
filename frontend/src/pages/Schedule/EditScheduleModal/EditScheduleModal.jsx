import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { EditScheduleContext } from './edit-schedule-context';
import { apiFetch } from '@/utilities/apiClient';
import sendData from '@/hooks/sendData';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import ScheduleForm from './ScheduleForm';
import ShiftForm from './ShiftForm';
import CancelBtn from '@/components/Buttons/CancelBtn';
import SubmitBtn from '@/components/Buttons/SubmitBtn';

export default function EditScheduleModal({
  Id,
  showEditScheduleModal,
  onClose,
  editingSchedule,
}) {
  const dialogRef = useRef(null);

  const [formData, setFormData] = useState({
    manager: '',
    area: '',
    start_date: '',
    end_date: '',
    is_active: true,
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
      const shifts = scheduleData.shifts || [];

      setFormData({
        manager: scheduleData.manager.name ? scheduleData.manager.name : '',
        area: scheduleData.area.name ? scheduleData.area.name : '',
        start_date: scheduleData.start_date ? scheduleData.start_date : '',
        end_date: scheduleData.end_date ? scheduleData.end_date : '',
        is_active: true,
        shifts: shifts,
      });
    }
  }, [scheduleData]);

  const handleScheduleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log('Updated Schedule:', formData);
  };

  const handleShiftInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedShifts = [...formData.shifts];
    updatedShifts[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      shifts: updatedShifts,
    }));
    console.log('Updated Shifts:', updatedShifts);
  };

  const queryClient = useQueryClient();
  const editScheduleMutation = useMutation({
    mutationFn: (payload) => sendData(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      queryClient.invalidateQueries({ queryKey: ['shifts'] });
      queryClient.invalidateQueries({ queryKey: ['workers'] });
      onClose();
    },
    onError: (error) => {
      console.error('Error editing schedule:', error);
      alert('Failed to edit schedule. Please try again. ' + error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const endpoint = `/schedules/${Id}/`;
    editScheduleMutation.mutate({ formData: formData, endpoint: endpoint });
  };

  const ctxValue = {
    handleScheduleInputChange: handleScheduleInputChange,
    handleShiftInputChange: handleShiftInputChange,
    scheduleData: scheduleData,
    scheduleIsPending: scheduleIsPending,
    scheduleError: scheduleError,
    dialogRef: dialogRef,
    showEditScheduleModal: showEditScheduleModal,
    onClose: onClose,
    formData: formData,
    setFormData: setFormData,
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
          className={`text-white p-8 rounded-2xl shadow-xl max-w-5xl w-full transform transition-transform duration-300 relative ${
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
            <button onClick={onClose} className="hover:text-gray-700">
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
            <ShiftForm />
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
                //   disabled={addWorkerMutation.isPending}
              />
            </div>
          </form>
        </dialog>
      </div>
    </EditScheduleContext.Provider>
  );
}
