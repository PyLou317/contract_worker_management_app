import { useState, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import sendData from '@/hooks/sendData';

import { AgencyPageContext } from './agency-page-context';

import Input from '@/components/Inputs/LabeledInput';
import SubmitButton from '@/components/Buttons/SubmitBtn';

export default function AddAgencyForm() {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    contact_first_name: '',
    contact_last_name: '',
    contact_email: '',
    name: '',
    phone_number: '',
    postal_code: '',
    province: '',
    website: '',
  });

  const { toggleAddAgency, setToggleAddAgency } = useContext(AgencyPageContext);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'website') {
      let finalValue = value;

      const protocolRegex = /^(http|https):\/\//i;

      if (value && !protocolRegex.test(value)) {
        finalValue = 'https://' + value;
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: finalValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const queryClient = useQueryClient();
  const addAgencyMutation = useMutation({
    mutationFn: (payload) =>
      sendData(payload.formData, payload.endpoint, payload.method),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agencies'] });
      setFormData({
        address: '',
        city: '',
        contact_first_name: '',
        contact_last_name: '',
        contact_email: '',
        name: '',
        phone_number: '',
        postal_code: '',
        province: '',
        website: '',
      });
      setShowSuccess(true);
      setToggleAddAgency(false);
      setTimeout(() => setShowSuccess(false), 3000);
    },
    onError: (error) => {
      console.error('Error adding agency:', error);
      alert('Failed to add agency. Please try again. ' + error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      formData: formData,
      endpoint: `/agencies/`,
      method: 'POST',
    };
    addAgencyMutation.mutate(payload);
  };

  return (
    <>
      {showSuccess && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">Agency added successfully!</span>
        </div>
      )}
      <div
        className={`container mx-auto bg-white w-full md:w-7/8  transition-all duration-500 ease-in-out overflow-hidden ${
          toggleAddAgency ? 'max-h-[1000px] p-4 mb-16' : 'max-h-0'
        }`}
      >
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="grid grid-cols-1 md:gap-4">
              <Input
                label="Agency Name"
                type="text"
                id="name"
                name="name"
                placeholder="Agency Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <h1 className="font-semibold text-md mt-12">Contact:</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-10 mt-8">
              <Input
                label="Contact First Name"
                type="text"
                id="contact_first_name"
                name="contact_first_name"
                placeholder="Contact First Name"
                onChange={handleInputChange}
                value={formData.contact_first_name}
                required
              />
              <Input
                label="Contact Last Name"
                type="text"
                id="contact_last_name"
                name="contact_last_name"
                placeholder="Contact Last Name"
                onChange={handleInputChange}
                value={formData.contact_last_name}
                required
              />
              <Input
                label="Contact Number"
                type="text"
                id="phone_number"
                name="phone_number"
                placeholder="Contact Number"
                onChange={handleInputChange}
                value={formData.phone_number}
                required
              />
              <Input
                label="Contact Email"
                type="text"
                id="contact_email"
                name="contact_email"
                placeholder="Contact Email"
                onChange={handleInputChange}
                value={formData.contact_email}
                required
              />
            </div>

            <h1 className="font-semibold text-md mt-12">Address:</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-x-4 mt-10">
              <Input
                label="Street"
                type="text"
                id="address"
                name="address"
                placeholder="Street"
                onChange={handleInputChange}
                value={formData.address}
                required
              />
              <Input
                label="City"
                type="text"
                id="city"
                name="city"
                placeholder="City"
                onChange={handleInputChange}
                value={formData.city}
                required
              />
              <Input
                label="Province"
                type="text"
                id="province"
                name="province"
                placeholder="Province"
                onChange={handleInputChange}
                value={formData.province}
                required
              />
              <Input
                label="Postal Code"
                type="text"
                id="postal_code"
                name="postal_code"
                placeholder="Postal Code"
                onChange={handleInputChange}
                value={formData.postal_code}
                required
              />
            </div>

            <h1 className="font-semibold text-md mt-12">Website:</h1>
            <div className="grid grid-cols-1 md:gap-y-10 md:gap-x-4 mt-10">
              <Input
                label="Website"
                type="text"
                id="website"
                name="website"
                placeholder="Website"
                onChange={handleInputChange}
                value={formData.website}
                required
              />
            </div>
            <SubmitButton
              type="submit"
              label="Add Agency"
              disabled={addAgencyMutation.isPending}
              className="px-4 py-2 mt-8 w-full bg-yellow-400 font-medium rounded-lg hover:bg-yellow-300 transition-colors"
            />
          </form>
        )}
      </div>
    </>
  );
}
