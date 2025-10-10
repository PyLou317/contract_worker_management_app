import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import '@/components/StarRatingStyles.css';
import skillColorClasses from '@/pages/SkillsPage/SkillColorClasses';
import LoadingSpinner from '@/components/Loader';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/utilities/apiClient';

export default function WorkerList() {
  const [ordering, setOrdering] = useState('');
  const [hoveredWorkerId, setHoveredWorkerId] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

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

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['workers'],
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
      const queryString = params.toString();
      const endpoint = `/workers/${queryString ? `?${queryString}` : ''}`;
      return apiFetch(endpoint);
    },
    keepPreviousData: true,
  });

  const workers = data?.results || [];
  const nextUrl = data?.next;
  const prevUrl = data?.previous;

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
          {workers && workers.length > 0 ? (
            workers.map((worker) => (
              <tr
                key={worker.id}
                className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap border-r border-gray-200">
                  <input
                    type="checkbox"
                    id="schedule_worker"
                    name="schedule_worker"
                    value="yes"
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
                      {worker.rating ? worker.rating.average_rating : 'N/A'} out
                      of 5
                    </div>
                  )}
                  <Rating
                    initialValue={
                      worker.rating !== null && worker.rating.average_rating
                        ? worker.rating.average_rating
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
                    No workers found, please add some.
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
