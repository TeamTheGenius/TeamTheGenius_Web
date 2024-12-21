import { useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  limit: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  limit,
  onPageChange,
  className = "",
}: PaginationProps) => {
  const getVisibleStartPage = (targetPage: number, limit: number) => {
    return Math.floor((targetPage - 1) / limit) * limit + 1;
  };

  const [visibleStartPage, setVisibleStartPage] = useState(
    getVisibleStartPage(currentPage + 1, limit)
  );
  const visibleEndPage = Math.min(visibleStartPage + limit - 1, totalPages);

  const pageNumbers = Array.from(
    { length: visibleEndPage - visibleStartPage + 1 },
    (_, i) => visibleStartPage + i
  );

  const onClickPrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      onPageChange(newPage);
      setVisibleStartPage(getVisibleStartPage(newPage, limit));
    }
  };

  const onClickNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      onPageChange(newPage);
      setVisibleStartPage(getVisibleStartPage(newPage, limit));
    }
  };

  const onClickPage = (page: number) => {
    onPageChange(page);
    setVisibleStartPage(getVisibleStartPage(page, limit));
  };

  const PageTurner = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 19"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.58342 9.07L0 2.07287L1.72002 0L11.55 9.07L1.72002 18.14L0 16.0671L7.58342 9.07Z"
          fill="currentColor"
        />
      </svg>
    );
  };

  const pageButtonClass = `rounded-md disabled:bg-white disabled:border-gray-300 disabled:text-gray-300 text-_coral-70 border-_coral-70 border w-10  flex justify-center items-center hover:bg-_coral-70 hover:text-white`;

  return (
    <div className={`flex justify-center ${className}`}>
      <div className="flex h-10 gap-5">
        <button
          onClick={onClickPrevPage}
          disabled={currentPage === 1}
          className={pageButtonClass}
          aria-label="Previous page"
        >
          <div className="rotate-180">
            <PageTurner />
          </div>
        </button>

        <div className="flex h-full gap-2">
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => onClickPage(page)}
              className={`${pageButtonClass} ${
                page === currentPage && "bg-_coral-70 text-white cursor-default"
              } `}
            >
              <div>{page}</div>
            </button>
          ))}
        </div>

        <button
          onClick={onClickNextPage}
          disabled={currentPage === totalPages}
          className={pageButtonClass}
          aria-label="Next page"
        >
          <PageTurner />
        </button>
      </div>
    </div>
  );
};
