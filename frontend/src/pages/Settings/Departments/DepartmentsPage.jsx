import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/utilities/apiClient';

import { DepartmentPageContext } from './department-page-context';

import PageHeader from '@/pages/Settings/PageHeader';
import PageContainer from '@/components/PageContainer';
import AreasList from '@/pages/Settings/Departments/DepartmentsList';
import AddAreaForm from '@/pages/Settings/Departments/AddDepartmentForm';

export default function AreasPage() {
  const [toggleAddArea, setToggleAddArea] = useState(false);

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['areas'],
    queryFn: () => apiFetch('/areas'),
    keepPreviousData: true,
  });
  const areas = data?.results || [];

  const handleToggleAddArea = () => {
    setToggleAddArea(!toggleAddArea);
  };

  const ctxValue = {
    toggleAddArea: toggleAddArea,
    setToggleAddManager: setToggleAddArea,
    handleToggleAddArea: handleToggleAddArea,
    areas: areas,
    isPending: isPending,
    isFetching: isFetching,
    error: error,
  };

  return (
    <DepartmentPageContext.Provider value={ctxValue}>
      <PageContainer>
        <PageHeader
          heading="areas"
          label="area"
          count={areas.length}
        />
        <AddAreaForm />
        <AreasList />
      </PageContainer>
    </DepartmentPageContext.Provider>
  );
}
