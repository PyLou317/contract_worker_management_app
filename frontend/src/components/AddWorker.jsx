import { useState, useRef } from 'react';

export default function AddWorkerModal({ showModal, onClose, onAddWorker }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    current_contract: '',
    agency: '',
  });

  const dialogRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the parent component's onAddWorker function
    onAddWorker(formData);
    // Reset the form after submission
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      current_contract: '',
      agency: '',
    });
    // Close the modal
    onClose();
  };

  // The 'show' property on the dialog element is controlled by the parent component,
  // making it visible or hidden.
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
        showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-gray-800/75 absolute inset-0" onClick={onClose}></div>
      <dialog
        ref={dialogRef}
        className={` bg-gray-900 text-white p-8 rounded-2xl shadow-xl max-w-lg w-full transform transition-transform duration-300 relative ${
          showModal ? 'scale-100' : 'scale-95'
        }`}
        open={showModal}
        onClose={onClose}
      >
        <div className="flex justify-between items-center pb-3">
          <h3 className="text-2xl font-semibold text-white">Add New Worker</h3>
          <button onClick={onClose} className="text-gray-200 hover:text-gray-700">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-200">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              required
              autoFocus
              className="mt-1 p-2 block w-full rounded-md border bg-gray-800 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-200">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 block w-full rounded-md border bg-gray-800 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-200">
              Phone Number
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="current_contract" className="block text-sm font-medium text-gray-200">
              Current Contract
            </label>
            <input
              type="text"
              id="current_contract"
              name="current_contract"
              value={formData.current_contract}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="agency" className="block text-sm font-medium text-gray-200">
              Agency
            </label>
            <input
              type="text"
              id="agency"
              name="agency"
              value={formData.agency}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Worker
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
