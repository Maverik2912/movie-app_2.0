const baseMoviesURL = process.env.REACT_APP_MOVIES_API;
const posterURL = process.env.REACT_APP_POSTER;
const trailerURL = process.env.REACT_APP_TRAILER;

const genresList =  'genre/movie/list';
const moviesList = 'discover/movie';
const searchMovie =  'search/movie'
const movieById = 'movie';
const upcoming = 'movie/upcoming';

const urls = {
    genresList,
    moviesList,
    searchMovie,
    movieById,
    upcoming
}

export {
    baseMoviesURL,
    posterURL,
    trailerURL,
    urls
}