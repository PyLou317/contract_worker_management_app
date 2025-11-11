import { useState, useContext, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';
import { EditScheduleContext } from './edit-schedule-context';
import { useSendSMSMutation } from '@/hooks/sendSMSMutation';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/utilities/apiClient';

import '@/utilities/toolTipStyles.css';

import starRating from '@/utilities/starRatingConfig';
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';
import skillColorClasses from '@/pages/SkillsPage/SkillColorClasses';
import LoadingSpinner from '@/components/Loader';
import SMSNotificationModal from '@/pages/Scheduling/EditScheduleModal/SendSMSNotificationModal';

export default function ScheduledWorkerList({ shiftId, scheduledWorkersId }) {
  const [ordering, setOrdering] = useState('');
  const [hoveredWorkerId, setHoveredWorkerId] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const [displayWorkers, setDisplayWorkers] = useState([]);
  const [openSMSModal, setOpenSMSModal] = useState(false);

  const { shiftsData, isPending, isFetching, error, handleWorkerCheck } =
    useContext(EditScheduleContext);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handleRatingSort = () => {
    if (ordering === 'avg_rating') {
      setOrdering(`-avg_rating`);
    } else {
      setOrdering('avg_rating');
    }
    setPage(1);
  };

  const updateUrl = (newPage) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', newPage);
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['workers', searchTerm, page, ordering, shiftId],
    queryFn: () => {
      const params = new URLSearchParams();
      if (page > 1) {
        params.set('page', page);
      }
      if (searchTerm) {
        params.set('search', searchTerm);
      }
      if (ordering) {
        params.set('ordering', ordering);
      }

      params.set('shift_id', shiftId);

      const queryString = params.toString();
      const endpoint = `/scheduled-workers/${
        queryString ? `?${queryString}` : ''
      }`;
      return apiFetch(endpoint);
    },
    keepPreviousData: true,
  });

  const workers = data?.results || [];
  const nextUrl = data?.next;
  const prevUrl = data?.previous;

  const shiftIndex = formData.shifts.findIndex((shift) => shift.id === shiftId);
  const currentShiftWorkers =
    formData.shifts[shiftIndex]?.contract_workers || [];

  const selectedWorkerIds = currentShiftWorkers.map(
    (workerObj) => workerObj.id
  );

  const handleOpenSendSMSModal = (e) => {
    e.preventDefault();
    setOpenSMSModal((prevOpenSMSModal) => !prevOpenSMSModal);
  };

  const {
    mutate: sendSMSMutation,
    isPending: isSendingSMS,
    error: smsError,
  } = useSendSMSMutation({ setShowSuccess, setMessageSentCount });

  const sendSMS = (e) => {
    e.preventDefault();
    const messagesToSend = [];

    workers.forEach((element) => {
      const workerName = `${element.first_name} ${element.last_name}`;
      const message_body = `Hi ${workerName}, a new work schedule has been sent to your email.`;
      const phone_number = element.phone_number;

      const dataToSend = {
        receipient_name: workerName,
        message_body: message_body,
        to_number: '+1' + phone_number,
      };
      messagesToSend.push(dataToSend);
    });
    messagesToSend.forEach((element) => {
      sendSMSMutation(element);
    });
    setOpenSMSModal(false);
  };

  const handleSelectAllWorkers = (event) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      workers.forEach((worker) => {
        handleWorkerCheck(shiftIndex, worker.id, isChecked);
      });
    } else {
      workers.forEach((worker) => {
        handleWorkerCheck(shiftIndex, worker.id, isChecked);
      });
    }
  };

  if (isFetching || isPending) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <LoadingSpinner size="10" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <div className="flex justify-center items-center h-auto w-fit mx-auto bg-red-100 text-red-700 p-4 rounded-lg">
          An error has occurred: {error.message}
        </div>
      </div>
    );
  }

  return (
    <>
      {showSuccess && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative my-4"
          role="alert"
        >
          <span className="block sm:inline">
            {messageSentCount} Workers notified successfully!
          </span>
        </div>
      )}

      <div className="mt-4">
        <div className="flex justify-between align-center items-center mb-2">
            <Search onSearch={handleSearch} searchTerm={searchTerm} />
            <button
              className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-white font-medium cursor-pointer"
              onClick={handleOpenSendSMSModal}
            >
              {isSendingSMS ? 'Sending...' : 'Notify Workers'}
            </button>
          </div>
          <div className="overflow-x-auto border border-gray-300 rounded-lg mb-8">
            <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <tr>
                  <th className="py-1 px-6 text-left border-r border-gray-300">
                    <input
                      type="checkbox"
                    id="select_all_workers"
                    name="select_all_workers"
                      value="yes"
                    onChange={handleSelectAllWorkers}
                    />
                  </th>
                  <th className="py-1 px-6 text-left border-r border-gray-300">
                    Name
                  </th>
                  <th className="py-1 px-6 text-left border-r border-gray-300">
                    Position
                  </th>
                  <th className="py-1 px-6 text-left border-r border-gray-300">
                    Agency
                  </th>
                  <th className="py-1 px-6 text-left border-r border-gray-300">
                    <div className="flex justify-between items-center">
                      Rating{' '}
                      <button
                        onClick={handleRatingSort}
                        className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                      >
                      <SortIcon />
                      </button>
                    </div>
                  </th>
                  <th className="py-3 px-6 text-left">Skills</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
              {workers && workers.length > 0 ? (
                workers.map((worker) => (
                    <tr
                      key={worker.id}
                      className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap border-r border-gray-200">
                        <input
                          type="checkbox"
                          id={`contract_workers_${worker.id}`}
                          name="contract_workers"
                          value={worker.id}
                          checked={selectedWorkerIds.includes(worker.id)}
                          onChange={(e) =>
                            handleWorkerCheck(
                              shiftIndex,
                              e.target.value,
                              e.target.checked
                            )
                          }
                        />
                      </td>
                      <td className="py-3 px-6 text-left border-r border-gray-200">
                        {worker.first_name} {worker.last_name}
                      </td>
                      <td className="py-3 px-6 text-left border-r border-gray-200">
                        {worker.position}
                      </td>
                      <td className="py-3 px-6 text-left border-r border-gray-200">
                        {worker.agency_details}
                      </td>
                      <td
                        className="py-3 px-6 text-left border-r border-gray-200 relative"
                        onMouseEnter={() => setHoveredWorkerId(worker.id)}
                        onMouseLeave={() => setHoveredWorkerId(null)}
                      >
                        {hoveredWorkerId === worker.id && (
                          <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 mb-2 bg-white border border-gray-300 p-2 rounded shadow-lg text-sm z-10 whitespace-nowrap">
                            {worker.rating
                              ? worker.rating.average_rating
                              : 'N/A'}{' '}
                            out of 5
                          </div>
                        )}
                        <Rating
                          initialValue={
                            worker.rating !== null &&
                            worker.rating?.average_rating
                              ? worker.rating?.average_rating
                              : 0
                          }
                          {...starRating}
                        />
                      </td>
                      <td className="text-white py-3 px-6 text-left border-r border-gray-200">
                        <div className="flex flex-wrap gap-2">
                          {worker.worker_skills !== null &&
                            worker.worker_skills?.map((skill, index) => (
                              <span
                                className={`text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md transition-colors duration-200 tooltip ${
                                  skillColorClasses[skill.skill.base_color]?.[
                                    skill.level
                                  ] || 'bg-gray-400 hover:bg-gray-500'
                                }`}
                                key={index}
                              >
                                {skill.skill.abreviation}LV{skill.level}
                                <div className="tooltip-content cursor-pointer">
                                  {skill.skill.skill_name} level {skill.level}
                                </div>
                              </span>
                            ))}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      <div className="flex justify-center items-center h-[100px]">
                        <div className="flex justify-center items-center h-auto w-fit mx-auto bg-yellow-100 text-yellow-700 p-4 rounded-lg">
                          No workers found, please add workers to schedule.
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
      <SMSNotificationModal
        show={openSMSModal}
        onClose={handleOpenSendSMSModal}
          workerCount={workers.length}
        sendSMS={sendSMS}
      />
    </>
  );
}
