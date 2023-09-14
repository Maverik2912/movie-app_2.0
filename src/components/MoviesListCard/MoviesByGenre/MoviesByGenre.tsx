import {useParams, useSearchParams} from "react-router-dom";
import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {moviesActions} from "../../../redux";
import {MoviesPrinter} from "../../MoviesPrinter";
import {MoviesPagination} from "../../MoviesPagination";
import '../MoviesListCard.css';
import {IParams} from "../../../interfaces";
import {Preloader} from "../../Preloader";

const MoviesByGenre = () => {
    const {genreName, genreId} = useParams<IParams>();
    const {moviesByGenre, isLoading} = useAppSelector(store => store.movies);

    const dispatch = useAppDispatch();

    const [query, setQuery] = useSearchParams({page: '1'});
    const page = query.get('page');

    useEffect(() => {
        dispatch(moviesActions.toggleIsLoading(true));
        dispatch(moviesActions.getMoviesByGenre({genreId, page: +page})).then(() => {
            dispatch(moviesActions.toggleIsLoading(false));
        });
    }, [dispatch, genreId, page]);

    const moviesWithPosters = moviesByGenre && [...moviesByGenre].filter(movie => movie.poster_path);

    return (
        <>
            {isLoading ? <Preloader/> :
                <div className='container'>
                    <h1 className='title'>
                        {`Genre ${genreName}`}
                    </h1>
                    <MoviesPrinter movies={moviesWithPosters}/>
                    <MoviesPagination/>
                </div>
            }
        </>
    );
};

export {MoviesByGenre};