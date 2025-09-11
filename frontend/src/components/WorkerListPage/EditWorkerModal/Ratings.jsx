import Input from '../../Inputs/LabeledInput';

export default function Ratings({ workerData, formData, handleInputChange }) {
  return (
    <>
      <div className="flex justify-between items-center align-baseline mt-12">
        <div>
          <h2 className="text-2xl font-semibold text-white">Ratings</h2>
          <small>Each rating is out of 5 and will produce an average overal rating</small>
        </div>
        <p className="text-black font-semibold text-center bg-yellow-300 px-4 py-2 rounded-md">
          Average Rating: {workerData.ratings?.[0]?.average_rating ? workerData.ratings?.[0]?.average_rating : 'N/A'}
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        <Input
          step="0.25"
          min="0"
          max="5"
          label="Attendance"
          type="number"
          id="attendance_score"
          name="attendance_score"
          value={formData.attendance_score}
          onChange={handleInputChange}
          className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <Input
          step="0.25"
          min="0"
          max="5"
          label="Communication"
          type="number"
          id="communication_score"
          name="communication_score"
          value={formData.communication_score}
          onChange={handleInputChange}
          className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <Input
          step="0.25"
          min="0"
          max="5"
          label="Performance"
          type="number"
          id="performance_score"
          name="performance_score"
          value={formData.performance_score}
          onChange={handleInputChange}
          className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <Input
          step="0.25"
          min="0"
          max="5"
          label="Skills"
          type="number"
          id="skills_score"
          name="skills_score"
          value={formData.skills_score}
          onChange={handleInputChange}
          className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="border-b border-gray-700 mt-4"></div>
    </>
  );
}
