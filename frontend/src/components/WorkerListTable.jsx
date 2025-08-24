import { useState } from 'react';
import { useRef } from 'react';

import { useQuery } from '@tanstack/react-query';
import SearchBar from './Search';
import Pagination from './Pagination';
import AddWorkerModal from './AddWorker';

export default function WorkerListTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorker, setEditingWorker] = useState(null);

  // Use URLSearchParams to get the initial page number from the URL
  const searchParams = new URLSearchParams(window.location.search);
  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const [page, setPage] = useState(initialPage);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddWorker = (newWorkerData) => {
    console.log('Adding new worker:', newWorkerData);
    // You'll need to add your API call here to submit the data to your backend
    // After a successful API call, you would likely refetch the data to update the table
    // For example: queryClient.invalidateQueries(['workers']);
  };

  const updateUrl = (newPage) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', newPage);
    window.history.pushState(null, '', `?${params.toString()}`);
    console.log(params.toString());
  };

  const handleEditWorker = (worker, workerId) => {
    setEditingWorker(worker);
    console.log('Edit worker with ID:', workerId);
  };

  const handleDeleteWorker = (workerId) => {
    console.log('Delete worker with ID:', workerId);
    // You can add your modal or API call here
  };

  const endpoint = `${import.meta.env.VITE_API_URL}/workers/`;

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['workers', searchTerm, page],
    queryFn: async () => {
      const url = `${endpoint}?search=${searchTerm}&page=${page}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    },
    keepPreviousData: true,
  });

  if (isPending) return <svg className="mr-3 size-5 animate-spin" viewBox="0 0 24 24"></svg>;

  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-red-100 text-red-700 p-4 rounded-lg">
        An error has occurred: {error.message}
      </div>
    );

  const workers = data.results || [];
  const nextUrl = data.next;
  const prevUrl = data.previous;

  return (
    <>
      <div className="container mx-auto p-8 bg-white shadow-xl rounded-2xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Employee Roster</h2>
        <div className="overflow-x-auto">
          <div className="flex justify-between items-center gap-3">
            <SearchBar onSearch={handleSearch} />
            <button
              onClick={handleOpenModal}
              className="text-blue-500 hover:text-blue-700 transition-colors duration-200 cursor-pointer"
              aria-label="Add worker"
            >
              Add Worker
            </button>
          </div>
          <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left border-r border-gray-300">Id</th>
                <th className="py-3 px-6 text-left border-r border-gray-300">Name</th>
                <th className="py-3 px-6 text-left border-r border-gray-300">Agency</th>
                <th className="py-3 px-6 text-left">Rating</th>
                <th className="py-3 px-6 text-left">Notes</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {workers.map((worker) => (
                <tr
                  key={worker.id}
                  className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap border-r border-gray-200">{worker.id}</td>
                  <td className="py-3 px-6 text-left border-r border-gray-200">
                    {worker.first_name} {worker.last_name}
                  </td>
                  <td className="py-3 px-6 text-left border-r border-gray-200">{worker.agency}</td>
                  <td className="py-3 px-6 text-left border-r border-gray-200">
                    <span className="text-yellow-400">
                      {worker.average_rating
                        ? worker.average_rating + ' - ' + '★'.repeat(worker.average_rating)
                        : 'No Rating'}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left border-r border-gray-200">{worker.comment}</td>
                  <td className="py-3 px-6 text-left border-r border-gray-200">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditWorker(worker, worker.id)}
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
          isFetching={isFetching}
          updateUrl={updateUrl}
        />
      </div>
      {/* The Add Worker Modal component */}
      <AddWorkerModal showModal={isModalOpen} onClose={handleCloseModal} onAddWorker={handleAddWorker} />
    </>
  );
}
