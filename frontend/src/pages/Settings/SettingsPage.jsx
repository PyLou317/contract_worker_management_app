import { Outlet } from 'react-router';

import NavTabs from '@/components/NavBars/PageTopNavMenu';
import tabItems from '@/pages/Settings/tab-menu-items';

export default function SettingsPage() {
  return (
    <>
      <NavTabs tabItems={tabItems} />
      <Outlet />
    </>
  );
}
