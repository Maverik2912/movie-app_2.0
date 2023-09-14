import {AxiosError} from "axios";

import {MoviesList} from "../../components";
import {moviesService} from "../../services/moviesServices/moviesServices";

const MoviesListPage = () => {
    return (
        <div>
            <MoviesList />
        </div>
    );
};

const MoviesListPageLoader = async () => {
    try{
        const {data: {results: trendingMovies}} = await moviesService.getMovies();
        const {data: {results: topRatedMovies}} = await moviesService.getBestRating();
        const {data: {results: upcomingMovies}} = await moviesService.getUpcoming();

        return {
            trendingMovies, topRatedMovies, upcomingMovies
        }
    } catch (e) {
        const err = e as AxiosError;
        console.log(err.response.data);
    }
}

export {MoviesListPage, MoviesListPageLoader};