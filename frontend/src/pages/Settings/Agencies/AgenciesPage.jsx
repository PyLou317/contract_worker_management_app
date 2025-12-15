import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/utilities/apiClient';

import { AgencyPageContext } from './agency-page-context';

import PageContainer from '@/components/PageContainer';
import PageHeader from '@/pages/Settings/PageHeader';
import AddAgencyForm from '@/pages/Settings/Agencies/AddAgencyForm';
import AgenciesList from '@/pages/settings/Agencies/AgenciesList';

export default function AgenciesPage() {
  const [toggleAddAgency, setToggleAddAgency] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['agencies'],
    queryFn: () => apiFetch('/agencies'),
    keepPreviousData: true,
  });
  const agencies = data?.results || [];

  const handleToggleAddAgency = () => {
    setToggleAddAgency(!toggleAddAgency);
  };

  const ctxValue = {
    toggleAddAgency: toggleAddAgency,
    setToggleAddAgency: setToggleAddAgency,
    handleToggleAddAgency: handleToggleAddAgency,
    agencies: agencies,
    isPending: isPending,
    isFetching: isFetching,
    error: error,
    setShowSuccess: setShowSuccess,
  };

  return (
    <AgencyPageContext.Provider value={ctxValue}>
      <PageContainer>
        <PageHeader heading="agencies" label="agency" count={agencies.length} />
        {showSuccess && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">
              Agency updated successfully!
            </span>
          </div>
        )}
        <AddAgencyForm />
        <AgenciesList />
      </PageContainer>
    </AgencyPageContext.Provider>
  );
}
