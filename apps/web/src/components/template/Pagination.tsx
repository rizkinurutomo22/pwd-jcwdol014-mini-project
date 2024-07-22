import React from 'react';

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, setPage }) => {
  const handlePrev = () => setPage(Math.max(page - 1, 1));
  const handleNext = () => setPage(page + 1);

  return (
    <div className="mt-4 flex justify-center">
      <button onClick={handlePrev} className="mr-2 border p-2">
        Previous
      </button>
      <span className="p-2">{page}</span>
      <button onClick={handleNext} className="ml-2 border p-2">
        Next
      </button>
    </div>
  );
};

export default Pagination;
