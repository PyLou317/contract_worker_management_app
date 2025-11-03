import '@/utilities/toolTipStyles.css';
import skillColorClasses from '@/pages/SkillsPage/SkillColorClasses';
import LoadingSpinner from '@/components/Loader';

export default function WorkerSkillList({
  workers,
  className,
  isFetching,
  isPending,
}) {
  const tableHeaderClass = 'py-2 px-4 text-left';
  const tableRowClass = 'py-2 px-4 text-left whitespace-nowrap';

  if (isFetching || isPending) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <LoadingSpinner size="10" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto max-h-[300px]">
      <table className="w-full mt-2 shadow-md table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <thead className=" text-gray-400 uppercase text-sm border border-b border-gray-200 leading-normal">
          <tr>
            <th className={tableHeaderClass}>Name</th>
            <th className={tableHeaderClass}>Agency</th>
            <th className={tableHeaderClass}>Skills</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {workers ? (
            workers.map((worker) => (
              <tr
                key={worker.id}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                <td className={tableRowClass}>
                  {worker.first_name && worker.last_name
                    ? `${worker.first_name} ${worker.last_name}`
                    : 'N/A'}
                </td>
                <td className={tableRowClass}>
                  {worker.agency_details ? worker.agency_details : 'N/A'}
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
                          {skill.skill.abreviation}-Lv{skill.level}
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
              <td colSpan="2" rowSpan="2" className="text-center align-middle">
                No workers found, please add some.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
