import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import CapitalizeFirstLetter from '@/utilities/capitalizeFirstLetter';

import Input from '@/components/Inputs/LabeledInput';
import SelectInput from '@/components/Inputs/FloatingSelectInput';
import CancelBtn from '@/components/Buttons/CancelBtn';
import SubmitBtn from '@/components/Buttons/SubmitBtn';
import Modal from '@/components/Modals/Modal';

import { apiFetch } from '@/utilities/apiClient';
import addWorker from '@/hooks/addWorker';

export default function AddWorkerModal({ showModal, onClose, editingWorker }) {
  const queryClient = useQueryClient();
  const dialogRef = useRef(null);

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['agencies'],
    queryFn: () => apiFetch('/agencies'),
    keepPreviousData: true,
  });

  const agencies = data?.results || [];
  const agencyNames = agencies.map((agency) => agency.name);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    agency: '',
  });

  const addWorkerMutation = useMutation({
    mutationFn: addWorker,
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
      console.error('Error adding worker:', error);
      alert('Failed to add worker. Please try again. ' + error.message);
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
    addWorkerMutation.mutate(formData);
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
          <Input
            type="email"
            id="email"
            name="email"
            label="Email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
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
        <div className='my-10'>
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
