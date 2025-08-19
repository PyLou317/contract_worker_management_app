export default function Pagination({ page, setPage, totalPages, nextUrl, prevUrl, isFetching, updateUrl }) {
  return (
    <div className="mt-8 flex gap-8 justify-center items-center">
      <button
        onClick={() => {
          setPage((old) => {
            const newPage = Math.max(old - 1, 1);
            updateUrl(newPage);
            return newPage;
          });
        }}
        disabled={!prevUrl || isFetching}
        className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Previous
      </button>
      <span className="text-gray-600 font-semibold text-lg">Page {page}</span>
      <button
        onClick={() => setPage((old) => old + 1)}
        disabled={!nextUrl || isFetching}
        className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}
