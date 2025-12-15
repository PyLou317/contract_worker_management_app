import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import CapitalizeFirstLetter from '@/utilities/capitalizeFirstLetter';

import Input from '@/components/Inputs/LabeledInput';
import SelectInput from '@/components/Inputs/FloatingSelectInput';
import CancelBtn from '@/components/Buttons/CancelBtn';
import SubmitBtn from '@/components/Buttons/SubmitBtn';
import Modal from '@/components/Modals/Modal';

import { apiFetch } from '@/utilities/apiClient';
import sendData from '@/hooks/sendData';

export default function AddWorkerModal({ showModal, onClose, editingWorker }) {
  const queryClient = useQueryClient();
  const [formErrors, setFormErrors] = useState({});
  const [generalError, setGeneralError] = useState(null);

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['agencies'],
    queryFn: () => apiFetch('/agencies'),
    keepPreviousData: true,
  });

  const agencies = data?.results || [];
  const agencyNames = agencies.map((agency) => {
    return {
      label: agency.name,
      value: agency.id,
    };
  });

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    agency: '',
  });

  const addWorkerMutation = useMutation({
    mutationFn: (payload) =>
      sendData(payload.formData, payload.endpoint, payload.method),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workers'] });
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        agency: '',
      });
      onClose();
    },
    onError: (error) => {
      const errorData = error.data;

      setFormErrors({});
      setGeneralError(null);

      if (errorData) {
        if (errorData.email || errorData.first_name || errorData.last_name) {
          setFormErrors(errorData);
        }
        if (errorData.detail) {
          setGeneralError(errorData.detail);
        }
      } else {
        setGeneralError('An unexpected error occurred. Please try again.');
        console.error('Unhandled Mutation Error:', error);
      }
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      formData: formData,
      endpoint: `/workers/`,
      method: 'POST',
    };

    addWorkerMutation.mutate(payload);
  };

  return (
    <Modal show={showModal} onClose={onClose}>
      <div className="flex justify-between items-center pb-3">
        <h3 className="text-2xl font-semibold text-gray-800">Add New Worker</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
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
      <form onSubmit={handleSubmit}>
        {formErrors.email && (
          <p className="text-red-600 text-xs mt-1">{formErrors.email}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 mt-8 md:gap-4 md:items-end">
          <Input
            type="text"
            id="first_name"
            name="first_name"
            label="First Name"
            placeholder="First Name"
            value={CapitalizeFirstLetter(formData.first_name)}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            id="last_name"
            name="last_name"
            label="Last Name"
            placeholder="Last Name"
            value={CapitalizeFirstLetter(formData.last_name)}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 md:gap-4 md:items-end">
          <div>
            <Input
              type="email"
              id="email"
              name="email"
              label="Email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <Input
            type="text"
            id="phone_number"
            name="phone_number"
            label="Phone Number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-10">
          {agencies && (
            <SelectInput
              label="Agency"
              type="text"
              id="agency"
              name="agency"
              value={formData.agency}
              onChange={handleInputChange}
              required
              options={agencyNames}
            />
          )}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <CancelBtn
            onClick={onClose}
            disabled={addWorkerMutation.isPending}
            label="Cancel"
          />
          <SubmitBtn
            label={
              addWorkerMutation.isPending
                ? 'Adding...'
                : editingWorker
                ? 'Save Changes'
                : 'Add Worker'
            }
            disabled={addWorkerMutation.isPending}
          />
        </div>
      </form>
    </Modal>
  );
}
