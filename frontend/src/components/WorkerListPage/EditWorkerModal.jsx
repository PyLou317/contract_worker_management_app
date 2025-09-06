import { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import refreshToken from '../../api/refreshToken';
import attemptFetch from '../../api/attemptFetch';
import Input from '../Inputs/StandardInput';
import SelectInput from '../Inputs/SelectInput';

import { getAgencies } from '../../api/getAgencyDataApi';
import { getWorkerDetails } from '../../api/getWorkerDetailApi';

const editWorker = async (formData) => {
  let authToken = localStorage.getItem('authToken');

  if (!authToken) {
    throw new Error('Authentication token not found. Please log in.');
  }

  try {
    const response = await attemptFetch(authToken);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized');
      }
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An unknown error occurred.');
      } catch (error) {
        throw new Error(`Server returned an error: ${response.status} ${response.statusText}`);
      }
    }

    return await response.json();
  } catch (error) {
    if (error.message === 'Unauthorized') {
      console.log('Token expired. Attempting to refresh...');
      try {
        const newAuthToken = await refreshToken();
        const newResponse = await attemptFetch(newAuthToken);
        if (!newResponse.ok) {
          throw new Error('Failed to refresh token');
        }
        return await newResponse.json();
      } catch (refreshError) {
        throw new Error('Session expired. Please log in again.');
      }
    } else {
      throw error;
    }
  }
};

