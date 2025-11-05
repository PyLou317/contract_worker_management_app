export default function RemoveShiftBtn({ onClick }) {
  return (
    <button
      className="flex items-center rounded-md px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200 cursor-pointer"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      <span>Remove Shift</span>
    </button>
  );
}
