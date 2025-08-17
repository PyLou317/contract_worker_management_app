import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import SearchBar from './Search';
import Pagination from './Pagination';

export default function WorkerListTable() {
  const [searchTerm, setSearchTerm] = useState('');

  // Use URLSearchParams to get the initial page number from the URL
  const searchParams = new URLSearchParams(window.location.search);
  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const [page, setPage] = useState(initialPage);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  const updateUrl = (newPage) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', newPage);
    window.history.pushState(null, '', `?${params.toString()}`);
    console.log(params.toString());
  };

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['workers', searchTerm, page],
    queryFn: async () => {
      const url = `http://127.0.0.1:8000/api/workers/?search=${searchTerm}&page=${page}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(page);
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

  console.log(prevUrl);
  console.log(nextUrl);

  return (
    <div className="container mx-auto p-8 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Employee Roster</h2>
      <div className="overflow-x-auto">
        <div>
          <SearchBar onSearch={handleSearch} />
        </div>
        <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left border-r border-gray-300">Id</th>
              <th className="py-3 px-6 text-left border-r border-gray-300">Name</th>
              <th className="py-3 px-6 text-left border-r border-gray-300">Agency</th>
              <th className="py-3 px-6 text-left">Rating</th>
              <th className="py-3 px-6 text-left">Notes</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {workers.map((worker) => (
              <tr key={worker.id} className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200">
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
                <td className="py-3 px-6 text-left">{worker.comment}</td>
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
  );
}
