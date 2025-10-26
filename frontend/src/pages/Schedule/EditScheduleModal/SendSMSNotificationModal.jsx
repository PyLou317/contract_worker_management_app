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
          <h1 className="text-2xl font-semibold text-gray-100 mb-4">
            SMS Notification
          </h1>
          <div className="border border-b-gray-700 my-2"></div>
          <p className="text-gray-200 mb-4">
            You are about to send an SMS notification to {workerCount} workers
            notifying them of their schedule.
            <br />
            <p className='text-gray-200 my-4'>Are you sure you want to continue?</p>
          </p>
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
