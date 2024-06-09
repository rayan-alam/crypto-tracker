import React from 'react';
import Pagination from '@mui/material/Pagination';
import './styles.css';

export default function PaginationComponent({ page, handlePageChange }) {

  return (
    <div className='paginationComponent'>
      <Pagination 
      count={10} 
      page={page} 
      onChange={(event, value) => handlePageChange(event, value)}
      sx={{
        "& .MuiPaginationItem-text": {
          color: "#fff !important",
          border: "1px solid var(--darkgrey)",
        },
        "& .MuiPaginationItem-text:hover": {
          backgroundColor: "transparent !important",
        },
        "& .Mui-selected  ": {
          backgroundColor: "var(--blue)",
          borderColor: "var(--blue)",
        },
        "& .MuiPaginationItem-ellipsis": {
          border: "none",
        },
      }} 
      />
    </div>
  );
}
