export default function ViewWorkersBtn({
  toggleAddWorkersClick,
  addWorkersId,
  shiftId,
}) {
  return (
    <button
      type="button"
      className="flex items-center rounded-md px-4 py-2 text-gray-400 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
      onClick={() => {
        if (shiftId) toggleAddWorkersClick(shiftId);
        else console.warn('Shift ID is missing, cannot add workers.');
      }}
    >
      {addWorkersId === shiftId ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 me-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span>Close Add Workers</span>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 me-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
          </svg>
          <span>Add Workers</span>
        </>
      )}
    </button>
  );
}