import React from 'react';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Input from '@/components/Inputs/LabeledInput';
import sendData from '@/hooks/sendData';
import SubmitBtn from '@/components/Buttons/SubmitBtn';

export default function SendSMSMessage() {
  const [sendSMS, setSendSMS] = useState(false);
  const [formData, setFormData] = useState({
    receipient_name: '',
    to_number: '',
    message_body: '',
  });

  const queryClient = useQueryClient();
  const sendSMSMutation = useMutation({
    mutationFn: () => sendData(formData, '/sms/schedule_made_notification/'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['message'] });
      setFormData({
        receipient_name: '',
        to_number: '',
        message_body: '',
      });
      setSendSMS(false);
    },
    onError: (error) => {
      console.error('Error sending sms:', error);
      alert('Failed to send sms. Please try again. ' + error.message);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSendSMS(true);
    const new_to_number = formData.to_number;
    setFormData({ ...formData, to_number: '+' + new_to_number });
    sendSMSMutation.mutate();
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
        label={
          sendSMSMutation.isPending
            ? 'Sending...'
            : sendSMS
            ? 'Send SMS'
            : 'Send SMS'
        }
        disabled={sendSMSMutation.isPending}
      />
    </form>
  );
}
