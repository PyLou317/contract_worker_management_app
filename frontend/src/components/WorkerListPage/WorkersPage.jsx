import { useState } from 'react';

import WorkerListTable from './WorkerListTable';
import Header from './WorkerTableHeader';

// We can assume by this point that `isSuccess === true`
export default function Workers() {
  const searchParams = new URLSearchParams(window.location.search);
  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(initialPage);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handleOpenAddWorkerModal = () => {
    setIsModalOpen(true);
    console.log('Modal opened');
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Employee Roster</h2>
      <Header handleSearch={handleSearch} handleOpenAddWorkerModal={handleOpenAddWorkerModal} searchTerm={searchTerm} />
      <WorkerListTable searchTerm={searchTerm} page={page} setPage={setPage} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}
