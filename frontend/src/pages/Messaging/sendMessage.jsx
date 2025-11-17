import React from 'react';
import { useState } from 'react';
import { useSendSMSMutation } from '@/hooks/sendSMSMutation';

import PageContainer from '@/components/PageContainer';
import Input from '@/components/Inputs/LabeledInput';
import sendData from '@/hooks/sendData';
import SubmitBtn from '@/components/Buttons/SubmitBtn';
import SectionHeader from '@/pages/WorkerListPage/EditWorkerModal/SectionHeader';

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
      to_number: cleanedNumber.startsWith('+1')
        ? cleanedNumber
        : '+1' + cleanedNumber,
    };
    sendSMSMutation(dataToSend);
    console.log(formData);

    setFormData({
      receipient_name: '',
      to_number: '',
      message_body: '',
    });
  };

  return (
    <PageContainer>
      <SectionHeader title="Send Message" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4 mt-10">
          <Input
            label="Receipient Name"
            type="text"
            id="receipient_name"
            name="receipient_name"
            placeholder="To:"
            value={formData.receipient_name}
            onChange={handleInputChange}
          />
          <Input
            label="Phone Number"
            type="text"
            id="to_number"
            name="to_number"
            placeholder="Phone Number"
            value={formData.to_number}
            onChange={handleInputChange}
          />
        </div>

        <div className="relative mt-12 mb-8">
          <textarea
            id="message_body"
            name="message_body"
            placeholder="Message"
            rows={2}
            value={formData.message_body}
            onChange={handleInputChange}
            className="peer p-2 block w-full placeholder-transparent bg-white rounded-t-lg caret-gray-800 text-gray-800 border-b-2 border-b-gray-600 focus:border-yellow-500 focus:outline-none mt-8"
          ></textarea>
          <label
            htmlFor="message_body"
            className="peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 absolute text-gray-400 left-0 -top-5.5 text-sm transition-all cursor-text"
          >
            Message
          </label>
        </div>

        <SubmitBtn
          label={isPending ? 'Sending...' : 'Send SMS'}
          disabled={isPending}
        />
        {error && <p className="text-red-500 mt-2">Error: {error.message}</p>}
      </form>
    </PageContainer>
  );
}
