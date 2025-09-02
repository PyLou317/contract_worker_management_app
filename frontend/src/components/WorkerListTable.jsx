import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getWorkers } from '../api/getWorkersApi';
import { Rating } from 'react-simple-star-rating';

import './StarRatingStyles.css';
import Pagination from './Pagination';
import AddWorkerModal from './AddWorkerModal';
import EditWorkerModal from './EditWorkerModal';

export default function WorkerListTable({ searchTerm, page, setPage, isModalOpen, setIsModalOpen }) {
  const [ordering, setOrdering] = useState('');
  const [editingWorker, setEditingWorker] = useState(false);
  const [hoveredWorkerId, setHoveredWorkerId] = useState(null);
  const [editingWorkerId, setEditingWorkerId] = useState(null);

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

  const handleDeleteWorker = (workerId) => {
    console.log('Delete worker with ID:', workerId);
    // TODO add modal or API call here
  };

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['workers', searchTerm, page, ordering],
    queryFn: getWorkers,
    keepPreviousData: true,
  });

  if (isPending || isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg className="mr-3 size-10 animate-spin text-blue-500" viewBox="0 0 24 24"></svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="flex justify-center items-center h-auto w-1/3 mx-auto bg-red-100 text-red-700 p-4 rounded-lg">
          An error has occurred: {error.message}
        </div>
      </div>
    );
  }

  const workers = data?.results || [];
  const nextUrl = data.next;
  const prevUrl = data.previous;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left border-r border-gray-300">Id</th>
              <th className="py-3 px-6 text-left border-r border-gray-300">Name</th>
              <th className="py-3 px-6 text-left border-r border-gray-300">Position</th>
              <th className="py-3 px-6 text-left border-r border-gray-300">Agency</th>
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
              <th className="py-3 px-6 text-left">Comments</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {workers.map((worker) => (
              <tr key={worker.id} className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                <td className="py-3 px-6 text-left whitespace-nowrap border-r border-gray-200">{worker.id}</td>
                <td className="py-3 px-6 text-left border-r border-gray-200">
                  {worker.first_name} {worker.last_name}
                </td>
                <td className="py-3 px-6 text-left border-r border-gray-200">{worker.position_display}</td>
                <td className="py-3 px-6 text-left border-r border-gray-200">{worker.agency_details}</td>
                <td
                  className="py-3 px-6 text-left border-r border-gray-200 relative"
                  onMouseEnter={() => setHoveredWorkerId(worker.id)}
                  onMouseLeave={() => setHoveredWorkerId(null)}
                >
                  {hoveredWorkerId === worker.id && (
                    <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 mb-2 bg-white border border-gray-300 p-2 rounded shadow-lg text-sm z-10 whitespace-nowrap">
                      {worker.average_rating} out of 5
                    </div>
                  )}
                  <Rating initialValue={worker.average_rating} {...starRating} />
                </td>
                <td className="py-3 px-6 text-left border-r border-gray-200">{worker.comment}</td>
                <td className="py-3 px-6 text-left border-r border-gray-200">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleOpenEditWorker(worker.id)}
                      className="text-blue-500 hover:text-blue-700 transition-colors duration-200 cursor-pointer"
                      aria-label="Edit worker"
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
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteWorker(worker.id)}
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
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={data.count}
        nextUrl={nextUrl}
        prevUrl={prevUrl}
        //   isFetching={isFetching}
        updateUrl={updateUrl}
      />

      <AddWorkerModal showModal={isModalOpen} onClose={handleCloseAddWorkerModal} onAddWorker={handleAddWorker} />
      {editingWorker && (
        <EditWorkerModal
          showModal={editingWorker}
          onClose={() => setEditingWorker(false)}
          editingWorker={editingWorker}
          id={editingWorkerId}
        />
      )}
    </> 
  );
}