export default function EditWorkerModal({ showModal, onClose, editingWorker, id }) {
  const contract = ['Hello Fresh'];

  const {
    data: workerData,
    isPending: workerIsPending,
    error: workerError,
  } = useQuery({
    queryKey: ['worker', id],
    queryFn: () => getWorkerDetails({ workerId: id }),
    enabled: !!id, // Only run this query if an ID exists
  });

  const {
    isPending: agenciesPending,
    error: agenciesError,
    data: agenciesData,
  } = useQuery({
    queryKey: ['agencies'],
    queryFn: getAgencies,
    keepPreviousData: true,
  });

  const agencies = agenciesData?.results || [];
  const agencyNames = agencies.map((agency) => agency.name);

  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    agency: '',
    manager: '',
    comment: '',
    attendance_score: '',
    performance_score: '',
    communication_score: '',
    skills_score: '',
  });

  useEffect(() => {
    // Check if workerData is not null or undefined
    if (workerData) {
      const ratings = workerData.ratings?.[0] || [];

      setFormData({
        first_name: workerData.first_name || '',
        last_name: workerData.last_name || '',
        email: workerData.email || '',
        phone_number: workerData.phone_number || '',
        agency: workerData.agency_details || '',
        manager_first_name: ratings.manager?.first_name || '',
        comment: ratings.comment || '',
        attendance_score: ratings.attendance_score || '',
        performance_score: ratings.performance_score || '',
        communication_score: ratings.communication_score || '',
        skills_score: ratings.skills_score || '',
      });
    }
  }, [workerData]);

  const dialogRef = useRef(null);

  const editWorkerMutation = useMutation({
    mutationFn: editWorker,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['worker'] });
      onClose();
    },
    onError: (error) => {
      console.error('Error editing worker:', error);
      alert('Failed to edit worker. Please try again. ' + error.message);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editWorkerMutation.mutate(formData);
  };

  // Conditionally render based on loading/error states
  if (workerIsPending) {
    return <div>Loading worker data...</div>;
  }
  if (workerError) {
    return <div>Error loading worker data: {workerError.message}</div>;
  }
  if (agenciesPending) {
    return <div>Loading agencies...</div>;
  }
  if (agenciesError) {
    return <div>Error loading agencies: {agenciesError.message}</div>;
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
        showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-gray-800/75 absolute inset-0" onClick={onClose}></div>
      <dialog
        ref={dialogRef}
        className={` bg-gray-900 text-white p-8 rounded-2xl shadow-xl w-full sm:w-2/3 md:w-1/2 transform transition-transform duration-300 relative h-full sm:h-screen md:h-3/4 overflow-y-auto ${
          showModal ? 'scale-100' : 'scale-95'
        }`}
        open={showModal}
        onClose={onClose}
      >
        <div className="flex justify-between pb-3 mb-8 border-b border-gray-700">
          <h3 className="text-4xl font-semibold text-white">Edit Worker</h3>
          <button onClick={onClose} className="text-gray-200 hover:text-gray-700">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <h3 className="text-2xl font-semibold text-white mb-4">Personal Details</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Last Name"
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Email"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Phone Number"
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              required
            />
            {/* <div>
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
            </div> */}
            {/* <div>
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
            </div> */}
            {/* <div>
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
            </div> */}
          </div>

          <div className="border-b border-gray-700 mt-4"></div>

          <h3 className="text-2xl font-semibold text-white mb-4 mt-12">Work Details</h3>
          <div>
            <div className="grid grid-cols-2 gap-4">
              <SelectInput
                label="Agency"
                type="text"
                id="agency"
                name="agenct"
                value={formData.agency}
                onChange={handleInputChange}
                options={agencyNames}
              />
              <Input
                label="Manager"
                type="text"
                id="manager"
                name="manager"
                value={formData.manager}
                onChange={handleInputChange}
                required
              />
              {/* <div>
                <label htmlFor="agency" className="block text-sm font-medium text-gray-200">
                  Agency
                </label>
                <select
                  id="agency"
                  name="agency"
                  value={formData.agency}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {agencyNames.map((agency) => (
                    <option key={agency} value={agency}>
                      {agency}
                    </option>
                  ))}
                </select>
              </div> */}
              {/* <div>
                <label htmlFor="manager" className="block text-sm font-medium text-gray-200">
                  Manager
                </label>
                <input
                  type="text"
                  id="mananger"
                  name="manager_first_name"
                  value={formData.manager_first_name ? formData.manager_first_name : ''}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div> */}
            </div>
          </div>

          <div className="border-b border-gray-700 mt-4"></div>

          <div className="flex justify-between items-center align-baseline mt-12">
            <div>
              <h2 className="text-2xl font-semibold text-white">Ratings</h2>
              <small>Each rating is out of 5 and will produce an average overal rating</small>
            </div>
            <p className="text-black font-semibold text-center bg-yellow-300 px-4 py-2 rounded-md">
              Average Rating:{' '}
              {workerData.ratings?.[0]?.average_rating ? workerData.ratings?.[0]?.average_rating : 'N/A'}
            </p>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-4">
            <Input
              step="0.25"
              min="0"
              max="5"
              label="Attendance"
              type="number"
              id="attendance_score"
              name="attendance_score"
              value={formData.attendance_score}
              onChange={handleInputChange}
              required
            />
            <Input
              step="0.25"
              min="0"
              max="5"
              label="Communication"
              type="number"
              id="communication_score"
              name="communication_score"
              value={formData.communication_score}
              onChange={handleInputChange}
              required
            />
            <Input
              step="0.25"
              min="0"
              max="5"
              label="Performance"
              type="number"
              id="performance_score"
              name="performance_score"
              value={formData.performance_score}
              onChange={handleInputChange}
              required
            />
            <Input
              step="0.25"
              min="0"
              max="5"
              label="Skills"
              type="number"
              id="skills_score"
              name="skills_score"
              value={formData.skills_score}
              onChange={handleInputChange}
              required
            />
            {/* <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 text-center">
                Attendance
              </label>
              <input
                type="number"
                step="0.25"
                min="0"
                max="5"
                id="attendance"
                name="attendance_score"
                value={formData.attendance_score}
                onChange={handleInputChange}
                required
                className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-center"
              />
            </div> */}
            {/* <div>
              <label htmlFor="communication_score" className="block text-sm font-medium text-gray-200 text-center">
                Communication
              </label>
              <input
                type="number"
                step="0.25"
                min="0"
                max="5"
                id="communication"
                name="communication_score"
                value={formData.communication_score}
                onChange={handleInputChange}
                required
                className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-center"
              />
            </div> */}
            {/* <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 text-center">
                Performance
              </label>
              <input
                type="number"
                step="0.25"
                min="0"
                max="5"
                id="performance"
                name="performance_score"
                value={formData.performance_score}
                onChange={handleInputChange}
                required
                className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-center"
              />
            </div> */}
            {/* <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 text-center">
                Skills
              </label>
              <input
                type="number"
                step="0.25"
                min="0"
                max="5"
                id="skills"
                name="skills_score"
                value={formData.skills_score}
                onChange={handleInputChange}
                required
                className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-center"
              />
            </div> */}
          </div>
          <div className="border-b border-gray-700 mt-4"></div>
          <div>
            <h3 className="text-2xl font-semibold text-white mt-12">Comments</h3>
            <div>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                value={formData.comment}
                onChange={handleInputChange}
                required
                className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
              disabled={editWorkerMutation.isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              disabled={editWorkerMutation.isPending}
            >
              {editWorkerMutation.isPending ? 'Adding...' : editingWorker ? 'Save Changes' : 'Add Worker'}
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
