import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteWorker } from '../../api/deleteWorker';

const queryClient = useQueryClient();

const deleteWorkerMutation = useMutation({
  mutationFn: () => deleteWorker({ workerId: workerId }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['worker'] });
    queryClient.invalidateQueries({ queryKey: ['workers'] });
  },
  onError: (error) => {
    console.error('Error editing worker:', error);
    alert('Failed to edit worker. Please try again. ' + error.message);
  },
});

export default deleteWorkerMutation;
