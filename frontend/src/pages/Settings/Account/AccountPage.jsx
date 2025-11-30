import PageContainer from '@/components/PageContainer';
import SectionHeader from '@/pages/WorkerListPage/EditWorkerModal/SectionHeader';
import UserDetailForm from './UserDetailsForm';

export default function AccountPage() {
  return (
    <PageContainer>
      <SectionHeader title="Account Settings" />
      <UserDetailForm />
    </PageContainer>
  );
}
