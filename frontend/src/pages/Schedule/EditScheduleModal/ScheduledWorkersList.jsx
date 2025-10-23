import { useState, useContext } from 'react';
import { Rating } from 'react-simple-star-rating';
import { EditScheduleContext } from './edit-schedule-context';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/utilities/apiClient';

import '@/utilities/toolTipStyles.css';

import Search from '@/components/Search';
import skillColorClasses from '@/pages/SkillsPage/SkillColorClasses';
import LoadingSpinner from '@/components/Loader';

export default function ScheduledWorkersList({ shiftId, index }) {
  const [ordering, setOrdering] = useState('');
  const [hoveredWorkerId, setHoveredWorkerId] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [scheduledWorkersView, setScheduledWorkersView] = useState(false);

  const { shiftsData, isPending, isFetching, error, handleWorkerCheck } =
    useContext(EditScheduleContext);

  const targetShift = shiftsData.find((shift) => shift.id === shiftId);
  const targetShiftWorkers = targetShift?.workers || [];

  const starRating = {
    size: 24,
    allowFraction: true,
    readonly: true,
    allowHover: false,
    fillColor: '#ffd700',
  };

  const handleRatingSort = () => {
    if (ordering === 'avg_rating') {
      setOrdering(`-avg_rating`);
    } else {
      setOrdering('avg_rating');
    }
    setPage(1);
  };

  //   const updateUrl = (newPage) => {
  //     const params = new URLSearchParams(window.location.search);
  //     params.set('page', newPage);
  //     window.history.pushState(null, '', `?${params.toString()}`);
  //   };

  const toggleScheduledWorkersView = () => {
    setScheduledWorkersView(!scheduledWorkersView);
  };

  //   const scheduledworkers = formData.shifts[index].workers || [];
  //   const nextUrl = scheduleData?.next;
  //   const prevUrl = scheduleData?.previous;

  //   const shiftIndex = formData.shifts.findIndex((shift) => shift.id === shiftId);
  //   const currentShiftWorkers =
  //     formData.shifts[shiftIndex]?.contract_workers || [];
  //   const selectedWorkerIds = currentShiftWorkers.map(
  //     (workerObj) => workerObj.id
  //   );

  if (isFetching || isPending) {
    return (
      <div className="flex justify-center items-center h-[100px] my-8">
        <LoadingSpinner size="10" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[100px] my-8">
        <div className="flex justify-center items-center h-auto w-fit mx-auto bg-red-100 text-red-700 p-4 rounded-lg">
          An error has occurred: {scheduleError.message}
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={toggleScheduledWorkersView}
        className="flex gap-2 mt-4 items-center mb-2 cursor-pointer"
      >
        {scheduledWorkersView ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 text-green-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 text-green-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        )}
        {scheduledWorkersView ? (
          <h1 className="text-green-600">Close Scheduled Workers</h1>
        ) : (
          <h1 className="text-green-600">View Scheduled Workers </h1>
        )}
      </button>
      {scheduledWorkersView && (
        <>
          <Search />
          <div className="overflow-x-auto border border-gray-300 rounded-lg mb-8">
            <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <tr>
                  <th className="py-1 px-6 text-left border-r border-gray-300">
                    <input
                      type="checkbox"
                      id="schedule_worker"
                      name="schedule_worker"
                      value="yes"
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                          />
                        </svg>
                      </button>
                    </div>
                  </th>
                  <th className="py-3 px-6 text-left">Skills</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {targetShiftWorkers && targetShiftWorkers.length > 0 ? (
                  targetShiftWorkers.map((worker, index) => (
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
                          checked={true}
                          onChange={(e) =>
                            handleWorkerCheck(
                              index,
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
    </>
  );
}
