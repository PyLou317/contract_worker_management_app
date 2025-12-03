import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/utilities/apiClient';

import { ManagerPageContext } from './manager-page-context';

import PageHeader from '@/pages/Settings/PageHeader';
import PageContainer from '@/components/PageContainer';
import ManagersList from '@/pages/Settings/Managers/ManagersList';
import AddManagerForm from '@/pages/Settings/Managers/AddManagerForm';

export default function ManagersPage() {
  const [toggleAddManager, setToggleAddManager] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['managers'],
    queryFn: () => apiFetch('/managers'),
    keepPreviousData: true,
  });
  const managers = data?.results || [];

  const handleToggleAddManager = () => {
    setToggleAddManager(!toggleAddManager);
  };

  const ctxValue = {
    toggleAddManager: toggleAddManager,
    setToggleAddManager: setToggleAddManager,
    handleToggleAddManager: handleToggleAddManager,
    managers: managers,
    isPending: isPending,
    isFetching: isFetching,
    error: error,
    setShowSuccess: setShowSuccess,
  };

  return (
    <ManagerPageContext.Provider value={ctxValue}>
      <PageContainer>
        <PageHeader
          heading="managers"
          label="manager"
          count={managers.length}
        />
        {showSuccess && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">Agency added successfully!</span>
          </div>
        )}
        <AddManagerForm />
        <ManagersList />
      </PageContainer>
    </ManagerPageContext.Provider>
  );
}
