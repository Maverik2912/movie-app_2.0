import {ActionFunctionArgs, ParamParseKey, Params} from "react-router-dom";
import {AxiosError} from "axios";

import {MovieInfo} from "../../components";
import {moviesService} from "../../services/moviesServices/moviesServices";


const MovieInfoPage = () => {

    return (
        <div>
            <MovieInfo />
        </div>
    );
};

interface MovieInfoPageLoaderArgs extends ActionFunctionArgs {
    params: Params<ParamParseKey<string>>;
}

export const MovieInfoPageLoader = async ({params}: MovieInfoPageLoaderArgs) => {
    try{
        const {movieId} = params;
        const {data: {results: similarMovies}} = await moviesService.getSimilarById(+movieId);
        const {data: movie} = await moviesService.getById(+movieId);
        const {data: {results: videos}} = await moviesService.getVideoById(+movieId);
        return {movie, similarMovies, videos};
    } catch(e) {
        const err = e as AxiosError;
        console.log(err.response.data);
    }
}

export {MovieInfoPage};