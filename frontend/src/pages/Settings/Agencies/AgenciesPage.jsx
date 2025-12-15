import PageContainer from '@/components/PageContainer';
import SectionHeader from '@/pages/WorkerListPage/EditWorkerModal/SectionHeader';
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
    <PageContainer>
      <SectionHeader title="Agencies Settings" />
      <AddAgencyForm />
      <div className="mt-8 w-full border-t border-gray-200"></div>
      <AgenciesList />
    </PageContainer>
  );
}
