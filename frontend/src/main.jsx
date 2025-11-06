import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router';

import Dashboard from '@/pages/Dashboard/DashboardPage';
import Workers from '@/pages/WorkerListPage/WorkersPage';
import Skills from '@/pages/SkillsPage/SkillsPage';
import Scheduling from '@/pages/Scheduling/SchedulingPage';
import Schedule from '@/pages/Scheduling/EditScheduleModal/Schedule';
import Messaging from '@/pages/Messaging/MessagingPage';
import LoginPage from '@/components/Authentication/LoginPage';

import './index.css';
import App from './App.jsx';

const client = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="workers" element={<Workers />} />
            <Route path="skills" element={<Skills />} />
            <Route path="scheduling" element={<Scheduling />}>
              <Route path=":scheduleId" element={<Schedule />} />
            </Route>
            <Route path="messaging" element={<Messaging />} />
            {/* <Route path="settings" element={<Settings />} /> */}
          </Route>
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
