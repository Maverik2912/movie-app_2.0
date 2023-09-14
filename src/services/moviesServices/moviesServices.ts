import {apiService} from "../apiService/apiService";
import {urls} from "../../constants";
import {IGenres, IMovie, IMovies, IVideos} from "../../interfaces";


export const moviesService = {
    getMovies: () => apiService.get<IMovies>(urls.moviesList, {params: {sort_by: 'popularity.desc'}}),
    getGenres: () => apiService.get<IGenres>(urls.genresList),
    getBestRating: () => apiService.get<IMovies>(urls.moviesList, {params: {sort_by: "vote_average.desc", 'vote_count.gte': 10000}}),
    getByQuery: (query: string, page: number) => apiService.get<IMovies>(urls.searchMovie, {params: {query, page}}),
    getById: (id: number) => apiService.get<IMovie>(`${urls.movieById}/${id}`),
    getSimilarById: (id: number) => apiService.get<IMovies>(`${urls.movieById}/${id}/similar`),
    getVideoById: (id: number) => apiService.get<IVideos>(`${urls.movieById}/${id}/videos`),
    getByGenreId: (genreId: string, page: number) => apiService.get<IMovies>(urls.moviesList, {params: {sort_by: 'popularity.desc', with_genres: genreId, page}}),
    getByTimeInterval: (from: string, to: string, page: number) => apiService.get<IMovies>(urls.moviesList, {params: {'primary_release_date.gte': from, 'primary_release_date.lte': to, sort_by: 'popularity.desc', page}}),
    getUpcoming: () => apiService.get<IMovies>(urls.upcoming),
}