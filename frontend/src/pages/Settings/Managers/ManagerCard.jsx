import { useEffect, useState, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import sendData from '@/hooks/sendData';

import SettingCardWrapper from '@/pages/Settings/SettingCardWrapper';
import SubmitBtn from '@/components/Buttons/SubmitBtn';
import InlineField from '@/components/Inputs/InlineInput';
import { ManagerPageContext } from '@/pages/Settings/Managers/manager-page-context';

export default function ManagerCard({ manager }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
  });

  const { setShowSuccess } = useContext(ManagerPageContext);

  useEffect(() => {
    setEditFormData({
      name: manager.name,
      email: manager.email,
    });
  }, [manager]);

  const toggleManagerCard = () => {
    setIsOpen(!isOpen);
  };

  const handleEditManagerClick = () => {
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
  const { mutate: updateManagerMutation, isPending } = useMutation({
    mutationFn: (payload) =>
      sendData(payload.formData, payload.endpoint, payload.method),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['managers'] });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      setIsEditing(false);
      setIsOpen(true);
    },
    onError: (error) => {
      console.error('Error saving manager details:', error);
      alert(
        'Failed to save manager details. Please try again. ' + error.message
      );
    },
  });

  const managerId = manager.id;
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      formData: editFormData,
      endpoint: `/managers/${managerId}/`,
      method: 'PATCH',
    };
    updateManagerMutation(payload);
  };

  console.log(manager);
  return (
    <SettingCardWrapper>
      <div className="w-full">
        <div
          className="flex justify-between cursor-pointer"
          onClick={toggleManagerCard}
        >
          <span className="flex gap-2 items-center">
            <h3 className="text-xl font-semibold text-gray-900 sm:text-3xl">
              {manager.name}
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
            <div className="flex flex-col gap-1 ms-4">
              <div className="flex flex-row gap-2 items-baseline">
                <h3>Full Name:</h3>
                {isEditing ? (
                  <InlineField
                    name="name"
                    value={manager.name}
                    editValue={editFormData.name}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="text-sm text-gray-500 overflow-hidden text-ellipsis">
                    {manager.name}
                  </span>
                )}
              </div>
              <div className="flex flex-row gap-2 items-baseline">
                <h3>Email:</h3>
                {isEditing ? (
                  <InlineField
                    name="email"
                    value={manager.email}
                    editValue={editFormData.email}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="text-sm text-gray-500 overflow-hidden text-ellipsis">
                    {manager.email}
                  </span>
                )}
              </div>
              <div className="flex flex-row gap-2 items-baseline">
                <h3>Department:</h3>
                {isEditing ? (
                  <InlineField
                    name="department"
                    value={manager.area}
                    editValue={editFormData.area}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="text-sm text-gray-500 overflow-hidden text-ellipsis">
                    {manager.area}
                  </span>
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
                  : (event) => handleEditManagerClick(event)
              }
            />
            <SubmitBtn
              label="Delete"
              className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded-lg text-white cursor-pointer"
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
