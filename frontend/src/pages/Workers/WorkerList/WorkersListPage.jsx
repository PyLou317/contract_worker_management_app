import { useState } from 'react';

import WorkerListTable from './WorkerListTable';
import Header from './WorkerTableHeader';
import SectionHeader from '@/components/SectionHeader';
import PageContainer from '@/components/PageContainer';

import { Outlet, useParams } from 'react-router';

export default function Workers() {
  const searchParams = new URLSearchParams(window.location.search);
  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(initialPage);
  const { workerId } = useParams();

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handleOpenAddWorkerModal = () => {
    setIsModalOpen(true);
  };

  return (
    <PageContainer>
      {workerId ? (
        <Outlet />
      ) : (
        <>
          <SectionHeader title="Employee Roster" />
          <Header
            handleSearch={handleSearch}
            handleOpenAddWorkerModal={handleOpenAddWorkerModal}
            searchTerm={searchTerm}
          />
          <WorkerListTable
            searchTerm={searchTerm}
            page={page}
            setPage={setPage}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </>
      )}
    </PageContainer>
  );
}
