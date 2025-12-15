import { useEffect, useState, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import sendData from '@/hooks/sendData';

import SettingCardWrapper from '@/pages/Settings/SettingCardWrapper';
import SubmitBtn from '@/components/Buttons/SubmitBtn';
import InlineField from '@/components/Inputs/InlineInput';
import formatPhoneNumber from '@/utilities/formatPhoneNumber';
import { AgencyPageContext } from '@/pages/Settings/Agencies/agency-page-context';

export default function AgencyCard({ agency }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    contact_first_name: '',
    contact_last_name: '',
    phone_number: '',
    contact_email: '',
    address: '',
    city: '',
    province: '',
    postal_code: '',
    website: '',
  });

  const { setShowSuccess } = useContext(AgencyPageContext);

  useEffect(() => {
    setEditFormData({
      name: agency.name,
      contact_first_name: agency.contact_first_name,
      contact_last_name: agency.contact_last_name,
      phone_number: agency.phone_number,
      contact_email: agency.contact_email,
      address: agency.address,
      city: agency.city,
      province: agency.province,
      postal_code: agency.postal_code,
      website: agency.website,
    });
  }, [agency]);

  const toggleAgencyCard = () => {
    setIsOpen(!isOpen);
  };

  const handleEditAgencyClick = () => {
    setIsEditing(!isEditing);
  };

  const handleCancleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const queryClient = useQueryClient();
  const { mutate: updateAgencyMutation, isPending } = useMutation({
    mutationFn: (payload) =>
      sendData(payload.formData, payload.endpoint, payload.method),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agencies'] });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      setIsEditing(false);
      setIsOpen(true);
    },
    onError: (error) => {
      console.error('Error saving agency details:', error);
      alert(
        'Failed to save agency details. Please try again. ' + error.message
      );
    },
  });

  const { mutate: deleteAgencyMutation } = useMutation({
    mutationFn: (payload) =>
      sendData(payload.formData, payload.endpoint, payload.method),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agencies'] });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    },
    onError: (error) => {
      console.error('Error deleting agency:', error);
      alert('Failed to delete agency. Please try again.');
    },
  });

  const agencyId = agency.id;
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      formData: editFormData,
      endpoint: `/agencies/${agencyId}/`,
      method: 'PATCH',
    };
    updateAgencyMutation(payload);
  };

  const handleDeleteAgency = (e) => {
    e.preventDefault;
    const payload = {
      formData: editFormData,
      endpoint: `/agencies/${agencyId}/`,
      method: 'DELETE',
    };
    deleteAgencyMutation(payload);
  };

  return (
    <SettingCardWrapper>
      <div className="w-full">
        <div
          className="flex justify-between cursor-pointer"
          onClick={toggleAgencyCard}
        >
          <span className="flex gap-2 items-center">
            <h3 className="text-xl font-semibold text-gray-900 sm:text-3xl">
              {agency.name}
            </h3>
          </span>
          <button type="button">
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            )}
          </button>
        </div>
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-[1000px]' : 'max-h-0'
          }`}
        >
          <div className="border-b border-gray-200 mt-6 mb-6"></div>

          <div className="ms-2">
            <h1 className="font-semibold text-md">Agency:</h1>
            <div className="flex flex-col gap-1 ms-4">
              <div className="flex flex-row gap-2 items-baseline">
                <h3>Name:</h3>
                {isEditing ? (
                  <InlineField
                    name="name"
                    value={agency.name}
                    editValue={editFormData.name}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="text-sm text-gray-500 overflow-hidden text-ellipsis">
                    {agency.name}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 ms-2">
            <h1 className="font-semibold text-md">Contact:</h1>
            <div className="flex flex-col gap-1 ms-4">
              <div className="flex flex-row gap-2 items-baseline">
                <h3>First Name:</h3>
                {isEditing ? (
                  <InlineField
                    name="contact_first_name"
                    value={agency.contact_first_name}
                    editValue={editFormData.contact_first_name}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="text-sm text-gray-500 overflow-hidden text-ellipsis">
                    {agency.contact_first_name}
                  </span>
                )}
              </div>
              <div className="flex flex-row gap-2 items-baseline">
                <h3>Last Name:</h3>
                {isEditing ? (
                  <InlineField
                    name="contact_last_name"
                    value={agency.contact_last_name}
                    editValue={editFormData.contact_last_name}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="text-sm text-gray-500 overflow-hidden text-ellipsis">
                    {agency.contact_last_name}
                  </span>
                )}
              </div>
              <div className="flex flex-row gap-2 items-baseline">
                <h3>Phone Number:</h3>
                {isEditing ? (
                  <InlineField
                    name="phone_number"
                    value={agency.phone_number}
                    editValue={editFormData.phone_number}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="text-sm text-gray-500 overflow-hidden text-ellipsis">
                    {formatPhoneNumber(agency.phone_number)}
                  </span>
                )}
              </div>
              <div className="flex flex-row gap-2 items-baseline">
                <h3>Email:</h3>
                {isEditing ? (
                  <InlineField
                    name="contact_email"
                    value={agency.contact_email}
                    editValue={editFormData.contact_email}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="text-sm text-blue-500 overflow-hidden text-ellipsis">
                    <a href={`mailto:${agency.contact_email}`}>
                      {agency.contact_email}
                    </a>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 ms-2">
            <h1 className="font-semibold text-md">Address:</h1>
            <div className="flex flex-col gap-1 ms-4">
              <div className="flex flex-row gap-2 items-baseline">
                <h3>Street:</h3>
                {isEditing ? (
                  <InlineField
                    name="address"
                    value={agency.address}
                    editValue={editFormData.address}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="text-sm text-gray-500 overflow-hidden text-ellipsis">
                    {agency.address}
                  </span>
                )}
              </div>
              <div className="flex flex-row gap-2 items-baseline">
                <h3>City:</h3>
                {isEditing ? (
                  <InlineField
                    name="city"
                    value={agency.city}
                    editValue={editFormData.city}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="text-sm text-gray-500 overflow-hidden text-ellipsis">
                    {agency.city}
                  </span>
                )}
              </div>
              <div className="flex flex-row gap-2 items-baseline">
                <h3>Province:</h3>
                {isEditing ? (
                  <InlineField
                    name="province"
                    value={agency.province}
                    editValue={editFormData.province}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="text-sm text-gray-500 overflow-hidden text-ellipsis">
                    {agency.province}
                  </span>
                )}
              </div>
              <div className="flex flex-row gap-2 items-baseline">
                <h3>Postal Code:</h3>
                {isEditing ? (
                  <InlineField
                    name="postal_code"
                    value={agency.postal_code}
                    editValue={editFormData.postal_code}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="text-sm text-gray-500 overflow-hidden text-ellipsis">
                    {agency.postal_code}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex flex-col gap-1 ms-2">
              <div className="flex flex-row gap-2 items-baseline">
                <h1 className="font-semibold text-md">Website:</h1>
                {isEditing ? (
                  <InlineField
                    name="website"
                    value={agency.website}
                    editValue={editFormData.website}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                ) : (
                  <a
                    href={agency.website}
                    target="blank"
                    className="text-sm text-blue-500 overflow-hidden text-ellipsis"
                  >
                    {agency.website}
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-10">
            <SubmitBtn
              label={isEditing ? 'Save Info' : 'Edit Info'}
              handleSubmit={
                isEditing
                  ? handleSubmit
                  : (event) => handleEditAgencyClick(event)
              }
            />
            <SubmitBtn
              label="Delete"
              className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded-lg text-white cursor-pointer"
              handleSubmit={handleDeleteAgency}
            />
            {isEditing ? (
              <button
                type="button"
                onClick={handleCancleEdit}
                className={`px-4 py-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-400 transition-colors cursor-pointer`}
              >
                Cancel
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </SettingCardWrapper>
  );
}
