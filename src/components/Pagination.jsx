import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, fetchMovies } from '../redux/moviesSlice';

const Pagination = () => {
  const dispatch = useDispatch();
  const { page, totalResults, searchTerm } = useSelector((state) => state.movies);
  const totalPages = Math.ceil(totalResults / 10);

  const goToPage = (newPage) => {
    dispatch(setPage(newPage));
    dispatch(fetchMovies({ searchTerm, page: newPage }));
  };

  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => goToPage(page - 1)}>Prev</button>
      <span>{page} / {totalPages}</span>
      <button disabled={page === totalPages} onClick={() => goToPage(page + 1)}>Next</button>
    </div>
  );
};

export default Pagination;
