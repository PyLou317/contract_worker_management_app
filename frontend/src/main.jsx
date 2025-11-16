import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router';

import Dashboard from '@/pages/Dashboard/DashboardPage';
import Workers from '@/pages/WorkerListPage/WorkersPage';
import Skills from '@/pages/SkillsPage/SkillsPage';
import Scheduling from '@/pages/Scheduling/SchedulingPage';
import Schedule from '@/pages/Scheduling/EditScheduleModal/Schedule';
import CreateScheduleComponent from '@/pages/Scheduling/CreateSchedule/CreateScheduleForm';
import SchedulingPage from '@/pages/Scheduling/ViewSchedules/SchedulingPage';
import CalendarComponent from '@/pages/Scheduling/Calendar/Calendar';
import MessagingPage from '@/pages/Messaging/MessagingPage';
import SendMessage from '@/pages/Messaging/SendMessage';
import RequestWorkers from '@/pages/Messaging/RequestWorkers.jsx';
import LoginPage from '@/components/Authentication/LoginPage';
import SettingsPage from '@/pages/Settings/SettingsPage.jsx';
import AccountPage from '@/pages/Settings/Account/AccountPage.jsx';
import AgenciesPage from '@/pages/Settings/Agencies/AgenciesPage.jsx';
import ManagersPage from '@/pages/Settings/Managers/ManagersPage.jsx';

import './index.css';
import App from './App.jsx';

const client = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Dashboard />} />
            <Route path="workers" element={<Workers />} />
            <Route path="skills" element={<Skills />} />
            <Route path="scheduling" element={<Scheduling />}>
              <Route
                path="create-schedule"
                element={<CreateScheduleComponent />}
              />
              <Route path="view-schedules" element={<SchedulingPage />}>
                <Route path=":scheduleId" element={<Schedule />} />
              </Route>
              <Route path="calendar" element={<CalendarComponent />} />
            </Route>
            <Route path="messaging" element={<MessagingPage />}>
              <Route path="request-workers" element={<RequestWorkers />} />
            </Route>
            <Route path="settings" element={<SettingsPage />}>
              <Route path="account" element={<AccountPage />} />
              <Route path="agencies" element={<AgenciesPage />} />
              <Route path="managers" element={<ManagersPage />} />
            </Route>
          </Route>
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
