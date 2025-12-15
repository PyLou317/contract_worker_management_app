import { useState, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import sendData from '@/hooks/sendData';
import { ManagerPageContext } from './manager-page-context';

import Input from '@/components/Inputs/LabeledInput';
import SubmitButton from '@/components/Buttons/SubmitBtn';

export default function AddManagerForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const { toggleAddManager, setToggleAddManager } =
    useContext(ManagerPageContext);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const queryClient = useQueryClient();
  const addManagerMutation = useMutation({
    mutationFn: (payload) =>
      sendData(payload.formData, payload.endpoint, payload.method),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['managers'] });
      setFormData({
        name: '',
        email: '',
      });
      setShowSuccess(true);
      setToggleAddManager(false);
      setTimeout(() => setShowSuccess(false), 3000);
    },
    onError: (error) => {
      console.error('Error adding manager:', error);
      alert('Failed to add manager. Please try again. ' + error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      formData: formData,
      endpoint: `/managers/`,
      method: 'POST',
    };
    addManagerMutation.mutate(payload);
  };

  return (
    <>
      {showSuccess && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">Manager added successfully!</span>
        </div>
      )}
      <div
        className={`container mx-auto bg-white w-full md:w-7/8  transition-all duration-500 ease-in-out overflow-hidden ${
          toggleAddManager ? 'max-h-[1000px] p-4 mb-16' : 'max-h-0'
        }`}
      >
        <form onSubmit={handleSubmit} className="mt-4">
          <h1 className="font-semibold text-md mt-12">Contact:</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-10 mt-8">
            <Input
              label="Full Name"
              type="text"
              id="name"
              name="name"
              placeholder="Full Name"
              onChange={handleInputChange}
              value={formData.full_name}
              required
            />
            <Input
              label="Email"
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
              value={formData.email}
              required
            />
          </div>
          <SubmitButton
            type="submit"
            label="Add Manager"
            disabled={addManagerMutation.isPending}
            className="px-4 py-2 mt-8 w-full bg-yellow-400 font-medium rounded-lg hover:bg-yellow-300 transition-colors"
          />
        </form>
      </div>
    </>
  );
}
