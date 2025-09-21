export default function ScheduleList({ schedules }) {
  return (
    <div className="container mx-auto p-4 mt-4 bg-white shadow-md rounded-2xl">
      <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left border-r border-gray-300">Schedule</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {schedules > 0 ? (
            schedules.map((schedule) => (
              <tr className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                <td className="py-3 px-6 text-left whitespace-nowrap border-r border-gray-200">
                  {schedule.day} {schedule.start_time} - {schedule.end_time}
                </td>
              </tr>
            ))
          ) : (
            <tr className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200">
              <td className="py-3 px-6 text-left whitespace-nowrap border-r border-gray-200">
                <div className="flex justify-center items-center h-fit py-4">
                  <div className="flex justify-center items-center h-auto w-fit mx-auto bg-yellow-100 text-yellow-700 p-4 rounded-lg">
                    No schedules found, please add some.
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
