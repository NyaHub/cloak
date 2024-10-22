import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import classes from './pagination.module.css'

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={classes.pagination}>
      <button onClick={handlePrevClick} disabled={currentPage === 1} className={classes.btn}>
        <ChevronLeft size={18}/>
      </button>

      {Array.from({ length: totalPages }, (v, i) => i + 1).map((page) => (
        <button 
           key={page} 
           onClick={() => onPageChange(page)} className={`${classes.number} ${currentPage === page ? classes.active : ''}`}
        >
          {page}
        </button>
      ))}

      <button onClick={handleNextClick} disabled={currentPage === totalPages} className={classes.btn}>
        <ChevronRight size={18}/>
      </button>
    </div>
  );
};

export default Pagination;