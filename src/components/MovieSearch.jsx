import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, fetchMovies } from '../redux/moviesSlice';
import MovieCard from './MovieCard';
import Pagination from './Pagination';
import Spinner from './Spinner';
import './Spinner.css';

const MovieSearch = () => {
    const dispatch = useDispatch();
    const { movies, loading, error } = useSelector((state) => state.movies);
    const [input, setInput] = useState('Avengers'); // Default search term to show results on load

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (input.trim() !== '') {
                dispatch(setSearchTerm(input));
                dispatch(fetchMovies({ searchTerm: input, page: 1 }));
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [input, dispatch]);

    return (
        <div className="container">
            <h2>Movie Search</h2>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search movies..."
            />

            {loading && <Spinner />}
            {error && <p className="error">{error}</p>}


            <div className="movie-grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </div>

            {movies.length > 0 && <Pagination />}
        </div>
    );
};

export default MovieSearch;
