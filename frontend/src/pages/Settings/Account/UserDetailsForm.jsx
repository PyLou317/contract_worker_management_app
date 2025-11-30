import Input from '@/components/Inputs/LabeledInput';
import SubmitBtn from '@/components/Buttons/SubmitBtn';
import { useEffect, useState, useContext, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AppContext } from '@/app-context';
import sendData from '@/hooks/sendData';

import formatPhoneNumber from '@/utilities/formatPhoneNumber';

export default function UserDetailForm() {
  const successRef = useRef();
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [initialData, setInitialData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
  });
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
  });

  const { userData, userDataIsPending, userDataIsFetching, userDataError } =
    useContext(AppContext);

  useEffect(() => {
    setInitialData({
      first_name: userData?.first_name || '',
      last_name: userData?.last_name || '',
      phone_number: formatPhoneNumber(userData?.phone_number) || '',
      email: userData?.email || '',
    });
    setFormData({
      first_name: userData?.first_name || '',
      last_name: userData?.last_name || '',
      phone_number: formatPhoneNumber(userData?.phone_number) || '',
      email: userData?.email || '',
    });
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'phone_number') {
      newValue = formatPhoneNumber(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const areObjectsDifferent = (objA, objB) => {
    return JSON.stringify(objA) !== JSON.stringify(objB);
  };

  useEffect(() => {
    const formIsDirty = areObjectsDifferent(initialData, formData);
    setHasChanges(formIsDirty);
  }, [initialData, formData]);

  const queryClient = useQueryClient();
  const { mutate: updateUserMutation, isPending } = useMutation({
    mutationFn: (payload) =>
      sendData(payload.formData, payload.endpoint, payload.method),
    onSuccess: (data, variables) => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        
      setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);

        setInitialData(variables.formData)
    },
    onError: (error) => {
      console.error('Error saving user details:', error);
      alert('Failed to save user details. Please try again. ' + error.message);
    },
  });

  const handleSaveUserDetails = (e) => {
    e.preventDefault();

    const payload = {
      formData: formData,
      endpoint: `/user/`,
      method: 'PATCH',
    };
    updateUserMutation(payload);
  };

  if (userDataIsPending || userDataIsFetching) {
    return <p>Loading user details...</p>;
  }

  if (userDataError) {
    return <p>Error loading user data: {userDataError.message}</p>;
  }

  return (
    <>
      {showSuccess && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative mb-4"
          role="alert"
          ref={successRef}
        >
          <span className="block sm:inline">
            Account information updated successfully!
          </span>
        </div>
      )}
      <div className="max-w-4xl">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 mt-12">
          <Input
            label="First Name"
            type="text"
            id="first_name"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Last Name"
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 mt-12">
          <Input
            label="Phone Number"
            type="text"
            id="phone_number"
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Email"
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mt-6">
          <SubmitBtn
            label={userDataIsPending ? 'Saving' : 'Save changes'}
            handleSubmit={handleSaveUserDetails}
            disabled={!hasChanges}
          />
        </div>
      </div>
    </>
  );
}
