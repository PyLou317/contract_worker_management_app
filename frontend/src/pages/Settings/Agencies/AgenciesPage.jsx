import PageContainer from '@/components/PageContainer';
import SectionHeader from '@/pages/WorkerListPage/EditWorkerModal/SectionHeader';
import AddAgencyForm from '@/pages/Settings/Agencies/AddAgencyForm';
import AgenciesList from '@/pages/settings/Agencies/AgenciesList';

export default function AgenciesPage() {
  return (
    <PageContainer>
      <SectionHeader title="Agencies Settings" />
      <AddAgencyForm />
      <div className="mt-8 w-full border-t border-gray-200"></div>
      <AgenciesList />
    </PageContainer>
  );
}
