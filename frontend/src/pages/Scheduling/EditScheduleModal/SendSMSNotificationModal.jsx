import Modal from '@/components/Modals/Modal';

export default function SMSNotificationModal({
  show,
  onClose,
  workerCount,
  sendSMS,
}) {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex flex-col">
        <div className="text-center my-2">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Worker Schedule Notification
          </h1>
          <div className="border border-b-gray-700"></div>
          <p className="text-gray-800 my-6">
            You are about to send a SMS and Email notification to {workerCount}{' '}
            workers
            <br />
            notifying them of their schedule.
          </p>
          <p className="mt-4">Are you sure you want to continue?</p>
        </div>
        <div className="gap-2 flex justify-center items-center mb-4">
          <button
            className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-500 transition-colors duration-200 text-white font-medium"
            onClick={sendSMS}
          >
            Send
          </button>
          <button
            className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors duration-200 text-white font-medium"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
