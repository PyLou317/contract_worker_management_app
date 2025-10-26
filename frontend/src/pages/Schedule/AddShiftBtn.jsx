export default function AddShiftBtn({ onClick }) {
  return (
    <div
      className="mt-2 bg-blue-200 hover:bg-blue-300/50 text-gray-600 transition-colors duration-200 p-3 rounded-lg cursor-pointer"
      onClick={onClick}
    >
      <button className="flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <span className="cursor-pointer">Add Shift</span>
      </button>
    </div>
  );
}
