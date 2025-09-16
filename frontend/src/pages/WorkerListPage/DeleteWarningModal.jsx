import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteWorker } from '../../api/deleteWorker';

export default function DeleteWarningModal({ show, onClose, workerId, children, onDeleteSuccess }) {
  if (!show) {
    return null; // Don't render if not visible
  }

  const queryClient = useQueryClient();

  const deleteWorkerMutation = useMutation({
    mutationFn: () => deleteWorker({ workerId: workerId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['worker'] });
      queryClient.invalidateQueries({ queryKey: ['workers'] });
      onDeleteSuccess();
      onClose();
    },
    onError: (error) => {
      console.error('Error editing worker:', error);
      alert('Failed to edit worker. Please try again. ' + error.message);
    },
  });

  return (
    <div className="fixed inset-0 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-xl">
        <div className="text-white text-center mb-6">{children}</div>
        <div className="flex justify-center gap-3 mt-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            onClick={() => deleteWorkerMutation.mutate(workerId)}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
