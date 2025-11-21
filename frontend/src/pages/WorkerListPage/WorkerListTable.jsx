import { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/utilities/apiClient';
import { Rating } from 'react-simple-star-rating';

import '@/components/StarRatingStyles.css';
import '@/utilities/toolTipStyles.css';

import Pagination from '@/components/Pagination';
import AddWorkerModal from './AddWorkerModal/AddWorkerModal';
import EditWorkerModal from './EditWorkerModal/EditWorkerModal';
import skillColorClasses from '@/pages/SkillsPage/SkillColorClasses';
import DeleteWarningModal from './DeleteWarningModal';
import LoadingSpinner from '@/components/Loader';

export default function WorkerListTable({
  searchTerm,
  page,
  setPage,
  isModalOpen,
  setIsModalOpen,
}) {
  const [ordering, setOrdering] = useState('');
  const [editingWorker, setEditingWorker] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [hoveredWorkerId, setHoveredWorkerId] = useState(null);
  const [editingWorkerId, setEditingWorkerId] = useState(null);
  const [deletingWorkerId, setDeletingWorkerId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const starRating = {
    size: 24,
    allowFraction: true,
    readonly: true,
    allowHover: false,
    fillColor: '#ffd700',
  };

  const handleRatingSort = () => {
    if (ordering === 'avg_rating') {
      setOrdering(`-avg_rating`);
    } else {
      setOrdering('avg_rating');
    }
    setPage(1);
  };

  const handleCloseAddWorkerModal = () => {
    setIsModalOpen(false);
  };

  const handleAddWorker = (newWorkerData) => {
    console.log('Adding new worker:', newWorkerData);
  };

  const updateUrl = (newPage) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', newPage);
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  const handleOpenEditWorker = (workerId) => {
    setEditingWorker(true);
    setEditingWorkerId(workerId);
  };

  const handleOpenDeleteWorker = (workerId) => {
    setShowDeleteModal(true);
    setDeletingWorkerId(workerId);
  };

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['workers', searchTerm, page, ordering],
    queryFn: () => {
      const params = new URLSearchParams();
      if (page > 1) {
        params.set('page', page);
      }
      if (searchTerm) {
        params.set('search', searchTerm);
      }
      if (ordering) {
        params.set('ordering', ordering);
      }
      const queryString = params.toString();
      const endpoint = `/workers/${queryString ? `?${queryString}` : ''}`;
      return apiFetch(endpoint);
    },
    keepPreviousData: true,
  });

  const workers = data?.results || [];
  const nextUrl = data?.next;
  const prevUrl = data?.previous;

  if (isFetching || isPending) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <LoadingSpinner size="10" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <div className="flex justify-center items-center h-auto w-fit mx-auto bg-red-100 text-red-700 p-4 rounded-lg">
          An error has occurred: {error.message}
        </div>
      </div>
    );
  }

  return (
    <>
      {successMessage && (
        <div className="fixed top-20 left-100 w-1/2 z-50 p-4">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{successMessage}</span>
            <span
              className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
              onClick={() => setSuccessMessage(null)}
            >
              <svg
                className="fill-current h-6 w-6 text-green-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.85l-2.651 2.99a1.2 1.2 0 1 1-1.697-1.697l2.99-2.651-2.99-2.651a1.2 1.2 0 0 1 1.697-1.697L10 8.15l2.651-2.99a1.2 1.2 0 1 1 1.697 1.697L11.85 10l2.99 2.651a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full max-h-screen table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left border-r border-gray-300">
                Id
              </th>
              <th className="py-3 px-6 text-left border-r border-gray-300">
                Name
              </th>
              <th className="py-3 px-6 text-left border-r border-gray-300">
                Position
              </th>
              <th className="py-3 px-6 text-left border-r border-gray-300">
                Agency
              </th>
              <th className="py-3 px-6 text-left">
                <div className="flex justify-between items-center">
                  Rating{' '}
                  <button
                    onClick={handleRatingSort}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      />
                    </svg>
                  </button>
                </div>
              </th>
              <th className="py-3 px-6 text-left">Skills</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {workers.length > 0 ? (
              workers.map((worker) => (
                <tr
                  key={worker.id}
                  className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap border-r border-gray-200">
                    {worker.id}
                  </td>
                  <td className="py-3 px-6 text-left border-r border-gray-200">
                    {worker.first_name} {worker.last_name}
                  </td>
                  <td className="py-3 px-6 text-left border-r border-gray-200">
                    {worker.position}
                  </td>
                  <td className="py-3 px-6 text-left border-r border-gray-200">
                    {worker.agency_details}
                  </td>
                  <td
                    className="py-3 px-6 text-left border-r border-gray-200 relative"
                    onMouseEnter={() => setHoveredWorkerId(worker.id)}
                    onMouseLeave={() => setHoveredWorkerId(null)}
                  >
                    {hoveredWorkerId === worker.id && (
                      <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 mb-2 bg-white border border-gray-300 p-2 rounded shadow-lg text-sm z-10 whitespace-nowrap">
                        {worker.rating ? worker.rating.average_rating : 'N/A'}{' '}
                        out of 5
                      </div>
                    )}
                    <Rating
                      initialValue={
                        worker.rating !== null && worker.rating.average_rating
                          ? worker.rating.average_rating
                          : 0
                      }
                      {...starRating}
                    />
                  </td>
                  <td className="text-white py-3 px-6 text-left border-r border-gray-200">
                    <div className="flex flex-wrap gap-2">
                      {worker.worker_skills !== null &&
                        worker.worker_skills?.map((skill, index) => (
                          <span
                            className={`text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md transition-colors duration-200 tooltip ${
                              skillColorClasses[skill.skill.base_color]?.[
                                skill.level
                              ] || 'bg-gray-400 hover:bg-gray-500'
                            }`}
                            key={index}
                          >
                            {skill.skill.abreviation}-Lv{skill.level}
                            <div className="tooltip-content cursor-pointer">
                              {skill.skill.skill_name} level {skill.level}
                            </div>
                          </span>
                        ))}
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left border-r border-gray-200">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleOpenEditWorker(worker.id)}
                        className="text-blue-500 hover:text-blue-700 transition-colors duration-200 cursor-pointer"
                        aria-label="Edit worker"
                      >
                        <svg
                          id="edit-schedule"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleOpenDeleteWorker(worker.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200 cursor-pointer"
                        aria-label="Delete worker"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.115H6.28a2.25 2.25 0 0 1-2.244-2.115L3.75 6.75m16.5 0H3.75m16.5 0v-1.5a1.5 1.5 0 0 0-1.5-1.5h-10.5a1.5 1.5 0 0 0-1.5 1.5v1.5m6-1.5v-3a1.5 1.5 0 0 1 1.5-1.5h1.5a1.5 1.5 0 0 1 1.5 1.5v3"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  <div className="flex justify-center items-center h-[200px]">
                    <div className="flex justify-center items-center h-auto w-fit mx-auto bg-yellow-100 text-yellow-700 p-4 rounded-lg">
                      No workers found, please add some.
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={data?.count}
        nextUrl={nextUrl}
        prevUrl={prevUrl}
        updateUrl={updateUrl}
      />

      <AddWorkerModal
        showModal={isModalOpen}
        onClose={handleCloseAddWorkerModal}
        onAddWorker={handleAddWorker}
      />
      {editingWorker && (
        <EditWorkerModal
          showModal={editingWorker}
          onClose={() => setEditingWorker(false)}
          editingWorker={editingWorker}
          id={editingWorkerId}
        />
      )}
      {showDeleteModal && (
        <DeleteWarningModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          workerId={deletingWorkerId}
          onDeleteSuccess={() => {
            setSuccessMessage('Worker successfully deleted!');
            setShowDeleteModal(false);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          }}
        >
          <h1 className="text-3xl font-semibold mb-4 text-white">
            Delete Worker
          </h1>
          <p className="text-lg font-semibold">
            Are you sure you want to delete this worker?
          </p>
          <p className="text-sm text-gray-400 mt-2">
            This action cannot be undone.
          </p>
        </DeleteWarningModal>
      )}
    </>
  );
}
