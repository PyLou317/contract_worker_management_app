import { createContext } from 'react';

export const EditScheduleContext = createContext({
  handleScheduleInputChange: () => {},
  handleShiftInputChange: () => {},
  scheduleData: null,
  scheduleIsPending: false,
  scheduleError: null,
  dialogRef: null,
  showEditScheduleModal: false,
  onClose: () => {},
  formData: {},
  setFormData: () => {},
});
