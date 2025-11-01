import { useMemo } from 'react';

const DOTS = '...';

const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const usePagination = ({ totalPages, siblingCount = 1, currentPage }) => {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalPages, siblingCount, currentPage]);

  return paginationRange;
};

export default function Pagination({ page, setPage, totalPages, nextUrl, prevUrl, isFetching, updateUrl }) {
  const pageCount = Math.ceil(totalPages / 10);

  const paginationRange = usePagination({
    currentPage: page,
    totalPages: pageCount,
    siblingCount: 3,
  });

  const handlePageChange = (newPage) => {
    if (typeof newPage === 'string' || newPage < 1 || newPage > pageCount) {
      return;
    }
    setPage(newPage);
    updateUrl(newPage);
  };

  if (pageCount <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex gap-2 justify-center items-center">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={!prevUrl || isFetching}
        className="flex items-center px-4 py-2 text-gray-600 font-medium rounded-lg hover:text-gray-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Go to previous page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <span key={`${pageNumber}-${index}`} className="px-4 py-2 text-gray-500">
              &#8230;
            </span>
          );
        }

        return (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            disabled={page === pageNumber || isFetching}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
              page === pageNumber
                ? 'bg-yellow-200 text-gray-900 shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-current={page === pageNumber ? 'page' : undefined}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={!nextUrl || isFetching}
        className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Go to next page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}
