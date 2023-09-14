import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IGenre, IMovie, IMovies, IVideo} from "../../interfaces";
import {moviesService} from "../../services/moviesServices/moviesServices";

interface IState {
    genres: IGenre[];
    moviesByQuery: IMovie[];
    moviesByGenre: IMovie[];
    moviesByTime: IMovie[];
    trendingMovies: IMovie[];
    topRatedMovies: IMovie[];
    upcomingMovies: IMovie[];
    similarMovies: IMovie[];
    currentMovie: IMovie;
    videos: IVideo[];
    total_pages: number;
    total_results: number;
    isLoading: boolean;
}

const initialState: IState = {
    genres: [],
    moviesByQuery: [],
    moviesByGenre: [],
    moviesByTime: [],
    trendingMovies: [],
    topRatedMovies: [],
    upcomingMovies: [],
    similarMovies: [],
    currentMovie: null,
    videos: [],
    total_pages: null,
    total_results: null,
    isLoading: false
}

const getGenres = createAsyncThunk<IGenre[], void>(
    'moviesSlice/getGenres',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await moviesService.getGenres();
            return data.genres;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    },
);

const getMoviesByQuery = createAsyncThunk<IMovies, { query: string, page: number }>(
    'moviesSlice/getMoviesByQuery',
    async ({query, page}, {rejectWithValue}) => {
        try {
            const {data} = await moviesService.getByQuery(query, page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
)

const getMoviesByGenre = createAsyncThunk<IMovies, { genreId: string, page: number }>(
    'moviesSlice/getMoviesByGenre',
    async ({genreId, page}, {rejectWithValue}) => {
        try {
            const {data} = await moviesService.getByGenreId(genreId, page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
)

const getMoviesByTimeInterval = createAsyncThunk<IMovies, { from: string, to: string, page: number }>(
    'moviesSlice/getMoviesByTimeInterval',
    async ({from, to, page}, {rejectWithValue}) => {
        try {
            const {data} = await moviesService.getByTimeInterval(from, to, page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const getMovieById = createAsyncThunk<{ currentMovie: IMovie, similarMovies: IMovie[], videos: IVideo[] }, {
    movieId: number
}>(
    'moviesSlice/getMovieById',
    async ({movieId}, {rejectWithValue}) => {
        try {
            const {data: currentMovie} = await moviesService.getById(movieId);
            const {data: {results: similarMovies}} = await moviesService.getSimilarById(movieId);
            const {data: {results: videos}} = await moviesService.getVideoById(movieId);
            return {currentMovie, similarMovies, videos}
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
)

const moviesSlice = createSlice({
    name: 'moviesSlice',
    initialState,
    reducers: {
        setTrendingMovies: (state, action: PayloadAction<IMovie[]>) => {
            state.trendingMovies = action.payload;
        },
        setTopRatedMovies: (state, action: PayloadAction<IMovie[]>) => {
            state.topRatedMovies = action.payload;
        },
        setUpcomingMovies: (state, action: PayloadAction<IMovie[]>) => {
            state.upcomingMovies = action.payload;
        },
        setCurrentMovie: (state, action) => {
            state.currentMovie = action.payload;
        },
        setSimilarMovies: (state, action) => {
            state.similarMovies = action.payload;
        },
        setVideos: (state, action) => {
            state.videos = action.payload;
        },
        setMoviesByGenre: (state, action) => {
            state.moviesByGenre = action.payload.results;
            state.total_results = action.payload.total_results;
            state.total_pages = action.payload.total_pages;
        },
        setMoviesByTimeInterval: (state, action) => {
            state.moviesByGenre = action.payload.results;
            state.total_results = action.payload.total_results;
            state.total_pages = action.payload.total_pages;
        },
        setMoviesByQuery: (state, action) => {
            state.moviesByGenre = action.payload.results;
            state.total_results = action.payload.total_results;
            state.total_pages = action.payload.total_pages;
        },
        toggleIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    },
    extraReducers: builder => builder
        .addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
        })
        .addCase(getMoviesByQuery.fulfilled, (state, action) => {
            state.moviesByQuery = action.payload.results;
            state.total_results = action.payload.total_results;
            state.total_pages = action.payload.total_pages;
        })
        .addCase(getMoviesByGenre.fulfilled, (state, action) => {
            state.moviesByGenre = action.payload.results;
            state.total_results = action.payload.total_results;
            state.total_pages = action.payload.total_pages;
        })
        .addCase(getMoviesByTimeInterval.fulfilled, (state, action) => {
            state.moviesByTime = action.payload.results;
            state.total_results = action.payload.total_results;
            state.total_pages = action.payload.total_pages;
        })
        .addCase(getMovieById.fulfilled, (state, action) => {
            state.currentMovie = action.payload.currentMovie;
            state.similarMovies = action.payload.similarMovies;
            state.videos = action.payload.videos;
        })
});

const {reducer: moviesReducer, actions} = moviesSlice;

const moviesActions = {
    ...actions,
    getGenres,
    getMoviesByQuery,
    getMoviesByGenre,
    getMoviesByTimeInterval,
    getMovieById,
}

export {
    moviesActions,
    moviesReducer
}
