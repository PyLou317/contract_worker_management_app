export default function AddShiftBtn() {
  return (
    <div className="mt-4 bg-gray-200/40 hover:bg-gray-200/50 p-4 rounded-lg">
      <button className="flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 mr-1" // Added a color for visibility
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <span>Add Shift</span>
      </button>
    </div>
  );
}
