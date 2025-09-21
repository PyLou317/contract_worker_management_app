import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Input from '@/components/Inputs/LabeledInput';
import SelectInput from '@/components/Inputs/LabeledSelectInput';
import CancelBtn from '@/components/Buttons/CancelBtn';
import SubmitBtn from '@/components/Buttons/SubmitBtn';

import { getAgencies } from '@/hooks/getAgencyDataApi';
import addWorker from '@/hooks/addWorker';

export default function AddWorkerModal({ showModal, onClose, editingWorker }) {
  const contracts = ['Hello Fresh'];
  const queryClient = useQueryClient();
  const dialogRef = useRef(null);

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['agencies'],
    queryFn: getAgencies,
    keepPreviousData: true,
  });

  const agencies = data?.results || [];
  const agencyNames = agencies.map((agency) => agency.name);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    current_contract: '',
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
        current_contract: '',
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

  const inputFieldClasses =
    'mt-1 p-2 block w-full rounded-md border bg-gray-800 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500';
  const inputLabelClasses = 'block text-sm font-medium text-gray-200';

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
        showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-gray-800/75 absolute inset-0" onClick={onClose}></div>
      <dialog
        ref={dialogRef}
        className={` bg-gray-900 text-white p-8 rounded-2xl shadow-xl max-w-lg w-full transform transition-transform duration-300 relative ${
          showModal ? 'scale-100' : 'scale-95'
        }`}
        open={showModal}
        onClose={onClose}
      >
        <div className="flex justify-between items-center pb-3">
          <h3 className="text-2xl font-semibold text-white">Add New Worker</h3>
          <button onClick={onClose} className="text-gray-200 hover:text-gray-700">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            id="first_name"
            name="first_name"
            label="First Name"
            value={formData.first_name}
            onChange={handleInputChange}
            className={inputFieldClasses}
            labelClasses={inputLabelClasses}
          />
          <Input
            type="text"
            id="last_name"
            name="last_name"
            label="Last Name"
            value={formData.last_name}
            onChange={handleInputChange}
            className={inputFieldClasses}
            labelClasses={inputLabelClasses}
          />
          <Input
            type="email"
            id="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
            className={inputFieldClasses}
          />
          <Input
            type="text"
            id="phone_number"
            name="phone_number"
            label="Phone Number"
            value={formData.phone_number}
            onChange={handleInputChange}
            className={inputFieldClasses}
          />
          {contracts && (
            <SelectInput
              label="Current Contract"
              type="text"
              id="current_contract"
              name="current_contract"
              value={formData.current_contract}
              onChange={handleInputChange}
              required
              options={contracts}
              className={inputFieldClasses}
            ></SelectInput>
          )}
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
              className={inputFieldClasses}
            ></SelectInput>
          )}
          <div className="mt-6 flex justify-end gap-3">
            <CancelBtn onClick={onClose} disabled={addWorkerMutation.isPending} label="Cancel" />
            <SubmitBtn
              label={addWorkerMutation.isPending ? 'Adding...' : editingWorker ? 'Save Changes' : 'Add Worker'}
              disabled={addWorkerMutation.isPending}
            />
          </div>
        </form>
      </dialog>
    </div>
  );
}
