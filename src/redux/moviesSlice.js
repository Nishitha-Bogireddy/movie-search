import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'aabb8d58';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ searchTerm, page }) => {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&page=${page}`);
    return response.data;
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    searchTerm: '',
    movies: [],
    totalResults: 0,
    page: 1,
    loading: false,
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.Response === 'True') {
          state.movies = action.payload.Search;
          state.totalResults = parseInt(action.payload.totalResults, 10);
        } else {
          state.movies = [];
          state.totalResults = 0;
          state.error = action.payload.Error;
        }
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm, setPage } = moviesSlice.actions;
export const moviesReducer = moviesSlice.reducer;
