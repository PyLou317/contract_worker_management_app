import { useContext, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

import Input from '@/components/Inputs/LabeledInput';
import SelectInput from '@/components/Inputs/LabeledSelectInput';
import CancelBtn from '@/components/Buttons/CancelBtn';
import SubmitBtn from '@/components/Buttons/SubmitBtn';

export default function EditScheduleModal({
  scheduleId,
  showEditScheduleModal,
  onClose,
  handleSubmit,
  formData,
  setFormData,
}) {
  const dialogRef = useRef(null);

  const {
    data: scheduleData,
    isPending: scheduleIsPending,
    error: scheduleError,
  } = useQuery({
    queryKey: ['schedule', scheduleId],
    queryFn: () => getWScheduleDetails({ scheduleId: scheduleId }),
    enabled: !!scheduleId,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(newData);
  };

  const inputClasses = 'bg-gray-800 border border-gray-400 text-white';
  const selectInputClasses =
    'bg-gray-800 text-gray-200 border border-gray-400 text-gray-200';

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
        showEditScheduleModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-gray-800/75 absolute inset-0" onClick={onClose}></div>
      <dialog
        ref={dialogRef}
        className={` bg-gray-900 text-white p-8 rounded-2xl shadow-xl max-w-3xl w-full transform transition-transform duration-300 relative ${
          showEditScheduleModal ? 'scale-100' : 'scale-95'
        }`}
        open={showEditScheduleModal}
        onClose={onClose}
      >
        <div className="flex justify-between items-center pb-3">
          <h3 className="text-2xl font-semibold text-white">Edit Schedule</h3>
          <button
            onClick={onClose}
            className="text-gray-200 hover:text-gray-700"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:items-end">
            <SelectInput
              label="Manager"
              name="manager"
              id="manager"
              value={''}
              onChange={handleInputChange}
              options={['managers', 'managers']}
              className={selectInputClasses}
              required
            />
            <SelectInput
              label="Area"
              name="area"
              id="area"
              value={''}
              onChange={handleInputChange}
              options={['areas', 'areas']}
              className={selectInputClasses}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:items-end">
            <Input
              label="Start Date"
              className={inputClasses}
              type="date"
              id="start_date"
              name="start_date"
              value={''}
              onChange={handleInputChange}
              required
            />
            <Input
              label="End Date"
              className={inputClasses}
              type="date"
              id="end_date"
              name="end_date"
              value={''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <CancelBtn onClick={onClose} label="Cancel" />
            <SubmitBtn
              label="Save Changes"
              //   disabled={addWorkerMutation.isPending}
            />
          </div>
        </form>
      </dialog>
    </div>
  );
}
