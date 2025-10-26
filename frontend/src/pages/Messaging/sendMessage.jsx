import React from 'react';
import { useState } from 'react';
import { useSendSMSMutation } from '@/hooks/sendSMSMutation';

import Input from '@/components/Inputs/LabeledInput';
import sendData from '@/hooks/sendData';
import SubmitBtn from '@/components/Buttons/SubmitBtn';

export default function SendSMSMessage() {
  const [formData, setFormData] = useState({
    receipient_name: '',
    to_number: '',
    message_body: '',
  });

  const {
    mutate: sendSMSMutation,
    isPending,
    error,
  } = useSendSMSMutation({ setFormData });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanedNumber = formData.to_number.replace(/\D/g, '');

    const dataToSend = {
      ...formData,
      to_number: cleanedNumber.startsWith('+')
        ? cleanedNumber
        : '+' + cleanedNumber,
    };
    sendSMSMutation(dataToSend);
    console.log(formData);
  };

  const inputFieldClasses =
    'mt-1 p-2 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500';
  const inputLabelClasses = 'block text-sm font-medium text-gray-800';
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="w-2xl grid grid-cols-2 gap-4">
        <Input
          label="To:"
          type="text"
          id="receipient_name"
          name="receipient_name"
          value={formData.receipient_name}
          onChange={handleInputChange}
          className={inputFieldClasses}
          labelClasses={inputLabelClasses}
        />
        <Input
          label="Phone Number:"
          type="text"
          id="to_number"
          name="to_number"
          value={formData.to_number}
          onChange={handleInputChange}
          className={inputFieldClasses}
          labelClasses={inputLabelClasses}
        />
      </div>

      <div className="w-2xl mt-3">
        <div>
          <label
            htmlFor="message_body"
            className="block text-sm font-medium text-gray-800"
          >
            Message:
          </label>
          <textarea
            id="message_body"
            name="message_body"
            rows="3"
            value={formData.message_body}
            onChange={handleInputChange}
            className={inputFieldClasses}
            labelClasses={inputLabelClasses}
          />
        </div>
      </div>
      <SubmitBtn
        label={isPending ? 'Sending...' : 'Send SMS'}
        disabled={isPending}
      />
      {error && <p className="text-red-500 mt-2">Error: {error.message}</p>}
    </form>
  );
}
