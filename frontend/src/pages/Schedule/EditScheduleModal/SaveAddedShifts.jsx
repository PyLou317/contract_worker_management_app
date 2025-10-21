export default function SaveAddedShiftsBtn({ onClick }) {
  return (
    <div className="mt-4 bg-yellow-300 hover:bg-yellow-400/80 text-gray-600 transition-colors duration-200 cursor-pointer font-medium p-3 rounded-lg">
      <button
        className="flex mx-auto transition-colors duration-200"
        onClick={onClick}
      >
        <span className="cursor-pointer">Save Added Shifts</span>
      </button>
    </div>
  );
}
