import { MessageContext } from './message-page-context';
import { Outlet } from 'react-router';

import NavTabs from '@/components/NavBars/PageTopNavMenu';
import tabItems from '@/pages/Messaging/tab-menu-items';

export default function MessagingPage() {
  const ctxValue = {};
  return (
    <MessageContext.Provider value={{ ctxValue }}>
      <NavTabs tabItems={tabItems} />
      <Outlet />
    </MessageContext.Provider>
  );
}
