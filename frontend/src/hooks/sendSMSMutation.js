import { useMutation, useQueryClient } from '@tanstack/react-query';
import sendData from '@/hooks/sendData';

export function useSendSMSMutation({ setFormData }) {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (formData) =>
      sendData(formData, '/sms/schedule_made_notification/', 'POST'),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['message'] });
      setFormData({
        receipient_name: '',
        to_number: '',
        message_body: '',
      });
    },
    onError: (error) => {
      console.error('Error sending sms:', error);
      alert('Failed to send sms. Please try again. ' + error.message);
    },
  });
  return { mutate, isPending, error };
}
