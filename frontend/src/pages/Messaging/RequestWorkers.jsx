import { useState, useRef, useEffect } from 'react';
import { useSendSMSMutation } from '@/hooks/sendSMSMutation';
import { NavLink } from 'react-router';

import PageContainer from '@/components/PageContainer';
import Input from '@/components/Inputs/LabeledInput';
import Select from '@/components/Inputs/FloatingSelectInput';
import SubmitBtn from '@/components/Buttons/SubmitBtn';
import SectionHeader from '@/pages/WorkerListPage/EditWorkerModal/SectionHeader';

import capitalizeFirstLetter from '@/utilities/capitalizeFirstLetter'
import { apiFetch } from '@/utilities/apiClient';
import { useQuery } from '@tanstack/react-query';

import WORKER_REQUEST_TEMPLATE from '@/pages/Messaging/RequestWorkerEmailTemplate';
import SUBJECT_LINE from '@/pages/Messaging/RequestWorkerSubjectLine';
import TodaysDate from '@/utilities/TodaysDate';

const INITIAL_AGENCY_PLACEHOLDER = '[Agency Name/Contact]';

export default function RequestWorkers() {
  const successRef = useRef();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    agency_name: '',
    to_email: '',
    subject_line: SUBJECT_LINE({ TodaysDate }),
    message_body: WORKER_REQUEST_TEMPLATE({
      agencyName: INITIAL_AGENCY_PLACEHOLDER,
    }),
  });

  const {
    isPending: userDataIsPending,
    error: userDataError,
    data: userData,
    isFetching: userDataIsFetching,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => apiFetch(`/user`),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (userData) {
      const userName = capitalizeFirstLetter(userData.username);
      const userRole = capitalizeFirstLetter(userData.role);
      const userEmail = userData.email;

      setFormData({
        agency_name: '',
        to_email: '',
        subject_line: SUBJECT_LINE({ TodaysDate }),
        message_body: WORKER_REQUEST_TEMPLATE({
          agencyName: INITIAL_AGENCY_PLACEHOLDER,
          userName: userName || '',
          userTitle: userRole || '',
          userEmail: userEmail || '',
        }),
      });
    }
  }, [userData]);

  const {
    isPending: agenciesIsPending,
    error: agenciesError,
    data: agenciesData,
    isFetching: agenciesIsFetching,
  } = useQuery({
    queryKey: ['agencies'],
    queryFn: () => apiFetch('/agencies'),
    keepPreviousData: true,
  });

  const agencies = agenciesData?.results || [];
  const agencyOptions = agencies.map((agency) => ({
    label: agency.name,
    value: agency.id,
    email: agency.contact_email,
  }));

  const {
    mutate: sendSMSMutation,
    isPending,
    error,
  } = useSendSMSMutation({ setFormData });

  const handleScrollToTop = function () {
    if (successRef.current) {
      console.log('Scroll to Success Message Executed.');
      successRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      console.log('Scroll to Window Executed (Fallback).');
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'agency_name') {
      const agencyName = value;
      const selectedAgency = agencyOptions.find(
        (agency) => agency.label === agencyName
      );
      const contactEmail = selectedAgency?.email || '';
      const newBody = WORKER_REQUEST_TEMPLATE({
        agencyName: agencyName,
      });

      setFormData({
        ...formData,
        agency_name: agencyName,
        to_email: contactEmail,
        message_body: newBody,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    if (showSuccess) {
      handleScrollToTop();
    }
  }, [showSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);

    setFormData({
      agency_name: '',
      to_email: '',
      subject_line: SUBJECT_LINE({ TodaysDate }),
      message_body: WORKER_REQUEST_TEMPLATE({
        agencyName: INITIAL_AGENCY_PLACEHOLDER,
        userName: userName,
        userTitle: userRole,
        userEmail: userEmail,
      }),
    });
  };

  return (
    <PageContainer>
      {showSuccess && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative mb-4"
          role="alert"
          ref={successRef}
        >
          <span className="block sm:inline">Request sent successfully!</span>
        </div>
      )}
      <SectionHeader title="Request Workers">
        <h2 className="font-base text-md text-gray-800">
          Notify your agency partner of your current needs
        </h2>
      </SectionHeader>
      <div className="flex justify-between items-center">
        <p>
          Your request will send an email to the dedicated email for the
          selected agency
        </p>
        <NavLink to="/settings">
          <button
            type="button"
            className="text-white font-semibold text-sm bg-amber-400 px-4 py-3 rounded-xl hover:bg-amber-300 hover:cursor-pointer"
          >
            Change Email
          </button>
        </NavLink>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols gap-4 mt-10">
          <Select
            label="Agency"
            id="agency_name"
            name="agency_name"
            placeholder="Agency Name"
            value={formData.agency_name}
            onChange={handleInputChange}
            options={agencyOptions}
            required
          />
        </div>
        <div className="mt-10">
          <Input
            type="text"
            id="subject_line"
            name="subject_line"
            label="Subject:"
            placeholder="Subject:"
            value={formData.subject_line}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative mt-12 mb-8">
          <textarea
            id="message_body"
            name="message_body"
            placeholder="Request Message"
            rows={20}
            value={formData.message_body}
            onChange={handleInputChange}
            className="peer p-2 block w-full placeholder-transparent bg-white rounded-t-lg caret-gray-800 text-gray-800 border-b-2 border-b-gray-600 focus:border-yellow-500 focus:outline-none mt-8"
          ></textarea>
          <label
            htmlFor="message_body"
            className="peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 absolute text-gray-400 left-0 -top-5.5 text-sm transition-all cursor-text"
          >
            Request Message:
          </label>
        </div>
        <SubmitBtn
          label={isPending ? 'Sending...' : 'Send Request'}
          disabled={isPending}
        />
        {error && (
          <p className="text-red-500 mt-2 w-full">Error: {error.message}</p>
        )}
      </form>
    </PageContainer>
  );
}
