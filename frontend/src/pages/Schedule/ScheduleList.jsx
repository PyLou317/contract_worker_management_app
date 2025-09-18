export default function ScheduleList() {
  return (
    <div className="container mx-auto p-4 mt-4 bg-white shadow-md rounded-2xl">
      <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left border-r border-gray-300">Schedule</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          <tr className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200">
            <td className="py-3 px-6 text-left whitespace-nowrap border-r border-gray-200">This weeks schedule</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
